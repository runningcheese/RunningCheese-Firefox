// ==UserScript==
// @name           ButtonEventListener.uc.js
// @description    为工具栏图标增加点击功能
// @author          runningcheese
// @reference      zbinlin, skofkyo, 小蛐蛐等等
// @include         chrome://browser/content/browser.xhtml
// @include         chrome://browser/content/browser.xul
// @update         2019-09-28
// @update         2019-09-23
// @update         2019-01-01
// @update         2018-04-20
// @update         2018-04-04 增加一些功能
// @update         2018-03-18 fix for 57+
// @update         2017-11-30
// @update         2017-02-09
// @license          MIT License
// @compatibility  Firefox 70+
// @charset         UTF-8
// @reviewURL     https://www.runningcheese.com
// ==/UserScript==



// 01. 刷新按钮移动到地址栏
(function() {
    function moveReloadIntoURL() {
        try {
            var btn0 = document.getElementById("page-action-buttons");
            var btn1 = document.getElementById("reload-button");
            if (!btn0 || !btn1) return;

            var btn = document.createXULElement("toolbarbutton");
            btn.style.margin = '0px';
            btn.setAttribute("id", "stop_reload_button");
            btn.setAttribute("class", btn1.getAttribute("class"));

            btn.addEventListener("command", function(e) {
                var btn = document.getElementById("reload-button");
                if (btn && btn.getAttribute('displaystop'))
                    BrowserStop();
                else
                    BrowserReload(); 
            }, false);
            btn0.parentNode.insertBefore(btn, btn0);
            btn1.addEventListener('DOMAttrModified', reloadBtnAttr);
            reloadBtnAttr();
            btn1.parentNode.hidden = true;
        }catch(e){ alert(e) }
    }

    function reloadBtnAttr(e) {
        btn = document.getElementById("stop_reload_button");
        if (btn && (!e || e.attrName=='displaystop')) {
            var newVal = e ? e.newValue : document.getElementById(
                "reload-button").getAttribute('displaystop');
            if (newVal)
                btn.style.listStyleImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVQ4jWNgGAXo4D8DA4M9Hnl7qBqCCrAZgk+OoEKiNWPTQLJmdEPI0kyxARR5gaJApDgaqZKQCAGyYgQnAAB0ERxLFkz7bAAAAABJRU5ErkJggg==')";
            else
                btn.style.listStyleImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAeklEQVQ4jdWSyxGAIAxE39WbHdgJLdCLJVgbpVBHxksYMyj/k+/CgeyGZIE/cKyKBXArJk5N/IjIA0GFAsSRl1wq8MCupwBnb+eoQpjYQeA961AKYrqXqBq2DDatKfI1giWlUy2wS7TsPOlUyWNMUUa96yL/SK3R5rkBybEfI1071/QAAAAASUVORK5CYII=')";
        }
    }

    moveReloadIntoURL();
})();





// 02. 浏览器无边框 
(function() {
	var gav = Services.wm.getEnumerator("navigator:browser");
	while (gav.hasMoreElements()) {
		if (gav.getNext().chromemargin && !document.documentElement.outerHTML.match('chromehidden=""')) return;
	}

	if (window.chromemargin) {
		window.chromemargin.onDestroy();
		delete window.chromemargin;
	}

	window.chromemargin = {
		init: function() {
			window.addEventListener("resize", this, true);
			window.addEventListener("aftercustomization", this, false);
			window.addEventListener("customizationchange", this, false);
			setTimeout(function() {
				document.documentElement.setAttribute("chromemargin", "0,8,8,8");
			}, 100);
		},
		onDestroy: function() {
			window.removeEventListener("resize", this, true);
			window.removeEventListener("aftercustomization", this, false);
			window.removeEventListener("customizationchange", this, false);
			document.documentElement.setAttribute("chromemargin", "0,2,2,2");
		},
		handleEvent: function(evnet) {
			document.documentElement.setAttribute("chromemargin", "0,8,8,8");
		}
	};
	window.chromemargin.init();
})();



// 03. 指定代码文本编辑器 
{location.href.startsWith('chrome://browser/content/browser.x') && (function(){
var PATH1 = Services.dirsvc.get("UChrm", Ci.nsIFile).path + "\\Local\\Notepad2\\Notepad2.exe";
Services.prefs.setCharPref('view_source.editor.path', PATH1);
})()
}


// 04. 自动恢复地址栏地址显示 
if (location.href.startsWith('chrome://browser/content/browser.x')) {
    var ub = document.getElementById("urlbar-input");
    ub.addEventListener("blur", function () {
        gURLBar.handleRevert();
    }, false);
}



// 05. 中键点击地址栏自动复制网址 
if (location.href.startsWith('chrome://browser/content/browser.x')) {
document.getElementById('urlbar').addEventListener('click', function(e) {
	if (e.button == 1)  var gClipboardHelper = Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper);gClipboardHelper.copyString(gBrowser.currentURI.spec);  
}, false);
}


// 06. 双击地址栏 显示或关闭书签栏 
document.getElementById("urlbar-input").addEventListener('dblclick', function(event) {
var bar = document.getElementById("PersonalToolbar"); setToolbarVisibility(bar, bar.collapsed);
});


// 07. 双击 空白处 关闭书签栏 
gBrowser.tabpanels.addEventListener('dblclick', function(event) {
var bar =document.getElementById("PersonalToolbar"); setToolbarVisibility(bar, bar.hide);
});


// 08. 右键「历史按钮」恢复最后关闭的标签 
 (function(doc) {
		var UndoClosedTabs  = doc.getElementById('history-panelmenu');
		if (!UndoClosedTabs ) return;
		var menupopup = UndoClosedTabs .firstChild;
		UndoClosedTabs .addEventListener("click", function(e) {
			if (e.button == 2) {
        e.preventDefault();
				e.stopPropagation();
        document.getElementById('toolbar-context-menu').style.display="none";
        // setTimeout(e=>document.getElementById("toolbar-context-menu").hidePopup(), 0);  (会有BUG)
			  undoCloseTab();
			}
		}, false);
})(document);




// 09. 右键「下载按钮」打开下载历史 
	(function(doc) {
		var ShowAllDownload = doc.getElementById('downloads-button');
		if (!ShowAllDownload) return;
		var menupopup = ShowAllDownload.firstChild;
		ShowAllDownload.addEventListener("click", function(e) {
			if (e.button == 2) {
        e.preventDefault();
				e.stopPropagation();
        document.getElementById('toolbar-context-menu').style.display="none";
        DownloadsPanel.showDownloadsHistory();
			}
		}, false);
	})(document);


// 10. 右键「三道杠」列出当前打开标签 
	(function(doc) {
		var OpenAllTabs = doc.getElementById('PanelUI-menu-button');
		if (!OpenAllTabs) return;
		var menupopup = OpenAllTabs.firstChild;
		OpenAllTabs.addEventListener("click", function(e) {
			if (e.button == 2) {
        e.preventDefault();
				e.stopPropagation();
        document.getElementById('toolbar-context-menu').style.display="none";
			document.getElementById("button_treestyletab_piro_sakura_ne_jp-sidebar-action").click();  Services.prefs.setBoolPref("sidebar.position_start",false); 
			}
		}, false);
	})(document);


// 11. 左键「alltabs-button」用 Tree Style Tab 代替展示 
	(function(doc) {
		var OpenAllTabsButton = doc.getElementById('alltabs-button');
		if (!OpenAllTabsButton) return;
		var menupopup = OpenAllTabsButton.firstChild;
		OpenAllTabsButton.addEventListener("click", function(e) {
			if (e.button == 0) {
        e.preventDefault();
				e.stopPropagation();
        document.getElementById('allTabsMenu-allTabsView').style.display="none";
			document.getElementById("button_treestyletab_piro_sakura_ne_jp-sidebar-action").click();  Services.prefs.setBoolPref("sidebar.position_start",false); 
			}
		}, false);
	})(document);




// 12. 右键 导航栏显示菜单选项 
	(function(doc) {
		var ShowTabsToolbar  = doc.getElementById('tabbrowser-tabs');
		if (!ShowTabsToolbar ) return;
		var menupopup = ShowTabsToolbar .firstChild;
		ShowTabsToolbar .addEventListener("click", function(e) {
			if (e.button == 2) {
document.getElementById('toolbar-context-menu').style.display="-moz-popup";
			}
		}, false);
	})(document);



// 13. 右键「地址栏书签图标」 打开书签管理界面 
	(function(doc) {
		var OpenPlacesOrganizer = doc.getElementById('star-button-box');
		if (!OpenPlacesOrganizer) return;
		var menupopup = OpenPlacesOrganizer.firstChild;
		OpenPlacesOrganizer.addEventListener("click", function(e) {
			if (e.button == 2) {
				e.preventDefault();
				PlacesCommandHook.showPlacesOrganizer('AllBookmarks');
			}
		}, false);
	})(document);




// 14. 右键「新建标签按钮」访问剪切板内容  
location.href.startsWith('chrome://browser/content/browser.x') &&
window.addEventListener("click", function(e) {
    if (e.button === 2 && (e.originalTarget.matches("#tabs-newtab-button")||e.originalTarget.matches("#new-tab-button"))) {
        let url = readFromClipboard();
        try {
            switchToTabHavingURI(url, true);
        } catch (ex) {
            url = 'https://www.baidu.com/s?wd='+ encodeURIComponent(url);
            switchToTabHavingURI(url, true);
        }
        e.preventDefault();
        e.stopPropagation();
         document.getElementById('toolbar-context-menu').style.display="none";
    }
}, false);


// 15. 中键「新建标签页按钮」恢复关闭的标签页 
(function() {
    var ucjsUndoCloseTab = function(e) {
        // Nur mit Mittelkick
        if (e.button != 1) {
            return;
        }
        // Klick auf Tab-Leiste und die Neuer Tab Schaltfl?chen
        if (e.target.localName != 'tabs' && e.target.localName != 'toolbarbutton') {
            return;
        }
        undoCloseTab(0);
        e.preventDefault();
        e.stopPropagation();
    }
    // Schaltfl?che Neuer Tab
    document.getElementById('new-tab-button').onclick = ucjsUndoCloseTab;
    // Tab-Leiste
    gBrowser.tabContainer.addEventListener('click', ucjsUndoCloseTab, true);
    window.addEventListener('unload', function uninit() {
        gBrowser.tabContainer.removeEventListener('click', ucjsUndoCloseTab, true);
        window.removeEventListener('unload', uninit, false);
    }, false);
})();




	// 16. 右键「地址栏刷新按钮」 强制刷新页面（跳过缓存）
	(function() {
		var UndoClosedTabs = document.getElementById('stop_reload_button');
		if (!UndoClosedTabs) return;
		UndoClosedTabs.addEventListener("click", function(event) {
			if (event.button == 2) {
				event.preventDefault();
				BrowserReloadSkipCache();
			}
		}, false);
	})();




// 17. 搜索后自动清除搜索栏内容 
(function () {
  if (BrowserSearch.searchBar && BrowserSearch.searchBar.textbox) {
            BrowserSearch.searchBar.textbox.addEventListener("blur", function () {
                this.value = "";
            }, !1);
        }
})();



// 18. 失出焦点自动关闭查找栏 
(function() {
	function closeFindbar(e) {
		if (!gFindBar.hidden) {
			if (e.target.id != "findbar-container") {
				gFindBar.close();
			}
		}
	}
	addEventListener('blur', closeFindbar, false);
})();



// 19. Ctrl + F 显示/隐藏查找栏 
(function() {
  if (location == 'chrome://browser/content/browser.xhtml') {
    document.getElementById('cmd_find').setAttribute('oncommand',
      'if (!gFindBar || gFindBar.hidden) { gLazyFindCommand("onFindCommand") } else { gFindBar.close() }'
    );
  };
})();




// 20. 在三道杠菜单添加重启浏览器选项 
(function()
{
    var quitBtn = document.getElementById("appMenu-quit-button");
    if (!quitBtn) return;

    var restartBtn = document.createXULElement("toolbarbutton");
    restartBtn.setAttribute("label", "\u91cd\u65b0\u542f\u52a8");
    restartBtn.setAttribute("class", "subviewbutton subviewbutton-iconic");
    restartBtn.setAttribute("id", "restart-button");
    restartBtn.style.listStyleImage= 'url(\'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path fill="context-fill" fill-opacity="context-fill-opacity" d="M15,1a1,1,0,0,0-1,1V4.418A6.995,6.995,0,1,0,8,15a6.954,6.954,0,0,0,4.95-2.05,1,1,0,0,0-1.414-1.414A5.019,5.019,0,1,1,12.549,6H10a1,1,0,0,0,0,2h5a1,1,0,0,0,1-1V2A1,1,0,0,0,15,1Z"/></svg>\')';
    restartBtn.addEventListener("command", function()
    {
        const APP_START = Components.classes['@mozilla.org/toolkit/app-startup;1']
            .getService(Components.interfaces.nsIAppStartup);
        APP_START.quit(APP_START.eRestart | APP_START.eAttemptQuit);
    }, false);
    quitBtn.parentNode.insertBefore(restartBtn, quitBtn);
})();




// 21. 搜索框增加“粘贴并搜索”选项

var PasteAndGoForms = {

  init: function () {
    let win = window, doc = win.document;
    var item, menu = doc.getElementById("contentAreaContextMenu");
    menu.addEventListener("popupshowing", function () {
      if (!item)
        return;
      if (win.gContextMenu.onTextInput && win.gContextMenu.onKeywordField) {
        item.hidden = false;
        let controller = doc.commandDispatcher.getControllerForCommand("cmd_paste");
        let enabled = controller.isCommandEnabled("cmd_paste");
        if (enabled)
          item.removeAttribute("disabled");
        else
          item.setAttribute("disabled", "true");
      } else
        item.hidden = true;
    }, false);

    item = doc.createXULElement("menuitem");
    item.setAttribute("id", "context-pasteandgo-forms");
    let label = doc.getElementById("searchbar")._stringBundle.getString("cmd_pasteAndSearch");
    item.setAttribute("label", label);
   item.setAttribute("class", "menuitem-iconic");
    item.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWklEQVQ4jWNgoAaQlJT8j47FxMTqSTIAnS8uLn6FaEOwGcDDwyNGtCHYDEDGJBuAyyCcYYPPAHQ+Vm+RYgDWsCHFAKxhQ6wBOOWwBRahGKAodoaYAeSED0kAAKqAUtm1wWCIAAAAAElFTkSuQmCC");
    item.setAttribute("oncommand", "PasteAndGoForms.doCommand();");
    var pasteItem = doc.getElementById("context-paste");
    menu.insertBefore(item, pasteItem.nextSibling);

    let framescript = {
      init: function() {
        addMessageListener("PasteAndGoForms.doPasteAndSubmit", this);
      },
      receiveMessage: function(message) {
        switch(message.name) {
          case "PasteAndGoForms.doPasteAndSubmit":
           this.doPasteAndSubmit(message.data.targetSelectors, message.data.str)
           break;
        }
      },
      doPasteAndSubmit: function(selectors, str) {
        let target = null;
        let win = content;
        let doc = win.document;
        for (let i = 0; i < selectors.length; i++) {
          let elem = doc.querySelector(selectors[i]);
          if (!elem)
            continue;
          if (/iframe|frame/.test(elem.nodeName.toLowerCase())) {
            win = elem.contentWindow;
            doc = elem.contentDocument;
          } else if (elem.shadowRoot != null) {
            doc = elem.shadowRoot;
          } else if (/textarea/.test(elem.nodeName.toLowerCase())) {
            if (!elem.disabled) {
              target = elem;
            }
            break;
          } else if (/input/.test(elem.nodeName.toLowerCase())) {
            if (/file|text|search|tel|url|email|password|datetime|date|month|week|time|datetime-local|number/.test(elem.type) || !elem.type) {
              if (!elem.disabled) {
                target = elem;
              }
            }
            break;
          }
        }
        if(target) {
          target.select();
          target.value = str;
          target.form.submit();
        }
      },
    };
    window.messageManager.loadFrameScript(
       'data:application/javascript,'
        + encodeURIComponent(framescript.toSource() + ".init()")
      , true, true);
  },

  doCommand: function() {
    if (typeof gContextMenu == "object" && gContextMenu != null) {
      let json = {
        targetSelectors: gContextMenu.targetSelectors,
        str: readFromClipboard()
      }
      gBrowser.selectedBrowser.messageManager.
        sendAsyncMessage("PasteAndGoForms.doPasteAndSubmit", json);
    }
  }
};
PasteAndGoForms.init();



// 22. 修改按钮名称和增加文字说明
(function () {
  cars = ['2'];
  for (var i = 0; i < cars.length; i++)
  {
    setTimeout(function () {

document.getElementById('PanelUI-menu-button').setAttribute("tooltiptext","左键：打开菜单\n右键：列出所有标签");
document.getElementById('star-button').setAttribute("tooltiptext","左键：将此页加入书签\r\n右键：打开书签管理器");
document.getElementById('reload-button').setAttribute("tooltiptext","左键：刷新当前页面\r\n右键：强制刷新当前页面");
document.getElementById('tabs-newtab-button').setAttribute("tooltiptext","左键：刷新当前页面\r\n右键：强制刷新当前页面");

    }, cars[i] * 1000); //单位: 1秒
  }
}) ();
