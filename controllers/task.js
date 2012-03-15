var mysql = require('./mysql')
  , db = mysql.db;

exports.index = function(req, res, next){
	db.query('select task.id, task.name, task.status_type_id, task.pourcentage_done, project.name project_name' +
		' from task, project where task.project_id=project.id order by task.post_date asc limit 50', function(err, rows) {
        if(err) return next(err);
		res.render('task/index', { title: 'Task', tasks: rows});
    });
	
};

exports.create = function(req, res, next){
	var method = req.method.toLowerCase();
	
	if(method == 'get'){
		res.render('task/edit', { action:'/task/create', title: 'Create a Task', project_id: req.query.project_id });
	}

	if(method == 'post'){
		//save this record into DB
		var task_name = req.body.task_name;
		var project_id = req.body.project_id;
		var task_desc = req.body.task_desc;
		var status_type_id = req.body.status_type_id;
		var pourcentage_done = req.body.pourcentage_done;
		db.query('insert into task(project_id, name, description, post_date, status_type_id, pourcentage_done)' + 
			' values(?, ?, ?, post_date=now(), ?, ?)', [project_id, task_name, task_desc, status_type_id, pourcentage_done], function(err, result) {
			if(err) return next(err);
		});

		res.redirect('/tasks');
	}
};

exports.edit = function(req, res, next){
	var method = req.method.toLowerCase();
	if(method == 'get'){
		//Get the task info
		db.query('select * from task where id = ?', [req.query.task_id], function(err, rows) {
			if(err) return next(err);
			if(rows.length<1){
				res.render('notify/notify',{error: "This task doesn't exist or it has been deleted!"});
				return;	
			}
			res.render('task/edit', { action:'/task/edit', title: 'Edit a Task', task_name: rows[0].name, project_id: rows[0].project_id,
									task_desc: rows[0].description, status_type_id: rows[0].status_type_id, pourcentage_done:rows[0].pourcentage_done, task_id: rows[0].id});
		});
	}

	if(method == 'post'){
		//Update this record into DB
		var task_name = req.body.task_name;
		var task_id = req.body.task_id;
		var task_desc = req.body.task_desc;
		var status_type_id = req.body.status_type_id;
		var pourcentage_done = req.body.pourcentage_done;
		db.query('update task ' +
				' set name = ?,' +
					' description = ?,' +
					' status_type_id = ?,' + 
					' pourcentage_done = ?' +
				' where id = ?', [task_name, task_desc, status_type_id, pourcentage_done, task_id], function(err, result) {
			if(err) return next(err);
		});

		res.redirect('/tasks');
	}
};