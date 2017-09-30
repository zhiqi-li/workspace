# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-05 15:31
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('books', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='author',
            old_name='lase_name',
            new_name='last_name',
        ),
        migrations.RenameField(
            model_name='publisher',
            old_name='addres',
            new_name='address',
        ),
        migrations.AlterField(
            model_name='author',
            name='email',
            field=models.EmailField(blank=True, max_length=254),
        ),
    ]
