from rest_framework.serializers import ModelSerializer
from .models import *


class CollectionSerializer(ModelSerializer):
    class Meta:
        model = Collection
        fields = '__all__'
