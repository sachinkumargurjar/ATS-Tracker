# Generated by Django 5.0.2 on 2024-02-18 06:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_jd_delete_student'),
    ]

    operations = [
        migrations.AddField(
            model_name='jd',
            name='nCV',
            field=models.IntegerField(default=3),
        ),
    ]