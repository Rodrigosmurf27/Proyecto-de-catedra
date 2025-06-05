import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: "https://i.imgur.com/9lpoUGW.jpeg" }}
              style={styles.logoImage}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.title}>Bienvenido a</Text>
          <Text style={styles.brandName}>Venmol Inventario</Text>
        </View>

        {/* Beauty Products Banner */}
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: "https://i.imgur.com/gSusASg.jpeg" }}
            style={styles.bannerImage}
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerText}>Productos de Belleza</Text>
            <Text style={styles.bannerSubtext}>Calidad y estilo</Text>
          </View>
        </View>

        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>¡Hola! 👋</Text>
          <Text style={styles.welcomeText}>
            Gestiona tu inventario de forma eficiente y organizada
          </Text>
        </View>

        {/* Features Section */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>¿Qué puedes hacer?</Text>
          
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📦</Text>
              <Text style={styles.featureText}>Gestionar productos e inventario</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🏪</Text>
              <Text style={styles.featureText}>Administrar proveedores</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>👥</Text>
              <Text style={styles.featureText}>Controlar clientes</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>💳</Text>
              <Text style={styles.featureText}>Registrar ventas</Text>
            </View>
            
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🏢</Text>
              <Text style={styles.featureText}>Manejar sucursales</Text>
            </View>
          </View>
        </View>

        {/* Navigation Hint */}
        <View style={styles.navigationHint}>
          <Text style={styles.hintText}>
            Usa la navegación inferior para acceder a todas las funciones
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdf2f8", // Rosa muy claro de fondo
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    padding: 2,
  },
  logoImage: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  title: {
    fontSize: 18,
    color: "#9f1239", // Rosa oscuro
    marginBottom: 5,
  },
  brandName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#be185d", // Rosa medio-oscuro
    textAlign: "center",
  },
  bannerContainer: {
    position: "relative",
    marginBottom: 25,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  bannerImage: {
    width: "100%",
    height: 160,
  },
  bannerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(190, 24, 93, 0.8)", // Rosa semi-transparente
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  bannerSubtext: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    opacity: 0.9,
    marginTop: 2,
  },
  welcomeCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    marginBottom: 25,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderLeftWidth: 4,
    borderLeftColor: "#f472b6", // Rosa claro
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#be185d",
    marginBottom: 8,
  },
  welcomeText: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 22,
  },
  featuresContainer: {
    marginBottom: 25,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#be185d",
    marginBottom: 20,
    textAlign: "center",
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#ec4899",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 3,
    borderLeftColor: "#f9a8d4", // Rosa muy claro
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  featureText: {
    fontSize: 16,
    color: "#374151",
    flex: 1,
  },
  navigationHint: {
    backgroundColor: "#fce7f3", // Rosa muy claro
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: "#f9a8d4",
  },
  hintText: {
    fontSize: 14,
    color: "#9f1239",
    textAlign: "center",
    fontStyle: "italic",
  },
});