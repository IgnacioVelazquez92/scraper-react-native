import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// --- Configuración Segura de Firebase ---
// Estas variables se leen desde el archivo .env en la raíz de tu proyecto.
// 
// IMPORTANTE:
// 1. Tu archivo .env DEBE usar el prefijo EXPO_PUBLIC_ para cada variable.
//    Ej: EXPO_PUBLIC_FIREBASE_API_KEY=...
// 2. Debes reiniciar tu servidor de desarrollo (npx expo start) después
//    de crear o modificar el archivo .env para que los cambios tomen efecto.

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// --- Validación Opcional ---
// (Ayuda a depurar si las variables no se cargaron)
if (!firebaseConfig.apiKey) {
  console.warn("¡Advertencia! No se encontró la API Key de Firebase.");
  console.warn("Asegúrate de tener un archivo .env en la raíz del proyecto");
  console.warn("y de que las variables tengan el prefijo 'EXPO_PUBLIC_'.");
  console.warn("Recuerda reiniciar el servidor de Expo (npx expo start).");
}

// --- Inicialización de Firebase ---
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
