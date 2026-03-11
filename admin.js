// admin.js

// Cargar datos guardados al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
    mostrarProductos();
    mostrarPedidos();
});

function cargarDatos() {
    // Cargar en los inputs los valores guardados
    document.getElementById('slide1').value = localStorage.getItem('slide1') || 'https://via.placeholder.com/400x200/ff7eb3/fff?text=Oferta+1';
    document.getElementById('slide2').value = localStorage.getItem('slide2') || 'https://via.placeholder.com/400x200/7f5eff/fff?text=Nueva+Coleccion';
    document.getElementById('slide3').value = localStorage.getItem('slide3') || 'https://via.placeholder.com/400x200/ffd166/000?text=Descuentos';
    document.getElementById('notifMensaje').value = localStorage.getItem('notificacion') || 'Bienvenidos a la nueva tienda.';
    document.getElementById('blogMensaje').value = localStorage.getItem('blog') || 'Bienvenidos a la nueva tienda. Pronto más actualizaciones.';
}

function guardarCarrusel() {
    localStorage.setItem('slide1', document.getElementById('slide1').value);
    localStorage.setItem('slide2', document.getElementById('slide2').value);
    localStorage.setItem('slide3', document.getElementById('slide3').value);
    alert('✅ Carrusel actualizado');
}

function guardarNotificacion() {
    localStorage.setItem('notificacion', document.getElementById('notifMensaje').value);
    alert('🔔 Notificación enviada');
}

function guardarBlog() {
    localStorage.setItem('blog', document.getElementById('blogMensaje').value);
    alert('📝 Blog actualizado');
}

// Gestión de productos
let productos = JSON.parse(localStorage.getItem('productos')) || [];

function mostrarProductos() {
    const lista = document.getElementById('productosList');
    lista.innerHTML = '';
    productos.forEach((p, index) => {
        lista.innerHTML += `
            <div class="product-item">
                <span><b>${p.nombre}</b> - $${p.precio}</span>
                <div>
                    <button onclick="editarProducto(${index})">✏️</button>
                    <button onclick="eliminarProducto(${index})">🗑️</button>
                </div>
            </div>
        `;
    });
}

function agregarProducto() {
    const nuevo = {
        id: Date.now(),
        nombre: document.getElementById('newNombre').value,
        precio: parseFloat(document.getElementById('newPrecio').value),
        descripcion: document.getElementById('newDesc').value,
        img: document.getElementById('newImg').value || 'https://via.placeholder.com/300x300'
    };
    productos.push(nuevo);
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos();
    // Limpiar campos
    document.getElementById('newNombre').value = '';
    document.getElementById('newPrecio').value = '';
    document.getElementById('newDesc').value = '';
    document.getElementById('newImg').value = '';
}

function eliminarProducto(index) {
    productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos();
}

function editarProducto(index) {
    const p = productos[index];
    // Rellenar los campos de nuevo para editar (simplificado)
    document.getElementById('newNombre').value = p.nombre;
    document.getElementById('newPrecio').value = p.precio;
    document.getElementById('newDesc').value = p.descripcion;
    document.getElementById('newImg').value = p.img;
    // Eliminar el viejo y luego agregar
    productos.splice(index, 1);
}

// Pedidos
function mostrarPedidos() {
    const pedidos = JSON.parse(localStorage.getItem('pedidos')) || [];
    const div = document.getElementById('pedidosList');
    if(pedidos.length === 0) {
        div.innerHTML = 'No hay pedidos aún.';
        return;
    }
    div.innerHTML = pedidos.map(p => `
        <div style="background:#f0f0f0; padding:10px; margin:5px 0; border-radius:10px;">
            <p><b>${p.nombre}</b> - ${p.celular} - ${p.correo}</p>
            <p>Productos: ${p.productos.map(prod => prod.nombre).join(', ')}</p>
        </div>
    `).join('');
}