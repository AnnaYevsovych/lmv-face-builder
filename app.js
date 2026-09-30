
const K = "#2b2b2b",
  ST = `fill="none" stroke="${K}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"`;

const COL = {
  skin: ["#F1D0B5", "#D9A97F", "#A9724B", "#6B4430"],
  hair: ["#1E1A18", "#5A3A22", "#B8863B", "#B9B9B9"],
  eye: ["#3B5B8C", "#4C7A4A", "#5B3B22", "#4A4F55"],
};

const ears = (c) =>
  [68, 232]
    .map(
      (x) =>
        `<ellipse cx="${x}" cy="185" rx="12" ry="22" fill="${c.skin}" stroke="${K}" stroke-width="2"/>`,
    )
    .join("");
const face = (n, d) => ({
  n,
  f: (c) =>
    ears(c) +
    `<path d="${d}" fill="${c.skin}" stroke="${K}" stroke-width="2"/>`,
});
const eye = (n, w, h) => ({
  n,
  f: (c) =>
    [110, 190]
      .map(
        (x) =>
          `<ellipse cx="${x}" cy="150" rx="${w}" ry="${h}" fill="#fff" stroke="${K}" stroke-width="2"/><circle cx="${x}" cy="150" r="${h * 0.75}" fill="${c.eye}"/><circle cx="${x}" cy="150" r="${h * 0.3}" fill="#111"/>`,
      )
      .join(""),
});
const brow = (n, d) => ({
  n,
  f: (c) =>
    `<path d="${d}" fill="none" stroke="${c.hair}" stroke-width="7" stroke-linecap="round"/>`,
});
const path = (n, d, extra) => ({
  n,
  f: (c) => `<path d="${d}" ${extra ? extra(c) : ST}/>`,
});
const HF =
  "M70 165C58 70 105 42 150 42C195 42 242 70 230 165C215 108 190 92 150 92C110 92 85 108 70 165Z";
const hf = (d) => (c) =>
  `<path d="${d}" fill="${c.hair}" stroke="${K}" stroke-width="2"/>`;

const OPT = {
  face: [
    face(
      "Овальне",
      "M150 55C205 55 232 105 230 165C228 235 195 310 150 310C105 310 72 235 70 165C68 105 95 55 150 55Z",
    ),
    face(
      "Кругле",
      "M150 75C215 75 240 125 236 180C232 250 200 305 150 305C100 305 68 250 64 180C60 125 85 75 150 75Z",
    ),
    face("Квадратне", "M75 70H225V250Q225 310 150 315Q75 310 75 250Z"),
  ],
  hair: [
    { n: "Лисий" },
    { n: "Коротке", f: hf(HF) },
    {
      n: "Довге",
      b: hf("M62 170C45 60 105 32 150 32C195 32 255 60 238 170V310H62Z"),
      f: hf(HF),
    },
    {
      n: "Чубчик",
      f: hf(
        "M68 170C55 70 105 40 150 40C200 40 240 70 232 170C225 120 200 100 120 100C100 110 80 130 68 170Z",
      ),
    },
  ],
  brows: [
    brow("Прямі", "M88 125H128M172 125H212"),
    brow("Дугою", "M88 128Q108 114 128 124M172 124Q192 114 212 128"),
    brow("Зведені", "M88 130L128 118M172 118L212 130"),
  ],
  eyes: [eye("Мигдалеві", 18, 9), eye("Круглі", 16, 13), eye("Вузькі", 20, 6)],
  nose: [
    path("Вузький", "M150 165Q140 195 138 208Q150 216 162 208"),
    path("Широкий", "M150 165Q134 195 128 210Q150 224 172 210"),
    path("Гострий", "M150 165L141 208L150 213L159 208Z"),
  ],
  mouth: [
    path("Усмішка", "M120 250Q150 272 180 250"),
    path("Пряма", "M122 252H178"),
    path(
      "Повні",
      "M116 250Q133 238 150 245Q167 238 184 250Q150 278 116 250Z",
      () => `fill="#B5524F" stroke="${K}" stroke-width="2"`,
    ),
  ],
  beard: [
    { n: "Немає" },
    { n: "Вуса", f: hf("M112 234Q150 220 188 234Q150 246 112 234Z") },
    { n: "Борідка", f: hf("M125 268Q150 335 175 268Q150 282 125 268Z") },
    {
      n: "Борода",
      f: hf(
        "M74 200Q78 330 150 336Q222 330 226 200Q205 272 150 276Q95 272 74 200Z",
      ),
    },
  ],
  glasses: [
    { n: "Немає" },
    {
      n: "Круглі",
      f: () =>
        `<g stroke="${K}" stroke-width="3" fill="rgba(255,255,255,.18)"><circle cx="110" cy="150" r="24"/><circle cx="190" cy="150" r="24"/><path d="M134 148Q150 140 166 148" fill="none"/></g>`,
    },
    {
      n: "Прямокутні",
      f: () =>
        `<g stroke="${K}" stroke-width="3" fill="rgba(255,255,255,.18)"><rect x="84" y="134" width="52" height="34" rx="6"/><rect x="164" y="134" width="52" height="34" rx="6"/><path d="M136 146H164" fill="none"/></g>`,
    },
  ],
  marks: [
    { n: "Немає" },
    {
      n: "Родимка",
      f: () => `<circle cx="190" cy="228" r="3.5" fill="#3a2a20"/>`,
    },
    {
      n: "Шрам",
      f: () =>
        `<path d="M92 190L112 232M88 208L98 204M100 224L110 218" stroke="#B9605A" stroke-width="3" fill="none" stroke-linecap="round"/>`,
    },
  ],
};

const META = {
  face: [
    "Обличчя",
    "Яка форма обличчя: овальне, кругле чи квадратне?",
    "50 30 200 300",
    [150, 180],
  ],
  hair: [
    "Волосся",
    "Яка зачіска? Чи було волосся довгим, коротким, чи людина лиса?",
    "40 20 220 310",
    [150, 180],
  ],
  brows: [
    "Брови",
    "Які брови: прямі, дугою чи зведені до перенісся?",
    "70 100 160 50",
    [150, 125],
  ],
  eyes: [
    "Очі",
    "Які очі: великі, круглі чи вузькі? Який колір?",
    "80 120 140 60",
    [150, 150],
  ],
  nose: [
    "Ніс",
    "Ніс вузький, широкий чи гострий?",
    "100 150 100 80",
    [150, 195],
  ],
  mouth: [
    "Губи",
    "Губи тонкі чи повні? Людина усміхалась?",
    "100 220 100 60",
    [150, 250],
  ],
  beard: [
    "Борода й вуса",
    "Була борода, вуса або борідка?",
    "60 190 180 160",
    [150, 260],
  ],
  glasses: [
    "Окуляри",
    "Чи були окуляри? Якої форми?",
    "70 115 160 70",
    [150, 150],
  ],
  marks: [
    "Прикмети",
    "Чи були родимка або шрам? Де саме?",
    "60 170 160 90",
    [150, 210],
  ],
};

const ORDER = Object.keys(META),
  ORD_DRAW = [
    "hair.b",
    "face",
    "beard",
    "mouth",
    "nose",
    "eyes",
    "brows",
    "marks",
    "glasses",
    "hair.f",
  ];

const fresh = () => ({
  i: {
    face: 0,
    hair: 1,
    brows: 0,
    eyes: 0,
    nose: 0,
    mouth: 0,
    beard: 0,
    glasses: 0,
    marks: 0,
  },
  c: { skin: COL.skin[0], hair: COL.hair[0], eye: COL.eye[0] },
  p: Object.fromEntries(ORDER.map((k) => [k, { x: 0, y: 0, s: 1 }])),
  sel: "face",
  seen: ["face"],
});
let S = fresh(),
  H = [],
  mem = [];
const $ = (id) => document.getElementById(id),
  ov = $("ov");
const snap = () => {
  H.push(JSON.stringify(S));
  if (H.length > 40) H.shift();
};

function layer(k, part, ex) {
  const o = OPT[k][S.i[k]],
    fn = o && o[part];
  if (!fn) return "";
  const [ax, ay] = META[k][3],
    p = S.p[k];
  return `<g data-cat="${k}" class="${!ex && S.sel === k ? "sel" : ""}" transform="translate(${ax + p.x} ${ay + p.y}) scale(${p.s}) translate(${-ax} ${-ay})">${fn(S.c)}</g>`;
}

function build(ex) {
  let o = ex
    ? '<rect width="300" height="380" fill="#fff"/>'
    : '<g stroke="#8a97a1" stroke-opacity=".45" stroke-width="1" font-size="9" fill="#8a97a1">' +
      [
        [70, "190"],
        [130, "180"],
        [190, "170"],
        [250, "160"],
        [310, "150"],
      ]
        .map(
          ([y, t]) =>
            `<line x1="0" x2="300" y1="${y}" y2="${y}"/><text x="4" y="${y - 3}" stroke="none">${t}</text>`,
        )
        .join("") +
      "</g>";
  ORD_DRAW.forEach((d) => {
    const [k, pt] = d.split(".");
    o += layer(k, pt || "f", ex);
  });
  return o;
}

function draw() {
  $("canvas").innerHTML =
    `<svg id="cv" viewBox="0 0 300 380" role="img" aria-label="Поточний фоторобот">${build(false)}</svg>`;
  bindDrag();
}

function thumb(k, j) {
  const o = OPT[k][j];
  const sv = k === "face" ? "" : OPT.face[S.i.face].f(S.c);
  return `<svg viewBox="${META[k][2]}" aria-hidden="true">${sv}${o.b ? o.b(S.c) : ""}${o.f ? o.f(S.c) : ""}${!o.f && !o.b ? '<text x="50%" y="50%" font-size="12" fill="#888" text-anchor="middle">—</text>' : ""}</svg>`;
}

function panel() {
  const k = S.sel;
  $("steps").innerHTML = ORDER.map(
    (c, n) =>
      `<button class="${c === k ? "on" : ""} ${S.seen.includes(c) ? "done" : ""}" onclick="pick('${c}')">${n + 1}. ${META[c][0]}</button>`,
  ).join("");
  $("hint").textContent = META[k][1];
  $("selname").textContent = META[k][0];
  $("opts").innerHTML = OPT[k]
    .map(
      (o, j) =>
        `<button class="opt" aria-pressed="${S.i[k] === j}" onclick="choose(${j})">${thumb(k, j)}${o.n}</button>`,
    )
    .join("");
  const p = S.p[k];
  $("rs").value = p.s;
  $("rx").value = p.x;
  $("ry").value = p.y;
  $("next").textContent =
    ORDER.indexOf(k) === ORDER.length - 1 ? "Готово" : "Далі";
  for (const t of ["skin", "hair", "eye"])
    $("sw-" + t).innerHTML = COL[t]
      .map(
        (h) =>
          `<button style="background:${h}" aria-label="Колір ${h}" aria-pressed="${S.c[t] === h}" onclick="setCol('${t}','${h}')"></button>`,
      )
      .join("");
}
function all() {
  draw();
  panel();
  list();
}

function pick(k) {
  S.sel = k;
  if (!S.seen.includes(k)) S.seen.push(k);
  all();
}
function go(d) {
  const n = ORDER.indexOf(S.sel) + d;
  if (n >= ORDER.length) {
    toast("Усі риси задано. Перевірте портрет і збережіть.");
    return;
  }
  if (n >= 0) pick(ORDER[n]);
}
function choose(j) {
  snap();
  S.i[S.sel] = j;
  all();
}
function setCol(t, h) {
  snap();
  S.c[t] = h;
  all();
}
function resetSel() {
  snap();
  S.p[S.sel] = { x: 0, y: 0, s: 1 };
  all();
}
[
  ["rs", "s"],
  ["rx", "x"],
  ["ry", "y"],
].forEach(([id, f]) => {
  const e = $(id);
  e.addEventListener("pointerdown", snap);
  e.addEventListener("keydown", snap);
  e.addEventListener("input", () => {
    S.p[S.sel][f] = +e.value;
    draw();
  });
});

function undo() {
  if (!H.length) {
    toast("Немає що скасовувати");
    return;
  }
  S = JSON.parse(H.pop());
  all();
}

function bindDrag() {
  const sv = $("cv");
  let d = null;
  sv.addEventListener("pointerdown", (e) => {
    const g = e.target.closest("[data-cat]");
    if (!g) return;
    snap();
    sv.setPointerCapture(e.pointerId);
    d = { k: g.dataset.cat, x: e.clientX, y: e.clientY };
    if (S.sel !== d.k) {
      S.sel = d.k;
      if (!S.seen.includes(d.k)) S.seen.push(d.k);
      panel();
      sv.querySelectorAll(".sel").forEach((n) => n.classList.remove("sel"));
      sv.querySelectorAll(`[data-cat="${d.k}"]`).forEach((n) =>
        n.classList.add("sel"),
      );
    }
  });
  sv.addEventListener("pointermove", (e) => {
    if (!d) return;
    const r = 300 / sv.getBoundingClientRect().width,
      p = S.p[d.k];
    p.x = Math.max(-40, Math.min(40, p.x + (e.clientX - d.x) * r));
    p.y = Math.max(-40, Math.min(40, p.y + (e.clientY - d.y) * r));
    d.x = e.clientX;
    d.y = e.clientY;
    const el = [...sv.querySelectorAll(`[data-cat="${d.k}"]`)],
      [ax, ay] = META[d.k][3];
    el.forEach((n) =>
      n.setAttribute(
        "transform",
        `translate(${ax + p.x} ${ay + p.y}) scale(${p.s}) translate(${-ax} ${-ay})`,
      ),
    );
  });
  const end = () => {
    if (d) {
      d = null;
      $("rx").value = S.p[S.sel].x;
      $("ry").value = S.p[S.sel].y;
    }
  };
  sv.addEventListener("pointerup", end);
  sv.addEventListener("pointercancel", end);
}

function toast(t) {
  $("toast").textContent = t;
}

function store() {
  try {
    return JSON.parse(localStorage.getItem("photofit") || "[]");
  } catch (e) {
    return mem;
  }
}
function put(a) {
  mem = a;
  try {
    localStorage.setItem("photofit", JSON.stringify(a));
  } catch (e) {}
}
function save() {
  const a = store();
  a.push({
    name: $("cname").value || "Без назви",
    t: new Date().toLocaleString("uk-UA"),
    s: S,
  });
  put(a);
  toast("Збережено: " + ($("cname").value || "Без назви"));
  list();
}
function list() {
  const a = store();
  $("saved").innerHTML = a.length
    ? a
        .map(
          (x, n) =>
            `<li><button onclick="loadSaved(${n})">${x.name} (${x.t})</button></li>`,
        )
        .join("")
    : '<li style="color:var(--mute)">Збережених фотороботів ще немає.</li>';
}
function loadSaved(n) {
  const x = store()[n];
  if (!x) return;
  snap();
  S = x.s;
  $("cname").value = x.name;
  all();
}

function exportPng() {
  const s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 380" width="600" height="760">${build(true)}</svg>`,
    im = new Image();
  im.onload = () => {
    const c = document.createElement("canvas");
    c.width = 600;
    c.height = 760;
    c.getContext("2d").drawImage(im, 0, 0);
    try {
      $("oimg").src = c.toDataURL("image/png");
    } catch (e) {
      $("oimg").src = im.src;
    }
    ov.classList.add("on");
  };
  im.onerror = () => toast("Не вдалося створити зображення");
  im.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(s);
}
all();
