//Create web server
//create router object
const express = require('express');
const router = express.Router();
const comments = require('../data/comments');
const recipes = require('../data/recipes');

//get all comments
router.get('/', async (req, res) => {
    try {
        const commentsList = await comments.getAllComments();
        res.json(commentsList);
    } catch (e) {
        res.status(500).send();
    }
});

//get comment by id
router.get('/:id', async (req, res) => {
    try {
        const comment = await comments.getCommentById(req.params.id);
        res.json(comment);
    } catch (e) {
        res.status(404).json({ error: 'Comment not found' });
    }
});

//create new comment
router.post('/', async (req, res) => {
    const commentData = req.body;
    try {
        const { recipeId, poster, comment } = commentData;
        const newComment = await comments.createComment(recipeId, poster, comment);
        res.json(newComment);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

//update comment
router.put('/:id', async (req, res) => {
    const updatedData = req.body;
    try {
        await comments.getCommentById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Comment not found' });
    }

    try {
        const updatedComment = await comments.updateComment(req.params.id, updatedData);
        res.json(updatedComment);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

//delete comment
router.delete('/:id', async (req, res) => {
    try {
        await comments.getCommentById(req.params.id);
    } catch (e) {
        res.status(404).json({ error: 'Comment not found' });
    }

    try {
        const recipe = await recipes.deleteCommentInRecipe(req.params.id);
        const deletedComment = await comments.deleteComment(req.params.id);
        res.json(deletedComment);
    } catch (e) {
        res.status(500).json({ error: e });
    }
});

module.exports = router;

