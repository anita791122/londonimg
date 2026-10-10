/* 說明頁和 Claude Skill 頁共用：手機的選單開關；說明頁的分節反白。 */
(function () {
  var sb = document.querySelector('.sidebar');
  if (!sb) return;
  var ham = sb.querySelector('.hamburger');

  function isOpen() { return sb.classList.contains('menu-open'); }
  function setOpen(open) { sb.classList.toggle('menu-open', open); ham.setAttribute('aria-expanded', open ? 'true' : 'false'); }
  ham.addEventListener('click', function () { setOpen(!isOpen()); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && isOpen()) { setOpen(false); ham.focus(); } });
  document.addEventListener('click', function (e) { if (!sb.contains(e.target)) setOpen(false); });
  sb.addEventListener('focusout', function (e) { if (e.relatedTarget && !sb.contains(e.relatedTarget)) setOpen(false); });

  // 說明頁：子選單跟著捲動反白現在這一節；點了哪一節就亮哪一節（頁尾太短、捲不到頂時也一樣）
  var subs = [].slice.call(sb.querySelectorAll('.subnav a'));
  var clicked = -1;
  sb.querySelectorAll('.nav a').forEach(function (a) {
    a.addEventListener('click', function () { clicked = subs.indexOf(a); setOpen(false); });
  });
  if (!subs.length) return;
  var heads = subs.map(function (a) { return document.getElementById(a.getAttribute('href').slice(1)); });
  ['wheel', 'touchstart', 'keydown'].forEach(function (ev) { window.addEventListener(ev, function () { clicked = -1; }, { passive: true }); });
  var active = -2;
  function spy() {
    // 判斷線平常在畫面頂端；離頁尾不到一個畫面高時往下移，最後幾節太短、標題捲不到頂端也輪得到
    var top = (window.innerWidth <= 820 ? sb.offsetHeight : 0) + 28;
    var left = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
    var line = left >= window.innerHeight ? top : top + (window.innerHeight - top) * (1 - Math.max(left, 0) / window.innerHeight);
    var idx = -1;
    for (var i = 0; i < heads.length; i++) { if (heads[i].getBoundingClientRect().top <= line) idx = i; }
    if (clicked >= 0 && left <= 2) idx = clicked;
    if (idx === active) return;
    active = idx;
    subs.forEach(function (a, i) {
      a.classList.toggle('is-current', i === idx);
      if (i === idx) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  ['scroll', 'resize', 'hashchange', 'scrollend'].forEach(function (ev) { window.addEventListener(ev, spy, { passive: true }); });
  spy();
})();
