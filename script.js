const materias = [
  { anio: "Primer Año", nombre: "Pensamiento Científico" },
  { anio: "Primer Año", nombre: "Pensamiento Computacional" },
  { anio: "Primer Año", nombre: "Análisis Matemático A" },
  { anio: "Primer Año", nombre: "Sociedad y Estado" },
  { anio: "Primer Año", nombre: "Física" },
  { anio: "Primer Año", nombre: "Álgebra A" },
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
  { anio: "Cuarto Año", "nombre": "Física para Informática" },
  { anio: "Cuarto Año", nombre: "Empresas de Base Tecnológica I" },
  { anio: "Cuarto Año", nombre: "Ingeniería de Software II" },
  { anio: "Cuarto Año", nombre: "Sistemas Distribuidos I" },
  { anio: "Quinto Año", nombre: "Taller de Seguridad Informática" },
  { anio: "Quinto Año", nombre: "Tesis de Ingeniería Informática o Trabajo Profesional de Ingeniería Informática" },
  { anio: "Quinto Año", nombre: "Empresas de Base Tecnológica II" },
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
    if (isNaN(nota) || nota === null || nota === '') {
        return NaN;
    }
    nota = parseFloat(nota);

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
            inputNotaFinalManual.type = "text"; 
            inputNotaFinalManual.value = ""; 

            const spanNotaFinalEstatica = document.createElement("span");
            spanNotaFinalEstatica.style.display = "none"; 
            
            celdaNotaFinal.appendChild(inputNotaFinalManual);
            celdaNotaFinal.appendChild(spanNotaFinalEstatica);
            
            const datosGuardados = localStorage.getItem(materia.nombre);
            if (datosGuardados) {
                const datos = JSON.parse(datosGuardados);
                inputNotasParciales.value = datos.notas || "";
                celdaFecha.textContent = datos.fechaCierre || "";

                const notaFinalCargada = parseFloat(datos.notaFinal);

                if (datos.estado === "Promocionada") {
                    inputNotaFinalManual.style.display = "none";
                    spanNotaFinalEstatica.style.display = "block";
                    spanNotaFinalEstatica.textContent = datos.notaFinal || "";
                    celdaEstado.textContent = "Promocionada";
                    celdaEstado.classList.add("promocionada");
                } else if (datos.estado === "Recursar") {
                    inputNotaFinalManual.style.display = "block";
                    inputNotaFinalManual.value = datos.notaFinal || ""; 
                    spanNotaFinalEstatica.style.display = "none";
                    celdaEstado.textContent = ""; // "Recursar" muestra celda vacía
                    celdaEstado.classList.add("obligatoria");
                }
                else if (datos.estado === "Aprobada") { 
                    inputNotaFinalManual.style.display = "block";
                    inputNotaFinalManual.value = datos.notaFinal || ""; 
                    spanNotaFinalEstatica.style.display = "none";
                    celdaEstado.textContent = "Aprobada";
                    celdaEstado.classList.add("promocionada"); 
                }
                else if (datos.estado === "Obligatoria") { 
                    inputNotaFinalManual.style.display = "block";
                    inputNotaFinalManual.value = datos.notaFinal || "";
                    spanNotaFinalEstatica.style.display = "none";
                    celdaEstado.textContent = "Obligatoria";
                    celdaEstado.classList.add("obligatoria");
                }
                else if (datos.estado === "Recupera") { 
                    inputNotaFinalManual.style.display = "block"; 
                    inputNotaFinalManual.value = datos.notaFinal || ""; 
                    spanNotaFinalEstatica.style.display = "none";
                    celdaEstado.textContent = "Recupera";
                    celdaEstado.classList.add("obligatoria"); 
                }
                else { 
                    inputNotaFinalManual.style.display = "block";
                    inputNotaFinalManual.value = datos.notaFinal || ""; 
                    spanNotaFinalEstatica.style.display = "none";
                    celdaEstado.textContent = datos.estado || "";
                    celdaEstado.classList.add("obligatoria");
                }
                
                if (!isNaN(notaFinalCargada) && notaFinalCargada >= 4 && notaFinalCargada <= 10) {
                    celdaNombre.classList.add("celda-materia-aprobada");
                }
            }

            inputNotasParciales.addEventListener("input", () => {
                const valor = inputNotasParciales.value.trim();
                let promedioCalculado = NaN; 
                let notaNumericaRedondeada = NaN;
                let textoEstadoColumna = "";
                let fechaParaGuardar = "";
                let notasNumericas = [];

                celdaNombre.classList.remove("celda-materia-aprobada");
                celdaEstado.className = "estado-materia";
                inputNotaFinalManual.value = ""; 
                spanNotaFinalEstatica.textContent = "";
                celdaFecha.textContent = ""; 
                inputNotaFinalManual.style.display = "none"; 
                spanNotaFinalEstatica.style.display = "none"; 

                if (valor === "") {
                    textoEstadoColumna = "";
                    fechaParaGuardar = "";
                    inputNotaFinalManual.style.display = "block"; 
                    const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
                    datosAGuardar.notas = valor;
                    datosAGuardar.estado = textoEstadoColumna;
                    datosAGuardar.notaFinal = ""; 
                    datosAGuardar.fechaCierre = fechaParaGuardar;
                    localStorage.setItem(materia.nombre, JSON.stringify(datosAGuardar));
                    actualizarBarraProgreso();
                    return;
                }

                const partesStr = valor.split("-").filter(p => p !== ''); 
                notasNumericas = partesStr.map(n => parseFloat(n));

                if (notasNumericas.some(isNaN) || notasNumericas.length === 0 || notasNumericas.length > 3) {
                    textoEstadoColumna = ""; 
                    inputNotaFinalManual.style.display = "block";
                    const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
                    datosAGuardar.notas = valor;
                    datosAGuardar.estado = textoEstadoColumna;
                    datosAGuardar.notaFinal = ""; 
                    datosAGuardar.fechaCierre = "";
                    localStorage.setItem(materia.nombre, JSON.stringify(datosAGuardar));
                    actualizarBarraProgreso();
                    return;
                }

                const sumaNotas = notasNumericas.reduce((sum, current) => sum + current, 0);
                const notasAprobadas = notasNumericas.filter(n => n >= 4 && n <= 10).length;
                const notasDesaprobadas = notasNumericas.filter(n => n < 4).length;
                
                // Lógica de cálculo de promedio y estados
                if (notasNumericas.length === 1) {
                    const nota = notasNumericas[0];
                    if (nota < 4) { // Si la primera nota es menor a 4, marca "Recupera"
                        textoEstadoColumna = "Recupera";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.style.display = "block";
                    } else if (nota >= 7) {
                        textoEstadoColumna = "Promocionada";
                        celdaEstado.classList.add("promocionada");
                        notaNumericaRedondeada = aplicarRedondeoUBAXXI(nota);
                        spanNotaFinalEstatica.textContent = notaNumericaRedondeada.toFixed(0);
                        spanNotaFinalEstatica.style.display = "block"; 
                        fechaParaGuardar = new Date().toLocaleDateString("es-AR");
                        celdaNombre.classList.add("celda-materia-aprobada");
                    } else if (nota >= 4 && nota < 7) {
                        textoEstadoColumna = "Obligatoria";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.style.display = "block";
                    } 
                } else if (notasNumericas.length === 2) {
                    // Si ya hay 2 notas, se evalúa la condición de "Recupera" o "Recursar" o "Promociona" o "Obligatoria"
                    const nota1 = notasNumericas[0];
                    const nota2 = notasNumericas[1];
                    const suma = nota1 + nota2;
                    
                    if (suma >= 14 && notasAprobadas === 2) { 
                        textoEstadoColumna = "Promocionada";
                        celdaEstado.classList.add("promocionada");
                        promedioCalculado = suma / 2;
                        notaNumericaRedondeada = aplicarRedondeoUBAXXI(promedioCalculado);
                        spanNotaFinalEstatica.textContent = notaNumericaRedondeada.toFixed(0);
                        spanNotaFinalEstatica.style.display = "block";
                        fechaParaGuardar = new Date().toLocaleDateString("es-AR");
                        celdaNombre.classList.add("celda-materia-aprobada");
                    } else if (notasDesaprobadas === 1) { // Una desaprobada
                        textoEstadoColumna = "Recupera";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.style.display = "block";
                    } else if (notasDesaprobadas === 2) { // Ambas desaprobadas
                        textoEstadoColumna = "Recursar";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.style.display = "block";
                    } else { // Suma < 14 pero ambas aprobadas
                         textoEstadoColumna = "Obligatoria";
                         celdaEstado.classList.add("obligatoria");
                         inputNotaFinalManual.style.display = "block";
                    }
                } else if (notasNumericas.length === 3) {
                    const suma = notasNumericas.reduce((sum, current) => sum + current, 0);

                    if (suma >= 20 && notasAprobadas === 3) { 
                        textoEstadoColumna = "Promocionada";
                        celdaEstado.classList.add("promocionada");
                        promedioCalculado = suma / 3;
                        notaNumericaRedondeada = aplicarRedondeoUBAXXI(promedioCalculado);
                        spanNotaFinalEstatica.textContent = notaNumericaRedondeada.toFixed(0);
                        spanNotaFinalEstatica.style.display = "block";
                        fechaParaGuardar = new Date().toLocaleDateString("es-AR");
                        celdaNombre.classList.add("celda-materia-aprobada");
                    } else if (notasAprobadas === 2 && notasDesaprobadas === 1) { // 2 aprobadas, 1 desaprobada
                        textoEstadoColumna = "Obligatoria";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.style.display = "block";
                    } else if (notasDesaprobadas === 1) { // Una desaprobada (esto cubre el caso de 2 aprobadas y 1 desaprobada, si la suma no da 20)
                        textoEstadoColumna = "Recupera";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.style.display = "block";
                    } else if (notasDesaprobadas >= 2) { 
                        textoEstadoColumna = "Recursar";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.style.display = "block";
                    } else { // Caso de notas aprobadas pero no llega al promedio de promoción
                        textoEstadoColumna = "Obligatoria";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.style.display = "block";
                    }
                }
                
                celdaEstado.textContent = (textoEstadoColumna === "Recursar") ? "" : textoEstadoColumna; 
                celdaFecha.textContent = fechaParaGuardar; 

                const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
                datosAGuardar.notas = valor;
                datosAGuardar.estado = textoEstadoColumna;
                datosAGuardar.notaFinal = (spanNotaFinalEstatica.style.display === "block") ? spanNotaFinalEstatica.textContent : inputNotaFinalManual.value;
                datosAGuardar.fechaCierre = fechaParaGuardar;
                localStorage.setItem(materia.nombre, JSON.stringify(datosAGuardar));
                actualizarBarraProgreso();
            });

            inputNotaFinalManual.addEventListener("input", () => {
                const notaManualStr = inputNotaFinalManual.value.trim();
                let notaNumericaManual = parseFloat(notaManualStr);
                let fechaParaGuardar = "";
                let estadoParaGuardar = "";
                
                celdaNombre.classList.remove("celda-materia-aprobada");
                celdaEstado.className = "estado-materia";

                if (!isNaN(notaNumericaManual) && notaManualStr !== '') {
                    const notaRedondeada = aplicarRedondeoUBAXXI(notaNumericaManual);
                    
                    if (Number.isInteger(notaRedondeada)) {
                        inputNotaFinalManual.value = notaRedondeada.toFixed(0);
                    } else {
                        inputNotaFinalManual.value = notaRedondeada.toFixed(1); 
                    }

                    if (notaRedondeada >= 4 && notaRedondeada <= 10) {
                        fechaParaGuardar = new Date().toLocaleDateString("es-AR");
                        celdaNombre.classList.add("celda-materia-aprobada");
                        estadoParaGuardar = "Aprobada"; 
                        celdaEstado.classList.add("promocionada"); 
                    } else if (notaRedondeada < 4 && notaRedondeada >= 0) {
                        estadoParaGuardar = "Recursar"; 
                        celdaEstado.classList.add("obligatoria"); 
                        fechaParaGuardar = ""; 
                    } else { 
                        estadoParaGuardar = ""; 
                        fechaParaGuardar = "";
                    }
                } else { 
                    estadoParaGuardar = ""; 
                    fechaParaGuardar = "";
                }
                
                celdaEstado.textContent = (estadoParaGuardar === "Recursar") ? "" : estadoParaGuardar; 
                celdaFecha.textContent = fechaParaGuardar;

                const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
                datosAGuardar.notas = inputNotasParciales.value;
                datosAGuardar.estado = estadoParaGuardar;
                datosAGuardar.notaFinal = inputNotaFinalManual.value; 
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
