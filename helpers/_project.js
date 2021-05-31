const path = require('path');
const fs = require('fs');
const rimraf = require("rimraf");
const repository = require('../helpers/_repository.js');

exports.removeProject = name => {
	rimraf.sync(path.resolve(`public/dist/projects/${ name }`));

    let data = repository.getData();
    data.projects = data.projects.filter(x => x.dirname !== name)
    repository.setData(data);
}

exports.removeDesignProject = name => {
	rimraf.sync(path.resolve(`public/dist/designProject/${ name }`));

    let data = repository.getData();
    data.designProjects = data.designProjects.filter(x => x.dirname !== name)
    repository.setData(data);
}

exports.addDesignProject = (body, files) => {
	let name = Date.now().toString();
	let local = `public/dist/designProject/${ name }`;

	if (fs.existsSync(local)) return;
    fs.mkdirSync(local);

    let project = addProject(local, body.name, body.description, files);
	project.dirname = name;
    let data = repository.getData();
    data.designProjects.push(project);
    repository.setData(data);
}

exports.addProject = (body, files) => {
	let name = Date.now().toString();
	let local = `public/dist/projects/${ name }`;

	if (fs.existsSync(local)) return;
    fs.mkdirSync(local);

    let project = addProject(local, body.name, body.description, files);
	project.dirname = name;
    let data = repository.getData();
    data.projects.push(project);
    repository.setData(data);
}

function addProject(path, name, desc, files) {
	let result = {};
	result.name = name;
	result.description = desc;

	let images = [];
	if(Array.isArray(files.photos)) {
		files.photos.forEach(element => {
			let pathtoImg = `${path}/${element.name}`;
			images.push(pathtoImg.replace('public/', ''));
			if(!fs.existsSync(pathtoImg)) {
				element.mv(pathtoImg, (err) => {
					if(err) console.log(err);
					else console.log('photo saved!');
				});
			}
		});
	} else if (files.photos) {
		let pathtoImg = `${path}/${files.photos.name}`;
		images.push(pathtoImg.replace('public/', ''));
		if(!fs.existsSync(pathtoImg)) {
			files.photos.mv(pathtoImg, (err) => {
				if(err) console.log(err);
				else console.log('photo saved!');
			});
		}
	}

    let videos = [];
	if(Array.isArray(files.videos)) {
		files.videos.forEach(element => {
			let pathVid = `${path}/${element.name}`;
			videos.push(pathVid.replace('public/', ''));
			if(!fs.existsSync(pathVid)) {
				element.mv(pathVid, (err) => {
					if(err) console.log(err);
					else console.log('video saved!');
				});
			}
		});
	} else if (files.videos) {
		let pathVid = `${path}/${files.videos.name}`;
		nameVideos.push(pathVid.replace('public/', ''));
		if(!fs.existsSync(pathVid)) {
			files.videos.mv(pathVid, (err) => {
				if(err) console.log(err);
				else console.log('video saved!');
			});
		}
	}

	result.images = images;
	result.videos = videos;
	return result;
}