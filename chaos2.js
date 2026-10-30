// =====================================================================
//  짜침 100종 추가팩 (101~200)
//  101~145: 랜덤 / 146~165: 블록 놓을 때 / 166~180: 줄 지울 때 / 181~200: 특정 행동
//  chaos.js 의 window.CZ 위에 얹혀서 돌아감
// =====================================================================
(() => {
const { R, ri, pick, mk, say, sayAt, fly, htmlFx, fall, noise, run } = CZ;
const gag = CZ.gag;
const wrapEl = document.getElementById("wrap");

document.head.insertAdjacentHTML("beforeend", `<style>
html.czsepia { filter: sepia(1) contrast(1.2); }
html.czneg { filter: invert(1); }
html.czsmall { transform: scale(.7); }
html.cztilt { transform: perspective(800px) rotateX(25deg); }
html.czmelt { animation: czmelt 1.5s ease-in-out; }
@keyframes czmelt { 25% { transform: skewX(15deg) scaleY(.9); } 50% { transform: skewX(-15deg) scaleY(1.1); } 75% { transform: skewY(8deg); } }
.czrec { top: 82px; right: 4px; z-index: 41; color: #f00; background: #000; font: bold 13px "Courier New", monospace; padding: 2px 6px; animation: blink .8s steps(2) infinite; }
.czcall { inset: 0; z-index: 260; background: linear-gradient(#1a2a6c, #b21f1f); color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; font-family: sans-serif; font-size: 22px; pointer-events: auto; }
.czcall .av { font-size: 90px; animation: wobble .4s infinite; }
.czcall .bt { display: flex; gap: 40px; font-size: 44px; }
.czcrack { inset: 0; z-index: 118; background:
  linear-gradient(35deg, transparent 49.6%, #fffc 50%, transparent 50.4%),
  linear-gradient(-60deg, transparent 49.7%, #fffa 50%, transparent 50.3%),
  linear-gradient(80deg, transparent 49.8%, #fff9 50%, transparent 50.2%); }
.czletter::before, .czletter::after { content: ""; position: fixed; left: 0; right: 0; height: 14vh; background: #000; z-index: 150; }
.czletter::before { top: 0; } .czletter::after { bottom: 0; }
.czcap { left: 0; right: 0; bottom: 4vh; text-align: center; color: #fff; font: italic 22px serif; z-index: 151; }
.czcredits { left: 0; right: 0; top: 100vh; text-align: center; color: #fff; font-size: 20px; z-index: 152; text-shadow: 2px 2px 0 #000; white-space: pre; line-height: 1.6; }
.czach { left: 50%; bottom: 20px; transform: translateX(-50%); background: #222; color: #fff; border-radius: 30px; padding: 8px 18px 8px 8px; display: flex; align-items: center; gap: 10px; font-family: sans-serif; z-index: 140; animation: cznotif2 3s ease forwards; }
.czach b { background: #fc0; color: #000; border-radius: 50%; width: 36px; height: 36px; display: grid; place-items: center; font-size: 20px; }
@keyframes cznotif2 { 0% { bottom: -80px; } 15%, 85% { bottom: 20px; } 100% { bottom: -80px; } }
.czcursor { font-size: 28px; z-index: 130; transition: left .6s, top .6s; }
.czdex { left: 50%; top: 50%; transform: translate(-50%, -50%); z-index: 265; width: min(340px, 92vw); max-height: 70vh; overflow: auto; pointer-events: auto; white-space: normal; font-size: 13px; }
.czdex .body { text-align: left; }
</style>`);

// 대화상자 하나 띄우기 (.ad 스타일 재활용)
function dialog(title, html, ms = 0, extra = "") {
  const d = mk(`<div class="bar"><span>${title}</span><span class="x">✕</span></div><div class="body">${html}</div>`, "ad " + extra, ms,
    extra ? {} : { left: R(4, 40) + "vw", top: R(15, 45) + "vh" });
  d.querySelector(".x").addEventListener("click", () => d.remove());
  d.querySelectorAll("button").forEach(b => b.addEventListener("click", () => d.remove()));
  return d;
}
function achieve(t) { mk(`<b>🏅</b><div><small>업적 달성!</small><br>${t}</div>`, "cz czach", 3000); beep(1046, .1, "sine"); setTimeout(() => beep(1568, .3, "sine"), 120); }
function animal(emoji, sound, y = 86) { fly(emoji, { y, dur: 5000, size: 44, dir: Math.random() < .5 ? 1 : -1 }); setTimeout(() => say(sound), 1200); }

// =================== 101~145: 랜덤 ===================
gag(101, "고래 출몰", () => { fly("🐋", { y: 70, size: 80, dur: 6000 }); beep(90, 1.2, "sine", .15); setTimeout(() => say("뿌우우~"), 1500); }, "amb");
gag(102, "로켓 발사", () => {
  const d = mk("🚀", "cz", 0, { left: R(10, 85) + "vw", top: "100vh", fontSize: "50px" });
  d.animate([{ transform: "translateY(0) rotate(-45deg)" }, { transform: `translateY(-${innerHeight + 150}px) rotate(-45deg)` }], { duration: 1800, easing: "ease-in" }).onfinish = () => d.remove();
  noise(1.6, .15, 600); say("3, 2, 1... 발사!!");
}, "amb");
gag(103, "토네이도", () => { fly("🌪️", { size: 70, dur: 3000, y: 40 }); wrapEl.animate([{ transform: "rotate(0)" }, { transform: "rotate(25deg)" }, { transform: "rotate(-25deg)" }, { transform: "rotate(0)" }], { duration: 2000 }); noise(2.5, .1, 500); }, "amb");
gag(104, "상어 지느러미", () => { fly("🦈", { y: 90, size: 40, dur: 6000, dir: -1 }); [330, 349, 330, 349, 330, 349].forEach((f, k) => setTimeout(() => beep(f, .25, "sawtooth", .06), k * 300)); }, "amb");
gag(105, "기차 지나감", () => { fly("🚂🚃🚃🚃🚃", { y: 88, size: 36, dur: 6000 }); for (let k = 0; k < 10; k++) setTimeout(() => noise(.1, .15, 900), k * 250); setTimeout(() => say("칙칙폭폭~"), 1000); }, "amb");
gag(106, "산타 썰매", () => { fly("🦌🦌🛷🎅", { y: 12, size: 36, dur: 6000, dir: -1 }); setTimeout(() => say("호호호 메리 블록마스!"), 1500); }, "amb");
gag(107, "마녀 비행", () => { fly("🧙‍♀️🧹", { y: 25, size: 44, dur: 4000 }); setTimeout(() => say("이히히히~"), 1000); }, "amb");
gag(108, "헬리콥터", () => { fly("🚁", { y: 15, size: 50, dur: 5000, dir: -1 }); for (let k = 0; k < 20; k++) setTimeout(() => noise(.06, .2, 300), k * 120); }, "amb");
gag(109, "거북이 산책", () => fly("🐢", { y: 92, size: 30, dur: 20000, dir: -1 }), "amb");
gag(110, "토끼 깡총", () => {
  const d = mk("🐇", "cz", 0, { left: "0", top: "84vh", fontSize: "40px" });
  const w = innerWidth;
  d.animate(Array.from({ length: 13 }, (_, k) => ({ transform: `translate(${k / 12 * w}px, ${k % 2 ? -60 : 0}px)` })), { duration: 3500 }).onfinish = () => d.remove();
}, "amb");
gag(111, "닭 꼬끼오", () => { animal("🐓", "꼬끼오~!!"); [800, 1000, 1200, 900].forEach((f, k) => setTimeout(() => beep(f, .2, "sawtooth", .05), k * 150)); }, "amb");
gag(112, "돼지 꿀꿀", () => { animal("🐖", "꿀꿀"); noise(.2, .2, 300); setTimeout(() => noise(.2, .2, 300), 300); }, "amb");
gag(113, "강아지 멍멍", () => { animal("🐕", "멍멍!"); beep(400, .1, "square"); setTimeout(() => beep(400, .1, "square"), 200); }, "amb");
gag(114, "소 음메", () => { animal("🐄", "음메~"); beep(150, .8, "sawtooth", .06); }, "amb");
gag(115, "개구리 점프", () => {
  const d = mk("🐸", "cz", 0, { left: R(10, 80) + "vw", top: "85vh", fontSize: "40px" });
  d.animate([{ transform: "translateY(0)" }, { transform: "translateY(-200px) rotate(360deg)" }, { transform: "translateY(0) rotate(720deg)" }], { duration: 1000 }).onfinish = () => d.remove();
  say("개굴!");
}, "amb");
gag(116, "유니콘 질주", () => { fly("🦄🌈🌈🌈", { y: R(20, 60), size: 40, dur: 2500, dir: -1 }); }, "amb");
gag(117, "해적선 출항", () => { fly("🏴‍☠️⛵", { y: 80, size: 50, dur: 7000 }); setTimeout(() => say("요호호~"), 2000); }, "amb");
gag(118, "외계인 침공", () => { for (let k = 0; k < 5; k++) setTimeout(() => fly("👾", { y: 8 + k * 6, size: 34, dur: 4000, dir: k % 2 ? 1 : -1 }), k * 200); for (let k = 0; k < 8; k++) setTimeout(() => beep(k % 2 ? 100 : 80, .1, "square", .08), k * 250); }, "amb");
gag(119, "좀비 출현", () => { fly("🧟", { y: 80, size: 50, dur: 14000, dir: -1 }); setTimeout(() => say("브레인... 아니 블록..."), 2000); }, "amb");
gag(120, "닌자 순간이동", () => { for (let k = 0; k < 4; k++) setTimeout(() => { mk("🥷", "cz", 400, { left: R(5, 85) + "vw", top: R(15, 75) + "vh", fontSize: "50px" }); noise(.08, .2, 4000); }, k * 450); }, "amb");
gag(121, "우주비행사 둥둥", () => mk("🧑‍🚀", "cz czghost", 5000, { left: R(10, 70) + "vw", top: R(15, 50) + "vh", fontSize: "60px" }), "amb");
gag(122, "토스트 튀어오름", () => {
  const d = mk("🍞", "cz", 0, { left: R(10, 85) + "vw", top: "100vh", fontSize: "50px" });
  d.animate([{ transform: "translateY(0)" }, { transform: `translateY(-${innerHeight * .6}px) rotate(540deg)` }, { transform: "translateY(0) rotate(1080deg)" }], { duration: 1500, easing: "ease-in-out" }).onfinish = () => d.remove();
  beep(2000, .05); say("띵!");
}, "amb");
gag(123, "팝콘 터짐", () => { for (let k = 0; k < 15; k++) setTimeout(() => { say("🍿", R(.1, .9) * innerWidth, R(.2, .8) * innerHeight); noise(.03, .3, 3000); }, k * 90); }, "amb");
gag(124, "비눗방울", () => {
  for (let k = 0; k < 10; k++) setTimeout(() => {
    const d = mk("🫧", "cz", 0, { left: R(0, 95) + "vw", top: "100vh", fontSize: R(20, 50) + "px" });
    d.animate([{ transform: "translateY(0)" }, { transform: `translate(${R(-80, 80)}px, -${innerHeight + 100}px)` }], { duration: R(3000, 6000) }).onfinish = () => d.remove();
  }, k * 200);
}, "amb");
gag(125, "낙엽 떨어짐", () => fall(["🍂", "🍁"], 25, 100), "amb");
gag(126, "벚꽃 엔딩", () => fall("🌸", 35, 80), "amb");
gag(127, "돈다발 날아감", () => fly("💸💸💸💸", { y: R(10, 70), dur: 2500, size: 34 }), "amb");
gag(128, "해골 덜덜", () => { const d = mk("💀", "cz", 2000, { left: R(10, 80) + "vw", top: R(20, 70) + "vh", fontSize: "60px", animation: "sad .1s infinite" }); for (let k = 0; k < 10; k++) setTimeout(() => beep(R(1000, 1500), .03), k * 100); }, "amb");
gag(129, "수상한 문", () => { const d = mk("🚪<br><span style='font-size:14px;background:#ff0;color:#f00'>들어오지 마시오</span>", "cz", 3000, { right: "10px", top: "40vh", fontSize: "60px", textAlign: "center" }); }, "amb");
gag(130, "정품 인증 필요", () => dialog("블록빵빵 정품 인증", "이 블록빵빵은 <b>정품이 아닐 수 있습니다</b>지금 인증하시겠습니까?<br><button class='ok'>나중에</button> <button class='ok'>나중에</button>", 5000), "amb");
gag(131, "블록 바이러스 검사", () => {
  const d = dialog("V3 블록백신 (가짜)", "검사 중... <b>0%</b>", 4000);
  const b = d.querySelector("b"); let v = 0;
  const t = setInterval(() => { v += ri(5, 30); b.textContent = Math.min(v, 100) + "%"; if (v >= 100) { clearInterval(t); b.textContent = "😎 블록 1개 발견 (정상)"; } }, 300);
}, "amb");
gag(132, "와이파이 끊김", () => toast("📶❌ 와이파이가 끊겼습니다 (근데 이 게임 인터넷 안 씀)"), "amb");
gag(133, "배터리 1%", () => mk("🪫 배터리 1% 남음<br><small>충전기를 연결하세요 (아님)</small>", "cz cznotif", 3000), "amb");
gag(134, "마스코트 빵빵이", () => { const d = mk("🍞😎", "cz", 3000, { left: "-10px", top: "50vh", fontSize: "60px" }); d.animate([{ transform: "translateX(-100px)" }, { transform: "translateX(20px)", offset: .2 }, { transform: "translateX(20px)", offset: .8 }, { transform: "translateX(-100px)" }], { duration: 3000 }); setTimeout(() => say("안녕! 난 공식 마스코트 빵빵이야!", 120, innerHeight / 2), 600); }, "amb");
gag(135, "화면 눕기", () => htmlFx("cztilt", 2000), "amb");
gag(136, "화면 흐물흐물", () => htmlFx("czmelt", 1500), "amb");
gag(137, "화면 쪼그라듦", () => { htmlFx("czsmall", 1500); say("작아지는 중..."); }, "amb");
gag(138, "옛날 사진 모드", () => { htmlFx("czsepia", 2500); toast("📷 1987년 블록빵빵"); }, "amb");
gag(139, "네거티브 필름", () => htmlFx("czneg", 1200), "amb");
gag(140, "정말 종료? 예/예", () => dialog("확인", "정말 블록빵빵을 종료하시겠습니까?<br><button class='ok'>예</button> <button class='ok'>예</button>", 5000), "amb");
gag(141, "REC 녹화중", () => mk("🔴 REC 00:00:0" + ri(0, 9), "cz czrec", 4000), "amb");
gag(142, "블록 상담원 전화", () => {
  const d = mk(`<div class="av">📞</div><div>블록빵빵 고객센터</div><small>상담원 연결 중...</small><div class="bt"><span>🔴</span><span>🟢</span></div><small>(아무 데나 눌러서 거절)</small>`, "cz czcall");
  const t = setInterval(() => beep(880, .15, "sine"), 400);
  const end = () => { clearInterval(t); d.remove(); toast("📞 부재중 전화 1통 (블록빵빵)"); };
  d.addEventListener("pointerdown", e => { e.stopPropagation(); end(); });
  setTimeout(() => { if (d.isConnected) end(); }, 2500);
}, "amb");
gag(143, "가짜 커서 침입", () => {
  const d = mk("👆", "cz czcursor", 4000, { left: "50vw", top: "50vh" });
  for (let k = 0; k < 6; k++) setTimeout(() => { d.style.left = R(10, 90) + "vw"; d.style.top = R(10, 90) + "vh"; }, k * 600);
  setTimeout(() => say("??? 이거 누구 커서임"), 800);
}, "amb");
gag(144, "액정 깨짐", () => { mk("", "cz czcrack", 1800); noise(.3, .3, 5000); toast("💥 액정이 깨졌습니다 (구라)"); }, "amb");
gag(145, "블록 명언", () => toast("📜 " + pick([
  "블록은 놓는 것이 아니라 놓아주는 것이다",
  "줄은 지워져도 추억은 지워지지 않는다",
  "1x1 블록을 무시하는 자, 1x1 블록에 운다",
  "인생은 블록빵빵, 빵빵은 인생",
  "오늘 놓을 블록을 내일로 미루지 마라",
]) + " - 블록빵빵"), "amb");

// =================== 146~165: 블록 놓을 때 ===================
gag(146, "착!", idx => sayAt(idx, "착!"), "place");
gag(147, "반짝 별", idx => sayAt(idx, "⭐✨⭐"), "place");
gag(148, "다른 칸 몰래 색칠", () => { const on = board.map((c, i) => c ? i : -1).filter(i => i >= 0); if (on.length) { board[pick(on)] = pick(COLORS); renderBoard(); } say("(뭔가 바뀐 것 같은데...)"); }, "place");
gag(149, "ㄴㅇㅅ", idx => sayAt(idx, "ㄴㅇㅅ"), "place");
gag(150, "그걸 거기에?", idx => sayAt(idx, "그걸 거기에...?"), "place");
gag(151, "블록 무게 측정", (idx, p) => sayAt(idx, `⚖ ${(p.shape.length * R(.8, 1.5)).toFixed(1)}kg`), "place");
gag(152, "좌표 등기 완료", idx => toast(`📜 좌표 (${Math.floor(idx / N)}, ${idx % N}) 등기 완료`), "place");
gag(153, "부동산 시세 폭등", () => toast("🏠 이 동네 블록 시세 +" + ri(1, 9) + "억"), "place");
gag(154, "피아노 음계", () => [262, 294, 330, 349, 392, 440, 494, 523].forEach((f, k) => setTimeout(() => beep(f, .1, "triangle", .06), k * 60)), "place");
gag(155, "명중!", idx => sayAt(idx, "🎯 명중!"), "place");
gag(156, "블록 거부 (구라)", () => toast("⚠ 알 수 없는 힘이 블록을 거부합니다 (그냥 놓임)"), "place");
gag(157, "무지개 판", () => boardEl.animate([{ filter: "hue-rotate(0)" }, { filter: "hue-rotate(360deg)" }], { duration: 800 }), "place");
gag(158, "Ctrl+Z 안 됨", () => toast("되돌리기(Ctrl+Z)는 유료 기능입니다 ^^"), "place");
gag(159, "누가 보고 있음", idx => { sayAt(idx, "👀"); setTimeout(() => say("👀"), 300); }, "place");
gag(160, "놓았다! 놓았어!", idx => sayAt(idx, "놓았다!! 놓았어!!"), "place");
gag(161, "판 점프", () => wrapEl.animate([{ transform: "translateY(0)" }, { transform: "translateY(-30px)" }, { transform: "translateY(0)" }], { duration: 300, easing: "ease-out" }), "place");
gag(162, "띠링", () => { beep(1568, .08, "sine"); setTimeout(() => beep(2093, .2, "sine"), 90); }, "place");
gag(163, "블록 입주", idx => sayAt(idx, "🏠 입주 완료"), "place");
gag(164, "추가 요금 0원", () => toast("💳 추가 요금 0원이 청구되었습니다"), "place");
gag(165, "영원히 기억될 블록", () => toast("🕯 이 블록은 영원히 기억될 것입니다"), "place");

// =================== 166~180: 줄 지울 때 ===================
gag(166, "묵념", () => toast("🙏 사라진 블록들에게 묵념..."), "clear");
gag(167, "판 회오리", () => wrapEl.animate([{ transform: "rotate(0) scale(1)" }, { transform: "rotate(720deg) scale(.6)" }, { transform: "rotate(720deg) scale(1)" }], { duration: 900 }), "clear");
gag(168, "가짜 업적", n => achieve(pick(["줄 지우기 초보", "블록 청소부", "손가락 장인", `${n}줄의 기적`, "아무튼 대단함"])), "clear");
gag(169, "영화 모드", () => {
  document.documentElement.classList.add("czletter");
  mk("그리고 그는... 줄을 지웠다.", "cz czcap", 2500);
  setTimeout(() => document.documentElement.classList.remove("czletter"), 2500);
}, "clear");
gag(170, "ㅋ 파도", () => { for (let k = 0; k < 12; k++) setTimeout(() => say("ㅋ", k / 12 * innerWidth, innerHeight / 2 + Math.sin(k) * 80), k * 60); }, "clear");
gag(171, "SUPER ULTRA HYPER", () => ["SUPER", "ULTRA", "HYPER", "MEGA"].forEach((t, k) => setTimeout(() => popText(t), k * 300)), "clear");
gag(172, "별 뿌리기", () => { for (let k = 0; k < 20; k++) say("⭐", R(0, innerWidth), R(0, innerHeight)); }, "clear");
gag(173, "노래방 100점", () => { popText("🎤 100점!!"); [523, 523, 523, 659, 784].forEach((f, k) => setTimeout(() => beep(f, .2, "square", .06), k * 150)); }, "clear");
gag(174, "비 온 뒤 무지개", () => { fall("💧", 25, 40); setTimeout(() => mk("🌈", "cz czrain", 3000, { top: "15vh", left: "30vw", fontSize: "140px" }), 1200); }, "clear");
gag(175, "과속 단속", () => { fly("🚓", { y: 86, dur: 2000 }); toast("🚨 과속 단속: 줄 지우는 속도 위반"); }, "clear");
gag(176, "로또 당첨 (아님)", () => toast("🎰 로또 1등 당첨!!! ...의 꿈을 꿨습니다"), "clear");
gag(177, "판 깜빡깜빡", () => boardEl.animate([{ opacity: 1 }, { opacity: 0 }, { opacity: 1 }, { opacity: 0 }, { opacity: 1 }], { duration: 500 }), "clear");
gag(178, "케이크 등장", () => { const r = wrapEl.getBoundingClientRect(); say("🎂 축하해!!", r.left + r.width / 2, r.top + r.height / 2); }, "clear");
gag(179, "엔딩 크레딧", () => {
  const d = mk("감독: 블록빵빵\n주연: 당신\n조연: 😎 블록들\n특별출연: 💩\n제작: 블록빵빵(주)\n\n- 끝 -\n\n(아직 안 끝남)", "cz czcredits");
  d.animate([{ transform: "translateY(0)" }, { transform: `translateY(-${innerHeight + 400}px)` }], { duration: 5000 }).onfinish = () => d.remove();
}, "clear");
gag(180, "GG", () => popText("GG"), "clear");

// =================== 181~200: 특정 행동 ===================
gag(181, "엔터 쳐도 소용없음", () => toast("엔터 쳐도 아무 일 없어요"));
gag(182, "탈출 불가", () => toast("🔒 ESC: 탈출 불가"));
gag(183, "숫자 키", k => popText(k));
gag(184, "고정키 켜시겠습니까", () => dialog("고정 키", "Shift 키를 5번 누르셨습니다.<br>고정 키를 켜시겠습니까?<br><small>(블록빵빵은 고정 키를 지원하지 않습니다)</small><br><button class='ok'>예</button> <button class='ok'>아니요</button>", 6000));
gag(185, "우클릭 그만", () => toast("우클릭 그만 눌러;; 신고함"));
gag(186, "R 키", () => toast("🔄 새로고침 하지 마세요 점수 날아가요 (진짜임)"));
gag(187, "도움말", () => dialog("도움말", "<b>도움말</b>알아서 하세요 ^^<br><button class='ok'>네...</button>", 5000));
gag(188, "복사 금지", () => toast("© 복사 금지!! 블록빵빵 저작권 보호중"));
gag(189, "트리플클릭 장인", (x, y) => say("🔺 트리플클릭 장인", x, y));
gag(190, "휠 돌리다 빙글", () => { document.documentElement.animate([{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }], { duration: 800 }); toast("휠 그만 돌려요 어지러워요"); });
gag(191, "꼭대기 탐색", () => say("뭐 찾음? 위에 아무것도 없음", innerWidth / 2, 60));
gag(192, "비밀 구역 발견", () => { say("🗝 비밀 구역 발견!", innerWidth - 100, innerHeight - 60); achieve("구석 탐험가"); });
gag(193, "300점 국가대표", () => { popText("🇰🇷 블록 국가대표 🇰🇷"); fall(["🥇", "🎖"], 30); });
gag(194, "500점 명예의 전당", () => { popText("🏛 명예의 전당 입성"); achieve("전설의 블록러"); });
gag(195, "벌써요?", () => setTimeout(() => toast("네? 벌써 끝났어요? ㅋ"), 2500));
gag(196, "또 하네 ㅋ", () => toast("또 하네 ㅋㅋ 중독됐죠?"));
gag(197, "1분 경과", () => toast("⏰ 1분 경과... 물 한잔 하세요 💧"));
gag(198, "5분 경과", () => toast("⏰ 5분 경과... 엄마가 뒤에서 보고 있음 👀"));
gag(199, "가지 마요", () => say("가지 마요 ㅠㅠ", innerWidth / 2, 80));
gag(200, "도감 열어보기", () => {
  const list = CZ.found();
  dialog("📖 짜침 도감", `<b>${list.length}/${document.querySelector(".czcount i").textContent} 발견</b>${list.join("<br>")}<br><button class='ok'>닫기</button>`, 0, "czdex cz");
});

// =================== 연결 ===================
// 키보드
let shifts = 0;
addEventListener("keydown", e => {
  if (e.key === "Shift") { if (++shifts >= 5) { shifts = 0; run(184); } return; }
  shifts = 0;
  if (e.key === "Enter") run(181);
  else if (e.key === "Escape") run(182);
  else if (/^[0-9]$/.test(e.key)) run(183, e.key);
  else if (e.key === "r" || e.key === "ㄱ") run(186);
  else if (e.key === "h" || e.key === "ㅗ") run(187);
});
// 우클릭 3번
let rclicks = 0;
addEventListener("contextmenu", () => { if (++rclicks % 3 === 0) run(185); });
document.addEventListener("copy", () => run(188));
addEventListener("click", e => { if (e.detail === 3) run(189, e.clientX, e.clientY); });
// 휠 10번
let wheels = 0;
addEventListener("wheel", () => { if (++wheels % 10 === 0) run(190); });
// 마우스 위치
let lastTop = 0, lastCorner = 0;
addEventListener("mousemove", e => {
  const now = Date.now();
  if (e.clientY < 4 && now - lastTop > 5000) { lastTop = now; run(191); }
  if (e.clientX > innerWidth - 12 && e.clientY > innerHeight - 12 && now - lastCorner > 5000) { lastCorner = now; run(192); }
});
document.documentElement.addEventListener("mouseleave", e => { if (e.clientY <= 0) run(199); });
// 점수
let hit = {}, prev = 0;
const _setScore = setScore;
setScore = function (add) {
  if (score < prev) hit = {};
  _setScore(add);
  prev = score;
  [[300, 193], [500, 194]].forEach(([s, id]) => { if (score >= s && !hit[s]) { hit[s] = 1; setTimeout(() => run(id), 1500); } });
};
const _gameOver = gameOver;
gameOver = function () { _gameOver(); run(195); prev = 0; hit = {}; };
document.getElementById("again").addEventListener("click", () => setTimeout(() => run(196), 500));
// 플레이 시간
setTimeout(() => run(197), 60000);
setTimeout(() => run(198), 300000);
// 도감 카운터 누르면 목록
const counter = document.querySelector(".czcount");
counter.style.pointerEvents = "auto";
counter.style.cursor = "pointer";
counter.addEventListener("click", () => run(200));
})();
