/* ═══════════════════════════════════════════════════════════
   enhance.js — "Your Smile's Story" sitewide enhancements
   Loaded (defer) on every page. Safe: touches presentation only,
   never content, forms, schema, or existing scripts.
   ═══════════════════════════════════════════════════════════ */
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Scroll reveals on section children ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    var targets = document.querySelectorAll(
      '.section .card, .section .why-item, .section .step, .section .faq-item, ' +
      '.section .contact-card, .section .visit-card, .section .testimonial-card, ' +
      '.section .section-title, .section .section-sub, .about-stats > *'
    );
    targets.forEach(function (el, i) {
      el.classList.add('sb-reveal');
      el.style.transitionDelay = (i % 4) * 70 + 'ms';
    });
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('sb-in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- 2. Count-up on stat numbers ---------- */
  if (!reduce && 'IntersectionObserver' in window) {
    var nums = document.querySelectorAll('.about-stat-num, .hero-stat strong, .result-num');
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        cio.unobserve(e.target);
        var el = e.target, raw = el.textContent.trim();
        var m = raw.match(/^([\d,]+)(.*)$/);
        if (!m) return;
        var target = parseInt(m[1].replace(/,/g, ''), 10), suffix = m[2] || '';
        if (!target || target > 100000) return;
        var t0 = performance.now(), dur = 1300;
        (function tick(t) {
          var p = Math.min((t - t0) / dur, 1);
          var v = Math.round((1 - Math.pow(1 - p, 3)) * target);
          el.textContent = v.toLocaleString('en-IN') + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.6 });
    nums.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- 3. Per-service b-roll scene injection ---------- */
  var STROKE = 'hsl(345 12% 80%)';
  var tooth = function (extra) {
    return '<path d="M100 122 q0 -70 50 -70 q50 0 50 70 q0 28 -14 42 l-8 56 q-4 16 -13 3 l-7 -37 q-4 -12 -9 0 l-7 38 q-8 14 -13 -3 l-9 -57 q-20 -14 -20 -42z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/>' + (extra || '');
  };
  var SCENES = {
    'dental-implants':
      '<rect x="16" y="158" width="268" height="70" rx="10" fill="hsl(32 45% 90%)"/>' +
      '<path d="M16 158 Q90 132 150 146 Q220 160 284 148 L284 172 Q214 184 150 172 Q86 160 16 180 Z" fill="hsl(355 65% 84%)"/>' +
      '<path d="M52 150 q0 -46 25 -46 q25 0 25 46 q0 17 -25 17 q-25 0 -25 -17z" fill="hsl(40 30% 96%)" stroke="' + STROKE + '"/>' +
      '<path d="M198 150 q0 -46 25 -46 q25 0 25 46 q0 17 -25 17 q-25 0 -25 -17z" fill="hsl(40 30% 96%)" stroke="' + STROKE + '"/>' +
      '<g class="lp-screw" style="transform-box:fill-box;transform-origin:center;"><path d="M142 166 h16 l-2 56 q-6 9 -12 0 z" fill="hsl(240 6% 72%)"/><rect x="139" y="158" width="22" height="10" rx="3" fill="hsl(240 6% 60%)"/></g>' +
      '<g class="lp-crown-drop" style="transform-box:fill-box;"><path d="M124 152 q0 -44 26 -44 q26 0 26 44 q0 16 -26 16 q-26 0 -26 -16z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/></g>' +
      '<path class="lp-spark" d="M212 70 l4 11 11 4 -11 4 -4 11 -4 -11 -11 -4 11 -4z" fill="hsl(38 92% 48%)"/>',
    'root-canal':
      '<circle class="lp-pain" cx="150" cy="118" r="76" fill="hsl(352 68% 55% / .18)" style="transform-box:fill-box;transform-origin:center;"/>' +
      '<path d="M96 104 q0 -62 54 -62 q54 0 54 62 q0 22 -12 34 l-9 74 q-4 15 -12 1 l-8 -44 q-5 -13 -12 -1 l-9 46 q-7 13 -12 -2 l-8 -74 q-12 -12 -12 -34z" fill="hsl(40 30% 96%)" stroke="' + STROKE + '" stroke-width="2"/>' +
      '<g class="lp-fill-up" style="transform-box:fill-box;"><path d="M141 86 q9 -6 18 0 q4 24 -2 38 l-5 58 q-2 6 -4 0 l-2 -36 q-2 -7 -4 0 l-3 38 q-2 6 -4 0 l-2 -60 q-5 -16 8 -38z" fill="hsl(38 92% 48%)"/></g>' +
      '<g class="lp-calm-ring"><circle cx="150" cy="116" r="84" fill="none" stroke="hsl(174 55% 40%)" stroke-width="2" stroke-dasharray="3 8"/><path d="M226 48 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3z" fill="hsl(174 55% 40%)"/></g>',
    'braces-aligners':
      '<path d="M28 190 q122 44 244 0 l0 26 q-122 40 -244 0z" fill="hsl(355 65% 84%)" opacity=".5"/>' +
      '<g class="lp-t1" style="transform-box:fill-box;"><path d="M48 132 q0 -40 21 -40 q21 0 21 40 q0 48 -10 62 q-11 14 -22 0 q-10 -14 -10 -62z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/></g>' +
      '<g class="lp-t2" style="transform-box:fill-box;"><path d="M104 126 q0 -44 21 -44 q21 0 21 44 q0 50 -10 64 q-11 14 -22 0 q-10 -14 -10 -64z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/></g>' +
      '<g class="lp-t3" style="transform-box:fill-box;"><path d="M160 126 q0 -44 21 -44 q21 0 21 44 q0 50 -10 64 q-11 14 -22 0 q-10 -14 -10 -64z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/></g>' +
      '<g class="lp-t4" style="transform-box:fill-box;"><path d="M216 132 q0 -40 21 -40 q21 0 21 40 q0 48 -10 62 q-11 14 -22 0 q-10 -14 -10 -62z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/></g>' +
      '<path class="lp-wire-draw" d="M56 140 Q120 128 152 132 Q200 136 248 142" fill="none" stroke="hsl(352 68% 55%)" stroke-width="3.5" stroke-linecap="round"/>',
    'teeth-whitening':
      tooth() +
      '<path class="lp-tint-lift" d="M100 122 q0 -70 50 -70 q50 0 50 70 q0 28 -14 42 l-8 56 q-4 16 -13 3 l-7 -37 q-4 -12 -9 0 l-7 38 q-8 14 -13 -3 l-9 -57 q-20 -14 -20 -42z" fill="hsl(45 70% 68%)" opacity=".55"/>' +
      '<g class="lp-beam-sweep" style="transform-box:fill-box;"><polygon points="150,20 118,120 182,120" fill="hsl(200 90% 70% / .35)"/><rect x="136" y="6" width="28" height="18" rx="5" fill="hsl(352 68% 55%)"/></g>' +
      '<path class="lp-spark" d="M212 92 l4 11 11 4 -11 4 -4 11 -4 -11 -11 -4 11 -4z" fill="hsl(38 92% 48%)"/>',
    'cavity-filling':
      '<circle class="lp-pain" cx="150" cy="118" r="72" fill="hsl(352 68% 55% / .15)" style="transform-box:fill-box;transform-origin:center;"/>' +
      tooth('<ellipse class="lp-fade-away" cx="168" cy="92" rx="16" ry="12" fill="hsl(30 30% 30%)"/>') +
      '<g class="lp-fill-up" style="transform-box:fill-box;"><ellipse cx="168" cy="92" rx="16" ry="12" fill="hsl(38 92% 48%)"/></g>' +
      '<g class="lp-calm-ring"><path d="M226 52 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3z" fill="hsl(174 55% 40%)"/></g>',
    'tooth-extraction':
      '<path d="M28 196 q122 40 244 0 l0 24 q-122 36 -244 0z" fill="hsl(355 65% 84%)" opacity=".6"/>' +
      '<g class="lp-lift-out" style="transform-box:fill-box;">' + tooth() + '</g>' +
      '<g class="lp-calm-ring"><circle cx="150" cy="130" r="86" fill="none" stroke="hsl(174 55% 40%)" stroke-width="2" stroke-dasharray="3 8"/><path d="M224 56 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3z" fill="hsl(174 55% 40%)"/></g>',
    'dental-scaling':
      tooth(
        '<g class="lp-fade-away"><circle cx="112" cy="98" r="5" fill="hsl(45 45% 60%)"/><circle cx="122" cy="130" r="4" fill="hsl(45 45% 58%)"/><circle cx="186" cy="104" r="5" fill="hsl(45 45% 60%)"/><circle cx="182" cy="136" r="4" fill="hsl(45 45% 58%)"/><circle cx="150" cy="70" r="4" fill="hsl(45 45% 62%)"/></g>'
      ) +
      '<path class="lp-spark" d="M206 78 l4 11 11 4 -11 4 -4 11 -4 -11 -11 -4 11 -4z" fill="hsl(38 92% 48%)"/>' +
      '<path class="lp-spark" style="animation-delay:.3s" d="M92 108 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="hsl(38 92% 48%)"/>',
    'zirconia-crown':
      '<path d="M118 210 h64 l-6 -74 q-26 -12 -52 0 z" fill="hsl(40 25% 88%)" stroke="' + STROKE + '"/>' +
      '<g class="lp-crown-drop" style="transform-box:fill-box;"><path d="M112 138 q0 -56 38 -56 q38 0 38 56 q0 20 -38 20 q-38 0 -38 -20z" fill="#fff" stroke="' + STROKE + '" stroke-width="2.5"/><path d="M128 100 q10 -12 20 -3" stroke="#fff" stroke-width="5" fill="none" opacity=".9" stroke-linecap="round"/></g>' +
      '<path class="lp-spark" d="M212 74 l4 11 11 4 -11 4 -4 11 -4 -11 -11 -4 11 -4z" fill="hsl(38 92% 48%)"/>',
    'dental-bridge':
      '<path d="M28 196 q122 40 244 0 l0 24 q-122 36 -244 0z" fill="hsl(355 65% 84%)" opacity=".6"/>' +
      '<path d="M56 148 q0 -44 23 -44 q23 0 23 44 q0 18 -23 18 q-23 0 -23 -18z" fill="hsl(40 30% 96%)" stroke="' + STROKE + '"/>' +
      '<path d="M198 148 q0 -44 23 -44 q23 0 23 44 q0 18 -23 18 q-23 0 -23 -18z" fill="hsl(40 30% 96%)" stroke="' + STROKE + '"/>' +
      '<g class="lp-bridge-drop" style="transform-box:fill-box;">' +
      '<path d="M64 140 q0 -40 21 -40 q21 0 21 40 q0 16 -21 16 q-21 0 -21 -16z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/>' +
      '<path d="M129 140 q0 -40 21 -40 q21 0 21 40 q0 16 -21 16 q-21 0 -21 -16z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/>' +
      '<path d="M194 140 q0 -40 21 -40 q21 0 21 40 q0 16 -21 16 q-21 0 -21 -16z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/>' +
      '<rect x="80" y="108" width="140" height="10" rx="5" fill="hsl(240 6% 78%)"/></g>' +
      '<path class="lp-spark" d="M244 66 l4 11 11 4 -11 4 -4 11 -4 -11 -11 -4 11 -4z" fill="hsl(38 92% 48%)"/>'
  };

  var m = location.pathname.match(/\/services\/([a-z-]+)\/?/);
  var key = m && m[1];
  if (key && SCENES[key]) {
    var host = document.querySelector('.section .container') || document.querySelector('.container');
    if (host) {
      var card = document.createElement('div');
      card.className = 'sb-scene';
      card.setAttribute('aria-hidden', 'true');
      card.innerHTML =
        '<span class="sb-tag"><i></i> HOW IT WORKS</span>' +
        '<svg viewBox="0 0 300 240" role="img" aria-label="Animated illustration of this procedure">' +
        SCENES[key] + '</svg>';
      var h1 = host.querySelector('h1');
      if (h1 && h1.parentNode) { h1.parentNode.insertBefore(card, h1.nextSibling); }
      else { host.insertBefore(card, host.firstChild); }
    }
  }
})();
