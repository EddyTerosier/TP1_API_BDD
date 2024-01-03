// REQUIRE
const express = require("express");
const app = express();
const db = require("./database");
const cors = require("cors");
const bcrypt = require('bcrypt');


// Middleware
app.use(express.json());
app.use(cors());

// ROUTES

//HOME
app.get("/", (req,res) => {
    res.status(200, {"cotent-Type": "text/html; charset=UTF-8"}).send("<h1>Home</h1>");
})


// USERS CRUD
// READ
app.get("/users", async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM user");
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des utilisateurs' });
    }
});

app.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    const [rows] = await db.query(`SELECT * FROM user WHERE id=${id}`);
    res.status(200).json(rows);
});

// CREATE
app.post("/add-user", async (req, res) => {
  const lastname = req.body.lastname;
  const firstname = req.body.firstname;
  const email = req.body.email;

  await db.query(`INSERT INTO user (lastname, firstname, email) VALUES ("${lastname}", "${firstname}", "${email}")`);
  res.status(200).json("User added");
});

// UPDATE
app.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const email = req.body.email;
  
    await db.query(`UPDATE user SET lastname="${lastname}", firstname="${firstname}", email="${email}" WHERE id=${id}`);
    res.status(200).json("User updated");
});

// DELETE
app.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    await db.query(`DELETE FROM user WHERE id=${id}`);
    res.status(200).json("User deleted");
});


//COMMENTS
app.get("/comments", async(req,res) => {
    await db.query("SELECT * FROM comment");
        res.status(200).json("Comments");
});

app.get("/comments/technology/:technologyId", async (req, res) => {
    const technologyId = req.params.technology_id;
    try {
        const [rows] = await db.query("SELECT * FROM comment WHERE technology_id = ?", [technologyId]);
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des commentaires' });
    }
});

app.get("/comments/user/:userId", async (req, res) => {
    const userId = req.params.user_id;
    try {
        const [rows] = await db.query("SELECT * FROM comment WHERE user_id = ?", [userId]);
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur lors de la récupération des messages' });
    }
});

app.post("/add-comment", async (req, res) => {
    try {
    await db.query(`INSERT INTO comment (content)
                    VALUES ('${req.body.content}')`);
    res.status(200).json("Commentaire ajouté");
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Erreur lors de la création du commentaire' });
    }
});

app.get("/comments/before/:date", async (req, res) => {
    const date = req.params.date;
    try {
        const [rows] = await db.query("SELECT * FROM comment WHERE creation_date_comment < ?", [date]);
        res.status(200).json(rows);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Erreur lors de la récupération des commentaires'});
    }
});
// UPDATE
app.put("/comments/:id", async (req, res) => {
    const id = req.params.id;
    const content = req.body.content;
    
    await db.query(`UPDATE comment SET content="${content}" WHERE id=${id}`);
    res.status(200).json("Commentaire modifié");
});

// DELETE
app.delete("/comments/:id", async (req, res) => {
    const id = req.params.id;
    await db.query(`DELETE FROM comment WHERE id=${id}`);
    res.status(200).json("Commentaire supprimé");
});

// REGISTER
app.post("/register", async (req, res) => {
    try {
        // Génère le sel pour le hachage
        // C'est une chaîne de caractères générée aléatoirement qui est utilisée en conjonction avec le mot de passe lors du processus de hachage
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);

        // Hache le mot de passe
        // Le sel est automatiquement ajouté au mot de passe haché
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // Insère l'utilisateur dans la base de données avec le mot de passe haché
        const [rows] = await db.query(`
            INSERT INTO user (lastname, firstname, email, password)
            VALUES ('${req.body.lastname}', '${req.body.firstname}', '${req.body.email}', '${hashedPassword}')
        `);

        res.status(200).json("Inscription réussie");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur' });
    }
});

// LOGIN
app.post("/login", async (req, res) => {
    try {
        // Récupère l'utilisateur
        const [rows] = await db.query(`SELECT * FROM user WHERE email = '${req.body.email}'`);

        // Vérifie si l'utilisateur existe
        if (rows.length === 0) {
            res.status(401).json({ error: "L'utilisateur n'existe pas" });
            return;
        }

        // Compare le mot de passe avec le mot de passe haché
        const match = await bcrypt.compare(req.body.password, rows[0].password);

        if (!match) {
            res.status(401).json({ error: "Mot de passe incorrect" });
            return;
        }

        res.status(200).json("Connexion réussie");
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Erreur lors de la connexion" });
    }
});

app.listen(8000, function () {
    console.log("Server listening on port 8000");
});
