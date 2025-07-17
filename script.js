document.addEventListener("DOMContentLoaded", () => {
  const materias = document.querySelectorAll(".materia");

  materias.forEach((materia) => {
    const nombre = materia.textContent.trim();

    // Si ya estaba aprobada, la marcamos
    if (localStorage.getItem(nombre) === "aprobada") {
      materia.classList.add("aprobada");
    }

    // Al hacer clic: alternar estado
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


