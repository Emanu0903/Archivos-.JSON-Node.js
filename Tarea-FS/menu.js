const readline = require('readline');
const crearArchivo = require('./createFile'); 
const agregarEstudiante = require('./add'); 
const actualizarEstudiante = require('./update'); 
const eliminarEstudiante = require('./delete'); 
const contarEstudiantes = require('./count'); 
const leerArchivo = require('./read'); 
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function mostrarMenu() {
    console.log('\n--- Menú de Gestión de Estudiantes ---');
    console.log('1. Crear archivo de estudiantes');
    console.log('2. Leer estudiantes');
    console.log('3. Agregar estudiante');
    console.log('4. Actualizar estudiante');
    console.log('5. Eliminar estudiante');
    console.log('6. Contar estudiantes');
    console.log('7. Salir');

    rl.question('Elige una opción: ', (opcion) => {
        switch (opcion) {
            case '1':
                crearArchivo(volverAMenu); 
                break;
            case '2':
                leerArchivo(volverAMenu); 
                break;
            case '3':
                agregarEstudiante(volverAMenu); 
                break;
            case '4':
                actualizarEstudiante(volverAMenu); 
                break;
            case '5':
                eliminarEstudiante(volverAMenu); 
                break;
            case '6':
                contarEstudiantes(volverAMenu); 
                break;
            case '7':
                console.log('Gracias por usar el sistema.');
                rl.close();
                break;
            default:
                console.log('Opción no válida. Intenta de nuevo.');
                volverAMenu();
        }
    });
}

function volverAMenu() {
    setTimeout(() => mostrarMenu(), 1000);
}

mostrarMenu();
