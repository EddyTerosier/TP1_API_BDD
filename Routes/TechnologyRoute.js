// REQUIRE GLOBAL
const express = require("express");
const router = express.Router();
const technologyController = require("../Controllers/TechnologyController");

//ROUTES
router.get("/all-technologies", technologyController.getAllTechnologies);
router.get("/technology/:name", technologyController.getTechnologyByName);
router.get("/technology/:creator", technologyController.getTechnologyByCreator);
router.post("/add-technology", technologyController.addTechnology);
router.put("/technology/:id", technologyController.updateTechnology);
router.delete("/technology/:id", technologyController.deleteTechnology);

module.exports = router;