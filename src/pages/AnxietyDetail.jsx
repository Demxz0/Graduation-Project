import { useState } from "react";

// ===== لوحة الألوان المتدرجة المبنية على #d6936a =====
// #7a3f20 → #a85c38 → #d6936a → #e0aa88 → #eec5a8 → #f7e4d6 → #fdf6f2

const s = {
  page: { background: "#f4f4ff", minHeight: "100vh", direction: "rtl", fontFamily: "'Tajawal', sans-serif" },
  breadcrumb: { textAlign: "center", fontSize: "13px", color: "#e0aa88", marginBottom: "12px" },
  heroSection: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px 60px", textAlign: "center", background: "linear-gradient(135deg, #fdf6f2 0%, #f5e6d8 100%)" },
  heroTitle: { fontSize: "44.5px", fontWeight: "700", color: "#7a3f20", marginBottom: "16px", textShadow: "2px 2px 12px rgba(122, 63, 32, 0.25)", fontFamily: "'Roca One', sans-serif" },
  heroSub: { fontSize: "18px", color: "#6b4a38", maxWidth: "550px" },
  sectionWrapper: { maxWidth: "860px", margin: "0 auto", padding: "60px 24px" },
  sectionLabel: { fontSize: "12px", color: "#e0aa88", letterSpacing: "1px", marginBottom: "6px", textAlign: "right" },
  sectionTitle: { fontSize: "28px", fontWeight: "700", color: "#3b2415", marginBottom: "32px", textAlign: "right" },
  sectionTitleHighlight: { color: "#a85c38" },
  divider: { border: "none", borderTop: "1px solid #eec5a8", margin: "0 auto", maxWidth: "2000px" },
  defGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  defCard: (borderColor) => ({ background: "white", borderRadius: "16px", padding: "24px", border: `2px solid ${borderColor}`, position: "relative", overflow: "hidden" }),
  defCardBar: (color) => ({ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: color, borderRadius: "16px 16px 0 0" }),
  defCardTitle: { fontSize: "18px", fontWeight: "700", color: "#3b2415", marginBottom: "10px" },
  defCardText: { fontSize: "14px", color: "#6b4a38", lineHeight: "1.8" },
  typesGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  typeCard: (borderColor, active) => ({
    background: "white", borderRadius: "14px", padding: "24px 24px 20px",
    border: "2px solid white",
    cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex", flexDirection: "row", justifyContent: "flex-start",
    alignItems: "center", gap: "16px",
    position: "relative", overflow: "hidden",
    boxShadow: "0 2px 12px rgba(214,147,106,0.08)",
  }),
  typeNum: (color) => ({ fontSize: "28px", fontWeight: "700", color, opacity: 0.35 }),
  typeLabel: { fontSize: "16px", fontWeight: "700", color: "#3b2415" },
  typeSub: { fontSize: "12px", color: "#e0aa88" },
  tabRow: { display: "flex", gap: "0", marginBottom: "28px", borderBottom: "2px solid #d6936a" },
  tab: (active) => ({
    padding: "10px 20px", fontSize: "15px", cursor: "pointer", fontFamily: "'Tajawal', sans-serif",
    color: active ? "#7a3f20" : "#e0aa88", background: "none", border: "none",
    borderBottom: active ? "2px solid #7a3f20" : "2px solid transparent",
    marginBottom: "-2px", transition: "0.2s, transform 0.2s", fontWeight: active ? "700" : "400",
  }),
  symptomsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  symptomCard: (active) => ({
    background: "white", borderRadius: "12px", padding: "16px 20px",
    border: "1.5px solid #eec5a8",
    fontSize: "15px", color: "#3b2415", display: "flex", alignItems: "center", gap: "10px",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 12px rgba(214,147,106,0.1)",
  }),
  dot: (color) => ({ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }),
  causeBlock: { background: "white", borderRadius: "16px", padding: "28px 32px", marginBottom: "16px", border: "1.5px solid #eec5a8", position: "relative" },
  causeBlockHighlight: { background: "white", borderRadius: "16px", padding: "28px 32px", marginBottom: "16px", border: "2px solid #a85c38" },
  causeTitle: { fontSize: "17px", fontWeight: "700", color: "#3b2415", marginBottom: "14px", textAlign: "right" },
  causeLine: { fontSize: "14px", color: "#6b4a38", lineHeight: "2", borderBottom: "1px solid #faf0ea", padding: "6px 0", textAlign: "right" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px", justifyContent: "flex-end" },
  tag: (color) => ({ background: color, borderRadius: "30px", padding: "6px 16px", fontSize: "13px", color: "#3b2415" }),
  copingGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" },
  copingCard: { background: "white", borderRadius: "14px", padding: "20px", border: "1.5px solid #eec5a8", transition: "border 0.2s" },
  copingIcon: { fontSize: "22px", marginBottom: "8px" },
  copingTitle: { fontSize: "15px", fontWeight: "700", color: "#3b2415", marginBottom: "4px" },
  copingEn: { fontSize: "11px", color: "#e0aa88", marginBottom: "10px" },
  copingText: { fontSize: "13px", color: "#a85c38", lineHeight: "1.7" },
  copingCardWide: { gridColumn: "span 3", background: "white", borderRadius: "14px", padding: "20px 28px", border: "1.5px solid #eec5a8", transition: "border 0.2s" },
  traitsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "14px" },
  traitCard: (borderColor) => ({ background: "white", borderRadius: "14px", padding: "18px 16px", border: `2px solid ${borderColor}`, position: "relative", overflow: "hidden" }),
  traitBar: (color) => ({ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: color }),
  traitTitle: { fontSize: "14px", fontWeight: "700", color: "#3b2415", marginBottom: "4px" },
  traitEn: { fontSize: "11px", color: "#e0aa88", marginBottom: "8px" },
  traitText: { fontSize: "12px", color: "#a85c38", lineHeight: "1.6" },
  brainList: { display: "flex", flexDirection: "column", gap: "12px" },
  brainCard: (active) => ({
    background: "white", borderRadius: "14px", padding: "20px 28px",
    border: active ? "2px solid #a85c38" : "1.5px solid #eec5a8",
    display: "flex", alignItems: "flex-start", gap: "20px",
  }),
  brainNum: (bg) => ({ minWidth: "40px", height: "40px", borderRadius: "50%", background: bg, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px" }),
  brainTitle: { fontSize: "16px", fontWeight: "700", color: "#3b2415", marginBottom: "4px" },
  brainText: { fontSize: "13px", color: "#6b4a38", lineHeight: "1.7" },
  resultBox: { background: "white", borderRadius: "16px", padding: "28px 36px", border: "1.5px solid #eec5a8", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" },
  resultColTitle: { fontSize: "14px", fontWeight: "700", color: "#7a3f20", marginBottom: "14px" },
  resultItem: { fontSize: "14px", color: "#3b2415", lineHeight: "2", display: "flex", alignItems: "center", gap: "8px" },
  resultDot: (c) => ({ width: "6px", height: "6px", borderRadius: "50%", background: c, flexShrink: 0 }),
};

const symptomTabs = ["الأعراض الجسدية", "المعرفية والنفسية", "السلوكية", "نوبات الهلع"];
const symptomData = {
  "الأعراض الجسدية": [
    { text: "آلام وشد مستمر في العضلات", color: "#d6936a" },
    { text: "التعب والإرهاق المستمر", color: "#d6936a" },
    { text: "اضطرابات النوم", color: "#e0aa88" },
    { text: "تسارع وخفقان في ضربات القلب", color: "#e0aa88" },
    { text: "ارتعاش", color: "#a85c38" },
    { text: "غثيان واضطرابات الجهاز الهضمي", color: "#a85c38" },
  ],
  "المعرفية والنفسية": [
    { text: "أفكار متسارعة لا تهدأ", color: "#d6936a" },
    { text: "صعوبة في التركيز", color: "#d6936a" },
    { text: "توقع الأسوأ دائماً", color: "#e0aa88" },
    { text: "الشعور بفقدان السيطرة", color: "#e0aa88" },
    { text: "الخوف المستمر من الحكم عليك", color: "#a85c38" },
    { text: "صعوبة اتخاذ القرارات", color: "#a85c38" },
  ],
  "السلوكية": [
    { text: "تجنب المواقف المثيرة للقلق", color: "#d6936a" },
    { text: "طلب الطمأنينة المفرطة", color: "#e0aa88" },
    { text: "التسويف والتأجيل", color: "#a85c38" },
    { text: "الانسحاب الاجتماعي", color: "#d6936a" },
    { text: "التحقق المتكرر من المثيرات", color: "#e0aa88" },
    { text: "إيقاف جميع الجهود والاستسلام", color: "#a85c38" },
  ],
  "نوبات الهلع": [
    { text: "تسارع شديد في ضربات القلب", color: "#d6936a" },
    { text: "ضيق أو تسارع في التنفس", color: "#d6936a" },
    { text: "ألم أو ضغط في الصدر", color: "#e0aa88" },
    { text: "تعرق وارتجاف في اليدين", color: "#e0aa88" },
    { text: "دوار أو شعور بعدم التوازن", color: "#a85c38" },
    { text: "شعور بالانفصال عن الواقع", color: "#a85c38" },
  ],
};

const types = [
  { id: 1, label: "اضطراب القلق العام", en: "Generalized Anxiety Disorder", color: "#7a3f20" },
  { id: 2, label: "اضطراب الهلع", en: "Panic Disorder", color: "#a85c38" },
  { id: 3, label: "رهاب الميادين", en: "Agoraphobia", color: "#d6936a" },
  { id: 4, label: "القلق الاجتماعي", en: "Social Anxiety", color: "#e0aa88" },
  { id: 5, label: "قلق الانفصال", en: "Separation Anxiety", color: "#eec5a8" },
  { id: 6, label: "الرهاب المحدد", en: "Specific Phobias", color: "#7a3f20" },
  { id: 7, label: "الخرس الانتقائي", en: "Selective Mutism", color: "#a85c38" },
  { id: 8, label: "القلق الناتج عن حالات طبية أو مواد", en: "Medical / Substance-Induced", color: "#d6936a" },
];

const typeColors = ["#7a3f20", "#a85c38", "#d6936a", "#e0aa88", "#eec5a8", "#7a3f20", "#a85c38", "#d6936a"];

const typeDetails = {
  1: ["حالة من التحفز المستمر، وكأن العقل يعمل بأقصى طاقته لتوقع التهديدات دون القدرة على إيقافه.", "يغرق الفرد في توقع مستمر للأسوأ تجاه أبسط تفاصيل الحياة اليومية كالعمل أو الصحة أو الأمور المالية.", "هذا الضغط المستمر يستهلك الطاقة الجسدية ويسبب الإرهاق وتوتر العضلات.", "لكي يُصنَّف كاضطراب، يجب أن تستمر هذه الحالة لمعظم الأيام طوال ستة أشهر، وتكون ردة الفعل أكبر بكثير من حجم الموقف الفعلي."],
  2: ["نوبات مباغتة تهاجم الفرد وكأنها إنذار بوجود خطر حقيقي، رغم عدم وجود أي تهديد.", "تترافق مع استجابة جسدية عنيفة وسريعة.", "يعيش الفرد في رعب مستمر من النوبة القادمة."],
  3: ["خوف الفرد من التواجد في أماكن يشعر أن الهروب منها مستحيل أو أن المساعدة غير متاحة.", "تشمل الأماكن: وسائل النقل العامة، الأسواق المزدحمة، الأماكن المفتوحة، أو مجرد التواجد خارج المنزل وحيداً.", "الخوف الأساسي هو التعرض لنوبة هلع في هذه الأماكن، وهي تُعدّ جزءاً فرعياً من اضطراب الهلع."],
  4: ["رعب حقيقي من التواجد تحت مجهر الآخرين — ليس مجرد خجل، بل خوف عميق ومستمر من التقييم السلبي أو الرفض.", "يسيطر على الفرد هاجس بأنه سيتصرف بطريقة محرجة أو مهينة.", "يدفعه ذلك للانسحاب من التفاعلات الاجتماعية أو تحملها بضغط نفسي هائل يتجاوز التقييم العقلاني للموقف."],
  5: ["خوف غير منطقي من فقدان الأشخاص الذين يمثلون مساحة الأمان الأساسية للفرد.", "يترافق مع أفكار وهواجس مستمرة بأن مكروهاً سيصيب أحباءه، وكوابيس متكررة حول الانفصال.", "لا يقتصر هذا الاضطراب على مرحلة الطفولة، بل يمكن أن يمتد للبالغين مما يؤثر على استقلاليتهم وأدائهم اليومي."],
  6: ["استجابة رعب مبالغ فيها ومستمرة تجاه محفز أو موقف معين كالمرتفعات أو الحيوانات أو الطيران.", "يكون القلق غير متناسب بشكل كبير مع الخطر الفعلي الذي يمثله هذا المحفز.", "يدرك الشخص عادةً أن خوفه مفرط، لكنه يعجز عن السيطرة عليه، مما يدفعه لتجنب المحفز تماماً."],
  7: ["حالة تظهر غالباً عند الأطفال، يفقد فيها الطفل قدرته على التحدث في بيئات اجتماعية معينة.", "يحدث هذا بالرغم من قدرته على التحدث بطلاقة وبشكل طبيعي في بيئاته الآمنة.", "يرتبط غالباً باضطراب القلق الاجتماعي، ويبدأ عادةً قبل سن الخامسة."],
  8: ["قلق يظهر كنتيجة مباشرة لحالة طبية عضوية كاضطرابات الغدة الدرقية أو أمراض القلب.", "قد ينتج أيضاً بسبب تأثيرات بعض الأدوية أو المواد المنشطة، أو كجزء من أعراض الانسحاب منها."],
};

const brainSteps = [
  { title: "اللوزة الدماغية", en: "AMYGDALA", text: "تُفسِّر اللوزة الدماغية محفزاً عادياً أو فكرة داخلية على أنه خطر حقيقي رغم عدم وجود تهديد فعلي.", bg: "#7a3f20" },
  { title: "إشارات الإنذار", en: "ALARM SIGNAL", text: "ترسل اللوزة الدماغية إشارات إنذار سريعة إلى أجزاء أخرى من الدماغ لتفعيل استجابة الخطر.", bg: "#a85c38" },
  { title: "قشرة الفص الجبهي", en: "PREFRONTAL CORTEX", text: "يُفترض أن تقوم قشرة الفص الجبهي بتحليل الموقف بشكل منطقي وإيقاف الإنذار – لكنها في اضطرابات القلق تكون أضعف من المعتاد.", bg: "#d6936a" },
  { title: "الناقل العصبية", en: "NEUROTRANSMITTERS", text: "يحدث انخفاض في تأثير الناقل العصبي المهدئ GABA وارتفاع في الناقلات المحفزة كالغلوتامات، مما يزيد من نشاط الدوائر العصبية المرتبطة بالخوف.", bg: "#e0aa88" },
  { title: "تحت المهاد", en: "HYPOTHALAMUS", text: "ترسل اللوزة الدماغية إشارات إلى تحت المهاد، الذي يُفعِّل سلسلة هرمونية عبر الغدة النخامية وصولاً إلى الغدد الكظرية.", bg: "#a85c38" },
  { title: "الغدد الكظرية", en: "ADRENAL GLANDS", text: "تستجيب الغدد الكظرية بإفراز كميات كبيرة من الأدرينالين والكورتيزول في مجرى الدم في حالة نوبات الهلع، وكميات خفيفة في الحالات الأخرى.", bg: "#7a3f20" },
  { title: "استجابة الجسم", en: "BODY RESPONSE", text: "تؤدي هذه الهرمونات إلى رفع حالة التأهب الجسدي استعداداً لمواجهة خطر مفترض.", bg: "#d6936a" },
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
  { title: "العصابية العالية", en: "High Neuroticism", text: "الميل الشديد لتجربة المشاعر السلبية – السمة الأبرز ارتباطاً بالقلق.", color: "#f5e8dc", bar: "#7a3f20" },
  { title: "الكمالية والمثالية", en: "Perfectionism", text: "دافع مهووس للكمال لتجنب الفشل أو الرفض، غالباً 'قلق عالي الأداء'.", color: "#eeddd0", bar: "#a85c38" },
  { title: "الانطوائية والانسحاب", en: "Introversion", text: "الميل للهروب للداخل والانسحاب من التفاعلات الاجتماعية، غالباً مع خجل شديد.", color: "#e8d5c8", bar: "#d6936a" },
  { title: "فرط اليقظة المزمن", en: "Chronic Hypervigilance", text: "شخصية تعيش في حالة رادار دائم، تمسح البيئة وتتوقع الخطر في كل زاوية.", color: "#f5e8dc", bar: "#7a3f20" },
  { title: "التصلب والسيطرة", en: "Rigidity & Control", text: "فرض سيطرة صارمة على كل التفاصيل لتجنب المفاجآت وتقليل التوتر الداخلي.", color: "#eeddd0", bar: "#a85c38" },
  { title: "الاعتمادية", en: "Dependency", text: "الميل للاعتماد المفرط على الآخرين للحصول على الطمأنينة وإدارة المواقف الصعبة.", color: "#e8d5c8", bar: "#d6936a" },
  { title: "السمات الاجتنابية", en: "Avoidant Traits", text: "ميل مرضي لتجنب العزلة. رعب من الانتقاد وانخفاض ملحوظ في الثقة بالنفس.", color: "#f5e8dc", bar: "#7a3f20" },
  { title: "انخفاض التوافقية", en: "Decreased Agreeableness", text: "بسبب الضغط الداخلي والتهيج المستمر، قد تصبح الشخصية أقل مرونة مع الآخرين.", color: "#eeddd0", bar: "#a85c38" },
];

const treatments = [
  { id: 1, icon: "🧩", en: "Cognitive Behavioral Therapy", label: "العلاج السلوكي المعرفي (CBT)", color: "#f5e8dc", details: ["التثقيف النفسي: فهم أن نوبات الهلع والأعراض الجسدية المخيفة ليست خطيرة، بل إنذار كاذب من الدماغ.", "إعادة الهيكلة المعرفية: ملاحظة الأفكار الكارثية وتحديها بالمنطق والأدلة بدل تصديقها تلقائياً.", "العلاج بالتعرض: مواجهة المواقف المخيفة تدريجياً لمنع الهروب والتجنب، حتى يتعلم الدماغ عدم وجود خطر حقيقي.", "الإدارة الجسدية: تمارين التنفس الحجابي والاسترخاء العضلي لخفض الأدرينالين وتهدئة الجهاز العصبي."] },
  { id: 2, icon: "💊", en: "Pharmacotherapy", label: "العلاج الدوائي", color: "#eeddd0", details: ["SSRIs وSNRIs: الخيار الأول لعلاج معظم اضطرابات القلق، تعمل تدريجياً على تنظيم السيروتونين والنورإبينفرين وتهدئة دائرة الخوف.", "البنزوديازيبينات: مهدئات سريعة مثل ألبرازولام لنوبات الهلع الحادة، تُستخدم لفترة قصيرة جداً لتجنب التعود.", "حاصرات بيتا: مثل بروبرانولول للتحكم في الأعراض الجسدية كالخفقان والارتعاش، خاصة في قلق الأداء.", "خيارات أخرى: بوسبيرون لعلاج القلق العام، وهيدروكسيزين للتهدئة المؤقتة، وبريجابالين في بعض الحالات."] },
  { id: 3, icon: "⚡", en: "Combined Treatment", label: "العلاج المدمج", color: "#d6936a", badge: "الأفضل نتائج", details: ["دمج CBT مع الأدوية يعطي أفضل النتائج؛ فالأدوية تُهدّئ الاستجابة الجسدية للخوف، مما يساعد المريض على الاستفادة من العلاج السلوكي وتغيير أفكاره وسلوكياته."] },
  { id: 4, icon: "🌿", en: "Lifestyle & Support", label: "تعديل نمط الحياة والدعم", color: "#eec5a8", details: ["تفريغ التوتر: ممارسة الرياضة بانتظام، تنظيم النوم، وتقليل الكافيين.", "تهدئة العقل: الاسترخاء، اليوغا، التأمل، والتنفس البطيء لتنشيط العصب المبهم وتهدئة الجسم.", "الدعم الاجتماعي: الانضمام لمجموعات دعم، التحدث مع أشخاص داعمين، واستخدام أدوات المساعدة الذاتية."] },
];

export default function AnxietyDetail() {
  const [activeTab, setActiveTab] = useState("الأعراض الجسدية");
  const [expandedType, setExpandedType] = useState(null);
  const [expandedTreatment, setExpandedTreatment] = useState(null);

  return (
    <div style={s.page}>

      {/* Hero */}
      <div style={s.heroSection}>
        <div style={s.breadcrumb}>الاضطرابات النفسية &gt; القلق</div>
        <h1 style={s.heroTitle}>القلق... إنذار بلا حريق</h1>
        <p style={s.heroSub}>
          القلق ليس مبالغة، هو اضطراب يحارب{" "}
          <strong style={{ color: "#7a3f20" }}>359 مليون شخص</strong>{" "}
          حول العالم
        </p>
      </div>

      <hr style={s.divider} />

      {/* التعريف */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>التعريف</div>
        <h2 style={s.sectionTitle}>ما هو <span style={s.sectionTitleHighlight}>القلق</span>؟</h2>
        <div style={s.defGrid}>
          <div style={s.defCard("#f5e8dc")}>
            <div style={s.defCardBar("#d6936a")} />
            <div style={s.defCardTitle}>القلق الطبيعي</div>
            <div style={s.defCardText}>شعور طبيعي عند الجميع، هو نظام إنذار مبكر في الدماغ يحميك من الأخطار المحتملة ليجعلك أكثر تركيزاً ويقظةً لتستطيع التخطيط وتجنب الأخطاء واكتساب الخبرة.</div>
          </div>
          <div style={s.defCard("#eec5a8")}>
            <div style={s.defCardBar("#a85c38")} />
            <div style={s.defCardTitle}>اضطراب القلق</div>
            <div style={s.defCardText}>عطل في هذا النظام، يجعله يرسل إشعارات طوارئ مزيفة باستمرار حتى في أوقات الأمان، مما يسبب ضغطاً كبيراً وتعطلاً في الحياة اليومية.</div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* الأنواع */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>الأنواع</div>
        <h2 style={s.sectionTitle}>أنواع <span style={s.sectionTitleHighlight}>الاضطراب</span> وأشكاله</h2>
        <p style={{ fontSize: "14px", color: "#e0aa88", textAlign: "right", marginBottom: "24px" }}>كل أحد فينا مميز بطريقته، حتى في اضطرابه.</p>
        <div style={s.typesGrid}>
          {types.map((t) => (
            <div key={t.id} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={s.typeCard(typeColors[t.id - 1], expandedType === t.id)}
                onClick={() => setExpandedType(expandedType === t.id ? null : t.id)}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(214,147,106,0.15)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(214,147,106,0.08)"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: typeColors[t.id - 1], borderRadius: "14px 14px 0 0" }} />
                <div style={{ fontSize: "28px", fontWeight: "700", color: typeColors[t.id - 1], opacity: 0.6, flexShrink: 0 }}>{t.id}</div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ ...s.typeLabel, color: typeColors[t.id - 1] }}>{t.label}</div>
                  <div style={s.typeSub}>{t.en}</div>
                </div>
              </div>
              {expandedType === t.id && (
                <div style={{ background: "white", borderRadius: "0 0 14px 14px", padding: "16px 20px", fontSize: "14px", color: "#6b4a38", lineHeight: "1.9", border: `2px solid ${typeColors[t.id - 1]}`, borderTop: "none", textAlign: "right", marginTop: "-4px" }}>
                  {typeDetails[t.id].map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: i < typeDetails[t.id].length - 1 ? "1px solid #faf0ea" : "none" }}>
                      <span style={{ color: "#aaa", flexShrink: 0 }}>—</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: "13px", color: "#e0aa88", textAlign: "center", marginTop: "16px" }}>اضغط على أي بطاقة لعرض التفاصيل</p>
      </div>

      <hr style={s.divider} />

      {/* الأعراض */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>الأعراض</div>
        <h2 style={s.sectionTitle}>كيف يظهر <span style={s.sectionTitleHighlight}>القلق</span> في جسدك؟</h2>
        <div style={s.tabRow}>
          {symptomTabs.map(tab => (
            <button key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <div style={s.symptomsGrid}>
          {(symptomData[activeTab] || []).map((item, i) => (
            <div key={i} style={s.symptomCard(false)}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(214,147,106,0.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(214,147,106,0.1)"; }}
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
        <h2 style={s.sectionTitle}>من أين يأتي <span style={s.sectionTitleHighlight}>القلق</span>؟</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#7a3f20", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>1</div>
            <div style={{ ...s.causeBlock, flex: 1, marginBottom: 0 }}>
              <div style={s.causeTitle}>العوامل الجينية والوراثية</div>
              <div style={s.causeLine}>ينتقل الاستعداد للإصابة بالقلق عبر العائلة.</div>
              <div style={s.causeLine}>تصبح اللوزة الدماغية (مركز الخوف) مفرطة النشاط، بينما تضعف قشرة الفص الجبهي (المنطقة المنطقية) عن كبح هذا الخوف وتهدئته.</div>
              <div style={s.causeLine}>نقص وراثي في النواقل العصبية المهدئة مثل GABA ومشاكل في تنظيم السيروتونين والنورإبينفرين، مما يجعل الدماغ في حالة تأهب دائم.</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#7a3f20", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>2</div>
            <div style={{ ...s.causeBlockHighlight, flex: 1, marginBottom: 0 }}>
              <div style={s.causeTitle}>العوامل البيئية والضغوطات</div>
              <div style={{ fontSize: "14px", color: "#6b4a38", marginBottom: "12px", textAlign: "right" }}>البيئة التي تنشأ فيها والضغوط والصدمات التي تتعرض لها هي المحفز الذي يُشعل الاستعداد الجيني الكامن لديك، مثل:</div>
              <div style={s.tagRow}>
                {["الحماية الأبوية المفرطة", "التربية الاستبدادية القاسية", "اكتساب القلق من مراقبة آباء قلقين", "الإهمال العاطفي المستمر", "التعرض للإيذاء البدني أو النفسي", "إجبار الطفل على تلبية الاحتياجات العاطفية للبالغين", "الإجهاد والضغوط المزمنة", "غياب الرعاية الثابتة والموثوقة من الوالدين"].map((t, i) => (
                  <span key={i} style={s.tag(["#f4e0cc", "#ddc8f4", "#c8d5f4", "#c8f4e0", "#f4c8c8", "#f4f0c8", "#c8f4f0", "#f4c8f0"][i % 8])}>{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#7a3f20", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>3</div>
            <div style={{ ...s.causeBlock, flex: 1, marginBottom: 0 }}>
              <div style={s.causeTitle}>العوامل الجسدية والوراثية</div>
              <div style={s.causeLine}>مشاكل الغدة الدرقية: فرط نشاطها يسبب أعراضاً تحاكي نوبات الهلع تماماً.</div>
              <div style={s.causeLine}>التقلبات الحادة في الهرمونات الجنسية كالإستروجين والبروجستيرون أو التستوستيرون.</div>
              <div style={s.causeLine}>اختلال بكتيريا الأمعاء (الميكروبيوم)؛ قد يسبب التهابات عصبية تعبر إلى الدماغ مما يزيد من مستويات القلق.</div>
              <div style={s.causeLine}>أمراض القلب – الأورام الكظرية – بعض الأدوية والمخدرات – أعراض الانسحاب من المواد المخدرة.</div>
            </div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* آليات التكيف */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>آليات التكيف</div>
        <h2 style={s.sectionTitle}>حين تُخطئ <span style={s.sectionTitleHighlight}>طريقة التعامل</span></h2>
        <p style={{ fontSize: "14px", color: "#e0aa88", textAlign: "right", marginBottom: "24px" }}>هي استجابات سلوكية وعاطفية مختلفة يلجأ إليها الفرد للتهرب من الألم النفسي. رغم أنها قد توفر راحة مؤقتة إلا أنها تزيد من حدة القلق وتفاقمه على المدى الطويل.</p>
        <div style={s.copingGrid}>
          {copingCards.map((c, i) => (
            <div key={i} style={s.copingCard}
              onMouseEnter={e => { e.currentTarget.style.border = "1.5px solid #a85c38"; }}
              onMouseLeave={e => { e.currentTarget.style.border = "1.5px solid #eec5a8"; }}
            >
              <div style={s.copingIcon}>{c.icon}</div>
              <div style={s.copingTitle}>{c.title}</div>
              <div style={s.copingEn}>{c.en}</div>
              <div style={s.copingText}>{c.text}</div>
            </div>
          ))}
          <div style={s.copingCardWide}
            onMouseEnter={e => { e.currentTarget.style.border = "1.5px solid #b0a8d0"; }}
            onMouseLeave={e => { e.currentTarget.style.border = "1.5px solid #e0ddf5"; }}
          >
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
        <h2 style={s.sectionTitle}>القلق يُغيِّر <span style={s.sectionTitleHighlight}>شخصيتك</span></h2>
        <p style={{ fontSize: "14px", color: "#e0aa88", textAlign: "right", marginBottom: "24px" }}>العيش مع قلق مزمن يحدث تغييرات في شخصيتك بمرور الوقت.</p>
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
        <p style={{ fontSize: "14px", color: "#e0aa88", textAlign: "right", marginBottom: "28px" }}>ماذا يحدث بالضبط داخل دماغ شخص يعاني من اضطراب القلق؟</p>
        <div style={s.brainList}>
          {brainSteps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ ...s.brainNum(step.bg), flexShrink: 0, marginTop: "4px" }}>{i + 1}</div>
              <div style={{ ...s.brainCard(false), flex: 1, transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateX(-6px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(214,147,106,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div>
                  <div style={s.brainTitle}>{step.title} · <span style={{ fontSize: "12px", color: "#e0aa88", fontWeight: "400" }}>{step.en}</span></div>
                  <div style={s.brainText}>{step.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ ...s.causeBlock, marginTop: "28px" }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#3b2415", marginBottom: "20px", textAlign: "right" }}>النتيجة: ماذا تشعر في جسدك؟</div>
          <div style={s.resultBox}>
            <div>
              <div style={s.resultColTitle}>في نوبات الهلع</div>
              {["تسارع شديد في ضربات القلب", "ضيق أو تسارع في التنفس", "ألم أو ضغط في الصدر", "تعرق وارتجاف في اليدين والجسم", "دوار أو شعور بعدم التوازن"].map((t, i) => (
                <div key={i} style={s.resultItem}><div style={s.resultDot("#7a3f20")} />{t}</div>
              ))}
            </div>
            <div>
              <div style={{ ...s.resultColTitle, color: "#a85c38" }}>في الاضطرابات الأخرى</div>
              {["توتر في العضلات", "تسارع بسيط في ضربات القلب", "تنفس أسرع قليلاً", "شعور بعدم الارتياح أو الترقب", "صعوبة في التركيز"].map((t, i) => (
                <div key={i} style={s.resultItem}><div style={s.resultDot("#d6936a")} />{t}</div>
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
        <p style={{ fontSize: "14px", color: "#e0aa88", textAlign: "right", marginBottom: "24px" }}>لا يوجد علاج شافٍ – لكن الأعراض قابلة للإدارة بفعالية عالية جداً.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {treatments.map((t) => (
            <div key={t.id}>
              <div
                style={{ background: "white", borderRadius: expandedTreatment === t.id ? "14px 14px 0 0" : "14px", padding: "20px 24px", border: `2px solid ${expandedTreatment === t.id ? t.color : "#eec5a8"}`, cursor: "pointer", transition: "border 0.2s", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                onClick={() => setExpandedTreatment(expandedTreatment === t.id ? null : t.id)}
                onMouseEnter={e => { e.currentTarget.style.border = `2px solid ${t.color}`; }}
                onMouseLeave={e => { if (expandedTreatment !== t.id) e.currentTarget.style.border = "2px solid #eec5a8"; }}
              >
                {/* اليمين: الأيقونة والكلمات */}
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "24px", width: "44px", height: "44px", background: t.color, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>{t.icon}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "11px", color: "#e0aa88", marginBottom: "2px" }}>{t.en}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ fontSize: "17px", fontWeight: "700", color: "#3b3b6b" }}>{t.label}</div>
                      {t.badge && <span style={{ fontSize: "11px", background: "#f5e8dc", color: "#7a3f20", borderRadius: "20px", padding: "2px 10px" }}>✦ {t.badge}</span>}
                    </div>
                  </div>
                </div>
                {/* اليسار: زر */}
                <span style={{ fontSize: "22px", color: "#e0aa88" }}>{expandedTreatment === t.id ? "−" : "+"}</span>
              </div>
              {expandedTreatment === t.id && (
                <div style={{ background: "white", borderRadius: "0 0 14px 14px", padding: "4px 24px 20px", border: `2px solid ${t.color}`, borderTop: "none" }}>
                  {t.details.map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: i < t.details.length - 1 ? "1px solid #faf0ea" : "none", fontSize: "14px", color: "#6b4a38", lineHeight: "1.9", textAlign: "right" }}>
                      <span style={{ color: t.color, flexShrink: 0, fontSize: "16px" }}>•</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: "12px", color: "#bbb", textAlign: "center", marginTop: "28px" }}>
          هذا المحتوى لأغراض تثقيفية فقط. إذا كنت تعاني من أعراض القلق، تحدث مع <strong style={{ color: "#7a3f20" }}>متخصص نفسي</strong>.
        </p>
      </div>

    </div>
  );
}