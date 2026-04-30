import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const COLORS = {
    bg: "#f4f4ff",
    bg2: "#eeeeff",
    coral: "#E67E22",
    teal: "#00C9A7",
    lavender: "#E67E22",
    gold: "#E67E22",
    white: "#1a1a2e",
    muted: "#7a7a9a",
    border: "rgba(214,147,106,0.2)",
    card: "rgba(214,147,106,0.06)",
};

const s = {
    page: { fontFamily: "'Tajawal', sans-serif", background: COLORS.bg, color: COLORS.white, direction: "rtl", minHeight: "100vh", overflowX: "hidden" },
    section: { maxWidth: "min(1200px, 92vw)",   margin: "0 auto",  padding: "4rem clamp(1rem, 3vw, 3rem)"  },
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
         <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem 1.5rem 6.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, rgba(239, 217, 182, 0.3) 0%, rgba(221, 188, 208, 0.3) 100%)", boxShadow: "inset 0 60px 100px -30px rgba(0,0,0,0.04)" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(214,147,106,0.08) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(0,201,167,0.05) 0%, transparent 50%)", pointerEvents: "none" }} />
            <p style={{ ...fade(0.2), fontSize: 11, letterSpacing: "0.3em", color: COLORS.muted, textTransform: "uppercase", marginBottom: 28 }}>الاضطرابات النفسية · القلق</p>
            <h1 style={{ ...fade(0.4), fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem,6vw,4rem)", lineHeight: 1.1, margin: 0 }}>
                <span style={{ display: "block", color: "#E67E22" }}>القلق...</span>
                <span style={{ display: "block", color: "#E67E22" }}>إنذار بلا حريق</span>
            </h1>
            <div style={{ ...fade(0.6), width: 60, height: 2, background: `linear-gradient(90deg, ${COLORS.coral}, ${COLORS.teal})`, margin: "1.75rem auto" }} />
            <p style={{ ...fade(0.8), fontSize: "1.05rem", color: "rgba(26,26,46,0.65)", maxWidth: 480, lineHeight: 1.8 }}>
                القلق ليس مبالغة — هو اضطراب يحارب <strong style={{ color: COLORS.coral }}>359 مليون شخص</strong> حول العالم. أنت لست وحدك.
            </p>
        </div>
    );
}

// ── DEFINITION ────────────────────────────────────────────────────────────
function Definition() {
    return (
        <FadeSection>
            <span style={s.label}>التعريف</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>ما هو </span><span style={{ color: COLORS.coral }}>اضطراب القلق؟</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
                {[
                    { title: "القلق الطبيعي", color: "#3d1f4b", text: "هو نظام إنذار مبكر في الدماغ يحميك من الأخطار المحتملة، يجعلك أكثر تركيزاً ويقظةً لكي تستطيع التخطيط، تجنب الأخطاء واكتساب الخبرة للمواقف المستقبلية." },
                    { title: "اضطراب القلق", color: "#E67E22", text: "هو عُطل في هذا النظام، يجعله يرسل إشعارات طوارئ مزيفة باستمرار حتى في أوقات الأمان، مما يسبب ضغطاً كبيراً وتعطلاً في الحياة اليومية." },
                ].map(({ title, color, text }) => (
                    <div key={title}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(214,147,106,0.15)"; }}
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
    { n: "١", en: "Generalized Anxiety Disorder", ar: "اضطراب القلق العام", color: "#552269", pts: ["حالة من التحفز المستمر، وكأن العقل يعمل بأقصى طاقته لتوقع التهديدات دون القدرة على إيقافه.", "يغرق الفرد في توقع مستمر للأسوأ تجاه أبسط تفاصيل الحياة اليومية كالعمل أو الصحة أو الأمور المالية.", "هذا الضغط المستمر يستهلك الطاقة الجسدية ويسبب الإرهاق وتوتر العضلات.", "لكي يُصنَّف كاضطراب، يجب أن تستمر هذه الحالة لمعظم الأيام طوال ستة أشهر."] },
    { n: "٢", en: "Panic Disorder", ar: "اضطراب الهلع", color: "#8a354c", pts: ["نوبات مباغتة تهاجم الفرد وكأنها إنذار بوجود خطر حقيقي، رغم عدم وجود أي تهديد.", "تترافق مع استجابة جسدية عنيفة وسريعة.", "يعيش الفرد في رعب مستمر من النوبة القادمة."] },
    { n: "٣", en: "Agoraphobia", ar: "رهاب الميادين", color: "#2a6275", pts: ["خوف الفرد من التواجد في أماكن يشعر أن الهروب منها مستحيل أو أن المساعدة غير متاحة.", "تشمل الأماكن: وسائل النقل العامة، الأسواق المزدحمة، الأماكن المفتوحة، أو مجرد التواجد خارج المنزل وحيداً.", "الخوف الأساسي هو التعرض لنوبة هلع في هذه الأماكن، وهي تُعدّ جزءاً فرعياً من اضطراب الهلع."] },
    { n: "٤", en: "Social Anxiety", ar: "القلق الاجتماعي", color: "#7571b8", pts: ["رعب حقيقي من التواجد تحت مجهر الآخرين — ليس مجرد خجل، بل خوف عميق ومستمر من التقييم السلبي أو الرفض.", "يسيطر على الفرد هاجس بأنه سيتصرف بطريقة محرجة أو مهينة.", "يدفعه ذلك للانسحاب من التفاعلات الاجتماعية أو تحملها بضغط نفسي هائل."] },
    { n: "٥", en: "Separation Anxiety", ar: "قلق الانفصال", color: "#ad6c34", pts: ["خوف غير منطقي من فقدان الأشخاص الذين يمثلون مساحة الأمان الأساسية للفرد.", "يترافق مع أفكار وهواجس مستمرة بأن مكروهاً سيصيب أحباءه، وكوابيس متكررة حول الانفصال.", "لا يقتصر هذا الاضطراب على مرحلة الطفولة، بل يمكن أن يمتد للبالغين."] },
    { n: "٦", en: "Specific Phobias", ar: "الرهاب المحدد", color: "#3a6e56", pts: ["استجابة رعب مبالغ فيها ومستمرة تجاه محفز أو موقف معين كالمرتفعات أو الحيوانات أو الطيران.", "يكون القلق غير متناسب بشكل كبير مع الخطر الفعلي الذي يمثله هذا المحفز.", "يدرك الشخص عادةً أن خوفه مفرط، لكنه يعجز عن السيطرة عليه."] },
    { n: "٧", en: "Selective Mutism", ar: "الخرس الانتقائي", color: "#5d5c72", pts: ["حالة تظهر غالباً عند الأطفال، يفقد فيها الطفل قدرته على التحدث في بيئات اجتماعية معينة.", "يحدث هذا بالرغم من قدرته على التحدث بطلاقة في بيئاته الآمنة.", "يرتبط غالباً باضطراب القلق الاجتماعي، ويبدأ عادةً قبل سن الخامسة."] },
    { n: "٨", en: "Medical / Substance-Induced", ar: "القلق الناتج عن حالات طبية أو مواد", color: "#6b4255", pts: ["قلق يظهر كنتيجة مباشرة لحالة طبية عضوية كاضطرابات الغدة الدرقية أو أمراض القلب.", "قد ينتج أيضاً بسبب تأثيرات بعض الأدوية أو المواد المنشطة، أو كجزء من أعراض الانسحاب منها."] },
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
                                            <li key={j} style={{ fontSize: "0.85rem", color: "rgba(26,26,46,0.7)", padding: "0.4rem 0", borderBottom: j < t.pts.length - 1 ? "1px solid rgba(214,147,106,0.1)" : "none", lineHeight: 1.7 }}>
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
    { label: "الأعراض الجسدية", id: "physical", color: "#d6936a", items: ["آلام وشد مستمر في العضلات", "التعب والإرهاق المستمر", "اضطرابات النوم", "تسارع وخفقان في ضربات القلب", "ارتعاش", "غثيان واضطرابات الجهاز الهضمي"] },
    { label: "الأعراض المعرفية والنفسية", id: "mental", color: "#00C9A7", items: ["التفكير المفرط", "صعوبة التركيز وضبابية في الدماغ", "التهيج وسهولة الانفعال"] },
    { label: "الأعراض السلوكية", id: "behavioral", color: "#3d1f4b", items: ["الميل الدائم للهروب وتجنب الأشخاص والأماكن والمواقف التي تثير القلق", "عدم القدرة على الجلوس بهدوء أو الاسترخاء", "فرط اليقظة"] },
    { label: "نوبات الهلع", id: "panic", color: "#c1232b" },
];

function Symptoms() {
    const [tab, setTab] = useState(0);
    const cur = TABS[tab];
    return (
        <FadeSection>
            <span style={s.label}>الأعراض</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>كيف يظهر </span><span style={{ color: COLORS.coral }}>القلق</span><span style={{ color: "#3d1f4b" }}> في جسدك وعقلك؟</span></h2>
            <div style={{ display: "flex", gap: 4, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 24, overflowX: "auto" }}>
                {TABS.map((t, i) => (
                    <button key={i} onClick={() => setTab(i)} style={{ background: "none", border: "none", color: tab === i ? "#552269" : COLORS.muted, fontWeight: tab === i ? "bold" : "normal", fontFamily: "'Tajawal', sans-serif", fontSize: "0.95rem", padding: "0.65rem 1.1rem", cursor: "pointer", borderBottom: `2px solid ${tab === i ? "#552269" : "transparent"}`, marginBottom: -1, whiteSpace: "nowrap", transition: "color 0.3s" }}>{t.label}</button>
                ))}
            </div>
            {tab < 3 ? (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
                    {cur.items.map((item, i) => (
                        <div key={i}
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)"; e.currentTarget.style.borderColor = cur.color; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor = COLORS.border; }}
                            style={{ ...s.card, display: "flex", alignItems: "center", gap: 12, fontSize: "0.9rem", color: "#552269", fontWeight: "bold", boxShadow: "0 4px 12px rgba(0,0,0,0.05)", flex: "1 1 240px", maxWidth: "380px", minHeight: "60px" }}>
                            <span style={{ width: 8, height: 8, borderRadius: "50%", background: cur.color, flexShrink: 0 }} />{item}
                        </div>
                    ))}
                </div>
            ) : (
                <div style={{ background: "rgba(193,35,43,0.06)", border: "2px solid rgba(193,35,43,0.5)", borderRadius: 14, padding: "1.5rem" }}>
                    <p style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#c1232b", marginBottom: 16, fontSize: "1.1rem" }}>⚠️ تحذير: تتميز نوبات الهلع بأعراض شديدة ومفاجئة تشبه الخطر الحقيقي:</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
                        {[
                            { title: "أعراض جسدية حادة", items: ["تسارع وخفقان شديد وغير طبيعي في القلب", "إحساس بالاختناق", "آلام في الصدر تشبه النوبة القلبية", "تعرق شديد وارتجاف", "دوار شديد", "ألم شديد في البطن"] },
                            { title: "أعراض نفسية مرعبة", items: ["خوف مطلق ومسيطر أنك ستموت في هذه اللحظة", "انفصال عن الواقع", "بعد انتهاء النوبة، تبقى في حالة رعب مستمر في انتظار النوبة القادمة"] },
                        ].map(col => (
                            <div key={col.title}>
                                <p style={{ fontSize: "0.95rem", color: "#c1232b", fontWeight: "900", marginBottom: 12 }}>{col.title}</p>
                                {col.items.map((it, i) => (
                                    <div key={i} style={{ fontSize: "0.9rem", color: "#552269", fontWeight: "bold", padding: "0.4rem 0", borderBottom: "1px solid rgba(193,35,43,0.15)", display: "flex", gap: 8, alignItems: "flex-start" }}>
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
        n: "١", label: "جينية ووراثية", color: "#552269", title: "العوامل الجينية والوراثية", circleBg: "linear-gradient(135deg, #3d1f4b, #af6c86)", circleColor: "#fff", borderColor: "#493054", content: (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["ينتقل الاستعداد للإصابة بالقلق عبر العائلة.", "نقص وراثي في النواقل العصبية المهدئة مثل GABA ومشاكل في تنظيم السيروتونين والنورإبينفرين، مما يجعل الدماغ حساساً وفي حالة تأهب دائم.", "تصبح اللوزة الدماغية (مركز الخوف) مفرطة النشاط، بينما تضعف قشرة الفص الجبهي (المنطقة المنطقية) عن كبح هذا الخوف."].map((p, i, a) => (
                    <li key={i} style={{ fontSize: "0.875rem", color: "#5d5c5d", padding: "0.5rem 0", borderBottom: i < a.length - 1 ? `1px solid rgba(0,0,0,0.05)` : "none", lineHeight: 1.7, fontWeight: "600" }}>{p}</li>
                ))}
            </ul>
        )
    },
    {
        n: "٢", label: "بيئية", color: "#5c7f94", title: "العوامل البيئية والضغوطات", circleBg: "linear-gradient(135deg, #abc3d1, #5d6174)", circleColor: "#fff", borderColor: "rgba(92, 127, 148, 0.9)", content: (
            <div>
                <p style={{ fontSize: "0.875rem", color: "#5d5c5d", marginBottom: 14, lineHeight: 1.7, fontWeight: "600" }}>البيئة التي تنشأ فيها والضغوط والصدمات التي تتعرض لها هي المحفز الذي يشعل الاستعداد الجيني الكامن لديك، مثل:</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["الحماية الأبوية المفرطة", "التربية الاستبدادية القاسية", "اكتساب القلق من مراقبة آباء قلقين", "التعرض للإيذاء البدني أو النفسي", "الإهمال العاطفي المستمر", "إجبار الطفل على تلبية الاحتياجات العاطفية للبالغين", "غياب الرعاية الثابتة والموثوقة من الوالدين", "الإجهاد والضغوط المزمنة"].map(tag => (
                        <span key={tag} style={{ background: "rgba(92, 127, 148, 0.15)", color: "#5d5c5d", borderRadius: 50, padding: "4px 12px", fontSize: "0.75rem", fontWeight: "bold" }}>{tag}</span>
                    ))}
                </div>
            </div>
        )
    },
    {
        n: "٣", label: "طبية وعضوية", color: "#e1844a", title: "العوامل الطبية والعضوية", circleBg: "linear-gradient(90deg, #b84700, #7f2a3b)", circleColor: "#fff", borderGradient: "linear-gradient(to right, #b84700, #7f2a3b)", content: (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["مشاكل الغدة الدرقية: فرط نشاطها يسبب أعراضاً تحاكي نوبات الهلع تماماً.", "التقلبات الحادة في الهرمونات الجنسية كالإستروجين والبروجسترون أو التستوستيرون.", "اختلال بكتيريا الأمعاء (الميكروبيوم): قد يسبب التهابات عصبية تعبر إلى الدماغ مما يزيد من مستويات القلق.", "أمراض القلب — الأورام الكظرية — بعض الأدوية والمخدرات — أعراض الانسحاب من المواد المخدرة."].map((p, i, a) => (
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
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>من أين يأتي </span><span style={{ color: COLORS.coral }}>القلق؟</span></h2>
            <p style={{ fontSize: "0.875rem", color: COLORS.muted, marginBottom: 32 }}>هناك ٣ مسببات رئيسية لاضطراب القلق</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {CAUSES.map((c, i) => (
                    <div key={i} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 20, alignItems: "start" }}>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <div style={{ width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: c.circleColor || c.color, border: c.circleBg ? "none" : `1px solid ${c.color}`, background: c.circleBg || `${c.color}18`, flexShrink: 0 }}>{c.n}</div>
                            {i < CAUSES.length - 1 && <div style={{ width: 1, height: 40, background: `linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)`, marginTop: 4 }} />}
                        </div>
                        <div style={{
                            marginBottom: 0,
                            background: c.borderGradient ? `linear-gradient(#ffffff, #ffffff) padding-box, ${c.borderGradient} border-box` : "#ffffff",
                            border: `2px solid ${c.borderGradient ? "transparent" : c.borderColor}`,
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
    { icon: "🛑", title: "الانسحاب السلوكي", en: "Behavioral Withdrawal", desc: "يوقف الفرد جميع جهوده ومحاولاته لإدارة بيئته والتعامل مع المشكلة، ويستسلم للقلق تماماً.", color: COLORS.coral },
    { icon: "🔄", title: "إلقاء اللوم على الذات", en: "Self-blame", desc: "توجيه الضيق النفسي إلى الداخل، مما يؤدي بسرعة إلى الإصابة باكتئاب مصاحب واجترار مستمر للأفكار السلبية.", color: COLORS.coral },
    { icon: "💊", title: "تعاطي المواد", en: "Substance Use", desc: "اللجوء المتكرر إلى الكحول أو الأدوية أو المخدرات لتخدير الجهاز العصبي المركزي وتخفيف التوتر.", color: COLORS.coral },
    { icon: "🙈", title: "الإنكار", en: "Denial", desc: "رفض الاعتراف بوجود المشكلة أو حجمها الحقيقي كوسيلة للتهرب من مواجهتها.", color: COLORS.coral },
    { icon: "🏃", title: "التجنب العميق (الهروب)", en: "Avoidance", desc: "هو السمة الأبرز للقلق — الهروب وتجنب المواقف التي تثير المحفزات. يعتقد الدماغ أن التجنب هو سبب البقاء بأمان، لكن القلق يعود بضراوة أكبر في المرة القادمة.", color: COLORS.coral },
    { icon: "🌀", title: "التركيز على المشاعر", en: "Emotional Avoidance", desc: "محاولة الهروب والتركيز فقط على المشاعر السلبية الناتجة عن التوتر بدلاً من استخدام استراتيجيات نشطة وفعالة لحل المشكلات الأساسية.", color: COLORS.coral },
    { icon: "🤝", title: "طلب الطمأنينة المفرطة", en: "Excessive Reassurance Seeking", desc: "الاعتماد المستمر والمبالغ فيه على الآخرين للحصول على تأكيدات تهدئ من روع الفرد، وهي تزيد القلق على المدى الطويل.", color: COLORS.coral },
    { icon: "💭", title: "اجترار الأفكار", en: "Rumination", desc: "الانغماس المتكرر في التفكير في أسباب القلق ونتائجه السلبية بدلاً من البحث عن حلول، مما يبقي الدماغ في حلقة مفرغة من التوتر.", color: COLORS.coral },
];

function Maladaptive() {
    return (
        <FadeSection>
            <span style={s.label}>آليات التكيف</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>حين تُخطئ </span><span style={{ color: COLORS.coral }}>طريقة التعامل</span></h2>
            <p style={{ fontSize: "0.875rem", color: "#5d5c5d", marginBottom: 28, lineHeight: 1.7 }}>هي استجابات سلوكية وعاطفية مختلة يلجأ إليها الفرد للتهرب من الألم النفسي. رغم أنها قد توفر راحة مؤقتة، إلا أنها تزيد من حدة القلق وتفاقمه على المدى الطويل.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* Row 1: First 4 cards */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                    {MALAD.slice(0, 4).map((m, i) => (
                        <div key={i} 
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(230,126,34,0.12)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                            style={{ ...s.card, paddingTop: "1rem", flex: "1 1 260px", maxWidth: "calc(25% - 12px)", minWidth: "260px", minHeight: "180px" }}>
                            <div style={{ fontSize: 24, marginBottom: 10, lineHeight: 1, marginTop: "-0.25rem" }}>{m.icon}</div>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#552269", fontSize: "0.95rem", marginBottom: 4 }}>{m.title}</div>
                            <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10, letterSpacing: "0.05em" }}>{m.en}</div>
                            <p style={{ fontSize: "0.85rem", color: "#5d5c5d", lineHeight: 1.7, margin: 0, fontWeight: "600" }}>{m.desc}</p>
                        </div>
                    ))}
                </div>
                {/* Row 2: Middle 2 cards */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                    {MALAD.slice(4, 6).map((m, i) => (
                        <div key={i+4} 
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(230,126,34,0.12)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                            style={{ ...s.card, paddingTop: "1rem", flex: "1 1 260px", maxWidth: "calc(50% - 12px)", minWidth: "260px", minHeight: "180px" }}>
                            <div style={{ fontSize: 24, marginBottom: 10, lineHeight: 1, marginTop: "-0.25rem" }}>{m.icon}</div>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#552269", fontSize: "0.95rem", marginBottom: 4 }}>{m.title}</div>
                            <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10, letterSpacing: "0.05em" }}>{m.en}</div>
                            <p style={{ fontSize: "0.85rem", color: "#5d5c5d", lineHeight: 1.7, margin: 0, fontWeight: "600" }}>{m.desc}</p>
                        </div>
                    ))}
                </div>
                {/* Row 3: Bottom 2 cards */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                    {MALAD.slice(6, 8).map((m, i) => (
                        <div key={i+6} 
                            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(230,126,34,0.12)"; }}
                            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                            style={{ ...s.card, paddingTop: "1rem", flex: "1 1 260px", maxWidth: "calc(50% - 12px)", minWidth: "260px", minHeight: "180px" }}>
                            <div style={{ fontSize: 24, marginBottom: 10, lineHeight: 1, marginTop: "-0.25rem" }}>{m.icon}</div>
                            <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#552269", fontSize: "0.95rem", marginBottom: 4 }}>{m.title}</div>
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
    { ar: "العصابية العالية", en: "High Neuroticism", desc: "هي السمة الأبرز والأكثر ارتباطاً بالقلق — الميل الشديد لتجربة المشاعر السلبية بسهولة." },
    { ar: "الكمالية الشديدة", en: "Perfectionism", desc: "دافع مهووس للكمال كآلية دفاعية لتجنب الفشل أو الرفض أو النقد. تظهر بوضوح في «القلق عالي الأداء» (High-Functioning Anxiety) حيث يبدو الشخص ناجحاً من الخارج لكنه يحترق من الداخل." },
    { ar: "الانطوائية والانسحاب", en: "Introversion", desc: "الميل للهروب إلى الداخل والانسحاب من التفاعلات الاجتماعية والبيئات الخارجية، وغالباً ما يترافق ذلك مع الخجل الشديد." },
    { ar: "السمات الاجتنابية", en: "Avoidant Traits", desc: "تتجاوز الانطواء العادي لتصبح ميلاً مرضياً للعزلة وتجنب المواقف والعلاقات الاجتماعية خوفاً ورعباً من الانتقاد، مع انخفاض ملحوظ جداً في الثقة بالنفس." },
    { ar: "فرط اليقظة المزمن", en: "Chronic Hypervigilance", desc: "شخصية تعيش في حالة «رادار» أو تأهب دائم؛ تمسح البيئة المحيطة باستمرار وتتوقع الخطر في كل زاوية، مما يجعل الفرد متوتراً دائماً، مشتت الذهن، وسريع الانفعال." },
    { ar: "التصلب والسيطرة", en: "Rigidity & Control", desc: "محاولة فرض سيطرة صارمة ومفرطة على كل تفاصيل الحياة لتجنب المفاجآت، كوسيلة لتقليل التوتر الداخلي." },
    { ar: "انخفاض التوافقية", en: "Decreased Agreeableness", desc: "بسبب الضغط الداخلي والتهيج المستمر الناجم عن التفكير المفرط، قد تصبح شخصية الفرد أقل مرونة وأقل قدرة على التوافق مع الآخرين." },
    { ar: "الاعتمادية", en: "Dependency", desc: "الميل للاعتماد المستمر والمفرط على الآخرين للحصول على الطمأنينة وإدارة التوتر والمواقف الصعبة." },
];

function Personality() {
    return (
        <FadeSection>
            <span style={s.label}>السمات الشخصية</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: COLORS.coral }}>القلق </span><span style={{ color: "#3d1f4b" }}>يُغيّر شخصيتك</span></h2>
            <p style={{ fontSize: "0.875rem", color: COLORS.muted, marginBottom: 24 }}>العيش مع قلق مزمن يحدث تغييرات في شخصيتك بمرور الوقت.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {TRAITS.map((t, i) => (
                    <div key={i}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateX(-12px)"; e.currentTarget.style.borderColor = "#552269"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.borderColor = COLORS.border; }}
                        style={{ ...s.card, display: "grid", gridTemplateColumns: "min(200px,40%) 1fr", gap: 16, alignItems: "start" }}>
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
    { n: "١", label: "AMYGDALA · اللوزة الدماغية", color: COLORS.coral, text: "تُفسِّر اللوزة الدماغية محفزاً عادياً في البيئة — أو مجرد فكرة داخلية — على أنه خطر حقيقي، رغم عدم وجود تهديد فعلي." },
    { n: "٢", label: "ALARM SIGNAL · إشارات الإنذار", color: COLORS.teal, text: "ترسل اللوزة الدماغية إشارات إنذار سريعة إلى أجزاء أخرى من الدماغ لتفعيل استجابة الخطر." },
    { n: "٣", label: "PREFRONTAL CORTEX · قشرة الفص الجبهي", color: COLORS.coral, text: "يُفترض أن تقوم قشرة الفص الجبهي بتحليل الموقف بشكل منطقي وإيقاف الإنذار — لكنها في اضطرابات القلق تكون أضعف من المعتاد في تهدئة اللوزة الدماغية." },
    { n: "٤", label: "NEUROTRANSMITTERS · النواقل العصبية", color: COLORS.coral, text: "يحدث انخفاض في تأثير الناقل العصبي المهدئ GABA وارتفاع في الناقلات المحفزة كالغلوتامات، مما يزيد من نشاط الدوائر العصبية المرتبطة بالخوف." },
    { n: "٥", label: "HYPOTHALAMUS · تحت المهاد", color: COLORS.coral, text: "ترسل اللوزة الدماغية إشارات إلى تحت المهاد، الذي يُفعِّل سلسلة هرمونية عبر الغدة النخامية وصولاً إلى الغدد الكظرية." },
    { n: "٦", label: "ADRENAL GLANDS · الغدد الكظرية", color: COLORS.teal, text: "تستجيب الغدد الكظرية بإفراز كميات كبيرة من الأدرينالين والكورتيزول في مجرى الدم (في حالة نوبات الهلع)، وكميات خفيفة في الحالات الأخرى." },
    { n: "٧", label: "BODY RESPONSE · استجابة الجسم", color: COLORS.coral, text: "تؤدي هذه الهرمونات إلى رفع حالة التأهب الجسدي استعداداً لمواجهة خطر مفترض." },
];

function BrainStep({ step, index }) {
    const [ref, visible] = useFadeIn();
    return (
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 16, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(20px)", transition: `opacity 0.5s ${index * 0.12}s ease, transform 0.5s ${index * 0.12}s ease` }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: "#552269", border: `2px solid ${COLORS.coral}`, background: COLORS.coral, flexShrink: 0 }}>{step.n}</div>
                {index < BRAIN_STEPS.length - 1 && <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${COLORS.coral}, transparent)`, margin: "4px 0" }} />}
            </div>
            <div style={{ ...s.card, marginBottom: 12, borderColor: COLORS.coral }}>
                <div style={{ fontSize: 12, color: "#552269", letterSpacing: "0.1em", marginBottom: 6, fontWeight: "900", fontFamily: "'Tajawal', sans-serif" }}>{step.label}</div>
                <p style={{ fontSize: "0.875rem", color: "#552269", lineHeight: 1.8, margin: 0, fontWeight: "700" }}>
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
            <p style={{ textAlign: "center", fontSize: "0.875rem", color: COLORS.muted, marginBottom: 32 }}>ماذا يحدث بالضبط داخل دماغ شخص يعاني من اضطراب القلق؟</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {BRAIN_STEPS.map((step, i) => <BrainStep key={i} step={step} index={i} />)}
            </div>
            <div style={{ background: "rgba(214,147,106,0.06)", border: "1px solid rgba(214,147,106,0.2)", borderRadius: 14, padding: "1.5rem", marginTop: 16 }}>
                <p style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#552269", marginBottom: 16, fontSize: "0.95rem" }}>النتيجة: ماذا تشعر في جسدك؟</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
                    {[
                        { title: "في نوبات الهلع", color: "#c1232b", items: ["تسارع شديد في ضربات القلب", "ضيق أو تسارع في التنفس", "ألم أو ضغط في الصدر", "تعرق وارتجاف في اليدين والجسم", "دوار أو شعور بعدم التوازن"] },
                        { title: "في الاضطرابات الأخرى", color: "#E67E22", items: ["توتر في العضلات", "تسارع بسيط في ضربات القلب", "تنفس أسرع قليلاً", "شعور بعدم الارتياح أو الترقب", "صعوبة في التركيز"] },
                    ].map((col, idx) => (
                        <div key={col.title}>
                            <p style={{ fontSize: "0.95rem", color: col.color, fontWeight: "900", letterSpacing: "0.05em", marginBottom: 12 }}>{col.title}</p>
                            {col.items.map((it, i) => (
                                <div key={i} style={{ fontSize: "0.85rem", color: "#5d5c5d", fontWeight: "600", padding: "0.4rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "flex", gap: 8, alignItems: "center" }}>
                                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: idx === 0 ? col.color : "#5d5c5d", flexShrink: 0 }} />{it}
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
    { icon: "🧩", en: "Cognitive Behavioral Therapy", title: "١. العلاج السلوكي المعرفي (CBT)", color: "#552269", pts: [["التثقيف النفسي:", "فهم أن نوبات الهلع والأعراض الجسدية المخيفة ليست خطيرة، بل إنذار كاذب من الدماغ."], ["إعادة الهيكلة المعرفية:", "ملاحظة الأفكار الكارثية وتحديها بالمنطق والأدلة بدل تصديقها تلقائياً."], ["العلاج بالتعرض:", "مواجهة المواقف المخيفة تدريجياً لمنع الهروب والتجنب، حتى يتعلم الدماغ عدم وجود خطر حقيقي."], ["الإدارة الجسدية:", "تمارين التنفس الحجابي والاسترخاء العضلي لخفض الأدرينالين وتهدئة الجهاز العصبي."]] },
    { icon: "💊", en: "Pharmacotherapy", title: "٢. العلاج الدوائي", color: "#5c7f94", pts: [["SSRIs وSNRIs:", "الخيار الأول لعلاج معظم اضطرابات القلق، تعمل تدريجياً على تنظيم السيروتونين والنورإبينفرين وتهدئة دائرة الخوف. يُنصح بالاستمرار عليها ٦–١٢ شهراً بعد التحسن."], ["البنزوديازيبينات:", "مهدئات سريعة لنوبات الهلع الحادة، تُستخدم لفترة قصيرة جداً لتجنب التعود."], ["حاصرات بيتا:", "مثل بروبرانولول للتحكم في الأعراض الجسدية كالخفقان والارتعاش، خاصة في قلق الأداء."], ["خيارات أخرى:", "بوسبيرون لعلاج القلق العام، وهيدروكسيزين للتهدئة المؤقتة، وبريجابالين في بعض الحالات."]] },
    { icon: "⚡", en: "Combined Treatment", title: "٣. العلاج المدمج", color: "#e1844a", badge: "الأفضل نتائج", pts: [["", "دمج CBT مع الأدوية يعطي أفضل النتائج؛ فالأدوية تُهدئ الاستجابة الجسدية للخوف، مما يساعد المريض على الاستفادة من العلاج السلوكي وتغيير أفكاره وسلوكياته."]] },
    { icon: "🌿", en: "Lifestyle & Support", title: "٤. تعديل نمط الحياة والدعم", color: "#3b6e4f", pts: [["تفريغ التوتر:", "ممارسة الرياضة بانتظام، تنظيم النوم، وتقليل الكافيين."], ["تهدئة العقل:", "الاسترخاء، اليوغا، التأمل، والتنفس البطيء لتنشيط العصب المبهم وتهدئة الجسم."], ["الدعم الاجتماعي:", "الانضمام لمجموعات دعم، التحدث مع أشخاص داعمين، واستخدام أدوات المساعدة الذاتية."]] },
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
export default function App() {
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@300;400;600;700;900&display=swap";
        document.head.appendChild(link);
        const style = document.createElement("style");
        style.textContent = `@keyframes fadeIn { from { opacity:0 } to { opacity:1 } } ::-webkit-scrollbar { width:4px } ::-webkit-scrollbar-thumb { background:#d6936a; border-radius:2px }`;
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
                    <Link to="/disease/depression" style={{ textDecoration: 'none' }} onClick={() => window.scrollTo(0, 0)}>
                        <div onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = "#c1232b"; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = "#9a0000"; }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 1.5rem', background: '#9a0000', color: 'white', borderRadius: '50px', fontSize: '1rem', fontWeight: 'bold', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 8px 20px rgba(154, 0, 0, 0.25)', fontFamily: "'Tajawal', sans-serif" }}>
                            <span>اضطراب الاكتئاب</span>
                            <span style={{ fontSize: '1.2rem', marginTop: -2 }}>←</span>
                        </div>
                    </Link>
                </div>
                <div style={{ textAlign: "center", padding: "2.5rem 1.5rem", borderTop: `1px solid ${COLORS.border}`, fontSize: 13, color: COLORS.muted }}>
                    هذا المحتوى لأغراض تثقيفية فقط · إذا كنت تعاني من أعراض القلق، تحدث مع <span style={{ color: COLORS.coral }}>متخصص نفسي</span>
                </div>
            </div>
        </div>
    );
}