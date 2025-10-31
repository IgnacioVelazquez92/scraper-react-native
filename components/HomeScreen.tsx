import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export interface Escaneo {
  ean: string;
  sucursal: string;
  fecha_hora: string; // Formato ISO string
  precio_min: number | null;
  precio_max: number | null;
  // id?: string; // Descomenta si en algún momento usás Firestore con id
}

interface HomeScreenProps {
  onEscanear: () => void;
  escaneosHoy: Escaneo[];
}

export default function HomeScreen({ onEscanear, escaneosHoy }: HomeScreenProps) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity style={styles.scanButton} onPress={onEscanear}>
        <Text style={styles.scanIcon}>🔎</Text>
      </TouchableOpacity>
      <Text style={styles.scanLabel}>ESCANEAR PRODUCTO</Text>
      <View style={styles.escaneosBox}>
        <Text style={{ fontWeight: 'bold', fontSize: 18, marginBottom: 8 }}>
          Escaneados hoy:
        </Text>
        {escaneosHoy.length === 0 ? (
          <Text>Aún no se escanearon productos.</Text>
        ) : (
          <FlatList
            data={escaneosHoy}
            keyExtractor={(_, idx) => idx.toString()}
            renderItem={({ item }) => (
              <Text>
                {item.ean} — {new Date(item.fecha_hora).toLocaleTimeString()}
              </Text>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scanButton: {
    backgroundColor: '#43a047',
    padding: 32,
    borderRadius: 80,
    elevation: 5,
    marginBottom: 20,
    marginTop: 40,
  },
  scanIcon: { color: '#fff', fontSize: 32 },
  scanLabel: { fontSize: 22, fontWeight: 'bold', marginBottom: 24 },
  escaneosBox: { backgroundColor: '#eee', padding: 20, width: '100%' },
});
