// ==UserScript==
// @name            SidebarPlus.uc.js
// @description     侧边栏按钮以及功能增强
// @include         chrome://browser/content/browser.xul
// @charset         UTF-8
// @note            v2018-12-19 fix for 64+, by runningcheese
// @note            v2018-04-11 精选一些网站
// @note            v2018-04-07 增加一些功能
// @note            v2018-03-31 fix for 57+
// @note            v2017.02.11 增加一些侧边栏按钮及精选国内国外网站 by runningcheese
// @note            v2015.08.05 添加双击页面空白处隐藏侧边栏
// @note            v2013.07.30 添加几个小书签脚本
// @note            v2013.07.26 添加侧栏前进、后退、刷新按钮
// @note            v2013.07.15 侧栏激活挂在主页按钮
// ==/UserScript==
/* *********************使用说明*********************
	此脚本从lastdream2013的SidebarMod.uc.js修改而来，原作者是NightsoN，感谢他们
	去除了某些我用不到的站点以及Splitter，开关直接使用FF自带的按钮或快捷键吧ctrl+B或ctrl+H
	添加侧栏前进、后退以及刷新的3合1按钮
*/


//------------侧边栏按钮------------
(function(){
CustomizableUI.createWidget({
id: "Sidebar-button",
defaultArea: CustomizableUI.AREA_NAVBAR,
label: "侧边栏",
tooltiptext: "左键：历史侧边栏\n右键：书签侧边栏",
onClick: function(event){
switch (event.button) {
case 0:
// 左键：历史侧边栏
SidebarUI.toggle("viewHistorySidebar");
break;
case 1:
// 中键：受同步标签
SidebarUI.toggle("viewTabsSidebar");
break;
case 2:
// 右键：书签侧边栏
event.stopPropagation();
event.preventDefault();
setTimeout(e=>document.getElementById("toolbar-context-menu").hidePopup(), 0); 
SidebarUI.toggle("viewBookmarksSidebar");
break;
}
}
});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#Sidebar-button .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAAAAAAPCQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADm16n4AAAAC3RSTlMA7AoynI1/byniVqVdBlsAAAA4SURBVAjXY8AEzIG7RZdKbwxm4E5WMttmpJzNwA0U3cAApChlOO4W2SK90ZuBs0KpfXuTRiWm5QCyBRE/SPD7PAAAAABJRU5ErkJggg==)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();



//双击 侧边栏顶部切换停靠位置
(function (doc) {
        var SidebarFloat = doc.getElementById('sidebar-header');
        if (!SidebarFloat) return;
        var menupopup = SidebarFloat.firstChild;
        SidebarFloat.addEventListener("dblclick", function (e) {
            if (e.button == 0) {
           var key = "sidebar.position_start"; Services.prefs.setBoolPref(key, ! Services.prefs.getBoolPref(key)); 
            }
        }, false);
    })(document);


