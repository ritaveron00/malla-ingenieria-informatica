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
  { anio: "Cuarto Año", "nombre": "Física para Informática" },
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
                    celdaEstado.textContent = "";
                    celdaEstado.classList.add("obligatoria");
                }
                else if (datos.estado === "Aprobada") {
                    inputNotaFinalManual.style.display = "block";
                    inputNotaFinalManual.value = datos.notaFinal || ""; 
                    spanNotaFinalEstatica.style.display = "none";
                    celdaEstado.textContent = "Aprobada";
                    celdaEstado.classList.add("promocionada");
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
                let promedioCalculadoSinRedondeo = NaN;
                let notaNumericaRedondeada = NaN;
                let textoEstadoColumna = "";
                let fechaParaGuardar = "";

                celdaNombre.classList.remove("celda-materia-aprobada");
                celdaEstado.className = "estado-materia";
                inputNotaFinalManual.value = ""; 
                spanNotaFinalEstatica.textContent = "";
                celdaFecha.textContent = ""; 
                inputNotaFinalManual.style.display = "none"; 
                spanNotaFinalEstatica.style.display = "none"; 

                const partes = valor.split("-").map(n => parseFloat(n)).filter(n => !isNaN(n));

                if (valor === "") {
                    textoEstadoColumna = "";
                    fechaParaGuardar = "";
                    inputNotaFinalManual.style.display = "block"; 
                } else if (partes.length >= 1 && partes.length <= 3) { // Acepta de 1 a 3 notas
                    const sumaNotas = partes.reduce((sum, current) => sum + current, 0);
                    promedioCalculadoSinRedondeo = sumaNotas / partes.length;
                    notaNumericaRedondeada = aplicarRedondeoUBAXXI(promedioCalculadoSinRedondeo);
                    
                    // Lógica para Promocionada / Recursar / Obligatoria con el promedio
                    if (promedioCalculadoSinRedondeo >= 7 && partes.every(n => n >= 4)) { // Promociona con promedio >= 7 y todas las notas >= 4
                        textoEstadoColumna = "Promocionada";
                        celdaEstado.classList.add("promocionada");
                        spanNotaFinalEstatica.textContent = notaNumericaRedondeada.toFixed(0);
                        spanNotaFinalEstatica.style.display = "block"; 
                        fechaParaGuardar = new Date().toLocaleDateString("es-AR");
                        celdaNombre.classList.add("celda-materia-aprobada");
                    } else if (promedioCalculadoSinRedondeo < 4 || partes.some(n => n < 4)) { // Recursar si promedio < 4 o alguna nota < 4
                        textoEstadoColumna = "Recursar";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.value = promedioCalculadoSinRedondeo.toFixed(1); 
                        inputNotaFinalManual.style.display = "block"; 
                        fechaParaGuardar = "";
                    } else { // Obligatoria en cualquier otro caso
                        textoEstadoColumna = "Obligatoria";
                        celdaEstado.classList.add("obligatoria");
                        inputNotaFinalManual.style.display = "block"; 
                    }
                } else { // Más de 3 notas o formato incorrecto (se asume Obligatoria o se limpia)
                    textoEstadoColumna = ""; // O podrías poner "Formato Inválido"
                    inputNotaFinalManual.style.display = "block";
                }
                
                celdaEstado.textContent = (textoEstadoColumna === "Recursar") ? "" : textoEstadoColumna; 
                celdaFecha.textContent = fechaParaGuardar; 

                const datosAGuardar = JSON.parse(localStorage.getItem(materia.nombre)) || {};
                datosAGuardar.notas = valor;
                datosAGuardar.estado = textoEstadoColumna;
                datosAGuardar.notaFinal = (inputNotaFinalManual.style.display === "block") ? inputNotaFinalManual.value : spanNotaFinalEstatica.textContent;
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
