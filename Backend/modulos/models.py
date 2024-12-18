from django.db import models


class Estudiante(models.Model):
    nombre = models.CharField(max_length=256, null=False)

    def __str__(self):
        return self.nombre

class Profesor(models.Model):
    nombre = models.CharField(max_length=256, null=False)

    def __str__(self):
        return self.nombre

class Notas(models.Model):
    nombre = models.CharField(max_length=256)
    estudiante = models.ForeignKey(Estudiante, on_delete=models.CASCADE, null=False)
    profesor = models.ForeignKey(Profesor, on_delete=models.CASCADE, null=False)
    nota = models.DecimalField(max_digits=10, decimal_places=1)

    def __str__(self):
        return f"{self.nombre} - {self.estudiante} - {self.profesor}"
