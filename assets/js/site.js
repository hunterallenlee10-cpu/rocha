/* Marque & Mile: site script (no build step, no framework). Lenis is optional. */
(function(){
  "use strict";
  var $ = function(s, r){ return (r || document).querySelector(s); };
  var $$ = function(s, r){ return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var money = function(n){ return '$' + Math.round(n).toLocaleString('en-US'); };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var narrowMq = window.matchMedia('(max-width:860px)');
  var clamp = function(v, a, b){ return Math.min(b, Math.max(a, v)); };
  var esc = function(s){
    return String(s == null ? '' : s).replace(/[&<>"']/g, function(c){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];
    });
  };

  /* Monthly payment (standard amortization) */
  function payment(principal, apr, months){
    if (principal <= 0) return 0;
    var r = apr / 100 / 12;
    if (r === 0) return principal / months;
    return principal * r / (1 - Math.pow(1 + r, -months));
  }
  var estFor = function(price){ return payment(price * 0.9, 8.9, 60); };

  /* ---------------------------------------------------------------
     Smooth scroll (Lenis) and one shared scroll-to helper
     --------------------------------------------------------------- */
  var lenis = null;
  if (window.Lenis && !reduceMotion) {
    lenis = new window.Lenis({lerp:0.11, smoothWheel:true, autoRaf:true});
  }
  var headerOffset = function(){ return -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 76) - 8; };
  function scrollToY(y, instant){
    if (lenis) lenis.scrollTo(y, {immediate:!!instant, duration:1.4});
    else window.scrollTo({top:y, behavior:(reduceMotion || instant) ? 'auto' : 'smooth'});
  }
  function scrollToEl(el){
    if (!el) return;
    var y = el.getBoundingClientRect().top + window.scrollY + (el.id === 'story' ? 0 : headerOffset());
    scrollToY(y);
  }
  document.addEventListener('click', function(e){
    var a = e.target.closest('a[href^="#"]');
    if (!a || a.hasAttribute('data-open')) return;
    var id = a.getAttribute('href').slice(1);
    var el = id === 'top' ? document.body : document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    if (id === 'top') scrollToY(0); else scrollToEl(el);
  });

  /* ---------------------------------------------------------------
     Inventory
     --------------------------------------------------------------- */
  var INV = window.MM_INVENTORY || [];
  var BODY = {suv:'SUV', sedan:'Sedan', coupe:'Coupe / convertible', truck:'Pickup truck', hatch:'Hatchback / wagon'};
  var byId = {};
  var fullName = function(v){ return [v.year, v.make, v.model, v.trim].filter(Boolean).join(' '); };
  var shortName = function(v){ return [v.make, v.model].join(' '); };
  INV.forEach(function(v, i){
    v.order = i;
    v.hay = [v.year, v.make, v.model, v.trim, v.color, v.drivetrain, v.fuel, v.engine, v.transmission, BODY[v.type], v.tier, v.stock, v.badge].join(' ').toLowerCase();
    byId[v.stock] = v;
  });
  var prices = INV.map(function(v){ return v.price; });
  var maxP = Math.max.apply(null, prices), minP = Math.min.apply(null, prices);

  /* ---------------------------------------------------------------
     Odometer: digits roll like a mechanical counter
     --------------------------------------------------------------- */
  function Odo(el){
    this.el = el; this.str = '';
  }
  Odo.prototype.set = function(str){
    str = String(str);
    var el = this.el;
    if (reduceMotion) { el.textContent = str; this.str = str; return; }
    if (str.length !== this.str.length) {
      el.innerHTML = str.split('').map(function(ch){
        if (/\d/.test(ch)) {
          var col = ''; for (var d = 0; d <= 9; d++) col += '<span>' + d + '</span>';
          return '<span class="d"><span>' + col + '</span></span>';
        }
        return '<span class="c">' + esc(ch) + '</span>';
      }).join('');
      el.setAttribute('aria-label', str);
      $$('.d > span', el).forEach(function(s){ s.style.transform = 'translateY(0)'; });
      void el.offsetWidth;
    }
    var cols = $$('.d > span', el), k = 0;
    str.split('').forEach(function(ch){
      if (/\d/.test(ch)) { cols[k].style.transform = 'translateY(' + (-1.08 * +ch) + 'em)'; k++; }
    });
    var cs = $$('.c', el), j = 0;
    str.split('').forEach(function(ch){ if (!/\d/.test(ch)) { if (cs[j]) cs[j].textContent = ch; j++; } });
    el.setAttribute('aria-label', str);
    this.str = str;
  };

  /* ---------------------------------------------------------------
     Header, menu, mobile bar
     --------------------------------------------------------------- */
  var header = $('#siteHeader'), nav = $('#mainNav'), menuBtn = $('#menuBtn'), mobileBar = $('#mobileBar');
  var story = $('#story');
  var menuOpen = false;
  function setMenu(open){
    menuOpen = open;
    nav.classList.toggle('open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (lenis) { open ? lenis.stop() : lenis.start(); }
    document.documentElement.style.overflow = open ? 'hidden' : '';
    header.classList.remove('tuck');
    header.classList.toggle('solid', open || pastStory);
  }
  menuBtn.addEventListener('click', function(){ setMenu(!menuOpen); });
  nav.addEventListener('click', function(e){ if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', function(e){ if (e.key === 'Escape' && menuOpen) setMenu(false); });

  var lastY = window.scrollY, pastStory = false;
  function updateHeader(y){
    var storyEnd = story.offsetTop + story.offsetHeight - window.innerHeight * 0.6;
    pastStory = y > storyEnd;
    header.classList.toggle('solid', pastStory || menuOpen);
    var dy = y - lastY;
    if (!menuOpen && Math.abs(dy) > 4) header.classList.toggle('tuck', dy > 0 && y > storyEnd + 200);
    lastY = y;
    mobileBar.classList.toggle('show', y > window.innerHeight * 0.7);
  }

  /* Active nav link */
  var links = $$('.main-nav a[href^="#"]');
  var secObs = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (!entry.isIntersecting) return;
      var id = entry.target.id;
      links.forEach(function(a){ a.classList.toggle('active', a.getAttribute('href') === '#' + id); });
    });
  }, {rootMargin:'-45% 0px -50% 0px'});
  ['story','spectrum','collection','standard','finance','sell','visit'].forEach(function(id){ var el = document.getElementById(id); if (el) secObs.observe(el); });

  /* ---------------------------------------------------------------
     Story: the Light Room film, scrubbed by scroll on a canvas
     --------------------------------------------------------------- */
  var FILM = {
    count: 242,
    desk: function(i){ return 'assets/film/d/f_' + ('000' + (i + 1)).slice(-4) + '.webp'; },
    mob:  function(i){ return 'assets/film/m/f_' + ('000' + (i + 1)).slice(-4) + '.webp'; },
    /* scroll progress -> frame. Flat stretches hold a frame while a chapter's words are on screen */
    map: [[0,0],[.05,0],[.30,80],[.45,80],[.62,161],[.76,161],[.92,241],[1,241]],
    chapters: [0, .375, .69, 1]
  };
  var film = (function(){
    var cv = $('#storyCanvas'), ctx = cv.getContext('2d', {alpha:false});
    var poster = $('#storyPoster');
    var portrait = window.innerWidth < window.innerHeight;
    var src = portrait ? FILM.mob : FILM.desk;
    var N = FILM.count;
    var imgs = new Array(N), ready = new Uint8Array(N);
    var cur = 0, lastDrawn = -1, dirty = true, firstDrawn = false, onFirst = null;
    var beats = $$('.beat', story), rail = $$('#storyRail button'), bar = $('#storyBar'), cue = $('#storyCue');
    var mapF = function(p){
      var m = FILM.map;
      for (var i = 1; i < m.length; i++) {
        if (p <= m[i][0]) { var a = m[i - 1], b = m[i], t = (p - a[0]) / ((b[0] - a[0]) || 1); return a[1] + (b[1] - a[1]) * t; }
      }
      return m[m.length - 1][1];
    };
    /* Load the frames that open each chapter first, then a coarse pass, then fill in */
    var order = [], seen = {};
    [0, 80, 161, 241].concat([16, 8, 4, 2, 1].reduce(function(acc, s){ for (var i = 0; i < N; i += s) acc.push(i); return acc; }, [])).forEach(function(i){
      if (!seen[i] && i < N) { seen[i] = 1; order.push(i); }
    });
    var q = 0, inflight = 0;
    function pump(){
      while (inflight < 6 && q < order.length) {
        (function(i){
          inflight++;
          var im = new Image();
          im.decoding = 'async';
          im.onload = function(){ ready[i] = 1; inflight--; if (Math.abs(i - cur) < 24) dirty = true; pump(); };
          im.onerror = function(){ inflight--; pump(); };
          im.src = src(i);
          imgs[i] = im;
        })(order[q++]);
      }
    }
    pump();
    function nearest(i){
      for (var d = 0; d < N; d++) { if (ready[i - d]) return imgs[i - d]; if (ready[i + d]) return imgs[i + d]; }
      return null;
    }
    function size(){
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(cv.clientWidth * dpr); cv.height = Math.round(cv.clientHeight * dpr);
      dirty = true;
    }
    function draw(im){
      var cw = cv.width, ch = cv.height, iw = im.naturalWidth, ih = im.naturalHeight, s, w, h, x, y;
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, cw, ch);
      if (portrait) {
        s = Math.max(cw / iw, ch * 0.62 / ih); w = iw * s; h = ih * s; x = (cw - w) / 2; y = Math.max(0, ch * 0.42 - h / 2);
        ctx.drawImage(im, x, y, w, h);
        var g = ctx.createLinearGradient(0, y + h * 0.68, 0, y + h); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, '#000');
        ctx.fillStyle = g; ctx.fillRect(0, y + h * 0.68, cw, h * 0.32 + 2);
        var g2 = ctx.createLinearGradient(0, y, 0, y + h * 0.14); g2.addColorStop(0, '#000'); g2.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g2; ctx.fillRect(0, y - 1, cw, h * 0.14 + 1);
      } else {
        s = Math.max(cw / iw, ch / ih); w = iw * s; h = ih * s; x = (cw - w) / 2; y = (ch - h) / 2;
        ctx.drawImage(im, x, y, w, h);
      }
    }
    var lengthVh = function(){ return portrait ? 460 : 560; };
    story.style.height = lengthVh() + 'vh';
    function progress(){
      var r = story.getBoundingClientRect(), span = r.height - window.innerHeight;
      return span > 0 ? clamp(-r.top / span, 0, 1) : 0;
    }
    var chapter = -1;
    function tick(){
      var p = progress(), target = mapF(p);
      cur = reduceMotion ? target : cur + (target - cur) * 0.2;
      if (Math.abs(target - cur) < 0.05) cur = target;
      var f = Math.round(cur);
      if (f !== lastDrawn || dirty) {
        var im = ready[f] ? imgs[f] : nearest(f);
        if (im) {
          draw(im); lastDrawn = ready[f] ? f : -1; dirty = false;
          if (!firstDrawn) { firstDrawn = true; poster.classList.add('gone'); if (onFirst) onFirst(); }
        }
      }
      beats.forEach(function(b){ b.classList.toggle('on', p >= +b.dataset.from && p < +b.dataset.to); });
      var ch = 0; FILM.chapters.forEach(function(c, i){ if (p >= c - 0.1) ch = i; });
      if (ch !== chapter) { chapter = ch; rail.forEach(function(b, i){ b.classList.toggle('on', i === ch); b.setAttribute('aria-current', i === ch ? 'step' : 'false'); }); }
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      cue.classList.toggle('gone', p > 0.015);
      story.classList.toggle('rail-off', (p > .56 && p < .8) || p > .87);
    }
    rail.forEach(function(b){
      b.addEventListener('click', function(){
        var p = +b.dataset.p;
        scrollToY(story.offsetTop + p * (story.offsetHeight - window.innerHeight) + (p === 1 ? -2 : 2));
      });
    });
    window.addEventListener('resize', function(){
      var nowPortrait = window.innerWidth < window.innerHeight;
      if (nowPortrait !== portrait) { portrait = nowPortrait; story.style.height = lengthVh() + 'vh'; }
      size();
    });
    size();
    return {tick:tick, whenFirst:function(fn){ if (firstDrawn) fn(); else onFirst = fn; }};
  })();
  $$('[data-beat-price]').forEach(function(el){ var v = byId[el.dataset.beatPrice]; if (v) el.textContent = money(v.price); });
  $('#floorCount').textContent = INV.length;
  $('#floorHigh').textContent = money(maxP);
  $('#floorLow').textContent = money(minP);

  /* ---------------------------------------------------------------
     Intro: the eight ceiling panels switch on, then the page is revealed
     --------------------------------------------------------------- */
  (function(){
    var intro = $('#intro');
    var reveal = function(){ story.classList.add('ready'); };
    if (document.documentElement.classList.contains('no-intro') || reduceMotion) { intro.remove(); reveal(); return; }
    try { sessionStorage.setItem('mm-intro', '1'); } catch (e) {}
    if (lenis) lenis.stop();
    var panels = $$('.intro-ceiling i', intro), seq = [0, 3, 1, 2, 4, 7, 5, 6];
    seq.forEach(function(n, k){ setTimeout(function(){ panels[n].classList.add('on'); }, 160 + k * 85); });
    var t0 = performance.now(), done = false;
    function finish(){
      if (done) return; done = true;
      var wait = Math.max(0, 1250 - (performance.now() - t0));
      setTimeout(function(){
        intro.classList.add('lit');
        setTimeout(function(){
          intro.classList.add('out');
          if (lenis) lenis.start();
          setTimeout(reveal, 250);
          setTimeout(function(){ intro.remove(); }, 1200);
        }, 420);
      }, wait);
    }
    film.whenFirst(finish);
    setTimeout(finish, 2600);
  })();

  /* ---------------------------------------------------------------
     Makes on the floor: a marquee that speeds up with your scroll
     --------------------------------------------------------------- */
  var makes = (function(){
    var track = $('#makesTrack');
    var list = [];
    INV.slice().sort(function(a, b){ return b.price - a.price; }).forEach(function(v){
      var m = v.make === 'Mercedes-AMG' ? 'Mercedes' : v.make === 'Mercedes-Benz' ? 'Mercedes' : v.make;
      if (list.indexOf(m) === -1) list.push(m);
    });
    var html = list.map(function(m){ return '<span>' + esc(m) + '</span>'; }).join('');
    track.innerHTML = html + html;
    track.lastElementChild.setAttribute('aria-hidden', 'true');
    $$('span', track).slice(list.length).forEach(function(s){ s.setAttribute('aria-hidden', 'true'); });
    var x = 0, half = 0, vel = 0, hover = false;
    var measure = function(){ half = track.scrollWidth / 2; };
    measure(); window.addEventListener('resize', measure);
    if (document.fonts) document.fonts.ready.then(measure);
    track.addEventListener('mouseenter', function(){ hover = true; });
    track.addEventListener('mouseleave', function(){ hover = false; });
    return {tick:function(dy, dt){
      if (reduceMotion || !half) return;
      vel += (clamp(dy, -80, 80) * 0.6 - vel) * 0.08;
      var speed = hover ? 0.15 : 1;
      x -= (0.045 * dt + Math.abs(vel) * 0.9) * speed;
      if (x <= -half) x += half;
      track.style.transform = 'translate3d(' + x.toFixed(2) + 'px,0,0)';
    }};
  })();

  /* ---------------------------------------------------------------
     Spectrum: the floor from most to least expensive, pinned and scrolled sideways
     --------------------------------------------------------------- */
  var spectrum = (function(){
    var sec = $('#spectrum'), vp = $('#specViewport'), track = $('#specTrack');
    var sorted = INV.slice().sort(function(a, b){ return b.price - a.price; });
    var n = Math.min(12, sorted.length), picks = [];
    for (var k = 0; k < n; k++) picks.push(sorted[Math.round(k * (sorted.length - 1) / (n - 1))]);
    $('#specHigh').textContent = money(maxP);
    $('#specLow').textContent = money(minP);
    track.innerHTML = picks.map(function(v, i){
      return '<li class="spec-card" data-id="' + esc(v.stock) + '" data-i="' + i + '">' +
        '<figure><img src="' + esc(v.photo) + '" alt="' + esc(fullName(v)) + '" width="1600" height="1067" loading="lazy" decoding="async"></figure>' +
        '<div class="spec-meta"><div><span class="mono">' + v.year + ' · ' + (v.tier === 'marque' ? 'Marque' : 'Mile') + '</span><b>' + esc(shortName(v)) + '</b></div><span class="num">' + money(v.price) + '</span></div>' +
      '</li>';
    }).join('');
    var cards = $$('.spec-card', track);
    var lp = Math.log(maxP), ls = Math.log(minP);
    var pos = function(price){ return (lp - Math.log(price)) / ((lp - ls) || 1); };
    var scale = $('#specScale');
    INV.forEach(function(v){ var u = document.createElement('u'); u.style.left = (pos(v.price) * 100) + '%'; scale.appendChild(u); });
    var needle = $('#specNeedle'), odo = new Odo($('#specOdo')), tierEl = $('#specTier'), nameEl = $('#specName');
    var active = -1, travel = 0, pinned = false;
    function setActive(i){
      if (i === active) return;
      active = i;
      var v = picks[i];
      cards.forEach(function(c, j){ c.classList.toggle('lit', j === i); });
      odo.set(money(v.price));
      tierEl.textContent = v.tier === 'marque' ? 'Marque · luxury & performance' : 'Mile · everyday';
      nameEl.textContent = fullName(v) + ' · ' + v.miles.toLocaleString('en-US') + ' mi';
      needle.style.left = (pos(v.price) * 100) + '%';
    }
    function layout(){
      pinned = !narrowMq.matches;
      if (pinned) {
        travel = Math.max(0, track.scrollWidth - window.innerWidth);
        sec.style.height = (window.innerHeight + travel * 1.15) + 'px';
      } else {
        sec.style.height = '';
        track.style.transform = '';
      }
    }
    layout();
    window.addEventListener('resize', layout);
    if (document.fonts) document.fonts.ready.then(layout);
    setActive(0);
    vp.addEventListener('scroll', function(){
      if (pinned) return;
      var mid = vp.scrollLeft + vp.clientWidth / 2, best = 0, bd = Infinity;
      cards.forEach(function(c, j){ var d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid); if (d < bd) { bd = d; best = j; } });
      setActive(best);
    }, {passive:true});
    track.addEventListener('click', function(e){
      var c = e.target.closest('.spec-card');
      if (c) openCar(c.dataset.id);
    });
    return {tick:function(){
      if (!pinned) return;
      var r = sec.getBoundingClientRect(), span = sec.offsetHeight - window.innerHeight;
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      var p = span > 0 ? clamp(-r.top / span, 0, 1) : 0;
      track.style.transform = 'translate3d(' + (-p * travel).toFixed(1) + 'px,0,0)';
      setActive(Math.round(p * (picks.length - 1)));
    }};
  })();

  /* ---------------------------------------------------------------
     Collection: one card per car in assets/inventory.js
     --------------------------------------------------------------- */
  var grid = $('#carGrid');
  grid.insertAdjacentHTML('beforeend', INV.map(function(v, i){
    var specs = '<span><i class="ph ph-gauge"></i><span class="num">' + v.miles.toLocaleString('en-US') + '</span> mi</span>';
    if (v.drivetrain) specs += '<span><i class="ph ph-steering-wheel"></i>' + esc(v.drivetrain) + '</span>';
    if (v.fuel === 'Electric') specs += '<span><i class="ph ph-lightning"></i>Electric</span>';
    else if (v.fuel === 'Hybrid') specs += '<span><i class="ph ph-leaf"></i>Hybrid</span>';
    else if (/manual/i.test(v.transmission)) specs += '<span><i class="ph ph-gear-six"></i>Manual</span>';
    var tag = v.wasPrice ? '<span class="car-tag drop">Price drop</span>' : (v.badge && v.badge !== 'Manual' ? '<span class="car-tag">' + esc(v.badge) + '</span>' : '');
    return '<article class="car reveal" style="--i:' + (i % 3) + ';view-transition-name:car-' + esc(v.stock) + '" data-id="' + esc(v.stock) + '">' +
      '<div class="car-photo"><img src="' + esc(v.photo) + '" alt="' + esc(fullName(v) + ', ' + v.color) + '" width="1600" height="1067" loading="lazy" decoding="async"></div>' +
      tag +
      '<div class="car-body">' +
        '<div class="car-top"><span class="mono">' + v.year + ' · ' + esc(v.make) + '</span><span class="mono car-tier ' + v.tier + '">' + (v.tier === 'marque' ? 'Marque' : 'Mile') + '</span></div>' +
        '<h3><button type="button" class="car-link">' + esc(v.model) + '</button></h3>' +
        '<span class="car-trim">' + (v.trim ? esc(v.trim) : esc(v.color)) + '</span>' +
        '<span class="car-specs">' + specs + '</span>' +
        '<div class="car-foot">' +
          '<span class="car-price num">' + (v.wasPrice ? '<s>' + money(v.wasPrice) + '</s>' : '') + money(v.price) + '<sup>*</sup></span>' +
          '<span class="car-est">est.<b class="num">' + money(estFor(v.price)) + '/mo</b></span>' +
        '</div>' +
      '</div>' +
    '</article>';
  }).join(''));
  $('#invTotal').textContent = INV.length;
  ['all', 'marque', 'mile'].forEach(function(t){
    $('[data-count="' + t + '"]').textContent = t === 'all' ? INV.length : INV.filter(function(v){ return v.tier === t; }).length;
  });
  if (window.MM_INVENTORY_UPDATED) {
    var updated = new Date(window.MM_INVENTORY_UPDATED + 'T12:00:00');
    $('span', $('#invFresh')).textContent = INV.length + ' on the floor, updated ' + updated.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
    $('#invFresh').hidden = false;
  }
  /* "Car you're interested in" in the finance form lists the same cars */
  var otherOpt = $('#vehicle option[value="other"]');
  INV.slice().sort(function(a, b){ return b.price - a.price; }).forEach(function(v){
    var o = document.createElement('option');
    o.textContent = fullName(v);
    $('#vehicle').insertBefore(o, otherOpt);
  });

  var cars = $$('#carGrid .car');
  var countOdo = new Odo($('#invCount'));
  var state = {tier:'all', body:'all', budget:'all', q:'', sort:'featured'};
  var SORTS = {
    'featured':   function(a, b){ return a.order - b.order; },
    'price-asc':  function(a, b){ return a.price - b.price || a.order - b.order; },
    'price-desc': function(a, b){ return b.price - a.price || a.order - b.order; },
    'miles-asc':  function(a, b){ return a.miles - b.miles; },
    'year-desc':  function(a, b){ return b.year - a.year || b.price - a.price; }
  };
  function inBudget(v){
    if (state.budget === 'all') return true;
    if (state.budget === '100000+') return v.price >= 100000;
    return v.price < +state.budget;
  }
  function applyFilters(){
    var shown = 0, words = state.q ? state.q.split(/\s+/) : [];
    cars.slice().sort(function(a, b){ return SORTS[state.sort](byId[a.dataset.id], byId[b.dataset.id]); }).forEach(function(car){
      var v = byId[car.dataset.id];
      var ok = (state.tier === 'all' || v.tier === state.tier) &&
               (state.body === 'all' || v.type === state.body) &&
               inBudget(v) &&
               words.every(function(w){ return v.hay.indexOf(w) !== -1; });
      car.hidden = !ok;
      if (ok) { shown++; car.classList.add('in'); }
      grid.appendChild(car);
    });
    countOdo.set(String(shown));
    $('#invEmpty').classList.toggle('show', shown === 0);
    $$('.seg button').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.tier === state.tier); });
    $$('.col-tools .chip').forEach(function(c){ c.setAttribute('aria-pressed', c.dataset.body === state.body); });
    $('#invBudget').value = state.budget;
  }
  function update(patch){
    Object.keys(patch).forEach(function(k){ state[k] = patch[k]; });
    if (document.startViewTransition && !reduceMotion) document.startViewTransition(applyFilters);
    else applyFilters();
  }
  $$('.seg button').forEach(function(b){ b.addEventListener('click', function(){ update({tier:b.dataset.tier}); }); });
  $$('.col-tools .chip').forEach(function(c){ c.addEventListener('click', function(){ update({body:c.dataset.body}); }); });
  $('#invSort').addEventListener('change', function(e){ update({sort:e.target.value}); });
  $('#invBudget').addEventListener('change', function(e){ update({budget:e.target.value}); });
  var searchTimer;
  $('#invSearch').addEventListener('input', function(e){
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function(){ state.q = e.target.value.trim().toLowerCase(); applyFilters(); }, 150);
  });
  $('#resetFilters').addEventListener('click', function(){
    $('#invSearch').value = '';
    update({tier:'all', body:'all', budget:'all', q:''});
  });
  $$('[data-filter-tier]').forEach(function(a){
    a.addEventListener('click', function(){ state.tier = a.dataset.filterTier; applyFilters(); });
  });
  applyFilters();

  /* Payment calculator */
  var rPrice = $('#rPrice'), rDown = $('#rDown'), rApr = $('#rApr');
  var tPrice = $('#tPrice'), tDown = $('#tDown');
  var price = +rPrice.value, down = +rDown.value, MAX_PRICE = 250000;
  var term = 60, shownPay = 0, rafId = null;
  var parseMoney = function(v){ var n = parseInt(String(v).replace(/[^\d]/g, ''), 10); return isNaN(n) ? 0 : n; };
  function fill(input){
    var span = input.max - input.min;
    var p = span > 0 ? (input.value - input.min) / span * 100 : 0;
    input.style.setProperty('--p', p + '%');
  }
  function animateTo(target){
    if (reduceMotion) { $('#payOut').textContent = money(target); shownPay = target; return; }
    cancelAnimationFrame(rafId);
    var from = shownPay, start = performance.now(), dur = 420;
    (function step(now){
      var t = Math.min(1, (now - start) / dur), k = 1 - Math.pow(1 - t, 3);
      shownPay = from + (target - from) * k;
      $('#payOut').textContent = money(shownPay);
      if (t < 1) rafId = requestAnimationFrame(step);
    })(start);
  }
  function calc(){
    /* Mid-typing values ("6" on the way to "60000") must not permanently clamp the down payment */
    var typing = document.activeElement === tPrice || document.activeElement === tDown;
    var capped = Math.min(down, price);
    if (!typing) down = capped;
    rPrice.value = price;
    rDown.max = Math.min(price, 15000);
    rDown.value = capped;
    var apr = +rApr.value;
    var financed = Math.max(0, price - capped);
    /* Don't rewrite a box while someone is typing in it; it reformats on blur */
    if (document.activeElement !== tPrice) tPrice.value = money(price);
    if (document.activeElement !== tDown) tDown.value = money(capped);
    $('#oApr').textContent = apr.toFixed(1) + '%';
    $('#oTerm').textContent = term + ' months';
    $('#payDetail').textContent = 'Amount financed ' + money(financed) + ' over ' + term + ' months';
    [rPrice, rDown, rApr].forEach(fill);
    animateTo(payment(financed, apr, term));
  }
  rPrice.addEventListener('input', function(){ price = +rPrice.value; calc(); });
  rDown.addEventListener('input', function(){ down = +rDown.value; calc(); });
  rApr.addEventListener('input', calc);
  /* Typed amounts can go past the slider range; the slider just pins at its end */
  [[tPrice, function(n){ price = Math.min(n, MAX_PRICE); }], [tDown, function(n){ down = n; }]].forEach(function(pair){
    var box = pair[0], set = pair[1];
    box.addEventListener('focus', function(){ box.select(); });
    box.addEventListener('input', function(){ set(parseMoney(box.value)); calc(); });
    box.addEventListener('blur', calc);
    box.addEventListener('keydown', function(e){ if (e.key === 'Enter') box.blur(); });
  });
  $$('.terms .chip').forEach(function(c){
    c.addEventListener('click', function(){
      term = +c.dataset.term;
      $$('.terms .chip').forEach(function(x){ x.setAttribute('aria-pressed', x === c); });
      calc();
    });
  });
  function setCalcPrice(p){
    price = p;
    down = Math.round(p * 0.1 / 50) * 50;
    calc();
  }
  calc();

  /* ---------------------------------------------------------------
     Car sheet (quick view)
     --------------------------------------------------------------- */
  var dlg = $('#quickview'), current = null;
  function openCar(id){
    var v = byId[id];
    if (!v) return;
    current = v;
    var img = $('#qvImg');
    img.style.animation = 'none'; void img.offsetWidth; img.style.animation = '';
    img.src = v.photo;
    img.alt = fullName(v) + ', ' + v.color;
    $('#qvTier').textContent = (v.tier === 'marque' ? 'Marque' : 'Mile') + ' · Photographed in the Light Room';
    $('#qvYear').textContent = v.year + '  ·  Stock ' + v.stock;
    $('#qvTitle').textContent = [v.make, v.model, v.trim].filter(Boolean).join(' ');
    $('#qvPrice').textContent = money(v.price) + '*';
    $('#qvWas').textContent = v.wasPrice ? money(v.wasPrice) : '';
    $('#qvEst').textContent = 'or about ' + money(estFor(v.price)) + '/mo';
    var rows = [
      ['Mileage', v.miles.toLocaleString('en-US') + ' mi'],
      ['Body', BODY[v.type]],
      ['Engine', v.engine], ['Transmission', v.transmission],
      ['Drivetrain', v.drivetrain], ['Fuel', v.fuel],
      ['Colour', v.color]
    ].filter(function(r){ return r[1]; });
    var html = rows.map(function(r, i){
      var wide = rows.length % 2 && i === rows.length - 1;
      return '<div' + (wide ? ' class="wide"' : '') + '><dt>' + r[0] + '</dt><dd>' + esc(r[1]) + '</dd></div>';
    }).join('');
    if (v.vin) html += '<div class="wide"><dt>VIN</dt><dd class="vin">' + esc(v.vin) + '</dd></div>';
    $('#qvSpecs').innerHTML = html;
    if (lenis) lenis.stop();
    if (typeof dlg.showModal === 'function') dlg.showModal(); else dlg.setAttribute('open', '');
  }
  function closeDlg(){ if (dlg.open) dlg.close(); }
  dlg.addEventListener('close', function(){ if (lenis) lenis.start(); });
  cars.forEach(function(car){ car.addEventListener('click', function(){ openCar(car.dataset.id); }); });
  $$('[data-open]').forEach(function(a){
    a.addEventListener('click', function(e){ e.preventDefault(); openCar(a.dataset.open); });
  });
  $('#qvClose').addEventListener('click', closeDlg);
  dlg.addEventListener('click', function(e){ if (e.target === dlg) closeDlg(); });
  function goTo(id){
    closeDlg();
    if (lenis) lenis.start();
    var el = document.getElementById(id);
    setTimeout(function(){ if (lenis) lenis.start(); scrollToEl(el); }, 80);
  }
  $('#qvApply').addEventListener('click', function(){
    if (current) $('#vehicle').value = fullName(current);
    setCalcPrice(current.price);
    goTo('finance');
  });
  $('#qvCalc').addEventListener('click', function(){
    setCalcPrice(current.price);
    goTo('calculator');
  });

  /* ---------------------------------------------------------------
     Forms: inline validation + success state (front-end only)
     --------------------------------------------------------------- */
  function wireForm(form, sendingLabel){
    function validateField(input){
      var f = input.closest('.field');
      var ok = input.checkValidity() && (input.value.trim() !== '' || !input.required);
      f.classList.toggle('invalid', !ok);
      input.setAttribute('aria-invalid', ok ? 'false' : 'true');
      return ok;
    }
    $$('[required]', form).forEach(function(input){
      input.addEventListener('blur', function(){ if (input.value) validateField(input); });
      input.addEventListener('input', function(){ if (input.closest('.field').classList.contains('invalid')) validateField(input); });
    });
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var bad = $$('[required]', form).filter(function(i){ return !validateField(i); });
      if (bad.length) { bad[0].focus(); return; }
      var btn = $('button[type=submit]', form);
      btn.classList.add('loading');
      btn.innerHTML = '<i class="ph ph-circle-notch"></i>' + sendingLabel;
      // Front-end only: connect this to your CRM / form service.
      setTimeout(function(){ form.classList.add('done'); }, 700);
    });
  }
  wireForm($('#applyForm'), 'Sending');
  wireForm($('#sellForm'), 'Sending');

  /* ---------------------------------------------------------------
     Opening hours, live in Denver time
     --------------------------------------------------------------- */
  (function(){
    var HOURS = {0:[11,17], 1:[9,19], 2:[9,19], 3:[9,19], 4:[9,19], 5:[9,19], 6:[9,18]};
    var DAYS = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var el = $('#openStatus');
    var fmt = function(h){ return (h % 12 || 12) + (h < 12 ? ' AM' : ' PM'); };
    try {
      var parts = new Intl.DateTimeFormat('en-US', {timeZone:'America/Denver', weekday:'short', hour:'numeric', minute:'numeric', hour12:false}).formatToParts(new Date());
      var get = function(t){ var p = parts.filter(function(x){ return x.type === t; })[0]; return p ? p.value : ''; };
      var day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(get('weekday'));
      var now = (+get('hour') % 24) + (+get('minute')) / 60;
      var h = HOURS[day], text, open = false;
      if (now >= h[0] && now < h[1]) { open = true; text = 'Open now · until ' + fmt(h[1]); }
      else {
        var d = now < h[0] ? day : (day + 1) % 7;
        text = 'Closed · opens ' + fmt(HOURS[d][0]) + (d === day ? ' today' : d === (day + 1) % 7 ? ' tomorrow' : ' ' + DAYS[d]);
      }
      el.classList.add(open ? 'open' : 'closed');
      $('span', el).textContent = text;
    } catch (e) { el.hidden = true; }
  })();

  /* ---------------------------------------------------------------
     Map: Leaflet (self-hosted), loaded only when it nears the screen
     --------------------------------------------------------------- */
  (function(){
    var LOT = [39.7712, -104.9786]; // 1 Foundry Lane, Denver (fictional address)
    var mapEl = $('#lotMap');
    var directions = $('#mapDirections');
    var locateBtn = $('#mapLocate');
    var map = null, you = null;

    function fallback(){
      var f = document.createElement('iframe');
      f.title = 'Map of Marque & Mile, Denver';
      f.src = 'https://www.google.com/maps?q=' + LOT.join(',') + '&z=15&output=embed';
      f.loading = 'lazy';
      f.referrerPolicy = 'no-referrer-when-downgrade';
      mapEl.replaceWith(f);
      locateBtn.hidden = true;
    }
    /* The card covers the left of the map on desktop and the bottom on phones */
    function homeCenter(zoom){
      var size = map.getSize();
      var shift = narrowMq.matches ? L.point(0, -size.y * 0.05) : L.point(size.x * 0.2, 0);
      return map.unproject(map.project(LOT, zoom).subtract(shift), zoom);
    }
    function goHome(animate){
      if (animate && !reduceMotion) map.flyTo(homeCenter(15), 15, {duration:1.1});
      else map.setView(homeCenter(15), 15);
    }
    function init(){
      if (!window.L) { fallback(); return; }
      var touch = L.Browser.mobile;
      map = L.map(mapEl, {zoomControl:false, scrollWheelZoom:false, dragging:!touch, tap:false, zoomSnap:0.5});
      map.attributionControl.setPrefix(false);
      map.setView(LOT, reduceMotion ? 15 : 11);
      if (!reduceMotion) setTimeout(function(){ map.flyTo(homeCenter(15), 15, {duration:2.2}); }, 300);
      else goHome(false);
      var layers = {
        map: L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom:19, attribution:'&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
        }),
        satellite: L.layerGroup([
          L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom:19, attribution:'Imagery &copy; Esri, Maxar, Earthstar Geographics'
          }),
          L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}', {maxZoom:19}),
          L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}', {maxZoom:19})
        ])
      };
      var active = layers.map.addTo(map);
      mapEl.classList.add('tiles-dark');
      var narrow = narrowMq.matches;
      var pin = L.marker(LOT, {
        title:'Marque & Mile', alt:'Marque & Mile', riseOnHover:true, keyboard:true,
        icon: L.divIcon({
          className:'', iconSize:[64, 64], iconAnchor:[32, 32], popupAnchor:[0, -26],
          tooltipAnchor: narrow ? [0, -30] : [30, 0],
          html:'<div class="lot-marker"><span class="pulse"></span><span class="pad"><i><b></b><b></b><b></b><b></b></i></span></div>'
        })
      }).addTo(map);
      pin.bindTooltip('Marque & Mile', {permanent:true, direction: narrow ? 'top' : 'right', className:'lot-label', interactive:false});
      pin.bindPopup(
        '<div class="lot-pop"><b>Marque &amp; Mile</b>' +
        '<p>1 Foundry Lane<br>Denver, CO 80216</p>' +
        '<div class="row"><a class="go" href="' + directions.href + '" target="_blank" rel="noopener">Directions</a><a href="tel:+13035550148">Call</a></div></div>',
        {minWidth:210, maxWidth:240, autoPanPaddingTopLeft:[24, 90], autoPanPaddingBottomRight:[90, 24]}
      );
      $('#mapUi').hidden = false;
      $('.map-layers').addEventListener('click', function(e){
        var b = e.target.closest('button');
        if (!b || layers[b.dataset.layer] === active) return;
        map.removeLayer(active);
        active = layers[b.dataset.layer].addTo(map);
        mapEl.classList.toggle('tiles-dark', b.dataset.layer === 'map');
        $$('.map-layers button').forEach(function(x){ x.setAttribute('aria-pressed', x === b); });
      });
      $('.map-tools').addEventListener('click', function(e){
        var b = e.target.closest('button');
        if (!b) return;
        if (b.dataset.act === 'in') map.zoomIn();
        else if (b.dataset.act === 'out') map.zoomOut();
        else goHome(true);
      });
      /* Scroll-wheel zoom only after a click, so the page keeps scrolling past the map */
      var hint = $('#mapHint'), hintTimer;
      mapEl.addEventListener('wheel', function(){
        if (map.scrollWheelZoom.enabled()) return;
        hint.classList.add('show');
        clearTimeout(hintTimer);
        hintTimer = setTimeout(function(){ hint.classList.remove('show'); }, 1500);
      }, {passive:true});
      map.on('click', function(){ map.scrollWheelZoom.enable(); hint.classList.remove('show'); });
      map.on('mouseout', function(){ map.scrollWheelZoom.disable(); });
    }
    if (!('geolocation' in navigator)) locateBtn.hidden = true;
    locateBtn.addEventListener('click', function(){
      var dist = $('#mapDist');
      locateBtn.setAttribute('aria-busy', 'true');
      navigator.geolocation.getCurrentPosition(function(pos){
        locateBtn.removeAttribute('aria-busy');
        var me = [pos.coords.latitude, pos.coords.longitude];
        directions.href = 'https://www.google.com/maps/dir/?api=1&origin=' + me.join(',') + '&destination=' + LOT.join(',');
        if (!map) return;
        var miles = map.distance(me, LOT) / 1609.344;
        dist.textContent = 'You’re about ' + (miles < 10 ? miles.toFixed(1) : Math.round(miles).toLocaleString('en-US')) + ' miles away (straight line)';
        dist.hidden = false;
        if (you) map.removeLayer(you);
        you = L.layerGroup([
          L.polyline([me, LOT], {color:'#edece6', weight:2, opacity:.9, dashArray:'2 8', lineCap:'round'}),
          L.marker(me, {title:'You are here', icon:L.divIcon({className:'', iconSize:[18, 18], html:'<div class="you-dot"></div>'})})
            .bindTooltip('You', {direction:'top', offset:[0, -10]})
        ]).addTo(map);
        var size = map.getSize();
        map.flyToBounds(L.latLngBounds([me, LOT]), {
          paddingTopLeft: narrowMq.matches ? [40, 90] : [Math.round(size.x * 0.45), 90],
          paddingBottomRight: narrowMq.matches ? [70, 150] : [90, 60],
          maxZoom:15, duration: reduceMotion ? 0 : 1.4
        });
      }, function(){
        locateBtn.removeAttribute('aria-busy');
        dist.textContent = 'Couldn’t get your location. Tap Get directions instead.';
        dist.hidden = false;
      }, {timeout:10000, maximumAge:300000});
    });
    function load(){
      if (window.L) { init(); return; }
      var s = document.createElement('script');
      s.src = 'assets/vendor/leaflet/leaflet.min.js';
      s.onload = init;
      s.onerror = fallback;
      document.head.appendChild(s);
    }
    var mapObs = new IntersectionObserver(function(entries){
      if (entries[0].isIntersecting) { mapObs.disconnect(); load(); }
    }, {rootMargin:'400px 0px'});
    mapObs.observe(mapEl);
  })();

  /* ---------------------------------------------------------------
     The standard: the sticky picture follows the step you're reading
     --------------------------------------------------------------- */
  (function(){
    var steps = $$('.std-step'), imgs = $$('.std-frame img'), panels = $$('.std-panels i');
    var setStep = function(n){
      steps.forEach(function(s){ s.classList.toggle('on', +s.dataset.step === n); });
      imgs.forEach(function(im){ im.classList.toggle('on', +im.dataset.step <= n); });
      panels.forEach(function(p, i){ p.classList.toggle('on', i <= n); });
    };
    var obs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if (e.isIntersecting) setStep(+e.target.dataset.step); });
    }, {rootMargin:'-45% 0px -45% 0px'});
    steps.forEach(function(s){ obs.observe(s); });
    setStep(0);
  })();

  /* ---------------------------------------------------------------
     Headings rise word by word; blocks fade up
     --------------------------------------------------------------- */
  $$('.split').forEach(function(el){
    var words = el.textContent.trim().split(/\s+/);
    el.setAttribute('aria-label', el.textContent.trim());
    el.innerHTML = words.map(function(w, i){ return '<span class="w" aria-hidden="true"><span style="--wi:' + i + '">' + esc(w) + '</span></span>'; }).join(' ');
  });
  var reveals = $$('.reveal, .split');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, {threshold:.12, rootMargin:'0px 0px -6% 0px'});
    reveals.forEach(function(el){ io.observe(el); });
  } else {
    reveals.forEach(function(el){ el.classList.add('in'); });
  }

  /* ---------------------------------------------------------------
     Footer wordmark: stretches from condensed to wide as it arrives
     --------------------------------------------------------------- */
  var footMark = (function(){
    var el = $('#footMark'), box = el.parentElement, widths = null;
    var STOPS = [50, 75, 100, 125, 150];
    function measure(){
      var prev = [el.style.fontSize, el.style.fontStretch];
      el.style.fontSize = '100px';
      widths = STOPS.map(function(s){ el.style.fontStretch = s + '%'; return el.getBoundingClientRect().width; });
      el.style.fontSize = prev[0]; el.style.fontStretch = prev[1];
    }
    function widthAt(s){
      var i = Math.min(STOPS.length - 2, Math.floor((s - 50) / 25)), t = (s - STOPS[i]) / 25;
      return widths[i] + (widths[i + 1] - widths[i]) * t;
    }
    var lastS = -1;
    function apply(s){
      if (!widths) return;
      s = Math.round(s * 2) / 2;
      if (s === lastS) return;
      lastS = s;
      var target = box.clientWidth * 0.96;
      el.style.fontStretch = s + '%';
      el.style.fontSize = (100 * target / widthAt(s)).toFixed(2) + 'px';
    }
    if (document.fonts) document.fonts.ready.then(function(){ measure(); apply(reduceMotion ? 120 : 50); });
    window.addEventListener('resize', function(){ measure(); var s = lastS; lastS = -1; apply(s < 0 ? 120 : s); });
    return {tick:function(){
      if (!widths || reduceMotion) return;
      var r = box.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) return;
      var p = clamp((window.innerHeight - r.top) / (window.innerHeight * 0.8), 0, 1);
      apply(50 + 100 * (1 - Math.pow(1 - p, 2)));
    }};
  })();

  /* ---------------------------------------------------------------
     Cursor: a "View" disc over cars (mouse and trackpad only)
     --------------------------------------------------------------- */
  var cursor = (function(){
    if (!finePointer || reduceMotion) return {tick:function(){}};
    var el = $('#cursor'), mx = -200, my = -200, x = -200, y = -200;
    document.addEventListener('mousemove', function(e){ mx = e.clientX; my = e.clientY; }, {passive:true});
    document.addEventListener('mouseover', function(e){
      var over = !!e.target.closest('.car, .spec-card');
      el.classList.toggle('show', over);
    });
    document.addEventListener('mouseleave', function(){ el.classList.remove('show'); });
    return {tick:function(){
      x += (mx - x) * 0.22; y += (my - y) * 0.22;
      el.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
    }};
  })();

  /* ---------------------------------------------------------------
     One frame loop for everything scroll-linked
     --------------------------------------------------------------- */
  var prevY = window.scrollY, prevT = performance.now();
  (function loop(now){
    var y = window.scrollY, dy = y - prevY, dt = Math.min(64, now - prevT);
    prevY = y; prevT = now;
    film.tick();
    spectrum.tick();
    makes.tick(dy, dt);
    footMark.tick();
    cursor.tick();
    updateHeader(y);
    requestAnimationFrame(loop);
  })(performance.now());

  $('#year').textContent = new Date().getFullYear();
})();
