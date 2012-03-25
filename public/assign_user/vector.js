/**
* This class is a simple vector class.
*/
function Vector()
{
  for (var i=0;i<arguments.length;i++)
    this[i]=arguments[i];
  this.length=i;
}

Vector.prototype.Vector = Vector;


Vector.prototype.copy = function(copyElementFunc)
{
  var d=new Vector();
  d.assign(this,copyElementFunc);
  return d;
}

Vector.prototype.assign = function(src,copyElementFunc)
{
  for (var i=0;i<src.length;i++)
  {
    if (copyElementFunc)
      this[i]=copyElementFunc(src[i]);
    else
      this[i]=src[i];
  }
  this.length = src.length;
}

Vector.prototype.Vector_assign = Vector.prototype.assign;

Vector.prototype.empty = function ()
{
  this.length=0;
}

/**
* Return the number of parameters in the vector.
*/
Vector.prototype.getLength = function()
{
  return this.length;
}

/**
* Get an element by an index i.
*/
Vector.prototype.getElement = function(i)
{
  return this[i];
}

/**
* Set an element by an index i.
*/
Vector.prototype.setElement = function(i,o)
{
  this[i]=o;
}
/**
* Insert an index at a specified location.
*/
Vector.prototype.insertElement = function(index,o)
{
  for (var i=this.length-1;i>=index;i--)
    this[i+1]=this[i];
  this[index]=o;
  this.length++;
}

/**
* This is akin to a push: it places an item at the end of the vector.
*/
Vector.prototype.addElement = function(o)
{
  this[this.length++]=o;
}


/**
* Remove an object by index.
*/
Vector.prototype.deleteElement = function(index)
{
  for (var i=index;i<this.length;i++)
    this[i]=this[i+1];
  this.length--;
}
Vector.prototype.sort = function(s)
{
  var a=this.getArray();
  a.sort(s);
  for (var i=0;i<a.length;i++)
    this[i]=a[i];
}
Vector.prototype.Vector_sort = Vector.prototype.sort;
Vector.prototype.reverse = function()
{
  for (var i=0,j=this.length-1;i<j;i++,j--)
  {
    var a=this[i];
    this[i] = this[j];
    this[j] = a;
  }
}
Vector.prototype.Vector_reverse = Vector.prototype.reverse;
Vector.prototype.getArray = function()
{
  var a=new Array();
  for (var i=0;i<this.length;i++)
    a[i]=this[i];
  return a;
}


/**
* Pass through functions, used to make a vector interchangeable with a list.
*/

Vector.prototype.push = function(item)
{
  this.addElement(item);
}