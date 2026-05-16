import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import img1 from '../game-images/g-img1.png';
import img2 from '../game-images/g-img2.png';
import img3 from '../game-images/g-img3.png';
import img4 from '../game-images/g-img4.png';
import img5 from '../game-images/g-img5.png';
import img6 from '../game-images/g-img6.png';
import img7 from '../game-images/g-img7.png';
import img8 from '../game-images/g-img8.png';
import img9 from '../game-images/g-img9.png';
import img10 from '../game-images/g-img10.png';
import instructionImg from '../game-images/g-instruction.jpeg'; 

const gameScreenshots = [img1, img2, img3, img4, img5 , img6, img7, img8, img9, img10];

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
  { icon: '☘️', label:'محتوى نفسي' },
  { icon: '📚', label: 'محتوى تعليمي' },
  { icon: '🎮', label: 'أسلوب فني Low Poly' },
  { icon: '🧩', label: 'الغاز' },
];

export default function Game() {
  const navigate = useNavigate();
  const [headerRef, headerVisible] = useReveal();

  const [activeImg, setActiveImg] = useState(0);
  const sliderRef = useRef(null);

  function goTo(idx) {
    setActiveImg(idx);
    if (sliderRef.current) {
      const child = sliderRef.current.children[idx];
      if (child) child.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }
  function prevImg() { goTo((activeImg - 1 + gameScreenshots.length) % gameScreenshots.length); }
  function nextImg() { goTo((activeImg + 1) % gameScreenshots.length); }

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
        .screenshot-slider {
          display: flex;
          gap: 12px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scrollbar-width: none;
          -ms-overflow-style: none;
          padding: 4px 2px 8px;
        }
        .screenshot-slider::-webkit-scrollbar { display: none; }
        .screenshot-thumb {
          flex-shrink: 0;
          scroll-snap-align: center;
          border-radius: 10px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.25s ease;
          border: 2.5px solid transparent;
        }
        .screenshot-thumb:hover { transform: scale(1.03); }
        .screenshot-thumb.active { border-color: #5c3a7a; }
        .slider-arrow:hover {
          background: rgba(92,58,122,0.15) !important;
        }
        .download-btn:hover {
          transform: scale(1.04) !important;
          box-shadow: 0 10px 30px rgba(92,58,122,0.55) !important;
        }
      `}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #faf8ff 0%, #f0ecff 50%, #fdf6ff 100%)',
        direction: 'rtl',
        fontFamily: "'Tajawal', sans-serif",
        paddingBottom: '80px',
      }}>

        {/* ===== Hero (إلعب وتعلّم) ===== */}
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
            إلعب وتعلّم
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

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
          
          {/* ===== بطاقة اللعبة ===== */}
          <RevealCard delay={200} style={{ marginBottom: '20px' }}>
            <div style={{
              background: 'white',
              border: '2px solid #ebe6f7',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 4px 20px rgba(107,79,160,0.08)',
            }}>
              <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#3a2555', textAlign: 'right', marginBottom: '16px' }}>
                لعبة نفسية من منظور الشخص الأول
              </h3>
              <p style={{ fontSize: '15px', color: '#7a6a98', lineHeight: '1.9', textAlign: 'right', marginBottom: '28px' }}>
              تأخذك في رحلة داخل عالم رمزي واسع، حيث تمثل كل منطقة اضطرابًا نفسيًا مختلفًا. يتقدم اللاعب عبر تجاوز تحديات مستوحاة من الواقع، باستخدام أساليب مثبتة علميًا للتعامل مع هذه الاضطرابات والتخفيف منها. 
              </p>

              {/* مميزات اللعبة */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'flex-end', marginBottom: '32px' }}>
                {gameFeatures.map((f, i) => (
                  <div
                    key={i}
                    className="game-feature-tag"
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      background: '#f5f0ff', border: '1.5px solid #d4bfee',
                      borderRadius: '50px', padding: '8px 18px',
                      fontSize: '14px', color: '#6b4fa0', fontWeight: '600',
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
                borderRadius: '16px',
                padding: '24px 30px',
                marginBottom: '32px',
                textAlign: 'right',
              }}>
                <div style={{ fontSize: '16px', fontWeight: '700', color: '#3a2555', marginBottom: '12px' }}>
                  النسخة الحالية (Demo):
                </div>
                <p style={{ fontSize: '15px', color: '#7a6a98', lineHeight: '1.9', margin: '0 0 12px' }}>
                 تقدم منطقة واحدة تركز على اضطراب القلق، داخل منزل يحتوي على عدة غرف، كل منها يمثل نوًعا من القلق.يتعين على اللاعب حل الألغاز، واستكشاف الملاحظات الصوتية والمكتوبة التي تقدم محتوى توعوًيا حول القلق وطرق التعامل معه.
                 </p>
                <p style={{ fontSize: '15px', color: '#7a6a98', lineHeight: '1.9', margin: '0 0 12px' }}>
                 يعتمد نظام اللعب على مقياس يظهر مستوى القلق لدى الالعب، والذي يرتفع بسبب المحفزات داخل البيئة وقد يصل إلى نوبة هلع، وينخفض عبر اتخاذ قرارات صحيحة واستخدام تقنيات مثل التنفس السليم.
                 </p>
                 <div style={{ 
                background: 'rgba(94, 33, 62, 0.04)', 
                borderRight: '4px solid #7a6a98', 
                padding: '16px 20px', 
                borderRadius: '12px 12px 12px 12px' 
              }}>
                <p style={{ fontSize: '15px', color: '#69568b', lineHeight: '1.8', margin: 0, fontWeight: '700' }}>
                📌 خصصنا محتوى مدعوم باللغة العربية بالكامل.<br/> 📌للحصول على أفضل تجربة لسماع الأصوات استخدم سماعات الرأس.
                </p>
              </div>
              </div>

              {/* =====  صور اللعبة ===== */}
              <div style={{ marginTop: '16px' }}>

                {/* الصورة الرئيسية */}
                <div style={{
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  border: '2px solid #d4bfee',
                  background: '#1a0a2e',
                  marginBottom: '16px',
                  aspectRatio: '16/9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  maxHeight: '550px' 
                }}>
                  <img
                    src={gameScreenshots[activeImg]}
                    alt={`لقطة شاشة ${activeImg + 1}`}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'opacity 0.3s ease',
                    }}
                  />

                  {/* سهم يمين */}
                  <button
                    className="slider-arrow"
                    onClick={nextImg}
                    style={{
                      position: 'absolute', right: '16px', top: '50%',
                      transform: 'translateY(-50%)',
                      width: '44px', height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(8px)',
                      border: '1.5px solid rgba(255,255,255,0.3)',
                      color: 'white', fontSize: '20px',
                      cursor: 'pointer', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s ease', zIndex: 2,
                    }}
                  >›</button>
                  
                  {/* سهم يسار */}
                  <button
                    className="slider-arrow"
                    onClick={prevImg}
                    style={{
                      position: 'absolute', left: '16px', top: '50%',
                      transform: 'translateY(-50%)',
                      width: '44px', height: '44px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.18)',
                      backdropFilter: 'blur(8px)',
                      border: '1.5px solid rgba(255,255,255,0.3)',
                      color: 'white', fontSize: '20px',
                      cursor: 'pointer', display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      transition: 'all 0.2s ease', zIndex: 2,
                    }}
                  >‹</button>

                  {/* عداد الصور */}
                  <div style={{
                    position: 'absolute', bottom: '16px', left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'rgba(0,0,0,0.55)',
                    backdropFilter: 'blur(6px)',
                    borderRadius: '20px',
                    padding: '6px 16px',
                    fontSize: '14px', color: 'rgba(255,255,255,0.95)',
                    fontWeight: '600',
                    letterSpacing: '1px'
                  }}>
                    {activeImg + 1} / {gameScreenshots.length}
                  </div>
                </div>

                {/* الصور المصغرة */}
                <div ref={sliderRef} className="screenshot-slider" style={{ gap: '16px', padding: '8px 4px 12px' }}>
                  {gameScreenshots.map((src, i) => (
                    <div
                      key={i}
                      className={`screenshot-thumb${activeImg === i ? ' active' : ''}`}
                      onClick={() => goTo(i)}
                      style={{ width: '120px', height: '75px', borderRadius: '12px' }}
                    >
                      <img
                        src={src}
                        alt={`مصغرة ${i + 1}`}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  ))}
                </div>

                {/* نقاط التنقل */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px' }}>
                  {gameScreenshots.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goTo(i)}
                      style={{
                        width: activeImg === i ? '24px' : '8px',
                        height: '8px',
                        borderRadius: '10px',
                        border: 'none',
                        background: activeImg === i ? '#5c3a7a' : '#c8b8e8',
                        cursor: 'pointer',
                        padding: 0,
                        transition: 'all 0.3s ease',
                      }}
                    />
                  ))}
                </div>

                {/* صورة التعليمات + زر التحميل */}
                <div style={{ marginTop: '40px' }}>
                  
                  {/* صورة التعليمات */}
                  <div style={{
                    borderRadius: '16px',
                    overflow: 'hidden',
                    border: '2px solid #d4bfee',
                    marginBottom: '30px',
                    boxShadow: '0 4px 16px rgba(92,58,122,0.12)',
                  }}>
                    <div style={{
                      background: 'linear-gradient(135deg, #3a2555, #5c3a7a)',
                      padding: '14px 20px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                    }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.8)" strokeWidth="2"/>
                        <path d="M12 8v4M12 16h.01" stroke="rgba(255,255,255,0.9)" strokeWidth="2.2" strokeLinecap="round"/>
                      </svg>
                      <span style={{ color: 'rgba(255,255,255,0.95)', fontSize: '15px', fontWeight: '600' }}>
                        تعليمات التحميل والتشغيل
                      </span>
                    </div>
                    <img
                      src={instructionImg}
                      alt="تعليمات تحميل اللعبة"
                      style={{
                        width: '100%',
                        display: 'block',
                        objectFit: 'contain',
                        maxHeight: '600px'
                      }}
                    />
                  </div>

                  {/* زر التحميل */}
                  <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <a
                      href="https://demxz0.github.io/AnxietyRecoverBuild/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="download-btn"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px 44px',
                        borderRadius: '50px',
                        background: 'linear-gradient(135deg, #5c3a7a, #7c6fcd)',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '700',
                        fontFamily: "'Tajawal', sans-serif",
                        textDecoration: 'none',
                        boxShadow: '0 6px 22px rgba(92,58,122,0.4)',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 4v10m0 0l-3.5-3.5M12 14l3.5-3.5M4 17v1a2 2 0 002 2h12a2 2 0 002-2v-1"
                          stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span>تحميل اللعبة</span>
                    </a>
                  </div>

                  {/* متطلبات اللعبة */}
                  <div style={{ marginTop: '40px' }}>
                    
                    {/* العنوان */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      justifyContent: 'flex-start',
                      marginBottom: '24px',
                    }}>
                      <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#3a2555', margin: 0 }}>
                        متطلبات تشغيل اللعبة
                      </h4>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="2" y="3" width="20" height="14" rx="2" stroke="#5c3a7a" strokeWidth="2"/>
                        <path d="M8 21h8M12 17v4" stroke="#5c3a7a" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </div>

                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                      gap: '30px', 
                    }}>

                      {/* المواصفات الدنيا */}
                      <div style={{
                        background: 'linear-gradient(135deg, #faf8ff, #f5f0ff)',
                        border: '1.5px solid #d4bfee',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                      }}>
                        <div style={{
                          background: 'linear-gradient(135deg, #5c3a7a, #7c6fcd)',
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          justifyContent: 'flex-start',
                        }}>
                          <span style={{ color: 'white', fontSize: '15px', fontWeight: '700' }}>
                            💻 المواصفات الدنيا
                          </span>
                        </div>
                        <div style={{ padding: '8px 0 16px' }}>
                          <p style={{
                            fontSize: '13px',
                            color: '#8070a8',
                            textAlign: 'right',
                            padding: '12px 20px',
                            margin: 0,
                            lineHeight: '1.6',
                            borderBottom: '1px solid #ebe6f7',
                          }}>
                           هذه هي المواصفات الأساسية المطلوبة لتشغيل اللعبة بسلاسة على إعدادات منخفضة
                          </p>
                          {[
                            { label: 'نظام التشغيل (OS)', value: 'ويندوز 10 (64-بت)' },
                            { label: 'المعالج (CPU)', value: 'Intel Core i3-4130 / AMD Ryzen 3 1200 أو ما يعادلها' },
                            { label: 'الذاكرة العشوائية (RAM)', value: '4 جيجابايت' },
                            { label: 'بطاقة الشاشة (GPU)', value: 'Intel UHD Graphics 620 / NVIDIA GeForce GTX 750 / AMD Radeon R7 260X (يجب أن تدعم DirectX 11)' },
                            { label: 'إصدار DirectX', value: 'النسخة 11' },
                            { label: 'مساحة التخزين', value: '1 جيجابايت مساحة متوفرة' },
                          ].map((item, i) => (
                            <div key={i} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '14px 20px', 
                              borderBottom: i < 5 ? '1px solid #ebe6f7' : 'none',
                              gap: '16px',
                            }}>
                              <span style={{
                                fontSize: '13px',
                                color: '#6b4fa0',
                                fontWeight: '700',
                                flexShrink: 0,
                                flexBasis: '40%'
                              }}>{item.label}</span>
                              <span style={{
                                fontSize: '13px',
                                color: '#8070a8',
                                textAlign: 'left',
                                flexBasis: '60%',
                                lineHeight: '1.5'
                              }}>{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* المواصفات الموصى بها */}
                      <div style={{
                        background: 'linear-gradient(135deg, #fff8f0, #fff3fa)',
                        border: '1.5px solid #e8c5d8',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
                      }}>
                        <div style={{
                          background: 'linear-gradient(135deg, #b66b8e, #8e5aab)',
                          padding: '16px 20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          justifyContent: 'flex-start',
                        }}>
                          <span style={{ color: 'white', fontSize: '15px', fontWeight: '700' }}>
                            🚀 المواصفات الموصى بها
                          </span>
                        </div>
                        <div style={{ padding: '8px 0 16px' }}>
                          <p style={{
                            fontSize: '13px',
                            color: '#9a6880',
                            textAlign: 'right',
                            padding: '12px 20px',
                            margin: 0,
                            lineHeight: '1.6',
                            borderBottom: '1px solid #f0d8e8',
                          }}>
                           هذه هي المواصفات المفضلة للحصول على أفضل تجربة للعبة مع أقصى جودة للظلال والإضاءة
                          </p>
                          {[
                            { label: 'نظام التشغيل (OS)', value: 'ويندوز 10 أو ويندوز 11 (64-بت)' },
                            { label: 'المعالج (CPU)', value: 'Intel Core i5-8400 / AMD Ryzen 5 2600 أو أفضل' },
                            { label: 'الذاكرة العشوائية (RAM)', value: '8 جيجابايت أو أعلى' },
                            { label: 'بطاقة الشاشة (GPU)', value: 'NVIDIA GeForce GTX 1060 (3GB) / AMD Radeon RX 580 أو أفضل' },
                            { label: 'إصدار DirectX', value: 'النسخة 11 أو 12' },
                            { label: 'مساحة التخزين', value: '1 جيجابايت مساحة متوفرة' },
                          ].map((item, i) => (
                            <div key={i} style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              padding: '14px 20px',
                              borderBottom: i < 5 ? '1px solid #f0d8e8' : 'none',
                              gap: '16px',
                            }}>
                              <span style={{
                                fontSize: '13px',
                                color: '#b66b8e',
                                fontWeight: '700',
                                flexShrink: 0,
                                flexBasis: '40%'
                              }}>{item.label}</span>
                              <span style={{
                                fontSize: '13px',
                                color: '#9a6880',
                                textAlign: 'left',
                                flexBasis: '60%',
                                lineHeight: '1.5'
                              }}>{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>
          </RevealCard>
          
          {/* ===== زر الرئيسية ===== */}
          <RevealCard delay={100}>
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  padding: '16px 48px',
                  fontSize: '18px',
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