
from django.urls import path, include
from rest_framework import routers
from .views import UploadViewSet, GetRelevantCvAPI

router = routers.DefaultRouter()
router.register('upload', UploadViewSet, basename="upload")

# Wire up our API using automatic URL routing.
urlpatterns = [
    path('', include(router.urls)),
    path('relevantCV', GetRelevantCvAPI.as_view())
]