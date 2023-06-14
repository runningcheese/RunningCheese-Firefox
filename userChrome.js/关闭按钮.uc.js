    // ==UserScript==
    // @charset        UTF-8
    // @description    定义浏览器关闭按钮,中键为重启浏览器,右键为退出浏览器。并定义浏览器最大化按钮右键为新建窗口
    // @version        2017.03.08 222222
    // ==/UserScript==
    document.getElementById('titlebar-close').setAttribute("tooltiptext"," 中键：重启  右键：退出浏览器");
    document.getElementById('titlebar-close').onclick=function (event) {
      switch (event.button) {
          case 1:
                  Services.startup.quit(Services.startup.eRestart | Services.startup.eAttemptQuit);// 中键：重启
                  break;
          case 2:
                 goQuitApplication()// 右键：退出浏览器
                  break;
          default:
                  break;
      }
    };

    //最大化按钮右键定义为新建窗口
    document.getElementById('titlebar-max').setAttribute("tooltiptext"," 右键：新建窗口");
    document.getElementById('titlebar-max').onclick=function (event) {
      switch (event.button) {
        case 2:
                OpenBrowserWindow({private: false});
                break;
        default:
                break;
      }
    };
