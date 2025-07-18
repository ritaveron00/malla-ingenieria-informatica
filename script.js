document.querySelectorAll('.materia-input').forEach(input => {
  input.addEventListener('input', () => {
    const fila = input.parentElement.parentElement;
    const finalCell = fila.querySelector('.final');
    const fechaCell = fila.querySelector('.fecha');
    const promedioCell = fila.querySelector('.promedio');

    const notasTexto = input.value.trim();
    const partes = notasTexto.split('-');

    if (partes.length === 2) {
      const nota1 = parseFloat(partes[0]);
      const nota2 = parseFloat(partes[1]);

      if (!isNaN(nota1) && !isNaN(nota2)) {
        const suma = nota1 + nota2;
        const promedio = ((nota1 + nota2) / 2).toFixed(1);
        promedioCell.textContent = promedio;

        if (suma >= 14) {
          finalCell.innerHTML = "<s>Promocionado</s>";
          fechaCell.textContent = new Date().toLocaleDateString('es-AR');
        } else if (promedio >= 4) {
          finalCell.textContent = "Obligatorio";
          fechaCell.textContent = new Date().toLocaleDateString('es-AR');
        } else {
          finalCell.textContent = "Desaprobado";
          fechaCell.textContent = '';
        }
        return;
      }
    }

    promedioCell.textContent = '';
    finalCell.textContent = '';
    fechaCell.textContent = '';
  });
});






