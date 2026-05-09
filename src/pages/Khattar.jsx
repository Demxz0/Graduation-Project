import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const riskFactors = [
  {
    id: 1,
    icon: '📉',
    iconBg: '#f3e8ff',
    titleAr: 'انخفاض تقدير الذات',
    titleEn: 'Low Self-Esteem',
    desc:'يرتبط تقدير الذات بعدد الإعجابات والمتابعين، مما يجعل الشخص يشعر بقيمته فقط من خلال تقييم الآخرين، ويزيد من الحساسية للنقد أو التجاهل.',
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
    desc: 'قضاء ساعات طويلة على الهاتف أو التطبيقات يؤدي إلى إدمان سلوكي، يضعف التركيز، يقلل الإنتاجية، ويجعل من الصعب الانفصال عن العالم الرقمي أو الاستمتاع بالواقع.',
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
    desc:'التعرض اليومي لمحتوى مثالي ومفلتر يخلق معايير غير واقعية للجمال والنجاح، مما يؤدي إلى مقارنة مستمرة بالآخرين، شعور بالنقص، وعدم الرضا عن الحياة أو الشكل الشخصي.',
    color: '#6e91a7',
    borderColor: '#b0cedd',
    bg: '#f3f8fb',
  },
  {
    id: 4,
    icon: ' 🎮',
    iconBg: '#fff0f5',
    titleAr: 'الألعاب الإلكترونية',
    titleEn: 'Games',
    desc:'بعض الألعاب الإلكترونية قد تزرع أو تحتوي أفكار غير مناسبة أو انتحارية , بالإضافة الى أسلوب لعب مُسبب للإدمان مُدمر لصحة العقل والصحة النفسية , خصوصًا لدى الأطفال والمراهقين.',
    color: '#c97099',
    borderColor: '#e8b0cc',
    bg: '#fdf5f9',
  },
  {
    id: 5,
    icon: ' 🎧',
    iconBg: '#eef3ff',
    titleAr: 'إدمان الموسيقى',
    titleEn: 'Music addication',
    desc:'تحتوي الموسيقى ترددات تتلاعب في طريقة فرز الدماغ للهرمونات المسؤولة عن المشاعر، مما يؤدي الى المبالغة في الإحساس بأي شعور , الذي بدوره يخلق مشاعر مزيفة قد تجعل الشخص يستخدم الموسيقى ك وسيلة هروب من الواقع.',
    color: '#7c6fcd',
    borderColor: '#bab3e8',
    bg: '#f5f3ff',
  },
  {
    id: 6,
    icon: ' 🚫',
    iconBg: '#fffbea',
    titleAr:'المحتوى غير اللائق',
    titleEn:'IInappropriate Content',
    desc:'التعرض للمحتوى الجنسي يؤثر على التفكير والسلوك، وقد يسبب تشوشًا في القيم وصعوبة في التمييز بين الصحيح والخطأ.',
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
    desc:'الانتشار السريع للمعلومات غير الدقيقة عبر المنصات الرقمية يؤدي إلى تكوين مفاهيم خاطئة لدى جيل Z و يزيد من مستويات القلق و التشويش الفكري, مما يؤثر سلباً على قدرتهم في اتخاذ قرارات واعية مبنية على معلومات موثوقة..',
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
    desc:'رغم كثرة التواصل الرقمي، يقل التواصل الواقعي، مما يؤدي إلى شعور بالوحدة، ضعف المهارات الاجتماعية، وصعوبة بناء علاقات عميقة',
    color: '#4aab72',
    borderColor: '#9dd4b5',
    bg: '#f4fdf8',
  },
   {
    id: 10,
    icon: '🔪',
    iconBg: '#fae8e8',
    titleAr: 'المحتوى العنيف',
    titleEn: 'Violent Content',
    desc:'مشاهدة العنف بشكل متكرر قد تؤدي إلى تطبيع العنف، بحيث يصبح أمرًا عاديًا في نظر الشخص. هذا قد يزيد من السلوك العدواني أو يقلل من التعاطف مع الآخرين',
    color: '#925c5c',
    borderColor: '#946868',
    bg: '#f7efef',
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

function RiskCard({ factor, index, isSelected, onToggle }) {
  const [ref, visible] = useRevealOnScroll();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        /* تطبيق تأثير  (Glassmorphism) */
        background: hovered || isSelected ? factor.bg : 'rgba(255, 255, 255, 0.65)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `2px solid ${hovered || isSelected ? factor.color + '80' : 'rgba(255, 255, 255, 0.5)'}`,
        borderRadius: '20px',
        padding: '30px 15px 25px 15px',
        position: 'relative',
        cursor: 'default',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: visible
          ? hovered ? 'translateY(-6px) scale(1.02)' : 'translateY(0) scale(1)'
          : 'translateY(50px) scale(0.96)',
        opacity: visible ? 1 : 0,
        transitionDelay: visible ? `${index * 80}ms` : '0ms',
        boxShadow: hovered || isSelected
          ? `0 16px 40px ${factor.color}25, 0 0 20px ${factor.color}40`
          : '0 4px 15px rgba(0,0,0,0.03)',
        direction: 'rtl',
        display: 'flex',
        flexDirection: 'column',
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
            color: hovered || isSelected ? factor.color : '#2d1f4a',
            transition: 'color 0.3s',
            lineHeight: 1.3,
          }}>
            {factor.titleAr}
          </div>

          <div style={{
            fontSize: '10px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            color: hovered || isSelected ? factor.color + 'aa' : '#b0a0c8',
            transition: 'color 0.3s',
            marginTop: '4px'
          }}>
            {factor.titleEn}
          </div>
        </div>
      </div>

      <div style={{
        fontSize: '14px',
        color: '#7a6a98',
        lineHeight: '1.8',
        textAlign: 'justify',
        transition: 'color 0.3s',
        flexGrow: 1,
      }}>
        {factor.desc}
      </div>

      {/* زر التقييم الذاتي */}
      <button
        onClick={() => onToggle(factor.id)}
        style={{
          width: '100%',
          padding: '10px',
          marginTop: '20px',
          borderRadius: '12px',
          border: `1px solid ${isSelected ? factor.color : factor.color + '50'}`,
          background: isSelected ? factor.color : 'transparent',
          color: isSelected ? 'white' : factor.color,
          fontSize: '14px',
          fontWeight: '700',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontFamily: "'Tajawal', sans-serif",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
        onMouseEnter={(e) => {
          if (!isSelected) e.currentTarget.style.background = factor.color + '15';
        }}
        onMouseLeave={(e) => {
          if (!isSelected) e.currentTarget.style.background = 'transparent';
        }}
      >
        {isSelected ? (
          <><span>✓</span> أدرك هذا التحدي</>
        ) : (
          <>أواجه هذا التحدي ✋</>
        )}
      </button>

      {/* خط ملون يظهر عند الهوفر */}
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
  const messageRef = useRef(null);

  // حالة التقييم الذاتي مع حفظها في LocalStorage
  const [selectedRisks, setSelectedRisks] = useState(() => {
    try {
      const saved = localStorage.getItem('userRiskReflections');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('userRiskReflections', JSON.stringify(selectedRisks));
  }, [selectedRisks]);

  const handleToggleRisk = (id) => {
    setSelectedRisks((prev) =>
      prev.includes(id) ? prev.filter((riskId) => riskId !== id) : [...prev, id]
    );
  };

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
        @keyframes blob-drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes star-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-18px) scale(1.1); opacity: 0.9; }
        }
        
        .risk-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 60px;
          position: relative;
          z-index: 1;
        }
        @media (min-width: 901px) {
          .risk-grid > div:last-child {
            grid-column: 1 / -1;
            max-width: 360px;
            margin: 0 auto;
            width: 100%;
          }
        }

        @media (max-width: 900px) {
          .risk-grid { grid-template-columns: repeat(2, 1fr); gap: 40px; }
        }

        @media (max-width: 600px) {
          .risk-grid { grid-template-columns: 1fr; gap: 30px; }
        }
      `}</style>

      <div className="responsive-padding-main" style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #faf8ff 0%, #f0ecff 50%, #fdf6ff 100%)',
        direction: 'rtl',
        fontFamily: "'Tajawal', sans-serif",
        padding: '40px 20px',
        position: 'relative',
        overflow: 'hidden', 
      }}>

        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            padding: '40px 32px 52px',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '30px',
            zIndex: 1,
          }}
        >
          {/* خلفية دوائر */}
          {[
            { top: '-60px', right: '-80px', size: 320, color: '#d4bfee18' },
            { bottom: '-40px', left: '-60px', size: 240, color: '#c0e8d820' },
          ].map((c, i) => (
            <div key={i} style={{
              position: 'absolute', borderRadius: '50%',
              width: c.size, height: c.size,
              background: `radial-gradient(circle, ${c.color}, transparent)`,
              top: c.top, right: c.right, bottom: c.bottom, left: c.left,
              pointerEvents: 'none',
            }} />
          ))}

          {/* نقاط متحركة */}
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: `${5 + (i * 2) % 6}px`,
              height: `${5 + (i * 2) % 6}px`,
              borderRadius: '50%',
              background: `rgba(155,127,199,${0.2 + (i % 4) * 0.1})`,
              top: `${10 + (i * 14) % 80}%`,
              left: `${5 + (i * 13) % 90}%`,
              animation: `star-float ${2.5 + i * 0.4}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              pointerEvents: 'none',
            }} />
          ))}

          <h1
            className="hero-title"
            style={{
              fontSize: '52px',
              fontWeight: '800',
              color: '#3a2555',
              marginBottom: '16px',
              letterSpacing: '-0.5px',
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s',
            }}
          >
            مخاطر جيل Z
          </h1>

          <p style={{
            fontSize: '17px',
            color: '#8070a8',
            maxWidth: '540px',
            margin: '0 auto 20px',
            lineHeight: '1.85',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(18px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s',
          }}>
            جيل Z هو الجيل الأكثر ارتباطًا بالعالم الرقمي،
            <br />
            ومع هذا الارتباط ظهرت مجموعة من التحديات النفسية والسلوكية التي تؤثر على الصحة العقلية وجودة الحياة.
          </p>

          <div style={{
            width: '100px', height: '3px', borderRadius: '10px',
            margin: '0 auto',
            background: 'linear-gradient(90deg, transparent, #9b7fc7, #c97099, transparent)',
            backgroundSize: '200% 100%',
            animation: 'shimmer-line 3s linear infinite',
            opacity: headerVisible ? 1 : 0,
            transition: 'opacity 0.7s ease 0.4s',
          }} />
        </div>

        {/* ===== الشبكة ===== */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div className="risk-grid">
            {riskFactors.map((factor, i) => (
              <RiskCard 
                key={factor.id} 
                factor={factor} 
                index={i} 
                isSelected={selectedRisks.includes(factor.id)}
                onToggle={handleToggleRisk}
              />
            ))}
          </div>

          {/* ===== رسالة الدعم بناءً على التقييم الذاتي ===== */}
          {selectedRisks.length > 0 && (
            <div 
              ref={messageRef}
              style={{
                marginTop: '60px',
                padding: '25px',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: '20px',
                textAlign: 'center',
                border: '1px solid #d4bfee',
                color: '#3a2555',
                animation: 'fadeSlideDown 0.6s ease-out',
                boxShadow: '0 10px 30px rgba(124, 111, 205, 0.1)',
                maxWidth: '600px',
                margin: '60px auto 0 auto',
              }}
            >
              <h3 style={{ marginBottom: '12px', color: '#7c6fcd', fontSize: '20px', fontWeight: '800' }}>
                خطوة رائعة نحو الوعي! 🌟
              </h3>
              <p style={{ fontSize: '15px', margin: 0, lineHeight: '1.8', color: '#6a5a8a' }}>
                لقد قمت بتحديد <strong>{selectedRisks.length}</strong> من التحديات التي قد تواجهها. 
                الاعتراف بالمشكلة هو أول خطوة وأهمها للتعامل معها بوعي. تذكر دائمًا أنك لست وحدك، 
                وأن التحكم في تأثير العالم الرقمي يبدأ بقرارك الشخصي.
              </p>
            </div>
          )}

        {/* ===== زر الرئيسية ===== */}
<div style={{ textAlign: 'center', marginTop: '60px' }}>
  <button
    onClick={() => navigate('/')}
    style={{
      padding: '13px 36px',
      fontSize: '16px',
      fontWeight: '700',
      fontFamily: "'Tajawal', sans-serif",
      background: 'linear-gradient(135deg, #b66b8e, #6a4f96f1)', 
      color: 'white',
      border: 'none',
      borderRadius: '50px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 4px 20px rgba(106, 79, 150, 0.4)', 
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'scale(1.06)';
      e.currentTarget.style.boxShadow = '0 8px 28px rgba(106, 79, 150, 0.55)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(106, 79, 150, 0.4)';
    }}
  >
    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span>الذهاب إلى الرئيسية</span>
    </span>
  </button>
</div>
        </div>
      </div>
    </>
  );
}

export default RiskFactors;