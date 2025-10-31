import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SUCURSALES = [
  'CORRIENTES',
  'BELGRANO',
  'SANTIAGO',
  '9 DE JULIO',
];

export default function SucursalSelector({ onSelect }: { onSelect: (sucursal: string) => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu sucursal</Text>
      {SUCURSALES.map((suc) => (
        <TouchableOpacity
          key={suc}
          style={styles.button}
          onPress={() => onSelect(suc)}
        >
          <Text style={styles.buttonText}>{suc}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 22, marginBottom: 20, fontWeight: 'bold' },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 12,
    marginVertical: 10,
    minWidth: 200,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 18 },
});
