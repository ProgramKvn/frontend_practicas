const { Router } = require('express');
const Entrada = require('../../models/Entrada');

const router = Router();

//Creando la acción para el verbo GET - Recuperar la colección de la base de datos
router.get('/', async (req, res) => {
    try {
        const entrada = await Entrada.find();
        if (!entrada) throw new Error('Entradas inexistentes');
        const Entradas_Ordenadas = entrada.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        });
        res.status(200).json(Entradas_Ordenadas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Creando la acción para el verbo GET - Recuperar una colección específica de la base de datos
router.get('/:id', async (req, res) => {
    const entrada = await Entrada.findById(req.params.id);
    res.json(entrada);
})

//Creando la acción para el verbo POST - Enviar un documento a la base de datos
router.post('/', async (req, res) => {
    const nuevaEntrada = new Entrada(req.body);
    try {
        const entrada = await nuevaEntrada.save();
        if (!entrada) throw new Error('Ocurrió un error en el momento de guardar la entrada');
        res.status(200).json(entrada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Creando la acción para el verbo PUT - Actualizando un documento de la base de datos
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const respuesta = await Entrada.findByIdAndUpdate(id, req.body);
        console.log(respuesta);
        if (!respuesta) throw Error('Ocurrió un error en el momento de actualizar la entrada ');
        const Entrada_Actualizada = { ...respuesta._doc, ...req.body };
        res.status(200).json(Entrada_Actualizada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Creando la acción que responderá al verbo DELETE - Eliminando un documento determinado
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const EntradaEliminada = await Entrada.findByIdAndDelete(id);
        if (!EntradaEliminada) throw Error('Ocurrió un error en el momento de eliminar la entrada');
        res.status(200).json(EntradaEliminada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Exportando la configuración de los verbos
module.exports = router;