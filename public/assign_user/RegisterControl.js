function RegisterControl()
{
  this.instanceMap = new Object();
}
RegisterControl.statics = new Object();
RegisterControl.statics.getInstance = function()
{
  if (RegisterControl.statics.instance == null)
    RegisterControl.statics.instance = new RegisterControl();
  return RegisterControl.statics.instance;
}
RegisterControl.prototype.add = function(instance)
{
  this.instanceMap[instance.getId()] = instance;
}
RegisterControl.prototype.getInstanceById = function(id)
{
  return this.instanceMap[id];
}

RegisterControl.statics.idSeparator = "___";
RegisterControl.statics.decodeId = function(str, array)
{
  var idValues = str.split(RegisterControl.statics.idSeparator);
  
  array.length = 0;
  for (var i=1; i<idValues.length; i++)
    array.push(idValues[i]);

  var instance = RegisterControl.statics.getInstance().getInstanceById(idValues[0]);
  return instance;
}
RegisterControl.statics.encodeId = function(instance, args)
{
  var array = new Array();
  array.push(instance.getId());
  for (var i=1; i<arguments.length; i++)
    array.push(arguments[i]);

  return array.join(RegisterControl.statics.idSeparator);
}