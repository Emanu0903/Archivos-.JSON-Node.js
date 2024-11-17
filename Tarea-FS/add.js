const fs = require('fs');
const readline = require('readline');

const fileName = './estudiantes.json';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function pregunta(pregunta) {
    return new Promise((resolve) => {
        rl.question(pregunta, (respuesta) => {
            resolve(respuesta.trim());
        });
    });
}

async function agregarEstudiante(callback) {
    try {
        const nombre = await pregunta('Nombre del estudiante: ');
        const apellido = await pregunta('Apellido del estudiante: ');
        const edad = await pregunta('Edad del estudiante: ');
        const carrera = await pregunta('Carrera del estudiante: ');

        const nuevoEstudiante = { nombre, apellido, edad, carrera };

        fs.readFile(fileName, 'utf8', (err, data) => {
            let estudiantes = { estudiantes: [] };

            if (!err && data) {
                try {
                    estudiantes = JSON.parse(data);
                } catch (e) {
                    console.log('Error al analizar el archivo JSON existente. Creando uno nuevo.');
                }
            }

            estudiantes.estudiantes.push(nuevoEstudiante);

            fs.writeFile(fileName, JSON.stringify(estudiantes, null, 4), (err) => {
                if (err) {
                    console.log('Error al guardar el archivo:', err.message);
                } else {
                    console.log('Estudiante agregado y guardado exitosamente.');
                }

                rl.close(); 
                if (callback) callback();
            });
        });
    } catch (error) {
        console.error('Error al agregar estudiante:', error.message);
        rl.close(); 
        if (callback) callback();
    }
}

module.exports = agregarEstudiante;
