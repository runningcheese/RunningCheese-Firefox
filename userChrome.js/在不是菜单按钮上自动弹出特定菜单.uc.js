 /* 滑过后退按钮时自动弹出前进后退菜单 */  

  (function() {
            var BFMhideDelay;
            $("back-button").addEventListener('mouseover', function(event) {
                    $('backForwardMenu').openPopupAtScreen(event.screenX, event.screenY, true);
                    if (BFMhideDelay) {
                            clearTimeout(BFMhideDelay);
                            BFMhideDelay = null;
                    }
            }, false);
            $('back-button').addEventListener('mouseout', function() {
                    BFMhideDelay = setTimeout(function() {$('backForwardMenu').hidePopup();}, 500);
            }, false);

            $('backForwardMenu').addEventListener('mouseover', function() {
                    if (BFMhideDelay) {
                            clearTimeout(BFMhideDelay);
                            BFMhideDelay = null;
                    }
            }, false);
            $('backForwardMenu').addEventListener('mouseout', function() {
                    BFMhideDelay = setTimeout(function() {$('backForwardMenu').hidePopup();}, 500);
            }, false);

            function $(id, attr) {
                    var el = document.getElementById(id);
                    if (attr) Object.keys(attr).forEach(function(n) { return el.setAttribute(n, attr[n]);});
                    return el;
            }
    })();





/* 滑过重新载入按钮时自动弹出已关闭标签列表 */
    (function() {
            var popup = $("mainPopupSet").appendChild($C("menupopup", {
                    id: "undoCloseTabPopup",
                    onpopupshowing: "this.populateUndoSubmenu();",
                    tooltip: "bhTooltip",
                    popupsinherittooltip: "true",
                    onclick: "if (event.button == 2) {\
                            XULBrowserWindow.statusTextField.label = '清除复原标签列表';\
                            var Setting = 'browser.sessionstore.max_tabs_undo';\
                            gPrefService.setIntPref(Setting, 0);\
                            gPrefService.setIntPref(Setting, 50);\
                            event.target.parentNode.hidePopup();\
                            event.preventDefault();\
                    }\
                    ",
            }));
            popup.populateUndoSubmenu = eval("(" + HistoryMenu.prototype.populateUndoSubmenu.toString().replace("undoMenu.firstChild", "this").replace(/.*undoMenu.*/g, "") + ")");

            var uCTPhideDelay;
            $("urlbar-reload-button").addEventListener('mouseover', function(event) {
                    $('undoCloseTabPopup').openPopupAtScreen(event.screenX, event.screenY, true);
                    if (uCTPhideDelay) {
                            clearTimeout(uCTPhideDelay);
                            uCTPhideDelay = null;
                    }
            }, false);
            $('urlbar-reload-button').addEventListener('mouseout', function() {
                    uCTPhideDelay = setTimeout(function() {$('undoCloseTabPopup').hidePopup();}, 500);
            }, false);

            $('undoCloseTabPopup').addEventListener('mouseover', function() {
                    if (uCTPhideDelay) {
                            clearTimeout(uCTPhideDelay);
                            uCTPhideDelay = null;
                    }
            }, false);
            $('undoCloseTabPopup').addEventListener('mouseout', function() {
                    uCTPhideDelay = setTimeout(function() {$('undoCloseTabPopup').hidePopup();}, 500);
            }, false);

            function $(id, attr) {
                    var el = document.getElementById(id);
                    if (attr) Object.keys(attr).forEach(function(n){ return el.setAttribute(n, attr[n]);});
                    return el;
            }
            function $C(name, attr) {
                    var el = document.createElement(name);
                    if (attr) Object.keys(attr).forEach(function(n) { return el.setAttribute(n, attr[n]);});
                    return el;
            }
    })();

