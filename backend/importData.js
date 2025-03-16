import mysql from "mysql2/promise";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,  // Zorg dat je wachtwoord klopt!
  database: "events_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 📌 Functie om JSON in MySQL te importeren
const importData = async () => {
  try {
    // Lees en parse JSON-bestanden
    const users = JSON.parse(fs.readFileSync(path.join("data", "users.json"), "utf8"));
    const events = JSON.parse(fs.readFileSync(path.join("data", "events.json"), "utf8"));
    const categories = JSON.parse(fs.readFileSync(path.join("data", "categories.json"), "utf8"));

    // ✅ Importeer gebruikers
    console.log("Importing users...");
    for (const user of users.users) {
      await pool.query(
        "INSERT INTO users (id, username, password, name, image) VALUES (?, ?, ?, ?, ?)",
        [user.id, user.username, user.password, user.name, user.image]
      );
    }

    // ✅ Importeer categorieën
    console.log("Importing categories...");
    for (const category of categories.categories) {
      await pool.query(
        "INSERT INTO categories (id, name) VALUES (?, ?)",
        [category.id, category.name]
      );
    }

    // ✅ Importeer events met correcte datumopmaak
    console.log("Importing events...");
    for (const event of events.events) {
      // Formatteer de tijd naar MySQL DATETIME formaat
      const formattedStartTime = event.startTime.replace("T", " ").substring(0, 19);
      const formattedEndTime = event.endTime.replace("T", " ").substring(0, 19);

      await pool.query(
        "INSERT INTO events (id, title, description, image, location, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [event.id, event.title, event.description, event.image, event.location, formattedStartTime, formattedEndTime]
      );
    }

    console.log("✅ Data succesvol geïmporteerd!");
    process.exit();
  } catch (error) {
    console.error("❌ Fout bij importeren:", error);
    process.exit(1);
  }
};

// 🚀 Voer de functie uit
importData();
