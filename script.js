const materias = [
  { anio: "Primer Año", nombre: "Pensamiento Científico" },
  { anio: "Primer Año", nombre: "Pensamiento Computacional" },
  { anio: "Primer Año", nombre: "Análisis Matemático" },
  { anio: "Primer Año", nombre: "Sociedad y Estado" },
  { anio: "Primer Año", nombre: "Física" },
  { anio: "Primer Año", nombre: "Álgebra" },
  { anio: "Segundo Año", nombre: "Análisis Matemático II" },
  { anio: "Segundo Año", nombre: "Fundamentos de Programación" },
  { anio: "Segundo Año", nombre: "Introducción al Desarrollo de Software" },
  { anio: "Segundo Año", nombre: "Álgebra Lineal" },
  { anio: "Segundo Año", nombre: "Organización del Computador" },
  { anio: "Segundo Año", nombre: "Algoritmos y Estructuras de Datos" },
  { anio: "Tercer Año", nombre: "Probabilidad y Estadística" },
  { anio: "Tercer Año", nombre: "Teoría de Algoritmos" },
  { anio: "Tercer Año", nombre: "Sistemas Operativos" },
  { anio: "Tercer Año", nombre: "Paradigmas de Programación" },
  { anio: "Tercer Año", nombre: "Base de Datos" },
  { anio: "Tercer Año", nombre: "Modelación Numérica" },
  { anio: "Tercer Año", nombre: "Taller de Programación" },
  { anio: "Tercer Año", nombre: "Ingeniería de Software I" },
  { anio: "Cuarto Año", nombre: "Ciencia de Datos" },
  { anio: "Cuarto Año", nombre: "Gestión del Desarrollo de Sistemas Informáticos" },
  { anio: "Cuarto Año", nombre: "Programación Concurrente" },
  { anio: "Cuarto Año", nombre: "Redes" },
  { anio: "Cuarto Año", nombre: "Física para Informática" },
  { anio: "Cuarto Año", nombre: "Empresas de Base Tecnológica I" },
  { anio: "Cuarto Año", nombre: "Ingeniería de Software II" },
  { anio: "Cuarto Año", nombre: "Sistemas Distribuidos I" },
  { anio: "Quinto Año", nombre: "Taller de Seguridad Informática" },
  { anio: "Quinto Año", nombre: "Empresas de Base Tecnológica II" },
  { anio: "Quinto Año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" },
  { anio: "Quinto Año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" }
];

const contenedorPrincipal = document.getElementById("contenedor-tablas");
const barraProgreso = document.getElementById("barra-progreso");
const textoProgreso = document.getElementById("texto-progreso");

const agrupadoPorAnio = {};

materias.forEach(m => {
  if (!agrupadoPorAnio[m.anio]) agrupadoPorAnio[m.anio] = [];
  agrupadoPorAnio[m.anio].push(m);
});

function aplicarRedondeoUBAXXI(nota) {
    if (nota === 3.5) {
        return 3;
    }
    const parteDecimal = nota - Math.floor(nota);
    if (parteDecimal >= 0.5) {
        return Math.ceil(nota);
    } else {
        return Math.floor(nota);
    }
}

function actualizarBarraProgreso() {
    let materiasAprobadas = 0;
    const totalMaterias = materias.length;
    materias.forEach(materia => {
        const datosGuardados = localStorage.getItem(materia.nombre);
        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            const notaFinal = parseFloat(datos.notaFinal);
            if (!isNaN(notaFinal) && notaFinal >= 4) {
                materiasAprobadas++;
            }
        }
    });
    const porcentaje = totalMaterias > 0 ? (materiasAprobadas / totalMaterias) * 100 : 0;
    barraProgreso.style.width = `${porcentaje.toFixed(2)}%`;
    textoProgreso.textContent = `${porcentaje.toFixed(0)}% de materias aprobadas`;
}

for (const anio in agrupadoPorAnio) {
  const seccion = document.createElement("div");
  seccion.className = "seccion-anio";
  const titulo = document.createElement("h2");
  titulo.textContent = anio;
  seccion.appendChild(titulo);
  const tabla = document.createElement("table");
  const encabezadoTabla = document.createElement("thead");
  encabezadoTabla.innerHTML = `
    <tr>
      <th>Materia</th>
      <th>Notas Parciales</th>
      <th>Final</th>
      <th>Fecha de Cierre</th>
      <th>Nota Final</th>
    </tr>
  `;
  tabla.appendChild(encabezadoTabla);
  const cuerpoTabla = document.createElement("tbody");
  agrupadoPorAnio[anio].forEach(materia => {
    const fila = document.createElement("tr");
    fila.dataset.materiaNombre = materia.nombre;
    const celdaNombre = document.createElement("td");
    celdaNombre.textContent = materia.nombre;
    const inputNotas = document.createElement("input");
    inputNotas.type = "text";
    inputNotas.placeholder = "";
    const celdaInput = document.createElement("td");
    celdaInput.appendChild(inputNotas);
    const celdaEstado = document.createElement("td");
    celdaEstado.classList.add("estado-materia");
    const celdaFecha = document.createElement("td");
    const celdaFinal = document.createElement("td");
    const datosGuardados = localStorage.getItem(materia.nombre);
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      inputNotas.value = datos.notas || "";
      celdaEstado.textContent = datos.estado || "";
      celdaFinal.textContent = datos.notaFinal || "";
      celdaFecha.textContent = datos.fechaCierre || "";
      if (datos.estado === "Promocionada") {
        celdaEstado.classList.add("promocionada");
      } else if (datos.estado === "Obligatoria") { // Mantener esta clase para "Final" y "Libre/Recupera"
        celdaEstado.classList.add("obligatoria");
      }
      const promedioCargado = parseFloat(datos.notaFinal);
      if (!isNaN(promedioCargado) && promedioCargado >= 4 && promedioCargado <= 10) {
          celdaNombre.classList.add("celda-materia-aprobada");
      }
    }
    inputNotas.addEventListener("input", () => {
      const valor = inputNotas.value.trim();
      let promedioCalculadoSinRedondeo = NaN;
      let notaFinalRedondeadaParaMostrar = NaN;
      let esPromocionada = false;
      let estadoFinal = "";

      celdaNombre.classList.remove("celda-materia-aprobada");
      celdaEstado.className = "estado-materia"; // Resetear clases

      const partes = valor.split("-").map(n => parseFloat(n));

      if (valor === "") {
        estadoFinal = "";
        notaFinalRedondeadaParaMostrar = "";
        celdaFecha.textContent = "";
      } else if (partes.length === 1 && !isNaN(partes[0])) {
        promedioCalculadoSinRedondeo = partes[0];
        notaFinalRedondeadaParaMostrar = aplicarRedondeoUBAXXI(promedioCalculadoSinRedondeo);
        esPromocionada = (promedioCalculadoSinRedondeo >= 7); // Asumiendo que con 7 directo promociona
      } else if (partes.length === 2 && partes.every(n => !isNaN(n))) {
        const nota1 = partes[0];
        const nota2 = partes[1];

        promedioCalculadoSinRedondeo = (nota1 + nota2) / 2;
        notaFinalRedondeadaParaMostrar = aplicarRedondeoUBAXXI(promedioCalculadoSinRedondeo);

        // Lógica de promoción UBA XXI: promedio 6.5+ Y ninguna nota < 6
        esPromocionada = (promedioCalculadoSinRedondeo >= 6.5 && nota1 >= 6 && nota2 >= 6);

        // Prioridad: si alguna nota es menor a 4, va a recuperatorio/recursa
        if (nota1 < 4 || nota2 < 4) {
            estadoFinal = "Libre/Recupera";
            // Aunque sea "Libre/Recupera", si la nota final redondeada es < 4, se muestra "Recursar"
            // en la columna final, según la petición del usuario.
            if (notaFinalRedondeadaParaMostrar < 4) {
                notaFinalRedondeadaParaMostrar = "Recursar"; // Se guarda como string
            } else {
                notaFinalRedondeadaParaMostrar = notaFinalRedondeadaParaMostrar.toFixed(0);
            }
            celdaFecha.textContent = "";

            const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
            datosAGuardar.notas = valor;
            datosAGuardar.estado = estadoFinal;
            datosAGuardar.notaFinal = notaFinalRedondeadaParaMostrar;
            datosAGuardar.fechaCierre = celdaFecha.textContent;
            localStorage.setItem(materia.nombre, JSON.stringify(datosAGuardar));
            actualizarBarraProgreso();
            return; // Termina la función aquí para este caso
        }

      }

      if (!isNaN(promedioCalculadoSinRedondeo)) {
        if (esPromocionada) {
            estadoFinal = "Promocionada";
            celdaEstado.classList.add("promocionada");
            notaFinalRedondeadaParaMostrar = notaFinalRedondeadaParaMostrar.toFixed(0);
        } else if (notaFinalRedondeadaParaMostrar >= 4) {
            estadoFinal = "Final";
            celdaEstado.classList.add("obligatoria");
            notaFinalRedondeadaParaMostrar = notaFinalRedondeadaParaMostrar.toFixed(0);
        } else {
            estadoFinal = "Recursar";
            celdaEstado.classList.add("obligatoria"); // Puedes usar la misma clase de estilo
            notaFinalRedondeadaParaMostrar = "Recursar"; // Se guarda como string
        }
        celdaFecha.textContent = (estadoFinal === "Promocionada" || estadoFinal === "Final") ? new Date().toLocaleDateString("es-AR") : "";

        // Resaltar materia si la nota final redondeada es 4 o más (o si es "Promocionada")
        if (parseFloat(notaFinalRedondeadaParaMostrar) >= 4 && parseFloat(notaFinalRedondeadaParaMostrar) <= 10) {
          celdaNombre.classList.add("celda-materia-aprobada");
        } else {
            celdaNombre.classList.remove("celda-materia-aprobada");
        }
      } else {
        estadoFinal = "";
        notaFinalRedondeadaParaMostrar = "";
        celdaFecha.textContent = "";
      }

      celdaEstado.textContent = estadoFinal;
      celdaFinal.textContent = notaFinalRedondeadaParaMostrar;

      const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
      datosAGuardar.notas = valor;
      datosAGuardar.estado = estadoFinal;
      datosAGuardar.notaFinal = notaFinalRedondeadaParaMostrar;
      datosAGuardar.fechaCierre = celdaFecha.textContent;
      localStorage.setItem(materia.nombre, JSON.stringify(datosAGuardar));
      actualizarBarraProgreso();
    });

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaInput);
    fila.appendChild(celdaEstado);
    fila.appendChild(celdaFecha);
    fila.appendChild(celdaFinal);
    cuerpoTabla.appendChild(fila);
  });
  tabla.appendChild(cuerpoTabla);
  seccion.appendChild(tabla);
  contenedorPrincipal.appendChild(seccion);
}
actualizarBarraProgreso();





