import express from "express";
import UserController from "../controllers/UserController.js";
import authenticateToken from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post("/login", UserController.loginUser); 
router.post("/", UserController.createUser); 
router.use(authenticateToken); 
router.get("/", UserController.getAllUsers);     
router.get("/:id", UserController.getUserById);   
router.put("/:id", UserController.updateUser);    
router.delete("/:id", UserController.deleteUser); 

export default router;