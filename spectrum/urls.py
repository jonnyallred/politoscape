from django.conf.urls.defaults import *
from spectrum import views

urlpatterns = patterns('',
    (r'^$', 'politoscape.spectrum.views.index'),
    (r'^article_query/(-?\d+)/$', 'politoscape.spectrum.views.article_query'),  
    (r'^article_preview/(-?\d+)/$', 'spectrum.views.article_preview'),
)
