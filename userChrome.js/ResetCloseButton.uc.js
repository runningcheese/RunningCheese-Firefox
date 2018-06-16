// ==UserScript==
// @charset        UTF-8
// @description    定义浏览器关闭按钮,中键为重启浏览器,右键为退出浏览器。并定义浏览器最大化按钮右键为新建窗口
// @version        2017.04.08
// @author         AC
// @namespace      http://bbs.kafan.cn/thread-2085202-1-1.html
// ==/UserScript==
document.getElementById('titlebar-close').setAttribute("tooltiptext"," 中键：重启  右键：退出浏览器");
document.getElementById('titlebar-close').command=document.getElementById('titlebar-close').onclick=function (event) {
    switch (event.button) {
      case 0:
            window.minimize();
            break;
      case 1:
            Services.startup.quit(Services.startup.eAttemptQuit | Services.startup.eRestart);// 中键：重启
              break;
      case 2:
            goQuitApplication()// 右键：退出浏览器
              break;
      default:
            break;
    }
};