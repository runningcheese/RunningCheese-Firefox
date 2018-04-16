// ==UserScript==
// @name           ButtonEventListener.uc.js
// @description    为工具栏图标增加点击功能
// @author          runningcheese
// @reference      zbinlin, skofkyo, 小蛐蛐等等
// @update         2018-04-04 增加一些功能
// @update         2018-03-18 fix for 57+
// @update         2017-11-30
// @update         2017-02-09
// @license          MIT License
// @compatibility  Firefox 57+
// @charset         UTF-8
// @reviewURL     https://www.runningcheese.com
// ==/UserScript==


/*自动切换到鼠标移动到的标签页*/
/*
((g, w) => {
  class TabPlus {
    constructor() {
      this.SelectedTabOnMouseover();
    }
    SelectedTabOnMouseover(timeout) {
      g.tabContainer.addEventListener('mouseover', e => {
        if (e.target.localName !== 'tab') return;
        timeout = setTimeout(() => g.selectedTab = e.target, 250);
      }, false);
      g.tabContainer.addEventListener('mouseout', () => clearTimeout(timeout), false);
    }
  }
  new TabPlus();
})(gBrowser, window);
*/


/*右键关闭标签页*/
/*
((g, w) => {
  class TabPlus {
    constructor() {
      this.rightClick()
    }
    rightClick() {
      g.tabContainer.addEventListener('click', e => {
         if (e.button === 2 && e.target.localName === "tab" && !e.ctrlKey) {
           e.preventDefault();
           g.removeTab(e.target);
           e.stopPropagation();
         }
      }, false);
    }
  }
  new TabPlus();
})(gBrowser, window);
*/



// 双击标签页关闭标签页
gBrowser.tabContainer.addEventListener('dblclick', function(event) {
  if (event.target.localName == 'tab' && event.button == 0) {
    gBrowser.removeTab(event.target, {animate: true});
  }
});



// 设置标签最大宽度
{var ruleEndPosition = document.styleSheets[1].cssRules.length;
document.styleSheets[1].cssRules[document.styleSheets[1].insertRule('.tabbrowser-tab:not([pinned]){}', ruleEndPosition)];
document.styleSheets[1].cssRules[ruleEndPosition].style.maxWidth="250px";
}


//指定代码文本编辑器
{location == 'chrome://browser/content/browser.xul' && (function(){
var PATH1 = Services.dirsvc.get("UChrm", Ci.nsIFile).path + "\\Local\\Notepad2\\Notepad2.exe";
Services.prefs.setCharPref('view_source.editor.path', PATH1);
})()
}



//在网页的输入框里加入“粘贴并确定”
{	let undo = document.getElementById('context-undo');
	window.CQC = {};
	undo.setAttribute('label', '粘贴并确定');
	undo.removeAttribute('command');
	window.CQC.pastego = () => {
		goDoCommand("cmd_selectAll");
		goDoCommand("cmd_paste");
		window.QueryInterface(Ci.nsIInterfaceRequestor)
			.getInterface(Ci.nsIDOMWindowUtils)
			.sendKeyEvent("keypress", KeyEvent.DOM_VK_RETURN, 0, 0);
	}
	undo.setAttribute('oncommand', 'CQC.pastego()');
}



//鼠标移动到地址栏和搜索栏时自动全选里面的文字
{if (location == "chrome://browser/content/browser.xul") {
var autselectpulbar = document.getElementById("urlbar-container");
autselectpulbar.addEventListener("mouseover", function(event){
            if(event.target.compareDocumentPosition(document.activeElement)!= 20)
                    event.target.select();
    }, false);

var autselectpsearchbar = document.getElementById("searchbar");
autselectpsearchbar.addEventListener("mouseover", function(event){
            if(event.target.compareDocumentPosition(document.activeElement)!= 20)
                    event.target.select();
    }, false);
}
};





// 自动恢复地址栏地址显示
{if (location == "chrome://browser/content/browser.xul") {
    var ub = document.getElementById("urlbar");
    ub.addEventListener("blur", function () {
        this.handleRevert();
    }, false);
}
};


//搜索后自动清除搜索栏内容
(function () {
  var searchbar = document.getElementById("searchbar");
  if (BrowserSearch.searchBar && !document.getElementById('omnibar-defaultEngine')) {
			BrowserSearch.searchBar.addEventListener("blur", function () {
				this.value = "";
			}, !1);
		}
})();




//中键点击地址栏自动复制网址
document.getElementById('urlbar').addEventListener('click', function(e) {
	if (e.button == 1) goDoCommand('cmd_copy');
}, false);


// 失出焦点自动关闭查找栏
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





// 右键 历史按钮 恢复最后关闭的标签
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




//右键  三道杠 列出当前打开标签
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



//左键 alltabs-button 用Tab Center Redux 代替展示
	(function(doc) {
		var OpenAllTabsButton = doc.getElementById('alltabs-button');
		if (!OpenAllTabsButton) return;
		var menupopup = OpenAllTabsButton.firstChild;
		OpenAllTabsButton.addEventListener("click", function(e) {
			if (e.button == 0) {
        e.preventDefault();
				e.stopPropagation();
        document.getElementById('alltabs-popup').style.display="none";
			document.getElementById("button__0ad88674-2b41-4cfb-99e3-e206c74a0076_-sidebar-action").click();  Services.prefs.setBoolPref("sidebar.position_start",false); 
			}
		}, false);
	})(document);





	//右键 地址栏书签图标 打开书签管理界面
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




//右键 新建标签按钮访问剪切板内容
location=="chrome://browser/content/browser.xul" &&
window.addEventListener("click", function(e) {
    if (e.button === 2 && e.originalTarget.matches(".tabs-newtab-button")) {
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


//中键点击新建标签页按钮 恢复关闭的标签页
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


//刷新按钮移动到地址栏
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



	//右键  地址栏刷新图标 强制刷新页面（跳过缓存）
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




//关闭标签页后选择左侧标签  
(function () {
      gBrowser.tabContainer.addEventListener("TabClose", tabCloseHandler, false);
      function tabCloseHandler(event) {
        var tab = event.target;
        gBrowser.selectedTab = tab;
        if (gBrowser.mCurrentTab._tPos != 0) {
          gBrowser.tabContainer.advanceSelectedTab(-1, true);
        }
      }
    })();



// 在新标签页查看图片
location == "chrome://browser/content/browser.xul" && (function () {
    document.querySelector("#context-viewimage").setAttribute("oncommand", 'openUILinkIn(gContextMenu.imageURL,"tab")');
})(); 



//标签栏鼠标滚轮切换标签页 
 (function() {
  // if (location != 'chrome://browser/content/browser.xul')
  //   return;
  const scrollRight = true;
  const wrap = true;
  gBrowser.tabContainer.addEventListener("wheel", function(event) {
    let dir = (scrollRight ? 1 : -1) * Math.sign(event.deltaY);
    setTimeout(function() {
      gBrowser.tabContainer.advanceSelectedTab(dir, wrap);
    }, 0);
  }, true);
})(); 


//在 Firefox 57 新版的菜单中添加重启浏览器菜单选项
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


	//右键Identity-Box图标 弹出 选项菜单
	(function() {

		var faviconContextMenu = {

			init: function() {
				this.additem();
				//$("identity-box").setAttribute("context", "faviconContextMenu");
				//$("notification-popup-box").setAttribute("context", "faviconContextMenu");
				$("urlbar").setAttribute("context", "faviconContextMenu");
				$("urlbar").setAttribute('class', 'menu-iconic');
			},

			additem: function() {
				var mp = $C("menupopup", {
					id: "faviconContextMenu",
				});
				$('mainPopupSet').appendChild(mp);
				var menues = [
          {
					label: "地址根目录",
					oncommand:function() { gBrowser.loadURI("javascript:document.location.href=window.location.origin?window.location.origin+'/':window.location.protocol+'/'+window.location.host+'/'");},
				},
          {
					label: "地址上一层",
					oncommand:function() { gBrowser.loadURI("javascript:window.location.href=window.location.href.substring(0,window.location.href.substring(0,window.location.href.length-1).lastIndexOf('/')+1);");},
				},{
					label: "http转https",
					oncommand:function() { gBrowser.loadURI("javascript:(function(){document.location.href=document.location.href.replace('http:','https:')})();");},
				},{
					label: "生成短网址",
          tooltiptext: "已复制到粘贴板",
					oncommand: "SinaShortURL();",
				},{
					label: "生成二维码",
					oncommand: function() { gBrowser.loadURI("javascript:(function(){if(document.getElementById){var%20x=document.body;var%20o=document.createElement('script');if(typeof(o)!='object')%20o=document.standardCreateElement('script');o.setAttribute('src','https://git.oschina.net/runningcheese/JiathisQR.js/raw/master/jiathisqr.js');o.setAttribute('type','text/javascript');x.appendChild(o);}})();");},
				},{
					label: "sep",
				}, {
					label: "查看页面信息",
					oncommand: "BrowserPageInfo();",
        }, {
					label: "进入阅读模式",
          tooltiptext: "已复制到粘贴板",
					oncommand: "ReaderParent.toggleReaderMode(event);",
				},{
					label: "谷歌缓存查询",
          tooltiptext: "注意：需要科学上网",
					oncommand: "gBrowser.addTab('https://webcache.googleusercontent.com/search?q=cache:' + decodeURIComponent(gBrowser.currentURI.spec));",
				}, {
					label: "网站综合信息",
          tooltiptext: "包括IP, SEO, Alexa, Whois查询",
					oncommand: function () {var eTLDService = Cc["@mozilla.org/network/effective-tld-service;1"].getService(Ci.nsIEffectiveTLDService); gBrowser.addTab('http://ip.chinaz.com/' + decodeURIComponent(gBrowser.currentURI.spec)); gBrowser.addTab('http://seo.chinaz.com/?q=' + decodeURIComponent(gBrowser.currentURI.spec)); gBrowser.addTab('http://www.alexa.com/siteinfo/' + decodeURIComponent(gBrowser.currentURI.spec)); gBrowser.addTab('http://whois.chinaz.com/' + eTLDService.getBaseDomain(makeURI(gBrowser.selectedBrowser.currentURI.spec)));}
				}, 

];
				var i, item, menue;
				for (i = 0; i < menues.length; i++) {
					menue = menues[i];
					if (menue.label == "sep") {
						item = $C('menuseparator');
					} else {
						item = $C('menuitem', {
							label: menue.label,
							class: "menuitem-iconic",
							oncommand: menue.oncommand,
						});
					}
					mp.appendChild(item);
				}
			},

			//command命令指定   

			Copy: function(string) {
				Components.classes["@mozilla.org/widget/clipboardhelper;1"].getService(Components.interfaces.nsIClipboardHelper).copyString(string);
			},

			toBase64: function(icon) {
				const NSURI = "http://www.w3.org/1999/xhtml";
				var img = new Image();
				var that = this;
				img.onload = function() {
					var width = this.naturalWidth,
						height = this.naturalHeight;
					var canvas = document.createElementNS(NSURI, "canvas");
					canvas.width = width;
					canvas.height = height;
					var ctx = canvas.getContext("2d");
					ctx.drawImage(this, 0, 0);
					that.Copy(canvas.toDataURL("image/png"));
				};
				img.onerror = function() {
					Components.utils.reportError("Count not load: " + icon);
				};
				img.src = icon;
			},

		};

		faviconContextMenu.init();
		window.faviconContextMenu = faviconContextMenu;

		function $(id) document.getElementById(id);

		function $C(name, attr) {
			var el = document.createElement(name);
			if (attr) Object.keys(attr).forEach(function(n) {
				if (typeof attr[n] === 'function') {
					el.setAttribute(n, '(' + attr[n].toSource() + ').call(this, event);');
				} else {
					el.setAttribute(n, attr[n]);
				}
			});
			return el;
		}
	}());





//------------新建Header Editor用户代理图标-----------
(function () {
	CustomizableUI.createWidget({
		id : "UserAgentChanger",
		label : "用户代理",
		tooltiptext : "Header Editor",
		onClick : function (event) {
			switch (event.button) {
			case 0:
				// 左键：选择用户代理
  (function(){
       window.open("moz-extension://4d2f0ccd-4b48-4d63-bbb6-f924b7cc7581/manage.html","Header Editor","resizable,scrollbars,status,title","centerscreen").resizeTo(450, 680);
    })();
				break;
			case 1:
				break;
			case 2:
				break;
			}
		}
	});

	var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
		 + '#UserAgentChanger .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAT0lEQVQ4jWNgoAaQl5d/Ly8v/59UjGzAfzzm47J0gA3AbRpuNdjC6T0pBmCogYsNDgMIxTdZBpDiArwpkaABxABiXEmUAbj4xBiAOyFRAgBPbmsFfCHniwAAAABJRU5ErkJggg==)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);
})();


//增加自定义函数

//新浪短网址 
function SinaShortURL() {
var appkey = "1562966081"; //你的新浪开放平台appkey
                    Url = "http://api.t.sina.com.cn/short_url/shorten.json?source=" + appkey + "&url_long=" + addMenu.convertText("%RLINK_OR_URL_ENCODE%");
                    httpRequest = new XMLHttpRequest();
                    httpRequest.open("GET", Url, true);
                    httpRequest.onload = function() {
                            var text = httpRequest.responseText;
                            var ret = JSON.parse(text);
                            addMenu.copy(ret[0].url_short);
                    }
                    httpRequest.send(null);
     alert('已复制到粘贴板！');
    }







