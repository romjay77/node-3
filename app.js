const express = require('express');
const compression = require('compression');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3030;
const app = express();

const indexRouter = require('./routes/index');
// const helperProvider = require('./helpers/_helperProvider.js');

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
	
	// let logo = fs.readFileSync(path.resolve('emails/images/logo.png')).toString('base64');
	// helperProvider.sender().send('templates', req.body.email, { image: logo, name: req.body.name });
	// helperProvider.sender().send('admin', 'romjay77@gmail.com', { image: logo, data: JSON.stringify(req.body) });

	res.redirect('/');
});

app.use((req, res) => {
	res.status(404).redirect('/error.html');
});

function shouldCompress (req, res) {
	if (req.headers['x-no-compression']) {
		return false
	}
	return compression.filter(req, res)
}

app.listen(PORT, () => console.log('app working on http://localhost:3030 port'));