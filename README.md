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


Aplicación web Angular para el sistema Robank de gestión de finanzas personales.

## 📱 Características

- **Diseño moderno y responsive**: Interfaz adaptada a todos los dispositivos
- **Tema claro/oscuro**: Personalización visual mediante variables CSS
- **Dashboard analítico**: Visualización de gastos con gráficos interactivos
- **Categorización de gastos**: Organización personalizable
- **Gestión de metas financieras**: Seguimiento de objetivos con indicadores visuales
- **Autenticación segura**: Login/registro con email y Google vía Firebase
- **Localización**: Soporte para español e inglés

## 🛠️ Tecnologías

- **Angular 19**: Framework principal con soporte para componentes standalone
- **TypeScript**: Tipado estático para desarrollo robusto
- **Chart.js**: Visualización de datos financieros
- **Firebase Authentication**: Gestión segura de usuarios
- **CSS Variables**: Sistema de temas personalizable
- **Material Symbols & Font Awesome**: Iconografía moderna

## 🚀 Instalación

### Prerrequisitos

- Node.js 18+
- NPM 8+
- Backend Robank en ejecución

### Pasos para desarrollo local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/Timasostima/robank_frontend.git
   cd robank_frontend
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   Crear/editar `src/environments/environment.ts`:
   ```typescript
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
   La aplicación estará disponible en `http://localhost:4200/`

## 📂 Estructura del proyecto

```
robank_frontend/
├── public/                  # Recursos públicos estáticos
├── src/                     # Código fuente principal
│   ├── app/                 # Componentes de la aplicación
│   │   ├── core/            # Servicios, guardias, entornos, etc.
│   │   ├── features/        # Módulos y componentes de características
│   │   ├── shared/          # Componentes compartidos
│   ├── index.html           # Página HTML principal
│   ├── main.ts              # Punto de entrada
│   └── styles.css           # Estilos globales
```

## 📱 Interfaz de Usuario

- **Landing Page**: Presentación de características con secciones responsive
- **Dashboard**: Panel central con acceso rápido a funcionalidades
- **Bills**: Visualización temporal de gastos con gráficos
- **Goals**: Seguimiento visual de objetivos financieros
- **Settings**: Personalización de preferencias y perfil

## ⚠️ Consideraciones importantes

- La aplicación requiere conexión al backend Robank para funcionalidad completa
- Es necesario configurar correctamente las claves de Firebase para autenticación

## 👨‍💻 Autor

**Tymur Kulivar Shymanskyi**
- GitHub: [Timasostima](https://github.com/Timasostima)
- Email: contact@tymurkulivar.dev

---

*Desarrollado como Trabajo de Fin de Grado para el ciclo de Desarrollo de Aplicaciones Multiplataforma.*
