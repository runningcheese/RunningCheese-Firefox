//   WebDeveloperToolbarButton.uc.js

(function() {
   if (location != 'chrome://browser/content/browser.xul')
      return;

   try {
      CustomizableUI.createWidget({
         id: 'Webdeveloper-button',
         type: 'custom',
         defaultArea: CustomizableUI.AREA_NAVBAR,
         onBuild: function(aDocument) {
            var button = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
            var attributes = {
               id: 'Webdeveloper-button',
               class: 'toolbarbutton-1 chromeclass-toolbar-additional',
               type: 'menu',
               removable: 'true',
               label: 'Web Entwickler',
               tooltiptext: 'Web Entwickler',
               style: 'list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8%2F9hAAACy0lEQVR4nI2TW0zTZxTAf9%2B%2FfwptXbQtWoTSUimoCNWqmBiWxkWZqAkajfEaNTHbi4%2Fqgw%2FGhy1zEqMxLFPjZYkmi4Qt8TI0miiRGAteEBCEtlBuKtTSpgLFDYRvD6vGGYmel3OSc37nnJyL4Askx5aZYbfbjtrt9hJFmdD29Dz%2FPRQK721o9Q1qPgfPzrIVbNm2OfBT2Q%2F5GRnmFJdrbpJxmmGhz9fu7H0Zqvxs9aLCBVWhvi559c%2FfZNXlC%2FJE2UG5YE7uL%2B%2F86mSgLT0jVb4dXTcrJ2d1%2BFU%2Fba0tuN1ublTdJNjZ89SdN2dXik63QnwKds1zH9q%2BYcUhxwydkEYHjU116LTJuOYX0OHvZFQm43Raqb5d0%2F%2B%2FDuzWWTtKiouO79vpMTm0AeIDz3kY1dDSHCA720qttw6r3UFWmoVARxcNT5ouvu%2BgYN78Kwf2rCvdUpxOuKmaoL%2Bb%2Fp4%2BDDNyuTecicaSz1c6DaqqASG4dfWvwaC%2FzSIA1q9Zdevw90uKs6f28rDWz9DrEUbHFQZCESLDWrK%2B2UQ83UMs1EUsGqau5s5wdzC4uDnQ4RMrl3nKftzo3G8W3Vy43sa16hfsKHWRPB5hZEzB5Colrrdw7mLF%2BTfDg4fVJFUoQtPe6G%2BXAOrSLP139bdrMKZNYXBM3%2FcszrR4cppOGYpisBcybnLyx6XKR%2FXNLbs%2FNXD1TTQ00RoRmJIMFOWOTlfGrCLVIFFsa8GST0XFpYZq7%2F3CydathuJCzjRa8MWmoJoz1aUlZlLzltMZE5wtPxK4V1frngwGYLnn61%2FP%2F3xQnik%2FKR887ZXRf6Q8Vn5a5joclSmqJiURJgA9oHzMC4C5efl3F7oXeUypZh4%2F8HLf6z0BnErEGBNaD0SAfiAODL1PkHBuBb4FBoBmYAR4BWgS9lsgBrwGwokkfHjKAtACSfz3IxIYA%2F4GJiYbwb9UlwQVHCL1dwAAAABJRU5ErkJggg%3D%3D)'
            };
            for (var a in attributes) {
               button.setAttribute(a, attributes[a]);
            };
            return button;
         }
      });
   } catch(e) { };

   setTimeout(function() {
      if (document.getElementById('menuWebDeveloperPopup').childElementCount <= 5) {
         // s. DevToolsStartup.prototype.initDevTools
         // https://dxr.mozilla.org/mozilla-central/source/devtools/shim/devtools-startup.js
         let { require } = Cu.import("resource://devtools/shared/Loader.jsm", {});
         require("devtools/client/framework/devtools-browser");
      };
      var button = document.getElementById('Webdeveloper-button');
      var dblMenuPopup = document.getElementById('menuWebDeveloperPopup').cloneNode(true);
      button.appendChild(dblMenuPopup);
      var elements = button.getElementsByTagName('*');
      for (let elem of elements) {
         let origId = elem.id;
         if (origId) {
            elem.id = 'WebDevButton-' + origId;
            if (elem.tagName == 'menuitem') {
               elem.setAttribute('oncommand', 'document.getElementById("' + origId + '").click();');
               let obs = document.createElement('observes');
               obs.setAttribute('element', origId);
               obs.setAttribute('attribute', 'checked');
               elem.appendChild(obs);
            };
         };
      };
   }, 100);

}());

