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
 
import feedparser     # available at http://feedparser.org
 
 
THREAD_LIMIT = 20
feeds_to_retrieve = Queue.Queue(0)
entries_to_process = Queue.Queue(THREAD_LIMIT)
 
DATABASE = "../../rss.sqlite"
 
#connect to the sqlite db
conn = sqlite3.connect(DATABASE)
conn.row_factory = sqlite3.Row
c = conn.cursor()
 
#insert initial values into feed database
rss_feeds = (('http://feeds.gawker.com/lifehacker/vip', 'lifehacker'),
             ('http://xkcd.com/rss.xml','xkcd'),
             ('http://feeds.wsjonline.com/wsj/xml/rss/3_7011.xml', 'wsj'),
             )
for info in rss_feeds:
    c.execute("INSERT INTO rss_feed(url, name) VALUES('%s', '%s');" % info) #url, name

feeds = c.execute('SELECT id, url FROM rss_feed').fetchall()
 
def store_entries(id, items):
    """ Takes a feed_id and a list of items and stored them in the DB """
    for entry in items:
        c.execute('SELECT id from rss_entry WHERE url=?', (entry.link,))
        if len(c.fetchall()) == 0:
            c.execute('INSERT INTO rss_entry (feed_id, url, title, content, date) VALUES (?,?,?,?,?)', (id, entry.link, entry.title, entry.summary, strftime("%Y-%m-%d %H:%M:%S",entry.updated_parsed)))
 
def retrieve_and_queue_entries():
    """ Get rss entries and queue them for processing """
    while True:
        try:
            id, feed_url = feeds_to_retrieve.get(False) # False = Don't wait
        except Queue.Empty:
            return
 
        entries = feedparser.parse(feed_url).entries
        
        entries_to_process.put((id, entries), True) # This will block if full
 
 
#main method 
for info in feeds: 
    # Queue up the feeds
    feeds_to_retrieve.put([info['id'], info['url']])
 
for n in xrange(THREAD_LIMIT):
    # initialize threads
    t = threading.Thread(target=retrieve_and_queue_entries)
    t.start()
 
while threading.activeCount() > 1 or not entries_to_process.empty():
    # While threads are running or RSS entries are left in the queue...
    try:
        id, entries = entries_to_process.get(False, 1) # Wait for up to a second
    except Queue.Empty:
        continue
 
    store_entries(id, entries)
 
conn.commit()
