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
    user = User.objects.filter(pk__in=pk_set)[0]
    if action == 'post_add' and instance.owner != user:
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


@receiver(post_save, sender=Comment)
def comment_created(sender, instance, created, **kwargs):
    if created and instance.owner != instance.snippet.owner:
        print('creating comment created notification...')
        Notification.objects.create(
            user=instance.snippet.owner,
            type_of='COMMENT_CREATED',
            title='New comment added',
            identifier=instance.snippet.id,
            subtitle=f'{instance.owner.username} commented on your snippet {instance.snippet.title}'
        )


@receiver(m2m_changed, sender=Profile.followers.through)
def new_follower(sender, instance, action, pk_set, **kwargs):
    if action == 'post_add':
        user = User.objects.filter(pk__in=pk_set)[0]
        Notification.objects.create(
            user=instance.user,
            type_of='NEW_FOLLOWER',
            title='An user followed you',
            identifier=user.id,
            subtitle=f'{user.username} followed you'
        )


@receiver(post_save, sender=Collection)
def follower_interact(sender, instance, created, **kwargs):
    if created:
        owner = instance.owner
        followers = owner.profile.followers.all()
        for user in followers:
            Notification.objects.create(
                user=user,
                type_of='FOLLOWER_INTERACT',
                title='New collection from someone you follow',
                identifier=instance.id,
                subtitle=f'{owner.username} created a new collection {instance.name}'
            )
