// ==UserScript==
// @name                SimpleMusicPlayer.uc.js
// @author               ywzhaiqi
// @namespace         https://github.com/ywzhaiqi
// @description         简单音乐播放面板，支持多个站点，参考了百度随心听播放栏UC脚本。
// @include              main
// @charset              UTF-8
// @version              2019.02.20 修改 Listen 1 弹出方式 @runningcheese
// @version              2018.06.16 Fix 60+ by @runningcheese
// @version              2015.08.05 新增电台 by @runningcheese
// @version              2015.01.26 简单更新修复按钮失效，更新部分站点样式
// @version              2014.10.13 build
// @homepageURL    https://github.com/ywzhaiqi/userChromeJS/tree/master/SimpleMusicPlayer
// @downloadURL     https://github.com/ywzhaiqi/userChromeJS/raw/master/SimpleMusicPlayer/SimpleMusicPlayer.uc.js
// @startup              window.SimpleMusicPlayer.init();
// @shutdown          window.SimpleMusicPlayer.uninit();
// ==/UserScript==

(function() {

	var Config = {
		isUrlBar: 0,// 0 为可移动按钮，1 为地址栏
		addAutoPopup: 0,	// 1 为添加鼠标移过自动弹出面板功能，0 为不添加。注意：启用后会有误触发。
		iframeStyle: {
			normal: "width: 960px; height: 650px;",
			mobile: "width: 320px; height: 480px;",
		},
		logo: { 
			main: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAgVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABtFS1lAAAAKnRSTlMAw2oP7hTi3bodC/LpLwT71tHHrZ2VinFOKCLr58y+r6B3YlVHRDw6Ggf5bzguAAAAjUlEQVQY02XNWRKDIBBF0WcjggM4GzXznLj/BUYEio/cn+4+RRWwMTVlCI1RXFdxq9yp+2rUAKOCLAzSvZ7F3Yx3wuBShVlbAnyXHYCcB3hIgBe0F5G5SpGQANJyuWGDhXV5vELyyTzweQPAA/gKPNcegFcNQFIAab6dDgNZeJ6br1nSvunMPJ6uGf77ATrvBp+W08HeAAAAAElFTkSuQmCC",
		},
	};


	var Sites = [
{
		name: "网易音乐",
		url: "https://music.163.com/",
		iframeStyle: "width: 1080px; height: 600px;",
	}, {
		name: "豆瓣FM",
		url: "https://douban.fm/",
		iframeStyle: "width: 420px; height: 680px;",
	}, {
		name: "心理FM",
		url: "http://m.xinli001.com/fm/",
		iframeStyle: "width: 420px; height: 650px;",
	},
 {
		name: "蜻蜓FM",
		url: "https://tingfm.com/",
		iframeStyle: "width: 420px; height: 650px;",
	},
{
		name: "喜马拉雅",
		url: "http://m.ximalaya.com/",
		iframeStyle: "width: 450px; height: 680px;",
		css: ".app-bar{display: none !important;}",
	}, {
		name: "奶酪电台",
		url: "https://www.runningcheese.com/songs",
		iframeStyle: "width: 420px; height: 650px;",
		css: "#main .tab-content,.footer-ad,#main .tab-con, #bk-header .toolbar-search, #bk-header .toolbar-icon, .part .font12{display: none !important;}",
	},
 {
		name: "国际电台",
		url: "https://www.fifm.net/",
		iframeStyle: "width: 420px; height: 650px;",
	},{
		name: "环境音乐",
		url: "http://music.lavaradio.com/",
		iframeStyle: "width: 1130px; height: 700px;",
	},{
		name: "白噪音",
		url: "https://www.noisli.com/",
		iframeStyle: "width: 420px; height: 650px;",
	},
	];


	// 来自 User Agent Overrider 扩展
	const ToolbarManager = (function() {

		/**
		 * Remember the button position.
		 * This function Modity from addon-sdk file lib/sdk/widget.js, and
		 * function BrowserWindow.prototype._insertNodeInToolbar
		 */
		let layoutWidget = function(document, button, isFirstRun) {

			// Add to the customization palette
			let toolbox = document.getElementById('navigator-toolbox');
			toolbox.palette.appendChild(button);

			// Search for widget toolbar by reading toolbar's currentset attribute
			let container = null;
			let toolbars = document.getElementsByTagName('toolbar');
			let id = button.getAttribute('id');
			for (let i = 0; i < toolbars.length; i += 1) {
				let toolbar = toolbars[i];
				if (toolbar.getAttribute('currentset').indexOf(id) !== -1) {
					container = toolbar;
				}
			}

			// if widget isn't in any toolbar, default add it next to searchbar
			if (!container) {
				if (isFirstRun) {
					container = document.getElementById('nav-bar');
				} else {
					return;
				}
			}

			// Now retrieve a reference to the next toolbar item
			// by reading currentset attribute on the toolbar
			let nextNode = null;
			let currentSet = container.getAttribute('currentset');
			let ids = (currentSet === '__empty') ? [] : currentSet.split(',');
			let idx = ids.indexOf(id);
			if (idx !== -1) {
				for (let i = idx; i < ids.length; i += 1) {
					nextNode = document.getElementById(ids[i]);
					if (nextNode) {
						break;
					}
				}
			}

			// Finally insert our widget in the right toolbar and in the right position
			container.insertItem(id, nextNode, null, false);

			// Update DOM in order to save position
			// in this toolbar. But only do this the first time we add it to the toolbar
			if (ids.indexOf(id) === -1) {
				container.setAttribute('currentset', container.currentSet);
				document.persist(container.id, 'currentset');
			}
		};

		let addWidget = function(window, widget, isFirstRun) {
			try {
				layoutWidget(window.document, widget, isFirstRun);
			} catch (error) {
				trace(error);
			}
		};

		let removeWidget = function(window, widgetId) {
			try {
				let widget = window.document.getElementById(widgetId);
				widget.parentNode.removeChild(widget);
			} catch (error) {
				trace(error);
			}
		};

		let exports = {
			addWidget: addWidget,
			removeWidget: removeWidget,
		};
		return exports;
	})();

	// 来自 User Agent Overrider 扩展
	const Pref = function(branchRoot) {

		const supportsStringClass = Cc['@mozilla.org/supports-string;1'];
		const prefService = Cc['@mozilla.org/preferences-service;1'].getService(Ci.nsIPrefService);

		const new_nsiSupportsString = function(data) {
			let string = supportsStringClass.createInstance(Ci.nsISupportsString);
			string.data = data;
			return string;
		};

		let branch = prefService.getBranch(branchRoot);

		let setBool = function(key, value) {
			try {
				branch.setBoolPref(key, value);
			} catch (error) {
				branch.clearUserPref(key)
				branch.setBoolPref(key, value);
			}
		};
		let getBool = function(key, defaultValue) {
			let value;
			try {
				value = branch.getBoolPref(key);
			} catch (error) {
				value = defaultValue || null;
			}
			return value;
		};

		let setInt = function(key, value) {
			try {
				branch.setIntPref(key, value);
			} catch (error) {
				branch.clearUserPref(key)
				branch.setIntPref(key, value);
			}
		};
		let getInt = function(key, defaultValue) {
			let value;
			try {
				value = branch.getIntPref(key);
			} catch (error) {
				value = defaultValue || null;
			}
			return value;
		};

		let setString = function(key, value) {
			try {
				branch.setComplexValue(key, Ci.nsISupportsString, new_nsiSupportsString(value));
			} catch (error) {
				branch.clearUserPref(key)
				branch.setComplexValue(key, Ci.nsISupportsString, new_nsiSupportsString(value));
			}
		};
		let getString = function(key, defaultValue) {
			let value;
			try {
				value = branch.getComplexValue(key, Ci.nsISupportsString).data;
			} catch (error) {
				value = defaultValue || null;
			}
			return value;
		};

		let reset = function(key) {
			branch.clearUserPref(key);
		};

		let addObserver = function(observer) {
			try {
				branch.addObserver('', observer, false);
			} catch (error) {
				trace(error);
			}
		};
		let removeObserver = function(observer) {
			try {
				branch.removeObserver('', observer, false);
			} catch (error) {
				trace(error);
			}
		};

		let exports = {
			setBool: setBool,
			getBool: getBool,
			setInt: setInt,
			getInt: getInt,
			setString: setString,
			getString: getString,
			reset: reset,
			addObserver: addObserver,
			removeObserver: removeObserver
		}
		return exports;
	};


	/* main */
	if (window.SimpleMusicPlayer) { // 修改调试用，重新载入无需重启
		window.SimpleMusicPlayer.uninit();
		delete window.SimpleMusicPlayer;
	};

	function Player(doc, info) {
		this.init.apply(this, arguments);
	};
	Player.prototype = {
		init: function(doc, info) {
			this.doc = doc;
			this.win = this.doc.defaultView;
			this.unsafeWindow = this.win.wrappedJSObject

			this.info = info;
			this.control = this.info.control || {};
			this.state = this.info.state || {};
		},
		isPlaying: function() {
			var func = this.state.isPlaying;
			if (func) {
				return this.commondDo(func);
			}
		},
		isLoved: function() {
			var func = this.state.isLoved;
			if (func) {
				return this.commondDo(func);
			}
		},
		love: function() {
			this.commondDo('love');

			this.setLoveStyle();
		},
		setLoveStyle: function() {
			// 需要延时？
			var isLoved = this.isLoved();
			if (isLoved == undefined) return; // 该站点并不存在 isLoved 参数

			// 改变菜单的图标和名称？
			var loveMenu = document.querySelector('.SimpleMusicPlayer-icon-love');
			if (!loveMenu) return;

			if (isLoved) {
				loveMenu.setAttribute('loved', 'true');
			} else {
				loveMenu.removeAttribute('loved');
			}
		},
		do: function(action) {
			if (typeof(this[action]) == 'function') {
				this[action]();
			} else {
				var func = this.control[action];
				if (func) {
					this.commondDo(func);
				}
			}
		},
		commondDo: function(func) {
			// 文字 function ？
			if (typeof(func) == 'string' && func.match(/^(return|win|doc)/)) {
				func = new Function("win", "doc", func);
			}

			if (typeof(func) == 'function') {
				try {
					return func.apply(this.unsafeWindow, [this.unsafeWindow, this.doc]);
				} catch (ex) {}
			} else {
				var button = this.doc.querySelector(func);
				if (button) {
					clickOrTap(button);
				}
			}
		},

		//--- 辅助函数 ----
		clickOrTap: function(selector) {
			if (!selector) return;

			var button = this.doc.querySelector(selector);
			if (!button) return;

			if (this.info.changeUA) {
				this.fireEvent(button, 'tap');
			} else {
				button.click();
			}
		},
		fireEvent: function(el, type) {
			var e = this.doc.createEvent('HTMLEvents');
			e.initEvent(type, true, true);
			return !el.dispatchEvent(e);　
		},
	};

	window.SimpleMusicPlayer = {
		get prefs() { return Pref('userChromeJS.SimpleMusicPlayer.')}, 
		get curSiteIndex() { return this.prefs.getInt("curSiteIndex") || 0}, 
		set curSiteIndex(num) {	this.prefs.setInt("curSiteIndex", num);		},

		init: function() {
			var self = this;

			this.addCSS();

			this.addIcon();

			if (Config.addAutoPopup) {
				this.addAutoPopup();
			}
		},
		uninit: function() {
			["SimpleMusicPlayer", "SimpleMusicPlayer-popup", "SimpleMusicPlayer-panel"].forEach(function(id) {
				var elem = $(id);
				if (elem) {
					elem.parentElement.removeChild(elem);
				}
			});
			this.style && this.style.parentNode.removeChild(this.style);
		},
		addCSS: function() {
			var css = '\
				#SimpleMusicPlayer {\
          -moz-appearance: none !important;\
					border-style: none !important;\
					border-radius: 0 !important;\
					margin: 4px 4px 4px 2px !important;\
					background: transparent !important;\
					box-shadow: none !important;\
					-moz-box-align: center !important;\
					-moz-box-pack: center !important;\
					width: 30px !important;\
				}\
       #SimpleMusicPlayer:hover {\
        background-color: #e5e5e5 !important; \
				}\
        #SimpleMusicPlayer-panel .panel-arrow {\
        padding-right: 16px !important;\
				}\
				#SimpleMusicPlayer > .toolbarbutton-icon {\
          width:16px!important;\
          height:16px!important;\
					padding: 0 !important;\
					border: 0 !important;\
					background-image: none !important;\
					background-color: transparent !important;\
					box-shadow: none !important;\
					-moz-transition: none !important;\
				}\
				#SimpleMusicPlayer dropmarker { display:none; }\
                #SimpleMusicPlayer { list-style-image: url(' + Config.logo.main + ') }\
				'.replace(/[\r\n\t]/g, '');;
			this.style = addStyle(css);
		},
		addIcon: function() {
			var button = $C("toolbarbutton", {
				id: "SimpleMusicPlayer",
				class: ".toolbarbutton-icon",
				label: "音乐",
				tooltiptext: "左键：弹出音乐播放面板\n右键：面板控制和切换",
				context: "SimpleMusicPlayer-popup",
				onclick: "if (event.button != 2) SimpleMusicPlayer.iconClick(event);",
				removable: true,
			});

			if (Config.isUrlBar) {
				$("urlbar-icons").appendChild(button);
			} else {
				ToolbarManager.addWidget(window, button, false);
			}

			this.icon = $('SimpleMusicPlayer');

			// 右键菜单
			var menuPopup = $C("menupopup", {
				id: "SimpleMusicPlayer-popup",
				// position: "after_start",
				position: "bottomcenter topright",
				onpopupshowing: "SimpleMusicPlayer.onPopupShowing(event);"
			});

			// 添加关闭按钮
			menuPopup.appendChild($C("menuitem", {
				label: "关闭",
				oncommand: "SimpleMusicPlayer.close()",
			}));

			// 添加分割线
			menuPopup.appendChild($C("menuseparator"));

			// 添加 Listen1 标签
			menuPopup.appendChild($C("menuitem", {
				label: "Listen1",
				oncommand: "gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTrustedTab('moz-extension://b4d8f71e-dea8-4d3d-9b85-3202a25669d0/listen1.html', {triggeringPrincipal: gBrowser.contentPrincipal}), x);",
			}));




			// 根据站点添加菜单
			Sites.forEach(function(site, index) {
				menuPopup.appendChild($C('menuitem', {
					label: site.name,
					class: "SimpleMusicPlayer-site",
					type: "radio",
					checked: self.curSiteIndex == index,
					disabled: (site.enable == undefined ? false : site.enable),
					oncommand: "SimpleMusicPlayer.changeSite(" + index + ");",
					onclick: "SimpleMusicPlayer.siteMenuClick(event);",
					url: site.url,
				}));
			});

			// panel
			var panel = $C("panel", {
				id: "SimpleMusicPlayer-panel",
				type: "arrow",
				flip: "slide",
				// side: "top",
				consumeoutsideclicks: "false",
				noautofocus: "false",
				panelopen: "true",
			});

			// panel 里添加 iframe
			var iframe = panel.appendChild($C("iframe", {
				id: "SimpleMusicPlayer-iframe",
				type: "content",
				flex: "1",
				transparent: "transparent",
				style: Config.iframeStyle.mobile,
				context: "contentAreaContextMenu",
			}));

			var mainPopupSet = $("mainPopupSet");
			this.menuPopup = mainPopupSet.appendChild(menuPopup);
			this.panel = mainPopupSet.appendChild(panel);
			this.iframe = iframe;
		},
		addAutoPopup: function() {
			var self = this;
			this.icon.addEventListener('mouseover', function() {
				if (self.hideTimer) {
					clearTimeout(self.hideTimer);
					self.hideTimer = null;
				}
				self.popupTimer = setTimeout(self.openPanel.bind(self), 200);
			}, false);
			this.icon.addEventListener('mouseout', function() {
				if (self.popupTimer) {
					clearTimeout(self.popupTimer);
					self.popupTimer = null;
				}
				self.hideTimer = setTimeout(function() {
					self.panel.hidePopup();
				}, 500);
			}, false);

			this.panel.addEventListener('mouseover', function() {
				if (self.hideTimer) {
					clearTimeout(self.hideTimer);
					self.hideTimer = null;
				}
			}, false);
			this.panel.addEventListener('mouseout', function() {
				self.hideTimer = setTimeout(function() {
					self.panel.hidePopup();
				}, 500);
			}, false);
		},
		iconClick: function(event) {
			this.openPanel();
		},
		changeSite: function(siteIndex) {
			// 如果是窗口的情况，则 doc 不正确
			var iframe = $("SimpleMusicPlayer-iframe");
			var doc = iframe.contentDocument;

			this.curSiteIndex = siteIndex;

			this.rebuildControls();

			this.player = new Player(doc, Sites[siteIndex]);

			this.openPanel(siteIndex);
		},
		siteMenuClick: function(event) {
			if (event.button == 2) {
				event.stopPropagation();
				event.preventDefault();

				var url = event.target.getAttribute('url');
				openLinkIn(url, 'tab', {
					inBackground: false
				});

				var popupMenu = event.target.parentNode;
				popupMenu.hidePopup();
			}
		},
		onPopupShowing: function(event) {
			this.player && this.player.setLoveStyle();
		},
		openPanel: function(siteIndex) {
			var self = this;
			var icon = $('SimpleMusicPlayer'),
				panel = $("SimpleMusicPlayer-panel"),
				iframe = $("SimpleMusicPlayer-iframe");

			var openPopup = function() {
					panel.openPopup(icon, "after_end", 0, 0, false, null, null);
				};

			// 非切换站点，直接打开面板执行的动作
			if (siteIndex === undefined) {
				if (this.newWindow) {
					try {
						this.newWindow.focus();
						return;
					} catch (ex) {
						this.newWindow = null;
					}
				} else if (iframe.src && iframe.src != "about:blank") {
					openPopup();
					return;
				}
			}

			// 先设为空白，加快速度？
			this.setIframeSrc("about:blank", iframe);

			if (siteIndex === undefined) {
				siteIndex = this.curSiteIndex;
			}

			var curSite = Sites[this.curSiteIndex],
				url = curSite.url;
			this.curSite = curSite;

			// 打开新窗口的
			if (curSite.isWindow) {
				if (this.newWindow) {
					// 如果是当前选中的激活，否则关闭上一个窗口，打开新窗口。
					if (this.curSiteIndex == siteIndex) {
						try {
							this.newWindow.focus();
							return;
						} catch (ex) {
							this.newWindow = null;
						}
					} else {
						this.close();
					}
				}

				this.newWindow = window.open(curSite.url, '', curSite.windowFeatures);

				// 向窗口插入 css
				var addStyle = function(css, doc) {
						var style = doc.createElement("style");
						style.textContent = css;
						doc.head.appendChild(style);
					};
				if (curSite.css) {
					setTimeout(function() {
						addStyle(curSite.css, self.newWindow.document)
					}, 500);
				}

				this.curSiteIndex = siteIndex;
				this.rebuildControls();
				return;
			}

			this.curSiteIndex = siteIndex;
			this.rebuildControls();

			// set iframe style
			var iStyle = curSite.iframeStyle;
			if (iStyle) {
				if (iStyle == "mobile") {
					iStyle = Config.iframeStyle.mobile;
				}
			} else {
				iStyle = curSite.changeUA ? Config.iframeStyle.mobile : Config.iframeStyle.normal;
			}
			iframe.setAttribute("style", iStyle);

			// 强制链接在 iframe 里打开
			var onclick = curSite.openLinkInsided ? "SimpleMusicPlayer.openLinkInIframe(event);" : "";
			iframe.setAttribute("onclick", onclick)

			// 设置 UA
			if (curSite.changeUA) {
				UAManager.change(Config.mobileUAString);
			}

			this.setIframeSrc(url, iframe);

			iframe.removeEventListener("DOMContentLoaded", this.iframeOnload, false);
			iframe.addEventListener("DOMContentLoaded", this.iframeOnload, false);

			openPopup();

			// 还原 UA
			if (curSite.changeUA) {
				UAManager.revert();
			}
		},
		iframeOnload: function(event) { // this 非 SimpleMusicPlayer
			var doc = event.originalTarget;
			if (doc.location.href == "about:blank") return;

			var curSite = SimpleMusicPlayer.curSite;

			// 添加样式
			var style = doc.createElement("style");
			style.textContent = curSite.css;
			doc.head.appendChild(style);
		},
		close: function() {
			if (this.newWindow) {
				try { // 可能是 dead object
					this.newWindow.close();
				} catch (ex) {}
				this.newWindow = null;
			} else {
				this.resetIframe();
			}
		},
		setIframeSrc: function(url, iframe) {
			if (!iframe) {
				iframe = $('SimpleMusicPlayer-iframe');
			}

			// 两个地址都要改?mdc是按照第二个写的,真正有效的也是第二个,第一个是以后用来比较用的
			iframe.src = url;
			iframe.contentDocument.location.href = url;
		},
		resetIframe: function() {
			var iframe = $('SimpleMusicPlayer-iframe');
			iframe.setAttribute('style', Config.iframeStyle.mobile);
			this.setIframeSrc('about:blank', iframe);
		},
		rebuildControls: function(menuPopup) {
			var site = Sites[this.curSiteIndex];

			if (!menuPopup) {
				menuPopup = $('SimpleMusicPlayer-popup');
			}

			// 移除原有菜单
			var menuitems = menuPopup.querySelectorAll('.control');
			for (var i = menuitems.length - 1; i >= 0; i--) {
				menuitems[i].parentNode.removeChild(menuitems[i]);
			}

			if (!site.control) {
				return;
			}

			var ins = menuPopup.querySelector('.SimpleMusicPlayer-site');

			// 添加新的菜单
			for (let[action, ] in Iterator(site.control)) {
				let menuitem = $C('menuitem', {
					label: Config.names[action][0] || action,
					accesskey: Config.names[action][1],
					class: 'menuitem-iconic control ' + 'SimpleMusicPlayer-icon-' + action,
					oncommand: "SimpleMusicPlayer.doAction('" + action + "')",
					onclick: "if(event.button != 0) {event.stopPropagation();event.preventDefault();" + "SimpleMusicPlayer.doAction('" + action + "');}",
				});

				menuPopup.insertBefore(menuitem, ins);
			}

			menuPopup.insertBefore(
			$C('menuseparator', {
				class: 'control'
			}), ins);
		},
		doAction: function(action) {
			if (!action) return;

			var iframe = $('SimpleMusicPlayer-iframe');
			if (!iframe) return;

			var
			site = Sites[this.curSiteIndex],
				win = iframe.contentWindow,
				doc = iframe.contentDocument,
				unsafeWindow = win.wrappedJSObject;

			var doAction = site.control[action];
			switch (true) {
			case typeof(doAction) == 'function':
				doAction.apply(unsafeWindow, [unsafeWindow, doc]);
				break;
			case Array.isArray(doAction):
				// 播放盒暂停、收藏和取消收藏等2个按钮和一的行为
				var btn1 = doc.querySelector(doAction[0]),
					btn2 = doc.querySelector(doAction[1]);
				if (btn1 && btn2) {
					var getState = function() {
							var style = btn1.getAttribute('style');
							return style && style.indexOf('display: none') != -1;
						};
					var oldState = getState();

					clickOrTap(oldState ? btn2 : btn1);

					// 检测是否成功？
					var newState = getState();
					if (newState != oldState) {
						console.log(action + ' 状态切换成功')
					} else {
						console.log(action + ' 状态切换失败')
					}
				}
				break;
			case typeof(doAction) != 'string':
				return;
			case doAction.startsWith('win'):
				new Function("win", doAction).apply(unsafeWindow, [unsafeWindow, doc]);
				break;
			default:
				var button = doc.querySelector(doAction);
				if (button) {
					clickOrTap(button);
				}
				break;
			}

			function clickOrTap(button) {
				if (site.changeUA) {
					fireEvent(button, 'tap');
				} else {
					button.click();
				}
			}

			function fireEvent(el, type) {
				var e = doc.createEvent('HTMLEvents');
				e.initEvent(type, true, true);
				return !el.dispatchEvent(e);　
			}
		},
		openLinkInIframe: function(event) {
			var findLink = function(element) {
					switch (element.tagName) {
					case 'A':
						return element;

					case 'B':
					case 'I':
					case 'SPAN':
					case 'SMALL':
					case 'STRONG':
					case 'EM':
					case 'BIG':
					case 'SUB':
					case 'SUP':
					case 'IMG':
					case 'S':
						var parent = element.parentNode;
						return parent && findLink(parent);

					default:
						return null;
					}
				};
			var link = findLink(event.target);
			if (!link) return;

			var href = link.href;

			if (href && href.match(/^(https?|ftp):\/\//)) {
				event.preventDefault();
				event.stopPropagation();
				SimpleMusicPlayer.setIframeSrc(href);
			}
		}
	};


	window.SimpleMusicPlayer.init();

	function $(id, doc) {
		return (doc || document).getElementById(id)
	};

	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) {
			return el.setAttribute(n, attr[n]);
		});
		return el;
	}

	function addStyle(css) {
		var pi = document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"');
		return document.insertBefore(pi, document.documentElement);
	}
})()


