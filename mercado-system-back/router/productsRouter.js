import express from "express";
import ProductController from "../controllers/ProductController.js";
import authenticateToken from '../authMiddleware.js'; 

const router = express.Router();

router.use(authenticateToken); 

router.get("/", ProductController.getAllProducts); 
router.get("/:id", ProductController.getProductById); 
router.post("/", ProductController.createProduct); 
router.put("/:id", ProductController.updateProduct); 
router.delete("/:id", ProductController.deleteProduct); 
router.put("/promotion/apply/:id", ProductController.applyPromotion); 
router.put("/promotion/remove/:id", ProductController.removePromotion); 

export default router;