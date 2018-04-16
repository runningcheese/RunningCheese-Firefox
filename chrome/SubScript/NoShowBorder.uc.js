
((g) => {
  class TabPlus {
    constructor() {      
      this.RestoreURL();/*点击页面恢复原来URL*/
      this.NoShowBorder();/*浏览器无边框*/           
    }    
    RestoreURL() {
      g.mPanelContainer.addEventListener("click", function (e) {
        document.getElementById("urlbar").handleRevert();
      }, false);
    }
    NoShowBorder() {
        let Fun = updateTitlebarDisplay.toString();
        Fun = Fun.replace('"0,2,2,2"', '"0,0,0,0"');
        (new Function('updateTitlebarDisplay = ' + Fun)());
        document.documentElement.setAttribute("chromemargin", "0,0,0,0");
    }    
  }
  new TabPlus();
})(gBrowser);