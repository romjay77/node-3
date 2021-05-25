const express = require('express');
const router = express.Router();

/* -------------------GET--------------------- */
router.get('/', function(req, res, next) {
	res.render('index', {
		state: 'index'
	});
});
router.get('/index', function(req, res, next) {
	res.render('index', {
		state: 'index'
	});
});
router.get('/about', function(req, res, next) {
	res.render('index', {
		state: 'about'
	});
});
router.get('/projects', function(req, res, next) {
	res.render('index', {
		state: 'projects'
	});
});
router.get('/repair-flat', function(req, res, next) {
	res.render('index', {
		state: 'repair-flat'
	});
});
router.get('/repair-house', function(req, res, next) {
	res.render('index', {
		state: 'repair-house'
	});
});
router.get('/repair-estate', function(req, res, next) {
	res.render('index', {
		state: 'repair-estate'
	});
});

/* -------------------AJAX--------------------- */
router.get('/index-ajax', function(req, res, next) {
	res.render('partials/main', { });
});
router.get('/about-ajax', function(req, res, next) {
	res.render('partials/about', { });
});
router.get('/projects-ajax', function(req, res, next) {
	res.render('partials/projects', { });
});
router.get('/projects-ajax', function(req, res, next) {
	res.render('partials/projects', { });
});
router.get('/repair-flat-ajax', function(req, res, next) {
	res.render('partials/repair-flat', { });
});
router.get('/repair-house-ajax', function(req, res, next) {
	res.render('partials/repair-house', { });
});
router.get('/repair-estate-ajax', function(req, res, next) {
	res.render('partials/repair-estate', { });
});

router.get('/current-projects-ajax', function(req, res, next) {
	let parameter = req.query['name'];
	
	res.render('layout/_project', {
		name: 'Проетк номер один',
		images: [
			{
				type: 'image',
				src: '/dist/1/about-us.jpg'
			},
			{
				type: 'image',
				src: '/dist/1/flat-background.jpg'
			},
			{
				type: 'image',
				src: '/dist/1/footer-background.jpg'
			},
			{
				type: 'image',
				src: '/dist/1/home-background.jpg'
			}
		],
		videos: [
			{
				type: 'video',
				ext: 'mp4',
				src: '/dist/1/video.mp4'
			}
		]
	});
});

module.exports = router;
