from django.db import models
from django.contrib.auth.models import User

TYPES = (
    ('USER_FOLLOWED', 'USER_FOLLOWED'),
    ('SNIPPET_CREATED', 'SNIPPET_CREATED'),
    ('PERMISSION_GRANTED', 'PERMISSION_GRANTED'),
    ('PERMISSION_REVOKED', 'PERMISSION_REVOKED'),
    ('COMMENT_CREATED', 'COMMENT_CREATED'),
    ('NEW_FOLLOWER', 'NEW_FOLLOWER'),
    ('FOLLOWER_INTERACT', 'FOLLOWER_INTERACT'),
)


class Notification(models.Model):
    user = models.ForeignKey(
        to=User, related_name='notifications', on_delete=models.CASCADE)
    is_read = models.BooleanField(default=False)
    type_of = models.CharField(choices=TYPES, max_length=20)
    title = models.CharField(max_length=128)
    identifier = models.BigIntegerField(null=True, blank=True)
    subtitle = models.CharField(max_length=256, default='')

    def __str__(self):
        return f'{self.type_of} for {self.user}'
