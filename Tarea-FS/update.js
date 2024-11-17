const fs = require('fs');
const readline = require('readline');
const leerArchivo = require('./read.js'); 

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const fileName = './estudiantes.json';

function actualizarEstudiante() {
    leerArchivo((estudiantes) => {
        if (estudiantes && estudiantes.estudiantes.length > 0) {
            console.log('Lista de estudiantes:');
            estudiantes.estudiantes.forEach((estudiante) => {
                console.log(`- ${estudiante.nombre} ${estudiante.apellido}`);
            });

            rl.question('Escribe el nombre o apellido del estudiante que deseas actualizar: ', (input) => {
                const estudiante = estudiantes.estudiantes.find(
                    (est) =>
                        est.nombre.toLowerCase() === input.toLowerCase() || 
                        est.apellido.toLowerCase() === input.toLowerCase()
                );

                if (estudiante) {
                    rl.question(`¿Qué campo deseas actualizar de ${estudiante.nombre} ${estudiante.apellido}? (nombre, apellido, edad, carrera): `, (campo) => {
                        rl.question(`Nuevo valor para ${campo}: `, (nuevoValor) => {
                            if (campo === 'edad') {
                                estudiante.edad = parseInt(nuevoValor, 10);
                            } else if (['nombre', 'apellido', 'carrera'].includes(campo)) {
                                estudiante[campo] = nuevoValor;
                            } else {
                                console.log('Campo no válido. Intenta nuevamente.');
                                return;
                            }

                            fs.writeFile(fileName, JSON.stringify(estudiantes, null, 2), (err) => {
                                if (err) {
                                    console.error('Error al actualizar el archivo:', err);
                                } else {
                                    console.log('Información actualizada exitosamente.');
                                }
                            });
                        });
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

module.exports = actualizarEstudiante;
