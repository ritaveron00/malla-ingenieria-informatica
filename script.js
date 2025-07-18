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

const contenedor = document.getElementById("contenedor-tablas");
const agrupadoPorAnio = {};

materias.forEach(m => {
  if (!agrupadoPorAnio[m.anio]) agrupadoPorAnio[m.anio] = [];
  agrupadoPorAnio[m.anio].push(m);
});

for (const anio in agrupadoPorAnio) {
  const seccion = document.createElement("div");
  seccion.className = "anio";

  const titulo = document.createElement("h2");
  titulo.textContent = anio;
  seccion.appendChild(titulo);

  const tabla = document.createElement("table");
  const thead = document.createElement("thead");
  thead.innerHTML = `
    <tr>
      <th>Materia</th>
      <th>Notas Parciales</th>
      <th>Final</th>
      <th>Fecha de Cierre</th>
      <th>Nota Final</th>
    </tr>
  `;
  tabla.appendChild(thead);

  const tbody = document.createElement("tbody");

  agrupadoPorAnio[anio].forEach(materia => {
    const row = document.createElement("tr");
    row.dataset.materiaNombre = materia.nombre;

    const tdNombre = document.createElement("td");
    tdNombre.textContent = materia.nombre;

    const inputNotas = document.createElement("input");
    inputNotas.type = "text";
    inputNotas.placeholder = "";
    const tdInput = document.createElement("td");
    tdInput.appendChild(inputNotas);

    const tdEstado = document.createElement("td");
    tdEstado.classList.add("estado");

    const tdFecha = document.createElement("td");
    const tdFinal = document.createElement("td");

    // --- Cargar datos guardados de localStorage al inicio ---
    const savedData = localStorage.getItem(materia.nombre);
    if (savedData) {
      const data = JSON.parse(savedData);
      inputNotas.value = data.notas || "";

      tdEstado.textContent = data.estado || "";
      tdFinal.textContent = data.notaFinal || "";
      tdFecha.textContent = data.fechaCierre || "";

      // Reaplicar las clases de estado
      if (data.estado === "Promocionada") {
        tdEstado.classList.add("promocionada");
      } else if (data.estado === "Obligatoria") {
        tdEstado.classList.add("obligatoria");
      }

      // NUEVO: Reaplicar clase de resaltado de materia si el promedio cumple la condición
      const loadedPromedio = parseFloat(data.notaFinal);
      if (loadedPromedio >= 4 && loadedPromedio <= 10) {
          tdNombre.classList.add("td-materia-promocionada");
      }
    }
    // --- Fin de carga de datos ---

    inputNotas.addEventListener("input", () => {
      const val = inputNotas.value.trim();
      let promedio = NaN;
      let suma = NaN;
      let isPromocionada = false;

      // Limpiar clases de resaltado y estado antes de aplicar nuevas
      tdNombre.classList.remove("td-materia-promocionada"); // Solo se resalta la celda de la materia
      tdEstado.className = "estado"; // Resetear la clase de estado (para remover 'promocionada'/'obligatoria')

      const partes = val.split("-").map(n => parseFloat(n));

      if (val === "") {
        // Si el campo está vacío, resetear todo
        tdEstado.textContent = "";
        tdFinal.textContent = "";
        tdFecha.textContent = "";
      } else if (partes.length === 1 && !isNaN(partes[0])) {
        // Caso de una sola nota (ej: 8)
        promedio = partes[0];
        isPromocionada = (promedio >= 7); // Asumimos promocionada si es >= 7 para una sola nota
      } else if (partes.length === 2 && partes.every(n => !isNaN(n))) {
        // Caso de dos notas (ej: 7-7)
        suma = partes[0] + partes[1];
        promedio = (partes[0] + partes[1]) / 2;
        isPromocionada = (suma >= 14); // Promocionada si la suma es >= 14 para dos notas
      }

      if (!isNaN(promedio)) {
        tdFinal.textContent = promedio.toFixed(1);
        tdFecha.textContent = promedio >= 4 ? new Date().toLocaleDateString("es-AR") : ""; // Fecha si la nota es >=4

        tdEstado.textContent = isPromocionada ? "Promocionada" : "Obligatoria";
        tdEstado.classList.add(isPromocionada ? "promocionada" : "obligatoria");

        // NUEVO: Lógica para pintar SOLO la celda de "Materia" si el promedio está entre 4 y 10
        if (promedio >= 4 && promedio <= 10) {
          tdNombre.classList.add("td-materia-promocionada");
        }
      } else {
        // Si la entrada es inválida, asegurar que los campos estén limpios
        tdEstado.textContent = "";
        tdFinal.textContent = "";
        tdFecha.textContent = "";
      }

      // --- Guardar datos en localStorage ---
      const dataToSave = {
        notas: val,
        estado: tdEstado.textContent,
        notaFinal: tdFinal.textContent,
        fechaCierre: tdFecha.textContent
      };
      localStorage.setItem(materia.nombre, JSON.stringify(dataToSave));
      // --- Fin de guardar datos ---
    });

    row.appendChild(tdNombre);
    row.appendChild(tdInput);
    row.appendChild(tdEstado);
    row.appendChild(tdFecha);
    row.appendChild(tdFinal);
    tbody.appendChild(row);
  });

  tabla.appendChild(tbody);
  seccion.appendChild(tabla);
  contenedor.appendChild(seccion);
}








