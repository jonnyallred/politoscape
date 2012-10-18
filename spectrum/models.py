from django.db import models
from django.contrib import admin
# Create your models here.

class Topic(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    
    def __unicode__(self):
        return "%s - %s" % (self.title, self.description)

class Source(models.Model):
    url = models.URLField()
    name = models.CharField(max_length=255)
    short_name = models.CharField(max_length=255, null=True, blank=True)
    viewpoint = models.IntegerField()
    img = models.URLField(null=True, blank=True)
    logo = models.URLField(null=True, blank=True)

    def __unicode__(self):
        return self.name

    
class Story(models.Model):
    url = models.URLField()
    topic = models.ForeignKey(Topic, null=True, blank=True)
    title = models.CharField(max_length=255)
    source = models.ForeignKey(Source)
    viewpoint = models.IntegerField(default=0)
    quality = models.IntegerField(default=0)
    img = models.URLField(null=True, blank=True)
    date = models.DateTimeField()
    content = models.TextField()
    
    def __unicode__(self):
        return "%s (%s)" % (self.title, self.source.name)
    
class StoryAdmin(admin.ModelAdmin):
    pass
class SourceAdmin(admin.ModelAdmin):
    pass
admin.site.register(Story, StoryAdmin)
admin.site.register(Source, SourceAdmin)

