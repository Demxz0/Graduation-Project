import '../App.css';
import image from '../image.png';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

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

function NavCard({ card, navigate }) {
  const [hovered, setHovered] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handler = () => {
      setHighlighted(true);
      setTimeout(() => setHighlighted(false), 1200);
    };
    window.addEventListener(`highlight-${card.sectionId}`, handler);
    return () => window.removeEventListener(`highlight-${card.sectionId}`, handler);
  }, [card.sectionId]);

  const isActive = hovered || highlighted;

  return (
    <div
      id={card.sectionId}
      className="reveal"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(card.route);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: isMobile ? 'flex-start' : 'center',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '16px' : '32px',
        direction: 'rtl',
        cursor: 'pointer',
        padding: isMobile ? '16px 0' : '8px 0',
        transition: 'all 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)',
        transform: isActive ? 'translateX(-6px)' : 'translateX(0)',
        width: '100%',
      }}
    >
      {/* البوكس الأبيض */}
      <div className="nav-card-container" style={{
        background: isActive ? card.iconBg : 'white',
        border: `2px solid ${isActive ? card.accentColor + '40' : '#ebe6f7'}`,
        borderRadius: '22px',
        display: 'flex',
        alignItems: 'center',
        gap: isMobile ? '12px' : '18px',
        flexShrink: 0,
        boxShadow: isActive
          ? `0 12px 32px ${card.accentColor}25`
          : '0 2px 16px rgba(0,0,0,0.07)',
        transition: 'all 0.35s cubic-bezier(0.34, 1.4, 0.64, 1)',
        transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
        width: isMobile ? '100%' : 'auto',
        padding: isMobile ? '16px 12px' : '0',
        justifyContent: isMobile ? 'flex-start' : 'center',
      }}>
       
        {/* الأيقونة */}
        <div style={{
          width: isMobile ? '60px' : '80px',
          height: isMobile ? '60px' : '80px',
          fontSize: isMobile ? '28px' : '38px',
          borderRadius: '16px',
          background: card.iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive ? 'rotate(-8deg) scale(1.12)' : 'none',
        }}>
          {card.icon}
        </div>
         {/* العنوان */}
        <div style={{
          fontWeight: '800',
          fontSize: isMobile ? '18px' : '28px',
          color: isActive ? card.accentColor : '#2d1f4a',
          transition: 'color 0.3s',
          fontFamily: "'Tajawal', sans-serif",
          whiteSpace: isMobile ? 'normal' : 'nowrap',
          flex: 1,
          textAlign: 'right',
        }}>
          {card.title}
        </div>
      </div>

      {/* الوصف */}
      <div style={{
        fontSize: isMobile ? '14px' : '27px',
        color: '#9586b0',
        lineHeight: '1.8',
        textAlign: 'right',
        fontFamily: "'Tajawal', sans-serif",
        flex: 1,
        width: isMobile ? '100%' : 'auto',
      }}>
        {card.desc}
      </div>
    </div>
  );
}

function TimelineCard({ item, width }) {
  const [hovered, setHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
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
        boxShadow: hovered ? `0 10px 25px ${item.color}66` : '0 4px 12px rgba(0,0,0,0.05)',
        border: `1px solid ${hovered ? item.color : '#f0f0f5'}`,
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.34, 1.4, 0.64, 1)',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        overflow: 'visible',
        width: isMobile ? '100%' : (width || 'auto'),
        direction: 'rtl',
      }}
    >
      {/* المعين — على اليمين */}
      <div style={{
        position: 'absolute',
        right: isMobile ? '-8px' : '-14px',
        width: isMobile ? '46px' : '54px',
        height: isMobile ? '46px' : '54px',
        background: item.color,
        transform: hovered ? 'rotate(405deg)' : 'rotate(45deg)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.12)',
        flexShrink: 0,
      }}>
        <span style={{
          color: '#493054',
          fontWeight: '900',
          fontSize: '12px',
          transform: hovered ? 'rotate(-405deg)' : 'rotate(-45deg)',
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'inline-block',
          whiteSpace: 'nowrap',
        }}>
          {item.year}
        </span>
      </div>

      {/* النص */}
      <span style={{
        fontSize: isMobile ? '13px' : '14px',
        color: '#665a78',
        fontWeight: '700',
        flex: 1,
        textAlign: 'right',
        paddingRight: '8px',
      }}>
        {item.event}
      </span>
    </div>
  );
}

function SectionCard({ card, navigate, index }) {
  const [hovered, setHovered] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handler = () => {
      setHighlighted(true);
      setTimeout(() => setHighlighted(false), 1200);
    };
    window.addEventListener(`highlight-${card.sectionId}`, handler);
    return () => window.removeEventListener(`highlight-${card.sectionId}`, handler);
  }, [card.sectionId]);

  const isActive = hovered || highlighted;

  return (
    <div
      id={card.sectionId}
      className="reveal"
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'instant' });
        navigate(card.route);
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: isMobile ? 'column' : 'row',
        gap: isMobile ? '20px' : '48px',
        direction: 'rtl',
        cursor: 'pointer',
        transition: 'all 0.4s cubic-bezier(0.34, 1.4, 0.64, 1)',
        transform: isActive ? (isMobile ? 'translateY(-6px)' : 'translateX(-10px)') : 'translateX(0)',
      }}
    >
      {/* البوكس */}
      <div style={{
        background: isActive
          ? `linear-gradient(135deg, ${card.iconBg}, white)`
          : 'white',
        border: `2.5px solid ${isActive ? card.accentColor : card.borderColor + 'aa'}`,
        borderRadius: '26px',
        padding: isMobile ? '24px' : '32px 44px',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        gap: '20px',
        flexShrink: 0,
        width: isMobile ? '100%' : '380px',
        boxShadow: isActive
          ? `0 24px 56px ${card.accentColor}40, 0 6px 20px ${card.accentColor}20, inset 0 1px 0 rgba(255,255,255,0.8)`
          : '0 4px 20px rgba(0,0,0,0.08)',
        transition: 'all 0.4s cubic-bezier(0.34, 1.4, 0.64, 1)',
        transform: isActive ? 'scale(1.03)' : 'scale(1)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* خط علوي ملوّن */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '4px',
          background: `linear-gradient(90deg, transparent, ${card.accentColor}cc, transparent)`,
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }} />

        <div style={{
          position: 'absolute', bottom: '-20px', right: '-20px',
          width: '120px', height: '120px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${card.accentColor}18, transparent 70%)`,
          opacity: isActive ? 1 : 0,
          transition: 'opacity 0.4s ease',
          pointerEvents: 'none',
        }} />

        {/* الأيقونة */}
        <div style={{
          width: '80px', height: '80px', fontSize: '38px',
          borderRadius: '18px',
          background: isActive
            ? `linear-gradient(135deg, white, ${card.iconBg})`
            : card.iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          border: `2px solid ${isActive ? card.accentColor + '40' : card.borderColor + '60'}`,
          transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isActive ? 'rotate(-10deg) scale(1.15)' : 'none',
          boxShadow: isActive ? `0 10px 24px ${card.accentColor}30` : 'none',
        }}>
          {card.icon}
        </div>

        {/* العنوان */}
        <div style={{
          fontWeight: '800', fontSize: isMobile ? '24px' : '28px',
          color: isActive ? card.accentColor : '#2d1f4a',
          transition: 'color 0.3s',
          fontFamily: "'Tajawal', sans-serif",
          flex: 1, textAlign: isMobile ? 'center' : 'right',
          letterSpacing: '-0.3px',
        }}>
          {card.title}
        </div>
      </div>

      {/* الديسكربشن */}
      <div style={{
        fontSize: isMobile ? '18px' : '24px',
        color: isActive ? '#5a4a7a' : '#9586b0',
        lineHeight: '1.8', 
        textAlign: isMobile ? 'center' : 'right',
        fontFamily: "'Tajawal', sans-serif",
        flex: 1,
        transition: 'color 0.4s',
      }}>
        {card.desc}
      </div>
    </div>
  );
}

function Home() {
  const navigate = useNavigate();
  const [activeGen, setActiveGen] = useState('z');
  const [genInfo, setGenInfo] = useState(genData['z']);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  function handleGenClick(id, e) {
    setActiveGen(id);
    setGenInfo(genData[id]);
    if (id === 'z') launchConfetti(e);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh'}}>

      {/* ===== Hero Section ===== */}
      <div style={{
        position: 'relative',
        overflowX: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        padding: isMobile ? '20px' : '40px',
      }}>

       
        <img src={image} alt="background" style={{
          position: 'absolute',
          top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
          zIndex: 0,
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="reveal responsive-title-hero" style={{
            fontWeight: '500',
            color: '#493054',
            marginBottom: '33px',
            fontFamily: "'Tajawal', sans-serif",
            lineHeight: '1.3',
            maxWidth: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            fontSize: isMobile ? '32px' : '100px',
          }}>
           أُجْلِيكَ
          </h1>
          <p className="reveal" style={{
            fontSize: 'clamp(16px, 4vw, 28px)',
            color: '#6f5779',
            fontFamily: "'Tajawal', sans-serif",
            lineHeight: '1.7',
            maxWidth: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
           دعني أُجليك من كل ما يؤذيك
          </p>
        </div>

        {/* سهم الـ scroll */}
        <div
          onClick={() => document.getElementById('learnMore').scrollIntoView({ behavior: 'smooth' })}
          style={{
            position: 'absolute',
            bottom: '70px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            zIndex: 1,
          }}
        >
          {[0, 1, 2].map(i => (
            <div key={i} style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#9b7fc7',
              animation: `dotBounce 1.4s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }} />
          ))}
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'rgba(155, 127, 199, 0.15)',
            backdropFilter: 'blur(8px)',
            border: '2px solid rgba(155, 127, 199, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            color: '#9b7fc7',
            animation: 'arrowBounce 1.6s ease-in-out infinite',
            marginTop: '4px',
          }}>
            ↓
          </div>
        </div>

        <style>{`
          @keyframes arrowBounce {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(10px); }
          }
          @keyframes dotBounce {
            0%, 100% { opacity: 0.2; transform: translateY(0px); }
            50% { opacity: 0.7; transform: translateY(4px); }
          }
          @keyframes confettiFall {
            to { transform: translateY(100vh) rotate(720deg); opacity: 0; }
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

        {/* العنوان */}
        <h2 className="reveal responsive-title-section" style={{ fontWeight: '800', color: '#665a78', textAlign: 'center', marginBottom: '10px', fontSize: isMobile ? '24px' : '25px' }}>
          من هو جيل Z؟
        </h2>
        <p className="reveal" style={{ fontSize: isMobile ? '14px' : '16px', color: '#6f5779', textAlign: 'center', marginBottom: '48px', lineHeight: '1.7' }}>
         تعرف على الجيل الذي نشأ في بيئة رقمية - وكيف أثر ذلك على صحته النفسية
        </p>

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

        <div className="reveal" style={{
          maxWidth: '1100px',
          margin: '0 auto 60px',
          direction: 'rtl',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)',
            gap: isMobile ? '16px' : '20px',
            marginBottom: isMobile ? '16px' : '20px',
          }}>
            {[
              { year: '٢٠٠٧', event: 'انتشار الهاتف الذكي', color: '#c4b5fd' },
              { year: '٢٠٠٨', event: 'الأزمة المالية العالمية', color: '#b9d1e1' },
              { year: '٢٠١٠', event: 'ثورة السوشيال ميديا', color: '#c3d6ba' },
              { year: '٢٠١٥', event: 'قلق المناخ والمستقبل', color: '#e9b89b' },
            ].map((item, i) => (
              <TimelineCard key={i} item={item} />
            ))}
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '16px' : '20px',
          }}>
            {[
              { year: '٢٠٢٠', event: 'جائحة كوفيد-١٩', color: '#dcbacb' },
              { year: '٢٠٢٣', event: 'صعود الذكاء الاصطناعي', color: '#f3d9a6' },
            ].map((item, i) => (
              <TimelineCard key={i} item={item} width={isMobile ? '100%' : "calc(25% - 10px)"} />
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
              { num: '75%', label: 'من الاضطرابات النفسية تظهر بين عمر ١٠ و٢٤ سنة' },
              { num: '55%', label: 'يعانون من قلق أو ضغط مستمر معظم الوقت' },
              { num: '46%', label: 'من جيل Z تلقّوا تشخيصًا رسميًا لحالة نفسية' },
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
                <div style={{ fontSize: '32px', fontWeight: '800', color: '#6b4fa0' }}>{s.num}</div>
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
            <div style={{ fontSize: '28px', fontWeight: '800', color: '#6b4fa0' }}>٩ ساعات</div>
            <div style={{ fontSize: '13px', color: '#9586b0', lineHeight: '1.5', marginTop: '6px' }}>متوسط وقت الشاشة اليومي لجيل Z عبر جميع الأجهزة</div>
          </div>
        </div>

      </div>

      {/* ===== أقسام أُجليك ===== */}
      <div style={{ 
        background: 'linear-gradient(160deg, #faf8ff 0%, #f0ecff 50%, #fdf6ff 100%)', 
        width: '100%',
        padding: isMobile ? '40px 20px' : '80px 60px',
      }}>
        <h1 className="reveal" style={{
          fontSize: isMobile ? '28px' : '38px',
          fontWeight: '800',
          color: '#6f5779',
          fontFamily: "'Tajawal', sans-serif",
          lineHeight: '1.7',
          marginBottom: isMobile ? '32px' : '56px',
          direction: 'rtl',
          textAlign: isMobile ? 'center' : 'right',
        }}>
          أقسام أُجليك:
        </h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          maxWidth: '1100px',
          margin: '0 auto',
        }}>
          {[
            { icon: '📝', iconBg: '#eae6fa', accentColor: '#7c6fcd', borderColor: '#c4b5fd', sectionId: 'exam-section', route: '/ikhtbar', title: 'اختبر نفسك', desc: 'أجرِ اختبار الصحة النفسية لتعرف نسبة تعرضك للاضطراب و لتتأكد من حاجتك لمساعدة نفسية.' },
            { icon: '🧩', iconBg: '#fce8e8', accentColor: '#e07b7b', borderColor: '#f4c0c0', sectionId: 'disorders-section', route: '/disease', title: 'الإضطرابات', desc:'تعرف وتعلم اكثر عن اكثر الاضطرابات النفسية شيوعاً لدى جيل Z و كيفية التعافي من كل اضطراب.' },
            { icon: '🔬', iconBg: '#e8f5e9', accentColor: '#4aab72', borderColor: '#a0ddb5', sectionId: 'brain-section', route: '/dimagh', title: 'أكتشف دماغك', desc:' الدماغ هو بطل القصة استكشف كيفية عمله وبما يتأثر وخذ جولة بين تراكيبه.'  },
            { icon: '🎮', iconBg: '#e8f4ff', accentColor: '#6e91a7', borderColor: '#b0cedd', sectionId: 'recovery-section', route: '/recovery', title: 'التعافي', desc:'طلب المساعدة هو علامة قوة حقيقية - في هذا القسم بنينا لك ما يناسب اسلوبك في التعلم..لعبة تفاعلية تعلمك كيفية التعافي والأساليب الصحيحة في التعامل مع الاضطرابات.'},
            { icon: '⚠️', iconBg: '#fff3e0', accentColor: '#d4870a', borderColor: '#f4c870', sectionId: 'khattar-section', route: '/khattar', title: 'مخاطر جيل Z', desc: 'تعرف اكثر على المخاطر المحيطة في هذا الجيل لتستطيع الوقاية منها. ' },
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
          المصادر المرجعية المستخدمة في بناء هذا التقرير: الرابطة الأمريكية لعلم النفس (APA)، منظمة الصحة العالمية (WHO)، المعهد الوطني للصحة النفسية (NIMH)، ومايو كلينك (Mayo Clinic).
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
          © 2025 أُجِليك — جميع الحقوق محفوظة
        </p>

      </footer>
    </div>
  );
}

export default Home;