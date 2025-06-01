import React, { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import SucursalCard from "../components/SucursalCard";
import axios from "axios";
import { API_URL } from "../api/api";

export default function SucursalesScreen() {
  const [sucursales, setSucursales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API_URL}/sucursales`).then(res => {
      setSucursales(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) return <ActivityIndicator size="large" color="#6200ee" style={{ flex: 1 }} />;
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sucursales}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <SucursalCard sucursal={item} />}
      />
    </View>
  );
}
