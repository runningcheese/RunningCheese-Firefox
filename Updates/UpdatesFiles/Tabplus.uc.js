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


// 05. 标签栏鼠标滚轮切换标签页 
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


// 06. 在新标签页查看图片 ff64+
location == "chrome://browser/content/browser.xul" && (function () {
    document.querySelector("#context-viewimage").setAttribute("oncommand", 'openTrustedLinkIn(gContextMenu.imageURL,"tab")');
})();



// 07. 鼠标移动到地址栏和搜索栏时自动全选里面的文字
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


