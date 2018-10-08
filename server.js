const express = require('express');
const hbs = require('hbs');	// viewer engine for handlebar.js
const fs = require('fs');

const port = process.env.PORT || 7000;	// process.env is the node.js thing

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public')); // this is a built-in middleware to server static files
app.use((request, response, next) => {
	var now = new Date().toString();
	var log = `${now}: ${request.method} ${request.url}`;

	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log')
		}
	});
	next();
});	// this is to create your own middleware, the middleware must call next() to mark that middleware is done

// app.use((request, response, next) => {
// 	response.render('maintainence.hbs');	// because we did not call the next(), so it stops here.
// });

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase();
});

app.get('/', (request, response) => {
	// response.send('<h1>Hello Express</h1>');
	// response.send({
	// 	name: 'Andrew'
	// });
	response.render('home.hbs', {
		pageTitle: 'Welcome',
		welcomeMsg: 'Welcome to here'
	})
});

app.get('/about', (request, response) => {
	// response.send('About page');
	response.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/projects', (request, response) => {
	// response.send('About page');
	response.render('projects.hbs', {
		pageTitle: 'Projects Page',
		welcomeMsg: 'This is the projects page'
	});
});

app.get('/bad', (request, response) => {
	response.send({
		errorMessage: 'Bad request'
	});
});

app.listen(port, () => {
	console.log('Server is up on port 7000');
});