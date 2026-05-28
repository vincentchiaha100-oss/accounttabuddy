import { useState, useEffect, useRef } from "react";

const GOALS = [
  { id: "fitness", emoji: "💪", label: "Fitness", desc: "Gym, running, weight loss" },
  { id: "coding", emoji: "💻", label: "Coding", desc: "Learning to build things" },
  { id: "business", emoji: "🚀", label: "Business", desc: "Starting or growing something" },
  { id: "studying", emoji: "📚", label: "Studying", desc: "Exams, courses, certs" },
  { id: "habits", emoji: "🌱", label: "Habits", desc: "Quit something or build routines" },
  { id: "writing", emoji: "✍️", label: "Writing", desc: "Books, blogs, scripts" },
];

const PARTNERS = [
  { id: 1, name: "Amara K.", flag: "🇬🇭", goal: "coding", streak: 14, bio: "Building my first SaaS. Need someone to hold me accountable daily!", av: "AK", online: true },
  { id: 2, name: "James T.", flag: "🇬🇧", goal: "fitness", streak: 31, bio: "Training for a half marathon. Let's crush our goals together.", av: "JT", online: true },
  { id: 3, name: "Sofia R.", flag: "🇧🇷", goal: "studying", streak: 7, bio: "IELTS prep. Studying 2hrs daily. Looking for a serious partner.", av: "SR", online: false },
  { id: 4, name: "David M.", flag: "🇿🇦", goal: "business", streak: 22, bio: "Building a dropshipping store. Daily check-ins only.", av: "DM", online: true },
  { id: 5, name: "Priya S.", flag: "🇮🇳", goal: "habits", streak: 5, bio: "Quitting social media scrolling. Need a real accountability buddy.", av: "PS", online: false },
  { id: 6, name: "Lucas F.", flag: "🇫🇷", goal: "writing", streak: 19, bio: "Writing my first novel. 500 words a day. Let's go.", av: "LF", online: true },
];

const avatarColors = ["#00e5a0", "#6c63ff", "#ff6b6b", "#ffd200", "#00b8d4", "#ff9f43"];

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [user, setUser] = useState({ name: "", goal: null, bio: "" });
  const [partner, setPartner] = useState(PARTNERS[0]);
  const [checkedIn, setCheckedIn] = useState(false);
  const [msgs, setMsgs] = useState([
    { from: "partner", text: "Hey! Did you get your workout in today? 💪", time: "9:02 AM" },
    { from: "me", text: "Not yet, heading to the gym in 30mins!", time: "9:15 AM" },
    { from: "partner", text: "Let's go! I just finished mine. 3rd day in a row 🔥", time: "9:16 AM" },
  ]);
  const [msgInput, setMsgInput] = useState("");
  const [filterGoal, setFilterGoal] = useState("all");
  const [showPremium, setShowPremium] = useState(false);
  const [step, setStep] = useState(1);
  const msgEndRef = useRef(null);

  useEffect(() => { msgEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);

  const sendMsg = () => {
    if (!msgInput.trim()) return;
    setMsgs(m => [...m, { from: "me", text: msgInput, time: "Now" }]);
    setMsgInput("");
    setTimeout(() => setMsgs(m => [...m, { from: "partner", text: "That's the spirit! Keep going 💯", time: "Now" }]), 1000);
  };

  const S = {
    page: { fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh", background: "#070710", color: "#fff", overflowX: "hidden" },
    nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 32px", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "sticky", top: 0, background: "rgba(7,7,16,0.9)", backdropFilter: "blur(20px)", zIndex: 50 },
    logo: { fontWeight: 800, fontSize: "1.3rem", letterSpacing: "-0.5px" },
    btnGreen: { background: "linear-gradient(135deg,#00e5a0,#00c9b8)", border: "none", color: "#070710", fontWeight: 700, fontFamily: "'Plus Jakarta Sans',sans-serif", cursor: "pointer", borderRadius: "12px", transition: "all 0.2s", fontSize: "1rem" },
    btnGhost: { background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", fontFamily: "'Plus Jakarta Sans',sans-serif", cursor: "pointer", borderRadius: "12px", transition: "all 0.2s", fontWeight: 600 },
    card: { background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "20px" },
    input: { width: "100%", padding: "14px 18px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff", fontSize: "1rem", fontFamily: "'Plus Jakarta Sans',sans-serif", outline: "none", boxSizing: "border-box" },
    navBtn: (active) => ({ cursor: "pointer", padding: "9px 16px", borderRadius: "10px", background: active ? "rgba(0,229,160,0.12)" : "transparent", color: active ? "#00e5a0" : "rgba(255,255,255,0.5)", fontWeight: 600, fontSize: "0.88rem", border: "none", fontFamily: "'Plus Jakarta Sans',sans-serif" }),
  };

  const Nav = ({ active }) => (
    <nav style={S.nav}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;600;700;800&display=swap" rel="stylesheet" />
      <div style={S.logo}>Accounta<span style={{ color: "#00e5a0" }}>Buddy</span></div>
      <div style={{ display: "flex", gap: 4 }}>
        {screen !== "landing" && <>
          <button style={S.navBtn(active === "dash")} onClick={() => setScreen("dashboard")}>Dashboard</button>
          <button style={S.navBtn(active === "msg")} onClick={() => setScreen("message")}>Messages</button>
          <button style={S.navBtn(active === "find")} onClick={() => setScreen("find")}>Find Partners</button>
        </>}
        {screen === "landing" && <button style={{ ...S.btnGhost, padding: "10px 22px" }} onClick={() => setScreen("find")}>Browse Partners</button>}
      </div>
      {screen !== "landing" ? (
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <button onClick={() => setShowPremium(true)} style={{ background: "linear-gradient(135deg,#f7971e,#ffd200)", border: "none", color: "#070710", padding: "8px 16px", borderRadius: "10px", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "0.82rem" }}>⭐ Go Premium</button>
          <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#00e5a0,#00c9b8)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#070710", fontSize: "0.85rem" }}>{user.name ? user.name[0].toUpperCase() : "U"}</div>
        </div>
      ) : (
        <button style={{ ...S.btnGreen, padding: "10px 22px" }} onClick={() => setScreen("onboard")}>Get Started →</button>
      )}
    </nav>
  );

  // ─── LANDING ───────────────────────────────────────────────
  if (screen === "landing") return (
    <div style={S.page}>
      <style>{`
        @keyframes floatUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:.3}50%{opacity:.7}}
        .ab-card:hover{border-color:rgba(0,229,160,.35)!important;transform:translateY(-3px)}
        .ab-card{transition:all .2s}
        .ab-btn:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,229,160,.35)}
        .ab-ghost:hover{background:rgba(255,255,255,.12)!important}
        .fade1{animation:floatUp .6s ease .1s both}
        .fade2{animation:floatUp .6s ease .25s both}
        .fade3{animation:floatUp .6s ease .4s both}
        .fade4{animation:floatUp .6s ease .55s both}
      `}</style>
      <Nav />

      {/* Blobs */}
      <div style={{ position: "fixed", width: 600, height: 600, borderRadius: "50%", background: "#00e5a0", filter: "blur(120px)", opacity: 0.07, top: -200, right: -200, pointerEvents: "none" }} />
      <div style={{ position: "fixed", width: 500, height: 500, borderRadius: "50%", background: "#6c63ff", filter: "blur(120px)", opacity: 0.07, bottom: -100, left: -100, pointerEvents: "none" }} />

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "90px 24px 70px", maxWidth: 780, margin: "0 auto" }}>
        <div className="fade1" style={{ display: "inline-block", background: "rgba(0,229,160,0.1)", border: "1px solid rgba(0,229,160,0.25)", borderRadius: 100, padding: "6px 20px", fontSize: "0.82rem", color: "#00e5a0", marginBottom: 28, letterSpacing: "0.5px" }}>
          🔥 2,400+ people holding each other accountable right now
        </div>
        <h1 className="fade2" style={{ fontSize: "clamp(2.8rem,7vw,5rem)", fontWeight: 800, lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 22 }}>
          Stop quitting.<br /><span style={{ color: "#00e5a0" }}>Find your person.</span>
        </h1>
        <p className="fade3" style={{ fontSize: "1.15rem", color: "rgba(255,255,255,.45)", maxWidth: 500, margin: "0 auto 44px", lineHeight: 1.75, fontWeight: 300 }}>
          Match with a stranger who shares your goal. Check in with each other every day. Build streaks. Actually follow through — together.
        </p>
        <div className="fade4" style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="ab-btn" onClick={() => setScreen("onboard")} style={{ ...S.btnGreen, padding: "17px 44px", fontSize: "1.05rem", borderRadius: 14 }}>
            Find My Accountability Partner →
          </button>
          <button className="ab-ghost" onClick={() => setScreen("find")} style={{ ...S.btnGhost, padding: "17px 32px", fontSize: "1rem" }}>
            See Who's Looking
          </button>
        </div>
      </div>

      {/* How it works */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 24px 60px" }}>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,.25)", fontSize: "0.8rem", letterSpacing: "2px", marginBottom: 28, textTransform: "uppercase" }}>How it works — 3 simple steps</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
          {[
            ["01", "Pick your goal 🎯", "Choose what you're working on — fitness, coding, business, studying, or habits."],
            ["02", "Get matched instantly ⚡", "We show you real people with the same goal. Pick one and partner up — no signup needed."],
            ["03", "Check in every day 🔥", "A simple yes or no each day. Did you do it? Your partner sees. No hiding. Build your streak."],
          ].map(([n, t, d]) => (
            <div key={n} className="ab-card" style={{ ...S.card, padding: 26 }}>
              <div style={{ color: "#00e5a0", fontSize: "0.75rem", letterSpacing: "1px", marginBottom: 12, fontWeight: 700 }}>{n}</div>
              <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: 10 }}>{t}</div>
              <div style={{ color: "rgba(255,255,255,.4)", fontSize: "0.88rem", lineHeight: 1.65 }}>{d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, justifyContent: "center", padding: "0 24px 80px", flexWrap: "wrap" }}>
        {[["2,400+", "Active pairs"], ["87%", "Completion rate"], ["41 days", "Avg streak"], ["Free", "Always free"]].map(([v, l]) => (
          <div key={l} style={{ ...S.card, padding: "24px 36px", textAlign: "center" }}>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "#00e5a0" }}>{v}</div>
            <div style={{ color: "rgba(255,255,255,.35)", fontSize: "0.85rem", marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign: "center", padding: "50px 24px 60px", borderTop: "1px solid rgba(255,255,255,.05)", background: "rgba(0,229,160,.04)" }}>
        <h2 style={{ fontSize: "1.9rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: 12 }}>Your goals won't wait.</h2>
        <p style={{ color: "rgba(255,255,255,.35)", marginBottom: 28, fontSize: "0.95rem" }}>Join thousands of people holding each other accountable every single day.</p>
        <button className="ab-btn" onClick={() => setScreen("onboard")} style={{ ...S.btnGreen, padding: "15px 44px", fontSize: "1rem", borderRadius: 14 }}>Start Free — Takes 30 seconds →</button>
      </div>
    </div>
  );

  // ─── ONBOARDING ────────────────────────────────────────────
  if (screen === "onboard") return (
    <div style={S.page}>
      <style>{`.goal-opt:hover{border-color:#00e5a0!important;transform:translateY(-2px)} .goal-opt{transition:all .2s;cursor:pointer} .ab-btn:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,229,160,.35)}`}</style>
      <Nav />
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "48px 24px" }}>
        <div style={{ background: "rgba(0,229,160,.08)", border: "1px solid rgba(0,229,160,.2)", borderRadius: 100, padding: "6px 18px", display: "inline-block", fontSize: "0.8rem", color: "#00e5a0", marginBottom: 32, letterSpacing: "0.5px" }}>
          Step {step} of 2
        </div>

        {step === 1 && <>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: 6 }}>What's your name?</h2>
          <p style={{ color: "rgba(255,255,255,.4)", marginBottom: 28, fontWeight: 300 }}>Your accountability partner will see this</p>
          <input style={S.input} placeholder="Your first name..." value={user.name} onChange={e => setUser(u => ({ ...u, name: e.target.value }))} />
          <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-1px", margin: "32px 0 6px" }}>What's your goal?</h2>
          <p style={{ color: "rgba(255,255,255,.4)", marginBottom: 24, fontWeight: 300 }}>We'll match you with someone working on the same thing</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 32 }}>
            {GOALS.map(g => (
              <div key={g.id} className="goal-opt" onClick={() => setUser(u => ({ ...u, goal: g.id }))}
                style={{ padding: "18px 16px", background: user.goal === g.id ? "rgba(0,229,160,.12)" : "rgba(255,255,255,.04)", border: `1px solid ${user.goal === g.id ? "#00e5a0" : "rgba(255,255,255,.08)"}`, borderRadius: 14 }}>
                <div style={{ fontSize: "1.5rem", marginBottom: 6 }}>{g.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{g.label}</div>
                <div style={{ color: "rgba(255,255,255,.35)", fontSize: "0.78rem", marginTop: 3 }}>{g.desc}</div>
              </div>
            ))}
          </div>
          <button className="ab-btn" onClick={() => user.name && user.goal && setStep(2)}
            style={{ ...S.btnGreen, width: "100%", padding: 16, fontSize: "1rem", opacity: user.name && user.goal ? 1 : 0.4 }}>
            Continue →
          </button>
        </>}

        {step === 2 && <>
          <h2 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-1px", marginBottom: 6 }}>Almost there, {user.name}! 🎉</h2>
          <p style={{ color: "rgba(255,255,255,.4)", marginBottom: 28, fontWeight: 300 }}>Tell your future partner what you're working on</p>
          <textarea style={{ ...S.input, resize: "none", marginBottom: 28 }} rows={4}
            placeholder={`e.g. I'm trying to go to the gym 4x a week. I need someone to check on me daily...`}
            value={user.bio} onChange={e => setUser(u => ({ ...u, bio: e.target.value }))} />
          <button className="ab-btn" onClick={() => { setPartner(PARTNERS.find(p => p.goal === user.goal) || PARTNERS[0]); setScreen("find"); }}
            style={{ ...S.btnGreen, width: "100%", padding: 16, fontSize: "1rem" }}>
            Show Me My Matches →
          </button>
          <button onClick={() => setStep(1)} style={{ ...S.btnGhost, width: "100%", padding: 14, marginTop: 12, fontSize: "0.95rem" }}>← Back</button>
        </>}
      </div>
    </div>
  );

  // ─── FIND PARTNERS ─────────────────────────────────────────
  if (screen === "find") return (
    <div style={S.page}>
      <style>{`.pc:hover{border-color:rgba(0,229,160,.3)!important;transform:translateY(-3px)} .pc{transition:all .2s} .ab-btn:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,229,160,.3)} .fb:hover{background:rgba(0,229,160,.12)!important;color:#00e5a0!important;border-color:#00e5a0!important}`}</style>
      <Nav active="find" />
      <div style={{ maxWidth: 960, margin: "0 auto", padding: "36px 24px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 6 }}>Find a Partner</h1>
        <p style={{ color: "rgba(255,255,255,.4)", marginBottom: 28, fontWeight: 300 }}>Real people looking for accountability right now 👇</p>

        {/* Filters */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {[["all", "All Goals"], ...GOALS.map(g => [g.id, g.emoji + " " + g.label])].map(([id, label]) => (
            <button key={id} className="fb" onClick={() => setFilterGoal(id)}
              style={{ padding: "8px 18px", borderRadius: 10, border: `1px solid ${filterGoal === id ? "#00e5a0" : "rgba(255,255,255,.1)"}`, background: filterGoal === id ? "rgba(0,229,160,.12)" : "rgba(255,255,255,.05)", color: filterGoal === id ? "#00e5a0" : "rgba(255,255,255,.5)", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 600, fontSize: "0.85rem", transition: "all .2s" }}>
              {label}
            </button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
          {PARTNERS.filter(p => filterGoal === "all" || p.goal === filterGoal).map((p, i) => (
            <div key={p.id} className="pc" style={{ ...S.card, padding: 22 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ position: "relative" }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", background: avatarColors[i % avatarColors.length], display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#070710", fontSize: "0.88rem" }}>{p.av}</div>
                    {p.online && <div style={{ position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: "50%", background: "#00e5a0", border: "2px solid #070710" }} />}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.98rem" }}>{p.name}</div>
                    <div style={{ color: "rgba(255,255,255,.4)", fontSize: "0.78rem" }}>{p.flag} · {p.online ? <span style={{ color: "#00e5a0" }}>Online now</span> : "Offline"}</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontWeight: 800, color: "#00e5a0", fontSize: "1.3rem" }}>{p.streak}</div>
                  <div style={{ color: "rgba(255,255,255,.3)", fontSize: "0.7rem" }}>day streak 🔥</div>
                </div>
              </div>
              <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 10, padding: "10px 12px", fontSize: "0.84rem", color: "rgba(255,255,255,.5)", marginBottom: 16, lineHeight: 1.55 }}>"{p.bio}"</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                <span style={{ background: "rgba(0,229,160,.1)", border: "1px solid rgba(0,229,160,.2)", borderRadius: 6, padding: "3px 10px", fontSize: "0.75rem", color: "#00e5a0", fontWeight: 600 }}>
                  {GOALS.find(g => g.id === p.goal)?.emoji} {GOALS.find(g => g.id === p.goal)?.label}
                </span>
              </div>
              <button className="ab-btn" onClick={() => { setPartner(p); setScreen("dashboard"); }}
                style={{ ...S.btnGreen, width: "100%", padding: "11px", fontSize: "0.9rem" }}>
                Partner Up →
              </button>
            </div>
          ))}
        </div>

        {!user.name && (
          <div style={{ textAlign: "center", marginTop: 48, padding: "36px", ...S.card, borderColor: "rgba(0,229,160,.2)" }}>
            <div style={{ fontSize: "1.5rem", marginBottom: 10 }}>👋</div>
            <h3 style={{ fontWeight: 800, marginBottom: 8 }}>Want someone to partner with you?</h3>
            <p style={{ color: "rgba(255,255,255,.4)", marginBottom: 20, fontSize: "0.9rem" }}>Create your profile in 30 seconds — no email or password needed!</p>
            <button className="ab-btn" onClick={() => setScreen("onboard")} style={{ ...S.btnGreen, padding: "13px 36px", fontSize: "0.95rem" }}>Create My Profile →</button>
          </div>
        )}
      </div>
    </div>
  );

  // ─── DASHBOARD ─────────────────────────────────────────────
  if (screen === "dashboard") return (
    <div style={S.page}>
      <style>{`.ab-btn:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(0,229,160,.3)} .checkin-yes:hover{background:rgba(0,229,160,.2)!important} .checkin-no:hover{background:rgba(255,100,100,.2)!important}`}</style>
      <Nav active="dash" />

      {showPremium && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 24 }}>
          <div style={{ background: "#12121e", border: "1px solid rgba(247,151,30,.3)", borderRadius: 24, padding: 40, maxWidth: 420, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 12 }}>⭐</div>
            <h2 style={{ fontWeight: 800, fontSize: "1.7rem", letterSpacing: "-0.5px", marginBottom: 6 }}>Go Premium</h2>
            <p style={{ color: "rgba(255,255,255,.4)", marginBottom: 28, fontSize: "0.9rem" }}>Unlock the full AccountaBuddy experience</p>
            {[["2 accountability partners", "Double your support network"], ["Partner history", "See all past partners"], ["Ad-free", "Pure focus"], ["Priority matching", "Match in minutes"]].map(([f, d]) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14, textAlign: "left" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: "rgba(247,151,30,.15)", border: "1px solid rgba(247,151,30,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", flexShrink: 0 }}>✓</div>
                <div><div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{f}</div><div style={{ color: "rgba(255,255,255,.3)", fontSize: "0.78rem" }}>{d}</div></div>
              </div>
            ))}
            <button style={{ width: "100%", padding: 15, background: "linear-gradient(135deg,#f7971e,#ffd200)", border: "none", color: "#070710", fontWeight: 800, borderRadius: 14, fontSize: "1rem", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", marginTop: 20, marginBottom: 10 }}>
              Upgrade — $5/month
            </button>
            <button onClick={() => setShowPremium(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.3)", cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>Maybe later</button>
          </div>
        </div>
      )}

      <div style={{ maxWidth: 880, margin: "0 auto", padding: "32px 24px" }}>
        <h1 style={{ fontSize: "1.7rem", fontWeight: 800, letterSpacing: "-0.5px", marginBottom: 4 }}>
          Hey {user.name || "there"} 👋
        </h1>
        <p style={{ color: "rgba(255,255,255,.4)", marginBottom: 28, fontWeight: 300 }}>
          Your partner is waiting for your check-in today.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, marginBottom: 18 }}>
          {/* Partner */}
          <div style={{ ...S.card, padding: 26 }}>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,.3)", letterSpacing: "1.5px", marginBottom: 16, textTransform: "uppercase" }}>Your Partner</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg,#6c63ff,#00b8d4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.9rem" }}>{partner.av}</div>
                <div style={{ position: "absolute", bottom: 1, right: 1, width: 12, height: 12, borderRadius: "50%", background: "#00e5a0", border: "2px solid #070710" }} />
              </div>
              <div>
                <div style={{ fontWeight: 700 }}>{partner.name}</div>
                <div style={{ color: "rgba(255,255,255,.4)", fontSize: "0.8rem" }}>{partner.flag} · Online now</div>
              </div>
            </div>
            <div style={{ background: "rgba(255,255,255,.03)", borderRadius: 10, padding: "10px 14px", fontSize: "0.84rem", color: "rgba(255,255,255,.5)", marginBottom: 18, lineHeight: 1.55 }}>"{partner.bio}"</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "#00e5a0" }}>{partner.streak}</div>
                <div style={{ color: "rgba(255,255,255,.35)", fontSize: "0.75rem" }}>day streak 🔥</div>
              </div>
              <button className="ab-btn" onClick={() => setScreen("message")} style={{ ...S.btnGreen, padding: "10px 20px", fontSize: "0.88rem" }}>Message →</button>
            </div>
          </div>

          {/* Check in */}
          <div style={{ ...S.card, padding: 26 }}>
            <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,.3)", letterSpacing: "1.5px", marginBottom: 16, textTransform: "uppercase" }}>Today's Check-In</div>
            <p style={{ fontWeight: 700, fontSize: "1.1rem", marginBottom: 6 }}>Did you work on your goal today?</p>
            <p style={{ color: "rgba(255,255,255,.35)", fontSize: "0.85rem", marginBottom: 28, lineHeight: 1.6, fontWeight: 300 }}>Your partner gets notified the moment you check in. No hiding! 😄</p>
            {!checkedIn ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <button className="ab-btn checkin-yes" onClick={() => setCheckedIn("yes")}
                  style={{ ...S.btnGreen, padding: 15, fontSize: "1rem", borderRadius: 12 }}>
                  ✅ Yes! I did it today!
                </button>
                <button className="checkin-no" onClick={() => setCheckedIn("no")}
                  style={{ padding: 15, background: "rgba(255,100,100,.08)", border: "1px solid rgba(255,100,100,.2)", color: "#ff7070", borderRadius: 12, cursor: "pointer", fontFamily: "'Plus Jakarta Sans',sans-serif", fontWeight: 700, fontSize: "1rem", transition: "all .2s" }}>
                  ❌ Not today
                </button>
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "24px 16px", background: checkedIn === "yes" ? "rgba(0,229,160,.08)" : "rgba(255,100,100,.08)", borderRadius: 14, border: `1px solid ${checkedIn === "yes" ? "rgba(0,229,160,.25)" : "rgba(255,100,100,.25)"}` }}>
                <div style={{ fontSize: "2.2rem", marginBottom: 8 }}>{checkedIn === "yes" ? "🎉" : "💪"}</div>
                <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{checkedIn === "yes" ? "Amazing! Partner notified. Keep that streak alive!" : "Tomorrow is a fresh start. You've got this!"}</div>
              </div>
            )}
          </div>
        </div>

        {/* Weekly progress */}
        <div style={{ ...S.card, padding: 26 }}>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,.3)", letterSpacing: "1.5px", marginBottom: 18, textTransform: "uppercase" }}>This Week</div>
          <div style={{ display: "flex", gap: 10 }}>
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d, i) => (
              <div key={d} style={{ flex: 1, textAlign: "center" }}>
                <div style={{ aspectRatio: "1", borderRadius: 10, background: i < 3 ? "linear-gradient(135deg,#00e5a0,#00c9b8)" : i === 3 ? "rgba(255,100,100,.15)" : "rgba(255,255,255,.05)", border: `1px solid ${i < 3 ? "transparent" : i === 3 ? "rgba(255,100,100,.2)" : "rgba(255,255,255,.06)"}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 6, color: i < 3 ? "#070710" : i === 3 ? "#ff7070" : "rgba(255,255,255,.15)", fontWeight: 800, fontSize: "0.9rem" }}>
                  {i < 3 ? "✓" : i === 3 ? "✗" : ""}
                </div>
                <div style={{ color: "rgba(255,255,255,.3)", fontSize: "0.72rem" }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ─── MESSAGES ──────────────────────────────────────────────
  if (screen === "message") return (
    <div style={{ ...S.page, display: "flex", flexDirection: "column" }}>
      <Nav active="msg" />
      <div style={{ flex: 1, maxWidth: 680, margin: "0 auto", width: "100%", padding: "28px 24px", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, ...S.card, padding: "14px 18px" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#6c63ff,#00b8d4)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem" }}>{partner.av}</div>
            <div style={{ position: "absolute", bottom: 1, right: 1, width: 11, height: 11, borderRadius: "50%", background: "#00e5a0", border: "2px solid #070710" }} />
          </div>
          <div>
            <div style={{ fontWeight: 700 }}>{partner.name}</div>
            <div style={{ color: "#00e5a0", fontSize: "0.78rem" }}>● Online now</div>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 10, marginBottom: 16, minHeight: 300 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
              <div style={{ maxWidth: "72%", padding: "11px 16px", borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: m.from === "me" ? "linear-gradient(135deg,#00e5a0,#00c9b8)" : "rgba(255,255,255,.08)", color: m.from === "me" ? "#070710" : "#fff", fontWeight: m.from === "me" ? 600 : 400, fontSize: "0.92rem", lineHeight: 1.5 }}>
                {m.text}
                <div style={{ fontSize: "0.68rem", marginTop: 4, opacity: 0.55 }}>{m.time}</div>
              </div>
            </div>
          ))}
          <div ref={msgEndRef} />
        </div>

        <div style={{ display: "flex", gap: 10 }}>
          <input value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()}
            placeholder="Type a message..." style={{ ...S.input, flex: 1 }} />
          <button onClick={sendMsg} style={{ ...S.btnGreen, padding: "14px 22px", fontSize: "1.1rem", borderRadius: 12 }}>→</button>
        </div>
      </div>
    </div>
  );
}
