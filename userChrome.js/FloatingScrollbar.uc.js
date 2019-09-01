// ==UserScript==
// @name           FloatingScrollbar.uc.js
// @namespace   nightson1988@gmail.com
// @include        main
// @version        fix 67+，修正在微信网页版，暴力猴编辑器上的滚动条错误 by @runningcheese
// @version        0.0.3
// @note           Thanks to Griever(https://github.com/Griever/userChromeJS/blob/master/SmartScrollbar.uc.js) and Paul Rouget(https://gist.github.com/4003205)
// @note...........0.0.3 Fixed a problem of breaking hbox layout 
// @note           0.0.2 Remove usage of E4X (https://bugzilla.mozilla.org/show_bug.cgi?id=788293)
// ==/UserScript==

(function () {
    var prefs = Services.prefs,
        enabled;
    if (prefs.prefHasUserValue('userChromeJS.floating_scrollbar.enabled')) {
        enabled = prefs.getBoolPref('userChromeJS.floating_scrollbar.enabled')
    } else {
        prefs.setBoolPref('userChromeJS.floating_scrollbar.enabled', true);
        enabled = true;
    }

 var css = '\
    @namespace url(http: //www.mozilla.org/keymaster/gatekeeper/there.is.only.xul);\
    @-moz-document regexp("((?!wx2.qq.com).)*"){\
    scrollbar {\
        -moz-appearance: none!important;\
        position: relative;\
        background-color: transparent;\
        background-image: none;\
        z-index: 100000;\
        padding: 0px;\
    }\
    scrollbar[orient = "vertical"] {\
        -moz-margin-start: -12px;\
        min-width: 12px;\
    }\
    scrollbar[orient = "vertical"] thumb {\
        min-height: 50px;\
    }\
   scrollbar[orient = "horizontal"] {\
        margin-top: -12px;\
        min-height: 12px;\
    }\
    scrollbar[orient = "horizontal"] thumb {\
        min-width: 50px;\
    }\
    scrollbar thumb {\
        -moz-appearance: none!important;\
        border-width: 0px!important;\
        border-radius: 5px!important;\
        background-color: rgba(0, 0, 0, 0.2)!important;\
    }\
    scrollbar:hover thumb{\
        background-color: #9B9B9B!important;\
    }\
    scrollbar:active thumb{\
        background-color: #9B9B9B!important;\
    }\
    scrollbar scrollbarbutton,scrollbar gripper{\
        display: none;}\
}\
    @-moz-document url-prefix("moz-extension://"){\
    scrollbar {\
         z-index: 2000!important;\
    }}\
   }';

    var sss = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
    var uri = makeURI('data:text/css;charset=UTF=8,' + encodeURIComponent(css));

    var p = document.getElementById('devToolsSeparator');
    var m = document.createElement('menuitem');
    m.setAttribute('label', "Schwebende Scrollbar");
    m.setAttribute('type', 'checkbox');
    m.setAttribute('autocheck', 'false');
    m.setAttribute('checked', enabled);
    p.parentNode.insertBefore(m, p);
    m.addEventListener('command', command, false);

    if (enabled) {
        sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
    }

    function command() {
        if (sss.sheetRegistered(uri, sss.AGENT_SHEET)) {
            prefs.setBoolPref('userChromeJS.floating_scrollbar.enabled', false);
            sss.unregisterSheet(uri, sss.AGENT_SHEET);
            m.setAttribute('checked', false);
        } else {
            prefs.setBoolPref('userChromeJS.floating_scrollbar.enabled', true);
            sss.loadAndRegisterSheet(uri, sss.AGENT_SHEET);
            m.setAttribute('checked', true);
        }

        let root = document.documentElement;
        let display = root.style.display;
        root.style.display = 'none';
        window.getComputedStyle(root).display; // Flush
        root.style.display = display;
    }

})();