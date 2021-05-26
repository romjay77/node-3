const path = require('path');
const fs = require('fs');
const rimraf = require("rimraf");
const repository = require('../helpers/_repository.js');

exports.removeProject = name => {
	rimraf.sync(path.resolve(`public/dist/projects/${ name }`));

    let data = repository.getData();
    data.projects = data.projects.filter(x => x.name !== name)
    repository.setData(data);
}

exports.addProject = (body, files) => {
	let name = body.name.replace(/\s/g, '') + Date.now().toString();
	let local = `public/dist/projects/${ name }`;

	if (fs.existsSync(local)) return;
    fs.mkdirSync(local);

    let project = addProject(local, name, body.description, files);

    let data = repository.getData();
    data.projects.add(project);
    repository.setData(data);
}

function addProject(path, name, desc, files) {
	let result = {};
	result.name = name;
	result.description = desc;

	let namePhotos = [];
	if(Array.isArray(files.photos)) {
		files.photos.forEach(element => {
			let pathtoImg = `${path}/${element.name}`;
			namePhotos.push(pathtoImg.replace('public/', ''));
			if(!fs.existsSync(pathtoImg)) {
				element.mv(pathtoImg, (err) => {
					if(err) console.log(err);
					else console.log('photo saved!');
				});
			}
		});
	} else {
		let pathtoImg = `${path}/${files.photos.name}`;
		namePhotos.push(pathtoImg.replace('public/', ''));
		if(!fs.existsSync(pathtoImg)) {
			files.photos.mv(pathtoImg, (err) => {
				if(err) console.log(err);
				else console.log('photo saved!');
			});
		}
	}

    let nameVideos = [];
	if(Array.isArray(files.videos)) {
		files.videos.forEach(element => {
			let pathVid = `${path}/${element.name}`;
			nameVideos.push(pathVid.replace('public/', ''));
			if(!fs.existsSync(pathVid)) {
				element.mv(pathVid, (err) => {
					if(err) console.log(err);
					else console.log('video saved!');
				});
			}
		});
	} else {
		let pathVid = `${path}/${files.videos.name}`;
		nameVideos.push(pathVid.replace('public/', ''));
		if(!fs.existsSync(pathVid)) {
			files.videos.mv(pathVid, (err) => {
				if(err) console.log(err);
				else console.log('video saved!');
			});
		}
	}

	result.images = namePhotos;
	result.videos = nameVideos;
	return result;
}