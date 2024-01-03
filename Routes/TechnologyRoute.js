// REQUIRE GLOBAL
const express = require("express");
const router = express.Router();
const technologyController = require("../Controllers/TechnologyController");
const middlewareAuth = require("../Middlewares/middleware");

//ROUTES
router.get("/all-technologies", technologyController.getAllTechnologies);
router.get("/technology/:name", technologyController.getTechnologyByName);
router.get("/technology/:creator", technologyController.getTechnologyByCreator);
router.post("/add-technology",middlewareAuth.isAdmin, technologyController.addTechnology);
router.put("/technology/:id",middlewareAuth.isAdmin, technologyController.updateTechnology);
router.delete("/technology/:id",middlewareAuth.isAdmin, technologyController.deleteTechnology);

module.exports = router;