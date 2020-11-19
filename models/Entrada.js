const { Schema, model } = require('mongoose');

//Creando el esquema que dará forma a las colecciones de MongoDB
const entradaSchema = new Schema({
    Título: {
        type: String,
        default: 'No se ha añadido un título'
    },
    Autor: {
        type: String,
        default: 'Anónimo',
    },
    Descripción: {
        type: String,
        default: 'No se ha añadido una descripción para la entrada',
    },
    Contenido: {
        type: String,
        default: 'No se ha añadido el contenido de la entrada',
    },
    Fecha: {
        type: Date,
        default: Date.now()
    }
});

//Creando un modelo de datos para poder exportarlo
const Entrada = model('entrada', entradaSchema);
module.exports = Entrada;