// ==UserScript==
// @name            MCPasteAndGo.uc.js
// @description     Inhalt der Zwischenablage mit einem Mittelklick oder Umschalttaste + Linksklick 
// @description2    in eine Suchleiste einfügen, Suche startet automatisch.
// @version         2.0
// @author          y2k
// @contributor	    aborix
// @namespace       http://tabunfirefox.web.fc2.com/
// @note            Mittelklick oder Umschalttaste + Linksklick
// @note            Anpassung für Firefox 54 und e10s Kompatibilität
// ==/UserScript==

(function() {

  // in a not-main chrome window these may be undefined
  const {classes: Cc, interfaces: Ci, utils: Cu} = Components;
  if (!window.Services) {
    Cu.import("resource://gre/modules/Services.jsm");
  };

  function LOG(text) { Services.console.logStringMessage("[MCPasteAndGo] " + text); }

  var PasteOnlyHtmlID = {
  //  "id": "url",
  //  "id": [ "url1", "url2", "url3" ],
  //  "lst-ib": "http://www.google.de/",
  };

  var PasteOnlyXulID = {
  //  browserHomePage: true,
  };

  var TagAction = {

    input: {
      paste: function(target, text) {
        target.value = text;
      },
      go: function(target) {
        var url = target.ownerDocument.defaultView.location.href;
        var list = PasteOnlyHtmlID[target.id];
        if (list) {
          list = (list instanceof Array) ? list : [ list ];
          for (var i = 0, l = list.length; i < l; i++) {
            if (url.indexOf(list[i]) >= 0) {
              return;
            }
          }
        }
        if (target.form) {
          target.form.submit();
        }
        else {
          var event = document.createEvent("KeyboardEvent");
          event.initKeyEvent("keydown", true, true, null, false, false, false, false, 13, 0);
          target.dispatchEvent(event);
        }
      },
    },

    textarea: {
      paste: function(target, text) {
        target.focus();
        var value = target.value;
        var pos = target.selectionStart;
        var newpos = pos + text.length;
        target.value = [ value.substr(0, pos), text, value.substr(pos) ].join("");
        target.setSelectionRange(newpos, newpos);
      },
      go: function() {
        // paste only
      },
    },

    textbox: {
      paste: function(target, text) {
        target.value = text;
      },
      go: function(target) {
        if (PasteOnlyXulID[target.id]) {
          return;
        };
        if (target.id == "urlbar") {
          document.getElementById("urlbar-go-button").click();
        }
        else {
          var event = document.createEvent("KeyboardEvent");
          event.initKeyEvent("keypress", true, true, null, false, false, false, false, 13, 0);
          target.dispatchEvent(event);
        }
      },
    },

    searchbar: {
      paste: function(target, text) {
        if (target._textbox) {
          target._textbox.value = text;
        }
      },
      go: function(target) {
        if (target.handleSearchCommand) {
          document.getAnonymousElementByAttribute(target, "anonid", "search-go-button").click();
        }
      },
    },

    findbar: {
      paste: function(target, text) {
        if (target._findField) {
          target._findField.value = text;
        }
      },
      go: function(target) {
        if (target.onFindAgainCommand) {
          target.onFindAgainCommand(false);
        }
      },
    },

  };

  function checkEvent(e) {
    return (e.button == 1) || ((e.button == 0) && e.shiftKey);
  };

  function getClipboardText() {
    var text = "";
    var clip = Cc["@mozilla.org/widget/clipboard;1"].getService(Ci.nsIClipboard);
    var trans = Cc["@mozilla.org/widget/transferable;1"].createInstance(Ci.nsITransferable);
    if (clip && trans) {
      var str = new Object();
      var strLength = new Object();
      trans.addDataFlavor("text/unicode");
      clip.getData(trans, clip.kGlobalClipboard);
      trans.getTransferData("text/unicode", str, strLength);
      if (str) {
        str = str.value.QueryInterface(Ci.nsISupportsString);
        text = str.data.substring(0, strLength.value / 2);
      }
    }
    return text;
  };

  function onClick(e) {
    if (!checkEvent(e))
      return;
    var target = e.target;
    if (target.ownerDocument.defaultView.top != window) {
      // click in content and not e10s
      return;
    };
    if (target.tagName == 'tabbrowser') {
      var node = e.originalTarget;
      if (node.tagName.endsWith('browser')) {
        // click in content and e10s
        return;
      } else {
        node = node.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode;
        if (node.tagName == 'findbar') {
          target = node;
        }
      }
    };
//  LOG([ "tag: ", target.tagName, " id: ", target.id, " class: ", target.className ].join(""));
    var text = getClipboardText();
    var action = TagAction[target.tagName];
    if (text && action) {
      action.paste(target, text);
      action.go(target);
    };
  };

  window.addEventListener("click", onClick, true);

  // if this is not a main window, we're done.
  if (location != 'chrome://browser/content/browser.xul')
    return;

  // this is a main window, so we handle the content with a frame script.

  var frameScript = function() {

    const {classes: Cc, interfaces: Ci} = Components;
    function LOG(text) { Services.console.logStringMessage("[MCPasteAndGo] " + text); }

    var PasteOnlyHtmlID = {
    /*  "id": "url",
        "id": [ "url1", "url2", "url3" ],
        "lst-ib": "http://www.google.de/",  */
    };

    var PasteOnlyXulID = {
    /*  browserHomePage: true,  */
    };

    var TagAction = {

      INPUT: {
        paste: function(target, text) {
          target.value = text;
        },
        go: function(target) {
          var url = target.ownerDocument.defaultView.location.href;
          var list = PasteOnlyHtmlID[target.id];
          if (list) {
            list = (list instanceof Array) ? list : [ list ];
            for (var i = 0, l = list.length; i < l; i++) {
              if (url.indexOf(list[i]) >= 0) {
                return;
              }
            }
          };
          if (target.baseURI == 'about:home') {
            content.document.getElementById('searchSubmit').click();
          }
          else if (target.form) {
            target.form.submit();
          }
          else {
            var event = content.document.createEvent("KeyboardEvent");
            event.initKeyEvent("keydown", true, true, null, false, false, false, false, 13, 0);
            target.dispatchEvent(event);
          }
        },
      },

      TEXTAREA: {
        paste: function(target, text) {
          target.focus();
          var value = target.value;
          var pos = target.selectionStart;
          var newpos = pos + text.length;
          target.value = [ value.substr(0, pos), text, value.substr(pos) ].join("");
          target.setSelectionRange(newpos, newpos);
        },
        go: function() {
        /* paste only */
        },
      },

      TEXTBOX: {
        paste: function(target, text) {
          target.value = text;
        },
        go: function(target) {
          if (PasteOnlyXulID[target.id]) {
            return;
          };
          var event = content.document.createEvent("KeyboardEvent");
          event.initKeyEvent("keypress", true, true, null, false, false, false, false, 13, 0);
          target.dispatchEvent(event);
        },
      },

    };

    function checkEvent(e) {
      return (e.button == 1) || ((e.button == 0) && e.shiftKey);
    };

    function getClipboardText() {
      var text = "";
      var clip = Cc["@mozilla.org/widget/clipboard;1"].getService(Ci.nsIClipboard);
      var trans = Cc["@mozilla.org/widget/transferable;1"].createInstance(Ci.nsITransferable);
      if (clip && trans) {
        var str = new Object();
        var strLength = new Object();
        trans.addDataFlavor("text/unicode");
        clip.getData(trans, clip.kGlobalClipboard);
        trans.getTransferData("text/unicode", str, strLength);
        if (str) {
          str = str.value.QueryInterface(Ci.nsISupportsString);
          text = str.data.substring(0, strLength.value / 2);
        }
      }
      return text;
    };

    function onClick(e) {
      if (!checkEvent(e))
        return;
      var target = e.target;
/*    LOG([ "tag: ", target.tagName, " id: ", target.id, " class: ", target.className ].join(""));  */
      var text = getClipboardText();
      var action = TagAction[target.tagName.toUpperCase()];
      if (text && action) {
        action.paste(target, text);
        action.go(target);
      };
    };

    addEventListener("click", onClick, true);

  };

  var frameScriptURI = 'data:,(' + frameScript.toString() + ')()';

  window.messageManager.loadFrameScript(frameScriptURI, true);

})();

