from rest_framework import serializers
from notifications.models import *


class NotificationSerialiser(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Notification
        fields = '__all__'
