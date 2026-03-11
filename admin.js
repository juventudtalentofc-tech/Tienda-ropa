// Variables globales
let productos = [];
let pedidos = [];

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
    mostrarProductos();
    mostrarPedidos();
    cargarValoresEnInputs();
});

function cargarDatos() {
    // Cargar productos
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
        productos = JSON.parse(productosGuardados);
    }
    
    // Cargar pedidos
    const pedidosGuardados = localStorage.getItem('pedidos');
    if (pedidosGuardados) {
        pedidos = JSON.parse(pedidosGuardados);
    }
}

function cargarValoresEnInputs() {
    // Cargar slides
    const slidesGuardados = localStorage.getItem('slides');
    if (slidesGuardados) {
        const slides = JSON.parse(slidesGuardados);
        document.getElementById('slide1').value = slides[0] || '';
        document.getElementById('slide2').value = slides[1] || '';
        document.getElementById('slide3').value = slides[2] || '';
    }
    
    // Cargar notificación
    const notif = localStorage.getItem('notificacion');
    if (notif) {
        document.getElementById('notifMensaje').value = notif;
    }
    
    // Cargar blog
    const blog = localStorage.getItem('blog');
    if (blog) {
        document.getElementById('blogMensaje').value = blog;
    }
    
    // Cargar flyers
    const flyersGuardados = localStorage.getItem('flyers');
    if (flyersGuardados) {
        const flyers = JSON.parse(flyersGuardados);
        document.getElementById('flyer1').value = flyers[0] || '';
        document.getElementById('flyer2').value = flyers[1] || '';
        document.getElementById('flyer3').value = flyers[2] || '';
    }
}

function mostrarSeccion(seccion) {
    // Ocultar todas las secciones
    document.getElementById('seccion-carrusel').style.display = 'none';
    document.getElementById('seccion-productos').style.display = 'none';
    document.getElementById('seccion-notificacion').style.display = 'none';
    document.getElementById('seccion-blog').style.display = 'none';
    document.getElementById('seccion-flyers').style.display = 'none';
    document.getElementById('seccion-pedidos').style.display = 'none';
    
    // Mostrar la sección seleccionada
    document.getElementById(`seccion-${seccion}`).style.display = 'block';
    
    // Actualizar tabs
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
}

function guardarCarrusel() {
    const slides = [
        document.getElementById('slide1').value,
        document.getElementById('slide2').value,
        document.getElementById('slide3').value
    ];
    
    localStorage.setItem('slides', JSON.stringify(slides));
    alert('✅ Carrusel guardado correctamente');
}

function guardarNotificacion() {
    const mensaje = document.getElementById('notifMensaje').value;
    localStorage.setItem('notificacion', mensaje);
    alert('🔔 Notificación guardada');
}

function guardarBlog() {
    const mensaje = document.getElementById('blogMensaje').value;
    localStorage.setItem('blog', mensaje);
    alert('📝 Blog actualizado');
}

function guardarFlyers() {
    const flyers = [
        document.getElementById('flyer1').value,
        document.getElementById('flyer2').value,
        document.getElementById('flyer3').value
    ].filter(url => url.trim() !== '');
    
    localStorage.setItem('flyers', JSON.stringify(flyers));
    alert('🎯 Flyers guardados');
}

function agregarProducto() {
    const nombre = document.getElementById('prodNombre').value;
    const precio = parseFloat(document.getElementById('prodPrecio').value);
    const desc = document.getElementById('prodDesc').value;
    const img = document.getElementById('prodImg').value;
    
    if (!nombre || !precio || !desc || !img) {
        alert('❌ Todos los campos son obligatorios');
        return;
    }
    
    const nuevoProducto = {
        id: Date.now(),
        nombre: nombre,
        precio: precio,
        descripcion: desc,
        img: img
    };
    
    productos.push(nuevoProducto);
    localStorage.setItem('productos', JSON.stringify(productos));
    
    // Limpiar campos
    document.getElementById('prodNombre').value = '';
    document.getElementById('prodPrecio').value = '';
    document.getElementById('prodDesc').value = '';
    document.getElementById('prodImg').value = '';
    
    mostrarProductos();
    alert('✅ Producto agregado');
}

function mostrarProductos() {
    const lista = document.getElementById('productosLista');
    
    if (productos.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #666;">No hay productos aún</p>';
        return;
    }
    
    lista.innerHTML = '';
    productos.forEach((producto, index) => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.innerHTML = `
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <p>$${producto.precio.toFixed(2)} - ${producto.descripcion}</p>
            </div>
            <div class="product-actions">
                <button onclick="editarProducto(${index})">✏️</button>
                <button class="danger" onclick="eliminarProducto(${index})">🗑️</button>
            </div>
        `;
        lista.appendChild(item);
    });
}

function editarProducto(index) {
    const producto = productos[index];
    
    document.getElementById('prodNombre').value = producto.nombre;
    document.getElementById('prodPrecio').value = producto.precio;
    document.getElementById('prodDesc').value = producto.descripcion;
    document.getElementById('prodImg').value = producto.img;
    
    // Eliminar el viejo
    productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(productos));
    mostrarProductos();
    
    // Cambiar a la sección de productos
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('[onclick="mostrarSeccion(\'productos\')"]').classList.add('active');
    mostrarSeccion('productos');
}

function eliminarProducto(index) {
    if (confirm('¿Eliminar producto?')) {
        productos.splice(index, 1);
        localStorage.setItem('productos', JSON.stringify(productos));
        mostrarProductos();
    }
}

function mostrarPedidos() {
    const lista = document.getElementById('pedidosLista');
    
    if (pedidos.length === 0) {
        lista.innerHTML = '<p style="text-align: center; color: #666;">No hay pedidos aún</p>';
        return;
    }
    
    lista.innerHTML = '';
    pedidos.reverse().forEach(pedido => {
        const item = document.createElement('div');
        item.className = 'product-item';
        item.style.flexDirection = 'column';
        item.style.alignItems = 'flex-start';
        
        let productosHtml = '';
        pedido.productos.forEach(p => {
            productosHtml += `<li>${p.nombre} - $${p.precio.toFixed(2)}</li>`;
        });
        
        item.innerHTML = `
            <div style="width: 100%;">
                <h3>Pedido #${pedido.id}</h3>
                <p><strong>Cliente:</strong> ${pedido.nombre}</p>
                <p><strong>Teléfono:</strong> ${pedido.telefono}</p>
                <p><strong>Email:</strong> ${pedido.email}</p>
                <p><strong>Fecha:</strong> ${pedido.fecha}</p>
                <p><strong>Productos:</strong></p>
                <ul>${productosHtml}</ul>
                <p><strong>Total:</strong> $${pedido.total.toFixed(2)}</p>
            </div>
        `;
        lista.appendChild(item);
    });
}
