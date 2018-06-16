// ==UserScript==
// @name           NetEase Global Shortcut Keys
// @author         crab
// @include        main
// @description    网易云音乐浏览器全局快捷键：上/下一首(Ctrl + Shift + ←/→)，暂停/播放(Ctrl + Shift + Num0)
// @version        0.0.2
// ==/UserScript==

location == 'chrome://browser/content/browser.xul' && ({
	init: function(){
		messageManager.loadFrameScript('data:application/javascript;charset=UTF-8,'
		+ encodeURIComponent('('+(function(){
			addMessageListener('NetEaseShortcutKey', function(msg){
				let button = content.document.querySelector(msg.data);
				button && button.click();
			});
		}).toString() + ')();'), true);
		addEventListener('keydown', this, false);
	},
	sendMessage: function(key, isArrow){
		for(let i = 0; i < gBrowser.browsers.length; i++){
			let browser = gBrowser.browsers[i];
			if(browser.documentURI.asciiHost === 'music.163.com'){
				if(browser === gBrowser.selectedBrowser && isArrow)
					break;
				browser.messageManager.sendAsyncMessage('NetEaseShortcutKey', key);
				break;
			}
		}
	},
	handleEvent: function(event){
		if(event.ctrlKey && event.altKey || event.which === 0 && event.keyCode === 0){
			var isArrow = event.code === 37 || event.code === 39;
			switch(event.key){
				case '0':
				case 'MediaStop':
				case 'MediaPlayPause':
					this.sendMessage('.ply');
					break;
				case 'ArrowRight':
				case 'MediaTrackNext':
					this.sendMessage('.nxt', isArrow);
					break;
				case 'ArrowLeft':
				case 'MediaTrackPrevious':
					this.sendMessage('.prv', isArrow);
					break;
			}
		}
	},
}).init();