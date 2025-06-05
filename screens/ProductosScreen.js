import React, { useEffect, useState } from "react";
import { 
  View, 
  FlatList, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView,
  SafeAreaView,
  StatusBar,
  Dimensions,
  ActivityIndicator
} from "react-native";
import { db } from "../firebaseConfig";

const { width } = Dimensions.get('window');
const cardWidth = (width - 45) / 2;

export default function ProductosScreen() {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        setLoading(true);
        const snapshot = await db.collection("productos").get();
        const productosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setProductos(productosData);
      } catch (error) {
        console.error("Error obteniendo productos: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductos();
  }, []);

  const abrirModal = (producto) => {
    setProductoSeleccionado(producto);
    setModalVisible(true);
  };

  const cerrarModal = () => {
    setModalVisible(false);
    setProductoSeleccionado(null);
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(precio);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => abrirModal(item)}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image 
          source={{ uri: item.imagen }} 
          style={styles.imagen}
          resizeMode="cover"
        />
        <View style={styles.priceOverlay}>
          <Text style={styles.precioOverlay}>{formatearPrecio(item.precio)}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.nombre} numberOfLines={2}>{item.nombre}</Text>
        <Text style={styles.marca}>{item.marca}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Productos</Text>
      <Text style={styles.headerSubtitle}>{productos.length} productos disponibles</Text>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <FlatList
        data={productos}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
      />

      {/* Modal mejorado */}
      <Modal 
        visible={modalVisible} 
        animationType="slide" 
        transparent={true}
        onRequestClose={cerrarModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity 
            style={styles.modalOverlay} 
            activeOpacity={1} 
            onPress={cerrarModal}
          >
            <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
              {productoSeleccionado && (
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.modalImageContainer}>
                    <Image 
                      source={{ uri: productoSeleccionado.imagen }} 
                      style={styles.modalImagen}
                      resizeMode="cover"
                    />
                  </View>
                  
                  <View style={styles.modalInfo}>
                    <Text style={styles.modalTitulo}>{productoSeleccionado.nombre}</Text>
                    <Text style={styles.modalMarca}>{productoSeleccionado.marca}</Text>
                    
                    <View style={styles.priceContainer}>
                      <Text style={styles.modalPrecio}>
                        {formatearPrecio(productoSeleccionado.precio)}
                      </Text>
                    </View>

                    <View style={styles.detallesContainer}>
                      <Text style={styles.sectionTitle}>Descripción</Text>
                      <Text style={styles.modalDescripcion}>
                        {productoSeleccionado.descripcion || "Sin descripción disponible"}
                      </Text>
                      
                      <View style={styles.statsContainer}>
                        <View style={styles.statItem}>
                          <Text style={styles.statLabel}>Cantidad</Text>
                          <Text style={styles.statValue}>{productoSeleccionado.cantidad}</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </ScrollView>
              )}
              
              <TouchableOpacity style={styles.closeButton} onPress={cerrarModal}>
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>
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
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: "#fff",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  card: {
    width: cardWidth,
    backgroundColor: "#fff",
    borderRadius: 16,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: "hidden",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: 140,
  },
  imagen: {
    width: "100%",
    height: "100%",
  },
  priceOverlay: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.8)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  precioOverlay: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },
  cardContent: {
    padding: 12,
  },
  nombre: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
    lineHeight: 18,
  },
  marca: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
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
    maxHeight: "85%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalImageContainer: {
    width: "100%",
    height: 250,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    overflow: "hidden",
  },
  modalImagen: {
    width: "100%",
    height: "100%",
  },
  modalInfo: {
    padding: 24,
  },
  modalTitulo: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 8,
    lineHeight: 30,
  },
  modalMarca: {
    fontSize: 16,
    color: "#6366f1",
    fontWeight: "600",
    marginBottom: 16,
  },
  priceContainer: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  modalPrecio: {
    fontSize: 20,
    fontWeight: "700",
    color: "#059669",
  },
  detallesContainer: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  modalDescripcion: {
    fontSize: 16,
    color: "#475569",
    lineHeight: 24,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    padding: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "500",
    marginBottom: 4,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  closeButton: {
    backgroundColor: "#6366f1",
    margin: 20,
    marginTop: 0,
    paddingVertical: 16,
    borderRadius: 12,
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
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});