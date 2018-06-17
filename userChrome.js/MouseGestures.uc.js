// ==UserScript==
// @name                 Mousegestures.uc.js
// @namespace            Mousegestures@gmail.com
// @description          自定义鼠标手势,自用 DIY版
// @author               紫云飞&黒仪大螃蟹
// @homepageURL          http://www.cnblogs.com/ziyunfei/archive/2011/12/15/2289504.html
// @include              chrome://browser/content/browser.xul
// @charset              UTF-8
// ==/UserScript==
(() => {
	'use strict';
	let ucjsMouseGestures = {
		lastX: 0,
		lastY: 0,
		directionChain: '',
		isMouseDownL: false,
		isMouseDownR: false,
		hideFireContext: false,
		shouldFireContext: false,
		GESTURES: {
			'L': {name: '后退', cmd: () => getWebNavigation().canGoBack && getWebNavigation().goBack()},
			'R': {name: '前进', cmd: () => getWebNavigation().canGoForward && getWebNavigation().goForward()},


			'U': {name: '向上滚动', cmd: () => goDoCommand('cmd_scrollPageUp')},
			'D': {name: '向下滚动', cmd: () => goDoCommand('cmd_scrollPageDown')},


			'UD': {name: '刷新当前页面', cmd: function() {document.getElementById("Browser:Reload").doCommand();}},
			'DU': {name: '网址向上一层', cmd:  function() { loadURI(content.location.host + content.location.pathname.replace(/\/[^\/]+\/?$/, ""));}},
			'UDUD': {name: '跳过缓存刷新当前页面', cmd: function() {document.getElementById("Browser:ReloadSkipCache").doCommand();}},


			'RL': {name: '打开新标签', cmd:  function() { BrowserOpenTab();  }},
			'LR': {name: '恢复关闭的标签', cmd:  function() { try {	document.getElementById('History:UndoCloseTab').doCommand();} catch (ex) {if ('undoRemoveTab' in gBrowser) gBrowser.undoRemoveTab();	else throw "Session Restore feature is disabled."}	} },
    
			'UL': {name: '激活左边的标签页', cmd:  function(event) {gBrowser.tabContainer.advanceSelectedTab(-1, true);}},
			'UR': {name: '激活右边的标签页', cmd: function(event) {gBrowser.tabContainer.advanceSelectedTab(1, true);}},

			'ULU': {name: '激活第一个标签页', cmd:  function(event) {	gBrowser.selectedTab = (gBrowser.visibleTabs || gBrowser.mTabs)[0];}},
			'URU': {name: '激活最后一个标签页', cmd: function(event) { gBrowser.selectedTab = (gBrowser.visibleTabs || gBrowser.mTabs)[(gBrowser.visibleTabs || gBrowser.mTabs).length - 1];}},


			'DL': {name: '添加/移除书签', cmd:  function() {document.getElementById("Browser:AddBookmarkAs").doCommand();	} },
			'DR': {name: '关闭当前标签', cmd: function(event) {gBrowser.removeCurrentTab();}},


			'RU': {name: '转到页首', cmd: () => goDoCommand('cmd_scrollTop')},
			'RD': {name: '转到页尾', cmd: () => goDoCommand('cmd_scrollBottom')},


			'URD': {name: '打开附加组件',  cmd: function(event) {	BrowserOpenAddonsMgr();	}},
			'DRU': {name: '打开选项',  cmd: function(event) {		openPreferences(); }},


			'LU': {name: '查看页面信息', cmd: function(event) {	BrowserPageInfo(); }},
			'LD': {name: '侧边栏打开当前页', cmd: function(event) { openWebPanel(document.title, gBrowser.currentURI.spec);}},


			'LDR': {name: '打开历史窗口(侧边栏)',  cmd: function(event) {SidebarUI.toggle("viewHistorySidebar");	}},
			'RDL': {name: '打开书签工具栏',  cmd: function(event) {	var bar = document.getElementById("PersonalToolbar"); setToolbarVisibility(bar, bar.collapsed);	}},


			'RLRL': {name: '重启浏览器', cmd: function(event) {		Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit); 	}}, 
			'LRLR': {name: '重启浏览器', cmd: function(event) {		Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit);   }}, 
			'URDLU': {name: '关闭浏览器',  cmd: function(event) {		goQuitApplication();		}},


			'RULD': {name: '添加到稍后阅读',  cmd: function(event) {document.getElementById("pageAction-urlbar-_cd7e22de-2e34-40f0-aeff-cec824cbccac_").click();}},
			'RULDR': {name: '添加到稍后阅读',  cmd: function(event) {document.getElementById("pageAction-urlbar-_cd7e22de-2e34-40f0-aeff-cec824cbccac_").click();}},


		  'LDL': {name: '关闭左边的标签页', cmd: function(event) {	for (let i = gBrowser.mCurrentTab._tPos - 1; i >= 0; i--) if (!gBrowser.tabs[i].pinned){ gBrowser.removeTab(gBrowser.tabs[i], {animate: true});}}},
		  'RDR': {name: '关闭右边的标签页', cmd: function(event) {	gBrowser.removeTabsToTheEndFrom(gBrowser.mCurrentTab);	}},
		  'RDRD': {name: '关闭其他所有标签页', cmd: function(event) {gBrowser.removeAllTabsBut(gBrowser.mCurrentTab);	}},


			'LDRUL': {name: '打开鼠标手势设置文件',  cmd: function(event) {FileUtils.getFile('UChrm',['SubScript', 'MouseGestures.uc.js']).launch();}},
			'RLD': {name: '将当前窗口置顶',  cmd: function(event) {TabStickOnTop();}},

},
		init: function() {
			let self = this;
			['mousedown', 'mousemove', 'mouseup', 'contextmenu', 'DOMMouseScroll'].forEach(type => {
				gBrowser.mPanelContainer.addEventListener(type, self, true);
			});
			gBrowser.mPanelContainer.addEventListener('unload', () => {
				['mousedown', 'mousemove', 'mouseup', 'contextmenu', 'DOMMouseScroll'].forEach(type => {
					gBrowser.mPanelContainer.removeEventListener(type, self, true);
				});
			}, false);
		},
		handleEvent: function(event) {
			switch (event.type) {
			case 'mousedown':
				if (event.button == 2) {
					this.isMouseDownR = true;
					this.hideFireContext = false;
					[this.lastX, this.lastY, this.directionChain] = [event.screenX, event.screenY, ''];
				}
				if (event.button == 0) {
					this.isMouseDownR = false;
					this.stopGesture();
				}
				break;
			case 'mousemove':
				if (this.isMouseDownR) {
					let[subX, subY] = [event.screenX - this.lastX, event.screenY - this.lastY];
					let[distX, distY] = [(subX > 0 ? subX : (-subX)), (subY > 0 ? subY : (-subY))];
					let direction;
					if (distX < 10 && distY < 10) return;
					if (distX > distY) direction = subX < 0 ? 'L' : 'R';
					else direction = subY < 0 ? 'U' : 'D';
					if (!this.xdTrailArea) {
						this.xdTrailArea = document.createElement('hbox');
						let canvas = document.createElementNS('http://www.w3.org/1999/xhtml', 'canvas');
						canvas.setAttribute('width', window.screen.width);
						canvas.setAttribute('height', window.screen.height);
						this.xdTrailAreaContext = canvas.getContext('2d');
						this.xdTrailArea.style.cssText = '-moz-user-focus: none !important;-moz-user-select: none !important;display: -moz-box !important;box-sizing: border-box !important;pointer-events: none !important;margin: 0 !important;padding: 0 !important;width: 100% !important;height: 100% !important;border: none !important;box-shadow: none !important;overflow: hidden !important;background: none !important;opacity: 0.9 !important;position: fixed !important;z-index: 2147483647 !important;';
						this.xdTrailArea.appendChild(canvas);
						gBrowser.selectedBrowser.parentNode.insertBefore(this.xdTrailArea, gBrowser.selectedBrowser.nextSibling);
					}
					if (this.xdTrailAreaContext) {
						this.hideFireContext = true;
						this.xdTrailAreaContext.strokeStyle = '#0065FF';
						this.xdTrailAreaContext.lineJoin = 'round';
						this.xdTrailAreaContext.lineCap = 'round';
						this.xdTrailAreaContext.lineWidth = 2;
						this.xdTrailAreaContext.beginPath();
						this.xdTrailAreaContext.moveTo(this.lastX - gBrowser.selectedBrowser.boxObject.screenX, this.lastY - gBrowser.selectedBrowser.boxObject.screenY);
						this.xdTrailAreaContext.lineTo(event.screenX - gBrowser.selectedBrowser.boxObject.screenX, event.screenY - gBrowser.selectedBrowser.boxObject.screenY);
						this.xdTrailAreaContext.closePath();
						this.xdTrailAreaContext.stroke();
						this.lastX = event.screenX;
						this.lastY = event.screenY;
					}
					if (direction != this.directionChain.charAt(this.directionChain.length - 1)) {
						this.directionChain += direction;
						XULBrowserWindow.statusTextField.label = this.GESTURES[this.directionChain] ? '手势: ' + this.directionChain + ' ' + this.GESTURES[this.directionChain].name : '未知手势:' + this.directionChain;
					}
				}
				break;
			case 'mouseup':
				if (this.isMouseDownR && event.button == 2) {
					if (this.directionChain) this.shouldFireContext = false;
					this.isMouseDownR = false;
					this.directionChain && this.stopGesture();
				}
				break;
			case 'contextmenu':
				if (this.isMouseDownR || this.hideFireContext) {
					this.shouldFireContext = true;
					this.hideFireContext = false;
					event.preventDefault();
					event.stopPropagation();
				}
				break;
			case 'DOMMouseScroll':
				if (this.isMouseDownR) {
					this.shouldFireContext = false;
					this.hideFireContext = true;
					this.directionChain = 'W' + (event.detail > 0 ? '+' : '-');
					this.stopGesture();
				}
				break;
			}
		},
		stopGesture: function() {
			if (this.GESTURES[this.directionChain]) this.GESTURES[this.directionChain].cmd();
			if (this.xdTrailArea) {
				this.xdTrailArea.parentNode.removeChild(this.xdTrailArea);
				this.xdTrailArea = null;
				this.xdTrailAreaContext = null;
			}
			this.directionChain = '';
			setTimeout(() => XULBrowserWindow.statusTextField.label = '', 2000);
			this.hideFireContext = true;
		}
	};
	ucjsMouseGestures.init();
})();




//加入命令
//将当前窗口置顶
 function TabStickOnTop() {
(function(){if(document.getElementById('main-window').hasAttribute('ontop'))onTop=false;else onTop=true;try{Components.utils.import("resource://gre/modules/ctypes.jsm");var lib=ctypes.open("user32.dll");var funcActiveWindow=0;try{funcActiveWindow=lib.declare("GetActiveWindow",ctypes.winapi_abi,ctypes.int32_t)}catch(ex){funcActiveWindow=lib.declare("GetActiveWindow",ctypes.stdcall_abi,ctypes.int32_t)}if(funcActiveWindow!=0){var activeWindow=funcActiveWindow();var funcSetWindowPos=0;try{funcSetWindowPos=lib.declare("SetWindowPos",ctypes.winapi_abi,ctypes.bool,ctypes.int32_t,ctypes.int32_t,ctypes.int32_t,ctypes.int32_t,ctypes.int32_t,ctypes.int32_t,ctypes.uint32_t)}catch(ex){funcSetWindowPos=lib.declare("SetWindowPos",ctypes.stdcall_abi,ctypes.bool,ctypes.int32_t,ctypes.int32_t,ctypes.int32_t,ctypes.int32_t,ctypes.int32_t,ctypes.int32_t,ctypes.uint32_t)}var hwndAfter=-2;if(onTop){hwndAfter=-1;document.getElementById('main-window').setAttribute('ontop','true')}else document.getElementById('main-window').removeAttribute('ontop');funcSetWindowPos(activeWindow,hwndAfter,0,0,0,0,19)}lib.close()}catch(ex){alwaysontop_log(ex)}})()
};

