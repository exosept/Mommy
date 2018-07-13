
///
///  2018.07.02  Mommy Monitor
///
const nodemailer = require('nodemailer');

const express = require('express');

const app = express()

const callws = require('../js/wscall.js');

var transporter = nodemailer.createTransport({
	host: 'smtp.office365.com', // Office 365 server
	port: 587,     // secure SMTP
	secure: false, // false for TLS - as a boolean not string - but the default is false so just remove this completely
	auth: {
		user: 'user,
		pass: 'pass'
	},
	tls: {
		ciphers: 'SSLv3'
	}
});

 // Message object
 let message = {
	// Comma separated list of recipients
	from: 'from',
	to: 'to',

	// Subject of the message
	subject: 'Nodemailer is unicode friendly ✔',

	// plaintext body
	text: 'Hello to myself!',

	// HTML body
	html:
		'<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>' +
		'<p>Here\'s a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>'
	
};

function sendemail(receipient,subject,body) {
	
	let d = new Date();
	message.subject = d + subject;
	message.text = body;

	transporter.sendMail(message, (error, info) => {
		if (error) {
			console.log('Error occurred');
			console.log(error.message);
			return process.exit(1);
		}
	
		// only needed when using pooled connections
		transporter.close();
	});
}
var minutes = 1, the_interval = 2 * 1000 , initial_interval = the_interval, max_interval = the_interval * 10;
let nbLoop = 0;
let errCondition = false;
let cnt = 0;
setInterval(function() {

	 cnt = cnt + 1
	 
	 try {

		callws.WSCALL (function(result,err){

			if (err) {

				if (! errCondition || cnt > nbLoop) {
				
					console.log('caller' + err);
					
					sendemail('','SF Service Down','SF Service Down');
					
					nbLoop = nbLoop + 60;
					cnt = 0;	
				}	
				errCondition = true;
			}
			else {

				console.log('no problem' );

				if (errCondition == true){
					sendemail('','SF Service Back Online','SF Service Ok');
				}
				errCondition = false;
				nbLoop = 0;
				cnt = 0;
			}
		}, '/test/checkdate?CSTPONBR=ABC&CUSTNMBR=ABC' );
		}
	 catch (err) {
		 console.log('caller2' + err);
	 }	
	
	

}, the_interval);

 



 