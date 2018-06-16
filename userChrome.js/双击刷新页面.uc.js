// ==UserScript==
// @name        双击刷新页面
// @namespace   http://userscripts.org/users/useridnumber
// @description document.querySelector("body").addEventListener('dblclick', function(){location.reload();});
// @version     1
// @grant       none
// ==/UserScript==
document.querySelector('body') .addEventListener('dblclick', function () {
    location.reload();
});
