from django.db import models

# Create your models here.
class Feed(models.Model):
    url = models.URLField()
    name = models.CharField(max_length=255)
    
class Entry(models.Model):
    feed = models.ForeignKey(Feed)
    content = models.TextField()
    date = models.DateTimeField()
    url = models.URLField()
    title = models.CharField(max_length=255)
    