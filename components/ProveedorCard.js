import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, font, sizes } from "../theme";

const ProveedorCard = ({ proveedor }) => (
  <View style={styles.card}>
    <Text style={styles.nombre}>{proveedor.nombre}</Text>
    <Text style={styles.info}>Teléfono: {proveedor.telefono}</Text>
    <Text style={styles.info}>Correo: {proveedor.correo}</Text>
    <Text style={styles.marca}>Marca: <Text style={styles.marcaNombre}>{proveedor.marca}</Text></Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    marginVertical: sizes.cardMargin,
    marginHorizontal: sizes.cardMargin,
    backgroundColor: colors.cardBg,
    borderRadius: sizes.borderRadius,
    padding: sizes.cardPadding,
    shadowColor: colors.cardShadow,
    shadowOpacity: 0.13,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.border
  },
  nombre: {
    fontFamily: font.bold,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 6
  },
  info: {
    fontFamily: font.regular,
    color: colors.textSecondary,
    fontSize: 15,
    marginBottom: 2
  },
  marca: {
    fontFamily: font.regular,
    color: colors.textSecondary,
    fontSize: 15,
    marginTop: 2
  },
  marcaNombre: {
    color: colors.primary,
    fontWeight: "bold"
  }
});

export default ProveedorCard;

