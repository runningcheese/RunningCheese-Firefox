location == "chrome://browser/content/browser.xul" && (function () {
	var separator = document.getElementById("placesContext_openSeparator");
	var repBM = document.createElement('menuitem');
	separator.parentNode.insertBefore(repBM, separator);
	repBM.id = "placesContext_replaceURL";
	repBM.setAttribute("label", "更新为当前书签");
	repBM.setAttribute("accesskey", "U");
	repBM.addEventListener("command", function () {
		var itemId = document.popupNode._placesNode.itemId;
		PlacesUtils.bookmarks.changeBookmarkURI(itemId, gBrowser.currentURI);  // Adresse aktualisieren
		PlacesUtils.bookmarks.setItemTitle(itemId, gBrowser.contentTitle);     // Titel aktualisieren
	}, false);
	var obs = document.createElement("observes");
	obs.setAttribute("element", "placesContext_open");
	obs.setAttribute("attribute", "hidden");
	repBM.appendChild(obs);
})();
