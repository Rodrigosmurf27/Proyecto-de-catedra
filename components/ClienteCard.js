import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, sizes, font } from "../theme"; 

const ClienteCard = ({ cliente }) => (
  <View style={styles.card}>
    <Text style={styles.nombre}>{cliente.nombre}</Text>
    <Text style={styles.info}>Teléfono: {cliente.telefono}</Text>
    <Text style={styles.info}>Email: {cliente.correo}</Text>
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
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
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
    fontSize: 15
  }
});

export default ClienteCard;
