# Create your views here.
from django.http import HttpResponse
from rss.models import Feed, Entry
from django.template import loader, Context

def index(request):
    latest_entries = Entry.objects.all().order_by('-date')[:5]
    t = loader.get_template('rss/index.html')
    c = Context ({
        'latest_entries': latest_entries})
    return HttpResponse(t.render(c))

def detail(request, feed_id):
    return HttpResponse("You're looking at feed %s." % feed_id)

def entries(request, feed_id):
    return HttpResponse("The feeds for feed %s." % feed_id)

def politoscape(request):
    latest_entries = Entry.objects.all().order_by('-date')[:5]
    t = loader.get_template('rss/political_index.html')
    c = Context ({
        'latest_entries': latest_entries})
    return HttpResponse(t.render(c))
