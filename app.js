const express = require('express');
const compression = require('compression');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const ejs = require('ejs');

const path = require('path');
const fs = require('fs');
const app = express();

const indexRouter = require('./routes/index');
const helperProvider = require('./helpers/_helperProvider.js');

app.use(compression({ filter: shouldCompress }));
app.use(fileUpload());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
	secret: 'remont vam token',
	saveUninitialized: true,
	resave: true
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/bootstrap'));

app.use('/', indexRouter);

app.post('/send', (req,res) => {	
	let logo = fs.readFileSync(path.resolve('emails/images/logo.png')).toString('base64');

	let userHtml = fs.readFileSync(path.resolve('emails/templates/html.ejs'), 'utf8');
	let adminHtml = fs.readFileSync(path.resolve('emails/admin/html.ejs'), 'utf8');

	let template = ejs.render(userHtml, { image: logo, name: req.body.name });
	let admin = ejs.render(adminHtml, { image: logo, data: JSON.stringify(req.body) });

	helperProvider.sender().send(req.body.email, template, template);
	helperProvider.sender().send('romjay77@gmail.com', admin, admin);

	res.redirect('/');
});

app.use(function(req, res, next) {
    next(createError(404));
});
  
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.render('error');
});

function shouldCompress (req, res) {
	if (req.headers['x-no-compression']) {
		return false
	}
	return compression.filter(req, res)
}

module.exports = app;