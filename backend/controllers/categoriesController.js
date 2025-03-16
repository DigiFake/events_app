import pool from "../db.js"; // ✅ MySQL databaseverbinding

// 🟢 Haal alle categorieën op
export const getAllCategories = async (req, res) => {
    try {
        const [categories] = await pool.query("SELECT * FROM categories");
        res.json(categories);
    } catch (error) {
        console.error("⚠️ Fout bij ophalen categorieën:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// 🟢 Haal één categorie op via ID
export const getCategoryById = async (req, res) => {
    try {
        const [category] = await pool.query("SELECT * FROM categories WHERE id = ?", [req.params.id]);
        if (category.length === 0) return res.status(404).json({ message: "Categorie niet gevonden" });

        res.json(category[0]);
    } catch (error) {
        console.error("⚠️ Fout bij ophalen categorie:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// 🔴 Voeg een categorie toe
export const createCategory = async (req, res) => {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Naam is verplicht" });

    try {
        const [result] = await pool.query("INSERT INTO categories (name) VALUES (?)", [name]);
        res.status(201).json({ id: result.insertId, name });
    } catch (error) {
        console.error("⚠️ Fout bij aanmaken categorie:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// 🔴 Update een categorie
export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const [result] = await pool.query("UPDATE categories SET name = ? WHERE id = ?", [name, id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Categorie niet gevonden" });

        res.json({ id, name });
    } catch (error) {
        console.error("⚠️ Fout bij updaten categorie:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// ❌ Verwijder een categorie
export const deleteCategory = async (req, res) => {
    try {
        const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [req.params.id]);
        if (result.affectedRows === 0) return res.status(404).json({ message: "Categorie niet gevonden" });

        res.json({ message: "Categorie verwijderd" });
    } catch (error) {
        console.error("⚠️ Fout bij verwijderen categorie:", error);
        res.status(500).json({ message: "Database error" });
    }
};

// ✅ Correcte exports
export default { getAllCategories, getCategoryById, createCategory, updateCategory, deleteCategory };
