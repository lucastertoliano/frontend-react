import express from "express";
import UserController from "../controllers/UserController.js";
import authenticateToken from '../authMiddleware.js';
import upload from '../uploadMiddleware.js'; 

const router = express.Router();

router.post("/login", UserController.loginUser); 
router.post("/", UserController.createUser);

router.post(
    "/profile/upload", 
    authenticateToken, 
    upload.single('profilePicture'),
    UserController.uploadProfilePicture
);

router.use(authenticateToken); 

router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;