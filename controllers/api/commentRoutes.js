
const router = require('express').Router();
const { Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

// TODO - create a POST route for creating a new comment
// This should be a protected route, so you'll need to use the withAuth middleware
router.post('/', withAuth, async (req, res) => {
    try {
        console.log(req.body)
        const newComment = await Comment.create({
            body: req.body.content,
            userId: req.session.userId,
            postId: req.body.postId
        })
        res.status(200).render({
            message: 'Comment created successfully'
        });
    } catch (err) {
        res.status(500).json(error);
    }
});

//add delete route 
router.delete('/', withAuth, async (req, res) => {
    try {
        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletedComment) {
            res.status(404).json({
                message: 'No comment with that Id found!'
            });
            return;
        }

        res.status(200).json({
            message: 'Comment deleted successfully!'
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;

