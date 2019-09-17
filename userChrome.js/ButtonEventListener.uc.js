// ==UserScript==
// @name           ButtonEventListener.uc.js
// @description    为工具栏图标增加点击功能
// @author          runningcheese
// @reference      zbinlin, skofkyo, 小蛐蛐等等
// @update         2019-09-17
// @update         2019-01-01
// @update         2018-04-20
// @update         2018-04-04 增加一些功能
// @update         2018-03-18 fix for 57+
// @update         2017-11-30
// @update         2017-02-09
// @license          MIT License
// @compatibility  Firefox 57+
// @charset         UTF-8
// @reviewURL     https://www.runningcheese.com
// ==/UserScript==




// 浏览器无边框
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



// 指定代码文本编辑器
{location == 'chrome://browser/content/browser.xul' && (function(){
var PATH1 = Services.dirsvc.get("UChrm", Ci.nsIFile).path + "\\Local\\Notepad2\\Notepad2.exe";
Services.prefs.setCharPref('view_source.editor.path', PATH1);
})()
}



// 自动恢复地址栏地址显示
{if (location == "chrome://browser/content/browser.xul") {
    var ub = document.getElementById("urlbar");
    ub.addEventListener("blur", function () {
        this.handleRevert();
    }, false);
}
};



// 中键点击地址栏自动复制网址
document.getElementById('urlbar').addEventListener('click', function(e) {
	if (e.button == 1) goDoCommand('cmd_copy');
}, false);



// 双击 地址栏 显示或关闭书签栏 
document.getElementById("urlbar").addEventListener('dblclick', function(event) {
var bar = document.getElementById("PersonalToolbar"); setToolbarVisibility(bar, bar.collapsed);
});


// 双击 空白处 关闭书签栏 
gBrowser.tabpanels.addEventListener('dblclick', function(event) {
var bar = document.getElementById("PersonalToolbar"); setToolbarVisibility(bar, bar.hide);
});



// 右键「历史按钮」恢复最后关闭的标签
	(function(doc) {
		var UndoClosedTabs  = doc.getElementById('history-panelmenu');
		if (!UndoClosedTabs ) return;
		var menupopup = UndoClosedTabs .firstChild;
		UndoClosedTabs .addEventListener("click", function(e) {
			if (e.button == 2) {
        e.preventDefault();
				e.stopPropagation();
        document.getElementById('toolbar-context-menu').style.display="none";
        //setTimeout(e=>document.getElementById("toolbar-context-menu").hidePopup(), 0);  (会有BUG)
			  undoCloseTab();
			}
		}, false);
	})(document);



//右键「下载按钮」打开下载历史
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


//右键「三道杠」列出当前打开标签
	(function(doc) {
		var OpenAllTabs = doc.getElementById('PanelUI-menu-button');
		if (!OpenAllTabs) return;
		var menupopup = OpenAllTabs.firstChild;
		OpenAllTabs.addEventListener("click", function(e) {
			if (e.button == 2) {
        e.preventDefault();
				e.stopPropagation();
        document.getElementById('toolbar-context-menu').style.display="none";
			document.getElementById("button__0ad88674-2b41-4cfb-99e3-e206c74a0076_-sidebar-action").click();  Services.prefs.setBoolPref("sidebar.position_start",false); 
			}
		}, false);
	})(document);


// 左键「alltabs-button」用Tab Center Redux 代替展示
	(function(doc) {
		var OpenAllTabsButton = doc.getElementById('alltabs-button');
		if (!OpenAllTabsButton) return;
		var menupopup = OpenAllTabsButton.firstChild;
		OpenAllTabsButton.addEventListener("click", function(e) {
			if (e.button == 0) {
        e.preventDefault();
				e.stopPropagation();
        document.getElementById('allTabsMenu-allTabsView').style.display="none";
			document.getElementById("button__0ad88674-2b41-4cfb-99e3-e206c74a0076_-sidebar-action").click();  Services.prefs.setBoolPref("sidebar.position_start",false); 
			}
		}, false);
	})(document);




// 右键 导航栏显示菜单选项
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



// 右键「地址栏书签图标」 打开书签管理界面
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




// 右键「新建标签按钮」访问剪切板内容
location=="chrome://browser/content/browser.xul" &&
window.addEventListener("click", function(e) {
    if (e.button === 2 && (e.originalTarget.matches(".tabs-newtab-button")||e.originalTarget.matches("#new-tab-button"))) {
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


// 中键「新建标签页按钮」恢复关闭的标签页
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


// 刷新按钮移动到地址栏
(function() {
    function moveReloadIntoURL() {
        try {
            var btn0 = document.getElementById("pageActionButton");
            var btn1 = document.getElementById("reload-button");
            if (!btn0 || !btn1) return;

            var btn = document.createElement("toolbarbutton");
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
            reloadBtnAttr(); btn1.parentNode.hidden = true;
        }catch(e){ alert(e) }
    }

    function reloadBtnAttr(e) {
        btn = document.getElementById("stop_reload_button");
        if (btn && (!e || e.attrName=='displaystop')) {
            var newVal = e ? e.newValue : document.getElementById(
                "reload-button").getAttribute('displaystop');
            if (newVal)
                btn.style.listStyleImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAP0lEQVQ4jWNgGHbgEAMDgwEeeQOoGoIKsBmCT46gQqI1Y9NAsmZ0Q8jSTLEBFHmBokCkOBqpkpAIAbJihHYAABx5FYnbHFdNAAAAAElFTkSuQmCC')";
            else
                btn.style.listStyleImage = "url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAlElEQVQ4jcWSyw0DIQxEtwJaSCVbAwW4Ar/pYmujFOpAubDShiR8EkWxxAEh3ng83rZfl6TbV5+B4u77xxB334EiKa4oR0kJKPXk6U6AA8iSopkFSbFCjillIJtZqPe1GUhKrdelFIByqndE3gNHADMLQOnRnyw071FS6gEehvhCPQ/3oY3xEmWeivLa6rlII2v/rTsjEWmUYkMVDAAAAABJRU5ErkJggg==')";
        }
    }

    moveReloadIntoURL();
})();



	// 右键「地址栏刷新按钮」 强制刷新页面（跳过缓存）
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



// Ctrl+F 显示/隐藏查找栏
(function() {
  if (location == 'chrome://browser/content/browser.xul') {
    document.getElementById('cmd_find').setAttribute('oncommand',
      'if (!gFindBar || gFindBar.hidden) { gLazyFindCommand("onFindCommand") } else { gFindBar.close() }'
    );
  };
})();




// 在菜单中添加重启浏览器菜单选项
(function()
{
    var quitBtn = document.getElementById("appMenu-quit-button");
    if (!quitBtn) return;

    var restartBtn = document.createElement("toolbarbutton");
    restartBtn.setAttribute("label", "\u91cd\u65b0\u542f\u52a8");
    restartBtn.setAttribute("class", "subviewbutton subviewbutton-iconic");
    restartBtn.setAttribute("id", "restart-button");

    restartBtn.addEventListener("command", function()
    {
        const APP_START = Components.classes['@mozilla.org/toolkit/app-startup;1']
            .getService(Components.interfaces.nsIAppStartup);
        APP_START.quit(APP_START.eRestart | APP_START.eAttemptQuit);
    }, false);
    quitBtn.parentNode.insertBefore(restartBtn, quitBtn);
})();



// 搜索框增加“粘贴并搜索”选项
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

    item = doc.createElement("menuitem");
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

