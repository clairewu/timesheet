/** 
* REvent
*   - 0-n listeners can be attached to an event
*   - All listeners are called when the event is triggered
*/
REvent = function()
{
    this.m_eventListenerList = new Array();
}
/**
* addEventListener
*/
REvent.prototype.addEventListener = function(listener)
{
    this.m_eventListenerList.push(listener);
}
/**
* removeAll
*/
REvent.prototype.removeAll = function()
{
    this.m_eventListenerList.splice(0, this.m_eventListenerList.length);    
}
/**
* trigger
*/
REvent.prototype.trigger = function()
{
    for (var i=0; i<this.m_eventListenerList.length; i++) 
    {
        this.m_eventListenerList[i].trigger.apply(this.m_eventListenerList[i], arguments);
    }
}



/** REventListener (wrap event listening functions generically)
*   - triggered when an event occurs
*   - context is an optional parameter
*/
REventListener = function(functionCall, context)
{
    this.m_functionCall = functionCall;
    this.m_context = context;
}
/**
* trigger
*/
REventListener.prototype.trigger = function()
{
   this.m_functionCall.apply(this.m_context, arguments);
}
