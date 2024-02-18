from django.db import models

# Create your models here.

class JD(models.Model):
    desc = models.CharField(max_length=20000)
    nCV = models.IntegerField(default = 3)

