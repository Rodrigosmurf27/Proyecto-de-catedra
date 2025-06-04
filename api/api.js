import axios from "axios";

// URL base del backend en Azure que manejará usuarios y datos
export const API_URL = "https://tu-backend-azure.azurewebsites.net/api";

// Autenticación consultando el backend en Azure
export async function login(username, password) {
  try {
    const res = await axios.post(`${API_URL}/login`, { username, password });
    return res.data;
  } catch (e) {
    return { success: false };
  }
}

// Registro de usuarios en Azure
export async function register(username, password) {
  try {
    const res = await axios.post(`${API_URL}/users`, {
      username,
      password
    });
    return res.data;
  } catch (e) {
    return { success: false };
  }
}

// Productos
export async function fetchProductos() {
  const res = await axios.get(`${API_URL}/productos`);
  return res.data;
}
// Puedes agregar más métodos CRUD para proveedores, clientes, etc.
