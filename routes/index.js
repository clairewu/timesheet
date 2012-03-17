var project_ctrl = require('../controllers/project');
var task_ctrl = require('../controllers/task');
var sign_ctrl = require('../controllers/sign');

exports.index = function(req, res){
  res.render('index', { title: 'Timesheet' })
};

exports.signup = sign_ctrl.signup;
exports.signin = sign_ctrl.signin;
exports.signout = sign_ctrl.signout;
exports.search_pass = sign_ctrl.search_pass;
exports.reset_pass = sign_ctrl.reset_pass;
exports.change_pass = sign_ctrl.change_pass;

exports.projects = project_ctrl.index;
exports.create_project = project_ctrl.create;
exports.create_task = task_ctrl.create;
exports.edit_project = project_ctrl.edit;
exports.edit_task = task_ctrl.edit;
exports.tasks = task_ctrl.index;

var static_ctrl = require('../controllers/static');
exports.about = static_ctrl.about;

// as one middleware
exports.auth_user = sign_ctrl.auth_user;