/* home.js — "Your Smile's Story" cinematic layer. Homepage only.
   Presentation-only: never edits copy, links, schema, or forms. */
(function () {
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. Title sequence (once per session, skippable) ---------- */
  if (!reduce && !sessionStorage.getItem('sbSeen')) {
    sessionStorage.setItem('sbSeen', '1');
    var ts = document.createElement('div');
    ts.id = 'sb-titleseq';
    ts.innerHTML =
      '<div class="sb-ts-inner">' +
      '<p class="sb-ts-pre">Kota, Rajasthan \u00b7 Since 2013</p>' +
      '<div class="sb-ts-logo">Dr. Mahima\u2019s <em>Dental Care</em></div>' +
      '<p class="sb-ts-tag">your smile\u2019s story begins here</p>' +
      '<svg class="sb-ts-smile" viewBox="0 0 180 50"><path d="M12 10 Q90 62 168 10"/></svg>' +
      '</div>';
    document.body.appendChild(ts);
    var closeTs = function () {
      ts.classList.add('sb-ts-out');
      setTimeout(function () { ts.remove(); }, 1300);
    };
    setTimeout(closeTs, 3200);
    ts.addEventListener('click', closeTs);
  }

  /* ---------- 2. Kinetic hero headline (word stagger) ---------- */
  var h1 = document.querySelector('.hero h1');
  if (h1 && !reduce) {
    var wrap = function (node) {
      Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        if (n.nodeType === 3 && n.textContent.trim()) {
          var frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(function (w) {
            if (!w.trim()) { frag.appendChild(document.createTextNode(w)); return; }
            var s = document.createElement('span');
            s.className = 'sb-w'; s.textContent = w;
            frag.appendChild(s);
          });
          node.replaceChild(frag, n);
        } else if (n.nodeType === 1 && n.tagName !== 'BR') { wrap(n); }
      });
    };
    wrap(h1);
    h1.querySelectorAll('.sb-w').forEach(function (s, i) {
      s.style.animationDelay = (0.08 + i * 0.09) + 's';
    });
    h1.classList.add('sb-kinetic');
  }

  /* ---------- 3. Floating sparkles + mascot in hero ---------- */
  var hero = document.querySelector('.hero');
  if (hero && !reduce) {
    hero.classList.add('sb-hero');
    [[8, 14, 22, 0], [5, 62, 15, 1.2], [46, 8, 17, 2]].forEach(function (p) {
      var sp = document.createElement('span');
      sp.className = 'sb-float';
      sp.style.cssText = 'left:' + p[0] + '%;top:' + p[1] + '%;width:' + p[2] + 'px;height:' + p[2] + 'px;animation-delay:' + p[3] + 's';
      sp.innerHTML = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z"/></svg>';
      hero.appendChild(sp);
    });
    var mascot = document.createElement('div');
    mascot.className = 'sb-mascot';
    mascot.setAttribute('aria-hidden', 'true');
    mascot.innerHTML =
      '<svg viewBox="0 0 200 190">' +
      '<g class="sb-m-body"><path d="M55 92 q0 -52 45 -52 q45 0 45 52 q0 21 -11 31 l-7 41 q-4 12 -11 2 l-5 -26 q-3 -9 -8 0 l-6 27 q-7 11 -11 -2 l-7 -42 q-24 -10 -24 -31z" fill="#fff" stroke="hsl(345 15% 82%)" stroke-width="2.5"/>' +
      '<g class="sb-m-eyes" fill="hsl(345 25% 16%)"><circle cx="84" cy="82" r="5"/><circle cx="116" cy="82" r="5"/></g>' +
      '<circle cx="86" cy="80" r="1.7" fill="#fff"/><circle cx="118" cy="80" r="1.7" fill="#fff"/>' +
      '<circle cx="70" cy="94" r="5" fill="hsl(352 68% 55% / .22)"/><circle cx="130" cy="94" r="5" fill="hsl(352 68% 55% / .22)"/>' +
      '<path d="M86 99 q14 14 28 0" stroke="hsl(345 25% 16%)" stroke-width="3" fill="none" stroke-linecap="round"/>' +
      '<path d="M72 56 q7 -9 14 -2" stroke="#fff" stroke-width="4" fill="none" opacity=".9" stroke-linecap="round"/></g>' +
      '<path class="sb-m-spark" d="M156 40 l4 11 11 4 -11 4 -4 11 -4 -11 -11 -4 11 -4z" fill="hsl(38 92% 48%)"/>' +
      '</svg>';
    hero.appendChild(mascot);
  }

  /* ---------- 4. Chapter eyebrows above section titles ---------- */
  var CHAPTERS = [
    ['Real Results', 'The happy endings'],
    ['Why Choose Us', 'Four promises, in writing'],
    ['Our Services', 'Act II \u00b7 The care'],
    ['Meet Your Doctors', 'The storytellers'],
    ['Patient Reviews', '5,000+ happy endings'],
    ['Patient Success Stories', 'Real stories, real b-roll']
  ];
  document.querySelectorAll('h2').forEach(function (h) {
    var t = h.textContent.replace(/\s+/g, ' ').trim();
    CHAPTERS.forEach(function (c) {
      if (t.indexOf(c[0]) === 0) {
        var e = document.createElement('p');
        e.className = 'sb-chapter';
        e.textContent = c[1];
        h.parentNode.insertBefore(e, h);
      }
    });
  });

  /* ---------- 5. B-roll loops inside homepage service cards ---------- */
  var STROKE = 'hsl(345 12% 80%)';
  var MINI = {
    'dental-implants':
      '<g class="lp-screw" style="transform-box:fill-box;transform-origin:center;"><path d="M92 96 h12 l-2 42 q-4 7 -8 0 z" fill="hsl(240 6% 72%)"/><rect x="89" y="88" width="18" height="8" rx="3" fill="hsl(240 6% 60%)"/></g>' +
      '<g class="lp-crown-drop" style="transform-box:fill-box;"><path d="M78 86 q0 -34 20 -34 q20 0 20 34 q0 12 -20 12 q-20 0 -20 -12z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/></g>' +
      '<rect x="20" y="92" width="156" height="42" rx="8" fill="hsl(32 45% 90%)" opacity=".7"/>' +
      '<path class="lp-spark" d="M140 42 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3z" fill="hsl(38 92% 48%)"/>',
    'root-canal':
      '<circle class="lp-pain" cx="98" cy="70" r="46" fill="hsl(352 68% 55% / .18)" style="transform-box:fill-box;transform-origin:center;"/>' +
      '<path d="M64 62 q0 -40 34 -40 q34 0 34 40 q0 14 -8 22 l-6 44 q-3 9 -8 1 l-5 -27 q-3 -8 -7 0 l-6 28 q-5 8 -8 -1 l-5 -45 q-8 -8 -8 -22z" fill="hsl(40 30% 96%)" stroke="' + STROKE + '" stroke-width="2"/>' +
      '<g class="lp-fill-up" style="transform-box:fill-box;"><path d="M92 50 q6 -4 12 0 q3 15 -1 24 l-3 36 q-1 4 -3 0 l-1 -22 q-1 -5 -3 0 l-2 24 q-1 4 -3 0 l-1 -38 q-3 -10 5 -24z" fill="hsl(38 92% 48%)"/></g>' +
      '<g class="lp-calm-ring"><path d="M146 28 l2 7 7 2 -7 2 -2 7 -2 -7 -7 -2 7 -2z" fill="hsl(174 55% 40%)"/></g>',
    'braces-aligners':
      '<g class="lp-t1" style="transform-box:fill-box;"><path d="M34 76 q0 -26 14 -26 q14 0 14 26 q0 30 -7 39 q-7 9 -14 0 q-7 -9 -7 -39z" fill="#fff" stroke="' + STROKE + '" stroke-width="1.8"/></g>' +
      '<g class="lp-t2" style="transform-box:fill-box;"><path d="M72 72 q0 -28 14 -28 q14 0 14 28 q0 32 -7 41 q-7 9 -14 0 q-7 -9 -7 -41z" fill="#fff" stroke="' + STROKE + '" stroke-width="1.8"/></g>' +
      '<g class="lp-t3" style="transform-box:fill-box;"><path d="M110 72 q0 -28 14 -28 q14 0 14 28 q0 32 -7 41 q-7 9 -14 0 q-7 -9 -7 -41z" fill="#fff" stroke="' + STROKE + '" stroke-width="1.8"/></g>' +
      '<g class="lp-t4" style="transform-box:fill-box;"><path d="M148 76 q0 -26 14 -26 q14 0 14 26 q0 30 -7 39 q-7 9 -14 0 q-7 -9 -7 -39z" fill="#fff" stroke="' + STROKE + '" stroke-width="1.8"/></g>' +
      '<path class="lp-wire-draw" d="M40 82 Q78 74 105 77 Q140 80 168 84" fill="none" stroke="hsl(352 68% 55%)" stroke-width="2.5" stroke-linecap="round"/>',
    'teeth-whitening':
      '<path d="M66 70 q0 -42 32 -42 q32 0 32 42 q0 17 -9 25 l-5 34 q-3 10 -8 2 l-4 -22 q-3 -8 -6 0 l-4 23 q-5 9 -8 -2 l-6 -35 q-12 -8 -12 -25z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/>' +
      '<path class="lp-tint-lift" d="M66 70 q0 -42 32 -42 q32 0 32 42 q0 17 -9 25 l-5 34 q-3 10 -8 2 l-4 -22 q-3 -8 -6 0 l-4 23 q-5 9 -8 -2 l-6 -35 q-12 -8 -12 -25z" fill="hsl(45 70% 68%)" opacity=".55"/>' +
      '<g class="lp-beam-sweep" style="transform-box:fill-box;"><polygon points="98,12 78,72 118,72" fill="hsl(200 90% 70% / .35)"/><rect x="89" y="4" width="18" height="11" rx="4" fill="hsl(352 68% 55%)"/></g>' +
      '<path class="lp-spark" d="M140 58 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="hsl(38 92% 48%)"/>',
    'contact-pediatric':
      '<g style="transform-box:fill-box;transform-origin:50% 90%;" class="sb-m-body"><path d="M62 74 q0 -40 34 -40 q34 0 34 40 q0 16 -9 24 l-5 32 q-3 9 -8 2 l-4 -20 q-2 -7 -6 0 l-4 21 q-5 8 -8 -2 l-5 -33 q-19 -8 -19 -24z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/>' +
      '<g fill="hsl(345 25% 16%)"><circle cx="84" cy="66" r="4"/><circle cx="108" cy="66" r="4"/></g>' +
      '<path d="M86 80 q10 10 20 0" stroke="hsl(345 25% 16%)" stroke-width="2.5" fill="none" stroke-linecap="round"/></g>' +
      '<path class="lp-spark" d="M44 36 l3 9 9 3 -9 3 -3 9 -3 -9 -9 -3 9 -3z" fill="hsl(38 92% 48%)"/>' +
      '<path class="lp-spark" style="animation-delay:.3s" d="M150 32 l3 8 8 3 -8 3 -3 8 -3 -8 -8 -3 8 -3z" fill="hsl(38 92% 48%)"/>',
    'contact-emergency':
      '<circle class="lp-pain" cx="98" cy="68" r="44" fill="hsl(352 68% 55% / .16)" style="transform-box:fill-box;transform-origin:center;"/>' +
      '<path d="M66 64 q0 -38 32 -38 q32 0 32 38 q0 15 -8 22 l-5 31 q-3 9 -8 2 l-4 -20 q-2 -7 -6 0 l-4 21 q-5 8 -8 -2 l-5 -32 q-12 -7 -12 -22z" fill="#fff" stroke="' + STROKE + '" stroke-width="2"/>' +
      '<path class="lp-em-crack" d="M104 32 l-7 13 8 9 -8 12 6 10" fill="none" stroke="hsl(352 68% 55%)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="stroke-dasharray:60;"/>' +
      '<g class="lp-calm-ring"><path d="M148 30 l2 7 7 2 -7 2 -2 7 -2 -7 -7 -2 7 -2z" fill="hsl(174 55% 40%)"/></g>'
  };
  /* map homepage cards by their link href (or heading for the two contact-linked cards) */
  document.querySelectorAll('.cards-grid .card').forEach(function (card) {
    var a = card.querySelector('a[href*="/services/"]');
    var key = null;
    if (a) { var mm = a.getAttribute('href').match(/\/services\/([a-z-]+)\//); key = mm && mm[1]; }
    else {
      var h3 = card.querySelector('h3');
      if (h3 && /Pediatric/i.test(h3.textContent)) key = 'contact-pediatric';
      if (h3 && /Emergency/i.test(h3.textContent)) key = 'contact-emergency';
    }
    if (!key || !MINI[key]) return;
    var scr = document.createElement('div');
    scr.className = 'sb-mini';
    scr.setAttribute('aria-hidden', 'true');
    scr.innerHTML = '<svg viewBox="0 0 196 150">' + MINI[key] + '</svg>';
    var icon = card.querySelector('.card-icon');
    if (icon) { icon.style.display = 'none'; card.insertBefore(scr, icon); }
    else { card.insertBefore(scr, card.firstChild); }
  });
})();
