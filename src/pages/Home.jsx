import '../App.css';
import image from '../image.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const genData = {
  z: {
    title: 'جيل Z — أنت هنا',
    desc: 'الجيل الرقمي الأول هو الجيل المولود بين عامَي ١٩٩٧ و٢٠١٢. يُعرَّف بأنه أول جيل نشأ وكبر في عالم تسوده الإنترنت والهواتف الذكية منذ الطفولة. أفراد هذا الجيل في عام ٢٠٢٦ تتراوح أعمارهم بين ١٤ و٢٩ عامًا. يُطلق عليهم أيضًا اسم "Zoomers"، وهم يشكّلون الجيل الأكثر تنوعًا وعالميًا في التاريخ.',
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

function Home() {
  const navigate = useNavigate();
  const [activeGen, setActiveGen] = useState('z');
  const [genInfo, setGenInfo] = useState(genData['z']);

  function handleGenClick(id, e) {
    setActiveGen(id);
    setGenInfo(genData[id]);
    if (id === 'z') launchConfetti(e);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

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
        padding: '40px',
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
          <h1 className="reveal" style={{ fontSize: '60px', fontWeight: '400', color: '#493054', marginBottom: '20px', fontFamily: "'Lato', sans-serif" }}>
            الوعي بالصحة النفسية
          </h1>
          <p className="reveal" style={{ fontSize: '20px', color: '#6f5779', marginBottom: '54px', fontFamily: "'Lato', sans-serif" }}>
            رحلة للتعرف على صحتك النفسية بوضوح
          </p>
          <div className="reveal" style={{ display: 'flex', flexDirection: 'row', gap: '16px', alignItems: 'center', justifyContent: 'center' }}>
            <button
              style={{ padding: '14px 28px', fontSize: '18px', background: '#9b7fc7', border: 'none', borderRadius: '50px', cursor: 'pointer', color: 'white', fontFamily: "'Tajawal', sans-serif", transition: 'all 0.3s ease' }}
              onClick={() => navigate('/ikhtbar')}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(155,127,212,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              ابدأ الاختبار ✨
            </button>
            <button
              style={{ padding: '14px 28px', fontSize: '18px', background: 'white', border: '2px solid #e0d6f5', borderRadius: '50px', cursor: 'pointer', color: '#493054', fontFamily: "'Tajawal', sans-serif", transition: 'all 0.3s ease' }}
              onClick={() => document.getElementById('learnMore').scrollIntoView({ behavior: 'smooth' })}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(155,127,212,0.4)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              تعرف أكثر 📚
            </button>
          </div>
        </div>
      </div>

      {/* ===== الكاردز الأربعة ===== */}
      <div style={{ background: '#f4f4ff', width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '800px', width: '100%', padding: '40px', direction: 'rtl' }}>
          {[
            { icon: '🧩', iconBg: '#fff3e0', title: 'الاضطرابات', desc: 'أفهم اضطرابات الصحة النفسية ومعانيها بوضوح' },
            { icon: '⚠️', iconBg: '#f3e8ff', title: 'مخاطر جيل Z', desc: 'افهم نفسك بشكل أفضل والمخاطر المحيطة بجيلك' },
            { icon: '🧠', iconBg: '#e8f5e9', title: 'أكتشف دماغك', desc: 'استكشف كيفية عمل دماغك وما يؤثر على صحتك' },
            { icon: '🌱', iconBg: '#e8f0ff', title: 'التعافي', desc: 'انت لست وحدك — طلب المساعدة هو علامة قوة' },
          ].map((card, i) => (
            <div
              className="reveal"
              key={i}
              style={{ background: 'white', borderRadius: '20px', padding: '28px 24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', cursor: 'pointer', direction: 'rtl', transition: 'all 0.3s ease' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(155,127,212,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)'; }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', direction: 'rtl' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: card.iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{card.icon}</div>
                <div style={{ fontWeight: '700', fontSize: '20px', color: '#2d2d2d' }}>{card.title}</div>
              </div>
              <div style={{ fontSize: '15px', color: '#888', textAlign: 'right', lineHeight: '1.6', width: '100%' }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== سيكشن تعرف أكثر ===== */}
      <div id="learnMore" style={{
        background: 'linear-gradient(160deg, #faf8ff 0%, #f0ecff 50%, #fdf6ff 100%)',
        padding: '72px 24px 60px',
        direction: 'rtl',
        fontFamily: "'Tajawal', sans-serif",
      }}>

        {/* العنوان */}
        <h2 className="reveal" style={{ fontSize: '38px', fontWeight: '800', color: '#665a78', textAlign: 'center', marginBottom: '10px' }}>
          من هو جيل Z؟
        </h2>
        <p className="reveal" style={{ fontSize: '16px', color: '#6f5779', textAlign: 'center', marginBottom: '48px', lineHeight: '1.7' }}>
          تعرّف على الجيل الذي وُلد في عالم رقمي — وكيف يشكّل ذلك صحته النفسية
        </p>

        {/* كاردز الأجيال */}
        <div className="reveal" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '32px' }}>
          {[
            { id: 'boomers', name: 'Baby Boomers',       year: '١٩٤٦ – ١٩٦٤' },
            { id: 'x',       name: 'الجيل X',            year: '١٩٦٥ – ١٩٨٠' },
            { id: 'millennials', name: 'الجيل Y / الميلينيالز', year: '١٩٨١ – ١٩٩٦' },
            { id: 'z',       name: 'جيل Z — أنت هنا',   year: '١٩٩٧ – ٢٠١٢' , },
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
                  
                  minWidth: '110px',
                  transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
                  transform: isActive ? 'translateY(-6px) scale(1.08)' : 'none',
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
          padding: '28px 32px',
          maxWidth: '760px',
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
          <h3 style={{ fontSize: '22px', fontWeight: '800', color: '#665a78', marginBottom: '14px' }}>{genInfo.title}</h3>
          <p style={{ fontSize: '15px', color: '#6b5a8a', lineHeight: '1.9' }}>{genInfo.desc}</p>
        </div>

        {/* الكاردز الستة */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          maxWidth: '760px',
          margin: '0 auto 56px',
        }}>
          {[
            { icon: '🧠', title: 'الأكثر انفتاحًا على الصحة النفسية', desc: 'جيل Z هو الأكثر انفتاحًا في التاريخ على الحديث عن الصحة النفسية والبحث عن المساعدة. ٤٢٪ منهم في الولايات المتحدة يتلقّون العلاج النفسي حاليًا.' },
            { icon: '📱', title: 'مواطنون رقميون بالفطرة', desc: 'هم أول جيل لم يعرف العالم بدون إنترنت. الهاتف ووسائل التواصل الاجتماعي ليست أدوات بالنسبة لهم بل هي جزء من هويتهم اليومية.' },
            { icon: '📚', title: 'الأكثر تعليمًا', desc: 'جيل Z هو الأكثر التحاقًا بالتعليم العالي مقارنةً بأي جيل سابق، ويبحثون بنشاط عن مصادر التعلم الذاتي عبر الإنترنت.' },
            { icon: '🌍', title: 'الأكثر تنوعًا', desc: 'نشأوا في بيئات أكثر تنوعًا من أي جيل سابق. ٢١٪ منهم يعرّفون أنفسهم خارج حدود مجتمع LGBTQ+، وهم أكثر قبولًا للاختلاف والتعددية.' },
            { icon: '💬', title: 'يتواصلون بطريقة مختلفة', desc: 'يفضّلون التواصل المرن والسريع عبر الفيديو والصوت والمحتوى القصير. محادثة واحدة عبر ميم أو فيديو قصير تعبّر عنهم أكثر من آلاف الكلمات.' },
            { icon: '⚡', title: 'براغماتيون وواقعيون', desc: 'شاهدوا الأزمة المالية والجائحة وهم صغار، مما جعلهم أكثر احترازًا وعمليةً في قراراتهم المهنية والمالية مقارنةً بجيل الميلينيالز.' },
          ].map((card, i) => (
            <div
              className="reveal"
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
                e.currentTarget.style.transform = 'scale(1.04) translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 12px 36px rgba(107,79,160,0.15)';
                e.currentTarget.style.borderColor = '#9b7fc7';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#ebe6f7';
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '10px' }}>{card.icon}</div>
              <div style={{ fontSize: '17px', fontWeight: '800', color: '#665a78', marginBottom: '8px' }}>{card.title}</div>
              <div style={{ fontSize: '14px', color: '#9586b0', lineHeight: '1.7' }}>{card.desc}</div>
            </div>
          ))}
        </div>

{/* ===== تايملاين الأحداث===== */}
<h3 className="reveal" style={{ fontSize: '22px', fontWeight: '800', color: '#665a78', textAlign: 'center', marginBottom: '40px' }}>
  📌 الأحداث التي شكّلت جيل Z
</h3>

<div className="reveal" style={{
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', 
  gap: '30px 40px',
  maxWidth: '900px',
  margin: '0 auto 60px',
  direction: 'rtl',
  overflow: 'visible', 
}}>
 {[
  { year: '٢٠٠٧', event: 'انتشار الهاتف الذكي', color: '#c4b5fd' },
  { year: '٢٠٠٨', event: 'الأزمة المالية العالمية', color: '#b9d1e1' },
  { year: '٢٠١٠', event: 'ثورة السوشيال ميديا', color: '#c3d6ba' },
  { year: '٢٠١٥', event: 'قلق المناخ والمستقبل', color: '#e9b89b' },
  { year: '٢٠٢٠', event: 'جائحة كوفيد-١٩', color: '#dcbacb' },
  { year: '٢٠٢٣', event: 'صعود الذكاء الاصطناعي', color: '#f3d9a6' },
].map((item, i) => (
  <div
    key={i}
    style={{
      position: 'relative',
      background: 'white',
      borderRadius: '50px',
      height: '65px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 25px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
      border: '1px solid #f0f0f5',
      cursor: 'pointer',
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = `0 10px 25px ${item.color}66`;
      e.currentTarget.style.borderColor = item.color;
      
      // دوران المعين
      const diamond = e.currentTarget.querySelector('.diamond-shape');
      if(diamond) diamond.style.transform = 'rotate(405deg)';
      
      const yearText = e.currentTarget.querySelector('.year-text');
      if(yearText) yearText.style.transform = 'rotate(-405deg)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
      e.currentTarget.style.borderColor = '#f0f0f5';
      
      const diamond = e.currentTarget.querySelector('.diamond-shape');
      if(diamond) diamond.style.transform = 'rotate(45deg)';
      
      const yearText = e.currentTarget.querySelector('.year-text');
      if(yearText) yearText.style.transform = 'rotate(-45deg)';
    }}
  >
    <span style={{ 
      fontSize: '14px', 
      color: '#665a78', 
      fontWeight: '700',
      flex: 1,
      textAlign: 'right',
      marginRight: '55px', 
    }}>
      {item.event}
    </span>

    {/* المعين */}
    <div 
      className="diamond-shape"
      style={{
        position: 'absolute',
        right: '-12px',
        width: '52px',
        height: '52px',
        background: item.color,
        transform: 'rotate(45deg)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2,
        transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
      }}
    >
      <span 
        className="year-text"
        style={{ 
          color: '#493054', 
          fontWeight: '900', 
          fontSize: '14px',
          transform: 'rotate(-45deg)', // هاد اللي بخلي النص جالس
          transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          display: 'inline-block'
        }}
      >
        {item.year}
      </span>
    </div>
  </div>
))}
</div>

        {/* الإحصائيات */}
        <div className="reveal" style={{
          background: 'white',
          border: '2px solid #ebe6f7',
          borderRadius: '24px',
          padding: '36px 32px',
          maxWidth: '760px',
          margin: '0 auto',
        }}>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#665a78', textAlign: 'center', marginBottom: '28px' }}>
            📊 معلومات موثّقة عن الصحة النفسية لجيل Z
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '16px' }}>
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
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(107,79,160,0.12)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
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

      {/* ===== Footer ===== */}
      <footer style={{
        background: '#e8dff2',
        color: '#5c4467',
        padding: '40px 60px',
        direction: 'rtl',
        fontFamily: "'Tajawal', sans-serif",
      }}>

        <p style={{
          fontSize: '15px',
          lineHeight: '1.8',
          marginBottom: '20px',
          borderBottom: '1px solid #8e7899',
          paddingBottom: '20px',
        }}>
          <strong style={{ color: '#553c61' }}>ملاحظة هامة: </strong>
          هذا المحتوى مخصص للأغراض التعليمية والتثقيفية فقط، ولا يغني عن الاستشارة الطبية أو النفسية المتخصصة.
        </p>

        <p style={{
          fontSize: '13px',
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
          width: 'fit-content',
margin: '0 auto',
textAlign: 'center',
        }}>
          <h3 style={{ color: '#553c61', fontSize: '17px', fontWeight: '700', marginBottom: '10px' }}>
            <span style={{ color: '#5c4467', marginLeft: '8px' }}>💜</span>
            هل تحتاج إلى مساعدة؟
          </h3>
          <p style={{ fontSize: '14px', color: '#5c4467', lineHeight: '1.7', margin: 0 }}>
            إذا كنت أنت أو أي شخص تعرفه يعاني من آثار صدمة نفسية، يرجى التواصل مع متخصص في الصحة النفسية أو خطوط الدعم المتاحة في بلدك.
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