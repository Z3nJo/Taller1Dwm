// catalogo.js
// -> define productos, muestra catálogo, buscador, menú y modal de detalle.
// -> exporta window.productos y window.mostrarCatalogo para uso por catalogoAdmin.js

(function () {
  // Datos iniciales (puedes reemplazar / cargar desde servidor)
  const productos = {
    "Entradas": [
      { id: "causa-limena", nombre: "Causa Limeña", precio: 8500, img: "media/CausaLimeña.jpg", descripcion: "Puré de papa amarilla relleno de pollo, atún o mariscos, decorado con huevo y palta.", disponible: true },
      { id: "ceviche", nombre: "Ceviche", precio: 9000, img: "media/ceviche.png", descripcion: "Pescado fresco marinado en limón con ají, cebolla morada, cilantro, choclo y camote.", disponible: true },
      { id: "anticucho", nombre: "Anticucho", precio: 7000, img: "media/anticucho.jpg", descripcion: "Brochetas de corazón de res sazonadas con ají panca, acompañadas de papa y salsa especial.", disponible: true },
      { id: "tiradito", nombre: "Tiradito", precio: 9500, img: "media/tiradito.jpg", descripcion: "Finas láminas de pescado fresco con limón, ají amarillo, aceite de oliva y cilantro.", disponible: true },
      { id: "choclo", nombre: "Choclo con queso", precio: 5500, img: "media/choclo.png", descripcion: "Maíz peruano cocido acompañado de queso fresco, clásico y delicioso.", disponible: true }
    ],
    "Platos de fondo": [
      { id: "lomo-saltado", nombre: "Lomo Saltado", precio: 12000, img: "media/lomo-saltado.jpeg", descripcion: "Trozos de carne de res salteados con cebolla, tomate, ají amarillo y salsa de soja, acompañado de arroz y papas fritas.", disponible: false },
      { id: "aji-gallina", nombre: "Ají de gallina", precio: 11000, img: "media/Aji-gallina.jpg", descripcion: "Suave guiso de pollo deshilachado en salsa de ají amarillo, nueces y pan, servido con arroz blanco y huevo duro.", disponible: true },
      { id: "arroz-marisco", nombre: "Arroz con marisco", precio: 13000, img: "media/arroz-marisco.jpg", descripcion: "Arroz sazonado con ají amarillo y cilantro, mezclado con mariscos frescos y servido con limón.", disponible: true },
      { id: "seco-cordero", nombre: "Seco de cordero", precio: 14000, img: "media/seco-cordero.jpg", descripcion: "Cordero estofado en salsa de cilantro y cerveza negra, acompañado de arroz y frejoles.", disponible: true },
      { id: "pachamanca", nombre: "Pachamanca", precio: 13500, img: "media/pachamanca.jpg", descripcion: "Carne, papas, choclo y habas cocidas al estilo tradicional andino con hierbas y piedras calientes.", disponible: true }
    ],
    "Postres": [
      { id: "sundae", nombre: "Helado sundae", precio: 4000, img: "media/sundae.png", descripcion: "Bolas de helado de vainilla o chocolate con salsa, crema batida y trozos de chocolate o frutos secos.", disponible: true },
      { id: "panna", nombre: "Panna cotta de vainilla", precio: 4800, img: "media/panna.jpg", descripcion: "Postre cremoso a base de crema y gelatina, acompañado de coulis de frutas rojas.", disponible: true },
      { id: "tiramisu", nombre: "Tiramisú", precio: 5500, img: "media/tiramisu.png", descripcion: "Capas de bizcocho empapadas en café y licor, con crema de mascarpone y cacao espolvoreado.", disponible: true },
      { id: "brownie", nombre: "Brownie con helado", precio: 4500, img: "media/brownie.jpg", descripcion: "Brownie de chocolate caliente acompañado de una bola de helado de vainilla y salsa de chocolate.", disponible: true },
      { id: "cheesecake", nombre: "Cheesecake de fresa", precio: 5000, img: "media/cheesecake.jpg", descripcion: "Suave tarta de queso con base de galleta, cubierta con salsa de fresa fresca.", disponible: true }
    ],
    "Bebidas": [
      { id: "coca-cola", nombre: "Coca-Cola", precio: 2000, img: "media/cocacola.png", descripcion: "Gaseosa clásica de cola, refrescante y burbujeante.", disponible: true },
      { id: "inca-kola", nombre: "Inca Kola", precio: 2000, img: "media/incakola.jpg", descripcion: "Refresco peruano de sabor dulce y único, muy popular en Perú.", disponible: true },
      { id: "jugo-maracuya", nombre: "Jugo de maracuyá", precio: 2500, img: "media/jugodemaracuya.jpg", descripcion: "Bebida natural de fruta fresca, ligeramente ácido y refrescante.", disponible: true },
      { id: "jugo-naranja", nombre: "Jugo de naranja", precio: 2500, img: "media/jugodenaranja.jpg", descripcion: "Zumo recién exprimido de naranjas maduras, dulce y lleno de vitaminas.", disponible: true },
      { id: "gingerale", nombre: "Ginger Ale", precio: 2200, img: "media/ginger.png", descripcion: "Refresco de jengibre, burbujeante y con ligero toque picante, ideal para acompañar comidas.", disponible: true }
    ]
  };

  // DOM elements
  const catalogoDiv = document.getElementById('catalogo');
  const menu = document.getElementById('menu');
  const hamburger = document.getElementById('hamburger');
  const btnBuscar = document.getElementById('btn-buscar');

  // MODALES
  const modalProducto = document.getElementById('modal-producto');
  const detalleImg = document.getElementById('detalle-img');
  const detalleNombre = document.getElementById('detalle-nombre');
  const detalleDesc = document.getElementById('detalle-desc');
  const detallePrecio = document.getElementById('detalle-precio');
  const cantidadSpan = document.getElementById('cantidad');
  const btnSumar = document.getElementById('sumar');
  const btnRestar = document.getElementById('restar');
  const btnAgregarModal = document.getElementById('btn-agregar-modal');
  const cerrarDetalleBtn = document.getElementById('cerrar-detalle');
  const estadoNoDisp = document.getElementById('estado-no-disponible');
  const cantidadContainer = document.getElementById('cantidad-container');

  // BÚSQUEDA modal
  const modalBusqueda = document.getElementById('modal-busqueda');
  const inputBusqueda = document.getElementById('input-busqueda');
  const resultadosDiv = document.getElementById('resultados-busqueda');
  const cerrarBusquedaBtn = document.getElementById('cerrar-modal');

  // Admin elements
  const btnEditar = document.getElementById('btn-editar');
  const adminControls = document.getElementById('admin-controls');

  // Estado
  let editMode = false;

  // Helper: slugify
  function slug(s) {
    return s.toString().toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
  }

  // Helper: placeholder on image error
  function safeImg(imgEl, fallback) {
    imgEl.addEventListener('error', () => {
      imgEl.src = fallback || 'https://via.placeholder.com/400x250?text=Imagen';
    });
  }

  // Mostrar catálogo (puede recibir editMode para añadir botones de edición)
  function mostrarCatalogo(requestEditMode = false) {
    editMode = !!requestEditMode;
    catalogoDiv.innerHTML = '';

    for (const categoria of Object.keys(productos)) {
      const title = document.createElement('h2');
      title.className = 'section-title';
      title.textContent = categoria;
      catalogoDiv.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'row-grid';

      productos[categoria].forEach(prod => {
        // columna/card
        const card = document.createElement('article');
        card.className = 'card-item';
        card.setAttribute('data-id', prod.id);
        card.setAttribute('role', 'button');
        card.tabIndex = 0;

        // thumbnail
        const thumb = document.createElement('div'); thumb.className = 'card-thumb';
        const img = document.createElement('img'); img.alt = prod.nombre; img.src = prod.img || '';
        safeImg(img);
        thumb.appendChild(img);

        // body
        const body = document.createElement('div'); body.className = 'card-body';
        const h = document.createElement('h3'); h.className = 'card-title'; h.textContent = prod.nombre;
        const p = document.createElement('p'); p.className = 'muted price'; p.textContent = `$${prod.precio.toLocaleString()}`;
        body.appendChild(h); body.appendChild(p);

        // footer
        const footer = document.createElement('div'); footer.className = 'card-footer';
        const price = document.createElement('div'); price.className = 'price'; price.textContent = `$${prod.precio.toLocaleString()}`;
        footer.appendChild(price);

        const actions = document.createElement('div');

        // Add button
        const btnAdd = document.createElement('button'); btnAdd.className = 'add-btn';
        btnAdd.innerHTML = '+'; btnAdd.title = 'Agregar al carrito';
        if (!prod.disponible) btnAdd.disabled = true;
        btnAdd.addEventListener('click', (e) => { e.stopPropagation(); agregarCarrito(prod.id, 1); });

        actions.appendChild(btnAdd);

        // If modo edicion, append edit/delete icons
        if (editMode) {
          const btnEdit = document.createElement('button'); btnEdit.className = 'btn-edit small';
          btnEdit.style.marginLeft = '8px'; btnEdit.textContent = '✏️';
          btnEdit.title = 'Editar';
          btnEdit.addEventListener('click', (e) => { e.stopPropagation(); window.openEditarProducto(prod.id); });

          const btnDel = document.createElement('button'); btnDel.className = 'btn-delete small';
          btnDel.style.marginLeft = '6px'; btnDel.textContent = '🗑️';
          btnDel.title = 'Eliminar';
          btnDel.addEventListener('click', (e) => { e.stopPropagation(); window.eliminarProducto(prod.id); });

          actions.appendChild(btnEdit); actions.appendChild(btnDel);
        }

        footer.appendChild(actions);

        card.appendChild(thumb);
        card.appendChild(body);
        card.appendChild(footer);

        // Open modal detalles when click on card
        card.addEventListener('click', () => verDetalles(prod.id));

        grid.appendChild(card);
      });

      catalogoDiv.appendChild(grid);
    }
  }

  // Agregar al carrito (integrado con carrito.js)
  function agregarCarrito(id, cantidad = 1) {
    const prod = localizarProducto(id);
    if (!prod) return alert('Producto no encontrado');
    if (!prod.disponible) return alert('Producto no disponible');

    // Objeto de producto como lo espera carrito.js
    const item = {
      id: prod.id,
      nombre: prod.nombre,
      precio: prod.precio,
      img: prod.img,
      cantidad
    };

    if (window.agregarAlCarrito) {
      window.agregarAlCarrito(item); // ✅ manda el producto al carrito real
    } else {
      console.warn("⚠️ Función agregarAlCarrito no encontrada.");
    }
  }

  // localizar producto por id
  function localizarProducto(id) {
    for (const cat in productos) {
      const p = productos[cat].find(x => x.id === id);
      if (p) return p;
    }
    return null;
  }


  // Ver detalles -> abre modal
  function verDetalles(id) {
    const p = localizarProducto(id);
    if (!p) return;
    detalleImg.src = p.img || '';
    safeImg(detalleImg);
    detalleNombre.textContent = p.nombre;
    detalleDesc.textContent = p.descripcion || 'Sin descripción.';
    detallePrecio.textContent = p.disponible ? `$${p.precio.toLocaleString()}` : 'No disponible';
    cantidadSpan.textContent = '1';

    if (!p.disponible) {
      estadoNoDisp.classList.remove('d-none');
      cantidadContainer.style.display = 'none';
      btnAgregarModal.disabled = true;
    } else {
      estadoNoDisp.classList.add('d-none');
      cantidadContainer.style.display = 'flex';
      btnAgregarModal.disabled = false;
      btnAgregarModal.onclick = () => {
        agregarCarrito(p.id, parseInt(cantidadSpan.textContent, 10));
        closeModal(modalProducto);
      };
    }

    openModal(modalProducto);
  }

  // abrir/cerrar modales
  function openModal(el) {
    el.classList.add('open');
    el.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(el) {
    el.classList.remove('open');
    el.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // manejo cantidad
  document.getElementById('sumar')?.addEventListener('click', () => {
    cantidadSpan.textContent = String(parseInt(cantidadSpan.textContent || '1', 10) + 1);
  });
  document.getElementById('restar')?.addEventListener('click', () => {
    const n = Math.max(1, parseInt(cantidadSpan.textContent || '1', 10) - 1);
    cantidadSpan.textContent = String(n);
  });

  // cerrar modal detalle
  cerrarDetalleBtn?.addEventListener('click', () => closeModal(modalProducto));
  modalProducto?.addEventListener('click', (e) => { if (e.target === modalProducto) closeModal(modalProducto); });

  // SEARCH modal
  btnBuscar?.addEventListener('click', () => {
    inputBusqueda.value = '';
    resultadosDiv.innerHTML = '';
    openModal(modalBusqueda);
    inputBusqueda.focus();
  });
  cerrarBusquedaBtn?.addEventListener('click', () => closeModal(modalBusqueda));
  modalBusqueda?.addEventListener('click', (e) => { if (e.target === modalBusqueda) closeModal(modalBusqueda); });

  // debounce helper
  function debounce(fn, wait=200){
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(()=>fn(...args), wait); };
  }

  inputBusqueda?.addEventListener('input', debounce(()=> {
    const q = (inputBusqueda.value || '').toLowerCase().trim();
    resultadosDiv.innerHTML = '';
    if (!q) return;
    const fragment = document.createDocumentFragment();
    let found = 0;
    for (const cat in productos) {
      for (const p of productos[cat]) {
        if (p.nombre && p.nombre.toLowerCase().includes(q)) {
          const item = document.createElement('div');
          item.className = 'resultado-item';
          item.style.padding='8px 6px'; item.style.cursor='pointer';
          item.innerHTML = `<strong>${p.nombre}</strong> — <span class="muted">$${p.precio.toLocaleString()}</span>`;
          if (!p.disponible) { const s=document.createElement('span'); s.textContent=' (No disponible)'; s.style.color='red'; item.appendChild(s); }
          item.addEventListener('click', ()=>{ verDetalles(p.id); closeModal(modalBusqueda); });
          fragment.appendChild(item);
          found++;
        }
      }
    }
    if (found === 0) resultadosDiv.innerHTML = '<p class="muted">No se encontraron productos</p>';
    else resultadosDiv.appendChild(fragment);
  }, 160));

  // Menú lateral con categorías
  function generarMenu() {
    menu.innerHTML = '';
    for (const cat of Object.keys(productos)) {
      const div = document.createElement('div'); div.className='cat'; div.textContent = cat;
      div.addEventListener('click', () => {
        // scroll a sección
        const titles = Array.from(document.querySelectorAll('.section-title'));
        const t = titles.find(x => x.textContent === cat);
        if (t) t.scrollIntoView({behavior:'smooth', block:'start'});
        menu.classList.remove('show');
      });
      menu.appendChild(div);
    }
  }

  hamburger?.addEventListener('click', () => menu.classList.toggle('show'));

  // ESC key para cerrar modales
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      [modalProducto, modalBusqueda, document.getElementById('modal-agregar-producto')].forEach(m=>m?.classList.remove('open'));
      menu.classList.remove('show');
      document.body.style.overflow = '';
    }
  });

  // Exponer API a catalogoAdmin.js
  window.productos = productos;
  window.mostrarCatalogo = mostrarCatalogo;
  window.generarMenu = generarMenu;
  window.localizarProducto = localizarProducto;
  window.openModal = openModal;
  window.closeModal = closeModal;
  window.openDetalleById = verDetalles;

  // inicializar
  mostrarCatalogo(false);
  generarMenu();
})();