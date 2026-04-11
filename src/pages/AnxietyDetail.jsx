import { useState } from "react";

const s = {
  page: { background: "#eeeef8", minHeight: "100vh", direction: "rtl", fontFamily: "'Tajawal', sans-serif" },
  breadcrumb: { textAlign: "center", fontSize: "13px", color: "#999", marginBottom: "12px" },
  heroSection: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px 60px", textAlign: "center",background: "linear-gradient(135deg, #f8f5fe 0%, #ede8f7 100%)", },
  heroTitle: { fontSize: "44.5px", fontWeight: "700", color: "#d6936a", marginBottom: "16px",textShadow: "2px 2px 12px rgba(196, 153, 42, 0.6)",fontFamily: "'Roca One', sans-serif" },
  heroSub: { fontSize: "18px", color: "#5a5a7a", maxWidth: "550px" },
  sectionWrapper: { maxWidth: "860px", margin: "0 auto", padding: "60px 24px" },
  sectionLabel: { fontSize: "12px", color: "#aaa", letterSpacing: "1px", marginBottom: "6px", textAlign: "right" },
  sectionTitle: { fontSize: "28px", fontWeight: "700", color: "#3b3b6b", marginBottom: "32px", textAlign: "right" },
  sectionTitleHighlight: { color: "#c4992a" },
  divider: { border: "none", borderTop: "1px solid #d8d8ee", margin: "0 auto", maxWidth: "2000px" },

  /* Definition cards */
  defGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  defCard: (borderColor) => ({
    background: "white", borderRadius: "16px", padding: "24px", border: `2px solid ${borderColor}`,
    position: "relative", overflow: "hidden",
  }),
  defCardBar: (color) => ({ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: color, borderRadius: "16px 16px 0 0" }),
  defCardTitle: { fontSize: "18px", fontWeight: "700", color: "#3b3b6b", marginBottom: "10px" },
  defCardText: { fontSize: "14px", color: "#6f6f8f", lineHeight: "1.8" },

  /* Types grid */
  typesGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  typeCard: (borderColor, active) => ({
    background: "white", borderRadius: "14px", padding: "20px 24px",
    border: `2px solid ${active ? borderColor : "#e0ddf5"}`,
    cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex", justifyContent: "space-between", alignItems: "center",
  }),
  typeNum: (color) => ({ fontSize: "28px", fontWeight: "700", color, opacity: 0.35 }),
  typeLabel: { fontSize: "16px", fontWeight: "700", color: "#3b3b6b" },
  typeSub: { fontSize: "12px", color: "#aaa" },

  /* Symptoms tabs */
  tabRow: { display: "flex", gap: "0", marginBottom: "28px", borderBottom: "2px solid #e0ddf5" },
  tab: (active) => ({
    padding: "10px 20px", fontSize: "15px", cursor: "pointer", fontFamily: "'Tajawal', sans-serif",
    color: active ? "#6b4fa0" : "#999", background: "none", border: "none",
    borderBottom: active ? "2px solid #6b4fa0" : "2px solid transparent",
    marginBottom: "-2px", transition: "0.2s", fontWeight: active ? "700" : "400",
  }),
  symptomsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  symptomCard: (active) => ({
    background: "white", borderRadius: "12px", padding: "16px 20px",
    border: active ? "2px solid #a07ecc" : "1.5px solid #e0ddf5",
    fontSize: "15px", color: "#3b3b6b", display: "flex", alignItems: "center", gap: "10px",
  }),
  dot: (color) => ({ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }),

  /* Causes */
  causeBlock: { background: "white", borderRadius: "16px", padding: "28px 32px", marginBottom: "16px", border: "1.5px solid #e0ddf5", position: "relative" },
  causeBlockHighlight: { background: "white", borderRadius: "16px", padding: "28px 32px", marginBottom: "16px", border: "2px solid #a07ecc" },
  causeNum: { position: "absolute", top: "50%", left: "-20px", transform: "translateY(-50%)", width: "40px", height: "40px", borderRadius: "50%", background: "#493054", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px" },
  causeTitle: { fontSize: "17px", fontWeight: "700", color: "#3b3b6b", marginBottom: "14px", textAlign: "right" },
  causeLine: { fontSize: "14px", color: "#5a5a7a", lineHeight: "2", borderBottom: "1px solid #f0eef8", padding: "6px 0", textAlign: "right" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px", justifyContent: "flex-end" },
  tag: (color) => ({ background: color, borderRadius: "30px", padding: "6px 16px", fontSize: "13px", color: "#3b3b6b" }),

  /* Coping mechanisms */
  copingGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" },
  copingCard: { background: "white", borderRadius: "14px", padding: "20px", border: "1.5px solid #e0ddf5" },
  copingIcon: { fontSize: "22px", marginBottom: "8px" },
  copingTitle: { fontSize: "15px", fontWeight: "700", color: "#3b3b6b", marginBottom: "4px" },
  copingEn: { fontSize: "11px", color: "#bbb", marginBottom: "10px" },
  copingText: { fontSize: "13px", color: "#7a7a9a", lineHeight: "1.7" },
  copingCardWide: { gridColumn: "span 3", background: "white", borderRadius: "14px", padding: "20px 28px", border: "1.5px solid #e0ddf5" },

  /* Personality traits */
  traitsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "14px" },
  traitCard: (borderColor) => ({ background: "white", borderRadius: "14px", padding: "18px 16px", border: `2px solid ${borderColor}`, position: "relative", overflow: "hidden" }),
  traitBar: (color) => ({ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: color }),
  traitTitle: { fontSize: "14px", fontWeight: "700", color: "#3b3b6b", marginBottom: "4px" },
  traitEn: { fontSize: "11px", color: "#bbb", marginBottom: "8px" },
  traitText: { fontSize: "12px", color: "#7a7a9a", lineHeight: "1.6" },

  /* Brain journey */
  brainList: { display: "flex", flexDirection: "column", gap: "12px" },
  brainCard: (active) => ({
    background: "white", borderRadius: "14px", padding: "20px 28px",
    border: active ? "2px solid #a07ecc" : "1.5px solid #e0ddf5",
    display: "flex", alignItems: "flex-start", gap: "20px",
  }),
  brainNum: (bg) => ({ minWidth: "40px", height: "40px", borderRadius: "50%", background: bg, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px" }),
  brainTitle: { fontSize: "16px", fontWeight: "700", color: "#3b3b6b", marginBottom: "4px" },
  brainEn: { fontSize: "11px", color: "#bbb", marginBottom: "6px" },
  brainText: { fontSize: "13px", color: "#6a6a8a", lineHeight: "1.7" },

  /* Result box */
  resultBox: { background: "white", borderRadius: "16px", padding: "28px 36px", border: "1.5px solid #e0ddf5", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" },
  resultCol: {},
  resultColTitle: { fontSize: "14px", fontWeight: "700", color: "#6b4fa0", marginBottom: "14px" },
  resultItem: { fontSize: "14px", color: "#4a4a6a", lineHeight: "2", display: "flex", alignItems: "center", gap: "8px" },
  resultDot: (c) => ({ width: "6px", height: "6px", borderRadius: "50%", background: c, flexShrink: 0 }),
};

const symptomTabs = ["الأعراض الجسدية", "المعرفية والنفسية", "السلوكية", "نوبات الهلع"];
const symptomData = {
  "الأعراض الجسدية": [
    { text: "آلام وشد مستمر في العضلات", color: "#f4c0c0" },
    { text: "التعب والإرهاق المستمر", color: "#f4c0c0" },
    { text: "اضطرابات النوم", color: "#c0d5f4" },
    { text: "تسارع وخفقان في ضربات القلب", color: "#c0d5f4" },
    { text: "ارتعاش", color: "#f4d5c0" },
    { text: "غثيان واضطرابات الجهاز الهضمي", color: "#f4d5c0" },
  ],
  "المعرفية والنفسية": [
    { text: "أفكار متسارعة لا تهدأ", color: "#d5c0f4" },
    { text: "صعوبة في التركيز", color: "#d5c0f4" },
    { text: "توقع الأسوأ دائماً", color: "#c0f4d5" },
    { text: "الشعور بفقدان السيطرة", color: "#c0f4d5" },
    { text: "الخوف المستمر من الحكم عليك", color: "#f4f0c0" },
    { text: "صعوبة اتخاذ القرارات", color: "#f4f0c0" },
  ],
  "السلوكية": [
    { text: "تجنب المواقف المثيرة للقلق", color: "#f4c0c0" },
    { text: "طلب الطمأنينة المفرطة", color: "#c0d5f4" },
    { text: "التسويف والتأجيل", color: "#f4d5c0" },
    { text: "الانسحاب الاجتماعي", color: "#d5c0f4" },
    { text: "التحقق المتكرر من المثيرات", color: "#c0f4d5" },
    { text: "إيقاف جميع الجهود والاستسلام", color: "#f4f0c0" },
  ],
  "نوبات الهلع": [
    { text: "تسارع شديد في ضربات القلب", color: "#f4c0c0" },
    { text: "ضيق أو تسارع في التنفس", color: "#f4c0c0" },
    { text: "ألم أو ضغط في الصدر", color: "#c0d5f4" },
    { text: "تعرق وارتجاف في اليدين", color: "#c0d5f4" },
    { text: "دوار أو شعور بعدم التوازن", color: "#f4d5c0" },
    { text: "شعور بالانفصال عن الواقع", color: "#f4d5c0" },
  ],
};

const types = [
  { id: 1, label: "اضطراب القلق العام", en: "Generalized Anxiety Disorder", color: "#c8d5f4" },
  { id: 2, label: "اضطراب الهلع", en: "Panic Disorder", color: "#f4c8d5" },
  { id: 3, label: "رهاب الميادين", en: "Agoraphobia", color: "#f4dcc8" },
  { id: 4, label: "القلق الاجتماعي", en: "Social Anxiety", color: "#f4c8c8" },
  { id: 5, label: "قلق الانفصال", en: "Separation Anxiety", color: "#c8f4d8" },
  { id: 6, label: "الرهاب المحدد", en: "Specific Phobias", color: "#dcc8f4" },
  { id: 7, label: "الخرس الانتقائي", en: "Selective Mutism", color: "#c8f4f0" },
  { id: 8, label: "القلق الناتج عن حالات طبية أو مواد", en: "Medical / Substance-Induced", color: "#f4f0c8" },
];

const typeColors = ["#abc3d1","#f4c8d5","#f4dcc8","#f4c8c8","#c8f4d8","#dcc8f4","#c8f4f0","#f4f0c8"];

const brainSteps = [
  { title: "اللوزة الدماغية", en: "AMYGDALA", text: "تُفسِّر اللوزة الدماغية محفزاً عادياً أو فكرة داخلية على أنه خطر حقيقي رغم عدم وجود تهديد فعلي.", bg: "#493054" },
  { title: "إشارات الإنذار", en: "ALARM SIGNAL", text: "ترسل اللوزة الدماغية إشارات إنذار سريعة إلى أجزاء أخرى من الدماغ لتفعيل استجابة الخطر.", bg: "#7b5fa0" },
  { title: "قشرة الفص الجبهي", en: "PREFRONTAL CORTEX", text: "يُفترض أن تقوم قشرة الفص الجبهي بتحليل الموقف بشكل منطقي وإيقاف الإنذار – لكنها في اضطرابات القلق تكون أضعف من المعتاد.", bg: "#a07ecc" },
  { title: "الناقل العصبية", en: "NEUROTRANSMITTERS", text: "يحدث انخفاض في تأثير الناقل العصبي المهدئ GABA وارتفاع في الناقلات المحفزة كالغلوتامات، مما يزيد من نشاط الدوائر العصبية المرتبطة بالخوف.", bg: "#c4992a" },
  { title: "تحت المهاد", en: "HYPOTHALAMUS", text: "ترسل اللوزة الدماغية إشارات إلى تحت المهاد، الذي يُفعِّل سلسلة هرمونية عبر الغدة النخامية وصولاً إلى الغدد الكظرية.", bg: "#3b7a9a" },
  { title: "الغدد الكظرية", en: "ADRENAL GLANDS", text: "تستجيب الغدد الكظرية بإفراز كميات كبيرة من الأدرينالين والكورتيزول في مجرى الدم في حالة نوبات الهلع، وكميات خفيفة في الحالات الأخرى.", bg: "#9a6b3b" },
  { title: "استجابة الجسم", en: "BODY RESPONSE", text: "تؤدي هذه الهرمونات إلى رفع حالة التأهب الجسدي استعداداً لمواجهة خطر مفترض.", bg: "#4a7a5a" },
];

const copingCards = [
  { icon: "🚫", title: "التجنب العميق", en: "Avoidance", text: "الهروب من المواقف المُثيرة للقلق. يعتقد الدماغ أن التجنب سبب البقاء بأمان. لكن القلق يعود بضراوة أكبر." },
  { icon: "😶", title: "الانسحاب السلوكي", en: "Behavioral Withdrawal", text: "إيقاف جميع الجهود وإدارة البيئة، والاستسلام التام للقلق." },
  { icon: "😔", title: "إلقاء اللوم على الذات", en: "Self-blame", text: "توجيه الضيق للداخل مما يؤدي سريعاً لاكتساب مصاحب واجترار الأفكار السلبية." },
  { icon: "🍺", title: "تعاطي المواد", en: "Substance Use", text: "اللجوء للكحول أو الأدوية لتخدير الجهاز العصبي وتخفيف التوتر مؤقتاً." },
  { icon: "🙅", title: "الإنكار", en: "Denial", text: "رفض الاعتراف بوجود المشكلة أو حجمها الحقيقي كوسيلة للتهرب من مواجهتها." },
  { icon: "🙏", title: "طلب الطمأنينة المفرطة", en: "Excessive Reassurance Seeking", text: "الاعتماد المستمر على الآخرين للحصول على تأكيدات. وهي تزيد القلق على المدى الطويل." },
];

const traitCards = [
  { title: "العصابية العالية", en: "High Neuroticism", text: "الميل الشديد لتجربة المشاعر السلبية – السمة الأبرز ارتباطاً بالقلق.", color: "#ddc8f4", bar: "#a07ecc" },
  { title: "الكمالية والمثالية", en: "Perfectionism", text: "دافع مهووس للكمال لتجنب الفشل أو الرفض، غالباً 'قلق عالي الأداء'.", color: "#f4dcc8", bar: "#c4992a" },
  { title: "الانطوائية والانسحاب", en: "Introversion", text: "الميل للهروب للداخل والانسحاب من التفاعلات الاجتماعية، غالباً مع خجل شديد.", color: "#c8d5f4", bar: "#6a8fc4" },
  { title: "فرط اليقظة المزمن", en: "Chronic Hypervigilance", text: "شخصية تعيش في حالة رادار دائم، تمسح البيئة وتتوقع الخطر في كل زاوية.", color: "#c8f4e0", bar: "#4a9a6a" },
  { title: "التصلب والسيطرة", en: "Rigidity & Control", text: "فرض سيطرة صارمة على كل التفاصيل لتجنب المفاجآت وتقليل التوتر الداخلي.", color: "#f4c8c8", bar: "#c46a6a" },
  { title: "الاعتمادية", en: "Dependency", text: "الميل للاعتماد المفرط على الآخرين للحصول على الطمأنينة وإدارة المواقف الصعبة.", color: "#f4f0c8", bar: "#c4b44a" },
  { title: "السمات الاجتنابية", en: "Avoidant Traits", text: "ميل مرضي لتجنب العزلة. رعب من الانتقاد وانخفاض ملحوظ في الثقة بالنفس.", color: "#c8f4f4", bar: "#4aaac4" },
  { title: "انخفاض التوافقية", en: "Decreased Agreeableness", text: "بسبب الضغط الداخلي والتهيج المستمر، قد تصبح الشخصية أقل مرونة مع الآخرين.", color: "#f4c8f0", bar: "#c46ab4" },
];

export default function AnxietyDetail() {
  const [activeTab, setActiveTab] = useState("الأعراض الجسدية");
  const [activeType, setActiveType] = useState(null);

  return (
    <div style={s.page}>

      {/* Hero */}
      <div style={s.heroSection}>
        <div style={s.breadcrumb}>الاضطرابات النفسية &gt; القلق</div>
        <h1 style={s.heroTitle}>القلق... إنذار بلا حريق</h1>
        <p style={s.heroSub}>
          القلق ليس مبالغة، هو اضطراب يحارب{" "}
          <strong style={{ color: "#493054" }}>359 مليون شخص</strong>{" "}
          حول العالم
        </p>
      </div>

      <hr style={s.divider} />

      {/* ما هو القلق */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>التعريف</div>
        <h2 style={s.sectionTitle}>
          ما هو <span style={s.sectionTitleHighlight}>القلق</span>؟
        </h2>
        <div style={s.defGrid}>
          <div style={s.defCard("#e8d5b0")}>
            <div style={s.defCardBar("#d6936a")} />
            <div style={s.defCardTitle}>القلق الطبيعي</div>
            <div style={s.defCardText}>
              شعور طبيعي عند الجميع، هو نظام إنذار مبكر في الدماغ يحميك من الأخطار المحتملة ليجعلك أكثر تركيزاً ويقظةً لتستطيع التخطيط وتجنب الأخطاء واكتساب الخبرة.
            </div>
          </div>
          <div style={s.defCard("#ddc8f4")}>
            <div style={s.defCardBar("#a07ecc")} />
            <div style={s.defCardTitle}>اضطراب القلق</div>
            <div style={s.defCardText}>
              عطل في هذا النظام، يجعله يرسل إشعارات طوارئ مزيفة باستمرار حتى في أوقات الأمان، مما يسبب ضغطاً كبيراً وتعطلاً في الحياة اليومية.
            </div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* أنواع الاضطراب */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>الأنواع</div>
        <h2 style={s.sectionTitle}>
          أنواع <span style={s.sectionTitleHighlight}>الاضطراب</span> وأشكاله
        </h2>
        <p style={{ fontSize: "14px", color: "#999", textAlign: "right", marginBottom: "24px" }}>
          كل أحد فينا مميز بطريقته، حتى في اضطرابه.
        </p>
        <div style={s.typesGrid}>
          {types.map((t) => (
            <div
              key={t.id}
              style={s.typeCard(typeColors[t.id - 1], activeType === t.id)}
              onClick={() => setActiveType(activeType === t.id ? null : t.id)}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              <div>
                <div style={s.typeLabel}>{t.label}</div>
                <div style={s.typeSub}>{t.en}</div>
              </div>
              <div style={s.typeNum(typeColors[t.id - 1])}>{t.id}</div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "13px", color: "#bbb", textAlign: "center", marginTop: "16px" }}>اضغط على أي بطاقة لعرض التفاصيل</p>
      </div>

      <hr style={s.divider} />

      {/* الأعراض */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>الأعراض</div>
        <h2 style={s.sectionTitle}>
          كيف يظهر <span style={s.sectionTitleHighlight}>القلق</span> في جسدك؟
        </h2>
        <div style={s.tabRow}>
          {symptomTabs.map(tab => (
            <button key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <div style={s.symptomsGrid}>
          {(symptomData[activeTab] || []).map((item, i) => (
            <div key={i} style={s.symptomCard(false)}>
              <div style={s.dot(item.color)} />
              {item.text}
            </div>
          ))}
        </div>
      </div>

      <hr style={s.divider} />

      {/* الأسباب */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>الأسباب</div>
        <h2 style={s.sectionTitle}>
          من أين يأتي <span style={s.sectionTitleHighlight}>القلق</span>؟
        </h2>

        <div style={{ position: "relative", paddingRight: "30px" }}>
          <div style={s.causeBlock}>
            <div style={s.causeNum}>1</div>
            <div style={s.causeTitle}>العوامل الجينية والوراثية</div>
            <div style={s.causeLine}>ينتقل الاستعداد للإصابة بالقلق عبر العائلة.</div>
            <div style={s.causeLine}>تصبح اللوزة الدماغية (مركز الخوف) مفرطة النشاط، بينما تضعف قشرة الفص الجبهي (المنطقة المنطقية) عن كبح هذا الخوف وتهدئته.</div>
            <div style={s.causeLine}>نقص وراثي في النواقل العصبية المهدئة مثل GABA ومشاكل في تنظيم السيروتونين والنورإبينفرين، مما يجعل الدماغ في حالة تأهب دائم.</div>
          </div>

          <div style={s.causeBlockHighlight}>
            <div style={s.causeNum}>2</div>
            <div style={s.causeTitle}>العوامل البيئية والضغوطات</div>
            <div style={{ fontSize: "14px", color: "#5a5a7a", marginBottom: "12px", textAlign: "right" }}>
              البيئة التي تنشأ فيها والضغوط والصدمات التي تتعرض لها هي المحفز الذي يُشعل الاستعداد الجيني الكامن لديك، مثل:
            </div>
            <div style={s.tagRow}>
              {["الحماية الأبوية المفرطة","التربية الاستبدادية القاسية","اكتساب القلق من مراقبة آباء قلقين","الإهمال العاطفي المستمر","التعرض للإيذاء البدني أو النفسي","إجبار الطفل على تلبية الاحتياجات العاطفية للبالغين","الإجهاد والضغوط المزمنة","غياب الرعاية الثابتة والموثوقة من الوالدين"].map((t, i) => (
                <span key={i} style={s.tag(["#f4e0cc","#ddc8f4","#c8d5f4","#c8f4e0","#f4c8c8","#f4f0c8","#c8f4f0","#f4c8f0"][i % 8])}>{t}</span>
              ))}
            </div>
          </div>

          <div style={s.causeBlock}>
            <div style={s.causeNum}>3</div>
            <div style={s.causeTitle}>العوامل الجسدية والوراثية</div>
            <div style={s.causeLine}>مشاكل الغدة الدرقية: فرط نشاطها يسبب أعراضاً تحاكي نوبات الهلع تماماً.</div>
            <div style={s.causeLine}>التقلبات الحادة في الهرمونات الجنسية كالإستروجين والبروجستيرون أو التستوستيرون.</div>
            <div style={s.causeLine}>اختلال بكتيريا الأمعاء (الميكروبيوم)؛ قد يسبب التهابات عصبية تعبر إلى الدماغ مما يزيد من مستويات القلق.</div>
            <div style={s.causeLine}>أمراض القلب – الأورام الكظرية – بعض الأدوية والمخدرات – أعراض الانسحاب من المواد المخدرة.</div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* آليات التكيف */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>آليات التكيف</div>
        <h2 style={s.sectionTitle}>
          حين تُخطئ <span style={s.sectionTitleHighlight}>طريقة التعامل</span>
        </h2>
        <p style={{ fontSize: "14px", color: "#999", textAlign: "right", marginBottom: "24px" }}>
          هي استجابات سلوكية وعاطفية مختلفة يلجأ إليها الفرد للتهرب من الألم النفسي. رغم أنها قد توفر راحة مؤقتة إلا أنها تزيد من حدة القلق وتفاقمه على المدى الطويل.
        </p>
        <div style={s.copingGrid}>
          {copingCards.map((c, i) => (
            <div key={i} style={s.copingCard}>
              <div style={s.copingIcon}>{c.icon}</div>
              <div style={s.copingTitle}>{c.title}</div>
              <div style={s.copingEn}>{c.en}</div>
              <div style={s.copingText}>{c.text}</div>
            </div>
          ))}
          <div style={s.copingCardWide}>
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "22px" }}>🌀</div>
              <div>
                <div style={s.copingTitle}>الهروب والتركيز على المشاعر</div>
                <div style={s.copingEn}>Emotional Avoidance</div>
                <div style={s.copingText}>محاولة الهروب والتركيز على المشاعر السلبية الناتجة عن التوتر بدلاً من استخدام استراتيجيات نشطة وفعالة لحل المشكلات الأساسية، مما يرتبط بارتفاع مستويات القلق.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* السمات الشخصية */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>السمات الشخصية</div>
        <h2 style={s.sectionTitle}>
          القلق يُغيِّر <span style={s.sectionTitleHighlight}>شخصيتك</span>
        </h2>
        <p style={{ fontSize: "14px", color: "#999", textAlign: "right", marginBottom: "24px" }}>
          العيش مع قلق مزمن يحدث تغييرات في شخصيتك بمرور الوقت.
        </p>
        <div style={s.traitsGrid}>
          {traitCards.map((t, i) => (
            <div key={i} style={s.traitCard(t.color)}>
              <div style={s.traitBar(t.bar)} />
              <div style={{ height: "8px" }} />
              <div style={s.traitTitle}>{t.title}</div>
              <div style={s.traitEn}>{t.en}</div>
              <div style={s.traitText}>{t.text}</div>
            </div>
          ))}
        </div>
      </div>

      <hr style={s.divider} />

      {/* رحلة داخل الدماغ */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>علم الأعصاب</div>
        <h2 style={s.sectionTitle}>
          رحلة داخل <span style={s.sectionTitleHighlight}>دماغك</span>
        </h2>
        <p style={{ fontSize: "14px", color: "#999", textAlign: "right", marginBottom: "28px" }}>
          ماذا يحدث بالضبط داخل دماغ شخص يعاني من اضطراب القلق؟
        </p>
        <div style={s.brainList}>
          {brainSteps.map((step, i) => (
            <div key={i} style={s.brainCard(false)}>
              <div style={s.brainNum(step.bg)}>{i + 1}</div>
              <div>
                <div style={s.brainTitle}>{step.title} · <span style={{ fontSize: "12px", color: "#bbb", fontWeight: "400" }}>{step.en}</span></div>
                <div style={s.brainText}>{step.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* النتيجة */}
        <div style={{ ...s.causeBlock, marginTop: "28px" }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#3b3b6b", marginBottom: "20px", textAlign: "right" }}>
            النتيجة: ماذا تشعر في جسدك؟
          </div>
          <div style={s.resultBox}>
            <div>
              <div style={s.resultColTitle}>في نوبات الهلع</div>
              {["تسارع شديد في ضربات القلب","ضيق أو تسارع في التنفس","ألم أو ضغط في الصدر","تعرق وارتجاف في اليدين والجسم","دوار أو شعور بعدم التوازن"].map((t, i) => (
                <div key={i} style={s.resultItem}><div style={s.resultDot("#a07ecc")} />{t}</div>
              ))}
            </div>
            <div>
              <div style={{ ...s.resultColTitle, color: "#c4992a" }}>في الاضطرابات الأخرى</div>
              {["توتر في العضلات","تسارع بسيط في ضربات القلب","تنفس أسرع قليلاً","شعور بعدم الارتياح أو الترقب","صعوبة في التركيز"].map((t, i) => (
                <div key={i} style={s.resultItem}><div style={s.resultDot("#c4992a")} />{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
