/**
 * Background animation — falling "science" glyphs drifting down the page like snow.
 * A fixed, full-viewport <canvas> sits behind the content (z-index: -1) and draws a
 * handful of monochrome science glyphs with a slow sway + rotation + tumble, tinted
 * with the theme's accent colour so they follow light/dark and any accent the user
 * picks. They read as a subtle ambient field rather than a busy foreground.
 *
 * Settings come from window.themeConfig.motion.background_animation (see _config.yml):
 *   enabled, opacity, count, speed, size, icons
 * Reduced-motion users are skipped entirely.
 */
(function () {
  'use strict';

  function init() {
    var cfg = (window.themeConfig && window.themeConfig.motion && window.themeConfig.motion.background_animation) || {};
    if (cfg.enabled === false) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (document.getElementById('rc-bg-canvas')) return; // only one instance

    var canvas = document.createElement('canvas');
    canvas.id = 'rc-bg-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');

    // A larger, playful set of monochrome science glyphs (no emoji — emoji keep
    // their own fixed colours and cannot be re-tinted, so we draw plain text
    // glyphs and paint them with the accent colour below).
    var icons = (cfg.icons && cfg.icons.length)
      ? cfg.icons
      : ['⚛', '⚗', '⚙', '✚', '✦', '◆', '◉', '◈', '✳', '∑', 'π', '∞', '∆', '∴', 'λ', 'Ω', '⊕', '⊳', '▣', '✽', '⟐', '⁂'];
    var baseOpacity = typeof cfg.opacity === 'number' ? cfg.opacity : 0.1;
    var speedMul = typeof cfg.speed === 'number' ? cfg.speed : 1;
    var baseSize = typeof cfg.size === 'number' ? cfg.size : 22;
    var count = typeof cfg.count === 'number' ? cfg.count : 30;

    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0;

    function resize() {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // Resolve the theme accent colour to a plain rgba() string the canvas can
    // always paint (getComputedStyle may return oklch()/color() which older
    // canvases reject). We run it through a 1x1 offscreen canvas, then cache it
    // and refresh whenever the theme (data-theme) changes.
    var accentRGBA = 'rgba(120,140,255,1)';
    function readAccent() {
      try {
        var probe = readAccent.el || (readAccent.el = (function () {
          var d = document.createElement('div');
          d.style.cssText = 'position:absolute;left:-9999px;top:-9999px;visibility:hidden;pointer-events:none;color:var(--rc-accent);';
          document.body.appendChild(d);
          return d;
        })());
        var str = getComputedStyle(probe).color;
        var probeCv = readAccent.cv || (readAccent.cv = document.createElement('canvas'));
        probeCv.width = probeCv.height = 1;
        var g = probeCv.getContext('2d');
        g.clearRect(0, 0, 1, 1);
        g.fillStyle = str;
        g.fillRect(0, 0, 1, 1);
        var d = g.getImageData(0, 0, 1, 1).data;
        accentRGBA = 'rgba(' + d[0] + ',' + d[1] + ',' + d[2] + ',' + (d[3] / 255) + ')';
      } catch (e) { /* keep last known accent */ }
    }
    readAccent();
    // refresh the accent after the theme is toggled (data-theme attribute)
    if ('MutationObserver' in window) {
      var obs = new MutationObserver(readAccent);
      obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    }

    var parts = [];
    function spawn(initial) {
      return {
        x: Math.random() * W,
        y: initial ? Math.random() * H : -30,
        r: baseSize * (0.5 + Math.random() * 0.9),
        speed: (0.4 + Math.random() * 0.7) * speedMul,
        drift: (Math.random() - 0.5) * 0.6,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.016,
        icon: icons[(Math.random() * icons.length) | 0],
        alpha: baseOpacity * (0.5 + Math.random() * 0.5)
      };
    }
    for (var i = 0; i < count; i++) parts.push(spawn(true));

    var raf = null;
    function tick() {
      ctx.clearRect(0, 0, W, H);
      ctx.fillStyle = accentRGBA;
      for (var j = 0; j < parts.length; j++) {
        var p = parts[j];
        p.y += p.speed;
        p.x += p.drift;
        p.rot += p.vrot;
        if (p.y > H + 40) { parts[j] = spawn(false); continue; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = p.alpha;
        ctx.font = p.r + 'px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.icon, 0, 0);
        ctx.restore();
      }
      raf = requestAnimationFrame(tick);
    }
    if (!document.hidden) raf = requestAnimationFrame(tick);
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { if (raf) cancelAnimationFrame(raf); raf = null; }
      else if (!raf) raf = requestAnimationFrame(tick);
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
