import React, { useState } from 'react';
import { Button, Text, TextInput, View } from 'react-native';

// Props con tipado explícito
interface ConfirmarEanScreenProps {
  eanDetectado: string;
  onConfirmar: (eanFinal: string) => void;
  onCancelar: () => void;
}

export default function ConfirmarEanScreen({
  eanDetectado,
  onConfirmar,
  onCancelar,
}: ConfirmarEanScreenProps) {
  const [ean, setEan] = useState<string>(eanDetectado);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 12 }}>
        Código de barras detectado:
      </Text>
      <TextInput
        value={ean}
        onChangeText={setEan}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#888',
          fontSize: 24,
          padding: 8,
          marginBottom: 16,
          width: 220,
          textAlign: 'center',
          borderRadius: 8,
        }}
        placeholder="Ingrese EAN"
      />
      <Button title="Confirmar y buscar precio" onPress={() => onConfirmar(ean)} />
      <Button title="Cancelar" onPress={onCancelar} color="gray" />
    </View>
  );
}
