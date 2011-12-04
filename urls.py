from django.conf.urls.defaults import patterns, include, url
from django.conf import settings
import os

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^aggregator/$', 'rss.views.index'),
    url(r'^aggregator/(?P<feed_id>\d+)/$', 'rss.views.detail'),
    url(r'^aggregator/(?P<feed_id>\d+)/entries/$', 'rss.views.entries'),
    url(r'^politoscape/$', 'rss.views.politoscape'),
    url(r'^politoscape/static/(?P<path>.*)$', 'django.views.static.serve',
        {'document_root': os.path.join(settings.SITE_ROOT, "rss", "static")}),
    # Examples:
    # url(r'^$', 'SpectrumAggregator.views.home', name='home'),
    # url(r'^SpectrumAggregator/', include('SpectrumAggregator.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    
)
