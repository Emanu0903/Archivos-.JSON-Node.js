const fs = require('fs');
const readline = require('readline');

const fileName = './estudiantes.json';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function contarEstudiantes() {
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            rl.close();
            return;
        }

        try {
            const estudiantes = JSON.parse(data);
            const cantidadEstudiantes = estudiantes.estudiantes.length;
            console.log(`Número total de estudiantes registrados: ${cantidadEstudiantes}`);
        } catch (error) {
            console.error('Error al procesar los datos del archivo:', error);
        } finally {
            rl.close(); 
        }
    });
}

module.exports = contarEstudiantes;
