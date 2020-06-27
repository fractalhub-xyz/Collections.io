from django.db import models
from django.contrib.auth.models import User

TYPES = (
    ('P', 'Podcasts'),
    ('A', 'Articles'),
)


class Collection(models.Model):
    title = models.CharField(max_length=100)
    link = models.CharField(max_length=500)
    type_of = models.CharField(max_length=20, options=TYPES)
    created_by = models.OneToOneField(
        User, to_field='username', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)
