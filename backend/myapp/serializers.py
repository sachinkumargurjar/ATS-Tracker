from rest_framework import serializers
from .models import *

class FileUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    class Meta:
        fields = ['file_uploaded']

class JDSeriallizer(serializers.Serializer):
    class Meta:
        model = JD
        fields = '__all__'