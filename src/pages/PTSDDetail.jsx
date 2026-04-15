import { useState } from "react";



const s = {
  page: { background: "#f4f4ff", minHeight: "100vh", direction: "rtl", fontFamily: "'Tajawal', sans-serif" },
  breadcrumb: { textAlign: "center", fontSize: "13px", color: "#a88285", marginBottom: "12px" },
  heroSection: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: "80px 20px 60px", textAlign: "center",
    background: "linear-gradient(135deg, #f7f0f1 0%, #ede0e1 100%)",
  },
  heroTitle: {
    fontSize: "44.5px", fontWeight: "700", color: "#574144", marginBottom: "16px",
    textShadow: "2px 2px 12px rgba(87, 65, 68, 0.4)", fontFamily: "'Tajawal', sans-serif",
  },
  heroSub: { fontSize: "18px", color: "#6e5255", maxWidth: "560px" },
  sectionWrapper: { maxWidth: "860px", margin: "0 auto", padding: "60px 24px" },
  sectionLabel: { fontSize: "12px", color: "#a88285", letterSpacing: "1px", marginBottom: "6px", textAlign: "right" },
  sectionTitle: { fontSize: "28px", fontWeight: "700", color: "#3b2a2c", marginBottom: "32px", textAlign: "right" },
  sectionTitleHighlight: { color: "#8a6366" },
  divider: { border: "none", borderTop: "1px solid #ddd0d1", margin: "0 auto", maxWidth: "2000px" },
  defGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  defCard: (borderColor) => ({ background: "white", borderRadius: "16px", padding: "24px", border: `2px solid ${borderColor}`, position: "relative", overflow: "hidden" }),
  defCardBar: (color) => ({ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: color, borderRadius: "16px 16px 0 0" }),
  defCardTitle: { fontSize: "18px", fontWeight: "700", color: "#3b2a2c", marginBottom: "10px" },
  defCardText: { fontSize: "14px", color: "#6e5255", lineHeight: "1.8" },
  typesGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  typeCard: () => ({
    background: "white", borderRadius: "14px", padding: "24px 24px 20px",
    border: "2px solid white", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex", flexDirection: "row", justifyContent: "flex-start",
    alignItems: "center", gap: "16px", position: "relative", overflow: "hidden",
    boxShadow: "0 2px 12px rgba(87,65,68,0.07)",
  }),
  typeNum: (color) => ({ fontSize: "28px", fontWeight: "700", color, opacity: 0.55, flexShrink: 0 }),
  typeLabel: { fontSize: "16px", fontWeight: "700" },
  typeSub: { fontSize: "12px", color: "#a88285" },
  tabRow: { display: "flex", gap: "0", marginBottom: "28px", borderBottom: "2px solid #8a6366" },
  tab: (active) => ({
    padding: "10px 20px", fontSize: "15px", cursor: "pointer", fontFamily: "'Tajawal', sans-serif",
    color: active ? "#574144" : "#a88285", background: "none", border: "none",
    borderBottom: active ? "2px solid #574144" : "2px solid transparent",
    marginBottom: "-2px", transition: "0.2s", fontWeight: active ? "700" : "400",
  }),
  symptomsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  symptomCard: () => ({
    background: "white", borderRadius: "12px", padding: "16px 20px",
    border: "1.5px solid #e8d0d2",
    fontSize: "14px", color: "#3b2a2c", display: "flex", alignItems: "flex-start", gap: "10px",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 12px rgba(87,65,68,0.08)",
  }),
  dot: (color) => ({ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0, marginTop: "6px" }),
  causeBlock: { background: "white", borderRadius: "16px", padding: "28px 32px", marginBottom: "0", border: "1.5px solid #e8d0d2", position: "relative" },
  causeBlockHighlight: { background: "white", borderRadius: "16px", padding: "28px 32px", marginBottom: "0", border: "2px solid #8a6366" },
  causeTitle: { fontSize: "17px", fontWeight: "700", color: "#3b2a2c", marginBottom: "14px", textAlign: "right" },
  causeLine: { fontSize: "14px", color: "#6e5255", lineHeight: "2", borderBottom: "1px solid #f5eced", padding: "6px 0", textAlign: "right" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px", justifyContent: "flex-end" },
  tag: (color) => ({ background: color, borderRadius: "30px", padding: "6px 16px", fontSize: "13px", color: "#3b2a2c" }),
  copingGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" },
  copingCard: { background: "white", borderRadius: "14px", padding: "20px", border: "1.5px solid #e8d0d2", transition: "border 0.2s" },
  copingCardWide: { gridColumn: "span 3", background: "white", borderRadius: "14px", padding: "20px 28px", border: "1.5px solid #e8d0d2", transition: "border 0.2s" },
  copingIcon: { fontSize: "22px", marginBottom: "8px" },
  copingTitle: { fontSize: "15px", fontWeight: "700", color: "#3b2a2c", marginBottom: "4px" },
  copingEn: { fontSize: "11px", color: "#c9a5a8", marginBottom: "10px" },
  copingText: { fontSize: "13px", color: "#8a6366", lineHeight: "1.7" },
  traitsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "14px" },
  traitCard: (borderColor) => ({ background: "white", borderRadius: "14px", padding: "18px 16px", border: `2px solid ${borderColor}`, position: "relative", overflow: "hidden" }),
  traitBar: (color) => ({ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: color }),
  traitTitle: { fontSize: "14px", fontWeight: "700", color: "#3b2a2c", marginBottom: "4px" },
  traitEn: { fontSize: "11px", color: "#c9a5a8", marginBottom: "8px" },
  traitText: { fontSize: "12px", color: "#8a6366", lineHeight: "1.6" },
  brainList: { display: "flex", flexDirection: "column", gap: "12px" },
  brainNum: (bg) => ({ minWidth: "40px", height: "40px", borderRadius: "50%", background: bg, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px" }),
  brainTitle: { fontSize: "16px", fontWeight: "700", color: "#3b2a2c", marginBottom: "4px" },
  brainText: { fontSize: "13px", color: "#6e5255", lineHeight: "1.7" },
  resultBox: { background: "white", borderRadius: "16px", padding: "28px 36px", border: "1.5px solid #e8d0d2", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" },
  resultColTitle: { fontSize: "14px", fontWeight: "700", color: "#574144", marginBottom: "14px" },
  resultItem: { fontSize: "14px", color: "#4a3436", lineHeight: "2", display: "flex", alignItems: "center", gap: "8px" },
  resultDot: (c) => ({ width: "6px", height: "6px", borderRadius: "50%", background: c, flexShrink: 0 }),
};

// ======================== البيانات ========================

const symptomTabs = ["الاقتحامية", "التجنب", "التغيرات المعرفية والمزاجية", "الاستثارة وردود الفعل"];
const symptomData = {
  "الاقتحامية": [
    { text: "ذكريات مؤلمة ومتكررة تظهر دون إرادة الشخص", color: "#c9a5a8" },
    { text: "كوابيس مزعجة تشابه مشاعر الحدث الصادم", color: "#c9a5a8" },
    { text: "فلاشباك: الشعور بأن الحدث يتكرر في الحاضر", color: "#a88285" },
    { text: "فقدان الوعي بالمحيط الحالي في الحالات الشديدة", color: "#a88285" },
    { text: "تسارع ضربات القلب عند التعرض لمثيرات الصدمة", color: "#8a6366" },
    { text: "زيادة التعرق عند أي إشارة تذكر بالحدث", color: "#8a6366" },
  ],
  "التجنب": [
    { text: "تجنب الأفكار والمشاعر المرتبطة بالحدث الصادم", color: "#c9a5a8" },
    { text: "تجنب الذكريات الداخلية المؤلمة بكل الوسائل", color: "#c9a5a8" },
    { text: "الابتعاد عن الأشخاص المرتبطين بالصدمة", color: "#a88285" },
    { text: "تجنب الأماكن والمحادثات التي تثير الذكريات", color: "#a88285" },
    { text: "الانسحاب من الأنشطة التي كانت ممتعة سابقاً", color: "#8a6366" },
    { text: "تجاهل أي محفز خارجي يذكر بالحدث", color: "#8a6366" },
  ],
  "التغيرات المعرفية والمزاجية": [
    { text: "فجوات الذاكرة: عجز عن تذكر أجزاء من الحدث", color: "#c9a5a8" },
    { text: "معتقدات سلبية مشوهة: 'أنا سيء' أو 'العالم خطر'", color: "#c9a5a8" },
    { text: "لوم الذات أو الآخرين بشكل مشوه وغير منطقي", color: "#a88285" },
    { text: "مشاعر خوف ورعب وغضب وخزي وذنب مستمرة", color: "#a88285" },
    { text: "الانفصال العاطفي عن الأسرة والأصدقاء والمجتمع", color: "#8a6366" },
    { text: "صعوبة في الشعور بالمشاعر الإيجابية كالسعادة", color: "#8a6366" },
  ],
  "الاستثارة وردود الفعل": [
    { text: "نوبات غضب مفاجئة وسلوك عدواني لفظي أو جسدي", color: "#c9a5a8" },
    { text: "السلوك المتهور: الانخراط في أفعال خطيرة ومدمرة", color: "#c9a5a8" },
    { text: "اليقظة المفرطة: حذر شديد وترقب دائم للخطر", color: "#a88285" },
    { text: "رد فعل الجفلة المبالغ فيه من الأصوات المفاجئة", color: "#a88285" },
    { text: "صعوبة في التركيز على المهام اليومية", color: "#8a6366" },
    { text: "اضطرابات النوم: صعوبة النوم أو نوم متقطع مزعج", color: "#8a6366" },
  ],
};

const types = [
  { id: 1, label: "ما بعد الصدمة المعقد", en: "C-PTSD", color: "#574144" },
  { id: 2, label: "النمط الانفصامي", en: "Dissociative Subtype", color: "#6e5255" },
  { id: 3, label: "ذو التعبير المتأخر", en: "Delayed Expression", color: "#8a6366" },
  { id: 4, label: "ما بعد الصدمة لدى الأطفال", en: "Preschool PTSD", color: "#a88285" },
  { id: 5, label: "اضطراب التوتر الحاد", en: "Acute Stress Disorder", color: "#c9a5a8" },
];

const typeColors = ["#574144", "#6e5255", "#8a6366", "#a88285", "#c9a5a8"];

const typeDetails = {
  1: [
    "ينتج عادة عن التعرض لصدمات متكررة أو طويلة الأمد لا يمكن الهروب منها، مثل الإساءة المزمنة في الطفولة أو العنف المنزلي.",
    "يكون هذا النوع صعوبة في تنظيم العواطف، ومشاكل حادة في تحديد الهوية والعلاقات مع الآخرين.",
    "يختلف عن PTSD الكلاسيكي في عمق التأثير على الشخصية والهوية — يشعر الشخص بأنه 'مكسور بشكل جوهري'.",
  ],
  2: [
    "يعاني فيه المصاب من 'تبدد الشخصية' — الشعور بالانفصال عن الجسد كأنه يراقب نفسه من الخارج.",
    "أو 'الغربة عن الواقع' — الشعور بأن العالم من حوله غير حقيقي أو يشبه الحلم.",
    "هو آلية دفاع دماغية لحماية الشخص من ألم عاطفي لا يمكن احتماله في تلك اللحظة.",
  ],
  3: [
    "هو النمط الذي لا تكتمل فيه معايير التشخيص الكاملة إلا بعد مرور 6 أشهر على الأقل من وقوع الحدث الصادم.",
    "رغم أن بعض الأعراض الطفيفة قد تظهر قبل ذلك، فإن التأخر في الظهور يُربك الشخص ويجعله يشك في مشاعره.",
    "يرتبط أحياناً بتغيرات حياتية كبيرة تُفعّل الصدمة الكامنة من جديد.",
  ],
  4: [
    "مخصص للأطفال في عمر 6 سنوات أو أقل، حيث تختلف طريقة التعبير عن الصدمة جذرياً.",
    "تظهر الأعراض غالباً من خلال اللعب الذي يعيد تمثيل الحدث الصادم بطريقة متكررة وقهرية.",
    "أو تظهر كوابيس مخيفة لا يستطيع الطفل شرح محتواها أو ربطها بحدث معين.",
  ],
  5: [
    "حالة مشابهة جداً لاضطراب ما بعد الصدمة، تظهر أعراضها فوراً بعد وقوع الصدمة.",
    "تستمر لفترة تتراوح بين 3 أيام وشهر واحد — هي في الأساس استجابة صدمة حادة.",
    "إذا استمرت الأعراض لأكثر من شهر، يتم إعادة تشخيصها كاضطراب ما بعد الصدمة الكامل.",
  ],
};

const copingCards = [
  { icon: "🏃", title: "التجنب المزمن", en: "Chronic Avoidance", text: "الهروب من كل ما يذكر بالصدمة — أشخاص، أماكن، أفكار. يُبقي الدماغ في حالة خوف دائمة لأنه لم يتعلم أن الخطر انتهى." },
  { icon: "😶", title: "التخدير العاطفي", en: "Emotional Numbing", text: "إغلاق الباب أمام جميع المشاعر — السيئة والجيدة معاً. يُشعر الشخص بالفراغ الداخلي والانفصال عن الحياة." },
  { icon: "🍺", title: "تعاطي المواد", en: "Substance Use", text: "اللجوء للكحول أو المخدرات لتخدير الذاكرة والبقاء بعيداً عن الفلاشباك — يُحكم قبضة الصدمة على المدى الطويل." },
  { icon: "😤", title: "فرط اليقظة والتحكم", en: "Hypervigilance & Control", text: "إخضاع كل جانب من جوانب الحياة لسيطرة صارمة محاولةً لمنع أي مفاجأة. يُرهق الشخص ويُنهك علاقاته." },
  { icon: "🙅", title: "الانعزال الاجتماعي", en: "Social Withdrawal", text: "الانسحاب من الناس والعلاقات خشية الحكم أو الأذى أو الاضطرار للتحدث عن الصدمة. يُعمّق العزلة والاكتئاب." },
  { icon: "😔", title: "إلقاء اللوم على الذات", en: "Self-Blame", text: "تحميل النفس مسؤولية ما حدث كمحاولة لاستعادة الإحساس بالتحكم — 'لو فعلت كذا لما حدث هذا'." },
];

const traitCards = [
  { title: "فرط اليقظة المزمن", en: "Chronic Hypervigilance", text: "حالة رادار دائم لا يتوقف — الدماغ يمسح البيئة بحثاً عن التهديدات حتى في أوقات الأمان التام.", color: "#f0e4e5", bar: "#574144" },
  { title: "الانسحاب الاجتماعي", en: "Social Withdrawal", text: "ميل عميق لتجنب الناس والعلاقات خشية أن تُعيد التفاعلات الاجتماعية تنشيط الذكريات المؤلمة.", color: "#ead5d7", bar: "#6e5255" },
  { title: "الكمالية الدفاعية", en: "Defensive Perfectionism", text: "السيطرة على كل التفاصيل كوسيلة لمنع الخسارة أو المفاجأة مجدداً — محاولة مستمرة للتحكم بالعالم.", color: "#e0c8ca", bar: "#8a6366" },
  { title: "العصابية العالية", en: "High Neuroticism", text: "ميل مكثف لتجربة المشاعر السلبية والاستجابة بقوة لمحفزات صغيرة — الدماغ على أهبة الاستعداد دائماً.", color: "#d8bdbf", bar: "#a88285" },
  { title: "فقدان الثقة بالعالم", en: "World Distrust", text: "اعتقاد جوهري بأن العالم مكان خطير ولا يمكن الوثوق بأحد — سمة شائعة تعيق بناء العلاقات الصحية.", color: "#f0e4e5", bar: "#574144" },
  { title: "الانفصال العاطفي", en: "Emotional Detachment", text: "صعوبة في الشعور بالمشاعر الإيجابية أو تكوين روابط عاطفية عميقة مع الآخرين بعد الصدمة.", color: "#ead5d7", bar: "#6e5255" },
  { title: "الاندفاعية العاطفية", en: "Emotional Impulsivity", text: "انفجارات عاطفية مفاجئة ومكثفة لا تتناسب مع الموقف — ناجمة عن جهاز عصبي في حالة تأهب دائم.", color: "#e0c8ca", bar: "#8a6366" },
  { title: "لوم الذات المزمن", en: "Chronic Self-Blame", text: "انشغال مستمر وقهري بالتساؤل: ماذا فعلت لأستحق هذا؟ مما يُولد اكتئاباً مزمناً وتدميراً للذات.", color: "#d8bdbf", bar: "#a88285" },
];

const brainSteps = [
  { title: "اللوزة الدماغية", en: "AMYGDALA", text: "تُصبح اللوزة الدماغية مفرطة النشاط بعد الصدمة — تُعالج الذكريات العادية كأنها تهديد حقيقي آني، وتُطلق إنذارات خوف بأدنى محفز يشبه الصدمة حتى ولو كان آمناً تماماً.", bg: "#574144" },
  { title: "الحُصين", en: "HIPPOCAMPUS", text: "ينكمش حجم الحُصين — المنطقة المسؤولة عن ترميز الذكريات وتصنيفها زمنياً. لذا تبقى ذكرى الصدمة 'طازجة' لا ماضية، وكأن الحدث لا يزال يقع الآن.", bg: "#6e5255" },
  { title: "قشرة الفص الجبهي", en: "PREFRONTAL CORTEX", text: "تضعف قشرة الفص الجبهي عن أداء وظيفتها الرئيسية: كبح ردود الفعل وتحليل الواقع بعقلانية. مما يجعل الشخص عاجزاً عن 'إقناع' نفسه بأن الخطر قد انتهى.", bg: "#8a6366" },
  { title: "قشرة الفص الجبهي الإنسية", en: "MEDIAL PFC", text: "هذه المنطقة المسؤولة عن مدى إدراك الشخص لمشاعره وتنظيمها تُصبح أقل نشاطاً، مما يُفسر صعوبة اللفظ عن الصدمة وربط المشاعر بالكلمات.", bg: "#a88285" },
  { title: "نظام الناقلات العصبية", en: "NEUROTRANSMITTERS", text: "يحدث اختلال في الكورتيزول والأدرينالين (هرمونات التوتر) ونقص في السيروتونين والدوبامين — مما يُديم حالة التأهب ويُصعب الاسترخاء والشعور بالأمان.", bg: "#c9a5a8" },
  { title: "الشبكة العصبية الافتراضية", en: "DEFAULT MODE NETWORK", text: "تبقى نشطة بشكل غير منتظم أثناء الراحة — مما يجعل العقل يعود قسراً إلى لحظات الصدمة بدلاً من التجوال الذهني الهادئ والتعافي التلقائي.", bg: "#574144" },
];

const treatments = [
  {
    id: 1, icon: "🧩", en: "Trauma-Focused CBT / EMDR", label: "العلاج النفسي التخصصي", color: "#e0c8ca",
    details: [
      "العلاج بإزالة حساسية حركة العين (EMDR): إعادة معالجة ذكرى الصدمة بطريقة منضبطة — يُعلّم الدماغ كيف يُصنّف الذاكرة الصادمة كـ'ماضٍ' لا كحاضر جارٍ.",
      "العلاج المعرفي السلوكي المركّز على الصدمة (TF-CBT): مواجهة الذكريات المؤلمة تدريجياً مع تحدي الأفكار المشوهة 'أنا مسؤول، العالم خطر دائماً'.",
      "علاج معالجة المعرفة (CPT): التركيز على تغيير الأفكار الصلبة التي تطورت كنتيجة للصدمة وأصبحت تُلوّن رؤية الشخص للعالم بأكمله.",
      "علاج التعرض المطوّل (PE): التعامل المنهجي مع ذكريات الصدمة والمواقف المتجنبة حتى يتعلم الدماغ أن هذه الذكريات ليست خطيرة.",
    ],
  },
  {
    id: 2, icon: "💊", en: "Pharmacotherapy", label: "العلاج الدوائي", color: "#d8bdbf",
    details: [
      "SSRIs وSNRIs (سيرترالين، باروكسيتين، فينلافاكسين): الخيار الأول المعتمد — تُنظّم السيروتونين والنورإبينفرين وتُخفف أعراض الاقتحام والقلق والاكتئاب.",
      "براzosin: لعلاج الكوابيس المرتبطة بالصدمة تحديداً — يُخفف نشاط النورإبينفرين ليلاً ويُحسّن جودة النوم بشكل ملحوظ.",
      "المثبتات المزاجية: في حالات C-PTSD مع تقلبات مزاجية حادة — للمساعدة في تنظيم ردود الأفعال العاطفية المكثفة.",
      "مضادات القلق (بحذر شديد): لفترات قصيرة في حالات الأزمة الحادة — مع تجنب الاستخدام المطوّل لخطر التعود.",
    ],
  },
  {
    id: 3, icon: "⚡", en: "Combined Treatment", label: "العلاج المتكامل", color: "#c9a5a8", badge: "الأفضل نتائج",
    details: [
      "دمج العلاج النفسي التخصصي مع الأدوية يُحقق أفضل النتائج — الأدوية تُهدئ فرط نشاط اللوزة وتُتيح للشخص الاستفادة من جلسات مواجهة الصدمة.",
    ],
  },
  {
    id: 4, icon: "🌿", en: "Lifestyle & Support", label: "تعديل نمط الحياة والدعم", color: "#e0c8ca",
    details: [
      "التأريض (Grounding): تقنيات تعيد الوعي للحاضر عند بداية الفلاشباك — مثل قاعدة 5-4-3-2-1 الحسية أو التنفس البطيء.",
      "الاستقرار الجسدي: التمارين المنتظمة تُخفض الكورتيزول وتُعيد تنظيم الجهاز العصبي — خاصةً اليوغا والمشي في الطبيعة.",
      "الأمان الاجتماعي: بناء شبكة دعم آمنة من أشخاص يُتيحون التعبير دون حكم — جوهري في مسيرة الشفاء من الصدمة.",
    ],
  },
];

// ======================== المكوّن ========================

export default function PTSDDetail() {
  const [activeTab, setActiveTab] = useState("الاقتحامية");
  const [expandedType, setExpandedType] = useState(null);
  const [expandedTreatment, setExpandedTreatment] = useState(null);

  return (
    <div style={s.page}>

      {/* Hero */}
      <div style={s.heroSection}>
        <div style={s.breadcrumb}>الاضطرابات النفسية &gt; اضطراب ما بعد الصدمة</div>
        <h1 style={s.heroTitle}>الأحداث تنتهي... ويبقى الأثر</h1>
        <p style={s.heroSub}>
          PTSD ليس ضعفاً، هو استجابة دماغك لتجربة قاسية، يعيش معه{" "}
          <strong style={{ color: "#574144" }}>أكثر من 300 مليون شخص</strong>{" "}
          حول العالم
        </p>
      </div>

      <hr style={s.divider} />

      {/* التعريف */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>التعريف</div>
        <h2 style={s.sectionTitle}>ما هو <span style={s.sectionTitleHighlight}>اضطراب ما بعد الصدمة</span>؟</h2>
        <div style={s.defGrid}>
          <div style={s.defCard("#e8d0d2")}>
            <div style={s.defCardBar("#8a6366")} />
            <div style={s.defCardTitle}>الاستجابة الطبيعية للصدمة</div>
            <div style={s.defCardText}>
              من الطبيعي أن تشعر بالخوف والضيق والحزن بعد تجربة صادمة. الدماغ يمر بمرحلة معالجة طبيعية تستغرق أسابيع وتنتهي تدريجياً مع مرور الوقت.
            </div>
          </div>
          <div style={s.defCard("#c9a5a8")}>
            <div style={s.defCardBar("#574144")} />
            <div style={s.defCardTitle}>اضطراب ما بعد الصدمة PTSD</div>
            <div style={s.defCardText}>
              هو ردة فعل للدماغ والجسم تنشأ كاستجابة متأخرة أو ممتدة لحدث ذو طبيعة مرهقة أو يهدد الحياة، حيث يظل الجهاز العصبي في حالة تأهب دائم كأن الخطر لم ينتهِ.
            </div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* الأنواع */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>الأنواع</div>
        <h2 style={s.sectionTitle}>أنواع <span style={s.sectionTitleHighlight}>الاضطراب</span> وأشكاله</h2>
        <p style={{ fontSize: "14px", color: "#a88285", textAlign: "right", marginBottom: "24px" }}>كل أحد فينا مميز بطريقته، حتى في استجابته للصدمة.</p>
        <div style={s.typesGrid}>
          {types.map((t) => (
            <div key={t.id} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={s.typeCard()}
                onClick={() => setExpandedType(expandedType === t.id ? null : t.id)}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(87,65,68,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(87,65,68,0.07)"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: typeColors[t.id - 1], borderRadius: "14px 14px 0 0" }} />
                <div style={s.typeNum(typeColors[t.id - 1])}>{t.id}</div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ ...s.typeLabel, color: typeColors[t.id - 1] }}>{t.label}</div>
                  <div style={s.typeSub}>{t.en}</div>
                </div>
              </div>
              {expandedType === t.id && (
                <div style={{ background: "white", borderRadius: "0 0 14px 14px", padding: "16px 20px", fontSize: "14px", color: "#6e5255", lineHeight: "1.9", border: `2px solid ${typeColors[t.id - 1]}`, borderTop: "none", textAlign: "right", marginTop: "-4px" }}>
                  {typeDetails[t.id].map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: i < typeDetails[t.id].length - 1 ? "1px solid #f5eced" : "none" }}>
                      <span style={{ color: "#c9a5a8", flexShrink: 0 }}>—</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: "13px", color: "#c9a5a8", textAlign: "center", marginTop: "16px" }}>اضغط على أي بطاقة لعرض التفاصيل</p>
      </div>

      <hr style={s.divider} />

      {/* الأعراض */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>الأعراض</div>
        <h2 style={s.sectionTitle}>كيف يظهر <span style={s.sectionTitleHighlight}>PTSD</span> في جسدك وعقلك؟</h2>
        <div style={s.tabRow}>
          {symptomTabs.map(tab => (
            <button key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <div style={s.symptomsGrid}>
          {(symptomData[activeTab] || []).map((item, i) => (
            <div key={i} style={s.symptomCard()}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(87,65,68,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(87,65,68,0.08)"; }}
            >
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
        <h2 style={s.sectionTitle}>من أين يأتي <span style={s.sectionTitleHighlight}>PTSD</span>؟</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#574144", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>1</div>
            <div style={{ ...s.causeBlock, flex: 1 }}>
              <div style={s.causeTitle}>طبيعة الصدمة نفسها</div>
              <div style={s.causeLine}>التعرض المباشر لحدث مهدد للحياة كالحوادث والكوارث والحروب والاعتداءات.</div>
              <div style={s.causeLine}>مشاهدة صدمة تصيب شخصاً آخر أو التعرف على صدمة أصابت شخصاً قريباً.</div>
              <div style={s.causeLine}>التعرض المتكرر لتفاصيل الأحداث الصادمة (كالعاملين في الميدان الطبي).</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#574144", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>2</div>
            <div style={{ ...s.causeBlockHighlight, flex: 1 }}>
              <div style={s.causeTitle}>عوامل الخطر الشخصية والبيئية</div>
              <div style={{ fontSize: "14px", color: "#6e5255", marginBottom: "12px", textAlign: "right" }}>ليس كل من يتعرض للصدمة يُصاب بـ PTSD — هذه العوامل ترفع خطر الإصابة بشكل كبير:</div>
              <div style={s.tagRow}>
                {["تاريخ من الصدمات السابقة في الطفولة", "الاستعداد الجيني للقلق والاكتئاب", "غياب الدعم الاجتماعي بعد الصدمة", "التعرض لأنواع متعددة من الصدمات", "الصدمة مفاجئة وغير متوقعة ومتعمدة", "ضعف آليات التكيف المكتسبة"].map((t, i) => (
                  <span key={i} style={s.tag(["#f0e4e5", "#e0c8ca", "#d8bdbf", "#ead5d7", "#f0e4e5", "#e0c8ca"][i % 6])}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#574144", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>3</div>
            <div style={{ ...s.causeBlock, flex: 1 }}>
              <div style={s.causeTitle}>العوامل البيولوجية والعصبية</div>
              <div style={s.causeLine}>نقص في حجم الحُصين (الذاكرة) يجعل الدماغ يُعالج ذكريات الصدمة كأحداث حاضرة لا ماضية.</div>
              <div style={s.causeLine}>فرط نشاط اللوزة الدماغية بحيث تُطلق إنذارات الخطر بأدنى محفز.</div>
              <div style={s.causeLine}>اختلال في منظومة الكورتيزول وهرمونات التوتر — يجعل الجسم في حالة تعبئة مستمرة.</div>
            </div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* آليات التكيف */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>آليات التكيف</div>
        <h2 style={s.sectionTitle}>حين تُخطئ <span style={s.sectionTitleHighlight}>طريقة التعامل</span></h2>
        <p style={{ fontSize: "14px", color: "#a88285", textAlign: "right", marginBottom: "24px" }}>استجابات تبدو منطقية للبقاء بأمان على المدى القصير — لكنها تُديم الصدمة وتُعمّقها على المدى الطويل.</p>
        <div style={s.copingGrid}>
          {copingCards.map((c, i) => (
            <div key={i} style={s.copingCard}
              onMouseEnter={e => { e.currentTarget.style.border = "1.5px solid #a88285"; }}
              onMouseLeave={e => { e.currentTarget.style.border = "1.5px solid #e8d0d2"; }}
            >
              <div style={s.copingIcon}>{c.icon}</div>
              <div style={s.copingTitle}>{c.title}</div>
              <div style={s.copingEn}>{c.en}</div>
              <div style={s.copingText}>{c.text}</div>
            </div>
          ))}
          <div style={s.copingCardWide}
            onMouseEnter={e => { e.currentTarget.style.border = "1.5px solid #a88285"; }}
            onMouseLeave={e => { e.currentTarget.style.border = "1.5px solid #e8d0d2"; }}
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "22px" }}>🔁</div>
              <div>
                <div style={s.copingTitle}>حلقة الصدمة المكررة</div>
                <div style={s.copingEn}>Trauma Loop</div>
                <div style={s.copingText}>التجنب يُريح مؤقتاً — لكنه يُعلّم الدماغ أن هذا المحفز خطير فعلاً. فيزداد القلق، فيزداد التجنب، فيزداد القلق... دوامة لا تنتهي تُضيّق الحياة تدريجياً حتى تُصبح سجناً.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* السمات الشخصية */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>السمات الشخصية</div>
        <h2 style={s.sectionTitle}>PTSD يُغيِّر <span style={s.sectionTitleHighlight}>شخصيتك</span></h2>
        <p style={{ fontSize: "14px", color: "#a88285", textAlign: "right", marginBottom: "24px" }}>العيش مع صدمة مزمنة يُحدث تغييرات عميقة في الشخصية وطريقة رؤية العالم.</p>
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
        <h2 style={s.sectionTitle}>رحلة داخل <span style={s.sectionTitleHighlight}>دماغك</span></h2>
        <p style={{ fontSize: "14px", color: "#a88285", textAlign: "right", marginBottom: "28px" }}>لماذا لا يستطيع الدماغ المصاب بـ PTSD أن "ينسى" أو "يتجاوز" ببساطة؟</p>
        <div style={s.brainList}>
          {brainSteps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ ...s.brainNum(step.bg), flexShrink: 0, marginTop: "4px" }}>{i + 1}</div>
              <div
                style={{ background: "white", borderRadius: "14px", padding: "20px 28px", border: "1.5px solid #e8d0d2", flex: 1, transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateX(-6px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(87,65,68,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={s.brainTitle}>{step.title} · <span style={{ fontSize: "12px", color: "#c9a5a8", fontWeight: "400" }}>{step.en}</span></div>
                <div style={s.brainText}>{step.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...s.causeBlock, marginTop: "28px" }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#3b2a2c", marginBottom: "20px", textAlign: "right" }}>النتيجة: ماذا تشعر في جسدك وعقلك؟</div>
          <div style={s.resultBox}>
            <div>
              <div style={s.resultColTitle}>في لحظات الفلاشباك</div>
              {["تسارع حاد في ضربات القلب", "ضيق في التنفس والشعور بالاختناق", "تعرق وارتجاف في الجسم", "شعور كامل بأن الصدمة تقع الآن"].map((t, i) => (
                <div key={i} style={s.resultItem}><div style={s.resultDot("#574144")} />{t}</div>
              ))}
            </div>
            <div>
              <div style={{ ...s.resultColTitle, color: "#8a6366" }}>في الحياة اليومية</div>
              {["صعوبة في الثقة بالآخرين والانفتاح", "إرهاق مزمن من حالة التأهب الدائمة", "صعوبة في الشعور بالأمان والاسترخاء", "مشاعر انفصال عن الحياة والمستقبل"].map((t, i) => (
                <div key={i} style={s.resultItem}><div style={s.resultDot("#8a6366")} />{t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* العلاج */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>العلاج</div>
        <h2 style={s.sectionTitle}>طريقك نحو <span style={s.sectionTitleHighlight}>التعافي</span></h2>
        <p style={{ fontSize: "14px", color: "#a88285", textAlign: "right", marginBottom: "24px" }}>الصدمة جزء من ماضيك لا تعريفك — والتعافي ممكن مع العلاج المناسب.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {treatments.map((t) => (
            <div key={t.id}>
              <div
                style={{ background: "white", borderRadius: expandedTreatment === t.id ? "14px 14px 0 0" : "14px", padding: "20px 24px", border: `2px solid ${expandedTreatment === t.id ? t.color : "#e8d0d2"}`, cursor: "pointer", transition: "border 0.2s", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                onClick={() => setExpandedTreatment(expandedTreatment === t.id ? null : t.id)}
                onMouseEnter={e => { e.currentTarget.style.border = `2px solid ${t.color}`; }}
                onMouseLeave={e => { if (expandedTreatment !== t.id) e.currentTarget.style.border = "2px solid #e8d0d2"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "24px", width: "44px", height: "44px", background: t.color, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>{t.icon}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "11px", color: "#c9a5a8", marginBottom: "2px" }}>{t.en}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ fontSize: "17px", fontWeight: "700", color: "#3b2a2c" }}>{t.label}</div>
                      {t.badge && <span style={{ fontSize: "11px", background: "#f0e4e5", color: "#574144", borderRadius: "20px", padding: "2px 10px" }}>✦ {t.badge}</span>}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: "22px", color: "#c9a5a8" }}>{expandedTreatment === t.id ? "−" : "+"}</span>
              </div>
              {expandedTreatment === t.id && (
                <div style={{ background: "white", borderRadius: "0 0 14px 14px", padding: "4px 24px 20px", border: `2px solid ${t.color}`, borderTop: "none" }}>
                  {t.details.map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: i < t.details.length - 1 ? "1px solid #f5eced" : "none", fontSize: "14px", color: "#6e5255", lineHeight: "1.9", textAlign: "right" }}>
                      <span style={{ color: t.color, flexShrink: 0, fontSize: "16px" }}>•</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: "12px", color: "#c9a5a8", textAlign: "center", marginTop: "28px" }}>
          هذا المحتوى لأغراض تثقيفية فقط. إذا كنت تعاني من أعراض PTSD، تحدث مع <strong style={{ color: "#574144" }}>متخصص نفسي</strong>.
        </p>
      </div>

    </div>
  );
}
