import pool from "../db.js"; // ✅ MySQL databaseverbinding

// 🟢 Haal alle gebruikers op
export const getAllUsers = async (req, res) => {
    try {
        const [users] = await pool.query("SELECT id, github_id, name, username, image, profile_url FROM users");
        res.json(users);
    } catch (error) {
        console.error("⚠️ Fout bij ophalen gebruikers:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// 🟢 Haal één gebruiker op via ID
export const getUserById = async (req, res) => {
    try {
        const [user] = await pool.query("SELECT id, github_id, name, username, image, profile_url FROM users WHERE id = ?", [req.params.id]);
        if (user.length === 0) return res.status(404).json({ message: "Gebruiker niet gevonden" });

        res.json(user[0]);
    } catch (error) {
        console.error("⚠️ Fout bij ophalen gebruiker:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// 🔹 Voeg een nieuwe gebruiker toe (Gebruikers worden nu via GitHub login toegevoegd)
export const createUser = async (req, res) => {
    return res.status(403).json({ message: "Gebruikers worden aangemaakt via GitHub login" });
};

// 🔹 Update een gebruiker
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, image, profile_url } = req.body;

    try {
        const [result] = await pool.query(
            "UPDATE users SET name = ?, image = ?, profile_url = ? WHERE id = ?",
            [name, image, profile_url, id]
        );

        if (result.affectedRows === 0) return res.status(404).json({ message: "Gebruiker niet gevonden" });

        res.json({ message: "Gebruiker bijgewerkt", id });
    } catch (error) {
        console.error("⚠️ Fout bij updaten gebruiker:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// ❌ Verwijder een gebruiker
export const deleteUser = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM users WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Gebruiker niet gevonden" });

        res.json({ message: "Gebruiker verwijderd" });
    } catch (error) {
        console.error("⚠️ Fout bij verwijderen gebruiker:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// ✅ Correcte exports
export default { getAllUsers, getUserById, createUser, updateUser, deleteUser };
