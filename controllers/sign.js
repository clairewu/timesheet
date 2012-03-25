var check = require('validator').check,
	sanitize = require('validator').sanitize;

var crypto = require('crypto');
var config = require('../config').config;

var mysql = require('./mysql')
  , db = mysql.db;

var mail_ctrl = require('./mail');

//sign up
exports.signup = function(req,res,next){
	var method = req.method.toLowerCase();
	if(method == 'get'){
		res.render('sign/signup', {title:'Registor'});
		return;
	}
	if(method == 'post'){
		var name = sanitize(req.body.name).trim();
		name = sanitize(name).xss();
		var loginname = name.toLowerCase();
		var pass = sanitize(req.body.pass).trim();
		pass = sanitize(pass).xss();
		var email = sanitize(req.body.email).trim();
		email = email.toLowerCase();
		email = sanitize(email).xss();
		var re_pass = sanitize(req.body.re_pass).trim();
		re_pass = sanitize(re_pass).xss();
		
		if(name == '' || pass =='' || re_pass == '' || email ==''){
			res.render('sign/signup', {title:'Registor', error:'Incomplete information.',name:name,email:email});
			return;
		}

		if(name.length < 5){
			res.render('sign/signup', {title:'Registor', error:'Username should have at least 5 characters.',name:name,email:email});
			return;
		}

		try{
			check(name, 'Username can only use 0-9，a-z，A-Z。').isAlphanumeric();
		}catch(e){
			res.render('sign/signup', {title:'Registor', error:e.message,name:name,email:email});
			return;
		}

		if(pass != re_pass){
			res.render('sign/signup', {title:'Registor', error:'Inconsistent passwords',name:name,email:email});
			return;
		}
			
		try{
			check(email, 'Wrong email').isEmail();
		}catch(e){
			res.render('sign/signup', {title:'Registor', error:e.message,name:name,email:email});
			return;
		}
		
		db.query('select * from user where username = ? or email = ?', [loginname, email], function(err, rows) {
			if(err) return next(err);
			if(rows.length>0){
				res.render('sign/signup', {error:'Username or email is already registored.',name:name,email:email});
				return;	
			}
			// md5 the pass
			pass = md5(pass);
  
			db.query('insert into user(username, password, email, post_date) values(?, ?, ?, post_date=now())', [name, pass, email], function(err, result) {
				if(err) return next(err);
				res.render('sign/signup', {success:'Welcome ' + loginname});
			});		
		});
	}
};

//sign in
exports.signin = function(req,res,next){
	var method = req.method.toLowerCase();
	if(method == 'get'){
		res.render('sign/signin', {title:'Login'});
		return;
	}
	if(method == 'post'){
		var name = sanitize(req.body.name).trim();
		var loginname = name.toLowerCase();
		var pass = sanitize(req.body.pass).trim();
		
		if(name == '' || pass ==''){
			res.render('sign/signin', {error:'Incomplete information'});
			return;
		}

		db.query('select * from user where username = ? ', [loginname], function(err, rows) {
			if(err) return next(err);
			if(rows.length<=0){
				res.render('sign/signin', {error:'This user does not exist'});
				return;	
			}
			pass = md5(pass);
			if(pass != rows[0].password){
				res.render('sign/signin', {error:'Wrong password'});
				return;
			}
  
			// store session cookie
			gen_session(rows[0],res);
			res.redirect('home');	
		});
	}
};

// sign out
exports.signout = function(req,res,next){
	req.session.destroy();
	res.clearCookie(config.auth_cookie_name, {path: '/'});
	res.redirect('home');
};

exports.search_pass = function(req,res,next){
	var method = req.method.toLowerCase();
	if(method == 'get'){
		res.render('sign/search_pass', {title:'Registor'});
	}
	if(method == 'post'){
		var email = req.body.email;
		email = email.toLowerCase();

		try{
			check(email, 'Wrong email').isEmail();
		}catch(e){
			res.render('sign/search_pass', {error:e.message,email:email});
			return;
		}

		db.query('select * from user where email = ? ', [email], function(err, rows) {
			if(err) return next(err);
			if(rows.length<=0){
				res.render('sign/search_pass', {error:'Input email does not exist',email:email});
				return;	
			}
			mail_ctrl.send_reset_pass_mail(email,md5(email+config.session_secret),rows[0].username,function(err,success){
				res.render('notify/notify',{success: 'We have sent you a email to your registered email. Please click the link to reset your password.'});
			});
		});
	}	
}

exports.reset_pass = function(req,res,next){
	var key = req.query.key;
	var name = req.query.name;

	db.query('select * from user where username = ? ', [name], function(err, rows) {
		if(rows.length<=0 || md5(rows[0].email+config.session_secret) != key){
			res.render('notify/notify',{error: 'Wrong information. Can not reset password'});
			return;
		}
		var pass = md5('timesheet');
		db.query('update user set password = ? where username = ? ', [pass, name], function(err){
			res.render('notify/notify',{success: 'Your password has been reset to timesheet. Please login right now to change your password.'});
		});	
	});
}

exports.change_pass = function(req,res,next){
	if(!req.session.user){
		res.redirect('home');
		return;
	}
	var method = req.method.toLowerCase();
	if(method == 'get'){
		res.render('sign/change_pass');
	}
	
	if(method == 'post'){
		var name = req.session.user.username;
		
		db.query('select * from user where username = ? ', [name], function(err, rows) {
			if(err) return next(err);
			if(rows.length<=0){
				res.render('notify/notify',{error: 'Wrong information. Can not change password'});
				return;
			}
			
			var old_pass = sanitize(req.body.old_pass).trim();
			var new_pass = sanitize(req.body.new_pass).trim();
			
			/*var md5sum = crypto.createHash('md5');
			md5sum.update(old_pass);
			old_pass = md5sum.digest('hex');*/
			old_pass = md5(old_pass);

			if(old_pass != rows[0].password){
				res.render('sign/change_pass', {error:'Incorrect current password'});
				return;
			}

			/*md5sum = crypto.createHash('md5');
			md5sum.update(new_pass);
			new_pass = md5sum.digest('hex');*/
			new_pass = md5(new_pass);
			db.query('update user set password = ? where username = ? ', [new_pass, name], function(err){
				if(err) return next(err);
				res.render('sign/change_pass', {success:'Password has been changed.'});
				return;
			});			
		});
	}
}

// auth_user middleware
exports.auth_user = function(req,res,next){
	if(req.session.user){
		res.local('current_user',req.session.user);
		return next();
	}else{
		var cookie = req.cookies[config.auth_cookie_name];
		if(!cookie) return next();

		var auth_token = decrypt(cookie, config.session_secret);
		var auth = auth_token.split('\t');
		var loginname = auth[0];
		db.query('select * from user where username = ? ', [loginname], function(err, rows) {
			if(err) return next(err);
			if(rows.length<=0){
				return next();	
			}
			req.session.user = rows[0];
			res.local('current_user',req.session.user);
			return next();
		});
	}
};

// private
function gen_session(user,res){
	var auth_token = encrypt(user.username + '\t' + user.password +'\t' + user.email, config.session_secret);
	res.cookie(config.auth_cookie_name, auth_token, {path: '/',maxAge: 1000*60*60*24*7}); //cookie period of validity: 1 week
}
function encrypt(str,secret){
   var cipher = crypto.createCipher('aes192', secret);
   var enc = cipher.update(str,'utf8','hex');
   enc += cipher.final('hex');
   return enc;
}
function decrypt(str,secret){
   var decipher = crypto.createDecipher('aes192', secret);
   var dec = decipher.update(str,'hex','utf8');
   dec += decipher.final('utf8');
   return dec;
}
function md5(str){
	var md5sum = crypto.createHash('md5');
	md5sum.update(str);
	str = md5sum.digest('hex');
	return str;
}

exports.md5=md5;