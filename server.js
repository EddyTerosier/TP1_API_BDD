// REQUIRE
const express = require("express");
const app = express();
const db = require("./database");
// const cors = require("cors");

// Middleware
app.use(express.json());
// app.use(cors());

// ROUTES

app.get("/", (req,res) => {
    res.status(200, {"cotent-Type": "text/html; charset=UTF-8"}).send("<h1>Home</h1>");
})

app.get("/users", (req,res) => {
    db.query("SELECT * FROM user", (err, result) => {
        if (err) {
            console.log(err);
        }
        res.status(200).json(result);
    });
});

app.listen(8000, (req,res) => console.log("Server is running on port 8000"));