# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, IndividualProfile, FarmProfile, OrganizationProfile

class IndividualProfileInline(admin.StackedInline):
    model = IndividualProfile
    can_delete = False
    verbose_name_plural = 'Individual Profile'

class FarmProfileInline(admin.StackedInline):
    model = FarmProfile
    can_delete = False
    verbose_name_plural = 'Farm Profile'

class OrganizationProfileInline(admin.StackedInline):
    model = OrganizationProfile
    can_delete = False
    verbose_name_plural = 'Organization Profile'

    # admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, IndividualProfile, FarmProfile, OrganizationProfile

class IndividualProfileInline(admin.StackedInline):
    model = IndividualProfile
    can_delete = False
    verbose_name_plural = 'Individual Profile'

class FarmProfileInline(admin.StackedInline):
    model = FarmProfile
    can_delete = False
    verbose_name_plural = 'Farm Profile'

class OrganizationProfileInline(admin.StackedInline):
    model = OrganizationProfile
    can_delete = False
    verbose_name_plural = 'Organization Profile'

class UserAdmin(BaseUserAdmin):
    model = User
    list_display = ('email', 'user_type', 'is_staff', 'is_active')
    list_filter = ('user_type', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password', 'user_type')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Dates', {'fields': ('date_joined',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'user_type', 'is_staff', 'is_active'),
        }),
    )
    search_fields = ('email',)
    ordering = ('email',)

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return []
        inlines = []
        if obj.user_type == User.INDIVIDUAL:
            inlines.append(IndividualProfileInline(self.model, self.admin_site))
        elif obj.user_type == User.FARM:
            inlines.append(FarmProfileInline(self.model, self.admin_site))
        elif obj.user_type == User.ORGANIZATION:
            inlines.append(OrganizationProfileInline(self.model, self.admin_site))
        return inlines

admin.site.register(User, UserAdmin)
# Optionally, you can register the profile models too if you want to manage them separately.
admin.site.register(IndividualProfile)
admin.site.register(FarmProfile)
admin.site.register(OrganizationProfile)
