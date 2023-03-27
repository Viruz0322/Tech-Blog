
const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new post
// This should be a protected route, so you'll need to use the withAuth middleware
router.post('/', withAuth, async (req, res) => {
    try {
        //Post.create is what actualy creates the new post in MySQL
        const newPost = await Post.create({
            title: req.body.title,
            body: req.body.body,
            userId: req.body.userId,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// TODO - create a PUT route for updating a post's title or body
// This should be a protected route, so you'll need to use the withAuth middleware
router.put('/update/:id', withAuth, async (req, res) => {
    try {
       const data = Post.update({
        title: req.body.title,
        body: req.body.body
       },
       {
        where: {
            id: req.body.postId
        }
       })

       if (!data) {
        res.status(404).json({
            message: 'No post with that Id found!'
        });
       } else {
        res.status(200).json({
            message: 'Post updated!'
        })
       } 
    } catch (error) {
        res.status(500).json(error);
       }
});

// TODO - create a DELETE route for deleting a post with a specific id
// This should be a protected route, so you'll need to use the withAuth middleware
router.delete('/delete/:id', withAuth, async (req, res) => {
    try {
        const postDelete = await Post.destroy ({
            where: {
                id: req.params.id
            }
        })
        if (!postDelete) {
            res.status(404).json({
                message: 'No post with that Id found'
            })
        } else {
            res.status(200).json({
                message: 'Post deleted!'
            });
        }
    }
})


module.exports = router;
