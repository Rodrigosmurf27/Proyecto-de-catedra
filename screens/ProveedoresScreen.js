import React, { useState } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import ProveedorCard from "../components/ProveedorCard";
import { listarProveedores, addProveedor } from "../api/api";
import { useFocusEffect } from "@react-navigation/native";
import { colors, font, sizes } from "../theme";
import { Ionicons } from "@expo/vector-icons";

export default function ProveedoresScreen() {
  const [proveedores, setProveedores] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal y formulario
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [marca, setMarca] = useState("");
  const [saving, setSaving] = useState(false);

  // Recargar lista al agregar proveedor
  const fetchProveedores = async () => {
    setLoading(true);
    const res = await listarProveedores();
    if (res.success) setProveedores(res.proveedores);
    else alert("Error al cargar proveedores");
    setLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchProveedores();
    }, [])
  );

  const handleAgregarProveedor = async () => {
    if (!nombre.trim() || !marca.trim()) {
      Alert.alert("Error", "El nombre y la marca son obligatorios");
      return;
    }
    setSaving(true);
    const res = await addProveedor(nombre, telefono, correo, marca);
    setSaving(false);
    if (res.success) {
      Alert.alert("Éxito", "Proveedor agregado correctamente");
      setModalVisible(false);
      setNombre("");
      setTelefono("");
      setCorreo("");
      setMarca("");
      fetchProveedores();
    } else {
      Alert.alert("Error", "No se pudo agregar: " + (res.error || "Error desconocido"));
    }
  };

  if (loading)
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <Ionicons name="person-add" size={22} color="#fff" style={{ marginRight: 6 }} />
        <Text style={styles.addButtonText}>Agregar proveedor</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Lista de Proveedores</Text>
      {proveedores.length === 0 ? (
        <Text style={styles.emptyText}>No hay proveedores registrados.</Text>
      ) : (
        <FlatList
          data={proveedores}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <ProveedorCard proveedor={item} />}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}

      {/* Modal para agregar proveedor */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View
              style={styles.modalContent}
              onStartShouldSetResponder={() => true}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Agregar Proveedor</Text>
                <TouchableOpacity onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.formContainer}>
                <TextInput
                  placeholder="Nombre"
                  placeholderTextColor={colors.textSecondary}
                  value={nombre}
                  onChangeText={setNombre}
                  style={styles.input}
                />
                <TextInput
                  placeholder="Teléfono"
                  placeholderTextColor={colors.textSecondary}
                  value={telefono}
                  onChangeText={setTelefono}
                  style={styles.input}
                  keyboardType="phone-pad"
                />
                <TextInput
                  placeholder="Correo"
                  placeholderTextColor={colors.textSecondary}
                  value={correo}
                  onChangeText={setCorreo}
                  style={styles.input}
                  keyboardType="email-address"
                />
                <TextInput
                  placeholder="Marca de productos"
                  placeholderTextColor={colors.textSecondary}
                  value={marca}
                  onChangeText={setMarca}
                  style={styles.input}
                />
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.saveButton, saving && { opacity: 0.7 }]}
                    onPress={handleAgregarProveedor}
                    disabled={saving}
                  >
                    {saving ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      <Text style={styles.saveButtonText}>Agregar</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 0,
    paddingTop: 8,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  titulo: {
    fontSize: 24,
    fontFamily: font.bold,
    color: colors.primary,
    marginVertical: 10,
    textAlign: "center",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: colors.primary,
    borderRadius: sizes.borderRadius,
    alignItems: "center",
    alignSelf: "center",
    marginTop: 20,
    marginBottom: 8,
    paddingHorizontal: 22,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: font.bold,
    letterSpacing: 0.5,
  },
  emptyText: {
    color: colors.textSecondary,
    fontFamily: font.regular,
    fontSize: 17,
    textAlign: "center",
    marginTop: 36,
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 20,
    elevation: 8,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: font.bold,
    color: colors.primary,
  },
  closeButtonText: {
    fontSize: 20,
    color: colors.textSecondary,
    fontWeight: "bold",
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  formContainer: {
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: sizes.borderRadius,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: colors.cardBg,
    color: colors.text,
    fontFamily: font.regular,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#f1f5f9",
    borderRadius: sizes.borderRadius,
    paddingVertical: 12,
    paddingHorizontal: 18,
    marginRight: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: colors.textSecondary,
    fontSize: 16,
    fontFamily: font.bold,
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: sizes.borderRadius,
    paddingVertical: 12,
    paddingHorizontal: 18,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: font.bold,
  },
});
