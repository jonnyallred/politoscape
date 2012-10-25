# Create your views here.
from django.http import HttpResponse
from spectrum.models import Story
from django.template import loader, Context, TemplateDoesNotExist
from django.views.generic.simple import direct_to_template
from django.http import Http404

def index(request):
    latest_stories = Story.objects.all().order_by('-date')[:20]
    t = loader.get_template('spectrum/index.html')
    c = Context ({
        'latest_stories': latest_stories})
    return HttpResponse(t.render(c))

def article_query(request, viewpoint):
    stories = Story.objects.filter(viewpoint=viewpoint).order_by('-date')
    headline = stories[4:]
    stories = stories[:4]
    t = loader.get_template('spectrum/article-query.html')
    c = Context ({'stories' : stories})
    return HttpResponse(t.render(c))

def article_preview(request, article_id):
    story = Story.objects.get(pk=article_id)
    source = story.source
    print source.img 
    t = loader.get_template('spectrum/article-preview.html')
    c = Context ({'story' : story, 'source' : source})
    return HttpResponse(t.render(c))

def static_page(request, page_name):
    try:
        return direct_to_template(request, 'spectrum/%s.html' % (page_name,))
    except TemplateDoesNotExist:
        raise Http404
