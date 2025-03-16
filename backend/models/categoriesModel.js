import pool from "../db.js"; // ✅ MySQL databaseverbinding

// 🟢 Haal alle categorieën op
export const getAllCategories = async () => {
    const [categories] = await pool.query("SELECT * FROM categories");
    return categories;
};

// 🟢 Haal één categorie op via ID
export const getCategoryById = async (id) => {
    const [category] = await pool.query("SELECT * FROM categories WHERE id = ?", [id]);
    return category[0] || null;
};

// 🔹 Voeg een nieuwe categorie toe
export const createCategory = async ({ name }) => {
    const [result] = await pool.query(
        "INSERT INTO categories (name) VALUES (?)",
        [name]
    );

    return result.insertId; // Retourneert het ID van de nieuw toegevoegde categorie
};

// 🔹 Update een categorie
export const updateCategory = async (id, { name }) => {
    const [result] = await pool.query(
        "UPDATE categories SET name = ? WHERE id = ?",
        [name, id]
    );

    return result.affectedRows > 0; // Geeft `true` terug als update succesvol was
};

// ❌ Verwijder een categorie
export const deleteCategory = async (id) => {
    const [result] = await pool.query("DELETE FROM categories WHERE id = ?", [id]);
    return result.affectedRows > 0;
};
