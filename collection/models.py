from django.db import models
from django.contrib.auth.models import User

TYPES = (
    ('podcast', 'podcast'),
    ('article', 'article'),
)


class Collection(models.Model):
    owner = models.ForeignKey(
        User, related_name='collections', on_delete=models.CASCADE)
    name = models.CharField(max_length=300)
    timestamp = models.DateTimeField(auto_now_add=True)


class Snippet(models.Model):
    collection = models.ForeignKey(
        Collection, on_delete=models.CASCADE, related_name="snippets")
    timestamp = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    link = models.CharField(max_length=500)
    type_of = models.CharField(choices=TYPES, max_length=20)
    owner = models.ForeignKey(
        'auth.User', related_name='snippets', on_delete=models.CASCADE)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return self.title + " by " + self.created_by
