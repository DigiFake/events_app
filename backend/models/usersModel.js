import pool from "../db.js"; // ✅ MySQL databaseverbinding

// 🟢 Haal alle gebruikers op
export const getAllUsers = async () => {
    const [rows] = await pool.query("SELECT id, github_id, name, username, image, profile_url FROM users");
    return rows;
};

// 🟢 Haal één gebruiker op via ID
export const getUserById = async (id) => {
    const [rows] = await pool.query("SELECT id, github_id, name, username, image, profile_url FROM users WHERE id = ?", [id]);
    return rows[0]; // Retourneert de eerste gebruiker als object
};

// 🔹 Voeg een gebruiker toe via GitHub OAuth
export const createUser = async ({ github_id, name, username, image, profile_url }) => {
    // ✅ Controleer of gebruiker al bestaat
    const [existingUser] = await pool.query("SELECT * FROM users WHERE github_id = ?", [github_id]);
    
    if (existingUser.length > 0) {
        return existingUser[0].id; // Gebruiker bestaat al, return zijn ID
    }

    // ✅ Voeg nieuwe gebruiker toe
    const [result] = await pool.query(
        "INSERT INTO users (github_id, name, username, image, profile_url) VALUES (?, ?, ?, ?, ?)",
        [github_id, name, username, image, profile_url]
    );

    return result.insertId; // Retourneert de nieuwe gebruiker-ID
};

// 🔹 Update een gebruiker
export const updateUser = async (id, { name, image, profile_url }) => {
    const [result] = await pool.query(
        "UPDATE users SET name = ?, image = ?, profile_url = ? WHERE id = ?",
        [name, image, profile_url, id]
    );

    return result.affectedRows > 0; // Geeft `true` terug als update succesvol was
};

// ❌ Verwijder een gebruiker
export const deleteUser = async (id) => {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
