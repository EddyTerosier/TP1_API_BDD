// REQUIRE GLOBAL
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const middlewareAuth = require("../Middlewares/middleware");
const {authenticator, isAdmin} = require("../Middlewares/middleware");

//ROUTES
router.get("/all-comments", middlewareAuth.authenticator, commentController.getAllComments);
router.get("/technology/:technologyId", middlewareAuth.authenticator, commentController.getCommentsByTechnology);
router.get("/user/:userId", middlewareAuth.authenticator, commentController.getCommentsByUser);
router.get("/before/:date", middlewareAuth.authenticator, commentController.getAllCommentsBeforeDate);
router.post("/add-comment", middlewareAuth.isJournalist, middlewareAuth.isAdmin, commentController.addComment);
router.put("/comment/:id", middlewareAuth.isJournalist, middlewareAuth.isAdmin, commentController.updateComment);
router.delete("/comment/:id", middlewareAuth.isJournalist, middlewareAuth.isAdmin, commentController.deleteComment);

module.exports = router;