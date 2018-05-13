// ==UserScript==
// @name           AddBMHere.uc.js
// @description    为书签工具栏和书签菜单添加“添加书签到此”菜单
// @author         ding
// @include        main
// @version        2018.2.3.1
// @startup        window.AddBMHere.init();
// @shutdown       window.AddBMHere.destroy();
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function () {

    const MENU_NAME = "\u6DFB\u52A0\u4E66\u7B7E\u5230\u6B64";
    const MENU_ICON = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAVElEQVQ4jc2Ruw0AIAgFr3IFJ3YB13EkhtBGEiuCnxheQgE8DhIgihJQAQG6I2T6kwIq0IDsXJinv2hBNoZXiGjSDaOrFw9gfeDPBbEAlt4CTuNOA8bzPo9tYBnVAAAAAElFTkSuQmCC";
    const AUTO_ADD = true; //是否不弹出面板自动添加
    const SIDEBAR_SUPPORT = false;//侧栏支持，需要定时检测

    if (window.AddBMHere) {
        window.AddBMHere.destroy();
        delete window.AddBMHere;
    }

    var AddBMHere = {
        addMenus: [],
        init: function () {
            $('PlacesToolbarItems').addEventListener('popupshowing', this, false);
            $('PlacesToolbarItems').addEventListener('popuphidden', this, false);
            var pop = $('BMB_bookmarksPopup');
            if (pop) {
                pop.addEventListener('popupshowing', this, false);
                pop.addEventListener('click', this, false);
                pop.addEventListener('popuphidden', this, false);
            }
            var panel = $('editBookmarkPanel');
            if (panel) {
                panel.addEventListener('popupshowing', this, false);
            }
            var placesContext = $("placesContext");
            if (placesContext) {
                placesContext.addEventListener('popupshowing', this, false);
                this.addPlaceMenu();
            }
            this.checkSideBar();
        },
        destroy: function () {
            $('PlacesToolbarItems').removeEventListener('popupshowing', this, false);
            $('PlacesToolbarItems').removeEventListener('popuphidden', this, false);
            var pop = $('BMB_bookmarksPopup');
            if (pop) {
                pop.removeEventListener('popupshowing', this, false);
                pop.removeEventListener('click', this, false);
                pop.removeEventListener('popuphidden', this, false);
            }
            var panel = $('editBookmarkPanel');
            if (panel) {
                panel.removeEventListener('popupshowing', this, false);
            }
            this.clearMenus();


            var placesContext = $("placesContext");
            if (placesContext) {
                placesContext.removeEventListener('popupshowing', this, false);
            }
            var p = $("addbmhere-place");
            if (p) {
                p.parentNode.removeChild(p);
            }

            if (SIDEBAR_SUPPORT) {
                var placesContextSide = $S("placesContext");
                if (placesContextSide) {
                    placesContextSide.removeEventListener('popupshowing', AddBMHere, false);
                    delete placesContextSide._add_menu;
                }
                var ps = $S("addbmhere-place");
                if (ps) {
                    ps.parentNode.removeChild(ps);
                }
                try{delete $("sidebar").contentWindow.AddBMHere;}catch(e){}
            }
        },
        clearMenus: function (parent) {
            let menuitems = (parent||document).querySelectorAll(".addbmhere-menu"),
                menuseparators = (parent||document).querySelectorAll(".addbmhere-separator");
            for (let menuitem of menuitems) {
                delete menuitem.parentNode._add_menu_flag;
                menuitem.parentNode.removeChild(menuitem);
            }
            for (let menuseparator of menuseparators) {
                delete menuseparator.parentNode._add_menu_flag;
                menuseparator.parentNode.removeChild(menuseparator);
            }
        },
        checkSideBar: function () {//初始会不成功，延迟判定
            if (SIDEBAR_SUPPORT) {
                let win = $("sidebar").contentWindow;
                if(!win.AddBMHere)win.AddBMHere = AddBMHere;
                var placesContextSide = $S("placesContext");
                if (placesContextSide){
                    if(!placesContextSide._add_menu){
                        placesContextSide.addEventListener('popupshowing', AddBMHere, false);
                        AddBMHere.addPlaceMenuSide();
                        placesContextSide._add_menu = true;
                    };
                }
                setTimeout(AddBMHere.checkSideBar, 1000);
            }
        },
        placesNode: null,
        getSideWin: function () {
            return $("sidebar").contentWindow;
        },
        addBookmark(parentNode) {
            //菜单会影响新增书签位置，先删除掉
            AddBMHere.removeMenu(parentNode);
            this.placesNode = parentNode._placesNode;
            PlacesCommandHook.bookmarkPage(gBrowser.selectedBrowser, true);
        },
        addBookmarkPlace() {
            this.placesNode = PlacesUIUtils.getViewForNode(window.document.popupNode).selectedNode;
            if (!this.placesNode) {
                try {
                    this.placesNode = window.document.popupNode._placesNode;
                } catch (e) {
                }
            }
            PlacesCommandHook.bookmarkPage(gBrowser.selectedBrowser, true);
        },
        addBookmarkPlaceSide() {
            this.placesNode = PlacesUIUtils.getViewForNode(this.getSideWin().document.popupNode).selectedNode;
            if (!this.placesNode) {
                try {
                    this.placesNode = this.getSideWin().document.popupNode._placesNode;
                } catch (e) {
                }
            }
            PlacesCommandHook.bookmarkPage(gBrowser.selectedBrowser, true);
        },
        addPlaceMenu: function () {
            let doc = document;
            var inspos = doc.getElementById("placesContext_openSeparator");
            let menuitem = doc.createElement("menuitem");
            menuitem.id = "addbmhere-place";
            menuitem.setAttribute("label", MENU_NAME);
            menuitem.setAttribute("oncommand", "window.AddBMHere.addBookmarkPlace();");
            menuitem.setAttribute("image", MENU_ICON);
            menuitem.setAttribute("class", "menuitem-iconic");
            inspos.parentNode.insertBefore(menuitem, inspos);
        },
        addPlaceMenuSide: function () {
            let doc = $("sidebar").contentWindow.document;
            var inspos = doc.getElementById("placesContext_openSeparator");
            let menuitem = doc.createElement("menuitem");
            menuitem.id = "addbmhere-place";
            menuitem.setAttribute("label", MENU_NAME);
            menuitem.setAttribute("oncommand", "window.AddBMHere.addBookmarkPlaceSide();");
            menuitem.setAttribute("image", MENU_ICON);
            menuitem.setAttribute("class", "menuitem-iconic");
            inspos.parentNode.insertBefore(menuitem, inspos);
        },
        addMenu: function (parentNode) {
            if (!parentNode._add_menu_flag) {
                var firstMenu = parentNode.firstChild;
                while (firstMenu) {
                    if (firstMenu.tagName == "menuitem" || firstMenu.tagName == "menu") break;
                    firstMenu = firstMenu.nextSibling;
                }
                var menuitem = document.createElement("menuitem");

                menuitem.setAttribute("label", MENU_NAME);
                menuitem.setAttribute("oncommand", "window.AddBMHere.addBookmark(this.parentNode);");
                menuitem.setAttribute("image", MENU_ICON);
                menuitem.setAttribute("class", "menuitem-iconic bookmark-item menuitem-with-favicon addbmhere-menu");

                parentNode._add_menu_flag = "1";

                parentNode.insertBefore(menuitem, firstMenu);

                var menuseparator = document.createElement("menuseparator");
                menuseparator.setAttribute("class", "bookmarks-actions-menuseparator addbmhere-separator");
                parentNode.insertBefore(menuseparator, firstMenu);

            }
        },
        removeMenu: function (parentNode) {
            if (parentNode._add_menu_flag) {
                let menuitem = parentNode.querySelector(".addbmhere-menu"),
                    menuseparator = parentNode.querySelector(".addbmhere-separator");
                if (menuitem) {
                    menuitem.parentNode.removeChild(menuitem);
                }
                if (menuseparator) {
                    menuseparator.parentNode.removeChild(menuseparator);
                }
                delete parentNode._add_menu_flag;
            }
        },
        handleEvent: function (event) {
            if (event.type == "popuphidden") {
                //为保证其他方式添加书签不收影响，隐藏时清除所有添加的菜单
                this.clearMenus(event.target);
                return;
            }
            if (event.target.id == "placesContext") {
                var isFloder = false;
                try {
                    let selectedNode = PlacesUIUtils.getViewForNode(event.target.ownerDocument.popupNode).selectedNode;
                    isFloder = !selectedNode || selectedNode.hasChildren;
                } catch (e) {
                    alert(e.message);
                }
                let menus = event.target.querySelectorAll("#addbmhere-place");
                for (let menu of menus) {
                    if (isFloder) {
                        menu.hidden = false;
                        menu.disabled = false;
                    } else {
                        menu.hidden = true;
                    }
                }
                return;
            }
            if (event.target.tagName == "panel") {
                setTimeout(function () {
                    gEditItemOverlay.toggleFolderTreeVisibility();
                    if (AddBMHere.placesNode) {
                        var panel = $('editBookmarkPanel');
                        //自动隐藏添加面板
                        if (AUTO_ADD) {
                            panel.setAttribute("style", "opacity:0");
                        }
                        var folderItem = gEditItemOverlay._getFolderMenuItem(AddBMHere.placesNode.itemId, AddBMHere.placesNode.title);
                        gEditItemOverlay._folderMenuList.selectedItem = folderItem;
                        folderItem.doCommand();
                        AddBMHere.placesNode = null;
                        if (AUTO_ADD) {
                            setTimeout(function () {
                                panel.removeAttribute("style");
                                StarUI.panel.hidePopup();
                            }, 100);
                        }
                    }
                }, 1);
            } else {
                var menupopup;
                if (event.target.tagName == 'menu') {
                    menupopup = event.target.menupopup;
                } else if (event.target.tagName == 'menupopup') {
                    menupopup = event.target;
                } else return;
                if (!menupopup) return;

                AddBMHere.addMenu(menupopup);

            }
        }
    };

    AddBMHere.init();
    window.AddBMHere = AddBMHere;

    function $(id) {
        return document.getElementById(id);
    }

    function $S(id) {
        try {
            return $("sidebar").contentWindow.document.getElementById(id);
        } catch (e) {
            return null;
        }
    }

})();
