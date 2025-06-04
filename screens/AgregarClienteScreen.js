import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { addCliente } from "../api/api";

export default function AgregarClienteScreen({ navigation }) {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAgregar = async () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "El nombre es obligatorio");
      return;
    }
    setLoading(true);
    const res = await addCliente(nombre, telefono, correo);
    setLoading(false);
    if (res.success) {
      Alert.alert("Éxito", "Cliente agregado correctamente");
      navigation.goBack(); // Vuelve a la lista
    } else {
      Alert.alert("Error", "No se pudo agregar: " + (res.error || "Error desconocido"));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Agregar Cliente</Text>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Correo"
        value={correo}
        onChangeText={setCorreo}
        style={styles.input}
        keyboardType="email-address"
      />
      <Button
        title={loading ? "Agregando..." : "Agregar Cliente"}
        onPress={handleAgregar}
        disabled={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 16 },
  titulo: { fontSize: 20, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", borderRadius: 6, padding: 8, marginBottom: 12 }
});
