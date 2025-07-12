
function normalizarTexto(texto) {
  return (texto || '').toString().toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

function generarTabla(datos, titulo) {
  let meses = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO",
               "JULIO", "AGOSTO", "SETIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
  let tabla = `<div class="card"><h2>${titulo}</h2>`;
  tabla += `<p><strong>Nombre:</strong> ${datos.nombre_apellido || "—"}</p>`;
  tabla += `<p><strong>Cédula:</strong> ${datos.cedula || "—"}</p>`;
  tabla += `<table border="1" cellspacing="0" cellpadding="6" style="border-collapse: collapse; width: 100%; font-size: 0.95em;">`;
  tabla += "<tr><th>Mes</th><th>Monto</th></tr>";

  meses.forEach(mes => {
    if (mes in datos) {
      let valor = datos[mes];
      let esPagado = (valor && (valor.toString().toLowerCase() === "pagado" || parseInt(valor) > 0));
      const clase = esPagado ? " style='background-color:#d4edda;'" : " style='background-color:#f8d7da;'";
      const textoMostrar = esPagado ? valor : "-";
      tabla += `<tr${clase}><td>${mes}</td><td>${textoMostrar}</td></tr>`;
    }
  });

  tabla += `<tr><th>Total</th><th>${datos["TOTAL A PAGAR"] || "—"}</th></tr>`;
  tabla += `<tr><th>Pagado</th><th>${datos["PAGADO"] || "—"}</th></tr>`;
  tabla += `<tr><th>Saldo</th><th>${datos["SALDO A PAGAR"] || "—"}</th></tr>`;
  tabla += "</table></div>";
  return tabla;
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
    contenedor.innerHTML += generarTabla(resultado2024, "Pagos 2024");
  }

  if (resultado2025) {
    contenedor.innerHTML += generarTabla(resultado2025, "Pagos 2025");
  }
}
