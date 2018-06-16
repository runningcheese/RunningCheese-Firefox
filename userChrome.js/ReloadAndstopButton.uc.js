// ==UserScript==
// @name           reloadAndstopButton
// @include        main
// @compatibility  FF29+
// @version        0.0.4
// ==/UserScript==

location == "chrome://browser/content/browser.xul" && (function(){
	var reloadAndstopButton = {
		anchorBtn: null,
		isBusy: new WeakMap(),
		init: function(){
			try{
				CustomizableUI.createWidget({
					id: "reloadAndstopButton",
					type: "button",
					defaultArea: CustomizableUI.AREA_NAVBAR,
					label: "\u5237\u65B0/\u505C\u6B62",
					tooltiptext: "\u505C\u6B62",
					onCommand: function(event){
						var cl = document.getElementById("reloadAndstopButton").classList;
						if(cl.contains("reloadAndstopButton-stop")){
							BrowserStop();
						}else{
							BrowserReloadOrDuplicate(event);
						}
					}
				});
			}catch(ex){}
			var cssStr = '@-moz-document url("chrome://browser/content/browser.xul"){'
						+'#reloadAndstopButton{'
						+'list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAvUlEQVQ4jZ3TobXCQBCF4U8hKSEKG00HaYEWUgISQx0Y7PO4Z2gAjYvB4NCcg5gRQEKy8Lud3bt3dmaWaWrsCs59ZIYj1qWCBbb4xwmHXF/QTInXOKNFle4VNrhl/CObdJu/xet0X42J63R+F0vhqBj2U+lN0Ym3/sxdFKyU3pOuX2RQiRa/8Ke8Bq2YixcaUYehLjwzF91aDG3uDc/Bs/hgZKRneUmnP4ltxnupD9GImlxEdzrxG5cl4q95AERCI8021Zs8AAAAAElFTkSuQmCC");'
						+ '}'
						+ '#reloadAndstopButton.reloadAndstopButton-stop{'
	          +'list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAATklEQVQ4jWNgoCKQp0StPAMDwxsGBgY7IjTbQdViGAKTwGcIQTX4FBBjAU6FRGvGpoFkzeiGkKWZYgMo8gJFgUhRNFKUkKiSlCnKTGQDAG0CIMl63Nh8AAAAAElFTkSuQmCC");'
						+ '}'
						+'toolbar[brighttext] #reloadAndstopButton{'
						+'list-style-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA1klEQVQ4jaWSIRqDMAyFq5A7Ago7vRtwBa7AEZAYzoHBzs9yhGkMqmpupvC1/WciGBTKtz2X5L3mNYlSEUzTdAXaGG8XQAL0QHVKYIzJgAbovfdP7/1DYg3ksW4VMAAlkEr31DlXA2+g3BU752rpdlnmZQbaWlvsioU0rMVKKWWtLQ7FYr07tBeDDCj95wEHJGf5my8Br7MOZDv9Onk/OwNZcbNO5sAY2sKKdwEGY0wWKnahO1iKpR4+abm6Tpx8XaLE48b6zkO5zETLdjTQzvN8i4p/wQfQpwlHuwLAcAAAAABJRU5ErkJggg==");'
						+ '}'
						+'}';
			var sss = Cc["@mozilla.org/content/style-sheet-service;1"].getService(Ci.nsIStyleSheetService);
			var ios = Cc["@mozilla.org/network/io-service;1"].getService(Ci.nsIIOService);
			sss.loadAndRegisterSheet(ios.newURI("data:text/css;base64," + btoa(cssStr),null, null), sss.USER_SHEET);

			this.updateBtnUI(gBrowser.selectedBrowser.webProgress.isLoadingDocument);

			gBrowser.addTabsProgressListener(this);
			gBrowser.tabContainer.addEventListener("TabSelect", this.tabSelect.bind(this), false);
		},

		onStateChange: function(browser, aWebProgress, aRequest, aStateFlags, aStatus){
			var isBusy = this.isBusy.get(browser) || true,
				isCurrent = CustomizableUI.getWidget("reloadAndstopButton").areaType 
							&& (browser == gBrowser.selectedBrowser);
			if (aStateFlags & 1 && aStateFlags & 262144){
				if (!(aStateFlags & 16777216)){
					isBusy = true;
					isCurrent && this.updateBtnUI(1);
				}
			}else if(aStateFlags & 16){
				if (isBusy) {
					isBusy = false;
					isCurrent && this.updateBtnUI();
				}
			}

			this.isBusy.set(browser, isBusy);
		},

		tabSelect : function(){
			if(CustomizableUI.getWidget("reloadAndstopButton").areaType){
				if(this.anchorBtn)
				this.updateBtnUI(this.isBusy.get(gBrowser.selectedBrowser) || false);
			}
		},

		updateBtnUI: function(add){
			if(CustomizableUI.getWidget("reloadAndstopButton").areaType){
				if(!this.anchorBtn)
					this.anchorBtn = CustomizableUI.getWidget("reloadAndstopButton").instances[0].anchor;
				add ? this.anchorBtn.classList.add("reloadAndstopButton-stop")
					: this.anchorBtn.classList.remove("reloadAndstopButton-stop");
				this.anchorBtn.setAttribute("tooltiptext", add ? "\u505C\u6B62" : "\u5237\u65B0");
			}
		}
	};

	reloadAndstopButton.init();
})();