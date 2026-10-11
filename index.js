// Importamos Express
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para que Express entienda peticiones con cuerpo en formato JSON
app.use(express.json());

// ==========================================
// BASE DE DATOS EN MEMORIA (ARREGLOS)
// ==========================================
let usuarios = [
  { id: 1, nombre: 'Andrea Cortes', email: 'andrea@correo.com', activo: true },
  { id: 2, nombre: 'Carlos Lopez', email: 'carlos@correo.com', activo: true }
];

let productos = [
  { id: 101, nombre: 'Bolsas biodegradables', categoria: 'Empaques', precio: 15.50, stock: 200 },
  { id: 102, nombre: 'Envases rígidos PET', categoria: 'Contenedores', precio: 8.00, stock: 500 },
  { id: 103, nombre: 'Película estirable', categoria: 'Embalaje', precio: 120.00, stock: 80 }
];

// Ruta inicial de bienvenida
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor Backend de la Unidad 4 activo' });
});

// =======================================================
// ENDPOINT 1: Consulta de productos o entidades (GET)
// =======================================================
app.get('/api/productos', (req, res) => {
  res.status(200).json({
    exito: true,
    mensaje: 'Listado de productos obtenido correctamente',
    datos: productos
  });
});

// =======================================================
// ENDPOINT 2: Registro de nuevo usuario (POST)
// =======================================================
app.post('/api/usuarios', (req, res) => {
  const { nombre, email } = req.body;

  // Validación básica
  if (!nombre || !email) {
    return res.status(400).json({
      exito: false,
      mensaje: 'Faltan campos obligatorios: nombre y email'
    });
  }

  const nuevoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nombre,
    email,
    activo: true
  };

  usuarios.push(nuevoUsuario);

  res.status(201).json({
    exito: true,
    mensaje: 'Usuario registrado exitosamente',
    datos: nuevoUsuario
  });
});

// =======================================================
// ENDPOINT 3: Actualización de perfil (PUT)
// =======================================================
app.put('/api/usuarios/:id', (req, res) => {
  const idUsuario = parseInt(req.params.id);
  const { nombre, email } = req.body;

  const index = usuarios.findIndex(u => u.id === idUsuario);

  if (index === -1) {
    return res.status(404).json({
      exito: false,
      mensaje: `Usuario con ID ${idUsuario} no encontrado`
    });
  }

  // Actualizamos solo los campos enviados
  if (nombre) usuarios[index].nombre = nombre;
  if (email) usuarios[index].email = email;

  res.status(200).json({
    exito: true,
    mensaje: 'Perfil de usuario actualizado exitosamente',
    datos: usuarios[index]
  });
});

// =======================================================
// ENDPOINT 4: Eliminación lógica (DELETE)
// =======================================================
app.delete('/api/usuarios/:id', (req, res) => {
  const idUsuario = parseInt(req.params.id);

  const usuario = usuarios.find(u => u.id === idUsuario);

  if (!usuario) {
    return res.status(404).json({
      exito: false,
      mensaje: `Usuario con ID ${idUsuario} no encontrado`
    });
  }

  // Eliminación lógica: cambiamos el estado 'activo' a false
  usuario.activo = false;

  res.status(200).json({
    exito: true,
    mensaje: `Usuario con ID ${idUsuario} desactivado exitosamente (eliminación lógica)`,
    datos: usuario
  });
});

// Encendemos el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en: http://localhost:${PORT}`);
});