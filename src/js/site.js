/* ============================================================
   MICHAELLANEBOLDT.COM — site.js  v3.0
   Fully dynamic — projects loaded from projects/index.json
   and projects/NN-slug/manifest.json at runtime.
   To add a project: create folder, add manifest.json,
   add folder name to projects/index.json. No JS edits needed.
   ============================================================ */
'use strict';

// ── DEVICE DETECTION ──────────────────────────────────────────────────────────
const isIPad = /iPad/.test(navigator.userAgent) ||
  (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const isMobilePhone = window.matchMedia('(pointer: coarse)').matches &&
  /iPhone|Android/i.test(navigator.userAgent) && !isIPad;
const isDesktop = !isMobilePhone;

// ── CONSTANTS ─────────────────────────────────────────────────────────────────
const C = {
  topbar: 20, botbar: 35,
  pad: 0, headls: -0.03,
  navsize: 14, navls: 0.08, navgap: 38, navsw: 0.7, nav_offset: -32,
  numsize: 14, numoffset: 68, dashoffset: 65, dashw: 9, dashgap: 2.5, dashsw: 3.4,
  dsize: 7, dls: 0.015, dlh: 1.35, dsw: 0.3, leadersw: 1, dlpad: 1, drpad: 1, dgap: 8,
  bsize: 14, bls: -0.02, blh: 1.2, bsw: 0.7, blpad: 2, brpad: 10, btpad: 0, pgap: 8,
  bfreq: 0.09, bdisp: 1, boct: 4, bseed: 44,
  hfreq: 0.11, hdisp: 1.4, hoct: 4, hseed: 67,
  box_hw: 92, box_yt: 3, box_yb: 8,
  t_invert: 300, t_blank: 160, t_line: 35,
  ret_bottom: 4, ret_margin: 20,
  col_gap: 1, row_gap: 0, grid_pad: 1, grid_top: 6,
  title_size: 12, title_ls: 0.08, title_sw: 0.25, title_pad: 2, title_bpad: 2,
  img_pad: 0, img_gap: 2,
  ptitle_size: 14, ptitle_top: 10, ptitle_bot: 3,
  pdesc_size: 11, pdesc_ls: -0.01, pdesc_lh: 1.3, pdesc_sw: 0.3, pdesc_pad: 4, pdesc_top: 10,
  cnt_size: 12, cnt_sw: 0.7, cnt_pad: 15, cnt_h: 18,
  cv_pad: 2, cv_tpad: 0, cv_indent: 11, cv_sgap: 8,
  cv_trsw: 0.7, cv_ssw: 2, cv_sdw: 6, cv_sdg: 4,
  desktop_w: 340, desktop_h: 584,
};

// ── STATIC CONTENT ────────────────────────────────────────────────────────────
const ABOUT_PARAS = [
  "IS A DESIGNER AND TECHNOLOGIST WORKING ACROSS COMPUTATION, MATERIAL SYSTEMS, AND CULTURAL PRODUCTION. HE HOLDS A MASTER OF ARCHITECTURE FROM THE SOUTHERN CALIFORNIA INSTITUTE OF ARCHITECTURE AND IS A GEHRY PRIZE RECIPIENT. HE CURRENTLY WORKS AS A ROBOTIC TECHNICIAN AND INSTRUCTOR AT SCI-ARC.",
  "HIS DESIGN PRACTICE IS SITUATED BETWEEN MONUMENTAL AUSTERITY, MONOLITHIC EXCESS, AND MATERIAL RE-USE — USING AI, AUTOMATION, AND FABRICATION AS CULTURAL INFRASTRUCTURE. RECENT WORK ENGAGES POST-INDUSTRIAL AESTHETICS, SYSTEMS DESIGN, AND ANTI-EXTRACTIVE MATERIAL LOGICS ACROSS DIGITAL AND PHYSICAL PRODUCTION."
];

const CONTACT_LINES = [
  "+1 719 648 0021", "MICHAELLANEBOLDT.COM",
  "MICHAEL_BOLDT@SCIARC.EDU", "IG @ F333DBACK"
];

const CV_LINES = [
  { text: '# EXPERIENCE',                                                              weight: 'heavy' },
  { text: '> ROBOTIC TECHNICIAN — SCI-ARC :: 2025—PRESENT',                           weight: 'heavy' },
  { text: '> INSTRUCTOR — SCI-ARC :: 2024—PRESENT',                                   weight: 'heavy' },
  { text: '> GRAPHIC DESIGNER — THE BRUTALIST MAGAZINE :: 2025—PRESENT',              weight: 'heavy' },
  { text: '> FOUNDER / LEAD DESIGNER — DORADO GUITARS :: 2025—PRESENT',               weight: 'heavy' },
  { text: '> EXHIBITION COORDINATOR — SHIGERU BAN PAPER LOG HOUSE :: 2025',           weight: 'heavy' },
  { text: '> CARBON SPECIALIST — DIGNE LLC :: 2024—2025',                             weight: 'heavy' },
  { text: '> TEACHING ASSISTANT — SCI-ARC :: 2022—2024',                              weight: 'heavy' },
  { text: '> ARCHITECTURE INTERN — MARKHARRISARCHITECTS :: 2021—2023',                weight: 'heavy' },
  { text: '> APPRENTICE — ZIMBELMAN GUITARS :: 2021—2023',                            weight: 'heavy' },
  { text: '# EDUCATION',                                                               weight: 'heavy' },
  { text: '> M.ARCH I',                                                                weight: 'heavy' },
  { text: '>> SCI-ARC — LOS ANGELES :: 2021—2024',                                    weight: 'light' },
  { text: '>> GEHRY PRIZE — BEST GRADUATE THESIS',                                    weight: 'light' },
  { text: '> BS PHYSICS',                                                              weight: 'heavy' },
  { text: '>> REGIS UNIVERSITY — DENVER :: 2015—2020',                                weight: 'light' },
  { text: '# FABRICATION + ROBOTICS',                                                 weight: 'heavy' },
  { text: '> ROBOTICS',                                                                weight: 'heavy' },
  { text: '>> ABB IRB 6700 — TOOLPATH DEVELOPMENT — DIGITAL-TO-PHYSICAL PIPELINES',   weight: 'light' },
  { text: '> FABRICATION',                                                             weight: 'heavy' },
  { text: '>> CNC — LASER — PEN PLOT — 3D PRINT — METALWORK — CERAMICS — WOODWORK',  weight: 'light' },
  { text: '> SCANNING',                                                                weight: 'heavy' },
  { text: '>> LIDAR — PHOTOGRAMMETRY — POINT CLOUD PROCESSING — MESH RECONSTRUCTION', weight: 'light' },
  { text: '> ELECTRONICS',                                                             weight: 'heavy' },
  { text: '>> PCB DESIGN — AUDIO ELECTRONICS — SOLDERING — ARDUINO',                  weight: 'light' },
  { text: '# SOFTWARE',                                                                weight: 'heavy' },
  { text: '> 3D + COMPUTATION',                                                        weight: 'heavy' },
  { text: '>> RHINO — GRASSHOPPER — HOUDINI — ROBOTSTUDIO — UNITY — UNREAL ENGINE',   weight: 'light' },
  { text: '> AI + VISION',                                                             weight: 'heavy' },
  { text: '>> COMFYUI — CLOUDCOMPARE — POLYCAM — TOUCHDESIGNER',                       weight: 'light' },
  { text: '> PRODUCTION',                                                              weight: 'heavy' },
  { text: '>> ADOBE SUITE — AUTOCAD — PROCESSING',                                     weight: 'light' },
];

const DATA_FIELDS = [
  { id: 'date',    label: 'DATE',        fn: () => new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase() },
  { id: 'time',    label: 'TIME',        fn: () => new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) },
  { id: 'tz',      label: 'TIMEZONE',    fn: () => Intl.DateTimeFormat().resolvedOptions().timeZone.toUpperCase() },
  { id: 'utc',     label: 'UTC',         fn: () => { const o = -new Date().getTimezoneOffset(), s = o >= 0 ? '+' : '-'; return 'UTC' + s + String(Math.floor(Math.abs(o)/60)).padStart(2,'0') + ':' + String(Math.abs(o)%60).padStart(2,'0'); } },
  { id: 'day',     label: 'DAY',         fn: () => new Date().toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase() },
  { id: 'week',    label: 'WEEK',        fn: () => { const d = new Date(), s = new Date(d.getFullYear(),0,1); return 'WK' + Math.ceil(((d-s)/86400000+s.getDay()+1)/7); } },
  { id: 'elapsed', label: 'ON PAGE',     fn: () => Math.floor((Date.now()-startTime)/1000) + 'S' },
  { id: 'vw',      label: 'SCREEN W',    fn: () => window.screen.width + 'PX' },
  { id: 'vh',      label: 'SCREEN H',    fn: () => window.screen.height + 'PX' },
  { id: 'dpr',     label: 'PIXEL RATIO', fn: () => window.devicePixelRatio.toFixed(1) + 'X' },
  { id: 'conn',    label: 'CONNECTION',  fn: () => (navigator.connection?.effectiveType || '—').toUpperCase() },
  { id: 'ig',      label: 'INSTAGRAM',   fn: () => '@F333DBACK' },
  { id: 'site',    label: 'URL',         fn: () => 'MICHAELLANEBOLDT.COM' },
  { id: 'version', label: 'VERSION',     fn: () => 'V1.0 2026' },
];

// ── STATE ─────────────────────────────────────────────────────────────────────
let startTime = Date.now();
let STATE = 'home';
let transitioning = false;
let currentProject = null;
let activeReturnWrapper = null;
let containerW = 320;
// Projects loaded dynamically from index.json + manifests
let PROJECTS = [];

// ── UTILITIES ─────────────────────────────────────────────────────────────────
function g(id) { return document.getElementById(id); }

function getContainerW() {
  const pw = g('phone-wrap');
  return pw ? pw.offsetWidth : (isDesktop ? C.desktop_w : window.innerWidth);
}

function getLive() {
  const m = {};
  DATA_FIELDS.forEach(f => { try { m[f.id] = f.fn(); } catch(e) { m[f.id] = '—'; } });
  return m;
}

function wrapText(ctx, text, maxWidth) {
  const words = text.split(' '), lines = []; let cur = '';
  words.forEach(w => {
    const test = cur ? cur + ' ' + w : w;
    if (ctx.measureText(test).width > maxWidth && cur) { lines.push(cur); cur = w; }
    else cur = test;
  });
  if (cur) lines.push(cur);
  return lines;
}

function svgEl(tag) { return document.createElementNS('http://www.w3.org/2000/svg', tag); }
function uniqueId(p) { return p + '_' + Math.random().toString(36).slice(2,7); }

function makeGrainFilter(id, freq, disp, oct, seed) {
  const f = svgEl('filter');
  f.setAttribute('id', id); f.setAttribute('x', '-4%'); f.setAttribute('y', '-30%');
  f.setAttribute('width', '110%'); f.setAttribute('height', '170%');
  f.setAttribute('color-interpolation-filters', 'sRGB');
  const t = svgEl('feTurbulence');
  t.setAttribute('type', 'fractalNoise'); t.setAttribute('baseFrequency', freq);
  t.setAttribute('numOctaves', oct); t.setAttribute('seed', seed); t.setAttribute('result', 'noise');
  const d = svgEl('feDisplacementMap');
  d.setAttribute('in', 'SourceGraphic'); d.setAttribute('in2', 'noise');
  d.setAttribute('scale', disp); d.setAttribute('xChannelSelector', 'R'); d.setAttribute('yChannelSelector', 'G');
  f.appendChild(t); f.appendChild(d);
  return f;
}

// ── DYNAMIC PROJECT LOADING ───────────────────────────────────────────────────
// Fetch projects/index.json → fetch each manifest + description → build PROJECTS
// Projects render progressively as each one resolves.

async function loadProjects() {
  let folders;
  try {
    const r = await fetch('projects/index.json');
    folders = await r.json();
  } catch(e) {
    console.error('Could not load projects/index.json', e);
    return;
  }

  // Kick off all fetches in parallel, render each as it resolves
  const promises = folders.map((folder, idx) => loadOneProject(folder, idx));
  await Promise.allSettled(promises);
}

async function loadOneProject(folder, idx) {
  // folder format: "01-spolia"
  const parts = folder.match(/^(\d+)-(.+)$/);
  if (!parts) return;
  const num = parts[1];
  const slug = parts[2];
  const base = `projects/${folder}`;

  let manifest, desc;
  try {
    const [mRes, dRes] = await Promise.all([
      fetch(`${base}/manifest.json`),
      fetch(`${base}/description.txt`)
    ]);
    manifest = await mRes.json();
    desc = await dRes.text();
  } catch(e) {
    console.error(`Failed to load project ${folder}`, e);
    return;
  }

  const proj = {
    num,
    slug,
    folder,
    title: manifest.title || slug.toUpperCase(),
    desc: desc.trim(),
    // Image sequence: interleave regular images and carousel slot
    // carousel_folder name tells us its position in the sequence
    images: manifest.images || [],
    carousel_folder: manifest.carousel_folder || null,
    carousel_slides: manifest.carousel_slides || 0,
  };

  // Build the full ordered image sequence
  // All items (regular images + carousel folder) sorted by their numeric name
  proj.sequence = buildSequence(proj);

  PROJECTS[idx] = proj;

  // Render this project's grid cell if work page is currently shown
  if (STATE === 'work') renderWorkCell(proj, idx);
}

function buildSequence(proj) {
  // sequence items: {type:'image', filename} or {type:'carousel', folder, slides}
  const items = [];
  (proj.images || []).forEach(f => items.push({ type: 'image', filename: f }));
  if (proj.carousel_folder) {
    items.push({ type: 'carousel', folder: proj.carousel_folder, slides: proj.carousel_slides });
  }
  // Sort by numeric prefix of filename/folder name
  items.sort((a, b) => {
    const na = parseInt((a.filename || a.folder).replace(/\D/g, ''), 10);
    const nb = parseInt((b.filename || b.folder).replace(/\D/g, ''), 10);
    return na - nb;
  });
  return items;
}

// ── IMAGE PATH HELPERS ────────────────────────────────────────────────────────
function imgSrc(proj, item, slideNum) {
  const base = `projects/${proj.folder}/images`;
  if (item.type === 'carousel') {
    return `${base}/${item.folder}/${String(slideNum).padStart(2,'0')}.jpg`;
  }
  return `${base}/${item.filename}`;
}

function imgFullSrc(proj, item, slideNum) {
  const base = `projects/${proj.folder}/images-full`;
  if (item.type === 'carousel') {
    return `${base}/${item.folder}/${String(slideNum).padStart(2,'0')}.jpg`;
  }
  return `${base}/${item.filename}`;
}

function thumbSrc(proj) {
  return `projects/${proj.folder}/thumb/01.jpg`;
}

// ── LIGHTBOX ──────────────────────────────────────────────────────────────────
let lightboxOpen = false;

function openLightbox(fullSrc) {
  if (!isDesktop || lightboxOpen) return;
  lightboxOpen = true;
  let lb = g('lightbox');
  const img = lb.querySelector('img');
  img.src = fullSrc;
  lb.classList.add('lb-visible');
  requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add('lb-active')));
}

function closeLightbox() {
  const lb = g('lightbox');
  if (!lb || !lightboxOpen) return;
  lb.classList.remove('lb-active');
  setTimeout(() => {
    lb.classList.remove('lb-visible');
    lightboxOpen = false;
    lb.querySelector('img').src = '';
  }, 150);
}

function makeImgClickable(imgEl, fullSrc) {
  if (!isDesktop) return;
  imgEl.style.cursor = 'zoom-in';
  imgEl.addEventListener('click', e => { e.stopPropagation(); openLightbox(fullSrc); });
}

// ── DESKTOP FRAME ─────────────────────────────────────────────────────────────
function applyDesktopMode() {
  if (isDesktop) document.body.classList.add('framed');
}

// ── NAME ──────────────────────────────────────────────────────────────────────
function renderName() {
  const nameTextEl = g('name-text'); if (!nameTextEl) return;
  const ns = g('name-svg'); if (!ns) return;
  const lbl = 'MICHAEL LANE BOLDT', fs = 32, hl = C.headls;
  const cv = document.createElement('canvas'), ctx = cv.getContext('2d');
  ctx.font = `bold ${fs}px Arial`;
  let w = 0;
  for (let i = 0; i < lbl.length; i++) w += ctx.measureText(lbl[i]).width;
  w += hl * fs * (lbl.length - 1); w = Math.ceil(w);
  ns.setAttribute('viewBox', `0 0 ${w} 42`); ns.setAttribute('height', '42');
  nameTextEl.setAttribute('letter-spacing', hl + 'em');
}

// ── NAV ───────────────────────────────────────────────────────────────────────
function calcNavTop() {
  const cw = g('content-wrap');
  const H = cw ? cw.offsetHeight : 400;
  return Math.round((H - (C.navgap * 3 + C.navsize)) / 2) + C.nav_offset;
}

function renderNav(invertIdx, animate) {
  const navSVG = g('nav-svg'); if (!navSVG) return;
  const W = containerW, cx = W / 2, navTop = calcNavTop();
  const { navsize: ns, navls: nls, navgap: ng, navsw: nsw,
    numoffset: numoff, dashoffset: dashoff, dashw: dw, dashgap: dgap, dashsw: dsw } = C;
  const labels = ['WORK', 'ABOUT', 'CV', 'CONTACT'];
  navSVG.setAttribute('viewBox', `0 0 ${W} ${ng*3+ns+20}`);
  navSVG.setAttribute('width', W); navSVG.setAttribute('height', ng*3+ns+20);
  navSVG.style.left = '0px'; navSVG.style.top = navTop + 'px';
  navSVG.querySelectorAll('.nav-row').forEach(el => el.remove());
  [['work-btn',0],['about-btn',1],['cv-btn',2],['contact-btn',3]].forEach(([id,i]) => {
    const btn = g(id); if (!btn) return;
    btn.style.top = (navTop + i*ng - ns) + 'px';
    btn.style.height = (ns * 2) + 'px';
  });
  labels.forEach((label, i) => {
    const y = i * ng + ns, isInv = (invertIdx === i);
    const grp = svgEl('g'); grp.setAttribute('class', 'nav-row');
    if (!isInv) grp.setAttribute('filter', 'url(#gnav)');
    if (animate) grp.style.opacity = '0';
    const fc = isInv ? '#fff' : '#111';
    if (isInv) {
      const bw = C.box_hw > 0 ? C.box_hw * 2 : W;
      const rect = svgEl('rect');
      rect.setAttribute('x', cx - bw/2); rect.setAttribute('y', y - ns - C.box_yt);
      rect.setAttribute('width', bw); rect.setAttribute('height', ns + C.box_yt + C.box_yb);
      rect.setAttribute('fill', '#111'); grp.appendChild(rect);
    }
    const num = svgEl('text');
    num.setAttribute('x', cx - numoff); num.setAttribute('y', y); num.setAttribute('text-anchor', 'end');
    num.setAttribute('font-family', 'Arial, Helvetica, sans-serif'); num.setAttribute('font-size', ns);
    num.setAttribute('font-weight', '400'); num.setAttribute('fill', fc); num.setAttribute('stroke', fc);
    num.setAttribute('stroke-width', nsw * 0.6); num.setAttribute('letter-spacing', '0.05em');
    num.textContent = String(i+1).padStart(2,'0');
    const txt = svgEl('text');
    txt.setAttribute('x', cx); txt.setAttribute('y', y); txt.setAttribute('text-anchor', 'middle');
    txt.setAttribute('font-family', 'Arial, Helvetica, sans-serif'); txt.setAttribute('font-size', ns);
    txt.setAttribute('font-weight', '400'); txt.setAttribute('fill', fc); txt.setAttribute('stroke', fc);
    txt.setAttribute('stroke-width', nsw); txt.setAttribute('letter-spacing', nls + 'em');
    txt.textContent = label;
    const dsx = cx + dashoff, dashY = y - ns * 0.28;
    [0,1].forEach(di => {
      const d = svgEl('line');
      const x1 = dsx + di*(dw+dgap);
      d.setAttribute('x1',x1); d.setAttribute('y1',dashY); d.setAttribute('x2',x1+dw); d.setAttribute('y2',dashY);
      d.setAttribute('stroke',fc); d.setAttribute('stroke-width',dsw); grp.appendChild(d);
    });
    grp.appendChild(num); grp.appendChild(txt); navSVG.appendChild(grp);
  });
}

function animateNavIn() {
  const rows = g('nav-svg').querySelectorAll('.nav-row');
  rows.forEach((r,i) => setTimeout(() => { r.style.opacity = '1'; }, i * C.t_line));
}

// ── RETURN BUTTON ─────────────────────────────────────────────────────────────
function buildNavRowSVG(label, number, inv, onClickFn, seed) {
  const { navsize: ns, navls: nls, navsw: nsw, numoffset: numoff,
    dashoffset: dashoff, dashw: dw, dashgap: dgap, dashsw: dsw } = C;
  const W = containerW, cx = W / 2;
  const retH = ns + C.box_yt + C.box_yb + 10;
  const svg = svgEl('svg');
  svg.setAttribute('width', W); svg.setAttribute('height', retH);
  svg.setAttribute('viewBox', `0 0 ${W} ${retH}`);
  svg.setAttribute('overflow', 'visible'); svg.style.display = 'block'; svg.style.cursor = 'pointer';
  const uid = uniqueId('grow');
  const defs = svgEl('defs');
  const filt = makeGrainFilter(uid, 0.09, 1.2, 4, seed || 33);
  defs.appendChild(filt); svg.appendChild(defs);
  const y = ns, fc = inv ? '#fff' : '#111';
  const grp = svgEl('g');
  if (!inv) grp.setAttribute('filter', `url(#${uid})`);
  if (inv) {
    const bw = C.box_hw > 0 ? C.box_hw * 2 : W;
    const rect = svgEl('rect');
    rect.setAttribute('x', cx - bw/2); rect.setAttribute('y', y - ns - C.box_yt);
    rect.setAttribute('width', bw); rect.setAttribute('height', ns + C.box_yt + C.box_yb);
    rect.setAttribute('fill', '#111'); grp.appendChild(rect);
  }
  const num = svgEl('text');
  num.setAttribute('x', cx - numoff); num.setAttribute('y', y); num.setAttribute('text-anchor', 'end');
  num.setAttribute('font-family', 'Arial, Helvetica, sans-serif'); num.setAttribute('font-size', ns);
  num.setAttribute('font-weight', '400'); num.setAttribute('fill', fc); num.setAttribute('stroke', fc);
  num.setAttribute('stroke-width', nsw * 0.6); num.setAttribute('letter-spacing', '0.05em');
  num.textContent = number;
  const txt = svgEl('text');
  txt.setAttribute('x', cx); txt.setAttribute('y', y); txt.setAttribute('text-anchor', 'middle');
  txt.setAttribute('font-family', 'Arial, Helvetica, sans-serif'); txt.setAttribute('font-size', ns);
  txt.setAttribute('font-weight', '400'); txt.setAttribute('fill', fc); txt.setAttribute('stroke', fc);
  txt.setAttribute('stroke-width', nsw); txt.setAttribute('letter-spacing', nls + 'em');
  txt.textContent = label;
  const dsx = cx + dashoff, dashY = y - ns * 0.28;
  [0,1].forEach(di => {
    const d = svgEl('line');
    const x1 = dsx + di*(dw+dgap);
    d.setAttribute('x1',x1); d.setAttribute('y1',dashY); d.setAttribute('x2',x1+dw); d.setAttribute('y2',dashY);
    d.setAttribute('stroke',fc); d.setAttribute('stroke-width',dsw); grp.appendChild(d);
  });
  grp.appendChild(num); grp.appendChild(txt); svg.appendChild(grp);
  if (onClickFn) svg.addEventListener('click', () => { if (!transitioning) onClickFn(); });
  return svg;
}

function buildReturnSVG(inv, onClickFn) { return buildNavRowSVG('RETURN', '00', inv, onClickFn, 33); }

function buildDownloadRow() {
  const svg = buildNavRowSVG('DOWNLOAD CV', '00', false, null, 41);
  svg.addEventListener('click', () => window.open('assets/MICHAEL_BOLDT_CV.pdf', '_blank'));
  return svg;
}

function placeReturnAbs(container, onClickFn) {
  const wrap = document.createElement('div');
  wrap.className = 'return-abs';
  wrap.style.cssText = `position:absolute;left:0;right:0;bottom:${C.ret_bottom}px;pointer-events:all;`;
  wrap.appendChild(buildReturnSVG(false, onClickFn));
  container.appendChild(wrap); activeReturnWrapper = wrap; return wrap;
}

function placeReturnFlow(container, onClickFn) {
  const wrap = document.createElement('div');
  wrap.style.cssText = `margin-top:${C.ret_margin}px;opacity:0;`;
  wrap.appendChild(buildReturnSVG(false, onClickFn));
  container.appendChild(wrap); activeReturnWrapper = wrap; return wrap;
}

function invertActiveReturn(inv, onClickFn) {
  if (!activeReturnWrapper) return;
  activeReturnWrapper.innerHTML = '';
  activeReturnWrapper.appendChild(buildReturnSVG(inv, onClickFn));
}

// ── TRANSITIONS ───────────────────────────────────────────────────────────────
function doInvertFlashGo(invertFn, goCb) {
  invertFn(true);
  setTimeout(() => {
    invertFn(false);
    const fl = g('flash-overlay');
    fl.style.display = 'block'; fl.style.opacity = '1';
    setTimeout(() => {
      if (goCb) goCb();
      fl.style.opacity = '0'; setTimeout(() => fl.style.display = 'none', 80);
    }, C.t_blank);
  }, C.t_invert);
}

function showHome(animate) {
  ['work-page','project-page','about-page','cv-page','contact-page'].forEach(id => {
    const el = g(id); if (!el) return; el.style.display = 'none'; el.scrollTop = 0;
  });
  ['work-inner','project-inner','about-inner','cv-inner','contact-inner'].forEach(id => {
    const el = g(id); if (el) el.innerHTML = '';
  });
  activeReturnWrapper = null; currentProject = null;
  const hp = g('home-page'); if (hp) hp.style.display = 'block';
  STATE = 'home'; transitioning = false;
  renderNav(-1, animate); renderData();
  if (animate) setTimeout(() => animateNavIn(), 80);
}

function triggerReturnToHome() {
  if (transitioning) return; transitioning = true;
  doInvertFlashGo(inv => invertActiveReturn(inv, triggerReturnToHome), () => showHome(true));
}

function triggerReturnToWork() {
  if (transitioning) return; transitioning = true;
  doInvertFlashGo(inv => invertActiveReturn(inv, triggerReturnToWork), () => {
    const pp = g('project-page'); if (pp) { pp.style.display = 'none'; pp.scrollTop = 0; }
    const pi = g('project-inner'); if (pi) pi.innerHTML = '';
    activeReturnWrapper = null;
    const wp = g('work-page'); if (wp) { wp.style.display = 'block'; wp.scrollTop = 0; }
    STATE = 'work'; transitioning = false; buildWorkGrid();
  });
}

// ── DATA BLOCK (SVG with grain) ───────────────────────────────────────────────
function renderData() {
  const block = g('data-block'); if (!block) return;
  const existing = block.querySelector('svg.data-svg');
  if (existing) existing.remove();
  const vals = getLive();
  const W = containerW;
  const fs = C.dsize, dls = C.dls, dlh = C.dlh, dsw = C.dsw;
  const lsw = C.leadersw, dgap = C.dgap;
  const dlpad = C.dlpad, drpad = C.drpad;
  const half = Math.ceil(DATA_FIELDS.length / 2);
  const lineH = fs * dlh;
  const colW = (W - dgap) / 2;
  const totalH = half * lineH + 2;
  const uid = uniqueId('gdata');
  const svg = svgEl('svg');
  svg.setAttribute('width', W); svg.setAttribute('height', totalH);
  svg.setAttribute('viewBox', `0 0 ${W} ${totalH}`);
  svg.setAttribute('overflow', 'visible');
  svg.style.cssText = 'display:block;position:absolute;bottom:0;left:0;';
  svg.classList.add('data-svg');
  const defs = svgEl('defs');
  const filt = makeGrainFilter(uid, C.bfreq, C.bdisp, C.boct, C.bseed);
  filt.setAttribute('x', '-2%'); filt.setAttribute('y', '-5%');
  filt.setAttribute('width', '106%'); filt.setAttribute('height', '115%');
  defs.appendChild(filt); svg.appendChild(defs);
  const grp = svgEl('g'); grp.setAttribute('filter', `url(#${uid})`);
  const mc = document.createElement('canvas');
  const mctx = mc.getContext('2d');
  mctx.font = fs + 'px Arial';
  [DATA_FIELDS.slice(0, half), DATA_FIELDS.slice(half)].forEach((colItems, ci) => {
    const colX = ci === 0 ? 0 : colW + dgap;
    const padL = ci === 0 ? dlpad : 0;
    const padR = ci === 1 ? drpad : 0;
    const innerW = colW - padL - padR;
    colItems.forEach((field, fi) => {
      const val = vals[field.id] || '—';
      const y = fi * lineH + fs;
      const keyEl = svgEl('text');
      keyEl.setAttribute('x', colX + padL); keyEl.setAttribute('y', y);
      keyEl.setAttribute('font-family', 'Arial, Helvetica, sans-serif');
      keyEl.setAttribute('font-size', fs); keyEl.setAttribute('font-weight', '400');
      keyEl.setAttribute('fill', '#111'); keyEl.setAttribute('stroke', '#111');
      keyEl.setAttribute('stroke-width', dsw); keyEl.setAttribute('letter-spacing', dls + 'em');
      keyEl.textContent = field.label; grp.appendChild(keyEl);
      const valEl = svgEl('text');
      valEl.setAttribute('x', colX + colW - padR); valEl.setAttribute('y', y);
      valEl.setAttribute('text-anchor', 'end');
      valEl.setAttribute('font-family', 'Arial, Helvetica, sans-serif');
      valEl.setAttribute('font-size', fs); valEl.setAttribute('font-weight', '400');
      valEl.setAttribute('fill', '#111'); valEl.setAttribute('stroke', '#111');
      valEl.setAttribute('stroke-width', dsw); valEl.setAttribute('letter-spacing', dls + 'em');
      valEl.textContent = val; grp.appendChild(valEl);
      const keyW = mctx.measureText(field.label).width;
      const valW = mctx.measureText(val).width;
      const lx1 = colX + padL + keyW + 2;
      const lx2 = colX + colW - padR - valW - 2;
      const leaderY = y - fs * 0.35;
      if (lx2 > lx1 + 4) {
        const leader = svgEl('line');
        leader.setAttribute('x1', lx1); leader.setAttribute('y1', leaderY);
        leader.setAttribute('x2', lx2); leader.setAttribute('y2', leaderY);
        leader.setAttribute('stroke', '#111'); leader.setAttribute('stroke-width', lsw);
        grp.appendChild(leader);
      }
    });
  });
  svg.appendChild(grp); block.appendChild(svg);
}

// ── ABOUT / CONTACT ───────────────────────────────────────────────────────────
function buildSubContent(textLineBlocks, container) {
  container.innerHTML = ''; if (container.parentElement) container.parentElement.scrollTop = 0;
  const W = containerW;
  const innerW = W - C.pad * 2;
  const textW = innerW - C.blpad - C.brpad;
  const cv = document.createElement('canvas'), mctx = cv.getContext('2d');
  mctx.font = C.bsize + 'px Arial';
  const lineH = C.bsize * C.blh;
  const allItems = [];
  textLineBlocks.forEach((block, bi) => {
    const lines = Array.isArray(block) ? block : wrapText(mctx, block, textW);
    lines.forEach(line => allItems.push({ text: line, gap: false }));
    if (bi < textLineBlocks.length - 1) allItems.push({ text: null, gap: true });
  });
  const textCount = allItems.filter(l => !l.gap).length;
  const gapCount = allItems.filter(l => l.gap).length;
  const totalH = C.btpad + textCount * lineH + gapCount * C.pgap + 40;
  const uid = uniqueId('gbody');
  const svg = svgEl('svg');
  svg.setAttribute('width', innerW); svg.setAttribute('height', totalH);
  svg.setAttribute('viewBox', `0 0 ${innerW} ${totalH}`);
  svg.setAttribute('overflow', 'visible'); svg.style.display = 'block'; svg.style.marginLeft = C.pad + 'px';
  const defs = svgEl('defs');
  const filt = makeGrainFilter(uid, C.bfreq, C.bdisp, C.boct, C.bseed);
  filt.setAttribute('x','-2%'); filt.setAttribute('y','-5%'); filt.setAttribute('width','106%'); filt.setAttribute('height','115%');
  defs.appendChild(filt); svg.appendChild(defs);
  const grp = svgEl('g'); grp.setAttribute('filter', `url(#${uid})`);
  let y = C.btpad + C.bsize;
  const renderedLines = [];
  allItems.forEach(item => {
    if (item.gap) { y += C.pgap; return; }
    const el = svgEl('text');
    el.setAttribute('x', C.blpad); el.setAttribute('y', y);
    el.setAttribute('font-family', 'Arial, Helvetica, sans-serif');
    el.setAttribute('font-size', C.bsize); el.setAttribute('font-weight', '400');
    el.setAttribute('letter-spacing', C.bls + 'em'); el.setAttribute('fill', '#111');
    el.setAttribute('stroke', '#111'); el.setAttribute('stroke-width', C.bsw);
    el.style.opacity = '0'; el.textContent = item.text;
    grp.appendChild(el); renderedLines.push(el); y += lineH;
  });
  svg.appendChild(grp); container.appendChild(svg);
  return renderedLines;
}

function triggerToSubPage(navInvertIdx, pageId, buildFn, returnFn, textBlocks) {
  if (transitioning || STATE !== 'home') return;
  transitioning = true;
  renderNav(navInvertIdx, false);
  setTimeout(() => {
    renderNav(-1, false);
    const fl = g('flash-overlay');
    fl.style.display = 'block'; fl.style.opacity = '1';
    setTimeout(() => {
      fl.style.opacity = '0'; setTimeout(() => fl.style.display = 'none', 80);
      const hp = g('home-page'); if (hp) hp.style.display = 'none';
      const page = g(pageId); if (page) { page.style.display = 'block'; page.scrollTop = 0; }
      STATE = pageId.replace('-page', '');
      if (textBlocks) {
        const inner = g(pageId.replace('-page', '-inner'));
        const lines = buildSubContent(textBlocks, inner);
        placeReturnAbs(inner, returnFn);
        setTimeout(() => {
          lines.forEach((el, i) => {
            setTimeout(() => {
              el.style.opacity = '1';
              if (i === lines.length - 1) transitioning = false;
            }, i * C.t_line);
          });
        }, 60);
      } else {
        buildFn(); transitioning = false;
      }
    }, C.t_blank);
  }, C.t_invert);
}

// ── WORK GRID ─────────────────────────────────────────────────────────────────
function buildWorkGrid() {
  const container = g('work-inner'); if (!container) return;
  container.innerHTML = ''; if (container.parentElement) container.parentElement.scrollTop = 0;
  const W = containerW;
  const { col_gap: cg, row_gap: rg, grid_pad: gp, grid_top: gt,
    title_size: ts, title_ls: tls, title_sw: tsw, title_pad: tp, title_bpad: tbp } = C;
  container.style.cssText = `padding:${gt}px ${gp}px 0 ${gp}px;width:100%;overflow-x:hidden;box-sizing:border-box;`;
  const totalInner = W - gp * 2;
  const cellW = Math.floor((totalInner - cg) / 2);

  // Create grid container
  const grid = document.createElement('div');
  grid.id = 'work-grid';
  grid.style.cssText = `display:grid;grid-template-columns:${cellW}px ${cellW}px;column-gap:${cg}px;width:${totalInner}px;`;
  container.appendChild(grid);

  // Create placeholder cells for all projects (in order)
  // Fill with actual content as projects load
  const maxProjects = PROJECTS.length || 8;
  for (let i = 0; i < maxProjects; i++) {
    const cell = document.createElement('div');
    cell.id = `work-cell-${i}`;
    cell.style.cssText = `display:flex;flex-direction:column;cursor:pointer;overflow:hidden;margin-bottom:${rg}px;opacity:0;`;
    grid.appendChild(cell);
    // If project already loaded, render it
    if (PROJECTS[i]) renderWorkCell(PROJECTS[i], i);
  }

  const ret = placeReturnFlow(container, triggerReturnToHome);
  setTimeout(() => { ret.style.opacity = '1'; }, 200);
}

function renderWorkCell(proj, idx) {
  const cell = document.getElementById(`work-cell-${idx}`);
  if (!cell) return;
  cell.innerHTML = '';
  const W = containerW;
  const { col_gap: cg, grid_pad: gp, title_size: ts, title_ls: tls,
    title_sw: tsw, title_pad: tp, title_bpad: tbp } = C;
  const totalInner = W - gp * 2;
  const cellW = Math.floor((totalInner - cg) / 2);

  const imgDiv = document.createElement('div');
  imgDiv.style.cssText = 'width:100%;aspect-ratio:4/5;background:#111;overflow:hidden;';
  const img = document.createElement('img');
  img.src = thumbSrc(proj); img.alt = proj.title;
  img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
  imgDiv.appendChild(img);

  const uid2 = uniqueId('gt');
  const H = ts + 4;
  const tsvg = svgEl('svg');
  tsvg.setAttribute('width', cellW); tsvg.setAttribute('height', H);
  tsvg.setAttribute('viewBox', `0 0 ${cellW} ${H}`);
  tsvg.setAttribute('overflow', 'hidden');
  tsvg.style.cssText = `display:block;margin-top:${tp}px;margin-bottom:${tbp}px;`;
  const tdefs = svgEl('defs');
  const tfilt = makeGrainFilter(uid2, 0.09, 0.8, 3, 17);
  tdefs.appendChild(tfilt); tsvg.appendChild(tdefs);
  const tgrp = svgEl('g'); tgrp.setAttribute('filter', `url(#${uid2})`);
  const ttxt = svgEl('text');
  ttxt.setAttribute('x', cellW/2); ttxt.setAttribute('y', ts); ttxt.setAttribute('text-anchor', 'middle');
  ttxt.setAttribute('font-family', 'Arial, Helvetica, sans-serif'); ttxt.setAttribute('font-size', ts);
  ttxt.setAttribute('font-weight', '700'); ttxt.setAttribute('fill', '#111'); ttxt.setAttribute('stroke', '#111');
  ttxt.setAttribute('stroke-width', tsw); ttxt.setAttribute('letter-spacing', tls + 'em');
  ttxt.textContent = proj.title;
  tgrp.appendChild(ttxt); tsvg.appendChild(tgrp);

  cell.appendChild(imgDiv); cell.appendChild(tsvg);
  cell.addEventListener('click', () => { if (!transitioning && STATE === 'work') triggerToProject(proj); });
  cell.style.opacity = '1';
}

// ── CAROUSEL ──────────────────────────────────────────────────────────────────
function buildCarouselCounter(total, idx) {
  const { cnt_size: s, cnt_sw: sw, cnt_pad: cp, cnt_h: ch } = C;
  const W = containerW;
  const uid = uniqueId('gcnt');
  const svg = svgEl('svg');
  svg.setAttribute('width', W); svg.setAttribute('height', ch);
  svg.setAttribute('viewBox', `0 0 ${W} ${ch}`); svg.style.display = 'block';
  const defs = svgEl('defs');
  const filt = makeGrainFilter(uid, 0.09, 1.0, 4, 25);
  defs.appendChild(filt); svg.appendChild(defs);
  const y = ch * 0.72;
  const grp = svgEl('g'); grp.setAttribute('filter', `url(#${uid})`);
  const mkT = (x, anchor, content) => {
    const t = svgEl('text');
    t.setAttribute('x', x); t.setAttribute('y', y); t.setAttribute('text-anchor', anchor);
    t.setAttribute('font-family', 'Arial, Helvetica, sans-serif'); t.setAttribute('font-size', s);
    t.setAttribute('font-weight', '400'); t.setAttribute('fill', '#111');
    if (sw > 0) { t.setAttribute('stroke', '#111'); t.setAttribute('stroke-width', sw); }
    t.textContent = content; return t;
  };
  grp.appendChild(mkT(cp, 'start', String(idx+1).padStart(2,'0')));
  grp.appendChild(mkT(W/2, 'middle', '/'));
  grp.appendChild(mkT(W - cp, 'end', String(total).padStart(2,'0')));
  svg.appendChild(grp); return svg;
}

function buildCarousel(item, proj, container) {
  const total = item.slides;
  const { img_pad: ip, img_gap: ig } = C;
  const W = containerW;
  const imgW = W - ip * 2;
  let idx = 0;

  const outerWrap = document.createElement('div');
  outerWrap.style.cssText = `position:relative;width:${imgW}px;margin-left:${ip}px;margin-bottom:${ig}px;`;

  const wrap = document.createElement('div');
  wrap.style.cssText = `position:relative;width:${imgW}px;overflow:hidden;touch-action:pan-y;`;

  const track = document.createElement('div');
  track.style.cssText = `display:flex;transition:transform 0.25s ease;will-change:transform;`;

  for (let i = 0; i < total; i++) {
    const slide = document.createElement('div');
    slide.style.cssText = `flex-shrink:0;width:${imgW}px;background:#111;overflow:hidden;`;
    const img = document.createElement('img');
    img.src = imgSrc(proj, item, i+1); img.alt = `${proj.title} ${i+1}`;
    img.style.cssText = 'width:100%;height:auto;display:block;';
    makeImgClickable(img, imgFullSrc(proj, item, i+1));
    slide.appendChild(img); track.appendChild(slide);
  }
  wrap.appendChild(track);

  // Desktop invisible click zones — left third = prev, right third = next
  if (isDesktop) {
    const zoneStyle = `position:absolute;top:0;bottom:0;width:33%;z-index:5;cursor:pointer;`;
    const prevZone = document.createElement('div');
    prevZone.style.cssText = zoneStyle + 'left:0;';
    prevZone.addEventListener('click', () => { if (idx > 0) goTo(idx - 1); });
    const nextZone = document.createElement('div');
    nextZone.style.cssText = zoneStyle + 'right:0;';
    nextZone.addEventListener('click', () => { if (idx < total - 1) goTo(idx + 1); });
    wrap.appendChild(prevZone);
    wrap.appendChild(nextZone);
  }

  outerWrap.appendChild(wrap);
  const cntC = document.createElement('div');
  outerWrap.appendChild(cntC);
  container.appendChild(outerWrap);

  function goTo(i) {
    idx = i;
    track.style.transform = `translateX(-${i*imgW}px)`;
    cntC.innerHTML = ''; cntC.appendChild(buildCarouselCounter(total, idx));
  }
  goTo(0);

  // Touch/mouse swipe
  let sx = 0;
  wrap.addEventListener('mousedown', e => { sx = e.clientX; });
  wrap.addEventListener('mouseup', e => {
    const dx = e.clientX - sx;
    if (Math.abs(dx) > 20) { if (dx < 0 && idx < total-1) goTo(idx+1); else if (dx > 0 && idx > 0) goTo(idx-1); }
  });
  wrap.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  wrap.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 30) { if (dx < 0 && idx < total-1) goTo(idx+1); else if (dx > 0 && idx > 0) goTo(idx-1); }
  });
}

// ── PROJECT PAGE ──────────────────────────────────────────────────────────────
function triggerToProject(proj) {
  if (transitioning || STATE !== 'work') return;
  transitioning = true; currentProject = proj;
  const fl = g('flash-overlay');
  fl.style.display = 'block'; fl.style.opacity = '1';
  setTimeout(() => {
    fl.style.opacity = '0'; setTimeout(() => fl.style.display = 'none', 80);
    const wp = g('work-page'); if (wp) wp.style.display = 'none';
    const pp = g('project-page'); if (pp) { pp.style.display = 'block'; pp.scrollTop = 0; }
    STATE = 'project'; transitioning = false; buildProjectPage(proj);
  }, C.t_blank);
}

function buildProjectPage(proj) {
  const container = g('project-inner'); if (!container) return;
  container.innerHTML = ''; if (container.parentElement) container.parentElement.scrollTop = 0;
  activeReturnWrapper = null;
  const W = containerW;
  const { img_pad: ip, img_gap: ig, ptitle_size: pts, ptitle_top: ptt, ptitle_bot: ptb,
    pdesc_size: pds, pdesc_ls: pdl, pdesc_lh: pdlh, pdesc_sw: pdsw, pdesc_pad: pdp, pdesc_top: pdt } = C;

  // Render images from the sequence array
  (proj.sequence || []).forEach(item => {
    if (item.type === 'carousel') {
      buildCarousel(item, proj, container);
    } else {
      const imgW = W - ip * 2;
      const imgDiv = document.createElement('div');
      imgDiv.style.cssText = `width:${imgW}px;background:#111;margin-left:${ip}px;margin-bottom:${ig}px;overflow:hidden;flex-shrink:0;`;
      const img = document.createElement('img');
      img.src = imgSrc(proj, item); img.alt = proj.title;
      img.style.cssText = 'width:100%;height:auto;display:block;';
      makeImgClickable(img, imgFullSrc(proj, item));
      imgDiv.appendChild(img); container.appendChild(imgDiv);
    }
  });

  // Project title
  const ptWrap = document.createElement('div');
  ptWrap.style.cssText = `padding:${ptt}px ${pdp}px ${ptb}px ${pdp}px;overflow:hidden;`;
  const uid3 = uniqueId('gptitle');
  const ptW = W - pdp * 2;
  const ptSVG = svgEl('svg');
  ptSVG.setAttribute('width', ptW); ptSVG.setAttribute('height', pts + 6);
  ptSVG.setAttribute('viewBox', `0 0 ${ptW} ${pts + 6}`);
  ptSVG.setAttribute('overflow', 'visible'); ptSVG.style.display = 'block';
  const ptd = svgEl('defs');
  const ptf = makeGrainFilter(uid3, C.hfreq, C.hdisp, C.hoct, C.hseed);
  ptd.appendChild(ptf); ptSVG.appendChild(ptd);
  const ptxt = svgEl('text');
  ptxt.setAttribute('x', '0'); ptxt.setAttribute('y', pts);
  ptxt.setAttribute('font-family', 'Arial, Helvetica, sans-serif'); ptxt.setAttribute('font-size', pts);
  ptxt.setAttribute('font-weight', '700'); ptxt.setAttribute('letter-spacing', '0em');
  ptxt.setAttribute('fill', '#111'); ptxt.setAttribute('stroke', '#111'); ptxt.setAttribute('stroke-width', '0.4');
  ptxt.setAttribute('filter', `url(#${uid3})`); ptxt.textContent = proj.title;
  ptSVG.appendChild(ptxt); ptWrap.appendChild(ptSVG); container.appendChild(ptWrap);

  // Description
  const descDiv = document.createElement('div');
  descDiv.style.cssText = `padding:${pdt}px ${pdp}px 0 ${pdp}px;overflow:hidden;`;
  const textW = W - pdp * 2;
  const mc = document.createElement('canvas'), mctx = mc.getContext('2d');
  mctx.font = pds + 'px Arial';
  const lines = wrapText(mctx, proj.desc, textW);
  const lH = pds * pdlh, tH = lines.length * lH + 4;
  const uid = uniqueId('gbody');
  const svg = svgEl('svg');
  svg.setAttribute('width', textW); svg.setAttribute('height', tH);
  svg.setAttribute('viewBox', `0 0 ${textW} ${tH}`); svg.setAttribute('overflow', 'visible');
  svg.style.display = 'block';
  const d2 = svgEl('defs');
  const f2 = makeGrainFilter(uid, C.bfreq, C.bdisp, C.boct, C.bseed);
  f2.setAttribute('x','-2%'); f2.setAttribute('y','-5%'); f2.setAttribute('width','106%'); f2.setAttribute('height','115%');
  d2.appendChild(f2); svg.appendChild(d2);
  const grp2 = svgEl('g'); grp2.setAttribute('filter', `url(#${uid})`);
  let y = pds;
  lines.forEach(line => {
    const el = svgEl('text');
    el.setAttribute('x','0'); el.setAttribute('y', y);
    el.setAttribute('font-family','Arial, Helvetica, sans-serif'); el.setAttribute('font-size', pds);
    el.setAttribute('font-weight','400'); el.setAttribute('letter-spacing', pdl + 'em'); el.setAttribute('fill','#111');
    if (pdsw > 0) { el.setAttribute('stroke','#111'); el.setAttribute('stroke-width', pdsw); }
    el.textContent = line; grp2.appendChild(el); y += lH;
  });
  svg.appendChild(grp2); descDiv.appendChild(svg); container.appendChild(descDiv);
  const ret = placeReturnFlow(container, triggerReturnToWork);
  ret.style.opacity = '1';
}

// ── CV PAGE ───────────────────────────────────────────────────────────────────
function buildCVPage() {
  const container = g('cv-inner'); if (!container) return;
  container.innerHTML = ''; if (container.parentElement) container.parentElement.scrollTop = 0;
  activeReturnWrapper = null;
  const W = containerW;
  const { bsize: fs, bls, blh, bsw, bfreq, bdisp, boct, bseed, pgap, cv_pad, cv_tpad, cv_sgap } = C;
  const SW_HEAVY = 0.8, SW_LIGHT = 0.4;
  const lineH = fs * blh;
  const contentW = W - cv_pad * 2 - 2;
  const mc = document.createElement('canvas'), mctx = mc.getContext('2d');
  mctx.font = fs + 'px Arial';
  const renderList = [];
  let y = cv_tpad;
  CV_LINES.forEach((line, li) => {
    const isSection = line.text.startsWith('#');
    const isDouble  = line.text.startsWith('>>');
    const isSingle  = line.text.startsWith('>') && !isDouble;
    if (isSection && li > 0) y += cv_sgap;
    if (isSingle && line.text.includes('::')) {
      const sepIdx = line.text.indexOf('::');
      const leftText = line.text.slice(0, sepIdx).trimEnd();
      const dateText = ':: ' + line.text.slice(sepIdx + 2).trimStart();
      const wrappedLeft = wrapText(mctx, leftText, contentW);
      wrappedLeft.forEach((wline, wi) => {
        y += lineH;
        const isLast = wi === wrappedLeft.length - 1;
        if (isLast) {
          renderList.push({ segments: [{ text: wline, sw: SW_HEAVY }, { text: ' ' + dateText, sw: SW_LIGHT }], y });
        } else {
          renderList.push({ segments: [{ text: wline, sw: SW_HEAVY }], y });
        }
      });
    } else if (isSection) {
      y += lineH;
      renderList.push({ segments: [{ text: line.text.slice(2), sw: SW_HEAVY }], y });
    } else {
      const sw = isDouble ? SW_LIGHT : SW_HEAVY;
      const wrapped = wrapText(mctx, line.text, contentW);
      wrapped.forEach(wline => { y += lineH; renderList.push({ segments: [{ text: wline, sw }], y }); });
    }
    if (isSection) y += pgap;
  });
  const totalH = y + pgap + 10;
  const uid = uniqueId('gcv');
  const svg = svgEl('svg');
  svg.setAttribute('width', contentW); svg.setAttribute('height', totalH);
  svg.setAttribute('viewBox', `0 0 ${contentW} ${totalH}`);
  svg.setAttribute('overflow', 'visible');
  svg.style.cssText = `display:block;margin-left:${cv_pad}px;`;
  const defs = svgEl('defs');
  const filt = makeGrainFilter(uid, bfreq, bdisp, boct, bseed);
  filt.setAttribute('x', '-2%'); filt.setAttribute('y', '-5%');
  filt.setAttribute('width', '106%'); filt.setAttribute('height', '115%');
  defs.appendChild(filt); svg.appendChild(defs);

  function mkCVText(x, y, text, sw) {
    const el = svgEl('text');
    el.setAttribute('x', x); el.setAttribute('y', y);
    el.setAttribute('font-family', 'Arial, Helvetica, sans-serif');
    el.setAttribute('font-size', fs); el.setAttribute('font-weight', '400');
    el.setAttribute('fill', '#111'); el.setAttribute('stroke', '#111');
    el.setAttribute('stroke-width', sw); el.setAttribute('letter-spacing', bls + 'em');
    el.setAttribute('filter', `url(#${uid})`);
    el.style.opacity = '0'; el.textContent = text; return el;
  }

  const groups = [];
  renderList.forEach(r => {
    const lineEls = [];
    if (r.segments.length === 1) {
      const el = mkCVText(0, r.y, r.segments[0].text, r.segments[0].sw);
      svg.appendChild(el); lineEls.push(el);
    } else {
      const leftEl = mkCVText(0, r.y, r.segments[0].text, r.segments[0].sw);
      svg.appendChild(leftEl); lineEls.push(leftEl);
      const dateText = r.segments[1].text.trim();
      const rightEl = mkCVText(contentW, r.y, dateText, r.segments[1].sw);
      rightEl.setAttribute('text-anchor', 'end');
      svg.appendChild(rightEl); lineEls.push(rightEl);
    }
    groups.push(lineEls);
  });
  container.appendChild(svg);
  const dlWrap = document.createElement('div');
  dlWrap.style.cssText = `margin-top:${C.ret_margin}px;opacity:0;`;
  dlWrap.appendChild(buildDownloadRow());
  container.appendChild(dlWrap);
  const retWrap = placeReturnFlow(container, triggerReturnToHome);
  groups.forEach((grp, gi) => {
    setTimeout(() => {
      grp.forEach(el => el.style.opacity = '1');
      if (gi === groups.length - 1) setTimeout(() => { dlWrap.style.opacity = '1'; retWrap.style.opacity = '1'; }, 80);
    }, gi * C.t_line);
  });
}

// ── NAV TRIGGERS ──────────────────────────────────────────────────────────────
function triggerToWork() {
  if (transitioning || STATE !== 'home') return;
  transitioning = true;
  renderNav(0, false);
  setTimeout(() => {
    renderNav(-1, false);
    const fl = g('flash-overlay');
    fl.style.display = 'block'; fl.style.opacity = '1';
    setTimeout(() => {
      fl.style.opacity = '0'; setTimeout(() => fl.style.display = 'none', 80);
      const hp = g('home-page'); if (hp) hp.style.display = 'none';
      const wp = g('work-page'); if (wp) { wp.style.display = 'block'; wp.scrollTop = 0; }
      STATE = 'work'; transitioning = false;
      buildWorkGrid();
      loadProjects();
    }, C.t_blank);
  }, C.t_invert);
}

// ── INIT ──────────────────────────────────────────────────────────────────────
function init() {
  applyDesktopMode();
  requestAnimationFrame(() => requestAnimationFrame(() => {
    containerW = getContainerW();
    renderName(); renderData(); renderNav(-1, false);

    const wb = g('work-btn');    if (wb) wb.addEventListener('click', triggerToWork);
    const ab = g('about-btn');   if (ab) ab.addEventListener('click', () => triggerToSubPage(1,'about-page',null,triggerReturnToHome,ABOUT_PARAS));
    const cb = g('cv-btn');      if (cb) cb.addEventListener('click', () => triggerToSubPage(2,'cv-page',buildCVPage,triggerReturnToHome,null));
    const ctb = g('contact-btn'); if (ctb) ctb.addEventListener('click', () => triggerToSubPage(3,'contact-page',null,triggerReturnToHome,CONTACT_LINES));

    const na = g('name-area');
    if (na) na.addEventListener('click', () => {
      if (STATE !== 'home' && !transitioning) {
        transitioning = true;
        doInvertFlashGo(inv => invertActiveReturn(inv, null), () => showHome(true));
      }
    });

    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
    const hp = g('home-page'); if (hp) hp.style.display = 'block';

    setInterval(() => {
      const now = new Date();
      const ts = g('status-time');
      if (ts) ts.textContent = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0');
      if (STATE === 'home') renderData();
    }, 1000);

    window.addEventListener('resize', () => {
      containerW = getContainerW();
      renderNav(-1, false);
      if (STATE === 'home') renderData();
    });
  }));
}

document.addEventListener('DOMContentLoaded', init);
