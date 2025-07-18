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
  { anio: "Quinto Año", nombre: "Empresas de Base Tecnológica II" },
  { anio: "Quinto Año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" },
  { anio: "Quinto Año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" }
];

const contenedor = document.getElementById("contenedor-tablas");
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const agrupadoPorAnio = {};

materias.forEach(m => {
  if (!agrupadoPorAnio[m.anio]) agrupadoPorAnio[m.anio] = [];
  agrupadoPorAnio[m.anio].push(m);
});

function updateProgressBar() {
    let materiasAprobadas = 0;
    const totalMaterias = materias.length;

    materias.forEach(materia => {
        const savedData = localStorage.getItem(materia.nombre);
        if (savedData) {
            const data = JSON.parse(savedData);
            const notaFinal = parseFloat(data.notaFinal);
            if (!isNaN(notaFinal) && notaFinal >= 4) {
                materiasAprobadas++;
            }
        }
    });

    const porcentaje = totalMaterias > 0 ? (materiasAprobadas / totalMaterias) * 100 : 0;
    progressBar.style.width = `${porcentaje.toFixed(2)}%`;
    progressText.textContent = `${porcentaje.toFixed(0)}% de materias aprobadas`;
}

// Emojis y sus clases de animación
const moodEmojis = [
    { emoji: '😡', class: 'animate-angry' },
    { emoji: '😢', class: 'animate-sad' },
    { emoji: '😄', class: 'animate-happy' },
    { emoji: '🥰', class: 'animate-love' },
    { emoji: '😟', class: 'animate-worried' }
];

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
      <th>Mood</th> </tr>
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

    // --- Columna del Mood ---
    const tdMood = document.createElement("td");
    const moodSelectorDiv = document.createElement("div");
    moodSelectorDiv.classList.add("mood-selector");

    moodEmojis.forEach(mood => {
        const emojiSpan = document.createElement("span");
        emojiSpan.textContent = mood.emoji;
        emojiSpan.classList.add("mood-emoji");
        emojiSpan.dataset.emoji = mood.emoji; // Para identificarlo fácilmente

        emojiSpan.addEventListener("click", () => {
            // Eliminar la clase 'selected' y las animaciones de todos los emojis en esta fila
            Array.from(moodSelectorDiv.children).forEach(child => {
                child.classList.remove("selected");
                moodEmojis.forEach(m => child.classList.remove(m.class)); // Remover todas las clases de animación
            });

            // Seleccionar el emoji actual y aplicar su animación
            emojiSpan.classList.add("selected");
            emojiSpan.classList.add(mood.class);

            // Remover la clase de animación después de que termine para que pueda ser disparada de nuevo
            emojiSpan.addEventListener('animationend', () => {
                emojiSpan.classList.remove(mood.class);
            }, { once: true }); // El evento se dispara solo una vez

            // Guardar el mood seleccionado en localStorage
            const savedData = JSON.parse(localStorage.getItem(materia.nombre)) || {};
            savedData.mood = mood.emoji;
            localStorage.setItem(materia.nombre, JSON.stringify(savedData));
        });
        moodSelectorDiv.appendChild(emojiSpan);
    });
    tdMood.appendChild(moodSelectorDiv);
    // --- Fin Columna del Mood ---


    // --- Cargar datos guardados de localStorage al inicio ---
    const savedData = localStorage.getItem(materia.nombre);
    if (savedData) {
      const data = JSON.parse(savedData);
      inputNotas.value = data.notas || "";

      tdEstado.textContent = data.estado || "";
      tdFinal.textContent = data.notaFinal || "";
      tdFecha.textContent = data.fechaCierre || "";

      // Reaplicar las clases de estado y de resaltado de materia si el promedio cumple la condición
      if (data.estado === "Promocionada") {
        tdEstado.classList.add("promocionada");
      } else if (data.estado === "Obligatoria") {
        tdEstado.classList.add("obligatoria");
      }
      const loadedPromedio = parseFloat(data.notaFinal);
      if (loadedPromedio >= 4 && loadedPromedio <= 10) {
          tdNombre.classList.add("td-materia-promocionada");
      }

      // Cargar y seleccionar el mood guardado
      if (data.mood) {
          const selectedEmojiSpan = moodSelectorDiv.querySelector(`[data-emoji="${data.mood}"]`);
          if (selectedEmojiSpan) {
              selectedEmojiSpan.classList.add("selected");
          }
      }
    }
    // --- Fin de carga de datos ---

    inputNotas.addEventListener("input", () => {
      const val = inputNotas.value.trim();
      let promedio = NaN;
      let suma = NaN;
      let isPromocionada = false;

      // Limpiar clases de resaltado y estado antes de aplicar nuevas
      tdNombre.classList.remove("td-materia-promocionada");
      tdEstado.className = "estado";

      const partes = val.split("-").map(n => parseFloat(n));

      if (val === "") {
        tdEstado.textContent = "";
        tdFinal.textContent = "";
        tdFecha.textContent = "";
      } else if (partes.length === 1 && !isNaN(partes[0])) {
        promedio = partes[0];
        isPromocionada = (promedio >= 7);
      } else if (partes.length === 2 && partes.every(n => !isNaN(n))) {
        suma = partes[0] + partes[1];
        promedio = (partes[0] + partes[1]) / 2;
        isPromocionada = (suma >= 14);
      }

      if (!isNaN(promedio)) {
        tdFinal.textContent = promedio.toFixed(1);
        tdFecha.textContent = promedio >= 4 ? new Date().toLocaleDateString("es-AR") : "";

        tdEstado.textContent = isPromocionada ? "Promocionada" : "Obligatoria";
        tdEstado.classList.add(isPromocionada ? "promocionada" : "obligatoria");

        if (promedio >= 4 && promedio <= 10) {
          tdNombre.classList.add("td-materia-promocionada");
        }
      } else {
        tdEstado.textContent = "";
        tdFinal.textContent = "";
        tdFecha.textContent = "";
      }

      // Guardar datos en localStorage
      const dataToSave = JSON.parse(localStorage.getItem(materia.nombre)) || {};
      dataToSave.notas = val;
      dataToSave.estado = tdEstado.textContent;
      dataToSave.notaFinal = tdFinal.textContent;
      dataToSave.fechaCierre = tdFecha.textContent;
      localStorage.setItem(materia.nombre, JSON.stringify(dataToSave));
      
      updateProgressBar(); // Actualizar la barra de progreso
    });

    row.appendChild(tdNombre);
    row.appendChild(tdInput);
    row.appendChild(tdEstado);
    row.appendChild(tdFecha);
    row.appendChild(tdFinal);
    row.appendChild(tdMood);
    tbody.appendChild(row);
  });

  tabla.appendChild(tbody);
  seccion.appendChild(tabla);
  contenedor.appendChild(seccion);
}

updateProgressBar(); // Llamada inicial para cargar la barra de progreso al inicio







