import { useEffect, useRef, useState } from 'react';

// ===== Hook للـ Scroll Reveal =====
function useReveal(delay = 0) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          observer.unobserve(el);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return [ref, visible];
}

function RevealCard({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal(delay);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0) scale(1)' : 'translateY(32px) scale(0.97)',
      transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
      ...style,
    }}>
      {children}
    </div>
  );
}

// ===== البيانات =====
const brainStructures = [
  {
    title: 'الدماغ الأمامي والمخ', titleEn: 'Forebrain & Cerebrum',
    desc: 'الجزء الأكبر والأكثر تطوراً. المسؤول عن الوظائف العليا. ويتكون من نصفي كرة مخيين يرتبطان بحزمة كثيفة من الألياف العصبية تُعرف باسم الجسم الثفني،',
    color: '#9b7fc7', bg: '#f5f0ff', icon: '🧠',
  },
  {
    title: 'الدماغ المتوسط', titleEn: 'Midbrain',
    desc: 'يُعد جزءاً من جذع الدماغ، ويساهم في تنظيم بعض الوظائف الحسية والحركية، خاصة المرتبطة بحركات العين والاستجابات السمعية والبصرية.',
    color: '#6e91a7', bg: '#f0f7ff', icon: '⚡',
  },
  {
    title: 'الدماغ الخلفي', titleEn: 'Hindbrain',
    desc: 'يعمل على تنظيم الوظائف الحيوية الأساسية اللازمة للحياة. ويشمل المخيخ، المسؤول عن تنسيق الحركة والتوازن والانتباه والتعلم، إضافة إلى جذع الدماغ الذي يتحكم في العمليات اللاإرادية مثل التنفس ومعدل ضربات القلب.',
    color: '#b47799', bg: '#fff0f7', icon: '💓',
  },
];

const lobes = [
  {
    num: 1, title: 'الفص الجبهي', titleEn: 'Frontal Lobe',
    desc: 'يقع خلف الجبهة مباشرة، وهو الأخير والأكثر تعقيداً. يتحكم في التفكير المعقد وتنظيم العواطف والسلوك الاجتماعي. يمثل كموقع تخزين قصير المدى للأفكار مما يسمح للفرد بموازنة الخيارات قبل التصرف.',
    color: '#9b7fc7', bg: '#f8f4ff',
  },
  {
    num: 2, title: 'الفص الجداري', titleEn: 'Parietal Lobe',
    desc: 'يقع في الجزء العلوي والخلفي من الدماغ، ويختص بدمج المعلومات الحسية القادمة من أجزاء الجسم المختلفة. ويساهم في فهم اللغة، ومعالجة الحواس، وإدراك العلاقات المكانية.',
    color: '#d6936a', bg: '#fff8f0',
  },
  {
    num: 3, title: 'الفص الصدغي', titleEn: 'Temporal Lobe',
    desc: 'يقع على جانبي الدماغ بالقرب من الأذنين، ويرتبط بوظائف السمع وفهم الأصوات واللغة. كما يؤدي دوراً أساسياً في تكوين الذكريات واسترجاعها، وربطها بالعواطف والتجارب الحسية.',
    color: '#6e91a7', bg: '#f0f7fb',
  },
  {
    num: 4, title: 'الفص القذالي', titleEn: 'Occipital Lobe',
    desc: 'يقع في آخر الدماغ. المسؤول الأول عن المعالجة البصرية بما في ذلك التعرف على الوجوه والأشياء وربطها بالصور المخزنة في الذاكرة.',
    color: '#4aab72', bg: '#f0fff8',
  },
];

const limbicSystem = [
  {
    title: 'اللوزة الدماغية', titleEn: 'Amygdala',
    badge: 'مركز الخوف', badgeColor: '#d6936a',
    desc: 'تقع داخل الفص الصدغي . و هي مركز الخوف والعدوان في الدماغ , تعمل كنظام إنذار مبكر، حيث تقوم بتقييم التهديدات في البيئة وتنشيط استجابة لهذا التهديد.\nفي الدماغ السليم، تكون اللوزة تحت سيطرة القشرة الجبهية التي تقوم بتهدئتها عبر التحليل المنطقي للمواقف.\nأما في اضطرابات القلق، يلاحظ وجود نشاط مفرط في اللوزة يجعلها تطلق إنذارات كاذبة أو مبالغاً فيها.',
    color: '#d6936a', icon: '⚠️',
  },
  {
    title: 'الحصين', titleEn: 'Hippocampus',
    badge: 'مركز الذاكرة', badgeColor: '#6e91a7',
    desc: 'هو الهيكل المسؤول عن التعلم وتكوين ذكريات طويلة الأمد.\nيتميز الحصين بكونه واحداً من أكثر المناطق حساسية في الدماغ تجاه هرمونات الإجهاد مثل الكورتيزول.\nو أثبتت الدراسات أن التعرض المزمن للتوتر يؤدي إلى انكماش الحصين وتراجع نمو الخلايا العصبية فيه، وهو ما يفسر مشاكل الذاكرة والتركيز المرتبطة بالاكتئاب واضطراب ما بعد الصدمة.',
    color: '#6e91a7', icon: '💾',
  },
  {
    title: 'المهاد', titleEn: 'Thalamus',
    badge: 'بوابة الحواس', badgeColor: '#9b7fc7',
    desc: 'يستقبل المعلومات من الحواس ويعيد إرسالها إلى المخ للمعالجة. بوابة للمعلومات الحسية.',
    color: '#9b7fc7', icon: '🔀',
  },
  {
    title: 'تحت المهاد', titleEn: 'Hypothalamus',
    badge: 'المتحكم في المشاعر', badgeColor: '#4aab72',
    desc: 'بحجم حبة اللؤلؤ ولكنه يمتلك تأثيراً هائلاً؛ فهو يتحكم في الكيماويات التي تجعل الشخص يشعر بالبهجة، الغضب، أو التعاسة، كما يدير الاستجابة البدنية للتوتر مثل تسارع ضربات القلب عند القلق.',
    color: '#4aab72', icon: '🎛️',
  },
];

const neurotransmitters = [
  {
    title: 'سيروتونين', titleEn: 'Serotonin', color: '#9b7fc7', bg: '#f5f0ff',
    points: ['ينظم المزاج والنوم والشهية', 'انخفاض مستوياته مرتبط بالاكتئاب', 'هو أساس عمل كثير من الأدوية النفسية'],
   
  },
  {
    title: 'دوبامين', titleEn: 'Dopamine', color: '#d6936a', bg: '#fff8f0',
    points: ['يرتبط بالمتعة والتحفيز', 'يلعب دورًا محوريًا في الفصام واضطرابات المزاج'],
  },
  {
    title: 'GABA', titleEn: 'Gamma-Aminobutyric Acid', color: '#6e91a7', bg: '#f0f7fb',
    points: ['الناقل المثبط الرئيسي', 'يهدّئ النشاط العصبي المفرط', 'نقصه مرتبط بحالات القلق'],
  },
  {
    title: 'غلوتامات', titleEn: 'Glutamate', color: '#4aab72', bg: '#f0fff8',
    points: ['الناقل المنبه الرئيسي', 'ضروري للتعلم', 'زيادته المفرطة قد تكون سامة للخلايا'],
  },
];

const recoveryMethods = [
  {
    title: 'العلاج المعرفي السلوكي (CBT)', icon: '💬', iconBg: '#f0e8ff',
    desc: 'أظهرت دراسة حديثة أجراها باحثون في المعاهد الوطنية للصحة أن الأطفال المصابين بالقلق أظهروا فرط نشاط واسع في مناطق عديدة من الدماغ قبل العلاج.\nبعد 12 أسبوعاً من العلاج المعرفي السلوكي، لوحظ انخفاض ملموس في هذا النشاط الزائد، مما يعكس تحسناً في كفاءة شبكات التحكم المعرفي.\nالعلاج النفسي "يدرب" القشرة الجبهية على تولي القيادة مرة أخرى وتقليل سيطرة مراكز الخوف.',
    color: '#9b7fc7',
  },
  {
    title: 'الآلية العصبية للأدوية', icon: '💊', iconBg: '#fff0e8',
    desc: 'تعمل الأدوية النفسية (مثل مضادات الاكتئاب) ليس فقط عبر موازنة النواقل العصبية بشكل فوري، بل عبر تحفيز اللدونة العصبية على المدى الطويل. فهي تزيد من إفراز عوامل النمو العصبي التي تساعد الخلايا العصبية على إصلاح نفسها وتكوين روابط جديدة، و هذا هو السبب في استغراق هذه الأدوية عدة أسابيع لتبدأ في إظهار مفعولها الحقيقي.',
    color: '#d6936a',
  },
  {
    title: 'نمط الحياة كتدخل حيوي', icon: '🌱', iconBg: '#f0fff8',
    desc: 'تشير توصيات WHO وSAMHSA إلى أن ممارسات بسيطة لها أسس عصبية قوية في تحسين الصحة النفسية :',
    color: '#4aab72',
    subItems: [
      { icon: '🏃', title: 'التمارين الرياضية', desc: 'تزيد من تدفق الدم للدماغ وتحفز إفراز الكيميائيات التي تحسن المزاج وتقلل الالتهاب.' },
      { icon: '🌙', title: 'النوم المنتظم', desc: 'ضروري لتنظيف الدماغ من السموم وترسيخ الذاكرة. قلة النوم تضعف التواصل بين القشرة الجبهية واللوزة مما يزيد القلق.' },
      { icon: '🥗', title: 'التغذية السليمة', desc: 'توفر اللبنات الأساسية للنواقل العصبية وتحمي الدماغ من الإجهاد التأكسدي.' },
    ],
  },
];

// ===== تعريف التبويبات =====
const tabs = [
  { id: 0, label: 'البنية التشريحية', icon: '🧬', color: '#9b7fc7' },
  { id: 1, label: 'الفصوص الدماغية', icon: '🔬', color: '#d6936a' },
  { id: 2, label: 'الجهاز الحوفي', icon: '💜', color: '#c97099' },
  { id: 3, label: 'النواقل العصبية', icon: '⚗️', color: '#6e91a7' },
  { id: 4, label: 'التعافي', icon: '🌱', color: '#4aab72' },
];

// ===== مكون بطاقة التشبيه =====
function AnalogyCard({ emoji, title, text, color }) {
  const [ref, visible] = useReveal(100);
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(24px)',
      transition: 'all 0.6s cubic-bezier(0.22,1,0.36,1)',
      marginTop: '20px',
    }}>
      <div style={{
        background: `linear-gradient(135deg, ${color}14, ${color}08)`,
        border: `2px dashed ${color}55`,
        borderRadius: '18px',
        padding: '18px 22px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '14px',
        direction: 'rtl',
      }}>
        <div style={{
          fontSize: '32px', flexShrink: 0,
          filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))',
        }}>{emoji}</div>
        <div>
          <div style={{
            display: 'inline-block',
            background: color,
            color: 'white',
            fontSize: '11px',
            fontWeight: '800',
            padding: '2px 10px',
            borderRadius: '50px',
            marginBottom: '7px',
            letterSpacing: '0.5px',
          }}>
            تشبيه حياتي 💡
          </div>
          <div style={{ fontWeight: '800', fontSize: '15px', color: '#3a2555', marginBottom: '5px' }}>
            {title}
          </div>
          <p style={{ fontSize: '14px', color: '#6a5a88', lineHeight: '1.85', margin: 0 }}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}

// ===== مكون Quiz سريع =====
function QuickQuiz({ question, options, correctIndex, color }) {
  const [selected, setSelected] = useState(null);
  const [answered, setAnswered] = useState(false);

  const handleSelect = (i) => {
    if (answered) return;
    setSelected(i);
    setAnswered(true);
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #2d1f4a, #3a2860)',
      borderRadius: '20px',
      padding: '24px 28px',
      marginTop: '32px',
      direction: 'rtl',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
        <span style={{ fontSize: '20px' }}>🎯</span>
        <span style={{ color: 'white', fontWeight: '800', fontSize: '16px' }}>اختبر نفسك</span>
      </div>
      <p style={{ color: 'rgba(255,255,255,0.88)', fontSize: '15px', lineHeight: '1.7', marginBottom: '16px' }}>
        {question}
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {options.map((opt, i) => {
          let bg = 'rgba(255,255,255,0.08)';
          let border = '1px solid rgba(255,255,255,0.15)';
          let textColor = 'rgba(255,255,255,0.8)';
          if (answered && i === correctIndex) { bg = '#4aab7222'; border = '1px solid #4aab72'; textColor = '#7dd4a0'; }
          if (answered && i === selected && i !== correctIndex) { bg = '#c9606022'; border = '1px solid #c96060'; textColor = '#e89090'; }
          return (
            <button key={i} onClick={() => handleSelect(i)} style={{
              background: bg, border, borderRadius: '12px',
              padding: '11px 16px', color: textColor,
              fontSize: '14px', fontFamily: "'Tajawal', sans-serif",
              cursor: answered ? 'default' : 'pointer',
              textAlign: 'right', transition: 'all 0.25s ease',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span>{opt}</span>
              {answered && i === correctIndex && <span>✓</span>}
              {answered && i === selected && i !== correctIndex && <span>✗</span>}
            </button>
          );
        })}
      </div>
      {answered && (
        <p style={{
          color: selected === correctIndex ? '#7dd4a0' : '#e89090',
          fontSize: '13px', marginTop: '12px', fontWeight: '700',
        }}>
          {selected === correctIndex ? '🎉 إجابة صحيحة!' : `💡 الإجابة الصحيحة: ${options[correctIndex]}`}
        </p>
      )}
    </div>
  );
}

// ===== محتوى كل تاب =====
function Tab0() {
  return (
    <div>
      <RevealCard delay={0}>
        <div style={{
          background: 'white', border: '2px solid #ebe6f7', borderRadius: '20px',
          padding: '26px 30px', marginBottom: '20px',
          boxShadow: '0 4px 20px rgba(107,79,160,0.07)', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, right: 0, width: '5px', height: '100%',
            background: 'linear-gradient(180deg, #9b7fc7, #c97099)', borderRadius: '0 18px 18px 0',
          }} />
          <p style={{ fontSize: '15px', color: '#5a4a7a', lineHeight: '2.1', margin: 0, textAlign: 'right' }}>
            لا تقتصر دراسة الدماغ على التشريح الفيزيائي فقط، بل تشمل أيضاً العمليات الكيميائية والكهربائية المعقدة التي تحدد الحالة النفسية والعقلية للفرد.
          </p>
        </div>
      </RevealCard>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {brainStructures.map((s, i) => (
          <RevealCard key={i} delay={i * 100} style={{ height: '100%' }}>
            <div style={{
              background: 'white', border: '2px solid #ebe6f7', borderRadius: '20px',
              padding: '26px 20px', transition: 'all 0.35s cubic-bezier(0.34,1.4,0.64,1)',
              cursor: 'default', boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              height: '100%', boxSizing: 'border-box',
              display: 'flex', flexDirection: 'column',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-7px)';
                e.currentTarget.style.boxShadow = `0 18px 44px ${s.color}28`;
                e.currentTarget.style.borderColor = s.color + '60';
                e.currentTarget.style.background = s.bg;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#ebe6f7';
                e.currentTarget.style.background = 'white';
              }}
            >
              <div style={{ fontSize: '36px', textAlign: 'center', marginBottom: '12px' }}>{s.icon}</div>
              <div style={{ fontWeight: '800', fontSize: '17px', color: '#3a2555', textAlign: 'center', marginBottom: '4px' }}>{s.title}</div>
              <div style={{ fontSize: '12px', color: s.color, fontStyle: 'italic', textAlign: 'center', marginBottom: '12px' }}>{s.titleEn}</div>
              <div style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.75', textAlign: 'right', flex: 1 }}>{s.desc}</div>
            </div>
          </RevealCard>
        ))}
      </div>

      <RevealCard delay={200}>
        <div style={{
          background: 'linear-gradient(135deg, #fefaff, #f5f0ff)',
          border: '2px solid #d4bfee', borderRadius: '18px',
          padding: '20px 24px', display: 'flex', alignItems: 'flex-start', gap: '14px',
        }}>
          <div style={{ fontSize: '24px', flexShrink: 0 }}>💡</div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '15px', color: '#6b4fa0', marginBottom: '6px' }}>حقيقة مثيرة</div>
            <p style={{ fontSize: '14px', color: '#6b5a8a', lineHeight: '1.8', margin: 0 }}>
              القشرة المخية الرقيقة هي المادة الرمادية التي تغطي المخ — وتزداد تعقيداً وتجعداً كلما تعلم الإنسان أشياء جديدة. كل معرفة جديدة تضاف تشكّل دماغك فعلياً!
            </p>
          </div>
        </div>
      </RevealCard>

      <AnalogyCard
        emoji="🏢"
        color="#9b7fc7"
        title="الدماغ كمبنى من 3 طوابق"
        text="تخيّل الدماغ كمبنى: الطابق العلوي (الدماغ الأمامي) هو مكتب المدير — يفكر ويخطط. الطابق الأوسط (الدماغ المتوسط) هو الاستقبال — يوزّع الرسائل. والطابق الأرضي (الدماغ الخلفي) هو غرفة المحركات — يشغّل التنفس والقلب تلقائياً بدون ما تطلب منه."
      />

      <QuickQuiz
        question="ما هو الجزء المسؤول عن التوازن والحركة في الدماغ الخلفي؟"
        options={['المخيخ', 'الفص الجبهي', 'اللوزة الدماغية', 'الحصين']}
        correctIndex={0}
        color="#9b7fc7"
      />
    </div>
  );
}

function Tab1() {
  return (
    <div>
      <RevealCard>
        <p style={{ fontSize: '15px', color: '#8070a8', lineHeight: '1.8', marginBottom: '24px', textAlign: 'right' }}>
          تنقسم القشرة المخية إلى أربعة فصوص رئيسية. يلعب كل منها دوراً محورياً في تشكيل الصحة النفسية والسلوك الاجتماعي.
        </p>
      </RevealCard>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {lobes.map((lobe, i) => (
          <RevealCard key={i} delay={i * 90}>
            <div style={{
              background: 'white', border: '2px solid #ebe6f7', borderRadius: '18px',
              padding: '20px 22px', display: 'flex', alignItems: 'flex-start', gap: '16px',
              transition: 'all 0.3s cubic-bezier(0.34,1.2,0.64,1)', cursor: 'default',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px) translateX(-4px)';
                e.currentTarget.style.boxShadow = `0 12px 36px ${lobe.color}25`;
                e.currentTarget.style.borderColor = lobe.color + '55';
                e.currentTarget.style.background = lobe.bg;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) translateX(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#ebe6f7';
                e.currentTarget.style.background = 'white';
              }}
            >
              <div style={{
                width: '44px', height: '44px', borderRadius: '13px',
                background: lobe.color, color: 'white',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '19px', fontWeight: '900', flexShrink: 0,
                boxShadow: `0 4px 14px ${lobe.color}45`,
              }}>
                {lobe.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: '800', fontSize: '17px', color: '#3a2555', marginBottom: '2px' }}>{lobe.title}</div>
                <div style={{ fontSize: '12px', color: lobe.color, fontStyle: 'italic', marginBottom: '8px' }}>{lobe.titleEn}</div>
                <div style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.75' }}>{lobe.desc}</div>
              </div>
            </div>
          </RevealCard>
        ))}
      </div>
      <AnalogyCard
        emoji="🗺️"
        color="#d6936a"
        title="الفصوص الأربعة = أقسام مكتب واحد"
        text="تخيّل دماغك شركة: الفص الجبهي هو مدير القرارات الذي يفكر قبل ما يتصرف. الجداري هو موظف الاستقبال الحسي الذي يجمع كل المعلومات. الصدغي هو أرشيف الذكريات والأصوات. والقذالي هو كاميرا الشركة — لا شيء يمر أمامك إلا وهو يسجله!"
      />

      <QuickQuiz
        question="أي فص الدماغ مسؤول عن المعالجة البصرية؟"
        options={['الفص الجبهي', 'الفص الجداري', 'الفص الصدغي', 'الفص القذالي']}
        correctIndex={3}
        color="#d6936a"
      />
    </div>
  );
}

function Tab2() {
  return (
    <div>
      <RevealCard>
        <p style={{ fontSize: '15px', color: '#8070a8', lineHeight: '1.8', marginBottom: '24px', textAlign: 'right' }}>
          تحت القشرة المخية مباشرة، تقع مجموعة من الهياكل المسؤولة عن تحديد حالتنا العاطفية، وتعديل ذكرياتنا، وتنسيق استجاباتنا للضغوط.
        </p>
      </RevealCard>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {limbicSystem.map((item, i) => (
          <RevealCard key={i} delay={i * 100}>
            <div style={{
              background: 'white', border: '2px solid #ebe6f7', borderRadius: '22px',
              padding: '20px 24px', transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
              cursor: 'default', boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
              position: 'relative', overflow: 'hidden',
              display: 'flex', alignItems: 'center', gap: '24px',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateX(-8px)';
                e.currentTarget.style.boxShadow = `0 12px 30px ${item.color}15`;
                e.currentTarget.style.borderColor = item.color + '40';
                e.currentTarget.style.background = '#fcfaff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#ebe6f7';
                e.currentTarget.style.background = 'white';
              }}
            >
              {/* Icon Container */}
              <div style={{
                width: '60px', height: '60px', borderRadius: '18px',
                background: item.color + '12', display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '30px', flexShrink: 0,
                boxShadow: `0 8px 16px ${item.color}15`,
              }}>
                {item.icon}
              </div>

              {/* Content Container */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <div style={{ fontWeight: '800', fontSize: '18px', color: '#3a2555' }}>{item.title}</div>
                  <span style={{
                    display: 'inline-block', padding: '2px 12px', borderRadius: '50px',
                    background: item.badgeColor + '15', color: item.badgeColor,
                    fontSize: '11px', fontWeight: '800',
                  }}>
                    {item.badge}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: item.color, fontStyle: 'italic', marginBottom: '10px', opacity: 0.8 }}>{item.titleEn}</div>
                <p style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.75', margin: 0, textAlign: 'right' }}>
                  {item.desc}
                </p>
              </div>

              {/* Accent Line */}
              <div style={{
                position: 'absolute', top: 0, right: 0, bottom: 0, width: '5px',
                background: item.color, borderRadius: '0 22px 22px 0'
              }} />
            </div>
          </RevealCard>
        ))}
      </div>
      <AnalogyCard
        emoji="🚨"
        color="#c97099"
        title="الجهاز الحوفي = فريق الطوارئ العاطفي"
        text="اللوزة الدماغية هي كاشف الدخان — تصرخ فور ما تحس بخطر حتى لو كان وهماً. الحصين هو المصوّر الذي يحفظ كل لحظة مهمة في حياتك. المهاد هو موزّع البريد الذي يوصل كل رسالة حسية للمكان الصح. وتحت المهاد؟ هو زر الطوارئ الصغير الذي يشعل جسمك كله عند الغضب أو الخوف!"
      />

      <QuickQuiz
        question="أي جزء من الجهاز الحوفي يُعرف بـ'مركز الذاكرة' ويتأثر بالتوتر المزمن؟"
        options={['اللوزة الدماغية', 'المهاد', 'الحصين', 'تحت المهاد']}
        correctIndex={2}
        color="#c97099"
      />
    </div>
  );
}

function Tab3() {
  return (
    <div>
      <RevealCard delay={0}>
        <div style={{
          background: 'linear-gradient(135deg, #2d1f4a, #3d2a60)',
          borderRadius: '22px', padding: '32px 28px',
          textAlign: 'center', marginBottom: '24px', position: 'relative', overflow: 'hidden',
          boxShadow: '0 16px 52px rgba(45,31,74,0.35)',
        }}>
          {[...Array(10)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: `${4 + (i * 2) % 8}px`, height: `${4 + (i * 2) % 8}px`,
              borderRadius: '50%',
              background: `rgba(155,127,199,${0.2 + (i % 4) * 0.12})`,
              top: `${(i * 17) % 100}%`, left: `${(i * 11) % 95}%`,
              pointerEvents: 'none',
            }} />
          ))}
          <div style={{ fontSize: '38px', marginBottom: '12px', position: 'relative', zIndex: 1 }}>🕸️</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginBottom: '10px', position: 'relative', zIndex: 1 }}>
            شبكة الدماغ المذهلة
          </div>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.78)', lineHeight: '1.85', maxWidth: '500px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
            الدماغ عبارة عن شبكة تضم حوالي 86 مليار خلية عصبية. العصبون هو الوحدة التي تستقبل الإشارات عبر الزوائد الشجيرية وترسلها عبر المحور العصبي إلى الخلايا الأخرى.
          </p>
        </div>
      </RevealCard>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
  {neurotransmitters.map((nt, i) => (
    <RevealCard key={i} delay={i * 100}>
      <div style={{
        background: 'white', border: '2px solid #ebe6f7', borderRadius: '22px',
        padding: '20px 24px', transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
        cursor: 'default', boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
        position: 'relative', overflow: 'hidden',
        display: 'flex', alignItems: 'center', gap: '24px',
      }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 10px 30px ${nt.color}22`;
                e.currentTarget.style.borderColor = nt.color + '55';
                e.currentTarget.style.background = nt.bg;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#ebe6f7';
                e.currentTarget.style.background = 'white';
              }}
            >
              <div style={{
                display: 'inline-block', padding: '4px 14px', borderRadius: '50px',
                background: nt.color, color: 'white', fontSize: '13px', fontWeight: '800', marginBottom: '4px',
              }}>
                {nt.title}
              </div>
              <div style={{ fontSize: '11px', color: nt.color + 'cc', fontStyle: 'italic', marginBottom: '10px' }}>{nt.titleEn}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {nt.points.map((p, j) => (
                  <li key={j} style={{
                    fontSize: '13px', color: '#7a6a98', lineHeight: '1.6',
                    paddingRight: '16px', position: 'relative', textAlign: 'right',
                  }}>
                    <span style={{
                      position: 'absolute', right: 0, top: '7px',
                      width: '7px', height: '7px', borderRadius: '50%',
                      background: nt.color + '80',
                    }} />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </RevealCard>
        ))}
      </div>

      <RevealCard delay={200}>
        <div style={{
          background: 'linear-gradient(135deg, #f0eeff, #e8f5ff)',
          border: '2px solid #c8dff0', borderRadius: '16px', padding: '20px 24px', textAlign: 'center',
        }}>
          <div style={{
            display: 'inline-block', padding: '4px 16px', borderRadius: '50px',
            background: '#6e91a7', color: 'white', fontSize: '13px', fontWeight: '800', marginBottom: '10px',
          }}>
            اللدونة العصبية — Neuroplasticity
          </div>
          <p style={{ fontSize: '14px', color: '#5a7080', lineHeight: '1.85', margin: 0 }}>
            و هي قدرة الدماغ على تغيير هيكله ووظائفه استجابةً للخبرات والتعلم , فالوصلات المشبكية تقوى بالإستخدام , و تضعف بالإهمال. 
            في حالات الاضطراب النفسي، قد تضعف الوصلات المشبكية في مناطق التحكم العاطفي، ولكن العلاج النفسي والدوائي يعملان على تحفيز نمو وصلات جديدة وتعزيز اللدونة، مما يمهد الطريق للتعافي.
          </p>
        </div>
      </RevealCard>

      <AnalogyCard
        emoji="📮"
        color="#6e91a7"
        title="النواقل العصبية = رسائل واتساب بين الخلايا"
        text="تخيّل كل خلية عصبية كشخص على الواتساب. السيروتونين هو الرسالة اللي تقول 'كل شيء تمام 😊'. الدوبامين هو رسالة 'أحسنت! استمر 🎉'. GABA هو الرسالة اللي تقول 'تمهّل، خذ نفس 😌'. والغلوتامات؟ هو الرسالة العاجلة 'انتبه! مهم جداً!' — لكن لو كثر الغلوتامات صار مثل شخص يصرخ دائماً، وهذا يأذي الخلايا!"
      />

      <QuickQuiz
        question="أي ناقل عصبي مرتبط بالاكتئاب عند انخفاض مستوياته؟"
        options={['دوبامين', 'سيروتونين', 'غلوتامات', 'GABA']}
        correctIndex={1}
        color="#6e91a7"
      />
    </div>
  );
}

function Tab4() {
  return (
    <div>
      <RevealCard>
        <div style={{
          background: 'linear-gradient(135deg, #f0fff8, #e8f5ff)',
          border: '2px solid #9dd4b5', borderRadius: '18px',
          padding: '20px 24px', marginBottom: '24px',
        }}>
          <p style={{ fontSize: '14px', color: '#3a6a5a', lineHeight: '1.85', margin: 0, textAlign: 'right' }}>
            أثبتت أبحاث NIMH وWHO أن العلاج يغيّر الدماغ فعليًا. الدماغ لا يظل ثابتًا في حالته المرضية، بل يمتلك قدرة حقيقية على الإصلاح وإعادة البناء.
          </p>
        </div>
      </RevealCard>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {recoveryMethods.map((method, i) => (
          <RevealCard key={i} delay={i * 120}>
            <div style={{
              background: 'white', border: '2px solid #ebe6f7', borderRadius: '20px',
              padding: '22px 26px', transition: 'all 0.35s cubic-bezier(0.34, 1.3, 0.64, 1)',
              boxShadow: '0 2px 10px rgba(0,0,0,0.04)', cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = `0 18px 44px ${method.color}25`;
                e.currentTarget.style.borderColor = method.color + '60';
                e.currentTarget.style.background = method.iconBg || '#faf8ff';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                e.currentTarget.style.borderColor = '#ebe6f7';
                e.currentTarget.style.background = 'white';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <div style={{
                  width: '46px', height: '46px', borderRadius: '14px',
                  background: method.iconBg, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', fontSize: '22px', flexShrink: 0,
                }}>
                  {method.icon}
                </div>
                <div style={{ fontWeight: '800', fontSize: '17px', color: '#3a2555' }}>{method.title}</div>
              </div>
              {method.desc && (
                <p style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.75', margin: 0, textAlign: 'right' }}>
                  {method.desc}
                </p>
              )}
              {method.subItems && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '4px' }}>
                  {method.subItems.map((sub, j) => (
                    <div key={j} style={{
                      background: 'linear-gradient(135deg, #f8fff5, #f3f9ff)',
                      border: '1px solid #c8ecd8', borderRadius: '13px', padding: '13px 16px',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                        <span style={{ fontSize: '18px' }}>{sub.icon}</span>
                        <div style={{ fontWeight: '700', fontSize: '14px', color: '#3a2555' }}>{sub.title}</div>
                      </div>
                      <p style={{ fontSize: '13px', color: '#7a8a98', lineHeight: '1.7', margin: 0, textAlign: 'right' }}>
                        {sub.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </RevealCard>
        ))}
      </div>

      <AnalogyCard
        emoji="🏋️"
        color="#4aab72"
        title="التعافي = تمرين العضلة العقلية"
        text="الدماغ تماماً كالعضلة — ما تتوقع إنها تقوى بدون تمرين! العلاج النفسي يدرّب القشرة الجبهية على السيطرة على اللوزة مثلما يدرّب المدرب اللاعبين. الأدوية تعطي الدماغ 'بروتين' اللي يحتاجه للإصلاح. والنوم والرياضة والأكل الصحي؟ هي الراحة بين التمارين — بدونها كل جهدك يضيع!"
      />

      <QuickQuiz
        question="ما هي مدة العلاج المعرفي السلوكي التي لوحظ بعدها تحسن في نشاط الدماغ؟"
        options={['4 أسابيع', '8 أسابيع', '12 أسبوعاً', '6 أشهر']}
        correctIndex={2}
        color="#4aab72"
      />
    </div>
  );
}

const tabContents = [Tab0, Tab1, Tab2, Tab3, Tab4];

// ===== الصفحة الرئيسية =====
function Dimagh() {
  const [activeTab, setActiveTab] = useState(0);
  const [visitedTabs, setVisitedTabs] = useState(new Set([0]));
  const [animating, setAnimating] = useState(false);
  const [headerRef, headerVisible] = useReveal();
  const contentRef = useRef(null);

  const progress = Math.round((visitedTabs.size / tabs.length) * 100);

  const handleTabChange = (id) => {
    if (id === activeTab) return;
    setAnimating(true);
    setTimeout(() => {
      setActiveTab(id);
      setVisitedTabs(prev => new Set([...prev, id]));
      setAnimating(false);
      if (contentRef.current) {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 220);
  };

  const goNext = () => {
    if (activeTab < tabs.length - 1) handleTabChange(activeTab + 1);
  };

  const ActiveContent = tabContents[activeTab];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&display=swap');
        @keyframes float-brain {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes shimmer-line {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: var(--target-width); }
        }
        @keyframes star-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-16px) scale(1.1); opacity: 1; }
        }
        .tab-btn:hover {
          transform: translateY(-2px);
        }
        .limbic-grid, .neuro-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        @media (max-width: 580px) {
          .limbic-grid, .neuro-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #faf8ff 0%, #f0ecff 50%, #fdf6ff 100%)',
        direction: 'rtl',
        fontFamily: "'Tajawal', sans-serif",
        paddingBottom: '80px',
      }}>

        {/* Hero */}
        <div ref={headerRef} style={{
          textAlign: 'center',
          padding: '52px 24px 40px',
          position: 'relative', overflow: 'hidden',
        }}>
          {[
            { top: '-80px', right: '-100px', size: 340, color: '#d4bfee18' },
            { bottom: '-60px', left: '-80px', size: 260, color: '#f0c0d815' },
          ].map((c, i) => (
            <div key={i} style={{
              position: 'absolute', borderRadius: '50%',
              width: c.size, height: c.size,
              background: `radial-gradient(circle, ${c.color}, transparent)`,
              top: c.top, right: c.right, bottom: c.bottom, left: c.left,
              pointerEvents: 'none',
            }} />
          ))}
          {[...Array(6)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: `${5 + (i * 3) % 7}px`, height: `${5 + (i * 3) % 7}px`,
              borderRadius: '50%',
              background: `rgba(155,127,199,${0.18 + (i % 4) * 0.1})`,
              top: `${10 + (i * 14) % 80}%`, left: `${5 + (i * 13) % 88}%`,
              animation: `star-float ${2.5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`, pointerEvents: 'none',
            }} />
          ))}

          <div style={{
            fontSize: '62px', marginBottom: '16px', display: 'inline-block',
            animation: headerVisible ? 'float-brain 4s ease-in-out infinite' : 'none',
            opacity: headerVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.1s',
          }}>🧠</div>

          <h1 style={{
            fontSize: 'clamp(26px, 5vw, 40px)', fontWeight: '800', color: '#3a2555',
            marginBottom: '12px', letterSpacing: '-0.5px',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s',
          }}>
            اكتشف دماغك
          </h1>

          <p style={{
            fontSize: '15px', color: '#8070a8', maxWidth: '480px',
            margin: '0 auto 20px', lineHeight: '1.85',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s',
          }}>
            تعرف على تراكيب دماغك وكيف تتفاعل لتشكّل صحتك النفسية.
          </p>

          {/* Progress Bar */}
          <div style={{
            maxWidth: '360px', margin: '0 auto',
            opacity: headerVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.5s',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', color: '#9b7fc7', fontWeight: '700' }}>تقدمك</span>
              <span style={{ fontSize: '12px', color: '#9b7fc7', fontWeight: '700' }}>{progress}%</span>
            </div>
            <div style={{
              height: '8px', background: '#e8deff', borderRadius: '10px', overflow: 'hidden',
            }}>
              <div style={{
                height: '100%', borderRadius: '10px',
                background: 'linear-gradient(90deg, #9b7fc7, #c97099)',
                width: `${progress}%`,
                transition: 'width 0.6s cubic-bezier(0.22,1,0.36,1)',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '8px' }}>
              {tabs.map(t => (
                <div key={t.id} style={{
                  width: '8px', height: '8px', borderRadius: '50%',
                  background: visitedTabs.has(t.id) ? t.color : '#e0d8f0',
                  transition: 'background 0.4s ease',
                }} />
              ))}
            </div>
          </div>

          <div style={{
            width: '90px', height: '3px', borderRadius: '10px', margin: '20px auto 0',
            background: 'linear-gradient(90deg, transparent, #9b7fc7, #c97099, transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer-line 3s linear infinite',
          }} />
        </div>

        {/* Tabs Navigation */}
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 20px' }}>
          <div style={{
            display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px',
            scrollbarWidth: 'none', marginBottom: '28px',
            justifyContent: 'center', flexWrap: 'wrap',
          }}>
            {tabs.map(tab => {
              const isActive = activeTab === tab.id;
              const isVisited = visitedTabs.has(tab.id);
              return (
                <button
                  key={tab.id}
                  className="tab-btn"
                  onClick={() => handleTabChange(tab.id)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: '50px',
                    border: `2px solid ${isActive ? tab.color : isVisited ? tab.color + '55' : '#e0d8f0'}`,
                    background: isActive
                      ? `linear-gradient(135deg, ${tab.color}, ${tab.color}cc)`
                      : isVisited ? tab.color + '12' : 'white',
                    color: isActive ? 'white' : isVisited ? tab.color : '#8070a8',
                    fontSize: '14px', fontWeight: '700',
                    fontFamily: "'Tajawal', sans-serif",
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.34,1.3,0.64,1)',
                    boxShadow: isActive ? `0 6px 20px ${tab.color}45` : 'none',
                    display: 'flex', alignItems: 'center', gap: '6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                  {isVisited && !isActive && (
                    <span style={{ fontSize: '10px', opacity: 0.7 }}>✓</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Tab Header */}
          <div ref={contentRef} style={{
            background: `linear-gradient(135deg, ${tabs[activeTab].color}18, ${tabs[activeTab].color}08)`,
            border: `2px solid ${tabs[activeTab].color}30`,
            borderRadius: '20px', padding: '18px 24px',
            marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <span style={{ fontSize: '28px' }}>{tabs[activeTab].icon}</span>
            <div>
              <div style={{ fontWeight: '800', fontSize: '20px', color: '#3a2555' }}>
                {tabs[activeTab].label}
              </div>
              <div style={{ fontSize: '12px', color: tabs[activeTab].color, fontWeight: '600' }}>
                {activeTab + 1} / {tabs.length}
              </div>
            </div>
          </div>

          {/* Content with fade animation */}
          <div style={{
            opacity: animating ? 0 : 1,
            transform: animating ? 'translateY(12px)' : 'translateY(0)',
            transition: 'all 0.22s ease',
          }}>
            <ActiveContent />
          </div>

          {/* Next Button */}
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            {activeTab < tabs.length - 1 ? (
              <button
                onClick={goNext}
                style={{
                  padding: '13px 36px', fontSize: '15px', fontWeight: '700',
                  fontFamily: "'Tajawal', sans-serif",
                  background: `linear-gradient(135deg, ${tabs[activeTab + 1].color}, ${tabs[activeTab + 1].color}cc)`,
                  color: 'white', border: 'none', borderRadius: '50px',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                  boxShadow: `0 4px 20px ${tabs[activeTab + 1].color}45`,
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.06)';
                  e.currentTarget.style.boxShadow = `0 8px 28px ${tabs[activeTab + 1].color}60`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = `0 4px 20px ${tabs[activeTab + 1].color}45`;
                }}
              >
                <span>التالي: {tabs[activeTab + 1].label}</span>
                <span>{tabs[activeTab + 1].icon}</span>
                <span>←</span>
              </button>
            ) : (
              <div style={{
                display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
              }}>
                <div style={{
                  padding: '14px 32px',
                  background: 'linear-gradient(135deg, #4aab72, #3a9060)',
                  color: 'white', borderRadius: '50px', fontWeight: '800', fontSize: '15px',
                  boxShadow: '0 6px 24px rgba(74,171,114,0.4)',
                }}>
                  🎉 أنهيت جميع الأقسام!
                </div>
                <p style={{ fontSize: '13px', color: '#8070a8', margin: 0 }}>
                  لقد تعرفت على دماغك بالكامل — أحسنت!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Dimagh;