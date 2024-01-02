// REQUIRE
const express = require("express");
const app = express();
const db = require("./database");
// const cors = require("cors");

// Middleware
app.use(express.json());
// app.use(cors());

// ROUTES

app.get("/", (req, res) => {
  res.status(200, { "cotent-Type": "text/html; charset=UTF-8" }).send("<h1>Home</h1>");
});

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
app.post("/users", async (req, res) => {
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


app.listen(8000, (req, res) => console.log("Server is running on port 8000"));
