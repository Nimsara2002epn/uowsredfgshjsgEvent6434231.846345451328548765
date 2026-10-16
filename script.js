/**
 * Every Side of You I Love - Pure Code Interactive Engine
 * 60 FPS Supernova Radiant Heart Animation (Pure Canvas/JS, Zero Video)
 * Filled Luminous Heart, Blazing White Rim & 360-Degree Radial Laser Needles
 * 5-Tap Lock Screen Escalation & Romantic WebAudio Synthesizer
 */

document.addEventListener('DOMContentLoaded', () => {
  // =========================================================================
  // 1. DOM Elements & State
  // =========================================================================
  const page1 = document.getElementById('page-1');
  const page2 = document.getElementById('page-2');
  const heroBigHeart = document.getElementById('hero-big-heart');
  const bigHeartScaler = document.getElementById('big-heart-scaler');
  const heartStatusCaption = document.getElementById('heart-status-caption');
  const captionText = heartStatusCaption ? heartStatusCaption.querySelector('.heart-caption-text') : null;
  const musicToggleBtn = document.getElementById('btn-music-toggle');
  const burstParticlesBtn = document.getElementById('btn-burst-particles');
  const replayHeartBtn = document.getElementById('btn-replay-heart');
  const replayTraceBtn = document.getElementById('btn-replay-trace');

  let tapCount = 0;
  const MAX_TAPS = 1;
  let isTransitioning = false;
  let isMusicPlaying = false;
  let audioCtx = null;
  let musicInterval = null;

  // Scale levels for each tap
  const scaleLevels = [1, 1.35];
  const tapCaptions = [
    "Tap my heart to unlock my love 💖",
    "Popping with all my love! 💥"
  ];

  // =========================================================================
  // 2. Romantic Web Audio Synthesizer
  // =========================================================================
  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playChimeNote(freq, type = 'sine', duration = 0.45, gainLevel = 0.12) {
    const ctx = getAudioContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(gainLevel, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy
    }
  }

  const tapFrequencies = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];

  function playHeartTapSound(level) {
    const baseFreq = tapFrequencies[level] || 523.25;
    playChimeNote(baseFreq, 'sine', 0.4, 0.15);
  }

  function playHeartPopChord() {
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        playChimeNote(freq, 'sine', 0.85, 0.15);
      }, idx * 50);
    });
  }

  // =========================================================================
  // =========================================================================
  // 2. Romantic Lyric Video Controller (Sound & Music directly from Video)
  //    Video: "nura-ananthe-video.mp4" (Audio & Sinhala lyrics included)
  // =========================================================================
  const lyricsVideo = document.getElementById('lyrics-video');
  const lyricsVideoContainer = document.getElementById('lyrics-video-container');
  const lyricsVideoOverlay = document.getElementById('lyrics-video-overlay');
  const lyricsMiniPlayBtn = document.getElementById('lyrics-mini-play-btn');
  const lyricsMiniPlayIcon = document.getElementById('lyrics-mini-play-icon');
  const lyricsScrubberTrack = document.getElementById('lyrics-scrubber-track');
  const lyricsScrubberFill = document.getElementById('lyrics-scrubber-fill');
  const lyricsScrubberThumb = document.getElementById('lyrics-scrubber-thumb');
  const lyricsTimeDisplay = document.getElementById('lyrics-time-display');

  const TOTAL_SONG_DURATION = 150.5; // Fallback ~2:30

  // Configure video for sound playback
  if (lyricsVideo) {
    lyricsVideo.muted = false;
    lyricsVideo.volume = 1;
    lyricsVideo.defaultMuted = false;
    try {
      lyricsVideo.load();
    } catch (e) {}
  }

  function formatTime(seconds) {
    if (isNaN(seconds) || seconds < 0) return '00:00';
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  function getVideoDuration() {
    if (lyricsVideo && !isNaN(lyricsVideo.duration) && lyricsVideo.duration > 0) {
      return lyricsVideo.duration;
    }
    return TOTAL_SONG_DURATION;
  }

  function updateAudioProgress(curTime) {
    const dur = getVideoDuration();
    const progressPercent = Math.min(100, Math.max(0, (curTime / dur) * 100));

    if (lyricsScrubberFill) lyricsScrubberFill.style.width = `${progressPercent}%`;
    if (lyricsScrubberThumb) lyricsScrubberThumb.style.left = `${progressPercent}%`;
    if (lyricsTimeDisplay) lyricsTimeDisplay.innerText = `${formatTime(curTime)} / ${formatTime(dur)}`;
  }

  function seekSong(time) {
    if (lyricsVideo) {
      lyricsVideo.currentTime = time;
    }
    updateAudioProgress(time);
    if (!isMusicPlaying) {
      playSong();
    }
  }

  function setPlayState(isPlaying) {
    isMusicPlaying = isPlaying;
    if (lyricsMiniPlayIcon) lyricsMiniPlayIcon.innerText = isPlaying ? '⏸' : '▶';
    const videoOverlayPlayIcon = document.getElementById('video-overlay-play-icon');
    if (videoOverlayPlayIcon) videoOverlayPlayIcon.innerText = isPlaying ? '⏸' : '▶';
    if (lyricsVideoOverlay) {
      if (isPlaying) {
        lyricsVideoOverlay.classList.add('playing');
      } else {
        lyricsVideoOverlay.classList.remove('playing');
      }
    }
    if (musicToggleBtn) {
      if (isPlaying) {
        musicToggleBtn.classList.add('active');
        const textSpan = musicToggleBtn.querySelector('.text');
        if (textSpan) textSpan.innerText = 'Music: Playing ♪';
      } else {
        musicToggleBtn.classList.remove('active');
        const textSpan = musicToggleBtn.querySelector('.text');
        if (textSpan) textSpan.innerText = 'Play Music ♪';
      }
    }
  }

  function playSong() {
    setPlayState(true);

    if (lyricsVideo) {
      lyricsVideo.muted = false;
      lyricsVideo.volume = 1;
      const videoPromise = lyricsVideo.play();
      if (videoPromise !== undefined) {
        videoPromise
          .then(() => {
            if (lyricsVideoOverlay) lyricsVideoOverlay.classList.add('playing');
          })
          .catch((err) => {
            console.warn('Video playback waiting for user gesture:', err);
            // Fallback: if browser blocks initial sound, start muted then unmute
            lyricsVideo.muted = true;
            lyricsVideo.play().then(() => {
              lyricsVideo.muted = false;
            }).catch(() => {});
          });
      }
    }
  }

  function pauseSong() {
    if (lyricsVideo) {
      lyricsVideo.pause();
    }
    setPlayState(false);
  }

  function toggleMusic() {
    if (isMusicPlaying) {
      pauseSong();
    } else {
      playSong();
    }
  }

  if (musicToggleBtn) {
    musicToggleBtn.addEventListener('click', toggleMusic);
  }

  if (lyricsMiniPlayBtn) {
    lyricsMiniPlayBtn.addEventListener('click', toggleMusic);
  }

  if (lyricsVideoContainer) {
    lyricsVideoContainer.addEventListener('click', toggleMusic);
  }

  if (lyricsScrubberTrack) {
    lyricsScrubberTrack.addEventListener('click', (e) => {
      const rect = lyricsScrubberTrack.getBoundingClientRect();
      const clickX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const ratio = clickX / rect.width;
      seekSong(ratio * getVideoDuration());
    });
  }

  if (lyricsVideo) {
    lyricsVideo.addEventListener('timeupdate', () => {
      updateAudioProgress(lyricsVideo.currentTime);
    });

    lyricsVideo.addEventListener('loadedmetadata', () => {
      updateAudioProgress(lyricsVideo.currentTime || 0);
    });

    lyricsVideo.addEventListener('play', () => {
      setPlayState(true);
    });

    lyricsVideo.addEventListener('playing', () => {
      setPlayState(true);
    });

    lyricsVideo.addEventListener('pause', () => {
      setPlayState(false);
    });

    lyricsVideo.addEventListener('ended', () => {
      pauseSong();
      seekSong(0);
    });
  }

  // Initial player UI state
  updateAudioProgress(0);

  // =========================================================================
  // 3. Cute Gatekeeper Login: "Who are you? ✨"
  // =========================================================================
  function spawnTapSparks(x, y, count = 12) {
    const emojis = ['✨', '💖', '🌸', '✦', '💕', '🍓'];
    for (let i = 0; i < count; i++) {
      const spark = document.createElement('span');
      spark.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      spark.style.position = 'fixed';
      spark.style.left = `${x}px`;
      spark.style.top = `${y}px`;
      spark.style.fontSize = `${Math.random() * 10 + 13}px`;
      spark.style.pointerEvents = 'none';
      spark.style.zIndex = '9999999';
      spark.style.transition = 'all 0.65s cubic-bezier(0.2, 0.8, 0.2, 1)';
      spark.style.transform = 'translate(-50%, -50%) scale(1)';
      document.body.appendChild(spark);

      const angle = (Math.PI * 2 * i) / count;
      const dist = Math.random() * 65 + 35;
      const targetX = Math.cos(angle) * dist;
      const targetY = Math.sin(angle) * dist - 15;

      requestAnimationFrame(() => {
        spark.style.transform = `translate(calc(-50% + ${targetX}px), calc(-50% + ${targetY}px)) scale(0)`;
        spark.style.opacity = '0';
      });

      setTimeout(() => spark.remove(), 650);
    }
  }

  const cuteLoginGate = document.getElementById('cute-login-gate');
  const loginNameCards = document.querySelectorAll('.login-name-card');
  const loginFeedback = document.getElementById('login-status-feedback');
  let isGateUnlocked = false;

  function unlockGateAndStartExperience(selectedName) {
    if (isGateUnlocked) return;
    isGateUnlocked = true;

    // 1. Resume AudioContext within user gesture
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    // 2. Play celebratory harmonic chord
    playHeartPopChord();

    // 3. Start lyric video immediately with sound
    if (lyricsVideo) {
      lyricsVideo.currentTime = 0;
      lyricsVideo.muted = false;
      lyricsVideo.volume = 1;
      const vPromise = lyricsVideo.play();
      if (vPromise !== undefined) {
        vPromise.then(() => {
          setPlayState(true);
        }).catch((e) => {
          console.warn('Playback gesture fallback, starting muted then unmuting:', e);
          lyricsVideo.muted = true;
          lyricsVideo.play().then(() => setPlayState(true)).catch(() => {});
        });
      }
    }

    // 4. Start Supernova Radiant Heart Engine
    requestAnimationFrame(() => {
      initSupernovaHeart();
    });

    // 5. Personalize brand header and love subtitle
    const navBrand = document.getElementById('nav-brand');
    if (navBrand) {
      navBrand.innerHTML = `<span class="heart-icon">❤️</span><span>For My ${selectedName}</span>`;
    }
    const bubuSubtitle = document.querySelector('.bubu-love-subtitle');
    if (bubuSubtitle) {
      bubuSubtitle.innerText = `${selectedName}, you are my favorite person, my favorite smile, and my whole universe.`;
    }

    // 6. Dissolve and remove login gatekeeper cleanly
    if (cuteLoginGate) {
      setTimeout(() => {
        cuteLoginGate.classList.add('gate-unlocked');
        setTimeout(() => {
          cuteLoginGate.style.display = 'none';
        }, 600);
      }, 600);
    }
  }

  if (loginNameCards.length > 0 && cuteLoginGate) {
    loginNameCards.forEach((card) => {
      card.addEventListener('click', (e) => {
        if (isGateUnlocked) return;

        const selectedName = card.getAttribute('data-name') || 'My Love';
        card.classList.add('is-selected');

        const rect = card.getBoundingClientRect();
        const clickX = e && e.clientX ? e.clientX : (rect.left + rect.width / 2);
        const clickY = e && e.clientY ? e.clientY : (rect.top + rect.height / 2);
        spawnTapSparks(clickX, clickY, 24);

        if (loginFeedback) {
          loginFeedback.classList.add('success');
          loginFeedback.innerHTML = `<span class="status-icon">💖</span><span class="status-msg">Access Granted! Welcome, <strong>${selectedName}</strong>! ✨</span>`;
        }

        unlockGateAndStartExperience(selectedName);
      });
    });
  }

  if (burstParticlesBtn) {
    burstParticlesBtn.addEventListener('click', () => {
      playHeartPopChord();
      if (window.triggerSupernovaBurst) {
        window.triggerSupernovaBurst();
      }
    });
  }

  if (replayTraceBtn) {
    replayTraceBtn.addEventListener('click', () => {
      playChimeNote(880, 'sine', 0.4, 0.12);
      if (window.triggerSupernovaBurst) {
        window.triggerSupernovaBurst();
      }
    });
  }

  // =========================================================================
  // 5. PURE CODE: Supernova Radiant Heart Engine (High Performance 60 FPS)
  //    (Crisp offscreen sprite caching, clamped DPR, streamlined rim passes)
  // =========================================================================
  let heartEngineRunning = false;
  let heartAnimFrame = null;

  function stopSupernovaHeart() {
    heartEngineRunning = false;
    if (heartAnimFrame) {
      cancelAnimationFrame(heartAnimFrame);
      heartAnimFrame = null;
    }
  }
  window.stopSupernovaHeart = stopSupernovaHeart;

  function initSupernovaHeart() {
    const canvas = document.getElementById('viral-heart-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let scale = 11.5;

    let beatTimer = 0;
    let burstEnergy = 0;

    // Heart Perimeter Curve Points & Outward Normals (120 points is ultra-smooth and 70% faster)
    const SAMPLE_COUNT = 120;
    const heartPoints = [];

    // Parametric Heart Point at angle t (t from 0 to 2*PI)
    function calcHeartXY(t, s) {
      const sinT = Math.sin(t);
      const cosT = Math.cos(t);
      const x = (14.6 * Math.pow(sinT, 3) + 1.4 * sinT) * s;
      const y = -(13 * cosT - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * s;
      return { x, y };
    }

    // Heart Boundary & Geometry Precomputations
    let centerOffsetY = -1.8 * scale;
    const boundaryRadius = new Float32Array(360);

    function buildHeartGeometry() {
      heartPoints.length = 0;
      centerOffsetY = -1.8 * scale;

      for (let i = 0; i < SAMPLE_COUNT; i++) {
        const t = (i / SAMPLE_COUNT) * Math.PI * 2;
        const pt = calcHeartXY(t, scale);

        const tNext = ((i + 1) / SAMPLE_COUNT) * Math.PI * 2;
        const ptNext = calcHeartXY(tNext, scale);
        const dx = ptNext.x - pt.x;
        const dy = ptNext.y - pt.y;
        const len = Math.hypot(dx, dy) || 1;
        // Normal pointing outward
        const nx = dy / len;
        const ny = -dx / len;

        heartPoints.push({
          x: pt.x,
          y: pt.y,
          nx: nx,
          ny: ny
        });
      }

      // Precalculate boundary radius from heart center for every degree [0..359]
      for (let d = 0; d < 360; d++) {
        boundaryRadius[d] = 0;
      }
      for (let i = 0; i < SAMPLE_COUNT; i++) {
        const pt = heartPoints[i];
        const dx = pt.x;
        const dy = pt.y - centerOffsetY;
        const dist = Math.hypot(dx, dy);
        let deg = Math.floor(((Math.atan2(dy, dx) + Math.PI) / (Math.PI * 2)) * 360) % 360;
        if (deg < 0) deg += 360;
        if (dist > boundaryRadius[deg]) {
          boundaryRadius[deg] = dist;
        }
      }
      for (let pass = 0; pass < 2; pass++) {
        for (let d = 0; d < 360; d++) {
          if (boundaryRadius[d] === 0) {
            boundaryRadius[d] = boundaryRadius[(d - 1 + 360) % 360] || (13 * scale);
          }
        }
      }
    }

    // 1. Two-Tier 360-Degree Radial Laser Needles (Optimized: 50 corona + 30 shooting = 80 rays)
    const rayParticles = [];
    const rayColors = [
      '#ffffff',               // Pure white-hot laser
      'rgba(255, 45, 120, ',  // Hot neon pink
      'rgba(255, 15, 60, ',   // Radiant crimson
      'rgba(255, 105, 185, ', // Luminous rose
      'rgba(220, 50, 240, ',  // Violet-pink flare
      '#ffffff'                // Extra white weighting
    ];

    function createRay(isCorona, resetDist = false) {
      const ptIdx = Math.floor(Math.random() * SAMPLE_COUNT);
      if (isCorona) {
        const maxDist = Math.random() * 32 + 18;
        return {
          isCorona: true,
          ptIdx: ptIdx,
          dist: resetDist ? Math.random() * 6 : Math.random() * maxDist,
          maxDist: maxDist,
          speed: Math.random() * 0.55 + 0.35,
          length: Math.random() * 20 + 10,
          lineWidth: Math.random() * 1.5 + 0.8,
          colorType: Math.random() < 0.65 ? 0 : Math.floor(Math.random() * rayColors.length),
          alpha: Math.random() * 0.3 + 0.6
        };
      } else {
        const maxDist = Math.random() * 105 + 55;
        return {
          isCorona: false,
          ptIdx: ptIdx,
          dist: resetDist ? Math.random() * 12 : Math.random() * maxDist,
          maxDist: maxDist,
          speed: Math.random() * 0.9 + 0.6,
          length: Math.random() * 36 + 20,
          lineWidth: Math.random() * 1.8 + 1.0,
          colorType: Math.floor(Math.random() * rayColors.length),
          alpha: Math.random() * 0.35 + 0.55
        };
      }
    }

    function initRays() {
      rayParticles.length = 0;
      for (let i = 0; i < 50; i++) {
        rayParticles.push(createRay(true, false));
      }
      for (let i = 0; i < 30; i++) {
        rayParticles.push(createRay(false, false));
      }
    }

    // 2. Offscreen Sprite Caching for Mini Hearts
    // Pre-rendering mini-hearts onto tiny 48x48 canvases makes drawing GPU-blitted (drawImage)
    // instead of executing thousands of heavy bezier path instructions each frame!
    const heartSpriteCanvases = [];
    const SPRITE_SIZE = 48;

    const heartColors = [
      'rgba(255, 255, 255, ',    // Brilliant white-hot core
      'rgba(255, 240, 252, ',   // Luminous pastel white-pink
      'rgba(255, 125, 205, ',   // Vivid neon rose
      'rgba(255, 45, 135, ',    // Bright magenta
      'rgba(235, 105, 230, ',   // Lavender-rose
      'rgba(255, 185, 230, ',   // Soft blush pink
      'rgba(255, 255, 255, '    // Extra white sparkle weighting
    ];

    function buildHeartSprites() {
      heartSpriteCanvases.length = 0;
      for (let c = 0; c < heartColors.length; c++) {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = SPRITE_SIZE;
        offCanvas.height = SPRITE_SIZE;
        const offCtx = offCanvas.getContext('2d');
        if (!offCtx) continue;

        const cx = SPRITE_SIZE / 2;
        const cy = SPRITE_SIZE / 2;
        const d = (SPRITE_SIZE * 0.82) * 0.65;

        offCtx.fillStyle = heartColors[c] + '1)';
        offCtx.beginPath();
        offCtx.moveTo(cx, cy - d * 0.3);
        offCtx.bezierCurveTo(cx - d * 0.55, cy - d * 0.85, cx - d * 1.05, cy - d * 0.15, cx, cy + d * 0.85);
        offCtx.bezierCurveTo(cx + d * 1.05, cy - d * 0.15, cx + d * 0.55, cy - d * 0.85, cx, cy - d * 0.3);
        offCtx.closePath();
        offCtx.fill();

        heartSpriteCanvases.push(offCanvas);
      }
    }

    function drawMiniHeartFast(cx, cy, s, rot, colorIndex, a) {
      const sprite = heartSpriteCanvases[colorIndex];
      if (!sprite) return;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, a));
      ctx.translate(cx, cy);
      if (rot) ctx.rotate(rot);
      const half = s * 0.5;
      ctx.drawImage(sprite, -half, -half, s, s);
      ctx.restore();
    }

    // 3. Dense Swarm of 480 Little Glowing Bokeh Hearts (River of Love Hearts!)
    const miniHearts = [];
    const MINI_HEART_COUNT = 480;

    const bokehDots = [];
    const BOKEH_DOT_COUNT = 90;

    function initMiniHearts() {
      miniHearts.length = 0;
      bokehDots.length = 0;

      for (let i = 0; i < MINI_HEART_COUNT; i++) {
        // Tier 0 (140 hearts): Large soft bokeh background hearts (12px to 25px) - dense luminous carpet
        // Tier 1 (220 hearts): Vibrant glowing medium hearts (7px to 15px) - swimming actively
        // Tier 2 (120 hearts): Sparkling white-hot foreground hearts (3.5px to 8px) - sparkling diamond dust
        const tier = i < 140 ? 0 : (i < 360 ? 1 : 2);
        let size, alphaBase, baseSpeed;
        if (tier === 0) {
          size = Math.random() * 13 + 12;
          alphaBase = Math.random() * 0.28 + 0.22;
          baseSpeed = Math.random() * 0.35 + 0.18;
        } else if (tier === 1) {
          size = Math.random() * 8 + 7.0;
          alphaBase = Math.random() * 0.35 + 0.55;
          baseSpeed = Math.random() * 0.55 + 0.30;
        } else {
          size = Math.random() * 4.5 + 3.5;
          alphaBase = Math.random() * 0.25 + 0.78;
          baseSpeed = Math.random() * 0.70 + 0.40;
        }

        // Spawn position: 180 dedicated to margins & perimeter band, 300 across interior
        const t = Math.random() * Math.PI * 2;
        let r;
        if (i < 180) {
          r = 0.76 + Math.random() * 0.28;
        } else {
          r = Math.sqrt(Math.random()) * 0.88;
        }
        const pt = calcHeartXY(t, scale * r);
        const moveAngle = Math.random() * Math.PI * 2;

        miniHearts.push({
          x: pt.x,
          y: pt.y,
          vx: Math.cos(moveAngle) * baseSpeed,
          vy: Math.sin(moveAngle) * baseSpeed,
          baseSpeed: baseSpeed,
          wanderAngle: Math.random() * Math.PI * 2,
          wanderSpeed: (Math.random() - 0.5) * 0.04,
          tier: tier,
          size: size,
          colorIndex: tier === 2 ? (Math.random() < 0.75 ? 0 : 1) : Math.floor(Math.random() * heartColors.length),
          alphaBase: alphaBase,
          rotation: (Math.random() - 0.5) * 0.65,
          rotSpeed: (Math.random() - 0.5) * 0.012,
          shimmerOffset: Math.random() * Math.PI * 2,
          shimmerSpeed: Math.random() * 0.025 + 0.010
        });
      }

      // Floating Bokeh Sparkle Dots (90 glistening pinpoints)
      for (let i = 0; i < BOKEH_DOT_COUNT; i++) {
        const t = Math.random() * Math.PI * 2;
        const r = (i < 35) ? (0.76 + Math.random() * 0.28) : (Math.sqrt(Math.random()) * 0.88);
        const pt = calcHeartXY(t, scale * r);
        const moveAngle = Math.random() * Math.PI * 2;
        const s = Math.random() * 0.4 + 0.2;

        bokehDots.push({
          x: pt.x,
          y: pt.y,
          vx: Math.cos(moveAngle) * s,
          vy: Math.sin(moveAngle) * s,
          radius: Math.random() * 2.2 + 1.0,
          alpha: Math.random() * 0.5 + 0.4,
          flicker: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.025 + 0.01
        });
      }
    }

    // 4. Ambient Flare Orbs (Upper & side corners)
    const flareStars = [
      { relX: -0.34, relY: -0.32, r: 24, alpha: 0.65 },
      { relX: 0.36, relY: -0.34, r: 22, alpha: 0.60 },
      { relX: -0.38, relY: 0.08, r: 19, alpha: 0.55 },
      { relX: 0.39, relY: 0.06, r: 17, alpha: 0.50 }
    ];

    function resizeCanvas() {
      const container = canvas.parentElement || document.body;
      const rect = container.getBoundingClientRect();
      // Clamp DPR to 1.25 max to prevent fill-rate lag on 2x/3x displays
      const dpr = Math.min(window.devicePixelRatio || 1, 1.25);

      width = rect.width > 50 ? rect.width : (canvas.clientWidth > 50 ? canvas.clientWidth : 680);
      height = rect.height > 50 ? rect.height : (canvas.clientHeight > 50 ? canvas.clientHeight : 560);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      centerX = width / 2;
      centerY = height / 2 - 26;

      // Responsive scale
      scale = Math.min(width / 46, height / 44);
      if (scale < 7.5) scale = 7.5;
      if (scale > 13) scale = 13;

      buildHeartSprites();
      buildHeartGeometry();
      initRays();
      initMiniHearts();
    }

    // Supernova Ray Burst Trigger
    window.triggerSupernovaBurst = function() {
      burstEnergy = 1.0;
      setTimeout(() => { burstEnergy = 0; }, 2600);

      rayParticles.forEach(ray => {
        ray.dist = Math.random() * 15;
        ray.speed = Math.random() * 8 + 6;
        ray.length *= 1.8;
      });
    };

    canvas.addEventListener('click', () => {
      window.triggerSupernovaBurst();
      playChimeNote(880, 'sine', 0.35, 0.12);
    });

    // Main 60 FPS Render Loop
    let lastTime = performance.now();

    function renderSupernova(currentTime) {
      if (!heartEngineRunning) return;

      const dt = Math.min((currentTime - lastTime) / 1000, 0.05);
      lastTime = currentTime;

      // Romantic, Slow-Breathing Heartbeat Pulse (~2.0s cycle)
      beatTimer += dt * (0.50 + burstEnergy * 0.6);
      const beatCycle = (beatTimer % 2.0) / 2.0;
      let beatScale = 1.0;
      let pulseGlow = 1.0;

      if (beatCycle < 0.18) {
        // Lub
        const progress = Math.sin((beatCycle / 0.18) * Math.PI);
        beatScale = 1.0 + 0.055 * progress;
        pulseGlow = 1.0 + 0.25 * progress;
      } else if (beatCycle >= 0.24 && beatCycle < 0.40) {
        // Dub
        const progress = Math.sin(((beatCycle - 0.24) / 0.16) * Math.PI);
        beatScale = 1.0 + 0.028 * progress;
        pulseGlow = 1.0 + 0.14 * progress;
      }

      beatScale += burstEnergy * 0.06;
      pulseGlow += burstEnergy * 0.45;

      // 1. Deep Cosmic Crimson Background Fill
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#050005';
      ctx.fillRect(0, 0, width, height);

      // 2. Cosmic Background Flare Aura behind heart
      const bgGrad = ctx.createRadialGradient(centerX, centerY, 30, centerX, centerY, scale * 28);
      bgGrad.addColorStop(0, `rgba(235, 20, 65, ${0.45 * pulseGlow})`);
      bgGrad.addColorStop(0.38, `rgba(150, 10, 45, ${0.25 * pulseGlow})`);
      bgGrad.addColorStop(0.72, 'rgba(45, 5, 18, 0.10)');
      bgGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 3. Switch to Additive Blending for Radiant Glow & Laser Needles
      ctx.globalCompositeOperation = 'lighter';

      // 4. Render Ambient Corner Flare Stars
      flareStars.forEach(star => {
        const sx = centerX + star.relX * width;
        const sy = centerY + star.relY * height;
        const rad = star.r * (0.93 + 0.08 * Math.sin(beatTimer * 0.9));

        const fGrad = ctx.createRadialGradient(sx, sy, 0, sx, sy, rad);
        fGrad.addColorStop(0, `rgba(255, 70, 110, ${star.alpha * 0.95})`);
        fGrad.addColorStop(0.45, `rgba(255, 20, 65, ${star.alpha * 0.45})`);
        fGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = fGrad;
        ctx.beginPath();
        ctx.arc(sx, sy, rad, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha * 0.9})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = `rgba(255, 160, 200, ${star.alpha * 0.75})`;
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(sx - rad * 1.8, sy);
        ctx.lineTo(sx + rad * 1.8, sy);
        ctx.moveTo(sx, sy - rad * 1.8);
        ctx.lineTo(sx, sy + rad * 1.8);
        ctx.stroke();
      });

      // 5. Update & Render 360-Degree Radial Laser Needles / Rays
      const raySpeedMult = (1.0 + (beatScale - 1.0) * 2.2 + burstEnergy * 1.4);
      for (let i = 0; i < rayParticles.length; i++) {
        const ray = rayParticles[i];
        ray.dist += ray.speed * raySpeedMult;

        if (ray.dist > ray.maxDist) {
          rayParticles[i] = createRay(ray.isCorona, true);
          continue;
        }

        const pt = heartPoints[ray.ptIdx];
        if (!pt) continue;

        const ox = centerX + pt.x * beatScale;
        const oy = centerY + pt.y * beatScale;
        const rx = ox + pt.nx * ray.dist;
        const ry = oy + pt.ny * ray.dist;
        const ex = rx + pt.nx * ray.length;
        const ey = ry + pt.ny * ray.length;

        const lifeRatio = 1.0 - (ray.dist / ray.maxDist);
        const rayAlpha = Math.max(0, ray.alpha * lifeRatio);

        let strokeStyle;
        if (ray.colorType === 0) {
          strokeStyle = `rgba(255, 255, 255, ${rayAlpha})`;
        } else {
          strokeStyle = rayColors[ray.colorType] + rayAlpha + ')';
        }

        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = ray.lineWidth;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }

      // 6. Draw Solid Luminous Filled Heart Body
      ctx.save();
      ctx.beginPath();
      for (let i = 0; i < SAMPLE_COUNT; i++) {
        const pt = heartPoints[i];
        const px = centerX + pt.x * beatScale;
        const py = centerY + pt.y * beatScale;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();

      const bodyGrad = ctx.createRadialGradient(
        centerX, centerY - 6 * scale * beatScale, 15,
        centerX, centerY, 19 * scale * beatScale
      );
      bodyGrad.addColorStop(0, '#ff3570');    // Electric rose core
      bodyGrad.addColorStop(0.35, '#e00f42'); // Vivid ruby
      bodyGrad.addColorStop(0.70, '#9e0528'); // Deep crimson
      bodyGrad.addColorStop(1, '#4a0112');    // Velvet dark red

      ctx.fillStyle = bodyGrad;
      ctx.fill();
      ctx.restore();

      // 7. Internal Constellation of Floating Little Glowing Bokeh Hearts
      ctx.save();
      ctx.beginPath();
      const marginScale = 1.05;
      for (let i = 0; i < SAMPLE_COUNT; i++) {
        const pt = heartPoints[i];
        const px = centerX + pt.x * marginScale * beatScale;
        const py = centerY + (centerOffsetY + (pt.y - centerOffsetY) * marginScale) * beatScale;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.clip();

      // A. Render Little Bokeh Hearts using Fast Offscreen Sprites
      miniHearts.forEach(h => {
        h.wanderAngle += h.wanderSpeed;
        h.vx += Math.cos(h.wanderAngle) * 0.035;
        h.vy += Math.sin(h.wanderAngle) * 0.035;

        const speedMultiplier = 1.0 + burstEnergy * 2.2;
        const curSpeed = Math.hypot(h.vx, h.vy) || 1;
        h.vx = (h.vx / curSpeed) * h.baseSpeed * speedMultiplier;
        h.vy = (h.vy / curSpeed) * h.baseSpeed * speedMultiplier;

        h.x += h.vx;
        h.y += h.vy;
        h.rotation += h.rotSpeed * speedMultiplier;
        h.shimmerOffset += h.shimmerSpeed;

        const relX = h.x;
        const relY = h.y - centerOffsetY;
        const dist = Math.hypot(relX, relY);
        let deg = Math.floor(((Math.atan2(relY, relX) + Math.PI) / (Math.PI * 2)) * 360) % 360;
        if (deg < 0) deg += 360;
        const maxR = (boundaryRadius[deg] || (13 * scale)) * 1.04;

        if (dist > maxR) {
          const angleToCenter = Math.atan2(-relY, -relX);
          h.vx = Math.cos(angleToCenter) * h.baseSpeed + (Math.random() - 0.5) * 0.35;
          h.vy = Math.sin(angleToCenter) * h.baseSpeed + (Math.random() - 0.5) * 0.35;
          h.x = (relX / dist) * maxR * 0.98;
          h.y = centerOffsetY + (relY / dist) * maxR * 0.98;
        }

        const hx = centerX + h.x * beatScale;
        const hy = centerY + h.y * beatScale;
        const shimmer = 0.82 + 0.18 * Math.sin(h.shimmerOffset);
        const hAlpha = Math.min(1.0, h.alphaBase * shimmer * pulseGlow + burstEnergy * 0.25);
        const hSize = h.size * (0.95 + 0.05 * beatScale);

        drawMiniHeartFast(hx, hy, hSize, h.rotation, h.colorIndex, hAlpha);
      });

      // B. Floating Bokeh Sparkle Dots
      bokehDots.forEach(dot => {
        dot.x += dot.vx * (1.0 + burstEnergy * 1.8);
        dot.y += dot.vy * (1.0 + burstEnergy * 1.8);
        dot.flicker += dot.speed;

        const relX = dot.x;
        const relY = dot.y - centerOffsetY;
        const dist = Math.hypot(relX, relY);
        let deg = Math.floor(((Math.atan2(relY, relX) + Math.PI) / (Math.PI * 2)) * 360) % 360;
        if (deg < 0) deg += 360;
        const maxR = (boundaryRadius[deg] || (13 * scale)) * 1.04;

        if (dist > maxR) {
          const angleToCenter = Math.atan2(-relY, -relX);
          dot.vx = Math.cos(angleToCenter) * 0.4;
          dot.vy = Math.sin(angleToCenter) * 0.4;
          dot.x = (relX / dist) * maxR * 0.98;
          dot.y = centerOffsetY + (relY / dist) * maxR * 0.98;
        }

        const dx = centerX + dot.x * beatScale;
        const dy = centerY + dot.y * beatScale;
        const dAlpha = Math.max(0.15, dot.alpha * (0.6 + 0.4 * Math.sin(dot.flicker)));

        ctx.fillStyle = `rgba(255, 245, 252, ${dAlpha})`;
        ctx.beginPath();
        ctx.arc(dx, dy, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // C. Inner Glowing Rim Plasma Strokes
      function strokeInnerRim(lw, col) {
        ctx.lineWidth = lw;
        ctx.strokeStyle = col;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        for (let i = 0; i < SAMPLE_COUNT; i++) {
          const pt = heartPoints[i];
          const px = centerX + pt.x * beatScale;
          const py = centerY + pt.y * beatScale;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }
      strokeInnerRim(18, `rgba(255, 140, 190, ${0.30 * pulseGlow})`);
      strokeInnerRim(7, `rgba(255, 255, 255, ${0.65 * pulseGlow})`);

      // D. Subtle vertical center crease shadow
      const creaseGrad = ctx.createLinearGradient(centerX - 9, centerY, centerX + 9, centerY);
      creaseGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
      creaseGrad.addColorStop(0.5, 'rgba(40, 0, 10, 0.35)');
      creaseGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = creaseGrad;
      ctx.fillRect(centerX - 12, centerY - 19 * scale, 24, 38 * scale);

      ctx.restore(); // Exit clip

      // 8. Render the Blazing Brilliant White-Hot Glowing Rim (The Crown!)
      function strokeHeartPath(lineWidth, strokeStyle) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeStyle;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.beginPath();
        for (let i = 0; i < SAMPLE_COUNT; i++) {
          const pt = heartPoints[i];
          const px = centerX + pt.x * beatScale;
          const py = centerY + pt.y * beatScale;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Streamlined 3-pass glowing crown:
      // Pass 1: Soft deep crimson bloom
      strokeHeartPath(28, `rgba(255, 20, 70, ${0.40 * pulseGlow})`);
      // Pass 2: Vivid electric pink glow
      strokeHeartPath(10, `rgba(255, 120, 185, ${0.85 * pulseGlow})`);
      // Pass 3: Pure white-hot laser filament
      strokeHeartPath(2.8, '#ffffff');

      heartAnimFrame = requestAnimationFrame(renderSupernova);
    }

    window.removeEventListener('resize', resizeCanvas);
    window.addEventListener('resize', resizeCanvas, { passive: true });

    resizeCanvas();
    if (heartAnimFrame) cancelAnimationFrame(heartAnimFrame);
    heartEngineRunning = true;
    heartAnimFrame = requestAnimationFrame(renderSupernova);
  }

  // =========================================================================
  // 6. Lightweight Ambient Background for Page 1
  // =========================================================================
  let ambientRunning = false;
  let ambientAnimFrame = null;

  function stopAmbientBackground() {
    ambientRunning = false;
    if (ambientAnimFrame) {
      cancelAnimationFrame(ambientAnimFrame);
      ambientAnimFrame = null;
    }
  }

  function startAmbientBackground() {
    if (ambientRunning) return;
    ambientRunning = true;
    if (typeof animateAmbientLoop === 'function') {
      ambientAnimFrame = requestAnimationFrame(animateAmbientLoop);
    }
  }

  let animateAmbientLoop = null;

  function initAmbientBackground() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    const particles = [];
    const count = 20;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedY: Math.random() * 0.28 + 0.1,
        speedX: (Math.random() - 0.5) * 0.15,
        opacity: Math.random() * 0.4 + 0.2
      });
    }

    animateAmbientLoop = function() {
      if (!ambientRunning) return;

      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y -= p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        ctx.fillStyle = `rgba(255, 180, 205, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ambientAnimFrame = requestAnimationFrame(animateAmbientLoop);
    };

    ambientRunning = true;
    ambientAnimFrame = requestAnimationFrame(animateAmbientLoop);
  }

  initAmbientBackground();

  // ==========================================================
  // Wanna Kiss Me? Button & Auto-Closing Full-Window GIF Pop-Up
  // ==========================================================
  const kissBtn = document.getElementById('kiss-prompt-btn');
  const kissOverlay = document.getElementById('kiss-modal-overlay');
  const kissImg = document.getElementById('kiss-gif-img');
  const kissHeartsContainer = document.getElementById('kiss-floating-hearts');
  let kissTimer = null;

  if (kissBtn && kissOverlay && kissImg) {
    const GIF_BASE_URL = 'https://media1.tenor.com/m/M-7BezSv0-gAAAAC/cat-kiss.gif';
    const GIF_ROUND_DURATION = 3200; // ~3.2 seconds (exactly 1 full round of the kiss GIF)

    function spawnKissHeart() {
      if (!kissHeartsContainer) return;
      const heart = document.createElement('span');
      heart.className = 'floating-kiss-heart';
      const emojis = ['💋', '💖', '😘', '💕', '✨', '🌸', '❤️'];
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      heart.style.left = `${Math.random() * 84 + 8}%`;
      heart.style.top = `${Math.random() * 70 + 15}%`;
      heart.style.fontSize = `${Math.random() * 1.4 + 1.8}rem`;
      kissHeartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 1800);
    }

    function openKissPopup() {
      // Refresh the GIF src to play from frame 1 every time
      kissImg.src = `${GIF_BASE_URL}?t=${Date.now()}`;

      if (kissTimer) clearTimeout(kissTimer);
      if (kissHeartsContainer) kissHeartsContainer.innerHTML = '';

      // Open the overlay without stopping or pausing background music or video
      kissOverlay.classList.add('active');
      kissOverlay.setAttribute('aria-hidden', 'false');

      // Burst floating kiss emojis across the window
      for (let i = 0; i < 12; i++) {
        setTimeout(() => spawnKissHeart(), i * 180);
      }

      // Automatically return to the page after 1 round of the GIF
      kissTimer = setTimeout(() => {
        closeKissPopup();
      }, GIF_ROUND_DURATION);
    }

    function closeKissPopup() {
      if (kissTimer) {
        clearTimeout(kissTimer);
        kissTimer = null;
      }
      kissOverlay.classList.remove('active');
      kissOverlay.setAttribute('aria-hidden', 'true');
    }

    kissBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openKissPopup();
    });

    // Optional: allow tap to dismiss immediately if she wants
    kissOverlay.addEventListener('click', () => {
      closeKissPopup();
    });
  }
});

