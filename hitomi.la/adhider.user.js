// ==UserScript==
// @name         Hitomi.la Ad Hider
// @namespace    https://github.com/
// @version      1.0.1
// @description  Hide ads on Hitomi.la
// @author       izuvolga
// @match        https://hitomi.la/*
// @grant        none
// @downloadURL  https://raw.githubusercontent.com/izuvolga/monkey/main/hitomi.la/adhider.user.js
// @updateURL    https://raw.githubusercontent.com/izuvolga/monkey/main/hitomi.la/adhider.user.js
// ==/UserScript==

(function () {
  "use strict";

  const DEBUG = false;

  function log(...args) {
    if (DEBUG) {
      console.log(...args);
    }
  }

  function checkForAdsAndHide() {
    // Hide first child element of class="top-content"
    // i.e
    //   <div class="top-content">
    //     <div class="aaa"></div> <!-- this is the ad -->
    //     <div class="bbb"></div>
    //   </div>
    const topContent = document.querySelector(".top-content");
    if (topContent && topContent.firstElementChild) {
      topContent.firstElementChild.style.display = "none";
      log("First child of .top-content hidden:", topContent.firstElementChild);
    }
    // Hide first child element of class="content"
    const content = document.querySelector(".content");
    if (content && content.firstElementChild) {
      content.firstElementChild.style.display = "none";
      log("First child of .content hidden:", content.firstElementChild);
    }
  }

  function setupObserver() {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.addedNodes.length > 0) {
          checkForAdsAndHide();
        }
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  // Run once at start and then set up DOM observer
  checkForAdsAndHide();
  setupObserver();
})();
