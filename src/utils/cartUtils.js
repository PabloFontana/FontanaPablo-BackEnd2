const crypto = require('crypto');

// Conjunto para almacenar códigos únicos
const codigosGenerados = new Set();

const generarCodigoUnico = () => {
    const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codigo;

    do {
        // Generar un código aleatorio de 8 caracteres
        codigo = Array.from({ length: 8 }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join('');
    } while (codigosGenerados.has(codigo)); // Asegurarse de que el código sea único

    // Almacenar el código generado
    codigosGenerados.add(codigo);

    // Obtener la fecha y hora actual
    const fechaHora = new Date().toISOString();

    return { codigo, fechaHora };
};

// Ejemplo de uso
const { codigo, fechaHora } = generarCodigoUnico();
console.log(`Código: ${codigo}, Fecha y hora: ${fechaHora}`);
