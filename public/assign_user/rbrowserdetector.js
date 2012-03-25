/**
 * RBrowserDetector is for determining what browser a user is using.
 *
 * This gets information off the current running browser and sets various
 * properties. After initializing, the relevant properties you can access
 * are:
 *  The rendering engine:   .gecko, .khtml, .msie, or opera
 *  The browser version:    .majorVersion, .geckoVersion
 *  The browser os:         .os
 *  The javascript version: .jsVersion
 *
 * i.e.: var gBrowser = new RBrowserDetector();
 *       if(gBrowser.gecko) ...
 *
 * @constructor
 */

function RBrowserDetector()
{
  var agent=navigator.userAgent.toLowerCase();

  this.setupBrowserType(agent);
  this.setupBrowserOS(agent);
  this.setupBrowserVersion(agent);
  this.setupJavascriptVersion(agent);
}

/**
 * determines the browser type
 *
 * This will get a lot of info about the specific browser, but most of the time
 * that does not matter.  The rendering engine is more relevent: gecko, khtml, msie, or opera
 *
 * @param agent        the browser agent string
 * @private
 */
RBrowserDetector.prototype.setupBrowserType = function(agent)
{

    // find browser that use the khtml rendering engine first because they like to pretent to be msie or gecko
    this.konqueror = (-1 != agent.indexOf('konqueror'));

    // Calvin: to be sure is Chrome browser('chrome/') NOT ChromeFrame on IE('chromeframe/')
    /** @type {boolean} */this.chrome = (-1 != agent.indexOf('chrome/'));

    this.safari = !this.chrome && (-1 != agent.indexOf('safari'));
    this.khtml = (this.safari || this.konqueror || this.chrome);

    // now find opera because it also likes to say it is other browsers
    this.opera = (-1 != agent.indexOf("opera"));

    // now look into gecko based browsers
    this.gecko = (((!this.khtml) && (!this.opera) && (navigator.product) && (navigator.product.toLowerCase() == "gecko"))) ? true : false;
    if (this.gecko)
    {
        this.mozilla = ((navigator.vendor == "") || (navigator.vendor == "Mozilla") || (navigator.vendor == "Debian"));
        this.firefox = (navigator.vendor == "Firefox");
    }

    // msie based browsers
    this.msie = ((-1 != navigator.appVersion.toLowerCase().indexOf('msie')) && (!this.opera) && (!this.khtml));

    // netscape
    this.netscape = ((-1 != agent.indexOf('mozilla')) && (-1 == agent.indexOf('spoofer')) && (-1 == agent.indexOf('compatible')) && (!this.khtml) && (!this.opera) && !(this.mozilla) && (!this.firefox) && (!this.msie));
	
	//Apple Mobile detector	
	this.mobile=((-1!= agent.indexOf('ipad')) || (-1!=agent.indexOf('iphone')) || (-1!=agent.indexOf('ipod')));
}

/**
 * determines the os the browser is running on
 *
 * @param agent        the browser agent string
 * @private
 */
RBrowserDetector.prototype.setupBrowserOS = function(agent)
{
  this.windows = ((agent.indexOf("win")!=-1) || (agent.indexOf("16bit")!=-1));
  this.windows31 = ((agent.indexOf("windows 3.1")!=-1) || (agent.indexOf("win16")!=-1) || (agent.indexOf("windows 16-bit")!=-1));
  this.windows95 = ((agent.indexOf("win95")!=-1) || (agent.indexOf("windows 95")!=-1));
  this.windows98 = ((agent.indexOf("win98")!=-1) || (agent.indexOf("windows 98")!=-1));
  this.windowsME = ((agent.indexOf("win 9x 4.90")!=-1));
  this.windows2k = ((agent.indexOf("windows nt 5.0")!=-1) || (agent.indexOf("windows 2000")!=-1));
  this.windowsXP = ((agent.indexOf("windows nt 5.1")!=-1) || (agent.indexOf("windows xp")!=-1));
  this.windowsNT = ((agent.indexOf("winnt")!=-1) || (agent.indexOf("windows nt")!=-1) || this.windows2k || this.windowsXP);

  this.os2 = ((agent.indexOf("os/2")!=-1) || (navigator.appVersion.indexOf("OS/2")!=-1));

  this.mac = (agent.indexOf("mac")!=-1);
  if (this.mac) { this.windows = !this.mac; }
  // fixme: check for osx

  this.unix  = (agent.indexOf("x11")!=-1);
}

/**
 * determines the browser version
 *
 * @param agent        the browser agent string
 * @private
 */
RBrowserDetector.prototype.setupBrowserVersion = function(agent)
{
  // pretty much everything lies in navigator.appVersion
  this.minorVersion = parseFloat(navigator.appVersion.toLowerCase());

  if (this.konqueror)
  {
    var konquerorPos = agent.indexOf("konqueror");
    this.minorVersion = parseFloat(agent.substring(konquerorPos10,agent.indexOf(';',konquerorPos)));
  }

  if (this.opera)
  {
    var versionIndex = agent.indexOf("opera");
    if (-1!=versionIndex)
    {
      var operaVersion = agent.substring(versionIndex+6);
      this.minorVersion = parseFloat(operaVersion);
    }
  }

  if (this.gecko)
  {
    this.geckoVersion = navigator.productSub;
    // could get the version of the app using mozilla with navigator.vendorSub,
    // but i care more about the vesion on mozilla it is based on
    var mozillaVersion = agent.substring(agent.indexOf('rv:')+3);
    var end = mozillaVersion.indexOf(')');
    mozillaVersion = mozillaVersion.substring(0,end);
    this.minorVersion = parseFloat(mozillaVersion);
  }

  if (this.msie)
  {
    if(this.mac)
    {
      var iePos = agent.indexOf('msie');
      this.minorVersion = parseFloat(agent.substring(iePos+5,agent.indexOf(';',iePos)));
    }
    else
    {
      var appVersion = navigator.appVersion.toLowerCase();
      var iePos = appVersion.indexOf('msie');
      this.minorVersion = parseFloat(appVersion.substring(iePos+5,appVersion.indexOf(';',iePos)));
    }
  }

  this.majorVersion = parseInt(this.minorVersion);
}

/**
 * determines the version of javascript the browser supports
 *
 * @param agent        the browser agent string
 * @private
 */
RBrowserDetector.prototype.setupJavascriptVersion = function(agent)
{
  this.jsVersion = 0;
  if (this.opera && (5==this.majorVersion||6==this.majorVersion)) this.jsVersion = 1.3;
  else if (this.opera && 7<=this.majorVersion) this.jsVersion = 1.5;
  else if (this.opera) this.jsVersion = 1.1;
  else if (this.khtml) this.jsVersion = 1.5;
  else if (this.gecko) this.jsVersion = 1.5;
  else if (this.netscape && 2==this.majorVersion) this.jsVersion = 1.0;
  else if (this.netscape && 2==this.majorVersion) this.jsVersion = 1.1;
  else if (this.netscape && 4.05>=this.minorVersion) this.jsVersion = 1.2;
  else if (this.netscape && 4==this.majorVersion && 4.05<this.minorVersion) this.jsVersion = 1.3;
  else if (this.msie && 3==this.majorVersion) this.jsVersion = 1.0;
  else if (this.msie && 4==this.majorVersion) this.jsVersion = 1.2;
  else if (this.msie && this.mac && 5<=this.majorVersion) this.jsVersion = 1.4;
  else if (this.msie && 5<=this.majorVersion) this.jsVersion = 1.3;
}

/**
 * determines the value of the platform's assumed "control" key equivalent 
 *
 * @param event        the event
 * @public
 */
RBrowserDetector.prototype.getEquivalentCtrlKeyValue = function(event)
{
  if (this.mac) return event.metaKey;
  return event.ctrlKey;
}
