import express from "express";
import passport from "passport";
import pool from "../db.js"; // ✅ MySQL databaseverbinding

const router = express.Router();

// ✅ GitHub OAuth login route
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

// ✅ GitHub OAuth callback
router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/auth/fail" }),
    async (req, res) => {
        try {
            const { id, displayName, username, profileUrl, photos } = req.user;
            const name = displayName || username || "Onbekende gebruiker";
            const image = photos?.[0]?.value || "https://via.placeholder.com/150";

            console.log("🔍 Gebruiker opslaan in database...");

            // ✅ Check of gebruiker al bestaat
            const [existingUser] = await pool.query("SELECT * FROM users WHERE github_id = ?", [id]);

            if (!existingUser.length) {
                await pool.query(
                    "INSERT INTO users (github_id, name, username, image, profile_url) VALUES (?, ?, ?, ?, ?)",
                    [id, name, username, image, profileUrl || `https://github.com/${username}`]
                );
            }

            req.session.github_id = id;
            res.json({ message: "GitHub login succesvol", user: req.user });
        } catch (error) {
            console.error("⚠️ Fout bij opslaan gebruiker:", error);
            res.status(500).json({ message: "Database error" });
        }
    }
);

// ✅ Logout voor GitHub-gebruikers
router.get("/github/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err);
        req.session.destroy(() => {
            res.clearCookie("connect.sid");
            res.json({ message: "Succesvol uitgelogd van GitHub" });
        });
    });
});

export default router;
