(function() {
  if (location != 'chrome://browser/content/browser.xul')
    return;
  if (CustomizableUI.getPlacementOfWidget('addons-update-button'))
    return;

  try {
    CustomizableUI.createWidget({
      id: 'addons-update-button',
      defaultArea: CustomizableUI.AREA_NAVBAR,
      label: 'Add-ons Update',
      tooltiptext: 'Add-ons Update',
      onCommand: onCommand,
      onCreated: function(button) {
        button.style.listStyleImage = 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAIAAACQkWg2AAAACXBIWXMAAA7EAAAOxAGVKw4bAAAAdUlEQVQokZVSwRHAIAgLPYfoXs7RCTpG53Avt7APrhaFU8gLMEEJAkEQgFbc7IxkVjt0r6Sp7VIVITumBpKt00FA2ThmjXzkfMMWO8EZFSj8LrUyjsG9b9DaJXq+qAIVxEUxtLHpaXE95dj1NcK2rmbwaGJ4Af0tIg00j/6iAAAAAElFTkSuQmCC)';
      }
    });
  } catch(e) {
    return;
  };

  function onCommand(event) {
    let frameScript = function() {
      addEventListener('pageshow', function onPageshow(event) {
        if (event.target.location != 'about:addons')
          return;
        content.gViewController.doCommand('cmd_findAllUpdates');
        content.gViewController.doCommand('cmd_goToAvailableUpdates');
        removeEventListener('pageshow', onPageshow);
      });
    };
    let frameScriptURI = 'data:,(' + frameScript.toString() + ')()';
    let window = event.target.ownerGlobal;
    window.openUILinkIn('about:addons', 'tab');
    window.gBrowser.selectedBrowser.messageManager.loadFrameScript(frameScriptURI, true);
  };

})();
