from rest_framework import serializers
from collection.models import *
from django.contrib.auth.models import User


class SnippetSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    hearts = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Snippet
        fields = ['id', 'owner', 'title', 'timestamp',
                  'type_of', 'link', 'collection', 'hearts']


class CollectionSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    snippets = SnippetSerializer(many=True, read_only=True)
    followers = serializers.StringRelatedField(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = ['id', 'owner', 'name', 'timestamp', 'followers',
                  'snippets', 'desc']


class UserSerializer(serializers.HyperlinkedModelSerializer):
    collections = CollectionSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'collections']
