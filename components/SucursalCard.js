import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, font, sizes } from "../theme";

const SucursalCard = ({ sucursal }) => (
  <View style={styles.card}>
    <Text style={styles.nombre}>{sucursal.nombre}</Text>
    <Text style={styles.direccion}>Dirección: <Text style={styles.direccionTexto}>{sucursal.direccion}</Text></Text>
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
    shadowOpacity: 0.14,
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
    marginBottom: 8
  },
  direccion: {
    fontFamily: font.regular,
    color: colors.textSecondary,
    fontSize: 15
  },
  direccionTexto: {
    color: colors.text,
    fontWeight: "bold"
  }
});

export default SucursalCard;
