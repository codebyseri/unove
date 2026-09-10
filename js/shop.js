"use strict";

/* ════════════════ 1. 띠배너 닫기 ════════════════ */
document.getElementById("banner-close").addEventListener("click", function () {
  var banner = document.getElementById("top-banner");
  if (banner) {
    banner.style.display = "none";
  }
});

/* ════════════════ 데스크톱 통합 Mega Menu ════════════════ */
var headerDesktop = document.getElementById("header-desktop");
var desktopNav = headerDesktop && headerDesktop.querySelector(".desktop-nav");
var megaMenu = headerDesktop && headerDesktop.querySelector(".mega-menu");
var megaMenuInner = megaMenu && megaMenu.querySelector(".mega-menu-inner");
var megaMenuColumns = megaMenu
  ? megaMenu.querySelectorAll(".mega-menu-column")
  : [];
var primaryMenuLinks = desktopNav
  ? desktopNav.querySelectorAll(".gnb > li > a")
  : [];

function alignMegaMenuColumns() {
  if (!megaMenuInner) return;
  var innerRect = megaMenuInner.getBoundingClientRect();
  primaryMenuLinks.forEach(function (link, index) {
    var column = megaMenuColumns[index];
    if (!column) return;
    var linkRect = link.getBoundingClientRect();
    var centerX = linkRect.left + linkRect.width / 2 - innerRect.left;
    column.style.setProperty("--column-center-x", centerX + "px");
  });
}

function setMegaMenu(open) {
  if (!headerDesktop) return;
  if (open) alignMegaMenuColumns();
  headerDesktop.classList.toggle("is-mega-open", open);
  if (megaMenu) megaMenu.setAttribute("aria-hidden", String(!open));
  primaryMenuLinks.forEach(function (link) {
    link.setAttribute("aria-expanded", String(open));
  });
}

if (megaMenu) megaMenu.setAttribute("aria-hidden", "true");
primaryMenuLinks.forEach(function (link) {
  link.setAttribute("aria-haspopup", "true");
});
if (desktopNav)
  desktopNav.addEventListener("mouseenter", function () {
    setMegaMenu(true);
  });
if (headerDesktop)
  headerDesktop.addEventListener("mouseleave", function () {
    setMegaMenu(false);
  });
if (desktopNav)
  desktopNav.addEventListener("focusin", function () {
    setMegaMenu(true);
  });
if (headerDesktop) {
  headerDesktop.addEventListener("focusout", function (event) {
    if (!headerDesktop.contains(event.relatedTarget)) setMegaMenu(false);
  });
}
window.addEventListener("resize", alignMegaMenuColumns);

/* ════════════════ 2. 대메뉴 카테고리 탭 ════════════════ */
document.querySelectorAll(".cat-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".cat-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

/* ════════════════ 3. 데스크톱 서브필터 ════════════════ */
document.querySelectorAll(".sf-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var val = btn.dataset.val;
    document.querySelectorAll(".sf-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    document.querySelectorAll(".pill").forEach(function (p) {
      p.classList.toggle("active", p.dataset.val === val);
    });
  });
});

/* ════════════════ 4. 모바일 필터 💊 (Pills) ════════════════ */
document.querySelectorAll(".pill").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var val = btn.dataset.val;
    document.querySelectorAll(".pill").forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
    document.querySelectorAll(".sf-btn").forEach(function (b) {
      b.classList.toggle("active", b.dataset.val === val);
    });
  });
});

/* ════════════════ 5. 정렬 드롭다운 제어 ════════════════ */
var sortBtn = document.getElementById("sort-btn");
var sortLabel = document.getElementById("sort-label");
var sortDropdown = document.getElementById("sort-dropdown");

if (sortBtn && sortDropdown) {
  sortBtn.addEventListener("click", function (e) {
    e.stopPropagation();
    var isExpanded = sortDropdown.style.display === "block";
    sortDropdown.style.display = isExpanded ? "none" : "block";
  });

  document.querySelectorAll(".sort-opt").forEach(function (opt) {
    opt.addEventListener("click", function () {
      sortLabel.textContent = opt.textContent;
      sortDropdown.style.display = "none";
    });
  });

  document.addEventListener("click", function () {
    sortDropdown.style.display = "none";
  });
}

/* ════════════════ 6. 페이지네이션 숫자 탭 ════════════════ */
document.querySelectorAll(".pg-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    document.querySelectorAll(".pg-btn").forEach(function (b) {
      b.classList.remove("active");
    });
    btn.classList.add("active");
  });
});

/* ════════════════ 7. 맨 위로 가기 (Top) ════════════════ */
var btnTop = document.getElementById("btn-top");
if (btnTop) {
  btnTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/* ════════════════ 8. 위시리스트 폰트어썸 토글 최적화 ════════════════ */
document.querySelectorAll(".wish-btn").forEach(function (btn) {
  btn.addEventListener("click", function () {
    var icon = btn.querySelector("i");
    if (icon) {
      if (icon.classList.contains("fa-regular")) {
        icon.classList.remove("fa-regular");
        icon.classList.add("fa-solid");
        icon.style.color = "#e11d48";
      } else {
        icon.classList.remove("fa-solid");
        icon.classList.add("fa-regular");
        icon.style.color = "";
      }
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // 1. 요소 선택
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const drawerCloseBtn = document.querySelector(".drawer-close-btn");
  const menuDrawer = document.querySelector(".mobile-menu-drawer");
  const menuOverlay = document.querySelector(".mobile-menu-overlay");
  const toggleSubBtns = document.querySelectorAll(".toggle-sub-btn");

  // 2. 모바일 메뉴 열기 함수
  const openMenu = () => {
    menuDrawer.classList.add("active");
    menuOverlay.classList.add("active");
    document.body.style.overflow = "hidden"; // 메뉴 열렸을 때 뒤쪽 스크롤 방지
  };

  // 3. 모바일 메뉴 닫기 함수
  const closeMenu = () => {
    menuDrawer.classList.remove("active");
    menuOverlay.classList.remove("active");
    document.body.style.overflow = ""; // 스크롤 다시 복구
  };

  // 4. 이벤트 리스너 등록 (열기 / 닫기)
  if (mobileMenuBtn) mobileMenuBtn.addEventListener("click", openMenu);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeMenu);
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);

  // 5. 모바일 서브메뉴 아코디언 토글 (하위 메뉴 열기/닫기)
  toggleSubBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation(); // 부모 링크 이동 이벤트 방지
      const parentLi = btn.closest("li");

      if (parentLi) {
        // 다른 메뉴를 닫고 싶다면 아래 주석을 해제하세요.
        /*
                document.querySelectorAll('.mobile-gnb > li').forEach(item => {
                    if (item !== parentLi) item.classList.remove('open');
                });
                */
        parentLi.classList.toggle("open");
      }
    });
  });
});
