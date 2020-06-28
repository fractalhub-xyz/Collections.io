from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField, CurrentUserDefault
from .models import *


class CollectionSerializer(ModelSerializer):
    created_by = PrimaryKeyRelatedField(
        read_only=True)

    class Meta:
        model = Collection
        fields = '__all__'
        read_only_fields = ['created_by']
