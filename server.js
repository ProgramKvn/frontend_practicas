const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { mongoUri, PORT } = require('./config');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const entradaRoutes = require('./routes/api/entrada');

//Usando middlewares
app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());

//Configurando la conexión con MongoDB
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log('Conexión con la base de datos exitosa'))
    .catch((err) => console.log(err));

//Configurando las rutas del sistema
app.use('/api/entrada', entradaRoutes);
app.get('/', (req, res) => res.send('Hello world'));

//Configurando el puerto
app.listen(PORT, console.log(`Aplicación funcionando en el puerto ${PORT}`));