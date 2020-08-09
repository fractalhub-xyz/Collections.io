from django.db import models
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


SNIPPET_TYPES = (
    ('podcast', 'podcast'),
    ('article', 'article'),
)

COLLECTION_PERMISSIONS = (
    ('all', 'all'),
    ('none', 'none'),
    ('selective', 'selective'),
)

COLLECTION_VISIBILITY = (
    ('public', 'public'),
    ('private', 'private')
)


class Tag(models.Model):
    name = models.CharField(max_length=10, primary_key=True)
    image_urls = models.CharField(max_length=2000, default='')

    def __str__(self):
        return self.name


class Collection(models.Model):
    owner = models.ForeignKey(
        User, related_name='collections', on_delete=models.CASCADE)
    followers = models.ManyToManyField(
        User, related_name="followed_collections")
    tags = models.ManyToManyField(Tag, related_name="collections")
    name = models.CharField(max_length=300)
    timestamp = models.DateTimeField(auto_now_add=True)
    desc = models.CharField(max_length=500, default=" ")

    permission = models.CharField(
        max_length=20, choices=COLLECTION_PERMISSIONS, default="none")
    allowed_users = models.ManyToManyField(
        User, related_name='allowed_collections')
    visibility = models.CharField(
        max_length=20, choices=COLLECTION_VISIBILITY, default="public")
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Snippet(models.Model):
    collection = models.ForeignKey(
        Collection, on_delete=models.CASCADE, related_name="snippets")
    hearts = models.ManyToManyField(User, related_name="hearted_snippets")
    timestamp = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    link = models.CharField(max_length=500)
    type_of = models.CharField(choices=SNIPPET_TYPES, max_length=20)
    owner = models.ForeignKey(
        'auth.User', related_name='snippets', on_delete=models.CASCADE)

    class Meta:
        ordering = ['timestamp']

    def __str__(self):
        return self.title
