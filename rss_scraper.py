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
from politoscape import settings
import csv
import imgscrape
import datetime
import cStringIO
import codecs
import feedparser     # available at http://code.google.com/p/feedparser/



class FeedSet:
    feeds = list()
    def __init__(self, feeds):
        self.feeds = feeds
    
    @classmethod
    def from_csv(self, feeds_csv_filename):
        with open(feeds_csv_filename, 'rb') as feed_csv:
            feed_reader = csv.DictReader(feed_csv)
            feeds = list()
            for feed in feed_reader:
                feeds.append(feed)
        return self(feeds)

class UnicodeWriter:
    """
    A CSV writer which will write rows to CSV file "f",
    which is encoded in the given encoding.
    """

    def __init__(self, f, dialect=csv.excel, encoding="utf-8", **kwds):
        # Redirect output to a queue
        self.queue = cStringIO.StringIO()
        self.writer = csv.writer(self.queue, dialect=dialect, **kwds)
        self.stream = f
        self.encoder = codecs.getincrementalencoder(encoding)()

    def writerow(self, row):
        self.writer.writerow([s.encode("utf-8") for s in row])
        # Fetch UTF-8 output from the queue ...
        data = self.queue.getvalue()
        data = data.decode("utf-8")
        # ... and reencode it into the target encoding
        data = self.encoder.encode(data)
        # write to the target stream
        self.stream.write(data)
        # empty queue
        self.queue.truncate(0)

    def writerows(self, rows):
        for row in rows:
            self.writerow(row)

class RssScraper:
    
    
    def __init__(self, feeds_csv_filename, out_file, THREAD_LIMIT = 20):
        self.feeds = FeedSet.from_csv(feeds_csv_filename).feeds
        self.feeds_to_retrieve = self.grab_and_queue_feeds()
        self.entries_to_process = Queue.Queue(THREAD_LIMIT)
        self.THREAD_LIMIT = THREAD_LIMIT
        try:
            out = open(out_file,'wb')
            self.csv_out_file = UnicodeWriter(out, quoting=csv.QUOTE_NONNUMERIC)
        except:
            exit
    
    def scrape(self):
        # Initialize Threads 
        for n in xrange(self.THREAD_LIMIT):
            t = threading.Thread(target=self.retrieve_and_queue_entries)
            t.start()
    
        # While threads are running or RSS entries are left in the queue...
        while threading.activeCount() > 1 or not self.entries_to_process.empty():
            #check to see if the feed processor has finished pulling any entries. If so, process them.
            try:
                id, entries, viewpoint = self.entries_to_process.get(False, 1) # Wait for up to a second
            except Queue.Empty:
                continue
            
            self.write_entries(id, entries, viewpoint)
    
    def retrieve_and_queue_entries(self):
        """ Get rss entries and queue them for processing """
        while True:
            try:
                id, url, viewpoint = self.feeds_to_retrieve.get(False) # False = Don't wait
            except Queue.Empty:
                return
            entries = feedparser.parse(url).entries
            self.entries_to_process.put((id, entries, viewpoint), True) # This will block if full
            
    def grab_and_queue_feeds(self):
        feeds_to_retrieve = Queue.Queue() #infinite size queue
        
        # Queue up the feeds 
        for feed in self.feeds: 
            feeds_to_retrieve.put([feed['id'], feed['url'], feed['viewpoint']])    
        return feeds_to_retrieve
    
    def write_entries(self, id, entries, score=0):
        """ Takes a feed_id and a list of feed entries and stores them"""
        for entry in entries:
            try:
                                #id, url, topic_id, title, source_id, viewpoint, quality
                self.csv_out_file.writerow(('',entry.link, '', entry.title, id, score, str(0), 
                                #img, date
                                "", strftime("%Y-%m-%d %H:%M:%S",entry.updated_parsed), 
                                #content
                                str(entry.summary),))
            except UnicodeError:
                #TODO
                pass


###############
# MAIN METHOD #
###############
    
                 
        
         
if __name__ == '__main__':
    feed_file = 'spectrum_source.csv'
    out_file = 'stories %s.csv' % datetime.datetime.now().strftime('%Y.%m.%d %H.%M')
    scraper = RssScraper(feed_file, out_file, 20)
    scraper.scrape()
  
        
    
    
