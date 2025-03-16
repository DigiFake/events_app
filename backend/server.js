import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import session from "express-session";
import passport from "./config/passport.js"; // ✅ Passport.js configuratie
import pool from "./db.js"; // ✅ MySQL databaseverbinding
import fs from "fs";
import path from "path";

import usersRouter from "./routes/users.js";
import eventsRouter from "./routes/events.js";
import categoriesRouter from "./routes/categories.js";
import authRouter from "./routes/auth.js"; // ✅ Alleen JWT-authenticatie
import githubAuthRouter from "./routes/githubAuth.js"; // ✅ Nieuwe GitHub-auth route
import requireAuth from "./middleware/auth.js"; // ✅ JWT-auth Middleware
import logMiddleware from "./middleware/logMiddleware.js"; // ✅ Log Middleware

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Controleer of de logs-map en requests.log bestaan (fix voor ENOENT error)
const logDir = path.join(process.cwd(), "backend", "logs");
const logFilePath = path.join(logDir, "requests.log");

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
    console.log("📂 Logs-map aangemaakt.");
}

if (!fs.existsSync(logFilePath)) {
    fs.writeFileSync(logFilePath, "", { flag: "w" });
    console.log("📄 Logbestand aangemaakt.");
}

// ✅ Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(logMiddleware);

// ✅ CORS-instellingen (Fix voor frontend requests)
app.use(
    cors({
        origin: "http://localhost:5173", // ✅ Sta de frontend toe
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // ✅ Nodig voor cookies en sessies
    })
);

// ✅ Extra headers om sessies/cookies te ondersteunen
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// ✅ Express-session instellen (voor Passport.js)
app.use(
    session({
        secret: process.env.SESSION_SECRET || "supersecret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }, // 🚨 Zet op `true` bij HTTPS
    })
);

// ✅ Passport.js Initialiseren
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/auth", authRouter); // ✅ JWT-authenticatie (registratie, login)
app.use("/github", githubAuthRouter); // ✅ GitHub OAuth
app.use("/events", requireAuth, eventsRouter);
app.use("/users", requireAuth, usersRouter);
app.use("/categories", requireAuth, categoriesRouter);

// ✅ Databaseverbinding testen
app.get("/test-db", async (req, res) => {
    try {
        const [rows] = await pool.query("SELECT 1+1 AS result");
        res.json({ message: "✅ Database connected!", result: rows[0].result });
    } catch (error) {
        console.error("❌ Database connection error:", error);
        res.status(500).json({
            message: "Database error",
            error: process.env.NODE_ENV === "development" ? error.message : undefined,
        });
    }
});

// ❌ 404 Error Handling
app.use((req, res, next) => {
    res.status(404).json({ message: "❌ Route not found" });
});

// ❌ Algemene Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || "❌ Interne serverfout",
    });
});

// ✅ Server starten
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
