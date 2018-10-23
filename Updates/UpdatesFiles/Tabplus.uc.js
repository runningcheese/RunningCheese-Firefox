// ==UserScript==
// @name           Tabplus.uc.js
// @description    设置标签的打开方式
// @update         2018-04-20
// @license          MIT License
// @compatibility  Firefox 57+
// @charset         UTF-8
// @include      chrome://browser/content/browser.xul
// ==/UserScript==


// 01. 自动切换到鼠标移动到的标签页
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


// 02. 右键关闭标签页
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



// 03. 双击标签页关闭标签页（与下面一条不可同时启用）
gBrowser.tabContainer.addEventListener('dblclick', function(event) {
  if (event.target.localName == 'tab' && event.button == 0) {
    gBrowser.removeTab(event.target, {animate: true});
  }
});



// 04. 双击标签页刷新当前页面 （与上面一条不可同时启用）
/*
gBrowser.tabContainer.addEventListener('dblclick', function(event) {
  if (event.target.localName == 'tab' && event.button == 0) {
    document.getElementById("Browser:Reload").doCommand();
  }
});
*/



// 05. 设置标签最大宽度
{var ruleEndPosition = document.styleSheets[1].cssRules.length;
document.styleSheets[1].cssRules[document.styleSheets[1].insertRule('.tabbrowser-tab:not([pinned]){}', ruleEndPosition)];
document.styleSheets[1].cssRules[ruleEndPosition].style.maxWidth="250px";
}



// 06. 关闭标签页后选择左侧标签  
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




// 07. 标签栏鼠标滚轮切换标签页 
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




// 08. 在新标签页查看图片
location == "chrome://browser/content/browser.xul" && (function () {
    document.querySelector("#context-viewimage").setAttribute("oncommand", 'openUILinkIn(gContextMenu.imageURL,"tab")');
})(); 




// 09. 鼠标移动到地址栏和搜索栏时自动全选里面的文字
{if (location == "chrome://browser/content/browser.xul") {
// 地址栏
// var autselectpulbar = document.getElementById("urlbar-container");
// autselectpulbar.addEventListener("mouseover", function(event){
//             if(event.target.compareDocumentPosition(document.activeElement)!= 20)
//                     event.target.select();
//     }, false);

// 搜索栏
var autselectpsearchbar = document.getElementById("searchbar");
autselectpsearchbar.addEventListener("mouseover", function(event){
            if(event.target.compareDocumentPosition(document.activeElement)!= 20)
                    event.target.select();
    }, false);
}
};




//10. 让书签、历史、url、搜索在新的标签页打开
(function() {
    try {
        eval('isBlankPageURL = ' + isBlankPageURL.toString().replace(
            'return ', '$&aURL=="" || aURL=="about:privatebrowsing" '
            +'|| '));
    }catch(e){}

    /* 在当前标签页打开 Bookmarklet */
    try {
        eval('openLinkIn = ' + openLinkIn.toString().replace(
            'if (where == "save")', 'if (url.match(/^javascript:/))\n'+
            '    where = "current";\n  $&'));
    }catch(e){}

    /* open bookmark/history in new tab */
    try {
        eval("whereToOpenLink = " + whereToOpenLink.toString().replace(
            'return "window";',"$&\n\n  var cls = e.target ? e.target."
            +"getAttribute('class') : null;\n  try {\n    if (!cls || "
            +"cls=='')\n      cls = e.target.parentNode.getAttribute('"
            +"class');\n  }catch(e){}\n  try {\n    var browser = gBro"
            +"wser.selectedBrowser;\n    if (browser && (!isBlankPageU"
            +"RL(browser.currentURI.spec)||browser.webProgress.isLoadi"
            +"ngDocument) && cls && (cls.indexOf('bookmark-item')>=0 |"
            +"| cls.indexOf('placesTree')>=0 || cls=='subviewbutton') "
            +"&& !IsInSideBar(e.target))\n      return 'tab';\n  }\n  "
            +"catch(e) {}"));
    }catch(e){}

    /* bookmark/history on sidebar/place-manager */
    try {
        eval("PlacesUIUtils.openNodeWithEvent = " + PlacesUIUtils.
            openNodeWithEvent.toString().replace("window.whereToOpenLink"
            , "whereToOpenLink"));
    }catch(e){}
    
    /* open url in new tab */
    try {
        try { // firefox 3.0.*
            eval("BrowserLoadURL = "+ BrowserLoadURL.toString().replace(
                /if \(aTriggeringEvent instanceof MouseEvent\) {/,
                "_LoadURL(aTriggeringEvent, aPostData); return; $&"));
        }
        catch(e) { // firefox 3.1+
            var souList = ["if (isMouseEvent || altEnter",
                "if (selectedOneOff && selectedOneOff.engine)"];
            var desList = ["$& || !isTabEmpty(gBrowser.selectedTab))",
                "if (where=='current' && !isTabEmpty(gBrowser.selectedTab))"
                +"\n\t\t\twhere = 'tab';\n\t\t$&"];

            var urlbar = document.getElementById("urlbar");
            var handleCmd = urlbar.handleCommand.toString();
            for(var n=0; n<2; n++) {
                handleCmd = handleCmd.replace(souList[n], desList[n]);
            }
            eval("urlbar.handleCommand=" + handleCmd);
        }
    }catch(e){}

    /* open home in new tab */
    try {
        eval("BrowserGoHome = " + BrowserGoHome.toString().replace(
            /switch \(where\) {/, "where = (gBrowser.currentURI.spec!="
            +"'about:blank' || gBrowser.webProgress.isLoadingDocument"+
            ") ? 'tab' : 'current'; $&")); 
    }catch(e){}

    /* open search in new tab */
    try {
        var searchbar = document.getElementById("searchbar");
        eval("searchbar.handleSearchCommand="+searchbar.handleSearchCommand.
            toString().replace(/this.doSearch\(textValue,/,
            "if (!gBrowser.webProgress.isLoadingDocument&&\n\t\tisBlankPage"
            +"URL(gBrowser.currentURI.spec))\n\t\twhere='current';\n\telse"+
            "\n\t\twhere='tab';\n\t$&"));
    }catch(e){}

})();

function _LoadURL(aTriggeringEvent, aPostData)
{
    var where = (gBrowser.currentURI.spec!='about:blank' ||
        gBrowser.webProgress.isLoadingDocument) ? 'tab' :
        'current';
    if (gURLBar.value!='') openUILinkIn(gURLBar.value, where);
    return true;
}

function IsInSideBar(target)
{
    if (!target) return false;
    try {
        var node = target._placesNode;
    }catch(e) { node = null; }
    try {
        if (!node && (target.parentNode.id=='placeContent'
            || target.parentNode.id=='bookmarks-view'))
            node = target.parentNode.selectedNode;
        return node && PlacesUtils.nodeIsBookmark(node) &&
            PlacesUtils.annotations.itemHasAnnotation(node
            .itemId,PlacesUIUtils.LOAD_IN_SIDEBAR_ANNO);
    }catch(e) { return false; }
}


// 11. 紧邻当前标签新建标签页
(function(){try{if(!gBrowser)return}catch(e){return}gBrowser.tabContainer.addEventListener("TabOpen",tabOpenHandler,false);function tabOpenHandler(event){var tab=event.target;gBrowser.moveTabTo(tab,gBrowser.mCurrentTab._tPos+1)}})();





