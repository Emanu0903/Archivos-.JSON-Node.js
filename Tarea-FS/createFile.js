const fs = require('fs'); //File System

const fileName = './estudiantes.json';

function crearArchivo() {
    const datosIniciales = {
        estudiantes: [],
    };

    fs.writeFile(fileName, JSON.stringify(datosIniciales, null, 2), (err) => {
        if (err) {
            console.error('Error al crear el archivo:', err);
        } else {
            console.log('Archivo creado exitosamente.');
        }
    });
}

module.exports = crearArchivo;
