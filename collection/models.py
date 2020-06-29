from django.db import models
from django.contrib.auth.models import User

TYPES = (
    ('podcast', 'podcast'),
    ('article', 'article'),
)

class Snippet(models.Model):
    timestamp = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    link = models.CharField(max_length=500)
    type_of = models.CharField(choices=TYPES, max_length=20)
    owner = models.ForeignKey('auth.User', related_name='snippets', on_delete=models.CASCADE)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return self.title + " by " + self.created_by
