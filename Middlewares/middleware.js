const jwt = require('jsonwebtoken');
const db = require("../Database/database");

exports.authenticator = (req, res, next) => {
    //verifier si le token est présent dans le header
    const token = req.params.token ? req.params.token : req.headers.authorization;
    //decoder => next()
    if (token && process.env.SECRET_KEY) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({error: "Token invalide"})
            } else {
                console.log(decoded);
                next();
            }
        })
    } else {
        res.status(401).json({error: "Accès refusé"})
    }
};

exports.isAdmin = (req, res, next) => {
    const token = req.params.token ? req.params.token : req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                res.status(401).json({err: "Accès refusé"})
            } else {
                const result = await db.query("SELECT role FROM user WHERE email = ?", [decoded.email])
                console.log(result);
                if (result.length === 2 && result[0][0].role === "admin") {
                    next();
                } else {
                    res.status(401).json({err: "Accès refusé vous n'avez pas les droits"})
                }
            }
        });
    } else {
        res.status(401).json({error: "Token requis"});
    }
};

exports.isJournalist = (req, res, next) => {
    const token = req.params.token ? req.params.token : req.headers.authorization;
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                res.status(401).json({err: "Accès refusé"})
            } else {
                const result = await db.query("SELECT role FROM user WHERE email = ?", [decoded.email])
                console.log(result);
                if (result.length === 2 && result[0][0].role === "journalist") {
                    next();
                } else {
                    res.status(401).json({err: "Accès refusé vous n'avez pas les droits"})
                }
            }
        });
    } else {
        res.status(401).json({error: "Token requis"});
    }
};