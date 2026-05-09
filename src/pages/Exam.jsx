import { useState, useEffect, useRef } from 'react';
import ExamModal from './ExamModal';

// ===== Hook الهيدر =====
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

//قائمة الاضطرابات 
const disorders = [
  {
    id: 'anxiety',
    nameAr: 'اضطراب القلق',
    nameEn: 'Anxiety',
    color: '#d6936a',
    bg: '#fdf4ef',
  },
  {
    id: 'depression',
    nameAr: 'الاكتئاب',
    nameEn: 'Depression',
    color: '#9a0000',
    bg: '#fdefef',
  },
  {
    id: 'adhd',
    nameAr: 'اضطراب نقص الانتباه مع فرط النشاط',
    nameEn: 'ADHD',
    color: '#6e91a7',
    bg: '#f4fbff',
  },
  {
    id: 'eating',
    nameAr: 'اضطرابات الأكل',
    nameEn: 'Eating Disorders',
    color: '#b47799',
    bg: '#fdeff7',
  },
  {
    id: 'ptsd',
    nameAr: 'اضطراب ما بعد الصدمة',
    nameEn: 'PTSD',
    color: '#ab9685',
    bg: '#f8f0ea',
  },
];

function Exam() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);
  const [headerRef, headerVisible] = useRevealOnScroll();

  function handleCardClick(id) {
    setSelected(id);
    setShowModal(true);
  }

  return (
    <>
      <style>{`
        @keyframes shimmer-line {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes star-float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-18px) scale(1.1); opacity: 0.9; }
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #faf8ff 0%, #f0ecff 50%, #fdf6ff 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 24px 40px',
        direction: 'rtl',
        fontFamily: "'Tajawal', sans-serif",
      }}>

        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            padding: '20px 32px 52px',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '10px',
            width: '100%',
          }}
        >
          {/* خلفية دوائر */}
          {[
            { top: '-60px', right: 'calc(50% - 250px)', size: 320, color: '#d4bfee18' },
            { bottom: '-40px', left: 'calc(50% - 300px)', size: 240, color: '#c0e8d820' },
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
            اختبار الصحة النفسية
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
            اختر الاضطراب الذي تريد اختبار أعراضه —{' '}
            <strong style={{ color: '#c96fa0' }}>
              الاختبار للتوعية فقط وليس تشخيصاً طبياً
            </strong>
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

        {/* ===== الكاردز ===== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
          maxWidth: '1100px',
          width: '100%',
          justifyContent: 'center',
          
        }}>
          {disorders.map((d) => (
            <div
              className="reveal"
              key={d.id}
              onClick={() => handleCardClick(d.id)}
              style={{
                background: 'white',
                border: '2px solid #c4b1f0',
                borderRadius: '20px',
                padding: '28px 20px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                position: 'relative',
                display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center', 
               alignItems: 'center',     
               minHeight: '200px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 10px 32px ${d.color}30`;
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.background = d.bg;
                e.currentTarget.style.borderColor = d.color + '80';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#c4b1f0';
              }}
            >
              {/* الاسم العربي */}
              <div style={{
                fontSize: '17px',
                fontWeight: '700',
                color: '#3a2555',
                marginBottom: '6px',
                transition: 'color 0.25s',
                
              }}>
                {d.nameAr}
              </div>

              {/* الاسم الإنجليزي */}
              <div style={{
                fontSize: '13px',
                color: '#b0a0c8',
                marginBottom: '16px',
                fontStyle: 'italic',
                transition: 'color 0.25s',
                
              }}>
                {d.nameEn}
              </div>

             
            </div>
          ))}
        </div>
      </div>

      {showModal && selected && (
        <ExamModal
          disorderId={selected}
          onClose={() => {
            setShowModal(false);
            setSelected(null);
          }}
        />
      )}
      
    </>
  );
}

export default Exam;