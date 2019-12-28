// ==UserScript==
// @name          QuickSnapshot.uc.js
// @description   可移动多功能截图按钮 
// @author         Runningcheese
// @namespace   https://www.runningcheese.com
// @include        main
// @license         MIT License
// @compatibility  Firefox 71+
// @charset        UTF-8
// @version        v2019-12-20 for 71+
// @version        v2019-09-23 for 70+
// @version        v2018-12-19 for 64+
// @version        v2018-03-18 for 57+
// @version        v2017.04.02 
// @version        v2017.02.05 
// @version        v2016.01.05 
// @homepage    https://www.runningcheese.com/firefox-v10
// ==/UserScript==

//载入脚本
function jsonToDOM(json, doc, nodes) {

    var namespaces = {
        html: 'http://www.w3.org/1999/xhtml',
        xul: 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'
    };
    var defaultNamespace = namespaces.html;

    function namespace(name) {
        var m = /^(?:(.*):)?(.*)$/.exec(name);        
        return [namespaces[m[1]], m[2]];
    }

    function tag(name, attr) {
        if (Array.isArray(name)) {
            var frag = doc.createDocumentFragment();
            Array.prototype.forEach.call(arguments, function (arg) {
                if (!Array.isArray(arg[0]))
                    frag.appendChild(tag.apply(null, arg));
                else
                    arg.forEach(function (arg) {
                        frag.appendChild(tag.apply(null, arg));
                    });
            });
            return frag;
        }

        var args = Array.prototype.slice.call(arguments, 2);
        var vals = namespace(name);
        var elem = doc.createElementNS(vals[0] || defaultNamespace, vals[1]);

        for (var key in attr) {
            var val = attr[key];
            if (nodes && key == 'id')
                nodes[val] = elem;

            vals = namespace(key);
            if (typeof val == 'function')
                elem.addEventListener(key.replace(/^on/, ''), val, false);
            else
                elem.setAttributeNS(vals[0] || '', vals[1], val);
        }
        args.forEach(function(e) {
            try {
                elem.appendChild(
                                    Object.prototype.toString.call(e) == '[object Array]'
                                    ?
                                        tag.apply(null, e)
                                    :
                                        e instanceof doc.defaultView.Node
                                        ?
                                            e
                                        :
                                            doc.createTextNode(e)
                                );
            } catch (ex) {
                elem.appendChild(doc.createTextNode(ex));
            }
        });
        return elem;
    }
    return tag.apply(null, json);
}


//定义按钮
CustomizableUI.createWidget({
    id: 'QuickSnapshot',
    defaultArea: CustomizableUI.AREA_NAVBAR,
    label: '截图',
    tooltiptext: '左键：截图\n右键：截图菜单',
    onCreated: function(aNode) {
        aNode.setAttribute('oncommand', 'takeSnapshot();');     

        
 //定义菜单      
        var myMenuJson = 
                                ['xul:menupopup', {id: 'QuickSnapshot_pop'},
                                ['xul:menuitem', {label: '隐藏火狐截图',oncommand: 'event.stopPropagation(); takeSnapshotHide();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAD1BMVEUAAAAAAAAZGRnExMS2trbgUhZ3AAAAAXRSTlMAQObYZgAAACBJREFUCNdjgAMnQTBQYVCG8I0YBCAMRqoz4FYgLIUBANVmAu3tf1vbAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '滚动截图工具',oncommand: 'event.stopPropagation(); window.document.getElementById("pageActionButton").click(); window.setTimeout(function() {window.document.getElementById("pageAction-panel-screenshots_mozilla_org").click();}, 0);',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAUUlEQVQ4jWNgoBAwQun/FOony4D/DAwMDEzYBPHQ+E2jpgtItmAYugAbLQ9lp5HjAnmomjQshhNlAMzm/+QagKyZbBegg/8MDAwMLBQaQjkAADuKJsCqgn0yAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '颜色拾取工具',oncommand: 'event.stopPropagation(); takeSnapShotColor();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5klEQVQ4jZXSvS6EQRTG8Z/IiqDYQqtTqCVauyt5fTRuhES4AYptFDQrWdFoJVql0scNaMS3QoibULxDyM477/gnpznPPM+cyRmqaeIpVDNxrpIj9HGA4/+aW3jEBMZxh8Vc8whusfqrV+AZYzkBaziL9E+wXWcexStmItoUPjGZCtjAaULvoVslDuEBs4mAabxhOCbO4SY1XuAanZiwjsOMgF3lUwfYxH5GQBc7MWEZVxkB5/7+kR8auA9BVczjRbnuKG18YCmiFXjHSt2ILeXfv8ReqAvlihfqzN80wo1boYrQG+ALEuMlaMvG6qMAAAAASUVORK5CYII='}],
                                ['xul:menuseparator', {}],
                                ['xul:menuitem', {label: '录制动态图片',oncommand: 'event.stopPropagation(); takeSnapShotGIF();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAcklEQVQ4jd3SsQ2DMBBG4U9iAIagYQcKaiZhGpqswyDZwE2GMI1BVmQjFKRIyZOuu/9Zvjv+hgkBsVIh9ew0eOSCgOHkgSH1QIs1iQ/ie6JARIcnlk8FAXMpc0XwwljLXBXkc/r+FyJ6lSHeXuPtQ/phNpewMd4q2yEXAAAAAElFTkSuQmCC'}],
                                ['xul:menuitem', {label: '完整截图工具',oncommand: 'event.stopPropagation(); takeSnapshotFSCapture();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAXElEQVQ4ja2TQQoAIAgErZ/5/0fVJUEtxQ0XOsWMWxGRzSIwEwVOOBpWaSAwawhdTEGyBjI5bRlt6tqwwJ8ZElwXhghecFkQwSVBBpcE6Tt7wUDsXTFDfj9Tn2ADRHQvb6Wq7ygAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '打开系统画图',oncommand: 'event.stopPropagation(); takeSnapshotSystem();',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAclBMVEUAAAAjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyM+l8PxAAAAJXRSTlMABB7q554+NxoO+e/hyL2tl5AvKfXXuqV+clhMFQnbz7GHb2Zggs6ibgAAAI5JREFUGNNtjkkOg0AMBHs2yLDvEAjZ+/9fjAUaaQ7pg+UqWbbxN1fLrIlFlq6GOhLcbM/xFgnbgUvpAyd5KhItTasCq2bwcKQTTm0CXMgEqqYBOrMdl18K/sEcqFxYtZczBxke3yerqdGcIOb+ObieobMOEl18pbqngl6A06xoKyXD4dm+qMsdcfrKh/YH9EkHkfVlGzEAAAAASUVORK5CYII='}],
                                ['xul:menuitem', {label: '上传微博图床',oncommand: 'event.stopPropagation();document.getElementById("nav-bar-overflow-button").click();setTimeout(function () {document.getElementById("weibo-picture-store_ext_hub_moe-browser-action").click(); }, 50);', tooltiptext: '需要登录微博网页版，图片不会上传到你的个人相册里。',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABDElEQVQ4jb3ToW4CURAF0GMRKBSuBoVGYXArSCUfwAdgalbwBfxAg+ofNEFXVuCqMBgMYkWxDY6k4g3tY7sNxXSSSd7unTtz985b/ine8IEtntC7tUEXrSCWeMf4lgZ3mKAfz4No0qhkhGe8ZoQHrLDHIt6V0udcxCKKpkF6qeHtwPuhap+DjzG1kylZR6M1dphFjqJmcibPsIkJ5+hIrq+CUOJUqyHkHFxfzUbyplsHlpjHuUAVWdTqBpJpB9znwC6bXmEYWf2ipAg1X3HKzn9pMJZMvVAwyMBKWk/TTetF/QU2CcJMMrTucjtkL6XbN22SNZQM2uIYWUk/0DEkz33fkavRktb1Y+f1+AQEET4cDdInTwAAAABJRU5ErkJggg=='}],
                             //['xul:menuitem', {label: '如何使用？',oncommand: 'event.stopPropagation(); var x = gBrowser.selectedTab._tPos + 1; gBrowser.moveTabTo(gBrowser.selectedTab =gBrowser.addTab("https://www.runningcheese.com/firefox-usage", {triggeringPrincipal: gBrowser.contentPrincipal}), x);',class:'menuitem-iconic', image:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAARVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVDAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC8VMwGAAAAFnRSTlMA9VeHORGTMtgNdu7gjn4tGMxmXrtEk5FsbgAAAHtJREFUGNNtT1kOhSAQK8KwuaG+1/sfVQYzHyY2oZk2aVPwCfELmTcxPbkYSgmRk+lkx3BE9Y88BJdrALYVqLPI7IG1P+QAnN1UIywAqLkdlUmFGUg8Oxc+kY4jKoespeP0f+Wopc1d2jFyrj17KnZW1TaVNv39OS/4wg0/lwQ14TDpOwAAAABJRU5ErkJggg=='}]
                        ];
        aNode.appendChild(jsonToDOM(myMenuJson, aNode.ownerDocument, {}));
        aNode.setAttribute('contextmenu', 'QuickSnapshot_pop');
    }
});


//定义图标
var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"), url(chrome://browser/content/browser.xhtml){'
		 + '#QuickSnapshot .toolbarbutton-icon {'
		 + 'list-style-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAALVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADBoCg+AAAADnRSTlMAmg3ixmUdzrOhUUM0JsS2ELwAAABRSURBVAjXY8AG+N69ewCimYAknwIDwzsoYHgAlQcymIQNFd6BGCxiiQ5gke0MDNVgRiADg2gCiHFYgcnmAojB6bVkAliKIaIVqB1uDsJkGAAAD7IjdT2iTdwAAAAASUVORK5CYII=)'
		 + '}}';
	var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
	var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
	sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr), null, null), sss.USER_SHEET);




//定义函数
function	QuickOpenApplication() { var path ="..\\..\\..\\..\\";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("ProfD", Components.interfaces.nsIFile).path));file.launch();};
 
function takeSnapshot() {FileUtils.getFile('UChrm',['Local', 'Snapshot.exe']).launch();};

function  takeSnapshotHide() {window.minimize(); FileUtils.getFile('UChrm',['Local', 'Snapshot.exe']).launch();};

function	takeSnapShotGIF() { FileUtils.getFile('UChrm',['Local', 'ScreenToGif.exe']).launch();};

function	takeSnapShotColor() { FileUtils.getFile('UChrm',['Local', 'Colors','Colors.exe']).launch();};

function	takeSnapshotFSCapture() { FileUtils.getFile('UChrm',['Local', 'FSCapture','FSCapture.exe']).launch();};

function	takeSnapshotSystem() {var path ="..\\mspaint.exe";	var file = Components.classes["@mozilla.org/file/local;1"].createInstance(Components.interfaces.nsIFile);file.initWithPath(path.replace(/^\./, Components.classes["@mozilla.org/file/directory_service;1"].getService(Components.interfaces.nsIProperties).get("SysD", Components.interfaces.nsIFile).path));file.launch();};

