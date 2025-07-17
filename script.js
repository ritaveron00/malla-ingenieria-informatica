const materiasPorAnio = {
  '1°': [
    "Pensamiento Científico",
    "Pensamiento Computacional",
    "Análisis Matemático",
    "Sociedad y Estado",
    "Física",
    "Álgebra"
  ],
  '2°': [
    "Análisis Matemático II",
    "Fundamentos de Programación",
    "Introducción al Desarrollo de Software",
    "Álgebra Lineal",
    "Organización del Computador",
    "Algoritmos y Estruc. Datos"
  ],
  '3°': [
    "Probabilidad y Estadística",
    "Teoría de Algoritmos",
    "Sistemas Operativos",
    "Paradigmas de Programación",
    "Base de Datos",
    "Modelación Numérica",
    "Taller de Programación",
    "Ingeniería de Software I"
  ],
  '4°': [
    "Ciencia de Datos",
    "Gestión del Desarrollo de Sistemas Informáticos",
    "Programación Concurrente",
    "Redes",
    "Física para Informática",
    "Empresas de Base Tecnológica I",
    "Ingeniería de Software II",
    "Sistemas Distribuidos I"
  ],
  '5°': [
    "Taller de Seguridad Informática",
    "Tesis de Ingeniería o Trabajo Profesional de Ingeniería Informática",
    "Empresas de Base Tecnológica II",
    "Tesis de Ingeniería o Trabajo Profesional de Ingeniería Informática"
  ]
};

const container = document.querySelector('.tabla-container');

for (const [anio, materias] of Object.entries(materiasPorAnio)) {
  materias.forEach(nombre => {
    const fila = document.createElement('div');
    fila.className = 'fila materia';

    fila.innerHTML = `
      <div class="col">${anio}</div>
      <div class="col nombre-materia">${nombre}</div>
      <div class="col"><input type="number" class="nota nota1" min="0" max="10"></div>
      <div class="col"><input type="number" class="nota nota2" min="0" max="10"></div>
      <div class="col final"></div>
      <div class="col fecha-cierre"></div>
      <div class="col nota-final"></div>
    `;

    container.appendChild(fila);
  });
}

document.addEventListener("input", () => {
  document.querySelectorAll(".materia").forEach(fila => {
    const nota1 = parseFloat(fila.querySelector(".nota1").value);
    const nota2 = parseFloat(fila.querySelector(".nota2").value);
    const final = fila.querySelector(".final");
    const fecha = fila.querySelector(".fecha-cierre");
    const promedio = fila.querySelector(".nota-final");
    const nombre = fila.querySelector(".nombre-materia").textContent;

    if (!isNaN(nota1) && !isNaN(nota2)) {
      const suma = nota1 + nota2;
      const prom = ((nota1 + nota2) / 2).toFixed(2);
      promedio.textContent = prom;

      if (suma >= 14) {
        final.textContent = "Promocionado";
        fila.classList.add("promocionada");
        fila.classList.remove("obligatoria");
        if (!fecha.textContent) {
          const hoy = new Date();
          fecha.textContent = hoy.toLocaleDateString();
        }
      } else {
        final.textContent = "Obligatorio";
        fila.classList.remove("promocionada");
        fila.classList.add("obligatoria");
        fecha.textContent = "";
      }

      // Guardar en localStorage
      const data = {
        nota1,
        nota2,
        final: final.textContent,
        fecha: fecha.textContent,
        promedio: promedio.textContent
      };
      localStorage.setItem(nombre, JSON.stringify(data));
    }
  });
});

// Cargar estado desde localStorage
document.querySelectorAll(".materia").forEach(fila => {
  const nombre = fila.querySelector(".nombre-materia").textContent;
  const saved = JSON.parse(localStorage.getItem(nombre));
  if (saved) {
    fila.querySelector(".nota1").value = saved.nota1;
    fila.querySelector(".nota2").value = saved.nota2;
    fila.querySelector(".final").textContent = saved.final;
    fila.querySelector(".fecha-cierre").textContent = saved.fecha;
    fila.querySelector(".nota-final").textContent = saved.promedio;
    if (saved.final === "Promocionado") {
      fila.classList.add("promocionada");
    } else if (saved.final === "Obligatorio") {
      fila.classList.add("obligatoria");
    }
  }
});



