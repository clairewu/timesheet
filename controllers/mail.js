var mailer = require('nodemailer');
var config = require('../config').config;

mailer.SMTP = {
	debug: true,
	host: config.mail_host,
	port: config.mail_port,
	ssl: true,
	use_authentication: config.mail_use_authentication,
	user: config.mail_user,
	pass: config.mail_pass
};

function send_mail(data,cb){
	console.log(mailer.SMTP);
	mailer.send_mail(data,function(err,success){
		if(err)
			console.log(err);
		return cb(err,success);
	});
}

function send_reset_pass_mail(who,token,name,cb){
	var sender = config.mail_sender;
	var to = who; 
	var subject = config.name + ' Password Reset';
	var html = '<p>Dear user<p/>' +
			   '<p>我们收到您在' + config.name + '重置密码的请求，请单击下面的链接来重置密码：</p>' +
			   '<a href="' + config.host +  ':' + config.port + '/reset_pass?key=' + token + '&name=' + name + '">重置密码链接</a>' +
			   '<p>若您没有在' + config.name + '填写过注册信息，说明有人滥用了您的电子邮箱，请删除此邮件，我们对给您造成的打扰感到抱歉。</p>' +
			   '<p>' + config.name +'谨上。</p>'

	var data = {
		sender: sender,
		to: to,
		subject: subject,
		html: html
	}
	
	send_mail(data,function(err,success){
		return cb(err,success);	
	});
	
}

exports.send_reset_pass_mail = send_reset_pass_mail;
