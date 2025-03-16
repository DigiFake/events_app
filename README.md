# Express Events API

## 📌 Over dit project
Dit project is een **Express.js REST API** voor het beheren van evenementen. Het ondersteunt **JWT-authenticatie, GitHub OAuth-login, en een MySQL-database**.

---

## 🚀 **Installatie & Setup**
### **1. Clone de repository**
```sh
git clone https://github.com/DigiFake/events_app.git
cd events_app
```

### **2. Installeer de benodigde dependencies**
```sh
npm install
```

### **3. Maak een .env bestand aan**
Maak een `.env` bestand in de root en voeg de volgende variabelen toe:
```env
PORT=3000
SESSION_SECRET=supersecret
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=events_db
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

> **Let op**: Zorg ervoor dat `GITHUB_CLIENT_ID` en `GITHUB_CLIENT_SECRET` correct zijn ingesteld in je GitHub OAuth-applicatie.

### **4. Importeer de database**
Voer het volgende commando uit in **cmd** om de MySQL-database te importeren:
```sh
mysql -u root -p events_db < events_db.sql
```

### **5. Start de server**
```sh
npm start
```
De API draait nu op **http://localhost:3000** 🎉

---

## 📂 **Project Structuur**
```
backend/
│── config/           # Configuratie (Passport.js, database connectie)
│── controllers/      # Logica voor API-routes
│── middleware/       # Middleware (authenticatie, logging)
│── models/          # MySQL modellen
│── routes/          # API routes (users, events, auth, categories)
│── utils/           # Handige helperfuncties
│── server.js        # Hoofdserverbestand
│── .env.example     # Voorbeeld .env bestand
│── events_db.sql    # Database dump
```

---

## 🔑 **Authenticatie**
Deze API ondersteunt **JWT-authenticatie** en **GitHub OAuth**:
- **/auth/register** → Registreer een nieuwe gebruiker
- **/auth/login** → Log in en ontvang een JWT-token
- **/auth/github** → Log in met GitHub OAuth
- **/auth/profile** → Verkrijg profielgegevens van een ingelogde gebruiker
- **/auth/logout** → Log uit

### **Hoe gebruik je JWT-authenticatie?**
1. **Registreer een gebruiker** via Postman:
```json
{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123"
}
```
2. **Login en ontvang een token**
3. **Gebruik het token in de headers voor beveiligde routes**:
```sh
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 📬 **API Routes**
| Methode | Route               | Beschrijving |
|---------|---------------------|-------------|
| POST    | /auth/register      | Registreert een gebruiker |
| POST    | /auth/login         | Logt een gebruiker in en geeft een JWT-token terug |
| GET     | /auth/profile       | Verkrijgt de ingelogde gebruiker |
| GET     | /auth/github        | Start GitHub OAuth-login |
| GET     | /auth/logout        | Logt de gebruiker uit |
| GET     | /events             | Haalt alle evenementen op (vereist JWT) |
| POST    | /events             | Creëert een nieuw evenement (vereist JWT) |
| GET     | /users              | Haalt alle gebruikers op (vereist JWT) |

---

## 📜 **Licentie**
Dit project is open-source en valt onder de **MIT License**.

