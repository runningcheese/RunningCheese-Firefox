// ==UserScript==
// @name                openLinkByLongPress.uc.js
// @description         Links in einem neuen Tab öffnen dazu linke Maustaste gedrückt halten
// @include             main
// @version             0.0.1  Fx58 Kompatibel
// ==/UserScript==
(function() {
	'use strict';

	if (location != 'chrome://browser/content/browser.xul') {
		return;
	}
	
	const IN_BACKGROUND = true; //  Tab in Hintergrund öffnen
	const RELATED_TO_CURRENT = true; // Link oder Lesezeichen neben dem aktuellen Tab öffnen?
	// WAIT = Wartezeit zum Öffnen in einem neuen Tab in Millisekunden
	
	let frameScript = function() {
		const WAIT = 300;

		let timeoutID;
		let longPress = false;

		['mousedown', 'mouseup', 'dragstart'].forEach(function(type) {
			addEventListener(type, onClick, true);
		});

		function onClick(event) {
			if (timeoutID) {
				clearTimeout(timeoutID);
				timeoutID = null;
			}

			if (event.button !== 0) return;
			if (event.altKey || event.ctrlKey || event.shiftKey) return;

			let node = event.target || event.originalTarget;
			if (!node) return;

			let url = findLink(node);
			if (!url) return;

			if (event.type === 'mousedown') {
				timeoutID = setTimeout(function() {
					addEventListener('click', function clk(event) {
						removeEventListener('click', clk, true);
						event.preventDefault();
						event.stopPropagation();
					}, true);
					sendAsyncMessage('长按链接新标签打开.uc.js', url.href);
					longPress = true;
				}, WAIT);
			} else {
				clearTimeout(timeoutID);
				if (longPress && event.type === 'mouseup') {
					event.preventDefault();
					longPress = false;
				}
			}
		}

		function findLink(node) {
			if (!node || !node.tagName) {
				return null;
			}
			switch (node.tagName.toUpperCase()) {
				case 'A':
					return node;
				case 'AREA':
					if (node.href) {
						return node;
					} else {
						return findLink(node.parentNode);
					};
				case 'B':
				case 'BIG':
				case 'CODE':
				case 'DIV':
				case 'EM':
				case 'H1':
				case 'I':
				case 'IMG':
				case 'NOBR':
				case 'P':
				case 'S':
				case 'SMALL':
				case 'SPAN':
				case 'STRONG':
				case 'SUB':
				case 'SUP':
					return findLink(node.parentNode);
				default:
					return null;
			};
		}
	};

	let frameScriptURI = 'data:,(' + frameScript.toString() + ')()';
	window.messageManager.loadFrameScript(frameScriptURI, true);
	window.messageManager.addMessageListener('长按链接新标签打开.uc.js',
		function(message) {
			gBrowser.loadOneTab(message.data, {
				relatedToCurrent: RELATED_TO_CURRENT,
				inBackground: IN_BACKGROUND,
				referrerURI: makeURI(gBrowser.currentURI.spec)
			});
		}
	);

}());
