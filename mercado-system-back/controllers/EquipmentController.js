import Equipment from "../models/Equipment.js";

//get all
export const getAllEquipment = async (req, res) => {
  try {
    const equipment = await Equipment.find();
    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar equipamentos", detail: error.message });
  }
};

//getById
export const getEquipmentById = async (req, res) => {
  try {
    const equipment = await Equipment.findById(req.params.id);
    
    if (!equipment) {
      return res.status(404).json({ error: "Equipamento não encontrado" });
    }

    res.status(200).json(equipment);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar equipamento", detail: error.message });
  }
};

//post
export const createEquipment = async (req, res) => {
  try {
    const newEquipment = await Equipment.create(req.body);
    res.status(201).json(newEquipment);
  } catch (error) {
    res.status(400).json({ error: "Erro ao criar equipamento", detail: error.message });
  }
};

//put
export const updateEquipment = async (req, res) => {
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
};
//delete
export const deleteEquipment = async (req, res) => {
  try {
    const deleted = await Equipment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Equipamento não encontrado" });
    }

    res.status(200).json({ message: "Equipamento removido com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao deletar equipamento", detail: error.message });
  }
};
