import { useState } from "react";

// ===== لوحة الألوان المتدرجة المبنية على #737373 =====
// #3a3a3a → #525252 → #737373 → #8f8f8f → #ababab → #c8c8c8 → #e4e4e4 → #f5f5f5

const s = {
  page: { background: "#f4f4ff", minHeight: "100vh", direction: "rtl", fontFamily: "'Tajawal', sans-serif" },
  breadcrumb: { textAlign: "center", fontSize: "13px", color: "#ababab", marginBottom: "12px" },
  heroSection: {
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: "80px 20px 60px", textAlign: "center",
    background: "linear-gradient(135deg, #f5f5f5 0%, #e8e8eb 100%)",
  },
  heroTitle: {
    fontSize: "44.5px", fontWeight: "700", color: "#3a3a3a", marginBottom: "16px",
    textShadow: "2px 2px 12px rgba(58, 58, 58, 0.25)", fontFamily: "'Tajawal', sans-serif",
  },
  heroSub: { fontSize: "18px", color: "#525252", maxWidth: "560px" },
  sectionWrapper: { maxWidth: "860px", margin: "0 auto", padding: "60px 24px" },
  sectionLabel: { fontSize: "12px", color: "#ababab", letterSpacing: "1px", marginBottom: "6px", textAlign: "right" },
  sectionTitle: { fontSize: "28px", fontWeight: "700", color: "#2a2a2a", marginBottom: "32px", textAlign: "right" },
  sectionTitleHighlight: { color: "#737373" },
  divider: { border: "none", borderTop: "1px solid #d5d5d8", margin: "0 auto", maxWidth: "2000px" },
  defGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  defCard: (borderColor) => ({ background: "white", borderRadius: "16px", padding: "24px", border: `2px solid ${borderColor}`, position: "relative", overflow: "hidden" }),
  defCardBar: (color) => ({ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: color, borderRadius: "16px 16px 0 0" }),
  defCardTitle: { fontSize: "18px", fontWeight: "700", color: "#2a2a2a", marginBottom: "10px" },
  defCardText: { fontSize: "14px", color: "#525252", lineHeight: "1.8" },
  typesGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  typeCard: () => ({
    background: "white", borderRadius: "14px", padding: "24px 24px 20px",
    border: "2px solid white", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex", flexDirection: "row", justifyContent: "flex-start",
    alignItems: "center", gap: "16px", position: "relative", overflow: "hidden",
    boxShadow: "0 2px 12px rgba(58,58,58,0.07)",
  }),
  typeNum: (color) => ({ fontSize: "28px", fontWeight: "700", color, opacity: 0.5, flexShrink: 0 }),
  typeLabel: { fontSize: "16px", fontWeight: "700" },
  typeSub: { fontSize: "12px", color: "#ababab" },
  tabRow: { display: "flex", gap: "0", marginBottom: "28px", borderBottom: "2px solid #737373" },
  tab: (active) => ({
    padding: "10px 20px", fontSize: "15px", cursor: "pointer", fontFamily: "'Tajawal', sans-serif",
    color: active ? "#3a3a3a" : "#ababab", background: "none", border: "none",
    borderBottom: active ? "2px solid #3a3a3a" : "2px solid transparent",
    marginBottom: "-2px", transition: "0.2s", fontWeight: active ? "700" : "400",
  }),
  symptomsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  symptomCard: () => ({
    background: "white", borderRadius: "12px", padding: "16px 20px",
    border: "1.5px solid #e4e4e4",
    fontSize: "14px", color: "#2a2a2a", display: "flex", alignItems: "flex-start", gap: "10px",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 12px rgba(58,58,58,0.06)",
  }),
  dot: (color) => ({ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0, marginTop: "6px" }),
  causeBlock: { background: "white", borderRadius: "16px", padding: "28px 32px", marginBottom: "0", border: "1.5px solid #e4e4e4", position: "relative" },
  causeBlockHighlight: { background: "white", borderRadius: "16px", padding: "28px 32px", marginBottom: "0", border: "2px solid #737373" },
  causeTitle: { fontSize: "17px", fontWeight: "700", color: "#2a2a2a", marginBottom: "14px", textAlign: "right" },
  causeLine: { fontSize: "14px", color: "#525252", lineHeight: "2", borderBottom: "1px solid #f5f5f5", padding: "6px 0", textAlign: "right" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px", justifyContent: "flex-end" },
  tag: (color) => ({ background: color, borderRadius: "30px", padding: "6px 16px", fontSize: "13px", color: "#2a2a2a" }),
  copingGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" },
  copingCard: { background: "white", borderRadius: "14px", padding: "20px", border: "1.5px solid #e4e4e4", transition: "border 0.2s" },
  copingCardWide: { gridColumn: "span 3", background: "white", borderRadius: "14px", padding: "20px 28px", border: "1.5px solid #e4e4e4", transition: "border 0.2s" },
  copingIcon: { fontSize: "22px", marginBottom: "8px" },
  copingTitle: { fontSize: "15px", fontWeight: "700", color: "#2a2a2a", marginBottom: "4px" },
  copingEn: { fontSize: "11px", color: "#c8c8c8", marginBottom: "10px" },
  copingText: { fontSize: "13px", color: "#737373", lineHeight: "1.7" },
  traitsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "14px" },
  traitCard: (borderColor) => ({ background: "white", borderRadius: "14px", padding: "18px 16px", border: `2px solid ${borderColor}`, position: "relative", overflow: "hidden" }),
  traitBar: (color) => ({ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: color }),
  traitTitle: { fontSize: "14px", fontWeight: "700", color: "#2a2a2a", marginBottom: "4px" },
  traitEn: { fontSize: "11px", color: "#c8c8c8", marginBottom: "8px" },
  traitText: { fontSize: "12px", color: "#737373", lineHeight: "1.6" },
  brainList: { display: "flex", flexDirection: "column", gap: "12px" },
  brainNum: (bg) => ({ minWidth: "40px", height: "40px", borderRadius: "50%", background: bg, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px" }),
  brainTitle: { fontSize: "16px", fontWeight: "700", color: "#2a2a2a", marginBottom: "4px" },
  brainText: { fontSize: "13px", color: "#525252", lineHeight: "1.7" },
  resultBox: { background: "white", borderRadius: "16px", padding: "28px 36px", border: "1.5px solid #e4e4e4", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" },
  resultColTitle: { fontSize: "14px", fontWeight: "700", color: "#3a3a3a", marginBottom: "14px" },
  resultItem: { fontSize: "14px", color: "#3a3a3a", lineHeight: "2", display: "flex", alignItems: "center", gap: "8px" },
  resultDot: (c) => ({ width: "6px", height: "6px", borderRadius: "50%", background: c, flexShrink: 0 }),
};

// ======================== البيانات ========================

const symptomTabs = ["العاطفية والنفسية", "الجسدية", "المعرفية", "العلامات الحادة"];
const symptomData = {
  "العاطفية والنفسية": [
    { text: "حزن عميق ومستمر لمعظم ساعات اليوم", color: "#ababab" },
    { text: "فقدان المتعة والاهتمام بالأنشطة المحبوبة (Anhedonia)", color: "#ababab" },
    { text: "شعور بالفراغ الداخلي والخدر العاطفي", color: "#8f8f8f" },
    { text: "يأس وشعور بأن المستقبل مظلم لا أمل فيه", color: "#8f8f8f" },
    { text: "مشاعر ذنب مفرطة وانتقاد مستمر للذات", color: "#737373" },
    { text: "انسحاب اجتماعي والعزلة عن الأسرة والأصدقاء", color: "#737373" },
  ],
  "الجسدية": [
    { text: "إرهاق مزمن وفقدان الطاقة دون مجهود يذكر", color: "#ababab" },
    { text: "اضطرابات النوم: أرق شديد أو نوم مفرط", color: "#ababab" },
    { text: "تغيرات في الشهية وفي الوزن (زيادة أو نقص)", color: "#8f8f8f" },
    { text: "بطء ملحوظ في الحركة والكلام (Psychomotor Retardation)", color: "#8f8f8f" },
    { text: "آلام جسدية غير مفسرة: رأس، ظهر، معدة", color: "#737373" },
    { text: "انخفاض الدافع الجنسي واضطراب الوظائف الجسدية", color: "#737373" },
  ],
  "المعرفية": [
    { text: "صعوبة شديدة في التركيز واتخاذ القرارات", color: "#ababab" },
    { text: "بطء التفكير والشعور بضبابية ذهنية (Brain Fog)", color: "#ababab" },
    { text: "أفكار سلبية متكررة وتشاؤم تجاه كل شيء", color: "#8f8f8f" },
    { text: "اجترار الأفكار المؤلمة بشكل قهري ومستمر", color: "#8f8f8f" },
    { text: "انخفاض تقدير الذات والشعور بعدم الكفاءة", color: "#737373" },
    { text: "تشوهات إدراكية: تضخيم السلبي وتجاهل الإيجابي", color: "#737373" },
  ],
  "العلامات الحادة": [
    { text: "أفكار متكررة عن الموت أو انعدام الرغبة في الحياة", color: "#ababab" },
    { text: "أفكار انتحارية مع أو بدون خطة محددة", color: "#ababab" },
    { text: "الإهمال التام للنظافة الشخصية والمظهر", color: "#8f8f8f" },
    { text: "العجز عن أداء أبسط مهام الحياة اليومية", color: "#8f8f8f" },
    { text: "الانسحاب الكامل من العلاقات والحياة الاجتماعية", color: "#737373" },
    { text: "حالات ذهانية: أوهام أو هلوسة في الاكتئاب الشديد", color: "#737373" },
  ],
};

const types = [
  { id: 1, label: "الاكتئاب الاكلينيكي / الكبير", en: "Major Depressive Disorder", color: "#3a3a3a" },
  { id: 2, label: "الاكتئاب المستمر / الخفيف", en: "Persistent Depressive Disorder", color: "#525252" },
  { id: 3, label: "خلل تنظيم المزاج التخريبي", en: "DMDD", color: "#737373" },
  { id: 4, label: "اضطراب ما قبل الدورة", en: "PMDD", color: "#8f8f8f" },
  { id: 5, label: "الناجم عن الأدوية أو المواد", en: "Substance/Medication-Induced", color: "#ababab" },
  { id: 6, label: "الناتج عن حالة طبية أخرى", en: "Due to Another Medical Condition", color: "#525252" },
  { id: 7, label: "الاكتئاب غير المحدد", en: "Unspecified Depressive Disorder", color: "#8f8f8f" },
  { id: 8, label: "اضطراب ثنائي القطب", en: "Bipolar Disorder", color: "#3a3a3a" },
];

const typeColors = ["#3a3a3a", "#525252", "#737373", "#8f8f8f", "#ababab", "#525252", "#8f8f8f", "#3a3a3a"];

const typeDetails = {
  1: [
    "النوع الأكثر شيوعاً ومعروفة — نوبة واحدة أو أكثر من الاكتئاب الشديد تستمر أسبوعين على الأقل.",
    "يتميز بحزن عميق أو فقدان كامل للاهتمام بالحياة، مصحوباً بأعراض جسدية ومعرفية واضحة.",
    "قد يُصنَّف كـ خفيف أو متوسط أو شديد — وقد يصحبه أعراض ذهانية في الحالات القصوى.",
  ],
  2: [
    "مزاج حزين مستمر لمدة سنتين على الأقل (سنة عند الأطفال) دون انقطاع لمدة شهرين.",
    "أعراضه أقل حدة من الاكتئاب الكبير، لكن ديمومتها تُنهك الشخص وتُشعره أن الحزن جزء من شخصيته.",
    "كثيراً ما يُوصف بأنه 'اكتئاب بطيء النار' — يصعب تشخيصه لأن المصاب اعتاد عليه ولا يتوقع تحسناً.",
  ],
  3: [
    "نوبات غضب شديدة ومتكررة عند الأطفال والمراهقين، تفوق كثيراً ما يستدعيه الموقف.",
    "المزاج العام في ما بين النوبات يكون حزيناً أو غاضباً أغلب الوقت.",
    "يؤثر على الأداء في المدرسة والعلاقات الأسرية ويختلف عن ثنائي القطب الذي لا يُشخَّص لمن دون 18 عاماً.",
  ],
  4: [
    "اكتئاب وقلق شديد يظهر قبل الدورة الشهرية بأسبوع إلى أسبوعين ويختفي بعد بدئها.",
    "تغيرات مزاجية حادة، تعب، اضطرابات نوم أو شهية، شعور بفقدان السيطرة.",
    "أشد بكثير من متلازمة ما قبل الدورة (PMS) العادية — يُعطل الحياة اليومية بشكل كبير.",
  ],
  5: [
    "أعراض اكتئابية واضحة ناجمة مباشرة عن تناول مواد معينة أو الانسحاب منها.",
    "تتحسن عادةً عند تعديل الدواء أو التوقف عن المادة المسببة.",
    "من أسبابها: الكحول، المنشطات، الستيرويدات، بعض أدوية ضغط الدم أو بعض المضادات الحيوية.",
  ],
  6: [
    "اكتئاب مرتبط بحالة طبية عضوية كالغدة الدرقية الخاملة، السرطان، أمراض القلب، السكتة الدماغية.",
    "يحتاج علاج الحالة الطبية الأساسية لتحسين المزاج.",
    "لا يُعدّ كسلاً أو ضعف شخصية — بل تأثير بيولوجي مباشر للمرض على الدماغ.",
  ],
  7: [
    "أعراض اكتئابية واضحة لكنها لا تنطبق تماماً على أي تشخيص محدد من الأنواع السابقة.",
    "يحتاج تقييم دقيق من متخصص لفهم الصورة الكاملة وتقديم الدعم المناسب.",
    "وجود الأعراض والمعاناة الحقيقية يكفي للحصول على المساعدة — بغض النظر عن دقة التصنيف.",
  ],
  8: [
    "نوبات اكتئاب متناوبة مع نوبات هوس أو فرط نشاط — يختلف جوهرياً عن الاكتئاب الأحادي.",
    "في الاكتئاب: حزن، فقدان طاقة، قلة اهتمام. في الهوس: نشاط زائد، اندفاع، شعور بالعظمة أحياناً.",
    "علاجه يختلف عن باقي أنواع الاكتئاب — الأدوية المثبتة للمزاج (كالليثيوم) هي الركيزة الأساسية.",
  ],
};

const copingCards = [
  { icon: "🛌", title: "الانسحاب والعزلة", en: "Social Withdrawal", text: "تجنب الناس والتجمعات لأن 'كل شيء يتطلب جهداً كبيراً'. يُعزز الاكتئاب بحرمان الدماغ من الدعم الاجتماعي والمحفزات الإيجابية." },
  { icon: "📱", title: "الإفراط في الشاشات", en: "Excessive Screen Time", text: "التسمر أمام الشاشات كوسيلة لملء الفراغ والهروب من الأفكار السوداء. يُقلل جودة النوم ويُعمّق الانعزال ويُغذّي المقارنات المؤلمة." },
  { icon: "🍔", title: "الإفراط أو الامتناع عن الأكل", en: "Emotional Eating / Restriction", text: "استخدام الطعام كمهدئ عاطفي أو العقاب بالجوع. كلاهما يُراكم مشاعر الذنب ويُضاعف الأعراض." },
  { icon: "🍺", title: "تعاطي المواد", en: "Substance Use", text: "اللجوء للكحول أو المخدرات لتخدير الشعور بالفراغ والحزن. تُنشط في البداية ثم تُهبط المزاج أكثر مما أنقذته." },
  { icon: "😔", title: "اجترار الأفكار", en: "Rumination", text: "الدوران في نفس الأفكار السلبية مراراً — 'لماذا أنا هكذا؟' — بلا توصل لحل. يُثبّت الدماغ على الأسوأ ويمنع التعافي." },
  { icon: "🔇", title: "إسكات المشاعر", en: "Emotional Suppression", text: "رفض الاعتراف بالحزن أو إخفاؤه خلف قناع 'أنا بخير'. الضغط الداخلي يتراكم حتى ينفجر أو يتحول لأعراض جسدية." },
];

const traitCards = [
  { title: "العصابية العالية", en: "High Neuroticism", text: "الميل الشديد لتجربة المشاعر السلبية والتأثر المفرط بالضغوط اليومية البسيطة.", color: "#f0f0f0", bar: "#3a3a3a" },
  { title: "الكمالية المرضية", en: "Perfectionism", text: "معايير مرتفعة جداً تتحول لسلاح ضد الذات عند أي إخفاق مهما كان صغيراً.", color: "#e8e8e8", bar: "#525252" },
  { title: "الانطوائية المفرطة", en: "Extreme Introversion", text: "ميل للهروب للداخل وتجنب التفاعل مع العالم الخارجي كوسيلة للحماية.", color: "#e0e0e0", bar: "#737373" },
  { title: "انخفاض الإحساس بالقيمة", en: "Low Self-Worth", text: "شعور جوهري بعدم الاستحقاق وأن الآخرين أفضل بطبيعتهم — لا كردة فعل على حدث.", color: "#d8d8d8", bar: "#8f8f8f" },
  { title: "الاعتمادية العاطفية", en: "Emotional Dependency", text: "الحاجة المفرطة لتأكيد الآخرين للشعور بأن الحياة تستحق أو أن الفرد محبوب.", color: "#f0f0f0", bar: "#3a3a3a" },
  { title: "السلبية المتعلَّمة", en: "Learned Helplessness", text: "قناعة عميقة بأن لا شيء يمكن فعله لتغيير الوضع — بعد تجارب متكررة من الإخفاق.", color: "#e8e8e8", bar: "#525252" },
  { title: "التشاؤم المزمن", en: "Chronic Pessimism", text: "تلقائية في توقع الأسوأ في كل موقف — لا كاختيار بل كبرمجة ذهنية ترسّخت بمرور الوقت.", color: "#e0e0e0", bar: "#737373" },
  { title: "انخفاض الانفتاح على التجربة", en: "Low Openness", text: "رفض أو عجز عن تجربة أشياء جديدة بسبب انعدام الحافز الداخلي والطاقة الذهنية.", color: "#d8d8d8", bar: "#8f8f8f" },
];

const brainSteps = [
  { title: "قشرة الفص الجبهي", en: "Prefrontal Cortex", text: "تنخفض نشاطاً في الاكتئاب — مما يُضعف التخطيط، صنع القرار، والتحكم في المشاعر. يصبح التفكير في 'الخطوة التالية' مرهقاً للغاية حتى لأبسط المهام.", bg: "#3a3a3a" },
  { title: "نظام المكافأة والدوبامين", en: "Reward System — Dopamine", text: "يُصبح نظام المكافأة خاملاً — الدوبامين لا يُفرز باندفاعه الطبيعي عند إنجاز شيء أو تحقيق هدف. يُفسر هذا لماذا لا يُشعر الاكتئاب بأي متعة حقيقية من الأشياء التي كانت ممتعة.", bg: "#525252" },
  { title: "اللوزة الدماغية", en: "Amygdala", text: "تُصبح مفرطة النشاط وحساسيتها تجاه المحفزات السلبية ترتفع بشكل ملحوظ — فأي تعليق بسيط يُفسَّر كهجوم، وأي فشل صغير يُشعر بالكارثة.", bg: "#737373" },
  { title: "الحُصين والذاكرة", en: "Hippocampus", text: "يُصبح أصغر حجماً مع الاكتئاب المزمن بسبب الكورتيزول المرتفع. يُفسر الذاكرة السلبية الانتقائية — تتذكر المصائب وتنسى الإنجازات.", bg: "#8f8f8f" },
  { title: "محور HPA والكورتيزول", en: "HPA Axis — Cortisol", text: "يعمل محور الإجهاد بشكل مفرط في الاكتئاب — مستويات الكورتيزول مرتفعة بشكل مزمن مما يُضر بخلايا الدماغ ويُعيق إنتاج الناقلات العصبية المهدئة.", bg: "#525252" },
  { title: "السيروتونين والنورإبينفرين", en: "Serotonin & Norepinephrine", text: "انخفاض في السيروتونين يُؤثر على النوم، الشهية، والمزاج. انخفاض في النورإبينفرين يُسبب الإرهاق وصعوبة التركيز وبطء التفكير.", bg: "#ababab" },
];

const treatments = [
  {
    id: 1, icon: "🧩", en: "Cognitive Behavioral Therapy", label: "العلاج السلوكي المعرفي (CBT)", color: "#e4e4e4",
    details: [
      "إعادة الهيكلة المعرفية: ملاحظة الأفكار السلبية التلقائية وتحديها بالمنطق والأدلة — 'هل هذا الدليل حقيقي أم تفسير مشوّه؟'",
      "تفعيل السلوك (Behavioral Activation): إعادة إدخال الأنشطة الممتعة تدريجياً حتى وإن لم تكن هناك رغبة — الحركة تسبق الحافز وليس العكس.",
      "جدولة الأنشطة: بناء روتين منظم يُعيد الإحساس بالسيطرة والإنجاز في حياة يسيطر عليها الاكتئاب.",
      "التعامل مع اجترار الأفكار: تقنيات قطع الدوامة الذهنية قبل أن تتعمق وتضخم الأعراض.",
    ],
  },
  {
    id: 2, icon: "💊", en: "Pharmacotherapy", label: "العلاج الدوائي", color: "#d8d8d8",
    details: [
      "SSRIs (الخط الأول): كسيرترالين وفلوكستين — ترفع السيروتونين تدريجياً. تبدأ تأثيرها بعد 2-4 أسابيع، وتحتاج صبراً وانتظاماً.",
      "SNRIs: كفينلافاكسين ودولوكستين — تُعالج السيروتونين والنورإبينفرين معاً، مفيدة خاصةً مع الإرهاق والألم الجسدي.",
      "Bupropion: يعمل على الدوبامين والنورإبينفرين — خيار ممتاز عند فقدان الطاقة وصعوبة التركيز.",
      "مثبتات المزاج (لثنائي القطب): كالليثيوم واللاموتريجين — ضرورية لثنائي القطب وخطيرة الغياب.",
    ],
  },
  {
    id: 3, icon: "⚡", en: "Combined Treatment", label: "العلاج المدمج", color: "#c8c8c8", badge: "الأفضل نتائج",
    details: [
      "دمج CBT مع الأدوية يُعطي أفضل النتائج وأقل معدلات انتكاس — الأدوية تُخفف الأعراض بما يُمكّن المريض من الاستفادة من جلسات العلاج فعلياً.",
    ],
  },
  {
    id: 4, icon: "✨", en: "Other Evidence-Based Therapies", label: "علاجات نفسية أخرى", color: "#e4e4e4",
    details: [
      "العلاج الشخصي (IPT): يُركز على تحسين العلاقات الاجتماعية ومهارات التواصل كأداة للتعافي.",
      "العلاج بالقبول والالتزام (ACT): قبول المشاعر الصعبة دون مقاومة والتصرف بما يتوافق مع القيم الشخصية.",
      "التحفيز المغناطيسي للدماغ (TMS) أو العلاج الكهربائي (ECT): في حالات الاكتئاب الشديد المقاوم للأدوية.",
    ],
  },
  {
    id: 5, icon: "🌿", en: "Lifestyle & Support", label: "تعديل نمط الحياة والدعم", color: "#d8d8d8",
    details: [
      "الرياضة: 30 دقيقة يومياً من التمارين الهوائية مثبتة علمياً بتأثير مساوٍ للأدوية في الاكتئاب المتوسط.",
      "تنظيم النوم: جدول نوم ثابت يُعيد توازن الإيقاع البيولوجي الذي يختل في الاكتئاب بشكل كبير.",
      "التغذية: نظام غذائي متوازن غني بأوميغا-3 وحمض الفوليك — يدعم إنتاج الناقلات العصبية.",
      "الدعم الاجتماعي: التحدث مع شخص موثوق يُفرز الأوكسيتوسين ويُكسر دوامة العزلة المُعمِّقة للاكتئاب.",
    ],
  },
];

// ======================== المكوّن ========================

export default function DepressionDetail() {
  const [activeTab, setActiveTab] = useState("العاطفية والنفسية");
  const [expandedType, setExpandedType] = useState(null);
  const [expandedTreatment, setExpandedTreatment] = useState(null);

  return (
    <div style={s.page}>

      {/* Hero */}
      <div style={s.heroSection}>
        <div style={s.breadcrumb}>الاضطرابات النفسية &gt; الاكتئاب</div>
        <h1 style={s.heroTitle}>الاكتئاب... ليس حزناً عابراً</h1>
        <p style={s.heroSub}>
          الاكتئاب ليس ضعفاً ولا كسلاً، هو اضطراب حقيقي يُعاني منه{" "}
          <strong style={{ color: "#3a3a3a" }}>أكثر من 280 مليون شخص</strong>{" "}
          حول العالم
        </p>
      </div>

      <hr style={s.divider} />

      {/* التعريف */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>التعريف</div>
        <h2 style={s.sectionTitle}>ما هو <span style={s.sectionTitleHighlight}>الاكتئاب</span>؟</h2>
        <div style={s.defGrid}>
          <div style={s.defCard("#e4e4e4")}>
            <div style={s.defCardBar("#737373")} />
            <div style={s.defCardTitle}>الحزن الطبيعي</div>
            <div style={s.defCardText}>
              شعور طبيعي يمر به الجميع كاستجابة لخسارة أو ضغط أو صدمة — مؤقت ومحدود ومرتبط بسبب واضح، ويتحسن مع الوقت والدعم.
            </div>
          </div>
          <div style={s.defCard("#c8c8c8")}>
            <div style={s.defCardBar("#3a3a3a")} />
            <div style={s.defCardTitle}>اضطراب الاكتئاب</div>
            <div style={s.defCardText}>
              حالة طبية تُؤثر على الدماغ وتُغير كيمياءه وبنيته. تمتد أسبوعين أو أكثر وتُعطل الحياة اليومية — لا يمكن "التغلب عليها بالإرادة" لأنها بيولوجية في جوهرها.
            </div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* الأنواع */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>الأنواع</div>
        <h2 style={s.sectionTitle}>أنواع <span style={s.sectionTitleHighlight}>الاضطراب</span> وأشكاله</h2>
        <p style={{ fontSize: "14px", color: "#ababab", textAlign: "right", marginBottom: "24px" }}>كل أحد فينا مميز بطريقته، حتى في اضطرابه.</p>
        <div style={s.typesGrid}>
          {types.map((t) => (
            <div key={t.id} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={s.typeCard()}
                onClick={() => setExpandedType(expandedType === t.id ? null : t.id)}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(58,58,58,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(58,58,58,0.07)"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: typeColors[t.id - 1], borderRadius: "14px 14px 0 0" }} />
                <div style={s.typeNum(typeColors[t.id - 1])}>{t.id}</div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ ...s.typeLabel, color: typeColors[t.id - 1] }}>{t.label}</div>
                  <div style={s.typeSub}>{t.en}</div>
                </div>
              </div>
              {expandedType === t.id && (
                <div style={{ background: "white", borderRadius: "0 0 14px 14px", padding: "16px 20px", fontSize: "14px", color: "#525252", lineHeight: "1.9", border: `2px solid ${typeColors[t.id - 1]}`, borderTop: "none", textAlign: "right", marginTop: "-4px" }}>
                  {typeDetails[t.id].map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: i < typeDetails[t.id].length - 1 ? "1px solid #f5f5f5" : "none" }}>
                      <span style={{ color: "#c8c8c8", flexShrink: 0 }}>—</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: "13px", color: "#c8c8c8", textAlign: "center", marginTop: "16px" }}>اضغط على أي بطاقة لعرض التفاصيل</p>
      </div>

      <hr style={s.divider} />

      {/* الأعراض */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>الأعراض</div>
        <h2 style={s.sectionTitle}>كيف يظهر <span style={s.sectionTitleHighlight}>الاكتئاب</span> في جسدك وعقلك؟</h2>
        <div style={s.tabRow}>
          {symptomTabs.map(tab => (
            <button key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <div style={s.symptomsGrid}>
          {(symptomData[activeTab] || []).map((item, i) => (
            <div key={i} style={s.symptomCard()}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(58,58,58,0.12)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(58,58,58,0.06)"; }}
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
        <h2 style={s.sectionTitle}>من أين يأتي <span style={s.sectionTitleHighlight}>الاكتئاب</span>؟</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#3a3a3a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>1</div>
            <div style={{ ...s.causeBlock, flex: 1 }}>
              <div style={s.causeTitle}>اختلال النواقل العصبية البيولوجية</div>
              <div style={s.causeLine}>السيروتونين: أكثر الناقلات ارتباطاً بالاكتئاب — إما ينخفض إنتاجه أو تقل حساسية المستقبلات الخاصة به، مما يُؤثر على المزاج والنوم والشهية.</div>
              <div style={s.causeLine}>الدوبامين: ناقل المتعة والمكافأة والحافز — انخفاضه يُفسر فقدان المتعة من كل شيء (Anhedonia) الذي يُعدّ العلامة الأبرز للاكتئاب.</div>
              <div style={s.causeLine}>النورإبينفرين: اضطرابه يُسبب الإرهاق المزمن وبطء التفكير وصعوبة التركيز.</div>
              <div style={s.causeLine}>GABA: ناقل التهدئة — انخفاضه يُسبب القلق المصاحب للاكتئاب في معظم الحالات.</div>
              <div style={{ ...s.causeLine, borderBottom: "none" }}>الغلوتامات: ناقل تنشيطي رئيسي، يؤدي اختلال توازنه مع GABA إلى اضطراب في استقرار النشاط العصبي.</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#3a3a3a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>2</div>
            <div style={{ ...s.causeBlockHighlight, flex: 1 }}>
              <div style={s.causeTitle}>العوامل الوراثية والجينية</div>
              <div style={{ fontSize: "14px", color: "#525252", marginBottom: "12px", textAlign: "right" }}>الاكتئاب وراثي جزئياً (37–50%) — الجينات تُفسر نصف الخطر، والنصف الآخر بيئي ونفسي:</div>
              <div style={s.tagRow}>
                {["إذا أصيب أحد الوالدين: الخطر يرتفع 2-3 أضعاف", "إذا أصيب كلاهما: الخطر يرتفع 4-6 أضعاف", "في التوائم المتطابقة: 40-70% نسبة التوافق", "لا يوجد جين واحد مسؤول — عشرات الجينات تتفاعل مع البيئة", "الجنس البيولوجي: النساء أكثر عرضة بسبب التقلبات الهرمونية"].map((t, i) => (
                  <span key={i} style={s.tag(["#f0f0f0", "#e4e4e4", "#d8d8d8", "#ebebeb", "#e0e0e0"][i % 5])}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#3a3a3a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>3</div>
            <div style={{ ...s.causeBlock, flex: 1 }}>
              <div style={s.causeTitle}>العوامل البيئية والنفسية</div>
              <div style={s.causeLine}>تجارب الطفولة السلبية (ACEs): الإساءة الجسدية والعاطفية والجنسية والإهمال — من أقوى العوامل المرتبطة بالاكتئاب لاحقاً.</div>
              <div style={s.causeLine}>الضغوط المزمنة والمتراكمة: مشاكل مالية، علاقات صعبة، ضغط العمل المستمر دون راحة.</div>
              <div style={s.causeLine}>الخسائر الكبرى: فقدان عزيز، فشل علاقة، خسارة وظيفة — خاصةً عند من لديهم استعداد جيني مسبق.</div>
              <div style={{ ...s.causeLine, borderBottom: "none" }}>العزلة الاجتماعية: غياب الدعم الاجتماعي من أقوى محركات نشوء الاكتئاب وتفاقمه.</div>
            </div>
          </div>

        </div>
      </div>

      <hr style={s.divider} />

      {/* آليات التكيف */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>آليات التكيف</div>
        <h2 style={s.sectionTitle}>حين تُخطئ <span style={s.sectionTitleHighlight}>طريقة التعامل</span></h2>
        <p style={{ fontSize: "14px", color: "#ababab", textAlign: "right", marginBottom: "24px" }}>استجابات تبدو منطقية لتخفيف الألم مؤقتاً — لكنها تُطيل الاكتئاب وتُعمّق دوامته على المدى الطويل.</p>
        <div style={s.copingGrid}>
          {copingCards.map((c, i) => (
            <div key={i} style={s.copingCard}
              onMouseEnter={e => { e.currentTarget.style.border = "1.5px solid #8f8f8f"; }}
              onMouseLeave={e => { e.currentTarget.style.border = "1.5px solid #e4e4e4"; }}
            >
              <div style={s.copingIcon}>{c.icon}</div>
              <div style={s.copingTitle}>{c.title}</div>
              <div style={s.copingEn}>{c.en}</div>
              <div style={s.copingText}>{c.text}</div>
            </div>
          ))}
          <div style={s.copingCardWide}
            onMouseEnter={e => { e.currentTarget.style.border = "1.5px solid #8f8f8f"; }}
            onMouseLeave={e => { e.currentTarget.style.border = "1.5px solid #e4e4e4"; }}
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "22px" }}>🌑</div>
              <div>
                <div style={s.copingTitle}>دوامة الاكتئاب السلبية</div>
                <div style={s.copingEn}>The Depression Spiral</div>
                <div style={s.copingText}>الاكتئاب يُخفض الطاقة → تُقل النشاط → يتراكم الشعور بعدم الإنجاز → يزداد الاكتئاب → تقل الطاقة أكثر. كسر هذه الدوامة يتطلب التدخل من خارجها، وليس الانتظار لـ'الشعور بالرغبة' أولاً.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* السمات الشخصية */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>السمات الشخصية</div>
        <h2 style={s.sectionTitle}>الاكتئاب يُغيِّر <span style={s.sectionTitleHighlight}>شخصيتك</span></h2>
        <p style={{ fontSize: "14px", color: "#ababab", textAlign: "right", marginBottom: "24px" }}>العيش مع اكتئاب مزمن يُحدث تغييرات عميقة في الشخصية وطريقة رؤية الذات والعالم.</p>
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
        <p style={{ fontSize: "14px", color: "#ababab", textAlign: "right", marginBottom: "28px" }}>لماذا لا يستطيع المصاب بالاكتئاب 'مجرد التفكير الإيجابي'؟ — ما يحدث في الدماغ يُجيب.</p>
        <div style={s.brainList}>
          {brainSteps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ ...s.brainNum(step.bg), flexShrink: 0, marginTop: "4px" }}>{i + 1}</div>
              <div
                style={{ background: "white", borderRadius: "14px", padding: "20px 28px", border: "1.5px solid #e4e4e4", flex: 1, transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateX(-6px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(58,58,58,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={s.brainTitle}>{step.title} · <span style={{ fontSize: "12px", color: "#c8c8c8", fontWeight: "400" }}>{step.en}</span></div>
                <div style={s.brainText}>{step.text}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ background: "white", borderRadius: "16px", padding: "28px 32px", border: "1.5px solid #e4e4e4", marginTop: "28px" }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#2a2a2a", marginBottom: "20px", textAlign: "right" }}>النتيجة: ماذا تشعر في جسدك وعقلك؟</div>
          <div style={s.resultBox}>
            <div>
              <div style={s.resultColTitle}>في المزاج والعقل</div>
              {["حزن عميق لا يتحرك بالمنطق", "فقدان الاهتمام بكل الأشياء", "عجز عن الشعور بالسعادة", "أفكار سلبية تلقائية لا تتوقف"].map((t, i) => (
                <div key={i} style={s.resultItem}><div style={s.resultDot("#3a3a3a")} />{t}</div>
              ))}
            </div>
            <div>
              <div style={{ ...s.resultColTitle, color: "#737373" }}>في الجسد والطاقة</div>
              {["إرهاق لا مبرر له حتى بعد النوم", "بطء في الحركة والكلام", "اضطراب في النوم والشهية", "آلام جسدية غير مفسرة"].map((t, i) => (
                <div key={i} style={s.resultItem}><div style={s.resultDot("#737373")} />{t}</div>
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
        <p style={{ fontSize: "14px", color: "#ababab", textAlign: "right", marginBottom: "24px" }}>الاكتئاب من أكثر الاضطرابات النفسية قابليةً للعلاج — معظم المصابين يتحسنون مع العلاج المناسب.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {treatments.map((t) => (
            <div key={t.id}>
              <div
                style={{ background: "white", borderRadius: expandedTreatment === t.id ? "14px 14px 0 0" : "14px", padding: "20px 24px", border: `2px solid ${expandedTreatment === t.id ? t.color : "#e4e4e4"}`, cursor: "pointer", transition: "border 0.2s", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                onClick={() => setExpandedTreatment(expandedTreatment === t.id ? null : t.id)}
                onMouseEnter={e => { e.currentTarget.style.border = `2px solid ${t.color}`; }}
                onMouseLeave={e => { if (expandedTreatment !== t.id) e.currentTarget.style.border = "2px solid #e4e4e4"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "24px", width: "44px", height: "44px", background: t.color, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>{t.icon}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "11px", color: "#c8c8c8", marginBottom: "2px" }}>{t.en}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ fontSize: "17px", fontWeight: "700", color: "#2a2a2a" }}>{t.label}</div>
                      {t.badge && <span style={{ fontSize: "11px", background: "#f0f0f0", color: "#525252", borderRadius: "20px", padding: "2px 10px" }}>✦ {t.badge}</span>}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: "22px", color: "#c8c8c8" }}>{expandedTreatment === t.id ? "−" : "+"}</span>
              </div>
              {expandedTreatment === t.id && (
                <div style={{ background: "white", borderRadius: "0 0 14px 14px", padding: "4px 24px 20px", border: `2px solid ${t.color}`, borderTop: "none" }}>
                  {t.details.map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: i < t.details.length - 1 ? "1px solid #f5f5f5" : "none", fontSize: "14px", color: "#525252", lineHeight: "1.9", textAlign: "right" }}>
                      <span style={{ color: "#8f8f8f", flexShrink: 0, fontSize: "16px" }}>•</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: "12px", color: "#c8c8c8", textAlign: "center", marginTop: "28px" }}>
          هذا المحتوى لأغراض تثقيفية فقط. إذا كنت تعاني من أعراض الاكتئاب، تحدث مع <strong style={{ color: "#3a3a3a" }}>متخصص نفسي</strong>.
        </p>
      </div>

    </div>
  );
}
