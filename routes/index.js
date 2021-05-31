const express = require('express');
const router = express.Router();
const repository = require('../helpers/_repository.js');

/* -------------------GET--------------------- */
router.get('/', function(req, res, next) {
	res.render('index', {
		state: 'index',
		data: repository.cachedData()
	});
});
router.get('/index', function(req, res, next) {
	res.render('index', {
		state: 'index',
		data: repository.cachedData()
	});
});
router.get('/about', function(req, res, next) {
	res.render('index', {
		state: 'about',
		data: repository.cachedData()
	});
});
router.get('/projects', function(req, res, next) {
	res.render('index', {
		state: 'projects',
		data: repository.cachedData()
	});
});
router.get('/repair-flat', function(req, res, next) {
	res.render('index', {
		state: 'repair-flat',
		data: repository.cachedData()
	});
});
router.get('/repair-house', function(req, res, next) {
	res.render('index', {
		state: 'repair-house',
		data: repository.cachedData()
	});
});

/* -------------------AJAX--------------------- */
router.get('/index-ajax', function(req, res, next) {
	res.render('partials/main', {
		data: repository.cachedData()
	});
});
router.get('/about-ajax', function(req, res, next) {
	res.render('partials/about', { });
});
router.get('/projects-ajax', function(req, res, next) {
	res.render('partials/projects', {
		data: repository.cachedData()
	});
});
router.get('/repair-flat-ajax', function(req, res, next) {
	res.render('partials/repair-flat', { });
});
router.get('/repair-house-ajax', function(req, res, next) {
	res.render('partials/repair-house', { });
});

router.get('/current-projects-ajax', function(req, res, next) {
	let name = req.query['name'];
	let project = repository.cachedData().projects.find(x => x.dirname === name);
	res.render('layout/_project', project);
});

router.get('/current-design-projects-ajax', function(req, res, next) {
	let name = req.query['name'];
	let project = repository.cachedData().designProjects.find(x => x.dirname === name);
	res.render('layout/_project', project);
});

module.exports = router;