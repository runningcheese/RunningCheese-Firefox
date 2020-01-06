// ==UserScript==
// @name           BMMultiColumn.uc.js
// @description    书签菜单自动分列显示（先上下后左右）
// @author         ding
// @include        main
// @version        2019.2.20
// @startup        window.BMMultiColumn.init();
// @shutdown       window.BMMultiColumn.destroy();
// @note           适配Firefox57+
// ==/UserScript== 

location.href.startsWith('chrome://browser/content/browser.x') && (function () {
    if (window.BMMultiColumn) {
        window.BMMultiColumn.destroy();
        delete window.BMMultiColumn;
    }

    var BMMultiColumn = {
        cachedMenus: [],
        init: function () {
            $('PlacesToolbarItems').addEventListener('popupshowing', this, false);
            var pop = $('BMB_bookmarksPopup');
            if (pop) {
                pop.addEventListener('popupshowing', this, false);
                pop.addEventListener('click', this, false);
            }
        },
        destroy: function () {
            $('PlacesToolbarItems').removeEventListener('popupshowing', this, false);
            var pop = $('BMB_bookmarksPopup');
            if (pop) {
                pop.removeEventListener('popupshowing', this, false);
                pop.removeEventListener('click', this, false);
            }

            var i = 0;
            for (i = 0; i < this.cachedMenus.length; i++) {
                var menu = this.cachedMenus[i];
                if (menu && menu._x_inited) {
                    menu._x_scrollbox.width = '';
                    if( menu._scrollBox && menu._scrollBox.style){
                        menu._scrollBox.style.maxHeight = "";
                    }
                    
                    menu.style.maxWidth = "";

                    var container = menu._x_box;
                    if(container){
                        container.style.minHeight = "";
                        container.style.height = "";
                        container.style.display = "";
                        container.style.flexFlow = "";
                        container.style.overflow = "";
                    }

                    delete menu._x_scrollbox;
                    delete menu._x_inited;
                    delete menu._x_box;
                }
            }
            this.cachedMenus = [];
        },
        handleEvent: function (event) {
            var menupopup;
            if (event.target.tagName == 'menu') {
                menupopup = event.target.menupopup;
            } else if (event.target.tagName == 'menupopup') {
                menupopup = event.target;
            } else return;
            if (!menupopup) return;
            //没有初始化或换过位置，重新设置属性
            if (!menupopup.firstChild) return;

            if (!menupopup._x_inited || !menupopup._x_scrollbox.scrollWidth) {
                var scrollbox = menupopup._scrollBox;

                var firstMenu = menupopup.firstChild;
                while (firstMenu) {
                    if (firstMenu.tagName == "menuitem") break;
                    firstMenu = firstMenu.nextSibling;
                }

                
                //var box = firstMenu.boxObject.parentBox;
                var box = firstMenu.parentElement._scrollBox.scrollbox;

                if (box) {
                    menupopup._x_box = box;
                    menupopup._x_scrollbox = scrollbox;
                    if (!menupopup._x_inited) {
                        menupopup._x_inited = true;
                        this.cachedMenus.push(menupopup);
                    }
                }
                var container = menupopup._x_box;
                if(container){
                    container.style.minHeight = "21px";
                    container.style.height = "auto";
                    container.style.display = "inline-flex";
                    container.style.flexFlow = "column wrap";
                    container.style.overflow = "-moz-hidden-unscrollable";
                    container.style.maxHeight = "calc(100vh - 129px)";
                    menupopup._scrollBox.style.maxHeight = "calc(100vh - 129px)";
                }
                menupopup.style.maxWidth = "calc(100vw - 20px)";
            }
            if (menupopup._x_inited) {
                var menuitem = menupopup.lastChild;
                while (menuitem) {
                    if (!menuitem.style.maxWidth) {
                        menuitem.style.maxWidth = "300px";
                        menuitem.style.minWidth = "140px";
                    }
                    menuitem = menuitem.previousSibling;
                }
                if (!(menupopup._x_scrollbox.width == menupopup._x_box.scrollWidth)) {
                    menupopup._x_scrollbox.width = menupopup._x_box.scrollWidth;
                }
            }
            
        }
    }
    BMMultiColumn.init();
    window.BMMultiColumn = BMMultiColumn;

    function $(id) {
        return document.getElementById(id);
    }
})();
