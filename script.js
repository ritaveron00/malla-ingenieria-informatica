const materias = [
  { anio: "Primer año", nombre: "Pensamiento Científico" },
  { anio: "Primer año", nombre: "Pensamiento Computacional" },
  { anio: "Primer año", nombre: "Análisis Matemático" },
  { anio: "Primer año", nombre: "Sociedad y Estado" },
  { anio: "Primer año", nombre: "Física" },
  { anio: "Primer año", nombre: "Álgebra" },

  { anio: "Segundo año", nombre: "Análisis Matemático II" },
  { anio: "Segundo año", nombre: "Fundamentos de Programación" },
  { anio: "Segundo año", nombre: "Introducción al Desarrollo de Software" },
  { anio: "Segundo año", nombre: "Álgebra Lineal" },
  { anio: "Segundo año", nombre: "Organización del Computador" },
  { anio: "Segundo año", nombre: "Algoritmos y Estructuras de Datos" },

  { anio: "Tercer año", nombre: "Probabilidad y Estadística" },
  { anio: "Tercer año", nombre: "Teoría de Algoritmos" },
  { anio: "Tercer año", nombre: "Sistemas Operativos" },
  { anio: "Tercer año", nombre: "Paradigmas de Programación" },
  { anio: "Tercer año", nombre: "Base de Datos" },
  { anio: "Tercer año", nombre: "Modelación Numérica" },
  { anio: "Tercer año", nombre: "Taller de Programación" },
  { anio: "Tercer año", nombre: "Ingeniería de Software I" },

  { anio: "Cuarto año", nombre: "Ciencia de Datos" },
  { anio: "Cuarto año", nombre: "Gestión del Desarrollo de Sistemas Informáticos" },
  { anio: "Cuarto año", nombre: "Programación Concurrente" },
  { anio: "Cuarto año", nombre: "Redes" },
  { anio: "Cuarto año", nombre: "Física para Informática" },
  { anio: "Cuarto año", nombre: "Empresas de Base Tecnológica I" },
  { anio: "Cuarto año", nombre: "Ingeniería de Software II" },
  { anio: "Cuarto año", nombre: "Sistemas Distribuidos I" },

  { anio: "Quinto año", nombre: "Taller de Seguridad Informática" },
  { anio: "Quinto año", nombre: "Empresas de Base Tecnológica II" },
  { anio: "Quinto año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" },
  { anio: "Quinto año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" }
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

    inputNotas.addEventListener("input", () => {
      const val = inputNotas.value.trim();
      const partes = val.split("-").map(n => parseFloat(n));

      if (partes.length === 2 && partes.every(n => !isNaN(n))) {
        const suma = partes[0] + partes[1];
        const promedio = (partes[0] + partes[1]) / 2;

        tdEstado.textContent = suma >= 14 ? "Promocionada" : "Obligatoria";
        tdEstado.className = "estado " + (suma >= 14 ? "promocionada" : "obligatoria");

        tdFinal.textContent = promedio.toFixed(1);

        tdFecha.textContent = promedio >= 4 ? new Date().toLocaleDateString("es-AR") : "";
      } else {
        tdEstado.textContent = "";
        tdEstado.className = "estado";
        tdFecha.textContent = "";
        tdFinal.textContent = "";
      }
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








