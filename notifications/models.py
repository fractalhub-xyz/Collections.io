from django.db import models
from django.contrib.auth.models import User

TYPES = (
    ('USER_FOLLOWED', 'USER_FOLLOWED'),
    ('SNIPPET_CREATED', 'SNIPPET_CREATED'),
)


class Notification(models.Model):
    user = models.ForeignKey(
        to=User, related_name='notifications', on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
    type_of = models.CharField(choices=TYPES, max_length=20)
    title = models.CharField(max_length=128)
    subtitle = models.CharField(max_length=256)
