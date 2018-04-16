// ==UserScript==
// @name           open_in_new_tab
// @description    Open in new tab
// @compatibility  Firefox 3.0+
// @author         GOLF-AT
// @version        3.1.20171105
//让书签、历史、url、搜索在新的标签页打开

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
