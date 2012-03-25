/* This file will provide functions to deal with form elements.
**
*/

//! This global variable is used to decree the last field that is to be focused on.
var focusfield;

/**
*   This will return the nodeid of the of the field named 'name', on the given 'form'.
*
*   @param name                 The name of the item to get
*   @param form                 The name of the form to iterate over
*   @param createIfNotFound     An optional flag (true/false) that tells us to create if not found. (Creates hidden)
*/
function GetFieldNamed( name, form, createIfNotFound )
{
    // 
    if(form == undefined)
    {
        alert("(Internal Issue) Form parameter passed in is invalid!");
        return;
    }

    // Find the control
    var field = form.elements[name];
    if (null != field)
    {
        if (field.name == undefined)
        {
            // In the case of duplicate elements, return the first one.
            // Determine this is a nodeList by object detection, IE does not 
            // admit the NodeList object exists.  All form controls _must_ 
            // have a name attribute, but NodeList does not have one.
            // AB>>> I assume this list is in the same order as form.elements.
            field = field[0];
        }
        if (null != field)
        {
            return field;
        }
    }

    // Create the control if it is not found
    if(createIfNotFound)
    {
        var ourNewNode = document.createElement("INPUT");

        //! \todo Make hiding optional?
        ourNewNode.style["display"]  = "none";
        ourNewNode.name = name;

        form.appendChild(ourNewNode);


        return ourNewNode;
    }

    // return 'undefined' if the field is not found
    return;
}

/**
*   This will end up setting the value for the node.
*
*   @param name             The name of the node to set
*   @param newValue         The value to set
*   @param form             The form to search in
*   @param createIfNotFound (Optional) Create the node if unable to find.
*/
function SetFieldValue( name, newValue, form, createIfNotFound)
{
    var field = GetFieldNamed( name, form, createIfNotFound);

    if(field != undefined)
        field.value = newValue;
}

function GetFieldValue( name, form)
{
  return GetFieldNamed( name, form ).value;
}

function ChangeFieldName( name, newName, form)
{
  GetFieldNamed( name, form ).name = newName;
}

function EnableFieldNamed( name, form )
{
  GetFieldNamed( name, form ).disabled = false;
}

function DisableFieldNamed( name, form )
{
  GetFieldNamed( name, form ).disabled = true;
}


/**
*   This returns the value from a dropdown, as it is currently.
*/
function GetDropdownValue(name, form)
{
  var field = GetFieldNamed(name, form);
  return field.options[field.selectedIndex].value;
}

/**
*   This will retrieve a dropdown's value.
*
*   @note   HUGE MISNOMER! This should be fixed, post release!
*   @bug
*/
function GetCheckboxValue(name, form)
{
  if (form[name])
  {
    var field = GetFieldNamed(name, form);
    if(field && 0<field.options.length)
      return field.options[field.selectedIndex].value;
  }
  return "";
}

/**
*   This function will ACTUALLY return a checkbox's value.
*/
function GetCheckboxValue_REMOVEME(name, form)
{
    if (form[name])
    {
        var field = GetFieldNamed(name, form);

        return field.checked == true;
    }
}


