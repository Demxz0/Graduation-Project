import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const riskFactors = [
  {
    id: 1,
    icon: '📉',
    iconBg: '#f3e8ff',
    titleAr: 'انخفاض تقدير الذات',
    titleEn: 'Low Self-Esteem',
    desc: 'يرتبط تقدير الذات بعدد الإعجابات والمتابعين، مما يجعل الشخص يشعر بقيمته فقط من خلال تقييم الآخرين، ويزيد من الحساسية للنقد أو التجاهل.',
    color: '#9b7fc7',
    borderColor: '#d4bfee',
    bg: '#faf5ff',
  },
  {
    id: 2,
    icon: '📱',
    iconBg: '#fff0e6',
    titleAr: 'الإدمان الرقمي',
    titleEn: 'Digital Addiction',
    desc: 'قضاء ساعات طويلة على الهاتف أو التطبيقات يؤدي إلى إدمان سلوكي، ويجعل من الصعب الانفصال الرقمي أو الاستماع للواقع.',
    color: '#d6936a',
    borderColor: '#f0c4a0',
    bg: '#fff8f3',
  },
  {
    id: 3,
    icon: '📲',
    iconBg: '#e8f5ff',
    titleAr: 'ضغط وسائل التواصل الاجتماعي',
    titleEn: 'Social Media Pressure',
    desc: 'التعرض اليومي لمحتوى ومقاطير يخلق معايير غير واقعية للجمال والنجاح، مما يؤدي إلى مقارنة مستمرة بالآخرين، شعور بالنقص، وعدم الرضا عن الحياة أو الشكل الشخصي.',
    color: '#6e91a7',
    borderColor: '#b0cedd',
    bg: '#f3f8fb',
  },
  {
    id: 4,
    icon: '🌪️',
    iconBg: '#fff0f5',
    titleAr: 'عدم الاستقرار العاطفي',
    titleEn: 'Emotional Instability',
    desc: 'التفاعل المستمر مع محتوى سريع ومؤثر عاطفياً يؤدي إلى تقلبات مزاجية، ردود فعل مبالغ فيها، وصعوبة في التحكم بالمشاعر.',
    color: '#c97099',
    borderColor: '#e8b0cc',
    bg: '#fdf5f9',
  },
  {
    id: 5,
    icon: '🌙',
    iconBg: '#eef3ff',
    titleAr: 'اضطرابات النوم',
    titleEn: 'Sleep Disorders',
    desc: 'استخدام الأجهزة قبل النوم يؤثر على إفراز هرمون الميلاتونين، مما يسبب أرق، نوم متقطع، وتعب مزمن يؤثر على الصحة الجسدية والنفسية.',
    color: '#7c6fcd',
    borderColor: '#bab3e8',
    bg: '#f5f3ff',
  },
  {
    id: 6,
    icon: '⚡',
    iconBg: '#fffbea',
    titleAr: 'ضعف التركيز',
    titleEn: 'Short Attention Span',
    desc: 'التعرض المستمر للمحتوى السريع (Reels / TikTok) يقلل القدرة على التركيز لفترات طويلة، ويضعف على الدراسة، الفهم العميق، وحل المشكلات.',
    color: '#c5a227',
    borderColor: '#e8d48a',
    bg: '#fffdf0',
  },
  {
    id: 7,
    icon: '❌',
    iconBg: '#fff0f0',
    titleAr: 'التعرض للمعلومات المضللة',
    titleEn: 'Misinformation Exposure',
    desc: 'الانتشار السريع للمعلومات غير الدقيقة بسبب تبني أفكار خاطئة، قلق غير مبرر، وصعوبة في اتخاذ قرارات مبنية على حقائق.',
    color: '#c96060',
    borderColor: '#e8b0b0',
    bg: '#fff5f5',
  },
  {
    id: 8,
    icon: '🔄',
    iconBg: '#f0f8ff',
    titleAr: 'تشتت الهوية',
    titleEn: 'Identity Confusion',
    desc: 'التأثر بالترندات والآراء المنتشرة يجعل الشخص غير قادر على تحديد هويته الحقيقية، ويؤدي إلى تبني قيم متغيرة وغير ثابتة.',
    color: '#5a9fc5',
    borderColor: '#a0cfe8',
    bg: '#f2f9fd',
  },
  {
    id: 9,
    icon: '🏝️',
    iconBg: '#f0fff4',
    titleAr: 'العزلة الاجتماعية',
    titleEn: 'Social Isolation',
    desc: 'رغم كثرة التواصل الرقمي، يقل التواصل الواقعي، مما يؤدي إلى ضعف المهارات الاجتماعية وصعوبة بناء علاقات عميقة.',
    color: '#4aab72',
    borderColor: '#9dd4b5',
    bg: '#f4fdf8',
  },
];

function useRevealOnScroll() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function RiskCard({ factor, index }) {
  const [ref, visible] = useRevealOnScroll();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? factor.bg : 'white',
        border: `2px solid ${hovered ? factor.color + '60' : factor.borderColor}`,
        borderRadius: '20px',
        padding: '28px 24px',
        position: 'relative',
        cursor: 'default',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: visible
          ? hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)'
          : 'translateY(50px) scale(0.96)',
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 80}ms` : '0ms',
        boxShadow: hovered
          ? `0 16px 40px ${factor.color}25, 0 4px 12px ${factor.color}15`
          : '0 2px 10px rgba(0,0,0,0.05)',
        direction: 'rtl',
      }}
    >
      {/* رقم */}
      <div style={{
        position: 'absolute',
        top: '-14px',
        right: '24px',
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        background: factor.color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '14px',
        fontWeight: '800',
        color: 'white',
        boxShadow: `0 4px 12px ${factor.color}50`,
        transition: 'transform 0.3s ease',
        transform: hovered ? 'scale(1.2) rotate(-8deg)' : 'scale(1)',
      }}>
        {factor.id}
      </div>

      {/* الأيقونة والعنوان */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', marginTop: '8px' }}>
        <div style={{
          width: '46px',
          height: '46px',
          borderRadius: '14px',
          background: factor.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '22px',
          transition: 'transform 0.3s ease',
          transform: hovered ? 'rotate(-6deg) scale(1.1)' : 'rotate(0) scale(1)',
          flexShrink: 0,
        }}>
          {factor.icon}
        </div>
        <div>
          <div style={{
            fontWeight: '700',
            fontSize: '18px',
            color: hovered ? factor.color : '#2d1f4a',
            transition: 'color 0.3s',
            lineHeight: 1.3,
          }}>
            {factor.titleAr}
          </div>
          <div style={{
            fontSize: '12px',
            color: hovered ? factor.color + 'aa' : '#b0a0c8',
            fontStyle: 'italic',
            transition: 'color 0.3s',
          }}>
            {factor.titleEn}
          </div>
        </div>
      </div>

      {/* الوصف */}
      <div style={{
        fontSize: '14px',
        color: '#7a6a98',
        lineHeight: '1.75',
        transition: 'color 0.3s',
      }}>
        {factor.desc}
      </div>

      {/* خط سفلي ملوّن يظهر عند الهوفر */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: '3px',
        borderRadius: '0 0 18px 18px',
        background: `linear-gradient(90deg, transparent, ${factor.color}, transparent)`,
        opacity: hovered ? 1 : 0,
        transition: 'opacity 0.35s ease',
      }} />
    </div>
  );
}

function RiskFactors() {
  const navigate = useNavigate();
  const [headerRef, headerVisible] = useRevealOnScroll();

  return (
    <>
      <style>{`
        @keyframes pulse-warn {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.12); }
        }
        @keyframes float-badge {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes shimmer-line {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .risk-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 900px) {
          .risk-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .risk-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #faf8ff 0%, #f0ecff 50%, #fdf6ff 100%)',
        padding: '60px 32px 80px',
        direction: 'rtl',
        fontFamily: "'Tajawal', sans-serif",
      }}>

        {/* ===== الهيدر ===== */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            marginBottom: '64px',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(-30px)',
            transition: 'all 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* أيقونة التحذير */}
          <div style={{
            fontSize: '48px',
            marginBottom: '16px',
            display: 'inline-block',
            animation: 'pulse-warn 2.5s ease-in-out infinite',
          }}>
            ⚠️
          </div>

          <h1 style={{
            fontSize: '46px',
            fontWeight: '800',
            color: '#3a2555',
            marginBottom: '14px',
            letterSpacing: '-0.5px',
          }}>
            مخاطر جيل Z
          </h1>

          {/* الشريط المتحرك */}
          <div style={{
            display: 'inline-block',
            padding: '6px 24px',
            borderRadius: '50px',
            background: 'linear-gradient(135deg, #f0eaff, #e8deff)',
            border: '1px solid #d4bfee',
            marginBottom: '20px',
            animation: 'float-badge 3s ease-in-out infinite',
          }}>
            <span style={{ fontSize: '14px', color: '#7c6fcd', fontWeight: '700' }}>
              جيل رقمي ... يواجه تحديات نفسية حقيقية
            </span>
          </div>

          <p style={{
            fontSize: '16px',
            color: '#8070a8',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.8',
          }}>
            جيل Z هو الجيل الأكثر ارتباطاً بالعالم الرقمي.
            <br />
            ومع هذا الارتباط ظهرت مجموعة من التحديات النفسية والسلوكية التي تؤثر على الصحة العقلية و جودة الحياة.
          </p>

          {/* خط زخرفي */}
          <div style={{
            width: '120px',
            height: '3px',
            borderRadius: '10px',
            background: 'linear-gradient(90deg, transparent, #9b7fc7, #c97099, transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer-line 3s linear infinite',
            margin: '28px auto 0',
          }} />
        </div>

        {/* ===== الشبكة ===== */}
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div className="risk-grid">
            {riskFactors.map((factor, i) => (
              <RiskCard key={factor.id} factor={factor} index={i} />
            ))}
          </div>

          {/* ===== كارد تذكر ===== */}
          <RememberCard />

          {/* ===== زر الرئيسية ===== */}
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '13px 36px',
                fontSize: '16px',
                fontWeight: '700',
                fontFamily: "'Tajawal', sans-serif",
                background: 'linear-gradient(135deg, #9b7fc7, #7c6fcd)',
                color: 'white',
                border: 'none',
                borderRadius: '50px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
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
        </div>
      </div>
    </>
  );
}

function RememberCard() {
  const [ref, visible] = useRevealOnScroll();

  return (
    <div
      ref={ref}
      style={{
        marginTop: '56px',
        background: 'linear-gradient(135deg, #f8f4ff, #fdf0f8)',
        border: '2px solid #e0d0f5',
        borderRadius: '24px',
        padding: '32px 36px',
        textAlign: 'center',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.97)',
        transition: 'all 0.65s cubic-bezier(0.34, 1.4, 0.64, 1)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* زخرفة خلفية */}
      <div style={{
        position: 'absolute',
        top: '-40px',
        left: '-40px',
        width: '150px',
        height: '150px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #d4bfee30, transparent)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-40px',
        right: '-40px',
        width: '130px',
        height: '130px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, #f0c0d830, transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '16px',
        }}>
          <span style={{ fontSize: '22px' }}>💟</span>
          <span style={{ fontSize: '24px', fontWeight: '800', color: '#5a3a85' }}>تذكّر</span>
        </div>

        <p style={{
          fontSize: '16px',
          color: '#6b5a8a',
          lineHeight: '2',
          maxWidth: '680px',
          margin: '0 auto',
        }}> طلب المساعدة ليس ضعفًا، بل هو خطوة شجاعة نحو حياة أفضل...اهتم بصحتك النفسية كما تهتم بصحتك الجسدية Be Knd to Yourself (كن لطيفًا مع نفسك) تذكّر أن التعافي يحتاج وقتًا، وأنك لست وحدك في هذه التجربة. </p>
      </div>
    </div>
  );
}

export default RiskFactors;