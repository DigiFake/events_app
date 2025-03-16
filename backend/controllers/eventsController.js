import pool from "../db.js"; // ✅ MySQL databaseverbinding

// 🟢 Haal alle events op
export const getAllEvents = async (req, res) => {
    try {
        const [events] = await pool.query("SELECT * FROM events");
        res.json(events);
    } catch (error) {
        console.error("⚠️ Fout bij ophalen evenementen:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// 🟢 Haal één event op via ID
export const getEventById = async (req, res) => {
    try {
        const [event] = await pool.query("SELECT * FROM events WHERE id = ?", [req.params.id]);
        if (event.length === 0) return res.status(404).json({ message: "Evenement niet gevonden" });

        res.json(event[0]);
    } catch (error) {
        console.error("⚠️ Fout bij ophalen evenement:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// 🔴 Voeg een event toe
export const createEvent = async (req, res) => {
    const { title, description, image, categoryIds, location, startTime, endTime } = req.body;
    
    if (!title || !description || !image || !categoryIds || !location || !startTime || !endTime) {
        return res.status(400).json({ message: "Alle velden zijn verplicht" });
    }

    try {
        const [result] = await pool.query(
            "INSERT INTO events (title, description, image, categoryIds, location, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [title, description, image, JSON.stringify(categoryIds), location, startTime, endTime]
        );
        res.status(201).json({ id: result.insertId, title, description, image, categoryIds, location, startTime, endTime });
    } catch (error) {
        console.error("⚠️ Fout bij aanmaken evenement:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// 🔴 Update een event
export const updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, description, image, categoryIds, location, startTime, endTime } = req.body;

    try {
        const [result] = await pool.query(
            "UPDATE events SET title = ?, description = ?, image = ?, categoryIds = ?, location = ?, startTime = ?, endTime = ? WHERE id = ?",
            [title, description, image, JSON.stringify(categoryIds), location, startTime, endTime, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Evenement niet gevonden" });

        res.json({ id, title, description, image, categoryIds, location, startTime, endTime });
    } catch (error) {
        console.error("⚠️ Fout bij updaten evenement:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// ❌ Verwijder een event
export const deleteEvent = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM events WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Evenement niet gevonden" });

        res.json({ message: "Evenement verwijderd" });
    } catch (error) {
        console.error("⚠️ Fout bij verwijderen evenement:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// ✅ Correcte exports
export default { getAllEvents, getEventById, createEvent, updateEvent, deleteEvent };
