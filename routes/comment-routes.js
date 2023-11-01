// routes/comment-routes.js
const router = require('express').Router();
const { Comment } = require('../models');  // Adjust path if needed
const withAuth = require('../middleware/auth');  // Adjust path if needed

router.get('/', async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({});
        res.json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const dbCommentData = await Comment.findAll({
            where: {
                id: req.params.id
            }
        });
        res.json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    if (req.session) {
        try {
            const dbCommentData = await Comment.create({
                content: req.body.content,
                post_id: req.body.post_id,
                user_id: req.session.user_id,
            });
            res.redirect('back');
        } catch (err) {
            console.log(err);
            res.status(400).json(err);
        }
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        const dbCommentData = await Comment.update({
            content: req.body.content  // Adjusted field name
        }, {
            where: {
                id: req.params.id
            }
        });
        if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }
        res.json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async (req, res) => {
    try {
        // Fetch the comment by its ID
        const comment = await Comment.findOne({
            where: {
                id: req.params.id
            }
        });

        // Check if comment exists
        if (!comment) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
        }

        // Check if the user_id associated with the comment matches the user_id from the session
        if (comment.user_id !== req.session.user_id) {
            res.status(403).json({ message: 'You are not authorized to delete this comment' });
            return;
        }

        // Proceed with the deletion
        const dbCommentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });
        
        res.json(dbCommentData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }


});

module.exports = router;