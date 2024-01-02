// REQUIRE
const express = require("express");
const app = express();
const db = require("./database");
const cors = require("cors");

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
// READ
app.get("/comments", async(req,res) => {
    await db.query("SELECT * FROM comment");
        res.status(200).json("Comments");
});

// CREATE
app.post("/add-comment", async (req, res) => {
    await db.query(`INSERT INTO comment (content)
                    VALUES ('${req.body.content}')`);
    res.status(200).json("Commentaire ajouté");
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
    await db.query(`INSERT INTO comment (content)
                    VALUES ('${req.body.content}')`);
    res.status(200).json("Commentaire ajouté");
});




app.listen(8000, function () {
    console.log("Server listening on port 8000");
});

