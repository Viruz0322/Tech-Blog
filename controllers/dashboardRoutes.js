const router = require("express").Router();
const { Post, User, Comment } = require("../models/");
const withAuth = require("../utils/auth");

// TODO - create logic for the GET route for / that renders the dashboard homepage
// It should display all of the posts created by the logged in user
router.get("/", withAuth, async (req, res) => {
  //Find all posts wehre the userId matches the curren user's id
  const postsData = await Post.findAll({ 
    where: { userId: req.session.userId },
        //Also include the user who created each post
    include: [
      {
        model: User,
        attributes: ['username']
      }
    ],
  });
  //convert the postsData to plain objects
  const posts = postsData.map((post) => post.get({ plain: true}));
  console.log(posts);
  res.render("admin-all-posts", { layout: "dashboard", posts });
});

//render the admin-all-posts view and pass in the posts data
router.get('/create', withAuth, async (req, res) => {
  res.render('admin-create-post', { layout: "dashboard" });
})

router.post('/create', withAuth, async (req, res) => {
  try {
  await Post.create({
    title: req.body.title,
    body: req.body.body,
    userId: req.session.userId,
  })

  res.redirect('/dashboard')
  } catch (err) {
    res.status(500).json(err);
  }
})
// TODO - create logic for the GET route for /new that renders the new post page
// It should display a form for creating a new post
router.get('/new', withAuth, async (req, res) => {
  try {
    res.render('new-post', { layout: "dashboard", posts });
  } catch (err) {
    res.status(500).json(err);
  }
});
// TODO - create logic for the GET route for /edit/:id that renders the edit post page
// It should display a form for editing an existing post
router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    // Find the post with the specified ID
    const postData = await Post.findById(req.params.id, {
      raw: true
    });

    if (!postData) {
      res.status(404).json({
        message: 'No post found with this id'
      });
      return;
    }

    res.render('edit-post', { layout: 'dashboard', post: postData });
  } catch (err) {
    res.status(500).json(err)
  }
}); 


module.exports = router;

