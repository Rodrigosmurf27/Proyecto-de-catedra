import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, font, sizes } from "../theme";

const VentaResumen = ({ venta }) => (
  <View style={styles.card}>
    <Text style={styles.titulo}>Venta #{venta.id}</Text>
    <Text style={styles.info}>Empleado: <Text style={styles.valor}>{venta.empleado}</Text></Text>
    <Text style={styles.info}>Fecha: <Text style={styles.valor}>{venta.fecha}</Text></Text>
    <Text style={styles.total}>Total: <Text style={styles.totalValor}>${venta.total}</Text></Text>
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
  titulo: {
    fontFamily: font.bold,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 8
  },
  info: {
    fontFamily: font.regular,
    color: colors.textSecondary,
    fontSize: 15,
    marginBottom: 2
  },
  valor: {
    color: colors.text,
    fontWeight: "bold"
  },
  total: {
    fontFamily: font.bold,
    color: colors.textSecondary,
    fontSize: 16,
    marginTop: 8
  },
  totalValor: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 16
  }
});

export default VentaResumen;
