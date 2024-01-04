// REQUIRE GLOBAL
const express = require("express");
const db = require("../Database/database");
const middlewareAuth = require("../Middlewares/middleware");

//REQUIRE ROUTE
const userController = require("../Controllers/UserController");
const router = express.Router();

//ROUTES
router.get("/all-users", middlewareAuth.authenticator, userController.getAllUsers);
router.get("/user/:id", userController.getUser);
router.post("/registration", userController.register);
router.patch("/user/:id", userController.updateUser);
router.delete("/user/:id", userController.removeUser);
router.post("/login", userController.login);

module.exports = router;
