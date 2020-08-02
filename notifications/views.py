from django.shortcuts import render

from notifications.serializers import *
from notifications.models import *

from rest_framework import permissions
from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from collection.permissions import IsOwnerOrReadOnly


class AllNotificationsView(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = NotificationSerialiser

    def get_queryset(self):
        user = self.request.user
        return user.notifications.all()


class ReadNotificationView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]

    def post(self, request, id):
        try:
            notif = Notification.objects.get(id=id)
        except:
            return Response({'error': 'Not Found'}, status=status.HTTP_404_NOT_FOUND)

        notif.is_read = True
        notif.save()

        return Response({'success': True}, status=status.HTTP_200_OK)
