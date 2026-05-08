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
    desc: 'أنشطة ذات معنى يومي تُعطي حافزًا للاستمرار والنمو',
    color: '#e57399',
    border: '#f4b8cc',
  },
   {
    icon: '🤝',
    iconBg: '#fffde7',
    title: 'المجتمع',
    desc: 'علاقات ودعم اجتماعي يُخفف العزلة ويُعزز الشعور بالانتماء',
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


// ===== المكون الرئيسي =====
function Recovery() {
  const navigate = useNavigate();
  const [headerRef, headerVisible] = useReveal();
  const [unlockedStep, setUnlockedStep] = useState(1);

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
        @keyframes star-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-18px) scale(1.1); opacity: 0.9; }
        }
        .pillar-card:hover {
          transform: translateY(-6px) scale(1.02) !important;
        }
          
        @media (max-width: 768px) {
          .pillars-grid { grid-template-columns: 1fr 1fr !important; }
          .recovery-types-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 38px !important; }
        }
        @media (max-width: 480px) {
          .pillars-grid { grid-template-columns: 1fr !important; }
          .hero-title { font-size: 30px !important; }
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
           ما تمّر به ليس غريباً، بل طريق سار فيه كثيرون قبلك، ووجدوا في نهايته هدوءًا وتوازناً من جديد
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

          {/* ===== بوكس تعريف التعافي ===== */}
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
                تُعرّفه الجهات الصحية العالمية كعملية تغيير تساعد الشخص على تحسين صحته، واتخاذ قراراته بنفسه، والوصول إلى إمكاناته<br/>
                التعافي من الاضطرابات النفسية ليس أمراً مستحيلاً، بل هو واقع يعيشه كثير من الناس حول العالم. مرّ ملايين الأفراد بتجارب مشابهة، وتمكنوا من بناء حياة مستقرة وذات معنى رغم التحديات.
                <br /><br />
                <span style={{ color: '#9b7fc7', fontWeight: '700' }}>التعافي يعني أيضاً</span>  القدرة على إدارة الأعراض والعيش بشكل متوازن. <br/> تُشير الأبحاث إلى أن الدعم المناسب، والعلاج الصحيح، ونمط الحياة الصحي يمكن أن يُحدث فرقاً كبيراً في رحلة التعافي.
              </p>
            </div>
          </RevealCard>

          {/* ===== ما هو التعافي النفسي ===== */}
          <RevealCard delay={200} style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '13px', height: '13px', borderRadius: '50%',
                background: '#7fc2c7', boxShadow: '0 0 10px #7fc7bb80',
                animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0,
              }} />
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#3a2555', margin: 0 }}>
              انواع التعافي النفسي:
              </h3>
            </div>
           
          </RevealCard>

          {/* ===== انواع التعافي ===== */}
          <div
            className="recovery-types-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '52px' ,}}
          >
            {[
              {
                icon:'⚕️',
                label: 'التعافي السريري',
                en: 'Clinical Recovery',
                desc:'يركز على تقليل الأعراض وتحسّن الحالة وفق تقييم الطبيب المتخصص. يُقاس بمعايير موضوعية وعلمية، ويُتابع من خلال برامج علاجية منظمة , و قد يتضمن هذا النوع تناول أدوية حسب وصفة الطبيب .' ,
                color: '#cab7eb',
                bg: '#f0f7fb',
                delay: 320,
              },
              {
                icon:"🌱",
                label: 'التعافي الشخصي',
                en: 'Personal Recovery',
                desc: 'رحلة فردية تهدف إلى بناء حياة ذات معنى، حتى مع وجود بعض الأعراض. يعتمد على القوة الداخلية، والأهداف الشخصية، والتعامل الإيجابي مع التحديات.',
                color: '#aacca0',
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
                  <div style={{
                    display: 'flex', justifyContent: 'flex-start', alignItems: 'center',
                    marginBottom: '16px', gap: '12px',
                  }}>
                     <div style={{
                      width: '44px', height: '44px',borderRadius: '12px',
                      background: type.color, color: 'white',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '16px', fontWeight: '900', flexShrink: 0,
                    }}>
                      {type.icon}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                     <div style={{ fontSize: '17px', fontWeight: '800', color: '#3a2555' }}>{type.label}</div>
                     <div style={{ fontSize: '12px', color: type.color, fontStyle: 'italic' }}>{type.en}</div>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.8', margin: 0, textAlign: 'right' }}>
                    {type.desc}
                  </p>
                </div>
              </RevealCard>
            ))}
          </div>

          {/* ===== ما هو التعافي الحقيقي؟ ===== */}
          <RevealCard delay={100} style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <div style={{
                width: '13px', height: '13px', borderRadius: '50%',
                background: '#4aab72', boxShadow: '0 0 10px #4aab7280',
                animation: 'pulse-dot 2s ease-in-out infinite 0.5s', flexShrink: 0,
              }} />
              <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#3a2555', margin: 0 }}> ما هو التعافي الحقيقي؟ </h2>
            </div>
             <p style={{ fontSize: '14px', color: '#9586b0', textAlign: 'right', marginBottom: '20px' }}>
              لم يعد التعافي يُفهم فقط على أنه اختفاء الأعراض، بل أصبح مفهومًا أوسع يشمل جودة الحياة والقدرة على التكيف
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
التعافي ليس مجرد اختفاء الأعراض. قد تنخفض الأعراض لفترة (هدأة)، لكن التعافي الحقيقي أعمق من ذلك — هو بناء مرونة نفسية تساعد على مواجهة الضغوط، تقليل الانتكاسات، والاستمرار في الحياة بشكل طبيعي.
                </p>
              </div>
            </div>
          </RevealCard>

         {/* ===== الأركان الأربعة ===== */}
        <RevealCard delay={100} style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{
              width: '13px', height: '13px', borderRadius: '50%',
              background: '#c77f7f', boxShadow: '0 0 10px #c77f7f80',
              animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0,
            }} />
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#3a2555', margin: 0 }}>
              الأركان الأربعة للتعافي
            </h3>
          </div>
          <p style={{ fontSize: '14px', color: '#9586b0', textAlign: 'right' }}>
            يرتكز التعافي على أربعة عناصر أساسية تُكمل كل منها الآخر
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

         {/* ===== استراتيجيات - خريطة الرحلة  ===== */}
        <RevealCard delay={100} style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <div style={{
              width: '13px', height: '13px', borderRadius: '50%',
              background: '#c7b07f', boxShadow: '0 0 10px #c7b07f80',
              animation: 'pulse-dot 2s ease-in-out infinite', flexShrink: 0,
            }} />
            <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#3a2555', margin: 0 }}>
              خريطة استراتيجيات التعافي
            </h3>
          </div>
          <p style={{ fontSize: '14px', color: '#9586b0', textAlign: 'right' }}>
            خطوات عملية وعلمية تدعم رحلتك نحو حياة أكثر توازنًا... عندما تشعر انك مستعد اضغط للانتقال للخطوة التالية من الرحلة!
          </p>
        </RevealCard>

        {/*  الخريطة التفاعلية */}
        <div style={{ position: 'relative', marginBottom: '60px' }}>
          
          <div style={{
            position: 'absolute', top: '20px', bottom: '20px', right: '18px',
            width: '4px', background: '#ebe6f7', borderRadius: '4px', zIndex: 1
          }} />
          
          <div style={{
            position: 'absolute', top: '20px', right: '18px',
            width: '4px', background: 'linear-gradient(180deg, #9b7fc7, #e57399)',
            height: `calc(${(unlockedStep - 1) / (strategies.length - 1)} * 100% - 20px)`,
            borderRadius: '4px', zIndex: 2, 
            transition: 'height 0.8s cubic-bezier(0.22, 1, 0.36, 1)'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', zIndex: 3 }}>
            {strategies.map((s, i) => {
              const isUnlocked = s.num <= unlockedStep;
              const isCurrent = s.num === unlockedStep;
              const isCompleted = s.num < unlockedStep;

              return (
                <RevealCard key={i} delay={i * 50}>
                  <div style={{
                    display: 'flex', gap: '20px', alignItems: 'flex-start',
                    opacity: isUnlocked ? 1 : 0.45,
                    transform: isUnlocked ? 'scale(1) translateX(0)' : 'scale(0.98) translateX(10px)',
                    filter: isUnlocked ? 'none' : 'grayscale(100%)',
                    transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}>
                    
                    <div style={{
                      width: '40px', height: '40px', borderRadius: '50%', flexShrink: 0,
                      background: isCompleted ? '#9b7fc7' : (isCurrent ? s.color : '#f0ecff'),
                      color: isCompleted || isCurrent ? 'white' : '#9b7fc7', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '18px', fontWeight: '800', zIndex: 4,
                      boxShadow: isCurrent ? `0 0 15px ${s.color}60` : (isCompleted ? '0 0 10px #9b7fc750' : 'none'),
                      transition: 'all 0.5s ease'
                    }}>
                      {isCompleted ? '✓' : s.num}
                    </div>

                    <div style={{
                      background: 'white', 
                      border: `2px solid ${isCurrent ? s.color : '#ebe6f7'}`,
                      borderRadius: '18px', padding: '24px', flexGrow: 1,
                      boxShadow: isCurrent ? `0 8px 24px ${s.color}15` : '0 2px 10px rgba(0,0,0,0.03)',
                      transition: 'all 0.4s',
                      position: 'relative', overflow: 'hidden'
                    }}>
                      {isCurrent && (
                        <div style={{
                          position: 'absolute', top: 0, right: 0, bottom: 0, left: 0,
                          background: s.bg, opacity: 0.5, zIndex: 0, pointerEvents: 'none'
                        }}/>
                      )}

                      <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{ fontWeight: '800', fontSize: '18px', color: '#3a2555', marginBottom: '8px' }}>
                          {s.title}
                        </div>
                        <p style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.75', margin: 0 }}>
                          {s.desc}
                        </p>

                        {/* زر الانتقال للخطوة التالية */}
                        {isCurrent && s.num < strategies.length && (
                          <button
                            onClick={() => setUnlockedStep(s.num + 1)}
                            style={{
                              marginTop: '20px', padding: '10px 24px',
                              background: s.color, color: 'white', 
                              border: 'none', borderRadius: '25px',
                              cursor: 'pointer', fontSize: '14px', fontWeight: '700',
                              display: 'flex', alignItems: 'center', gap: '8px',
                              transition: 'transform 0.2s',
                            }}
                            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                          >
                            مستعد للخطوة التالية <span>🔓</span>
                          </button>
                        )}
                        
                        {/* رسالة النهاية عند الوصول لآخر خطوة */}
                        {isCurrent && s.num === strategies.length && (
                          <div style={{
                              marginTop: '20px', padding: '10px 24px',
                              background: '#f5f0ff', color: '#6b4fa0', 
                              borderRadius: '25px', border: '1px solid #d4bfee',
                              fontSize: '14px', fontWeight: '700', display: 'inline-block'
                          }}>
                          الآن انت تمتلك المعرفة الكافية ب استراتيجيات التعافي ..استمر! 🌟
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </RevealCard>
              );
            })}
          </div>
        </div>

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