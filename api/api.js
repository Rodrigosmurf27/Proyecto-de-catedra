import axios from "axios";

// URL base del backend en Azure que manejará usuarios y datos
export const API_URL = "https://venmol-fuhrbtahe8fsdtd2.eastus-01.azurewebsites.net";

//login
export const login = async (username, password) => {
  try {
    const res = await fetch(`${API_URL}/login.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//registro
export const register = async (username, password) => {
  try {
    const res = await fetch(`${API_URL}/register.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//clientes
export const listarClientes = async () => {
  try {
    const res = await fetch(`${API_URL}/listar_clientes.php`);
    return await res.json(); // { success: true, clientes: [...] }
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//addcliente
export const addCliente = async (nombre, telefono, correo) => {
  try {
    const res = await fetch(`${API_URL}/add_cliente.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, telefono, correo }),
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
}; 

//addProveedor
export const addProveedor = async (nombre, telefono, correo, marca) => {
  try {
    const res = await fetch(`${API_URL}/add_proveedor.php`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, telefono, correo, marca }),
    });
    return await res.json();
  } catch (err) {
    return { success: false, error: err.message };
  }
};

//listarProveedores
export const listarProveedores = async () => {
  try {
    const res = await fetch(`${API_URL}/listar_proveedores.php`);
    return await res.json(); // { success: true, proveedores: [...] }
  } catch (err) {
    return { success: false, error: err.message };
  }
};


// Productos
export async function fetchProductos() {
  const res = await axios.get(`${API_URL}/productos`);
  return res.data;
}