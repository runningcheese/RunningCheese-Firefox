// ==UserScript==
// @name                 AutohidePopup.uc.js
// @description       自動關閉右鍵選單
// @author               skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.12.03              
// @include              main
// @include         chrome://browser/content/browser.xul
// @include         chrome://browser/content/bookmarks/bookmarksPanel.xul
// @include         chrome://browser/content/places/places.xul
// ==/UserScript==
(function() {
    var PCt, CMt, TCMt;
    //收藏庫
    var PC = $("placesContext");
    PC.addEventListener("mouseout", function(event) {
        PCt = setTimeout(function(event) {
            PC.hidePopup();
        }, 1000);
    }, false);
    PC.addEventListener("mouseover", function(event) {
        clearTimeout(PCt);
    }, false);
    //頁面右鍵
    var CM = $("contentAreaContextMenu");
    CM.addEventListener("mouseout", function(event) {
        CMt = setTimeout(function(event) {
            CM.hidePopup();
        }, 1000);
    }, false);
    CM.addEventListener("mouseover", function(event) {
        clearTimeout(CMt);
    }, false);
    //分頁右鍵
    var TCM = $("tabContextMenu");
    TCM.addEventListener("mouseout", function(event) {
        TCMt = setTimeout(function(event) {
            TCM.hidePopup();
        }, 1000);
    }, false);
    TCM.addEventListener("mouseover", function(event) {
        clearTimeout(TCMt);
    }, false);

    function $(id) {
        return document.getElementById(id);
    }
})();