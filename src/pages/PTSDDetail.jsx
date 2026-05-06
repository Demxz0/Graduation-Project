import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const COLORS = {
    bg: "#f4f4ff",
    bg2: "#eeeeff",
    coral: "#8a6366", // PTSD Theme color (replacing orange)
    teal: "#5c7f94",
    lavender: "#8a6366",
    gold: "#8a6366",
    white: "#1a1a2e",
    accent: "#8a6366",
    muted: "#7a7a9a",
    border: "rgba(138, 99, 102, 0.2)",
    card: "rgba(138, 99, 102, 0.06)",
};

const s = {
    page: { fontFamily: "'Tajawal', sans-serif", background: COLORS.bg, color: COLORS.white, direction: "rtl", minHeight: "100vh", overflowX: "hidden" },
    section: { maxWidth: "min(1200px, 92vw)", margin: "0 auto", padding: "4rem clamp(1rem, 3vw, 3rem)" },
    label: { fontSize: 11, letterSpacing: "0.3em", color: COLORS.muted, textTransform: "uppercase", marginBottom: 10, display: "block" },
    h2: { fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "clamp(1.8rem,5vw,2.5rem)", lineHeight: 1.2, marginBottom: "1.5rem" },
    card: { background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "1.25rem 1.5rem", transition: "all 0.3s ease" },
    divider: { display: "flex", alignItems: "center", gap: 16, padding: "0 1.5rem", maxWidth: "min(1200px, 92vw)", margin: "0 auto" },
    divLine: { flex: 1, height: 1, background: COLORS.border },
    divDot: { width: 6, height: 6, borderRadius: "50%", background: COLORS.coral },
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem 1.5rem 6.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #f5edee 0%, #fcf9f9 100%)", boxShadow: "inset 0 60px 100px -30px rgba(0,0,0,0.04)" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(138, 99, 102, 0.08) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(138, 99, 102, 0.05) 0%, transparent 50%)", pointerEvents: "none" }} />
            <p style={{ ...fade(0.2), fontSize: 11, letterSpacing: "0.3em", color: COLORS.muted, textTransform: "uppercase", marginBottom: 28 }}>الاضطرابات النفسية · اضطراب ما بعد الصدمة</p>
            <h1 style={{ ...fade(0.4), fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem,6vw,4rem)", lineHeight: 1.1, margin: 0 }}>
                <span style={{ display: "block", color: COLORS.coral }}>الأحداث تنتهي...</span>
                <span style={{ display: "block", color: COLORS.coral }}>ويبقى الأثر</span>
            </h1>
            <div style={{ ...fade(0.6), width: 60, height: 2, background: `linear-gradient(90deg, ${COLORS.coral}, #5d4345)`, margin: "1.75rem auto" }} />
            <p style={{ ...fade(0.8), fontSize: "1.05rem", color: "rgba(26,26,46,0.65)", maxWidth: 480, lineHeight: 1.8 }}>
                PTSD ليس ضعفاً، هو استجابة دماغك لتجربة قاسية، يعيش معه <strong style={{ color: COLORS.coral }}>أكثر من ٣٠٠ مليون شخص</strong> حول العالم.
            </p>
        </div>
    );
}

// ── DEFINITION ────────────────────────────────────────────────────────────
function Definition() {
    return (
        <FadeSection>
            <span style={s.label}>التعريف</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>ما هو </span><span style={{ color: COLORS.coral }}>PTSD؟</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
                {[
                    { title: "الاستجابة الطبيعية", color: "#3d1f4b", text: "من الطبيعي الشعور بالضيق والحزن بعد تجربة صادمة. الدماغ يمر بمرحلة معالجة طبيعية تنتهي تدريجياً مع مرور الوقت." },
                    { title: "اضطراب ما بعد الصدمة", color: COLORS.coral, text: "استجابة دماغية ممتدة لحدث يهدد الحياة، حيث يظل الجهاز العصبي في حالة تأهب دائم وكأن الخطر لم ينتهِ أبداً." },
                ].map(({ title, color, text }) => (
                    <div key={title}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = `0 15px 35px ${COLORS.coral}15`; }}
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
  { n: "١", en: "C-PTSD", ar: "ما بعد الصدمة المعقد", color: "#552269", pts: ["ينتج عن صدمات متكررة أو طويلة الأمد (مثل الإساءة المزمنة في الطفولة).", "يتميز بصعوبة في تنظيم العواطف ومشاكل حادة في تحديد الهوية والعلاقات.", "يشعر الشخص بأنه 'مكسور بشكل جوهري' بسبب عمق تأثير الصدمة على شخصيته."] },
  { n: "٢", en: "Dissociative Subtype", ar: "النمط الانفصامي", color: "#8a354c", pts: ["يعاني المصاب من 'تبدد الشخصية' — الشعور بالانفصال عن الجسد كأنه يراقب نفسه.", "أو 'الغربة عن الواقع' — الشعور بأن العالم من حوله غير حقيقي أو يشبه الحلم.", "هي آلية دفاع دماغية لحماية الشخص من ألم عاطفي لا يمكن احتماله."] },
  { n: "٣", en: "Delayed Expression", ar: "ذو التعبير المتأخر", color: "#2a6275", pts: ["لا تكتمل معايير التشخيص إلا بعد مرور ٦ أشهر على الأقل من وقوع الحدث الصادم.", "التأخر في ظهور الأعراض الكاملة قد يُربك الشخص ويجعله يشك في مشاعره.", "يرتبط أحياناً بتغيرات حياتية كبيرة تُفعّل الصدمة الكامنة من جديد."] },
  { n: "٤", en: "Preschool PTSD", ar: "ما بعد الصدمة لدى الأطفال", color: "#7571b8", pts: ["مخصص للأطفال في عمر ٦ سنوات أو أقل، حيث يختلف التعبير عن الصدمة جذرياً.", "تظهر الأعراض من خلال اللعب المتكرر والقهري الذي يعيد تمثيل الحدث الصادم.", "أو تظهر ككوابيس مخيفة لا يستطيع الطفل شرح محتواها أو ربطها بحدث."] },
  { n: "٥", en: "Acute Stress Disorder", ar: "اضطراب التوتر الحاد", color: "#ad6c34", pts: ["استجابة صدمة حادة تظهر فوراً وتستمر من ٣ أيام إلى شهر واحد.", "إذا استمرت الأعراض لأكثر من شهر، يتم إعادة التشخيص كـ PTSD كامل.", "تتميز بنفس أعراض الصدمة لكنها ضمن إطار زمني قصير ومحدد."] },
];

function Types() {
    const [open, setOpen] = useState(-1);
    return (
        <FadeSection>
            <span style={s.label}>الأنواع</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>أنواع </span><span style={{ color: COLORS.coral }}>الاضطراب</span><span style={{ color: "#3d1f4b" }}> وأشكاله</span></h2>
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
                                            <li key={j} style={{ fontSize: "0.85rem", color: "rgba(26,26,46,0.7)", padding: "0.4rem 0", borderBottom: j < t.pts.length - 1 ? "1px solid rgba(138, 99, 102, 0.1)" : "none", lineHeight: 1.7 }}>
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
    { label: "الاقتحامية", id: "intrusion", color: "#3d1f4b", items: ["ذكريات مؤلمة ومتكررة تظهر دون إرادة", "كوابيس مزعجة تشابه مشاعر الحدث", "فلاشباك: الشعور بأن الحدث يتكرر الآن", "فقدان الوعي بالمحيط في الحالات الشديدة", "تسارع ضربات القلب عند المثيرات", "زيادة التعرق عند التذكّر"] },
    { label: "التجنب", id: "avoidance", color: "#8a6366", items: ["تجنب الأفكار والمشاعر المرتبطة بالحدث", "تجنب الذكريات الداخلية بكل الوسائل", "الابتعاد عن الأشخاص المرتبطين بالصدمة", "تجنب الأماكن والمحادثات المثيرة للذكرى", "الانسحاب من الأنشطة الممتعة سابقاً", "تجاهل أي محفز خارجي يذكر بالحدث"] },
    { label: "المعرفة والمزاج", id: "cognitive", color: "#7a7a9a", items: ["فجوات الذاكرة: عجز عن تذكر أجزاء", "معتقدات مشوهة: 'أنا سيء' أو 'العالم خطر'", "لوم الذات أو الآخرين بشكل غير منطقي", "مشاعر رعب وغضب وخزي مستمرة", "الانفصال العاطفي عن الأسرة والأصدقاء", "صعوبة في الشعور بالسعادة"] },
    { label: "الاستثارة", id: "arousal", color: "#c1232b", items: ["نوبات غضب مفاجئة وسلوك عدواني", "السلوك المتهور والأفعال الخطيرة", "اليقظة المفرطة وترقب الخطر الدائم", "رد فعل الجفلة المبالغ فيه", "صعوبة شديدة في التركيز اليومي", "اضطرابات النوم والكوابيس المزعجة"] },
];

function Symptoms() {
    const [tab, setTab] = useState(0);
    const cur = TABS[tab];
    return (
        <FadeSection>
            <span style={s.label}>الأعراض</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>كيف يظهر </span><span style={{ color: COLORS.coral }}>PTSD</span><span style={{ color: "#3d1f4b" }}> في جسدك وعقلك؟</span></h2>
            <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 24, overflowX: "auto" }}>
                {TABS.map((t, i) => (
                    <button key={i} onClick={() => setTab(i)} style={{ background: "none", border: "none", color: tab === i ? "#3d1f4b" : COLORS.muted, fontWeight: tab === i ? "bold" : "normal", fontFamily: "'Tajawal', sans-serif", fontSize: "0.95rem", padding: "0.65rem 1.1rem", cursor: "pointer", borderBottom: `2px solid ${tab === i ? "#3d1f4b" : "transparent"}`, marginBottom: -1, whiteSpace: "nowrap", transition: "color 0.3s" }}>{t.label}</button>
                ))}
            </div>
            {tab < 3 ? (
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
            ) : (
                <div style={{ background: "rgba(193,35,43,0.06)", border: "2px solid rgba(193,35,43,0.5)", borderRadius: 14, padding: "1.5rem" }}>
                    <p style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#c1232b", marginBottom: 16, fontSize: "1.1rem" }}>⚡ تنبيه: تتميز أعراض الاستثارة بردود فعل حادة وحالة تأهب دائم للجهاز العصبي:</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
                        {[
                            { title: "سلوكيات حادة ومفاجئة", items: ["نوبات غضب مفاجئة وسلوك عدواني تجاه المحيط", "السلوك المتهور والأفعال الخطيرة دون تفكير", "رد فعل الجفلة المبالغ فيه (الفزع من الأصوات أو الحركات)"] },
                            { title: "يقظة وتوتر مستمر", items: ["اليقظة المفرطة وترقب الخطر الدائم في كل مكان", "صعوبة شديدة في التركيز اليومي وتشتت الانتباه", "اضطرابات النوم الشديدة والكوابيس المتكررة"] },
                        ].map(col => (
                            <div key={col.title}>
                                <p style={{ fontSize: "0.95rem", color: "#c1232b", fontWeight: "900", marginBottom: 12 }}>{col.title}</p>
                                {col.items.map((it, i) => (
                                    <div key={i} style={{ fontSize: "0.9rem", color: "#3d1f4b", fontWeight: "bold", padding: "0.4rem 0", borderBottom: "1px solid rgba(193,35,43,0.15)", display: "flex", gap: 8, alignItems: "flex-start" }}>
                                        <span style={{ color: "#c1232b", flexShrink: 0, fontSize: "0.9rem", marginTop: 2 }}>⚡</span>{it}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </FadeSection>
    );
}

// ── CAUSES ────────────────────────────────────────────────────────────────
const CAUSES = [
    {
        n: "١", label: "طبيعة الصدمة", color: "#3d1f4b", title: "طبيعة الصدمة والتعرض", circleBg: "linear-gradient(135deg, #3d1f4b, #8a6366)", circleColor: "#fff", borderColor: "#3d1f4b", content: (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["التعرض المباشر لحدث مهدد للحياة كالحوادث والحروب.", "مشاهدة صدمة تصيب شخصاً آخر أو التعرف عليها لقريب.", "التعرض المتكرر لتفاصيل الصدمات (كالعاملين في الطب).", "شدة الحدث ومدى استمراريته تزيد من احتمالية الإصابة."].map((p, i, a) => (
                    <li key={i} style={{ fontSize: "0.875rem", color: "#5d5c5d", padding: "0.5rem 0", borderBottom: i < a.length - 1 ? `1px solid rgba(0,0,0,0.05)` : "none", lineHeight: 1.7, fontWeight: "600" }}>{p}</li>
                ))}
            </ul>
        )
    },
    {
        n: "٢", label: "شخصية", color: "#8a6366", title: "عوامل الخطر والبيئة", circleBg: "linear-gradient(135deg, #8a6366, #a88285)", circleColor: "#fff", borderColor: "#8a6366", content: (
            <div>
                <p style={{ fontSize: "0.875rem", color: "#5d5c5d", marginBottom: 14, lineHeight: 1.7, fontWeight: "600" }}>العوامل التي ترفع خطر الإصابة:</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["صدمات الطفولة", "الاستعداد الجيني", "غياب الدعم", "صدمات متعددة", "ضعف التكيف"].map(tag => (
                        <span key={tag} style={{ background: "rgba(138, 99, 102, 0.15)", color: "#5d5c5d", borderRadius: 50, padding: "4px 12px", fontSize: "0.75rem", fontWeight: "bold" }}>{tag}</span>
                    ))}
                </div>
            </div>
        )
    },
    {
        n: "٣", label: "بيولوجية", color: "#7a7a9a", title: "العوامل البيولوجية والعصبية", circleBg: "linear-gradient(135deg, #a88285, #c9a5a8)", circleColor: "#fff", borderColor: "#7a7a9a", content: (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["نقص حجم الحُصين يجعل الدماغ يعالج الصدمة كحاضر.", "فرط نشاط اللوزة يُطلق إنذارات الخطر بأدنى محفز.", "اختلال الكورتيزول يجعل الجسم في حالة تعبئة مستمرة.", "صعوبة في تنظيم ردود الفعل العصبية التلقائية."].map((p, i, a) => (
                    <li key={i} style={{ fontSize: "0.875rem", color: "#5d5c5d", padding: "0.5rem 0", borderBottom: i < a.length - 1 ? `1px solid rgba(0,0,0,0.05)` : "none", lineHeight: 1.7, fontWeight: "600" }}>{p}</li>
                ))}
            </ul>
        )
    },
];

function Causes() {
    return (
        <FadeSection>
            <span style={s.label}>الأسباب</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>من أين يأتي </span><span style={{ color: COLORS.coral }}>PTSD؟</span></h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {CAUSES.map((c, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 20, alignItems: "start" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: c.circleColor || c.color, border: c.circleBg ? "none" : `1px solid ${c.color}`, background: c.circleBg || `${c.color}18`, flexShrink: 0 }}>{c.n}</div>
                            {i < CAUSES.length - 1 && <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)`, marginTop: 4 }} />}
                        </div>
                        <div style={{
                            marginBottom: 0,
                            background: "#ffffff",
                            border: `2px solid ${c.borderColor}`,
                            borderRadius: "20px",
                            padding: "1.5rem",
                            boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
                        }}>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: c.color, fontSize: "1.05rem", marginBottom: 14 }}>{c.title}</div>
                            {c.content}
                        </div>
                    </div>
                ))}
            </div>
        </FadeSection>
    );
}

// ── MALADAPTIVE ───────────────────────────────────────────────────────────
const MALAD = [
    { icon: "🏃", title: "التجنب المزمن", en: "Chronic Avoidance", desc: "الهروب من الأفكار والأماكن المرتبطة، مما يُبقي الدماغ في حالة خوف.", color: COLORS.accent },
    { icon: "😶", title: "التخدير العاطفي", en: "Emotional Numbing", desc: "إغلاق جميع المشاعر، مما يُشعر الشخص بالفراغ والانفصال عن الحياة.", color: COLORS.accent },
    { icon: "🍷", title: "تعاطي المواد", en: "Substance Use", desc: "تخدير الذاكرة للبقاء بعيداً عن الفلاشباك، مما يُحكم قبضة الصدمة.", color: COLORS.accent },
    { icon: "😤", title: "فرط اليقظة والتحكم", en: "Hypervigilance", desc: "محاولة السيطرة الصارمة على كل شيء لمنع أي مفاجأة غير سارة.", color: COLORS.accent },
    { icon: "🙅", title: "الانعزال الاجتماعي", en: "Social Withdrawal", desc: "الانسحاب خشية الحكم أو الأذى، مما يُعمّق العزلة والاكتئاب.", color: COLORS.accent },
    { icon: "😔", title: "إلقاء اللوم على الذات", en: "Self-Blame", desc: "تحميل النفس مسؤولية ما حدث كمحاولة لاستعادة الإحساس بالتحكم.", color: COLORS.accent },
    { icon: "🔁", title: "حلقة الصدمة المكررة", en: "Trauma Loop", desc: "التجنب يُريح مؤقتاً لكنه يُعلّم الدماغ أن المحفز خطير فعلاً، فيزداد القلق وتضيق الحياة.", color: COLORS.accent },
];

function Maladaptive() {
    return (
        <FadeSection>
            <span style={s.label}>آليات التكيف</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>حين تُخطئ </span><span style={{ color: COLORS.coral }}>طريقة التعامل</span></h2>
            <p style={{ fontSize: "0.875rem", color: "#5d5c5d", marginBottom: 28, lineHeight: 1.7 }}>هي استجابات تبدو منطقية للبقاء بأمان على المدى القصير، لكنها تُديم الصدمة وتُعمّقها وتُضيّق آفاق الحياة تدريجياً على المدى الطويل.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                    {MALAD.slice(0, 4).map((m, i) => (
                        <div key={i} 
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(138, 99, 102, 0.12)"; }}
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
                        <div key={i+4} 
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(138, 99, 102, 0.12)"; }}
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
                        <div key={i+6} 
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(138, 99, 102, 0.12)"; }}
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
    { ar: "فرط اليقظة المزمن", en: "Hypervigilance", desc: "حالة رادار دائم لا يتوقف يمسح البيئة بحثاً عن التهديدات." },
    { ar: "الانسحاب الاجتماعي", en: "Withdrawal", desc: "ميل لتجنب الناس خشية إعادة تنشيط الذكريات المؤلمة." },
    { ar: "الكمالية الدفاعية", en: "Perfectionism", desc: "السيطرة على كل التفاصيل لمنع الخسارة أو المفاجأة مجدداً." },
    { ar: "العصابية العالية", en: "Neuroticism", desc: "ميل لتجربة المشاعر السلبية والاستجابة بقوة لمحفزات صغيرة." },
    { ar: "فقدان الثقة بالعالم", en: "World Distrust", desc: "اعتقاد جوهري بأن العالم مكان خطر ولا يمكن الوثوق بأحد." },
    { ar: "الانفصال العاطفي", en: "Detachment", desc: "صعوبة في الشعور بالإيجابية أو تكوين روابط عاطفية عميقة." },
    { ar: "الاندفاعية العاطفية", en: "Impulsivity", desc: "انفجارات عاطفية مفاجئة مكثفة ناجمة عن جهاز عصبي متأهب." },
    { ar: "لوم الذات المزمن", en: "Self-Blame", desc: "انشغال مستمر بالتساؤل عن المسؤولية، مما يولد اكتئاباً مزمناً." },
];

function Personality() {
    return (
        <FadeSection>
            <span style={s.label}>السمات الشخصية</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: COLORS.coral }}>PTSD </span><span style={{ color: "#3d1f4b" }}>يُغيّر شخصيتك</span></h2>
            <p style={{ fontSize: "0.875rem", color: COLORS.muted, marginBottom: 24 }}>العيش مع PTSD مزمن يحدث تغييرات في شخصيتك بمرور الوقت.</p>
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
    { n: "١", label: "AMYGDALA · اللوزة الدماغية", color: "#8a6366", text: "تصبح مفرطة النشاط، تُطلق إنذارات خوف بأدنى محفز يشبه الصدمة حتى ولو كان آمناً." },
    { n: "٢", label: "HIPPOCAMPUS · الحُصين", color: "#8a6366", text: "ينكمش حجمه، فيفشل في تصنيف الذكريات زمنياً، مما يبقي ذكرى الصدمة 'طازجة' لا ماضية." },
    { n: "٣", label: "PREFRONTAL CORTEX · قشرة الفص الجبهي", color: "#8a6366", text: "تضعف قدرتها على كبح ردود الفعل العصبية وإقناع الدماغ بأن الخطر قد انتهى فعلاً." },
    { n: "٤", label: "MEDIAL PFC · القشرة الإنسية", color: "#8a6366", text: "يقل نشاطها، مما يُفسر صعوبة التعبير عن الصدمة وربط المشاعر بالكلمات بوضوح." },
    { n: "٥", label: "NEUROTRANSMITTERS · الناقلات العصبية", color: "#8a6366", text: "اختلال في الكورتيزول والأدرينالين ونقص السيروتونين، مما يُديم حالة التأهب." },
    { n: "٦", label: "DEFAULT MODE NETWORK · الشبكة الافتراضية", color: "#8a6366", text: "تبقى نشطة بشكل غير منتظم، مما يجعل العقل يعود قسراً للحظات الصدمة بدل الهدوء." },
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
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>رحلة داخل </span><span style={{ color: COLORS.coral }}>دماغك</span></h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {BRAIN_STEPS.map((step, i) => <BrainStep key={i} step={step} index={i} />)}
            </div>
            <div style={{ background: "rgba(138, 99, 102, 0.06)", border: "1px solid rgba(138, 99, 102, 0.2)", borderRadius: 14, padding: "1.5rem", marginTop: 16 }}>
                <p style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#3d1f4b", marginBottom: 16, fontSize: "0.95rem" }}>النتيجة المباشرة:</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
                    {[
                        { title: "في لحظات الفلاشباك", color: "#c1232b", items: ["تسارع ضربات القلب", "ضيق في التنفس", "الشعور بأن الصدمة تقع الآن"] },
                        { title: "في الحياة اليومية", color: "#8a6366", items: ["صعوبة في الثقة بالآخرين", "إرهاق من حالة التأهب", "مشاعر انفصال عن المستقبل"] },
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
    { icon: "🧩", en: "Trauma-Focused Therapy", title: "١. العلاج النفسي التخصصي (EMDR/CBT)", color: "#3d1f4b", pts: [["EMDR:", "إعادة معالجة الذكرى لتصنيفها كـ'ماضٍ' لا كحاضر جارٍ."], ["TF-CBT:", "مواجهة الذكريات تدريجياً مع تحدي الأفكار المشوهة."], ["علاج PE:", "التعامل المنهجي مع المواقف المتجنبة لتعلم الأمان."], ["معالجة المعرفة:", "تغيير الأفكار الصلبة التي تلوّن رؤية العالم."]] },
    { icon: "💊", en: "Pharmacotherapy", title: "٢. العلاج الدوائي", color: "#8a6366", pts: [["SSRIs/SNRIs:", "لتنظيم السيروتونين وتخفيف أعراض الاقتحام والقلق."], ["Prazosin:", "لعلاج الكوابيس تحديداً وتحسين جودة النوم."], ["المثبتات المزاجية:", "للمساعدة في تنظيم ردود الأفعال العاطفية المكثفة."]] },
    { icon: "⚡", en: "Combined Treatment", title: "٣. العلاج المتكامل", color: "#8a6366", badge: "الأفضل نتائج", pts: [["دمج المسارين:", "الأدوية تهدئ اللوزة لتتيح الاستفادة من الجلسات النفسية."], ["الدعم المستمر:", "تحسين قدرة الجهاز العصبي على الاسترخاء التدريجي."]] },
    { icon: "🌿", en: "Lifestyle", title: "٤. نمط الحياة والدعم", color: "#3a6e4f", pts: [["تقنيات التأريض:", "قاعدة 5-4-3-2-1 الحسية لإيقاف الفلاشباك."], ["الاستقرار الجسدي:", "اليوغا والمشي لخفض الكورتيزول طبيعياً."], ["الأمان الاجتماعي:", "بناء شبكة دعم تتيح التعبير دون حكم مسبق."]] },
];

function Treatment() {
    const [open, setOpen] = useState(-1);
    return (
        <FadeSection>
            <span style={s.label}>العلاج</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>طريقك نحو </span><span style={{ color: COLORS.coral }}>التعافي</span></h2>
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
export default function PTSDDetail() {
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@300;400;600;700;900&display=swap";
        document.head.appendChild(link);
        const style = document.createElement("style");
        style.textContent = `@keyframes fadeIn { from { opacity:0 } to { opacity:1 } } ::-webkit-scrollbar { width:4px } ::-webkit-scrollbar-thumb { background:#8a6366; border-radius:2px }`;
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
                    <Link to="/disease/anxiety" style={{ textDecoration: 'none' }} onClick={() => window.scrollTo(0, 0)}>
                        <div onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = "#cf6d1d"; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = "#E67E22"; }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 1.5rem', background: '#E67E22', color: 'white', borderRadius: '50px', fontSize: '1rem', fontWeight: 'bold', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 8px 20px rgba(230, 126, 34, 0.25)', fontFamily: "'Tajawal', sans-serif" }}>
                            <span>اضطراب القلق</span>
                            <span style={{ fontSize: '1.2rem', marginTop: -2 }}>←</span>
                        </div>
                    </Link>
                </div>
                <div style={{ textAlign: "center", padding: "2.5rem 1.5rem", borderTop: `1px solid ${COLORS.border}`, fontSize: 13, color: COLORS.muted }}>
                    هذا المحتوى لأغراض تثقيفية فقط · إذا كنت تعاني من أعراض PTSD، تحدث مع <span style={{ color: COLORS.coral }}>متخصص نفسي</span>
                </div>
            </div>
        </div>
    );
}
