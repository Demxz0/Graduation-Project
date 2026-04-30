import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const COLORS = {
    bg: "#f4f4ff",
    bg2: "#eeeeff",
    coral: "#9a0000",
    teal: "#00C9A7",
    lavender: "#9a0000",
    gold: "#9a0000",
    white: "#1a1a2e",
    muted: "#7a7a9a",
    border: "rgba(154,0,0,0.15)",
    card: "rgba(154,0,0,0.04)",
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
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "8rem 1.5rem 6.5rem", position: "relative", overflow: "hidden", background: "linear-gradient(135deg, #f7dede 0%, #fae0e0 100%)", boxShadow: "inset 0 60px 100px -30px rgba(0,0,0,0.04)" }}>
            <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 50% at 50% 30%, rgba(84,84,84,0.08) 0%, transparent 60%), radial-gradient(ellipse 40% 30% at 20% 80%, rgba(115,115,115,0.05) 0%, transparent 50%)", pointerEvents: "none" }} />
            <p style={{ ...fade(0.2), fontSize: 11, letterSpacing: "0.3em", color: COLORS.muted, textTransform: "uppercase", marginBottom: 28 }}>الاضطرابات النفسية · الاكتئاب</p>
            <h1 style={{ ...fade(0.4), fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "clamp(2.2rem,6vw,4rem)", lineHeight: 1.1, margin: 0 }}>
                <span style={{ display: "block", color: "#9a0000" }}>الاكتئاب...</span>
                <span style={{ display: "block", color: "#9a0000" }}>ليس حزناً عابراً</span>
            </h1>
            <div style={{ ...fade(0.6), width: 60, height: 2, background: `linear-gradient(90deg, ${COLORS.coral}, #3d1f4b)`, margin: "1.75rem auto" }} />
            <p style={{ ...fade(0.8), fontSize: "1.05rem", color: "rgba(26,26,46,0.65)", maxWidth: 480, lineHeight: 1.8 }}>
                الاكتئاب ليس ضعفاً ولا كسلاً، هو اضطراب حقيقي يُعاني منه <strong style={{ color: "#9a0000" }}>أكثر من 280 مليون شخص</strong> حول العالم.
            </p>
        </div>
    );
}

// ── DEFINITION ────────────────────────────────────────────────────────────
function Definition() {
    return (
        <FadeSection>
            <span style={s.label}>التعريف</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>ما هو </span><span style={{ color: "#9a0000" }}>الاكتئاب؟</span></h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
                {[
                    { title: "الحزن الطبيعي", color: "#3d1f4b", text: "شعور طبيعي يمر به الجميع كاستجابة لخسارة أو ضغط أو صدمة — مؤقت ومحدود ومرتبط بسبب واضح، ويتحسن مع الوقت والدعم." },
                    { title: "اضطراب الاكتئاب", color: "#9a0000", text: "حالة طبية تُؤثر على الدماغ وتُغير كيمياءه وبنيته. تمتد أسبوعين أو أكثر وتُعطل الحياة اليومية — لا يمكن 'التغلب عليها بالإرادة' لأنها بيولوجية في جوهرها." },
                ].map(({ title, color, text }) => (
                    <div key={title}
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 15px 35px rgba(154,0,0,0.15)"; }}
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
    { n: "١", en: "Major Depressive Disorder", ar: "الاكتئاب الإكلينيكي / الكبير", color: "#552269", pts: ["النوع الأكثر شيوعاً ومعروفة — نوبة واحدة أو أكثر من الاكتئاب الشديد تستمر أسبوعين على الأقل.", "يتميز بحزن عميق أو فقدان كامل للاهتمام بالحياة، مصحوباً بأعراض جسدية ومعرفية واضحة.", "قد يُصنَّف كـ خفيف أو متوسط أو شديد — وقد يصحبه أعراض ذهانية في الحالات القصوى."] },
    { n: "٢", en: "Persistent Depressive Disorder", ar: "الاكتئاب المستمر / الخفيف", color: "#8a354c", pts: ["مزاج حزين مستمر لمدة سنتين على الأقل (سنة عند الأطفال) دون انقطاع لمدة شهرين.", "أعراضه أقل حدة من الاكتئاب الكبير، لكن ديمومتها تُنهك الشخص وتُشعره أن الحزن جزء من شخصيته.", "كثيراً ما يُوصف بأنه 'اكتئاب بطيء النار' — يصعب تشخيصه لأن المصاب اعتاد عليه ولا يتوقع تحسناً."] },
    { n: "٣", en: "DMDD", ar: "خلل تنظيم المزاج التخريبي", color: "#2a6275", pts: ["نوبات غضب شديدة ومتكررة عند الأطفال والمراهقين، تفوق كثيراً ما يستدعيه الموقف.", "المزاج العام في ما بين النوبات يكون حزيناً أو غاضباً أغلب الوقت.", "يؤثر على الأداء في المدرسة والعلاقات الأسرية ويختلف عن ثنائي القلوب الذي لا يُشخَّص لمن دون 18 عاماً."] },
    { n: "٤", en: "PMDD", ar: "اضطراب ما قبل الدورة", color: "#7571b8", pts: ["اكتئاب وقلق شديد يظهر قبل الدورة الشهرية بأسبوع إلى أسبوعين ويختفي بعد بدئها.", "تغيرات مزاجية حادة، تعب، اضطرابات نوم أو شهية، شعور بفقدان السيطرة.", "أشد بكثير من متلازمة ما قبل الدورة (PMS) العادية — يُعطل الحياة اليومية بشكل كبير."] },
    { n: "٥", en: "Substance/Medication-Induced", ar: "الناجم عن الأدوية أو المواد", color: "#ad6c34", pts: ["أعراض اكتئابية واضحة ناجمة مباشرة عن تناول مواد معينة أو الانسحاب منها.", "تتحسن عادةً عند تعديل الدواء أو التوقف عن المادة المسببة.", "من أسبابها: الكحول، المنشطات، الستيرويدات، بعض أدوية ضغط الدم أو بعض المضادات الحيوية."] },
    { n: "٦", en: "Due to Another Medical Condition", ar: "الناتج عن حالة طبية أخرى", color: "#3a6e56", pts: ["اكتئاب مرتبط بحالة طبية عضوية كالغدة الدرقية الخاملة، السرطان، أمراض القلب، السكتة الدماغية.", "يحتاج علاج الحالة الطبية الأساسية لتحسين المزاج.", "لا يُعدّ كسلاً أو ضعف شخصية — بل تأثير بيولوجي مباشر للمرض على الدماغ."] },
    { n: "٧", en: "Unspecified Depressive Disorder", ar: "الاكتئاب غير المحدد", color: "#5d5c72", pts: ["أعراض اكتئابية واضحة لكنها لا تنطبق تماماً على أي تشخيص محدد من الأنواع السابقة.", "يحتاج تقييم دقيق من متخصص لفهم الصورة الكاملة وتقديم الدعم المناسب.", "وجود الأعراض والمعاناة الحقيقية يكفي للحصول على المساعدة — بغض النظر عن دقة التصنيف."] },
    { n: "٨", en: "Bipolar Disorder", ar: "اضطراب ثنائي القطب", color: "#6b4255", pts: ["نوبات اكتئاب متناوبة مع نوبات هوس أو فرط نشاط — يختلف جوهرياً عن الاكتئاب الأحادي.", "في الاكتئاب: حزن، فقدان طاقة، قلة اهتمام. في الهوس: نشاط زائد، اندفاع، شعور بالعظمة أحياناً.", "علاجه يختلف عن باقي أنواع الاكتئاب — الأدوية المثبتة للمزاج (كالليثيوم) هي الركيزة الأساسية."] },
];

function Types() {
    const [open, setOpen] = useState(-1);
    return (
        <FadeSection>
            <span style={s.label}>الأنواع</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>أنواع </span><span style={{ color: "#9a0000" }}>الاضطراب</span><span style={{ color: "#3d1f4b" }}> وأشكاله</span></h2>
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
                                            <li key={j} style={{ fontSize: "0.85rem", color: "rgba(26,26,46,0.7)", padding: "0.4rem 0", borderBottom: j < t.pts.length - 1 ? "1px solid rgba(154,0,0,0.1)" : "none", lineHeight: 1.7 }}>
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
    { label: "الأعراض العاطفية والنفسية", id: "emotional", color: "#9a0000", items: ["حزن عميق ومستمر لمعظم ساعات اليوم", "فقدان المتعة والاهتمام بالأنشطة المحبوبة (Anhedonia)", "شعور بالفراغ الداخلي والخدر العاطفي", "يأس وشعور بأن المستقبل مظلم لا أمل فيه", "مشاعر ذنب مفرطة وانتقاد مستمر للذات", "انسحاب اجتماعي والعزلة عن الأسرة والأصدقاء"] },
    { label: "الأعراض الجسدية", id: "physical", color: "#00C9A7", items: ["إرهاق مزمن وفقدان الطاقة دون مجهود يذكر", "اضطرابات النوم: أرق شديد أو نوم مفرط", "تغيرات في الشهية وفي الوزن (زيادة أو نقص)", "بطء ملحوظ في الحركة والكلام (Psychomotor Retardation)", "آلام جسدية غير مفسرة: رأس، ظهر، معدة", "انخفاض الدافع الجنسي واضطراب الوظائف الجسدية"] },
    { label: "الأعراض المعرفية", id: "cognitive", color: "#3d1f4b", items: ["صعوبة شديدة في التركيز واتخاذ القرارات", "بطء التفكير والشعور بضبابية ذهنية (Brain Fog)", "أفكار سلبية متكررة وتشاؤم تجاه كل شيء", "اجترار الأفكار المؤلمة بشكل قهري ومستمر", "انخفاض تقدير الذات والشعور بعدم الكفاءة", "تشوهات إدراكية: تضخيم السلبي وتجاهل الإيجابي"] },
    { label: "العلامات الحادة", id: "acute", color: "#c1232b", items: ["أفكار متكررة عن الموت أو انعدام الرغبة في الحياة", "أفكار انتحارية مع أو بدون خطة محددة", "الإهمال التام للنظافة الشخصية والمظهر", "العجز عن أداء أبسط مهام الحياة اليومية", "الانسحاب الكامل من العلاقات والحياة الاجتماعية", "حالات ذهانية: أوهام أو هلوسة في الاكتئاب الشديد"] },
];

function Symptoms() {
    const [tab, setTab] = useState(0);
    const cur = TABS[tab];
    return (
        <FadeSection>
            <span style={s.label}>الأعراض</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>كيف يظهر </span><span style={{ color: "#9a0000" }}>الاكتئاب</span><span style={{ color: "#3d1f4b" }}> في جسدك وعقلك؟</span></h2>
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
                    <p style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#c1232b", marginBottom: 16, fontSize: "1.1rem" }}>⚠️ تحذير: العلامات الحادة تتطلب تدخلاً طبياً ونفسياً فورياً:</p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 24 }}>
                        {[
                            { title: "خطر مباشر وأفكار حادة", items: ["أفكار متكررة عن الموت أو انعدام الرغبة في الحياة", "أفكار انتحارية مع أو بدون خطة محددة", "حالات ذهانية: أوهام أو هلوسة في الاكتئاب الشديد"] },
                            { title: "تدهور الأداء والانسحاب", items: ["الإهمال التام للنظافة الشخصية والمظهر", "العجز عن أداء أبسط مهام الحياة اليومية", "الانسحاب الكامل من العلاقات والحياة الاجتماعية"] },
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
        n: "١", label: "بيولوجية", color: "#552269", title: "اختلال النواقل العصبية البيولوجية", circleBg: "linear-gradient(135deg, #3d1f4b, #af6c86)", circleColor: "#fff", borderColor: "#493054", content: (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["السيروتونين: أكثر الناقلات ارتباطاً بالاكتئاب — انخفاضه يُؤثر على المزاج والنوم والشهية.", "الدوبامين: ناقل المتعة والمكافأة والحافز — انخفاضه يُفسر فقدان المتعة من كل شيء (Anhedonia).", "النورإبينفرين: اضطرابه يُسبب الإرهاق المزمن وبطء التفكير وصعوبة التركيز.", "GABA: ناقل التهدئة — انخفاضه يُسبب القلق المصاحب للاكتئاب.", "الغلوتامات: اختلال توازنه يؤدي إلى اضطراب في استقرار النشاط العصبي."].map((p, i, a) => (
                    <li key={i} style={{ fontSize: "0.875rem", color: "#5d5c5d", padding: "0.5rem 0", borderBottom: i < a.length - 1 ? `1px solid rgba(0,0,0,0.05)` : "none", lineHeight: 1.7, fontWeight: "600" }}>{p}</li>
                ))}
            </ul>
        )
    },
    {
        n: "٢", label: "جينية", color: "#5c7f94", title: "العوامل الوراثية والجينية", circleBg: "linear-gradient(135deg, #abc3d1, #5d6174)", circleColor: "#fff", borderColor: "rgba(92, 127, 148, 0.9)", content: (
            <div>
                <p style={{ fontSize: "0.875rem", color: "#5d5c5d", marginBottom: 14, lineHeight: 1.7, fontWeight: "600" }}>الاكتئاب وراثي جزئياً (37–50%) — الجينات تُفسر نصف الخطر، والنصف الآخر بيئي ونفسي:</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["وراثة أحد الوالدين", "تفاعل الجينات مع البيئة", "النساء أكثر عرضة هرمونياً", "التوائم المتطابقة (40-70%)"].map(tag => (
                        <span key={tag} style={{ background: "rgba(92, 127, 148, 0.15)", color: "#5d5c5d", borderRadius: 50, padding: "4px 12px", fontSize: "0.75rem", fontWeight: "bold" }}>{tag}</span>
                    ))}
                </div>
            </div>
        )
    },
    {
        n: "٣", label: "بيئية ونفسية", color: "#9a0000", title: "العوامل البيئية والنفسية", circleBg: "linear-gradient(90deg, #9a0000, #7f2a3b)", circleColor: "#fff", borderGradient: "linear-gradient(to right, #9a0000, #7f2a3b)", content: (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {["تجارب الطفولة السلبية (ACEs): الإساءة والإهمال.", "الضغوط المزمنة والمتراكمة: مشاكل مالية أو ضغط العمل.", "الخسائر الكبرى: فقدان عزيز أو فشل علاقة.", "العزلة الاجتماعية وغياب الدعم الاجتماعي."].map((p, i, a) => (
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
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>من أين يأتي </span><span style={{ color: "#9a0000" }}>الاكتئاب؟</span></h2>
            <p style={{ fontSize: "0.875rem", color: COLORS.muted, marginBottom: 32 }}>هناك ٣ مسببات رئيسية لاضطراب الاكتئاب</p>
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
    { icon: "🛌", title: "الانسحاب والعزلة", en: "Social Withdrawal", desc: "تجنب الناس والتجمعات لأن كل شيء يتطلب جهداً كبيراً. يُحرم الدماغ من الدعم الاجتماعي والمحفزات الإيجابية.", color: COLORS.coral },
    { icon: "📱", title: "الإفراط في الشاشات", en: "Excessive Screen Time", desc: "الهروب من الأفكار السوداء عبر الشاشات. يُقلل جودة النوم ويُعمّق الانعزال ويُغذّي المقارنات المؤلمة.", color: COLORS.coral },
    { icon: "🍔", title: "اضطراب الأكل", en: "Emotional Eating / Restriction", desc: "استخدام الطعام كمهدئ عاطفي أو العقاب بالجوع. كلاهما يُراكم مشاعر الذنب ويُضاعف الأعراض.", color: COLORS.coral },
    { icon: "💊", title: "تعاطي المواد", en: "Substance Use", desc: "اللجوء للكحول أو المخدرات لتخدير الشعور بالفراغ والحزن. تُهبط المزاج أكثر على المدى الطويل.", color: COLORS.coral },
    { icon: "💭", title: "اجترار الأفكار", en: "Rumination", desc: "الدوران في نفس الأفكار السلبية مراراً — 'لماذا أنا هكذا؟'. يُثبّت الدماغ على الأسوأ ويمنع التعافي.", color: COLORS.coral },
    { icon: "🔇", title: "إسكات المشاعر", en: "Emotional Suppression", desc: "رفض الاعتراف بالحزن أو إخفاؤه. الضغط الداخلي يتراكم حتى يتحول لأعراض جسدية.", color: COLORS.coral },
];

function Maladaptive() {
    return (
        <FadeSection>
            <span style={s.label}>آليات التكيف</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>حين تُخطئ </span><span style={{ color: "#9a0000" }}>طريقة التعامل</span></h2>
            <p style={{ fontSize: "0.875rem", color: "#5d5c5d", marginBottom: 28, lineHeight: 1.7 }}>استجابات تبدو منطقية لتخفيف الألم مؤقتاً — لكنها تُطيل الاكتئاب وتُعمّق دوامته على المدى الطويل.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                {MALAD.map((m, i) => (
                    <div key={i} 
                        onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(154,0,0,0.12)"; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
                        style={{ ...s.card, paddingTop: "1rem", flex: "1 1 260px", maxWidth: "calc(33.33% - 12px)", minWidth: "260px", minHeight: "180px" }}>
                        <div style={{ fontSize: 24, marginBottom: 10, lineHeight: 1, marginTop: "-0.25rem" }}>{m.icon}</div>
                        <div style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#552269", fontSize: "0.95rem", marginBottom: 4 }}>{m.title}</div>
                        <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 10, letterSpacing: "0.05em" }}>{m.en}</div>
                        <p style={{ fontSize: "0.85rem", color: "#5d5c5d", lineHeight: 1.7, margin: 0, fontWeight: "600" }}>{m.desc}</p>
                    </div>
                ))}
            </div>
        </FadeSection>
    );
}

// ── PERSONALITY ───────────────────────────────────────────────────────────
const TRAITS = [
    { ar: "العصابية العالية", en: "High Neuroticism", desc: "الميل الشديد لتجربة المشاعر السلبية والتأثر المفرط بالضغوط اليومية البسيطة." },
    { ar: "الكمالية المرضية", en: "Perfectionism", desc: "معايير مرتفعة جداً تتحول لسلاح ضد الذات عند أي إخفاق مهما كان صغيراً." },
    { ar: "الانطوائية المفرطة", en: "Extreme Introversion", desc: "ميل للهروب للداخل وتجنب التفاعل مع العالم الخارجي كوسيلة للحماية." },
    { ar: "انخفاض الإحساس بالقيمة", en: "Low Self-Worth", desc: "شعور جوهري بعدم الاستحقاق وأن الآخرين أفضل بطبيعتهم — لا كردة فعل على حدث." },
    { ar: "الاعتمادية العاطفية", en: "Emotional Dependency", desc: "الحاجة المفرطة لتأكيد الآخرين للشعور بأن الحياة تستحق أو أن الفرد محبوب." },
    { ar: "السلبية المتعلَّمة", en: "Learned Helplessness", desc: "قناعة عميقة بأن لا شيء يمكن فعله لتغيير الوضع — بعد تجارب متكررة من الإخفاق." },
    { ar: "التشاؤم المزمن", en: "Chronic Pessimism", desc: "تلقائية في توقع الأسوأ في كل موقف — كبرمجة ذهنية ترسّخت بمرور الوقت." },
    { ar: "انخفاض الانفتاح على التجربة", en: "Low Openness", desc: "رفض أو عجز عن تجربة أشياء جديدة بسبب انعدام الحافز الداخلي والطاقة الذهنية." },
];

function Personality() {
    return (
        <FadeSection>
            <span style={s.label}>السمات الشخصية</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#9a0000"}}>الاكتئاب </span><span style={{ color: "#3d1f4b" }}>يُغيّر شخصيتك</span></h2>
            <p style={{ fontSize: "0.875rem", color: COLORS.muted, marginBottom: 24 }}>العيش مع اكتئاب مزمن يُحدث تغييرات عميقة في الشخصية وطريقة رؤية الذات والعالم.</p>
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
    { n: "١", label: "PREFRONTAL CORTEX · قشرة الفص الجبهي", color: COLORS.coral, text: "تنخفض نشاطاً في الاكتئاب — مما يُضعف التخطيط، صنع القرار، والتحكم في المشاعر. يصبح التفكير في 'الخطوة التالية' مرهقاً للغاية." },
    { n: "٢", label: "REWARD SYSTEM · نظام المكافأة", color: COLORS.teal, text: "يُصبح نظام المكافأة خاملاً — الدوبامين لا يُفرز باندفاعه الطبيعي، مما يُفسد الشعور بالمتعة حتى في الأشياء المحبوبة." },
    { n: "٣", label: "AMYGDALA · اللوزة الدماغية", color: COLORS.coral, text: "تُصبح مفرطة النشاط وحساسيتها تجاه المحفزات السلبية ترتفع — فأي فشل صغير يُشعر بالكارثة." },
    { n: "٤", label: "HIPPOCAMPUS · الحُصين والذاكرة", color: COLORS.coral, text: "يُصبح أصغر حجماً مع الاكتئاب المزمن بسبب الكورتيزول المرتفع، مما يجعلك تتذكر المصائب وتنسى الإنجازات." },
    { n: "٥", label: "HPA AXIS · محور الإجهاد", color: COLORS.coral, text: "يعمل محور الإجهاد بشكل مفرط — مستويات الكورتيزول مرتفعة بشكل مزمن مما يُضر بخلايا الدماغ." },
    { n: "٦", label: "NEUROTRANSMITTERS · النواقل العصبية", color: COLORS.teal, text: "انخفاض في السيروتونين يُؤثر على النوم والمزاج، وانخفاض النورإبينفرين يُسبب الإرهاق وبطء التفكير." },
];

function BrainStep({ step, index }) {
    const [ref, visible] = useFadeIn();
    return (
        <div ref={ref} style={{ display: "grid", gridTemplateColumns: "60px 1fr", gap: 16, opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(20px)", transition: `opacity 0.5s ${index * 0.12}s ease, transform 0.5s ${index * 0.12}s ease` }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ width: 52, height: 52, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Tajawal', sans-serif", fontWeight: 900, fontSize: "1.1rem", color: "#fff", border: `2px solid ${COLORS.coral}`, background: COLORS.coral, flexShrink: 0 }}>{step.n}</div>
                {index < BRAIN_STEPS.length - 1 && <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${COLORS.coral}, transparent)`, margin: "4px 0" }} />}
            </div>
            <div style={{ ...s.card, marginBottom: 12, borderColor: COLORS.coral }}>
                <div style={{ fontSize: 12, color: "#552269", letterSpacing: "0.1em", marginBottom: 6, fontWeight: "900", fontFamily: "'Tajawal', sans-serif" }}>{step.label}</div>
                <p style={{ fontSize: "0.875rem", color: "#552269", lineHeight: 1.8, margin: 0, fontWeight: "700" }}>
                    {step.text.split('—')[0]}— 
                    <span style={{ color: "#5d5c5d", fontWeight: "600" }}>{step.text.split('—').slice(1).join('—')}</span>
                </p>
            </div>
        </div>
    );
}
function BrainJourney() {
    return (
        <FadeSection>
            <span style={s.label}>علم الأعصاب</span>
            <h2 style={{ ...s.h2, color: "#3d1f4b" }}><span style={{ color: "#3d1f4b" }}>رحلة داخل </span><span style={{ color: "#9a0000" }}>دماغك</span></h2>
            <p style={{ textAlign: "center", fontSize: "0.875rem", color: COLORS.muted, marginBottom: 32 }}>لماذا لا يستطيع المصاب بالاكتئاب 'مجرد التفكير الإيجابي'؟</p>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {BRAIN_STEPS.map((step, i) => <BrainStep key={i} step={step} index={i} />)}
            </div>
            <div style={{ background: "rgba(154,0,0,0.06)", border: "1px solid rgba(154,0,0,0.2)", borderRadius: 14, padding: "1.5rem", marginTop: 16 }}>
                <p style={{ fontFamily: "'Tajawal', sans-serif", fontWeight: 900, color: "#552269", marginBottom: 16, fontSize: "0.95rem" }}>النتيجة: ماذا تشعر في جسدك وعقلك؟</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 24 }}>
                    {[
                        { title: "في المزاج والعقل", color: "#552269", items: ["حزن عميق لا يتحرك بالمنطق", "فقدان الاهتمام بكل الأشياء", "عجز عن الشعور بالسعادة", "أفكار سلبية تلقائية لا تتوقف"] },
                        { title: "في الجسد والطاقة", color: "#9a0000", items: ["إرهاق لا مبرر له حتى بعد النوم", "بطء في الحركة والكلام", "اضطراب في النوم والشهية", "ألم جسدية غير مفسرة"] },
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
    { icon: "🧩", en: "Cognitive Behavioral Therapy", title: "١. العلاج السلوكي المعرفي (CBT)", color: "#552269", pts: [["إعادة الهيكلة المعرفية:", "ملاحظة الأفكار السلبية التلقائية وتحديها بالمنطق والأدلة."], ["تفعيل السلوك:", "إعادة إدخال الأنشطة الممتعة تدريجياً — الحركة تسبق الحافز وليس العكس."], ["جدولة الأنشطة:", "بناء روتين منظم يُعيد الإحساس بالسيطرة والإنجاز."], ["التعامل مع الاجترار:", "تقنيات قطع الدوامة الذهنية قبل أن تتضخم الأعراض."]] },
    { icon: "💊", en: "Pharmacotherapy", title: "٢. العلاج الدوائي", color: "#5c7f94", pts: [["SSRIs (الخط الأول):", "مثل سيرترالين وفلوكستين — ترفع السيروتونين تدريجياً (تحتاج 2-4 أسابيع)."], ["SNRIs:", "تعالج السيروتونين والنورإبينفرين معاً، مفيدة للإرهاق والألم."], ["Bupropion:", "يعمل على الدوبامين والنورإبينفرين — خيار ممتاز عند فقدان الطاقة."], ["مثبتات المزاج:", "ضرورية لثنائي القطب كالليثيوم واللاموتريجين."]] },
    { icon: "✨", en: "Other Therapies", title: "٣. العلاج المدمج", color: "#9a0000", badge: "الأفضل نتائج", pts: [["", "دمج CBT مع الأدوية يُعطي أفضل النتائج وأقل معدلات انتكاس — الأدوية تُخفف الأعراض بما يُمكّن المريض من الاستفادة من الجلسات."]] },
    { icon: "✨", en: "Other Therapies", title: "٤. علاجات نفسية أخرى", color: "#5d5c72", pts: [["العلاج الشخصي (IPT):", "يُركز على تحسين العلاقات الاجتماعية ومهارات التواصل."], ["العلاج بالقبول والالتزام (ACT):", "قبول المشاعر الصعبة دون مقاومة والتصرف وفق القيم."], ["التحفيز الدماغي (TMS/ECT):", "في حالات الاكتئاب الشديد المقاوم للأدوية."]] },
    { icon: "🌿", en: "Lifestyle & Support", title: "٥. تعديل نمط الحياة والدعم", color: "#3b6e4f", pts: [["الرياضة:", "30 دقيقة يومياً مثبتة علمياً بتأثير مساوٍ للأدوية في الحالات المتوسطة."], ["تنظيم النوم:", "جدول نوم ثابت يُعيد توازن الإيقاع البيولوجي."], ["التغذية:", "نظام غني بأوميغا-3 وحمض الفوليك يدعم الدماغ."], ["الدعم الاجتماعي:", "التحدث مع شخص موثوق يُكسر دوامة العزلة."]] },
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
export default function DepressionDetail() {
    useEffect(() => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&family=Cairo:wght@300;400;600;700;900&display=swap";
        document.head.appendChild(link);
        const style = document.createElement("style");
        style.textContent = `@keyframes fadeIn { from { opacity:0 } to { opacity:1 } } ::-webkit-scrollbar { width:4px } ::-webkit-scrollbar-thumb { background:#9a0000; border-radius:2px }`;
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
                    <Link to="/disease/adhd" style={{ textDecoration: 'none' }} onClick={() => window.scrollTo(0, 0)}>
                        <div onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.background = "#5ba4bd"; }} onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.background = "#4a8fa8"; }} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '0.75rem 1.5rem', background: '#4a8fa8', color: 'white', borderRadius: '50px', fontSize: '1rem', fontWeight: 'bold', transition: 'all 0.3s ease', cursor: 'pointer', boxShadow: '0 8px 20px rgba(74, 143, 168, 0.35)', fontFamily: "'Tajawal', sans-serif" }}>
                            <span>اضطراب ADHD</span>
                            <span style={{ fontSize: '1.2rem', marginTop: -2 }}>←</span>
                        </div>
                    </Link>
                </div>
                <div style={{ textAlign: "center", padding: "2.5rem 1.5rem", borderTop: `1px solid ${COLORS.border}`, fontSize: 13, color: COLORS.muted }}>
                    هذا المحتوى لأغراض تثقيفية فقط · إذا كنت تعاني من أعراض الاكتئاب، تحدث مع <span style={{ color: COLORS.coral }}>متخصص نفسي</span>
                </div>
            </div>
        </div>
    );
}