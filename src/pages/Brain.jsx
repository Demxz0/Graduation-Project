import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);
  return [ref, visible];
}

// ===== بيانات =====
const brainStructures = [
  {
    title: 'الدماغ الأمامي والمخ',
    titleEn: 'Forebrain & Cerebrum',
    desc: 'الجزء الأكبر والأكثر تطوراً. المسؤول عن الوظائف العليا. يتكون من نصفي كرة مخيين يرتبطان بالجسم الثفلي، الذي يتيح التواصل بين الطرفين.',
    
    color: '#9b7fc7',
    bg: '#f5f0ff',
    
  },
  {
    title: 'الدماغ المتوسط',
    titleEn: 'Midbrain',
    desc: 'يعمل كمحطة ترحيل للإشارات الحسية والحركية بين المخ وجذع الدماغ. يلعب دوراً في تنظيم عمليات الانتباه والتعلم.',
    
    color: '#6e91a7',
    bg: '#f0f7ff',
  },
  {
    title: 'الدماغ الخلفي',
    titleEn: 'Hindbrain',
    desc: 'يشمل المخيخ وجذع الدماغ الذي يتحكم في الوظائف اللاإرادية الضرورية للحياة كالتنفس وضربات القلب.',
    
    color: '#b47799',
    bg: '#fff0f7',
  },
];

const lobes = [
  {
    num: 1,
    title: 'الفص الجبهي',
    titleEn: 'Frontal Lobe',
    desc: 'يقع خلف الجبهة مباشرة، وهو الأخير والأكثر تعقيداً. يتحكم في التفكير المعقد وتنظيم العواطف والسلوك الاجتماعي. يمثل كموقع تخزين قصير المدى للأفكار مما يسمح للفرد بموازنة الخيارات قبل التصرف.',
    color: '#9b7fc7',
    bg: '#f8f4ff',
  },
  {
    num: 2,
    title: 'الفص الجداري',
    titleEn: 'Parietal Lobe',
    desc: 'يقع في الجزء العلوي والخلفي. يقوم بدمج المعلومات الحسية من مختلف أجزاء الجسم ويساعد في فهم اللغة ومعالجة الحواس الخمس وإدارة العلاقات المكانية.',
    color: '#d6936a',
    bg: '#fff8f0',
  },
  {
    num: 3,
    title: 'الفص الصدغي',
    titleEn: 'Temporal Lobe',
    desc: 'يقع على جانبي الدماغ بالقرب من الأذنين. يختص بالسمع ومعالجة الأصوات وفهم اللغة. يلعب الجزء السفلي منه دوراً حيوياً في تكوين الذكريات، ودمجها مع الأحاسيس والعواطف.',
    color: '#6e91a7',
    bg: '#f0f7fb',
  },
  {
    num: 4,
    title: 'الفص القذالي',
    titleEn: 'Occipital Lobe',
    desc: 'يقع في آخر الدماغ. المسؤول الأول عن المعالجة البصرية بما في ذلك التعرف على الوجوه والأشياء وربطها بالصور المخزنة في الذاكرة.',
    color: '#4aab72',
    bg: '#f0fff8',
  },
];

const limbicSystem = [
  {
    title: 'اللوزة الدماغية',
    titleEn: 'Amygdala',
   
    badge: 'مركز الخوف',
    badgeColor: '#d6936a',
    desc: 'مركز الخوف والعدوان. تعمل كنظام إنذار مبكر لتقييم التهديدات وتنشيط الاستجابة لها. في الاضطرابات النفسية تطلق إنذارات كاذبة أو مبالغ فيها.',
    color: '#d6936a',
  },
  {
    title: 'الحصين',
    titleEn: 'Hippocampus',
   
    badge: 'مركز الذاكرة',
    badgeColor: '#6e91a7',
    desc: 'المسؤول عن التعلم وتكوين الذكريات طويلة الأمد، وهو من أكثر المناطق حساسية لهرمونات الإجهاد. التوتر المزمن يؤدي إلى تقلص حجمه مما يفسر مشاكل الذاكرة في الاكتئاب.',
    color: '#6e91a7',
  },
  {
    title: 'المهاد',
    titleEn: 'Thalamus',
   
    badge: 'بوابة الحواس',
    badgeColor: '#9b7fc7',
    desc: 'يستقبل المعلومات من الحواس ويعيد إرسالها إلى المخ للمعالجة. بوابة للمعلومات الحسية.',
    color: '#9b7fc7',
  },
  {
    title: 'تحت المهاد',
    titleEn: 'Hypothalamus',
    
    badge: 'المتحكم في المشاعر',
    badgeColor: '#4aab72',
    desc: 'بحجم حبة اللؤلؤ لكن قوته هائلة. يتحكم في الكيميائيات التي تؤثر في الخوف أو الغضب، ويدير الاستجابة البدنية للتوتر.',
    color: '#4aab72',
  },
];

const neurotransmitters = [
  {
    title: 'سيروتونين',
    titleEn: 'Serotonin',
    color: '#9b7fc7',
    bg: '#f5f0ff',
    points: ['ينظم المزاج والنوم والتشبعة', 'انخفاض مستوياته مرتبط بالاكتئاب', 'هو أساس عمل كثير من الأدوية النفسية'],
  },
  {
    title: 'دوبامين',
    titleEn: 'Dopamine',
    color: '#d6936a',
    bg: '#fff8f0',
    points: ['يرتبط بالمتعة والتحفيز', 'يلعب دوراً محورياً في المكافأة', 'نقصه يرتبط باضطرابات المزاج'],
  },
  {
    title: 'حمض غاما-أمينوبيوتيريك',
    titleEn: 'GABA',
    color: '#6e91a7',
    bg: '#f0f7fb',
    points: ['الناقل المثبط الرئيسي', 'يهدئ النشاط العصبي المفرط', 'نقصه مرتبط بحالات القلق'],
  },
  {
    title: 'غلوتامات',
    titleEn: 'Glutamate',
    color: '#4aab72',
    bg: '#f0fff8',
    points: ['الناقل المنبه الرئيسي', 'ضروري للتعلم', 'زيادته المفرطة قد تكون سامة للخلايا'],
  },
];

const recoveryMethods = [
  {
    title: 'العلاج المعرفي السلوكي (CBT)',
    icon: '💬',
    iconBg: '#f0e8ff',
    desc: 'بعد 12 أسبوعاً من العلاج: لوحظ انخفاض ملموس في فرط النشاط في مناطق الدماغ المرتبطة بالقلق. العلاج يدرّب القشرة الجبهية على تولي القيادة مجدداً وتقليل سيطرة مراكز الخوف.',
    color: '#9b7fc7',
  },
  {
    title: 'الآلية العصبية للأدوية',
    icon: '💊',
    iconBg: '#fff0e8',
    desc: 'بعد 12 أسبوعاً من العلاج: لوحظ انخفاض ملموس في فرط النشاط في مناطق الدماغ المرتبطة بالقلق. الأدوية تساعد في إعادة توازن النواقل العصبية وتهيئة الدماغ للاستجابة للعلاج.',
    color: '#d6936a',
  },
  {
    title: 'نمط الحياة كتدخل حيوي',
    icon: '🌱',
    iconBg: '#f0fff8',
    desc: null,
    color: '#4aab72',
    subItems: [
      { icon: '🏃', title: 'التمارين الرياضية', desc: 'تزيد من تدفق الدم للدماغ وتحفز إفراز الكيميائيات التي تحسن المزاج وتقلل الالتهاب.' },
      { icon: '🌙', title: 'النوم المنتظم', desc: 'ضروري لتنظيف الدماغ من السموم وترسيخ الذاكرة. قلة النوم تضعف التواصل بين القشرة الجبهية واللوزة مما يزيد القلق.' },
      { icon: '🥗', title: 'التغذية السليمة', desc: 'توفر اللبنات الأساسية للنواقل العصبية وتحمي الدماغ من الإجهاد التأكسدي.' },
    ],
  },
];

// ===== مكونات مساعدة =====
function RevealCard({ children, delay = 0, style = {} }) {
  const [ref, visible] = useReveal(delay);
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
        transition: 'all 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function SectionHeader({ title, sub, color = '#9b7fc7' }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        marginBottom: '32px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(30px)',
        transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
        direction: 'rtl',

      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', justifyContent: 'flex-start' }}>
        <div style={{
          width: '13px', height: '13px', borderRadius: '50%',
          background: color, boxShadow: `0 0 10px ${color}80`,
          animation: 'pulse-dot 2s ease-in-out infinite',
          flexShrink: 0,
        }} />
        <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#3a2555', margin: 0 }}>{title}</h2>
      </div>
      {sub && <p style={{ fontSize: '15px', color: '#9586b0', lineHeight: '1.7', textAlign: 'right', maxWidth: '650px', marginRight: 0, marginLeft: 'auto' }}>{sub}</p>}
    </div>
  );
}

// ===== الصفحة =====
function Dimagh() {
  const navigate = useNavigate();
  const [headerRef, headerVisible] = useReveal();

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
        @keyframes float-brain {
          0%, 100% { transform: translateY(0px) rotate(-3deg); }
          50% { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes shimmer-line {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes neuron-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(155,127,199,0.4); }
          50% { box-shadow: 0 0 0 10px rgba(155,127,199,0); }
        }
        @keyframes star-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.1); opacity: 1; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #faf8ff 0%, #f0ecff 50%, #fdf6ff 100%)',
        direction: 'rtl',
        fontFamily: "'Tajawal', sans-serif",
        paddingBottom: '80px',
      }}>

        {/* ===== Hero ===== */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            padding: '64px 32px 52px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* الدوائر*/}
          {[
            { top: '-80px', right: '-100px', size: 380, color: '#d4bfee20' },
            { bottom: '-60px', left: '-80px', size: 280, color: '#f0c0d818' },
          ].map((c, i) => (
            <div key={i} style={{
              position: 'absolute', borderRadius: '50%',
              width: c.size, height: c.size,
              background: `radial-gradient(circle, ${c.color}, transparent)`,
              top: c.top, right: c.right, bottom: c.bottom, left: c.left,
              pointerEvents: 'none',
            }} />
          ))}

          {/* نقاط عصبية متحركة */}
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: `${5 + (i * 3) % 7}px`,
              height: `${5 + (i * 3) % 7}px`,
              borderRadius: '50%',
              background: `rgba(155,127,199,${0.2 + (i % 4) * 0.1})`,
              top: `${10 + (i * 13) % 80}%`,
              left: `${5 + (i * 12) % 90}%`,
              animation: `star-float ${2.5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              pointerEvents: 'none',
            }} />
          ))}

          <div style={{
            fontSize: '68px', marginBottom: '18px', display: 'inline-block',
            animation: headerVisible ? 'float-brain 4s ease-in-out infinite' : 'none',
            opacity: headerVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.1s',
          }}>🧠</div>

          <h1 style={{
            fontSize: '50px', fontWeight: '800', color: '#3a2555',
            marginBottom: '14px', letterSpacing: '-0.5px',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.2s',
          }}>
            إكتشف دماغك
          </h1>

          <p style={{
            fontSize: '16px', color: '#8070a8',
            maxWidth: '520px', margin: '0 auto 22px', lineHeight: '1.85',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.35s',
          }}>
            تعرّف على الجيل الذي وُلد في عالم رقمي — وكيف شكّل ذلك صحته النفسية
          </p>

          <div style={{
            display: 'inline-block', padding: '6px 22px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #f0eaff, #e8deff)',
            border: '1px solid #d4bfee',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(14px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.5s',
          }}>
            <span style={{ fontSize: '14px', color: '#7c6fcd', fontWeight: '700' }}>
              علم الأعصاب والصحة النفسية
            </span>
          </div>

          <div style={{
            width: '100px', height: '3px', borderRadius: '10px',
            margin: '22px auto 0',
            background: 'linear-gradient(90deg, transparent, #9b7fc7, #c97099, transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer-line 3s linear infinite',
          }} />
        </div>

        {/* ===== المحتوى ===== */}
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 32px' }}>

          {/* المقدمة */}
          <RevealCard delay={100} style={{ marginBottom: '52px' }}>
            <div style={{
              background: 'white',
              border: '2px solid #ebe6f7',
              borderRadius: '24px',
              padding: '30px 34px',
              boxShadow: '0 4px 24px rgba(107,79,160,0.07)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '5px', height: '100%',
                background: 'linear-gradient(180deg, #9b7fc7, #c97099)',
                borderRadius: '0 22px 22px 0',
              }} />
              <p style={{ fontSize: '15px', color: '#5a4a7a', lineHeight: '2.1', margin: 0, textAlign: 'right' }}>
                لا تقتصر دراسة الدماغ على التشريح الفيزيائي فقط، بل تشمل أيضاً العمليات الكيميائية والكهربائية المعقدة التي تحدد الحالة النفسية والعقلية للفرد. في هذه الصفحة سيتم استعراض التفاصيل الدقيقة لأجزاء الدماغ التي تتدخل في الصحة النفسية.
              </p>
            </div>
          </RevealCard>

          {/* ===== البنية التشريحية ===== */}
          <SectionHeader
            title="البنية التشريحية الكبرى للدماغ"
            sub="يتم تقسيم الدماغ تشريحياً إلى ثلاث وحدات أساسية. كل وحدة تمتلك مسؤوليات متخصصة تساهم في تكوين التجربة النفسية للفرد."
          
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '52px',
          }}>
            {brainStructures.map((s, i) => (
              <RevealCard key={i} delay={i * 120}>
                <div
                  style={{
                    background: 'white',
                    border: '2px solid #ebe6f7',
                    borderRadius: '22px',
                    padding: '28px 22px',
                    minHeight: '200px',
                    transition: 'all 0.35s cubic-bezier(0.34,1.4,0.64,1)',
                    cursor: 'default',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
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
                  <div style={{ fontSize: '38px', marginBottom: '14px', textAlign: 'center' }}>{s.icon}</div>
                  <div style={{ fontWeight: '800', fontSize: '18px', color: '#3a2555', marginBottom: '4px', textAlign: 'center' }}>{s.title}</div>
                  <div style={{ fontSize: '12px', color: s.color, fontStyle: 'italic', textAlign: 'center', marginBottom: '12px' }}>{s.titleEn}</div>
                  <div style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.75', textAlign: 'right' }}>{s.desc}</div>
                </div>
              </RevealCard>
            ))}
          </div>

          {/* حقيقة مثيرة */}
          <RevealCard delay={100} style={{ marginBottom: '52px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #fefaff, #f5f0ff)',
              border: '2px solid #d4bfee',
              borderRadius: '20px',
              padding: '22px 28px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
              boxShadow: '0 4px 20px rgba(155,127,199,0.1)',
            }}>
              <div style={{ fontSize: '26px', flexShrink: 0, animation: 'float-brain 3.5s ease-in-out infinite' }}>💡</div>
              <div>
                <div style={{ fontWeight: '800', fontSize: '16px', color: '#6b4fa0', marginBottom: '6px' }}>حقيقة مثيرة</div>
                <p style={{ fontSize: '14px', color: '#6b5a8a', lineHeight: '1.8', margin: 0 }}>
                  القشرة المخية الرقيقة هي المادة الرمادية التي تغطي المخ — وتزداد تعقيداً وتجعداً كلما تعلم الإنسان أشياء جديدة. كل معرفة جديدة تضاف تشكّل دماغك فعلياً!
                </p>
              </div>
            </div>
          </RevealCard>

          {/* ===== الفصوص ===== */}
          <SectionHeader
            title="الفصوص الدماغية والسيادة الوظيفية"
            sub="تنقسم القشرة المخية إلى أربعة فصوص رئيسية. يلعب كل منها دوراً محورياً في تشكيل الصحة النفسية والسلوك الاجتماعي."
            color="#d6936a"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '52px' }}>
            {lobes.map((lobe, i) => (
              <RevealCard key={i} delay={i * 100}>
                <div
                  style={{
                    background: 'white',
                    border: '2px solid #ebe6f7',
                    borderRadius: '18px',
                    padding: '20px 24px',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '18px',
                    transition: 'all 0.3s cubic-bezier(0.34,1.2,0.64,1)',
                    cursor: 'default',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = `0 12px 36px ${lobe.color}20`;
                    e.currentTarget.style.borderColor = lobe.color + '50';
                    e.currentTarget.style.background = lobe.bg;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = '#ebe6f7';
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '12px',
                    background: lobe.color, color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '18px', fontWeight: '900', flexShrink: 0,
                    boxShadow: `0 4px 14px ${lobe.color}40`,
                    animation: 'neuron-glow 3s ease-in-out infinite',
                    animationDelay: `${i * 0.5}s`,
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

          {/* ===== الجهاز الحوفي ===== */}
          <SectionHeader
            title="الجهاز الحوفي"
            sub="تحت القشرة المخية مباشرة، تقع مجموعة من الهياكل المسؤولة عن تحديد حالتنا العاطفية، وتعديل ذكرياتنا، وتنسيق استجاباتنا للضغوط."
            color="#c97099"
          />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '18px',
            marginBottom: '52px',
          }}>
            {limbicSystem.map((item, i) => (
              <RevealCard key={i} delay={i * 110}>
                <div
                  style={{
                    background: 'white',
                    border: '2px solid #ebe6f7',
                    borderRadius: '22px',
                    padding: '24px 22px',
                    transition: 'all 0.35s cubic-bezier(0.34,1.3,0.64,1)',
                    cursor: 'default',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 14px 38px ${item.color}22`;
                    e.currentTarget.style.borderColor = item.color + '55';
                    const icon = e.currentTarget.querySelector('.licon');
                    if (icon) { icon.style.transform = 'scale(1.15) rotate(-5deg)'; }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = '#ebe6f7';
                    const icon = e.currentTarget.querySelector('.licon');
                    if (icon) { icon.style.transform = 'scale(1) rotate(0deg)'; }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px', justifyContent: 'flex-start' }}>
  <div style={{ textAlign: 'right' }}>
    <div style={{ fontWeight: '800', fontSize: '17px', color: '#3a2555' }}>{item.title}</div>
    <div style={{ fontSize: '12px', color: item.color, fontStyle: 'italic' }}>{item.titleEn}</div>
  </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '10px' }}>
                    <span style={{
                      padding: '3px 12px', borderRadius: '50px',
                      background: item.badgeColor + '20',
                      color: item.badgeColor,
                      fontSize: '12px', fontWeight: '700',
                    }}>
                      {item.badge}
                    </span>
                  </div>

                  <p style={{ fontSize: '13px', color: '#7a6a98', lineHeight: '1.75', margin: 0, textAlign: 'right' }}>
                    {item.desc}
                  </p>

                  {/* خط سفلي ملون */}
                  <div style={{
                    position: 'absolute', bottom: 0, right: 0, left: 0,
                    height: '3px', borderRadius: '0 0 20px 20px',
                    background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }} className="bottom-line" />
                </div>
              </RevealCard>
            ))}
          </div>

          {/* ===== العصبونات ===== */}
          <SectionHeader
            title="العصبونات واللدونة العصبية"
            sub="الدماغ شبكة تضم حوالي 86 مليار خلية عصبية."
            color="#6e91a7"
          />

          {/* بطاقة شبكة الدماغ */}
          <RevealCard delay={100} style={{ marginBottom: '28px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #2d1f4a, #3d2a60)',
              borderRadius: '24px',
              padding: '36px 32px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 16px 52px rgba(45,31,74,0.4)',
            }}>
              {[...Array(14)].map((_, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  width: `${4 + (i * 2) % 8}px`,
                  height: `${4 + (i * 2) % 8}px`,
                  borderRadius: '50%',
                  background: `rgba(155,127,199,${0.25 + (i % 5) * 0.1})`,
                  top: `${(i * 17) % 100}%`,
                  left: `${(i * 11) % 95}%`,
                  animation: `star-float ${2 + (i % 3)}s ease-in-out infinite`,
                  animationDelay: `${i * 0.25}s`,
                  pointerEvents: 'none',
                }} />
              ))}
              <div style={{ fontSize: '42px', marginBottom: '14px', position: 'relative', zIndex: 1 }}>🕸️</div>
              <div style={{ fontSize: '22px', fontWeight: '800', color: 'white', marginBottom: '12px', position: 'relative', zIndex: 1 }}>
                شبكة الدماغ المذهلة
              </div>
              <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.78)', lineHeight: '1.85', maxWidth: '540px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
                الدماغ عبارة عن شبكة تضم حوالي 86 مليار خلية عصبية. العصبون هو الوحدة التي تستقبل الإشارات عبر الزوائد الشجيرية وترسلها عبر المحور العصبي إلى الخلايا الأخرى.
              </p>
            </div>
          </RevealCard>

          {/* النواقل العصبية */}
          <SectionHeader title="الاتصال المشبكي والنواقل العصبية" color="#9b7fc7" />

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '16px',
            marginBottom: '28px',
          }}>
            {neurotransmitters.map((nt, i) => (
              <RevealCard key={i} delay={i * 100}>
                <div
                  style={{
                    background: 'white',
                    border: '2px solid #ebe6f7',
                    borderRadius: '18px',
                    padding: '20px',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
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
                    display: 'inline-block', padding: '4px 14px',
                    borderRadius: '50px', background: nt.color,
                    color: 'white', fontSize: '13px', fontWeight: '800',
                    marginBottom: '4px',
                  }}>
                    {nt.title}
                  </div>
                  <div style={{ fontSize: '11px', color: nt.color + 'cc', fontStyle: 'italic', marginBottom: '10px' }}>
                    {nt.titleEn}
                  </div>
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

          {/* اللدونة العصبية */}
          <RevealCard delay={200} style={{ marginBottom: '52px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #f0eeff, #e8f5ff)',
              border: '2px solid #c8dff0',
              borderRadius: '18px',
              padding: '22px 28px',
              textAlign: 'center',
            }}>
              <div style={{
                display: 'inline-block', padding: '4px 16px',
                borderRadius: '50px', background: '#6e91a7',
                color: 'white', fontSize: '14px', fontWeight: '800',
                marginBottom: '10px',
              }}>
                اللدونة العصبية — Neuroplasticity
              </div>
              <p style={{ fontSize: '15px', color: '#5a7080', lineHeight: '1.85', margin: 0 }}>
                قدرة الدماغ على تغيير هيكله ووظائفه استجابةً للخبرات والتعلم. الوصلات المشبكية تقوى بالاستخدام وتضعف بالإهمال. هذا يعني أن دماغك قابل للتغيير والتعافي دائماً!
              </p>
            </div>
          </RevealCard>

          {/* ===== التعافي ===== */}
          <SectionHeader
            title="التعافي وإعادة تشكيل الدماغ"
            sub="آليات العلاج من منظور عصبي"
            color="#4aab72"
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '48px' }}>
            {recoveryMethods.map((method, i) => (
              <RevealCard key={i} delay={i * 130}>
                <div
                  style={{
                    background: 'white',
                    border: '2px solid #ebe6f7',
                    borderRadius: '20px',
                    padding: '24px 28px',
                    transition: 'all 0.35s cubic-bezier(0.34, 1.3, 0.64, 1)',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-6px)';
                    e.currentTarget.style.boxShadow = `0 18px 44px ${method.color}28, 0 4px 12px ${method.color}15`;
                    e.currentTarget.style.borderColor = method.color + '70';
                    e.currentTarget.style.background = method.iconBg || '#faf8ff';
                    const title = e.currentTarget.querySelector('.recovery-title');
                    if (title) title.style.color = method.color;
                    const icon = e.currentTarget.querySelector('.recovery-icon');
                    if (icon) { icon.style.transform = 'scale(1.15) rotate(-6deg)'; icon.style.background = method.color + '22'; }
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = '#ebe6f7';
                    e.currentTarget.style.background = 'white';
                    const title = e.currentTarget.querySelector('.recovery-title');
                    if (title) title.style.color = '#3a2555';
                    const icon = e.currentTarget.querySelector('.recovery-icon');
                    if (icon) { icon.style.transform = 'scale(1) rotate(0deg)'; icon.style.background = method.iconBg || '#f0f0ff'; }
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', justifyContent: 'flex-start' }}>
                    <div className="recovery-title" style={{ fontWeight: '800', fontSize: '18px', color: '#3a2555', transition: 'color 0.3s ease' }}>{method.title}</div>
                    <div className="recovery-icon" style={{
                      width: '46px', height: '46px', borderRadius: '14px',
                      background: method.iconBg,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px', flexShrink: 0,
                      transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease',
                    }}>
                      {method.icon}
                    </div>
                  </div>

                  {method.desc && (
                    <p style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.75', margin: 0, textAlign: 'right' }}>
                      {method.desc}
                    </p>
                  )}

                  {method.subItems && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '4px' }}>
                      {method.subItems.map((sub, j) => (
                        <div key={j} style={{
                          background: 'linear-gradient(135deg, #f8fff5, #f3f9ff)',
                          border: '1px solid #c8ecd8',
                          borderRadius: '14px',
                          padding: '14px 18px',
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px', justifyContent: 'flex-start' }}>
                            <div style={{ fontWeight: '700', fontSize: '15px', color: '#3a2555' }}>{sub.title}</div>
                            <span style={{ fontSize: '20px' }}>{sub.icon}</span>
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

          {/* زر الرئيسية */}
          <RevealCard>
            <div style={{ textAlign: 'center' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '13px 40px', fontSize: '16px', fontWeight: '700',
                  fontFamily: "'Tajawal', sans-serif",
                  background: 'linear-gradient(135deg, #9b7fc7, #7c6fcd)',
                  color: 'white', border: 'none', borderRadius: '50px',
                  cursor: 'pointer', transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(124,111,205,0.4)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.06)';
                  e.currentTarget.style.boxShadow = '0 8px 28px rgba(124,111,205,0.55)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,111,205,0.4)';
                }}
              >
                الذهاب إلى الرئيسية
              </button>
            </div>
          </RevealCard>

        </div>
      </div>
    </>
  );
}

export default Dimagh;