"use strict";

/* *******************************************************
 * 파일이름 : common.js
 * 설명 : custom js
 * 최종업데이트 : 2024-03-04
 ******************************************************** */

var common = (function () {
  return {
    init: function () {
      // if (document.getElementById("sideMenu")) {
      //   common.sideMenu();
      // }
      if (document.querySelectorAll("area-tit")) {
        common.guideListLength();
      }
      if (document.getElementById("searchText")) {
        common.searchText();
      }
    },
    // 서브페이지 사이드메뉴
    // sideMenu: function () {
    //   const accordionHeaders = document.querySelectorAll(".accordion-header");

    //   accordionHeaders.forEach((header) => {
    //     header.addEventListener("click", function () {
    //       const accordionItem = this.parentNode;
    //       const content = accordionItem.querySelector(".accordion-content");

    //       if (!accordionItem.classList.contains("open")) {
    //         closeAllAccordions();
    //         accordionItem.classList.add("open");
    //         // content.style.maxHeight = "100%";
    //         content.style.maxHeight = content.scrollHeight + "px";
    //       } else {
    //         closeAllAccordions();
    //         accordionItem.classList.remove("open");
    //         content.style.maxHeight = "0";
    //       }
    //     });
    //   });

    //   function closeAllAccordions() {
    //     accordionHeaders.forEach((header) => {
    //       const accordionItem = header.parentNode;
    //       const content = accordionItem.querySelector(".accordion-content");
    //       accordionItem.classList.remove("open");
    //       content.style.maxHeight = "0";
    //     });
    //   }
    // },
    // 가이드 개수표시
    guideListLength: function () {
      const styLength = document.querySelectorAll(".sty-guide > li");
      const comLength = document.querySelectorAll(".compo-guide > li");
      const styInputNum = document.querySelector("#styLength");
      const comInputNum = document.querySelector("#comLength");

      const styNum = styLength.length;
      const comNum = comLength.length;

      if (styInputNum) {
        styInputNum.innerText = styNum;
      }

      if (comInputNum) {
        comInputNum.innerText = comNum;
      }
    },
    // 가이드검색창
    searchText: function () {
      const searchTextInput = document.getElementById("searchText");
      if (searchTextInput) {
        searchTextInput.addEventListener("input", common.filter);
      }
    },
    // 가이드검색필터
    filter: function () {
      let search = document.getElementById("searchText").value.trim();
      let listInner = document.querySelectorAll(".compo-guide li");
      let resultsCount1 = 0;

      for (let i = 0; i < listInner.length; i++) {
        let city = listInner[i].getElementsByClassName("tit");
        if (city[0].innerHTML.indexOf(search) != -1) {
          listInner[i].style.display = "block";
          resultsCount1++;
        } else {
          listInner[i].style.display = "none";
        }
      }
      // 검색결과 메시지 표시
      const searchResultsMessage = document.getElementById(
        "searchResultsMessage"
      );
      const comLength = document.querySelector("#comLength");

      if (resultsCount1 === 0) {
        searchResultsMessage.classList.replace("hide", "show");
        comLength.innerText = `0`;
      } else {
        searchResultsMessage.classList.replace("show", "hide");
        comLength.innerText = `${resultsCount1}`;
      }
    },
  };
})();

window.addEventListener("load", function () {
  common.init();
});
