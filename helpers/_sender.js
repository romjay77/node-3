const nodemailer = require('nodemailer');

exports.send = async (to, html, text) => {		
	let transporter = nodemailer.createTransport({
		host: 'mailbe04.hoster.by',
		port: 465,
		secure: true, 
		auth: {
			user: 'info@fasadni.by',
			pass: '!S@bchuk1',
		},
	});
	
	let info = await transporter.sendMail({
		from: 'info@fasadni.by',
		to: to,
		subject: "Postal service App",
		text: text,
		html: html,
	});

	console.log(`Message sent: ${ info.messageId }`);
	console.log(`Preview URL: ${ nodemailer.getTestMessageUrl(info)}`);
}