"use client";

import { useId, type CSSProperties } from "react";

type FlowerKind = "rose" | "tulip";

export function Flower({ kind = "tulip", color = "pink", className = "" }: { kind?: FlowerKind; color?: string; className?: string }) {
  const uid = useId().replaceAll(":", "");
  const palette = color === "cream" ? ["#fff9e9", "#e4cbb1", "#b19a7c"] : color === "red" ? ["#dc8790", "#a8415b", "#7d2e47"] : ["#f5c2c8", "#db899e", "#a9516b"];
  return <svg className={`flower-svg ${className}`} viewBox="0 0 140 300" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={`${uid}p`} x1="35" y1="10" x2="95" y2="105" gradientUnits="userSpaceOnUse"><stop stopColor={palette[0]} /><stop offset=".65" stopColor={palette[1]} /><stop offset="1" stopColor={palette[2]} /></linearGradient>
      <linearGradient id={`${uid}l`} x1="20" y1="140" x2="90" y2="230" gradientUnits="userSpaceOnUse"><stop stopColor="#acb49a" /><stop offset="1" stopColor="#607b5e" /></linearGradient>
    </defs>
    <g className="stem-grow">
      <path d="M71 291C67 231 80 153 70 82" stroke="#74856a" strokeWidth="3" strokeLinecap="round" />
      <path d="M71 230C28 226 16 186 22 158c32 17 46 37 49 72Z" fill={`url(#${uid}l)`} />
      <path d="M71 207c35-11 50-50 45-79-31 27-39 46-45 79Z" fill={`url(#${uid}l)`} />
      <path d="M70 230 26 167m46 40 40-68" stroke="#d3d6b9" strokeWidth=".8" />
      <path d="M69 257c-13-8-26-9-39-7 11 13 26 20 39 7Z" fill="#9daa89" />
    </g>
    <g className="flower-bloom" fill={`url(#${uid}p)`} stroke={palette[2]} strokeWidth=".7" strokeLinejoin="round">
      {kind === "tulip" ? <>
        <path d="M70 88C41 88 28 64 32 31c18 1 34 13 40 30 6-18 20-30 38-34 7 35-9 61-40 61Z" />
        <path className="petal-open left" d="M71 87C44 80 34 58 37 26c20 9 33 30 34 61Z" />
        <path className="petal-open right" d="M70 87c29-7 37-34 33-63-21 9-34 34-33 63Z" />
        <path d="M70 14c-29 27-27 55 0 74 27-22 28-48 0-74Z" />
        <path d="M69 28c-8 16-10 33-3 47m9-37c8 16 7 25 0 39" stroke={palette[0]} strokeWidth="1.2" opacity=".7" />
      </> : <>
        <path className="petal-open" d="M73 94c-21 9-43-3-43-20-22-8-20-32-3-40C25 10 48 8 62 17 80 0 99 10 104 28c27 3 33 27 17 42 2 22-23 33-48 24Z" />
        <path d="M72 88C40 99 26 76 32 57c-9-23 19-40 40-30 23-13 44 3 42 24 14 17-7 45-42 37Z" />
        <path d="M39 62c12 29 47 31 63 7C81 79 63 73 62 48c-14-2-25 4-23 14Z" />
        <path d="M62 48c-1 24 21 37 39 20 14-12 3-29-12-33 0 19-11 24-27 13Z" />
        <path d="M57 34C43 38 46 55 63 60c20 7 37-9 25-23-8-10-23-11-31-3Z" />
        <path d="M62 37c-12 9 3 20 14 16 13-7 1-20-9-15-8 4-1 10 5 8" />
        <path d="M30 73c9 5 17 5 25 3m41-53c-5 2-8 6-9 11M36 35c5 0 10 3 14 7m57 30-7-3" stroke={palette[0]} opacity=".8" />
      </>}
    </g>
  </svg>;
}

export function BabyBranch({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 120 260" fill="none" aria-hidden="true">
    <path d="M57 258 61 100 32 45m29 95 32-72m-33 45L37 87m23 90 38-52M51 82l25-50m-17 77L15 67" stroke="#95a180" strokeWidth="1.2" />
    {[[32, 45], [93, 68], [37, 87], [98, 125], [76, 32], [15, 67], [60, 100], [89, 109], [46, 54], [98, 45], [24, 24]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}>
      {[0, 72, 144, 216, 288].map(r => <ellipse key={r} cy="-4" rx="3.5" ry="5" fill="#fffaf3" stroke="#d9cbb4" strokeWidth=".55" transform={`rotate(${r})`} />)}
      <circle r="2" fill="#cebb89" />
    </g>)}
  </svg>;
}

export function Bouquet({ className = "" }: { className?: string }) {
  const blooms: { x: number; y: number; r: number; s: number; kind: FlowerKind; color: string }[] = [
    { x: 11, y: 12, r: -31, s: .9, kind: "tulip", color: "cream" },
    { x: 47, y: -12, r: -18, s: 1.02, kind: "rose", color: "pink" },
    { x: 144, y: -3, r: 20, s: .96, kind: "tulip", color: "cream" },
    { x: 108, y: -37, r: 7, s: 1.08, kind: "tulip", color: "pink" },
    { x: 27, y: 58, r: -27, s: .94, kind: "rose", color: "red" },
    { x: 158, y: 52, r: 33, s: .9, kind: "rose", color: "pink" },
    { x: 83, y: 46, r: -6, s: 1.04, kind: "rose", color: "pink" },
  ];
  return <div className={`bouquet ${className}`} aria-label="Bó hoa hồng, tulip và hoa baby minh họa" role="img">
    <div className="bouquet-halo" />
    <div className="bouquet-flowers">
      <BabyBranch className="baby-branch baby-left" /><BabyBranch className="baby-branch baby-right" />
      {blooms.map((b, i) => <div key={i} className="bouquet-flower" style={{ left: b.x, top: b.y, transform: `rotate(${b.r}deg) scale(${b.s})`, "--delay": `${i * .09}s` } as CSSProperties}><Flower kind={b.kind} color={b.color} /></div>)}
      <svg className="bouquet-wrap" viewBox="0 0 300 230" fill="none" aria-hidden="true">
        <path d="m55 15 108 41L251 9l-60 190-45 14Z" fill="#eee2d1" stroke="#ccba9d" strokeWidth="1" />
        <path d="m55 15 98 97 38 87L98 166Z" fill="#f7eee0" stroke="#d7c6ac" />
        <path d="m251 9-98 103 38 87 40-94Z" fill="#e8d9c4" stroke="#caba9e" />
        <path d="m94 139 106-9m-99 22 93-11" stroke="#a55e70" strokeWidth="5" />
        <path d="M152 142c-18-32-47-18-35-4 8 11 35 4 35 4Zm0 0c20-33 46-16 31-3-10 8-31 3-31 3Z" fill="#c88999" stroke="#99576b" />
        <path d="m151 143-23 42 11-2 4 12 10-46 14 46 7-12 11 3-31-44" fill="#bd788d" />
      </svg>
    </div>
  </div>;
}

const gardenFlowers: { left: number; bottom: number; height: number; rotate: number; kind: FlowerKind; color: string }[] = [
  { left: 0, bottom: 0, height: 230, rotate: -18, kind: "tulip", color: "cream" },
  { left: 7, bottom: -6, height: 285, rotate: -10, kind: "rose", color: "pink" },
  { left: 19, bottom: -10, height: 240, rotate: 10, kind: "tulip", color: "pink" },
  { left: 28, bottom: -28, height: 195, rotate: -12, kind: "rose", color: "red" },
  { left: 66, bottom: -16, height: 220, rotate: 12, kind: "rose", color: "pink" },
  { left: 77, bottom: -5, height: 288, rotate: 8, kind: "tulip", color: "cream" },
  { left: 87, bottom: -12, height: 248, rotate: 20, kind: "rose", color: "red" },
];

export function FlowerGarden({ onFlower }: { onFlower: (index: number) => void }) {
  return <div className="flower-garden" aria-label="Vườn hoa tương tác">
    <BabyBranch className="garden-baby garden-baby-left" /><BabyBranch className="garden-baby garden-baby-right" />
    {gardenFlowers.map((f, i) => <button className="garden-flower" key={i} onClick={() => onFlower(i)} aria-label={`Chạm hoa ${f.kind === "rose" ? "hồng" : "tulip"} ${i + 1} để nhận lời chúc`} style={{ left: `${f.left}%`, bottom: f.bottom, height: f.height, "--rotation": `${f.rotate}deg`, "--delay": `${i * .12}s`, "--sway-duration": `${5 + i * .5}s` } as CSSProperties}><Flower kind={f.kind} color={f.color} /></button>)}
    <div className="garden-ground" />
  </div>;
}
