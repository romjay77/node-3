const express = require("express");
const project = require('../helpers/_project.js');
const repository = require('../helpers/_repository.js');

const adminRouter = express.Router();

var _session;
var _data;

adminRouter.get("/", (req, res) => {
    _session = req.session;
    if(_session.login){
        res.render('admin', {
            data: getData()
          });
    } else {
        res.render('login');
    }
});

adminRouter.post("/", (req, res) => {
    _session = req.session;
    let cred = getData().cred;
    _session.login = req.body.login === cred.user && req.body.pass === cred.pass;
    res.redirect('/admin');
});
adminRouter.post("/change-login", (req, res) => {
    let data = getData();
    data.cred.user = req.body.user;
    data.cred.pass = req.body.pass;
    data.phone = req.body.phone;
    data.email = req.body.email;
    repository.setData(data);
    refreshData();
    res.redirect('/admin');
});

adminRouter.post("/remove-project", (req, res) => {
	project.removeProject(req.body.name);
	refreshData();
    res.redirect('/admin');
});
adminRouter.post("/add-project", (req, res) => {
	project.addProject(req.body, req.files);
	refreshData();
	res.redirect('/admin');
});
adminRouter.post("/logOut", (req, res) => {
	_session = req.session;
	_session.login = false;
	res.redirect('/');
}); 

function getData() {
    if (!_data) {
        _data = repository.getData();
    }    
    return _data;
}

function refreshData() {
    _data = repository.getData();
}

module.exports = adminRouter;