import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Disease() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const disorders = [
    { id: 4, label: "اضطراب القلق",                           sub: "(Anxiety)",           border: "#d6936a", path: "/disease/anxiety" },
    { id: 5, label: "الاكتئاب",                               sub: "(Depression)",        border: "#545454", path: "/disease/depression" },
    { id: 2, label: "اضطراب نقص الانتباه مع فرط النشاط",     sub: "(ADHD)",              border: "#abc3d1", path: "/disease/adhd" },
    { id: 1, label: "اضطراب الأكل",                           sub: "(Eating Disorders)", border: "#ddbcd0", path: "/disease/eating-disorder" },
    { id: 3, label: "اضطراب ما بعد الصدمة",                   sub: "(PTSD)",              border: "#ab9685", path: "/disease/ptsd" },
  ];

  const cardWidth = isMobile ? '100%' : '210px';
  const cardHeight = isMobile ? '140px' : '170px';
  const containerGap = isMobile ? '16px' : '24px';

  return (
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
      {/* 🟢 Animated Title & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ textAlign: "center", zIndex: 1 }}
      >
        <h1 style={{ 
          fontSize: "32px", 
          fontWeight: "800", 
          color: "#3b3b6b", 
          marginBottom: "12px", 
          fontFamily: "'Tajawal', sans-serif",
          letterSpacing: "-0.5px"
        }}>
          🧩 الاضطرابات النفسية
        </h1>
        <p style={{ 
          fontSize: "17px", 
          fontWeight: "400", 
          color: "#6b6b8b", 
          marginBottom: "60px", 
          fontFamily: "'Tajawal', sans-serif" 
        }}>
          أفهم اضطرابات الصحة النفسية ومعانيها
        </p>
      </motion.div>


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
  );
}

export default Disease;
