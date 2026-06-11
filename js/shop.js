'use strict';

/* ════════════════ 1. 띠배너 닫기 ════════════════ */
document.getElementById('banner-close').addEventListener('click', function () {
	var banner = document.getElementById('top-banner');
	if (banner) {
		banner.style.display = 'none';
	}
});

/* ════════════════ 2. 대메뉴 카테고리 탭 ════════════════ */
document.querySelectorAll('.cat-btn').forEach(function (btn) {
	btn.addEventListener('click', function () {
		document.querySelectorAll('.cat-btn').forEach(function (b) {
			b.classList.remove('active');
		});
		btn.classList.add('active');
	});
});

/* ════════════════ 3. 데스크톱 서브필터 ════════════════ */
document.querySelectorAll('.sf-btn').forEach(function (btn) {
	btn.addEventListener('click', function () {
		var val = btn.dataset.val;
		document.querySelectorAll('.sf-btn').forEach(function (b) {
			b.classList.remove('active');
		});
		btn.classList.add('active');
		document.querySelectorAll('.pill').forEach(function (p) {
			p.classList.toggle('active', p.dataset.val === val);
		});
	});
});

/* ════════════════ 4. 모바일 필터 💊 (Pills) ════════════════ */
document.querySelectorAll('.pill').forEach(function (btn) {
	btn.addEventListener('click', function () {
		var val = btn.dataset.val;
		document.querySelectorAll('.pill').forEach(function (b) {
			b.classList.remove('active');
		});
		btn.classList.add('active');
		document.querySelectorAll('.sf-btn').forEach(function (b) {
			b.classList.toggle('active', b.dataset.val === val);
		});
	});
});

/* ════════════════ 5. 정렬 드롭다운 제어 ════════════════ */
var sortBtn      = document.getElementById('sort-btn');
var sortLabel    = document.getElementById('sort-label');
var sortDropdown = document.getElementById('sort-dropdown');

if (sortBtn && sortDropdown) {
	sortBtn.addEventListener('click', function (e) {
		e.stopPropagation();
		var isExpanded = sortDropdown.style.display === 'block';
		sortDropdown.style.display = isExpanded ? 'none' : 'block';
	});
	
	document.querySelectorAll('.sort-opt').forEach(function (opt) {
		opt.addEventListener('click', function () {
			sortLabel.textContent = opt.textContent;
			sortDropdown.style.display = 'none';
		});
	});
	
	document.addEventListener('click', function () {
		sortDropdown.style.display = 'none';
	});
}

/* ════════════════ 6. 페이지네이션 숫자 탭 ════════════════ */
document.querySelectorAll('.pg-btn').forEach(function (btn) {
	btn.addEventListener('click', function () {
		document.querySelectorAll('.pg-btn').forEach(function (b) {
			b.classList.remove('active');
		});
		btn.classList.add('active');
	});
});

/* ════════════════ 7. 맨 위로 가기 (Top) ════════════════ */
var btnTop = document.getElementById('btn-top');
if (btnTop) {
	btnTop.addEventListener('click', function () {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	});
}

/* ════════════════ 8. 위시리스트 폰트어썸 토글 최적화 ════════════════ */
document.querySelectorAll('.wish-btn').forEach(function (btn) {
	btn.addEventListener('click', function () {
		var icon = btn.querySelector('i');
		if (icon) {
			if (icon.classList.contains('fa-regular')) {
				icon.classList.remove('fa-regular');
				icon.classList.add('fa-solid');
				icon.style.color = '#e11d48';
			} else {
				icon.classList.remove('fa-solid');
				icon.classList.add('fa-regular');
				icon.style.color = '';
			}
		}
	});
});