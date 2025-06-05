// importarProductos.js

import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCkbID3St4-pjHOykF3qdDx4i9ZqJJDyaM",
  authDomain: "venmol-49d25.firebaseapp.com",
  projectId: "venmol-49d25",
  storageBucket: "venmol-49d25.appspot.com",
  messagingSenderId: "629793032729",
  appId: "1:629793032729:web:9c46e9e71bd857c8a3b888",
  measurementId: "G-MQ2YJ5CQYJ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

const productos = [
  {
    cantidad: 6,
    marca: "Jamieson",
    nombre: "Acido hyaluronico",
    descripcion: "Serum facial de ácido hialurónico para regresar la firmeza y rellenar las líneas de expresión",
    precio: 12,
    imagen: "https://walmartsv.vtexassets.com/arquivos/ids/623668/46701_01.jpg?v=638690573632470000"
  },
  {
    cantidad: 2,
    marca: "Roc",
    nombre: "Multi correxion",
    descripcion: "Crema facial correctiva para las líneas de expresión",
    precio: 22,
    imagen: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
  },
  {
    cantidad: 1,
    marca: "Roc",
    nombre: "Eye balm",
    descripcion: "Bálsamo para el contorno de ojos que ayuda con las ojeras y las líneas de expresión",
    precio: 18,
    imagen: "https://static.beautytocare.com/cdn-cgi/image/width=1600,height=1600,f=auto/media/catalog/product//s/k/skinceuticals-eye-balm-14g_1.jpg"
  },
  {
    cantidad: 1,
    marca: "Roc",
    nombre: "Crema de Retinol",
    descripcion: "Crema facial con retinol que ayuda a restaurar la piel",
    precio: 22,
    imagen: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    cantidad: 2,
    marca: "N7",
    nombre: "Avanced Ingredient",
    descripcion: "Cápsulas de crema facial con vitaminas",
    precio: 20,
    imagen: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/sol/sol03461/y/69.jpg"
  },
  {
    cantidad: 1,
    marca: "Neutrogena",
    nombre: "Jabon facial",
    descripcion: "Jabón facial para todo tipo de pieles que elimina las impurezas",
    precio: 18,
    imagen: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    cantidad: 2,
    marca: "Olay",
    nombre: "Clay stick",
    descripcion: "Exfoliante en barra facial",
    precio: 15,
    imagen: "https://bodysolution.com.mx/wp-content/uploads/2022/07/Barra-exfoliante-epoch%C2%AE-NU-SKIN.webp"
  },
  {
    cantidad: 1,
    marca: "Olay",
    nombre: "Regenerist",
    descripcion: "Jabón facial regenerativo para la piel facial",
    precio: 15,
    imagen: "https://images.pexels.com/photos/4041393/pexels-photo-4041393.jpeg"
  },
  {
    cantidad: 6,
    marca: "",
    nombre: "Vitamina E facial",
    descripcion: "Cápsulas de vitamina E facial, cada una con una función específica",
    precio: 12,
    imagen: "https://cloudinary.images-iherb.com/image/upload/f_auto,q_auto:eco/images/nrt/nrt01751/y/30.jpg"
  },
  {
    cantidad: 4,
    marca: "Physicians",
    nombre: "Formula para maquillaje",
    descripcion: "",
    precio: 8,
    imagen: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    cantidad: 4,
    marca: "Kiwi",
    nombre: "Botanicals limpiador facial",
    descripcion: "Gel limpiador facial de rostro",
    precio: 10,
    imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjYznQh5TIPamrnIVx0juM-rkMHD6nd5_99w&s"
  },
  {
    cantidad: 2,
    marca: "Gold",
    nombre: "Neck and Chest",
    descripcion: "Crema reafirmante para cuello y pechos",
    precio: 20,
    imagen: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    cantidad: 1,
    marca: "Cetaphil",
    nombre: "Crema facial",
    descripcion: "Crema facial hidratante de día",
    precio: 20,
    imagen: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
  },
  {
    cantidad: 1,
    marca: "Bliss",
    nombre: "Ácido hyaluronico",
    descripcion: "Crema facial hidratante con ácido hialurónico de día",
    precio: 20,
    imagen: "https://siman.vtexassets.com/arquivos/ids/5881898-800-800?v=638545857608200000&width=800&height=800&aspect=true"
  },
  {
    cantidad: 1,
    marca: "Loreal",
    nombre: "Crema Facial Gold",
    descripcion: "Crema facial para mayores de 50 años",
    precio: 20,
    imagen: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    cantidad: 1,
    marca: "Olay",
    nombre: "Crema facial whip",
    descripcion: "Crema facial pensada para los 7 signos",
    precio: 20,
    imagen: "https://images.pexels.com/photos/3373739/pexels-photo-3373739.jpeg"
  },
  {
    cantidad: 1,
    marca: "Neutrogena",
    nombre: "Crema noche",
    descripcion: "Crema facial de noche hidratante",
    precio: 20,
    imagen: "https://images.pexels.com/photos/4041391/pexels-photo-4041391.jpeg"
  },
  {
    cantidad: 2,
    marca: "La Roche-Posay",
    nombre: "Hyalu B5",
    descripcion: "Crema facial con vitamina B5 y ácido hialurónico",
    precio: 20,
    imagen: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  },
  {
    cantidad: 1,
    marca: "La Roche-Posay",
    nombre: "Effaclar K",
    descripcion: "Crema facial para tratar el acné",
    precio: 20,
    imagen: "https://dermacentergt.com/wp-content/uploads/2024/02/P029771.jpg"
  },
  {
    cantidad: 9,
    marca: "La Roche-Posay",
    nombre: "Niacinamida",
    descripcion: "Serum facial de niacinamida para aclarar la piel facial",
    precio: 20,
    imagen: "https://e00-telva.uecdn.es/assets/multimedia/imagenes/2019/10/13/15709759073661.jpg"
  },
  {
    cantidad: 5,
    marca: "La Roche-Posay",
    nombre: "Aqua gel de ácido hialurónico",
    descripcion: "Gel facial hidratante de ácido hialurónico",
    precio: 20,
    imagen: "https://m.media-amazon.com/images/I/51WdR5EyrHL._SL1080_.jpg"
  },
  {
    cantidad: 4,
    marca: "Cerave",
    nombre: "Crema facial Uso Diario",
    descripcion: "Crema facial hidratante de uso diario que incluye un filtro solar SPF25",
    precio: 20,
    imagen: "https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg"
  },
  {
    cantidad: 1,
    marca: "Avene",
    nombre: "Crema facial hidratante",
    descripcion: "Crema facial hidratante para pieles sensibles",
    precio: 20,
    imagen: "https://images.unsplash.com/photo-1625772452859-1c03d5bf1137?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
  }
];

// Función para subir los productos a Firestore (a la base de venmol)
async function subirProductos() {
  try {
    for (const producto of productos) {
      // Crea un nuevo documento en la colección "productos" con ID automartico que lo genera Firestore
      await db.collection("productos").add(producto);
      console.log(`Producto "${producto.nombre}" subido correctamente.`);
    }
    console.log("Todos los productos se han subido exitosamente.");
  } catch (error) {
    console.error("Error subiendo productos: ", error);
  }
}

// Ejecutar la función
subirProductos();
