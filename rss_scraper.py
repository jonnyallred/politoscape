'''
Created on Nov 26, 2011

@author: Jonathan

Taken from 
http://www.halotis.com/2009/07/07/how-to-get-rss-content-into-an-sqlite-database-with-python-fast/
'''

import sqlite3
import threading
import Queue
from time import strftime
import settings
import csv
 
import feedparser     # available at http://code.google.com/p/feedparser/
 
 
THREAD_LIMIT = 20
feeds_to_retrieve = Queue.Queue(0)
entries_to_process = Queue.Queue(THREAD_LIMIT)
 
DATABASE = settings.DATABASES['default']['NAME']
feeds_file = "feeds.csv" 
 
#connect to the sqlite db
conn = sqlite3.connect(DATABASE)
conn.row_factory = sqlite3.Row
c = conn.cursor()
 
#insert initial values into feed database
#rss_feeds = (('http://feeds.gawker.com/lifehacker/vip', 'lifehacker', 0),
#             ('http://xkcd.com/rss.xml','xkcd', 1),
#             ('http://feeds.wsjonline.com/wsj/xml/rss/3_7011.xml', 'wsj', -1),
#             )

with open(feeds_file, 'rb') as f:
    reader = csv.reader(f)
    for info in reader:
        c.execute("INSERT INTO spectrum_source(url, name, viewpoint) VALUES('%s', '%s', %d);" % (info[0],info[2],int(info[3]))) #url, name, score
        
feeds = c.execute('SELECT id, url, viewpoint FROM spectrum_source').fetchall()
 
def store_entries(id, items, score=0):
    """ Takes a feed_id and a list of items and stores them in the DB """
    for entry in items:
        c.execute('SELECT id from spectrum_source WHERE url=?', (entry.link,))
        if len(c.fetchall()) == 0:
            c.execute('INSERT INTO spectrum_story (source_id, url, title, content, date, viewpoint) \
                       VALUES (?,?,?,?,?,?)', 
                       (id, entry.link, entry.title, entry.summary, 
                        strftime("%Y-%m-%d %H:%M:%S",entry.updated_parsed), score))
 
def retrieve_and_queue_entries():
    """ Get rss entries and queue them for processing """
    while True:
        try:
            id, source_url, score = feeds_to_retrieve.get(False) # False = Don't wait
        except Queue.Empty:
            return
 
        entries = feedparser.parse(source_url).entries
        
        entries_to_process.put((id, entries, score), True) # This will block if full
 
 
#main method 
for info in feeds: 
    # Queue up the feeds
    feeds_to_retrieve.put([info['id'], info['url'], info['viewpoint']])
 
for n in xrange(THREAD_LIMIT):
    # initialize threads
    t = threading.Thread(target=retrieve_and_queue_entries)
    t.start()
 
while threading.activeCount() > 1 or not entries_to_process.empty():
    # While threads are running or RSS entries are left in the queue...
    try:
        id, entries, score = entries_to_process.get(False, 1) # Wait for up to a second
    except Queue.Empty:
        continue
 
    store_entries(id, entries, score)
 
conn.commit()
