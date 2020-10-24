from .models import Profile
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from avatar.main import generate_unique_identicon, generate_random_identicon


@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        avatar = generate_unique_identicon(instance.username)
        Profile.objects.create(user=instance, avatar_in_base64=avatar)
