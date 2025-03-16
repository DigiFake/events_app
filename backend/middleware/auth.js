import jwt from "jsonwebtoken";

const requireAuth = (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (req.isAuthenticated()) {
        // ✅ OAuth-gebruiker is al ingelogd
        return next();
    }

    if (!token) {
        return res.status(401).json({ message: "Niet geautoriseerd. Log in met GitHub of JWT." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: "Ongeldige token" });
    }
};

export default requireAuth;
