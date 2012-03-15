var project_ctrl = require('../controllers/project');
var task_ctrl = require('../controllers/task');

exports.index = function(req, res){
  res.render('index', { title: 'Timesheet' })
};

exports.projects = project_ctrl.index;

exports.create_project = project_ctrl.create;
exports.create_task = task_ctrl.create;
exports.edit_project = project_ctrl.edit;
exports.edit_task = task_ctrl.edit;
exports.tasks = task_ctrl.index;