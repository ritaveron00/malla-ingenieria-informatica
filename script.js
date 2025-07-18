const materias = [
  // Primer año
  { anio: "Primer año", nombre: "Pensamiento Científico" },
  { anio: "Primer año", nombre: "Pensamiento Computacional" },
  { anio: "Primer año", nombre: "Análisis Matemático" },
  { anio: "Primer año", nombre: "Sociedad y Estado" },
  { anio: "Primer año", nombre: "Física" },
  { anio: "Primer año", nombre: "Álgebra" },

  // Segundo año
  { anio: "Segundo año", nombre: "Análisis Matemático II" },
  { anio: "Segundo año", nombre: "Fundamentos de Programación" },
  { anio: "Segundo año", nombre: "Introducción al Desarrollo de Software" },
  { anio: "Segundo año", nombre: "Álgebra Lineal" },
  { anio: "Segundo año", nombre: "Organización del Computador" },
  { anio: "Segundo año", nombre: "Algoritmos y Estructuras de Datos" },

  // Tercer año
  { anio: "Tercer año", nombre: "Probabilidad y Estadística" },
  { anio: "Tercer año", nombre: "Teoría de Algoritmos" },
  { anio: "Tercer año", nombre: "Sistemas Operativos" },
  { anio: "Tercer año", nombre: "Paradigmas de Programación" },
  { anio: "Tercer año", nombre: "Base de Datos" },
  { anio: "Tercer año", nombre: "Modelación Numérica" },
  { anio: "Tercer año", nombre: "Taller de Programación" },
  { anio: "Tercer año", nombre: "Ingeniería de Software I" },

  // Cuarto año
  { anio: "Cuarto año", nombre: "Ciencia de Datos" },
  { anio: "Cuarto año", nombre: "Gestión del Desarrollo de Sistemas Informáticos" },
  { anio: "Cuarto año", nombre: "Programación Concurrente" },
  { anio: "Cuarto año", nombre: "Redes" },
  { anio: "Cuarto año", nombre: "Física para Informática" },
  { anio: "Cuarto año", nombre: "Empresas de Base Tecnológica I" },
  { anio: "Cuarto año", nombre: "Ingeniería de Software II" },
  { anio: "Cuarto año", nombre: "Sistemas Distribuidos I" },

  // Quinto año
  { anio: "Quinto año", nombre: "Taller de Seguridad Informática" },
  { anio: "Quinto año", nombre: "Empresas de Base Tecnológica II" },
  { anio: "Quinto año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" },
  { anio: "Quinto año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" }
];


const tabla = document.getElementById("tabla-materias");

materias.forEach((materia, i) => {
  const row = document.createElement("tr");

  const input = document.createElement("input");
  input.type = "text";
  input.placeholder = "7-6";

  const estadoTd = document.createElement("td");
  estadoTd.classList.add("estado");

  const fechaTd = document.createElement("td");
  const finalTd = document.createElement("td");

  input.addEventListener("input", () => {
    const val = input.value.trim();
    const notas = val.split("-").map(n => parseInt(n));

    if (notas.length === 2 && notas.every(n => !isNaN(n))) {
      const suma = notas[0] + notas[1];
      const promedio = (notas[0] + notas[1]) / 2;

      // Estado
      if (suma >= 14) {
        estadoTd.textContent = "Promocionada";
        estadoTd.className = "estado promocionada";
      } else {
        estadoTd.textContent = "Obligatoria";
        estadoTd.className = "estado obligatoria";
      }

      // Nota final
      finalTd.textContent = promedio.toFixed(1);

      // Fecha si promedio >= 4
      if (promedio >= 4) {
        const hoy = new Date().toLocaleDateString("es-AR");
        fechaTd.textContent = hoy;
      } else {
        fechaTd.textContent = "";
      }
    } else {
      estadoTd.textContent = "";
      estadoTd.className = "estado";
      finalTd.textContent = "";
      fechaTd.textContent = "";
    }
  });

  row.innerHTML = `
    <td>${materia.anio}</td>
    <td>${materia.nombre}</td>
    <td></td>
  `;

  row.children[2].appendChild(input);
  row.appendChild(estadoTd);
  row.appendChild(fechaTd);
  row.appendChild(finalTd);

  tabla.appendChild(row);
});







