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

// ===== بيانات اللعبة =====
const gameFeatures = [
  { icon: '🎵', label: 'موسيقى مدروسة' },
  { icon: '🏠', label: 'بيت فيه عدة غرف' },
  { icon: '🎮', label: 'أسلوب فني Low Poly' },
  { icon: '⚡', label: 'الغاز وتوعية' },
];

export default function Game() {
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
        @keyframes shimmer-line {
          0% { background-position: 200% center; }
          100% { background-position: -200% center; }
        }
        @keyframes star-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-18px) scale(1.1); opacity: 0.9; }
        }
        .game-feature-tag:hover {
          transform: translateY(-2px) scale(1.04);
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

        {/* ===== Hero (استمتع وتعلّم) ===== */}
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
            استمتع وتعلّم
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
            تجربة تفاعلية تأخذك في رحلة داخل عالم رمزي واسع عن الصحة النفسية
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
              تأخذك في رحلة داخل عالم رمزي واسع، حيث تمثل كل منطقة اضطرابًا نفسيًا مختلفًا. يتقدم اللاعب عبر تجاوز تحديات مستوحاة من الواقع، باستخدام أساليب مثبتة علميًا للتعامل مع هذه الاضطرابات والتخفيف منها. 
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
                 تقدم منطقة واحدة تركز على اضطراب القلق، داخل منزل يحتوي على عدة غرف، كل منها يمثل نوًعا من القلق.يتعين على اللاعب حل الألغاز، واستكشاف الملاحظات الصوتية والمكتوبة التي تقدم محتوى توعوًيا حول القلق وطرق التعامل معه.
                 </p>
                <p style={{ fontSize: '14px', color: '#7a6a98', lineHeight: '1.85', margin: 0 }}>
                 يعتمد نظام اللعب على مقياس يظهر مستوى القلق لدى الالعب، والذي يرتفع بسبب المحفزات داخل البيئة وقد يصل إلى نوبة هلع، وينخفض عبر اتخاذ قرارات صحيحة واستخدام تقنيات مثل التنفس السليم
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
                  <iframe
                    ref={iframeRef}
                    src="https://demxz0.github.io/AnxietyRecoverBuild/"
                    style={{ width: '100%', height: '100%', minHeight: '320px', border: 'none' }}
                    title="Mental Health Game"
                  />
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
                  background:'linear-gradient(135deg,  #b66b8e , #6a4f96f1)',
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