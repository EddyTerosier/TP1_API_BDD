const jwt = require('jsonwebtoken');
const db = require("../Database/database");

exports.isAdmin = (req, res, next) => {
    const token = req.params.token ? req.params.token : req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if(err){
                res.status(401).json({err: "Accès refusé"})
            } 
            else {
                const result = await db.query("SELECT role FROM user WHERE email = ?", [decoded.email])
                console.log(result);
                if(result.length === 2 && result[0][0].role === "admin"){
                    next();
                }
                else {
                    res.status(401).json({err: "Accès refusé vous n'avez pas les droits"})
                }
            }
        });
    } else {
        res.status(401).json({ error: "Token requis" });
    }
};

exports.isJournalistOrAdmin = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ error: "Token invalide" });
            } else if (decoded.role === 'admin' || decoded.role === 'journalist') {
                next();
            } else {
                res.status(403).json({ error: "Accès refusé" });
            }
        });
    } else {
        res.status(401).json({ error: "Token requis" });
    }
};