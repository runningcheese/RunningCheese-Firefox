(function () {
	if (location != 'chrome://browser/content/browser.xul')
		return;
	let translate = function () {
		let browserMM = gBrowser.selectedBrowser.messageManager;
		browserMM.addMessageListener('getSelection', function listener(message) {
			let t = (message.data !== '');
			let e = (document.charset || document.characterSet);
			if (t) {
				gBrowser.loadOneTab('http://translate.google.com/#auto/de/' + encodeURIComponent(message.data), null, null, null, false, false);
			} else {
				gBrowser.loadOneTab('http://translate.google.com/translate?u=' + encodeURIComponent(gBrowser.currentURI.spec) + '&hl=de-DE&ie=' + e + '&sl=auto&tl=de-DE', null, null, null, false, false);
			};
			browserMM.removeMessageListener('getSelection', listener, true);
		});
		browserMM.loadFrameScript('data:,sendAsyncMessage("getSelection", content.document.getSelection().toString())', true);
	}
	let menuitem = document.createElement('menuitem');
	menuitem.id = 'context-googletranslate';
	menuitem.setAttribute('label', 'Übersetzen');
	menuitem.setAttribute('tooltiptext', 'Mit GoogleTranslate übersetzen');
	menuitem.setAttribute('oncommand', '(' + translate.toString() + ')()');
	menuitem.classList.add('menuitem-iconic');
	//Wer kein Icon möchte kann die nächsten beiden Zeilen auskommentieren/löschen
	//menuitem.style.listStyleImage = 'url("https://translate.google.com/favicon.ico")';
	menuitem.style.listStyleImage = ' url("data:image/png;base64,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")';
	let refItem = document.getElementById('context-inspect');
	refItem.parentNode.insertBefore(menuitem, refItem);
})();
