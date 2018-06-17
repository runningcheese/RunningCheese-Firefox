// ==UserScript==
// @name           launchClipboard3.uc.js
// @namespace    http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    批量打开剪贴板中的多条链接
// @include        main
// @compatibility  Firefox 2.0 3.0
// @author         Alice0775
// @version        2008/08/09
// @Note           リンクらしき文字とはプレーンテキストなhttp://... の事。
// ==/UserScript==
var ucjs_launchClipboard = {
// --config --
// extensions.launchclipboard.allowWithoutScheme : スキーム無しをテキストリンクと する:true, しない:[false]
   ALLOWWITHOUTSCHEME: false,
// extensions.launchclipboard.allowMultibyte     : マルチバイトなテキストリンクを 有効:[true], 無効:false
   ALLOWMULTIBYTE    : true,
// --config --
  init: function(){
/*
    const kXULNS =
           "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";
    var overlay =
        <overlay xmlns={ kXULNS }>
          <commandset id="mainCommandSet">
            <command id="cmd_launchClipboard"  oncommand="ucjs_launchClipboard.launchClipboard()"/>
            <command id="cmd_launchClipboard2" oncommand="ucjs_launchClipboard.launchClipboard2()"/>
          </commandset>
          <keyset id="mainKeyset">
            <key id="key_launchClipboard"  key="K" command="cmd_launchClipboard" modifiers="alt,shift"/>
            <key id="key_launchClipboard2" key="L" command="cmd_launchClipboard2" modifiers="alt,shift"/>
          </keyset>
        </overlay>;
    overlay = "data:application/vnd.mozilla.xul+xml;charset=utf-8,"
              + encodeURI(overlay.toXMLString());
*/
    var overlay ='\
        <overlay xmlns="http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul">\
          <commandset id="mainCommandSet">\
            <command id="cmd_launchClipboard"  oncommand="ucjs_launchClipboard.launchClipboard()"/>\
          </commandset>\
        </overlay>';
    overlay = "data:application/vnd.mozilla.xul+xml;charset=utf-8,"
              + encodeURI(overlay);
    if (window.userChrome_js && window.userChrome_js.loadOverlay) {
      window.userChrome_js.loadOverlay(overlay);
    } else {
      document.loadOverlay(overlay, null);
    }

    window.removeEventListener('load',function(){ucjs_launchClipboard.init();},false);
    if (document.getElementById('urlbar'))
      document.getElementById('urlbar').addEventListener('popupshown', this, false);
    document.getElementById('cmd_CustomizeToolbars').addEventListener('DOMAttrModified', this, false);
    window.addEventListener('unload', this, false);
  },

  uninit: function(){
    if (document.getElementById('urlbar'))
      document.getElementById('urlbar').removeEventListener('popupshown', this, false);
    document.getElementById('cmd_CustomizeToolbars').removeEventListener('DOMAttrModified', this, false);
    window.removeEventListener('unload', this, false);
  },

  handleEvent: function(event){
    switch(event.type){
      case "unload":
        this.uninit();
        break;
      case "popupshown":
        var menuitem1 = document.getElementById("launchClipboard-menuitem");
        if (!menuitem1){
          var menupopup = event.originalTarget;
          var refChild = menupopup.getElementsByAttribute("cmd", "cmd_paste")[0];
          menuitem1 = document.createElement("menuitem");
          menuitem1.id = "launchClipboard-menuitem"
//          menuitem1.setAttribute("label", "Launch Clipboard(Text links)");
          menuitem1.setAttribute("label", "\u8bbf\u95ee\u590d\u5236\u94fe\u63a5");
//         menuitem1.setAttribute("accesskey", "K");
          menuitem1.setAttribute("key", "key_launchClipboard");
          menuitem1.setAttribute("command", "cmd_launchClipboard");
          menupopup.insertBefore(menuitem1, refChild.nextSibling);

        }
        var canPaste = this.dolaunchClipboard(false);
        menuitem1.setAttribute("disabled", canPaste == 0);

        canPaste = this.dolaunchClipboard2(false);
        menuitem2.setAttribute("disabled", !canPaste);
       break;
      case "DOMAttrModified":
        if (event.attrName == "disabled" && !event.newValue)
          this.init();
    }
  },

  launchClipboard: function(){
    var canPaste = this.dolaunchClipboard(false);
    if (canPaste > 1 ){
      if (!this.confirmOpenTabs(canPaste))
        return;
    }
    // Launch Clipboard
    this.dolaunchClipboard(true);
  },

  dolaunchClipboard: function(go){
    var pref =  Components.classes['@mozilla.org/preferences-service;1']
                  .getService(Components.interfaces.nsIPrefService);
    try{
      var allowWithoutScheme = pref.getBoolPref("extensions.launchclipboard.allowWithoutScheme");
    }catch(e){
      var allowWithoutScheme = this.ALLOWWITHOUTSCHEME;
    }
    try{
      var allowMultibyte = pref.getBoolPref("extensions.launchclipboard.allowMultibyte");
    }catch(e){
      var allowMultibyte = this.ALLOWMULTIBYTE;
    }

    if (!allowWithoutScheme) {
      if (allowMultibyte) {
        var urlRegex = /(((h?t)?tps?|h..ps?|ftp|(\uff48?\uff54)?\uff54\uff50\uff53?|\uff48..\uff50\uff53?|\uff46\uff54\uff50)(:\/\/|\uff1a\uff0f\uff0f)[-_.!~*'()a-zA-Z0-9;\/?,@&=+$%#\[\]\uff0d\uff3f\uff0e\uff01\uff5e\uff0a\u2019\uff08\uff09\uff41-\uff5a\uff21-\uff3a\uff10-\uff19\uff1b\uff0f\uff1f\uff1a\uff20\uff06\uff1d\uff0b\uff04\uff0c\uff05\uff03\uff5c\uff3b\uff3d]*[-_.!~*a-zA-Z0-9;\/?@&=+$%#\uff0d\uff3f\uff0e\uff01\uff5e\uff0a\u2019\uff41-\uff5a\uff21-\uff3a\uff10-\uff19\uff1b\uff0f\uff1f\uff20\uff06\uff1d\uff0b\uff04\uff0c\uff05\uff03\uff5c]+)/ig;
      } else {
        var urlRegex = /(((h?t)?tps?|h..ps?|ftp)(:\/\/)[-_.!~*'()a-zA-Z0-9;\/?,@&=+$%#\[\]]*[-_.!~*a-zA-Z0-9;\/?@&=+$%#\[\]]+)([-/?]?(((h?t)?tps?|h..ps?|ftp)(:\/\/)[-_.!~*'()a-zA-Z0-9;\/?,@&=+$%#\[\]]*[-_.!~*a-zA-Z0-9;\/?@&=+$%#\[\]]+)*)/ig;
      }
    } else {
      if (allowMultibyte) {
        var urlRegex = /([-_.!~*'()a-zA-Z0-9;\/?,@&=+$%#\[\]\uff0d\uff3f\uff0e\uff01\uff5e\uff0a\u2019\uff08\uff09\uff41-\uff5a\uff21-\uff3a\uff10-\uff19\uff1b\uff0f\uff1f\uff1a\uff20\uff06\uff1d\uff0b\uff04\uff0c\uff05\uff03\uff5c\uff3b\uff3d]*[.\uff0e]+[-_.!~*'a-zA-Z0-9;\/?@&=+$%#\uff0d\uff3f\uff0e\uff01\uff5e\uff0a\u2019\uff08\uff09\uff41-\uff5a\uff21-\uff3a\uff10-\uff19\uff1b\uff0f\uff1f\uff1a\uff20\uff06\uff1d\uff0b\uff04\uff0c\uff05\uff03\uff5c]+[.\uff0e/\uff0f]+[-_.!~*a-zA-Z0-9;\/?@&=+$%#\uff0d\uff3f\uff0e\uff01\uff5e\uff0a\u2019\uff41-\uff5a\uff21-\uff3a\uff10-\uff19\uff1b\uff0f\uff1f\uff1a\uff20\uff06\uff1d\uff0b\uff04\uff0c\uff05\uff03\uff5c]+)/ig;
      } else {
        var urlRegex = /([-_.!~*'()a-zA-Z0-9;\/?,@&=+$%#\[\]]*[.]+[-_.!~*'a-zA-Z0-9;\/?@&=+$%#\[\]]+[./]+[-_.!~*a-zA-Z0-9;\/?@&=+$%#\[\]]+)/ig;
      }
    }

    if (allowMultibyte) {
      var urlRx =  /^(((h?t)?tp|h..p|(\uff48?\uff54)?\uff54\uff50|\uff48..\uff50)(:\/\/|\uff1a\uff0f\uff0f))/i;
      var urlRx2 = /^(((h?t)?tps|h..ps|(\uff48?\uff54)?\uff54\uff50\uff53|\uff48..\uff50\uff53)(:\/\/|\uff1a\uff0f\uff0f))/i;
    } else {
      var urlRx =  /^(((h?t)?tp|h..p)(:\/\/))/i;
      var urlRx2 = /^(((h?t)?tps|h..ps)(:\/\/))/i;
    }

    var nOfUrl = 0;
    // get clipboard text
    try {
      var clip  = Components.classes["@mozilla.org/widget/clipboard;1"].createInstance(Components.interfaces.nsIClipboard);
      var trans = Components.classes["@mozilla.org/widget/transferable;1"].createInstance(Components.interfaces.nsITransferable);
      trans.addDataFlavor("text/unicode");
      clip.getData(trans, clip.kGlobalClipboard);
      var str = new Object();
      var len = new Object();
      trans.getTransferData("text/unicode", str, len);
      if ( str ) str = str.value.QueryInterface(Components.interfaces.nsISupportsString).toString();
      else return 0;
    }catch(ex) {return 0;}
    //dump(str);
    //
    var arr = str.split(/\n| |"|'/);
    if(!arr)return 0;
    var URIFixup = Components.classes['@mozilla.org/docshell/urifixup;1']
                       .getService(Components.interfaces.nsIURIFixup);
    for(var i=0,len=arr.length;i<len;i++){
      if(!arr[i])continue;
      var url =[];
      var url = url.concat(arr[i].match(urlRegex));
      if(!url)continue;
      for(var j=0,lenj=url.length;j<lenj;j++){
        if(url[j]){
          //if(allowWithoutScheme){
            var uri = url[j].replace(urlRx,'http://');
            uri = uri.replace(urlRx2,'https://');
          //} else {
          //  var uri = url[j];
          //}
          uri = URIFixup.createFixupURI(
            uri, // URI or file path (encoded in any charset)
            URIFixup.FIXUP_FLAG_ALLOW_KEYWORD_LOOKUP );
          //try{
            if(go){
              // urlSecurityCheck wanted a URL-as-string for Fx 2.0, but an nsIPrincipal on trunk
              var aurl = convurl(uri.spec);
              if(gBrowser.contentPrincipal)
                urlSecurityCheck(aurl, gBrowser.contentPrincipal,
                                 Ci.nsIScriptSecurityManager.DISALLOW_SCRIPT);
              else
                urlSecurityCheck(aurl, gBrowser.currentURI.spec,
                                 Ci.nsIScriptSecurityManager.DISALLOW_SCRIPT);
              gBrowser.selectedTab = gBrowser.addTab(aurl);
            }
            if(!go) nOfUrl += 1;
          //}catch(e){}
        }
      }
    }
    return nOfUrl;

    function convurl(url){
      var iQuery = url.toString().indexOf("?");
      if (iQuery > -1) {
        var pathNode = url.toString().substr(0,iQuery).replace(/&amp;/ig,'&');
        var queryNode = url.toString().substr(iQuery);
        return pathNode.concat(queryNode);
      }else{
        return url.toString().replace(/&amp;/ig,'&');
      }
    }
  },

  launchClipboard2: function(){
    // Launch Clipboard
    this.dolaunchClipboard2(true);
  },

  str2dom: function(str){
    var xsl = (new DOMParser()).parseFromString([
      '<?xml version="1.0"?>',
      '<stylesheet version="1.0" xmlns="http://www.w3.org/1999/XSL/Transform">',
      '<output method="html"/>',
      '</stylesheet>'
    ].join("\n"), "text/xml");

    var xsltp = new XSLTProcessor();
    xsltp.importStylesheet(xsl);
    var htmldoc = xsltp.transformToDocument(document.implementation.createDocument("", "", null));

    var range = htmldoc.createRange();
    htmldoc.appendChild(htmldoc.createElement("html"));
    range.selectNodeContents(htmldoc.documentElement);

    htmldoc.documentElement.appendChild(range.createContextualFragment(str));
    return htmldoc;
  },

  dolaunchClipboard2: function(go){
    //For a tag link
    // get clipboard text
    try {
      var clip  = Components.classes["@mozilla.org/widget/clipboard;1"].
                  createInstance(Components.interfaces.nsIClipboard);
      var trans = Components.classes["@mozilla.org/widget/transferable;1"].
                  createInstance(Components.interfaces.nsITransferable);
      trans.addDataFlavor("text/html");
      clip.getData(trans, clip.kGlobalClipboard);
      var str = new Object();
      var len = new Object();
      trans.getTransferData("text/html", str, len);
      if( str )
        str = str.value.QueryInterface(Components.interfaces.nsISupportsString).toString();
      else
        return false;
    }catch(ex) {return false;}

    var doc = this.str2dom(str);
    var xpath = "//a[contains(@href,'http')]|//a[contains(@href,'ftp')]";
    var candidates = doc.evaluate(xpath, doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

    if (go && candidates.snapshotLength > 1){
      if (!this.confirmOpenTabs(candidates.snapshotLength))
        return false;
    } else if (candidates.snapshotLength > 1) {
      return true;
    } else {
      return false;
    }

    for (var cand = null, i = 0, len = candidates.snapshotLength; i < len; i++) {
      cand = candidates.snapshotItem(i)
      if (!cand.href) continue;
      var url = cand.href;
      //dump(url);
      //url = convurl(url);
      try{
        if(go){
          // urlSecurityCheck wanted a URL-as-string for Fx 2.0, but an nsIPrincipal on trunk
          if(gBrowser.contentPrincipal)
            urlSecurityCheck(url, gBrowser.contentPrincipal,
                             Ci.nsIScriptSecurityManager.DISALLOW_SCRIPT);
          else
            urlSecurityCheck(url, gBrowser.currentURI.spec,
                             Ci.nsIScriptSecurityManager.DISALLOW_SCRIPT);
          gBrowser.selectedTab = gBrowser.addTab(url);
        }
      }catch(e){}
    }
  },

  confirmOpenTabs: function(numTabsToOpen){
    try{ //Fx3 Places
      function _confirmOpenTabs(numTabsToOpen) {
        var pref = Cc["@mozilla.org/preferences-service;1"].
                   getService(Ci.nsIPrefBranch);

        const kWarnOnOpenPref = "browser.tabs.warnOnOpen";
        var reallyOpen = true;
        if (pref.getBoolPref(kWarnOnOpenPref)) {
          if (numTabsToOpen >= pref.getIntPref("browser.tabs.maxOpenBeforeWarn")) {
            var promptService = Cc["@mozilla.org/embedcomp/prompt-service;1"].
                                getService(Ci.nsIPromptService);

            // default to true: if it were false, we wouldn't get this far
            var warnOnOpen = { value: true };

            var messageKey = "tabs.openWarningMultipleBranded";
            var openKey = "tabs.openButtonMultiple";
            var strings = document.getElementById("placeBundle");
            const BRANDING_BUNDLE_URI = "chrome://branding/locale/brand.properties";
            var brandShortName = Cc["@mozilla.org/intl/stringbundle;1"].
                                 getService(Ci.nsIStringBundleService).
                                 createBundle(BRANDING_BUNDLE_URI).
                                 GetStringFromName("brandShortName");

            var buttonPressed = promptService.confirmEx(window,
              PlacesUIUtils.getString("tabs.openWarningTitle"),
              PlacesUIUtils.getFormattedString(messageKey,
                [numTabsToOpen, brandShortName]),
              (promptService.BUTTON_TITLE_IS_STRING * promptService.BUTTON_POS_0)
              + (promptService.BUTTON_TITLE_CANCEL * promptService.BUTTON_POS_1),
              PlacesUIUtils.getString(openKey),
              null, null,
              PlacesUIUtils.getFormattedString("tabs.openWarningPromptMeBranded",
                [brandShortName]),
              warnOnOpen);

             reallyOpen = (buttonPressed == 0);
             // don't set the pref unless they press OK and it's false
             if (reallyOpen && !warnOnOpen.value)
               pref.setBoolPref(kWarnOnOpenPref, false);
          }
        }
        return reallyOpen;
      }// function
        return _confirmOpenTabs(numTabsToOpen)
    }catch(e){}
    try{ //Fx2
      if('_confirmOpenTabs' in BookmarksCommand)
        return BookmarksCommand._confirmOpenTabs(numTabsToOpen)
    }catch(e){}
    return true;
  }
}
ucjs_launchClipboard.init();
