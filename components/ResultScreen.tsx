import React, { useState } from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Tipos explícitos y ampliados
export interface ResultadoCompetencia {
  precio_min: number | null;
  precio_max: number | null;
  coincidencias?: [string, number][];
  nombre?: string;
  presentacion?: string;
  // Podés agregar otros campos si tu API los trae
}

interface ResultScreenProps {
  ean: string;
  result: ResultadoCompetencia;
  onEscanearOtro: () => void;
  onVolverHome: () => void;
}

// Componente para mostrar la imagen del producto
function ImagenProducto({ ean }: { ean: string }) {
  const [fallback, setFallback] = useState(false);
  const imagen_url = `https://imagenes.preciosclaros.gob.ar/productos/${ean}.jpg`;
  const no_image_url = 'https://www.preciosclaros.gob.ar/img/no-image.png';

  return (
    <Image
      source={{ uri: fallback ? no_image_url : imagen_url }}
      onError={() => setFallback(true)}
      style={styles.productImage}
      resizeMode="contain"
    />
  );
}

export default function ResultScreen({
  ean,
  result,
  onEscanearOtro,
  onVolverHome,
}: ResultScreenProps) {
  const [mostrarDetalle, setMostrarDetalle] = useState(false);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={{ flex: 1 }}
      keyboardShouldPersistTaps="handled"
    >
      <ImagenProducto ean={ean} />

      <Text style={styles.ean}>EAN: {ean}</Text>
      <Text style={styles.productName}>
        {result.nombre ?? "Producto sin nombre"}
      </Text>
      {result.presentacion && (
        <Text style={styles.presentacion}>{result.presentacion}</Text>
      )}

      <Text style={styles.label}>Precios de la competencia:</Text>
      <Text style={styles.precioMin}>
        Más barato: {result.precio_min !== null ? `$${result.precio_min}` : 'No disponible'}
      </Text>
      <Text style={styles.precioMax}>
        Más caro: {result.precio_max !== null ? `$${result.precio_max}` : 'No disponible'}
      </Text>

      <TouchableOpacity onPress={() => setMostrarDetalle((v) => !v)}>
        <Text style={styles.verDetalle}>
          {mostrarDetalle ? "Ocultar detalle" : "Ver detalle de la competencia"}
        </Text>
      </TouchableOpacity>
      {mostrarDetalle && (
        <View style={styles.tableBox}>
          {(!result.coincidencias || result.coincidencias.length === 0) && (
            <Text>No hay coincidencias</Text>
          )}
          {result.coincidencias?.map((item, i) => (
            <View key={i} style={styles.tableRow}>
              <Text style={styles.sucursal}>{item[0]}</Text>
              <Text style={styles.precio}>${item[1]}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.buttonsRow}>
        <Button title="Escanear otro" onPress={onEscanearOtro} />
        <Button title="Home" onPress={onVolverHome} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', paddingTop: 30, paddingBottom: 30 },
  productImage: { width: 140, height: 140, borderRadius: 16, marginBottom: 14, backgroundColor: '#f4f4f4' },
  ean: { fontSize: 16, fontWeight: 'bold', color: '#444', marginBottom: 2 },
  productName: { fontWeight: 'bold', fontSize: 22, textAlign: 'center', marginBottom: 4 },
  presentacion: { fontSize: 16, color: '#666', marginBottom: 12 },
  label: { fontWeight: 'bold', fontSize: 20, marginBottom: 10 },
  precioMin: { fontSize: 17, color: '#219150', fontWeight: 'bold' },
  precioMax: { fontSize: 17, color: '#bb0000', marginBottom: 8, fontWeight: 'bold' },
  verDetalle: { color: "#1976D2", fontWeight: "bold", marginTop: 18, marginBottom: 10 },
  tableBox: { width: '100%', marginVertical: 16 },
  tableRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4, paddingHorizontal: 10 },
  sucursal: { flex: 1 },
  precio: { width: 80, textAlign: 'right' },
  buttonsRow: { flexDirection: 'row', gap: 10, marginTop: 18, marginBottom: 20 },
});
