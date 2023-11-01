// routes/post-routes.js
const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../middleware/auth');



// Create new post
router.post('/', withAuth, async (req, res) => {
    console.log('POST route hit')
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        });

        res.redirect('/posts/latest');
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ]
        });

        const posts = postData.map(post => post.get({ plain: true }));
        res.json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});


// Get a single post by id
router.get('/:id(\\d+)', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username', 'id']
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    }
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with that id! GET' });
            return;
        }

        const post = postData.get({ plain: true });
        console.log(post); // <-- This is where you'd place the code.

        const isAuthor = req.session.user_id === post.user.id;

        console.log("Post's User ID:", post.user.id);

        res.render('post-details', { post, isAuthor })

    } catch (err) {
        console.error('Error:', err)
        res.status(500).json(err);
    }
});

// Fetch post for editing
router.get('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('edit-post', {
            post,
            loggedIn: req.session.loggedIn
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a post by id
router.put('/edit/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});



// Delete a post by id
router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
        await Comment.destroy({
            where: {
                post_id: req.params.id
            }
        })

        const postToDelete = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!postToDelete) {
            res.status(404).json({ message: 'No post found with that id! DELETE' });
            return;
        }

        res.json({ message: 'Post deleted successfully!' });
    } catch (err) {
        console.error("error during deletion idiot", err)
        res.status(500).json(err);
    }
});

router.get('/latest', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            limit: 10  // Limit to the 10 most recent posts, or any number you prefer
        });

        const posts = postData.map(post => post.get({ plain: true }));
        res.render('view-posts', { posts, 
            loggedIn: req.session.loggedIn,
            sessionUserId: req.session.user_id
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;