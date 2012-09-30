# Create your views here.
from django.http import HttpResponse
from spectrum.models import Story
from django.template import loader, Context, RequestContext

def index(request):
    latest_stories = Story.objects.all().order_by('-date')[:5]
    t = loader.get_template('spectrum/index.html')
    c = RequestContext (request, {
        'latest_stories': latest_stories})
    return HttpResponse(t.render(c))

def detail(request, feed_id):
    return HttpResponse("You're looking at feed %s." % feed_id)

def entries(request, feed_id):
    return HttpResponse("The feeds for feed %s." % feed_id)

def politoscape(request):
    groups = range(-7,7)
    
    latest_stories = Story.objects.all()
    grouped_stories = list()
    
    for group in groups:
        grouped_stories.append(latest_entries.filter(viewpoint=group)[:5])
        
    
    t = loader.get_template('spectrum/index.html')
    c = Context ({
        'grouped_stories': grouped_stories, 'groups' : groups, 
        'latest_stories': latest_stories})
    return HttpResponse(t.render(c))
