/**
 * A simple xy Coordinate class and a set of static methods that help in dealing 
 * with them.
 */
function Coordinate(x, y)
{
  this.x = x;
  if (!this.x)
    this.x = 0
  this.y = y;
  if (!this.y)
    this.y = 0
}
Coordinate.Statics = new Object()
Coordinate.Statics.boxModel = true;

/**
 * setup - gathers information to help with Coordinate calculations
 *         determines if the browser properly supports the box model
 */
 Coordinate.Statics.setup = function()
 {
    var div = document.createElement("div");
	div.style.width = div.style.paddingLeft = "1px";

	document.body.appendChild( div );
	Coordinate.Statics.boxModel = div.offsetWidth === 2;
	document.body.removeChild( div ).style.display = 'none';
}

/**
 * findPos - finds the coordinate of the top left of an dom node
 *
 * @parameter obj 	- the object that you want to know coordinate of
 * @returns					-	the coordinate
 */
Coordinate.Statics.findPos = function(obj)
{
  var position = new Coordinate(0, 0);
  var depth = 0;
  var objStyle = obj.currentStyle;
  if (!objStyle)
    objStyle = document.defaultView.getComputedStyle(obj,'');
  if (obj.offsetParent)
  {
    while (obj.offsetParent && (0==depth || ('absolute'!=objStyle.position && 'relative'!=objStyle.position)))
    {
      position.x += obj.offsetLeft;
      position.y += obj.offsetTop;
      obj = obj.offsetParent;
      objStyle = obj.currentStyle;
      if (!objStyle)
        objStyle = document.defaultView.getComputedStyle(obj,'');
      depth += 1;
    }
  }
  else 
  {
    if (obj.x)
      position.x += obj.x;
    if (obj.y)
      position.y += obj.y;
  }
  return position;
}

/**
 * findAbsolutePos - finds absolute the coordinate of the top left of an dom node with respect to the viewport
 *
 * @parameter obj 	- the object that you want to know coordinate of
 * @returns					-	the coordinate
 */
Coordinate.Statics.findAbsolutePos = function(obj)
{
  var position = new Coordinate(0, 0);
  
  var doc = obj.ownerDocument;
  if(!doc) dov = document;
  
  if (obj.getBoundingClientRect)
  {
    var body = doc.body;
    var docElem = doc.documentElement;
    var rect = obj.getBoundingClientRect();
    position.x = rect.left + (self.pageXOffset || Coordinate.Statics.boxModel && docElem.scrollLeft || body.scrollLeft) - (docElem.clientLeft || body.clientLeft || 0);
    position.y = rect.top + (self.pageYOffset || Coordinate.Statics.boxModel && docElem.scrollTop  || body.scrollTop ) - (docElem.clientTop || body.clientTop || 0);
  }
  else
  {
      var offsetParent = null;
      var depth = 0;
      var objStyle = obj.currentStyle;
      if (!objStyle)
        objStyle = doc.defaultView.getComputedStyle(obj,'');
      if (obj.offsetParent)
      {
        offsetParent = obj;
        while (obj.parentNode)
        {
          if('body'==obj.nodeName.toLowerCase())
            break;

          if(obj == offsetParent)
          {
              position.x += obj.offsetLeft;
              position.y += obj.offsetTop;
              offsetParent = obj.offsetParent;
          }
          if(0!=depth)
          {
              position.x -= parseInt(obj.scrollLeft);
              position.y -= parseInt(obj.scrollTop);
          }
          obj = obj.parentNode;
          try{
          objStyle = obj.currentStyle;
          if (!objStyle)
            objStyle = doc.defaultView.getComputedStyle(obj,'');
          } catch (e) {}
          depth += 1;
        }
      }
      else 
      {
        if (obj.x)
          position.x += obj.x;
        if (obj.y)
          position.y += obj.y;
      }
  }
  return position;
}

/**
 * findEventPosition - finds the coordinate of an event
 *
 * @parameter event	- the event that you want to know coordinate of
 * @returns					-	the exent coordinate
 */
Coordinate.Statics.findEventPosition = function(e)
{
  if (!e)
    e = window.event;
  if (!e.target) 
    e.target = e.srcElement;
  var doc = e.target.ownerDocument;
  if(doc)
  {
    var win = doc.defaultView;
  
    var x = e.clientX;
    if (win && win.scrollX)
      x += win.scrollX;
    else
      x = x + doc.documentElement.scrollLeft + doc.body.scrollLeft - 2;
  
    var y = e.clientY;
    if (win && win.scrollY)
      y += win.scrollY;
    else
      y = y + doc.documentElement.scrollTop + doc.body.scrollTop - 2;
  
    return new Coordinate(x, y);
  }
  return new Coordinate(0, 0);
}


Coordinate.Statics.findRelativePos = function(node, relativeNode)
{
    var o = new Coordinate();

    var nodePair = new Coordinate(0, 0);
    var nodeList = new Array();
    while (node != null)
    {
        nodePair = new Coordinate(nodePair.x + node.offsetLeft - node.scrollLeft, nodePair.y + node.offsetTop - node.scrollTop);
        node = node.offsetParent;
        nodeList.push( { node: node, pair: nodePair } );
    }

    var relNodePair = new Coordinate(0, 0);
    var relNodeList = new Array();
    while (relativeNode != null)
    {
        relNodePair = new Coordinate(relNodePair.x + relativeNode.offsetLeft - relativeNode.scrollLeft, relNodePair.y + relativeNode.offsetTop - relativeNode.scrollTop);
        relativeNode = relativeNode.offsetParent;
        relNodeList.push( { node: relativeNode, pair: relNodePair } );
    }
    
    var nodeIndex, nodeCount;
    for (nodeIndex = 1, nodeCount = Math.min(nodeList.length, relNodeList.length); nodeIndex <= nodeCount; nodeIndex++)
        if (nodeList[nodeList.length - nodeIndex].node == relNodeList[relNodeList.length - nodeIndex].node)
            break;
    
    if (nodeIndex <= nodeCount)
    {
        nodePair = nodeList[nodeList.length - nodeIndex].pair;
        relNodePair = relNodeList[relNodeList.length - nodeIndex].pair;

        o.x = nodePair.x - relNodePair.x;
        o.y = nodePair.y - relNodePair.y;
    }

    return o;
}

if(window.addEventListener)
    window.addEventListener('load', Coordinate.Statics.setup, false);
else if(window.attachEvent)
    window.attachEvent('onload', Coordinate.Statics.setup);