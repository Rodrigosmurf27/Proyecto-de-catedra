import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ClientesScreen from "../screens/ClientesScreen";
import VentasScreen from "../screens/VentasScreen";
import SucursalesScreen from "../screens/SucursalesScreen";
import InventarioScreen from "../screens/InventarioScreen";
import ProductosScreen from "../screens/ProductosScreen";
import ProveedoresScreen from "../screens/ProveedoresScreen";
import { Ionicons } from "@expo/vector-icons";
import { colors, font } from "../theme";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Clientes") iconName = "people";
          else if (route.name === "Ventas") iconName = "stats-chart";
          else if (route.name === "Sucursales") iconName = "business";
          else if (route.name === "Inventario") iconName = "albums";
          else if (route.name === "Productos") iconName = "pricetags";
          else if (route.name === "Proveedores") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#fff9",
        tabBarStyle: {
          backgroundColor: colors.primary,
          borderTopWidth: 0,
          borderTopColor: colors.border,
          height: 68,
          paddingBottom: 10,
          paddingTop: 4,
          shadowColor: colors.cardShadow,
          shadowOpacity: 0.09,
          shadowOffset: { width: 0, height: -2 },
          shadowRadius: 8,
          elevation: 8
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: font.bold
        },
        headerShown: false
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: "Inicio" }} />
      <Tab.Screen name="Inventario" component={InventarioScreen} />
      <Tab.Screen name="Productos" component={ProductosScreen} />
      <Tab.Screen name="Proveedores" component={ProveedoresScreen} />
      <Tab.Screen name="Clientes" component={ClientesScreen} />
      <Tab.Screen name="Ventas" component={VentasScreen} />
      <Tab.Screen name="Sucursales" component={SucursalesScreen} />
    </Tab.Navigator>
  );
}
