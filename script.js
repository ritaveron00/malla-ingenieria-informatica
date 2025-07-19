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
            // Considerar aprobada si promocionó o si la nota final es 4 o más
            if (datos.estado === "Promocionada" || (!isNaN(notaFinal) && notaFinal >= 4)) {
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
            
            // Crear el input manual para la nota final
            const inputNotaFinalManual = document.createElement("input");
            inputNotaFinalManual.type = "number"; // Cambiado a type "number" para facilitar la entrada de números
            inputNotaFinalManual.min = "0";
            inputNotaFinalManual.max = "10";
            inputNotaFinalManual.step = "0.5"; // Permite números con decimales .5
            inputNotaFinalManual.placeholder = "Nota final";
            inputNotaFinalManual.style.display = "none"; // Por defecto oculto
            inputNotaFinalManual.classList.add("notas-parciales-input"); // Para mantener el estilo

            celdaNotaFinal.appendChild(inputNotaFinalManual);
            
            // Cargar datos guardados al inicio
            const datosGuardados = localStorage.getItem(materia.nombre);
            if (datosGuardados) {
                const datos = JSON.parse(datosGuardados);
                inputNotasParciales.value = datos.notas || "";
                celdaEstado.textContent = datos.estado || "";
                celdaFecha.textContent = datos.fechaCierre || "";

                if (datos.estado === "Obligatoria") {
                    inputNotaFinalManual.style.display = "block"; // Mostrar input si es Obligatoria
                    inputNotaFinalManual.value = datos.notaFinal || ""; // Cargar nota en el input
                    celdaNotaFinal.textContent = ""; // Asegurar que el texto estático no se muestre
                } else {
                    celdaNotaFinal.textContent = datos.notaFinal || ""; // Mostrar nota como texto estático
                    inputNotaFinalManual.style.display = "none"; // Ocultar input
                    inputNotaFinalManual.value = ""; // Limpiar input si no es Obligatoria
                }

                if (datos.estado === "Promocionada") {
                    celdaEstado.classList.add("promocionada");
                } else if (datos.estado === "Obligatoria" || datos.estado === "Recursar") {
                    celdaEstado.classList.add("obligatoria");
                }
                
                // Resaltar materia si ya está aprobada (promocionada o final >= 4)
                if (datos.estado === "Promocionada") {
                    celdaNombre.classList.add("celda-materia-aprobada");
                } else {
                    const notaFinalCargada = parseFloat(datos.notaFinal);
                    if (!isNaN(notaFinalCargada) && notaFinalCargada >= 4 && notaFinalCargada <= 10) {
                        celdaNombre.classList.add("celda-materia-aprobada");
                    }
                }
            }

            // Event listener para las Notas Parciales
            inputNotasParciales.addEventListener("input", () => {
                const valor = inputNotasParciales.value.trim();
                let promedioCalculadoSinRedondeo = NaN;
                let notaNumericaRedondeada = NaN;
                let textoNotaFinalColumna = "";
                let textoEstadoColumna = "";
                let fechaParaGuardar = "";

                // Resetear estados visuales
                celdaNombre.classList.remove("celda-materia-aprobada");
                celdaEstado.className = "estado-materia";
                inputNotaFinalManual.style.display = "none";
                inputNotaFinalManual.value = ""; 
                celdaNotaFinal.textContent = "";
                celdaFecha.textContent = ""; // Limpiar fecha por defecto

                const partes = valor.split("-").map(n => parseFloat(n));

                if (valor === "") {
                    textoEstadoColumna = "";
                    fechaParaGuardar = "";
                } else if (partes.length === 1 && !isNaN(partes[0])) {
                    promedioCalculadoSinRedondeo = partes[0];
                    notaNumericaRedondeada = aplicarRedondeoUBAXXI(promedioCalculadoSinRedondeo);
                    textoNotaFinalColumna = notaNumericaRedondeada.toFixed(0);
                    
                    if (promedioCalculadoSinRedondeo >= 7) {
                        textoEstadoColumna = "Promocionada";
                        celdaEstado.classList.add("promocionada");
                        celdaNotaFinal.textContent = textoNotaFinalColumna;
                        fechaParaGuardar = new Date().toLocaleDateString("es-AR"); // Fecha automática
                        celdaNombre.classList.add("celda-materia-aprobada"); // Resaltar
                    } else {
                        textoEstadoColumna = "Obligatoria";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.style.display = "block"; // Mostrar input
                        // Fecha no se pone automáticamente para Obligatoria
                    }

                } else if (partes.length === 2 && partes.every(n => !isNaN(n))) {
                    const nota1 = partes[0];
                    const nota2 = partes[1];

                    if (nota1 < 4 && nota2 < 4) {
                        textoEstadoColumna = "Recursar";
                        celdaEstado.classList.add("obligatoria");
                        promedioCalculadoSinRedondeo = (nota1 + nota2) / 2;
                        textoNotaFinalColumna = promedioCalculadoSinRedondeo.toFixed(1); // Mantener un decimal para "Recursar"
                        fechaParaGuardar = new Date().toLocaleDateString("es-AR"); // Fecha automática
                        
                        celdaNotaFinal.textContent = textoNotaFinalColumna;
                        // No resaltar si se recursa
                    } else {
                        promedioCalculadoSinRedondeo = (nota1 + nota2) / 2;
                        notaNumericaRedondeada = aplicarRedondeoUBAXXI(promedioCalculadoSinRedondeo);
                        textoNotaFinalColumna = notaNumericaRedondeada.toFixed(0);
                        
                        if ((nota1 + nota2) >= 14) {
                            textoEstadoColumna = "Promocionada";
                            celdaEstado.classList.add("promocionada");
                            celdaNotaFinal.textContent = textoNotaFinalColumna;
                            fechaParaGuardar = new Date().toLocaleDateString("es-AR"); // Fecha automática
                            celdaNombre.classList.add("celda-materia-aprobada"); // Resaltar
                        } else {
                            textoEstadoColumna = "Obligatoria";
                            celdaEstado.classList.add("obligatoria");
                            inputNotaFinalManual.style.display = "block"; // Mostrar input
                            // Fecha no se pone automáticamente para Obligatoria
                        }
                    }
                }
                
                celdaEstado.textContent = textoEstadoColumna;
                celdaFecha.textContent = fechaParaGuardar; // Aplicar fecha calculada

                // Guardar datos al cambiar notas parciales
                const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
                datosAGuardar.notas = valor;
                datosAGuardar.estado = celdaEstado.textContent;
                // Si el input manual está visible, se guarda su valor (podría estar vacío);
                // si no está visible, se guarda el texto estático (promedio o recursar)
                datosAGuardar.notaFinal = (inputNotaFinalManual.style.display === "block") ? inputNotaFinalManual.value : celdaNotaFinal.textContent;
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
                
                if (!isNaN(notaNumericaManual) && notaNumericaManual >= 4 && notaNumericaManual <= 10) {
                    fechaParaGuardar = new Date().toLocaleDateString("es-AR"); // Poner fecha si se aprueba el final
                    celdaNombre.classList.add("celda-materia-aprobada"); // Resaltar si el final es aprobado
                }
                
                celdaFecha.textContent = fechaParaGuardar; // Actualizar la fecha visible

                const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
                datosAGuardar.notas = inputNotasParciales.value; // Guardar las notas parciales
                datosAGuardar.estado = celdaEstado.textContent; // Guardar el estado actual
                datosAGuardar.notaFinal = notaManual; // Guardar el valor del input manual
                datosAGuardar.fechaCierre = fechaParaGuardar; // Guardar la fecha (vacía o con valor)
                
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

