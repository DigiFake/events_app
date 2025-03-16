import { logRequest } from "../utils/log.js";

// Middleware om alle requests te loggen
const logMiddleware = (req, res, next) => {
    const start = Date.now(); // Starttijd van request
    res.on("finish", () => {
        const duration = Date.now() - start; // Bereken de duur
        logRequest(req.method, req.url, res.statusCode, duration);
    });
    next();
};

export default logMiddleware;
