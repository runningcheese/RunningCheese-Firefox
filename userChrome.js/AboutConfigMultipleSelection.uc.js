// ==UserScript==
// @name           About:config Multiple Selection
// @version        0.3
// @description    Allow multiple selection on about:config and more
// @namespace      https://github.com/nightson/
// @author         NightsoN
// @include        chrome://browser/content/browser.xul
// @note           0.3 add "Copy as Function" to the contextmenu. Now you can copy config entries in user_pref(xxx, xxx); format to be used in user.js
// ==/UserScript==

window.addEventListener('DOMContentLoaded', function (event) {
    var doc = event.target,
        win;
    if (!doc || !doc.location.href.startsWith('about:config')) return;
    doc.getElementById('configTree').setAttribute('seltype', 'multiple');
    win = doc.defaultView;

    var contextMenu = doc.getElementById('configContext'),
        menuitem = contextMenu.insertBefore(doc.createElement('menuitem'), doc.getElementById('copyValue').nextSibling);
    menuitem.id = 'copyAsFunction';
    menuitem.setAttribute('label', 'Kopieren für user.js');
    menuitem.setAttribute('accesskey', 'K');
    menuitem.setAttribute('oncommand', 'copyAsFunction();');

    const gClipboardHelper = Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper);

    win.getSelected = function () {
        var arr = [],
            i = 0,
            k = 0,
            j = win.view.selection.getRangeCount(),
            start = {},
            end = {};
        for (i; i < j; i++) {
            win.view.selection.getRangeAt(i, start, end);
            for (k = start.value; k <= end.value; k++) {
                arr.push(win.gPrefView[k]);
            }
        }
        return arr;
    }

    win.ResetSelected = function () {
        win.getSelected().forEach(function (i) {
            Services.prefs.clearUserPref(i.prefCol);
        })
    }

    win.copyPref = function () {
        var arr = [];
        win.getSelected().forEach(function (i) {
            arr.push(i.prefCol + ';' + i.valueCol);
        });
        gClipboardHelper.copyString(arr.join('\n'));
    }

    win.copyName = function () {
        var arr = [];
        win.getSelected().forEach(function (i) {
            arr.push(i.prefCol);
        });
        gClipboardHelper.copyString(arr.join('\n'));
    }

   win.copyValue = function () {
        var arr = [];
        win.getSelected().forEach(function (i) {
            arr.push(i.valueCol);
        });
        gClipboardHelper.copyString(arr.join('\n'));
    }

    win.copyAsFunction = function () {
        var arr = [];
        win.getSelected().forEach(function (i) {
            if (i.typeCol === 32) {
                arr.push('user_pref("' + i.prefCol + '", "' + i.valueCol + '");');
            } else {
                arr.push('user_pref("' + i.prefCol + '", ' + i.valueCol + ');');
            }
        });
        gClipboardHelper.copyString(arr.join('\n'));
    }

}, true);
