// The sticker rig: bases, poses, expressions, hair, accessories, props, emblems.
// Every function returns an SVG fragment string. Coordinates are documented in
// cast/PROCESS.md ("Coordinate conventions"). No dependencies.

export const INK = '#3b2618';      // warm dark outline, every stroke
export const PUPIL = '#2a1a12';
export const BLUSH = '#ff9a8a';
export const VIEWBOX = '-80 -10 160 172';

// ---------- helpers ----------
const n = (v) => Math.round(v * 10) / 10;
export function shade(hex, f) {
  // f < 0 darkens toward black, f > 0 lightens toward white
  const h = hex.replace('#', '');
  const c = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
  const out = c.map((v) => Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f));
  return '#' + out.map((v) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0')).join('');
}
const inked = (inner, w = 3) =>
  `<g stroke="${INK}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round">${inner}</g>`;
// A limb is a fat round-capped stroke drawn twice: ink underneath, colour on top.
function limb(d, color, w = 7) {
  return `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 6}" stroke-linecap="round" stroke-linejoin="round"/>` +
    `<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
const P = (pt) => `${n(pt[0])} ${n(pt[1])}`;

export function sparkle(x, y, s, color) {
  return `<path d="M${x} ${y - s} Q${x + s * 0.2} ${y - s * 0.2} ${x + s} ${y} Q${x + s * 0.2} ${y + s * 0.2} ${x} ${y + s} Q${x - s * 0.2} ${y + s * 0.2} ${x - s} ${y} Q${x - s * 0.2} ${y - s * 0.2} ${x} ${y - s} Z" fill="${color}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
}

// ---------- skeleton ----------
// Body space: x centred on 0, ground at y=152. Neck at (0,88). Head centre (0,52).
export const NECK = [0, 88];
export const HEAD = [0, 52];
export const SHOULDER = { L: [-15, 95], R: [15, 95] };
export const HIP = { L: [-8, 126], R: [8, 126] };

// ---------- poses ----------
// Each pose: lift (whole figure hops up), head {dx,dy,rot about neck},
// arms {L,R}: elbow e and hand h in body space; front:true draws that arm over the head.
// prop: which hand holds it (or null) and how it sits; fx: pose effect.
export const POSES = {
  neutral: {
    lift: 0, head: { dx: 0, dy: 0, rot: 0 },
    arms: { L: { e: [-23, 107], h: [-24, 120] }, R: { e: [23, 107], h: [24, 120] } },
    legs: { L: [-10, 0], R: [10, 0] },
    prop: { hand: 'R', dx: 4, dy: -4, rot: 8 }, fx: null,
  },
  cheer: {
    lift: 6, head: { dx: 0, dy: -1, rot: 0 },
    arms: { L: { e: [-40, 80], h: [-46, 36] }, R: { e: [40, 80], h: [46, 36] } },
    legs: { L: [-14, -3], R: [14, -3] },
    prop: { hand: 'R', dx: 4, dy: -6, rot: 18 }, fx: 'sparkles',
  },
  thinking: {
    lift: 0, head: { dx: 0, dy: 0, rot: 7 },
    arms: { L: { e: [-20, 114], h: [4, 113] }, R: { e: [26, 114], h: [13, 92], front: true } },
    legs: { L: [-9, 0], R: [10, 0] },
    prop: null, fx: 'dots',
  },
  surprised: {
    lift: 7, head: { dx: 0, dy: -1, rot: -3 },
    arms: { L: { e: [-34, 102], h: [-51, 88] }, R: { e: [34, 102], h: [51, 88] } },
    legs: { L: [-11, 0], R: [15, -6] },
    prop: null, fx: 'bang',
  },
  presenting: {
    lift: 0, head: { dx: -1, dy: 0, rot: -6 },
    arms: { L: { e: [-23, 107], h: [-24, 120] }, R: { e: [32, 110], h: [45, 103] } },
    legs: { L: [-10, 0], R: [10, 0] },
    prop: { hand: 'R', dx: 0, dy: -17, rot: 0, onPalm: true }, fx: 'present',
  },
  waving: {
    lift: 0, head: { dx: 0, dy: 0, rot: -5 },
    arms: { L: { e: [-23, 107], h: [-24, 120] }, R: { e: [44, 88], h: [50, 50] } },
    legs: { L: [-10, 0], R: [10, 0] },
    prop: { hand: 'L', dx: -4, dy: -4, rot: -8 }, fx: 'wave',
  },
};

// ---------- bases ----------
// A base owns body silhouette, limbs, head shape and where the face sits.
export const BASES = {
  humanoid: { eyeX: 15, eyeY: 61, mouthY: 76, cheekX: 26, cheekY: 71, browY: 47, mouth: 'lips' },
  raven: { eyeX: 15, eyeY: 55, mouthY: 70, cheekX: 27, cheekY: 66, browY: 41, mouth: 'beak' },
  horse: { eyeX: 17, eyeY: 50, mouthY: 82, cheekX: 29, cheekY: 62, browY: 37, mouth: 'lips' },
};

const TORSO = {
  tunic: 'M-15 88 Q-20 102 -24 128 Q0 134 24 128 Q20 102 15 88 Z',
  dress: 'M-15 88 Q-20 106 -31 132 Q0 140 31 132 Q20 106 15 88 Z',
  robe: 'M-15 88 Q-23 112 -29 144 Q0 150 29 144 Q23 112 15 88 Z',
  coat: 'M-16 88 Q-21 104 -26 136 Q0 141 26 136 Q21 104 16 88 Z',
  egg: 'M-17 88 Q-31 108 -24 133 Q0 143 24 133 Q31 108 17 88 Z',
};
const HEM = {
  tunic: 'M-23.3 122 Q0 128 23.3 122 L24 128 Q0 134 -24 128 Z',
  dress: 'M-29 127 Q0 135 29 127 L31 132 Q0 140 -31 132 Z',
  robe: 'M-28 138 Q0 144 28 138 L29 144 Q0 150 -29 144 Z',
  coat: 'M-25 130 Q0 135 25 130 L26 136 Q0 141 -26 136 Z',
  egg: '',
};
const COLLAR = {
  v: 'M-12 88 L0 101 L12 88 Z',
  round: 'M-13 88 Q0 98 13 88 Z',
  high: 'M-15 82 L-14 93 Q0 99 14 93 L15 82 Q0 88 -15 82 Z',
  none: '',
};

function torso(ch) {
  const o = ch.outfit;
  const shape = ch.base === 'raven' ? 'egg' : o.shape;
  let s = `<path d="${TORSO[shape]}" fill="${o.main}"/>`;
  if (shape === 'coat') s += `<path d="M0 98 L0 138" fill="none" stroke-width="2.5"/>`;
  if (ch.base === 'raven') s += `<ellipse cx="0" cy="118" rx="13" ry="16" fill="${o.belly || shade(o.main, 0.25)}"/>`;
  if (HEM[shape] && o.trim) s += `<path d="${HEM[shape]}" fill="${o.trim}"/>`;
  if (o.collar && COLLAR[o.collar]) s += `<path d="${COLLAR[o.collar]}" fill="${o.trim || shade(o.main, 0.4)}"/>`;
  if (o.belt) s += `<path d="M-19 110 Q0 114 19 110 L19.6 115 Q0 119 -19.6 115 Z" fill="${o.belt}"/>`;
  return inked(s);
}

function cape(ch) {
  if (!ch.cape) return '';
  return inked(`<path d="M-17 88 Q-38 118 -36 144 Q0 150 36 144 Q38 118 17 88 Z" fill="${ch.cape}"/>`);
}

function legs(ch, pose) {
  let s = '';
  const extra = ch.extraLegs ? ch.extraLegs : 0;
  // Sleipnir-style extra legs: drawn behind, darker, peeking out between and beside.
  const EXTRA = [[-19, -27], [19, 27], [-25, -38], [25, 38]]; // [hipX, footX], drawn behind
  for (let i = 0; i < extra; i++) {
    const [hx, fx] = EXTRA[i];
    const foot = [fx, 149 - (i > 1 ? 3 : 0)];
    s += limb(`M${hx} 120 L${P(foot)}`, shade(ch.legs, -0.25), 7);
    s += inked(`<ellipse cx="${n(foot[0])}" cy="${foot[1] + 1}" rx="6.5" ry="4.5" fill="${shade(ch.shoes, -0.2)}"/>`);
  }
  for (const side of ['L', 'R']) {
    const [fx, fy] = pose.legs[side];
    const hip = HIP[side];
    const foot = [fx, 149 + fy];
    if (ch.base === 'raven') {
      s += limb(`M${P(hip)} L${P(foot)}`, ch.shoes, 2.5);
      s += `<path d="M${P(foot)} l-6 4 M${P(foot)} l0 5 M${P(foot)} l6 4" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>` +
        `<path d="M${P(foot)} l-6 4 M${P(foot)} l0 5 M${P(foot)} l6 4" fill="none" stroke="${ch.shoes}" stroke-width="2.2" stroke-linecap="round"/>`;
    } else {
      s += limb(`M${P(hip)} L${P(foot)}`, ch.legs, 8);
      const out = side === 'L' ? -2 : 2;
      s += inked(`<ellipse cx="${n(foot[0] + out)}" cy="${n(foot[1] + 1)}" rx="7.5" ry="5" fill="${ch.shoes}"/>`);
    }
  }
  return s;
}

function arm(ch, pose, side) {
  const a = pose.arms[side];
  const sh = SHOULDER[side];
  const d = `M${P(sh)} Q${P(a.e)} ${P(a.h)}`;
  if (ch.base === 'raven') {
    // Wing-arm: a broad capsule with a feathered tip.
    const wing = ch.outfit.wing || shade(ch.outfit.main, -0.15);
    let s = limb(d, wing, 11);
    const [hx, hy] = a.h;
    const vx = a.h[0] - a.e[0], vy = a.h[1] - a.e[1];
    const L = Math.hypot(vx, vy) || 1;
    const ux = vx / L, uy = vy / L, px = -uy, py = ux;
    const tip = (k, off) => P([hx + ux * k + px * off, hy + uy * k + py * off]);
    s += inked(`<path d="M${tip(-2, -6)} L${tip(9, -5)} L${tip(3, -1)} L${tip(11, 1)} L${tip(3, 3)} L${tip(8, 6)} L${tip(-2, 6)} Z" fill="${wing}"/>`, 2.5);
    return s;
  }
  return limb(d, ch.sleeve || ch.outfit.main, 7);
}

function hand(ch, pose, side) {
  if (ch.base === 'raven') return '';
  const [hx, hy] = pose.arms[side].h;
  if (ch.base === 'horse') return inked(`<circle cx="${hx}" cy="${hy}" r="5.8" fill="${ch.shoes}"/>`);
  return inked(`<circle cx="${hx}" cy="${hy}" r="5.6" fill="${ch.hands || ch.skin}"/>`);
}

// ---------- head ----------
function headBase(ch) {
  const skin = ch.skin;
  if (ch.base === 'raven') {
    return inked(`<ellipse cx="0" cy="52" rx="38" ry="35" fill="${skin}"/>`) +
      `<ellipse cx="0" cy="62" rx="24" ry="17" fill="${shade(skin, 0.12)}"/>`;
  }
  if (ch.base === 'horse') {
    return inked(
      `<path d="M-30 30 L-22 4 L-12 24 Z M30 30 L22 4 L12 24 Z" fill="${skin}"/>` +
      `<ellipse cx="0" cy="52" rx="38" ry="36" fill="${skin}"/>` +
      `<ellipse cx="0" cy="77" rx="22" ry="14" fill="${ch.muzzle}"/>`) +
      `<path d="M-24 25 L-21 12 L-16 23 Z M24 25 L21 12 L16 23 Z" fill="${shade(skin, 0.35)}"/>` +
      `<ellipse cx="-8" cy="75" rx="2.4" ry="3" fill="${INK}"/><ellipse cx="8" cy="75" rx="2.4" ry="3" fill="${INK}"/>`;
  }
  return inked(
    `<ellipse cx="-38" cy="62" rx="6" ry="7.5" fill="${skin}"/><ellipse cx="38" cy="62" rx="6" ry="7.5" fill="${skin}"/>` +
    `<ellipse cx="0" cy="52" rx="40" ry="36" fill="${skin}"/>`);
}

// ---------- expressions (face layer) ----------
// Face layer coordinates are head space; the base supplies eye/mouth anchors.
export const EXPRESSIONS = ['neutral', 'smile', 'grin', 'happy', 'worried', 'surprised', 'determined', 'sleepy'];

function openEye(x, y, iris, ink, opts = {}) {
  const ry = opts.ry ?? 7.6, rx = opts.rx ?? 6.3;
  let s = `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${iris}" stroke="${ink}" stroke-width="2.5"/>`;
  s += `<ellipse cx="${x}" cy="${y + 1}" rx="${rx * 0.56}" ry="${ry * 0.6}" fill="${opts.pupil || PUPIL}"/>`;
  if (opts.flatLid) s += `<path d="M${x - rx - 1.5} ${y - ry * 0.35} L${x + rx + 1.5} ${y - ry * 0.35}" stroke="${ink}" stroke-width="3.2" stroke-linecap="round"/>`;
  else s += `<path d="M${x - rx - 1} ${y - ry * 0.45} Q${x} ${y - ry - 2.6} ${x + rx + 1} ${y - ry * 0.45}" fill="none" stroke="${ink}" stroke-width="3.2" stroke-linecap="round"/>`;
  s += `<circle cx="${x + 2.1}" cy="${y - 2.8}" r="2.3" fill="#fff"/><circle cx="${x - 2}" cy="${y + 3}" r="1" fill="#fff"/>`;
  return s;
}
function surprisedEye(x, y, ink) {
  return `<circle cx="${x}" cy="${y}" r="7.3" fill="#fff" stroke="${ink}" stroke-width="2.5"/>` +
    `<circle cx="${x}" cy="${y + 0.5}" r="3.3" fill="${PUPIL}"/><circle cx="${x + 1.2}" cy="${y - 0.8}" r="1.2" fill="#fff"/>`;
}

export function face(ch, expr) {
  const b = BASES[ch.base];
  const ink = ch.faceInk || INK;
  const iris = ch.eyes;
  const ex = b.eyeX, ey = b.eyeY, my = b.mouthY, by = b.browY;
  const brow = (x1, y1, x2, y2) => `<path d="M${x1} ${y1} Q${(x1 + x2) / 2} ${Math.min(y1, y2) - 1.5} ${x2} ${y2}" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/>`;
  const browsAt = (inner, outer) => brow(-ex - 7, by + outer, -ex + 6, by + inner) + brow(ex - 6, by + inner, ex + 7, by + outer);
  let eyes = '', mouth = '', brows = '', extra = '';
  let blush = 0.7, blushR = 5.5;
  const sw = 'stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round"';
  const D = '#7a2a2a', T = '#ff8f9a';
  switch (expr) {
    case 'neutral':
      eyes = openEye(-ex, ey, iris, ink) + openEye(ex, ey, iris, ink);
      mouth = `<path d="M-4 ${my} Q0 ${my + 2.4} 4 ${my}" fill="none" stroke="${ink}" ${sw}/>`;
      break;
    case 'smile':
      eyes = openEye(-ex, ey, iris, ink) + openEye(ex, ey, iris, ink);
      mouth = `<path d="M-7 ${my - 1} Q0 ${my + 6} 7 ${my - 1}" fill="none" stroke="${ink}" ${sw}/>`;
      break;
    case 'grin':
      eyes = openEye(-ex, ey, iris, ink, { ry: 7 }) + openEye(ex, ey, iris, ink, { ry: 7 });
      mouth = `<path d="M-9 ${my - 2} Q0 ${my - 0.5} 9 ${my - 2} Q8 ${my + 9} 0 ${my + 9} Q-8 ${my + 9} -9 ${my - 2} Z" fill="${D}" stroke="${ink}" ${sw}/>` +
        `<path d="M-4.5 ${my + 6.5} Q0 ${my + 2.5} 4.5 ${my + 6.5} Q0 ${my + 8.6} -4.5 ${my + 6.5} Z" fill="${T}"/>`;
      blush = 0.85; blushR = 6;
      break;
    case 'happy':
      eyes = `<path d="M${-ex - 6} ${ey + 2} Q${-ex} ${ey - 7} ${-ex + 6} ${ey + 2}" fill="none" stroke="${ink}" stroke-width="3.4" stroke-linecap="round"/>` +
        `<path d="M${ex - 6} ${ey + 2} Q${ex} ${ey - 7} ${ex + 6} ${ey + 2}" fill="none" stroke="${ink}" stroke-width="3.4" stroke-linecap="round"/>`;
      mouth = `<path d="M-7 ${my - 1.5} Q0 ${my - 0.5} 7 ${my - 1.5} Q5 ${my + 7} 0 ${my + 7} Q-5 ${my + 7} -7 ${my - 1.5} Z" fill="${D}" stroke="${ink}" ${sw}/>` +
        `<path d="M-3.5 ${my + 5} Q0 ${my + 2} 3.5 ${my + 5} Q0 ${my + 6.6} -3.5 ${my + 5} Z" fill="${T}"/>`;
      blush = 0.9; blushR = 6.5;
      break;
    case 'worried':
      eyes = openEye(-ex, ey + 1, iris, ink, { ry: 7 }) + openEye(ex, ey + 1, iris, ink, { ry: 7 });
      brows = browsAt(-4, 2);
      mouth = `<path d="M-7 ${my + 1} Q-3.5 ${my - 2.5} 0 ${my + 1} Q3.5 ${my + 4.5} 7 ${my + 1}" fill="none" stroke="${ink}" ${sw}/>`;
      extra = `<path d="M33 30 Q38 38 36 42 Q33 46 30 42 Q29 38 33 30 Z" fill="#9fdcff" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
      blush = 0.45;
      break;
    case 'surprised':
      eyes = surprisedEye(-ex, ey, ink) + surprisedEye(ex, ey, ink);
      brows = browsAt(-5, -5);
      mouth = `<ellipse cx="0" cy="${my + 2}" rx="4.2" ry="5.2" fill="${D}" stroke="${ink}" stroke-width="2.6"/>`;
      blush = 0.6;
      break;
    case 'determined':
      eyes = openEye(-ex, ey + 1, iris, ink, { ry: 6.6, flatLid: true }) + openEye(ex, ey + 1, iris, ink, { ry: 6.6, flatLid: true });
      brows = browsAt(4, -2);
      mouth = `<path d="M-6 ${my + 1} Q0 ${my - 1} 6 ${my} " fill="none" stroke="${ink}" ${sw}/>`;
      blush = 0.55;
      break;
    case 'sleepy':
      eyes = `<path d="M${-ex - 6} ${ey} Q${-ex} ${ey + 5} ${-ex + 6} ${ey}" fill="none" stroke="${ink}" stroke-width="3.2" stroke-linecap="round"/>` +
        `<path d="M${ex - 6} ${ey} Q${ex} ${ey + 5} ${ex + 6} ${ey}" fill="none" stroke="${ink}" stroke-width="3.2" stroke-linecap="round"/>`;
      mouth = `<ellipse cx="1" cy="${my + 1}" rx="2.6" ry="3" fill="${D}" stroke="${ink}" stroke-width="2.3"/>`;
      extra = `<text x="34" y="18" font-family="Arial Rounded MT Bold, Arial, sans-serif" font-weight="900" font-size="15" fill="#8fd0ff" stroke="${INK}" stroke-width="2.2" paint-order="stroke">z</text>` +
        `<text x="45" y="6" font-family="Arial Rounded MT Bold, Arial, sans-serif" font-weight="900" font-size="11" fill="#8fd0ff" stroke="${INK}" stroke-width="2" paint-order="stroke">z</text>`;
      blush = 0.6;
      break;
    default: throw new Error('unknown expression ' + expr);
  }
  if (b.mouth === 'beak') mouth = beak(ch, expr, my);
  const cheeks = ch.noBlush ? '' :
    `<ellipse cx="${-b.cheekX}" cy="${b.cheekY}" rx="${blushR}" ry="${blushR * 0.62}" fill="${BLUSH}" opacity="${blush}"/>` +
    `<ellipse cx="${b.cheekX}" cy="${b.cheekY}" rx="${blushR}" ry="${blushR * 0.62}" fill="${BLUSH}" opacity="${blush}"/>`;
  return { under: cheeks + eyes + mouth, over: brows + extra };
}

function beak(ch, expr, my) {
  const c = ch.beak;
  const open = expr === 'grin' || expr === 'happy' || expr === 'surprised';
  if (open) {
    return inked(`<path d="M-9 ${my - 6} Q0 ${my - 10} 9 ${my - 6} L0 ${my + 3} Z" fill="${c}"/>` +
      `<path d="M-6 ${my + 2} L6 ${my + 2} L0 ${my + 10} Z" fill="${shade(c, -0.15)}"/>`, 2.5) +
      `<path d="M-4 ${my + 1.5} L4 ${my + 1.5} L0 ${my + 4} Z" fill="#7a2a2a"/>`;
  }
  const tilt = expr === 'worried' ? 2 : 0;
  return inked(`<path d="M-9 ${my - 6} Q0 ${my - 10} 9 ${my - 6} L${tilt} ${my + 7} Z" fill="${c}"/>`, 2.5) +
    `<path d="M-5 ${my - 3} L5 ${my - 3}" stroke="${shade(c, -0.25)}" stroke-width="1.6" stroke-linecap="round"/>`;
}

// ---------- hair ----------
// Each style returns {back, front}; back sits behind the head (and body), front over the face.
function bangs(c, opts = {}) {
  const n0 = opts.tips ?? 6, tipY = opts.tipY ?? 46, rootY = opts.rootY ?? 34, w = opts.w ?? 41;
  let d = `M${-w - 2} ${opts.sideY ?? 64} C${-w - 6} 24 -24 9 0 9 C24 9 ${w + 6} 24 ${w + 2} ${opts.sideY ?? 64}`;
  for (let i = 0; i <= n0; i++) {
    const x = w - (i * 2 * w) / n0;
    const edge = Math.abs(x) / w;
    const ty = tipY + edge * edge * 10 + (opts.jag && i % 2 ? -5 : 0);
    if (i > 0) {
      const rx = x + w / n0;
      d += ` Q${n(rx - (w / n0) * 0.2)} ${n(rootY + 6)} ${n(rx)} ${n(rootY + edge * 6)}`;
    }
    d += ` L${n(x)} ${n(ty)}`;
  }
  d += ' Z';
  return `<path d="${d}" fill="${c}"/>`;
}
function sideLocks(c, len = 100) {
  return `<path d="M-43 50 Q-49 ${len - 25} -40 ${len} Q-35 ${len - 22} -34 58 Z" fill="${c}"/>` +
    `<path d="M43 50 Q49 ${len - 25} 40 ${len} Q35 ${len - 22} 34 58 Z" fill="${c}"/>`;
}
const shine = (c) => `<path d="M-20 22 Q-8 15 4 17" fill="none" stroke="${shade(c, 0.45)}" stroke-width="3" stroke-linecap="round" opacity=".8"/>`;

export const HAIR = {
  none: () => ({ back: '', front: '' }),
  long: (c) => ({
    back: `<path d="M-40 34 C-55 70 -53 108 -42 124 Q0 130 42 124 C53 108 55 70 40 34 Z" fill="${c}"/>`,
    front: bangs(c) + sideLocks(c, 104) + shine(c),
  }),
  wild: (c) => ({
    back: `<path d="M-40 30 L-54 48 L-47 60 L-56 78 L-47 88 L-52 108 L-36 104 L-30 118 L-14 110 L0 120 L14 110 L30 118 L36 104 L52 108 L47 88 L56 78 L47 60 L54 48 L40 30 Z" fill="${c}"/>`,
    front: bangs(c, { tips: 7, jag: true, tipY: 44 }) + sideLocks(c, 98),
  }),
  twintails: (c, acc) => ({
    back: `<path d="M-36 28 C-74 34 -76 84 -58 118 Q-54 100 -48 92 Q-46 108 -40 114 C-44 80 -46 58 -30 44 Z" fill="${c}"/>` +
      `<path d="M36 28 C74 34 76 84 58 118 Q54 100 48 92 Q46 108 40 114 C44 80 46 58 30 44 Z" fill="${c}"/>` +
      `<path d="M-40 40 C-50 64 -48 86 -40 92 L40 92 C48 86 50 64 40 40 Z" fill="${c}"/>`,
    front: bangs(c, { tips: 7 }) + sideLocks(c, 94) + shine(c) +
      `<circle cx="-36" cy="30" r="5" fill="${acc || '#ff5a6e'}"/><circle cx="36" cy="30" r="5" fill="${acc || '#ff5a6e'}"/>`,
  }),
  bob: (c) => ({
    back: `<path d="M-42 40 C-54 66 -52 90 -42 98 L42 98 C52 90 54 66 42 40 Z" fill="${c}"/>`,
    front: bangs(c, { tips: 5 }) + sideLocks(c, 94) + shine(c),
  }),
  messy: (c) => ({
    back: `<path d="M-38 24 L-54 30 L-46 42 L-58 56 L-44 62 L-50 78 L-38 76 L38 76 L50 78 L44 62 L58 56 L46 42 L54 30 L38 24 Z" fill="${c}"/>`,
    front: bangs(c, { tips: 5, jag: true, tipY: 48, rootY: 32 }) +
      `<path d="M-6 12 L-2 -2 L6 12 L16 2 L16 16 Z" fill="${c}"/>` + shine(c),
  }),
  short: (c) => ({
    back: '',
    front: bangs(c, { tips: 5, tipY: 40, rootY: 30, sideY: 56 }) + shine(c),
  }),
  curly: (c) => {
    let back = '';
    for (let a = 150; a <= 390; a += 20) {
      const r = (a * Math.PI) / 180;
      back += `<circle cx="${n(Math.cos(r) * 44)}" cy="${n(52 + Math.sin(r) * 40)}" r="13" fill="${c}"/>`;
    }
    back += `<circle cx="-46" cy="84" r="12" fill="${c}"/><circle cx="46" cy="84" r="12" fill="${c}"/>`;
    let front = '';
    for (const [x, y, r] of [[-30, 30, 12], [-14, 22, 13], [3, 20, 13], [19, 23, 13], [33, 32, 11], [-38, 44, 9], [40, 45, 9]]) front += `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`;
    return { back, front };
  },
  braids: (c) => {
    let br = '';
    for (const sx of [-1, 1]) for (let i = 0; i < 5; i++) br += `<ellipse cx="${sx * (37 + i * 0.6)}" cy="${76 + i * 11}" rx="7" ry="7" fill="${c}"/>`;
    return {
      back: `<path d="M-42 40 C-50 60 -48 80 -42 86 L42 86 C48 80 50 60 42 40 Z" fill="${c}"/>`,
      front: `<path d="M-43 64 C-48 24 -24 9 0 9 C24 9 48 24 43 64 L36 46 Q20 30 2 26 L0 30 L-2 26 Q-20 30 -36 46 Z" fill="${c}"/>` + br + shine(c),
    };
  },
  bun: (c) => ({
    back: `<circle cx="10" cy="6" r="15" fill="${c}"/><path d="M-42 40 C-50 60 -48 76 -42 80 L42 80 C48 76 50 60 42 40 Z" fill="${c}"/>`,
    front: bangs(c, { tips: 6, tipY: 44 }) + sideLocks(c, 90) + shine(c),
  }),
  crest: (c) => ({
    back: '',
    front: `<path d="M-6 20 Q-12 2 -2 -2 Q0 8 2 16 Q6 0 16 2 Q10 12 6 22 Z" fill="${c}"/>`,
  }),
  mane: (c) => ({
    back: `<path d="M8 14 Q46 10 50 50 Q56 80 44 108 Q34 86 34 60 Z" fill="${c}"/>`,
    front: `<path d="M-20 26 Q-14 6 4 8 Q20 6 22 24 Q12 18 8 34 Q2 22 -6 36 Q-10 24 -20 26 Z" fill="${c}"/>`,
  }),
  helmet: (c, acc) => ({
    back: `<ellipse cx="0" cy="50" rx="47" ry="43" fill="${c}"/>`,
    front: `<path d="M-46 52 A47 43 0 0 1 46 52 L40 50 A40 36 0 0 0 -40 50 Z" fill="${shade(c, 0.25)}"/>` +
      `<circle cx="-45" cy="58" r="9" fill="${c}"/><circle cx="45" cy="58" r="9" fill="${c}"/>` +
      `<circle cx="-45" cy="58" r="4" fill="${acc}"/><circle cx="45" cy="58" r="4" fill="${acc}"/>` +
      `<path d="M30 18 L42 -2" fill="none"/><circle cx="42" cy="-3" r="4" fill="${acc}"/>`,
  }),
};

// ---------- accessories ----------
// Each returns {back?, mid?, front?}: back = behind head, mid = between head skin and face, front = over hair.
export const ACC = {
  bow: (c) => ({ front: `<path d="M24 20 L12 10 L13 30 Z M24 20 L36 8 L37 28 Z" fill="${c}"/><circle cx="24" cy="20" r="4.5" fill="${shade(c, -0.15)}"/>` }),
  glasses: (c) => ({ front: `<g fill="#ffffff" fill-opacity=".18" stroke="${c}" stroke-width="2.6"><circle cx="-15" cy="61" r="10.5"/><circle cx="15" cy="61" r="10.5"/></g><path d="M-4.5 59 Q0 56 4.5 59" fill="none" stroke="${c}" stroke-width="2.6"/>` }),
  headphones: (c, c2) => ({
    back: `<path d="M-42 50 Q-44 2 0 2 Q44 2 42 50" fill="none" stroke="${INK}" stroke-width="9"/><path d="M-42 50 Q-44 2 0 2 Q44 2 42 50" fill="none" stroke="${c}" stroke-width="4"/>`,
    front: `<rect x="-50" y="48" width="13" height="20" rx="6" fill="${c}"/><rect x="37" y="48" width="13" height="20" rx="6" fill="${c}"/>` +
      (c2 ? `<circle cx="-43.5" cy="58" r="3" fill="${c2}"/><circle cx="43.5" cy="58" r="3" fill="${c2}"/>` : ''),
  }),
  foxEars: (c, inner) => ({
    back: `<path d="M-38 34 L-34 -4 L-12 18 Z M38 34 L34 -4 L12 18 Z" fill="${c}"/>`,
    front: `<path d="M-33 22 L-31 4 L-21 15 Z M33 22 L31 4 L21 15 Z" fill="${inner}" stroke="none"/>`,
  }),
  foxMask: (c, mark) => ({
    front: `<g transform="rotate(-24 -26 16)"><path d="M-40 14 Q-26 0 -12 14 Q-14 28 -26 30 Q-38 28 -40 14 Z" fill="${c}"/>` +
      `<path d="M-38 10 L-36 -2 L-30 7 M-14 10 L-16 -2 L-22 7" fill="${c}"/>` +
      `<path d="M-33 15 L-29 13 M-23 13 L-19 15" stroke="${mark}" stroke-width="2.4"/><circle cx="-26" cy="24" r="2" fill="${mark}" stroke="none"/></g>`,
  }),
  tail: (c, tip) => ({ body: `<path d="M18 128 Q58 128 56 92 Q54 74 44 80 Q50 96 36 110 Q24 118 14 116 Z" fill="${c}"/>` + (tip ? `<path d="M56 92 Q54 74 44 80 Q48 86 47 92 Z" fill="${tip}"/>` : '') }),
  horseTail: (c) => ({ body: `<path d="M14 124 Q40 118 46 140 Q48 152 38 154 Q40 140 26 134 Q20 132 14 132 Z" fill="${c}"/>` }),
  earring: (c) => ({ front: `<circle cx="-40" cy="74" r="3.6" fill="${c}"/><path d="M-40 77 L-40 84" stroke="${c}" stroke-width="2.4"/>` }),
  circlet: (c, gem) => ({ front: `<path d="M-38 40 Q0 26 38 40" fill="none" stroke="${INK}" stroke-width="7"/><path d="M-38 40 Q0 26 38 40" fill="none" stroke="${c}" stroke-width="3"/><path d="M0 26 L5 33 L0 40 L-5 33 Z" fill="${gem}"/>` }),
  cubes: (c, glow) => ({
    back: `<path d="M-40 40 Q-46 10 -20 2 L20 2 Q46 10 40 40 Z" fill="${shade(c, -0.2)}"/>`,
    front: [[-26, 10, 9], [-8, 2, 10], [12, 4, 9], [28, 14, 8], [2, -14, 8], [-17, -8, 7], [20, -8, 6]]
      .map(([x, y, s]) => `<rect x="${x - s / 2}" y="${y - s / 2}" width="${s}" height="${s}" rx="1.5" fill="${c}"/><rect x="${x - s / 4}" y="${y - s / 4}" width="${s / 2}" height="${s / 2}" fill="${glow}" stroke="none"/>`).join(''),
  }),
  crystals: (c) => ({ front: `<path d="M-30 22 L-34 -4 L-18 14 Z M-12 12 L-8 -16 L2 10 Z M8 10 L20 -10 L22 14 Z M24 18 L40 4 L36 26 Z" fill="${c}"/><path d="M-9 8 L-8 -8 M18 6 L20 -4" stroke="#ffffff" stroke-width="2" opacity=".8"/>` }),
  beard: (c) => ({ mid: `<path d="M-38 62 Q-40 96 -16 108 Q0 118 16 108 Q40 96 38 62 Q30 84 14 82 Q0 88 -14 82 Q-30 84 -38 62 Z" fill="${c}"/>` }),
  goatee: (c) => ({ mid: `<path d="M-18 82 Q0 90 18 82 Q16 100 0 110 Q-16 100 -18 82 Z" fill="${c}"/>` }),
  longNose: (c) => ({ front: `<path d="M-4 61 Q2 56 7 61 Q15 67 17 73 Q15 77 11 75 Q2 70 -4 66 Z" fill="${c}"/>` }),
  tokin: (c) => ({ front: `<path d="M-6 16 L-4 2 Q2 -4 8 2 L10 16 Z" fill="${c}"/><path d="M-12 18 Q2 12 16 18" fill="none" stroke="${INK}" stroke-width="3"/>` }),
  ridges: (c) => ({ mid: `<path d="M-6 20 Q0 15 6 20 L5 42 Q0 46 -5 42 Z M-24 26 Q-18 22 -14 28 L-16 44 Q-21 44 -23 40 Z M24 26 Q18 22 14 28 L16 44 Q21 44 23 40 Z" fill="${c}"/>` }),
  forehead: (c) => ({ front: `<circle cx="0" cy="38" r="4.5" fill="${c}"/>` }),
  hood: (c) => ({ back: `<path d="M-50 70 Q-58 4 0 2 Q58 4 50 70 Q52 96 30 98 L-30 98 Q-52 96 -50 70 Z" fill="${c}"/>` }),
  hoodRim: (c) => ({ front: `<path d="M-48 70 Q-54 6 0 4 Q54 6 48 70 L42 68 Q46 16 0 14 Q-46 16 -42 68 Z" fill="${c}"/>` }),
  wingCap: (c, wing, lens) => ({
    front: `<path d="M-40 34 Q-38 6 0 6 Q38 6 40 34 Q0 22 -40 34 Z" fill="${c}"/>` +
      `<path d="M30 20 Q46 2 58 4 Q50 10 54 12 Q44 16 46 20 Q40 22 36 26 Z" fill="${wing}"/>` +
      `<rect x="-26" y="22" width="20" height="13" rx="6" fill="${lens}"/><rect x="6" y="22" width="20" height="13" rx="6" fill="${lens}"/><path d="M-6 28 L6 28" fill="none"/>`,
  }),
  scarf: (c) => ({ body: `<path d="M-18 86 Q0 96 18 86 L20 94 Q0 104 -20 94 Z M8 94 L16 116 L6 114 L2 98 Z" fill="${c}"/>` }),
  spire: (c, glow) => ({
    back: `<path d="M-26 22 L0 -14 L26 22 Z" fill="${c}"/>`,
    front: `<path d="M-8 18 L0 -6 L8 18 Z" fill="${glow}"/><path d="M-30 30 Q0 14 30 30" fill="none" stroke="${glow}" stroke-width="3"/>`,
  }),
  spiralBand: (c, metal) => ({ front: `<path d="M-40 38 Q0 24 40 38 L40 46 Q0 32 -40 46 Z" fill="${c}"/><rect x="-9" y="27" width="18" height="12" rx="2" fill="${metal}"/><path d="M0 33 m-3 0 a3 3 0 1 1 3 3 a5 5 0 1 1 5 -5" fill="none" stroke="${INK}" stroke-width="1.6"/>` }),
  helm: (c, horn, eye) => ({
    front: `<path d="M-42 40 Q-40 2 0 0 Q40 2 42 40 Q0 28 -42 40 Z" fill="${c}"/>` +
      `<path d="M-38 22 Q-60 14 -58 -10 Q-48 6 -34 10 Z M38 22 Q60 14 58 -10 Q48 6 34 10 Z" fill="${horn}"/>` +
      `<circle cx="0" cy="18" r="7" fill="#fff"/><circle cx="0" cy="18" r="3.6" fill="${eye}" stroke="none"/>`,
  }),
  goggles: (c, lens) => ({ front: `<path d="M-42 34 Q0 20 42 34" fill="none" stroke="${INK}" stroke-width="7"/><path d="M-42 34 Q0 20 42 34" fill="none" stroke="${c}" stroke-width="3"/><rect x="-24" y="18" width="18" height="13" rx="6" fill="${lens}"/><rect x="6" y="18" width="18" height="13" rx="6" fill="${lens}"/>` }),
  pencil: () => ({ front: `<g transform="rotate(-35 18 4)"><rect x="4" y="1" width="28" height="6" rx="1" fill="#ffd84a"/><path d="M32 1 L39 4 L32 7 Z" fill="#f3d9b1"/><rect x="2" y="1" width="5" height="6" fill="#ff8aa0"/></g>` }),
  starClip: (c) => ({ front: sparkle(-28, 22, 7, c) }),
  twoTone: (c) => ({ front: `<path d="M2 10 C24 10 46 24 43 64 L36 46 L30 38 L22 46 L12 34 L4 40 Z" fill="${c}" opacity=".95"/>` }),
  feather: (c) => ({ front: `<path d="M-30 18 Q-44 0 -36 -8 Q-28 2 -26 14 Z" fill="${c}"/><path d="M-30 14 L-36 -4" stroke="${INK}" stroke-width="1.5"/>` }),
  collarRing: (c, gem) => ({ body: `<path d="M-17 88 Q0 98 17 88 L18 94 Q0 104 -18 94 Z" fill="${c}"/><rect x="-4" y="93" width="8" height="6" rx="2" fill="${gem}"/>` }),
  mask: (c) => ({ mid: `<path d="M-38 66 Q0 74 38 66 Q36 92 0 98 Q-36 92 -38 66 Z" fill="${c}"/>` }),
};

// ---------- props ----------
// Props are drawn around a grip point at (0,0) and extend mostly upward (-y), ~26 px.
export const PROPS = {
  book: (c) => `<path d="M-13 -20 L13 -20 L13 6 L-13 6 Z" fill="${c}"/><path d="M-10 -20 L-10 6" fill="none"/><path d="M-4 -12 L8 -12 M-4 -6 L6 -6" stroke="${shade(c, 0.6)}" stroke-width="2"/><path d="M13 -17 L15 -17 L15 4 L13 6" fill="#f3e6cf"/>`,
  tablet: (c, g) => `<rect x="-11" y="-24" width="22" height="30" rx="3" fill="${c}"/><rect x="-7" y="-20" width="14" height="20" rx="1.5" fill="${g}" stroke="none"/><path d="M-4 -15 L4 -15 M-4 -10 L2 -10 M-4 -5 L4 -5" stroke="${shade(c, -0.3)}" stroke-width="1.6"/>`,
  magnifier: (c) => `<path d="M0 4 L6 -10" stroke="${INK}" stroke-width="8"/><path d="M0 4 L6 -10" stroke="${c}" stroke-width="4"/><circle cx="10" cy="-20" r="11" fill="#cfefff"/><circle cx="10" cy="-20" r="11" fill="none" stroke="${c}" stroke-width="3.5"/><path d="M5 -24 Q8 -28 12 -27" stroke="#fff" stroke-width="2.4"/>`,
  cards: (c) => `<g transform="rotate(-14)"><rect x="-14" y="-22" width="15" height="21" rx="2" fill="${c}"/><path d="M-10 -15 q3 -4 6 0 q-3 5 -6 9" fill="none" stroke-width="2"/></g><g transform="rotate(10)"><rect x="-2" y="-24" width="15" height="21" rx="2" fill="${c}"/><path d="M2 -17 h7 M5 -17 v9" fill="none" stroke-width="2"/></g>`,
  keys: (c) => `<circle cx="0" cy="-10" r="8" fill="none" stroke="${INK}" stroke-width="7"/><circle cx="0" cy="-10" r="8" fill="none" stroke="${c}" stroke-width="3"/><circle cx="-6" cy="-20" r="5" fill="${c}"/><rect x="-7.5" y="-22" width="3" height="3" fill="${INK}" stroke="none"/><path d="M8 -6 L18 4 L15 7 M14 0 L11 3" fill="none" stroke-width="6" stroke="${INK}"/><path d="M8 -6 L18 4 L15 7 M14 0 L11 3" fill="none" stroke-width="2.6" stroke="${c}"/>`,
  hammer: (c, h) => `<path d="M0 6 L0 -18" stroke="${INK}" stroke-width="8"/><path d="M0 6 L0 -18" stroke="${h}" stroke-width="4"/><rect x="-13" y="-28" width="26" height="13" rx="3" fill="${c}"/><path d="M-9 -24 L-9 -19" stroke="${shade(c, 0.5)}" stroke-width="2"/>`,
  horn: (c, band) => `<path d="M-2 6 Q-14 -10 0 -26 L18 -16 Q2 -8 4 6 Z" fill="${c}"/><ellipse cx="9" cy="-21" rx="10.5" ry="5.5" transform="rotate(30 9 -21)" fill="${shade(c, -0.2)}"/><ellipse cx="9" cy="-21" rx="6" ry="2.6" transform="rotate(30 9 -21)" fill="${INK}"/><path d="M-6 -4 Q0 -8 5 -4" fill="none" stroke="${band}" stroke-width="3.4"/><path d="M-6 -4 Q0 -8 5 -4" fill="none" stroke-width="0"/>`,
  fan: (c) => `<path d="M0 4 L0 -6" stroke="${INK}" stroke-width="6"/><path d="M0 -4 Q-20 -14 -16 -30 Q0 -36 16 -30 Q20 -14 0 -4 Z" fill="${c}"/><path d="M0 -6 L-8 -28 M0 -6 L0 -32 M0 -6 L8 -28" stroke="${shade(c, -0.3)}" stroke-width="1.6"/>`,
  brush: (c) => `<path d="M0 6 L0 -16" stroke="${INK}" stroke-width="8"/><path d="M0 6 L0 -16" stroke="${c}" stroke-width="4"/><path d="M-5 -16 L5 -16 Q6 -26 0 -34 Q-6 -26 -5 -16 Z" fill="#1a1a1a"/><circle cx="12" cy="-28" r="3" fill="#1a1a1a" stroke="none"/><circle cx="16" cy="-20" r="2" fill="#1a1a1a" stroke="none"/>`,
  quill: (c) => `<path d="M-2 6 Q-2 -14 14 -32 Q12 -14 0 4 Z" fill="${c}"/><path d="M-2 6 L8 -18" stroke="${INK}" stroke-width="1.6"/><circle cx="-4" cy="9" r="2.4" fill="#3a2a6b" stroke="none"/>`,
  heart: (c) => `<path d="M0 0 L-12 -12 L-12 -20 L-8 -24 L-4 -24 L0 -20 L4 -24 L8 -24 L12 -20 L12 -12 Z" fill="${c}"/><rect x="-8" y="-20" width="4" height="4" fill="#fff" stroke="none"/>`,
  spool: (c, t) => `<rect x="-10" y="-24" width="20" height="5" rx="1.5" fill="${c}"/><rect x="-10" y="-4" width="20" height="5" rx="1.5" fill="${c}"/><rect x="-7" y="-19" width="14" height="15" fill="${t}"/><path d="M7 -12 Q22 -10 18 6" fill="none" stroke="${t}" stroke-width="2.4"/>`,
  envelope: (c, seal) => `<rect x="-14" y="-20" width="28" height="19" rx="2" fill="${c}"/><path d="M-14 -20 L0 -9 L14 -20" fill="none"/><circle cx="0" cy="-9" r="4" fill="${seal}"/>`,
  wand: (c, star) => `<path d="M0 6 L0 -14" stroke="${INK}" stroke-width="7"/><path d="M0 6 L0 -14" stroke="${c}" stroke-width="3"/>${sparkle(0, -24, 12, star)}<circle cx="0" cy="-24" r="2.5" fill="#fff" stroke="none"/>`,
  cube: (c, g) => `<path d="M0 -30 L13 -23 L13 -8 L0 -1 L-13 -8 L-13 -23 Z" fill="${c}"/><path d="M-13 -23 L0 -16 L13 -23 M0 -16 L0 -1" fill="none"/><path d="M0 -16 L13 -23 L13 -8 L0 -1 Z" fill="${g}" opacity=".55" stroke="none"/>`,
  crystal: (c) => `<path d="M0 -32 L10 -16 L6 2 L-6 2 L-10 -16 Z" fill="${c}"/><path d="M0 -32 L0 2 M-10 -16 L10 -16" fill="none" stroke-width="1.6"/><path d="M-4 -24 L-6 -14" stroke="#fff" stroke-width="2"/>`,
  ship: (c, g) => `<g transform="rotate(-30 0 -14)"><path d="M0 -32 Q7 -20 7 -6 L14 2 L-14 2 L-7 -6 Q-7 -20 0 -32 Z" fill="${c}"/><circle cx="0" cy="-16" r="4" fill="${g}"/><path d="M-4 3 L0 10 L4 3 Z" fill="#ff8a2a"/></g>`,
  shield: (c, m) => `<path d="M-13 -26 L13 -26 L13 -10 Q13 2 0 7 Q-13 2 -13 -10 Z" fill="${c}"/><path d="M4 -20 A8 8 0 1 0 6 -6 A6 6 0 1 1 4 -20 Z" fill="${m}" stroke="none"/>`,
  mirror: (c, g) => `<path d="M0 6 L0 -6" stroke="${INK}" stroke-width="7"/><path d="M0 6 L0 -6" stroke="${c}" stroke-width="3"/><ellipse cx="0" cy="-18" rx="11" ry="13" fill="${c}"/><ellipse cx="0" cy="-18" rx="7" ry="9" fill="${g}" stroke="none"/><path d="M-3 -23 L2 -14" stroke="#fff" stroke-width="2"/>`,
  orb: (c, g) => `<circle cx="0" cy="-14" r="12" fill="${c}"/><circle cx="0" cy="-14" r="6" fill="${g}" stroke="none"/><path d="M-6 -20 Q-2 -24 3 -23" stroke="#fff" stroke-width="2"/>`,
  panel: (c, g) => `<rect x="-15" y="-26" width="30" height="22" rx="3" fill="${c}"/><rect x="-11" y="-21" width="10" height="6" rx="1" fill="${g}" stroke="none"/><rect x="2" y="-21" width="9" height="13" rx="1" fill="${g}" stroke="none" opacity=".6"/><rect x="-11" y="-12" width="10" height="4" rx="1" fill="${g}" stroke="none" opacity=".6"/>`,
  camera: (c, g) => `<rect x="-14" y="-20" width="28" height="18" rx="3" fill="${c}"/><rect x="-8" y="-24" width="9" height="5" rx="1" fill="${c}"/><circle cx="2" cy="-11" r="6" fill="${g}"/><circle cx="10" cy="-16" r="1.6" fill="#ff5a6e" stroke="none"/>`,
  pad: (c, g) => `<path d="M-15 -14 Q-15 -22 -6 -22 L6 -22 Q15 -22 15 -14 L16 -2 Q16 4 10 2 L5 -4 L-5 -4 L-10 2 Q-16 4 -16 -2 Z" fill="${c}"/><circle cx="7" cy="-14" r="2.4" fill="${g}" stroke="none"/><path d="M-9 -14 h6 M-6 -17 v6" stroke="${g}" stroke-width="2"/>`,
  seed: (c, g) => `<path d="M0 -32 Q14 -20 10 -6 Q6 4 0 4 Q-6 4 -10 -6 Q-14 -20 0 -32 Z" fill="${c}"/><path d="M0 -26 Q6 -16 0 -2" fill="none" stroke="${g}" stroke-width="2.4"/><circle cx="-4" cy="-14" r="2.4" fill="${g}" stroke="none"/>`,
  scroll: (c) => `<rect x="-13" y="-22" width="26" height="22" fill="${c}"/><rect x="-16" y="-25" width="32" height="5" rx="2.5" fill="${shade(c, -0.25)}"/><rect x="-16" y="-2" width="32" height="5" rx="2.5" fill="${shade(c, -0.25)}"/><path d="M-7 -15 h14 M-7 -9 h10" stroke="${INK}" stroke-width="1.8"/>`,
};

// ---------- emblems ----------
// Chest badge glyphs, drawn inside a 6.5-radius disc at (0,104) on the torso.
export const EMBLEMS = {
  star: (c) => sparkle(0, 0, 4.4, c),
  eye: (c) => `<path d="M-4.5 0 Q0 -4.5 4.5 0 Q0 4.5 -4.5 0 Z" fill="#fff" stroke="${INK}" stroke-width="1.4"/><circle r="1.8" fill="${c}"/>`,
  key: (c) => `<circle cx="0" cy="-2" r="2.2" fill="none" stroke="${c}" stroke-width="1.8"/><path d="M0 0 L0 4.5 M0 3 L1.8 3" stroke="${c}" stroke-width="1.8"/>`,
  spiral: (c) => `<path d="M0 0 m-1.5 0 a1.5 1.5 0 1 1 1.5 1.5 a3 3 0 1 1 3 -3" fill="none" stroke="${c}" stroke-width="1.6"/>`,
  cube: (c) => `<path d="M0 -4 L3.5 -2 L3.5 2 L0 4 L-3.5 2 L-3.5 -2 Z" fill="${c}"/>`,
  flake: (c) => `<path d="M0 -4.5 V4.5 M-3.9 -2.2 L3.9 2.2 M-3.9 2.2 L3.9 -2.2" stroke="${c}" stroke-width="1.6"/>`,
  feather: (c) => `<path d="M-2 4 Q-2 -2 3 -5 Q3 1 -2 4 Z" fill="${c}"/>`,
  heart: (c) => `<path d="M0 3.5 L-3.6 0 Q-4.5 -3.5 -1.8 -3.6 Q0 -3.4 0 -1.6 Q0 -3.4 1.8 -3.6 Q4.5 -3.5 3.6 0 Z" fill="${c}"/>`,
  bolt: (c) => `<path d="M1 -4.5 L-2.5 0.5 L0 0.5 L-1 4.5 L2.5 -0.5 L0 -0.5 Z" fill="${c}"/>`,
  moon: (c) => `<path d="M1 -4 A4 4 0 1 0 2.6 3 A3 3 0 1 1 1 -4 Z" fill="${c}"/>`,
  rune: (c) => `<path d="M-2 -4 V4 M-2 -2 L2 -4 M-2 1 L2 -1" stroke="${c}" stroke-width="1.6"/>`,
  gear: (c) => `<circle r="3.2" fill="none" stroke="${c}" stroke-width="2"/><path d="M0 -4.8 V-3 M0 4.8 V3 M-4.8 0 H-3 M4.8 0 H3" stroke="${c}" stroke-width="1.8"/>`,
  wave: (c) => `<path d="M-4 1 Q-2 -2 0 1 Q2 4 4 1" fill="none" stroke="${c}" stroke-width="1.8"/>`,
  glyph: (c) => `<path d="M-3 -3 H3 L-3 3 H3" fill="none" stroke="${c}" stroke-width="1.6"/>`,
  rainbow: () => `<path d="M-4 2 A4 4 0 0 1 4 2" fill="none" stroke="#ff5a6e" stroke-width="1.5"/><path d="M-2.5 2 A2.5 2.5 0 0 1 2.5 2" fill="none" stroke="#59b7ff" stroke-width="1.5"/>`,
};

function emblem(ch) {
  if (!ch.emblem) return '';
  const e = ch.emblem;
  const y = ch.base === 'raven' ? 104 : 106;
  return `<g transform="translate(0 ${y})">` + inked(`<circle r="6.8" fill="${e.disc || '#fff6e8'}"/>`, 2.4) + EMBLEMS[e.shape](e.color) + '</g>';
}

// ---------- pose effects ----------
function fx(kind, ch) {
  const acc = ch.accent || '#ffd84a';
  switch (kind) {
    case 'sparkles': return sparkle(-62, 62, 7, acc) + sparkle(-34, 6, 5, '#fff') + sparkle(60, 70, 6, acc);
    case 'dots': return inked(`<circle cx="36" cy="16" r="3" fill="#fff"/><circle cx="46" cy="7" r="4" fill="#fff"/><circle cx="58" cy="-2" r="5.5" fill="#fff"/>`, 2.2);
    case 'bang': return inked(`<path d="M-50 18 L-44 32 M-62 30 L-50 38 M50 18 L44 32 M62 30 L50 38" fill="none"/>`, 3.2);
    case 'present': return sparkle(60, 64, 5, acc) + sparkle(28, 66, 4, '#fff');
    case 'wave': return `<path d="M60 38 Q68 46 64 56 M66 30 Q76 44 71 58" fill="none" stroke="${INK}" stroke-width="2.6" stroke-linecap="round"/>`;
    default: return '';
  }
}

// ---------- assembly ----------
function merge(ch) {
  const out = { back: '', mid: '', front: '' };
  for (const [name, ...args] of ch.acc || []) {
    const r = ACC[name](...args);
    for (const k of Object.keys(out)) if (r[k]) out[k] += r[k];
  }
  return out;
}

function propAt(ch, pose) {
  if (!pose.prop || !ch.prop) return '';
  const h = pose.arms[pose.prop.hand].h;
  const [name, ...args] = ch.prop;
  const x = h[0] + pose.prop.dx, y = h[1] + pose.prop.dy;
  return `<g transform="translate(${n(x)} ${n(y)}) rotate(${pose.prop.rot})">` + inked(PROPS[name](...args), 2.6) + '</g>';
}

export function render(ch, poseName, expr) {
  const pose = POSES[poseName];
  if (!pose) throw new Error('unknown pose ' + poseName);
  const acc = merge(ch);
  const hair = HAIR[ch.hair.style](ch.hair.color, ch.hair.accent);
  const f = face(ch, expr);
  const hd = pose.head;
  const headT = `translate(${hd.dx} ${hd.dy}) rotate(${hd.rot} 0 88)`;

  let s = '';
  s += `<g transform="translate(0 ${-pose.lift})">`;
  // 1. behind everything: hair back, accessory back (rotates with the head)
  s += `<g transform="${headT}">` + inked(acc.back + hair.back) + '</g>';
  // 2. cape, tail, legs
  s += cape(ch);
  const tails = (ch.acc || []).filter(([a]) => a === 'tail' || a === 'horseTail').map(([a, ...r]) => ACC[a](...r).body).join('');
  s += inked(tails);
  s += legs(ch, pose);
  // 3. back arm (non-front arms), torso, body accessories
  s += torso(ch);
  const bodyAcc = (ch.acc || []).filter(([a]) => a !== 'tail' && a !== 'horseTail').map(([a, ...r]) => ACC[a](...r).body || '').join('');
  s += inked(bodyAcc);
  s += emblem(ch);
  for (const side of ['L', 'R']) if (!pose.arms[side].front) s += arm(ch, pose, side);
  s += propAt(ch, pose);
  for (const side of ['L', 'R']) if (!pose.arms[side].front) s += hand(ch, pose, side);
  // 4. head
  s += `<g transform="${headT}">` + headBase(ch) + inked(acc.mid) + f.under + inked(hair.front + acc.front) + f.over + '</g>';
  // 5. front arms (thinking hand at chin)
  for (const side of ['L', 'R']) if (pose.arms[side].front) s += arm(ch, pose, side) + hand(ch, pose, side);
  s += fx(pose.fx, ch);
  s += '</g>';
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VIEWBOX}" width="320" height="344">` +
    `<title>${ch.name} — ${poseName}, ${expr}</title>${s}</svg>\n`;
}
