// This function sets GA custom variable 1 to the visitor state of Visitor if custom variable 1 is not set to any other visitor state.
function setCV3VS1() {
	var pageTracker = _gat._getTrackerByName();
	var cv3 = pageTracker._getVisitorCustomVar(3);
	if ( (cv3 == undefined) || (cv3 == "") )
		_gaq.push(['_setCustomVar', 3, 'Visitor-type', 'Visitors', 1]);
	else if ( (cv3 != "Visitors") && (cv3 != "Engaged") && (cv3 != "Prospects") && (cv3 != "Activated") && (cv3 != "Customers") )
		_gaq.push(['_setCustomVar', 3, 'Visitor-type', 'Visitors', 1]);
	_gaq.push(['_trackPageview']);
}

// This function sets GA custom variable 1 to the visitor state of Engaged if custom variable 1 is not set to a higher visitor state.
function setCV3VS2() {
	var pageTracker = _gat._getTrackerByName();
	var cv3 = pageTracker._getVisitorCustomVar(3);
	if ( (cv3 == undefined) || (cv3 == "") )
		_gaq.push(['_setCustomVar', 3, 'Visitor-type', 'Engaged', 1]);
	else if ( (cv3 != "Engaged") && (cv3 != "Prospects") && (cv3 != "Activated") && (cv3 != "Customers") )
		_gaq.push(['_setCustomVar', 3, 'Visitor-type', 'Engaged', 1]);
	_gaq.push(['_trackPageview']);
}

// This function sets GA custom variable 1 to the visitor state of Prospects if custom variable 1 is not set to a higher visitor state.
function setCV3VS3() {
	var pageTracker = _gat._getTrackerByName();
	var cv3 = pageTracker._getVisitorCustomVar(3);
	if ( (cv3 == undefined) || (cv3 == "") )
		_gaq.push(['_setCustomVar', 3, 'Visitor-type', 'Prospects', 1]);
	else if ( (cv3 != "Prospects") && (cv3 != "Activated") && (cv3 != "Customers") )
		_gaq.push(['_setCustomVar', 3, 'Visitor-type', 'Prospects', 1]);
	_gaq.push(['_trackPageview']);
}

// This function sets GA custom variable 1 to the visitor state of Activated if custom variable 1 is not set to a higher visitor state.
function setCV3VS4() {
	var pageTracker = _gat._getTrackerByName();
	var cv3 = pageTracker._getVisitorCustomVar(3);
	if ( (cv3 == undefined) || (cv3 == "") )
		_gaq.push(['_setCustomVar', 3, 'Visitor-type', 'Activated', 1]);
	else if ( (cv3 != "Activated") && (cv3 != "Customers") )
		_gaq.push(['_setCustomVar', 3, 'Visitor-type', 'Activated', 1]);
	_gaq.push(['_trackPageview', '/main.aspx']);
}

// This function sets GA custom variable 1 to the visitor state of Customer if custom variable 1 is not already set to Customer.
function setCV3VS5() {
	var pageTracker = _gat._getTrackerByName();
	var cv3 = pageTracker._getVisitorCustomVar(3);
	if ( (cv3 == undefined) || (cv3 == "") )
		_gaq.push(['_setCustomVar', 3, 'Visitor-type', 'Customers', 1]);
	else if (cv3 != "Customers")
		_gaq.push(['_setCustomVar', 3, 'Visitor-type', 'Customers', 1]);
	_gaq.push(['_trackPageview', '/main.aspx']);
}

// This function removes anything after the # in the URL.
function cleanAnchorParameters() {
	var existsAnchor = window.location.hash.indexOf("#");
	if ( (existsAnchor !=- 1) && (location.hostname != "www.replicon.com") )
		window.location.hash = "#";
}