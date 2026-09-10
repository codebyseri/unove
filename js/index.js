/* ==========================================================================
   DOM ELEMENTS SELECTORS (HTML 구조 기반 매칭)
   ========================================================================== */
const topBanner = document.querySelector("#top-banner");
const bannerClose = document.querySelector("#banner-close");
const headerDesktop = document.querySelector("#header-desktop");
const headerMobile = document.querySelector("#header-mobile");
const mobileMenuBtn = document.querySelector(".mobile-menu-btn");

let slideIndex = 0;

/* ==========================================================================
   BANNER & NAVIGATION EVENT LISTENERS
   ========================================================================== */
// 상단 띠배너 닫기 이벤트 (데스크톱 및 모바일 헤더 top 위치 보정 클래스 추가)
bannerClose?.addEventListener("click", () => {
  topBanner?.remove(); // 배너 제거
  headerDesktop?.classList.add("is-banner-closed");
  headerMobile?.classList.add("is-banner-closed");
});

// 스크롤 시 헤더 배경 처리 (배너가 있든 없든 스크롤 감지)
window.addEventListener("scroll", () => {
  const isScrolled = window.scrollY > 24;
  headerDesktop?.classList.toggle("is-scrolled", isScrolled);
  headerMobile?.classList.toggle("is-scrolled", isScrolled);
});

// 데스크톱 통합 Mega Menu: 헤더와 패널을 하나의 연속 hover 영역으로 취급한다.
const desktopNav = headerDesktop?.querySelector(".desktop-nav");
const megaMenu = headerDesktop?.querySelector(".mega-menu");
const megaMenuInner = megaMenu?.querySelector(".mega-menu-inner");
const megaMenuColumns = megaMenu?.querySelectorAll(".mega-menu-column") ?? [];
const primaryMenuLinks = desktopNav?.querySelectorAll(".gnb > li > a") ?? [];

function alignMegaMenuColumns() {
  if (!megaMenuInner) return;
  const innerRect = megaMenuInner.getBoundingClientRect();
  primaryMenuLinks.forEach((link, index) => {
    const column = megaMenuColumns[index];
    if (!column) return;
    const linkRect = link.getBoundingClientRect();
    const centerX = linkRect.left + linkRect.width / 2 - innerRect.left;
    column.style.setProperty("--column-center-x", `${centerX}px`);
  });
}

function setMegaMenu(open) {
  if (open) alignMegaMenuColumns();
  headerDesktop?.classList.toggle("is-mega-open", open);
  megaMenu?.setAttribute("aria-hidden", String(!open));
  primaryMenuLinks.forEach((link) =>
    link.setAttribute("aria-expanded", String(open)),
  );
}

megaMenu?.setAttribute("aria-hidden", "true");
primaryMenuLinks.forEach((link) => link.setAttribute("aria-haspopup", "true"));
desktopNav?.addEventListener("mouseenter", () => setMegaMenu(true));
headerDesktop?.addEventListener("mouseleave", () => setMegaMenu(false));
desktopNav?.addEventListener("focusin", () => setMegaMenu(true));
headerDesktop?.addEventListener("focusout", (event) => {
  if (!headerDesktop.contains(event.relatedTarget)) setMegaMenu(false);
});
window.addEventListener("resize", alignMegaMenuColumns);

// 모바일 메뉴 버튼 인터랙션
if (mobileMenuBtn) {
  // HTML 표준 웹접근성을 위해 기본 aria-expanded 속성 초기화 추가
  mobileMenuBtn.setAttribute("aria-expanded", "false");

  mobileMenuBtn.addEventListener("click", () => {
    const expanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
    mobileMenuBtn.setAttribute("aria-expanded", String(!expanded));
  });
}

/* ==========================================================================
   MAIN HERO BANNER SLIDER LOGIC
   ========================================================================== */
const heroSlides = document.querySelectorAll("#hero .slide");
const currentSlide = document.querySelector(".current-slide");
const progress = document.querySelector(".slider-indicator b");

// 슬라이더 바 상태를 업데이트하는 공통 함수
function updateSliderProgress(index) {
  if (currentSlide) {
    currentSlide.textContent = String(index + 1).padStart(2, "0");
  }
  if (progress && heroSlides.length > 0) {
    const percent = ((index + 1) / heroSlides.length) * 100;
    progress.style.setProperty("--progress", `${percent}%`);
  }
}

// 첫 번째 슬라이드 및 프로그레스 바 초기화 상태 지정
if (heroSlides.length > 0) {
  heroSlides.forEach((slide, idx) => {
    slide.classList.toggle("is-active", idx === 0);
  });
  updateSliderProgress(0); // 01번 슬라이드 게이지(20%) 선반영
}

// 3.6초 순환 슬라이더 타이머
setInterval(() => {
  if (heroSlides.length === 0) return;

  // 1. 현재 활성화 슬라이드 해제
  heroSlides[slideIndex].classList.remove("is-active");

  // 2. 인덱스 순환 계산
  slideIndex = (slideIndex + 1) % heroSlides.length;

  // 3. 다음 슬라이드 페이드인 활성화
  heroSlides[slideIndex].classList.add("is-active");

  // 4. 게이지 바 및 숫자 인디케이터 동기화
  updateSliderProgress(slideIndex);
}, 3600);

/* ==========================================================================
   PRODUCT INTERACTIONS (LIKE & BAG)
   ========================================================================== */
document.querySelectorAll(".like-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    button.classList.toggle("is-active");
  });
});

document.querySelectorAll(".bag-button").forEach((button) => {
  button.addEventListener("click", (e) => {
    e.preventDefault();
    button.classList.toggle("is-active");
  });
});

/* ==========================================================================
   BRAND VISUAL THUMBNAILS CONTROL
   ========================================================================== */
const brandVideo = document.querySelector(".brand-visual video");

document.querySelectorAll(".thumbs button").forEach((button) => {
  button.addEventListener("click", () => {
    // 모든 썸네일 활성화 해제 후 현재 타겟 활성화
    document.querySelectorAll(".thumbs button").forEach((item) => {
      item.classList.remove("is-active");
    });
    button.classList.add("is-active");

    // 비디오 소스 핸들링 예외 처리 (썸네일 클릭 시 영상 초기화 재생 효과)
    if (brandVideo) {
      brandVideo.currentTime = 0;
      brandVideo.play().catch(() => {});
    }
  });
});

/* ==========================================================================
   PHOTO REVIEWS SLIDE STRIP
   ========================================================================== */
const reviewStrip = document.querySelector(".review-strip");
const prevReviewBtn = document.querySelector(".review-nav.prev");
const nextReviewBtn = document.querySelector(".review-nav.next");

// CSS 반응형 크기(180px + gap 16px)를 고려해 최적의 이동 거리 계산
// 데스크톱(너비 > 768px)은 약 2개 아이템 분량(392px), 모바일 패드는 1개 분량(196px) 이동
prevReviewBtn?.addEventListener("click", () => {
  const scrollAmount = window.innerWidth <= 1200 ? 196 : 392;
  reviewStrip?.scrollBy({ left: -scrollAmount, behavior: "smooth" });
});

nextReviewBtn?.addEventListener("click", () => {
  const scrollAmount = window.innerWidth <= 1200 ? 196 : 392;
  reviewStrip?.scrollBy({ left: scrollAmount, behavior: "smooth" });
});

/* ==========================================================================
   FLOATING INTERACTION BUTTONS
   ========================================================================== */
const btnTop = document.querySelector("#btn-top");

// 1. 맨 위로 가기 버튼 (아이디 매칭 수정 완료)
btnTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.addEventListener("DOMContentLoaded", () => {
  const brandVisual = document.querySelector(".brand-visual");
  const buttons = document.querySelectorAll(".thumbs button");

  // 1. 메인 이미지 태그를 HTML 구조 변경 없이 JS로 동적 생성하여 삽입
  const mainImg = document.createElement("img");
  mainImg.classList.add("main-image");
  brandVisual.insertBefore(mainImg, brandVisual.firstChild);

  buttons.forEach((button, index) => {
    button.addEventListener("click", () => {
      // 모든 버튼에서 활성화 클래스 제거 후 현재 버튼에 추가
      buttons.forEach((btn) => btn.classList.remove("is-active"));
      button.classList.add("is-active");

      // 클릭한 버튼 내부의 이미지 src 가져오기
      const thumbImgSrc = button.querySelector("img").getAttribute("src");

      // 💡 1번 버튼(첫 번째 썸네일)을 누르면 영상을 보여주고, 나머지는 이미지를 보여주는 로직
      if (index === 0) {
        // 부드럽게 사라진 후 영상이 보이도록
        mainImg.classList.remove("show");
      } else {
        // 부드러운 교차 효과를 위해 페이드 아웃 -> src 변경 -> 페이드 인 처리
        mainImg.classList.remove("show");

        // 잠시 투명해진 틈을 타서 이미지를 바꾸고 다시 보여줌 (자연스러운 전환)
        setTimeout(() => {
          mainImg.src = thumbImgSrc;
          mainImg.alt = button.querySelector("img").alt + " 메인";
          mainImg.classList.add("show");
        }, 50); // 0.05초 짧은 타이밍 조절
      }
    });
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
