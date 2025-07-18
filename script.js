document.querySelectorAll('.materia-input').forEach(input => {
  input.addEventListener('input', function () {
    const value = this.value.trim();
    const [nota1, nota2] = value.split('-').map(n => parseFloat(n));
    const finalCell = this.parentElement.nextElementSibling;
    const fechaCell = finalCell.nextElementSibling;
    const promedioCell = fechaCell.nextElementSibling;

    finalCell.classList.remove('tachado');
    finalCell.textContent = '';
    fechaCell.textContent = '';
    promedioCell.textContent = '';

    if (!isNaN(nota1) && !isNaN(nota2)) {
      const suma = nota1 + nota2;
      const promedio = ((nota1 + nota2) / 2).toFixed(2);

      if (suma >= 14) {
        finalCell.textContent = 'Promocionado';
        finalCell.classList.add('tachado');

        const fecha = new Date();
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        fechaCell.textContent = `${dia}/${mes}/${anio}`;
      } else {
        finalCell.textContent = 'Obligatorio';
      }

      promedioCell.textContent = promedio;
    }
  });
});





