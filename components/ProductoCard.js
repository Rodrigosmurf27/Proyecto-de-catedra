import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors, font, sizes } from "../theme";

const ProductoCard = ({ producto }) => (
  <View style={styles.card}>
    <Image source={{ uri: producto.imagen }} style={styles.imagen} />
    <View style={styles.infoContainer}>
      <Text style={styles.nombre} numberOfLines={1}>{producto.nombre}</Text>
      <Text style={styles.descripcion} numberOfLines={2}>{producto.descripcion}</Text>
      <Text style={styles.info}>Precio: <Text style={styles.precio}>${producto.precio}</Text></Text>
      <Text style={styles.info}>Stock: <Text style={styles.stock}>{producto.cantidad}</Text></Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: sizes.cardMargin,
    marginHorizontal: sizes.cardMargin,
    backgroundColor: colors.cardBg,
    borderRadius: sizes.borderRadius,
    padding: sizes.cardPadding,
    shadowColor: colors.cardShadow,
    shadowOpacity: 0.14,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: colors.border
  },
  imagen: {
    width: 80,
    height: 80,
    marginRight: 18,
    borderRadius: 12,
    backgroundColor: "#f8e4f5"
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center"
  },
  nombre: {
    fontFamily: font.bold,
    fontSize: 18,
    color: colors.primary,
    marginBottom: 2
  },
  descripcion: {
    fontFamily: font.regular,
    fontSize: 15,
    color: colors.textSecondary,
    marginBottom: 4
  },
  info: {
    fontFamily: font.regular,
    color: colors.textSecondary,
    fontSize: 14,
    marginTop: 2
  },
  precio: {
    color: colors.primary,
    fontWeight: "bold"
  },
  stock: {
    color: "#22c55e", // Un verde bonito para el stock
    fontWeight: "bold"
  }
});

export default ProductoCard;
