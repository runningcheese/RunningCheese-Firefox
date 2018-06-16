//	browsertoolbox.uc.js

(function() {
	if (location != 'chrome://browser/content/browser.xul')
		return;

	try {
		CustomizableUI.createWidget({
			id: 'browser-toolbox-button',
			defaultArea: CustomizableUI.AREA_NAVBAR,
			label: 'Browser-Werkzeuge',
			tooltiptext: 'Browser-Werkzeuge',
			onCommand: function(event) {
				onCommand(event);
			}
		});
	} catch(e) {
		return;
	};

	var css = '\
		@-moz-document url("chrome://browser/content/browser.xul") { \
			#browser-toolbox-button { \
				list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAdUlEQVQokZVSwRHAIAgLPYfoXs7RCTpG53Avt7APrhaFU8gLMEEJAkEQgFbc7IxkVjt0r6Sp7VIVITumBpKt00FA2ThmjXzkfMMWO8EZFSj8LrUyjsG9b9DaJXq+qAIVxEUxtLHpaXE95dj1NcK2rmbwaGJ4Af0tIg00j/6iAAAAAElFTkSuQmCC) \
			} \
		}';
	var cssUri = Services.io.newURI('data:text/css,' + encodeURIComponent(css), null, null);
	var SSS = Cc['@mozilla.org/content/style-sheet-service;1'].getService(Ci.nsIStyleSheetService);
	SSS.loadAndRegisterSheet(cssUri, SSS.AGENT_SHEET);

	Cu.import('resource://gre/modules/Timer.jsm');

	function onCommand(event) {

		var listenOpen = {
			observe: function(aSubject, aTopic, aData) {
				if (aTopic != 'domwindowopened')
					return;
				var newWin = aSubject;
				newWin.addEventListener('load', function onLoad() {
					setTimeout(function() {
						doNewWin(newWin);
						newWin.removeEventListener('load', onLoad);
					}, 0);
				});
			}
		};

		function doNewWin(newWin) {
			const dialogText = 'Eine eingehende Anfrage für eine externe Debugger-Verbindung wurde erkannt.'
			if (newWin.location == 'chrome://global/content/commonDialog.xul' &&
			    newWin.document.getElementById('info.body').textContent.startsWith(dialogText))
			{
				var button = newWin.document.getAnonymousElementByAttribute(
					newWin.document.documentElement, 'dlgtype', 'accept');
				button.click();
				Services.ww.unregisterNotification(listenOpen);
				clearTimeout(tId);
			};
		};

		Services.ww.registerNotification(listenOpen);
		var document = event.target.ownerDocument;
		if (!document.getElementById('menu_browserToolbox')) {
			let { require } = Cu.import("resource://devtools/shared/Loader.jsm", {});
			require("devtools/client/framework/devtools-browser");
		};
		document.getElementById('menu_browserToolbox').click();
		var tId = setTimeout(function() {
			Services.ww.unregisterNotification(listenOpen);
		}, 5000);
	};

})();
