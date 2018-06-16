// ==UserScript==
// @label                  Firefox-classic-menu.uc.js
// @description       Modified from FirefoxBtnMod.uc.js
// @labelspace       <a href="http://bbs.kafan.cn/thread-1794709-1-1.html" target="_blank">右键单击三道杠弹出经典菜单</a>
// @author              skofkyo
// @license               MIT License
// @compatibility    Firefox 29+
// @charset              UTF-8
// @version              2014.12.12
// @startup        
// @shutdown
// @config         
// @homepageURL    
// @ohomepageURL    
// @reviewURL    
// @downloadURL    
// @note                   
// @include              main
// @include              chrome://browser/content/browser.xul
// ==/UserScript==
 
(function() {
var FirefoxBtnpopup = document.createElement("menupopup");
FirefoxBtnpopup.setAttribute("id", "FirefoxBtnpopup");
var menubutton = document.getElementById("PanelUI-button")
menubutton.appendChild(FirefoxBtnpopup);
menubutton.addEventListener("contextmenu", function(event) {
      document.getElementById("FirefoxBtnpopup").openPopupAtScreen(event.screenX, event.screenY, true); 
      event.preventDefault();
}, false);
function menuadd() {
            var n, Item, FavIDs;
            FavIDs = [
                'file-menu',
                'edit-menu',
                'view-menu',
                'history-menu',
                'bookmarksMenu',
                'tools-menu',
                'helpMenu',
                'menu_preferences',
                '-',
                'menu_openDownloads',
                'menu_openAddons',
                'webDeveloperMenu',
                'javascriptConsole',
                '-',
                'aboutName',
                'restart',
                'menu_FileQuitItem',
            ];
            for (n = 0; n < FavIDs.length; n++) {
                var FavID = FavIDs[n];
                if (FavID == '-') {
                    Item = document.createElement("menuseparator");
                } else if (FavID == 'javascriptConsole') {
                    Item = document.createElement("menuitem");
                    Item.setAttribute("label", "错误控制台");
                    Item.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jY2SURGDMBBEIwEJSHm7CpCAhEqoAyRUAhIqIRKQgAT60WMmTRPam8kMOXIve3tJqQhgsH0HqPJEfkhXISnbPjqAQ1LuFgOj7SMOPs/vev+Xgt66VFCraK2mB5I2SRswA2Mtv2wDGIDJ9ippL299SNolbbYXYOIzJttL/D9sr7XR5wi78os2xl7/NA7PjRw9wNfhlFJqAKa68Fb09hNQGPoG2V7DuK8RdhTwMYVqpPkK8Osp/+vB3C0OP3ILICkDtyYkPJgDNoQvJWA9n3Fctpy1LyNPBAjW0Ns9AAAAAElFTkSuQmCC");
                    Item.setAttribute("oncommand", "toJavaScriptConsole();");
                } else if (FavID == 'restart') {
                    Item = document.createElement("menuitem");
                    Item.setAttribute("label", "重新启动浏览器");
                    Item.setAttribute("image", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABgklEQVQ4jX1Su0pDQRC9hVjEVysBX8FCiKTZIsgumznnH2wikUQR9EsEwVrBwkrBXoPGSvATJIrxFcR8gkVAr81svIk3LizsnnmdOTNRNOSUSqUVknG4AA6H+fYdEVkDcEKyrYF7JL/0fSEii6mBJOdI1pNVScZq8wDeNMmniCz3BXvvZ0g+a1BbRLadc7P5fH40+BSLxUmSx5qkKyJLyep1NVxaayf+a5HkkRba6vWswa/GmCnFqgBaoQXFRgDsA/gmGfcYADhVYFsrVAY1EJFpADcJ/KBHCcA7ydh7P6P/B2V0q4kdyQ/F7kgeACgnE3RJxkGwMDIR2Q2CDU5G8fIwBvfqtJMQLAbwQnJV8d82ggZB1SBqyq0ow5r+j0OCda3wZIzJKFYm2dR2moGuMSZD8lH9N5I6XCVWdTxt/oVCYQzAufpd9xmdc7nEqrZEZNNam42iKLLWZknWwl6QbDvncn8qiMg8ycaQ/sNteO8X0nf0N1EVwBmAjjLq6H8jzf8HTUH5xYEpCK8AAAAASUVORK5CYII=");
                    Item.setAttribute("oncommand", "Services.appinfo.invalidateCachesOnRestart() || Application.restart();");
                } else {
                    Item = document.getElementById(FavID);
                }
                if (Item != null) FirefoxBtnpopup.appendChild(Item);
            }
        }
         
        setTimeout(function() {
            menuadd();
        }, 2000);
 
})();