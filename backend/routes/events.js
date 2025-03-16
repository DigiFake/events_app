import express from "express";
import {
    getAllEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent
} from "../controllers/eventsController.js";

const router = express.Router();

// ✅ Openbare routes (iedereen kan evenementen bekijken)
router.get("/", getAllEvents);
router.get("/:id", getEventById);

// 🔐 Beveiligde routes (alleen ingelogde gebruikers mogen wijzigen)
const requireAuth = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Niet geautoriseerd. Log in via GitHub." });
    }
    next();
};

router.post("/", requireAuth, createEvent);
router.put("/:id", requireAuth, updateEvent);
router.delete("/:id", requireAuth, deleteEvent);

export default router;
