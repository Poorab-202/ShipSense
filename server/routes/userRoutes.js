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

// 🔹 User CRUD
router.post("/add", createUser);         // Create new user
router.get("/managers", getManagers);
router.get("/", getUsers);               // Get all users
router.get("/:id", getUserById);         // Get single user
router.put("/:id", updateUser);          // Update user
router.delete("/:id", deleteUser);       // Delete user

// 🔹 Auth
router.post("/login", loginUser);        // Login user

export default router;
