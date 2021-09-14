const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');

// Express app
const app = express();

// Connect to MongoDB
const dbURI = process.env.MONGODB_URI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => app.listen(3000, () => console.log('listening on port 3000...')))
	.catch(err => console.log(err));

// Register view engine
app.set('view engine', 'ejs');

// Middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Basic routes
app.get('/', (req, res) => res.redirect('/blogs'));

app.get('/about', (req, res) => res.render('about', { title: 'About' }));

// Blog routes
app.use('/blogs', blogRoutes);

// 404 page - must be last
app.use((req, res) => res.status(404).render('404', { title: '404' }));