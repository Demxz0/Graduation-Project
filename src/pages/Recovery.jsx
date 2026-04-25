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

// ===== بيانات =====
const pillars = [
     {
    icon: '🏠',
    iconBg: '#ede7f6',
    title: 'المنزل',
    desc: 'بيئة مستقرة وآمنة تُشعر الشخص بالأمان والانتماء',
    color: '#9b7fc7',
    border: '#d4bfee',
  },
  {
    icon: '🎯',
    iconBg: '#fce4ec',
    title: 'الهدف',
    desc: 'أنشطة ذات معنى كل يوم تُطيل حافزاً للاستمرار والنمو',
    color: '#e57399',
    border: '#f4b8cc',
  },
   {
    icon: '💛',
    iconBg: '#fffde7',
    title: 'المجتمع',
    desc: 'علاقات ودعم اجتماعي يُخفف العبء ويُعزز الشعور بالانتماء',
    color: '#f4c842',
    border: '#f4e8a8',
  },
  {
    icon: '💚',
    iconBg: '#e8f5e9',
    title: 'الصحة',
    desc: 'عادات صحية واتخاذ قرارات سليمة للجسم والعقل',
    color: '#4aab72',
    border: '#b8e8c8',
  },
];

const strategies = [
  {
    num: 1,
    title: 'الالتزام بالعلاج',
    desc: 'عدم التوقف عن الدواء دون استشارة الطبيب، والمتابعة المنتظمة مع المختص النفسي',
    color: '#9b7fc7',
    bg: '#f5f0ff',
  },
  {
    num: 2,
    title: 'نمط حياة صحي',
    desc: 'رياضة منتظمة، نوم كافٍ ومنتظم، وتغذية متوازنة تدعم صحة الدماغ والجسم',
    color: '#7c9fc7',
    bg: '#f0f5ff',
  },
  {
    num: 3,
    title: 'الدعم الاجتماعي',
    desc: 'الأصدقاء، العائلة، ومجموعات الدعم – وجود أشخاص تثق بهم يُسرّع التعافي',
    color: '#4aab72',
    bg: '#f0fff8',
  },
  {
    num: 4,
    title: 'تنظيم الأفكار والمشاعر',
    desc: 'معالجة الأفكار السلبية وتعديلها من خلال تقنيات العلاج المعرفي السلوكي (CBT)',
    color: '#d6936a',
    bg: '#fff8f0',
  },
];

const gameFeatures = [
  { icon: '🎵', label: 'موسيقى مدروسة' },
  { icon: '🏠', label: 'بيت فيه عدة غرف' },
  { icon: '🎮', label: 'أسلوب فني Low Poly' },
  { icon: '⚡', label: 'الغاز وتوعية' },
];

// ===== المكون الرئيسي =====
function Recovery() {
  const navigate = useNavigate();
  const [headerRef, headerVisible] = useReveal();
  const [gameStarted, setGameStarted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const gameContainerRef = useRef(null);
  const iframeRef = useRef(null);

  function handleStartGame() {
    setGameStarted(true);
  }

  function handleFullscreen() {
    const container = gameContainerRef.current;
    if (!container) return;
    if (!document.fullscreenElement) {
      container.requestFullscreen && container.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen && document.exitFullscreen();
      setIsFullscreen(false);
    }
  }

  useEffect(() => {
    const handleFSChange = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    return () => document.removeEventListener('fullscreenchange', handleFSChange);
  }, []);

  return (
    <>
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.6; }
        }
        @keyframes float-anim {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer-line {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes star-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-18px) scale(1.1); opacity: 0.9; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .pillar-card:hover {
          transform: translateY(-6px) scale(1.02) !important;
        }
        .strategy-card:hover {
          transform: translateX(-5px) !important;
          box-shadow: 0 10px 30px rgba(107,79,160,0.12) !important;
        }
        .game-feature-tag:hover {
          transform: translateY(-2px) scale(1.04);
        }
        @media (max-width: 768px) {
          .pillars-grid { grid-template-columns: 1fr 1fr !important; }
          .strategies-grid { grid-template-columns: 1fr !important; }
          .recovery-types-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 38px !important; }
          .section-wrapper { padding: 40px 16px !important; }
        }
        @media (max-width: 480px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 30px !important; }
        }
        .game-container:-webkit-full-screen {
          width: 100vw !important;
          height: 100vh !important;
          background: #000;
        }
        .game-container:fullscreen {
          width: 100vw !important;
          height: 100vh !important;
          background: #000;
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
            padding: '70px 32px 52px',
            position: 'relative',
            overflow: 'hidden',
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
            رحلة التعافي
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
            ما تقره ليس غريبًا، بل طريق سار فيه كثيرون قبلك. وجدوا في نهايته هدوءاً وتوازناً من جديد
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

        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>

          {/* ===== التعافي section header ===== */}
          <RevealCard delay={100} style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '13px', height: '13px', borderRadius: '50%',
                background: '#9b7fc7', boxShadow: '0 0 10px #9b7fc780',
                animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0,
              }} />
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#3a2555', margin: 0 }}>التعافي</h2>
            </div>
          </RevealCard>

          {/* ===== بوكس  تعريف التعافي ===== */}
          <RevealCard delay={150} style={{ marginBottom: '28px' }}>
            <div style={{
              background: 'white',
              border: '2px solid #ebe6f7',
              borderRadius: '20px',
              padding: '28px 32px',
              boxShadow: '0 4px 20px rgba(107,79,160,0.07)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: 0, right: 0,
                width: '5px', height: '100%',
                background: 'linear-gradient(180deg, #9b7fc7, #c97099)',
                borderRadius: '0 20px 20px 0',
              }} />
              <p style={{ fontSize: '15px', color: '#5a4a7a', lineHeight: '2.1', margin: 0, textAlign: 'right' }}>
                التعافي من الاضطرابات النفسية ليس أمراً مستحيلاً، بل هو واقع يعيشه كثير من الناس حول العالم. من ملايين الأفراد بتجارب مشابهة، وتمكنوا من بناء حياة مستقرة وذات معنى رغم التحديات.
                <br /><br />
                <span style={{ color: '#9b7fc7', fontWeight: '700' }}>التعافي لا يعني بالضرورة اختفاء الأعراض</span> (هدفاً). بل القدرة على إدارتها والعيش بشكل متوازن. تُشير الأبحاث إلى أن الدعم الاجتماعي، والعلاج الصحيح، ونمط الحياة الصحي يمكن أن يُحدث فرقاً كبيراً في رحلة التعافي.
              </p>
            </div>
          </RevealCard>

          {/* ===== ما هو التعافي النفسي ===== */}
          <RevealCard delay={200} style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#3a2555', textAlign: 'right', marginBottom: '8px' }}>
              ما هو التعافي النفسي؟
            </h3>
            <p style={{ fontSize: '14px', color: '#9586b0', textAlign: 'right', marginBottom: '20px' }}>
              تم نعد التعافي على أنه اختفاء الأعراض فقط، بل أصبح مفهوماً أوسع يشمل جودة الحياة والقدرة على التكيف
            </p>
          </RevealCard>

          {/* ===== نوعا التعافي ===== */}
          <div
            className="recovery-types-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '52px' ,}}
          >
            {[
                 {
                icon:'⚕️',
                label: 'التعافي السريري',
                en: 'Clinical Recovery',
                desc: 'يركز على تقليل الأعراض وتحسين الحالة وفق تقييم الطبيب المتخصص. يُقاس بمعايير موضوعية وعلمية، ويتابع من خلال برامج علاجية منتظمة.',
                iconBg: '#6e91a7',
                bg: '#f0f7fb',
                delay: 320,
              },
              {
                icon:"🌱",
                label: 'التعافي الشخصي',
                en: 'Personal Recovery',
                desc: 'رحلة فردية تهدف إلى بناء حياة ذات معنى، حتى مع وجود بعض الأعراض. يعتمد على القوة الداخلية والأهداف الشخصية والتعامل الإيجابي مع التحديات.',
                iconBg: '#9b7fc7',
                bg: '#f8f4ff',
                delay: 250,
              },
            ].map((type, i) => (
              <RevealCard key={i} delay={type.delay}>
                <div style={{
                  background: 'white',
                  border: '2px solid #ebe6f7',
                  borderRadius: '20px',
                  padding: '28px 24px',
                  height: '100%',
                  transition: 'all 0.3s ease',
                  cursor: 'default',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = `0 14px 36px ${type.color}22`;
                    e.currentTarget.style.borderColor = type.color + '55';
                    e.currentTarget.style.background = type.bg;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = '#ebe6f7';
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  {/* شريط علوي */}
                  <div style={{
                    display: 'flex', justifyContent: 'flex-start', alignItems: 'center',
                    marginBottom: '16px', gap: '8px',
                  }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '17px', fontWeight: '800', color: '#3a2555' }}>{type.label}</div>
                      <div style={{ fontSize: '12px', color: type.color, fontStyle: 'italic' }}>{type.en}</div>
                    </div>
                    <div style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: type.color, color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', fontWeight: '900', flexShrink: 0,
                    }}>
                      {type.icon}
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.8', margin: 0, textAlign: 'right' }}>
                    {type.desc}
                  </p>
                </div>
              </RevealCard>
            ))}
          </div>

          {/* ===== كيف يحدث التعافي ===== */}
          <RevealCard delay={100} style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '13px', height: '13px', borderRadius: '50%',
                background: '#4aab72', boxShadow: '0 0 10px #4aab7280',
                animation: 'pulse-dot 2s ease-in-out infinite 0.5s', flexShrink: 0,
              }} />
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#3a2555', margin: 0 }}>كيف يحدث التعافي؟</h2>
            </div>
            <p style={{ fontSize: '14px', color: '#9586b0', textAlign: 'right', marginRight: '24px' }}>
              تُوجّه الجهات الصحية النفسية كعملية كفيلية تُساعد الشخص على تحسين ضحاه، واتخاذ قراراته بنفسه، والوصول إلى إمكاناته
            </p>
          </RevealCard>

          {/* ===== بطاقة الحقيقة المهمة ===== */}
          <RevealCard delay={180} style={{ marginBottom: '52px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #fefaff, #f5f0ff)',
              border: '2px solid #d4bfee',
              borderRadius: '18px',
              padding: '22px 28px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '16px',
            }}>
              <div style={{ fontSize: '28px', flexShrink: 0, animation: 'float-anim 3.5s ease-in-out infinite' }}>💡</div>
              <div>
                <p style={{ fontSize: '15px', color: '#6b5a8a', lineHeight: '1.85', margin: 0 }}>
                  التعافي ليس مجرد اختفاء الأعراض. (هدفاً) لكن التعافي الحقيقي أعمق من ذلك — هو بناء مرونة نفسية تساعد على مواجهة الضغوط، تقليل الانتكاسات، والاستمرار في الحياة بشكل طبيعي.
                </p>
              </div>
            </div>
          </RevealCard>

          {/* ===== الأركان الأربعة ===== */}
          <RevealCard delay={100} style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#3a2555', textAlign: 'right', marginBottom: '6px' }}>
              الأركان الأربعة للتعافي
            </h3>
            <p style={{ fontSize: '14px', color: '#9586b0', textAlign: 'right' }}>
              يرتكز التعافي على أربعة عناصر أساسية تُكمل كل منها الأخر
            </p>
          </RevealCard>

          <div
            className="pillars-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
              marginBottom: '52px',
            }}
          >
            {pillars.map((p, i) => (
              <RevealCard key={i} delay={i * 100 + 200}>
                <div
                  className="pillar-card"
                  style={{
                    background: 'white',
                    border: `2px solid ${p.border}`,
                    borderRadius: '18px',
                    padding: '24px 16px',
                    textAlign: 'center',
                    transition: 'all 0.35s cubic-bezier(0.34,1.4,0.64,1)',
                    cursor: 'default',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                  }}
                >
                  <div style={{
                    width: '54px', height: '54px',
                    borderRadius: '14px',
                    background: p.iconBg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '26px',
                    margin: '0 auto 14px',
                  }}>
                    {p.icon}
                  </div>
                  <div style={{ fontWeight: '800', fontSize: '17px', color: '#3a2555', marginBottom: '8px' }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#9586b0', lineHeight: '1.7' }}>
                    {p.desc}
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>

          {/* ===== استراتيجيات ===== */}
          <RevealCard delay={100} style={{ marginBottom: '28px' }}>
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#3a2555', textAlign: 'right', marginBottom: '6px' }}>
              استراتيجيات تساعد على التعافي
            </h3>
            <p style={{ fontSize: '14px', color: '#9586b0', textAlign: 'right' }}>
              خطوات عملية وعلمية تدعم رحلتك نحو حياة أكثر توازناً
            </p>
          </RevealCard>

          <div
            className="strategies-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
              marginBottom: '52px',
            }}
          >
            {strategies.map((s, i) => (
              <RevealCard key={i} delay={i * 100 + 200}>
                <div
                  className="strategy-card"
                  style={{
                    background: 'white',
                    border: '2px solid #ebe6f7',
                    borderRadius: '18px',
                    padding: '24px',
                    transition: 'all 0.3s ease',
                    cursor: 'default',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.04)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateX(-5px)';
                    e.currentTarget.style.boxShadow = `0 10px 30px ${s.color}18`;
                    e.currentTarget.style.borderColor = s.color + '55';
                    e.currentTarget.style.background = s.bg;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateX(0)';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.04)';
                    e.currentTarget.style.borderColor = '#ebe6f7';
                    e.currentTarget.style.background = 'white';
                  }}
                >
                  <div style={{
                    position: 'absolute', top: '-12px', left: '16px',
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: s.color, color: 'white',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '14px', fontWeight: '800',
                    boxShadow: `0 4px 12px ${s.color}50`,
                  }}>
                    {s.num}
                  </div>
                  <div style={{ fontWeight: '800', fontSize: '16px', color: '#3a2555', marginBottom: '10px', marginTop: '8px', textAlign: 'right' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: '13px', color: '#7a6a98', lineHeight: '1.75', textAlign: 'right' }}>
                    {s.desc}
                  </div>
                </div>
              </RevealCard>
            ))}
          </div>

          {/* ===== قسم اللعبة ===== */}
          <RevealCard delay={100} style={{ marginBottom: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '13px', height: '13px', borderRadius: '50%',
                background: '#c97099', boxShadow: '0 0 10px #c9709980',
                animation: 'pulse-dot 2s ease-in-out infinite 1s', flexShrink: 0,
              }} />
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#3a2555', margin: 0 }}>استمتع وتعلّم</h2>
            </div>
            <p style={{ fontSize: '14px', color: '#9586b0', textAlign: 'right', marginRight: '24px' }}>
              تجربة تفاعلية لأمّد داخل عالم رمزي واسع من الصحة النفسية
            </p>
          </RevealCard>

          {/* ===== بطاقة اللعبة ===== */}
          <RevealCard delay={200} style={{ marginBottom: '20px' }}>
            <div style={{
              background: 'white',
              border: '2px solid #ebe6f7',
              borderRadius: '24px',
              padding: '32px',
              boxShadow: '0 4px 20px rgba(107,79,160,0.08)',
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#3a2555', textAlign: 'right', marginBottom: '14px' }}>
                لعبة نفسية من منظور الشخص الأول
              </h3>
              <p style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.85', textAlign: 'right', marginBottom: '20px' }}>
                تأخذك في رحلة داخل عالم رمزي واسع، حيث كل منطقة تمثل كل اضطراباً نفسياً مختلفاً. يتقدم اللاعب عبر تحديات مستوحاة من الواقع، باستخدام أساليب مبنية علمياً للتعامل مع هذه الاضطرابات والتخفيف منها. تميز اللعبة بأحوال هادئة ومؤثرة من خلال:
              </p>

              {/* مميزات اللعبة */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'flex-end', marginBottom: '24px' }}>
                {gameFeatures.map((f, i) => (
                  <div
                    key={i}
                    className="game-feature-tag"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      background: '#f5f0ff', border: '1.5px solid #d4bfee',
                      borderRadius: '50px', padding: '7px 14px',
                      fontSize: '13px', color: '#6b4fa0', fontWeight: '600',
                      transition: 'all 0.25s ease', cursor: 'default',
                    }}
                  >
                    <span>{f.label}</span>
                    <span>{f.icon}</span>
                  </div>
                ))}
              </div>

              {/* النسخة الحالية */}
              <div style={{
                background: 'linear-gradient(135deg, #f8f4ff, #f0f8ff)',
                border: '1.5px solid #d4bfee',
                borderRadius: '14px',
                padding: '20px 22px',
                marginBottom: '24px',
                textAlign: 'right',
              }}>
                <div style={{ fontSize: '15px', fontWeight: '700', color: '#3a2555', marginBottom: '10px' }}>
                  النسخة الحالية (Demo):
                </div>
                <p style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.85', margin: '0 0 10px' }}>
                  تقدم منطقة واحدة تركز على اضطراب القلق، داخل منزل يحتوي على عدة غرف. كل منها يمثل نوعاً من القلق. يتعين على اللاعب حل الألغاز، واستكشاف الملاحظات الصوتية والمكتوبة التي تقدم محتوى توعوياً حول القلق وطرق التعامل معه.
                </p>
                <p style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.85', margin: 0 }}>
                  يعتمد نظام اللعب على مقياس يظهر مستوى القلق لدى اللاعب، والذي يرتفع بسبب المحفزات داخل البيئة وقد يصل إلى نوبة هلع. ويُنقص عبر اتخاذ قرارات صحية واستخدام تقنيات مثل التنفس السليم.
                </p>
              </div>

              {/* منطقة اللعبة */}
              <div
                ref={gameContainerRef}
                className="game-container"
                style={{
                  position: 'relative',
                  border: '2px solid #5c3a7a',
                  borderRadius: '12px',
                  background: '#f0eaff',
                  overflow: 'hidden',
                  minHeight: '320px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {!gameStarted ? (
                  /* شاشة البداية */
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '60px 20px',
                    width: '100%',
                    minHeight: '320px',
                  }}>
                    <button
                      onClick={handleStartGame}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '13px 32px',
                        borderRadius: '50px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #5c3a7a, #7c6fcd)',
                        color: 'white',
                        fontSize: '16px',
                        fontWeight: '700',
                        fontFamily: "'Tajawal', sans-serif",
                        cursor: 'pointer',
                        transition: 'all 0.25s ease',
                        boxShadow: '0 6px 20px rgba(92,58,122,0.4)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform = 'scale(1.06)';
                        e.currentTarget.style.boxShadow = '0 10px 28px rgba(92,58,122,0.55)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 6px 20px rgba(92,58,122,0.4)';
                      }}
                    >
                      <span>◄</span>
                      <span>ابدأ اللعبة</span>
                    </button>
                  </div>
                ) : (
                  /* منطقة اللعبة عند البدء */
                  <div style={{ width: '100%', height: '100%', minHeight: '320px', position: 'relative' }}>
                    {/* 
                      هنا سيتم وضع iframe أو canvas للعبة Unity
                      مثال:
                      <iframe
                        ref={iframeRef}
                        src="/game/index.html"
                        style={{ width: '100%', height: '100%', minHeight: '320px', border: 'none' }}
                        title="Mental Health Game"
                      />
                    */}
                    <div style={{
                      width: '100%',
                      height: '100%',
                      minHeight: '320px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, #1a0a2e, #2d1f4a)',
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '15px',
                      fontFamily: "'Tajawal', sans-serif",
                    }}>
                      {/* اللعبة ستُحمَّل هنا */}
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '40px', marginBottom: '12px', animation: 'float-anim 3s ease-in-out infinite' }}>🎮</div>
                        <div>جارٍ تحميل اللعبة...</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* زر التكبير */}
                <button
                  onClick={handleFullscreen}
                  title="تكبير اللعبة"
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    width: '32px',
                    height: '32px',
                    background: 'rgba(255,255,255,0.15)',
                    backdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(255,255,255,0.3)',
                    borderRadius: '7px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    zIndex: 10,
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.3)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
                >
                  {/* أيقونة التكبير */}
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ color: '#5c3a7a' }}>
                    <path d="M1 1h4M1 1v4M15 1h-4M15 1v4M1 15h4M1 15v-4M15 15h-4M15 15v-4"
                      stroke="#5c3a7a" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </div>
            </div>
          </RevealCard>

          {/* ===== زر الرئيسية ===== */}
          <RevealCard delay={100}>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '13px 40px',
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
          </RevealCard>

        </div>
      </div>
    </>
  );
}

export default Recovery;