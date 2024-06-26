"use strict";

/* *******************************************************
 * 파일이름 : common.js
 * 설명 : custom js
 * 최종업데이트 : 2024-03-04
 ******************************************************** */

// 공통JS
var common = (function () {
  return {
    init: function () {
      // if (document.getElementById("sideMenu")) {
      //   common.sideMenu();
      // }
    },
  };
})();

// 컴포넌트1
// const keyFilter = {
//   init: () => {},
//   exec: () => {},
// };

window.addEventListener("DOMContentLoaded", function () {
  common.init();
  // keyFilter.exec();
});
