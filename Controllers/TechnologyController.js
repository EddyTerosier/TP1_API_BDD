const db = require("../Database/database");

//GET ALL
exports.getAllTechnologies = async (req, res) => {
    try {
        const sql = "SELECT * FROM technology";
        const result = await db.query(sql);
        res.status(200).json(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Une erreur est survenue lors de la récupération des technologies'});
    }
}

//FILTER
exports.getTechnologyByName = async (req, res) => {
    const technologyName = req.params.name;
    try {
        const result = await db.query("SELECT * FROM technology WHERE name = ?", [technologyName]);
        res.status(200).json(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Erreur lors de la récupération de la technologie'});
    }
}

exports.getTechnologyByCreator = async (req, res) => {
    const creator = req.params.creator;
    try {
        const result = await db.query("SELECT * FROM technology WHERE id = ?", [creator]);
        res.status(200).json(result[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Erreur lors de la récupération de la technologie'});
    }
}

//CRUD
exports.addTechnology = async (req, res) => {
    try {
        await db.query(`INSERT INTO technology (name, creator)
                        VALUES ('${req.body.name}', '${req.body.creator}')`);
        res.status(200).json("Technologie ajoutée");
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Erreur lors de la création de la technologie'});
    }
}

exports.updateTechnology = async (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const creator = req.body.creator;
    const date = req.body.createdAt;

    await db.query(`UPDATE technology
                    SET name="${name}", creator="${creator}", createdAt="${date}"
                    WHERE id = ${id}`);
    res.status(200).json("Technologie modifiée");
}

exports.deleteTechnology = async (req, res) => {
    const id = req.params.id;
    await db.query(`DELETE FROM technology WHERE id = ${id}`);
    res.status(200).json("Technologie supprimée");
}