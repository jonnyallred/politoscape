from django.conf.urls.defaults import *
from spectrum import views

urlpatterns = patterns('',
    (r'^$', 'politoscape.spectrum.views.index'),  
)
