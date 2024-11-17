const fs = require('fs');

const fileName = './estudiantes.json';

function leerArchivo(callback) {
    fs.readFile(fileName, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error al leer el archivo:', err);
            callback(null);
            return;
        }

        try {
            const estudiantes = JSON.parse(data);
            console.log('Contenido del archivo leído:', estudiantes); // Mostrar en la terminal
            callback(estudiantes);
        } catch (error) {
            console.error('Error al procesar los datos del archivo:', error);
            callback(null);
        }
    });
}

module.exports = leerArchivo;

