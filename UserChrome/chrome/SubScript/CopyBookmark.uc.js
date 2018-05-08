// ==UserScript==
// @id             copyBookmark
// @name           Enhanced Bookmark Copy
// @version        0.9.2
// @namespace      simon
// @author         Simon Chan
// @description    书签右键复制标题链接.Let you copy title or both title and url of bookmark(s) easier.
// @include        chrome://browser/content/browser.xul
// @include        chrome://browser/content/places/places.xul
// @include        chrome://browser/content/bookmarks/bookmarksPanel.xul
// @include        chrome://browser/content/history/history-panel.xul
// @run-at         document-end
// ==/UserScript==

(function () {
    var targetURIs = [
         "chrome://browser/content/browser.xul",
         "chrome://browser/content/places/places.xul",
         "chrome://browser/content/bookmarks/bookmarksPanel.xul",
         "chrome://browser/content/history/history-panel.xul"
    ];
    if (!location in targetURIs)
        return;

    Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");

    var stringBundles = {
        "zh-CN": {
            "copyUrl": "%E5%A4%8D%E5%88%B6%E5%9C%B0%E5%9D%80",  // "复制地址"
            "copyTitle": "%E5%A4%8D%E5%88%B6%E6%A0%87%E9%A2%98", //"复制标题",
            "copyBoth": "%E5%A4%8D%E5%88%B6%E6%A0%87%E9%A2%98%E5%92%8C%E5%9C%B0%E5%9D%80", //"复制标题和地址",
            "folder": "(%E6%96%87%E4%BB%B6%E5%A4%B9)", //"(文件夹)",
            "noTitle": "(%E6%97%A0%E6%A0%87%E9%A2%98)", //"(无标题)"
        },
        "zh-TW": {
            "copyUrl": "%E8%A4%87%E8%A3%BD%E5%9C%B0%E5%9D%80",  // "复制地址"
            "copyTitle": "%E8%A4%87%E8%A3%BD%E6%A8%99%E9%A1%8C", //"复制标题",
            "copyBoth": "%E8%A4%87%E8%A3%BD%E6%A8%99%E9%A1%8C%E5%92%8C%E5%9C%B0%E5%9D%80", //"复制标题和地址",
            "folder": "(%E6%96%87%E4%BB%B6%E5%A4%BE)", //"(文件夹)",
            "noTitle": "(%E7%84%A1%E6%A8%99%E9%A1%8C)", //"(无标题)"
        },
        "en-US": {
            "copyUrl": "Copy url",
            "copyTitle": "Copy title",
            "copyBoth": "Copy title and url",
            "folder": "(folder)",
            "noTitle": "(No Title)"
        }
    };
    var locale = Cc["@mozilla.org/preferences-service;1"]
        .getService(Components.interfaces.nsIPrefBranch)
        .getCharPref("general.useragent.locale");
    var stringBundle = stringBundles[locale] || stringBundles["en-US"];
    function getI18n(key) {
        return decodeURI(stringBundle[key]);
    }

    var topLevel;
    function getSpace(indentLevel) {
        var str = [];
        for (var i = -1; i < indentLevel - topLevel; i++)
            str.push(null);
        return str.join("    ");
    }

    XPCOMUtils.defineLazyServiceGetter(this, "annotations",
        "@mozilla.org/browser/annotation-service;1",
        "nsIAnnotationService");

    function getChildren(node, type) {
        var results = [];
        var space = getSpace(node.indentLevel);

        if (PlacesUtils.nodeIsFolder(node) && annotations
            .itemHasAnnotation(node.itemId, PlacesUtils.LMANNO_FEEDURI)) {
            results.push(space + node.title);
            if (type == "both")
                results.push(space + annotations
                    .getItemAnnotation(node.itemId, PlacesUtils.LMANNO_FEEDURI));
        }
        else if (PlacesUtils.nodeIsContainer(node)) {
            asContainer(node);
            var wasOpen = node.containerOpen;
            if (!wasOpen)
                node.containerOpen = true;
            results.push(space + node.title + " " + getI18n("folder"));
            for (var i = 0; i < node.childCount; i++)
                results = results.concat(getChildren(node.getChild(i), type));
            node.containerOpen = wasOpen;
        }
        if (PlacesUtils.nodeIsURI(node)) {
            if (node.title == null)
                results.push(space + getI18n("noTitle"));
            else
                results.push(space + node.title);
            if (type == "both")
                results.push(space + node.uri);
        }
        if (PlacesUtils.nodeIsSeparator(node))
            results.push(space + "--------------------");

        return results;
    }

    XPCOMUtils.defineLazyServiceGetter(this, "clipboard",
        "@mozilla.org/widget/clipboardhelper;1",
        "nsIClipboardHelper");

    function copyBookmark_copy(type) {
        var results = [];
        PlacesUIUtils.getViewForNode(document.popupNode).selectedNodes.forEach(function (node) {
            topLevel = node.indentLevel;
            if (PlacesUtils.nodeIsFolder(node) &&
                asQuery(node).queryOptions.excludeItems) {
                var oldState = node.containerOpen;
                var concreteId = PlacesUtils.getConcreteItemId(node);
                results = results.concat(getChildren(PlacesUtils
                    .getFolderContents(concreteId, false, true).root, type));
                node.containerOpen = oldState;
            }
            else
                results = results.concat(getChildren(node, type));
        });
        clipboard.copyString(results.join("\r\n"));
    }

    var copyTitleMenuItem = document.createElement("menuitem");
    copyTitleMenuItem.id = "copyBookmark_copyTitle";
    copyTitleMenuItem.setAttribute("label", getI18n("copyTitle"));
    copyTitleMenuItem.setAttribute("selection", "any");
    copyTitleMenuItem.setAttribute("closemenu", "single");
    copyTitleMenuItem.addEventListener("command", function () { copyBookmark_copy(); });
    copyTitleMenuItem.setAttribute("accesskey", "t");

    var copyBothMenuItem = document.createElement("menuitem");
    copyBothMenuItem.id = "copyBookmark_copyBoth";
    copyBothMenuItem.setAttribute("label", getI18n("copyBoth"));
    copyBothMenuItem.setAttribute("selection", "any");
    copyBothMenuItem.setAttribute("closemenu", "single");
    copyBothMenuItem.addEventListener("command", function () { copyBookmark_copy("both"); });
    copyBothMenuItem.setAttribute("accesskey", "u");

    var copyMenuItem = document.getElementById("placesContext_copy");
    copyMenuItem.setAttribute("label", getI18n("copyUrl"));
    copyMenuItem.parentNode.insertBefore(copyTitleMenuItem, copyMenuItem);
    copyMenuItem.parentNode.insertBefore(copyBothMenuItem, copyMenuItem.nextSibling);

    /* This Source Code Form is subject to the terms of the Mozilla Public
    * License, v. 2.0. If a copy of the MPL was not distributed with this
    * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
    function QI_node(aNode, aIID) {
        var result = null;
        try {
            result = aNode.QueryInterface(aIID);
        }
        catch (e) { }
        return result;
    }
    function asContainer(aNode) {
        return QI_node(aNode, Ci.nsINavHistoryContainerResultNode);
    }
    function asQuery(aNode) {
        return QI_node(aNode, Ci.nsINavHistoryQueryResultNode);
    }
})();