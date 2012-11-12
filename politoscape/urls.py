from django.conf.urls.defaults import patterns, include
from django.contrib import admin
from django.http import HttpResponseRedirect

admin.autodiscover()

urlpatterns = patterns('',
    (r'^spectrum/', include('spectrum.urls')),
    (r'^(?P<page_name>about|act|contact|stats|team)/$', 'spectrum.views.static_page'),
    (r'^$',  lambda x: HttpResponseRedirect('/spectrum/')),
    # Example:
    # (r'^politoscape/', include('politoscape.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # (r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    (r'^admin/', include(admin.site.urls)),

)

