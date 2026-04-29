import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const COLORS = {
    bg: "#f4f4ff",
    bg2: "#eeeeff",
    primary: "#4a8fa8", // ADHD Teal
    secondary: "#3d1f4b", // Deep Purple
    accent: "#d68cb9", // Pink/Purple Accent
    muted: "#7a7a9a",
    border: "rgba(74, 143, 168, 0.15)",
    card: "rgba(74, 143, 168, 0.04)",
};

const s = {
    page: { fontFamily: "'Tajawal', sans-serif", background: COLORS.bg, color: "#1a1a2e", direction: "rtl", minHeight: "100vh", overflowX: "hidden" },
    section: { maxWidth: "min(1200px, 92vw)", margin: "0 auto", padding: "4rem clamp(1rem, 3vw, 3rem)" },
    label: { fontSize: 11, letterSpacing: "0.3em", color: COLORS.muted, textTransform: "uppercase", marginBottom: 10, display: "block" },
    h2: { fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,5vw,2.5rem)", lineHeight: 1.2, marginBottom: "1.5rem" },
    card: { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "1.25rem 1.5rem", transition: "all 0.3s ease" },
    divider: { display: "flex", alignItems: "center", gap: 16, padding: "0 1.5rem", maxWidth: "min(1200px, 92vw)", margin: "0 auto" },
    divLine: { flex: 1, height: 1, background: COLORS.border },
    divDot: { width: 6, height: 6, borderRadius: "50%", background: COLORS.primary },
};

function useFadeIn() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);
    return [ref, visible];
}

function FadeSection({ children, style }) {
    const [ref, visible] = useFadeIn();
    return (
        <div ref={ref} style={{ ...s.section, ...style, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(30px)", transition: "opacity 0.8s ease, transform 0.8s ease" }}>
            {children}
        </div>
    );
}

function Divider() {
    return <div style={s.divider}><div style={s.divLine} /><div style={s.divDot} /><div style={s.divLine} /></div>;
}

// ── HERO ──────────────────────────────────────────────────────────────────
function Hero() {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
    const fade = (delay) => ({ opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.8s ${delay}s ease, transform 0.8s ${delay}s ease` });
    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem 1.5rem 6.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, rgba(182, 199, 239, 0.3) 0%, rgba(221, 188, 208, 0.3) 100%)", boxShadow: "inset 0 60px 100px -30px rgba(0,0,0,0.04)" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(74, 143, 168, 0.08) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(74, 143, 168, 0.05) 0%, transparent 50%)", pointerEvents: "none" }} />
            <p style={{ ...fade(0.2), fontSize: 11, letterSpacing: "0.3em", color: COLORS.muted, textTransform: "uppercase", marginBottom: 28 }}>الاضطرابات النفسية · نقص الانتباه وفرط الحركة</p>
            <h1 style={{ ...fade(0.4), fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem,6vw,4rem)", lineHeight: 1.1, margin: 0 }}>
                <span style={{ display: "block", color: COLORS.primary }}>عقل لا يعرف</span>
                <span style={{ display: "block", color: COLORS.primary }}>زر الإيقاف</span>
            </h1>
            <div style={{ ...fade(0.6), width: 60, height: 2, background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})`, margin: "1.75rem auto" }} />
            <p style={{ ...fade(0.8), fontSize: "1.05rem", color: "rgba(26,26,46,0.65)", maxWidth: 480, lineHeight: 1.8 }}>
                ADHD ليس كسلاً ولا قلة اهتمام، هو اضطراب يعيش معه <strong style={{ color: COLORS.primary }}>366 مليون شخص</strong> حول العالم.
            </p>
        </div>
    );
}

// ── DEFINITION ────────────────────────────────────────────────────────────
function Definition() {
    return (
        <FadeSection>
            <span style={s.label}>التعريف</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>ما هو </span><span style={{ color: COLORS.primary }}>ADHD؟</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
                {[
                    { title: "الانتباه الطبيعي", color: "#3d1f4b", text: "هو قدرة طبيعية ونظام تنظيمي في الدماغ يساعدك على إنجاز المهام، ترتيب الأولويات، والتحكم في ردود أفعالك بوعي." },
                    { title: "نقص الانتباه وفرط الحركة", color: COLORS.primary, text: "اضطراب عصبي نمائي يؤثر على كيفية نمو الدماغ وعمله. يبدأ في الطفولة ويستمر للبلوغ. الدماغ لا يعمل بشكل 'خاطئ' — بل يعمل بطريقة مختلفة." },
                ].map(({ title, color, text }) => (
                    <div key={title}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = `0 15px 35px ${COLORS.primary}26`; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                        style={{ ...s.card, position: "relative", overflow: "hidden" }}>
                        <div style={{ position: "absolute", top: 0, right: 0, width: 80, height: 80, borderRadius: "50%", background: color, filter: "blur(40px)", opacity: 0.15, pointerEvents: "none" }} />
                        <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 700, color, fontSize: "1.1rem", marginBottom: 10 }}>{title}</div>
                        <p style={{ fontSize: "0.875rem", color: "#5d5c5d", lineHeight: 1.8, margin: 0 }}>{text}</p>
                    </div>
                ))}
            </div>
        </FadeSection>
    );
}

// ── TYPES ─────────────────────────────────────────────────────────────────
const TYPES = [
  { n: "١", en: "Inattentive Type", ar: "قلة الانتباه", color: "#552269", pts: ["حالة من التشتت المستمر، وكأن العقل يرفض التمسك بأي فكرة أو مهمة لفترة كافية.", "يغرق الفرد في نسيان التفاصيل، فقدان الأشياء، والقفز بين الأفكار دون إنجاز.", "لا يرافقه فرط حركة واضح، لذلك يُشخَّص متأخراً خاصةً عند الفتيات."] },
  { n: "٢", en: "Hyperactive-Impulsive Type", ar: "فرط الحركة والاندفاعية", color: "#8a354c", pts: ["طاقة جسدية وذهنية تفوق ما تستطيع البيئة المحيطة استيعابه.", "يتصرف الفرد قبل أن يفكر، يقاطع الآخرين، ويجد صعوبة شديدة في الجلوس ساكناً.", "النوع الأقل شيوعاً وأكثر وضوحاً للعين، مما يجعل تشخيصه أسرع."] },
  { n: "٣", en: "Combined Type", ar: "النوع المدمج", color: "#2a6275", pts: ["الجمع بين ضعف الانتباه وفرط الحركة والاندفاعية معاً في آنٍ واحد.", "النوع الأكثر شيوعاً وتأثيراً، إذ يجمع صعوبات التركيز مع التصرفات الاندفاعية.", "يحتاج إلى خطة علاج شاملة تُراعي كلا الجانبين معاً بفعالية."] },
];

function Types() {
    const [open, setOpen] = useState(-1);
    return (
        <FadeSection>
            <span style={s.label}>الأنواع</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>أنواع </span><span style={{ color: COLORS.primary }}>الاضطراب</span><span style={{ color: "#3d1f4b" }}> وأشكاله</span></h2>
            <p style={{ fontFamily: "'Tajawal', sans-serif", color: "#3d1f4b", borderRight: `3px solid #3d1f4b`, paddingRight: 16, marginBottom: 28, fontStyle: "italic", fontWeight: "bold" }}>كل احد فينا مميز حتى باضطرابه</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", alignItems: "flex-start" }}>
                {TYPES.map((t, i) => {
                    const isOpened = open === i;
                    return (
                        <div key={i} onClick={() => setOpen(isOpened ? -1 : i)}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = isOpened ? "translateY(-2px)" : "none"; e.currentTarget.style.boxShadow = "none"; }}
                            style={{ background: COLORS.card, borderRight: `1px solid ${isOpened ? t.color : COLORS.border}`, borderBottom: `1px solid ${isOpened ? t.color : COLORS.border}`, borderLeft: `1px solid ${isOpened ? t.color : COLORS.border}`, borderTop: `5px solid ${t.color}`, borderRadius: 14, overflow: "hidden", cursor: "pointer", transition: "border-color 0.3s, transform 0.2s", transform: isOpened ? "translateY(-2px)" : "none", flex: "1 1 280px", maxWidth: "380px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "1rem 1.25rem" }}>
                                <span style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "1.8rem", color: t.color, opacity: 0.25, lineHeight: 1 }}>{t.n}</span>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 3, letterSpacing: "0.05em" }}>{t.en}</div>
                                    <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 700, color: t.color, fontSize: "0.9rem" }}>{t.ar}</div>
                                </div>
                                <div style={{ fontSize: 18, color: COLORS.muted, transition: "transform 0.3s", transform: isOpened ? "rotate(45deg)" : "none" }}>+</div>
                            </div>
                            {isOpened && (
                                <div style={{ padding: "0 1.25rem 1.25rem" }}>
                                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                        {t.pts.map((pt, j) => (
                                            <li key={j} style={{ fontSize: "0.85rem", color: "rgba(26,26,46,0.7)", padding: "0.4rem 0", borderBottom: j < t.pts.length - 1 ? "1px solid rgba(74, 143, 168, 0.1)" : "none", lineHeight: 1.7 }}>
                                                <span style={{ color: t.color, marginLeft: 8 }}>—</span>{pt}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <p style={{ textAlign: "center", fontSize: 12, color: COLORS.muted, marginTop: 14 }}>اضغط على أي بطاقة لعرض التفاصيل</p>
        </FadeSection>
    );
}

// ── SYMPTOMS ──────────────────────────────────────────────────────────────
const TABS = [
    { label: "الأعراض المعرفية", id: "cognitive", color: "#3d1f4b", items: ["صعوبة شديدة في الانتباه للتفاصيل", "صعوبة الحفاظ على التركيز في المهام", "سهولة التشتت بأي مؤثر خارجي", "النسيان المتكرر في الأنشطة اليومية", "صعوبة تنظيم المهام وترتيب الأولويات", "ضبابية ذهنية (Brain Fog)"] },
    { label: "الأعراض السلوكية", id: "behavioral", color: COLORS.primary, items: ["التململ وعدم القدرة على الجلوس", "الكلام الزائد ومقاطعة الآخرين", "التصرف دون تفكير في العواقب", "صعوبة انتظار الدور في المحادثات", "البدء في مهام جديدة قبل إنهاء القديمة", "فقدان الأشياء الضرورية باستمرار"] },
    { label: "الأعراض الجسدية", id: "physical", color: "#7a7a9a", items: ["الإرهاق الذهني والجسدي المستمر", "اضطرابات النوم وصعوبة الاستيقاظ", "توتر في العضلات ناجم عن الضغط", "الشعور بضيق جسدي عند المهام الشاقة"] },
    { label: "الأعراض العاطفية", id: "emotional", color: "#c1232b", items: ["التقلبات العاطفية المفاجئة", "حساسية مفرطة للنقد والرفض (RSD)", "الإحباط السريع عند العقبات البسيطة", "صعوبة في استعادة الهدوء بعد الانفعال", "تدني الثقة بالنفس نتيجة الإخفاقات"] },
];

function Symptoms() {
    const [tab, setTab] = useState(0);
    const cur = TABS[tab];
    return (
        <FadeSection>
            <span style={s.label}>الأعراض</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>كيف يظهر </span><span style={{ color: COLORS.primary }}>ADHD</span><span style={{ color: "#3d1f4b" }}> في جسدك وعقلك؟</span></h2>
            <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 24, overflowX: "auto" }}>
                {TABS.map((t, i) => (
                    <button key={i} onClick={() => setTab(i)} style={{ background: "none", border: "none", color: tab === i ? "#3d1f4b" : COLORS.muted, fontWeight: tab === i ? "bold" : "normal", fontFamily: "'Tajawal', sans-serif", fontSize: "0.95rem", padding: "0.65rem 1.1rem", cursor: "pointer", borderBottom: `2px solid ${tab === i ? "#3d1f4b" : "transparent"}`, marginBottom: -1, whiteSpace: "nowrap", transition: "color 0.3s" }}>{t.label}</button>
                ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                {cur.items.map((item, i) => (
                    <div key={i}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = cur.color; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor = COLORS.border; }}
                        style={{ ...s.card, display: "flex", alignItems: "center", gap: 12, fontSize: "0.9rem", color: "#3d1f4b", fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", flex: "1 1 240px", maxWidth: "380px", minHeight: "60px" }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: cur.color, flexShrink: 0 }} />{item}
                    </div>
                ))}
            </div>
        </FadeSection>
    );
}

// ── CAUSES ────────────────────────────────────────────────────────────────
const CAUSES_DATA = [
    {
        n: "١",
        title: "العوامل الجينية والوراثية",
        color: "#5b4269",
        bgCircle: "#e0dce6",
        desc: "ADHD من أعلى الاضطرابات النفسية في نسبة الوراثة - تصل إلى 76%. إذا كان أحد الوالدين مصاباً، فالاحتمال مرتفع جداً أن ينتقل للأبناء.",
        type: "pills",
        items: [
            "تأخر في نضج قشرة الفص الجبهي (Prefrontal Cortex) مقارنة بالأقران في نفس العمر.",
            "ارتباط جينات محددة مثل DRD4 و DRD5 و CDH13 بزيادة خطر الإصابة واضطراب إشارات الدوبامين.",
            "حجم أصغر في مناطق دماغية كالعقد القاعدية والمخيخ عند بعض المصابين.",
            "خلل في مستويات الدوبامين والنورإبينفرين في قشرة الفص الجبهي المسؤولة عن التحكم التنفيذي."
        ]
    },
    {
        n: "٢",
        title: "العوامل البيئية والضغوطات",
        color: "#5b8091",
        bgCircle: "#d0dae0",
        type: "list",
        items: [
            "التعرض للتبغ أو الكحول أو المواد السامة خلال فترة الحمل",
            "الولادة المبكرة أو انخفاض وزن الولادة بشكل ملحوظ",
            "التعرض للرصاص أو المبيدات الحشرية في سن مبكرة جداً",
            "الحرمان الشديد من التحفيز المعرفي والعاطفي في سنوات الطفولة الأولى",
            "البيئات الفوضوية وغير المنتظمة التي تُرهق نظام التنظيم الذاتي الهش لدى الطفل"
        ]
    },
    {
        n: "٣",
        title: "العوامل العضوية والطبية",
        color: "#c46a20",
        bgCircle: "#f5e6d3",
        type: "list",
        items: [
            "بطء في استقلاب الجلوكوز في المناطق الدماغية المسؤولة عن الانتباه والحركة.",
            "خلل في نشاط الشبكة العصبية الافتراضية (Default Mode Network) التي تبقى نشطة بشكل غير طبيعي.",
            "اضطرابات الغدة الدرقية - فرط نشاطها يسبب أعراضاً مشابهة جداً لـ ADHD",
            "انخفاض الحديد والفيريتين في الدم يرتبط بتعطل إنتاج الدوبامين مباشرةً",
            "بعض الأدوية كالكورتيكوستيرويدات تنتج أعراضاً مشابهة للاضطراب"
        ]
    }
];

function Causes() {
    return (
        <FadeSection>
            <span style={s.label}>الأسباب</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>من أين يأتي </span><span style={{ color: COLORS.primary }}>ADHD؟</span></h2>
            <p style={{ fontSize: "0.875rem", color: COLORS.muted, marginBottom: 32 }}>هناك ٣ مسببات رئيسية لاضطراب ADHD</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {CAUSES_DATA.map((c, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 20, alignItems: "start" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: "#3d1f4b", border: `1px solid ${c.color}`, background: c.bgCircle, flexShrink: 0 }}>{c.n}</div>
                            {i < CAUSES_DATA.length - 1 && <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)`, marginTop: 4 }} />}
                        </div>
                        <div style={{
                            marginBottom: 0,
                            background: "#ffffff",
                            border: `2.5px solid ${c.color}`,
                            borderRadius: "20px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
                        }}>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: c.color, fontSize: "1.05rem", marginBottom: 14 }}>{c.title}</div>
                            {c.desc && <p style={{ fontSize: "0.875rem", color: "#5d5c5d", lineHeight: 1.7, marginBottom: 14, fontWeight: "600" }}>{c.desc}</p>}
                            
                            {c.type === "pills" ? (
                                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                    {c.items.map((item, idx) => (
                                        <span key={idx} style={{ background: c.bgCircle, color: "#3d1f4b", borderRadius: 50, padding: "4px 12px", fontSize: "0.75rem", fontWeight: "bold" }}>{item}</span>
                                    ))}
                                </div>
                            ) : (
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {c.items.map((item, idx) => (
                                        <li key={idx} style={{ 
                                            padding: "0.5rem 0", 
                                            borderBottom: idx < c.items.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none",
                                            fontSize: "0.875rem",
                                            color: "#5d5c5d",
                                            fontWeight: "600",
                                            lineHeight: 1.7
                                        }}>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ 
                border: "2.5px solid #8ba8b5", 
                borderRadius: 35, 
                padding: "1.5rem 2.5rem", 
                background: "rgba(255, 255, 255, 0.5)", 
                marginTop: 40,
                textAlign: "right"
            }}>
                <div style={{ 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "flex-start", 
                    gap: 12, 
                    color: "#5b8091", 
                    fontWeight: 900, 
                    fontSize: "1.1rem",
                    marginBottom: 10,
                    fontFamily: "'Tajawal', sans-serif"
                }}>
                    <span style={{ color: "#ff6b81", fontSize: "1.4rem" }}>❌</span>
                    <span>خرافات شائعة عن أسباب ADHD</span>
                </div>
                <p style={{ 
                    fontSize: "0.95rem", 
                    color: "#5d5c5d", 
                    lineHeight: 1.8, 
                    margin: 0,
                    fontWeight: "600",
                    fontFamily: "'Tajawal', sans-serif"
                }}>
                    السكر لا يسبب ADHD. الشاشات والتلفزيون لا تسببه. التربية السيئة ليست السبب. الكسل أو قلة الإرادة لا علاقة لها به. هذه أساطير غير علمية - ADHD اضطراب دماغي حقيقي له أساس بيولوجي وجيني موثق بآلاف الدراسات العلمية.
                </p>
            </div>
        </FadeSection>
    );
}

// ── MALADAPTIVE ───────────────────────────────────────────────────────────
const MALAD = [
    { icon: "⏳", title: "التسويف المزمن", en: "Chronic Procrastination", desc: "تأجيل المهام لأن الدماغ لا يجد الدافع الكافي، مما يخلق دوامة ذنب وتوتر.", color: "#E67E22" },
    { icon: "🌀", title: "الإفراط في الانشغال", en: "Hyperbusyness", desc: "ملء كل لحظة بالفوضى هرباً من الجلوس مع الأفكار أو مواجهة مهمة صعبة.", color: "#E67E22" },
    { icon: "⏱️", title: "الاعتماد على الضغط", en: "Deadline Dependency", desc: "عدم القدرة على البدء إلا تحت وطأة الموعد النهائي، مما يسبب إرهاقاً مزمناً.", color: "#E67E22" },
    { icon: "🙈", title: "التجنب العاطفي", en: "Emotional Avoidance", desc: "الابتعاد عن المواقف التي تتطلب جهداً تنظيمياً أو قد تسبب إحراجاً.", color: "#E67E22" },
    { icon: "📱", title: "المحفزات السريعة", en: "Dopamine Seeking", desc: "اللجوء للمحتوى السريع لإشباع الدوبامين مؤقتاً دون بذل جهد حقيقي.", color: "#E67E22" },
    { icon: "💔", title: "إلقاء اللوم على الذات", en: "Self-blame", desc: "تفسير كل إخفاق كدليل على الكسل، مما يدمر الثقة بالنفس تدريجياً.", color: "#E67E22" },
];

const REASSURANCE = { icon: "🙏", title: "طلب الطمأنينة المفرطة", en: "Excessive Reassurance Seeking", desc: "الاعتماد على الآخرين لتأكيد قراراته وتنظيم مهامه باستمرار، مما يُضعف الاستقلالية ويُثقل العلاقات ويزيد القلق بدلاً من تخفيفه على المدى الطويل.", color: "#E67E22" };

function Maladaptive() {
    return (
        <FadeSection>
            <span style={s.label}>آليات التكيف</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>حين تُخطئ </span><span style={{ color: COLORS.primary }}>طريقة التعامل</span></h2>
            <p style={{ fontSize: "0.875rem", color: "#5d5c5d", marginBottom: 28, lineHeight: 1.7 }}>هي استجابات سلوكية مختلة توفر راحة مؤقتة، لكنها تزيد من تأثير الاضطراب وتُفاقم عواقبه الجسدية والنفسية على المدى الطويل.</p>
            
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                    {MALAD.map((m, i) => (
                        <div key={i} 
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 12px 30px ${COLORS.primary}1f`; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                            style={{ ...s.card, flex: "1 1 280px", maxWidth: "calc(33.33% - 12px)", minWidth: "280px" }}>
                            <div style={{ fontSize: 24, marginBottom: 10 }}>{m.icon}</div>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#3d1f4b", fontSize: "0.95rem", marginBottom: 4 }}>{m.title}</div>
                            <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10, letterSpacing: "0.05em" }}>{m.en}</div>
                            <p style={{ fontSize: "0.85rem", color: "#5d5c5d", lineHeight: 1.7, margin: 0, fontWeight: "600" }}>{m.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Bottom: Full-width Rectangle */}
                <div 
                    onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 12px 30px ${COLORS.primary}1f`; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                    style={{ ...s.card, flex: "1 1 100%", display: "grid", gridTemplateColumns: "auto 1fr", gap: 24, alignItems: "center", marginTop: 4 }}>
                    <div style={{ fontSize: 32, padding: "0 10px" }}>{REASSURANCE.icon}</div>
                    <div>
                        <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 6 }}>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#3d1f4b", fontSize: "1rem" }}>{REASSURANCE.title}</div>
                            <div style={{ fontSize: 11, color: COLORS.muted, letterSpacing: "0.05em" }}>{REASSURANCE.en}</div>
                        </div>
                        <p style={{ fontSize: "0.875rem", color: "#5d5c5d", lineHeight: 1.7, margin: 0, fontWeight: "600" }}>{REASSURANCE.desc}</p>
                    </div>
                </div>
            </div>
        </FadeSection>
    );
}

// ── PERSONALITY ───────────────────────────────────────────────────────────
const TRAITS = [
    { ar: "الاندفاعية العاطفية", en: "Emotional Impulsivity", desc: "ردود أفعال مكثفة وسريعة غير متناسبة مع الموقف وصعوبة في تهدئتها." },
    { ar: "حساسية الرفض المؤلمة", en: "RSD", desc: "ألم عاطفي حاد عند الشعور بالرفض أو الانتقاد، يعاني منها 98% من المصابين." },
    { ar: "عدم الاتساق في الأداء", en: "Inconsistency", desc: "قدرة استثنائية في بعض الأيام وشلل تام في أيام أخرى دون سبب واضح." },
    { ar: "الإبداع ✨", en: "Creative Thinking", desc: "ميل طبيعي لرؤية روابط غير متوقعة وابتكار حلول غير تقليدية." },
    { ar: "فرط التركيز ✨", en: "Hyperfocus", desc: "قدرة على الانغماس الكلي في الاهتمامات التي تحفز الدوبامين." },
    { ar: "الكمالية الدفاعية", en: "Perfectionism", desc: "كمالية مبالغ فيها لإخفاء الأعراض وإثبات الكفاءة للآخرين." },
    { ar: "الحاجة للتحفيز", en: "High Stimulation", desc: "الملل السريع جداً والبحث المستمر عن التجديد كمصدر للدوبامين." },
];

function Personality() {
    return (
        <FadeSection>
            <span style={s.label}>السمات الشخصية</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: COLORS.primary }}>ADHD </span><span style={{ color: "#3d1f4b" }}>يُغيّر شخصيتك</span></h2>
            <p style={{ fontSize: "0.875rem", color: COLORS.muted, marginBottom: 24 }}>العيش مع ADHD مزمن يحدث تغييرات في شخصيتك بمرور الوقت.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {TRAITS.map((t, i) => (
                    <div key={i}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateX(-12px)"; e.currentTarget.style.borderColor = "#552269"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = "rgba(214,147,106,0.2)"; }}
                        style={{ ...s.card, display: "grid", gridTemplateColumns: "min(200px,40%) 1fr", gap: 16, alignItems: "start", borderColor: "rgba(214,147,106,0.2)" }}>
                        <div>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#552269", fontSize: "0.95rem" }}>{t.ar}</div>
                            <div style={{ fontSize: 11, color: COLORS.muted, marginTop: 3 }}>{t.en}</div>
                        </div>
                        <p style={{ fontSize: "0.85rem", color: "#5d5c5d", lineHeight: 1.7, margin: 0, fontWeight: "600" }}>{t.desc}</p>
                    </div>
                ))}
            </div>
        </FadeSection>
    );
}

// ── BRAIN JOURNEY ─────────────────────────────────────────────────────────
const BRAIN_STEPS = [
    { 
        n: "١", 
        label: "قشرة الفص الجبهي — Prefrontal Cortex", 
        sub: "مركز القيادة — الأكثر تأثراً في ADHD",
        text: "عند مواجهة مهمة تتطلب تركيزاً مستمراً، تُرسل قشرة الفص الجبهي إشارات لتفعيل الانتباه والتخطيط والتحكم بالاندفاع. في ADHD، هذه المنطقة أبطأ نضجاً وأقل نشاطاً، مما يُضعف قدرتها على 'إدارة' بقية الدماغ بفعالية." 
    },
    { 
        n: "٢", 
        label: "الدوبامين والنورإبينفرين — Dopamine & Norepinephrine", 
        sub: "شُح الوقود الكيميائي",
        text: "في الدماغ الطبيعي، يُفرز الدوبامين بكميات كافية عند البدء بمهمة، مما يجعلها 'تبدو مهمة' ويحفّز الاستمرار. في دماغ ADHD، الدوبامين شحيح في هذه الدوائر — لذا لا يجد الدماغ 'السبب الكافي' للبدء أو الاستمرار حتى في المهام الضرورية." 
    },
    { 
        n: "٣", 
        label: "الشبكة العصبية الافتراضية — Default Mode Network", 
        sub: "الضوضاء الداخلية التي لا تصمت",
        text: "هذه الشبكة — المسؤولة عن الأحلام والتخيل — تبقى نشطة بشكل غير طبيعي حتى أثناء التركيز في ADHD، مما يخلق 'ضوضاء داخلية' مستمرة تُصعّب التركيز وتُفسّر التشتت المزمن." 
    },
    { 
        n: "٤", 
        label: "العقد القاعدية — Basal Ganglia", 
        sub: "ضعف التحكم بالاندفاع",
        text: "تُحدث انخفاضاً في نشاط العقد القاعدية المسؤولة عن تنظيم الحركة والتحكم بالاندفاع، مما يجعل كبح الأفعال الفورية وتأجيل المكافأة أمراً شاقاً للغاية." 
    },
    { 
        n: "٥", 
        label: "اللوزة الدماغية — Amygdala", 
        sub: "الانفعالات التي تطغى على المنطق",
        text: "تُرسل اللوزة الدماغية استجابات عاطفية مبالغ فيها تجاه الإخفاق أو الانتقاد، بينما تعجز قشرة الفص الجبهي الضعيفة عن تهدئتها — وهذا يُفسّر ظاهرة 'حساسية الرفض المؤلمة RSD' بشكل كامل." 
    },
];

function BrainStep({ step, index }) {
    const [ref, visible] = useFadeIn();
    return (
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 20, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(20px)", transition: `opacity 0.5s ${index * 0.12}s ease, transform 0.5s ${index * 0.12}s ease` }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 8 }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "#3d1f4b", border: `1.5px solid rgba(74, 143, 168, 0.25)`, background: "#d0dae0", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", flexShrink: 0 }}>{step.n}</div>
                {index < BRAIN_STEPS.length - 1 && <div style={{ width: 1, height: "100%", background: `linear-gradient(to bottom, rgba(74, 143, 168, 0.3), transparent)`, margin: "8px 0" }} />}
            </div>
            <div style={{ ...s.card, marginBottom: 20, borderColor: "rgba(74, 143, 168, 0.25)", padding: "1.5rem 2rem", background: "#ffffff", borderRadius: 20 }}>
                <div style={{ fontSize: "1.05rem", color: "#552269", fontWeight: "900", fontFamily: "'Tajawal', sans-serif", marginBottom: 4 }}>{step.label}</div>
                <div style={{ fontSize: "0.85rem", color: "#552269", fontWeight: "700", fontFamily: "'Tajawal', sans-serif", marginBottom: 12 }}>{step.sub}</div>
                <p style={{ fontSize: "0.9rem", color: "#5d5c5d", lineHeight: 1.7, margin: 0, fontWeight: "600" }}>{step.text}</p>
            </div>
        </div>
    );
}

function BrainJourney() {
    return (
        <FadeSection>
            <span style={s.label}>علم الأعصاب</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>رحلة داخل </span><span style={{ color: COLORS.primary }}>دماغك</span></h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {BRAIN_STEPS.map((step, i) => <BrainStep key={i} step={step} index={i} />)}
            </div>
            <div style={{ 
                background: "rgba(74, 143, 168, 0.08)", 
                border: "2px solid rgba(74, 143, 168, 0.25)", 
                borderRadius: 35, 
                padding: "2.5rem", 
                marginTop: 24,
                textAlign: "right"
            }}>
                <p style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#3d1f4b", marginBottom: 24, fontSize: "1.05rem", lineHeight: 1.5 }}>
                    نتيجة هذا الخلل في الدوبامين والنورإبينفرين<br/>تحدث هذه التأثيرات:
                </p>
                <div style={{ display: "flex", flexDirection: "column" }}>
                    {[
                        { t: "صعوبة في بدء المهام حتى المهمة منها (Task Initiation Deficit).", s: "“أعرف أنني يجب أن أبدأ، لكن لا أستطيع”." },
                        { t: "الانتقال المتكرر بين المهام دون إنهاء أي منها — دوامة مستمرة من البدايات بلا نهايات.", s: "" },
                        { t: "فرط التركيز على أنشطة ذات تحفيز عالٍ مقابل شلل تام أمام أنشطة روتينية أو ذات تحفيز منخفض.", s: "" },
                        { t: "تفاوت حاد في الأداء بين يوم وآخر بحسب مستوى التحفيز المتاح — لا يمكن التنبؤ بأداء اليوم.", s: "" }
                    ].map((it, i, a) => (
                        <div key={i} style={{ 
                            fontSize: "0.95rem", 
                            color: "#3d1f4b", 
                            fontWeight: "700", 
                            padding: "1rem 0", 
                            borderBottom: i < a.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none", 
                            display: "flex", 
                            gap: 12, 
                            alignItems: "flex-start",
                            lineHeight: 1.6
                        }}>
                            <span style={{ color: COLORS.primary, fontSize: "1.2rem", marginTop: -2 }}>•</span>
                            <span>
                                {it.t}
                                {it.s && <span style={{ display: "block", color: "#5d5c5d", fontWeight: "600", fontSize: "0.9rem", marginTop: 4 }}>{it.s}</span>}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </FadeSection>
    );
}

// ── TREATMENT ─────────────────────────────────────────────────────────────
const TREATMENTS = [
    { 
        icon: "🧩", 
        en: "Cognitive Behavioral Therapy", 
        title: "العلاج السلوكي المعرفي (CBT)", 
        color: "#552269", 
        pts: [
            ["التثقيف النفسي:", "فهم أن التسويف وصعوبة البدء ليسا كسلاً، بل خللاً في نظام الدوبامين يمكن تجاوزه بالاستراتيجيات الصحيحة. التعامل مع ADHD كاختلاف لا كعيب."],
            ["إعادة الهيكلة المعرفية:", "تحدي الأفكار مثل 'أنا فاشل' أو 'لن أستطيع أبداً' وربطها بالاضطراب لا بالشخصية. تغيير الحوار الداخلي من العقاب إلى الحل."],
            ["تدريب المهارات:", "تعليم التخطيط، تقسيم المهام إلى خطوات صغيرة قابلة للتنفيذ، وبناء أنظمة شخصية تعوّض الضعف في الوظائف التنفيذية."],
            ["التعرض التدريجي:", "مواجهة تدريجية للمهام المؤجلة لكسر الدوامة السلبية. تعليم الدماغ أن البدء ممكن دون الحاجة لضغط الموعد النهائي."]
        ] 
    },
    { 
        icon: "💊", 
        en: "Pharmacotherapy", 
        title: "العلاج الدوائي", 
        color: COLORS.primary, 
        pts: [
            ["الأدوية المنشطة", "كالميثيلفينيدات (ريتالين) والأمفيتامينات. هي الأكثر فعالية — ترفع الدوبامين والنورإبينفرين في قشرة الفص الجبهي مباشرةً. تحسين واضح في التركيز والتنظيم والتحكم."],
            ["الأدوية غير المنشطة", "كأتوموكسيتين (ستراتيرا) وجوانفاسين. تُستخدم عند عدم تحمل المنشطات أو وجود حالات مصاحبة كالقلق أو اضطراب النوم."],
            ["ناهضات ألفا لعلاج الحساسية العاطفية", "كلونيدين وجوانفاسين — تُستخدم تحديداً لعلاج حساسية الرفض المؤلمة (RSD). تعمل على تهدئة نشاط النورإبينفرين وتقلل شدة الاستجابات العاطفية بشكل ملحوظ."],
            ["مضادات اكتئاب من نوع SNRIs", "في حالات ADHD المصحوبة باكتئاب أو قلق مزمن — تساعد على تنظيم كلّ من الدوبامين والسيروتونين والنورإبينفرين معاً."]
        ] 
    },
];

function Treatment() {
    const [open, setOpen] = useState(-1);
    return (
        <FadeSection>
            <span style={s.label}>العلاج</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>طريقك نحو </span><span style={{ color: COLORS.primary }}>التعافي</span></h2>
            <div style={{ flexDirection: "column", gap: 12, display: "flex" }}>
                {TREATMENTS.map((t, i) => (
                    <div key={i}
                        onMouseEnter={e => { if (open !== i) e.currentTarget.style.borderColor = t.color; }}
                        onMouseLeave={e => { if (open !== i) e.currentTarget.style.borderColor = COLORS.border; }}
                        style={{ background: COLORS.card, border: `1px solid ${open === i ? t.color : COLORS.border}`, borderRadius: 16, overflow: "hidden", transition: "border-color 0.3s" }}>
                        <div onClick={() => setOpen(open === i ? -1 : i)} style={{ display: "flex", alignItems: "center", gap: 16, padding: "1.25rem 1.5rem", cursor: "pointer" }}>
                            <div style={{ width: 46, height: 46, borderRadius: 12, background: `${t.color}14`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{t.icon}</div>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 11, color: COLORS.muted, letterSpacing: "0.08em", marginBottom: 3 }}>{t.en}</div>
                                <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 700, color: t.color, fontSize: "0.95rem" }}>{t.title}</div>
                            </div>
                            <div style={{ width: 28, height: 28, borderRadius: "50%", border: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: COLORS.muted, fontSize: 18, transition: "transform 0.3s", transform: open === i ? "rotate(45deg)" : "none" }}>+</div>
                        </div>
                        {open === i && (
                            <div style={{ padding: "0 1.5rem 1.5rem" }}>
                                {t.badge && <span style={{ display: "inline-block", background: `${t.color}14`, border: `1px solid ${t.color}40`, color: t.color, borderRadius: 50, padding: "4px 14px", fontSize: 12, marginBottom: 14, fontWeight: "bold" }}>✦ {t.badge}</span>}
                                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                    {t.pts.map(([bold, rest], j, a) => (
                                        <li key={j} style={{ fontSize: "0.875rem", color: "#5d5c5d", padding: "0.55rem 0", borderBottom: j < a.length - 1 ? `1px solid ${COLORS.border}` : "none", display: "flex", gap: 10, lineHeight: 1.7, alignItems: "flex-start", fontWeight: "600", fontFamily: "'Tajawal', sans-serif" }}>
                                            <span style={{ color: t.color, fontSize: "0.5rem", marginTop: 7, flexShrink: 0 }}>●</span>
                                            <span>{bold && <strong style={{ color: "#5d5c5d", fontFamily: "'Tajawal', sans-serif" }}>{bold}</strong>} {rest}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div style={{ background: "linear-gradient(135deg, #e8f4f8 0%, #f0f8f4 100%)", borderRadius: "16px", padding: "1.5rem", marginTop: "1.5rem", border: `1px solid ${COLORS.border}` }}>
                <p style={{ fontWeight: "900", color: COLORS.primary, marginBottom: 8 }}>✅ المنهج المتكامل</p>
                <p style={{ fontSize: "13px", color: "#5d5c5d", lineHeight: "1.8", fontWeight: "600" }}>الجمع بين العلاج الدوائي والنفسي وتعديل نمط الحياة هو الطريق الأمثل. الأدوية تهيئ الدماغ، والاستراتيجيات السلوكية تبني المهارات.</p>
            </div>
        </FadeSection>
    );
}

// ── APP ───────────────────────────────────────────────────────────────────
export default function ADHDDetail() {
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@300;400;600;700;900&display=swap";
        document.head.appendChild(link);
        const style = document.createElement("style");
        style.textContent = `@keyframes fadeIn { from { opacity:0 } to { opacity:1 } } ::-webkit-scrollbar { width:4px } ::-webkit-scrollbar-thumb { background:#4a8fa8; border-radius:2px }`;
        document.head.appendChild(style);
    }, []);

    return (
        <div style={s.page}>
            <Hero />
            <div style={{ background: 'linear-gradient(160deg, #faf8ff 0%, #f0ecff 50%, #fdf6ff 100%)' }}>
                <Definition />
                <Divider />
                <Types />
                <Divider />
                <Symptoms />
                <Divider />
                <Causes />
                <Divider />
                <Maladaptive />
                <Divider />
                <Personality />
                <Divider />
                <BrainJourney />
                <Divider />
                <Treatment />
                <div style={{ display: "flex", justifyContent: "center", padding: "2rem 0 1rem" }}>
                    <Link to="/disease/eating-disorder" style={{ textDecoration: 'none' }}>
                        <div onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = "#493054"; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = "#3d1f4b"; }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 1.5rem', background: '#3d1f4b', color: 'white', borderRadius: '50px', fontSize: '1rem', fontWeight: 'bold', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 8px 20px rgba(61, 31, 75, 0.25)', fontFamily: "'Tajawal', sans-serif" }}>
                            <span>اضطراب الأكل</span>
                            <span style={{ fontSize: '1.2rem', marginTop: -2 }}>←</span>
                        </div>
                    </Link>
                </div>
                <div style={{ textAlign: "center", padding: "2.5rem 1.5rem", borderTop: `1px solid ${COLORS.border}`, fontSize: 13, color: COLORS.muted }}>
                    هذا المحتوى لأغراض تثقيفية فقط · إذا كنت تعاني من أعراض ADHD، تحدث مع <span style={{ color: "#3d1f4b" }}>متخصص نفسي</span>
                </div>
            </div>
        </div>
    );
}