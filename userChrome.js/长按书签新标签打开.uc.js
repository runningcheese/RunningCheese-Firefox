// ==UserScript==
// @name                newTabByLongPress.uc.js
// @description         Lesezeichen mit länger gedrückter Linken Maustaste in neuem Tab öffnen
// @include             main
// @version             0.8.4  Nur bei Lesezeichen ändern
// @version             0.8.3  Link-Korrekturen
// @version             0.8.2  Für Links aber nicht von Bildern
// @version             0.8.1  Timer-Korrektur
// ==/UserScript==
(function () {
	'use strict';

	const WAIT = 250; // Zeitspanne die die Maustaste gedrückt werden muss, in Millisekunden
	const IN_BACKGROUND = true; // Tab im Hintergrund öffnen
	const RELATED_TO_CURRENT = true; // Link oder Lesezeichen direkt neben dem aktuellen Tab öffnen?

	var timeoutID;
	var longPress = false;

	function handleLongPress (e) {
		if (timeoutID) {
			clearTimeout(timeoutID);
			timeoutID = null;
		}

		if (e.button !== 0) return;
		if (e.altKey || e.ctrlKey || e.shiftKey) return;

		var node = e.target || e.originalTarget;
		if (!node) return;

		var url = getPlacesURI(e, node);
		if (!url) return;

		if (e.type === 'mousedown') {
			timeoutID = setTimeout(function () {
				addEventListener('click', function clk(e) {
					removeEventListener('click', clk, true);
					e.preventDefault();
					e.stopPropagation();
				}, true);
				gBrowser.loadOneTab(url, {
					relatedToCurrent: RELATED_TO_CURRENT,
					inBackground: IN_BACKGROUND,
					referrerURI: makeURI(gBrowser.currentURI.spec)
				});
				longPress = true;
			}, WAIT);
		} else {
			clearTimeout(timeoutID);
			if (longPress && e.type === 'mouseup') {
				e.preventDefault();
				longPress = false;
			}
		}
	}

	function getPlacesURI (e, node) {
		if (!node || !node.localName)
			return;
		var lnlc = node.localName.toLowerCase();
		if (node._placesNode && PlacesUtils.nodeIsURI(node._placesNode)
			|| (lnlc === 'treechildren' && (isBookmarkTree(node.parentNode)
			|| isHistoryTree(node.parentNode)))) {
			return (lnlc === 'treechildren') ? getTreeInfo(e, 'uri') : node._placesNode.uri;
		}
	}

	function getTreeInfo (e, prop) {
		if (!('PlacesUtils' in window))
			return '';
		var tree = (e.target || e.originalTarget).parentNode;
		tree = tree.wrappedJSObject || tree;
		var row = {}, col = {}, obj = {};
		var tbo = tree.treeBoxObject;
		tbo.getCellAt(e.clientX, e.clientY, row, col, obj);
		if (row.value === -1)
			return '';
		try {
			var node = tree.view.nodeForTreeIndex(row.value);
		} catch(ex) {}
		if (!node || !PlacesUtils.nodeIsURI(node))
			return '';
		return node[prop];
	}

	function isBookmarkTree(tree) {
		return isPlacesTree(tree)
			&& /[:&]folder=/.test(tree.getAttribute("place"));
	}

	function isHistoryTree(tree) {
		if(!isPlacesTree(tree))
			return false;
		var place = tree.getAttribute("place");
		return !/[:&]folder=/.test(place)
			&& !/[:&]transition=7(?:&|$)/.test(place);
	}

	function isPlacesTree(tree) {
		return tree.getAttribute("type") === "places";
	}

	['mousedown', 'mouseup', 'dragstart'].forEach(function (type) {
		addEventListener(type, handleLongPress, true);
	});

}());
