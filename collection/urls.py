from django.urls import path, include
from collection.views.collection_views import *
from collection.views.snippet_views import *
from collection.views.tag_views import *
from collection.views.other_views import *
from collection.views.user_views import *

from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as auth

router = DefaultRouter()
router.register(r'snippets', SnippetViewSet)
router.register(r'collections', CollectionViewSet,
                basename="collections")
router.register(r'users', UserViewSet)
router.register(r'comments', CommentViewSet)

urlpatterns = [
    # Snippets
    path('snippets/<int:snip_id>/heart', HeartSnippetView.as_view()),
    path('comments/<int:comment_id>/upvote', UpvoteCommentView.as_view()),
    path('snippets/<int:snip_id>/comments', SnippetCommentListView.as_view()),
    path('snippets/popular', PopularSnippetViewset.as_view()),
    # Collections
    path('collections/<int:coll_id>/follow',
         FollowCollectionView.as_view()),
    path('users/<str:username>/follow', FollowUserView.as_view()),
    path('collections/<int:coll_id>/tags',
         TagsToCollection.as_view()),
    path('collections/<int:coll_id>/settings', CollectionOwnerView.as_view()),
    path('collections/followed', FollowedCollectionViewset.as_view()),
    path('collections/popular', PopularCollectionViewset.as_view()),
    # Tags
    path('tags', AllTagsView.as_view()),
    path('tags/random', RandomTagView.as_view()),
    path('tag/<str:tag_name>', CollectionsForTagViewset.as_view()),
    # Others
    path('search', search_view),
    path('login', auth.obtain_auth_token),
    path('logout', logout_view),
    path('register', UserCreateAPIView.as_view()),
    path('', include(router.urls))
]
