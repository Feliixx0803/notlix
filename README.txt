NOTLIX
Aplicación full-stack de gestión de notas y tareas personales.
Demo en vivo: https://notlix.vercel.app

Frontend: Angular 16, SCSS, Angular Material.

Backend: Java 17, Spring Boot 3, Spring Security, Spring Data JPA.

Base de Datos: MySQL 8.

Infraestructura: Docker y Docker Compose.

En cuanto al despliegue:
-Frontend: Alojado en Vercel de forma estática.
-Backend: Corre sobre Render leyendo directamente el Dockerfile del repositorio.
-Base de Datos: Aiven Cloud

NOTA IMPORTANTE: Al estar desplegado en servidores gratuitos, el backend en Render entra en suspensión tras 15 minutos de inactividad. La primera petición (login o registro) puede tardar unos 45 segundos en responder mientras se levanta el contenedor. Una vez activo, el rendimiento es normal