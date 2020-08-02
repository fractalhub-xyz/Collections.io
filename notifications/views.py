from django.shortcuts import render

from notifications.serializers import *
from notifications.models import *

from rest_framework import permissions
from rest_framework import generics


class UnreadNotificationsView(generics.ListAPIView):
    permissions_classes = [permissions.IsAuthenticated]
    serializer_class = NotificationSerialiser

    def get_queryset(self):
        user = self.request.user
        return user.notifications.filter(is_read=False)
