// ==UserScript==
// @name           findNextPrevByMouseWheel.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    鼠标滚轮切换页面查找文字
// @include        main
// @include        chrome://global/content/viewPartialSource.xul
// @include        chrome://global/content/viewSource.xul
// @compatibility  Firefox 25
// @author         Alice0775
// @version        2013/05/11 12:00 Bug537013, Bug 893349
// @version        2009/03/15 23:30 何でこうコロコロと意味のない変更するのかね > Dao  Gottwald (Bug 481397 -  Incorrect tab order of findbar buttons on Linux)
// @Note
// ==/UserScript==
// @version        2010/07/09 07:00
// @version        2009/03/15 07:30
// @version        2009/03/15 00:00

var findNextPrevByMouseWheel = {
  init: function() {
    //fx25 for existing findbar
    let findBars = document.querySelectorAll("findbar");
    if (findBars.length > 0) {
      Array.forEach(findBars, function (aFindBar) {
        findNextPrevByMouseWheel.patch(aFindBar);
      });
    } else if ("gBrowser" in window && "getFindBar" in gBrowser) {
      if (gBrowser.selectedTab._findBar)
        findNextPrevByMouseWheel.patch(gBrowser.selectedTab._findBar);
    }
    //fx25 for newly created findbar
    if ("gBrowser" in window && "getFindBar" in gBrowser) {
      gBrowser.tabContainer.addEventListener("TabFindInitialized", function(event){
        findNextPrevByMouseWheel.patch(event.target._findBar);
      });
    }
  },

  patch: function(aFindBar) {
    document.getAnonymousElementByAttribute(aFindBar, "anonid", "findbar-textbox")
    .addEventListener("DOMMouseScroll", function(event) {
      if (!aFindBar._findField.value)
        return;
      var findBackwards = event.detail < 0 ? true : false;
      aFindBar.onFindAgainCommand(findBackwards);
    }, false);
    document.getAnonymousElementByAttribute(aFindBar, "anonid", "find-next")
    .addEventListener("DOMMouseScroll", function(event) {
      if (!aFindBar._findField.value)
        return;
      var findBackwards = event.detail < 0 ? true : false;
      aFindBar.onFindAgainCommand(findBackwards);
    }, false);
    document.getAnonymousElementByAttribute(aFindBar, "anonid", "find-previous")
    .addEventListener("DOMMouseScroll", function(event) {
      if (!aFindBar._findField.value)
        return;
      var findBackwards = event.detail < 0 ? true : false;
      aFindBar.onFindAgainCommand(findBackwards);
    }, false);
  }
}
findNextPrevByMouseWheel.init();
