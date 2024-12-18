from rest_framework import status, viewsets
from rest_framework.response import Response

from .models import Estudiante, Notas, Profesor
from .serializers import (EstudianteSerializer, NotasSerializer,
                          ProfesorSerializer)


class EstudianteViewSet(viewsets.ModelViewSet):
    queryset = Estudiante.objects.all()
    serializer_class = EstudianteSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.notas_set.exists():
            return Response(
                {"error": f"El estudiante '{instance.nombre}' no puede ser eliminado porque tiene notas asociadas."},
                status=status.HTTP_400_BAD_REQUEST
            )
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class ProfesorViewSet(viewsets.ModelViewSet):
    queryset = Profesor.objects.all()
    serializer_class = ProfesorSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.notas_set.exists():
            return Response(
                {"error": f"El profesor '{instance.nombre}' no puede ser eliminado porque tiene notas asociadas."},
                status=status.HTTP_400_BAD_REQUEST
            )
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class NotasViewSet(viewsets.ModelViewSet):
    queryset = Notas.objects.all()
    serializer_class = NotasSerializer
