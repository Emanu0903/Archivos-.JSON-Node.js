const fs = require('fs');
const readline = require('readline');
const leerArchivo = require('./read.js'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const fileName = './estudiantes.json';

function eliminarEstudiante() {
    leerArchivo((estudiantes) => {
        if (estudiantes && estudiantes.estudiantes.length > 0) {
            console.log('Lista de estudiantes:');
            estudiantes.estudiantes.forEach((estudiante, index) => {
                console.log(`${index + 1}. ${estudiante.nombre} ${estudiante.apellido}`);
            });

            rl.question('Escribe el nombre o el apellido del estudiante que deseas eliminar: ', (input) => {
                const estudianteIndex = estudiantes.estudiantes.findIndex(
                    (est) =>
                        est.nombre.toLowerCase() === input.toLowerCase() || 
                        est.apellido.toLowerCase() === input.toLowerCase()
                );

                if (estudianteIndex !== -1) {
                    const estudianteEliminado = estudiantes.estudiantes.splice(estudianteIndex, 1);
                    console.log(`Estudiante ${estudianteEliminado[0].nombre} ${estudianteEliminado[0].apellido} eliminado correctamente.`);

                    fs.writeFile(fileName, JSON.stringify(estudiantes, null, 2), (err) => {
                        if (err) {
                            console.error('Error al eliminar el estudiante:', err);
                        } else {
                            console.log('Archivo actualizado correctamente.');
                        }
                    });
                } else {
                    console.log('Estudiante no encontrado. Verifica el nombre o apellido ingresado.');
                }
            });
        } else {
            console.log('No hay estudiantes registrados.');
        }
    });
}

module.exports = eliminarEstudiante;
