import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import pool from "../db.js";
import requireAuth from "../middleware/auth.js"; // ✅ JWT beveiliging

dotenv.config();
const router = express.Router();

// ✅ Registreren van een nieuwe gebruiker met JWT-authenticatie
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Vul alle velden in" });
    }

    try {
        // ✅ Check of e-mail al bestaat
        const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "E-mail bestaat al" });
        }

        // ✅ Wachtwoord hash genereren
        const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Gebruiker opslaan in database (inclusief 'name')
        const [result] = await pool.query(
            "INSERT INTO users (username, email, password, name) VALUES (?, ?, ?, ?)",
            [username, email, hashedPassword, username] // Gebruik 'username' als standaard 'name'
        );

        res.status(201).json({ message: "Gebruiker geregistreerd", userId: result.insertId });
    } catch (error) {
        console.error("⚠️ Fout bij registreren:", error);
        res.status(500).json({ message: "Database error" });
    }
});

// ✅ Inloggen met JWT-authenticatie
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Vul alle velden in" });
    }

    try {
        const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

        if (users.length === 0) {
            return res.status(400).json({ message: "Gebruiker niet gevonden" });
        }

        const user = users[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Ongeldig wachtwoord" });
        }

        // ✅ JWT-token genereren
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h",
        });

        res.json({ token });
    } catch (error) {
        console.error("⚠️ Fout bij login:", error);
        res.status(500).json({ message: "Database error" });
    }
});

// ✅ Beveiligde profielroute (JWT)
router.get("/profile", requireAuth, async (req, res) => {
    try {
        const [user] = await pool.query("SELECT id, username, email FROM users WHERE id = ?", [req.user.id]);

        if (!user.length) {
            return res.status(404).json({ message: "Gebruiker niet gevonden." });
        }

        res.json({ user: user[0] });
    } catch (error) {
        console.error("⚠️ Fout bij ophalen profiel:", error);
        res.status(500).json({ message: "Database error" });
    }
});

// ✅ Logout route (JWT)
router.get("/logout", (req, res) => {
    res.json({ message: "JWT-token verlopen, uitgelogd" });
});

export default router;
