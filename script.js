// script.js

// Datos iniciales de ejemplo (esto se cargará desde el panel de admin)
let productos = [
    { id: 1, nombre: 'Camiseta Básica', precio: 25.99, descripcion: 'Algodón 100%', img: 'https://via.placeholder.com/300x300/ff7eb3/fff?text=Camiseta' },
    { id: 2, nombre: 'Jean Clásico', precio: 45.50, descripcion: 'Corte recto', img: 'https://via.placeholder.com/300x300/7f5eff/fff?text=Jean' },
    { id: 3, nombre: 'Chaqueta Oversize', precio: 89.99, descripcion: 'Unisex', img: 'https://via.placeholder.com/300x300/ffd166/000?text=Chaqueta' },
    { id: 4, nombre: 'Gorra Deportiva', precio: 15.00, descripcion: 'Ajustable', img: 'https://via.placeholder.com/300x300/06d6a0/fff?text=Gorra' }
];

let carrito = [];
let notificacionActual = "Bienvenidos a la nueva tienda.";

// Cargar productos en la cuadrícula
function renderProductos() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    productos.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}">
            <div class="product-info">
                <h3>${p.nombre}</h3>
                <p class="product-price">$${p.precio}</p>
            </div>
        `;
        card.addEventListener('click', () => abrirModal(p));
        grid.appendChild(card);
    });
}

// Modal de producto
const modal = document.getElementById('productModal');
const modalImg = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalPrice = document.getElementById('modalPrice');

function abrirModal(producto) {
    modalImg.src = producto.img;
    modalTitle.textContent = producto.nombre;
    modalDesc.textContent = producto.descripcion;
    modalPrice.textContent = `$${producto.precio}`;
    modal.style.display = 'block';
    
    // Configurar botón de añadir
    document.getElementById('addToCartBtn').onclick = () => {
        carrito.push(producto);
        alert('✅ Producto añadido al carrito');
        modal.style.display = 'none'; // Se cierra automáticamente
        // Aquí podrías actualizar el contador del carrito
    };
}

// Cerrar modal
document.getElementById('closeModal').addEventListener('click', () => {
    modal.style.display = 'none';
});

// Búsqueda
const searchIcon = document.getElementById('searchIcon');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('searchInput');

searchIcon.addEventListener('click', () => {
    searchBar.style.display = searchBar.style.display === 'none' ? 'block' : 'none';
});

searchInput.addEventListener('input', (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrados = productos.filter(p => p.nombre.toLowerCase().includes(texto));
    // Volver a renderizar solo los filtrados
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    filtrados.forEach(p => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${p.img}" alt="${p.nombre}">
            <div class="product-info">
                <h3>${p.nombre}</h3>
                <p class="product-price">$${p.precio}</p>
            </div>
        `;
        card.addEventListener('click', () => abrirModal(p));
        grid.appendChild(card);
    });
});

// Slider automático
let currentSlide = 0;
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');

setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}, 3000);

// Inicializar
renderProductos();

// Campanita de notificación
document.getElementById('notifIcon').addEventListener('click', () => {
    alert(notificacionActual);
});