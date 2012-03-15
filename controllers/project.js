var mysql = require('./mysql')
  , db = mysql.db;

exports.index = function(req, res, next){
	db.query('select * from project order by post_date asc limit 50', function(err, rows) {
        if(err) return next(err);
		res.render('project/index', { title: 'Project', projects: rows});
    });
	
};

exports.create = function(req, res, next){
	var method = req.method.toLowerCase();
	if(method == 'get'){
		res.render('project/edit', {action:'/project/create', title: 'Create a Project' });
	}

	if(method == 'post'){
		//save this record into DB
		var project_name = req.body.project_name;
		var project_leader = req.body.project_leader;
		var project_desc = req.body.project_desc;
		db.query('insert into project(name, leader, description, post_date) values(?, ?, ?, post_date=now())', [project_name, project_leader, project_desc], function(err, result) {
			if(err) return next(err);
		});

		res.redirect('/projects');
	}
};

exports.edit = function(req, res, next){
	var method = req.method.toLowerCase();
	if(method == 'get'){
		//Get the project info
		db.query('select * from project where id = ?', [req.query.project_id], function(err, rows) {
			if(err) return next(err);
			if(rows.length<1){
				res.render('notify/notify',{error: "This project doesn't exist or it has been deleted!"});
				return;	
			}
			res.render('project/edit', { action:'/project/edit', title: 'Edit a Project', project_name: rows[0].name, project_leader: rows[0].leader,
										project_desc: rows[0].description, project_id: rows[0].id});
		});
		
	}

	if(method == 'post'){
		//Update this record into DB
		var project_name = req.body.project_name;
		var project_leader = req.body.project_leader;
		var project_id = req.body.project_id;
		var project_desc = req.body.project_desc;
		db.query('update project ' +
				' set name = ?,' +
					' leader = ?,' +
					' description = ?' +
				' where id = ?', [project_name, project_leader, project_desc, project_id], function(err, result) {
			if(err) return next(err);
		});

		res.redirect('/projects');
	}
};
