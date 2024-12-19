# Prueba- Tecnica

Este proyecto es una aplicación donde se realiza 3 modulos el cual cada uno tiene un CRUD que utiliza Django restframework como backend y React como frontend. El entorno del proyecto está gestionado con Docker para facilitar la configuración y ejecución.

![image](https://github.com/user-attachments/assets/bfa30a98-500b-485c-b461-84ceff61b5f6)


## Estructura del Proyecto

- **Backend**: Django restframework
- **Frontend**: React
- **Contenedor**: Docker
- **Base de Datos**: PostgreSQL

# Proyecto de Inventario

Este proyecto es una aplicación de inventario que utiliza Django como backend y React como frontend. El entorno del proyecto está gestionado con Docker para facilitar la configuración y ejecución.

## Estructura del Proyecto

- **Backend**: Django restframework
- **Frontend**: React
- **Contenedor**: Docker
- **Base de Datos**: PostgreSQL

## Árbol de Directorios

```plaintext
.
Prueba-Tecnica
│   .gitignore
│   docker-compose.yml
|   README.md
│   
├───Backend
│   │   .gitignore
│   │   Dockerfile
│   │   entrypoint.sh
│   │   manage.py
│   │   requirements.txt
│   │   
│   ├───config
│   │       asgi.py
│   │       settings.py
│   │       urls.py
│   │       wsgi.py
│   │       __init__.py
│   │
│   └───modulos
│       │   admin.py
│       │   apps.py
│       │   models.py
│       │   serializers.py
│       │   tests.py
│       │   views.py
│       │   __init__.py
│       │
│       └───migrations
│               0001_initial.py
│               __init__.py
│
└───Frontend
    │   Dockerfile
    │   package-lock.json
    │   package.json
    │   yarn.lock
    │
    ├───public
    │       favicon.ico
    │       index.html
    │       logo192.png
    │       logo512.png
    │       manifest.json
    │       robots.txt
    │
    └───src
        │   App.css
        │   App.js
        │   index.css
        │   index.js
        │   logo.svg
        │   reportWebVitals.js
        │   setupTests.js
        │
        └───components
            ├───Navbar
            │       Navbar.css
            │       Navbar.js
            │
            ├───Notas
            │       AddNotas.js
            │       DeleteNotas.js
            │       Inventario.css
            │       Notas.js
            │       TablaNotas.js
            │       UpdateNotas.js
            │
            ├───Students
            │       AddStudents.js
            │       DeleteStuden.js
            │       Productos.css
            │       Students.js
            │       TablaStudents.js
            │       UpdateStudents.js
            │
            └───Teachers
                    AddTeachers.js
                    DeleteTeachers.js
                    Inventario.css
                    TablaTeachers.js
                    Teachers.js
                    UpdateTeachers.js
```
## Requisitos

Para ejecutar este proyecto localmente, necesitarás tener instalado:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Configuración y Ejecución

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Construye y ejecuta los contenedores:**

    ```bash
    docker-compose up --build
    ```

   Este comando construye las imágenes de Docker para el backend y el frontend, y luego inicia los contenedores.

2. **Accede a la aplicación:**

    - **Frontend**: [http://localhost:3000](http://localhost:3000)
    - **Backend (Django restframewor)**: [http://localhost:9000](http://localhost:9000)

    Puedes usar estas URLs para interactuar con la aplicación y el panel de las apis con django y validar que esten funcionando correctamente

3. **Parar los contenedores:**

    Para detener los contenedores, usa:

    ```bash
    docker-compose down
    ```

## Scripts Disponibles

En el contenedor de frontend (React), puedes ejecutar los siguientes scripts:

- **`npm start`**: Inicia la aplicación en modo desarrollo. Abre [http://localhost:3000](http://localhost:3000) en tu navegador para verla en acción.
- **`npm test`**: Ejecuta el test runner en modo interactivo.
- **`npm run build`**: Construye la aplicación para producción. Los archivos generados estarán en el directorio `build`.
- **`npm run eject`**: Expone la configuración de build para personalizarla (es una operación irreversible).

## Información Adicional

- **Documentación de Create React App**: [Create React App Docs](https://facebook.github.io/create-react-app/docs/getting-started)
- **Documentación de React**: [React Docs](https://reactjs.org/)
- **Documentación de Django**: [Django Docs](https://docs.djangoproject.com/)

## Contribución

Si deseas contribuir a este proyecto, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/tu-feature`).
3. Realiza tus cambios y haz un commit (`git commit -am 'Añadir nueva feature'`).
4. Envía tus cambios a tu fork (`git push origin feature/tu-feature`).
5. Crea un pull request en el repositorio original.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
