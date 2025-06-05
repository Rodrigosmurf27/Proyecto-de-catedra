import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform
} from "react-native";
import { db } from "../firebaseConfig";

export default function InventarioScreen() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    marca: "",
    descripcion: "",
    precio: "",
    cantidad: "",
    imagen: "",
  });

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const snapshot = await db.collection("productos").get();
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(data);
    } catch (error) {
      console.error("Error obteniendo productos:", error);
      Alert.alert("Error", "No se pudieron cargar los productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const totalCantidad = productos.reduce(
    (total, prod) => total + (prod.cantidad || 0),
    0
  );

  const valorTotalInventario = productos.reduce(
    (total, prod) => total + ((prod.precio || 0) * (prod.cantidad || 0)),
    0
  );

  const productosBajoStock = productos.filter(prod => prod.cantidad < 10);

  const productosPorMarca = productos.reduce((acc, prod) => {
    const marca = prod.marca || "Sin marca";
    if (!acc[marca]) acc[marca] = [];
    acc[marca].push(prod);
    return acc;
  }, {});

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(precio);
  };

  const handleAgregarProducto = async () => {
    const { nombre, marca, descripcion, precio, cantidad, imagen } = nuevoProducto;
    
    if (!nombre.trim() || !precio || !cantidad) {
      Alert.alert("Campos requeridos", "Debes llenar al menos nombre, precio y cantidad");
      return;
    }

    if (isNaN(precio) || isNaN(cantidad) || parseFloat(precio) <= 0 || parseInt(cantidad) < 0) {
      Alert.alert("Datos inválidos", "El precio debe ser mayor a 0 y la cantidad no puede ser negativa");
      return;
    }

    try {
      await db.collection("productos").add({
        nombre: nombre.trim(),
        marca: marca.trim() || "Sin marca",
        descripcion: descripcion.trim(),
        precio: parseFloat(precio),
        cantidad: parseInt(cantidad),
        imagen: imagen.trim(),
        fechaCreacion: new Date().toISOString(),
      });
      
      Alert.alert("¡Éxito!", "Producto agregado correctamente");
      setNuevoProducto({
        nombre: "",
        marca: "",
        descripcion: "",
        precio: "",
        cantidad: "",
        imagen: "",
      });
      setModalVisible(false);
      fetchProductos();
    } catch (error) {
      console.error("Error agregando producto:", error);
      Alert.alert("Error", "No se pudo agregar el producto");
    }
  };

  const handleEliminarProducto = (id, nombre) => {
    Alert.alert(
      "Confirmar eliminación",
      `¿Estás seguro de que deseas eliminar "${nombre}"?\n\nEsta acción no se puede deshacer.`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: async () => {
            try {
              await db.collection("productos").doc(id).delete();
              Alert.alert("Eliminado", "Producto eliminado correctamente");
              fetchProductos();
            } catch (error) {
              console.error("Error eliminando producto:", error);
              Alert.alert("Error", "No se pudo eliminar el producto");
            }
          },
        },
      ]
    );
  };

  const renderEstadisticas = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <View style={styles.statIcon}>
          <Text style={styles.statIconText}>📦</Text>
        </View>
        <Text style={styles.statNumber}>{totalCantidad}</Text>
        <Text style={styles.statLabel}>Total Productos</Text>
      </View>
      
      <View style={styles.statCard}>
        <View style={styles.statIcon}>
          <Text style={styles.statIconText}>💰</Text>
        </View>
        <Text style={styles.statNumber}>{formatearPrecio(valorTotalInventario)}</Text>
        <Text style={styles.statLabel}>Valor Total</Text>
      </View>
      
      <View style={styles.statCard}>
        <View style={styles.statIcon}>
          <Text style={styles.statIconText}>⚠️</Text>
        </View>
        <Text style={styles.statNumber}>{productosBajoStock.length}</Text>
        <Text style={styles.statLabel}>Bajo Stock</Text>
      </View>
    </View>
  );

  const renderProductosPorMarca = () => (
    <View style={styles.marcasSection}>
      <Text style={styles.sectionTitle}>Productos por Marca</Text>
      {Object.entries(productosPorMarca).map(([marca, productosMarca]) => (
        <View key={marca} style={styles.marcaContainer}>
          <View style={styles.marcaHeader}>
            <Text style={styles.marcaTitulo}>{marca}</Text>
            <View style={styles.marcaBadge}>
              <Text style={styles.marcaBadgeText}>{productosMarca.length}</Text>
            </View>
          </View>
          
          {productosMarca.map((producto) => (
            <View key={producto.id} style={styles.productoItem}>
              <View style={styles.productoInfo}>
                <Text style={styles.productoNombre}>{producto.nombre}</Text>
                <View style={styles.productoDetalles}>
                  <Text style={styles.productoCantidad}>Stock: {producto.cantidad}</Text>
                  <Text style={styles.productoPrecio}>{formatearPrecio(producto.precio)}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.eliminarButton}
                onPress={() => handleEliminarProducto(producto.id, producto.nombre)}
                activeOpacity={0.7}
              >
                <Text style={styles.eliminarIcon}>🗑️</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      ))}
    </View>
  );

  const renderFormulario = () => (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <KeyboardAvoidingView 
        style={styles.modalContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Agregar Producto</Text>
              <TouchableOpacity 
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.formContainer} showsVerticalScrollIndicator={false}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Nombre *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre del producto"
                  value={nuevoProducto.nombre}
                  onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, nombre: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Marca</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Marca del producto"
                  value={nuevoProducto.marca}
                  onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, marca: text })}
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Descripción</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Descripción del producto"
                  value={nuevoProducto.descripcion}
                  onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, descripcion: text })}
                  multiline
                  numberOfLines={3}
                />
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Precio *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0.00"
                    value={nuevoProducto.precio}
                    onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, precio: text })}
                    keyboardType="numeric"
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>Cantidad *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    value={nuevoProducto.cantidad}
                    onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, cantidad: text })}
                    keyboardType="numeric"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>URL de Imagen</Text>
                <TextInput
                  style={styles.input}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  value={nuevoProducto.imagen}
                  onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, imagen: text })}
                />
              </View>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.addButton}
                onPress={handleAgregarProducto}
              >
                <Text style={styles.addButtonText}>Agregar Producto</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Modal>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Cargando inventario...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Inventario</Text>
        <TouchableOpacity 
          style={styles.addFloatingButton}
          onPress={() => setModalVisible(true)}
          activeOpacity={0.8}
        >
          <Text style={styles.addFloatingButtonText}>+</Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {renderEstadisticas()}
        
        {productosBajoStock.length > 0 && (
          <View style={styles.alertContainer}>
            <Text style={styles.alertTitle}>⚠️ Productos con bajo stock</Text>
            <Text style={styles.alertText}>
              {productosBajoStock.length} producto(s) tienen menos de 10 unidades
            </Text>
          </View>
        )}

        {renderProductosPorMarca()}
      </ScrollView>

      {renderFormulario()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8fafc",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748b",
    fontWeight: "500",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
  },
  addFloatingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6366f1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addFloatingButtonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "600",
  },
  scrollView: {
    flex: 1,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statIconText: {
    fontSize: 18,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    fontWeight: "500",
  },
  alertContainer: {
    backgroundColor: "#fef3c7",
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#f59e0b",
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#92400e",
    marginBottom: 4,
  },
  alertText: {
    fontSize: 14,
    color: "#a16207",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e293b",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  marcasSection: {
    paddingBottom: 20,
  },
  marcaContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 16,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  marcaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  marcaTitulo: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  marcaBadge: {
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  marcaBadgeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6366f1",
  },
  productoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  productoInfo: {
    flex: 1,
  },
  productoNombre: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  productoDetalles: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productoCantidad: {
    fontSize: 14,
    color: "#64748b",
  },
  productoPrecio: {
    fontSize: 14,
    fontWeight: "600",
    color: "#059669",
  },
  eliminarButton: {
    padding: 8,
    marginLeft: 12,
  },
  eliminarIcon: {
    fontSize: 20,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 24,
    maxHeight: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "600",
  },
  formContainer: {
    padding: 20,
    maxHeight: 400,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#1f2937",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
    marginRight: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#64748b",
  },
  addButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    backgroundColor: "#6366f1",
    marginLeft: 8,
    alignItems: "center",
    shadowColor: "#6366f1",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
});