from django.contrib import admin
from .models import Produce

# class ProduceInline(admin.StackedInline):
#     model = Produce
#     can_delete = False
#     verbose_name_plural = 'Produces'

admin.site.register(Produce)
