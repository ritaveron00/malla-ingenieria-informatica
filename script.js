document.addEventListener("DOMContentLoaded", () => {
  const materiasPorAnio = {
    "PRIMER AÑO": [
      "Pensamiento Científico", "Pensamiento Computacional", "Análisis Matemático I",
      "Sociedad y Estado", "Física", "Álgebra"
    ],
    "SEGUNDO AÑO": [
      "Análisis Matemático II", "Fundamentos de Programación", "Introducción al Desarrollo de Software",
      "Álgebra Lineal", "Organización del Computador", "Algoritmos y Estructuras de Datos"
    ],
    "TERCER AÑO": [
      "Probabilidad y Estadística", "Teoría de Algoritmos", "Sistemas Operativos",
      "Paradigmas de Programación", "Base de Datos", "Modelación Numérica",
      "Taller de Programación", "Ingeniería de Software I"
    ],
    "CUARTO AÑO": [
      "Ciencia de Datos", "Gestión de Desarrollo de Sistemas Informáticos", "Programación Concurrente",
      "Redes", "Física para Informática", "Empresas de Base Tecnológica I",
      "Ingeniería de Software II", "Sistemas Distribuidos I"
    ],
    "QUINTO AÑO": [
      "Taller de Seguridad Informática",
      "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática",
      "Empresas de Base Tecnológica II",
      "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática"
    ]
  };

  const tbody = document.getElementById("tabla-contenido");

  Object.entries(materiasPorAnio).forEach(([anio, materias]) => {
    const headerRow = document.createElement("tr");
    const td = document.createElement("td");
    td.textContent = anio;
    td.colSpan = 7;
    td.style.fontWeight = "bold";
    td.style.backgroundColor = "#DCC9A7";
    tbody.appendChild(headerRow);
    headerRow.appendChild(td);

    materias.forEach((materia) => {
      const row = document.createElement("tr");
      row.classList.add("materia");

      row.innerHTML = `
        <td></td>
        <td>${materia}</td>
        <td><input type="number" class="nota" min="0" max="10"></td>
        <td><input type="number" class="nota" min="0" max="10"></td>
        <td class="estado"></td>
        <td class="fecha"></td>
        <td class="promedio"></td>
      `;

      // Cargar estado desde localStorage
      const datosGuardados = JSON.parse(localStorage.getItem(materia));
      if (datosGuardados) {
        const inputs = row.querySelectorAll("input");
        inputs[0].value = datosGuardados.nota1;
        inputs[1].value = datosGuardados.nota2;
        calcularEstado(row, materia);
      }

      // Escuchar cambios en notas
      row.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", () => {
          calcularEstado(row, materia);
        });
      });

      tbody.appendChild(row);
    });
  });

  function calcularEstado(row, materia) {
    const nota1 = parseFloat(row.querySelectorAll("input")[0].value) || 0;
    const nota2 = parseFloat(row.querySelectorAll("input")[1].value) || 0;
    const suma = nota1 + nota2;
    const estadoTd = row.querySelector(".estado");
    const fechaTd = row.querySelector(".fecha");
    const promedioTd = row.querySelector(".promedio");

    // Promoción
    if (suma >= 14) {
      estadoTd.textContent = "Promocionado";
      row.classList.add("promocionada");

      // Guardar fecha si no está
      if (!fechaTd.textContent) {
        const hoy = new Date().toLocaleDateString("es-AR");
        fechaTd.textContent = hoy;
      }
    } else {
      estadoTd.textContent = "Obligatorio";
      row.classList.remove("promocionada");
      fechaTd.textContent = "";
    }

    const promedio = ((nota1 + nota2) / 2).toFixed(1);
    promedioTd.textContent = isNaN(promedio) ? "" : promedio;

    // Guardar en localStorage
    localStorage.setItem(materia, JSON.stringify({
      nota1, nota2, estado: estadoTd.textContent,
      fecha: fechaTd.textContent, promedio
    }));
  }
});




