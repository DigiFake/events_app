import express from "express";
import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/usersController.js";

const router = express.Router();

// 🔐 Middleware voor beveiligde routes
const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Niet geautoriseerd. Log in via GitHub." });
    }
    next();
};

// 🔐 Beveiligde routes (alleen ingelogde gebruikers mogen deze acties uitvoeren)
router.get("/", requireAuth, getAllUsers);
router.get("/:id", requireAuth, getUserById);
router.post("/", requireAuth, createUser);
router.put("/:id", requireAuth, updateUser);
router.delete("/:id", requireAuth, deleteUser);

export default router;
