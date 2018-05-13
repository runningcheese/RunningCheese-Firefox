// ==UserScript==
// @name                 UndoCloseTabBtn.uc.js
// @namespace            UndoCloseTab@gmail.com
// @description          Geschlossene Tabs wieder herstellen, Schaltfläche mit Popupmenü
// @author               defpt
// @charset              UTF-8
// @Compatibility        FF29 - FF60
// @version              v2018.05.10
// @note                 changed this.event.stopPropagation(); to event.stopPropagation();
// ==/UserScript==
(function() {
	var buttonAttrs = {
		id: "undoclosetab-button",
		label: "Tabs wiederherstellen",
		tooltiptext: "Kürzlich geschlossene Tabs wiederherstellen",
		class: "toolbarbutton-1 chromeclass-toolbar-additional",
		removable: "true",
		type: "menu-button", // Linksklick auf die Schaltfläche, um den zuletzt geschlossenen Tab wiederherzustellen. 
		                     // Mit rechtsklick, Liste, der zuletzt geschlossenen Tabs, anzeigen, dann 
						     // zum Wiederherstellen eines Tabs, klick auf entsprechenden Kontextmenüeintrag.
		image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAAsTAAALEwEAmpwYAAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAADgUlEQVR42mL8//8/AyUAIIBYYIzVq1dLC4mIrvr08ZPV379/vjEzMwOZnycmxMV04DMAIIAYQC4A4dXr1oU+fvLk/5/fv/9//fzl/9ev3/6vWLnqK0weFwYIIBZ0A79//crw5+9fhh+//jBYWlhz1dc3fgIqZeDh4WHk4uaqysnKmoysHiCAwAbceHRD6uLdQ0kGunoMv9hYGX79/sPw7cdvhn///jNYWJjzgtRw8/AwvHz5smzutlbN4yeP/k8Pqeo11bW5BxBAjCBnFPbHd7EIMJRoiZgx8nBwMvz+85fhJ9CQf3//Mzx9+pQBFM483FwMQG8xMDL/ZXj46cZ/9v/sk6ZWriwACCCwC25eviprEKbGeOP/AYavb34wsHCwMPz9AzTg9z+GP7x/Gf7++ws07B/Djz+/GZiYGBhYBdgYrx68JwXUyggQQGADePgFfjD+ZGHgF+Bl+P7yHZDPycDGws2gKW7GIMAhwnDs4XaGJ1/uMPz+8Z2BnYOZ4fOnzwwsrMxfgVr/AwQQ2ABpGYkv/GLcDELSfEDn/2HgFeZh8JdLYfjw6SODvqw5g4KiPMOsMw0MDEDbOYWABrz5zsAtI/wJpBcggJhABD+P8MefX38x/AU6k+EvIwPHHx4GNgYuhuuPLzCcuL2f4QswZozEHBjYGDmAdjIw/Pn+l0FCVOoNSC9AAIENEBEQe/Pjy0+GP8CA42LgZ/BXTWb48OUdw6m7+xmm7W5hePTqLoOLaigD+28+hnfv3jN8ePMJaIDMc5BegAACGyApLPX82+fvDB/ev2f4/eU/Ax+bEMOLd08ZpITkGbTl9IHp4jfDsev7GL59/8Lw+9dvhp/ffjPISio+BekFCCCwAQpiyrdfPn3F8OrVa4bHr+8zXHxwioGbjY+hwq+PwVkzmCHYMpFBS84A6Pp/DP/+/2P4+/Mvg5Ks+gOQXoAAggSimNqTb59+/v7x7SfL289vGRccmMDAxyrEsO3sKmCC+sKw9+xmhicf7gLxfQZ2QSaG/38YfkvyyoPCgBEggMAGfPnyhV2eV6vzxs7LWr9//Gf+yPKS6f/fl8zAhMgISkX//11h+M/I+A/ohL/f2P7/1VA2uvb161cOkAMAAogRmp1Znz17xsrCwsL07ds3lu/fvzOD2D9+/GCCpXk2Nra/XFxc/4Bif7i5uf9ISUn9Bgr/BggwAMhljD12v/akAAAAAElFTkSuQmCC",
		command: "History:UndoCloseTab"
	};
	
	var uCTBtn = $C('toolbarbutton', buttonAttrs);

	var popup = uCTBtn.appendChild($C("menupopup", {
		oncommand: "event.stopPropagation();",
		onpopupshowing: "parentNode.populateUndoSubmenu();",
		context: "",
		tooltip: "bhTooltip",
		popupsinherittooltip: "true"
	}));
	uCTBtn._getClosedTabCount = HistoryMenu.prototype._getClosedTabCount;
	uCTBtn.populateUndoSubmenu = eval("(" + HistoryMenu.prototype.populateUndoSubmenu.toString().replace(/._rootElt.*/, "") + ")");
	
	// Aus User Agent Overrider Erweiterung
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
        if (attr) Object.keys(attr).forEach(function(n){ el.setAttribute(n, attr[n])});
        return el;
	}
})();
