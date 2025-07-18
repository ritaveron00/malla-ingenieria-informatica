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

// Creamos una única burbuja de mood que se reutilizará
const globalMoodBubble = document.createElement("div");
globalMoodBubble.classList.add("mood-bubble");
document.body.appendChild(globalMoodBubble); // Añadirla al body para que esté fuera del flujo de la tabla

// Populate global mood bubble with emoji options
moodEmojis.forEach(mood => {
    const emojiOption = document.createElement("span");
    emojiOption.textContent = mood.emoji;
    emojiOption.classList.add("emoji-option");
    emojiOption.dataset.emoji = mood.emoji; // Store emoji value
    emojiOption.dataset.animationClass = mood.class; // Store animation class
    globalMoodBubble.appendChild(emojiOption);
});

// Variable para almacenar el trigger activo (el botón que abrió la burbuja)
let currentMoodTrigger = null;

// Handle click on emoji options inside the global bubble
globalMoodBubble.querySelectorAll('.emoji-option').forEach(emojiOption => {
    emojiOption.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent clicks from closing the bubble immediately

        if (currentMoodTrigger) {
            // Set the selected emoji on the trigger
            currentMoodTrigger.textContent = emojiOption.textContent;
            currentMoodTrigger.classList.add("selected-emoji");
            currentMoodTrigger.classList.remove("text-button");

            // Apply selected emoji's animation
            moodEmojis.forEach(m => currentMoodTrigger.classList.remove(m.class));
            currentMoodTrigger.classList.add(emojiOption.dataset.animationClass);
            currentMoodTrigger.addEventListener('animationend', () => {
                currentMoodTrigger.classList.remove(emojiOption.dataset.animationClass);
            }, { once: true });

            // Get materia name from the row of the currentMoodTrigger
            const row = currentMoodTrigger.closest('tr');
            const materiaNombre = row ? row.dataset.materiaNombre : null;

            if (materiaNombre) {
                // Save the selected mood in localStorage
                const savedData = JSON.parse(localStorage.getItem(materiaNombre)) || {};
                savedData.mood = emojiOption.textContent;
                localStorage.setItem(materiaNombre, JSON.stringify(savedData));
            }
        }
        
        // Hide the bubble and reset current trigger
        globalMoodBubble.classList.remove("active");
        currentMoodTrigger = null;
    });
});

// Close bubble if clicked outside anywhere on the document
document.addEventListener("click", (event) => {
    // Check if the click was NOT inside the bubble and NOT on any mood trigger
    const isClickInsideBubble = globalMoodBubble.contains(event.target);
    const isClickOnMoodTrigger = event.target.classList.contains('mood-trigger');

    if (!isClickInsideBubble && !isClickOnMoodTrigger) {
        globalMoodBubble.classList.remove("active");
        currentMoodTrigger = null;
    }
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

    // --- Columna del Mood (Botón) ---
    const tdMood = document.createElement("td");
    tdMood.classList.add("mood-container"); // Container for centering the button

    const moodTrigger = document.createElement("div");
    moodTrigger.classList.add("mood-trigger");
    moodTrigger.textContent = "⚙️"; // Default icon or text for the button
    
    // Event listener to toggle the mood bubble
    moodTrigger.addEventListener("click", (event) => {
        event.stopPropagation(); // Prevent document click from closing it

        // If this trigger already opened the bubble, just close it
        if (currentMoodTrigger === moodTrigger && globalMoodBubble.classList.contains("active")) {
            globalMoodBubble.classList.remove("active");
            currentMoodTrigger = null;
            return;
        }

        // Close any other open bubbles
        document.querySelectorAll('.mood-bubble.active').forEach(openBubble => {
            openBubble.classList.remove('active');
        });

        // Set the current active trigger
        currentMoodTrigger = moodTrigger;

        // Position the bubble relative to the clicked trigger
        const rect = moodTrigger.getBoundingClientRect();
        globalMoodBubble.style.left = `${rect.left + rect.width / 2}px`; // Center horizontally
        globalMoodBubble.style.top = `${rect.top}px`; // Align with the top of the trigger
        globalMoodBubble.style.transform = `translate(-50%, -110%)`; // Move up and center-align
        
        // Handle edge case for the last column to prevent bubble from going off screen
        const tableRect = tabla.getBoundingClientRect();
        const bubbleWidth = globalMoodBubble.offsetWidth;
        if ((rect.left + rect.width / 2 + bubbleWidth / 2) > tableRect.right) {
            // If it goes off right, align right edge of bubble with right edge of table
            globalMoodBubble.style.left = `${tableRect.right}px`;
            globalMoodBubble.style.transform = `translate(-100%, -110%)`; // Align right and move up
        } else if ((rect.left + rect.width / 2 - bubbleWidth / 2) < tableRect.left) {
             // If it goes off left, align left edge of bubble with left edge of table
            globalMoodBubble.style.left = `${tableRect.left}px`;
            globalMoodBubble.style.transform = `translate(0, -110%)`; // Align left and move up
        }


        // Show the bubble
        globalMoodBubble.classList.add("active");
    });

    tdMood.appendChild(moodTrigger);
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

      // Load and set the saved mood emoji
      if (data.mood) {
          moodTrigger.textContent = data.mood;
          moodTrigger.classList.add("selected-emoji"); // Style as selected emoji
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

updateProgressBar(); // Initial call to load progress bar







