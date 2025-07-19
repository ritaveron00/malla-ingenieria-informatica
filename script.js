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
    const celdaEstado = document.createElement("td"); // Esta es la columna "Final" en la interfaz
    celdaEstado.classList.add("estado-materia");
    const celdaFecha = document.createElement("td");
    const celdaNotaFinal = document.createElement("td"); // Esta es la columna "Nota Final" en la interfaz
    const datosGuardados = localStorage.getItem(materia.nombre);
    if (datosGuardados) {
      const datos = JSON.parse(datosGuardados);
      inputNotas.value = datos.notas || "";
      celdaEstado.textContent = datos.estado || "";
      celdaNotaFinal.textContent = datos.notaFinal || ""; // Carga en celdaNotaFinal
      celdaFecha.textContent = datos.fechaCierre || "";
      if (datos.estado === "Promocionada") {
        celdaEstado.classList.add("promocionada");
      } else if (datos.estado === "Obligatoria" || datos.estado === "Recursar") { // Si el estado cargado es "Recursar" o "Obligatoria", usa la clase obligatoria
        celdaEstado.classList.add("obligatoria");
      }
      const promedioCargado = parseFloat(datos.notaFinal); // Usar datos.notaFinal para el promedio
      if (!isNaN(promedioCargado) && promedioCargado >= 4 && promedioCargado <= 10) {
          celdaNombre.classList.add("celda-materia-aprobada");
      }
    }
    inputNotas.addEventListener("input", () => {
      const valor = inputNotas.value.trim();
      let promedioCalculadoSinRedondeo = NaN;
      let notaNumericaRedondeada = NaN; // Para el valor numérico redondeado
      let textoNotaFinalColumna = ""; // Lo que se mostrará en la columna "Nota Final"
      let textoEstadoColumna = ""; // Lo que se mostrará en la columna "Final" (Estado)

      celdaNombre.classList.remove("celda-materia-aprobada");
      celdaEstado.className = "estado-materia"; // Resetear clases

      const partes = valor.split("-").map(n => parseFloat(n));

      if (valor === "") {
        textoEstadoColumna = "";
        textoNotaFinalColumna = "";
        celdaFecha.textContent = "";
      } else if (partes.length === 1 && !isNaN(partes[0])) {
        // Lógica para una sola nota
        promedioCalculadoSinRedondeo = partes[0];
        notaNumericaRedondeada = aplicarRedondeoUBAXXI(promedioCalculadoSinRedondeo);
        textoNotaFinalColumna = notaNumericaRedondeada.toFixed(0);
        
        if (promedioCalculadoSinRedondeo >= 7) {
            textoEstadoColumna = "Promocionada";
            celdaEstado.classList.add("promocionada");
        } else {
            textoEstadoColumna = "Obligatoria";
            celdaEstado.classList.add("obligatoria");
        }

      } else if (partes.length === 2 && partes.every(n => !isNaN(n))) {
        const nota1 = partes[0];
        const nota2 = partes[1];

        // Condición para "Recursar": AMBAS notas parciales son menores a 4
        if (nota1 < 4 && nota2 < 4) {
            textoEstadoColumna = "Recursar"; // "Recursar" en la columna "Final" (Estado)
            celdaEstado.classList.add("obligatoria"); // Puedes usar la misma clase para "Recursar"
            promedioCalculadoSinRedondeo = (nota1 + nota2) / 2;
            textoNotaFinalColumna = promedioCalculadoSinRedondeo.toFixed(1); // Promedio exacto en "Nota Final"
            celdaFecha.textContent = "";

            const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
            datosAGuardar.notas = valor;
            datosAGuardar.estado = textoEstadoColumna; // Guardar "Recursar"
            datosAGuardar.notaFinal = textoNotaFinalColumna; // Guardar el promedio exacto
            datosAGuardar.fechaCierre = celdaFecha.textContent;
            localStorage.setItem(materia.nombre, JSON.stringify(datosAGuardar));
            actualizarBarraProgreso();
            return; // Termina la ejecución para este caso
        }

        // Lógica normal de Promocionada/Obligatoria para otros casos
        promedioCalculadoSinRedondeo = (nota1 + nota2) / 2;
        notaNumericaRedondeada = aplicarRedondeoUBAXXI(promedioCalculadoSinRedondeo);
        textoNotaFinalColumna = notaNumericaRedondeada.toFixed(0);
        
        if ((nota1 + nota2) >= 14) {
            textoEstadoColumna = "Promocionada";
            celdaEstado.classList.add("promocionada");
        } else {
            textoEstadoColumna = "Obligatoria";
            celdaEstado.classList.add("obligatoria");
        }

      }

      if (!isNaN(promedioCalculadoSinRedondeo)) {
        celdaEstado.textContent = textoEstadoColumna;
        celdaNotaFinal.textContent = textoNotaFinalColumna; // Asigna al td de nota final
        celdaFecha.textContent = (parseFloat(textoNotaFinalColumna) >= 4) ? new Date().toLocaleDateString("es-AR") : "";

        // Resaltar materia si la nota final es 4 o más (ignorar si es "Recursar")
        if (!isNaN(parseFloat(textoNotaFinalColumna)) && parseFloat(textoNotaFinalColumna) >= 4 && parseFloat(textoNotaFinalColumna) <= 10) {
          celdaNombre.classList.add("celda-materia-aprobada");
        } else {
            celdaNombre.classList.remove("celda-materia-aprobada");
        }
      } else {
        celdaEstado.textContent = "";
        celdaNotaFinal.textContent = "";
        celdaFecha.textContent = "";
      }

      const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
      datosAGuardar.notas = valor;
      datosAGuardar.estado = celdaEstado.textContent;
      datosAGuardar.notaFinal = celdaNotaFinal.textContent;
      datosAGuardar.fechaCierre = celdaFecha.textContent;
      localStorage.setItem(materia.nombre, JSON.stringify(datosAGuardar));
      actualizarBarraProgreso();
    });

    fila.appendChild(celdaNombre);
    fila.appendChild(celdaInput);
    fila.appendChild(celdaEstado); // Columna "Final"
    fila.appendChild(celdaFecha);
    fila.appendChild(celdaNotaFinal); // Columna "Nota Final"
    cuerpoTabla.appendChild(fila);
  });
  tabla.appendChild(cuerpoTabla);
  seccion.appendChild(tabla);
  contenedorPrincipal.appendChild(seccion);
}
actualizarBarraProgreso();



