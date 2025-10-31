import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NavBar({ title, onBack }: { title: string, onBack?: () => void }) {
  return (
    <View style={styles.navbar}>
      {onBack && (
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 54,
    backgroundColor: '#2196F3',
    paddingHorizontal: 10,
    elevation: 3,
  },
  backButton: {
    marginRight: 15,
    padding: 6,
    borderRadius: 50,
    backgroundColor: '#1976D2',
  },
  backText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
