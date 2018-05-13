// ==UserScript==
// @name                 UndoCloseTabBtn.uc.js
// @namespace          UndoCloseTab@gmail.com
// @description          可移动恢复已关闭标签按钮
// @author               defpt
// @charset              UTF-8
// @Compatibility        FF57+
// @version              v2018.04.04 更新兼容57+ by runningcheese
// @version              v2014.09.15
// ==/UserScript==
(function() {
	var buttonAttrs = {
		id: "undoclosetab-button",
		label: "恢复最后关闭的标签",
		tooltiptext: "左键：恢复最后关闭的标签\n右键：显示关闭标签菜单",
		class: "toolbarbutton-1 chromeclass-toolbar-additional",
		removable: "true",
		context: "_child", //点击按钮恢复最后一次关闭的标签
								//如果想左键恢复最后一次关闭的标签，右键打开已关闭标签列表，那么改为(context: "_child",) 
								//如果想改成菜单形式的，那么改为(type: "menu-button",)
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA5ElEQVQ4jaXTr0oFQRTH8c8yIBgWBMFg2ifwBa5oEsRguWCxGQwGq+9hMvgItxgEww0Gg+m+w02bBYtJw8zCsO64q35hYObMnN+cPzN8Z2fANpljtNj6j/PsL87beMdnYbzhCecIJZF5imAvs52gThfM8YqlH1LsRLoDL9jP9gNuk0gxkiab3+Fq4MwSlyWBnOsk0ucoRTfKIVbY7NlrsbCj1FhgjbOe/WOKQMcMN9l6cgolnkMIF0MbDe7FEIcIYlGLbez6vBbb12ADu+IrXFVV9WjCXzkQi9eKT7nFA07HHH/NFwrNKkyQLvLzAAAAAElFTkSuQmCC",
		command: "History:UndoCloseTab"
	};
	
	var uCTBtn = $C('toolbarbutton', buttonAttrs);

	var popup = uCTBtn.appendChild($C("menupopup", {
		oncommand: "event.stopPropagation();",
		onpopupshowing: "this.parentNode.populateUndoSubmenu();",
		context: "",
		tooltip: "bhTooltip",
		popupsinherittooltip: "true"
	}));
	uCTBtn._getClosedTabCount = HistoryMenu.prototype._getClosedTabCount;
	uCTBtn.populateUndoSubmenu = eval("(" + HistoryMenu.prototype.populateUndoSubmenu.toString().replace(/._rootElt.*/, "") + ")");
	
	// 来自 User Agent Overrider 扩展
    const log = function() { dump(Array.slice(arguments).join(' ') + '\n'); };
    const trace = function(error) { log(error); log(error.stack); };
    const ToolbarManager = (function() {

        /**
         * Remember the button position.
         * This function Modity from addon-sdk file lib/sdk/widget.js, and
         * function BrowserWindow.prototype._insertNodeInToolbar
         */
        let layoutWidget = function(document, button, isFirstRun) {

            // Add to the customization palette
            let toolbox = document.getElementById('navigator-toolbox');
            toolbox.palette.appendChild(button);

            // Search for widget toolbar by reading toolbar's currentset attribute
            let container = null;
            let toolbars = document.getElementsByTagName('toolbar');
            let id = button.getAttribute('id');
            for (let i = 0; i < toolbars.length; i += 1) {
                let toolbar = toolbars[i];
                if (toolbar.getAttribute('currentset').indexOf(id) !== -1) {
                    container = toolbar;
                }
            }

            // if widget isn't in any toolbar, default add it next to searchbar
            if (!container) {
                if (isFirstRun) {
                    container = document.getElementById('nav-bar');
                } else {
                    return;
                }
            }

            // Now retrieve a reference to the next toolbar item
            // by reading currentset attribute on the toolbar
            let nextNode = null;
            let currentSet = container.getAttribute('currentset');
            let ids = (currentSet === '__empty') ? [] : currentSet.split(',');
            let idx = ids.indexOf(id);
            if (idx !== -1) {
                for (let i = idx; i < ids.length; i += 1) {
                    nextNode = document.getElementById(ids[i]);
                    if (nextNode) {
                        break;
                    }
                }
            }

            // Finally insert our widget in the right toolbar and in the right position
            container.insertItem(id, nextNode, null, false);

            // Update DOM in order to save position
            // in this toolbar. But only do this the first time we add it to the toolbar
            if (ids.indexOf(id) === -1) {
                container.setAttribute('currentset', container.currentSet);
                document.persist(container.id, 'currentset');
            }
        };

        let addWidget = function(window, widget, isFirstRun) {
            try {
                layoutWidget(window.document, widget, isFirstRun);
            } catch(error) {
                trace(error);
            }
        };

        let removeWidget = function(window, widgetId) {
            try {
                let widget = window.document.getElementById(widgetId);
                widget.parentNode.removeChild(widget);
            } catch (error) {
                trace(error);
            }
        };

        let exports = {
            addWidget: addWidget,
            removeWidget: removeWidget,
        };
        return exports;
    })();
	
    ToolbarManager.addWidget(window, uCTBtn, false);
	document.insertBefore(document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent('\
		#undoclosetab-button menuitem {max-width: 240px;}\
		') + '"'), document.documentElement);
		
	function $C(name, attr) {
		var el = document.createElement(name);
		if (attr) Object.keys(attr).forEach(function(n) el.setAttribute(n, attr[n]));
		return el;
	}
})();
