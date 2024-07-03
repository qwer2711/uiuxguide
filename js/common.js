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
      if (document.getElementById("sideMenu")) {
        common.sideMenu();
        common.calender();
        common.disclosure();
        common.tab();
      }
    },
    sideMenu: function () {
      const accordionHeaders = document.querySelectorAll(".side-nav-header");
      const subAccordionHeaders = document.querySelectorAll(
        ".sub-side-nav-header"
      );

      accordionHeaders.forEach((header) => {
        header.addEventListener("click", function () {
          const accordionItem = this.parentNode;
          const content = accordionItem.querySelector(".side-nav-content");

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
            ".sub-side-nav-content"
          );
          const closest = subAccordionItem.closest(".side-nav-content");
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
          const content = accordionItem.querySelector(".side-nav-content");
          accordionItem.classList.remove("open");
          content.style.maxHeight = "0";
        });

        closeAllSubAccordions();
      }

      function closeAllSubAccordions() {
        subAccordionHeaders.forEach((header) => {
          const subAccordionItem = header.parentNode;
          const content = subAccordionItem.querySelector(
            ".sub-side-nav-content"
          );
          subAccordionItem.classList.remove("open");
          content.style.maxHeight = "0";
        });
      }
    },
    calender: function () {
      var srcCalendarEl = document.getElementById("source-calendar");

      var srcCalendar = new FullCalendar.Calendar(srcCalendarEl, {
        editable: false,
        headerToolbar: {
          left: "prev,next today",
          center: "title",
          // right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          right: "",
        },
        locale: "ko",
        titleFormat: {
          month: "long",
          year: "numeric",
          day: "numeric",
          weekday: "long",
        },
        fixedWeekCount: false,
        allDaySlot: false,
        dayCellContent: function (info) {
          var number = document.createElement("a");
          number.innerHTML = info.dayNumberText.replace("일", "");
          if (info.view.type === "dayGridMonth") {
            return { html: number.outerHTML };
          }
          return {
            domNodes: [],
          };
        },
        titleFormat: function (date) {
          // title 설정
          return date.date.year + "년 " + (date.date.month + 1) + "월";
        },
        events: [],
        eventLeave: function (info) {
          console.log("event left!", info.event);
        },
      });

      srcCalendar.render();
    },
    disclosure: function () {
      let disclosureBtn = document.querySelector(".conts-expand-area");
      disclosureBtn.addEventListener("click", disclosureBtnRotate);
      function disclosureBtnRotate(e) {
        e.target.parentNode.classList.toggle("active");
      }
    },
    tab: function () {
      /* layer tab */
      function layerTab() {
        const layerTabArea = document.querySelectorAll(".tab-area.layer");

        /* 탭 접근성 텍스트 세팅 */
        const tabAccText = document.createTextNode(" 선택됨");
        const tabAccTag = document.createElement("i");
        tabAccTag.setAttribute("class", "sr-only created");
        tabAccTag.appendChild(tabAccText);

        layerTabArea.forEach((e) => {
          const layerTabEle = e.querySelectorAll(".tab > ul > li");
          const tabPanel = e.querySelectorAll(".tab-conts");

          function tab() {
            layerTabEle.forEach((ele) => {
              const control = ele.getAttribute("aria-controls");
              const selectedTabPanel = document.getElementById(control);

              if (ele.classList.contains("active")) {
                //선택됨 텍스트 추가
                ele.querySelector("button").append(tabAccTag);
              }

              ele.addEventListener("click", () => {
                layerTabInitial(); //레이어탭 초기화

                ele.classList.add("active");
                ele.querySelector("button").append(tabAccTag); //선택됨 텍스트 추가
                ele.setAttribute("aria-selected", "true");
                selectedTabPanel.classList.add("active");
              });
            });
          }

          //레이어탭 초기화
          function layerTabInitial() {
            layerTabEle.forEach((ele) => {
              ele.classList.remove("active");
              ele.setAttribute("aria-selected", "false");
              //ele.removeAttribute('style');
              if (ele.classList.contains("active")) {
                const text = ele.querySelector(".sr-only.created");
                ele.querySelector("button").removeChild(text);
              }
            });
            tabPanel.forEach((ele) => {
              ele.classList.remove("active");
              //ele.removeAttribute('style');
            });
          }
          tab();
        });
      }
      layerTab();
    },
  };
})();

/*** * modal * ***/
const $modalTrigger = document.querySelectorAll(".open-modal");
const $modalCloseTrigger = document.querySelectorAll(".close-modal");
const $kds_body = document.querySelector("body");
const kds_modal = {
  init: () => {
    kds_modal.open();
    kds_modal.close();
  },
  open: () => {
    $modalTrigger.forEach((e) => {
      e.addEventListener("click", (ele) => {
        const id = e.getAttribute("data-target");

        e.classList.add("modal-opened");
        e.setAttribute("tabindex", "-1");

        kds_modal.modalOpen(id);
        ele.preventDefault();
      });
    });
  },
  modalOpen: (id) => {
    const $idVal = document.getElementById(id);
    const $dialog = $idVal.querySelector(".modal-content");
    const $modalBack = $idVal.querySelector(".modal-back");
    const $modalOpened = document.querySelectorAll(".modal.in");
    const $modalOpenedLen = $modalOpened.length + 1;
    $kds_body.classList.add("scroll-no");
    $idVal.setAttribute("aria-hidden", "false");
    $modalBack.classList.add("in");
    $idVal.classList.add("shown");

    setTimeout(() => {
      $idVal.classList.add("in");
    }, 150);

    //열린 팝업창 포커스
    $dialog.setAttribute("tabindex", "0");

    //모달 여러개 열린경우 마지막 열린 모달 z-index높게
    if ($modalOpenedLen > 1) {
      const openedLen = $modalOpenedLen;
      const zIndexNew = 1010 + openedLen;
      $idVal.setAttribute("style", "z-index: " + zIndexNew);
    }

    //레이어 진입 시 포커스
    setTimeout(() => {
      $dialog.focus();
    }, 350);
  },
  close: () => {
    $modalCloseTrigger.forEach((e) => {
      e.addEventListener("click", (ele) => {
        const id = e.closest(".modal").getAttribute("id");
        kds_modal.modalClose(id);
      });

      e.addEventListener("keydown", (ele) => {
        //닫기버튼에서 탭 키 누르면 모달 내 첫번쨰 포커스로 키보드 이동
        if (e.classList.contains("btn-close")) {
          const keyCode = ele.keyCode || ele.which;
          if (!ele.shiftKey && keyCode == 9) {
            e.closest(".modal-content").focus(); // 첫번째 링크로 이동
            ele.preventDefault();
          }
        }
      });
    });
  },
  modalClose: (id) => {
    const $idVal = document.getElementById(id);
    const $dialog = $idVal.querySelector(".modal-content");
    const $modalOpened = document.querySelectorAll(".modal.in:not(.sample)");
    const $modalOpenedLen = $modalOpened.length;
    if ($modalOpenedLen < 2) {
      $kds_body.classList.remove("scroll-no");
    }

    $idVal.setAttribute("aria-hidden", "true");
    $idVal.classList.remove("in");

    $dialog.removeAttribute("tabindex");

    setTimeout(() => {
      $idVal.classList.remove("shown");
    }, 150);

    //모달 창 연 버튼에 class 삭제 및 tabindex 0로 조정 (포커스 영역 수정)
    const $triggerBtn = document.querySelector(".modal-opened");
    if ($triggerBtn != null) {
      // $triggerBtn.focus();
      $triggerBtn.setAttribute("tabindex", "0");
      $triggerBtn.classList.remove("modal-opened");
    }
  },
};

/*** * accordion * ***/
const $accordionBtn = document.querySelectorAll(".btn-accordion");
const kds_accordion = {
  init: () => {
    kds_accordion.expand();
  },
  expand: () => {
    $accordionBtn.forEach((e) => {
      const $wrapper = e.closest(".accordion");
      const $wrapAll = $wrapper.querySelectorAll(".accordion-item");
      const $wrap = e.closest(".accordion-item");

      e.addEventListener("click", () => {
        if (!$wrap.classList.contains("active")) {
          $wrapAll.forEach((ele) => {
            ele.classList.remove("active");
            ele.querySelector(".btn-accordion").classList.remove("active");
          });

          $wrap.classList.add("active");
          e.classList.add("active");
        } else {
          $wrap.classList.remove("active");
          e.classList.remove("active");
        }
      });
    });
  },
};

/*** * swiper * ***/
const kds_swiper = {
  init: () => {
    kds_swiper.swiperList();
  },
  swiperList: () => {
    //풀 배너
    const Swiper1 = new Swiper(".swiper-1 .swiper", {
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 400,
      loop: true,
      navigation: {
        nextEl: ".swiper-1 .swiper .swiper-button-next",
        prevEl: ".swiper-1 .swiper .swiper-button-prev",
      },
      pagination: {
        el: ".swiper-1 .swiper .swiper-pagination",
      },
    });

    //요소 배너
    const swiper2 = new Swiper(".swiper-2 .swiper", {
      slidesPerView: 1,
      spaceBetween: 16,
      speed: 400,
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      navigation: {
        nextEl: ".swiper-2 .swiper .swiper-button-next",
        prevEl: ".swiper-2 .swiper .swiper-button-prev",
      },
      pagination: {
        el: ".swiper-2 .swiper .swiper-pagination",
        type: "fraction",
      },
    });

    const $eleBanSwiperPlay = document.querySelector(
      ".swiper-2 .swiper .swiper-button-play"
    );
    const $eleBanSwiperStop = document.querySelector(
      ".swiper-2 .swiper .swiper-button-stop"
    );

    if ($eleBanSwiperPlay != null) {
      $eleBanSwiperPlay.style.display = "none";

      $eleBanSwiperPlay.addEventListener("click", () => {
        swiper2.autoplay.start();
        $eleBanSwiperStop.style.display = "";
        $eleBanSwiperPlay.style.display = "none";
      });
    }

    if ($eleBanSwiperStop != null) {
      $eleBanSwiperStop.addEventListener("click", () => {
        swiper2.autoplay.stop();
        $eleBanSwiperStop.style.display = "none";
        $eleBanSwiperPlay.style.display = "";
      });
    }
  },
};

window.addEventListener("DOMContentLoaded", function () {
  common.init();
  kds_modal.init();
  kds_accordion.init();
  kds_swiper.init();
});
