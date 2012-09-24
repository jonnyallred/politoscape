from django.db import models

# Create your models here.

class Topic(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(null=True, blank=True)
    
    def __unicode__(self):
        return "%s - %s" % (self.title, self.description)

class Source(models.Model):
    url = models.URLField()
    name = models.CharField(max_length=255)

    def __unicode__(self):
        return self.name

    
class Story(models.Model):
    url = models.URLField()
    topic = models.ForeignKey(Topic)
    title = models.CharField(max_length=255)
    source = models.ForeignKey(Source)
    viewpoint = models.IntegerField()
    quality = models.IntegerField()
    img = models.URLField()
    date = models.DateField()
    
    def __unicode__(self):
        return "%s (%s)" % (self.title, self.source.name)
    