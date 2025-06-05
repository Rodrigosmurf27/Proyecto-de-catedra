import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Dimensions,
  Image,
} from "react-native";

const { width } = Dimensions.get('window');

// Datos simulados de ventas
const ventasSimuladas = [
  {
    id: "1",
    cliente: "Ana López",
    producto: "Crema Facial Gold",
    marca: "Loreal",
    cantidad: 2,
    precioUnitario: 20,
    fecha: "2025-06-01",
    estado: "completada",
  },
  {
    id: "2",
    cliente: "Juan Pérez",
    producto: "Jabón facial",
    marca: "Neutrogena",
    cantidad: 1,
    precioUnitario: 18,
    fecha: "2025-06-02",
    estado: "completada",
  },
  {
    id: "3",
    cliente: "Lucía Gómez",
    producto: "Crema facial whip",
    marca: "Olay",
    cantidad: 3,
    precioUnitario: 20,
    fecha: "2025-06-02",
    estado: "completada",
  },
  {
    id: "4",
    cliente: "Carlos Rivera",
    producto: "Hyalu B5",
    marca: "La Roche-Posay",
    cantidad: 1,
    precioUnitario: 20,
    fecha: "2025-06-03",
    estado: "completada",
  },
  {
    id: "5",
    cliente: "María González",
    producto: "Serum Vitamina C",
    marca: "Vichy",
    cantidad: 2,
    precioUnitario: 25,
    fecha: "2025-06-03",
    estado: "pendiente",
  },
  {
    id: "6",
    cliente: "Roberto Silva",
    producto: "Protector Solar",
    marca: "Eucerin",
    cantidad: 1,
    precioUnitario: 15,
    fecha: "2025-06-04",
    estado: "completada",
  },
];

export default function VentasScreen() {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [filtroMarca, setFiltroMarca] = useState('todas');
  const [chartModalVisible, setChartModalVisible] = useState(false);

  useEffect(() => {
    // Simular carga de ventas desde la base
    setTimeout(() => {
      setVentas(ventasSimuladas);
      setLoading(false);
    }, 1000);
  }, []);

  const formatearFecha = (fecha) => {
    const opciones = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    };
    return new Date(fecha).toLocaleDateString('es-ES', opciones);
  };

  const formatearPrecio = (precio) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(precio);
  };

  // Filtrar ventas por marca
  const ventasFiltradas = filtroMarca === 'todas' 
    ? ventas 
    : ventas.filter(venta => venta.marca === filtroMarca);

  // Calcular estadísticas
  const totalVentas = ventas.reduce(
    (total, venta) => total + venta.cantidad * venta.precioUnitario,
    0
  );

  const ventasHoy = ventas.filter(venta => 
    venta.fecha === "2025-06-04"
  ).reduce((total, venta) => total + venta.cantidad * venta.precioUnitario, 0);

  const totalProductosVendidos = ventas.reduce(
    (total, venta) => total + venta.cantidad,
    0
  );

  const ventasPorMarca = ventas.reduce((acc, venta) => {
    acc[venta.marca] = (acc[venta.marca] || 0) + venta.cantidad;
    return acc;
  }, {});

  const productoMasVendido = ventas.reduce((max, venta) => {
    if (!max[venta.producto]) {
      max[venta.producto] = venta.cantidad;
    } else {
      max[venta.producto] += venta.cantidad;
    }
    return max;
  }, {});

  const nombreProductoMasVendido = Object.entries(productoMasVendido).reduce(
    (max, [producto, cantidad]) => {
      return cantidad > max.cantidad ? { producto, cantidad } : max;
    },
    { producto: "N/A", cantidad: 0 }
  );

  const marcasUnicas = ['todas', ...new Set(ventas.map(venta => venta.marca))];

  const abrirDetalleVenta = (venta) => {
    setVentaSeleccionada(venta);
    setModalVisible(true);
  };

  const renderEstadisticas = () => (
    <View style={styles.statsContainer}>
      <View style={styles.statCard}>
        <View style={styles.statIcon}>
          <Text style={styles.statIconText}>💰</Text>
        </View>
        <Text style={styles.statNumber}>{formatearPrecio(totalVentas)}</Text>
        <Text style={styles.statLabel}>Total Ventas</Text>
      </View>
      
      <View style={styles.statCard}>
        <View style={styles.statIcon}>
          <Text style={styles.statIconText}>📅</Text>
        </View>
        <Text style={styles.statNumber}>{formatearPrecio(ventasHoy)}</Text>
        <Text style={styles.statLabel}>Ventas Hoy</Text>
      </View>
      
      <View style={styles.statCard}>
        <View style={styles.statIcon}>
          <Text style={styles.statIconText}>📦</Text>
        </View>
        <Text style={styles.statNumber}>{totalProductosVendidos}</Text>
        <Text style={styles.statLabel}>Productos</Text>
      </View>
    </View>
  );

  const renderGraficoPastel = () => (
    <View style={styles.chartContainer}>
      <View style={styles.chartHeader}>
        <View style={styles.chartTitleContainer}>
          <Text style={styles.chartIcon}>📊</Text>
          <View>
            <Text style={styles.chartTitle}>Distribución de Ventas por Marca</Text>
            <Text style={styles.chartSubtitle}>Análisis de participación</Text>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.expandButton}
          onPress={() => setChartModalVisible(true)}
        >
          <Text style={styles.expandButtonText}>🔍</Text>
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity 
        style={styles.chartImageContainer}
        onPress={() => setChartModalVisible(true)}
        activeOpacity={0.8}
      >
        <Image
          source={{uri: 'https://i.imgur.com/GsIXRxS.png'}}
          style={styles.chartImage}
          resizeMode="contain"
        />
        <View style={styles.chartOverlay}>
          <Text style={styles.chartOverlayText}>Toca para ampliar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderChartModal = () => (
    <Modal
      visible={chartModalVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setChartModalVisible(false)}
    >
      <View style={styles.chartModalContainer}>
        <TouchableOpacity 
          style={styles.chartModalOverlay} 
          activeOpacity={1} 
          onPress={() => setChartModalVisible(false)}
        >
          <View style={styles.chartModalContent} onStartShouldSetResponder={() => true}>
            <View style={styles.chartModalHeader}>
              <Text style={styles.chartModalTitle}>Gráfico de Ventas por Marca</Text>
              <TouchableOpacity 
                onPress={() => setChartModalVisible(false)}
                style={styles.chartCloseButton}
              >
                <Text style={styles.chartCloseButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView 
              contentContainerStyle={styles.chartModalBody}
              maximumZoomScale={3}
              minimumZoomScale={1}
              showsVerticalScrollIndicator={false}
            >
              <Image
                source={{uri: 'https://i.imgur.com/GsIXRxS.png'}}
                style={styles.chartImageLarge}
                resizeMode="contain"
              />
              <Text style={styles.chartDescription}>
                Este gráfico muestra la distribución porcentual de las ventas por marca, 
                permitiendo identificar qué marcas tienen mayor participación en el negocio.
              </Text>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const renderFiltrosMarca = () => (
    <View style={styles.filtrosContainer}>
      <Text style={styles.filtroTitle}>Filtrar por marca:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtrosList}>
        {marcasUnicas.map((marca) => (
          <TouchableOpacity
            key={marca}
            style={[
              styles.filtroItem,
              filtroMarca === marca && styles.filtroItemActivo
            ]}
            onPress={() => setFiltroMarca(marca)}
          >
            <Text style={[
              styles.filtroText,
              filtroMarca === marca && styles.filtroTextActivo
            ]}>
              {marca === 'todas' ? 'Todas' : marca}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderProductoMasVendido = () => (
    <View style={styles.topProductContainer}>
      <View style={styles.topProductHeader}>
        <Text style={styles.topProductIcon}>🏆</Text>
        <View style={styles.topProductInfo}>
          <Text style={styles.topProductTitle}>Producto Más Vendido</Text>
          <Text style={styles.topProductName}>{nombreProductoMasVendido.producto}</Text>
          <Text style={styles.topProductQuantity}>{nombreProductoMasVendido.cantidad} unidades vendidas</Text>
        </View>
      </View>
    </View>
  );

  const renderVentasPorMarca = () => (
    <View style={styles.marcasStatsContainer}>
      <Text style={styles.sectionTitle}>Ventas por Marca</Text>
      <View style={styles.marcasGrid}>
        {Object.entries(ventasPorMarca).map(([marca, cantidad]) => (
          <View key={marca} style={styles.marcaCard}>
            <Text style={styles.marcaNombre}>{marca}</Text>
            <Text style={styles.marcaCantidad}>{cantidad}</Text>
            <Text style={styles.marcaLabel}>unidades</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderVenta = ({ item }) => (
    <TouchableOpacity 
      style={styles.ventaItem}
      onPress={() => abrirDetalleVenta(item)}
      activeOpacity={0.8}
    >
      <View style={styles.ventaHeader}>
        <View style={styles.clienteContainer}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{item.cliente.charAt(0)}</Text>
          </View>
          <View style={styles.clienteInfo}>
            <Text style={styles.cliente}>{item.cliente}</Text>
            <Text style={styles.fecha}>{formatearFecha(item.fecha)}</Text>
          </View>
        </View>
        <View style={[
          styles.estadoBadge,
          item.estado === 'completada' ? styles.estadoCompletada : styles.estadoPendiente
        ]}>
          <Text style={[
            styles.estadoText,
            item.estado === 'completada' ? styles.estadoCompletadaText : styles.estadoPendienteText
          ]}>
            {item.estado === 'completada' ? '✓' : '⏳'}
          </Text>
        </View>
      </View>
      
      <View style={styles.ventaContent}>
        <Text style={styles.producto}>{item.producto}</Text>
        <Text style={styles.marca}>{item.marca}</Text>
        
        <View style={styles.ventaFooter}>
          <Text style={styles.cantidad}>Cantidad: {item.cantidad}</Text>
          <Text style={styles.total}>{formatearPrecio(item.cantidad * item.precioUnitario)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderDetalleModal = () => (
    <Modal
      visible={modalVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
            {ventaSeleccionada && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Detalle de Venta</Text>
                  <TouchableOpacity 
                    onPress={() => setModalVisible(false)}
                    style={styles.closeButton}
                  >
                    <Text style={styles.closeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.modalBody}>
                  <View style={styles.clienteModalContainer}>
                    <View style={styles.avatarContainerLarge}>
                      <Text style={styles.avatarTextLarge}>{ventaSeleccionada.cliente.charAt(0)}</Text>
                    </View>
                    <Text style={styles.clienteModalName}>{ventaSeleccionada.cliente}</Text>
                  </View>

                  <View style={styles.detalleItem}>
                    <Text style={styles.detalleLabel}>Producto</Text>
                    <Text style={styles.detalleValue}>{ventaSeleccionada.producto}</Text>
                  </View>

                  <View style={styles.detalleItem}>
                    <Text style={styles.detalleLabel}>Marca</Text>
                    <Text style={styles.detalleValue}>{ventaSeleccionada.marca}</Text>
                  </View>

                  <View style={styles.detalleRow}>
                    <View style={styles.detalleItem}>
                      <Text style={styles.detalleLabel}>Cantidad</Text>
                      <Text style={styles.detalleValue}>{ventaSeleccionada.cantidad}</Text>
                    </View>

                    <View style={styles.detalleItem}>
                      <Text style={styles.detalleLabel}>Precio Unitario</Text>
                      <Text style={styles.detalleValue}>{formatearPrecio(ventaSeleccionada.precioUnitario)}</Text>
                    </View>
                  </View>

                  <View style={styles.totalContainer}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalValue}>
                      {formatearPrecio(ventaSeleccionada.cantidad * ventaSeleccionada.precioUnitario)}
                    </Text>
                  </View>

                  <View style={styles.fechaContainer}>
                    <Text style={styles.fechaLabel}>Fecha de Venta</Text>
                    <Text style={styles.fechaValue}>{formatearFecha(ventaSeleccionada.fecha)}</Text>
                  </View>
                </View>
              </ScrollView>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
        <Text style={styles.loadingText}>Cargando ventas...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ventas</Text>
        <Text style={styles.headerSubtitle}>{ventas.length} transacciones</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {renderEstadisticas()}
        {renderGraficoPastel()}
        {renderProductoMasVendido()}
        {renderVentasPorMarca()}
        {renderFiltrosMarca()}
        
        <View style={styles.ventasListContainer}>
          <Text style={styles.sectionTitle}>
            Historial de Ventas {filtroMarca !== 'todas' && `- ${filtroMarca}`}
          </Text>
          <FlatList
            data={ventasFiltradas}
            keyExtractor={(item) => item.id}
            renderItem={renderVenta}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </ScrollView>

      {renderDetalleModal()}
      {renderChartModal()}
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
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
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
    fontSize: 16,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 4,
    textAlign: "center",
  },
  statLabel: {
    fontSize: 12,
    color: "#64748b",
    textAlign: "center",
    fontWeight: "500",
  },
  // Nuevos estilos para el gráfico de pastel
  chartContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  chartTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  chartIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 2,
  },
  chartSubtitle: {
    fontSize: 12,
    color: "#64748b",
  },
  expandButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  expandButtonText: {
    fontSize: 16,
  },
  chartImageContainer: {
    position: "relative",
    backgroundColor: "#f8fafc",
    borderRadius: 12,
    overflow: "hidden",
    minHeight: 200,
  },
  chartImage: {
    width: "100%",
    height: 200,
  },
  chartOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
    paddingVertical: 8,
    alignItems: "center",
  },
  chartOverlayText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
  },
  // Estilos para el modal del gráfico
  chartModalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  chartModalOverlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  chartModalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
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
  chartModalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  chartModalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
  },
  chartCloseButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#f1f5f9",
    justifyContent: "center",
    alignItems: "center",
  },
  chartCloseButtonText: {
    fontSize: 16,
    color: "#64748b",
    fontWeight: "600",
  },
  chartModalBody: {
    padding: 20,
    alignItems: "center",
  },
  chartImageLarge: {
    width: width - 80,
    height: (width - 80) * 0.8,
    marginBottom: 16,
  },
  chartDescription: {
    fontSize: 14,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  topProductContainer: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  topProductHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  topProductIcon: {
    fontSize: 32,
    marginRight: 16,
  },
  topProductInfo: {
    flex: 1,
  },
  topProductTitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
    marginBottom: 4,
  },
  topProductName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: 2,
  },
  topProductQuantity: {
    fontSize: 14,
    color: "#059669",
    fontWeight: "600",
  },
  marcasStatsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 16,
  },
  marcasGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  marcaCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    width: (width - 60) / 2,
    marginBottom: 12,
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
  marcaNombre: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
    textAlign: "center",
  },
  marcaCantidad: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6366f1",
    marginBottom: 2,
  },
  marcaLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  filtrosContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filtroTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 12,
  },
  filtrosList: {
    flexDirection: "row",
  },
  filtroItem: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filtroItemActivo: {
    backgroundColor: "#6366f1",
  },
  filtroText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  filtroTextActivo: {
    color: "#fff",
  },
  ventasListContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  ventaItem: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  ventaHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  clienteContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  clienteInfo: {
    flex: 1,
  },
  cliente: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 2,
  },
  fecha: {
    fontSize: 12,
    color: "#64748b",
  },
  estadoBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  estadoCompletada: {
    backgroundColor: "#dcfce7",
  },
  estadoPendiente: {
    backgroundColor: "#fef3c7",
  },
  estadoText: {
    fontSize: 12,
    fontWeight: "600",
  },
  estadoCompletadaText: {
    color: "#166534",
  },
  estadoPendienteText: {
    color: "#92400e",
  },
  ventaContent: {
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    paddingTop: 12,
  },
  producto: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 4,
  },
  marca: {
    fontSize: 14,
    color: "#6366f1",
    fontWeight: "500",
    marginBottom: 12,
  },
  ventaFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cantidad: {
    fontSize: 14,
    color: "#64748b",
  },
  total: {
    fontSize: 18,
    fontWeight: "700",
    color: "#059669",
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
    maxHeight: "80%",
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
  modalBody: {
    padding: 20,
  },
  clienteModalContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainerLarge: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarTextLarge: {
    fontSize: 24,
    fontWeight: "600",
    color: "#fff",
  },
  clienteModalName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1e293b",
  },
  detalleItem: {
    marginBottom: 16,
  },
  detalleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  detalleLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 4,
  },
  detalleValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
  totalContainer: {
    backgroundColor: "#f8fafc",
    padding: 16,
    borderRadius: 12,
    marginVertical: 16,
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 4,
  },
  totalValue: {
    fontSize: 24,
    fontWeight: "700",
    color: "#059669",
  },
  fechaContainer: {
    alignItems: "center",
  },
  fechaLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748b",
    marginBottom: 4,
  },
  fechaValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1e293b",
  },
});