'''
Created on Nov 27, 2011

@author: Jonathan
'''
from SpectrumAggregator.rss.models import Entry, Feed
from django.contrib import admin

admin.site.register(Entry)
admin.site.register(Feed)