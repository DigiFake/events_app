import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const logFilePath = path.join(__dirname, "../logs/requests.log");

// 📝 Functie om logs op te slaan
export const logRequest = (method, url, status, duration) => {
    const logMessage = `[${new Date().toISOString()}] ${method} ${url} - ${status} (${duration}ms)\n`;
    
    // Log naar console
    console.log(logMessage.trim());

    // Log wegschrijven naar bestand
    fs.appendFile(logFilePath, logMessage, (err) => {
        if (err) console.error("Fout bij het wegschrijven van de log:", err);
    });
};
