import passport from "passport";
import GitHubStrategy from "passport-github2";
import pool from "../db.js";
import dotenv from "dotenv";

dotenv.config();

passport.use(
    new GitHubStrategy(
        {
            clientID: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackURL: "http://localhost:3000/auth/github/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log("🔍 GitHub Profile Data:", profile);

                const github_id = profile.id;
                const username = profile.username;
                const name = profile.displayName || username; // Fix voor NULL name
                const image = profile.photos?.[0]?.value || null;
                const profile_url = profile.profileUrl;

                // ✅ Check of gebruiker al in database staat
                const [existingUser] = await pool.query(
                    "SELECT * FROM users WHERE github_id = ?",
                    [github_id]
                );

                if (existingUser.length === 0) {
                    // ✅ Nieuwe gebruiker opslaan
                    await pool.query(
                        "INSERT INTO users (github_id, name, username, image, profile_url) VALUES (?, ?, ?, ?, ?)",
                        [github_id, name, username, image, profile_url]
                    );
                }

                // ✅ Gebruiker teruggeven
                return done(null, { github_id, username, name, image, profile_url });
            } catch (error) {
                console.error("⚠️ Fout bij opslaan gebruiker:", error);
                return done(error);
            }
        }
    )
);

// ✅ Gebruiker in sessie opslaan
passport.serializeUser((user, done) => {
    console.log("💾 Serializing user:", user);
    done(null, user.github_id);
});

// ✅ Gebruiker uit sessie halen
passport.deserializeUser(async (github_id, done) => {
    try {
        const [user] = await pool.query("SELECT * FROM users WHERE github_id = ?", [github_id]);
        console.log("🔄 Deserializing user:", user[0]);
        done(null, user[0]);
    } catch (error) {
        done(error);
    }
});

export default passport;
