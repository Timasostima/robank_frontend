# Robank - Sistema de Gestión de Finanzas Personales

![Robank Logo](robank_frontend/public/Robank_Logo_Small.png)

Sistema multiplataforma para la gestión de finanzas personales, desarrollado como Trabajo de Fin de Grado para el ciclo de Desarrollo de Aplicaciones Multiplataforma.

## Componentes del Sistema

| Componente | Descripción |
|------------|-------------|
| [**Robank Android**](robank_android/) | Aplicación nativa para Android |
| [**Robank Backend**](robank_backend/) | Servidor RESTful con Spring Boot |
| [**Robank Frontend**](robank_frontend/) | Aplicación web SPA con Angular |

> [!NOTE]
> Cada componente puede funcionar de manera independiente, pero se recomienda ejecutar el sistema completo para disfrutar de todas las funcionalidades.

## Funcionalidades Principales

- **Acceso Multiplataforma**: Web y Android
- **Autenticación Segura**: Email/contraseña y Google
- **Categorización Personalizada**: Organización eficiente de gastos
- **Análisis Visual**: Gráficos para el seguimiento financiero
- **Localización**: Soporte para español e inglés
- **Modos de Visualización**: Temas claro y oscuro

## Tecnologías

- **Frontend Web**: Angular 19, TypeScript, Chart.js
- **Backend**: Spring Boot 3.2, JPA/Hibernate, PostgreSQL
- **Android**: Kotlin, Jetpack Compose, Material Design 3

## Instalación Rápida

```bash
# Clonar el repositorio con submódulos
git clone --recurse-submodules https://github.com/Timasostima/Robank.git
cd Robank

# Iniciar backend y base de datos con Docker
cd robank_backend
docker-compose up -d

# Iniciar el servidor de desarrollo frontend
cd ../robank_frontend
npm install
npm start
```

> [!TIP]
> Consulta los README individuales de cada componente para obtener instrucciones detalladas de instalación y configuración.

## Robank Frontend

![Robank Logo](robank_frontend/public/Robank_Logo_Small.png)

Aplicación web Angular para el sistema Robank de gestión de finanzas personales.

### Estructura

```
└── src/
    ├── app/
    │   ├── core/           # Servicios e interceptores
    │   ├── features/       # Módulos principales
    │   │   ├── dashboard/  # Dashboard principal
    │   │   ├── categories/ # Gestión de categorías
    │   │   ├── bills/      # Gestión de gastos
    │   │   ├── login/      # Autenticación
    │   │   └── settings/   # Preferencias
    │   ├── shared/         # Componentes reutilizables
    │   └── app.component.ts
    └── assets/             # Recursos estáticos
```

### Funcionalidades

- **Interfaz Elegante**: Diseño moderno y responsive
- **Temas**: Soporte para tema claro y oscuro
- **Dashboard Analítico**: Gráficos para análisis de gastos
- **Gestión de Gastos**: Organización por categorías
- **Autenticación**: Sistema seguro de login/registro
- **Diseño Responsive**: Enfoque mobile-first

> [!IMPORTANT]
> La aplicación requiere conexión al backend para funcionar correctamente.

### Tecnologías

- Angular 19
- Firebase Authentication
- Chart.js para visualización
- Variables CSS para temas
- Material Symbols

### Requisitos

- Node.js 18+
- NPM 8+

### Instalación

1. Clonar el repositorio
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar variables de entorno:
   ```typescript
   // environment.ts
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:8080/api',
     firebase: {
       apiKey: "TU_API_KEY",
       authDomain: "TU_AUTH_DOMAIN",
       projectId: "TU_PROJECT_ID",
       appId: "TU_APP_ID"
     }
   };
   ```
4. Iniciar servidor de desarrollo:
   ```bash
   npm start
   ```

> [!TIP]
> Para personalizar los temas, modifica las variables CSS en `src/styles.css`

> [!CAUTION]
> Asegúrate de configurar correctamente las variables de entorno para producción.

## Autor

**Tymur Kulivar Shymanskyi**
- GitHub: [Timasostima](https://github.com/Timasostima)
- Email: contact@tymurkulivar.dev

## Licencia

Este proyecto está disponible bajo la Licencia MIT.

---

*Desarrollado como Trabajo de Fin de Grado para el ciclo de Desarrollo de Aplicaciones Multiplataforma.*
