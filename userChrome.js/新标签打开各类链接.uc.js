// ==UserScript==
// @name            openNewTab.uc.js
// @namespace       opennewtab@haoutil.com
// @include         main
// @include         chrome://browser/content/places/places.xul
// @description     Open Bookmarks/History/Search in New Tab
// @downloadURL     https://raw.githubusercontent.com/Harv/userChromeJS/master/openNewTab.uc.js
// @version         1.3.4
// ==/UserScript==
(function() {
    var b_urlbar = false;
    var b_searchbar = true;

    function whereToOpenLinkMod() {
        {
    var b_bookmarks = true;
    var b_history = true;

            if (!e) return 'current';
            var win = window.opener || window;
            if (win.isTabEmpty(win.gBrowser.mCurrentTab || win.gBrowser.selectedTab)) return 'current';
            var node = e.originalTarget;
            while (node) {
                if(node.className && node.className.indexOf('bookmark-item') != -1
                    && node.outerHTML && node.outerHTML.indexOf('scheme="javascript"') != -1) {
                    return 'current';
                }
                switch (node.id) {
                    case 'bookmarksMenuPopup':  // menubar bookmarks
                    case 'BMB_bookmarksPopup':  // navibar bookmarks
                    case 'bookmarksPanel':      // sidebar bookmarks
                        return b_bookmarks ? 'tab' : 'current';
                    case 'goPopup':             // menubar history
                    case 'PanelUI-history':     // navibar history
                    case 'history-panel':       // sidebar history
                        return b_history ? 'tab' : 'current';
                    case 'placeContent':        // library bookmarks&history
                        var collection = window.document.getElementById('searchFilter').getAttribute('collection');
                        var tab = collection === "bookmarks" && b_bookmarks || collection === "history" && b_history;
                        return tab ? 'tab' : 'current';
                }
                node = node.parentNode;
            }
            return 'current';
        }
    }
    if (location == 'chrome://browser/content/browser.xul') {
        /* :::: Open Bookmarks/History in New Tab :::: */
        eval('whereToOpenLink = ' + whereToOpenLink.toString().replace(/(return "current";)(?![\s\S]*\1)/g, whereToOpenLinkMod.toString().replace(/^.*{|}$/g, '')));
        var sidebar = document.getElementById('sidebar');
        sidebar && sidebar.addEventListener('DOMContentLoaded', function(event) {
            var doc = event.originalTarget;
            var win = doc.defaultView.window;
            if (win.location == 'chrome://browser/content/bookmarks/bookmarksPanel.xul' || win.location == 'chrome://browser/content/history/history-panel.xul') {
                eval('win.whereToOpenLink=' + win.whereToOpenLink.toString().replace(/(return "current";)(?![\s\S]*\1)/g, whereToOpenLinkMod.toString().replace(/^.*{|}$/g, '')));
            } else if (win.location == 'chrome://browser/content/readinglist/sidebar.xhtml') {
                /* :::: Open Sidebar ReadingList in New Tab :::: */
                eval('win.RLSidebar.openURL = ' + win.RLSidebar.openURL.toString().replace(/log\.debug\(.*\);/, '').replace(/mainWindow\.openUILink\(url, event\);/, (function() {
                    var where = isTabEmpty(gBrowser.mCurrentTab || gBrowser.selectedTab) ? 'current' : 'tab';
                }).toString().replace(/^.*{|}$/g, '') + '$&'));
            }
        });
        /* :::: Open Url in New Tab :::: */
        if (b_urlbar) {
            var urlbar = document.getElementById('urlbar');
            urlbar && eval('urlbar.handleCommand=' + urlbar.handleCommand.toString().replace(/let where = openUILinkWhere;/, (function() {
                let  where = isTabEmpty(gBrowser.mCurrentTab || gBrowser.selectedTab) ? 'current' : 'tab';
            }).toString().replace(/^.*{|}$/g, '')));
        }
        /* :::: Open Search in New Tab :::: */
        if (b_searchbar) {
            var searchbar = document.getElementById('searchbar');
            searchbar && /*{true: function() {*/
                eval('searchbar.handleSearchCommand=' + searchbar.handleSearchCommand.toString().replace(/this\.doSearch\(textValue, where(, aEngine)?\);|this\.handleSearchCommandWhere\(aEvent, aEngine, where, params\);/, (function() {
                    where = isTabEmpty(gBrowser.mCurrentTab || gBrowser.selectedTab) ? 'current' : 'tab';
                }).toString().replace(/^.*{|}$/g, '') + '$&'));
            /*}, false: function() {
                searchbar.addEventListener('load', this[true]);
            }}[!!searchbar.handleSearchCommand]();*/
            var oneOffButtons = document.getElementById('PopupSearchAutoComplete').oneOffButtons;
            oneOffButtons && eval('oneOffButtons.handleSearchCommand=' + oneOffButtons.handleSearchCommand.toString().replace(/this\.popup\.handleOneOffSearch\(aEvent, aEngine, where, params\);/, (function() {
                where = isTabEmpty(gBrowser.mCurrentTab || gBrowser.selectedTab) ? 'current' : 'tab';
            }).toString().replace(/^.*{|}$/g, '') + '$&'));
            var oneOffSearchButtons = document.getElementById('PopupAutoCompleteRichResult').input.popup.oneOffSearchButtons;
            oneOffSearchButtons && eval('oneOffSearchButtons.handleSearchCommand=' + oneOffSearchButtons.handleSearchCommand.toString().replace(/this\.popup\.handleOneOffSearch\(aEvent, aEngine, where, params\);/, (function() {
                where = isTabEmpty(gBrowser.mCurrentTab || gBrowser.selectedTab) ? 'current' : 'tab';
            }).toString().replace(/^.*{|}$/g, '') + '$&'));
        }
    } else if (location == 'chrome://browser/content/places/places.xul') {
        /* :::: Open Bookmarks/History in New Tab :::: */
        eval('whereToOpenLink = ' + whereToOpenLink.toString().replace(/(return "current";)(?![\s\S]*\1)/g, whereToOpenLinkMod.toString().replace(/^.*{|}$/g, '')));
    }
})();
