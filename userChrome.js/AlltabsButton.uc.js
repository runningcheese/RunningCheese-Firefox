(function() {

   if (location != 'chrome://browser/content/browser.xul')
      return;

   try {
      CustomizableUI.createWidget({
         id: 'ucjs_alltabs-item',
         type: 'custom',
         defaultArea: CustomizableUI.AREA_NAVBAR,
         onBuild: function(aDocument) {
            var toolbaritem = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbaritem');
            var attrs = {
               id: 'ucjs_alltabs-item',
               class: 'chromeclass-toolbar-additional',
               label: 'alltabs',
               tooltiptext: 'alltabs'
            };
            for (var a in attrs) {
               toolbaritem.setAttribute(a, attrs[a]);
            };
            return toolbaritem;
         }
      });
   } catch(e) { };  

   document.getElementById('ucjs_alltabs-item').appendChild(document.getElementById('alltabs-button'));

})();
