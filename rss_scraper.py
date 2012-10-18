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
import imgscrape
 
import feedparser     # available at http://code.google.com/p/feedparser/
 
def store_entries(id, items, score=0):
    """ Takes a feed_id and a list of items and stores them in the DB """
    for entry in items:
        db_cursor.execute('INSERT INTO spectrum_story \
                           (source_id, url, title, content, date, viewpoint,) \
                           VALUES (?,?,?,?,?,?,?,?)', 
                          (id, entry.link, entry.title, entry.summary, 
                           strftime("%Y-%m-%d %H:%M:%S",entry.updated_parsed), 
                           score))
 
def retrieve_and_queue_entries():
    """ Get rss entries and queue them for processing """
    while True:
        try:
            id, url, viewpoint = feeds_to_retrieve.get(False) # False = Don't wait
        except Queue.Empty:
            return
        entries = feedparser.parse(url).entries
        entries_to_process.put((id, entries, viewpoint), True) # This will block if full
        
def grab_and_queue_feeds():
    feeds_to_retrieve = Queue.Queue(0)
    # Get the feeds from the DB
    feeds = db_cursor.execute('SELECT id, url, viewpoint FROM spectrum_source').fetchall()
    # Queue up the feeds 
    for feed in feeds: 
        feeds_to_retrieve.put([feed['id'], feed['url'], feed['viewpoint']])    
    return feeds_to_retrieve

###############
# MAIN METHOD #
###############

# Pull database settings from settings
DATABASE = settings.DATABASES['default']['NAME']
# Connect to the sqlite db
db_connection = sqlite3.connect(DATABASE)
db_connection.row_factory = sqlite3.Row
db_cursor = db_connection.cursor()
 
THREAD_LIMIT = 20
entries_to_process = Queue.Queue(THREAD_LIMIT)
feeds_to_retrieve = grab_and_queue_feeds()

# Initialize Threads 
for n in xrange(THREAD_LIMIT):
    t = threading.Thread(target=retrieve_and_queue_entries)
    t.start()

# While threads are running or RSS entries are left in the queue...
while threading.activeCount() > 1 or not entries_to_process.empty():
    #check to see if the feed processor has finished pulling any entries. If so, process them.
    try:
        id, entries, viewpoint = entries_to_process.get(False, 1) # Wait for up to a second
    except Queue.Empty:
        continue
    
    store_entries(id, entries, viewpoint)
 
db_connection.commit()
