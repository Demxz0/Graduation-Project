import '../App.css';
import image from '../image.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const genData = {
  z: {
    title: 'جيل Z ',
    desc: 'الجيل الرقمي الأول هو الجيل المولود بين عامَي ١٩٩٧ و٢٠١٢ ,ويُعرَّف بأنه أول جيل نشأ وكبر في عالم تسوده الإنترنت والهواتف الذكية منذ الطفولة. أفراد هذا الجيل في عام ٢٠٢٦ تتراوح أعمارهم بين ١٤ و٢٩ عامًا. يُطلق عليهم أيضًا اسم "Zoomers"، وهم يشكّلون الجيل الأكثر تنوعًا ثقافيًا وعرقيًا في التاريخ. خلافًا للأجيال السابقة التي شهدت صعود التكنولوجيا تدريجيًا، وجد جيل Z نفسه في عالم رقمي كامل منذ اليوم الأول.',
   },
};

const confettiColors = ['#9b7fc7','#7c6fcd','#f9a8d4','#c4b5fd','#fbbf24','#34d399','#60a5fa','#f87171'];

function launchConfetti(e) {
  const x = e.clientX, y = e.clientY;
  for (let i = 0; i < 60; i++) {
    const el = document.createElement('div');
    const size = 6 + Math.random() * 8;
    el.style.cssText = `
      position:fixed;
      left:${x + (Math.random() - 0.5) * 100}px;
      top:${y}px;
      width:${size}px;
      height:${size}px;
      border-radius:${Math.random() > 0.5 ? '50%' : '2px'};
      background:${confettiColors[Math.floor(Math.random() * confettiColors.length)]};
      pointer-events:none;
      z-index:9999;
      animation:confettiFall ${1.2 + Math.random() * 1.2}s ${Math.random() * 0.3}s linear forwards;
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// ----------------------------------------------------
// Component الشبكة العصبية/الرقمية التفاعلية للخلفية
// ----------------------------------------------------
function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const numParticles = window.innerWidth < 768 ? 40 : 80; // عدد النقاط حسب الشاشة
    let mouse = { x: null, y: null };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.7; // سرعة هادئة جداً
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.5 + 1; // حجم النقاط
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(155, 127, 199, 0.4)'; // لون النقاط (موف ناعم)
        ctx.fill();
      }
    }

    for (let i = 0; i < numParticles; i++) {
      particles.push(new Particle());
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < numParticles; i++) {
        particles[i].update();
        particles[i].draw();
        
        // ربط النقاط ببعضها
        for (let j = i; j < numParticles; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(155, 127, 199, ${0.2 - distance / 500})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
        
        // ربط النقاط بمؤشر الماوس (التفاعل الأساسي)
        if (mouse.x != null && mouse.y != null) {
          const dx = particles[i].x - mouse.x;
          const dy = particles[i].y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(155, 127, 199, ${0.5 - distance / 300})`;
            ctx.lineWidth = 1;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }} />;
}

// ----------------------------------------------------
// Hook متى تظهر الأرقام على الشاشة لتبدأ بالعد
// ----------------------------------------------------
function useRevealOnScroll() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.unobserve(el);
      }
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, visible];
}

// ----------------------------------------------------
// Component عداد الأرقام الذكي
// ----------------------------------------------------
function AnimatedNumber({ endValue, suffix = '', isArabic = false }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useRevealOnScroll();

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000; 
    const increment = endValue / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [endValue, visible]);

  const toArabicNumerals = (num) => num.toString().replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
  const displayValue = isArabic ? toArabicNumerals(count) : count;

  return <span ref={ref}>{displayValue}{suffix}</span>;
}

// ----------------------------------------------------
// Component بطاقة التايملاين
// ----------------------------------------------------
function TimelineCard({ item, width, isActive, onCardClick, hasActiveSelection }) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isDimmed = hasActiveSelection && !isActive;
  const currentHoverOrActive = hovered || isActive;

  return (
    <div
      onClick={() => onCardClick(item.year)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        background: 'white',
        borderRadius: '50px',
        height: isMobile ? '55px' : '65px',
        display: 'flex',
        alignItems: 'center',
        padding: isMobile ? '0 55px 0 15px' : '0 70px 0 20px',
        boxShadow: currentHoverOrActive ? `0 10px 25px ${item.color}66` : '0 4px 12px rgba(0,0,0,0.05)',
        border: `1px solid ${currentHoverOrActive ? item.color : '#f0f0f5'}`,
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.34, 1.4, 0.64, 1)',
        transform: currentHoverOrActive ? 'translateY(-5px)' : 'translateY(0)',
        opacity: isDimmed ? 0.6 : 1,
        overflow: 'visible',
        width: isMobile ? '100%' : (width || 'auto'),
        direction: 'rtl',
        zIndex: currentHoverOrActive ? 5 : 2,
      }}
    >
      <div style={{
        position: 'absolute',
        right: isMobile ? '-8px' : '-14px',
        width: isMobile ? '46px' : '54px',
        height: isMobile ? '46px' : '54px',
        background: item.color,
        transform: currentHoverOrActive ? 'rotate(405deg) scale(1.1)' : 'rotate(45deg)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: currentHoverOrActive ? `0 4px 15px ${item.color}80` : '0 4px 10px rgba(0,0,0,0.12)',
        flexShrink: 0,
      }}>
        <span style={{
          color: '#493054',
          fontWeight: '900',
          fontSize: '12px',
          transform: currentHoverOrActive ? 'rotate(-405deg)' : 'rotate(-45deg)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}>
          {item.year}
        </span>
      </div>

      <span style={{
        fontSize: isMobile ? '13px' : '14px',
        color: isActive ? '#3a2555' : '#665a78',
        fontWeight: '700',
        flex: 1,
        textAlign: 'right',
        paddingRight: '8px',
        transition: 'color 0.4s ease',
      }}>
        {item.event}
      </span>
    </div>
  );
}

// ----------------------------------------------------
// Component بطاقة أقسام أُجليك (الحجم الأنيق)
// ----------------------------------------------------
function SectionCard({ card, navigate, index }) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isEven = index % 2 === 0;

  return (
    <div
      id={card.sectionId}
      className="reveal"
      style={{
        display: 'flex',
        flexDirection: isMobile ? 'column' : (isEven ? 'row' : 'row-reverse'),
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: isMobile ? '10px 0' : '20px 0',
        gap: isMobile ? '32px' : '6%', 
        direction: 'rtl',
        width: '100%',
      }}
    >
      {/* النصف النصي */}
      <div style={{
        flex: 1.2, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: isMobile ? 'center' : 'right',
        zIndex: 2,
      }}>
        <h2 style={{
          fontSize: isMobile ? '26px' : '34px',
          fontWeight: '900',
          color: '#3a2555',
          fontFamily: "'Tajawal', sans-serif",
          marginBottom: '16px',
          lineHeight: '1.4',
          letterSpacing: '-0.5px',
        }}>
          {card.title}
        </h2>
        
        <p style={{
          fontSize: isMobile ? '15px' : '16px', 
          color: '#6b5a8a',
          lineHeight: '1.8',
          fontFamily: "'Tajawal', sans-serif",
          marginBottom: '30px',
          maxWidth: '500px', 
          marginRight: isMobile ? 'auto' : '0',
          marginLeft: isMobile ? 'auto' : '0',
        }}>
          {card.desc}
        </p>

        <div style={{ display: 'flex', justifyContent: isMobile ? 'center' : 'flex-start' }}>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'instant' });
              navigate(card.route);
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = card.accentColor;
              e.currentTarget.style.color = 'white';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 10px 20px ${card.accentColor}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = card.accentColor;
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
            style={{
              padding: '10px 26px',
              fontSize: '15px',
              fontWeight: '800',
              color: card.accentColor,
              background: 'transparent',
              border: `2px solid ${card.accentColor}`,
              borderRadius: '50px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              fontFamily: "'Tajawal', sans-serif",
            }}
          >
            <span>استكشف القسم</span>
            <span style={{ fontSize: '18px' }}>←</span>
          </button>
        </div>
      </div>

      {/* النصف البصري */}
      <div style={{
        flex: 0.8, 
        display: 'flex',
        justifyContent: isMobile ? 'center' : (isEven ? 'flex-end' : 'flex-start'),
        alignItems: 'center',
        position: 'relative',
      }}>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'instant' });
            navigate(card.route);
          }}
          style={{
            width: isMobile ? '240px' : '280px', 
            height: isMobile ? '240px' : '280px', 
            background: hovered ? 'white' : `linear-gradient(145deg, white, ${card.iconBg})`,
            border: `1px solid ${card.borderColor}`,
            borderRadius: '32px', 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: hovered 
              ? `0 20px 40px ${card.accentColor}20, inset 0 0 0 2px ${card.accentColor}15` 
              : '0 10px 25px rgba(0,0,0,0.03)',
            cursor: 'pointer',
            transition: 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
            transform: hovered ? 'translateY(-6px) scale(1.03)' : 'translateY(0) scale(1)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute',
            width: '200%',
            height: '200%',
            background: `radial-gradient(circle at center, ${card.accentColor}10, transparent 50%)`,
            opacity: hovered ? 1 : 0.5,
            transition: 'opacity 0.6s ease',
            pointerEvents: 'none',
          }}/>

          <div style={{
            fontSize: isMobile ? '64px' : '72px',
            zIndex: 1,
            transform: hovered ? 'scale(1.1) rotate(-5deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            filter: hovered ? `drop-shadow(0 12px 20px ${card.accentColor}30)` : 'drop-shadow(0 8px 12px rgba(0,0,0,0.08))'
          }}>
            {card.icon}
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Component الزر المغناطيسي
// ----------------------------------------------------
function MagneticButton({ children, onClick, style, primary }) {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.25, y: y * 0.25 });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...style,
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: position.x === 0 && position.y === 0 ? 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'transform 0.1s linear, background 0.3s ease, color 0.3s ease',
      }}
      onMouseEnter={(e) => {
        if(primary) {
          e.currentTarget.style.boxShadow = '0 12px 24px rgba(155, 127, 199, 0.4)';
          e.currentTarget.style.background = '#8a6bb5'; 
        } else {
          e.currentTarget.style.background = 'rgba(155, 127, 199, 0.08)';
        }
      }}
    >
      {children}
    </button>
  );
}

// ----------------------------------------------------
// الدالة الرئيسية للصفحة (Home)
// ----------------------------------------------------
function Home() {
  const navigate = useNavigate();
  const [activeGen, setActiveGen] = useState('z');
  const [genInfo, setGenInfo] = useState(genData['z']);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeYears, setActiveYears] = useState([]); 

  // تعريف الـ Refs للهيدرات الموحدة
  const [genZHeaderRef, genZHeaderVisible] = useRevealOnScroll();
  const [sectionsHeaderRef, sectionsHeaderVisible] = useRevealOnScroll();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleYear = (year) => {
    setActiveYears((prev) => 
      prev.includes(year) ? prev.filter((y) => y !== year) : [...prev, year]
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

      {/* ===== Hero Section ===== */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: isMobile ? '20px' : '40px',
        backgroundColor: '#faf8ff', // لون ناعم مريح
      }}>

        {/* 1. الشبكة العصبية/الرقمية التفاعلية بالخلفية */}
        <NeuralBackground />

        {/* 2. المحتوى (نظيف وأنيق وبأحجام طبيعية) */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '-40px', 
          animation: 'fadeUp 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
        }}>
          
          <h1 style={{
            fontWeight: '900',
            color: '#3a2555',
            marginBottom: '16px',
            fontFamily: "'Tajawal', sans-serif",
            fontSize: isMobile ? '48px' : '80px', // حجم متزن ومريح
            letterSpacing: '-1px',
            textShadow: '0 4px 16px rgba(155, 127, 199, 0.1)', 
          }}>
           أُجْلِيكَ
          </h1>

          <p style={{
            fontSize: isMobile ? '16px' : '22px',
            color: '#5a4a7a',
            fontFamily: "'Tajawal', sans-serif",
            marginBottom: '40px',
            fontWeight: '600',
          }}>
            دعني أُجليك من كل ما يؤذيك
          </p>

          {/* 3. الأزرار المغناطيسية */}
          <div style={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            gap: '16px',
          }}>
            {/* زر الاختبار (Primary) */}
            <MagneticButton 
              onClick={() => navigate('/ikhtbar')} 
              primary={true}
              style={{
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: '700',
                fontFamily: "'Tajawal', sans-serif",
                background: '#9b7fc7',
                color: 'white',
                border: 'none',
                borderRadius: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                boxShadow: '0 4px 10px rgba(155, 127, 199, 0.15)',
              }}
            >
              <span>ابدأ الاختبار</span>
              <span style={{ fontSize: '18px' }}>📝</span>
            </MagneticButton>

            {/* زر لعبة القلق (Secondary) */}
            <MagneticButton 
              onClick={() => navigate('/game')} 
              primary={false}
              style={{
                padding: '12px 32px',
                fontSize: '16px',
                fontWeight: '700',
                fontFamily: "'Tajawal', sans-serif",
                background: 'rgba(255, 255, 255, 0.8)',
                color: '#9b7fc7',
                border: '2px solid #9b7fc7',
                borderRadius: '30px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              <span>لعبة القلق</span>
              <span style={{ fontSize: '18px' }}>🎮</span>
            </MagneticButton>
          </div>
        </div>

        {/* 4. سهم الاستكشاف (أنيق وناعم) */}
        <div
          onClick={() => document.getElementById('learnMore').scrollIntoView({ behavior: 'smooth' })}
          style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            zIndex: 1,
            animation: 'fadeIn 2s ease-in forwards',
          }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid rgba(155, 127, 199, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '16px',
            color: '#9b7fc7',
            background: 'rgba(255,255,255,0.5)',
            backdropFilter: 'blur(4px)',
            animation: 'arrowBounceDown 2s ease-in-out infinite',
          }}>
            ↓
          </div>
        </div>

        <style>{`
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          @keyframes arrowBounceDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(8px); }
          }
          @keyframes confettiFall {
            to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          @keyframes shimmer-line {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes star-float {
            0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
            50% { transform: translateY(-18px) scale(1.1); opacity: 0.9; }
          }
        `}</style>
      </div>

      {/* ===== سيكشن تعرف أكثر ===== */}
      <div id="learnMore" style={{
        background: 'linear-gradient(160deg, #faf8ff 0%, #f0ecff 50%, #fdf6ff 100%)',
        padding: isMobile ? '40px 16px' : '72px 24px 60px',
        direction: 'rtl',
        fontFamily: "'Tajawal', sans-serif",
      }}>

        {/* ===== هيدر من هو جيل Z (موحد) ===== */}
        <div
          ref={genZHeaderRef}
          style={{
            textAlign: 'center',
            padding: '10px 32px 40px',
            position: 'relative',
            overflow: 'hidden',
            width: '100%',
          }}
        >
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
          {[...Array(7)].map((_, i) => (
            <div key={`star1-${i}`} style={{
              position: 'absolute', width: `${5 + (i * 2) % 6}px`, height: `${5 + (i * 2) % 6}px`,
              borderRadius: '50%', background: `rgba(155,127,199,${0.2 + (i % 4) * 0.1})`,
              top: `${10 + (i * 14) % 80}%`, left: `${5 + (i * 13) % 90}%`,
              animation: `star-float ${2.5 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`,
              pointerEvents: 'none',
            }} />
          ))}

          <h2
            className="responsive-title-section"
            style={{
              fontSize: isMobile ? '28px' : '36px',
              fontWeight: '800',
              color: '#3a2555',
              marginBottom: '16px',
              letterSpacing: '-0.5px',
              opacity: genZHeaderVisible ? 1 : 0,
              transform: genZHeaderVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s',
              fontFamily: "'Tajawal', sans-serif",
            }}
          >
            من هو جيل Z؟
          </h2>
          <p style={{
            fontSize: isMobile ? '15px' : '17px',
            color: '#8070a8',
            maxWidth: '540px',
            margin: '0 auto 20px',
            lineHeight: '1.85',
            opacity: genZHeaderVisible ? 1 : 0,
            transform: genZHeaderVisible ? 'translateY(0)' : 'translateY(18px)',
            transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.25s',
            fontFamily: "'Tajawal', sans-serif",
          }}>
            تعرف على الجيل الذي نشأ في بيئة رقمية - وكيف أثر ذلك على صحته النفسية
          </p>
          <div style={{
            width: '100px', height: '3px', borderRadius: '10px', margin: '0 auto',
            background: 'linear-gradient(90deg, transparent, #9b7fc7, #c97099, transparent)',
            backgroundSize: '200% 100%', animation: 'shimmer-line 3s linear infinite',
            opacity: genZHeaderVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.4s',
          }} />
        </div>

        {/* كاردز الأجيال */}
        <div className="reveal" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { id: 'boomers', name: 'Baby Boomers',       year: '١٩٤٦ – ١٩٦٤' },
            { id: 'x',       name: 'الجيل X',            year: '١٩٦٥ – ١٩٨٠' },
            { id: 'millennials', name: 'الجيل Y / الميلينيالز', year: '١٩٨١ – ١٩٩٦' },
            { id: 'z',       name: 'الجيل Z',   year: '١٩٩٧ – ٢٠١٢' , },
            { id: 'alpha',   name: 'الجيل Alpha',        year: '٢٠١٣ – الآن' },
          ].map((g) => {
            const isActive = activeGen === g.id;
            return (
              <div
                key={g.id}
                onClick={(e) => { if (g.id === 'z') launchConfetti(e); }}
                style={{
                  background: isActive ? '#5c4467' : 'white',
                  border: `2px solid ${isActive ? '#5c4467' : '#ebe6f7'}`,
                  borderRadius: '14px',
                  padding: '10px 18px',
                  textAlign: 'center',
                  minWidth: isMobile ? '45%' : '110px',
                  flexGrow: isMobile ? 1 : 0,
                  transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: isActive ? 'translateY(-6px) scale(1.05)' : 'none',
                  boxShadow: isActive ? '0 10px 30px rgba(92,68,103,0.3)' : '0 4px 16px rgba(0,0,0,0.07)',
                }}
               onMouseEnter={e => {
                  if (g.id === 'z') e.currentTarget.style.cursor = 'pointer';
               }}
              >
                <div style={{ fontSize: '15px', fontWeight: '800', color: isActive ? 'white' : '#665a78' }}>{g.name}</div>
                <div style={{ fontSize: '12px', color: isActive ? '#c4aee8' : '#9586b0' }}>{g.year}</div>
              </div>
            );
          })}
        </div>

        {/* بوكس معلومات الجيل */}
        <div className="reveal" style={{
          background: 'white',
          border: '2px solid #ebe6f7',
          borderRadius: '20px',
          padding: isMobile ? '24px 20px' : '28px 32px',
          maxWidth: '1100px',
          margin: '0 auto 56px',
          animation: 'float 4s ease-in-out infinite',
          boxShadow: '0 8px 32px rgba(107,79,160,0.10)',
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.4s ease',
        }}>
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: '6px', height: '100%',
            background: 'linear-gradient(180deg, #9b7fc7, #7c6fcd)',
            borderRadius: '0 20px 20px 0',
          }} />
          <h3 style={{ fontSize: isMobile ? '20px' : '22px', fontWeight: '800', color: '#665a78', marginBottom: '14px' }}>{genInfo.title}</h3>
          <p style={{ fontSize: isMobile ? '14px' : '15px', color: '#6b5a8a', lineHeight: '1.9' }}>{genInfo.desc}</p>
        </div>

        {/* الكاردز الستة */}
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
          gap: '20px',
          maxWidth: '1100px',
          margin: '0 auto 56px',
        }}>
          {[
            { icon: '🧠', title: 'الأكثر وعيًا بالصحة النفسية', desc:'جيل Z هو الأكثر انفتاحًا في التاريخ على الحديث عن الصحة النفسية والبحث عن المساعدة. ٤٢٪ منهم في الولايات المتحدة يتلقّون العلاج النفسي حاليًا.' },
            { icon: '📱', title: 'مواطنون رقميون بالفطرة', desc:'هم أول جيل لم يعرف العالم بدون إنترنت. الهاتف الذكي ووسائل التواصل الاجتماعي ليست أدوات بالنسبة لهم  بل هي جزء من هويتهم اليومية.' },
            { icon: '🎮', title: 'الاكثر ابتكار باللغة الرقمية', desc:'يُظهر جيل زد تفوقاً في الابتكار اللغوي والتقني  داخل الألعاب؛ فهم لم يكتفوا باللعب، بل أعادوا تعريف المصطلحات وطرق التواصل، مما جعل عالم الألعاب يعكس هويتهم وأسلوبهم الخاص بشكل كامل (Self-Expression)، لدرجة أصبح معها الابتكار في الألعاب مرتبطاً ارتباطاً وثيقاً بسلوكيات هذا الجيل' },
            { icon: '🌍', title: 'الأكثر انفتاحًا على العالم', desc:'نشأوا في عالم مترابط وسريع يشبه القرية الصغيرة، مما جعلهم أكثر تواصلاً مع الثقافات المختلفة وأكثر قبولًا للتنوع والتعددية.' },
            { icon: '💬', title: 'يتواصلون بطريقة مختلفة', desc:'يُفضّلون التواصل المرئي والسريع عبر الفيديو والصور والمحتوى القصير. محادثة عبر ميم أو فيديو قصير تُعبّر عندهم أكثر من آلاف الكلمات' },
            { icon: '⚡', title: 'براغماتيون وواقعيون', desc:'شاهدوا الأزمة المالية والجائحة وهم صغار، مما جعلهم أكثر حذرًا وعملية في قراراتهم المهنية والمالية مقارنةً بجيل الميلينيالز.' },
          ].map((card, i) => (
            <div
              key={i}
              style={{
                background: 'white',
                border: '2px solid #ebe6f7',
                borderRadius: '20px',
                padding: '24px 22px',
                transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                cursor: 'default',
              }}
              onMouseEnter={e => {
                if(!isMobile) {
                  e.currentTarget.style.transform = 'scale(1.04) translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 12px 36px rgba(107,79,160,0.15)';
                  e.currentTarget.style.borderColor = '#9b7fc7';
                }
              }}
              onMouseLeave={e => {
                if(!isMobile) {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#ebe6f7';
                }
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>{card.icon}</div>
              <div style={{ fontSize: '17px', fontWeight: '800', color: '#665a78', marginBottom: '8px' }}>{card.title}</div>
              <div style={{ fontSize: '14px', color: '#9586b0', lineHeight: '1.7' }}>{card.desc}</div>
            </div>
          ))}
        </div>

        {/* ===== تايملاين الأحداث===== */}
        <h3 className="reveal" style={{ fontSize: isMobile ? '20px' : '22px', fontWeight: '800', color: '#665a78', textAlign: 'center', marginBottom: '40px' }}>
          📌 الأحداث التي شكّلت جيل Z
        </h3>

        <div className="reveal" onClick={() => setActiveYears([])} style={{
          maxWidth: '1100px',
          margin: '0 auto 60px',
          direction: 'rtl',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? '16px' : '20px',
            marginBottom: isMobile ? '16px' : '20px',
            position: 'relative',
            zIndex: 1,
          }}>
            {!isMobile && (
              <div style={{
                position: 'absolute',
                top: '50%',
                right: '40px',
                left: '40px',
                height: '3px',
                background: 'linear-gradient(90deg, #c4b5fd, #e9b89b)',
                zIndex: 0,
                transform: 'translateY(-50%)',
                opacity: 0.4,
              }}/>
            )}
            {[
              { year: '٢٠٠٧', event: 'انتشار الهاتف الذكي', color: '#c4b5fd' },
              { year: '٢٠٠٨', event: 'الأزمة المالية العالمية', color: '#b9d1e1' },
              { year: '٢٠١٠', event: 'ثورة السوشيال ميديا', color: '#c3d6ba' },
              { year: '٢٠١٥', event: 'قلق المناخ والمستقبل', color: '#e9b89b' },
            ].map((item, i) => (
              <div key={i} onClick={(e) => e.stopPropagation()}>
                <TimelineCard 
                  item={item} 
                  isActive={activeYears.includes(item.year)} 
                  hasActiveSelection={activeYears.length > 0}
                  onCardClick={toggleYear} 
                />
              </div>
            ))}
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '16px' : '20px',
            position: 'relative',
            zIndex: 1,
          }}>
            {!isMobile && (
              <div style={{
                position: 'absolute',
                top: '50%',
                width: '30%',
                height: '3px',
                background: 'linear-gradient(90deg, #dcbacb, #f3d9a6)',
                zIndex: 0,
                transform: 'translateY(-50%)',
                opacity: 0.4,
              }}/>
            )}
            {[
              { year: '٢٠٢٠', event: 'جائحة كوفيد-١٩', color: '#dcbacb' },
              { year: '٢٠٢٣', event: 'صعود الذكاء الاصطناعي', color: '#f3d9a6' },
            ].map((item, i) => (
              <div key={i} onClick={(e) => e.stopPropagation()}>
                 <TimelineCard 
                   item={item} 
                   width={isMobile ? '100%' : "260px"} 
                   isActive={activeYears.includes(item.year)} 
                   hasActiveSelection={activeYears.length > 0}
                   onCardClick={toggleYear} 
                 />
              </div>
            ))}
          </div>
        </div>

        {/* الإحصائيات */}
        <div className="reveal" style={{
          background: 'white',
          border: '2px solid #ebe6f7',
          borderRadius: '24px',
          padding: isMobile ? '24px 16px' : '36px 32px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          <div style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: '800', color: '#665a78', textAlign: 'center', marginBottom: '28px' }}>
            📊 معلومات موثّقة عن الصحة النفسية لجيل Z
          </div>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
            gap: '16px', 
            marginBottom: '16px' 
          }}>
            {[
              { num: 75, suffix: '%', label: 'من الاضطرابات النفسية تظهر بين عمر ١٠ و٢٤ سنة' },
              { num: 55, suffix: '%', label: 'يعانون من قلق أو ضغط مستمر معظم الوقت' },
              { num: 46, suffix: '%', label: 'من جيل Z تلقّوا تشخيصًا رسميًا لحالة نفسية' },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: 'linear-gradient(160deg, #faf8ff, #f0ecff)',
                  border: '2px solid #ebe6f7',
                  borderRadius: '16px',
                  padding: '22px 16px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { if(!isMobile) { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(107,79,160,0.12)'; } }}
                onMouseLeave={e => { if(!isMobile) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; } }}
              >
                <div style={{ fontSize: '32px', fontWeight: '800', color: '#6b4fa0', display: 'flex', justifyContent: 'center' }}>
                  <AnimatedNumber endValue={s.num} suffix={s.suffix} />
                </div>
                <div style={{ fontSize: '13px', color: '#9586b0', lineHeight: '1.5', marginTop: '6px' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{
            background: 'linear-gradient(160deg, #faf8ff, #f0ecff)',
            border: '2px solid #ebe6f7',
            borderRadius: '16px',
            padding: '20px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#6b4fa0', display: 'flex', justifyContent: 'center' }}>
              <AnimatedNumber endValue={9} suffix=" ساعات" isArabic={true} />
            </div>
            <div style={{ fontSize: '13px', color: '#9586b0', lineHeight: '1.5', marginTop: '6px' }}>متوسط وقت الشاشة اليومي لجيل Z عبر جميع الأجهزة</div>
          </div>
        </div>
      </div>

      {/* ===== أقسام أُجليك ===== */}
      <div style={{ 
        background: 'linear-gradient(160deg, #faf8ff 0%, #f0ecff 50%, #fdf6ff 100%)', 
        width: '100%',
        padding: isMobile ? '60px 20px' : '100px 60px',
        position: 'relative', 
      }}>
        
        {/* فاصل جمالي بين الإحصائيات والأقسام */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '200px',
          height: '4px',
          background: 'linear-gradient(90deg, transparent, #9b7fc7, transparent)',
          borderRadius: '2px',
          opacity: 0.6,
        }} />

        {/* ===== هيدر أقسام أُجليك (موحد) ===== */}
        <div
          ref={sectionsHeaderRef}
          style={{
            textAlign: 'center',
            padding: '20px 32px 52px',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: isMobile ? '40px' : '60px',
            width: '100%',
          }}
        >
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
          {[...Array(7)].map((_, i) => (
            <div key={`star2-${i}`} style={{
              position: 'absolute', width: `${5 + (i * 2) % 6}px`, height: `${5 + (i * 2) % 6}px`,
              borderRadius: '50%', background: `rgba(155,127,199,${0.2 + (i % 4) * 0.1})`,
              top: `${10 + (i * 14) % 80}%`, left: `${5 + (i * 13) % 90}%`,
              animation: `star-float ${2.5 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`,
              pointerEvents: 'none',
            }} />
          ))}

          <h1
            style={{
              fontSize: isMobile ? '36px' : '46px',
              fontWeight: '900',
              color: '#3a2555',
              marginBottom: '16px',
              letterSpacing: '-1px',
              opacity: sectionsHeaderVisible ? 1 : 0,
              transform: sectionsHeaderVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s',
              fontFamily: "'Tajawal', sans-serif",
            }}
          >
            أقسام أُجليك
          </h1>
          
          <div style={{
            width: '100px', height: '3px', borderRadius: '10px', margin: '0 auto',
            background: 'linear-gradient(90deg, transparent, #9b7fc7, #c97099, transparent)',
            backgroundSize: '200% 100%', animation: 'shimmer-line 3s linear infinite',
            opacity: sectionsHeaderVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.4s',
          }} />
        </div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? '60px' : '100px', 
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {[
            { icon: '📝', iconBg: '#eae6fa', accentColor: '#7c6fcd', borderColor: '#c4b5fd', sectionId: 'exam-section', route: '/ikhtbar', title: 'اختبر نفسك', desc:'يحتوي قسم اختبر نفسك على خمسة انواع من الإضطرابات يمكنك اختيار الاضطراب الذي تريد , و إجراء إختباره لتعرف نسبة اصابتك به...كل إضطراب يحتوي على عشرة أسئلة , أجب على كلٍ منها ب (دائماً | أحياناً | نادراً) لتحصل في النهاية على نتيجة الإختبار و تتأكد من حاجتك لمساعدة نفسية.' },
            { icon: '🧩', iconBg: '#fce8e8', accentColor: '#e07b7b', borderColor: '#f4c0c0', sectionId: 'disorders-section', route: '/disease', title: 'الإضطرابات', desc:'تعرف على أهم خمس إضطرابات نفسية يعاني منها جيل Z و تعلم أكثر عن كلٍ منهم من حيث المفهوم و الأنواع و الأسباب و كيفية التعافي و غيرها الكثير... هذا القسم هو ملجأك الصحيح اذا كنت تعاني احد هذه الإضطرابات.' },
            { icon: '🔬', iconBg: '#e8f5e9', accentColor: '#4aab72', borderColor: '#a0ddb5', sectionId: 'brain-section', route: '/dimagh', title: 'أكتشف دماغك', desc:'بطلك المخفي هو دماغك ... استكشف كيفية عمله و خد جولة بين تركيباته بطريقة ممتعه و ملهمه لذهنك!' },
            { icon: '🌱', iconBg: '#e8f4ff', accentColor: '#6e91a7', borderColor: '#b0cedd', sectionId: 'recovery-section', route: '/recovery', title: 'التعافي', desc:'طلب المساعدة هو علامة قوة حقيقية! تعرف على المفهوم الحقيقي للتعافي و أركانه و السلوكيات المتبعة للتعافي من جميع الاضطرابات النفسية.'},
            { icon: '⚠️', iconBg: '#fff3e0', accentColor: '#d4870a', borderColor: '#f4c870', sectionId: 'khattar-section', route: '/khattar', title: 'مخاطر جيل Z', desc:'تعرف اكثر على المخاطر المحيطة بجيل Z و التحديات النفسية والسلوكية التي تؤثر على الصحة العقلية لهذا الجيل لتستطيع الوقاية منها.' },
            { icon: '🎮', iconBg: '#fce0ff', accentColor: '#cd0ad4', borderColor: '#e970f4', sectionId: 'game-section', route: '/game', title: 'لعبة القلق', desc:'رحلة في عالم القلق ! لعبة تفاعلية تعلمك كيفية التعافي والأساليب الصحيحة للتعامل مع إضطراب القلق ... في هذا القسم ستخوض تجربة جديدة كلياً في التعلم.' },
          ].map((card, i) => (
            <SectionCard key={i} card={card} navigate={navigate} index={i} />
          ))}
        </div>
      </div>

      {/* ===== Footer ===== */}
      <footer style={{
        background: '#e8dff2',
        color: '#5c4467',
        padding: isMobile ? '30px 20px' : '40px 60px',
        direction: 'rtl',
        fontFamily: "'Tajawal', sans-serif",
      }}>

        <p style={{
          fontSize: isMobile ? '13px' : '15px',
          lineHeight: '1.8',
          marginBottom: '20px',
          borderBottom: '1px solid #8e7899',
          paddingBottom: '20px',
        }}>
          <strong style={{ color: '#553c61' }}>ملاحظة هامة: </strong>
          هذا المحتوى مخصص للأغراض التعليمية والتثقيفية فقط، ولا يغني عن الاستشارة الطبية أو النفسية المتخصصة.
        </p>

        <p style={{
          fontSize: isMobile ? '12px' : '13px',
          color: '#858286',
          lineHeight: '1.8',
          marginBottom: '28px',
        }}>
          اهم المصادر المرجعية المعتمدة لإستخلاص المعلومات و التقارير في موقع أُجليك : <br/> الرابطة الأمريكية للطب النفسي (APA)، الرابطة الأمريكية لعلم النفس (APA)، منظمة الصحة العالمية (WHO)، معاهد الصحة الوطنية الأمريكية (NIH)، المركز الوطني لمعلومات التكنولوجيا الحيوية (NCBI)، مراكز السيطرة على الأمراض والوقاية منها (CDC)، إدارة خدمات الصحة النفسية وتعاطي المخدرات (SAMHSA)، مايو كلينك (Mayo Clinic)، كليفلاند كلينك (Cleveland Clinic)، هيئة الخدمات الصحية الوطنية (NHS)، الدليل التشخيصي والإحصائي للاضطرابات النفسية (DSM-5).
        </p>

        <div style={{
          animation: 'float 3s ease-in-out infinite',
          background: 'linear-gradient(135deg, #e3dbf1, #d4c5e8)',
          border: '1px solid #8e7899',
          borderRadius: '16px',
          padding: '20px 24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h3 style={{ color: '#553c61', fontSize: '17px', fontWeight: '700', marginBottom: '10px' }}>
            <span style={{ color: '#5c4467', marginLeft: '8px' }}>💜</span>
            هل تحتاج إلى مساعدة؟
          </h3>
          <p style={{ fontSize: '14px', color: '#5c4467', lineHeight: '1.7', margin: 0 }}>
            إذا كنت أنت أو أي شخص تعرفه يعاني  من أعراض اضطراب نفسي ، يرجى التواصل مع متخصص في الصحة النفسية أو خطوط الدعم المتاحة في بلدك.
          </p>
        </div>

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#5c4467', margin: '24px 0 0' }}>
          © 2026 أُجليك — جميع الحقوق محفوظة
        </p>

      </footer>
    </div>
  );
}

export default Home;