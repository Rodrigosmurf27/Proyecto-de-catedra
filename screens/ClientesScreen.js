import React, { useCallback, useState } from "react";
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
import ClienteCard from "../components/ClienteCard";
import { listarClientes, addCliente } from "../api/api";
import { useFocusEffect } from "@react-navigation/native";
import { colors, font, sizes } from "../theme";
import { Ionicons } from "@expo/vector-icons";

export default function ClientesScreen() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado para el modal y el formulario
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [saving, setSaving] = useState(false);

  // Recarga la lista cuando se agrega un cliente
  const fetchClientes = async () => {
    setLoading(true);
    const res = await listarClientes();
    if (res.success) setClientes(res.clientes);
    else alert("Error al cargar clientes");
    setLoading(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchClientes();
    }, [])
  );

  const handleAgregarCliente = async () => {
    if (!nombre.trim()) {
      Alert.alert("Error", "El nombre es obligatorio");
      return;
    }
    setSaving(true);
    const res = await addCliente(nombre, telefono, correo);
    setSaving(false);
    if (res.success) {
      Alert.alert("Éxito", "Cliente agregado correctamente");
      setModalVisible(false);
      setNombre("");
      setTelefono("");
      setCorreo("");
      fetchClientes();
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
        <Text style={styles.addButtonText}>Agregar Cliente</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Lista de Clientes</Text>
      {clientes.length === 0 ? (
        <Text style={styles.emptyText}>No hay clientes registrados.</Text>
      ) : (
        <FlatList
          data={clientes}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <ClienteCard cliente={item} />}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}

      {/* Modal para agregar cliente */}
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
                <Text style={styles.modalTitle}>Agregar Cliente</Text>
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
                <View style={styles.modalFooter}>
                  <TouchableOpacity
                    style={styles.cancelButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={styles.cancelButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.saveButton, saving && { opacity: 0.7 }]}
                    onPress={handleAgregarCliente}
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
