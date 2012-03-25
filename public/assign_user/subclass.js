/**
  *   Retrieves the name of a function from a function object.
  *
  *   NOTE: This should be in another location. Not sure where, however.
  *
  *   Firefox has a .name object, but IE does not. This makes it nicer to look at.
  *
  *   @param  functionObject  The functionObject you want the name of
  */
function GetFunctionObjectName(functionObject)
{
    var toReturn = functionObject.name;

    if(!toReturn)
    {
        // IE specific.
        toReturn = "" + functionObject

        var startOfBraces = toReturn.indexOf("(");
        var startPosition = "function ".length;

        toReturn = toReturn.substr(startPosition, startOfBraces-startPosition);
    }

    return toReturn;
}

/**
  *   This function will run a parent constructor.
  *
  *   This shouldn't be called from outside a class, or from one
  *   that isn't derived using the subclass function below.
  *
  *   NOTE: This currently only works for direct descendent
  *           inheritance (i.e You can have multiple parents
  *           just not grandparents or above). This is a known
  *           issue.[1]
  *
  *
  *   @param  childClass  The child class name to operate on.
  *   @param  instance    The instance of the class to operate on.
  *   @param  parentName  This is the parent to run, by name. Must exist in this.parents
  *
  *
  *   [1]- We use 'call' which superimposes the 'this' pointer. I need to do something
  *        nifty to get it to work with grandfathers.. Probably create an actual class of
  *        type parentName, and do some nifty stuff therein.
  */
function CallParent(instance, parentName)
{

    parentInstance = eval("new " + parentName + "()");

    for(var property in parentInstance)
    {
		if (instance[property] == null)
          instance[property] = parentInstance[property];
    }

}

/**
  *   This sets up standard subclassing: your methods will override this,
  *   if you call it before your class, or after, if you call it after
  *   definition.
  *
  *
  *   @param childClass    This is the child class
  *   @param ...           One or more classes to subclass off of.
  */
function subclass(childClass /*, ... */)
{
    if (arguments.length>1)
    {

        if(!childClass.statics)
            childClass.statics = new Object();

        childClass.statics.parents = {};

        // iterate over arguments, which should be parent classes
        for (var i=1;
             i<arguments.length;
             i++)
        {
            parentPrototype = arguments[i].prototype;

            // associate parent method with child
            for (var property in parentPrototype)
            {
                childClass.prototype[property]=parentPrototype[property];
            }

            // Add the parents to the list of parents.
            childClass.statics.parents[GetFunctionObjectName(arguments[i])] = arguments[i];
        }

        // Assign a function
        childClass.prototype["parent"] = function(parentName){ CallParent(this, parentName); };
    }

}