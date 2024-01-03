const db = require("../database/database");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUser = async (req, res) => {
    const id = req.params.id;
    const sql = (`SELECT *
                  FROM user
                  WHERE id = ${id}`);
    const result = await db.query(sql);
    res.status(200).json(result[0]);
}

exports.getAllUsers = async (req, res) => {
    try {
        const sql = "SELECT * FROM user";
        const result = await db.query(sql);
        res.status(200).json(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des utilisateurs'});
    }
}

exports.updateUser = async (req, res) => {
    const id = req.params.id;
    const lastname = req.body.lastname;
    const firstname = req.body.firstname;
    const email = req.body.email;
    const password = req.body.password;

    const hashPassword = await bcrypt.hash(password, 10);
    await db.query(`UPDATE user
                    SET lastname="${lastname}",
                        firstname="${firstname}",
                        email="${email}",
                        password="${hashPassword}"
                    WHERE id = ${id}`);
    res.status(200).json("User updated");
}

exports.removeUser = async (req, res) => {
    const id = req.params.id;
    await db.query(`DELETE
                    FROM user
                    WHERE id = ${id}`);
    res.status(200).json("User deleted");
}

exports.register = async (req, res) => {
    //verifier l'email de l'utilisateur
    const {email, password} = req.body;
    const result = await db.query(`SELECT *
                                   FROM user
                                   WHERE email = ?`, [email]);
    if (result.length[0] > 0) {
        return res.status(400).json({error: "Email déjà utilisé"});
    }
    //utiliser bcrypt pour hasher le mot de passe
    const hashPassword = await bcrypt.hash(password, 10);

    // envoyer les données dans la base de données (ave le mot de passe hashé)
    await db.query('INSERT INTO user (email, password, role) VALUES (?, ?, ?)', [email, hashPassword, "user"]);

    // utilisation de jwt token pour la signature
    const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '24h'})
    res.json({token});

}
exports.login = async (req, res) => {
    // verifier l'email de l'utilisateur & le mot de passe
    const {email, password} = req.body;
    const result = await db.query(`SELECT *
                                   FROM user
                                   WHERE email = ?`, [email]);
    if (result.length[0] === 0) {
        return res.status(400).json({error: "Email ou mot de passe incorrect"});
    }
    const user = result[0][0];

    // comparer le mot de passe avec celui de la base de données avec bcrypt
    const samePassword = await bcrypt.compare(password, user.password);
    if (!samePassword) {
        return res.status(400).json({error: "Email ou mot de passe incorrect"});
    }

    // si tout est ok, on utilise jwt token pour la signature
    const token = jwt.sign({email}, process.env.SECRET_KEY, {expiresIn: '24h'})
    res.json({token});

}
