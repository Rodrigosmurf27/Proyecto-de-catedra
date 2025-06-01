import axios from "axios";

export const API_URL = "https://6837d1402c55e01d184aeb28.mockapi.io";


// LOGIN FAKE PARA DEMO
export async function login(username, password) {
  // Aquí deberías consultar una API real de usuarios
  if (username === "admin" && password === "admin") {
    return { success: true, rol: "admin" };
  } else if (username === "trabajador" && password === "trabajador") {
    return { success: true, rol: "trabajador" };
  } else {
    return { success: false };
  }
}

// Productos
export async function fetchProductos() {
  const res = await axios.get(`${API_URL}/productos`);
  return res.data;
}
// Puedes agregar más métodos CRUD para proveedores, clientes, etc.
