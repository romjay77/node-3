// const Email = require('email-templates');
const path = require('path');


// (to, nameCustomer) => {
// 	// let logo = fs.readFileSync(path.resolve('emails/images/logo.png')).toString('base64');
// 	let email = getEmail();	
		
// 	email.send({
// 		template: 'templates',
// 		message: { 
// 			to: to
// 		},
// 		locals: { image: logo, name: nameCustomer }
// 	}).catch(console.error);
// };

exports.send = (template, to, data) => {		
	let email = getEmail();

	email.send({
		template: template,
		message: {
			to: to
		},
		locals: data
	});
};

// exports.getAdmin = () => {
// 	return JSON.parse(fs.readFileSync(path.resolve('public/area/admin/admin.json'))).mail;
// };

function getEmail() {
	return new Email({
		send: true,
		preview: false,
		juice: true,
		message: {
			from: 'info@fasadni.by'
		},
		transport: {
		secure: true,
		host: 'mailbe04.hoster.by',
		port: 465,
			auth: {
				user: 'info@fasadni.by',
				pass: '!S@bchuk1'
			}
		},
		htmlToText: false,
		textOnly: false,
		juiceResources: {
			preserveImportant: true,
			webResources: {
				relativeTo: path.resolve('emails/templates'),
				images: true 
			}
		},
		views: { options: { extension: 'ejs' }}
	});
}