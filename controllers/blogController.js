const Blog = require('../models/blog');

const getAllBlogs = (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => res.render('blogs/index', { title: 'All Blogs', blogs: result }))
        .catch(err => consol.log(err));
}

const getOneBlog = (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
        .then(result => res.render('blogs/details', { title: 'Blog Details', blog: result }))
        .catch(err => res.status(404).render('404', { title: 'Blog not found' }));
}

const getBlogCreationForm = (req, res) => res.render('blogs/create', { title: 'Create a new blog' });

const createOneBlog = (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(() => res.redirect('/blogs'))
        .catch(err => console.log(err));
}

const deleteOneBlog = (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
        .then(() => res.json({ redirect: '/blogs'}))
        .catch(err => console.log(err));
}

module.exports = {
    getAllBlogs,
    getOneBlog,
    getBlogCreationForm,
    createOneBlog,
    deleteOneBlog
};