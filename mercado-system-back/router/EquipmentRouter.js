import express from "express";
import EquipmentController from "../controllers/EquipmentController.js";

const router = express.Router();

router.get("/", EquipmentController.getAllEquipment);
router.get("/:id", EquipmentController.getEquipmentById);
router.post("/", EquipmentController.createEquipment);
router.put("/:id", EquipmentController.updateEquipment);
router.delete("/:id", EquipmentController.deleteEquipment);

export default router;