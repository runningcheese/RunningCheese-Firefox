// ==UserScript==
// @name           findNextPrevByMouseWheel.uc.js
// @namespace      http://space.geocities.yahoo.co.jp/gl/alice0775
// @description    ページ内検索の「次を検索」と「前を検索」をボタン上のマウスホイールの回転で
// @include        main
// @include        chrome://global/content/viewPartialSource.xul
// @include        chrome://global/content/viewSource.xul
// @compatibility  Firefox 3.0 3.5  4.0b2pre
// @author         Alice0775
// @version        2009/03/15 23:30 何でこうコロコロと意味のない変更するのかね > Dao  Gottwald (Bug 481397 -  Incorrect tab order of findbar buttons on Linux)
// @Note
// ==/UserScript==
// @version        2010/07/09 07:00
// @version        2009/03/15 07:30
// @version        2009/03/15 00:00

if (!document.getElementById("FindToolbar") &&
    typeof gFindBarInitialized != 'undefined' &&
    !gFindBarInitialized) {
  window.watch('gFindBarInitialized', function() { findNextPrevByMouseWheel(); });
} else {
  findNextPrevByMouseWheel();
}
function findNextPrevByMouseWheel() {
 //viewSourceやviewPartialSourceでは未定義
  if (typeof gFindBar == 'undefined') {
    gFindBar = document.getElementById("FindToolbar");
  }

  if (document.getAnonymousElementByAttribute(gFindBar, "anonid", "find-buttons-container")){ //less Fx3.5?
    document.getAnonymousElementByAttribute(gFindBar, "anonid", "find-buttons-container")
    .addEventListener("DOMMouseScroll", function(event){
      var findBackwards = event.detail < 0 ? true : false;
      gFindBar.onFindAgainCommand(findBackwards);
    }, false);
  } else { //more Fx3.6?
    document.getAnonymousElementByAttribute(gFindBar, "anonid", "find-next")
    .addEventListener("DOMMouseScroll", function(event){
      if (!gFindBar._findField.value)
        return;
      var findBackwards = event.detail < 0 ? true : false;
      gFindBar.onFindAgainCommand(findBackwards);
    }, false);
    document.getAnonymousElementByAttribute(gFindBar, "anonid", "find-previous")
    .addEventListener("DOMMouseScroll", function(event){
      if (!gFindBar._findField.value)
        return;
      var findBackwards = event.detail < 0 ? true : false;
      gFindBar.onFindAgainCommand(findBackwards);
    }, false);
  }
}