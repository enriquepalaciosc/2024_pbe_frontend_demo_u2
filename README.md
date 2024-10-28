# Ejemplo conexión básica entre Frontend y Backend 

El proyecto ha sido generado utilizando vite+reactjs+axios.
Para ser utilizado en el proyecto "modelos" desde programación backend, segunda unidad 2024.

Asegurarse que en settings.py del proyecto de backend tenga en listado blanco el servidor de vite:

```
CORS_ORIGIN_WHITELIST = (
    'http://localhost:3000',
    'http://localhost:5174',
    'http://localhost:5173' # añadir según corresponda
)
```
