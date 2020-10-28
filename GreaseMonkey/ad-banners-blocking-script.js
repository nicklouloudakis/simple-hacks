// ==UserScript==
// @name     Ad banners blocking script
// @version  1.0.0
// @include  /^https:\/\/www.[^\.]*.gr/*/
// @grant    none
// ==/UserScript==

// Disclaimer: No guarantees are provided with the script.
// The purpose of it usage is for legal and fair purposes only.
// The author is not responsible for any unfair of malicious usage.
// Use at your own risk.

'use strict';


var classes = ["fc-ab-root"];
var ids = ['google_ads_iframe'];

var postDeletionAction = function () {
  document.body.removeAttribute("style");
}


// Mutate objects so that in case an ad-blocking removal banner is found,
// you remove it.
var adDeletionObserver = new MutationObserver(
  function (mutations) {
    mutations.forEach(
      function (mutation) {
        mutation.addedNodes.forEach(
          // Check if node class or id contains any of the ones
          // eligible for deletion.
          function(node) {

            var anyClassFound = classes.some(function (element) {
              return node.className.indexOf(element) !== -1;
            });
            var anyIdFound = ids.some(function(element) {
              return node.id.indexOf(element) !== -1;
            });
            
            if(anyClassFound || anyIdFound) {
              // Remove node, in relation to its parent.
              node.parentNode.removeChild(node);
              console.log("Node Removed:");
              console.log(node);
              postDeletionAction(node);
            }
          }
        );
      }
    );
  }
);

// Monitor body for changes.
var container = document.querySelector('body');

adDeletionObserver.observe(container, {
  childList: true,
  subtree: true
});
