import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const COLORS = {
    bg: "#f4f4ff",
    bg2: "#eeeeff",
    primary: "#7a4d68", // Eating Disorder Deep Plum
    secondary: "#3d1f4b", // Consistent Deep Purple
    accent: "#d68cb9", // Consistent pink/purple accent
    muted: "#7a7a9a",
    border: "rgba(122, 77, 104, 0.15)",
    card: "rgba(122, 77, 104, 0.04)",
};

const s = {
    page: { fontFamily: "'Tajawal', sans-serif", background: COLORS.bg, color: "#1a1a2e", direction: "rtl", minHeight: "100vh", overflowX: "hidden" },
    section: { maxWidth: "min(1200px, 92vw)", margin: "0 auto", padding: "4rem clamp(1rem, 3vw, 3rem)" },
    label: { fontSize: 11, letterSpacing: "0.3em", color: COLORS.muted, textTransform: "uppercase", marginBottom: 10, display: "block" },
    h2: { fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,5vw,2.5rem)", lineHeight: 1.2, marginBottom: "1.5rem" },
    card: { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "1.25rem 1.5rem", transition: "all 0.3s ease" },
    divider: { display: "flex", alignItems: "center", gap: 16, padding: "0 1.5rem", maxWidth: "min(1200px, 92vw)", margin: "0 auto" },
    divLine: { flex: 1, height: 1, background: COLORS.border },
    divDot: { width: 6, height: 6, borderRadius: "50%", background: COLORS.accent },
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem 1.5rem 6.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, rgba(221, 188, 208, 0.3) 0%, rgba(182, 199, 239, 0.3) 100%)", boxShadow: "inset 0 60px 100px -30px rgba(0,0,0,0.04)" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(122, 77, 104, 0.08) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(214, 140, 185, 0.05) 0%, transparent 50%)", pointerEvents: "none" }} />
            <p style={{ ...fade(0.2), fontSize: 11, letterSpacing: "0.3em", color: COLORS.muted, textTransform: "uppercase", marginBottom: 28 }}>الاضطرابات النفسية · اضطراب الأكل</p>
            <h1 style={{ ...fade(0.4), fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem,6vw,4rem)", lineHeight: 1.1, margin: 0 }}>
                <span style={{ display: "block", color: COLORS.accent }}>ما هو اضطراب الأكل</span>
                <span style={{ display: "block", color: COLORS.accent }}>صراع مع الطعام والجسد</span>
            </h1>
            <div style={{ ...fade(0.6), width: 60, height: 2, background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.accent})`, margin: "1.75rem auto" }} />
            <p style={{ ...fade(0.8), fontSize: "1.05rem", color: "rgba(26,26,46,0.65)", maxWidth: 480, lineHeight: 1.8 }}>
                ليست ضعفاً ولا كسلاً، هي اضطراب يؤثر على <strong style={{ color: COLORS.primary }}>ملايين الأشخاص</strong> حول العالم.
            </p>
        </div >
    );
}

// ── DEFINITION ────────────────────────────────────────────────────────────
function Definition() {
    return (
        <FadeSection>
            <span style={s.label}>التعريف</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>ما هو </span><span style={{ color: COLORS.accent }}>اضطراب الأكل</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
                {[
                    { title: "الأكل الطبيعي", color: COLORS.primary, text: "سلوك مرن يستجيب لجوع الجسم وشبعه، حيث يُستخدم الطعام للغذاء والمتعة دون أن يسيطر على التفكير أو يسبب مشاعر ذنب." },
                    { title: "اضطراب الأكل", color: COLORS.accent, text: "خلل في السلوك الغذائي ناتج عن ضغوط نفسية، يتميز بهوس شديد بشكل الجسم والوزن والسيطرة على الطعام، مما يعطل الحياة اليومية." },
                ].map(({ title, color, text }) => (
                    <div key={title}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(122, 77, 104, 0.15)"; }}
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
    { n: "١", en: "Anorexia Nervosa", ar: "فقدان الشهية العصبي", color: "#552269", pts: ["تقييد شديد للطعام ناتج عن خوف مكثف من اكتساب الوزن، حتى عند مراحل النحافة الخطيرة.", "تشوه حاد في صورة الجسم: يرى الشخص نفسه سميناً رغم النحافة الواضحة.", "يُعد الأعلى معدل وفيات بين الاضطرابات النفسية بسبب المضاعفات الجسدية."] },
    { n: "٢", en: "Bulimia Nervosa", ar: "النهام العصبي", color: "#8a354c", pts: ["دورة متكررة من نوبات الأكل المفرط (الشراهة) يعقبها سلوك تطهيري كالتفريغ أو الرياضة المفرطة.", "يشعر الشخص بفقدان السيطرة خلال نوبة الأكل، تتبعها مشاعر ذنب وخزي عميقة.", "الوزن قد يبدو طبيعياً مما يجعل المعاناة مخفية عن الآخرين وصعبة التشخيص."] },
    { n: "٣", en: "Binge Eating Disorder", ar: "اضطراب نهم الطعام", color: "#2a6275", pts: ["نوبات أكل مفرط متكررة دون سلوكيات تطهير، مما يؤدي غالباً لزيادة الوزن.", "الأكل بسرعة كبيرة حتى الشعور بعدم الارتياح الشديد، غالباً بمفرده بسبب الخجل.", "يرتبط بضائقة نفسية واضحة وإحساس عميق بفقدان السيطرة بعد كل نوبة."] },
    { n: "٤", en: "ARFID", ar: "اضطراب تجنب تناول الطعام", color: "#7571b8", pts: ["تجنب طعام معين بناءً على خصائصه الحسية (اللون، القوام) لا بسبب الخوف من الوزن.", "يؤدي لنقص تغذوي خطير ومحدودية اجتماعية، وشائع عند الأطفال والبالغين.", "يرتبط ارتباطاً وثيقاً باضطراب التوحد وفرط الحساسية الحسية."] },
];

function Types() {
    const [open, setOpen] = useState(-1);
    return (
        <FadeSection>
            <span style={s.label}>الأنواع</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>أنواع </span><span style={{ color: COLORS.accent }}>الاضطراب</span><span style={{ color: "#3d1f4b" }}> وأشكاله</span></h2>
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
                                            <li key={j} style={{ fontSize: "0.85rem", color: "rgba(26,26,46,0.7)", padding: "0.4rem 0", borderBottom: j < t.pts.length - 1 ? "1px solid rgba(122,77,104,0.1)" : "none", lineHeight: 1.7 }}>
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
    { label: "الأعراض الجسدية", id: "physical", color: "#3d1f4b", items: ["تغيرات ملحوظة في الوزن", "الشعور الدائم بالبرد أو الدوار", "مشاكل في الهضم أو تساقط الشعر", "اضطراب في الدورة الشهرية", "إرهاق مستمر وضعف عام", "شحوب وجفاف الجلد"] },
    { label: "المعرفية والنفسية", id: "cognitive", color: "#7a4d68", items: ["هواجس مستمرة حول السعرات", "تشوه حاد في صورة الجسم", "خوف شديد من زيادة الوزن", "صعوبة في التركيز والتفكير", "مشاعر ذنب وخزي بعد الأكل", "اكتئاب وقلق مزمن مصاحب"] },
    { label: "الأعراض السلوكية", id: "behavioral", color: "#7a7a9a", items: ["تجنب الأكل مع الآخرين", "طقوس غريبة حول ترتيب الطعام", "ممارسة رياضة مفرطة كعقاب", "الأكل السري والاختباء", "التحقق المتكرر من الوزن", "ارتداء ملابس فضفاضة للإخفاء"] },
    { label: "نوبات النهم", id: "binge", color: "#c1232b", items: ["نوبات أكل مفاجئة غير متحكم بها", "شعور بفقدان السيطرة التام", "مشاعر ذنب وخزي شديدة بعدها", "محاولة تعويض النوبة بالتطهير", "تقلبات مزاجية حادة", "انسحاب اجتماعي بعد النوبة"] },
];

function Symptoms() {
    const [tab, setTab] = useState(0);
    const cur = TABS[tab];
    return (
        <FadeSection>
            <span style={s.label}>الأعراض</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>كيف يظهر </span><span style={{ color: COLORS.accent }}>اضطراب الأكل</span><span style={{ color: "#3d1f4b" }}> في جسدك وعقلك؟</span></h2>
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
const CAUSES = [
    {
        n: "١", 
        color: "#9e728a", 
        title: "العوامل الجينية والوراثية", 
        borderColor: "#d68cb9", 
        items: [
            "استعداد وراثي لزيادة القلق أو الكمالية",
            "حساسية أعلى في النواقل العصبية المرتبطة بالمكافأة مثل السيروتونين والدوبامين",
            "اختلافات وراثية تؤثر على تنظيم الشهية والشبع في الدماغ",
            "وجود تاريخ عائلي لاضطرابات الأكل أو اضطرابات نفسية مثل القلق والاكتئاب"
        ]
    },
    {
        n: "٢", 
        color: "#3d1f4b", 
        title: "العوامل النفسية والشخصية:", 
        borderColor: "#552269", 
        items: [
            "المثالية المفرطة (Perfectionism): السعي للكمال والشعور بالذنب عند عدم تحقيق معايير صارمة.",
            "انخفاض تقدير الذات: ربط القيمة الشخصية بالوزن أو شكل الجسم فقط.",
            "السيطرة الوهمية: محاولة التحكم في كميات الطعام بدقة متناهية للشعور بالسيطرة على الحياة.",
            "العقاب الذاتي: استخدام الرياضة الشاقة أو الصيام القاسي كعقاب على تناول 'أطعمة ممنوعة'.",
            "العزلة الاجتماعية: تجنب التجمعات هرباً من تعليقات الآخرين أو مواجهة الطعام."
        ]
    },
    {
        n: "٣", 
        color: "#7a7a9a", 
        title: "العوامل البيئية والمجتمعية", 
        borderColor: "#a58e8e", 
        items: [
            "ثقافة النحافة: الضغوط المجتمعية ووسائل التواصل التي تروج لمعايير جمالية غير واقعية",
            "التربية والبيئة الأسرية: التركيز المفرط على الوزن أو المظهر داخل المنزل، أو النقد المستمر للجسم",
            "الصدمات النفسية: التعرض للتنمر، أو سوء المعاملة، أو فقدان السيطرة في جوانب أخرى من الحياة",
            "الضغط المدرسي أو الأكاديمي: الشعور بالوحدة أو غياب بيئة داعمة وصحية نفسياً",
            "ضعف الدعم الاجتماعي: التوتر المستمر والسعي للكمال قد يزيد من خطر اضطرابات الأكل"
        ]
    },
];

function Causes() {
    return (
        <FadeSection>
            <span style={s.label}>الأسباب</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>من أين يأتي </span><span style={{ color: COLORS.accent }}>اضطراب الأكل</span></h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {CAUSES.map((c, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 20, alignItems: "start" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "1.2rem", color: "#fff", background: "linear-gradient(135deg, #af6c86, #e2d0eb)", boxShadow: "0 4px 10px rgba(175, 108, 134, 0.2)", flexShrink: 0 }}>{c.n}</div>
                            {i < CAUSES.length - 1 && <div style={{ width: 1, height: "100%", minHeight: 40, background: `linear-gradient(to bottom, #af6c8650, transparent)`, marginTop: 4 }} />}
                        </div>
                        <div style={{
                            marginBottom: 0,
                            background: "#ffffff",
                            border: `2.5px solid ${c.borderColor}`,
                            borderRadius: "25px",
                            padding: "1.5rem 2rem",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
                        }}>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: c.color, fontSize: "1.05rem", marginBottom: 14 }}>{c.title}</div>
                            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                                {c.items.map((item, idx) => (
                                    <li key={idx} style={{ 
                                        padding: "0.6rem 0", 
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
                        </div>
                    </div>
                ))}
            </div>
        </FadeSection>
    );
}

// ── MALADAPTIVE ───────────────────────────────────────────────────────────
const MALAD = [
    { icon: "⚖️", title: "السيطرة الوهمية", en: "Illusion of Control", desc: "التركيز المهووس على الميزان لتعويض فقدان السيطرة في الحياة.", color: COLORS.accent },
    { icon: "😶", title: "التخدير العاطفي", en: "Emotional Numbing", desc: "استخدام نهم الطعام لتخدير المشاعر الصعبة كالحزن أو الوحدة.", color: COLORS.accent },
    { icon: "🥊", title: "العقاب الذاتي", en: "Self-Punishment", desc: "الحرمان الشديد أو الرياضة القاسية كوسيلة لتفريغ كره الذات.", color: COLORS.accent },
    { icon: "🙅", title: "تجنب المواجهة", en: "Social Avoidance", desc: "الانسحاب من التجمعات هرباً من التوتر المرتبط بالأكل وحكم الآخرين.", color: COLORS.accent },
    { icon: "🍽️", title: "الهروب عبر الطقوس", en: "Ritualized Behavior", desc: "قضاء وقت طويل في ترتيب الطعام لتعطيل القلق المرتبط بالأكل.", color: COLORS.accent },
    { icon: "🌀", title: "الانفصال عن الواقع", en: "Dissociation", desc: "الوصول لحالة الخدر الذهني أثناء نوبات النهم للانفصال عن المشاعر.", color: COLORS.accent },
    { icon: "🧹", title: "التطهير العاطفي", en: "Emotional Purging", desc: "الاعتقاد بأن السلوكيات التعويضية هي وسيلة 'لتنظيف' النفس من المشاعر السيئة، مما يديم حلقة الاضطراب.", color: COLORS.accent },
];

function Maladaptive() {
    return (
        <FadeSection>
            <span style={s.label}>آليات التكيف</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>حين تُخطئ </span><span style={{ color: COLORS.accent }}>طريقة التعامل</span></h2>
            <p style={{ fontSize: "0.875rem", color: "#5d5c5d", marginBottom: 28, lineHeight: 1.7 }}>هي استجابات سلوكية مختلة توفر راحة مؤقتة، لكنها تزيد من تأثير الاضطراب وتُفاقم عواقبه الجسدية والنفسية على المدى الطويل.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                    {MALAD.slice(0, 4).map((m, i) => (
                        <div key={i}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(122, 77, 104, 0.12)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                            style={{ ...s.card, paddingTop: "1rem", flex: "1 1 260px", maxWidth: "calc(25% - 12px)", minWidth: "260px", minHeight: "180px" }}>
                            <div style={{ fontSize: 24, marginBottom: 10, lineHeight: 1, marginTop: "-0.25rem" }}>{m.icon}</div>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#3d1f4b", fontSize: "0.95rem", marginBottom: 4 }}>{m.title}</div>
                            <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10, letterSpacing: "0.05em" }}>{m.en}</div>
                            <p style={{ fontSize: "0.85rem", color: "#5d5c5d", lineHeight: 1.7, margin: 0, fontWeight: "600" }}>{m.desc}</p>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                    {MALAD.slice(4, 6).map((m, i) => (
                        <div key={i + 4}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(122, 77, 104, 0.12)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                            style={{ ...s.card, paddingTop: "1rem", flex: "1 1 260px", maxWidth: "calc(50% - 12px)", minWidth: "260px", minHeight: "180px" }}>
                            <div style={{ fontSize: 24, marginBottom: 10, lineHeight: 1, marginTop: "-0.25rem" }}>{m.icon}</div>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#3d1f4b", fontSize: "0.95rem", marginBottom: 4 }}>{m.title}</div>
                            <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10, letterSpacing: "0.05em" }}>{m.en}</div>
                            <p style={{ fontSize: "0.85rem", color: "#5d5c5d", lineHeight: 1.7, margin: 0, fontWeight: "600" }}>{m.desc}</p>
                        </div>
                    ))}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                    {MALAD.slice(6, 7).map((m, i) => (
                        <div key={i + 6}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(122, 77, 104, 0.12)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                            style={{ ...s.card, paddingTop: "1rem", flex: "1 1 260px", maxWidth: "800px", minWidth: "260px", minHeight: "140px" }}>
                            <div style={{ fontSize: 24, marginBottom: 10, lineHeight: 1, marginTop: "-0.25rem" }}>{m.icon}</div>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#3d1f4b", fontSize: "0.95rem", marginBottom: 4 }}>{m.title}</div>
                            <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10, letterSpacing: "0.05em" }}>{m.en}</div>
                            <p style={{ fontSize: "0.85rem", color: "#5d5c5d", lineHeight: 1.7, margin: 0, fontWeight: "600" }}>{m.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </FadeSection>
    );
}

// ── PERSONALITY ───────────────────────────────────────────────────────────
const TRAITS = [
    { ar: "المثالية والكمال", en: "Perfectionism", desc: "دافع مهووس للوصول إلى الوزن 'المثالي' أو الالتزام بنظام صارم." },
    { ar: "الحساسية للنقد", en: "Sensitivity", desc: "ألم شديد من أي تعليق يخص المظهر أو كمية الأكل أو أسلوب الحياة." },
    { ar: "انخفاض التوافقية", en: "Low Agreeableness", desc: "بسبب الجوع المستمر قد تصبح الشخصية أكثر حدة وأقل مرونة." },
    { ar: "فرط اليقظة للجسم", en: "Hypervigilance", desc: "فحص دائم للمرآة، قياس وزن متكرر، وتتبع كل تغير بسيط." },
    { ar: "هيمنة القلق", en: "Anxiety Dominance", desc: "سيطرة القلق حول الطعام والجسم على التفكير واتخاذ القرارات." },
    { ar: "عدم الاستقرار العاطفي", en: "Instability", desc: "تقلبات مزاجية حادة بسبب تأثير الجوع أو الهوس بصورة الجسم." },
    { ar: "فقدان الهوية", en: "Loss of Identity", desc: "تلاشي الاهتمامات وتحول التفكير بالكامل حول الوزن والطعام." },
    { ar: "الاعتمادية العاطفية", en: "Dependency", desc: "البحث عن تأكيد الآخرين حول المظهر لتعزيز القيمة الذاتية." },
];

function Personality() {
    return (
        <FadeSection>
            <span style={s.label}>السمات الشخصية</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: COLORS.accent }}>اضطراب الأكل </span><span style={{ color: "#3d1f4b" }}>يُغيّر شخصيتك</span></h2>
            <p style={{ fontSize: "0.875rem", color: COLORS.muted, marginBottom: 24 }}>العيش مع اضطراب أكل مزمن يحدث تغييرات في شخصيتك بمرور الوقت.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {TRAITS.map((t, i) => (
                    <div key={i}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateX(-12px)"; e.currentTarget.style.borderColor = "#3d1f4b"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = COLORS.border; }}
                        style={{ ...s.card, display: "grid", gridTemplateColumns: "min(200px,40%) 1fr", gap: 16, alignItems: "start" }}>
                        <div>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#3d1f4b", fontSize: "0.95rem" }}>{t.ar}</div>
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
    { n: "١", label: "PREFRONTAL CORTEX · قشرة الفص الجبهي", color: COLORS.accent, text: "خلل في التفكير المنطقي، فتسيطر الأفكار القهرية وتضعف القدرة على تقييم مخاطر الجوع." },
    { n: "٢", label: "REWARD SYSTEM · مركز المكافأة", color: COLORS.accent, text: "يصبح الدماغ فائق الحساسية للمكافأة (في النهم) أو يفقد استشعار المتعة (في فقدان الشهية)." },
    { n: "٣", label: "HYPOTHALAMUS · تحت المهاد", color: COLORS.accent, text: "اضطراب حلقة الوصل، مما يؤدي لتوقف إشارات الجوع أو الشبع الحقيقية." },
    { n: "٤", label: "AMYGDALA · اللوزة الدماغية", color: COLORS.accent, text: "تصبح مفرطة النشاط، مما يولد ذعراً عند رؤية طعام 'ممنوع' أو تغير في الوزن." },
    { n: "٥", label: "INSULA · القشرة الجزيرية", color: COLORS.accent, text: "خلل في معالجة الإشارات الداخلية، مما يسبب تشوه صورة الجسم ورؤية النفس كسمين." },
    { n: "٦", label: "NEUROTRANSMITTERS · الناقلات العصبية", color: COLORS.accent, text: "انخفاض السيروتونين يسبب زيادة الوسواس القهري تجاه الأرقام والسعرات." },
];

function BrainStep({ step, index }) {
    const [ref, visible] = useFadeIn();
    return (
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 16, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(20px)", transition: `opacity 0.5s ${index * 0.12}s ease, transform 0.5s ${index * 0.12}s ease` }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: "#fff", border: `2px solid ${COLORS.accent}`, background: COLORS.accent, flexShrink: 0 }}>{step.n}</div>
                {index < BRAIN_STEPS.length - 1 && <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${COLORS.accent}, transparent)`, margin: "4px 0" }} />}
            </div>
            <div style={{ ...s.card, marginBottom: 12, borderColor: COLORS.accent }}>
                <div style={{ fontSize: 12, color: "#3d1f4b", letterSpacing: "0.1em", marginBottom: 6, fontWeight: "900", fontFamily: "'Tajawal', sans-serif" }}>{step.label}</div>
                <p style={{ fontSize: "0.875rem", color: "#3d1f4b", lineHeight: 1.8, margin: 0, fontWeight: "700" }}>
                    {step.text.split('،')[0]}،
                    <span style={{ color: "#5d5c5d", fontWeight: "600" }}>{step.text.split('،').slice(1).join('،')}</span>
                </p>
            </div>
        </div>
    );
}

function BrainJourney() {
    return (
        <FadeSection>
            <span style={s.label}>علم الأعصاب</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>رحلة داخل </span><span style={{ color: COLORS.accent }}>دماغك</span></h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {BRAIN_STEPS.map((step, i) => <BrainStep key={i} step={step} index={i} />)}
            </div>
            <div style={{ background: "rgba(122, 77, 104, 0.06)", border: "1px solid rgba(122, 77, 104, 0.2)", borderRadius: 14, padding: "1.5rem", marginTop: 16 }}>
                <p style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#3d1f4b", marginBottom: 16, fontSize: "0.95rem" }}>النتيجة المباشرة:</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
                    {[
                        { title: "سوء التغذية (فقدان الشهية)", color: "#3d1f4b", items: ["بطء ضربات القلب", "خمول وإرهاق ذهني", "هشاشة العظام"] },
                        { title: "نوبات النهم (البوليميا)", color: COLORS.accent, items: ["اختلال أملاح الدم", "تآكل مينا الأسنان", "تغيرات سكر الدم"] },
                    ].map((col, idx) => (
                        <div key={col.title}>
                            <p style={{ fontSize: "0.95rem", color: col.color, fontWeight: "900", letterSpacing: "0.05em", marginBottom: 12 }}>{col.title}</p>
                            {col.items.map((it, i) => (
                                <div key={i} style={{ fontSize: "0.85rem", color: "#5d5c5d", fontWeight: "600", padding: "0.4rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "flex", gap: 8, alignItems: "center" }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: col.color, flexShrink: 0 }} />{it}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </FadeSection>
    );
}

// ── TREATMENT ─────────────────────────────────────────────────────────────
const TREATMENTS = [
    { icon: "🧩", en: "Cognitive Behavioral Therapy", title: "١. العلاج السلوكي المعرفي (CBT)", color: "#3d1f4b", pts: [["تعديل الأفكار:", "تحدي الأفكار السلبية حول الوزن والشكل بالمنطق."], ["كسر الدائرة:", "إنهاء الأكل العاطفي أو التقييد عبر التعرض المنظم."], ["بناء العلاقة:", "بناء علاقة صحية مع الطعام بعيداً عن مشاعر الذنب."], ["إدارة المشاعر:", "تعلم مهارات بديلة للأكل للتعامل مع الضغوط Patterns."]] },
    { icon: "💊", en: "Pharmacotherapy", title: "٢. العلاج الدوائي", color: "#7a4d68", pts: [["مضادات الاكتئاب:", "تستخدم لتقليل نوبات الشره وتخفيف القلق."], ["تنظيم المزاج:", "تقليل التوتر المستمر المرتبط بصورة الجسم."], ["إشراف طبي:", "يستخدم دائماً كداعم للعلاج النفسي وتحت إشراف دقيق."]] },
    { icon: "✨", en: "Integrated Treatment", title: "٣. العلاج المتكامل", color: "#d68cb9", badge: "الأفضل نتائج", pts: [["المعيار الذهبي:", "الجمع بين النفسي والغذائي والدوائي هو الأفضل."], ["دعم التغذية:", "متابعة مع أخصائي تغذية متخصص في اضطرابات الأكل."], ["إشراك العائلة:", "بناء بيئة داعمة وآمنة في المنزل خاصة للشباب."]] },
    { icon: "🌿", en: "Lifestyle", title: "٤. نمط الحياة والدعم", color: "#3a6e4f", pts: [["روتين غذائي:", "تناول وجبات في أوقات ثابتة لتنظيم إشارات الجوع."], ["نشاط معتدل:", "التمارين يجب أن تكون للصحة لا للعقاب الجسدي."], ["تواصل اجتماعي:", "تقليل التعرض للمحتوى الذي يعزز صوراً غير واقعية."]] },
];

function Treatment() {
    const [open, setOpen] = useState(-1);
    return (
        <FadeSection>
            <span style={s.label}>العلاج</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>طريقك نحو </span><span style={{ color: COLORS.accent }}>التعافي</span></h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
        </FadeSection>
    );
}

// ── APP ───────────────────────────────────────────────────────────────────
export default function EatingDisorderDetail() {
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@300;400;600;700;900&display=swap";
        document.head.appendChild(link);
        const style = document.createElement("style");
        style.textContent = `@keyframes fadeIn { from { opacity:0 } to { opacity:1 } } ::-webkit-scrollbar { width:4px } ::-webkit-scrollbar-thumb { background:#7a4d68; border-radius:2px }`;
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
                    <Link to="/disease/ptsd" style={{ textDecoration: 'none' }}>
                        <div onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = "#493054"; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = "#3d1f4b"; }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 1.5rem', background: '#3d1f4b', color: 'white', borderRadius: '50px', fontSize: '1rem', fontWeight: 'bold', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 8px 20px rgba(61, 31, 75, 0.25)', fontFamily: "'Tajawal', sans-serif" }}>
                            <span>اضطراب PTSD</span>
                            <span style={{ fontSize: '1.2rem', marginTop: -2 }}>←</span>
                        </div>
                    </Link>
                </div>
                <div style={{ textAlign: "center", padding: "2.5rem 1.5rem", borderTop: `1px solid ${COLORS.border}`, fontSize: 13, color: COLORS.muted }}>
                    هذا المحتوى لأغراض تثقيفية فقط · إذا كنت تعاني من أعراض اضطراب الأكل، تحدث مع <span style={{ color: "#3d1f4b" }}>متخصص نفسي</span>
                </div>
            </div>
        </div>
    );
}
