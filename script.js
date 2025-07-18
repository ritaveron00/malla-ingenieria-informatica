document.addEventListener("DOMContentLoaded", () => {
  const materias = [
    // Primer Año
    { anio: "Primer año", nombre: "Pensamiento Científico" },
    { anio: "Primer año", nombre: "Pensamiento Computacional" },
    { anio: "Primer año", nombre: "Análisis Matemático" },
    { anio: "Primer año", nombre: "Sociedad y Estado" },
    { anio: "Primer año", nombre: "Física" },
    { anio: "Primer año", nombre: "Álgebra" },

    // Segundo Año
    { anio: "Segundo año", nombre: "Análisis Matemático II" },
    { anio: "Segundo año", nombre: "Fundamentos de Programación" },
    { anio: "Segundo año", nombre: "Introducción al Desarrollo de Software" },
    { anio: "Segundo año", nombre: "Álgebra Lineal" },
    { anio: "Segundo año", nombre: "Organización del Computador" },
    { anio: "Segundo año", nombre: "Algoritmos y Estruc. Datos" },

    // Tercer Año
    { anio: "Tercer año", nombre: "Probabilidad y Estadística" },
    { anio: "Tercer año", nombre: "Teoría de Algoritmos" },
    { anio: "Tercer año", nombre: "Sistemas Operativos" },
    { anio: "Tercer año", nombre: "Paradigmas de Programación" },
    { anio: "Tercer año", nombre: "Base de Datos" },
    { anio: "Tercer año", nombre: "Modelación Numérica" },
    { anio: "Tercer año", nombre: "Taller de Programación" },
    { anio: "Tercer año", nombre: "Ingeniería de Software I" },

    // Cuarto Año
    { anio: "Cuarto año", nombre: "Ciencia de Datos" },
    { anio: "Cuarto año", nombre: "Gestión del Desarrollo de Sistemas Informáticos" },
    { anio: "Cuarto año", nombre: "Programación Concurrente" },
    { anio: "Cuarto año", nombre: "Redes" },
    { anio: "Cuarto año", nombre: "Física para Informática" },
    { anio: "Cuarto año", nombre: "Empresas de Base Tecnológica I" },
    { anio: "Cuarto año", nombre: "Ingeniería de Software II" },
    { anio: "Cuarto año", nombre: "Sistemas Distribuidos I" },

    // Quinto Año
    { anio: "Quinto año", nombre: "Taller de Seguridad Informática" },
    { anio: "Quinto año", nombre: "Empresas de Base Tecnológica II" },
    { anio: "Quinto año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" },
    { anio: "Quinto año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" }
  ];

  const malla = document.getElementById("malla");
  const porAnio = {};

  materias.forEach(({ anio, nombre }) => {
    if (!porAnio[anio]) porAnio[anio] = [];
    porAnio[anio].push(nombre);
  });

  Object.entries(porAnio).forEach(([anio, materias]) => {
    const col = document.createElement("div");
    col.className = "anio";

    const titulo = document.createElement("h2");
    titulo.textContent = anio;
    col.appendChild(titulo);

    materias.forEach(materia => {
      const card = document.createElement("div");
      card.className = "materia";

      const label = document.createElement("label");
      label.textContent = materia;
      card.appendChild(label);

      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = ""; // vacío al inicio
      card.appendChild(input);

      const final = document.createElement("div");
      final.className = "estado";
      final.textContent = "Final: -";
      card.appendChild(final);

      const fecha = document.createElement("div");
      fecha.className = "fecha";
      fecha.textContent = "Fecha de cierre: -";
      card.appendChild(fecha);

      const notaFinal = document.createElement("div");
      notaFinal.className = "notaFinal";
      notaFinal.textContent = "Nota final: -";
      card.appendChild(notaFinal);

      input.addEventListener("input", () => {
        const notas = input.value.split("-").map(n => parseInt(n.trim()));
        if (notas.length === 2 && notas.every(n => !isNaN(n))) {
          const suma = notas[0] + notas[1];
          const promedio = Math.round((notas[0] + notas[1]) / 2);

          final.textContent = suma >= 14 ? "Final: Promocionada" : "Final: Obligatoria";
          notaFinal.textContent = `Nota final: ${promedio}`;

          if (promedio >= 4) {
            const hoy = new Date().toLocaleDateString();
            fecha.textContent = `Fecha de cierre: ${hoy}`;
          } else {
            fecha.textContent = "Fecha de cierre: -";
          }
        } else {
          final.textContent = "Final: -";
          fecha.textContent = "Fecha de cierre: -";
          notaFinal.textContent = "Nota final: -";
        }
      });

      card.addEventListener("click", () => {
        card.classList.toggle("seleccionada");
      });

      col.appendChild(card);
    });

    malla.appendChild(col);
  });
});









