const horarios = ["09:00", "10:00", "11:00", "15:00", "16:00"];
const horarioNoDisponible = "11:00";
const formCita = document.getElementById("formCita");
const selectHorario = document.getElementById("horario");

// ==========================
// FECHA MÍNIMA
// ==========================

const hoy = new Date().toISOString().split("T")[0];

document.getElementById("fecha").min = hoy;

// ==========================
// MOSTRAR HORARIOS
// ==========================

function mostrarHorarios() {
	let horariosDisponibles = 0;

	horarios.forEach((horario) => {
		const opcion = document.createElement("option");

		opcion.value = horario;

		if (horario === horarioNoDisponible) {
			opcion.textContent = horario + " - No disponible";
		} else {
			opcion.textContent = horario;
			horariosDisponibles++;
		}

		selectHorario.appendChild(opcion);
	});

	if (horariosDisponibles === 0) {
		document.getElementById("mensajeHorarios").textContent =
			"No existen horarios disponibles.";
	}
}

mostrarHorarios();

// ==========================
// VALIDAR FORMULARIO
// ==========================

function validarFormulario() {
	let valido = true;
	const nombre = document.getElementById("nombre").value.trim();
	const correoInput = document.getElementById("correo");
	const correo = correoInput.value.trim();
	const fecha = document.getElementById("fecha").value;
	const especialidad = document.getElementById("especialidad").value;
	const horario = document.getElementById("horario").value;
	const errorNombre = document.getElementById("errorNombre");
	const errorCorreo = document.getElementById("errorCorreo");
	const errorFecha = document.getElementById("errorFecha");
	const errorEspecialidad = document.getElementById("errorEspecialidad");
	const errorHorario = document.getElementById("errorHorario");

	// Limpiar errores

	errorNombre.textContent = "";
	errorCorreo.textContent = "";
	errorFecha.textContent = "";
	errorEspecialidad.textContent = "";
	errorHorario.textContent = "";

	// Nombre

	if (nombre.length < 3 || nombre.length > 60) {
		errorNombre.textContent =
			"El nombre debe tener entre 3 y 60 caracteres.";
		valido = false;
	}

	// Correo

	if (correo === "" || !correoInput.checkValidity()) {
		errorCorreo.textContent = "Ingrese un correo válido.";
		valido = false;
	}

	// Fecha

	if (fecha === "" || fecha < hoy) {
		errorFecha.textContent = "La fecha no puede ser anterior a hoy.";
		valido = false;
	}

	// Especialidad

	if (especialidad === "") {
		errorEspecialidad.textContent = "Seleccione una especialidad.";
		valido = false;
	}

	// Horario

	if (horario === "") {

		errorHorario.textContent = "Seleccione un horario.";
		valido = false;
	
  } else if (horario === horarioNoDisponible) {
  
    errorHorario.textContent = "El horario 11:00 no está disponible.";
		valido = false;
	
  }
	return valido;
}

// ==========================
// ENVIAR FORMULARIO
// ==========================

formCita.addEventListener("submit", function (event) {
	event.preventDefault();

	if (!validarFormulario()) {
		return;
	}

	const solicitud = {
		nombre: document.getElementById("nombre").value.trim(),
		correo: document.getElementById("correo").value.trim(),
		fecha: document.getElementById("fecha").value,
		especialidad: document.getElementById("especialidad").value,
		horario: document.getElementById("horario").value,
	};

	sessionStorage.setItem("solicitudCita", JSON.stringify(solicitud));

	window.location.href = "confirmacion-cita.html";
});
