const solicitudGuardada = sessionStorage.getItem("solicitudCita");

if (solicitudGuardada === null) {

    document.getElementById("contenidoSolicitud").classList.add("d-none");
	document.getElementById("sinSolicitud").classList.remove("d-none");

} else {

    const solicitud = JSON.parse(solicitudGuardada);
	document.getElementById("nombre").textContent = solicitud.nombre;
	document.getElementById("correo").textContent = solicitud.correo;
	document.getElementById("especialidad").textContent = solicitud.especialidad;
	document.getElementById("fecha").textContent = solicitud.fecha;
	document.getElementById("horario").textContent = solicitud.horario;

}
