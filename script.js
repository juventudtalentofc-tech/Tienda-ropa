// Variables globales
let productos = [];
let carrito = [];
let notificacionActual = "Bienvenido a Glash Wear";
let blogActual = "Las mejores prendas con estilo único";
let slidesActuales = [];
let flyersActuales = [];

// Cargar datos al iniciar
document.addEventListener('DOMContentLoaded', function() {
    cargarDatosGuardados();
    renderizarProductos();
    configurarEventos();
    iniciarSlider();
});

function cargarDatosGuardados() {
    // Cargar productos
    const productosGuardados = localStorage.getItem('productos');
    if (productosGuardados) {
        productos = JSON.parse(productosGuardados);
    } else {
        // Productos de ejemplo
        productos = [
            { id: 1, nombre: 'Camiseta Básica', precio: 25.99, descripcion: 'Algodón 100%', img: 'https://via.placeholder.com/300x300/ff7eb3/fff?text=Camiseta' },
            { id: 2, nombre: 'Jean Clásico', precio: 45.50, descripcion: 'Corte recto', img: 'https://via.placeholder.com/300x300/7f5eff/fff?text=Jean' },
            { id: 3, nombre: 'Chaqueta Oversize', precio: 89.99, descripcion: 'Unisex', img: 'https://via.placeholder.com/300x300/ffd166/000?text=Chaqueta' }
        ];
        localStorage.setItem('productos', JSON.stringify(productos));
    }

    // Cargar notificación
    const notifGuardada = localStorage.getItem('notificacion');
    if (notifGuardada) {
        notificacionActual = notifGuardada;
    }

    // Cargar blog
    const blogGuardado = localStorage.getItem('blog');
    if (blogGuardado) {
        blogActual = blogGuardado;
        document.getElementById('blogMessage').textContent = blogActual;
    }

    // Cargar slides
    const slidesGuardados = localStorage.getItem('slides');
    if (slidesGuardados) {
        slidesActuales = JSON.parse(slidesGuardados);
        actualizarSlides();
    }

    // Cargar flyers
    const flyersGuardados = localStorage.getItem('flyers');
    if (flyersGuardados) {
        flyersActuales = JSON.parse(flyersGuardados);
        actualizarFlyers();
    }

    // Cargar carrito
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
    }
}

function renderizarProductos() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    productos.forEach(producto => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <div class="product-info">
                <h3>${producto.nombre}</h3>
                <p class="product-price">$${producto.precio.toFixed(2)}</p>
            </div>
        `;
        card.addEventListener('click', () => abrirModalProducto(producto));
        grid.appendChild(card);
    });
}

function abrirModalProducto(producto) {
    const modal = document.getElementById('productModal');
    document.getElementById('modalImage').src = producto.img;
    document.getElementById('modalTitle').textContent = producto.nombre;
    document.getElementById('modalDesc').textContent = producto.descripcion;
    document.getElementById('modalPrice').textContent = `$${producto.precio.toFixed(2)}`;
    
    const addBtn = document.getElementById('addToCartBtn');
    addBtn.onclick = function() {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        alert('✅ Producto añadido al carrito');
        modal.style.display = 'none';
    };
    
    modal.style.display = 'block';
}

function configurarEventos() {
    // Búsqueda
    document.getElementById('searchIcon').addEventListener('click', () => {
        const searchBar = document.getElementById('searchBar');
        searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('searchInput').addEventListener('input', (e) => {
        const texto = e.target.value.toLowerCase();
        const filtrados = productos.filter(p => 
            p.nombre.toLowerCase().includes(texto) || 
            p.descripcion.toLowerCase().includes(texto)
        );
        
        const grid = document.getElementById('productsGrid');
        grid.innerHTML = '';
        
        if (filtrados.length === 0) {
            grid.innerHTML = '<p style="grid-column: span 2; text-align: center;">No hay productos</p>';
            return;
        }
        
        filtrados.forEach(producto => {
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${producto.img}" alt="${producto.nombre}">
                <div class="product-info">
                    <h3>${producto.nombre}</h3>
                    <p class="product-price">$${producto.precio.toFixed(2)}</p>
                </div>
            `;
            card.addEventListener('click', () => abrirModalProducto(producto));
            grid.appendChild(card);
        });
    });

    // Notificación
    document.getElementById('notifIcon').addEventListener('click', () => {
        alert('📢 ' + notificacionActual);
    });

    // Carrito
    document.getElementById('cartIcon').addEventListener('click', () => {
        abrirCarrito();
    });

    // Cerrar modales
    document.querySelector('.close-modal').addEventListener('click', () => {
        document.getElementById('productModal').style.display = 'none';
    });

    document.querySelector('.close-cart').addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'none';
    });

    document.querySelector('.close-checkout').addEventListener('click', () => {
        document.getElementById('checkoutModal').style.display = 'none';
    });

    // Checkout
    document.getElementById('checkoutBtn').addEventListener('click', () => {
        document.getElementById('cartModal').style.display = 'none';
        document.getElementById('checkoutModal').style.display = 'block';
    });

    // Enviar pedido
    document.getElementById('submitOrderBtn').addEventListener('click', enviarPedido);

    // Cerrar modales al hacer clic fuera
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
}

function abrirCarrito() {
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (carrito.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center;">Carrito vacío</p>';
        cartTotal.innerHTML = '';
    } else {
        let html = '';
        let total = 0;
        
        carrito.forEach((item, index) => {
            total += item.precio;
            html += `
                <div class="cart-item">
                    <span>${item.nombre}</span>
                    <span>$${item.precio.toFixed(2)}</span>
                </div>
            `;
        });
        
        cartItems.innerHTML = html;
        cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
    }
    
    cartModal.style.display = 'block';
}

function enviarPedido() {
    const nombre = document.getElementById('checkoutName').value;
    const telefono = document.getElementById('checkoutPhone').value;
    const email = document.getElementById('checkoutEmail').value;
    
    if (!nombre || !telefono || !email) {
        alert('❌ Por favor completa todos los campos');
        return;
    }
    
    // Mostrar loading
    document.getElementById('loadingSpinner').style.display = 'block';
    document.getElementById('submitOrderBtn').disabled = true;
    
    // Crear pedido
    const pedido = {
        id: Date.now(),
        fecha: new Date().toLocaleString(),
        nombre: nombre,
        telefono: telefono,
        email: email,
        productos: carrito,
        total: carrito.reduce((sum, p) => sum + p.precio, 0)
    };
    
    // Guardar pedido
    const pedidosGuardados = JSON.parse(localStorage.getItem('pedidos')) || [];
    pedidosGuardados.push(pedido);
    localStorage.setItem('pedidos', JSON.stringify(pedidosGuardados));
    
    // Limpiar carrito
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    
    // Simular envío
    setTimeout(() => {
        document.getElementById('loadingSpinner').style.display = 'none';
        document.getElementById('submitOrderBtn').disabled = false;
        document.getElementById('checkoutModal').style.display = 'none';
        alert('✅ Pedido enviado correctamente');
        
        // Limpiar campos
        document.getElementById('checkoutName').value = '';
        document.getElementById('checkoutPhone').value = '';
        document.getElementById('checkoutEmail').value = '';
    }, 1500);
}

function iniciarSlider() {
    let currentSlide = 0;
    const slider = document.getElementById('slider');
    const slides = document.querySelectorAll('.slide');
    
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }, 3000);
}

function actualizarSlides() {
    const slides = document.querySelectorAll('.slide img');
    if (slidesActuales.length === 3) {
        slides.forEach((img, index) => {
            if (slidesActuales[index]) {
                img.src = slidesActuales[index];
            }
        });
    }
}

function actualizarFlyers() {
    const flyersSection = document.getElementById('flyersSection');
    flyersSection.innerHTML = '';
    
    if (flyersActuales.length === 0) {
        // Flyers por defecto
        flyersSection.innerHTML = `
            <div class="flyer-item" style="background-image: url('https://via.placeholder.com/150x100/ff7eb3/fff?text=Flyer+1')"></div>
            <div class="flyer-item" style="background-image: url('https://via.placeholder.com/150x100/7f5eff/fff?text=Flyer+2')"></div>
            <div class="flyer-item" style="background-image: url('https://via.placeholder.com/150x100/ffd166/000?text=Flyer+3')"></div>
        `;
    } else {
        flyersActuales.forEach(url => {
            const flyer = document.createElement('div');
            flyer.className = 'flyer-item';
            flyer.style.backgroundImage = `url('${url}')`;
            flyersSection.appendChild(flyer);
        });
    }
}
