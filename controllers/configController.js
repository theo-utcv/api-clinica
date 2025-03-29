const configModel = require('../models/configModel');

const configController = {
    getConfig: async (req, res) => {
        try {
            const config = await configModel.findOne({}, {_id: 0});
            if (!config) {
                return res.status(404).json({ message: 'Config no encontrada' });
            }
            res.json(config);
        } catch (error) {
            console.error('Error al obtener la config:', error.message);
            res.status(500).json({ message: 'Error al obtener la config' });
        }
    },
    updateConfig: async (req, res) => {
        try {
            const { fotoresistencia, sensor_humedad, led1, led2, temperatura, humedad } = req.body;
            const config = await configModel.findOneAndUpdate(
                {},
                { fotoresistencia, sensor_humedad, led1, led2, temperatura, humedad },
                { new: true, upsert: true }
            );
            res.json(config);
        } catch (error) {
            console.error('Error al actualizar la config:', error.message);
            res.status(500).json({ message: 'Error al actualizar la config' });
        }
    }
}

module.exports = configController;
