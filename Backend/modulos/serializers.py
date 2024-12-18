from django.core.exceptions import ValidationError
from rest_framework import serializers

from .models import Estudiante, Notas, Profesor


class EstudianteSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Estudiante
        fields = '__all__'

    def delete(self, instance):
        if instance.notas_set.exists():
            raise serializers.ValidationError(
                f"El estudiante '{instance.nombre}' no puede ser eliminado porque tiene una nota asociada"
            )
        instance.delete()


class ProfesorSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Profesor
        fields = '__all__'

    def delete(self, instance):
        if instance.notas_set.exists():
            raise serializers.ValidationError(
                f"El profesor '{instance.nombre}' no puede ser eliminado porque tiene tiene una nota asociada"
            )
        instance.delete()


class NotasSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Notas
        fields = '__all__'
