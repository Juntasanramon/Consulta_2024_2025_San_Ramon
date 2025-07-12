
function normalizarTexto(texto) {
  return (texto || '').toString().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function consultar() {
  const criterio = normalizarTexto(document.getElementById("busqueda").value);
  if (!criterio) return alert("Ingrese un nombre o cédula para buscar.");

  const resultado2024 = pagos2024.find(u => 
    normalizarTexto(u.cedula).includes(criterio) || 
    normalizarTexto(u.nombre_apellido).includes(criterio)
  );

  const resultado2025 = pagos2025.find(u => 
    normalizarTexto(u.cedula).includes(criterio) || 
    normalizarTexto(u.nombre_apellido).includes(criterio)
  );

  const contenedor = document.getElementById("resultado");
  contenedor.innerHTML = "";

  if (!resultado2024 && !resultado2025) {
    contenedor.innerHTML = "<p>No se encontraron datos.</p>";
    return;
  }

  if (resultado2024) {
    contenedor.innerHTML += "<h2>Pagos 2024</h2><pre>" + JSON.stringify(resultado2024, null, 2) + "</pre>";
  }

  if (resultado2025) {
    contenedor.innerHTML += "<h2>Pagos 2025</h2><pre>" + JSON.stringify(resultado2025, null, 2) + "</pre>";
  }
}
