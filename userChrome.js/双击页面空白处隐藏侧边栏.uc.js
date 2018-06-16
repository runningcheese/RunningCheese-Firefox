
// Ë«»÷Ò³Ãæ¿Õ°×´¦Òþ²Ø²à±ßÀ¸
gBrowser.mPanelContainer.addEventListener("dblclick",
     function(aEvent){
       if (aEvent.ctrlKey) return;
       aEvent.stopPropagation();
       SidebarUI.hide();
     }, false);
