from django.urls import path

from notifications.views import *

urlpatterns = [
    path('notifications/all', AllNotificationsView.as_view()),
    path('notification/<int:id>/read', ReadNotificationView.as_view())
]
