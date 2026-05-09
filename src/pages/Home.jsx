import '../App.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

import examImg from '../assets/exam.png';
import diseaseImg from '../assets/disease.png';
import brainImg from '../assets/brain.png';
import recoveryImg from '../assets/recovery.png';
import khattarImg from '../assets/khattar.png';
import gameImg from '../assets/game-section.png';
   
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
//  الشبكة  للخلفية
// ----------------------------------------------------
function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    const numParticles = window.innerWidth < 768 ? 40 : 80; 
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
        this.vx = (Math.random() - 0.5) * 0.7; 
        this.vy = (Math.random() - 0.5) * 0.7;
        this.radius = Math.random() * 1.5 + 1; 
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
        ctx.fillStyle = 'rgba(155, 127, 199, 0.4)'; 
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

//  عداد الأرقام 

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
//  بطاقة التايملاين
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
//  بطاقة أقسام أُجليك 
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
          </button>
        </div>
      </div>

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
            width: isMobile ? '110px' : '140px', 
            height: isMobile ? '110px' : '140px',
            zIndex: 1,
            transform: hovered ? 'scale(1.15) rotate(-5deg)' : 'scale(1) rotate(0deg)',
            transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
            filter: hovered ? `drop-shadow(0 15px 25px ${card.accentColor}40)` : 'drop-shadow(0 8px 15px rgba(0,0,0,0.1))'
          }}>
            <img 
              src={card.imageSrc} 
              alt={card.title} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain' // عشان الصورة تحافظ على أبعادها وما تنمط
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// الزر المغناطيسي
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
          e.currentTarget.style.background = 'linear-gradient(135deg, #8f78b4f1, #543c72)';
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
// بطاقة الخصائص 
// ----------------------------------------------------
function FlipExpandCard({ card, isMobile }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); 
  const active = isMobile ? isFlipped : isHovered;

  return (
    <div
      onMouseEnter={() => !isMobile && setIsHovered(true)}
      onMouseLeave={() => !isMobile && setIsHovered(false)}
      onClick={() => isMobile && setIsFlipped(!isFlipped)}
      style={{
        flex: isMobile ? 'none' : (isHovered ? 3.5 : 1), 
        height: isMobile ? '200px' : '380px',
        width: isMobile ? '100%' : 'auto',
        transition: 'flex 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        perspective: '1000px', 
        cursor: 'pointer',
      }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: active ? 'rotateY(180deg)' : 'rotateY(0deg)', 
        transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}>
        <div style={{
          position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
          background: '#ffffff', border: '2px solid #ebe6f7', borderRadius: '24px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '16px', textAlign: 'center', boxShadow: '0 4px 15px rgba(107,79,160,0.03)'
        }}>
          <div style={{
            fontSize: '40px', marginBottom: '16px',
            background: '#faf8ff', border: '1px solid #ebe6f7', width: '70px', height: '70px',
            display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%',
            color: '#493054', boxShadow: 'inset 0 2px 4px rgba(155, 127, 199, 0.05)'
          }}>
            {card.icon}
          </div>
          <h4 style={{
            fontSize: isMobile ? '18px' : '15px',
            fontWeight: '900', color: '#493054', margin: 0,
            lineHeight: '1.5'
          }}>
            {card.title}
          </h4>
        </div>

        <div style={{
          position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
          background: 'linear-gradient(145deg, #fdf4f4, #e3d0fa)', 
          border: '2px solid #d4bfee', 
          borderRadius: '24px',
          transform: 'rotateY(180deg)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '24px', textAlign: 'center',
          boxShadow: '0 12px 30px rgba(107,79,160,0.08)', 
          overflow: 'hidden'
        }}>
          <h4 style={{ 
            fontSize: '18px', 
            fontWeight: '900', 
            marginBottom: '12px', 
            color: '#3a2555' 
          }}>
            {card.title}
          </h4>
          <p style={{
            fontSize: '14px', 
            lineHeight: '1.8', 
            color: '#6a588b', 
            margin: 0,
            opacity: active ? 1 : 0, 
            transition: 'opacity 0.4s 0.3s',
          }}>
            {card.desc}
          </p>
        </div>
      </div>
    </div>
  );
}


function Home() {
  const navigate = useNavigate();
  const [activeGen, setActiveGen] = useState('z');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [activeYears, setActiveYears] = useState([]); 

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
        backgroundColor: '#faf8ff', 
      }}>
        <NeuralBackground />

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
            fontWeight: '500',
            color: '#3a2555',
            marginBottom: '16px',
            fontFamily: "'Reem Kufi', sans-serif",
            fontSize: isMobile ? '48px' : '100px', 
            letterSpacing: '-1px',
            textShadow: '0 4px 16px rgba(155, 127, 199, 0.1)', 
          }}>
           أُجْلِيك
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
                background:'linear-gradient(135deg, #8f78b4f1, #543c72)',
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
                color: '#6a4f96', 
                border: '2px solid #6a4f96', 
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

        {/* 4. سهم */}
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
        <div id="learnMore" style={{ padding: isMobile ? '40px 16px' : '72px 24px 60px', position: 'relative', zIndex: 1 }}>
          
          {/* عنوان السكشن */}
          <div ref={genZHeaderRef} style={{ textAlign: 'center', padding: '10px 32px 40px' }}>
            <h2 style={{ fontSize: isMobile ? '28px' : '36px', fontWeight: '800', color: '#3a2555', marginBottom: '16px', opacity: genZHeaderVisible ? 1 : 0, transform: genZHeaderVisible ? 'translateY(0)' : 'translateY(24px)', transition: '0.7s' }}>من هو جيل Z؟</h2>
            <p style={{ fontSize: isMobile ? '15px' : '17px', color: '#8070a8', maxWidth: '540px', margin: '0 auto 20px', lineHeight: '1.85', opacity: genZHeaderVisible ? 1 : 0, transition: '0.7s 0.2s' }}>تعرف على الجيل الذي نشأ في بيئة رقمية - وكيف أثر ذلك على صحته النفسية</p>
            <div style={{ width: '100px', height: '3px', borderRadius: '10px', margin: '0 auto', background: 'linear-gradient(90deg, transparent, #9b7fc7, #c97099, transparent)', animation: 'shimmer-line 3s infinite' }} />
          </div>

          {/*  الأجيال */}
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

          {/* (معلومات جيل Z) */}
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
            <h3 style={{ fontSize: isMobile ? '20px' : '22px', fontWeight: '800', color: '#665a78', marginBottom: '14px' }}>
              جيل Z
            </h3>
            <p style={{ fontSize: isMobile ? '14px' : '15px', color: '#6b5a8a', lineHeight: '1.9' }}>
              الجيل الرقمي الأول هو الجيل المولود بين عامَي ١٩٩٧ و٢٠١٢، ويُعرَّف بأنه أول جيل نشأ وكبر في عالم يسوده الإنترنت والهواتف الذكية منذ الطفولة.
              <br />
              أفراد هذا الجيل في عام ٢٠٢٦ تتراوح أعمارهم بين ١٤ و٢٩ عامًا. يُطلق عليهم أيضًا اسم "Zoomers"، وهم يشكّلون الجيل الأكثر تنوعًا ثقافيًا وعرقيًا في التاريخ.
              <br />
              خلافًا للأجيال السابقة التي شهدت صعود التكنولوجيا تدريجيًا، وجد جيل Z نفسه في عالم رقمي كامل منذ اليوم الأول.
            </p>
             </div>


{/* ===== سيكشن خصائص جيل Z ===== */}
<div style={{
  padding: isMobile ? '40px 20px' : '60px 4% 80px',
  width: '100%',
  position: 'relative',
  zIndex: 1,
  direction: 'rtl',
  fontFamily: "'Tajawal', sans-serif",
}}>

  <div style={{ textAlign: 'right', marginBottom: isMobile ? '30px' : '40px' }}>
     <h3 className="reveal" style={{ fontSize: isMobile ? '20px' : '22px', fontWeight: '800', color: '#665a78', textAlign: 'center', marginBottom: '40px' }}>
          📌 خصائص تُميز جيل Z
        </h3>
  </div>

  {/*  الكاردز الستة للخصائص*/}
  <div className="reveal" style={{
    display: 'flex',
    flexDirection: isMobile ? 'column' : 'row', 
    gap: '12px',
    width: '100%',
    alignItems: 'stretch' 
  }}>
    {[
      { icon: '🧠', title: 'الأكثر وعيًا بالصحة النفسية', desc:'جيل Z هو الأكثر انفتاحًا في التاريخ على الحديث عن الصحة النفسية والبحث عن المساعدة. ٤٢٪ منهم في الولايات المتحدة يتلقّون العلاج النفسي حاليًا.' },
      { icon: '📱', title: 'مواطنون رقميون بالفطرة', desc:'هم أول جيل لم يعرف العالم بدون إنترنت. الهاتف الذكي ووسائل التواصل الاجتماعي ليست أدوات بالنسبة لهم بل هي جزء من هويتهم اليومية.' },
      { icon: '🎮', title: 'الابتكار باللغة الرقمية', desc:'يُظهر جيل زد تفوقاً في الابتكار اللغوي والتقني داخل الألعاب؛ فهم لم يكتفوا باللعب، بل أعادوا تعريف المصطلحات.' },
      { icon: '🌍', title: 'الأكثر انفتاحًا على العالم', desc:'نشأوا في عالم مترابط وسريع يشبه القرية الصغيرة، مما جعلهم أكثر تواصلاً مع الثقافات المختلفة.' },
      { icon: '💬', title: 'يتواصلون بطريقة مختلفة', desc:'يُفضّلون التواصل المرئي والسريع عبر الفيديو والصور والمحتوى القصير. محادثة عبر ميم تُعبّر عندهم أكثر.' },
      { icon: '⚡', title: 'براغماتيون وواقعيون', desc:'شاهدوا الأزمة المالية والجائحة وهم صغار، مما جعلهم أكثر حذرًا وعملية في قراراتهم المهنية والمالية.' },
    ].map((card, i) => (

      <FlipExpandCard key={i} card={card} isMobile={isMobile} />
    ))}
  </div>
</div>

       {/* ===== تايملاين الأحداث  ===== */}
        <h3 className="reveal" style={{ 
          fontSize: isMobile ? '20px' : '22px', 
          fontWeight: '800', 
          color: '#665a78', 
          textAlign: 'center', 
          marginBottom: '20px' 
        }}>
          📌 الأحداث التي شكّلت جيل Z
        </h3>

        <div className="reveal" onClick={() => setActiveYears([])} style={{
          width: '100%',
          maxWidth: '1350px', 
          margin: '0 auto 60px',
          direction: 'rtl',
          overflowX: isMobile ? 'auto' : 'visible', 
          WebkitOverflowScrolling: 'touch',
          padding: '20px 0',
        }}>
          
          <div style={{
            minWidth: isMobile ? '1050px' : '100%', 
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            padding: isMobile ? '130px 20px' : '130px 10px',
          }}>

            {/* الخط الرئيسي الأفقي */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '0',
              right: '0',
              height: '4px',
              background: 'linear-gradient(90deg, #f3d9a6, #c4b5fd)', 
              transform: 'translateY(-50%)',
              borderRadius: '4px',
              zIndex: 0,
              opacity: 0.5,
            }} />

            {/* توزيع الأحداث */}
            {[
              { year: '٢٠٠٧', event: 'انتشار الهاتف الذكي', color: '#c4b5fd' },
              { year: '٢٠٠٨', event: 'الأزمة المالية العالمية', color: '#b9d1e1' },
              { year: '٢٠١٠', event: 'ثورة السوشيال ميديا', color: '#c3d6ba' },
              { year: '٢٠١٥', event: 'قلق المناخ والمستقبل', color: '#e9b89b' },
              { year: '٢٠٢٠', event: 'جائحة كوفيد-١٩', color: '#dcbacb' },
              { year: '٢٠٢٣', event: 'صعود الذكاء الاصطناعي', color: '#f3d9a6' },
            ].map((item, i) => {
              
              const isTop = i % 2 === 0; 
              const isActive = activeYears.includes(item.year);
              const isDimmed = activeYears.length > 0 && !isActive;

              return (
                <div key={i} style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: isActive ? 10 : 2,
                  flex: 1, 
                }}>
                  
                  <div 
                    onClick={(e) => { e.stopPropagation(); toggleYear(item.year); }}
                    style={{
                      width: isActive ? '22px' : '16px',
                      height: isActive ? '22px' : '16px',
                      borderRadius: '50%',
                      background: item.color,
                      border: '3px solid white',
                      boxShadow: isActive ? `0 0 15px ${item.color}80` : '0 2px 6px rgba(0,0,0,0.1)',
                      zIndex: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      opacity: isDimmed ? 0.4 : 1,
                  }} />

                  <div style={{
                    position: 'absolute',
                    bottom: isTop ? '50%' : 'auto',
                    top: isTop ? 'auto' : '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                    
                    {isTop ? (
                      <>
                        <div style={{ 
                          width: isMobile ? '200px' : '195px', 
                          paddingBottom: isActive ? '8px' : '12px', 
                          transition: 'all 0.3s', 
                          transform: isActive ? 'scale(1.05)' : 'scale(1)', 
                          transformOrigin: 'bottom center' 
                        }}>
                          <TimelineCard item={item} width="100%" isActive={isActive} hasActiveSelection={activeYears.length > 0} onCardClick={toggleYear} />
                        </div>
                        <div style={{
                          width: '3px',
                          height: isActive ? '28px' : '36px',
                          background: item.color,
                          opacity: isDimmed ? 0.3 : 0.8,
                          transition: 'all 0.3s ease',
                          borderRadius: '2px',
                        }} />
                      </>
                    ) : (
                      <>
                        <div style={{
                          width: '3px',
                          height: isActive ? '28px' : '36px',
                          background: item.color,
                          opacity: isDimmed ? 0.3 : 0.8,
                          transition: 'all 0.3s ease',
                          borderRadius: '2px',
                        }} />
                        <div style={{ 
                          width: isMobile ? '200px' : '195px', 
                          paddingTop: isActive ? '8px' : '12px', 
                          transition: 'all 0.3s', 
                          transform: isActive ? 'scale(1.05)' : 'scale(1)', 
                          transformOrigin: 'top center' 
                        }}>
                          <TimelineCard item={item} width="100%" isActive={isActive} hasActiveSelection={activeYears.length > 0} onCardClick={toggleYear} />
                        </div>
                      </>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      
       {/* ===== أقسام أُجليك ===== */}
        <div
          ref={sectionsHeaderRef}
          style={{
            textAlign: 'center',
            padding: '160px 32px 52px',
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
           رحلة في أُجليك
          </h1>
          
          <div style={{
            width: '100px', height: '3px', borderRadius: '10px', margin: '0 auto',
            background: 'linear-gradient(90deg, transparent, #9b7fc7, #c97099, transparent)',
            backgroundSize: '200% 100%', animation: 'shimmer-line 3s linear infinite',
            opacity: sectionsHeaderVisible ? 1 : 0, transition: 'opacity 0.7s ease 0.4s',
          }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '60px' : '300px', maxWidth: '1100px', margin: '0 auto 200px' }}>
            {[
              { imageSrc: examImg, iconBg: '#eae6fa', accentColor: '#7c6fcd', borderColor: '#c4b5fd', sectionId: 'exam-section', route: '/ikhtbar', title: 'اختبر نفسك', desc:'يحتوي قسم اختبر نفسك على خمسة انواع من الإضطرابات يمكنك اختيار الاضطراب الذي تريد , و إجراء إختباره لتعرف نسبة اصابتك به... كل إضطراب يحتوي على عشرة أسئلة , أجب على كلٍ منها ب (دائماً | أحياناً | نادراً) لتحصل في النهاية على نتيجة الإختبار و تتأكد من حاجتك لمساعدة نفسية.' },
              { imageSrc: diseaseImg, iconBg: '#fce8e8', accentColor: '#e07b7b', borderColor: '#f4c0c0', sectionId: 'disorders-section', route: '/disease', title: 'الإضطرابات', desc:'تعرف على أهم خمس إضطرابات نفسية يعاني منها جيل Z و تعلم أكثرعن كلٍ منهم من حيث المفهوم و الأنواع و الأسباب و كيفية التعافي و غيرها الكثير... هذا القسم هو ملجأك الصحيح اذا كنت تعاني احد هذه الإضطرابات.' },
              { imageSrc: brainImg, iconBg: '#e8f5e9', accentColor: '#4aab72', borderColor: '#a0ddb5', sectionId: 'brain-section', route: '/dimagh', title: 'أكتشف دماغك', desc:'بطلك المخفي هو دماغك ... استكشف كيفية عمله و خد جولة بين تركيباته بطريقة ممتعه و ملهمه لذهنك!' },
              { imageSrc: recoveryImg, iconBg: '#e8f4ff', accentColor: '#6e91a7', borderColor: '#b0cedd', sectionId: 'recovery-section', route: '/recovery', title: 'التعافي', desc:'طلب المساعدة هو علامة قوة حقيقية! تعرف على المفهوم الحقيقي للتعافي و أركانه و السلوكيات المتبعة للتعافي من جميع الاضطرابات النفسية.'},
              { imageSrc: khattarImg, iconBg: '#fff3e0', accentColor: '#d4870a', borderColor: '#f4c870', sectionId: 'khattar-section', route: '/khattar', title: 'مخاطر جيل Z', desc:'تعرف اكثر على المخاطر المحيطة بجيل Z و التحديات النفسية والسلوكية التي تؤثر على الصحة العقلية لهذا الجيل لتستطيع الوقاية منها.' },
              { imageSrc: gameImg, iconBg: '#fce0ff', accentColor: '#cd0ad4', borderColor: '#e970f4', sectionId: 'game-section', route: '/game', title: 'لعبة القلق', desc:'رحلة في عالم القلق ! لعبة تفاعلية تعلمك كيفية التعافي والأساليب الصحيحة للتعامل مع إضطراب القلق ... في هذا القسم ستخوض تجربة جديدة كلياً في التعلم.' },
            ].map((card, i) => (
              <SectionCard key={i} card={card} navigate={navigate} index={i} />
            ))}
          </div>
          
      </div>


 {/* ===== الإحصائيات===== */}
      <div className="reveal" style={{
        maxWidth: '1100px',
        margin: '0 auto 100px', 
        padding: '0 20px', 
      }}>
        <style>{`
          @keyframes fillProgress {
            0% { transform: scaleX(0); }
            100% { transform: scaleX(1); }
          }
          @keyframes subtlePulse {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.02); opacity: 0.9; text-shadow: 0 4px 20px rgba(155, 127, 199, 0.3); }
          }
        `}</style>

        {/* الكاردز الثلاثة العلوية */}
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: '24px', 
          marginBottom: '24px' 
        }}>
          {[
            { num: 75, suffix: '%', label: 'من الاضطرابات النفسية تظهر بين عمر ١٠ و٢٤ سنة' },
            { num: 55, suffix: '%', label: 'يعانون من قلق أو ضغط مستمر معظم الوقت' },
            { num: 46, suffix: '%', label: 'من جيل Z تلقّوا تشخيصًا رسميًا لحالة نفسية' },
          ].map((s, i) => (
            <div
              key={i}
              style={{
                background: '#ffffff',
                border: '1px solid #ebe6f7',
                borderRadius: '20px',
                padding: '36px 24px',
                textAlign: 'right',
                transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
                boxShadow: '0 10px 30px rgba(107,79,160,0.04)',
                position: 'relative',
              }}
              onMouseEnter={e => { 
                if(!isMobile) { 
                  e.currentTarget.style.transform = 'translateY(-8px)'; 
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(107,79,160,0.08)'; 
                  e.currentTarget.style.borderColor = '#d4bfee';
                } 
              }}
              onMouseLeave={e => { 
                if(!isMobile) { 
                  e.currentTarget.style.transform = 'translateY(0)'; 
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(107,79,160,0.04)'; 
                  e.currentTarget.style.borderColor = '#ebe6f7';
                } 
              }}
            >
              {/* الرقم*/}
              <div style={{ 
                fontSize: '44px', 
                fontWeight: '900', 
                color: '#3a2555', 
                marginBottom: '16px',
                animation: 'subtlePulse 3s infinite ease-in-out',
                display: 'inline-block'
              }}>
                <AnimatedNumber endValue={s.num} suffix={s.suffix} />
              </div>

              {/* شريط */}
              <div style={{ 
                width: '100%', 
                height: '5px', 
                background: '#f4f0ff', 
                borderRadius: '10px',
                marginBottom: '20px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${s.num}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #7c6fcd, #9b7fc7)',
                  borderRadius: '10px',
                  transformOrigin: 'right',
                  animation: 'fillProgress 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
                }} />
              </div>
              
              <div style={{ 
                fontSize: '15px', 
                color: '#665a78', 
                lineHeight: '1.8', 
                fontWeight: '600' 
              }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div 
          style={{
            background: '#ffffff',
            border: '1px solid #ebe6f7',
            borderRadius: '20px',
            padding: isMobile ? '32px 24px' : '40px 48px',
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            transition: 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 10px 30px rgba(107,79,160,0.04)',
          }}
          onMouseEnter={e => { 
            if(!isMobile) { 
              e.currentTarget.style.transform = 'translateY(-6px)'; 
              e.currentTarget.style.boxShadow = '0 20px 40px rgba(107,79,160,0.08)'; 
              e.currentTarget.style.borderColor = '#d4bfee';
            } 
          }}
          onMouseLeave={e => { 
            if(!isMobile) { 
              e.currentTarget.style.transform = 'translateY(0)'; 
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(107,79,160,0.04)'; 
              e.currentTarget.style.borderColor = '#ebe6f7';
            } 
          }}
        >
          <div style={{ textAlign: isMobile ? 'center' : 'right', flex: 1 }}>
            <div style={{ 
              fontSize: '44px', 
              fontWeight: '900', 
              color: '#3a2555',
              animation: 'subtlePulse 3s infinite ease-in-out',
              display: 'inline-block',
              marginBottom: '12px'
            }}>
              <AnimatedNumber endValue={9} suffix=" ساعات" isArabic={true} />
            </div>
            
            <div style={{ 
              width: '100%', 
              height: '5px', 
              background: '#f4f0ff', 
              borderRadius: '10px',
              marginBottom: '16px',
              overflow: 'hidden',
              maxWidth: '400px',
              margin: isMobile ? '0 auto 16px' : '0 0 16px 0'
            }}>
              <div style={{
                width: '37.5%', 
                height: '100%',
                background: 'linear-gradient(90deg, #7c6fcd, #9b7fc7)',
                borderRadius: '10px',
                transformOrigin: 'right',
                animation: 'fillProgress 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
              }} />
            </div>
          </div>

          <div style={{ 
            fontSize: '16px', 
            color: '#665a78', 
            lineHeight: '1.8', 
            fontWeight: '600',
            textAlign: isMobile ? 'center' : 'right',
            flex: 1,
            borderRight: isMobile ? 'none' : '1px solid #ebe6f7',
            paddingRight: isMobile ? '0' : '32px'
          }}>
            متوسط وقت الشاشة اليومي لجيل Z عبر جميع الأجهزة الذكية، مما يساهم في زيادة معدلات الضغط الرقمي والعزلة.
          </div>
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