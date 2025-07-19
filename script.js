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
  { anio: "Tercer Año", "nombre": "Paradigmas de Programación" },
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
  { anio: "Quinto Año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" },
  { anio: "Quinto Año", nombre: "Empresas de Base Tecnológica II" },
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
      } else if (datos.estado === "Obligatoria") {
        celdaEstado.classList.add("obligatoria");
      }
      const promedioCargado = parseFloat(datos.notaFinal);
      if (promedioCargado >= 4 && promedioCargado <= 10) {
          celdaNombre.classList.add("celda-materia-aprobada");
      }
    }
    inputNotas.addEventListener("input", () => {
      const valor = inputNotas.value.trim();
      let promedio = NaN;
      let suma = NaN;
      let esPromocionada = false;
      celdaNombre.classList.remove("celda-materia-aprobada");
      celdaEstado.className = "estado-materia";
      const partes = valor.split("-").map(n => parseFloat(n));
      if (valor === "") {
        celdaEstado.textContent = "";
        celdaFinal.textContent = "";
        celdaFecha.textContent = "";
      } else if (partes.length === 1 && !isNaN(partes[0])) {
        promedio = partes[0];
        esPromocionada = (promedio >= 7);
      } else if (partes.length === 2 && partes.every(n => !isNaN(n))) {
        suma = partes[0] + partes[1];
        promedio = (partes[0] + partes[1]) / 2;
        esPromocionada = (suma >= 14);
      }
      if (!isNaN(promedio)) {
        celdaFinal.textContent = promedio.toFixed(1);
        celdaFecha.textContent = promedio >= 4 ? new Date().toLocaleDateString("es-AR") : "";
        celdaEstado.textContent = esPromocionada ? "Promocionada" : "Obligatoria";
        celdaEstado.classList.add(esPromocionada ? "promocionada" : "obligatoria");
        if (promedio >= 4 && promedio <= 10) {
          celdaNombre.classList.add("celda-materia-aprobada");
        }
      } else {
        celdaEstado.textContent = "";
        celdaFinal.textContent = "";
        celdaFecha.textContent = "";
      }
      const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
      datosAGuardar.notas = valor;
      datosAGuardar.estado = celdaEstado.textContent;
      datosAGuardar.notaFinal = celdaFinal.textContent;
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







