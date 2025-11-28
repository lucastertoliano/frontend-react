import Equipment from "../models/Equipment-model.js";


const controller = {

    // getAll
    getAllEquipment: async (req, res) => {
        try {
            const equipment = await Equipment.find({});
            res.status(200).json(equipment);
        } catch (error) {
            res.status(500).json({ 
                error: "Erro ao listar equipamentos", 
                detail: error.message 
            });
        }
    },

    //getById
    getEquipmentById: async (req, res) => {
        try {
            const equipment = await Equipment.findById(req.params.id);
            
            if (!equipment) {
                return res.status(404).json({ error: "Equipamento não encontrado" });
            }

            res.status(200).json(equipment);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar equipamento", detail: error.message });
        }
    },

    //post
    createEquipment: async (req, res) => {
        try {
            const newEquipment = await Equipment.create(req.body);
            res.status(201).json(newEquipment);
        } catch (error) {
            res.status(400).json({ error: "Erro ao criar equipamento", detail: error.message });
        }
    },

    //put
    updateEquipment: async (req, res) => {
        try {
            const updated = await Equipment.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true }
            );

            if (!updated) {
                return res.status(404).json({ error: "Equipamento não encontrado" });
            }

            res.status(200).json(updated);
        } catch (error) {
            res.status(400).json({ error: "Erro ao atualizar equipamento", detail: error.message });
        }
    },
    
    //delete
    deleteEquipment: async (req, res) => {
        try {
            const deleted = await Equipment.findByIdAndDelete(req.params.id);

            if (!deleted) {
                return res.status(404).json({ error: "Equipamento não encontrado" });
            }

            res.status(200).json({ message: "Equipamento removido com sucesso" });
        } catch (error) {
            res.status(500).json({ error: "Erro ao deletar equipamento", detail: error.message });
        }
    }
};

export default controller;