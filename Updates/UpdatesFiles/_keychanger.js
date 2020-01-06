//Firefox 自定义快捷 RunningCheese 版 for 64+

//老板键
//默认为 Ctrl + ~，如需要修改，可在 Firefox\protable.ini 第56行中修改。



//F1-12键
//--------------------------------------------------------------------------------------------------------------------------------------------
keys['F1'] = function() { document.getElementById("cmd_newNavigatorTab").doCommand();}; //新建标签页并光标定位到地址栏
keys['F2'] = "duplicateTabIn(gBrowser.selectedTab, 'tab')";//复制当前标签页
keys['F3'] = "BrowserPageInfo();";//查看页面信息
keys['F4'] ="gBrowser.selectedTab.toggleMuteAudio()"; // 关闭当前标签声音
//keys['F5'] =""; // 原生功能：刷新
//keys['F6'] =""; // 原生功能：定位到地址栏
//keys['F7'] =""; // 原生功能：启用浏览光标
keys['F8'] =function() { gBrowser.loadURI("javascript:{d=document;b=d.body;o=d.createElement('scri'+'pt');o.setAttribute('src','https://translate.google.cn/translate_a/element.js?cb=googleTranslateElementInit');o.setAttribute('type','text/javascript');b.appendChild(o);v=b.insertBefore(d.createElement('div'),b.firstChild);v.id='google_translate_element';v.style.display='none';p=d.createElement('scri'+'pt');p.text='function%20googleTranslateElementInit(){new%20google.translate.TranslateElement({pageLanguage:%22%22},%22google_translate_element%22);}';p.setAttribute('type','text/javascript');b.appendChild(p);}void%200", {triggeringPrincipal: gBrowser.contentPrincipal});}; //启用翻译功能
keys['F9'] = function() {
                gBrowser.loadURI("javascript:(function(bookmarklets)%7Bfor(var%20i=0;i%3Cbookmarklets.length;i++)%7Bvar%20code=bookmarklets%5Bi%5D.url;if(code.indexOf(%22javascript:%22)!=-1)%7Bcode=code.replace(%22javascript:%22,%22%22);eval(code)%7Delse%7Bcode=code.replace(/%5Es+%7Cs+$/g,%22%22);if(code.length%3E0)%7Bwindow.open(code)%7D%7D%7D%7D)(%5B%7Btitle:%22%E7%A0%B4%E9%99%A4%E5%8F%B3%E9%94%AE%E8%8F%9C%E5%8D%95%E9%99%90%E5%88%B6%22,url:%22javascript:function%20applyWin(a)%7Bif(typeof%20a.__nnANTImm__===%5Cx22undefined%5Cx22)%7Ba.__nnANTImm__=%7B%7D;a.__nnANTImm__.evts=%5B%5Cx22mousedown%5Cx22,%5Cx22mousemove%5Cx22,%5Cx22copy%5Cx22,%5Cx22contextmenu%5Cx22%5D;a.__nnANTImm__.initANTI=function()%7Ba.__nnantiflag__=true;a.__nnANTImm__.evts.forEach(function(c,b,d)%7Ba.addEventListener(c,this.fnANTI,true)%7D,a.__nnANTImm__)%7D;a.__nnANTImm__.clearANTI=function()%7Bdelete%20a.__nnantiflag__;a.__nnANTImm__.evts.forEach(function(c,b,d)%7Ba.removeEventListener(c,this.fnANTI,true)%7D,a.__nnANTImm__);delete%20a.__nnANTImm__%7D;a.__nnANTImm__.fnANTI=function(b)%7Bb.stopPropagation();return%20true%7D;a.addEventListener(%5Cx22unload%5Cx22,function(b)%7Ba.removeEventListener(%5Cx22unload%5Cx22,arguments.callee,false);if(a.__nnantiflag__===true)%7Ba.__nnANTImm__.clearANTI()%7D%7D,false)%7Da.__nnantiflag__===true?a.__nnANTImm__.clearANTI():a.__nnANTImm__.initANTI()%7DapplyWin(top);var%20fs=top.document.querySelectorAll(%5Cx22frame,%20iframe%5Cx22);for(var%20i=0,len=fs.length;i%3Clen;i++)%7Bvar%20win=fs%5Bi%5D.contentWindow;try%7Bwin.document%7Dcatch(ex)%7Bcontinue%7DapplyWin(fs%5Bi%5D.contentWindow)%7D;void%200;%22%7D,%7Btitle:%22%E7%A0%B4%E9%99%A4%E9%80%89%E6%8B%A9%E5%A4%8D%E5%88%B6%E9%99%90%E5%88%B6%22,url:%22javascript:(function()%7Bvar%20doc=document;var%20bd=doc.body;bd.onselectstart=bd.oncopy=bd.onpaste=bd.onkeydown=bd.oncontextmenu=bd.onmousemove=bd.onselectstart=bd.ondragstart=doc.onselectstart=doc.oncopy=doc.onpaste=doc.onkeydown=doc.oncontextmenu=null;doc.onselectstart=doc.oncontextmenu=doc.onmousedown=doc.onkeydown=function%20()%7Breturn%20true;%7D;with(document.wrappedJSObject%7C%7Cdocument)%7Bonmouseup=null;onmousedown=null;oncontextmenu=null;%7Dvar%20arAllElements=document.getElementsByTagName(%5Cx27*%5Cx27);for(var%20i=arAllElements.length-1;i%3E=0;i--)%7Bvar%20elmOne=arAllElements;with(elmOne.wrappedJSObject%7C%7CelmOne)%7Bonmouseup=null;onmousedown=null;%7D%7Dvar%20head=document.getElementsByTagName(%5Cx27head%5Cx27)%5B0%5D;if(head)%7Bvar%20style=document.createElement(%5Cx27style%5Cx27);style.type=%5Cx27text/css%5Cx27;style.innerHTML=%5Cx22html,*%7B-moz-user-select:auto!important;%7D%5Cx22;head.appendChild(style);%7Dvoid(0);%7D)();%22%7D%5D)", {triggeringPrincipal: gBrowser.contentPrincipal});
                };// 解除右键菜单限制
keys['F10'] = function(){gBrowser.loadURI("javascript:document.body.contentEditable%20=%20'true';%20document.designMode='on';%20void%200", {triggeringPrincipal: gBrowser.contentPrincipal});};//编辑当前页面

//Alt 组合键
//--------------------------------------------------------------------------------------------------------------------------------------------
keys["Alt+F1"] = function(){for (let i = gBrowser.selectedTab ._tPos - 1; i >= 0; i--) if (!gBrowser.tabs[i].pinned){ gBrowser.removeTab(gBrowser.tabs[i], {animate: true});}};  //关闭左侧所有标签页
keys["Alt+F2"] = function(){gBrowser.removeTabsToTheEndFrom(gBrowser.selectedTab );};  //关闭右侧所有标签页
keys["Alt+F3"] = function(){gBrowser.removeAllTabsBut(gBrowser.selectedTab);};  //关闭其他标签页
keys['Alt+W'] = 'document.getElementById("pageAction-urlbar-_cd7e22de-2e34-40f0-aeff-cec824cbccac_").click();'//稍后阅读标记/去除标记
keys['Alt+E'] = 'ReaderParent.toggleReaderMode(event);';//阅读模式
keys['Alt+G'] = "var s = prompt('谷歌站内搜索:', '');if (s.length > 0) gBrowser.addTrustedTab('https://www.google.com/search?q=site:' + encodeURIComponent( gBrowser.currentURI.host) + ' ' + encodeURIComponent(s));";//Google站内搜索
keys['Alt+B'] = "var s = prompt('百度站内搜索:', '');if (s.length > 0) gBrowser.addTrustedTab('https://www.baidu.com/s?wd=site:' + encodeURIComponent( gBrowser.currentURI.host) + ' ' + encodeURIComponent(s));";//Baidu站内搜索
keys['Alt+X'] = "getWebNavigation().canGoForward && getWebNavigation().goForward();";//前进
keys['Alt+Z'] = "getWebNavigation().canGoBack && getWebNavigation().goBack();";//后退
keys['Alt+C'] = function() { var gClipboardHelper = Components.classes['@mozilla.org/widget/clipboardhelper;1'].getService(Components.interfaces.nsIClipboardHelper);gClipboardHelper.copyString(gBrowser.currentURI.spec); }; //复制当前页的URL
keys['Alt+V'] =function() {let url = readFromClipboard();
try {
            switchToTabHavingURI(url, true);
          } catch (ex) {
            var reg = /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
            if (!reg.test(url)) {
              url = 'https://www.baidu.com/s?wd=' + encodeURIComponent(url);
            } else {
              if (url.substring(4, 0).toLowerCase() == "http") {
                url = encodeURIComponent(url);
              } else {
                url = 'http://' + encodeURIComponent(url);
              }
            }
            switchToTabHavingURI(url, true);
          }
          e.preventDefault();
          e.stopPropagation();
}; //打开剪切板地址
keys['Alt+U'] = function(ev) {BrowserPageInfo();}; //查看页面信息
keys['Alt+I'] = function() {
	try {
		var path ="..\\..\\..\\Program Files\\Internet Explorer\\iexplore.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();

		var process = Cc["@mozilla.org/process/util;1"].createInstance(Ci.nsIProcess);
		process.init(file);
		process.run(false, [gBrowser.currentURI.spec], 1);
	} catch (ex) {
		alert("打开IE失败!")
	}
}; //用IE打开当前页
keys['Alt+N'] =  function() {
                gBrowser.loadURI("javascript:(function(){var%20night=function(w){(function(d){var%20css='html{opacity:0.7!important;background:black!important;}body{background:white!important;}';var%20s=d.getElementsByTagName('style');for(var%20i=0,si;si=s[i];i++){if(si.innerHTML==css){si.parentNode.removeChild(si);return}};var%20heads=d.getElementsByTagName('head');if(heads.length){var%20node=d.createElement('style');node.type='text/css';node.appendChild(d.createTextNode(css));heads[0].appendChild(node)}})(w.document);%20for(var%20i=0,f;f=w.frames[i];i++){try{arguments.callee(f)}catch(e){}}};night(window)})();", {triggeringPrincipal: gBrowser.contentPrincipal});
                };// 夜间模式
keys['Alt+O'] = "openPreferences();"; //Firefox选项
keys['Alt+P'] = "OpenBrowserWindow({private: true});"; //打开隐私窗口
keys['Alt+]'] =  'TabStickOnTop();';  //将当前窗口置顶




//Ctrl+Alt 组合键
//--------------------------------------------------------------------------------------------------------------------------------------------

keys['Ctrl+Alt+A'] =  function() {FileUtils.getFile('UChrm',['Local', 'Snapshot.exe']).launch();};//截图
keys['Ctrl+Alt+Shift+A'] =  function() {document.getElementById("titlebar-min").click(); FileUtils.getFile('UChrm',['Local', 'Snapshot.exe']).launch();};//隐藏火狐截图
keys['Ctrl+Alt+Q'] =  function() {FileUtils.getFile('UChrm',['Local', 'FSCapture','FSCapture.exe']).launch();};//完整截图
keys["Ctrl+Alt+S"]  = function() {FileUtils.getFile('UChrm',['Local', 'ScreenToGif.exe']).launch();};//GIF截图
keys["Ctrl+Alt+R"]  = function() {FileUtils.getFile('UChrm',['Local', 'Shadowsocks','ShadowsocksR.exe']).launch();};//启动SS程序
keys['Ctrl+Alt+C'] =  function() {FileUtils.getFile('UChrm',['Local', 'Colors','Colors.exe']).launch();};//颜色拾取器
keys["Ctrl+Alt+X"]  = function() {var toolbar = document.getElementById("toolbar-menubar");var visibility = toolbar.getAttribute("autohide") == "true";setToolbarVisibility(toolbar, visibility);};//打开Alt菜单 ff70+




//Ctrl+Shift 组合键
//--------------------------------------------------------------------------------------------------------------------------------------------
//keys['Ctrl+Shift+A'] = 原生快捷键：打开附加组件栏
//keys['Ctrl+Shift+S'] = 原生快捷键：打开火狐自带的截图功能
//keys['Ctrl+Shift+D'] = 原生快捷键：保存当前所有标签
keys['Ctrl+Shift+Z'] =function() {openPreferences();};//打开选项







