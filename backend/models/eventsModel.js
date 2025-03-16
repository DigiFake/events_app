import pool from "../db.js"; // ✅ MySQL databaseverbinding

// 🟢 Haal alle evenementen op
export const getAllEvents = async () => {
    const [events] = await pool.query("SELECT * FROM events");
    return events;
};

// 🟢 Haal één event op via ID
export const getEventById = async (id) => {
    const [event] = await pool.query("SELECT * FROM events WHERE id = ?", [id]);
    return event[0] || null;
};

// 🔹 Voeg een nieuw event toe
export const createEvent = async ({ title, description, image, categoryIds, location, startTime, endTime }) => {
    const [result] = await pool.query(
        "INSERT INTO events (title, description, image, categoryIds, location, startTime, endTime) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [title, description, image, JSON.stringify(categoryIds), location, startTime, endTime]
    );

    return result.insertId; // Retourneert het ID van het nieuw toegevoegde event
};

// 🔹 Update een event
export const updateEvent = async (id, { title, description, image, categoryIds, location, startTime, endTime }) => {
    const [result] = await pool.query(
        "UPDATE events SET title = ?, description = ?, image = ?, categoryIds = ?, location = ?, startTime = ?, endTime = ? WHERE id = ?",
        [title, description, image, JSON.stringify(categoryIds), location, startTime, endTime, id]
    );

    return result.affectedRows > 0; // Geeft `true` terug als update succesvol was
};

// ❌ Verwijder een event
export const deleteEvent = async (id) => {
    const [result] = await pool.query("DELETE FROM events WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
