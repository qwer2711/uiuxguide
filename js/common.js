"use strict";

/* *******************************************************
 * 파일이름 : common.js
 * 설명 : custom js
 * 최종업데이트 : 2024-03-04
 ******************************************************** */

var common = (function () {
  return {
    init: function () {
      common.sideMenu();
      common.guideListLength();
      common.searchText();
    },
    // 서브페이지 사이드메뉴
    sideMenu: function () {
      const accordionHeaders = document.querySelectorAll(".accordion-header");
      const subAccordionHeaders = document.querySelectorAll(
        ".sub-accordion-header"
      );

      accordionHeaders.forEach((header) => {
        header.addEventListener("click", function () {
          const accordionItem = this.parentNode;
          const content = accordionItem.querySelector(".accordion-content");

          if (!accordionItem.classList.contains("open")) {
            closeAllAccordions();
            accordionItem.classList.add("open");
            // content.style.maxHeight = "100%";
            content.style.maxHeight = content.scrollHeight + "px";
          } else {
            closeAllAccordions();
            accordionItem.classList.remove("open");
            content.style.maxHeight = "0";
          }
        });
      });

      subAccordionHeaders.forEach((header) => {
        header.addEventListener("click", function () {
          const subAccordionItem = this.parentNode;
          const content = subAccordionItem.querySelector(
            ".sub-accordion-content"
          );
          const closest = subAccordionItem.closest(".accordion-content");
          closest.style.maxHeight = "100%";

          if (!subAccordionItem.classList.contains("open")) {
            closeAllSubAccordions();
            subAccordionItem.classList.add("open");
            content.style.maxHeight = content.scrollHeight + "px";
          } else {
            subAccordionItem.classList.remove("open");
            content.style.maxHeight = "0";
          }
        });
      });

      function closeAllAccordions() {
        accordionHeaders.forEach((header) => {
          const accordionItem = header.parentNode;
          const content = accordionItem.querySelector(".accordion-content");
          accordionItem.classList.remove("open");
          content.style.maxHeight = "0";
        });

        closeAllSubAccordions();
      }

      function closeAllSubAccordions() {
        subAccordionHeaders.forEach((header) => {
          const subAccordionItem = header.parentNode;
          const content = subAccordionItem.querySelector(
            ".sub-accordion-content"
          );
          subAccordionItem.classList.remove("open");
          content.style.maxHeight = "0";
        });
      }
    },
    // 가이드 개수표시
    guideListLength: function () {
      const styLength = document.querySelectorAll(".sty-guide > li");
      const comLength = document.querySelectorAll(".compo-guide > li");
      const styInputNum = document.querySelector("#styLength");
      const comInputNum = document.querySelector("#comLength");

      const styNum = styLength.length;
      const comNum = comLength.length;

      styInputNum.innerText = styNum;
      comInputNum.innerText = comNum;
    },
    // 가이드검색(1)
    searchText: function () {
      document
        .getElementById("searchText")
        .addEventListener("input", common.filter);
    },
    // 가이드검색(2)
    filter: function () {
      let search = document.getElementById("searchText").value;
      let listInner = document.querySelectorAll(".compo-guide li");

      for (let i = 0; i < listInner.length; i++) {
        let city = listInner[i].getElementsByClassName("tit");
        // let country = listInner[i].getElementsByClassName("desc");
        if (
          city[0].innerHTML.indexOf(search) != -1
          // country[0].innerHTML.indexOf(search) != -1
        ) {
          console.log(city[0].innerHTML.indexOf(search));
          listInner[i].style.display = "block";
        } else {
          listInner[i].style.display = "none";
        }
      }
    },
  };
})();

window.addEventListener("load", function () {
  common.init();
});
