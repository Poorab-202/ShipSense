import express from "express";
import {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    getManagers,
    deleteUser,
    loginUser,
} from "../controllers/userControllers.js";

const router = express.Router();


router.post("/add", createUser);         
router.get("/managers", getManagers);
router.get("/", getUsers);              
router.get("/:id", getUserById);        
router.put("/:id", updateUser);         
router.delete("/:id", deleteUser);      
router.post("/login", loginUser);        

export default router;
