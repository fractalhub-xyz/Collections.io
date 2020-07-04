from rest_framework import serializers
from collection.models import *
from django.contrib.auth.models import User


class SnippetSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Snippet
        fields = ['id', 'owner', 'title', 'timestamp',
                  'type_of', 'link', 'collection']


class CollectionSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    snippets = SnippetSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = ['id', 'owner', 'name', 'timestamp', 'snippets']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    snippets = SnippetSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'snippets']
