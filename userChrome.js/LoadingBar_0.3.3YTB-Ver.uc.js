// ==UserScript==
// @include			main
// @version			0.3.3
// @note			[20141128]兼容E10S
// @note			[20150206]添加connecting动画
// @note			[20150404]尝试改善某些情况下的CPU占用
// @note			[20150711]更新CSS linear-gradient(),radial-gradient()标准语法(nightly 150710)。
// ==/UserScript==
location == "chrome://browser/content/browser.xul" && (function () {
	//Location Bar Enhancer5.1;Loading Bar0.3.0
	var loadingBar = {
		progress: new WeakMap(),
		init: function () {
			if(document.getElementById('UCloadingBar')) return;
			var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
			sss.loadAndRegisterSheet(Services.io.newURI('data:text/css;base64,' + btoa((function () {/*
				@namespace url("http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul");
				@-moz-document url("chrome://browser/content/browser.xul"){
					@keyframes UCloadingBarPulse {
						0% {opacity:1}
						50% {opacity:0}
						100% {opacity:1}
					}
					@keyframes loadingBarConnecting {
						0% {transform: translateX(300%)}
						100% {transform: translateX(-300%)}
					}
					#UCloadingBar, #UCloadingBar[connecting]::after{
						background-size: 100% 2px;
						background-repeat: repeat-x;
						height: 10px;
					}
					#UCloadingBar{
						position: fixed;
						pointer-events:none;
						border-left:2px transparent;
						border-right:2px transparent;
						overflow: hidden;
						opacity:1;
						transform: translateX(-100%);
						background-image:linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.25) 25%, rgba(254,178,53,1) 100%);
						width:100%;
					}
					#UCloadingBar:not([style*="translateX(-100%)"]){
						transition: transform 800ms ease 0s;
					}
					#UCloadingBar:not([connecting])::after {
						display:none;
					}
					#UCloadingBar[connecting]::after {
						content:'';
						animation: loadingBarConnecting 2500ms infinite linear;
						background-image: radial-gradient(ellipse farthest-corner at center top, rgba(254,178,53, 1) 25%, rgba(255,255,255,0.25) 100%);
						width: 30%;
						position: absolute;
					}
					#UCloadingBar[connecting]{
						background-image:none;
					}
					#UCloadingBar[complete]{
						opacity:0;
					}
					#UCloadingBar[complete][style*="translateX(0%)"]{
						transition: opacity 800ms ease 100ms;
					}
					#UCloadingBar[style]:not([connecting]):not([complete])::before{
						content:'';
						position: absolute;
						top:-10px;
						right: 0px;
						width: 100px;
						height: 100%;
						box-shadow: 0px 0px 10px 3px rgba(254,178,53,1), 0px 0px 5px 2px rgba(254,178,53,1);
						transform: rotate(3deg) translate(0px, -4px);
						animation:UCloadingBarPulse 2s ease-out 0s infinite;
					}
				}
			*/}).toString().replace(/^.+\s|.+$|\t+\/\/.*/g, '')), null, null), sss.USER_SHEET);
			var appcontent = document.getElementById('appcontent'),
				lb  = document.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'hbox');
			lb.id = 'UCloadingBar';
			appcontent.insertBefore(lb, appcontent.firstChild);
			this.progressBar = lb;
			gBrowser.tabContainer.addEventListener('TabSelect', this, false);
			gBrowser.addTabsProgressListener(this);
		},
		setConnecting: function(connecting){
			if(connecting){
				this.progressBar.hasAttribute('connecting') || this.progressBar.setAttribute('connecting', 'true');
			}else{
				this.progressBar.hasAttribute('connecting') && this.progressBar.removeAttribute('connecting');
			}
		},
		setComplete: function(complete){
			if(complete){
				this.progressBar.hasAttribute('complete') || this.progressBar.setAttribute('complete', 'true');
			}else{
				this.progressBar.hasAttribute('complete') && this.progressBar.removeAttribute('complete');
			}
			return complete;
		},
		handleEvent: function (e) {
			if (e.type == 'TabSelect') {
				this.onChangeTab();
			}
		},
		onChangeTab: function () {
			var cd = gBrowser.selectedBrowser,
				val = this.progress.get(cd);
			if (!val) {
				val = [0, false];
				newTab = true;
				this.progress.set(cd, val);
			}
			if(!this.progressBar) return;

			this.setConnecting(val[1]);
			this.progressBar.style.transition = 'none';
			if (val[0] > 0.95) {
				if(!this.setComplete(val[0] == 1)){
					this.progressBar.style.transform = 'translateX(0%)';
				}
			}else{
				this.setComplete(false);
				this.progressBar.style.transform = 'translateX('+((!val[0] && val[1] ? 1 : val[0]) * 100 - 100) + '%)';
			}
			setTimeout(function(){
				this.progressBar.style.transition = '';
			}.bind(this), 50);
		},
		onProgressChange: function (aBrowser, webProgress, request, curSelfProgress, maxSelfProgress, curTotalProgress, maxTotalProgress) {
			var val = (curTotalProgress - 1) / (maxTotalProgress - 1);
			if (!/^((ht|f)tps?\:|about:blank)/.test((aBrowser.registeredOpenURI || {asciiSpec: 'about:blank'}).asciiSpec)){
				return this.progress.set(aBrowser, [val, false]);
			}
			this.progress.set(aBrowser, [val, false]);
			if (this.progressBar && gBrowser.selectedBrowser === aBrowser) {
				this.setConnecting(false);

				if (val > 0.95) {
					this.progressBar.style.transform = 'translateX(0%)';
				}else{
					this.progressBar.style.transform = 'translateX('+((val * 100) - 100) + '%)';
				}
			}
		},
		onStateChange: function (aBrowser, aWebProgress, aRequest, aStateFlags, aStatus) {
			var val = this.progress.get(aBrowser),
				isCBrowser = gBrowser.selectedBrowser === aBrowser;
			if(!val){
				val = [0, false];
				this.progress.set(aBrowser, val);
			}

			if (aStateFlags & 1 && aStateFlags & 262144){
				if (!(aStateFlags & 16777216)){
					val = [0, /^((ht|f)tps?\:|about:blank)/.test((aBrowser.registeredOpenURI || {asciiSpec: 'about:blank'}).asciiSpec)];
					if(isCBrowser) {
						this.progressBar.style.transform = 'translateX(0%)';
						val[1] && this.setComplete(false);
						this.setConnecting(val[1]);
					}
					this.progress.set(aBrowser, val);
				}
			}else if(aStateFlags & 16){
				if(isCBrowser) {
					this.timer(function(){
						this.progress.get(aBrowser)[0] == 1 && this.setComplete(true);
					}.bind(this), 1000);
					this.setConnecting(false);
				}
				this.progress.set(aBrowser, [1, false]);
			}
		},
		timer: function (callback, delay) {
			delay = delay || 0;
			var stopTimer = function (){
				if (this._timer == null) return;
				clearTimeout(this._timer);
				this._timer = null;
			}.bind(this);
			this._timer = setTimeout(function(){
				stopTimer();
				callback();
			}, delay);

		}
	};
	loadingBar.init();
})();