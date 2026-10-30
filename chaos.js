// =====================================================================
//  짜침 100종 세트 (chaos pack)
//  index.html 의 게임 함수들을 감싸서 짜치는 연출 100개를 끼워넣음.
//  1~40: 가만히 있어도 랜덤으로 나옴 / 41~60: 블록 놓을 때 / 61~75: 줄 지울 때 / 76~100: 특정 행동
// =====================================================================
(() => {
const R = (a, b) => a + Math.random() * (b - a);
const ri = (a, b) => Math.floor(R(a, b + 1));
const pick = a => a[Math.floor(Math.random() * a.length)];
const wrapEl = document.getElementById("wrap");
const h1 = document.querySelector("h1");

document.head.insertAdjacentHTML("beforeend", `<style>
.cz { position: fixed; z-index: 120; pointer-events: none; white-space: nowrap; }
.czban { font-size: 18px; background: #ff0; color: #f00; border: 2px solid #000; padding: 2px 8px; margin-left: 4px; font-weight: bold; vertical-align: middle; }
.czcount { position: fixed; top: 34px; right: 4px; z-index: 41; background: #f0f; color: #ff0; font-size: 12px; padding: 2px 6px; border: 2px outset #fff; font-weight: bold; }
.cznew { position: fixed; right: 6px; top: 58px; z-index: 130; background: #ff0; color: #000; border: 3px solid #f00; padding: 4px 8px; font-size: 13px; font-weight: bold; animation: czslide 2.2s ease forwards; pointer-events: none; }
@keyframes czslide { 0% { transform: translateX(130%); } 15%, 80% { transform: none; } 100% { transform: translateX(130%); } }
html { transition: transform .3s, filter .3s; }
html.czflip { transform: rotate(180deg); }
html.czmirror { transform: scaleX(-1); }
html.czzoom { transform: scale(1.25); }
html.cztv { filter: grayscale(1) contrast(1.6) brightness(1.1); }
html.cznight { filter: brightness(.35) sepia(.5) hue-rotate(190deg); }
html.czslow { filter: blur(2px) saturate(2); }
html.czdisco { animation: czhue .3s linear infinite; }
html.czgung body, html.czgung body * { font-family: "Gungsuh", "궁서", "Batang", serif !important; }
@keyframes czhue { to { filter: hue-rotate(360deg) saturate(3); } }
.czscan { inset: 0; background: repeating-linear-gradient(#0000 0 2px, #0006 2px 4px); z-index: 119; }
.czrain { animation: czfade 3s ease forwards; }
@keyframes czfade { 0% { opacity: 0; transform: scale(.3); } 20%, 70% { opacity: .85; transform: scale(1); } 100% { opacity: 0; } }
.czghost { animation: czghost 5s ease-in-out forwards; }
@keyframes czghost { 0% { opacity: 0; } 25% { opacity: .6; transform: translate(60px, -30px); } 50% { opacity: .3; transform: translate(-40px, 20px); } 75% { opacity: .6; transform: translate(30px, -50px); } 100% { opacity: 0; } }
.czsun { right: 10px; top: 60px; font-size: 80px; animation: czsun 4s ease forwards; }
@keyframes czsun { 0% { transform: translateY(200px) rotate(0); } 30%, 70% { transform: translateY(0) rotate(180deg); } 100% { transform: translateY(200px) rotate(360deg); } }
.czbanner { left: 0; right: 0; bottom: 0; background: #f00; color: #ff0; text-align: center; font-weight: bold; padding: 8px; font-size: 16px; animation: blink .3s steps(2) infinite; z-index: 121; white-space: normal; }
.cznotif { left: 50%; top: 10px; transform: translateX(-50%); background: #fff; color: #000; border-radius: 14px; padding: 10px 16px; box-shadow: 0 6px 20px #0008; font-family: sans-serif; font-size: 15px; animation: cznotif 3s ease forwards; z-index: 125; }
@keyframes cznotif { 0% { top: -80px; } 15%, 85% { top: 10px; } 100% { top: -80px; } }
.czbsod { inset: 0; background: #0078d7; color: #fff; font-family: "Segoe UI", sans-serif; padding: 10vh 10vw; font-size: 22px; z-index: 400; white-space: normal; }
.czbsod b { font-size: 90px; display: block; }
.czpaper { left: 50%; top: 28%; background: #f5f0e1; color: #000; font-family: "Batang", "바탕", serif; border: 3px double #000; padding: 12px 18px; font-size: clamp(16px, 4.5vw, 24px); font-weight: bold; white-space: normal; width: min(420px, 90vw); text-align: center; animation: czpaper 2.5s ease forwards; z-index: 125; }
.czpaper small { display: block; font-size: 12px; font-weight: normal; border-bottom: 2px solid #000; margin-bottom: 6px; }
@keyframes czpaper { 0% { transform: translateX(-50%) rotate(-720deg) scale(0); } 25%, 85% { transform: translateX(-50%) rotate(-6deg) scale(1); } 100% { transform: translateX(-50%) rotate(-6deg); opacity: 0; } }
.czchat { left: 6px; top: 80px; width: 150px; background: #000a; color: #fff; font-size: 13px; padding: 6px; border-radius: 6px; white-space: normal; z-index: 42; }
.czchat div { animation: adin .3s; } .czchat b { color: #ff0; }
.czborder { inset: 0; border: 12px solid; border-image: linear-gradient(90deg, red, orange, yellow, lime, cyan, blue, magenta) 1; animation: czhue .2s linear infinite; z-index: 118; }
.czglow { outline: 3px solid #fff; animation: czhue .2s linear infinite !important; }
.czcast { left: 50%; bottom: 26px; transform: translateX(-50%); background: #000c; color: #fff; padding: 6px 12px; font-size: 15px; border-radius: 4px; z-index: 121; }
.czclock { top: 58px; left: 4px; z-index: 41; background: #000; color: #0ff; font-family: "Courier New", monospace; font-size: 12px; padding: 2px 6px; }
.czguest { left: 0; right: 0; bottom: 0; background: #fffbe0; color: #333; font-size: 12px; overflow: hidden; z-index: 39; padding: 2px 0; border-top: 1px dashed #f90; }
.czguest span { display: inline-block; padding-left: 100%; animation: marq 25s linear infinite; }
.czrevive { left: 50%; bottom: 12%; transform: translateX(-50%); z-index: 210; pointer-events: auto; cursor: pointer; background: #fff; color: #00f; border: 3px dashed #00f; padding: 8px 14px; font-size: 16px; text-decoration: underline; }
</style>`);

// ---------- 공통 도구 ----------
function mk(html, cls = "cz", ms = 0, style = {}) {
  const d = document.createElement("div");
  d.className = cls;
  d.innerHTML = html;
  Object.assign(d.style, style);
  document.body.appendChild(d);
  if (ms) setTimeout(() => d.remove(), ms);
  return d;
}
function say(t, x = R(.2, .8) * innerWidth, y = R(.2, .7) * innerHeight) {
  mk(t, "boing", 800, { left: x + "px", top: y + "px" });
}
function sayAt(idx, t) {
  const r = cells[idx].getBoundingClientRect();
  say(t, r.left + r.width / 2, r.top);
}
// 화면 가로질러 날아가기. dir 1: 왼→오, -1: 오→왼
function fly(txt, { dir = 1, y = R(8, 75), dur = 4500, size = 44, click } = {}) {
  const d = mk(txt, "cz", 0, { top: y + "vh", left: "0", fontSize: size + "px" });
  const a = -200, b = innerWidth + 60;
  const anim = d.animate([{ transform: `translateX(${dir > 0 ? a : b}px)` }, { transform: `translateX(${dir > 0 ? b : a}px)` }], { duration: dur });
  anim.onfinish = () => d.remove();
  if (click) {
    d.style.pointerEvents = "auto"; d.style.cursor = "pointer";
    d.addEventListener("pointerdown", e => { e.stopPropagation(); click(d); });
  }
  return d;
}
function htmlFx(cls, ms) {
  document.documentElement.classList.add(cls);
  setTimeout(() => document.documentElement.classList.remove(cls), ms);
}
function fall(txt, n, ms = 60) {
  for (let k = 0; k < n; k++) setTimeout(() => {
    const m = mk(typeof txt === "string" ? txt : pick(txt), "money", 0, { left: R(0, 100) + "vw" });
    const dur = R(1.5, 3.5);
    m.style.animationDuration = dur + "s";
    setTimeout(() => m.remove(), dur * 1000);
  }, k * ms);
}
function noise(dur = .3, vol = .15, freq = 300) {
  try {
    beep(20, .01, "sine", .0001); // 오디오 컨텍스트 깨우기
    const buf = ac.createBuffer(1, Math.floor(ac.sampleRate * dur), ac.sampleRate);
    const ch = buf.getChannelData(0);
    for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
    const s = ac.createBufferSource(), f = ac.createBiquadFilter(), g = ac.createGain();
    s.buffer = buf; f.type = "lowpass"; f.frequency.value = freq;
    g.gain.value = vol; g.gain.exponentialRampToValueAtTime(.001, ac.currentTime + dur);
    s.connect(f).connect(g).connect(ac.destination);
    s.start();
  } catch (e) {}
}
const busy = () => document.querySelector("#pay.on, #troll.on, #over.on, #loading");

// ---------- 짜침 도감 ----------
const G = {}, found = new Set();
const gag = (id, name, fn) => { G[id] = { name, fn }; };
const counter = mk(`📖 짜침 도감 <span>0</span>/<i>100</i>`, "czcount");
let newBadge;
function run(id, ...args) {
  const g = G[id];
  if (!g) return;
  try { g.fn(...args); } catch (e) { console.warn("짜침 #" + id + " 고장", e); }
  if (!found.has(id)) {
    found.add(id);
    counter.querySelector("span").textContent = found.size;
    if (newBadge) newBadge.remove();
    newBadge = mk(`NEW! 짜침 #${id} ${g.name}`, "cznew", 2200);
    const total = Object.keys(G).length;
    if (found.size === total) setTimeout(() => { popText(`짜침 ${total}종 완성!!!`); fall(["🏆", "👑", "💯"], 60); }, 500);
  }
}

// =================== 1~40: 랜덤으로 나오는 것들 ===================
gag(1, "UFO 출몰", () => { fly("🛸", { size: 50, dur: 3500 }); for (let k = 0; k < 6; k++) setTimeout(() => beep(R(300, 900), .15, "sine", .04), k * 200); });
gag(2, "달팽이 산책", () => fly("🐌", { y: 90, dur: 15000, size: 30 }));
gag(3, "오리 꽥", () => { fly("🦆", { dir: -1, size: 40, dur: 3000 }); beep(500, .12, "square"); setTimeout(() => beep(450, .15, "square"), 180); say("꽥!"); });
gag(4, "무지개 떴다", () => mk("🌈", "cz czrain", 3000, { top: "10vh", left: R(0, 60) + "vw", fontSize: "120px" }));
gag(5, "비행기 광고", () => fly(`✈️<span class="czban">블록빵빵 최고!! 지금 접속!!</span>`, { dur: 6000, size: 36, y: R(8, 30) }));
gag(6, "고양이 지나감", () => { fly("🐈", { y: 88, dur: 7000, size: 40, dir: -1 }); setTimeout(() => say("냐옹~"), 1500); });
gag(7, "화면 뒤집힘", () => { htmlFx("czflip", 1200); toast("?? 화면 왜 이럼"); });
gag(8, "거울 모드", () => { htmlFx("czmirror", 1500); popText("ㅋㅋ요모 울거"); });
gag(9, "흑백 TV", () => { htmlFx("cztv", 2500); mk("", "cz czscan", 2500); noise(2.4, .03, 4000); });
gag(10, "지진 발생", () => {
  toast("⚠ 지진 발생 ⚠ 블록을 꽉 잡으세요");
  wrapEl.animate([0, 1, 2, 3, 4, 5, 6, 7, 8].map(k => ({ transform: `translate(${k === 8 ? 0 : R(-15, 15)}px, ${k === 8 ? 0 : R(-15, 15)}px)` })), { duration: 900 });
  noise(.9, .2, 80);
});
gag(11, "번개", () => { for (let k = 0; k < 3; k++) setTimeout(() => mk("", "flash", 300), k * 150); setTimeout(() => noise(1.2, .3, 120), 300); say("⚡콰과광⚡"); });
gag(12, "눈 내림", () => fall("❄️", 30));
gag(13, "하트 비", () => fall(["💕", "💖", "💘", "💗"], 30));
gag(14, "별똥별", () => {
  const d = mk("🌠", "cz", 0, { fontSize: "40px", left: "0", top: "0" });
  d.animate([{ transform: `translate(${innerWidth}px, 0)` }, { transform: `translate(-100px, ${innerHeight * .6}px)` }], { duration: 1200 }).onfinish = () => d.remove();
  say("소원 빌어!!");
});
gag(15, "피자 배달", () => { fly("🛵🍕", { y: 86, dur: 5000 }); setTimeout(() => say("배달왔습니다~"), 1500); });
gag(16, "유령", () => { mk("👻", "cz czghost", 5000, { left: R(10, 70) + "vw", top: R(20, 60) + "vh", fontSize: "60px" }); beep(200, 1.5, "sine", .04); });
gag(17, "공룡 크앙", () => { fly("🦖", { y: 75, size: 70, dur: 3000, dir: -1 }); say("크앙!!!"); noise(.6, .25, 200); });
gag(18, "하늘에서 똥", () => {
  const x = R(10, 90);
  const d = mk("💩", "cz", 0, { fontSize: "40px", left: x + "vw", top: "-50px" });
  d.animate([{ transform: "translateY(0) rotate(0)" }, { transform: `translateY(${innerHeight * .8}px) rotate(540deg)` }], { duration: 1200, easing: "cubic-bezier(.5,0,1,1)" })
    .onfinish = () => { d.remove(); say("철퍽!", x / 100 * innerWidth, innerHeight * .8); noise(.25, .25, 400); };
});
gag(19, "하단 광고 배너", () => mk("📢 지금 다운로드하면 블록 1000개 무료!!! (거짓말) 📢", "cz czbanner", 4000));
gag(20, "엄마 문자", () => { mk("💬 <b>엄마</b><br>" + pick(["밥 먹어라", "숙제는 했니", "언제 들어오니", "게임 그만해라", "ㅇㅋ"]), "cz cznotif", 3000); beep(1320, .08, "sine"); setTimeout(() => beep(1760, .1, "sine"), 100); });
gag(21, "블루스크린", () => mk("<b>:(</b>블록에 문제가 발생하여 다시 시작해야 합니다.<br><br>0% 완료<br><br><small>중지 코드: BLOCK_TOO_COOL</small>", "cz czbsod", 800));
gag(22, "윈도우 업데이트", () => mk(`<div class="bar"><span>Windows 업데이트</span><span class="x">✕</span></div><div class="body">업데이트 구성 중... <b>1%</b>컴퓨터를 끄지 마십시오</div>`, "ad", 2500, { left: R(5, 40) + "vw", top: R(15, 50) + "vh" }));
gag(23, "궁서체 모드", () => { htmlFx("czgung", 2500); toast("궁서체로 바뀌었습니다. 진지합니다."); });
gag(24, "갑자기 줌", () => htmlFx("czzoom", 1500));
gag(25, "디스코 타임", () => {
  htmlFx("czdisco", 3000);
  mk("🪩", "cz", 3000, { left: "50%", top: "40px", fontSize: "60px", transform: "translateX(-50%)" });
  for (let k = 0; k < 12; k++) setTimeout(() => beep(k % 2 ? 880 : 110, .1, "square", .05), k * 250);
});
gag(26, "판 3D 회전", () => wrapEl.animate([{ transform: "perspective(600px) rotateY(0)" }, { transform: "perspective(600px) rotateY(360deg)" }], { duration: 1000 }));
gag(27, "판 공중제비", () => wrapEl.animate([{ transform: "perspective(600px) rotateX(0)" }, { transform: "perspective(600px) rotateX(360deg)" }], { duration: 1000 }));
gag(28, "제목 오타", () => { const o = h1.textContent; h1.textContent = pick(["블록뽕뽕!!!", "블럭빵빵!!!", "빵빵블록!!!", "블록빵빵???", "불곡빵빵!!!"]); setTimeout(() => h1.textContent = o, 2000); });
gag(29, "점수판 물구나무", () => scoreEl.animate([{ transform: "rotate(0)" }, { transform: "rotate(180deg)", offset: .2 }, { transform: "rotate(180deg)", offset: .8 }, { transform: "rotate(360deg)" }], { duration: 2500 }));
gag(30, "바나나 미끌", () => { fly("🍌", { y: 90, dur: 4000 }); setTimeout(() => say("미끌!"), 1000); });
gag(31, "벌이 따라옴", () => {
  const b = mk("🐝", "cz", 4000, { fontSize: "30px", left: "50vw", top: "50vh", transition: "left .3s, top .3s" });
  const mv = e => { b.style.left = e.clientX + R(-40, 40) + "px"; b.style.top = e.clientY + R(-40, 40) + "px"; };
  addEventListener("pointermove", mv);
  setTimeout(() => removeEventListener("pointermove", mv), 4000);
  for (let k = 0; k < 8; k++) setTimeout(() => beep(R(200, 260), .2, "sawtooth", .02), k * 400);
});
gag(32, "풍선 (누르면 +1점)", () => {
  const b = mk("🎈", "cz", 0, { fontSize: "50px", left: R(5, 85) + "vw", top: "100vh", pointerEvents: "auto", cursor: "pointer" });
  b.animate([{ transform: "translateY(0) rotate(-10deg)" }, { transform: `translateY(-${innerHeight + 120}px) rotate(10deg)` }], { duration: 8000 }).onfinish = () => b.remove();
  b.addEventListener("pointerdown", e => { e.stopPropagation(); const r = b.getBoundingClientRect(); b.remove(); beep(1500, .05); say("펑! +1", r.left, r.top); setScore(1); });
});
gag(33, "바퀴벌레 (잡을 수 있음)", () => fly("🪳", { dur: 1600, size: 30, click: d => { d.remove(); say("꺄아아악!!"); noise(.5, .2, 3000); } }));
gag(34, "님 거기서 뭐함?", () => { const r = wrapEl.getBoundingClientRect(); say("💬 님 거기서 뭐함?", r.left + r.width * R(.2, .8), r.top + 30); });
gag(35, "해님 방긋", () => mk("🌞", "cz czsun", 4000));
gag(36, "밤이 되었습니다", () => { htmlFx("cznight", 2500); toast("🌙 밤이 되었습니다... 블록은 고개를 들어주세요"); });
gag(37, "쿵치따치", () => { for (let k = 0; k < 8; k++) setTimeout(() => k % 2 ? noise(.05, .1, 6000) : beep(80, .15, "sine", .3), k * 200); say("🥁 쿵치따치"); });
gag(38, "박수 갈채", () => { for (let k = 0; k < 10; k++) setTimeout(() => { noise(.04, .2, 5000); say("👏"); }, k * 120); });
gag(39, "앰뷸런스", () => { fly("🚑", { y: 86, dur: 4000 }); for (let k = 0; k < 8; k++) setTimeout(() => beep(k % 2 ? 660 : 880, .45, "triangle", .05), k * 500); });
gag(40, "오늘의 블록 운세", () => toast("🔮 오늘의 블록 운세: " + pick(["대길", "소길", "흉", "블록과 함께라면 대길", "망함", "치킨 먹을 운"])));

// =================== 41~60: 블록 놓을 때 ===================
let lvl = 1;
gag(41, "블록이 아야", (idx) => sayAt(idx, "아야!"));
gag(42, "판 젤리 출렁", () => boardEl.animate([{ transform: "scale(1,1)" }, { transform: "scale(1.1,.9)" }, { transform: "scale(.93,1.07)" }, { transform: "scale(1.03,.97)" }, { transform: "scale(1,1)" }], { duration: 600 }));
gag(43, "+1 경험치", (idx) => sayAt(idx, "+1 EXP"));
gag(44, "가짜 레벨업", () => { lvl++; popText("LEVEL UP!! Lv." + lvl); });
gag(45, "판 삐딱", () => { wrapEl.style.transform = `rotate(${R(-8, 8)}deg)`; setTimeout(() => wrapEl.style.transform = "", 3000); });
gag(46, "뿡", (idx) => { noise(.45, .35, 140); sayAt(idx, "뿡~💨"); });
gag(47, "완벽한 배치 (아님)", () => toast("완벽한 배치입니다 (아님)"));
gag(48, "장인의 망치질", (idx) => { sayAt(idx, "🔨 탕탕"); beep(1200, .03); setTimeout(() => beep(1200, .03), 150); });
gag(49, "꽃 피움", (idx) => sayAt(idx, "🌸🌼🌺"));
gag(50, "블록 변심", (idx, p) => {
  sayAt(idx, "나 여기 싫어");
  setTimeout(() => {
    const c = pick(COLORS);
    board.forEach((col, i) => { if (col === p.color && Math.random() < .5) board[i] = c; });
    renderBoard();
  }, 600);
});
gag(51, "COMBO x0", () => popText("COMBO x0"));
gag(52, "코인 획득", (idx) => { beep(988, .08, "square"); setTimeout(() => beep(1319, .25, "square"), 80); sayAt(idx, "🪙"); });
gag(53, "해설 위원", () => mk("🎙 해설: " + pick(["아~ 저기다 놓네요~", "이건 신의 한 수입니다!!", "음... 글쎄요...", "저도 저기 놨을 겁니다", "역사적인 순간입니다"]), "cz czcast", 2500));
gag(54, "관중 함성", () => { noise(1.4, .08, 1500); say("와아아아아"); });
gag(55, "무지개 테두리 블록", () => { const on = cells.filter(c => c.classList.contains("blk")); on.forEach(c => c.classList.add("czglow")); setTimeout(() => on.forEach(c => c.classList.remove("czglow")), 1200); });
gag(56, "저장 중...", () => toast("💾 저장 중... (저장 안 됨)"));
gag(57, "블록 땀 뻘뻘", (idx) => sayAt(idx, "💦💦"));
gag(58, "여기 놓으셨네요", (idx) => sayAt(idx, "👆 여기 놓으셨네요"));
gag(59, "+0점 보너스", () => toast("🎁 보너스 +0점!!"));
gag(60, "블록 속마음", (idx) => sayAt(idx, pick(["집에 가고 싶다", "월요일 싫어", "나 원래 노랑이었음", "옆에 애 별로임", "배고파"])));

// =================== 61~75: 줄 지울 때 ===================
let chatBox, chatTimer;
gag(61, "청소 완료", () => toast("🧹 청소 완료~ 반짝반짝"));
gag(62, "ON FIRE", () => popText("🔥ON FIRE🔥"));
gag(63, "아스키 아트", () => toast(pick(["(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧", "ヽ(°〇°)ﾉ", "(☞ﾟヮﾟ)☞ ☜(ﾟヮﾟ☜)", "┏(＾0＾)┛┗(＾0＾)┓"])));
gag(64, "호외 신문", (n) => mk(`<small>📰 블록일보 호외</small>속보: 한 시민 블록 ${n}줄 지워... 전국 충격`, "cz czpaper", 2500));
gag(65, "비둘기 날아감", () => fly("🕊️🕊️🕊️", { y: R(5, 30), dur: 3000, dir: -1 }));
gag(66, "왕관 강림", () => {
  const r = scoreEl.getBoundingClientRect();
  const d = mk("👑", "cz", 0, { left: r.left + r.width / 2 - 20 + "px", top: "-60px", fontSize: "40px" });
  d.animate([{ transform: "translateY(0)" }, { transform: `translateY(${r.top + 30}px)` }], { duration: 800, easing: "cubic-bezier(.3,1.6,.5,1)", fill: "forwards" });
  setTimeout(() => d.remove(), 2500);
});
gag(67, "트로피 수여", () => popText("🏆"));
gag(68, "축하 멜로디", () => [523, 784, 659, 1046, 784, 1318].forEach((f, i) => setTimeout(() => beep(f, .12, "triangle", .08), i * 90)));
gag(69, "판 쿵", () => wrapEl.animate([{ transform: "scale(1)" }, { transform: "scale(1.15)" }, { transform: "scale(.95)" }, { transform: "scale(1)" }], { duration: 400 }));
gag(70, "불꽃놀이", () => { for (let k = 0; k < 5; k++) setTimeout(() => { explode(R(.1, .9) * innerWidth, R(.1, .5) * innerHeight); beep(R(100, 200), .3, "sawtooth", .05); }, k * 200); });
gag(71, "가짜 시청자 채팅", () => {
  if (!chatBox) chatBox = mk("", "cz czchat");
  const names = ["블록왕", "ㅇㅇ", "지나가던행인", "엄마", "고인물", "뉴비"];
  for (let k = 0; k < 3; k++) setTimeout(() => {
    if (!chatBox) return;
    chatBox.insertAdjacentHTML("beforeend", `<div><b>${pick(names)}</b>: ${pick(["ㄹㅇㅋㅋ", "손 미쳤다", "ㄷㄷㄷ", "방장 천재", "구독 누름", "와 샌즈", "ㅋㅋㅋㅋㅋ", "이걸 지우네"])}</div>`);
    while (chatBox.children.length > 6) chatBox.firstChild.remove();
  }, k * 300);
  clearTimeout(chatTimer);
  chatTimer = setTimeout(() => { chatBox.remove(); chatBox = null; }, 4000);
});
gag(72, "슬로우 모션", () => { htmlFx("czslow", 1200); popText("S L O W . . . M O"); });
gag(73, "무지개 테두리 화면", () => mk("", "cz czborder", 1200));
gag(74, "숫자 폭발", () => {
  const r = scoreEl.getBoundingClientRect();
  for (let k = 0; k < 10; k++) say(String(ri(0, 9999)), r.left + R(0, r.width), r.top + R(0, 40));
});
gag(75, "마트 계산대", (n) => { beep(1046, .1, "sine"); setTimeout(() => beep(1318, .2, "sine"), 120); toast(`🛒 띵동~ 줄 ${n}개 계산되었습니다`); });

// =================== 76~100: 특정 행동 ===================
gag(76, "키보드 효과음", (key) => { say(key.length === 1 ? key.toUpperCase() : "⌨"); beep(R(200, 1200), .05); });
gag(77, "스페이스바 금지", () => toast("스페이스바 누르지 마세요 (진지)"));
gag(78, "자니...?", () => { const r = wrapEl.getBoundingClientRect(); say("자니...?", r.left + r.width / 2, r.top + r.height / 2); });
gag(79, "블록들 잠듦", () => { toast("블록들이 잠들었습니다 💤"); for (let k = 0; k < 6; k++) setTimeout(() => { const r = wrapEl.getBoundingClientRect(); say("Zzz", r.left + R(0, r.width), r.top + R(0, r.height)); }, k * 300); });
gag(80, "제목 누르지 마", () => { h1.animate([{ transform: "rotate(0)" }, { transform: "rotate(720deg) scale(1.5)" }, { transform: "rotate(720deg)" }], { duration: 800 }); toast("왜 눌러"); });
gag(81, "점수 조작 감지", () => { toast("🚨 점수 조작 시도 감지 🚨"); for (let k = 0; k < 6; k++) setTimeout(() => beep(k % 2 ? 600 : 900, .2, "square", .06), k * 200); });
gag(82, "더블클릭 금지", (x, y) => { explode(x, y); say("💥 더블클릭 금지", x, y); });
gag(83, "어지러워요", () => say("어지러워요 😵‍💫"));
gag(84, "창 건드리지 마", () => toast("창 크기 건드리지 마세요;;"));
gag(85, "어디 갔다 왔어요", () => toast("어디 갔다 왔어요? 👀 다 봤어요"));
gag(86, "50점 반백", () => popText("반백 달성!! 🎂"));
gag(87, "100점 백점", () => { popText("백점 만점에 백점 💯"); fall(["💯", "🎉"], 40); });
gag(88, "200점 블록신", () => { popText("블록신 강림 🙏"); htmlFx("czdisco", 3000); });
gag(89, "보험 처리 거절", () => setTimeout(() => toast("📋 보험 처리 중... 거절되었습니다"), 1500));
gag(90, "광고 보고 부활 (가짜)", () => setTimeout(() => {
  const b = mk("▶ 광고 보고 부활하기 (광고 길이: 30분)", "cz czrevive", 6000);
  b.addEventListener("click", () => { b.remove(); toast("광고 서버가 퇴근했습니다 ㅅㄱ"); });
}, 1800));
gag(91, "개발자 콘솔 아트", () => console.log("%c블록빵빵\n%c개발자 도구 여는 사람 = 고인물 인정 ㅋ", "font-size:40px;color:#f0f;font-weight:bold;text-shadow:3px 3px 0 #0ff", "font-size:14px;color:#0a0"));
gag(92, "코나미 커맨드 (💩 모드)", () => { COLORS.forEach(c => faceOf[c] = "💩"); renderBoard(); renderTray(); popText("💩 모드 발동 💩"); });
gag(93, "ㅋ 키", () => { for (let k = 0; k < 5; k++) say("ㅋ".repeat(ri(1, 6))); });
gag(94, "스크롤해도 없음", () => toast("스크롤해도 아무것도 없어요"));
gag(95, "으쌰!", (x, y) => say("으쌰!", x, y - 40));
gag(96, "에휴...", () => { say("에휴..."); wrapEl.animate([0, 1, 2, 3, 4].map(k => ({ transform: `translateX(${k === 4 ? 0 : (k % 2 ? -10 : 10)}px)` })), { duration: 400 }); });
gag(97, "손이 미끄러우세요?", () => toast("손이 미끄러우세요? 🧈 버터 드셨어요?"));
gag(98, "블록 시계", () => mk("🕐 현재 시각: 블록 할 시간", "cz czclock"));
gag(99, "싸이월드 일촌평", () => mk("<span>🌻 일촌평 ▶ 블록 짱 ㅋ (by 일촌) ★ 오늘도 블록하러 왔다 갑니다~ (by 지나가던행인) ★ 퍼가요~♡ (by 엄마) ★ 1촌 신청 받아주세요 ㅠ (by 블록왕) ★ 미니홈피 BGM 좋네요 (by ㅇㅇ)</span>", "cz czguest"));
gag(100, "가짜 저작권 표시", () => document.querySelector(".under").insertAdjacentHTML("beforeend", " | ⓒ 1999-2099 블록빵빵(주) All rights reversed"));

// 콘솔에서 czRun(42) 하면 해당 짜침 바로 실행
window.czRun = run;
// 추가 팩(chaos2.js 등)이 짜침을 더 넣을 수 있게 공개
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, k) => a + k);
const pools = { amb: range(1, 40), place: range(41, 60), clear: range(61, 75) };
window.CZ = {
  R, ri, pick, mk, say, sayAt, fly, htmlFx, fall, noise, busy, run, pools,
  gag(id, name, fn, pool) { gag(id, name, fn); if (pool) pools[pool].push(id); counter.querySelector("i").textContent = Object.keys(G).length; },
  found: () => [...found].sort((a, b) => a - b).map(id => `#${id} ${G[id].name}`),
};

// =================== 연결 ===================
// 처음부터 깔려 있는 것들
[91, 98, 99, 100].forEach(id => run(id));

// 랜덤 이벤트 (5초마다)
setInterval(() => { if (!busy() && !document.hidden) run(pick(pools.amb)); }, 5000);

// 블록 놓을 때
const _place = place;
place = function (i, p, r, c) {
  _place(i, p, r, c);
  if (Math.random() < .4) run(pick(pools.place), r * N + c, p);
};
// 줄 지울 때 (두 개씩)
const _celebrate = celebrate;
celebrate = function (lines, idxs) {
  _celebrate(lines, idxs);
  run(pick(pools.clear), lines);
  setTimeout(() => run(pick(pools.clear), lines), 700);
};
// 점수 구간
let prev = 0, hit = {};
const _setScore = setScore;
setScore = function (add) {
  if (score < prev) hit = {};
  _setScore(add);
  prev = score;
  [[50, 86], [100, 87], [200, 88]].forEach(([s, id]) => { if (score >= s && !hit[s]) { hit[s] = 1; setTimeout(() => run(id), 1200); } });
};
const _gameOver = gameOver;
gameOver = function () { _gameOver(); run(89); run(90); prev = 0; hit = {}; };
// 드래그 시작
const _startDrag = startDrag;
startDrag = function (e, i) { _startDrag(e, i); if (Math.random() < .3) run(95, e.clientX, e.clientY); };
// 못 놓고 떨어뜨렸을 때 (게임 쪽 pointerup 보다 먼저 확인)
let fails = 0;
addEventListener("pointerup", () => {
  if (!drag) return;
  if (drag.r === null) { fails++; run(96); if (fails >= 3) { run(97); fails = 0; } }
  else fails = 0;
}, true);

// 키보드
const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
let kpos = 0;
addEventListener("keydown", e => {
  kpos = e.key === KONAMI[kpos] ? kpos + 1 : (e.key === KONAMI[0] ? 1 : 0);
  if (kpos === KONAMI.length) { kpos = 0; run(92); return; }
  if (e.key === " ") { e.preventDefault(); run(77); }
  else if (e.key === "z" || e.key === "ㅋ") run(93);
  else if (Math.random() < .5) run(76, e.key);
});

// 클릭류
h1.style.cursor = "pointer";
h1.addEventListener("click", () => run(80));
scoreEl.addEventListener("click", () => run(81));
addEventListener("dblclick", e => run(82, e.clientX, e.clientY));
let lastWheel = 0;
addEventListener("wheel", () => { if (Date.now() - lastWheel > 3000) { lastWheel = Date.now(); run(94); } });
let lastResize = 0;
addEventListener("resize", () => { if (Date.now() - lastResize > 3000) { lastResize = Date.now(); run(84); } });

// 마우스 미친듯이 흔들기
let dist = 0, lx = 0, ly = 0, lastDizzy = 0;
addEventListener("mousemove", e => { dist += Math.abs(e.clientX - lx) + Math.abs(e.clientY - ly); lx = e.clientX; ly = e.clientY; });
setInterval(() => { if (dist > 4000 && Date.now() - lastDizzy > 4000) { lastDizzy = Date.now(); run(83); } dist = 0; }, 500);

// 탭 나갔다 오기
let savedTitle;
document.addEventListener("visibilitychange", () => {
  if (document.hidden) { savedTitle = tt; tt = "돌아와요 ㅠㅠ 블록이 기다려요 ㅠㅠ ★ "; }
  else { if (savedTitle) tt = savedTitle; run(85); }
});

// 가만히 있으면
let lastAct = Date.now(), idle1 = false, idle2 = false;
const act = () => { lastAct = Date.now(); idle1 = idle2 = false; };
["pointerdown", "pointermove", "keydown"].forEach(ev => addEventListener(ev, act));
setInterval(() => {
  if (busy()) return;
  const t = Date.now() - lastAct;
  if (t > 10000 && !idle1) { idle1 = true; run(78); }
  if (t > 25000 && !idle2) { idle2 = true; run(79); }
}, 1000);
})();
