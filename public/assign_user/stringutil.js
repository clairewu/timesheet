// Utility methods for common string operations

// Return true if the given string is a valid number
function isValidNumber(input)
{
  //check if it is not a number
  if ( isNaN(input) )
     return false;

  //check if it is an empty string
  if ( input == '' )
     return false;

  //check if it is a blank string
  for (var i=0; i<input.length; i++)
  {
     if ( input.charAt(i) != ' ' )
	return true;
  }
  return false;
}


// to escape the ""(quotation mark) and &(ampsand)
function escapedString(str)
{
  value=String(str);
  var i=0;
  while ((i=value.indexOf('&',i))!=-1)
    value=value.substring(0,i)+"&amp;"+value.substring(++i,value.length);
  var j=0;
  while ((j=value.indexOf('"',j))!=-1)
    value=value.substring(0,j)+"&quot;"+value.substring(++j,value.length);
  return value;
}


// regex is in forward slashes:
// syntax  string = string.replace(/pattern/, 'replace with this');
//    ^        = beginning of line
//    (\s+)?   = one or more characters of whitespace, optional
//    (.*\S)   = any characters, with the last one not being whitespace
//    (\s+)?   = one or more characters of whitespace, optional
//    $        = end of line
//    $2       = what was in the 2nd set of parenthesis
function trim(inputString) 
{
  // Check for all whitespace
  if (isAllSpaces(inputString))
  {
    return "";
  }

  // Removes leading and trailing spaces from the passed string.
  var retValue = inputString;
  retValue = retValue.replace(/^(\s+)?(.*\S)(\s+)?$/, '$2');
  return retValue; // Return the trimmed string back to the user
}


// Return true if the string contains just spaces or is empty
function isAllSpaces(inputValue) {
  if(inputValue.search(/^\s*$/) != -1)
    return true;
  else
    return false;
}

/**
* strip
*   return string without leading spaces
*/
function strip(str) 
{
  return str.replace(/\s+/, "");
}

/**
* tokenize
*   return strArray of tokens
*/
function tokenize(strInput, strSeparator, bTrim, bIgnoreEmptyToken)
{
    var returnArray = new Array();
    if(strInput == null || strInput == '') return returnArray;
    
    var ignoreEmptyTokens = ((bIgnoreEmptyToken!=null) && (bIgnoreEmptyToken!=undefined)) 
        bIgnoreEmptyToken : true;
   
    var tokenArray = strInput.split(strSeparator);
    if(bTrim)
        for(var i=0; i<tokenArray.length; i++)
        {
            tokenArray[i] = trim(tokenArray[i]);
        }
    
    if(ignoreEmptyTokens)
    {
        for(var i=0; i<tokenArray.length; i++)
          if(tokenArray[i] != "")
            returnArray[returnArray.length] = tokenArray[i];
    }
    else
    {
        returnArray = tokenArray;
    }
    
    return returnArray;
}

function getQueryStringValue( key )
{
    key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+key+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        return "";
    else
        return results[1];
}

if (typeof(Sys) != "undefined" && Sys.Application) {
    Sys.Application.notifyScriptLoaded();
}


