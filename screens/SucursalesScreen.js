import React from "react";
import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const sucursales = [
  {
    nombre: "Sucursal Soyapango",
    direccion: "PV84+69P, Autop. Este Oeste, Soyapango",
    latitud: 13.715250,
    longitud: -89.142540,
  },
  {
    nombre: "Sucursal Bethoven",
    direccion: "Calle Nueva 1 casa 3832",
    latitud: 13.700196226117594,  
    longitud: -89.2316663405651,
  }
];

export default function SucursalesScreen() {
  // Centra el mapa entre las sucursales
  const region = {
    latitude: (sucursales[0].latitud + sucursales[1].latitud) / 2,
    longitude: (sucursales[0].longitud + sucursales[1].longitud) / 2,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={region}
        showsUserLocation={false}
      >
        {sucursales.map((suc, i) => (
          <Marker
            key={i}
            coordinate={{ latitude: suc.latitud, longitude: suc.longitud }}
            title={suc.nombre}
          />
        ))}
      </MapView>
    </View>
  );
}
