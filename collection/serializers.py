from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, CurrentUserDefault
from .models import *


class CollectionSerializer(ModelSerializer):
    created_by = PrimaryKeyRelatedField(
        read_only=True, default=CurrentUserDefault())

    class Meta:
        model = Collection
        fields = '__all__'
