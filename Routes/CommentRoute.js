// REQUIRE GLOBAL
const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

//ROUTES
router.get("/all-comments", commentController.getAllComments);
router.get("/technology/:technologyId", commentController.getCommentsByTechnology);
router.get("/user/:userId", commentController.getCommentsByUser);
router.get("/before/:date", commentController.getAllCommentsBeforeDate);
router.post("/add-comment", commentController.addComment);
router.put("/comment/:id", commentController.updateComment);
router.delete("/comment/:id", commentController.deleteComment);

module.exports = router;