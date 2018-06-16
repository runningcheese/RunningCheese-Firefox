// 左键点击书签菜单不自动关闭
location == "chrome://browser/content/browser.xul" && document.querySelector("#personal-bookmarks").addEventListener("mouseover", function (event) {
    event.originalTarget.classList.contains("bookmark-item") && event.originalTarget.setAttribute('closemenu', "none")
}, true);
