import express from "express";
import {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoriesController.js";

const router = express.Router();

// ✅ Openbare routes (geen authenticatie vereist)
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);

// 🔐 Beveiligde routes: Alleen ingelogde gebruikers mogen categorieën beheren
const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Niet geautoriseerd. Log in via GitHub." });
    }
    next();
};

router.post("/", requireAuth, createCategory);
router.put("/:id", requireAuth, updateCategory);
router.delete("/:id", requireAuth, deleteCategory);

export default router;
