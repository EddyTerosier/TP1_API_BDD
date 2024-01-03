const db = require("../database/database");

//GET ALL
exports.getAllComments = async (req, res) => {
    try {
        const sql = "SELECT * FROM comment";
        const result = await db.query(sql);
        res.status(200).json(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des commentaires'});
    }
}

//FILTER
exports.getCommentsByUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const result = await db.query("SELECT * FROM comment WHERE id = ?", [userId]);
        res.status(200).json(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Erreur lors de la récupération des commentaires'});
    }
}

exports.getCommentsByTechnology = async (req, res) => {
    const technologyId = req.params.id;
    try {
        const result = await db.query("SELECT * FROM comment WHERE id = ?", [technologyId]);
        res.status(200).json(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Erreur lors de la récupération des commentaires'});
    }
}

exports.getAllCommentsBeforeDate = async (req, res) => {
    const date = req.params.date;
    console.log(date);
    try {
        const result = await db.query("SELECT * FROM comment WHERE creation_date_comment < ?", [date]);
        res.status(200).json(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Erreur lors de la récupération des commentaires'});
    }
}

//CRUD
exports.addComment = async (req, res) => {
    try {
        await db.query(`INSERT INTO comment (content)
                        VALUES ('${req.body.content}')`);
        res.status(200).json("Commentaire ajouté");
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Erreur lors de la création du commentaire'});
    }
}

exports.updateComment = async (req, res) => {
    const id = req.params.id;
    const content = req.body.content;

    await db.query(`UPDATE comment
                    SET content="${content}"
                    WHERE id = ${id}`);
    res.status(200).json("Commentaire modifié");
}

exports.deleteComment = async (req, res) => {
    const id = req.params.id;
    await db.query(`DELETE
                    FROM comment
                    WHERE id = ${id}`);
    res.status(200).json("Commentaire supprimé");
}

