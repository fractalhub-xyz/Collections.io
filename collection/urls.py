from django.urls import path, include
from collection import views
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views as auth

router = DefaultRouter()
router.register(r'snippets', views.SnippetViewSet)
router.register(r'collections', views.CollectionViewSet,
                basename="collections")
router.register(r'users', views.UserViewSet)

urlpatterns = [
    path('snippets/<int:snip_id>/heart', views.HeartSnippetView.as_view()),
    path('collections/<int:coll_id>/follow',
         views.FollowCollectionView.as_view()),
    path('collections/<int:coll_id>/tags',
         views.TagsToCollection.as_view()),
    path('collections/followed', views.FollowedCollectionViewset.as_view()),
    path('collections/popular', views.PopularCollectionViewset.as_view()),
    path('tags', views.AllTagsView.as_view()),
    path('tag/<str:tag_name>', views.CollectionsForTagViewset.as_view()),
    path('search', views.search_view),
    path('login', auth.obtain_auth_token),
    path('logout', views.logout_view),
    path('register', views.UserCreateAPIView.as_view()),
    path('', include(router.urls))
]
