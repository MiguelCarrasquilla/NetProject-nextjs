export const formatDate = (dateString) => {
    const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const months = [
        'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];

    // Convertir la fecha del string a un objeto Date
    const date = new Date(dateString);

    // Obtener el día de la semana, el día, mes y año
    const dayOfWeek = daysOfWeek[date.getDay()];  // Obtener el día de la semana
    const day = date.getDate();                    // Obtener el día del mes
    const month = months[date.getMonth()];         // Obtener el mes
    const year = date.getFullYear();               // Obtener el año

    console.log(`${dayOfWeek}, ${day} de ${month}`);

    // Formatear la fecha en el formato que deseas
    return `${dayOfWeek}, ${day} de ${month}`;
};