import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import CameraScannerView from '../components/BarcodeScannerView';
import ConfirmarEanScreen from '../components/ConfirmarEanScreen'; // Nuevo
import HomeScreen from '../components/HomeScreen';
import NavBar from '../components/NavBar';
import ResultScreen from '../components/ResultScreen';
import SucursalSelector from '../components/SucursalSelector';

import { guardarEscaneo } from '../services/firestoreService';
import { guardarEscaneoLocal, obtenerEscaneosDeHoyLocal } from '../services/localStorageService';
import { obtenerPreciosPorEan } from '../services/preciosClarosService';

export default function Index() {
  const [sucursal, setSucursal] = useState<string | null>(null);
  const [showScanner, setShowScanner] = useState(false);
  const [eanDetectado, setEanDetectado] = useState<string | null>(null); // Nuevo
  const [ean, setEan] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [escaneosHoy, setEscaneosHoy] = useState<any[]>([]);

  // Cargar escaneos locales del día
  useEffect(() => {
    obtenerEscaneosDeHoyLocal(sucursal).then(setEscaneosHoy);
  }, [sucursal, result]);

  // Cuando escanea, primero confirmar (NO buscar ni guardar todavía)
  function handleScan(eanScanned: string) {
    setShowScanner(false);
    setEanDetectado(eanScanned);
  }

  // Cuando confirma EAN (o lo edita), ahí busca y guarda
  async function handleConfirmarEan(eanFinal: string) {
    setEanDetectado(null);
    setEan(eanFinal);
    setLoading(true);

    const data = await obtenerPreciosPorEan(eanFinal);
    setResult(data);
    setLoading(false);

    const nuevoEscaneo = {
      ean: eanFinal,
      sucursal: sucursal ?? 'Sin sucursal',
      fecha_hora: new Date().toISOString(),
      precio_min: data?.precio_min ?? null,
      precio_max: data?.precio_max ?? null,
    };

    await guardarEscaneo(nuevoEscaneo);      // Cloud (auditoría)
    await guardarEscaneoLocal(nuevoEscaneo); // Local para el día
  }

  // Si cancela la confirmación vuelve al escáner
  function handleCancelarConfirmarEan() {
    setEanDetectado(null);
    setShowScanner(true);
  }

  // Flujo de la app
  if (!sucursal) return <SucursalSelector onSelect={setSucursal} />;

  if (showScanner) {
    return (
      <>
        <NavBar title={sucursal} onBack={() => setShowScanner(false)} />
        <CameraScannerView onScanned={handleScan} />
      </>
    );
  }

  // Mostrar confirmación del EAN detectado antes de buscar precios y guardar
  if (eanDetectado) {
    return (
      <>
        <NavBar title={sucursal} onBack={handleCancelarConfirmarEan} />
        <ConfirmarEanScreen
          eanDetectado={eanDetectado}
          onConfirmar={handleConfirmarEan}
          onCancelar={handleCancelarConfirmarEan}
        />
      </>
    );
  }

  if (loading) {
    return (
      <>
        <NavBar title={sucursal} onBack={() => setSucursal(null)} />
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 12 }}>Buscando en Precios Claros...</Text>
        </View>
      </>
    );
  }

  if (ean && result) {
    return (
      <>
        <NavBar title={sucursal} onBack={() => { setEan(null); setResult(null); }} />
        <ResultScreen
          ean={ean}
          result={result}
          onEscanearOtro={() => { setEan(null); setResult(null); }}
          onVolverHome={() => { setEan(null); setResult(null); }}
        />
      </>
    );
  }

  return (
    <>
      <NavBar title={sucursal} onBack={() => setSucursal(null)} />
      <HomeScreen
        onEscanear={() => setShowScanner(true)}
        escaneosHoy={escaneosHoy}
      />
    </>
  );
}
