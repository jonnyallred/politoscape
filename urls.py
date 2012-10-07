from django.conf.urls.defaults import *
from django.contrib import admin
admin.autodiscover()

# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    (r'^spectrum/', include('politoscape.spectrum.urls')),
    (r'^(?P<page_name>about|act|contact|stats|team)/$', 'spectrum.views.static_page'),
    # Example:
    # (r'^politoscape/', include('politoscape.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),

)
