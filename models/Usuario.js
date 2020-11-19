/*const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Creando el esquema que dará forma a las colecciones de MongoDB
const usuarioSchema = new Schema({
    Nombres: {
        type: String,
    },
    Apellidos: {
        type: String,
    },
    Edad: {
        type: Number,
    },
    Grado_Academico: {
        type: String,
    },
    E_Mail: {
        type: String,
    },
    Contraseña: {
        type: String,
    },
    tokens:
        [
            {
                token: {
                    type: String,
                    required: true,
                }
            }
        ]
});

//El siguiente método encripta la contraseña
usuarioSchema.pre('save', async function (next) {
    const usuario = this;
    if (usuario.isModified("Contraseña")) {
        usuario.Contraseña = await bcrypt.hash(usuario.Contraseña, 8);
    }
});

//Generando autenticaciones para el usuario
usuarioSchema.methods.generateAuthToken = async function () {
    const usuario = this;
    const token = jwt.sign({ _id: usuario._id, Nombres: usuario.Nombres, Apellidos: usuario.Apellidos, E_Mail: usuario.E_Mail }, 'secret');
    usuario.tokens = usuario.tokens.concat({ token });
    await usuario.save();
    return token;
}

//Buscando un usuario por medio del correo y la contraseña
usuarioSchema.statics.findByCredentials = async (E_Mail, Contraseña) => {
    const usuario = await Usuario.findOne({ E_Mail });
    if(!usuario) throw new Error({ error: "Credenciales erróneas" });
    const ContraseñaVálida = await bcrypt.compare(Contraseña, usuario.Contraseña);
    if(!ContraseñaVálida)throw new Error({ error: "Credenciales erróneas" });
    return usuario;
}

//Exportando como un modelo la configuración del usuario, para ser utilizada más adelante
const Usuario = model('Usuario', usuarioSchema);
module.exports = Usuario;*/