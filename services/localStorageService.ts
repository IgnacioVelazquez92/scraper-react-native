import AsyncStorage from '@react-native-async-storage/async-storage';

// Guarda escaneo solo para el día y sucursal
export async function guardarEscaneoLocal(escaneo: any) {
  const hoy = new Date().toISOString().slice(0, 10);
  const key = `escaneos_${escaneo.sucursal}_${hoy}`;
  const actuales = JSON.parse(await AsyncStorage.getItem(key) || '[]');
  actuales.push(escaneo);
  await AsyncStorage.setItem(key, JSON.stringify(actuales));
}

// Trae solo escaneos locales de la sucursal del día
export async function obtenerEscaneosDeHoyLocal(sucursal: string | null) {
  if (!sucursal) return [];
  const hoy = new Date().toISOString().slice(0, 10);
  const key = `escaneos_${sucursal}_${hoy}`;
  return JSON.parse(await AsyncStorage.getItem(key) || '[]');
}
