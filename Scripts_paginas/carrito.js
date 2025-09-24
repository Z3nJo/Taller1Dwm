document.addEventListener("DOMContentLoaded", () => {

  const btnCarrito = document.getElementById("btn-carrito");
  const modalCarrito = document.getElementById("modal-carrito");
  const cerrarCarrito = document.getElementById("cerrar-carrito");
  const itemsContainer = modalCarrito.querySelector(".carrito-items");
  const totalCarrito = document.getElementById("total-carrito"); 
  const btnVaciar = document.getElementById("vaciar-carrito");

  // Modal detalle producto
  const btnAgregarModal = document.getElementById("btn-agregar-modal");

  // Modal editar carrito
  const modalEditar = document.getElementById("modal-editar-carrito");
  const cerrarEditar = document.getElementById("cerrar-editar-carrito");
  const editarCantidad = document.getElementById("editar-cantidad");
  const editarDesc = document.getElementById("editar-desc");
  const btnSumar = document.getElementById("editar-sumar");
  const btnRestar = document.getElementById("editar-restar");
  const btnEliminar = document.getElementById("editar-eliminar");
  const btnGuardar = document.getElementById("editar-guardar");

  let carrito = [];          
  let productoActual = null; 

  function calcularTotal() {
    return carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  }

  function renderCarrito() {
    itemsContainer.innerHTML = "";

    if (carrito.length === 0) {
      itemsContainer.innerHTML = "<p>Tu carrito está vacío</p>";
      if (totalCarrito) totalCarrito.textContent = "$0";
      return;
    }

    carrito.forEach(item => {
      const div = document.createElement("div");
      div.className = "item-carrito";
      div.innerHTML = `
        <img src="${item.img}" alt="${item.nombre}">
        <div>
          <p>${item.nombre}</p>
          <span>$${item.precio.toLocaleString()}</span>
          <span class="subtotal">Subtotal: $${(item.precio * item.cantidad).toLocaleString()}</span>
        </div>
        <span class="cantidad">x${item.cantidad}</span>
      `;
      itemsContainer.appendChild(div);
    });

    if (totalCarrito) {
      totalCarrito.textContent = `$${calcularTotal().toLocaleString()}`;
    }
  }

  function agregarAlCarrito(producto) {
    const existente = carrito.find(p => p.id === producto.id);
    if (existente) {
      existente.cantidad += producto.cantidad;
    } else {
      carrito.push({ ...producto });
    }
    renderCarrito();
  }

  function vaciarCarrito() {
    carrito = [];
    renderCarrito();
  }

  function abrirEditarProducto(producto) {
    productoActual = producto;
    document.getElementById("editar-img").src = producto.img;
    document.getElementById("editar-nombre").textContent = producto.nombre;
    editarDesc.textContent = producto.descripcion || "";
    document.getElementById("editar-precio").textContent = `$${producto.precio.toLocaleString()}`;
    editarCantidad.textContent = producto.cantidad;

    modalEditar.classList.add("open");
    modalEditar.setAttribute("aria-hidden", "false");

    // Cerrar automáticamente el carrito
    if (modalCarrito.classList.contains("open")) {
      modalCarrito.classList.remove("open");
      modalCarrito.setAttribute("aria-hidden", "true");
    }
  }


  btnCarrito.addEventListener("click", () => {
    modalCarrito.classList.add("open");
    modalCarrito.setAttribute("aria-hidden", "false");
  });

  cerrarCarrito.addEventListener("click", () => {
    modalCarrito.classList.remove("open");
    modalCarrito.setAttribute("aria-hidden", "true");
  });

  if (btnVaciar) btnVaciar.addEventListener("click", vaciarCarrito);

  const btnFinalizar = document.querySelector(".modal-footer .btn-primary");
  if (btnFinalizar) {
    btnFinalizar.addEventListener("click", () => {

      window.location.href = "resumen.html";
    });
  }

  document.body.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-btn")) {
      const card = e.target.closest(".card-item");
      const producto = {
        id: card.dataset.id,
        nombre: card.querySelector(".card-title").textContent,
        descripcion: card.dataset.descripcion || "",
        precio: parseInt(card.querySelector(".price").textContent.replace(/[$.]/g, "")),
        img: card.querySelector("img").src,
        cantidad: 1
      };
      agregarAlCarrito(producto);
    }
  });

  if (btnAgregarModal) {
    btnAgregarModal.addEventListener("click", () => {
      const detalleIdInput = document.getElementById("detalle-id");
      if (!detalleIdInput) return;
      const detalleId = detalleIdInput.value;
      const card = document.querySelector(`.card-item[data-id="${detalleId}"]`);
      if (!card) return;

      const producto = {
        id: card.dataset.id,
        nombre: card.querySelector(".card-title").textContent,
        descripcion: card.dataset.descripcion || "",
        precio: parseInt(card.querySelector(".price").textContent.replace(/[$.]/g, "")),
        img: card.querySelector("img").src,
        cantidad: parseInt(document.getElementById("cantidad").textContent)
      };

      agregarAlCarrito(producto);
    });
  }



  cerrarEditar.addEventListener("click", () => {
    modalEditar.classList.remove("open");
    modalEditar.setAttribute("aria-hidden", "true");
    productoActual = null;
  });

  btnSumar.addEventListener("click", () => {
    if (!productoActual) return;
    productoActual.cantidad++;
    editarCantidad.textContent = productoActual.cantidad;
  });

  btnRestar.addEventListener("click", () => {
    if (!productoActual) return;
    if (productoActual.cantidad > 1) {
      productoActual.cantidad--;
      editarCantidad.textContent = productoActual.cantidad;
    }
  });

  btnEliminar.addEventListener("click", () => {
    if (!productoActual) return;
    carrito = carrito.filter(p => p.id !== productoActual.id);
    renderCarrito();
    modalEditar.classList.remove("open");
    modalEditar.setAttribute("aria-hidden", "true");
    productoActual = null;
  });

  btnGuardar.addEventListener("click", () => {
    if (!productoActual) return;
    productoActual.cantidad = parseInt(editarCantidad.textContent);
    renderCarrito();
    modalEditar.classList.remove("open");
    modalEditar.setAttribute("aria-hidden", "true");
    productoActual = null;
  });

  itemsContainer.addEventListener("click", (e) => {
    const itemDiv = e.target.closest(".item-carrito");
    if (!itemDiv) return;

    const nombre = itemDiv.querySelector("p").textContent;
    const producto = carrito.find(p => p.nombre === nombre);
    if (!producto) return;

    abrirEditarProducto(producto);
  });


  window.agregarAlCarrito = agregarAlCarrito;

  renderCarrito();
});