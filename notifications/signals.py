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
            identifier=instance.collection.id,
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
            identifier=instance.id,
            subtitle=f'{user.username} followed your collection {instance.name}'
        )


@receiver(m2m_changed, sender=Collection.allowed_users.through)
def permission_granted(sender, instance, action, pk_set, **kwargs):
    if action == 'post_add':
        user = User.objects.filter(pk__in=pk_set)[0]
        Notification.objects.create(
            user=user,
            type_of='PERMISSION_GRANTED',
            title='You got permission',
            identifier=instance.id,
            subtitle=f'You got access to collection {instance.name}'
        )


@receiver(m2m_changed, sender=Collection.allowed_users.through)
def permission_revoked(sender, instance, action, pk_set, **kwargs):
    if action == 'post_remove':
        user = User.objects.filter(pk__in=pk_set)[0]
        Notification.objects.create(
            user=user,
            type_of='PERMISSION_REVOKED',
            title='You got kicked off',
            identifier=instance.id,
            subtitle=f'Your access to collection {instance.name} was revoked'
        )
