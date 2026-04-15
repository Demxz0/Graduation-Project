import { useState } from "react";

// ===== لوحة الألوان المتدرجة المبنية على #ddbcd0 =====
// #7a4d68 → #9e728a → #c29ab5 → #ddbcd0 → #eddae8 → #f8f0f5

const s = {
  page: { background: "#f4f4ff", minHeight: "100vh", direction: "rtl", fontFamily: "'Tajawal', sans-serif" },
  breadcrumb: { textAlign: "center", fontSize: "13px", color: "#c29ab5", marginBottom: "12px" },
  heroSection: { display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px 60px", textAlign: "center", background: "linear-gradient(135deg, #fdf7fb 0%, #f5e8f2 100%)" },
  heroTitle: { fontSize: "44.5px", fontWeight: "700", color: "#7a4d68", marginBottom: "16px", textShadow: "2px 2px 12px rgba(122, 77, 104, 0.25)", fontFamily: "'Tajawal', sans-serif" },
  heroSub: { fontSize: "18px", color: "#6b4a60", maxWidth: "550px" },
  sectionWrapper: { maxWidth: "860px", margin: "0 auto", padding: "60px 24px" },
  sectionLabel: { fontSize: "12px", color: "#c29ab5", letterSpacing: "1px", marginBottom: "6px", textAlign: "right" },
  sectionTitle: { fontSize: "28px", fontWeight: "700", color: "#3b2435", marginBottom: "32px", textAlign: "right" },
  sectionTitleHighlight: { color: "#9e728a" },
  divider: { border: "none", borderTop: "1px solid #e8d4e3", margin: "0 auto", maxWidth: "2000px" },
  defGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" },
  defCard: (borderColor) => ({ background: "white", borderRadius: "16px", padding: "24px", border: `2px solid ${borderColor}`, position: "relative", overflow: "hidden" }),
  defCardBar: (color) => ({ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: color, borderRadius: "16px 16px 0 0" }),
  defCardTitle: { fontSize: "18px", fontWeight: "700", color: "#3b2435", marginBottom: "10px" },
  defCardText: { fontSize: "14px", color: "#6b4a60", lineHeight: "1.8" },
  typesGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  typeCard: () => ({
    background: "white", borderRadius: "14px", padding: "24px 24px 20px",
    border: "2px solid white", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s",
    display: "flex", flexDirection: "row", justifyContent: "flex-start",
    alignItems: "center", gap: "16px", position: "relative", overflow: "hidden",
    boxShadow: "0 2px 12px rgba(122,77,104,0.07)",
  }),
  typeNum: (color) => ({ fontSize: "28px", fontWeight: "700", color, opacity: 0.6, flexShrink: 0 }),
  typeLabel: { fontSize: "16px", fontWeight: "700" },
  typeSub: { fontSize: "12px", color: "#c29ab5" },
  tabRow: { display: "flex", gap: "0", marginBottom: "28px", borderBottom: "2px solid #ddbcd0" },
  tab: (active) => ({
    padding: "10px 20px", fontSize: "15px", cursor: "pointer", fontFamily: "'Tajawal', sans-serif",
    color: active ? "#7a4d68" : "#c29ab5", background: "none", border: "none",
    borderBottom: active ? "2px solid #7a4d68" : "2px solid transparent",
    marginBottom: "-2px", transition: "0.2s", fontWeight: active ? "700" : "400",
  }),
  symptomsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  symptomCard: () => ({
    background: "white", borderRadius: "12px", padding: "16px 20px",
    border: "1.5px solid #eddae8", fontSize: "15px", color: "#3b2435",
    display: "flex", alignItems: "center", gap: "10px",
    transition: "transform 0.2s, box-shadow 0.2s",
    boxShadow: "0 4px 12px rgba(122,77,104,0.08)",
  }),
  dot: (color) => ({ width: "8px", height: "8px", borderRadius: "50%", background: color, flexShrink: 0 }),
  causeBlock: { background: "white", borderRadius: "16px", padding: "28px 32px", marginBottom: "16px", border: "1.5px solid #eddae8", position: "relative" },
  causeBlockHighlight: { background: "white", borderRadius: "16px", padding: "28px 32px", marginBottom: "16px", border: "2px solid #9e728a" },
  causeTitle: { fontSize: "17px", fontWeight: "700", color: "#3b2435", marginBottom: "14px", textAlign: "right" },
  causeLine: { fontSize: "14px", color: "#6b4a60", lineHeight: "2", borderBottom: "1px solid #faf2f7", padding: "6px 0", textAlign: "right" },
  tagRow: { display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px", justifyContent: "flex-end" },
  tag: (color) => ({ background: color, borderRadius: "30px", padding: "6px 16px", fontSize: "13px", color: "#3b2435" }),
  copingGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" },
  copingCard: { background: "white", borderRadius: "14px", padding: "20px", border: "1.5px solid #eddae8", transition: "border 0.2s" },
  copingIcon: { fontSize: "22px", marginBottom: "8px" },
  copingTitle: { fontSize: "15px", fontWeight: "700", color: "#3b2435", marginBottom: "4px" },
  copingEn: { fontSize: "11px", color: "#c29ab5", marginBottom: "10px" },
  copingText: { fontSize: "13px", color: "#9e728a", lineHeight: "1.7" },
  copingCardWide: { gridColumn: "span 3", background: "white", borderRadius: "14px", padding: "20px 28px", border: "1.5px solid #eddae8", transition: "border 0.2s" },
  traitsGrid: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "14px" },
  traitCard: (borderColor) => ({ background: "white", borderRadius: "14px", padding: "18px 16px", border: `2px solid ${borderColor}`, position: "relative", overflow: "hidden" }),
  traitBar: (color) => ({ position: "absolute", top: 0, left: 0, right: 0, height: "5px", background: color }),
  traitTitle: { fontSize: "14px", fontWeight: "700", color: "#3b2435", marginBottom: "4px" },
  traitEn: { fontSize: "11px", color: "#c29ab5", marginBottom: "8px" },
  traitText: { fontSize: "12px", color: "#9e728a", lineHeight: "1.6" },
  brainList: { display: "flex", flexDirection: "column", gap: "12px" },
  brainCard: () => ({ background: "white", borderRadius: "14px", padding: "20px 28px", border: "1.5px solid #eddae8", display: "flex", alignItems: "flex-start", gap: "20px" }),
  brainNum: (bg) => ({ minWidth: "40px", height: "40px", borderRadius: "50%", background: bg, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px" }),
  brainTitle: { fontSize: "16px", fontWeight: "700", color: "#3b2435", marginBottom: "4px" },
  brainText: { fontSize: "13px", color: "#6b4a60", lineHeight: "1.7" },
  resultBox: { background: "white", borderRadius: "16px", padding: "28px 36px", border: "1.5px solid #eddae8", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" },
  resultColTitle: { fontSize: "14px", fontWeight: "700", color: "#7a4d68", marginBottom: "14px" },
  resultItem: { fontSize: "14px", color: "#3b2435", lineHeight: "2", display: "flex", alignItems: "center", gap: "8px" },
  resultDot: (c) => ({ width: "6px", height: "6px", borderRadius: "50%", background: c, flexShrink: 0 }),
};

const symptomTabs = ["الأعراض الجسدية", "المعرفية والنفسية", "السلوكية", "نوبات الهلع"];
const symptomData = {
  "الأعراض الجسدية": [
    { text: "تغيرات ملحوظة وغير مبررة في الوزن", color: "#ddbcd0" },
    { text: "الشعور الدائم بالبرد أو الدوار", color: "#ddbcd0" },
    { text: "مشاكل في الهضم أو تساقط الشعر", color: "#c29ab5" },
    { text: "اضطراب في الدورة الشهرية عند الإناث", color: "#c29ab5" },
    { text: "إرهاق مستمر وضعف عام", color: "#9e728a" },
    { text: "شحوب وجفاف الجلد والهشاشة", color: "#9e728a" },
  ],
  "المعرفية والنفسية": [
    { text: "هواجس مستمرة حول الطعام والسعرات", color: "#ddbcd0" },
    { text: "تشوه في صورة الجسم", color: "#ddbcd0" },
    { text: "خوف شديد من زيادة الوزن", color: "#c29ab5" },
    { text: "صعوبة في التركيز والتفكير", color: "#c29ab5" },
    { text: "مشاعر ذنب وخزي بعد الأكل", color: "#9e728a" },
    { text: "اكتئاب وقلق مزمن مصاحب", color: "#9e728a" },
  ],
  "السلوكية": [
    { text: "تجنب الأكل مع الآخرين", color: "#ddbcd0" },
    { text: "طقوس غريبة حول الطعام وترتيبه", color: "#c29ab5" },
    { text: "ممارسة رياضة مفرطة كعقاب", color: "#9e728a" },
    { text: "الأكل السري والاختباء", color: "#ddbcd0" },
    { text: "التحقق المتكرر من الوزن والمرآة", color: "#c29ab5" },
    { text: "ارتداء ملابس فضفاضة لإخفاء الجسم", color: "#9e728a" },
  ],
  "نوبات الهلع": [
    { text: "نوبات أكل مفاجئة غير متحكم بها", color: "#ddbcd0" },
    { text: "شعور بفقدان السيطرة أثناء الأكل", color: "#ddbcd0" },
    { text: "مشاعر ذنب وخزي شديدة بعد النوبة", color: "#c29ab5" },
    { text: "محاولة تعويض النوبة بالتطهير أو الصيام", color: "#c29ab5" },
    { text: "تقلبات مزاجية حادة بعد نوبات الأكل", color: "#9e728a" },
    { text: "انسحاب اجتماعي بعد النوبة", color: "#9e728a" },
  ],
};

const typeColors = ["#7a4d68", "#9e728a", "#c29ab5", "#ddbcd0"];
const types = [
  { id: 1, label: "فقدان الشهية العصبي", en: "Anorexia Nervosa", color: "#7a4d68" },
  { id: 2, label: "النهام العصبي", en: "Bulimia Nervosa", color: "#9e728a" },
  { id: 3, label: "اضطراب نهم الطعام", en: "Binge Eating Disorder", color: "#c29ab5" },
  { id: 4, label: "اضطراب تجنب تناول الطعام", en: "ARFID", color: "#ddbcd0" },
];

const typeDetails = {
  1: [
    "تقييد شديد للطعام ناتج عن خوف مكثف من اكتساب الوزن، حتى عند وصول الشخص لمراحل نحافة خطيرة.",
    "تشوه حاد في صورة الجسم: يرى الشخص نفسه سميناً رغم النحافة الشديدة الواضحة.",
    "يُعد الأعلى معدل وفيات بين جميع الاضطرابات النفسية بسبب سوء التغذية ومضاعفاته القلبية.",
    "كثيراً ما يترافق مع الكمالية المفرطة والقلق الشديد والاكتئاب.",
  ],
  2: [
    "دورة متكررة من نوبات الأكل المفرط (الشراهة) يعقبها سلوك تطهيري كالتقيؤ أو الإفراط في الرياضة.",
    "يشعر الشخص بفقدان السيطرة الكامل خلال نوبة الأكل، تتبعها مشاعر ذنب وخزي عميقة.",
    "الوزن قد يبدو طبيعياً مما يجعل التشخيص أصعب والمعاناة مخفية عن الآخرين.",
    "يتسبب في أضرار جسدية خطيرة كتآكل مينا الأسنان واختلال الأملاح وأمراض القلب.",
  ],
  3: [
    "نوبات أكل مفرط متكررة دون سلوكيات تطهير، مما يؤدي غالباً لزيادة الوزن.",
    "الأكل بسرعة كبيرة حتى الشعور بعدم الارتياح الشديد، غالباً بمفرده بسبب الخجل.",
    "يترافق مع اكتئاب وقلق شديدين وإحساس عميق بفقدان السيطرة.",
    "يختلف عن الشراهة العادية بكونه مرتبطاً بضائقة نفسية واضحة بعد كل نوبة.",
  ],
  4: [
    "تجنب طعام معين بناءً على خصائصه الحسية (اللون، القوام، الرائحة) لا بسبب الخوف من الوزن.",
    "شائع عند الأطفال لكنه يمتد للبالغين، يؤدي لنقص تغذوي خطير ومحدودية اجتماعية.",
    "يختلف جوهرياً عن باقي اضطرابات الأكل لغياب القلق المتعلق بالوزن أو صورة الجسم.",
    "يرتبط ارتباطاً وثيقاً باضطراب التوحد وفرط الحساسية الحسية.",
  ],
};

const brainSteps = [
  { title: "قشرة الفص الجبهي", en: "Prefrontal Cortex", text: "يحدث فيه خلل في التفكير المنطقي، فتسيطر الأفكار القهرية المتعلقة بالوزن والسيطرة على الطعام، وتضعف القدرة على تقييم مخاطر الجوع الشديد.", bg: "#c4607a" },
  { title: "مركز المكافأة", en: "Reward System - Striatum", text: "في حالات النهم يصبح الدماغ فائق الحساسية للمكافأة الفورية، بينما في فقدان الشهية يفقد القدرة على استشعار المتعة من الطعام.", bg: "#a07ecc" },
  { title: "تحت المهاد", en: "Hypothalamus", text: "يحدث اضطراب في حلقة الوصل بين الجسد والدماغ، مما يؤدي لتوقف إشارات الجوع الحقيقية أو الشبع، واختلال هرمونات الجسم مثل الكورتيزول.", bg: "#3b7a9a" },
  { title: "اللوزة الدماغية", en: "Amygdala", text: "تصبح مفرطة النشاط، مما يولد حالة من الذعر أو القلق الشديد عند رؤية طعام \"ممنوع\" أو عند حدوث زيادة بسيطة في الوزن.", bg: "#9a6b3b" },
  { title: "القشرة الجزيرية", en: "Insula", text: "يحدث خلل في معالجة الإشارات الحسية القادمة من الأعضاء الداخلية، مما يفسر سبب تشوه صورة الجسم: حيث يرى المريض نفسه سميناً رغم النحافة الشديدة.", bg: "#4a7a5a" },
  { title: "النواقل العصبية", en: "Serotonin & Dopamine", text: "انخفاض مستويات السيروتونين بسبب قلة الأكل يؤدي لزيادة الوسواس القهري تجاه الأرقام والسعرات، ويدخل الشخص في حلقة مفرغة من الاكتئاب.", bg: "#6b4fa0" },
];

const copingCards = [
  { icon: "⚖️", title: "السيطرة الوهمية", en: "Illusion of Control", text: "التركيز المفرط على السعرات والميزان لتعويض الشعور بفقدان السيطرة في جوانب الحياة الأخرى." },
  { icon: "😶", title: "التخدير العاطفي", en: "Emotional Numbing", text: "استخدام نهم الطعام كوسيلة لتخدير المشاعر الصعبة مثل الحزن، الوحدة، أو القلق المفاجئ." },
  { icon: "🥊", title: "العقاب الذاتي", en: "Self-Punishment", text: "اللجوء للرياضة القاسية أو الحرمان الشديد من الأكل كوسيلة لتفريغ الشعور بالذنب أو كره الذات." },
  { icon: "🙅", title: "تجنب المواجهة", en: "Social Avoidance", text: "الانسحاب من التجمعات الاجتماعية هربًا من التوتر المرتبط برؤية الناس أو الخوف من حكمهم." },
  { icon: "🍽️", title: "الهروب عبر الطقوس", en: "Ritualized Behavior", text: "قضاء وقت طويل في تقطيع الطعام أو ترتيبه كآلية لإشغال العقل وتأخير القلق المرتبط بالأكل." },
  { icon: "🌀", title: "الانفصال عن الواقع", en: "Dissociation", text: "استغلال نوبات النهم للوصول لحالة الخدر الذهني، حيث يتفصل الشخص مؤقتاً عن مشاعره." },
];

const traitCards = [
  { title: "المثالية والكمال", en: "Perfectionism", text: "دافع مهووس للوصول إلى الوزن المثالي أو الالتزام بنظام غذائي صارم دون أي خطأ.", color: "#f0e2eb", bar: "#7a4d68" },
  { title: "الحساسية للنقد", en: "Sensitivity to Criticism", text: "الشعور الشديد بالألم أو الغضب من أي تعليق يخص المظهر أو كمية الأكل.", color: "#e8d4e0", bar: "#9e728a" },
  { title: "انخفاض التوافقية", en: "Low Agreeableness", text: "بسبب الجوع المستمر قد تصبح الشخصية أكثر حدة وأقل مرونة مع الآخرين.", color: "#e0cad8", bar: "#c29ab5" },
  { title: "فرط اليقظة للجسم", en: "Body Hypervigilance", text: "شخصية تعيش في حالة فحص دائم للمرآة، وقياس الوزن المتكرر، وتتبع كل تغير بسيط.", color: "#ddbcd0", bar: "#7a4d68" },
  { title: "هيمنة القلق", en: "Anxiety Dominance", text: "سيطرة القلق المستمر حول الطعام والجسم على التفكير اليومي واتخاذ القرارات.", color: "#eddae8", bar: "#9e728a" },
  { title: "عدم الاستقرار العاطفي", en: "Emotional Instability", text: "تقلبات مزاجية حادة بسبب تأثير الجوع أو الإفراط في التفكير بالطعام وصورة الجسم.", color: "#f5eef3", bar: "#c29ab5" },
  { title: "فقدان الهوية", en: "Loss of Identity", text: "تلاشي الاهتمامات الشخصية تدريجًا وتحول التفكير بالكامل حول الوزن والطعام.", color: "#e8d4e0", bar: "#7a4d68" },
  { title: "الاعتمادية العاطفية", en: "Emotional Dependency", text: "البحث المستمر عن تأكيد الآخرين حول المظهر والجسم لتعزيز الشعور بالقيمة الذاتية.", color: "#ddbcd0", bar: "#9e728a" },
];

const treatments = [
  {
    id: 1, icon: "🧩", en: "Cognitive Behavioral Therapy", label: "العلاج السلوكي المعرفي (CBT)", color: "#eddae8",
    details: [
      "يُعد من أكثر الأساليب فعالية لعلاج اضطرابات الأكل، حيث يركز على تعديل الأفكار والسلوكيات المرتبطة بالطعام والجسم.",
      "التعرف على الأفكار السلبية حول الوزن والشكل وتحديها بالمنطق والأدلة الواقعية.",
      "كسر دائرة الأكل العاطفي أو التقييد الشديد من خلال التعرض التدريجي المنظم.",
      "بناء علاقة صحية مع الطعام بعيداً عن الشعور بالذنب أو مفهوم الطعام المحرم والحلال.",
      "تعلم مهارات التحكم بالمشاعر بدل استخدام الأكل كوسيلة للهروب أو العقاب.",
    ],
  },
  {
    id: 2, icon: "💊", en: "Pharmacotherapy", label: "العلاج الدوائي", color: "#e0cad8",
    details: [
      "يُستخدم في بعض الحالات لدعم العلاج النفسي، خاصة إذا كان هناك اضطرابات مرافقة كالاكتئاب أو القلق الشديد.",
      "مضادات الاكتئاب (SSRIs) للمساعدة في تقليل نوبات الشره أو تخفيف القلق المرتبط بالطعام.",
      "تنظيم الحالة المزاجية وتقليل التوتر المرتبط بالأكل والوزن.",
      "يُستخدم دائماً تحت إشراف طبي دقيق فقط حسب الحالة — لا يُستخدم منفرداً.",
    ],
  },
  {
    id: 3, icon: "✨", en: "Integrated Treatment", label: "العلاج المتكامل", color: "#ddbcd0", badge: "الأفضل نتائج",
    details: [
      "يجمع بين أكثر من أسلوب لتحقيق أفضل نتيجة — الجمع بين النفسي والغذائي والدوائي هو المعيار الذهبي.",
      "جلسات نفسية منتظمة + دعم غذائي متخصص من أخصائي تغذية يفهم اضطرابات الأكل.",
      "متابعة مع أخصائي تغذية لتنظيم الوجبات وإعادة بناء علاقة صحية مع الطعام.",
      "إشراك العائلة في العلاج (خصوصاً للحالات الأصغر سناً) لبناء بيئة داعمة وآمنة.",
      "مراقبة السلوكيات والعادات اليومية بالتعاون مع الفريق المعالج.",
    ],
  },
  {
    id: 4, icon: "🌿", en: "Lifestyle & Support", label: "تعديل نمط الحياة والدعم", color: "#eddae8",
    details: [
      "إنشاء روتين غذائي منتظم ومتوازن — تناول وجبات في أوقات ثابتة يُعيد تنظيم إشارات الجوع والشبع.",
      "ممارسة نشاط بدني معتدل بدون إفراط — التمارين يجب أن تكون للصحة لا للعقاب.",
      "تقليل التعرض للمحتوى الذي يعزز صورة جسد غير واقعية على وسائل التواصل الاجتماعي.",
      "طلب الدعم من الأصدقاء أو مجموعات الدعم المتخصصة في اضطرابات الأكل.",
    ],
  },
];

export default function EatingDisorderDetail() {
  const [activeTab, setActiveTab] = useState("الأعراض الجسدية");
  const [expandedType, setExpandedType] = useState(null);
  const [expandedTreatment, setExpandedTreatment] = useState(null);

  return (
    <div style={s.page}>

      {/* Hero */}
      <div style={s.heroSection}>
        <div style={s.breadcrumb}>الاضطرابات النفسية &gt; اضطرابات الأكل</div>
        <h1 style={s.heroTitle}>اضطرابات الأكل... صراع مع الطعام والجسد</h1>
        <p style={s.heroSub}>
          ليست ضعفًا، بل اضطراب يؤثر على{" "}
          <strong style={{ color: "#7a4d68" }}>ملايين الأشخاص حول العالم</strong>
        </p>
      </div>

      <hr style={s.divider} />

      {/* التعريف */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>التعريف</div>
        <h2 style={s.sectionTitle}>ما هي <span style={s.sectionTitleHighlight}>اضطرابات الأكل</span>؟</h2>
        <div style={s.defGrid}>
          <div style={s.defCard("#eddae8")}>
            <div style={s.defCardBar("#9e728a")} />
            <div style={s.defCardTitle}>اضطراب الأكل</div>
            <div style={s.defCardText}>خلل في السلوك الغذائي ناتج عن ضغوط نفسية، يتميز بهوس شديد بشكل الجسم، الوزن، السيطرة على الطعام، مما يعطل الحياة اليومية والصحة الجسدية.</div>
          </div>
          <div style={s.defCard("#e0d0e8")}>
            <div style={s.defCardBar("#c29ab5")} />
            <div style={s.defCardTitle}>الأكل الطبيعي</div>
            <div style={s.defCardText}>سلوك مرن يستجيب لجوع الجسم وشبعه، حيث يُستخدم الطعام للغذاء والمتعة دون أن يسيطر على التفكير أو يسبب مشاعر ذنب دائمة.</div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* الأنواع */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>الأنواع</div>
        <h2 style={s.sectionTitle}>أنواع <span style={s.sectionTitleHighlight}>الاضطراب</span> وأشكاله</h2>
        <p style={{ fontSize: "14px", color: "#c29ab5", textAlign: "right", marginBottom: "24px" }}>كل أحد فينا مميز بطريقته، حتى في اضطرابه.</p>
        <div style={s.typesGrid}>
          {types.map((t) => (
            <div key={t.id} style={{ display: "flex", flexDirection: "column" }}>
              <div
                style={s.typeCard()}
                onClick={() => setExpandedType(expandedType === t.id ? null : t.id)}
                onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.03)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(122,77,104,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(122,77,104,0.07)"; }}
              >
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: t.color, borderRadius: "14px 14px 0 0" }} />
                <div style={s.typeNum(t.color)}>{t.id}</div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ ...s.typeLabel, color: t.color }}>{t.label}</div>
                  <div style={s.typeSub}>{t.en}</div>
                </div>
              </div>
              {expandedType === t.id && (
                <div style={{ background: "white", borderRadius: "0 0 14px 14px", padding: "16px 20px", fontSize: "14px", color: "#6b4a60", lineHeight: "1.9", border: `2px solid ${t.color}`, borderTop: "none", textAlign: "right", marginTop: "-4px" }}>
                  {typeDetails[t.id].map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: i < typeDetails[t.id].length - 1 ? "1px solid #faf2f7" : "none" }}>
                      <span style={{ color: "#aaa", flexShrink: 0 }}>—</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: "13px", color: "#c29ab5", textAlign: "center", marginTop: "16px" }}>اضغط على أي بطاقة لعرض التفاصيل</p>
      </div>

      <hr style={s.divider} />

      {/* الأعراض */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>الأعراض</div>
        <h2 style={s.sectionTitle}>كيف يظهر <span style={s.sectionTitleHighlight}>اضطراب الأكل</span> في جسدك؟</h2>
        <div style={s.tabRow}>
          {symptomTabs.map(tab => (
            <button key={tab} style={s.tab(activeTab === tab)} onClick={() => setActiveTab(tab)}>{tab}</button>
          ))}
        </div>
        <div style={s.symptomsGrid}>
          {(symptomData[activeTab] || []).map((item, i) => (
            <div key={i} style={s.symptomCard()}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(122,77,104,0.18)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(122,77,104,0.08)"; }}
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
        <h2 style={s.sectionTitle}>من أين يأتي <span style={s.sectionTitleHighlight}>اضطراب الأكل</span>؟</h2>
        <p style={{ fontSize: "14px", color: "#c29ab5", textAlign: "right", marginBottom: "24px" }}>هناك 3 مسببات رئيسية لاضطرابات الأكل – وهي تتفاعل مع بعضها لتحدد شدة الاضطراب وطريقة ظهوره.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#7a4d68", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>1</div>
            <div style={{ ...s.causeBlock, flex: 1, marginBottom: 0 }}>
              <div style={s.causeTitle}>العوامل الجينية والوراثية</div>
              <div style={s.causeLine}>استعداد وراثي لزيادة القلق أو الكمالية.</div>
              <div style={s.causeLine}>حساسية أعلى في النواقل العصبية المرتبطة بالمكافأة مثل السيروتونين والدوبامين.</div>
              <div style={s.causeLine}>اختلافات وراثية تؤثر على تنظيم الشهية والشبع في الدماغ.</div>
              <div style={s.causeLine}>وجود تاريخ عائلي لاضطرابات الأكل أو اضطرابات نفسية مثل القلق والاكتئاب.</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#7a4d68", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>2</div>
            <div style={{ ...s.causeBlockHighlight, flex: 1, marginBottom: 0 }}>
              <div style={s.causeTitle}>العوامل النفسية والشخصية</div>
              <div style={{ fontSize: "14px", color: "#6b4a60", marginBottom: "12px", textAlign: "right" }}>السمات الشخصية والأنماط النفسية التي تجعل الفرد أكثر عرضة للإصابة:</div>
              <div style={s.tagRow}>
                {["المثالية المفرطة", "انخفاض تقدير الذات", "السيطرة الوهمية", "العقاب الذاتي", "العزلة الاجتماعية", "الخوف من الرفض", "صعوبة التعبير العاطفي", "الكمالية في الأداء"].map((tag, i) => (
                  <span key={i} style={s.tag(["#f4e0cc", "#ddc8f4", "#c8d5f4", "#c8f4e0", "#f4c8c8", "#f4f0c8", "#c8f4f0", "#f4c8f0"][i % 8])}>{tag}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
            <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#7a4d68", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "700", fontSize: "16px", flexShrink: 0, marginTop: "4px" }}>3</div>
            <div style={{ ...s.causeBlock, flex: 1, marginBottom: 0 }}>
              <div style={s.causeTitle}>العوامل البيئية والمجتمعية</div>
              <div style={s.causeLine}>ثقافة النحافة: الضغوط المجتمعية ووسائل التواصل التي تروج لمعايير جمالية غير واقعية.</div>
              <div style={s.causeLine}>التربية والبيئة الأسرية: التركيز المفرط على الوزن أو المظهر داخل المنزل، أو النقد المستمر للجسم.</div>
              <div style={s.causeLine}>الصدمات النفسية: التعرض للتنمر، أو سوء المعاملة، أو فقدان السيطرة في جوانب أخرى من الحياة.</div>
              <div style={s.causeLine}>ضعف الدعم الاجتماعي: التوتر المستمر والسعي للكمال قد يزيد من خطر الإصابة.</div>
            </div>
          </div>

        </div>
      </div>

      <hr style={s.divider} />

      {/* آليات التكيف */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>آليات التكيف</div>
        <h2 style={s.sectionTitle}>حين تُخطئ <span style={s.sectionTitleHighlight}>طريقة التعامل</span></h2>
        <p style={{ fontSize: "14px", color: "#c29ab5", textAlign: "right", marginBottom: "24px" }}>هي استجابات سلوكية وعاطفية مختلة يلجأ إليها الفرد. رغم أنها قد توفر راحة مؤقتة إلا أنها تزيد من تأثير الاضطراب وتُفاقم عواقبه على المدى الطويل.</p>
        <div style={s.copingGrid}>
          {copingCards.map((c, i) => (
            <div key={i} style={s.copingCard}
              onMouseEnter={e => { e.currentTarget.style.border = "1.5px solid #9e728a"; }}
              onMouseLeave={e => { e.currentTarget.style.border = "1.5px solid #eddae8"; }}
            >
              <div style={s.copingIcon}>{c.icon}</div>
              <div style={s.copingTitle}>{c.title}</div>
              <div style={s.copingEn}>{c.en}</div>
              <div style={s.copingText}>{c.text}</div>
            </div>
          ))}
          <div style={s.copingCardWide}
            onMouseEnter={e => { e.currentTarget.style.border = "1.5px solid #f0a0c0"; }}
            onMouseLeave={e => { e.currentTarget.style.border = "1.5px solid #e0ddf5"; }}
          >
            <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
              <div style={{ fontSize: "22px" }}>🧹</div>
              <div>
                <div style={s.copingTitle}>التطهير العاطفي</div>
                <div style={s.copingEn}>Emotional Purging</div>
                <div style={s.copingText}>الاعتقاد بأن السلوكيات التعويضية هي وسيلة "لتنظيف" النفس من المشاعر السيئة والخطايا المتخيلة، مما يديم حلقة الاضطراب ويعمقها.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr style={s.divider} />

      {/* السمات الشخصية */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>السمات الشخصية</div>
        <h2 style={s.sectionTitle}>اضطرابات الأكل <span style={s.sectionTitleHighlight}>يُغيِّر</span> شخصيتك</h2>
        <p style={{ fontSize: "14px", color: "#c29ab5", textAlign: "right", marginBottom: "24px" }}>المعاناة مع اضطرابات الأكل ليست مجرد سلوك، بل تنعكس على سماتك وتعاملك اليومي.</p>
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
        <p style={{ fontSize: "14px", color: "#c29ab5", textAlign: "right", marginBottom: "28px" }}>ماذا يحدث بالضبط داخل دماغ شخص يعاني من اضطرابات الأكل؟</p>
        <div style={s.brainList}>
          {brainSteps.map((step, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
              <div style={{ ...s.brainNum(step.bg), flexShrink: 0, marginTop: "4px" }}>{i + 1}</div>
              <div style={{ ...s.brainCard(), flex: 1, transition: "transform 0.2s, box-shadow 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateX(-6px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(122,77,104,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateX(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div>
                  <div style={s.brainTitle}>{step.title} · <span style={{ fontSize: "12px", color: "#c29ab5", fontWeight: "400" }}>{step.en}</span></div>
                  <div style={s.brainText}>{step.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ ...s.causeBlock, marginTop: "28px" }}>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#3b2435", marginBottom: "20px", textAlign: "right" }}>النتيجة: ماذا تشعر في جسدك؟</div>
          <div style={s.resultBox}>
            <div>
              <div style={s.resultColTitle}>في حالات سوء التغذية (فقدان الشهية)</div>
              {["بطء شديد في ضربات القلب.", "شعور دائم بالبرودة حتى في الصيف.", "خمول وإرهاق ذهني مستمر.", "هشاشة في العظام وجفاف الجلد."].map((t, i) => (
                <div key={i} style={s.resultItem}><div style={s.resultDot("#7a4d68")} />{t}</div>
              ))}
            </div>
            <div>
              <div style={{ ...s.resultColTitle, color: "#9e728a" }}>في حالات النهم (البوليميا)</div>
              {["عدم توازن الأملاح في الدم (مما يهدد القلب).", "انتفاخ في الغدد اللعابية (حول الفك).", "تآكل مينا الأسنان بسبب أحماض المعدة.", "تغيرات حادة في سكر الدم."].map((t, i) => (
                <div key={i} style={s.resultItem}><div style={s.resultDot("#c29ab5")} />{t}</div>
              ))}
            </div>
          </div>
        </div>

        <p style={{ fontSize: "12px", color: "#c29ab5", textAlign: "center", marginTop: "28px" }}>
          هذا المحتوى لأغراض تثقيفية فقط. إذا كنت تعاني من أعراض اضطرابات الأكل، تحدث مع <strong style={{ color: "#7a4d68" }}>متخصص نفسي</strong>.
        </p>
      </div>

      <hr style={s.divider} />

      {/* العلاج */}
      <div style={s.sectionWrapper}>
        <div style={s.sectionLabel}>العلاج</div>
        <h2 style={s.sectionTitle}>طريقك نحو <span style={s.sectionTitleHighlight}>التعافي</span></h2>
        <p style={{ fontSize: "14px", color: "#c29ab5", textAlign: "right", marginBottom: "24px" }}>لا يوجد علاج شافٍ بالكامل — لكن الأعراض قابلة للإدارة بفعالية عالية مع الدعم الصحيح.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {treatments.map((t) => (
            <div key={t.id}>
              <div
                style={{ background: "white", borderRadius: expandedTreatment === t.id ? "14px 14px 0 0" : "14px", padding: "20px 24px", border: `2px solid ${expandedTreatment === t.id ? t.color : "#eddae8"}`, cursor: "pointer", transition: "border 0.2s", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                onClick={() => setExpandedTreatment(expandedTreatment === t.id ? null : t.id)}
                onMouseEnter={e => { e.currentTarget.style.border = `2px solid ${t.color}`; }}
                onMouseLeave={e => { if (expandedTreatment !== t.id) e.currentTarget.style.border = "2px solid #eddae8"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <span style={{ fontSize: "24px", width: "44px", height: "44px", background: t.color, borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>{t.icon}</span>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "11px", color: "#c29ab5", marginBottom: "2px" }}>{t.en}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{ fontSize: "17px", fontWeight: "700", color: "#3b2435" }}>{t.label}</div>
                      {t.badge && <span style={{ fontSize: "11px", background: "#f8f0f5", color: "#7a4d68", borderRadius: "20px", padding: "2px 10px" }}>✦ {t.badge}</span>}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: "22px", color: "#c29ab5" }}>{expandedTreatment === t.id ? "−" : "+"}</span>
              </div>
              {expandedTreatment === t.id && (
                <div style={{ background: "white", borderRadius: "0 0 14px 14px", padding: "4px 24px 20px", border: `2px solid ${t.color}`, borderTop: "none" }}>
                  {t.details.map((line, i) => (
                    <div key={i} style={{ display: "flex", gap: "10px", padding: "10px 0", borderBottom: i < t.details.length - 1 ? "1px solid #faf2f7" : "none", fontSize: "14px", color: "#6b4a60", lineHeight: "1.9", textAlign: "right" }}>
                      <span style={{ color: "#9e728a", flexShrink: 0, fontSize: "16px" }}>•</span>
                      <span>{line}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        <p style={{ fontSize: "12px", color: "#c29ab5", textAlign: "center", marginTop: "28px" }}>
          هذا المحتوى لأغراض تثقيفية فقط. إذا كنت تعاني من أعراض اضطرابات الأكل، تحدث مع <strong style={{ color: "#7a4d68" }}>متخصص نفسي</strong>.
        </p>
      </div>

    </div>
  );
}
