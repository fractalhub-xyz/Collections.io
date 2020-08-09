from django.urls import path, include
from collection.views.collection_views import *
from collection.views.snippet_views import *
from collection.views.tag_views import *
from collection.views.other_views import *

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as auth

router = DefaultRouter()
router.register(r'snippets', SnippetViewSet)
router.register(r'collections', CollectionViewSet,
                basename="collections")
router.register(r'users', UserViewSet)

urlpatterns = [
    path('snippets/<int:snip_id>/heart', HeartSnippetView.as_view()),
    path('collections/<int:coll_id>/follow',
         FollowCollectionView.as_view()),
    path('collections/<int:coll_id>/tags',
         TagsToCollection.as_view()),
    path('collections/followed', FollowedCollectionViewset.as_view()),
    path('collections/popular', PopularCollectionViewset.as_view()),
    path('tags', AllTagsView.as_view()),
    path('tag/<str:tag_name>', CollectionsForTagViewset.as_view()),
    path('search', search_view),
    path('login', auth.obtain_auth_token),
    path('logout', logout_view),
    path('register', UserCreateAPIView.as_view()),
    path('', include(router.urls))
]
