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
  { anio: "Tercer Año", nombre: "Paradigmas de Programación" },
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
  { anio: "Quinto Año", nombre: "Empresas de Base Tecnológica II" },
  { anio: "Quinto Año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" },
  { anio: "Quinto Año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" }
];

const contenedorPrincipal = document.getElementById("contenedor-tablas");
const barraProgreso = document.getElementById("barra-progreso");
const textoProgreso = document.getElementById("texto-progreso");

const agrupadoPorAnio = {};

materias.forEach(m => {
  if (!agrupadoPorAnio[m.anio]) agrupadoPorAnio[m.anio] = [];
  agrupadoPorAnio[m.anio].push(m);
});

function aplicarRedondeoUBAXXI(nota) {
    if (nota === 3.5) {
        return 3;
    }
    const parteDecimal = nota - Math.floor(nota);
    if (parteDecimal >= 0.5) {
        return Math.ceil(nota);
    } else {
        return Math.floor(nota);
    }
}

function actualizarBarraProgreso() {
    let materiasAprobadas = 0;
    const totalMaterias = materias.length;
    materias.forEach(materia => {
        const datosGuardados = localStorage.getItem(materia.nombre);
        if (datosGuardados) {
            const datos = JSON.parse(datosGuardados);
            const notaFinal = parseFloat(datos.notaFinal);
            if (!isNaN(notaFinal) && notaFinal >= 4) {
                materiasAprobadas++;
            }
        }
    });
    const porcentaje = totalMaterias > 0 ? (materiasAprobadas / totalMaterias) * 100 : 0;
    barraProgreso.style.width = `${porcentaje.toFixed(2)}%`;
    textoProgreso.textContent = `${porcentaje.toFixed(0)}% de materias aprobadas`;
}

function inicializarTablas() {
    for (const anio in agrupadoPorAnio) {
        const seccion = document.createElement("div");
        seccion.className = "seccion-anio";
        const titulo = document.createElement("h2");
        titulo.textContent = anio;
        seccion.appendChild(titulo);
        const tabla = document.createElement("table");
        const encabezadoTabla = document.createElement("thead");
        encabezadoTabla.innerHTML = `
            <tr>
            <th>Materia</th>
            <th>Notas Parciales</th>
            <th>Final</th>
            <th>Fecha de Cierre</th>
            <th>Nota Final</th>
            </tr>
        `;
        tabla.appendChild(encabezadoTabla);
        const cuerpoTabla = document.createElement("tbody");

        agrupadoPorAnio[anio].forEach(materia => {
            const fila = document.createElement("tr");
            fila.dataset.materiaNombre = materia.nombre;
            const celdaNombre = document.createElement("td");
            celdaNombre.textContent = materia.nombre;

            const inputNotasParciales = document.createElement("input");
            inputNotasParciales.type = "text";
            inputNotasParciales.placeholder = "";
            inputNotasParciales.classList.add("notas-parciales-input");
            const celdaInputParciales = document.createElement("td");
            celdaInputParciales.appendChild(inputNotasParciales);
            
            const celdaEstado = document.createElement("td");
            celdaEstado.classList.add("estado-materia");
            const celdaFecha = document.createElement("td");
            const celdaNotaFinal = document.createElement("td");
            
            const inputNotaFinalManual = document.createElement("input");
            inputNotaFinalManual.type = "number"; 
            inputNotaFinalManual.min = "0";
            inputNotaFinalManual.max = "10";
            inputNotaFinalManual.step = "0.5";
            inputNotaFinalManual.placeholder = "Nota final";
            inputNotaFinalManual.classList.add("notas-parciales-input");

            const spanNotaFinalEstatica = document.createElement("span");
            spanNotaFinalEstatica.style.display = "none"; // Por defecto oculto
            
            celdaNotaFinal.appendChild(inputNotaFinalManual);
            celdaNotaFinal.appendChild(spanNotaFinalEstatica);
            
            // Cargar datos guardados al inicio
            const datosGuardados = localStorage.getItem(materia.nombre);
            if (datosGuardados) {
                const datos = JSON.parse(datosGuardados);
                inputNotasParciales.value = datos.notas || "";
                celdaEstado.textContent = datos.estado || "";
                celdaFecha.textContent = datos.fechaCierre || "";

                const notaFinalCargada = parseFloat(datos.notaFinal);

                if (datos.estado === "Promocionada") {
                    inputNotaFinalManual.style.display = "none";
                    spanNotaFinalEstatica.style.display = "block";
                    spanNotaFinalEstatica.textContent = datos.notaFinal || "";
                    celdaEstado.classList.add("promocionada");
                } else { // Obligatoria o Recursar
                    inputNotaFinalManual.style.display = "block";
                    inputNotaFinalManual.value = datos.notaFinal || "";
                    spanNotaFinalEstatica.style.display = "none";
                    if (datos.estado === "Obligatoria" || datos.estado === "Recursar") {
                        celdaEstado.classList.add("obligatoria");
                    }
                }
                
                // Resaltar materia si ya está aprobada (final >= 4)
                if (!isNaN(notaFinalCargada) && notaFinalCargada >= 4 && notaFinalCargada <= 10) {
                    celdaNombre.classList.add("celda-materia-aprobada");
                }
            }

            // Event listener para las Notas Parciales
            inputNotasParciales.addEventListener("input", () => {
                const valor = inputNotasParciales.value.trim();
                let promedioCalculadoSinRedondeo = NaN;
                let notaNumericaRedondeada = NaN;
                let textoEstadoColumna = "";
                let fechaParaGuardar = "";
                let notaFinalParaDisplay = ""; // Nota que se mostrará en la celda o input

                // Resetear estados visuales
                celdaNombre.classList.remove("celda-materia-aprobada");
                celdaEstado.className = "estado-materia";
                inputNotaFinalManual.value = ""; // Limpiar el input manual por defecto
                spanNotaFinalEstatica.textContent = "";
                celdaFecha.textContent = ""; // Limpiar fecha por defecto
                inputNotaFinalManual.style.display = "none"; // Ocultar input por defecto
                spanNotaFinalEstatica.style.display = "none"; // Ocultar span por defecto

                const partes = valor.split("-").map(n => parseFloat(n));

                if (valor === "") {
                    textoEstadoColumna = "";
                    fechaParaGuardar = "";
                    notaFinalParaDisplay = "";
                    inputNotaFinalManual.style.display = "block"; // Volver a mostrar input si está vacío
                } else if (partes.length === 1 && !isNaN(partes[0])) {
                    promedioCalculadoSinRedondeo = partes[0];
                    notaNumericaRedondeada = aplicarRedondeoUBAXXI(promedioCalculadoSinRedondeo);
                    
                    if (promedioCalculadoSinRedondeo >= 7) { // Promocionada
                        textoEstadoColumna = "Promocionada";
                        celdaEstado.classList.add("promocionada");
                        notaFinalParaDisplay = notaNumericaRedondeada.toFixed(0);
                        spanNotaFinalEstatica.textContent = notaFinalParaDisplay;
                        spanNotaFinalEstatica.style.display = "block"; // Mostrar texto estático
                        fechaParaGuardar = new Date().toLocaleDateString("es-AR");
                        celdaNombre.classList.add("celda-materia-aprobada");
                    } else { // Obligatoria (con una sola nota alta)
                        textoEstadoColumna = "Obligatoria";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.style.display = "block"; // Mostrar input para nota final
                        // No se pone fecha automáticamente
                    }

                } else if (partes.length === 2 && partes.every(n => !isNaN(n))) {
                    const nota1 = partes[0];
                    const nota2 = partes[1];
                    const sumaParciales = nota1 + nota2;

                    if (sumaParciales >= 14) { // Promocionada
                        textoEstadoColumna = "Promocionada";
                        celdaEstado.classList.add("promocionada");
                        promedioCalculadoSinRedondeo = (nota1 + nota2) / 2;
                        notaNumericaRedondeada = aplicarRedondeoUBAXXI(promedioCalculadoSinRedondeo);
                        notaFinalParaDisplay = notaNumericaRedondeada.toFixed(0);
                        spanNotaFinalEstatica.textContent = notaFinalParaDisplay;
                        spanNotaFinalEstatica.style.display = "block"; // Mostrar texto estático
                        fechaParaGuardar = new Date().toLocaleDateString("es-AR");
                        celdaNombre.classList.add("celda-materia-aprobada");
                    } else if (nota1 < 4 && nota2 < 4) { // Recursar
                        textoEstadoColumna = "Recursar";
                        celdaEstado.classList.add("obligatoria");
                        promedioCalculadoSinRedondeo = (nota1 + nota2) / 2;
                        notaFinalParaDisplay = promedioCalculadoSinRedondeo.toFixed(1);
                        inputNotaFinalManual.value = notaFinalParaDisplay; // Poner valor en el input
                        inputNotaFinalManual.style.display = "block"; // Mostrar input para nota final
                        fechaParaGuardar = new Date().toLocaleDateString("es-AR");
                        // No resaltar si se recursa
                    } else { // Obligatoria (suman menos de 14 y no recursa directo)
                        textoEstadoColumna = "Obligatoria";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.style.display = "block"; // Mostrar input para nota final
                        // No se pone fecha automáticamente
                    }
                }
                
                celdaEstado.textContent = textoEstadoColumna;
                celdaFecha.textContent = fechaParaGuardar; // Aplicar fecha calculada

                // Guardar datos
                const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
                datosAGuardar.notas = valor;
                datosAGuardar.estado = celdaEstado.textContent;
                // Si el input está visible, se guarda su valor. Si no, se guarda el texto del span.
                datosAGuardar.notaFinal = (inputNotaFinalManual.style.display === "block") ? inputNotaFinalManual.value : spanNotaFinalEstatica.textContent;
                datosAGuardar.fechaCierre = fechaParaGuardar;
                localStorage.setItem(materia.nombre, JSON.stringify(datosAGuardar));
                actualizarBarraProgreso();
            });

            // Event listener para el input de la nota final manual
            inputNotaFinalManual.addEventListener("input", () => {
                const notaManual = inputNotaFinalManual.value.trim();
                const notaNumericaManual = parseFloat(notaManual);
                let fechaParaGuardar = "";

                // Limpiar resaltado por defecto, se volverá a aplicar si se aprueba
                celdaNombre.classList.remove("celda-materia-aprobada");
                
                // Lógica de fecha y resaltado basada en la nota manual
                if (!isNaN(notaNumericaManual) && notaNumericaManual >= 4 && notaNumericaManual <= 10) {
                    fechaParaGuardar = new Date().toLocaleDateString("es-AR");
                    celdaNombre.classList.add("celda-materia-aprobada");
                }
                celdaFecha.textContent = fechaParaGuardar;

                // Guardar datos
                const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
                datosAGuardar.notas = inputNotasParciales.value;
                datosAGuardar.estado = celdaEstado.textContent;
                datosAGuardar.notaFinal = notaManual;
                datosAGuardar.fechaCierre = fechaParaGuardar;
                
                localStorage.setItem(materia.nombre, JSON.stringify(datosAGuardar));
                actualizarBarraProgreso();
            });

            fila.appendChild(celdaNombre);
            fila.appendChild(celdaInputParciales);
            fila.appendChild(celdaEstado);
            fila.appendChild(celdaFecha);
            fila.appendChild(celdaNotaFinal);
            cuerpoTabla.appendChild(fila);
        });
        tabla.appendChild(cuerpoTabla);
        seccion.appendChild(tabla);
        contenedorPrincipal.appendChild(seccion);
    }
    actualizarBarraProgreso();
}

document.addEventListener("DOMContentLoaded", inicializarTablas);

