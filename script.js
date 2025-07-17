// Al cargar la página, marcamos las materias aprobadas desde localStorage
document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");

  materias.forEach((materia) => {
    const nombre = materia.textContent.trim();

    // Verificamos si está aprobada
    if (localStorage.getItem(nombre) === "aprobada") {
      materia.classList.add("aprobada");
    }

    // Agregamos el evento de clic
    materia.addEventListener("click", () => {
      if (materia.classList.contains("aprobada")) {
        materia.classList.remove("aprobada");
        localStorage.removeItem(nombre);
      } else {
        materia.classList.add("aprobada");
        localStorage.setItem(nombre, "aprobada");
      }
    });
  });
});

