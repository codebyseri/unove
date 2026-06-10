const promo = document.querySelector(".promo");
const promoClose = document.querySelector(".promo-close");
const header = document.querySelector(".site-header");
const drawer = document.querySelector(".mobile-drawer");
const mobileMenu = document.querySelector(".mobile-menu");
const toast = document.querySelector(".toast");

const slides = [
	{badge: "NEW", title: "Sleek on the go", text: "어노브 프리즈카밍 출시"},
	{badge: "BEST", title: "Deep damage care", text: "단백질 집중 밀착 트리트먼트"},
	{badge: "SCENT", title: "Soft elegance", text: "오래 남는 어노브의 향"},
	{badge: "HAIR", title: "Silky finish", text: "가볍게 빛나는 헤어 오일"},
	{badge: "UNOVE", title: "Your mood", text: "나만의 분위기를 완성하세요"},
];

let slideIndex = 0;
let toastTimer;

function showToast(message) {
	if (!toast) return;
	toast.textContent = message;
	toast.classList.add("is-visible");
	clearTimeout(toastTimer);
	toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 1500);
}

function closeDrawer() {
	drawer?.classList.remove("is-open");
	header?.classList.remove("is-menu-open");
	document.body.classList.remove("drawer-open");
	mobileMenu?.setAttribute("aria-expanded", "false");
}

promoClose?.addEventListener("click", () => {
	promo?.classList.add("is-hidden");
	header?.classList.add("is-banner-closed");
	drawer?.classList.add("is-banner-closed");
});

mobileMenu?.addEventListener("click", () => {
	const willOpen = !drawer?.classList.contains("is-open");
	drawer?.classList.toggle("is-open", willOpen);
	header?.classList.toggle("is-menu-open", willOpen);
	document.body.classList.toggle("drawer-open", willOpen);
	mobileMenu.setAttribute("aria-expanded", String(willOpen));
});

drawer?.querySelectorAll("a").forEach((link) => {
	link.addEventListener("click", closeDrawer);
});

window.addEventListener("scroll", () => {
	header?.classList.toggle("is-scrolled", window.scrollY > 24);
});

/* ==========================================================================
   HERO BANNER SLIDER LOGIC (페이드 인아웃 반영)
   ========================================================================== */
const heroSlides = document.querySelectorAll(".hero .slide");
const currentSlide = document.querySelector(".current-slide");
const progress = document.querySelector(".slider-indicator b");

// [초기화] 새로고침 시 첫 번째 슬라이드 강제 활성화 처리
if (heroSlides.length > 0) {
	heroSlides[0].classList.add("is-active");
}

setInterval(() => {
	if (heroSlides.length === 0) return;
	
	// 1. 기존 활성화 슬라이드 클래스 제거
	heroSlides[slideIndex].classList.remove("is-active");
	
	// 2. 다음 인덱스로 순환 계산
	slideIndex = (slideIndex + 1) % heroSlides.length;
	
	// 3. 새 슬라이드 활성화 (CSS 페이드 인 실행됨)
	heroSlides[slideIndex].classList.add("is-active");
	
	// 4. 숫자 인디케이터 변경 (01, 02...)
	if (currentSlide) {
		currentSlide.textContent = String(slideIndex + 1).padStart(2, "0");
	}
	
	// 5. 밑면 게이지 프로그레스 바 채우기
	if (progress) {
		progress.style.setProperty("--progress", `${((slideIndex + 1) / heroSlides.length) * 100}%`);
	}
}, 3600);

/* ==========================================================================
   BUTTONS & ACTIONS
   ========================================================================== */
document.querySelectorAll(".like-button").forEach((button) => {
	button.addEventListener("click", () => {
		button.classList.toggle("is-active");
		showToast(button.classList.contains("is-active") ? "찜 목록에 추가했어요" : "찜 목록에서 삭제했어요");
	});
});

document.querySelectorAll(".bag-button").forEach((button) => {
	button.addEventListener("click", () => {
		button.classList.add("is-active");
		showToast("장바구니에 담았어요");
	});
});

const brandMain = document.querySelector(".brand-main");
document.querySelectorAll(".thumbs button").forEach((button) => {
	button.addEventListener("click", () => {
		if (!brandMain) return;
		document.querySelectorAll(".thumbs button").forEach((item) => item.classList.remove("is-active"));
		button.classList.add("is-active");
		brandMain.classList.add("is-changing");
		setTimeout(() => {
			brandMain.src = button.querySelector("img").src;
			brandMain.classList.remove("is-changing");
		}, 160);
	});
});

const reviewStrip = document.querySelector(".review-strip");
document.querySelector(".review-nav.prev")?.addEventListener("click", () => {
	reviewStrip?.scrollBy({left: -220, behavior: "smooth"});
});

document.querySelector(".review-nav.next")?.addEventListener("click", () => {
	reviewStrip?.scrollBy({left: 220, behavior: "smooth"});
});

document.querySelectorAll(".top-button, .contact-button").forEach((button) => {
	button.addEventListener("click", () => {
		window.scrollTo({top: 0, behavior: "smooth"});
	});
});