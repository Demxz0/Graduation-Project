import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// ===== Hook الخاص بحركة الهيدر الموحد =====
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

function Disease() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  // استدعاء الهوك الخاص بالهيدر الموحد
  const [headerRef, headerVisible] = useRevealOnScroll();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const disorders = [
    { id: 4, label: "اضطراب القلق",sub: "(Anxiety)",border: "#d6936a",path: "/disease/anxiety" },
    { id: 5, label: "الاكتئاب",                       sub: "(Depression)",        border: "#9a0000", path: "/disease/depression" },
    { id: 2, label: "اضطراب نقص الانتباه مع فرط النشاط",     sub: "(ADHD)",              border: "#abc3d1", path: "/disease/adhd" },
    { id: 1, label: "اضطراب الأكل",                   sub: "(Eating Disorders)", border: "#ddbcd0", path: "/disease/eating-disorder" },
    { id: 3, label: "اضطراب ما بعد الصدمة",                 sub: "(PTSD)",              border: "#ab9685", path: "/disease/ptsd" },
  ];

  const cardWidth = isMobile ? '100%' : '210px';
  const cardHeight = isMobile ? '140px' : '170px';
  const containerGap = isMobile ? '16px' : '24px';

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
        background: "linear-gradient(to bottom, #f4f4ff 0%, #ffffff 100%)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: isMobile ? "40px 16px" : "60px 20px",
        direction: "rtl",
        position: "relative",
        overflow: "hidden"
      }}>
        
        {/* ===== الهيدر ===== */}
        <div
          ref={headerRef}
          style={{
            textAlign: 'center',
            padding: '20px 32px 52px',
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '10px',
            width: '100%',
            zIndex: 1
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
              fontSize: isMobile ? '38px' : '52px',
              fontWeight: '800',
              color: '#3a2555',
              marginBottom: '16px',
              letterSpacing: '-0.5px',
              opacity: headerVisible ? 1 : 0,
              transform: headerVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s cubic-bezier(0.22,1,0.36,1) 0.1s',
            }}
          >
             الاضطرابات النفسية
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
            أفهم اضطرابات الصحة النفسية ومعانيها
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

        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: containerGap,
          maxWidth: isMobile ? "100%" : "800px",
          width: "100%",
          justifyContent: "center",
          zIndex: 1
        }}>
          {disorders.map((d, index) => (
            <motion.div
              key={d.id}
              className="responsive-w-full-mobile"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              style={{ display: "flex", justifyContent: "center" }}
            >
              <motion.div
                onClick={() => navigate(d.path)}
                className="responsive-w-full-mobile"
                whileHover={{ 
                  scale: 1.05, 
                  y: -5,
                  boxShadow: "0 15px 35px rgba(0,0,0,0.1)" 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                style={{
                width: cardWidth,
                height: cardHeight,
                background: "white",
                borderRadius: "12px",
                border: `5px solid ${d.border}`,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                padding: "16px",
                cursor: "pointer",
                position: "relative",
                fontFamily: "'Tajawal', sans-serif",
                margin: isMobile ? "0 auto" : "0",
              }}
            >
              <div style={{
                position: "absolute",
                top: "-10px",
                left: "50%",
                transform: "translateX(-50%)",
                width: "100%",
                height: "8px",
                background: d.border,
                borderRadius: "50px",
                opacity: 0.7,
              }} />
              <div style={{ fontSize: "16px", fontWeight: "700", color: "#493054", marginBottom: "8px" }}>
                {d.label}
              </div>
              <div style={{ 
                fontSize: isMobile ? "11px" : "13px", 
                color: "#8888aa" 
              }}>
                {d.sub}
              </div>
            </motion.div>
          </motion.div>
          ))}
        </div>

        {/* 🔙 Floating Back Button */}
        <motion.button
          onClick={() => navigate("/")}
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            padding: "12px 24px",
            background: 'linear-gradient(135deg, #9b7fc7, #7c6fcd)',
            color: "white",
            border: "none",
            borderRadius: "50px",
            fontSize: "16px",
            fontWeight: "700",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: "0 10px 25px rgba(59, 59, 107, 0.3)",
            fontFamily: "'Tajawal', sans-serif",
            zIndex: 100,
          }}
        >
          <span>العودة للرئيسية</span>
          <span style={{ fontSize: "18px" }}></span>
        </motion.button>
      </div>
    </>
  );
}

export default Disease;