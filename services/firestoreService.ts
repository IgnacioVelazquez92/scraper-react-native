import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function guardarEscaneo({
  ean,
  sucursal,
  precio_min,
  precio_max,
}: {
  ean: string,
  sucursal: string,
  precio_min: number | null,
  precio_max: number | null
}) {
  try {
    await addDoc(collection(db, "escaneos"), {
      ean,
      sucursal,
      fecha_hora: new Date().toISOString(),
      precio_min,
      precio_max,
    });
    // (Opcional) Notificá éxito acá
  } catch (error) {
    console.error("Error guardando escaneo:", error);
    // (Opcional) Notificá error en la UI
  }
}
