
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

async function buscarPagos() {
  const busqueda = document.getElementById("busqueda").value.trim().toLowerCase();
  const contenedor = document.getElementById("resultado");
  contenedor.innerHTML = "";

  if (!busqueda) return;

  const querySnapshot = await db.collection("estado_pagos")
    .where("cedula", "==", busqueda)
    .get();

  let datos = querySnapshot.docs.map(doc => doc.data());

  if (datos.length === 0) {
    datos = (await db.collection("estado_pagos")
      .where("nombre", ">=", busqueda.toUpperCase())
      .where("nombre", "<=", busqueda.toUpperCase() + "\uf8ff")
      .get()).docs.map(doc => doc.data());
  }

  if (datos.length === 0) {
    contenedor.innerHTML = "<p>No se encontraron datos.</p>";
    return;
  }

  const usuario = datos[0];
  const encabezado = `
    <h3>${usuario.nombre}</h3>
    <p>Manzana: ${usuario.manzana || "-"} – Lote: ${usuario.lote || "-"} – Vivienda: ${usuario.vivienda || "-"}</p>
  `;
  contenedor.innerHTML = encabezado;

  [2024, 2025].forEach(año => {
    const pagos = datos.filter(p => p.año === año);
    if (pagos.length === 0) return;

    let html = `<h4>Pagos ${año}</h4><ul>`;
    pagos.forEach(p => {
      const estado = p.estado === "pagado" ? "✅" : "❌";
      html += `<li>${p.mes}: ${estado}</li>`;
    });
    html += "</ul>";
    contenedor.innerHTML += html;
  });
}
