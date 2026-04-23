import { useState } from "react";

const s = {
  page: { background: "#f4f4ff", minHeight: "100vh", direction: "rtl", fontFamily: "'Tajawal', sans-serif" },
  breadcrumb: { textAlign: "center", fontSize: "13px", color: "#999", marginBottom: "12px" },
  heroSection: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px 60px", textAlign: "center", background: "linear-gradient(135deg, #f0f8fe 0%, #e8f0f7 100%)" },
  heroLabel: { fontSize: "32px", fontWeight: "700", color: "#4a8fa8", marginBottom: "8px", fontFamily: "'Roca One', sans-serif" },
  heroTitle: { fontSize: "44px", fontWeight: "700", color: "#3b6b8a", marginBottom: "16px", textShadow: "2px 2px 12px rgba(74, 143, 168, 0.4)", fontFamily: "'Roca One', sans-serif" },
  heroSub: { fontSize: "18px", color: "#5a5a7a", maxWidth: "580px" },
  sectionWrapper: { maxWidth: "860px", margin: "0 auto", padding: "60px 24px" },
  sectionLabel: { fontSize: "12px", color: "#aaa", letterSpacing: "1px", marginBottom: "6px", textAlign: "right" },
  sectionTitle: { fontSize: "28px", fontWeight: "700", color: "#3b3b6b", marginBottom: "32px", textAlign: "right" },
  sectionTitleHighlight: { color: "#4a8fa8" },
  divider: { border: "none", borderTop: "1px solid #d8d8ee", margin: "0 auto", maxWidth: "2000px" },
  defGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  defCard: (borderColor) => ({ background: "white", borderRadius: "16px", padding: "24px", border: `2px solid ${borderColor}`, position: "relative", overflow: "hidden" }),
  defCardBar: (color) => ({ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: color, borderRadius: "16px 16px 0 0" }),
  defCardTitle: { fontSize: "18px", fontWeight: "700", color: "#3b3b6b", marginBottom: "10px" },
  defCardText: { fontSize: "14px", color: "#6f6f8f", lineHeight: "1.8" },
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
  tabRow: { display: "flex", gap: "0", marginBottom: "28px", borderBottom: "2px solid #e0ddf5" },
  tab: (active) => ({
    padding: "10px 20px", fontSize: "15px", cursor: "pointer", fontFamily: "'Tajawal', sans-serif",
    color: active ? "#4a8fa8" : "#999", background: "none", border: "none",
    borderBottom: active ? "2px solid #4a8fa8" : "2px solid transparent",
    marginBottom: "-2px", transition: "0.2s", fontWeight: active ? "700" : "400",
  }),
  symptomsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  symptomCard: () => ({
    background: "white", borderRadius: "12px", padding: "16px 20px",
    border: "1.5px solid #e0ddf5",
    fontSize: "14px", color: "#3b3b6b", display: "flex", alignItems: "flex-start", gap: "10px",
    transition: "transform 0.2s, box-shadow 0.2s",
  }),
  dot: (color) => ({ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0, marginTop: "6px" }),
  causeBlock: { background: "white", borderRadius: "16px", padding: "28px 32px", marginBottom: "0", border: "1.5px solid #e0ddf5", position: "relative" },
  causeBlockHighlight: { background: "white", borderRadius: "16px", padding: "28px 32px", marginBottom: "0", border: "2px solid #4a8fa8" },
  causeBlockWarning: { background: "#fff9f0", borderRadius: "16px", padding: "20px 28px", marginTop: "8px", border: "1.5px solid #f4dcc8" },
  causeTitle: { fontSize: "17px", fontWeight: "700", color: "#3b3b6b", marginBottom: "14px", textAlign: "right" },
  causeLine: { fontSize: "14px", color: "#5a5a7a", lineHeight: "2", borderBottom: "1px solid #f0eef8", padding: "6px 0", textAlign: "right" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px", justifyContent: "flex-end" },
  tag: (color) => ({ background: color, borderRadius: "30px", padding: "6px 16px", fontSize: "13px", color: "#3b3b6b" }),
  copingGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" },
  copingCard: { background: "white", borderRadius: "14px", padding: "20px", border: "1.5px solid #e0ddf5", transition: "border 0.2s" },
  copingIcon: { fontSize: "22px", marginBottom: "8px" },
  copingTitle: { fontSize: "15px", fontWeight: "700", color: "#3b3b6b", marginBottom: "4px" },
  copingEn: { fontSize: "11px", color: "#bbb", marginBottom: "10px" },
  copingText: { fontSize: "13px", color: "#7a7a9a", lineHeight: "1.7" },
  traitsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "14px" },
  traitCard: (borderColor) => ({ background: "white", borderRadius: "14px", padding: "18px 16px", border: `2px solid ${borderColor}`, position: "relative", overflow: "hidden" }),
  traitBar: (color) => ({ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: color }),
  traitTitle: { fontSize: "14px", fontWeight: "700", color: "#3b3b6b", marginBottom: "4px" },
  traitEn: { fontSize: "11px", color: "#bbb", marginBottom: "8px" },
  traitText: { fontSize: "12px", color: "#7a7a9a", lineHeight: "1.6" },
  brainList: { display: "flex", flexDirection: "column", gap: "12px" },
  brainNum: (bg) => ({ minWidth: "40px", height: "40px", borderRadius: "50%", background: bg, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px" }),
  brainTitle: { fontSize: "16px", fontWeight: "700", color: "#3b3b6b", marginBottom: "4px" },
  brainText: { fontSize: "13px", color: "#6a6a8a", lineHeight: "1.7" },
  resultBox: { background: "white", borderRadius: "16px", padding: "28px 36px", border: "1.5px solid #e0ddf5" },
  resultItem: { fontSize: "14px", color: "#4a4a6a", lineHeight: "2.2", display: "flex", alignItems: "flex-start", gap: "10px" },
  resultDot: (c) => ({ width: "6px", height: "6px", borderRadius: "50%", background: c, flexShrink: 0, marginTop: "8px" }),
};

const adhdTypes = [
  { id: 1, label: "قلة الانتباه", en: "Inattentive", color: "#c8dff4" },
  { id: 2, label: "فرط الحركة والاندفاعية", en: "Hyperactive-Impulsive", color: "#dcc8f4" },
  { id: 3, label: "النوع المدمج", en: "Combined Type", color: "#c8f4e8" },
];

const typeColors = ["#c8dff4", "#dcc8f4", "#c8f4e8"];

const typeDetails = {
  1: [
    "حالة من التشتت المستمر، وكأن العقل يرفض التمسك بأي فكرة أو مهمة لفترة كافية.",
    "يغرق الفرد في نسيان التفاصيل، فقدان الأشياء، والقفز بين الأفكار دون إنجاز شيء حتى النهاية.",
    "لا يرافقه فرط حركة واضح، لذلك يُشخَّص متأخراً، خاصةً عند البنات اللواتي يبدون 'حالمات' فقط.",
    "لُيصنَّف كاضطراب، يجب أن تستمر هذه الأعراض لأكثر من ستة أشهر، تبدأ قبل سن الثانية عشرة، وتظهر في بيئتين مختلفتين على الأقل.",
  ],
  2: [
    "طاقة جسدية وذهنية تفوق ما تستطيع البيئة المحيطة استيعابه.",
    "يتصرف الفرد قبل أن يفكر، يقاطع الآخرين، ويجد صعوبة شديدة في الانتظار أو الجلوس ساكناً.",
    "النوع الأقل شيوعاً، وأكثر وضوحاً للعين، مما يجعل تشخيصه أسرع، خاصةً عند الأولاد.",
  ],
  3: [
    "الجمع بين ضعف الانتباه وفرط الحركة والاندفاعية معاً في آنٍ واحد.",
    "النوع الأكثر شيوعاً وتأثيراً، إذ يجمع صعوبات التركيز مع التصرفات الاندفاعية وعدم الهدوء.",
    "يحتاج إلى خطة علاج أكثر شمولاً تُراعي كلا الجانبين معاً.",
  ],
};

const symptomTabs = ["الأعراض المعرفية والنفسية", "الأعراض السلوكية", "الأعراض الجسدية", "نوبات الهلع"];
const symptomData = {
  "الأعراض المعرفية والنفسية": [
    { text: "صعوبة شديدة في الانتباه للتفاصيل والوقوع في أخطاء الإهمال.", color: "#d5c0f4" },
    { text: "صعوبة الحفاظ على التركيز في المهام والمحادثات.", color: "#d5c0f4" },
    { text: "سهولة التشتت بأي مؤثر خارجي بسيط.", color: "#c0d5f4" },
    { text: "النسيان المتكرر في الأنشطة اليومية والمواعيد.", color: "#c0d5f4" },
    { text: "صعوبة تنظيم المهام وترتيب الأولويات.", color: "#c0f4d5" },
    { text: "تجنب المهام التي تتطلب جهداً ذهنياً مستمراً.", color: "#c0f4d5" },
    { text: "ضبابية ذهنية (Brain Fog) وصعوبة في الوضوح الفكري.", color: "#f4f0c0" },
  ],
  "الأعراض السلوكية": [
    { text: "التململ وعدم القدرة على الجلوس ساكناً (Fidgeting).", color: "#f4c0c0" },
    { text: "الكلام الزائد والمقاطعة المتكررة للآخرين.", color: "#f4c0c0" },
    { text: "التصرف دون تفكير في العواقب.", color: "#f4d5c0" },
    { text: "صعوبة انتظار الدور في المحادثات أو المواقف.", color: "#f4d5c0" },
    { text: "الميل للبدء في مهام جديدة قبل إنهاء القديمة.", color: "#d5c0f4" },
    { text: "فقدان الأشياء الضرورية باستمرار (المفاتيح، الهاتف، الأوراق).", color: "#d5c0f4" },
  ],
  "الأعراض الجسدية": [
    { text: "الإرهاق الذهني والجسدي نتيجة الجهد المستمر للتركيز.", color: "#f4c0c0" },
    { text: "اضطرابات النوم وصعوبة الاستيقاظ في الصباح.", color: "#c0d5f4" },
    { text: "توتر في العضلات ناجم عن الضغط الداخلي المستمر.", color: "#f4d5c0" },
    { text: "الشعور بضيق جسدي عند مواجهة المهام الشاقة.", color: "#c0f4d5" },
  ],
  "نوبات الهلع": [
    { text: "التقلبات العاطفية المفاجئة وشدة ردود الأفعال.", color: "#f4c0c0" },
    { text: "حساسية مفرطة للنقد والرفض (RSD).", color: "#f4c0c0" },
    { text: "الإحباط السريع عند مواجهة عقبات بسيطة.", color: "#c0d5f4" },
    { text: "صعوبة في استعادة الهدوء بعد انفعال عاطفي.", color: "#f4d5c0" },
    { text: "تدني الثقة بالنفس نتيجة تراكم الإخفاقات.", color: "#d5c0f4" },
  ],
};

const copingCards = [
  { icon: "⏳", title: "التسويف المزمن", en: "Chronic Procrastination", text: "تأجيل المهام باستمرار لأن الدماغ لا يجد الدافع الكافي لبدئها، مما يخلق دوامة من الذنب والتوتر والتأجيل المتكرر." },
  { icon: "🌀", title: "الإفراط في الانشغال", en: "Hyperbusyness", text: "ملء كل لحظة بالنشاط والفوضى هرباً من الجلوس مع الأفكار أو مواجهة مهمة صعبة. يبدو الشخص 'مشغولاً' لكنه لا ينجز الأهم." },
  { icon: "⏱️", title: "الاعتماد على الضغط اللحظي", en: "Deadline Dependency", text: "عدم القدرة على البدء إلا تحت وطأة الموعد النهائي، مما يصنع أداءً متذبذباً وضغطاً دائماً وإرهاقاً مزمناً." },
  { icon: "🙈", title: "التجنب العاطفي", en: "Emotional Avoidance", text: "الابتعاد عن المواقف والعلاقات التي تتطلب جهداً تنظيمياً أو قد تُسبب إحراجاً بسبب الأعراض. يُضيّق دائرة الحياة تدريجياً." },
  { icon: "📱", title: "الإفراط في المحفزات السريعة", en: "Dopamine Seeking", text: "اللجوء المستمر للمحتوى السريع الذي يُشبع الدوبامين مؤقتاً دون بذل جهد، مما يُقلل القدرة على تحمل المهام الأبطأ والأهم." },
  { icon: "💔", title: "إلقاء اللوم على الذات", en: "Self-blame", text: "تفسير كل إخفاق على أنه دليل على الكسل أو الغباء، مما يؤدي للاكتئاب المصاحب وتدمير الثقة بالنفس تدريجياً وبصمت." },
  { icon: "🤝", title: "طلب الطمأنينة المفرطة", en: "Excessive Reassurance-Seeking", text: "الاعتماد على الآخرين لتأكيد قراراته وتنظيم مهامه باستمرار، مما يُضعف الاستقلالية ويُثقل العلاقات." },
];

const traitCards = [
  { title: "الاندفاعية العاطفية", en: "Emotional Impulsivity", text: "ردود أفعال عاطفية مكثفة وسريعة غير متناسبة مع الموقف، وصعوبة في تهدئة هذه المشاعر بعد إثارتها.", color: "#f4c8c8", bar: "#c46a6a" },
  { title: "حساسية الرفض المؤلمة", en: "RSD", text: "ألم عاطفي حاد عند الشعور بأي رفض أو انتقاد. يُعاني منها ما يصل إلى 98% من البالغين المصابين.", color: "#f4c8d5", bar: "#c46a8a" },
  { title: "عدم الاتساق في الأداء", en: "Performance Inconsistency", text: "قدرة استثنائية في بعض الأيام وشلل تام في أيام أخرى دون سبب واضح.", color: "#c8d5f4", bar: "#6a8fc4" },
  { title: "الإبداع والتفكير خارج الصندوق ✨", en: "Creative & Divergent Thinking", text: "ميل طبيعي لرؤية الروابط غير المتوقعة بين الأفكار وابتكار حلول غير تقليدية.", color: "#c8f4e0", bar: "#4a9a6a" },
  { title: "فرط التركيز الانتقائي ✨", en: "Hyperfocus", text: "قدرة على الانغماس الكلي في الاهتمامات التي تُحفّز الدوبامين، مما يجعل بعضهم بارعين استثنائيين في مجالاتهم.", color: "#dcc8f4", bar: "#8a6ac4" },
  { title: "الكمالية الدفاعية", en: "Defensive Perfectionism", text: "كمالية مبالغ فيها كآلية تعويضية لإخفاء أعراض ADHD وإثبات الكفاءة للآخرين.", color: "#f4dcc8", bar: "#c4992a" },
  { title: "الحاجة للتحفيز المرتفع", en: "High Stimulation Need", text: "الملل السريع جداً من الأنشطة الروتينية والبحث المستمر عن التجديد والإثارة كمصدر طبيعي للدوبامين.", color: "#c8f4f4", bar: "#4aaac4" },
];

const brainSteps = [
  { title: "قشرة الفص الجبهي", en: "Prefrontal Cortex", text: "عند مواجهة مهمة تتطلب تركيزاً مستمراً، تُرسل قشرة الفص الجبهي إشارات لتفعيل الانتباه والتخطيط والتحكم بالاندفاع. في ADHD، هذه المنطقة أبطأ نضجاً وأقل نشاطاً، مما يُضعف قدرتها على 'إدارة' بقية الدماغ بفعالية.", bg: "#3b6b8a" },
  { title: "الدوبامين والنورإبينفرين", en: "Dopamine & Norepinephrine", text: "في الدماغ الطبيعي، يُفرز الدوبامين بكميات كافية عند البدء بمهمة مما يجعلها 'تبدو مهمة'. في دماغ ADHD، الدوبامين شحيح في هذه الدوائر — لذا لا يجد الدماغ 'السبب الكافي' للبدء أو الاستمرار حتى في المهام الضرورية.", bg: "#4a8fa8" },
  { title: "الشبكة العصبية الافتراضية", en: "Default Mode Network", text: "هذه الشبكة المسؤولة عن الأحلام والتخيل تبقى نشطة بشكل غير طبيعي حتى أثناء التركيز في ADHD، مما يخلق 'ضوضاء داخلية' مستمرة تُصعّب التركيز وتُفسّر التشتت المزمن.", bg: "#6a9ab0" },
  { title: "العقد القاعدية", en: "Basal Ganglia", text: "تُحدث انخفاضاً في نشاط العقد القاعدية المسؤولة عن تنظيم الحركة والتحكم بالاندفاع، مما يجعل كبح الأفعال الفورية وتأجيل المكافأة أمراً شاقاً للغاية.", bg: "#8aaa4a" },
  { title: "اللوزة الدماغية", en: "Amygdala", text: "تُرسل اللوزة الدماغية استجابات عاطفية مبالغ فيها تجاه الإخفاق أو الانتقاد، بينما تعجز قشرة الفص الجبهي الضعيفة عن تهدئتها — وهذا يُفسّر ظاهرة 'حساسية الرفض المؤلمة RSD' بشكل كامل.", bg: "#c4992a" },
];

const treatments = [
  {
    id: 1, icon: "🧩", en: "Cognitive Behavioral Therapy", label: "العلاج السلوكي المعرفي (CBT)", color: "#ddc8f4",
    details: [
      "التثقيف النفسي: فهم أن التسويف وصعوبة البدء ليسا كسلاً، بل خللاً في نظام الدوبامين يمكن تجاوزه بالاستراتيجيات الصحيحة. التعامل مع ADHD كاختلاف لا كعيب.",
      "إعادة الهيكلة المعرفية: تحدي الأفكار مثل 'أنا فاشل' أو 'لن أستطيع أبداً' وربطها بالاضطراب لا بالشخصية. تغيير الحوار الداخلي من العقاب إلى الحل.",
      "تدريب المهارات: تعليم التخطيط، تقسيم المهام إلى خطوات صغيرة قابلة للتنفيذ، وبناء أنظمة شخصية تعوّض الضعف في الوظائف التنفيذية.",
      "التعرض التدريجي: مواجهة تدريجية للمهام المؤجلة لكسر الدوامة السلبية. تعليم الدماغ أن البدء ممكن دون الحاجة لضغط الموعد النهائي.",
    ],
  },
  {
    id: 2, icon: "💊", en: "Pharmacotherapy", label: "العلاج الدوائي", color: "#c8dff4",
    details: [
      "الأدوية المنشطة (الخط الأول): كالميثيلفينيدات (ريتالين) والأمفيتامينات. هي الأكثر فعالية — ترفع الدوبامين والنورإبينفرين في قشرة الفص الجبهي مباشرةً. تحسين واضح في التركيز والتنظيم والتحكم.",
      "الأدوية غير المنشطة (الخط الثاني): كأتوموكسيتين (ستراتيرا) وجوانفاسين. تُستخدم عند عدم تحمل المنشطات أو وجود حالات مصاحبة كالقلق أو اضطراب النوم.",
      "ناهضات ألفا لعلاج الحساسية العاطفية: كلونيدين وجوانفاسين — تُستخدم تحديداً لعلاج حساسية الرفض المؤلمة (RSD). تعمل على تهدئة نشاط النورإبينفرين.",
      "مضادات اكتئاب SNRIs: في حالات ADHD المصحوبة باكتئاب أو قلق مزمن — تساعد على تنظيم الدوبامين والسيروتونين والنورإبينفرين معاً.",
    ],
  },
  {
    id: 3, icon: "⚡", en: "Combined Treatment", label: "العلاج المدمج", color: "#f4f0c8", badge: "الأفضل نتائج",
    details: [
      "دمج CBT مع الأدوية يعطي أفضل النتائج. الأدوية تُهيّئ الدماغ للاستفادة من جلسات العلاج النفسي، وتُمكّن الشخص من تطبيق الاستراتيجيات السلوكية بفعالية أكبر.",
      "الدعم المدرسي والمهني: وقت إضافي في الامتحانات، تقليل المشتتات، تقسيم المهام، مرونة في طريقة التسليم. هذه التكييفات تُظهر القدرة الحقيقية للشخص.",
    ],
  },
  {
    id: 4, icon: "🌿", en: "Lifestyle & Support", label: "تعديل نمط الحياة والدعم", color: "#c8f4e0",
    details: [
      "الرياضة: الرياضة المنتظمة — خاصةً التمارين الهوائية — ترفع الدوبامين والنورإبينفرين بشكل طبيعي وتُحسّن التركيز بشكل ملحوظ ومثبت علمياً.",
      "الروتين: الجداول المنتظمة تُقلل العبء على الدماغ وتُحوّل القرارات اليومية إلى عادات تلقائية. الفوضى تُضاعف الأعراض والبنية تُخففها.",
      "تقنية بومودورو: 25 دقيقة عمل + 5 دقائق راحة. تمنع الإرهاق الذهني وتحافظ على التركيز بتقسيم العمل إلى جلسات قصيرة.",
      "الدعم الاجتماعي: الانضمام لمجموعات دعم، والتحدث مع أشخاص يفهمون الاضطراب يُقلل العزلة ويوفر استراتيجيات عملية مجرّبة.",
    ],
  },
];

const resultItems = [
  "صعوبة في بدء المهام حتى المهمة منها (Task Initiation Deficit) — 'أعرف أنني يجب أن أبدأ، لكن لا أستطيع'.",
  "الانتقال المتكرر بين المهام دون إنهاء أي منها — دوامة مستمرة من البدايات بلا نهايات.",
  "فرط التركيز على أنشطة ذات تحفيز عالٍ مقابل شلل تام أمام أنشطة روتينية أو ذات تحفيز منخفض.",
  "تفاوت حاد في الأداء بين يوم وآخر بحسب مستوى التحفيز المتاح — لا يمكن التنبؤ بأداء اليوم.",
];

export default function ADHDDetail() {
  const [activeTab, setActiveTab] = useState("الأعراض المعرفية والنفسية");
  const [expandedType, setExpandedType] = useState(null);
  const [expandedTreatment, setExpandedTreatment] = useState(null);

  return (
    <div style={s.page}>

      {/* Hero */}
      <div style={s.heroSection}>
        <div style={s.breadcrumb}>الاضطرابات النفسية &gt; نقص الانتباه وفرط الحركة</div>
        <div style={s.heroLabel}>ADHD</div>
        <h1 style={s.heroTitle}>عقل لا يعرف زر الإيقاف</h1>
        <p style={s.heroSub}>
          ADHD ليس كسلاً ولا قلة اهتمام، هو اضطراب يعيش معه{" "}
          <strong style={{ color: "#3b6b8a" }}>أكثر من 366 مليون</strong>{" "}
          شخص حول العالم
        </p>
      </div>

      <hr style={s.divider} />

      {/* التعريف */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>التعريف</div>
        <h2 style={s.sectionTitle}>
          ما هو <span style={s.sectionTitleHighlight}>نقص الانتباه وفرط الحركة</span>؟
        </h2>
        <div style={s.defGrid}>
          <div style={s.defCard("#c8dff4")}>
            <div style={s.defCardBar("#4a8fa8")} />
            <div style={s.defCardTitle}>الانتباه الطبيعي</div>
            <div style={s.defCardText}>
              الانتباه هو قدرة طبيعية يمتلكها الجميع. فهو نظام تنظيمي في الدماغ يساعدك على إنجاز المهام، ترتيب الأولويات، والتحكم في ردود أفعالك.
            </div>
          </div>
          <div style={s.defCard("#ddc8f4")}>
            <div style={s.defCardBar("#8a6ac4")} />
            <div style={s.defCardTitle}>اضطراب نقص الانتباه وفرط الحركة</div>
            <div style={s.defCardText}>
              ADHD اضطراب عصبي نمائي يؤثر على كيفية نمو الدماغ وعمله. يبدأ في الطفولة ويستمر غالباً للبلوغ. الدماغ لا يعمل بشكل "خاطئ" — بل يعمل بطريقة مختلفة.
            </div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* الأنواع */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>الأنواع</div>
        <h2 style={s.sectionTitle}>
          أنواع <span style={s.sectionTitleHighlight}>الاضطراب</span> وأشكاله
        </h2>
        <p style={{ fontSize: "14px", color: "#999", textAlign: "right", marginBottom: "24px" }}>
          كل أحد فينا مميز بطريقته، حتى في اضطرابه.
        </p>
        <div style={s.typesGrid}>
          {adhdTypes.map((t) => (
            <div key={t.id} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={s.typeCard(typeColors[t.id - 1], expandedType === t.id)}
                onClick={() => setExpandedType(expandedType === t.id ? null : t.id)}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={s.typeNum(typeColors[t.id - 1])}>{t.id}</div>
                <div>
                  <div style={s.typeLabel}>{t.label}</div>
                  <div style={s.typeSub}>{t.en}</div>
                </div>
              </div>
              {expandedType === t.id && (
                <div style={{ background: "white", borderRadius: "0 0 14px 14px", padding: "16px 20px", fontSize: "14px", color: "#5a5a7a", lineHeight: "1.9", border: `2px solid ${typeColors[t.id - 1]}`, borderTop: "none", textAlign: "right", marginTop: "-4px" }}>
                  {typeDetails[t.id].map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: i < typeDetails[t.id].length - 1 ? "1px solid #f0eef8" : "none" }}>
                      <span style={{ color: "#aaa", flexShrink: 0 }}>—</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
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
          كيف يظهر <span style={s.sectionTitleHighlight}>ADHD</span> في جسدك؟
        </h2>
        <p style={{ fontSize: "14px", color: "#999", textAlign: "right", marginBottom: "24px" }}>
          تختلف الأعراض من شخص لآخر ومن مرحلة عمرية لأخرى — وقد تتداخل مع اضطرابات أخرى.
        </p>
        <div style={s.tabRow}>
          {symptomTabs.map(tab => (
            <button key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <div style={s.symptomsGrid}>
          {(symptomData[activeTab] || []).map((item, i) => (
            <div key={i} style={s.symptomCard()}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.08)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
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
        <h2 style={s.sectionTitle}>
          من أين يأتي <span style={s.sectionTitleHighlight}>ADHD</span>؟
        </h2>
        <p style={{ fontSize: "14px", color: "#999", textAlign: "right", marginBottom: "24px" }}>
          هناك 3 مسببات رئيسية لاضطراب ADHD — وهي تتفاعل مع بعضها لتحدد شدة الاضطراب وطريقة ظهوره.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#3b6b8a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>1</div>
            <div style={{ ...s.causeBlock, flex: 1 }}>
              <div style={s.causeTitle}>العوامل الجينية والوراثية</div>
              <div style={s.causeLine}>ADHD من أعلى الاضطرابات النفسية في نسبة الوراثة — تصل إلى 76%. إذا كان أحد الوالدين مصاباً، فالاحتمال مرتفع جداً أن ينتقل للأبناء.</div>
              <div style={s.causeLine}>خلل في مستويات الدوبامين والنورإبينفرين في قشرة الفص الجبهي المسؤولة عن التحكم التنفيذي.</div>
              <div style={s.causeLine}>تأخر في نضج قشرة الفص الجبهي (Prefrontal Cortex) مقارنةً بالأقران في نفس العمر.</div>
              <div style={s.causeLine}>ارتباط جينات محددة مثل DRD4 وDRD5 وCDH13 بزيادة خطر الإصابة واضطراب إشارات الدوبامين.</div>
              <div style={{ ...s.causeLine, borderBottom: "none" }}>حجم أصغر في مناطق دماغية كالعقد القاعدية والمخيخ عند بعض المصابين.</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#3b6b8a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>2</div>
            <div style={{ ...s.causeBlockHighlight, flex: 1 }}>
              <div style={s.causeTitle}>العوامل البيئية والضغوطات</div>
              <div style={{ fontSize: "14px", color: "#5a5a7a", marginBottom: "12px", textAlign: "right" }}>البيئة التي تنشأ فيها والمؤثرات التي تتعرض لها هي المحفز الذي يشعل الاستعداد الجيني الكامن، مثل:</div>
              <div style={s.tagRow}>
                {["التعرض للتبغ أو الكحول خلال الحمل", "الولادة المبكرة أو انخفاض وزن الولادة", "التعرض للرصاص أو المبيدات في سن مبكرة", "الحرمان من التحفيز المعرفي والعاطفي", "البيئات الفوضوية وغير المنتظمة"].map((t, i) => (
                  <span key={i} style={s.tag(["#f4e0cc", "#ddc8f4", "#c8d5f4", "#c8f4e0", "#f4c8c8"][i % 5])}>{t}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#3b6b8a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>3</div>
            <div style={{ ...s.causeBlock, flex: 1 }}>
              <div style={s.causeTitle}>العوامل العضوية والطبية</div>
              <div style={s.causeLine}>بطء في استقلاب الجلوكوز في المناطق الدماغية المسؤولة عن الانتباه والحركة.</div>
              <div style={s.causeLine}>خلل في نشاط الشبكة العصبية الافتراضية (Default Mode Network) التي تبقى نشطة بشكل غير طبيعي.</div>
              <div style={s.causeLine}>اضطرابات الغدة الدرقية — فرط نشاطها يسبب أعراضاً مشابهة جداً لـ ADHD.</div>
              <div style={s.causeLine}>انخفاض الحديد والفيريتين في الدم يرتبط بتعطل إنتاج الدوبامين مباشرةً.</div>
              <div style={{ ...s.causeLine, borderBottom: "none" }}>بعض الأدوية كالكورتيكوستيرويدات تنتج أعراضاً مشابهة للاضطراب.</div>
            </div>
          </div>

          <div style={s.causeBlockWarning}>
            <div style={{ fontSize: "15px", fontWeight: "700", color: "#c46a20", marginBottom: "8px", textAlign: "right" }}>❌ خرافات شائعة عن أسباب ADHD</div>
            <div style={{ fontSize: "13px", color: "#7a5a3a", lineHeight: "1.8", textAlign: "right" }}>
              السكر لا يسبب ADHD. الشاشات والتلفزيون لا تسببه. التربية السيئة ليست السبب. الكسل أو قلة الإرادة لا علاقة لها به. هذه أساطير غير علمية — ADHD اضطراب دماغي حقيقي له أساس بيولوجي وجيني موثق بآلاف الدراسات العلمية.
            </div>
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
          هي استجابات سلوكية وعاطفية مختلة يلجأ إليها الفرد لتعويض صعوبات ADHD وحماية نفسه بشكل مصطنع. ورغم أنها قد توفر راحة مؤقتة، إلا أنها تزيد من تأثير الاضطراب وتُفاقم عواقبه على المدى الطويل.
        </p>
        <div style={s.copingGrid}>
          {copingCards.map((c, i) => (
            <div key={i} style={s.copingCard}
              onMouseEnter={e => { e.currentTarget.style.border = "1.5px solid #8ab0c4"; }}
              onMouseLeave={e => { e.currentTarget.style.border = "1.5px solid #e0ddf5"; }}
            >
              <div style={s.copingIcon}>{c.icon}</div>
              <div style={s.copingTitle}>{c.title}</div>
              <div style={s.copingEn}>{c.en}</div>
              <div style={s.copingText}>{c.text}</div>
            </div>
          ))}
        </div>
      </div>

      <hr style={s.divider} />

      {/* السمات الشخصية */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>السمات الشخصية</div>
        <h2 style={s.sectionTitle}>
          نقص الانتباه وفرط الحركة يُغيِّر <span style={s.sectionTitleHighlight}>شخصيتك</span>
        </h2>
        <p style={{ fontSize: "14px", color: "#999", textAlign: "right", marginBottom: "24px" }}>
          السمات الشخصية المرتبطة باضطراب ADHD — بعضها تحديات، وبعضها نقاط قوة حقيقية.
        </p>
        <div style={s.traitsGrid}>
          {traitCards.map((t, i) => (
            <div key={i} style={s.traitCard(t.color)}>
              <div style={s.traitBar(t.bar)} />
              <div style={{ height: "8px" }} />
              <div style={s.traitTitle}>{t.title}</div>
              <div style={s.traitEn}>{t.en}</div>
              <div style={{ fontSize: "12px", color: "#7a7a9a", lineHeight: "1.6" }}>{t.text}</div>
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
          فهم الآلية العصبية خلف الأعراض — لماذا يعمل الدماغ هكذا؟
        </p>
        <div style={s.brainList}>
          {brainSteps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ ...s.brainNum(step.bg), flexShrink: 0, marginTop: "4px" }}>{i + 1}</div>
              <div
                style={{ background: "white", borderRadius: "14px", padding: "20px 28px", border: "1.5px solid #e0ddf5", flex: 1, transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateX(-6px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.08)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={s.brainTitle}>{step.title} · <span style={{ fontSize: "12px", color: "#bbb", fontWeight: "400" }}>{step.en}</span></div>
                <div style={s.brainText}>{step.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: "white", borderRadius: "16px", padding: "28px 32px", border: "1.5px solid #e0ddf5", marginTop: "28px" }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#3b3b6b", marginBottom: "20px", textAlign: "right" }}>
            نتيجة هذا الخلل في الدوبامين والنورإبينفرين — تحدث هذه التأثيرات:
          </div>
          {resultItems.map((item, i) => (
            <div key={i} style={s.resultItem}>
              <div style={s.resultDot("#4a8fa8")} />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      <hr style={s.divider} />

      {/* العلاج */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>العلاج</div>
        <h2 style={s.sectionTitle}>
          طريقك نحو <span style={s.sectionTitleHighlight}>التعافي</span>
        </h2>
        <p style={{ fontSize: "14px", color: "#999", textAlign: "right", marginBottom: "24px" }}>
          لا يوجد علاج شافٍ — لكن الأعراض قابلة للإدارة بفعالية عالية جداً.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {treatments.map((t) => (
            <div key={t.id}>
              <div
                style={{ background: "white", borderRadius: expandedTreatment === t.id ? "14px 14px 0 0" : "14px", padding: "20px 24px", border: `2px solid ${expandedTreatment === t.id ? t.color : "#e0ddf5"}`, cursor: "pointer", transition: "border 0.2s", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                onClick={() => setExpandedTreatment(expandedTreatment === t.id ? null : t.id)}
                onMouseEnter={e => { e.currentTarget.style.border = `2px solid ${t.color}`; }}
                onMouseLeave={e => { if (expandedTreatment !== t.id) e.currentTarget.style.border = "2px solid #e0ddf5"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "20px", width: "36px", height: "36px", background: t.color, borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>{t.icon}</span>
                  <span style={{ fontSize: "18px", color: "#aaa" }}>{expandedTreatment === t.id ? "−" : "+"}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "11px", color: "#bbb", marginBottom: "2px" }}>{t.en}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "flex-end" }}>
                    <div style={{ fontSize: "17px", fontWeight: "700", color: "#3b3b6b" }}>{t.label}</div>
                    {t.badge && <span style={{ fontSize: "11px", background: "#f4f0c8", color: "#a07820", borderRadius: "20px", padding: "2px 10px" }}>✦ {t.badge}</span>}
                  </div>
                </div>
              </div>
              {expandedTreatment === t.id && (
                <div style={{ background: "white", borderRadius: "0 0 14px 14px", padding: "4px 24px 20px", border: `2px solid ${t.color}`, borderTop: "none" }}>
                  {t.details.map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: i < t.details.length - 1 ? "1px solid #f0eef8" : "none", fontSize: "14px", color: "#5a5a7a", lineHeight: "1.9", textAlign: "right" }}>
                      <span style={{ color: t.color, flexShrink: 0, fontSize: "16px" }}>•</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ background: "linear-gradient(135deg, #e8f4f8 0%, #f0f8f4 100%)", borderRadius: "16px", padding: "24px 32px", marginTop: "24px", border: "1.5px solid #c8dff4", textAlign: "right" }}>
          <div style={{ fontSize: "15px", fontWeight: "700", color: "#3b6b8a", marginBottom: "8px" }}>✅ أفضل النتائج تأتي من المنهج المتكامل</div>
          <div style={{ fontSize: "13px", color: "#5a7a8a", lineHeight: "1.9" }}>
            الجمع بين العلاج الدوائي والنفسي السلوكي وتعديل نمط الحياة والدعم الاجتماعي والمدرسي — كلٌّ منها يعمل على مستوى مختلف من الاضطراب، وسوياً يُحققون نتائج أفضل بكثير من أي علاج منفرد.
          </div>
        </div>

        <p style={{ fontSize: "12px", color: "#bbb", textAlign: "center", marginTop: "28px" }}>
          هذا المحتوى لأغراض تثقيفية فقط. إذا كنت تعاني من أعراض القلق وفرط الحركة، تحدث مع <strong style={{ color: "#4a8fa8" }}>متخصص نفسي</strong>.
        </p>
      </div>

    </div>
  );
}