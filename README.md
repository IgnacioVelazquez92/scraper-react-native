````
# IV Scaner (App de Escaneo de Precios)

`IV Scaner` es una aplicación móvil desarrollada con **React Native (Expo)** que permite a los usuarios escanear códigos de barras (EAN) de productos y obtener una comparativa de precios en tiempo real, consultando la API de **Precios Claros** para sucursales específicas en Tucumán.

La aplicación está diseñada para un uso interno, permitiendo al usuario seleccionar su sucursal y luego escanear productos para ver los precios de la competencia.

## 🚀 Características Principales

* **Selección de Sucursal:** El usuario debe seleccionar su sucursal actual ('CORRIENTES', 'BELGRANO', 'SANTIAGO', '9 DE JULIO') antes de comenzar a escanear.
* **Escaneo de Códigos de Barras:** Utiliza `expo-camera` para escanear rápidamente códigos EAN-13, EAN-8 y UPC-E.
* **Confirmación de EAN:** Permite al usuario verificar y/o editar manualmente el código EAN detectado antes de realizar la consulta.
* **Consulta a API de Precios Claros:** Se conecta al servicio de Precios Claros para obtener un listado de precios del producto en las sucursales de la competencia predefinidas en Tucumán.
* **Visualización de Resultados:** Muestra el nombre del producto, su imagen (si está disponible), y los precios **mínimo** y **máximo** encontrados.
* **Detalle de Competencia:** Permite desplegar un listado detallado de qué sucursal de la competencia tiene qué precio.
* **Historial Local:** Guarda un registro de los productos escaneados durante el día en la sucursal seleccionada, utilizando `AsyncStorage` para consulta rápida en la `HomeScreen`.
* **Auditoría en la Nube:** Envía una copia de cada escaneo (EAN, sucursal, precios) a una base de datos **Firebase Firestore** para un registro centralizado.

## 🛠️ Stack de Tecnologías

* **Framework:** React Native (con Expo)
* **Navegación:** Expo Router
* **Escáner:** Expo Camera
* **Base de Datos (Auditoría):** Firebase Firestore
* **Base de Datos (Local):** AsyncStorage
* **Lenguaje:** TypeScript

## 📂 Estructura del Proyecto

```
/
├── app/
│   └── index.tsx           # Lógica principal y navegación de la app
│
├── components/
│   ├── BarcodeScannerView.tsx  # Componente que envuelve la cámara
│   ├── ConfirmarEanScreen.tsx  # Pantalla de edición/confirmación de EAN
│   ├── HomeScreen.tsx          # Pantalla principal con botón de escaneo e historial
│   ├── NavBar.tsx              # Barra de navegación superior
│   ├── ResultScreen.tsx        # Pantalla de resultados (precios min/max)
│   └── SucursalSelector.tsx    # Pantalla inicial de selección de sucursal
│
├── services/
│   ├── firebaseConfig.ts       # Configuración de conexión a Firebase
│   ├── firestoreService.ts     # Función para guardar escaneos en Firestore
│   ├── localStorageService.ts  # Funciones para guardar/leer escaneos en AsyncStorage
│   └── preciosClarosService.ts # Lógica de scraping/consulta a la API de Precios Claros
│
├── assets/
│   ├── images/
│   │   └── IV.png            # Ícono de la app
│   └── fonts/
│       └── SpaceMono-Regular.ttf
│
├── app.json                  # Configuración de la app Expo (permisos, íconos, etc.)
└── package.json              # Dependencias del proyecto
```

## 🔄 Flujo de la Aplicación

1.  El usuario inicia la app y es recibido por `SucursalSelector.tsx`.
2.  Tras seleccionar una sucursal, es dirigido a `HomeScreen.tsx`, donde puede ver los escaneos del día (cargados desde `localStorageService.ts`) y presionar el botón para escanear.
3.  Al presionar "Escanear", se abre `BarcodeScannerView.tsx`.
4.  Una vez que la cámara detecta un EAN, `handleScan` es llamado.
5.  La app muestra `ConfirmarEanScreen.tsx` para que el usuario valide el EAN.
6.  Al confirmar (`handleConfirmarEan`), la app muestra un indicador de carga.
7.  Se llama a `obtenerPreciosPorEan` (`preciosClarosService.ts`) con el EAN. Este servicio consulta la API de Precios Claros para un listado de sucursales en Tucumán.
8.  El servicio procesa los resultados y devuelve el nombre del producto, precios min/max, y un detalle de coincidencias.
9.  El resultado del escaneo se guarda en Firestore (para auditoría) y en AsyncStorage (para el historial del día).
10. Se muestra `ResultScreen.tsx` con la información obtenida.

## ⚠️ Configuración y Seguridad

Este proyecto requiere claves de API para funcionar, las cuales están actualmente hardcodeadas en los archivos de servicio. Para un entorno de producción, **debes** moverlas a variables de entorno.

1.  **Firebase (`services/firebaseConfig.ts`):**
    * Contiene la configuración de conexión a tu proyecto de Firebase. Se recomienda gestionar esto a través de variables de entorno de Expo (EAS Secrets) o un servicio de configuración remota.

2.  **API Precios Claros (`services/preciosClarosService.ts`):**
    * El archivo contiene una `API_KEY` hardcodeada. Esta clave debe ser extraída y almacenada de forma segura.
    * También define una lista fija de `SUCURSALES_TUCUMAN` que son el objetivo de la consulta.

## 🏁 Cómo Empezar

1.  **Instalar dependencias**
    ```bash
    npm install
    ```

2.  **Configurar las claves de API**
    * Reemplaza las claves hardcodeadas en `services/firebaseConfig.ts` y `services/preciosClarosService.ts` con tus propias claves (o, preferiblemente, implementa variables de entorno).

3.  **Iniciar el servidor de desarrollo**
    ```bash
    npx expo start
    ```
````
