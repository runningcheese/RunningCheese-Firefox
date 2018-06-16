  
  //  preferences-button.uc.js
  
  (function() {

       if (location != 'chrome://browser/content/browser.xul') return;
	    
       try {
          CustomizableUI.createWidget({
             id: 'Einstellungen-button',
             type: 'custom',
             defaultArea: CustomizableUI.AREA_NAVBAR,
             onBuild: function(aDocument) {         
                var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
                var props = {
                   id: 'Einstellungen-button',
                   class: 'toolbarbutton-1 chromeclass-toolbar-additional',
                   removable: true,
                   label: 'Einstellungen-button',
				   accesskey: 'e',
                   tooltiptext: 'Einstellungen-button',
                   style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADy0lEQVR4nAXBa0wbBQAH8P/d9XG9lrtrGV17pa6VjIbXBgwG6DoX/cJcYmZIXIwa5wcyNEajkanRJX7SxSzxi36Z02mEKZosI0zY3DLcmgwQhG1uhayjQIE+dtCVlj7u1fP3Iz74KYqyKgO6hnhaprxOWptfK+1jTISTptSbLo4oUBQJkiCgazLUYg7JyD3w2jJu3LgGUlI0SLKCucX8ie4OIfpfJP92+27HD1/1No1ui7GXDEQZRqIMiiyDAGA0kGB5FmYrD5a1geg7G8F0eIPNKaR46Yt2kw4COoCSCvz9z1IsmtSX0o/Xput8Ff2qIoPQClAySdh0EUo+DcrV3ktLcvlM936h1lfNWX4PJbUzfzyUF0QYDjQLXKCm0rcQjlZvi9Hv7Q5eMeoyzIQEh5UCW2EBGYvnjnYf2tV3qKPaHknIGDzdf8S0+Gt1KjQw9vP4Y2RloMpKVh1t526t3x/fqyklQC0BugaKMoBEcU3+8tyk+NfdNCRQ2NV0QH+uhjh79dy7h3cSBWzmgarWZy3TG7tb5a34i7Hw7R2J5fAe6GUQBEAFj52cfxIrrO8P1vaYaRNoXjiy9Gi1OaPwRIn1QCJNWEip4LIr+PjE4RcCT1e/VxeoOf7n5cujPp8vRaqqgkzZ/ObDRBHj99IwVTodda+8T67wjdCYCiyvZhG98HWZydxEqSTB5XLRW1tbhnD4gaCqKihP+6vQMvm5f69esG1GHmwqzgY/Y2Mwez+FrKxD1Skkb51/zUBk45pS6vD7/QiFQqssx39k53mN8u47hh0ORWyse+oSmxiuXdNbD26sp9G/N4a704u5xSvfvvN8sHawsaVzdP7O5MttbW0uv99vVxXleCgUukJuZ7OQi3moigTXM2+dst35vPcN7ySaGgR80mM11Xu2y+lUjJ69fT3Q2NhYIcsycrkcrFarIIpi2fBkNQLSYYSNsEGHWd/Jk8Guzj0oFArgeIf5s5Mfnl9ZWfmOZVmz3W6nstksBgYGNmdmZiaam5uXDFx+DmbaCUZxwla2IilJ0sjICIrFItxuN4LBIARBYPL5PHK5HCwWC6ampn5kWfaU1+uVKdZKwVFhhJMzg2MAhmGuDQ788ogkydOiKB4MBAKVmUxGHxoaysiybEkkEvrw8PBvPT09E6qqghAEAS0tLRAEAQxjAU1bQNM0dF3H2NjYN52dnX2hUOg6z/Ovx+PxT41G42xDQ8NFj8ejyrIMwu12o76+HgzDwGg0wmq1guM4UBQFgiAwMTEhkCSpdXV1pXRdBwCUSiUoigJJkvA/ZkG9QWy1G6AAAAAASUVORK5CYII=)',
                   oncommand: "openPreferences();"
				};
				for (var p in props)
					toolbaritem.setAttribute(p, props[p]);
				return toolbaritem;
			}
		});
	} catch(e) { };
   
})();
