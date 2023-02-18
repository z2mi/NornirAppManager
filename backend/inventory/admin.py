from django.contrib import admin
from .models import SqlGroup, SqlHost, SqlSecret
#from rest_framework.authtoken.admin import TokenAdmin
#from rest_framework.authtoken.models import Token
# Register your models here.

class SqlGroupAdmin(admin.ModelAdmin):
    list = ( 'name')

class SqlHostAdmin(admin.ModelAdmin):
    list = ( 'hostname', 'host', 'port', 'platform', 'transport', 'secret')

class SqlSecretAdmin(admin.ModelAdmin):
    list = ( 'name', 'username' )

#TokenAdmin.raw_id_fields = ['user']

admin.site.register(SqlGroup, SqlGroupAdmin)
admin.site.register(SqlHost, SqlHostAdmin)
admin.site.register(SqlSecret, SqlSecretAdmin)
#admin.site.register(Token, TokenAdmin )

