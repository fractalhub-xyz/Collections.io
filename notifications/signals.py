from django.db.models.signals import post_save, m2m_changed
from django.dispatch import receiver
# Models
from django.contrib.auth.models import User
from collection.models import *
from notifications.models import *


@receiver(post_save, sender=Snippet)
def snippet_created(sender, instance, created, **kwargs):
    if created and instance.owner != instance.collection.owner:
        print('creating snip created notification...')
        Notification.objects.create(
            user=instance.collection.owner,
            type_of='SNIPPET_CREATED',
            title='New snippet added',
            subtitle=f'{instance.owner.username} added a new snippet to {instance.collection.name}'
        )


@receiver(m2m_changed, sender=Collection.followers.through)
def user_followed(sender, instance, action, pk_set, **kwargs):
    if action == 'post_add':
        user = User.objects.filter(pk__in=pk_set)[0]
        Notification.objects.create(
            user=instance.owner,
            type_of='USER_FOLLOWED',
            title='New user follow',
            subtitle=f'{user.username} followed your collection {instance.name}'
        )
