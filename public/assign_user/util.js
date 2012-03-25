/** Convenience functions 
* Depends on the following js files.
*        src="../html/javascript/shared/utilities/rbrowserdetector.js"
* - get/set className via element['className']
*/

/**
* GetElementTargetFromEvent
*
* @param event  javascript event
* @returns element related to the event
* @public
*/
var g_browser=new RBrowserDetector();
function GetElementTargetFromEvent(event)
{
    if(g_browser.msie) return window.event.srcElement;
    else return event.target;
}
/**
* $()
*   can take multiple arguments and will return an array of corresponding elements
*
* @param variable argument of dom id's
* @returns array of getElementById elements
* @public
*/
function $() 
{
    var elements = new Array();

    for (var i = 0; i < arguments.length; i++) 
    {
      var element = arguments[i];

      if (typeof element == 'string') 
      {
        if (document.getElementById) 
        {
          element = document.getElementById(element);
        } 
        else if (document.all) 
        {
          element = document.all[element];
        }
      }

      elements.push(element);
    }

    if (arguments.length == 1 && elements.length > 0) 
    {
      return elements[0];
    } 
    else 
    {
      return elements;
    }
}
/**
* $C
*   create element
*
* @param strElementType
* @returns dom element
* @public
*/
function $C(strElementType) 
{
  return document.createElement(strElementType);
}
/**
* $I
*  get instance
*
* @param instanceId
* @returns instance
* @public
*/
function $I(instanceId)
{
    return RegisterControl.statics.getInstance().getInstanceById(instanceId);
}
/**
* IsNullOrUndefined
*  returns true or false on item
*
* @param item      javascript object
* @returns bool
* @public
*/
function IsNullOrUndefined(item)
{
    if(item == null || item == undefined) return true;
    else return false;
}
/**
* StopPropagationFromEvent
*
* @param event         javascript event
* @public
*/
function StopPropagationFromEvent(event)
{
	if(event.stopPropagation) 
    {
        event.stopPropagation();
    }
    else if(!window.event.cancelBubble) 
    {
	    window.event.cancelBubble = true;
    }
}
/**
* ExtractIFrameBody
*   given an IFrame element, return the body contents
*
* @param iFrameElement      iframe dom element
* @returns body             from the IFrame document
* @public
*/
function ExtractIFrameBody(iFrameElement) 
{
  var doc = null;
  if (iFrameElement.contentDocument) // For NS6
  { 
    doc = iFrameElement.contentDocument; 
  } 
  else if (iFrameElement.contentWindow) // For IE5.5 and IE6
  { 
    doc = iFrameElement.contentWindow.document;
  } 
  else if (iFrameElement.document) // For IE5
  { 
    doc = iFrameElement.document;
  } 
  else 
  {
    alert("Error: could not find iFrame document");
    return null;
  }
  return doc.body;
}
/**
* InsertAfter
*
* @param parent         parent dom element
* @param node           dom element to insert
* @parem referenceNode  dom element to insert after
* @returns array of found elements
* @public
*/
function InsertAfter(parent, node, referenceNode) 
{
    parent.insertBefore(node, referenceNode.nextSibling);
}
/**
* PrependChild
*/
function PrependChild(parent, node) 
{
    parent.insertBefore(node, parent.firstChild);
}
/**
* GetElementsByClassName
*   returns all elements of a specified className
*
* @param className class name
* @returns array of found elements
* @public
*/
function GetElementsByClassName(className) 
{
    var results = [];
    var regEx = new RegExp('\\b' + className + '\\b');
    var allElements = document.getElementsByTagName("*");
    
    for(var i=0,j=allElements.length; i<j; i++)
        if(regEx.test(allElements[i]['className'])) 
            results.push(allElements[i]);

    return results;
}
/**
* setClassName
*   add class name to element if one does not exist
*
* @param element      dom element
* @param strClassName class name
* @public
*/
function SetClassName(element, strClassName)
{
    var tokenArray = tokenize(element["className"], ' ', true);
    for(var i=0; i<tokenArray.length; i++)
    {
        if(tokenArray[i] == strClassName) break;
    }
    
    if(i == tokenArray.length)
    {
        // strClassName does not exist
        tokenArray[tokenArray.length] = strClassName;
        element["className"] = tokenArray.join(' ');
    }
}
/**
* UnsetClassName
*   remove all instances of strClassName from element
*
* @param element      dom element
* @param strClassName class name
* @public
*/
function UnsetClassName(element, strClassName)
{
    var bModified = false;
    var tokenArray = tokenize(element["className"], ' ', true);
    for(var i=0; i<tokenArray.length; i++)
    {
        if(tokenArray[i] == strClassName) 
        {
            bModified = true;
            tokenArray[i] = '';
        }
    }
    
    if(bModified)
    {
        element["className"] = tokenArray.join(' ');
    }
}
/**
* IsClassName
*
* @param element      dom element
* @param strClassName class name
* @returns true if element has strClassName
* @public
*/
function IsClassName(element, strClassName)
{
    var bExists = false;
    var tokenArray = tokenize(element["className"], ' ', true);
    for(var i=0; i<tokenArray.length; i++)
    {
        if(tokenArray[i] == strClassName) 
        {
            bExists = true;
            break;
        }
    }
    return bExists;
}

/**
* ObjectToJsonString
*   converts a javascript object into a json string
*
* @returns jsonString
* @public
*/
function ObjectToJsonString(obj) 
{
    if (obj==null) return null;
    
    switch(typeof(obj)) 
    {
        case 'object': 
        {
            var strJson = "";
            for (key in obj) {
                strJson += ", [" + key + "]: [" + obj[key] + "]";
            }
            if (strJson.length > 0) 
            {
                strJson = strJson.substring(2); // strip first occurance of ', '
            }
            return strJson;
        }
        default: 
            return "" + obj;
    }
}
/**
 * IsCursorAtStart
 *
 * @param inputNode	dom element
 * @param doc document context
 * @returns bool
 * @public
 */
function IsCursorAtStart(inputNode,doc)
{
    if(IsNullOrUndefined(doc))
        doc = document;
        
    var retval = false;
    if (!document.selection) 
    {
        // assume firefox
        if(inputNode.selectionStart <= 0) 
            retval = true;
    }
    else
    {
        // assume MSIE
        var inputRange = inputNode.createTextRange();
        var range = doc.selection.createRange();
        
        if(inputRange.compareEndPoints("StartToStart", range) == 0)
            retval = true;        
    }    
    
    return retval;
}
/**
 * IsCursorAtEnd
 *
 * @param inputNode	dom element
 * @param doc document context
 * @returns bool
 * @public
 */
function IsCursorAtEnd(inputNode,doc)
{
    if(IsNullOrUndefined(doc))
        doc = document;
        
    var retval = false;
    if (!document.selection) 
    {
        // assume firefox
        if(inputNode.selectionEnd >= inputNode.value.length) 
            retval = true;
    }
    else
    {
        // assume MSIE
        var inputRange = inputNode.createTextRange();
        var range = doc.selection.createRange();
        
        if(inputRange.compareEndPoints("EndToEnd", range) == 0)
            retval = true;   
    }    
    
    return retval;
}
/**
 * GetCaretPosition
 *
 * @param inputNode	dom element
 * @param doc document context
 * @returns bool
 * @public
 */
 function GetCaretPosition (inputNode,doc) 
 {
	var caretPos = 0;
	// IE Support
	if (document.selection) 
    {
		inputNode.focus ();
		var sel = document.selection.createRange();

		sel.moveStart ('character', -inputNode.value.length);

		caretPos = sel.text.length;
	}
	// Firefox support
	else if (inputNode.selectionStart || inputNode.selectionStart == '0')
		caretPos = inputNode.selectionStart;

	return caretPos;

}

/**
 * SetCaretPosition
 *
 * @param inputNode	dom element
 * @param doc document context
 * @returns bool
 * @public
 */
function SetCaretPosition(inputNode, pos)
{
	if(inputNode.setSelectionRange)
	{
		inputNode.focus();
		inputNode.setSelectionRange(pos,pos);
	}
	else if (inputNode.createTextRange) 
    {
		var range = inputNode.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
	}
}

/*** QUICKSORT *************************************************************************************/
/**
* swap
*   swaps elements at index1 and index2
*
* @param array
* @param index1
* @param index2
* @private
*/
function swap(array, index1, index2)
{
    var tmp1 = array[index1];
    var tmp2 = array[index2];
    array[index1] = tmp2;
    array[index2] = tmp1;
}
/**
* partition
*   
* @param array
* @param begin
* @param end
* @param pivot
* @param compareFuncContext
* @param compareFunc
* @private
*/
function partition(array, begin, end, pivot, compareFuncContext, compareFunc)
{
	swap(array, pivot, end-1);
    var pivotValueIndex = end-1;
	var store=begin;
	for(var ix=begin; ix<end-1; ++ix) 
	{
		if(compareFunc(compareFuncContext, array, ix, pivotValueIndex))
		{
			swap(array,store,ix);
			++store;
		}
	}
    swap(array,end-1,store);

	return store;
}
/**
* qsort
*
* @param array
* @param begin
* @param end
* @param compareFuncContext
* @param compareFunc
* @private
*/
function qsort(array, begin, end, compareFuncContext, compareFunc)
{
	if(end-1>begin) 
	{
		var pivot=begin+Math.floor(Math.random()*(end-begin));

		pivot=partition(array, begin, end, pivot, compareFuncContext, compareFunc);

		qsort(array, begin, pivot, compareFuncContext, compareFunc);
		qsort(array, pivot+1, end, compareFuncContext, compareFunc);
	}
}
/**
* QuickSort
*   sorts any array given with the given compareFunc
*
* @param array
* @param compareFuncContext
* @param compareFunc
* @public
*/
function QuickSort(array, compareFuncContext, compareFunc)
{
	qsort(array, 0, array.length, compareFuncContext, compareFunc);
}

/*** AJAX ******************************************************************************************/
/**
* CreateXMLHttpRequest
*   Attempt to create an XHR
*
* @returns xhr or null
* @public
*/
function CreateXMLHttpRequest() 
{
  try { return new ActiveXObject("Msxml2.XMLHTTP");    } catch(e) {}
  try { return new ActiveXObject("Microsoft.XMLHTTP"); } catch(e) {}
  try { return new XMLHttpRequest();                   } catch(e) {}
  return null;
}

if (typeof(Sys) != "undefined" && Sys.Application) {
    Sys.Application.notifyScriptLoaded();
}

