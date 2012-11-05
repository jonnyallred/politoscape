from django.conf.urls import *
import views

urlpatterns = patterns('',
    (r'^(?P<page_name>about|act|contact|stats|team)/$', 'spectrum.views.static_page'),
    (r'^$', 'spectrum.views.index'),
    (r'^article_query/(-?\d+)/$', 'spectrum.views.article_query'),  
    (r'^article_preview/(-?\d+)/$', 'spectrum.views.article_preview'),
)
