// catalogoAdmin.js
// -> Debe cargarse después de catalogo.js (usa window.productos y window.mostrarCatalogo)

(function () {
  if (!window.productos || !window.mostrarCatalogo) {
    console.error("catalogoAdmin: window.productos o window.mostrarCatalogo no están definidos. Asegúrate de cargar catalogo.js antes.");
    return;
  }

  const btnEditar = document.getElementById('btn-editar');
  const adminControls = document.getElementById('admin-controls');
  const btnAbrirAgregar = document.getElementById('btn-abrir-agregar');
  const btnFinalizar = document.getElementById('btn-finalizar');
  const modalAgregar = document.getElementById('modal-agregar-producto');
  const cerrarModalAgregar = document.getElementById('cerrar-modal-agregar');
  const formAgregar = document.getElementById('form-agregar-producto');
  const cancelarAgregar = document.getElementById('cancelar-agregar');
  const modalAgregarTitle = document.getElementById('modal-agregar-title');

  // Form fields
  const inpNombre = document.getElementById('nombre-producto');
  const inpCategoria = document.getElementById('categoria-producto');
  const inpPrecio = document.getElementById('precio-producto');
  const inpImagen = document.getElementById('imagen-producto');
  const inpDescripcion = document.getElementById('descripcion-producto');
  const inpDisponible = document.getElementById('disponible-producto');

  let isEditing = false;
  let editTarget = { categoria: null, id: null };

  const esAdmin = window.usuarioActual?.rol === 'administrador';
  if (!esAdmin) {
    btnEditar.style.display = 'none';
    adminControls.style.display = 'none';
    return;
  }

  // Toggle edit mode
  btnEditar.addEventListener('click', () => {
    isEditing = true;
    btnEditar.style.display = 'none';
    adminControls.classList.add('show');
    btnFinalizar.style.display = 'inline-block';
    window.mostrarCatalogo(true); // renderiza con botones editar/eliminar
  });

  btnFinalizar.addEventListener('click', () => {
    isEditing = false;
    btnEditar.style.display = 'inline-block';
    adminControls.classList.remove('show');
    btnFinalizar.style.display = 'none';
    window.mostrarCatalogo(false);
  });

  // Abrir modal agregar
  btnAbrirAgregar.addEventListener('click', () => {
    isEditing = false;
    editTarget = {categoria:null, id:null};
    modalAgregarTitle.textContent = 'Agregar producto';
    formAgregar.reset();
    openModal(modalAgregar);
  });

  // Cerrar modal
  cerrarModalAgregar.addEventListener('click', () => closeModal(modalAgregar));
  cancelarAgregar.addEventListener('click', () => closeModal(modalAgregar));
  modalAgregar.addEventListener('click', (e) => { if (e.target === modalAgregar) closeModal(modalAgregar); });

  // Guardar producto (agregar o editar)
  formAgregar.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = inpNombre.value.trim();
    const categoria = inpCategoria.value.trim() || 'Sin categoría';
    const precio = parseFloat(inpPrecio.value) || 0;
    const img = inpImagen.value.trim() || 'media/plato.png';
    const descripcion = inpDescripcion.value.trim();
    const disponible = inpDisponible.checked;

    if (!nombre) return alert('Nombre requerido');

    // Editar
    if (isEditing && editTarget.id) {
      const arr = window.productos[editTarget.categoria];
      const idx = arr.findIndex(x => x.id === editTarget.id);
      if (idx !== -1) {
        arr[idx].nombre = nombre;
        arr[idx].precio = precio;
        arr[idx].img = img;
        arr[idx].descripcion = descripcion;
        arr[idx].disponible = disponible;

        // si cambió categoría, mover
        if (categoria !== editTarget.categoria) {
          const prod = arr.splice(idx,1)[0];
          if (!window.productos[categoria]) window.productos[categoria] = [];
          window.productos[categoria].push(prod);
        }
        alert('Producto actualizado');
      }
    } else {
      // Crear nuevo
      const id = slugify(nombre);
      const nuevo = { id, nombre, precio, img, descripcion, disponible };
      if (!window.productos[categoria]) window.productos[categoria] = [];
      window.productos[categoria].push(nuevo);
      alert('Producto agregado');
    }

    window.mostrarCatalogo(isEditing);
    window.generarMenu();
    closeModal(modalAgregar);
  });

  // Exponer función para abrir editar desde boton en la tarjeta
  window.openEditarProducto = function (id) {
    // encontrar producto y categoría
    for (const cat in window.productos) {
      const p = window.productos[cat].find(x => x.id === id);
      if (p) {
        isEditing = true;
        editTarget = { categoria: cat, id: id };
        modalAgregarTitle.textContent = 'Editar producto';
        inpNombre.value = p.nombre;
        inpCategoria.value = cat;
        inpPrecio.value = p.precio;
        inpImagen.value = p.img;
        inpDescripcion.value = p.descripcion || '';
        inpDisponible.checked = !!p.disponible;
        openModal(modalAgregar);
        return;
      }
    }
    alert('Producto no encontrado para editar');
  };

  // Eliminar producto
  window.eliminarProducto = function (id) {
    if (!confirm('¿Eliminar este producto?')) return;
    for (const cat in window.productos) {
      const idx = window.productos[cat].findIndex(x => x.id === id);
      if (idx !== -1) {
        window.productos[cat].splice(idx,1);
        // si quedó categoría vacía, la eliminamos
        if (window.productos[cat].length === 0) delete window.productos[cat];
        window.mostrarCatalogo(isEditing);
        window.generarMenu();
        alert('Producto eliminado');
        return;
      }
    }
    alert('Producto no encontrado');
  };

  // Helpers: modal open/close y slugify
  function openModal(el) {
    el.classList.add('open');
    el.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(el) {
    el.classList.remove('open');
    el.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  function slugify(s) { return String(s).toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, ''); }

  // Exponer utilidades para el resto del app (ya definidas en catalogo.js también)
  window.openModal = openModal;
  window.closeModal = closeModal;

  // Inicial: ocultar controles de admin
  adminControls.classList.remove('show');
  btnFinalizar.style.display = 'none';
})();