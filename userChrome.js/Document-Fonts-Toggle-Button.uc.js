// Start des Quelltextes //
// Toggle Document Fonts
// Umschalten von browser.display.use_document_fonts
// Herkunft der verwendeten Button-Icons (png 24x24px, konvertiert zu base64):
// Icons made by Freepik (www.freepik.com) from www.flaticon.com
// 允许页面选择自己的字体代替您的上述选择

(function() {

if (location != 'chrome://browser/content/browser.xul')
return;

try {
CustomizableUI.createWidget({
id: 'toggle-document-fonts-button',
type: 'custom',
defaultArea: CustomizableUI.AREA_NAVBAR,
onBuild: function(aDocument) {
var button = aDocument.createElementNS('http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul', 'toolbarbutton');
var attributes = {
id: 'toggle-document-fonts-button',
class: 'toolbarbutton-1 chromeclass-toolbar-additional',
removable: 'true',
label: 'Toggle Document Fonts',
tooltiptext: Services.prefs.getIntPref('browser.display.use_document_fonts') ?
'Dokument Fonts sind aktiviert, Klick -> umschalten' : 'Dokument Fonts sind deaktiviert, Klick -> umschalten',
oncommand: '(' + onCommand.toString() + ')()'
};
for (var a in attributes) {
button.setAttribute(a, attributes[a]);
};
function onCommand() {
var isEnabled = !Services.prefs.getIntPref('browser.display.use_document_fonts');
Services.prefs.setIntPref('browser.display.use_document_fonts', isEnabled);
var windows = Services.wm.getEnumerator('navigator:browser');
while (windows.hasMoreElements()) {
let button = windows.getNext().document.getElementById('toggle-document-fonts-button');
if (isEnabled)
button.setAttribute('tooltiptext', 'Dokument Fonts sind aktiviert, Klick -> umschalten')
else
button.setAttribute('tooltiptext', 'Dokument Fonts sind deaktiviert, Klick -> umschalten');
};
};
return button;
}
});
} catch(e) { };

var css =
'#toggle-document-fonts-button[tooltiptext="Dokument Fonts sind aktiviert, Klick -> umschalten"] {list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAulBMVEUAAAAAZv8AbvAAbfAAbfEAbvEAbO8AbfAAbPAAbe8AbfAAbfAAbfAAbfAAbu4Ab/QAbu8AbfAAceMAbfEAbPIAa/IAbe8AbPAAbO8Aa/IAa/EAbfAAbfAAbfEAbfEAbe8AbfAAbfAAaPcAbu8AbPAAbPAAbfAAbfEAbfAAbPAAbfAAbPAAbe8AbPEAbvAAbu8AbfAAbe8AbvEAbe8AbfAAbe8AbfAAbfAAbe8AbfAAbfAAbfAAbfAAAACFwCSYAAAAPHRSTlMABaX5OG1Q32hw4PtG8SwXT8kJwygTYtZxOTfOabFuMfj3IEFTIamh+oTrQtVJeaO+kZDm2HMj6cXwqNGnCrGnAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAAN1wAADdcBQiibeAAAAAd0SU1FB+EMFQ47JyDdX3IAAAClSURBVCjPvdLJDoIwEIDhAhVo61Z3FMQN913ccN7/uayGmFZK4sn/MId+mcMkRQghw7QgDReQlA2fsONKQCSgrJgDUCrnANCKBqpcDF7LQr2BRc0sAKOilgbekX9D282Bjse1wLo9XwtB3wkHMCSjMVZhgnE0hZk/X6iwXAGsN7DdwV6Fw1Fseac4Ol9UCK4CbjHck0fyw4H2N9gpSN/nlWUa4vEJwm1MM3cAV9YAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTctMTItMjFUMTQ6NTk6MzkrMDE6MDAHeHRTAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE3LTEyLTIxVDE0OjU5OjM5KzAxOjAwdiXM7wAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAAASUVORK5CYII=)} ' +
'#toggle-document-fonts-button[tooltiptext="Dokument Fonts sind deaktiviert, Klick -> umschalten"] {list-style-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAQAAABKfvVzAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfhDBUOFCiifnqOAAABFUlEQVQ4y9XSvyvEcRzH8cfp/NqvpAwGp7tCUjox2CTTTYYTHaWUSWb5B5QFMzeRicHGhE4ZuFXqRkrEegaD6+Lue1/f1XP5fD6ven7e7/enT8w3rfZNqKfbjnWBZO0GpEV3Vn5HLdW110PgRQtWTAUJzfiQtWMgukDZvGNd0YQnGdzYdKLzO4qHClsK1sCgRXt/C5f69YAlbVEq8KkMXqMPXce/ENIKYU/RKCzrMxNdiMtYlY8uzLj1Ji2BDtseXSiGCXnjDsXkMKtdynlYhYReo8ZMmkPKtYrr+p5/knMEnj0bcuDMsKyX5kK51u+GuJIR0wrSzYXT2u4evDtCKWiGsqQwktVfK1YNWu0br50auZJXgS+MaDbuMUWDxwAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0xMi0yMVQxNDoyMDo0MCswMTowME0LBtAAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMTItMjFUMTQ6MjA6NDArMDE6MDA8Vr5sAAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAABJRU5ErkJggg==)} ';
var stylesheet = document.createProcessingInstruction('xml-stylesheet', 'type="text/css" href="data:text/css;utf-8,' + encodeURIComponent(css) + '"');
document.insertBefore(stylesheet, document.documentElement);

})();
// Ende des Quelltextes //
