import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

function Disease() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const disorders = [
    { id: 1, label: "اضطراب الأكل",                           sub: "(Eating Disorders)", border: "#ddbcd0", path: "/disease/eating-disorder" },
    { id: 2, label: "اضطراب نقص الانتباه مع فرط النشاط",     sub: "(ADHD)",              border: "#abc3d1", path: "/disease/adhd" },
    { id: 3, label: "اضطراب ما بعد الصدمة",                   sub: "(PTSD)",              border: "#574144", path: "/disease/ptsd" },
    { id: 4, label: "اضطراب القلق",                           sub: "(Anxiety)",           border: "#d6936a", path: "/disease/anxiety" },
    { id: 5, label: "الاكتئاب",                               sub: "(Depression)",        border: "#545454", path: "/disease/depression" },
  ];

  const cardWidth = isMobile ? '100%' : '210px';
  const cardHeight = isMobile ? '140px' : '170px';
  const containerGap = isMobile ? '16px' : '24px';

  return (
    <div style={{
      background: "#f4f4ff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: isMobile ? "40px 16px" : "60px 20px",
      direction: "rtl",
    }}>
      <h1 style={{ 
        fontSize: isMobile ? "24px" : "28px", 
        fontWeight: "700", 
        color: "#3b3b6b", 
        marginBottom: "8px", 
        fontFamily: "'Tajawal', sans-serif",
      }}>
        🧩 الاضطرابات النفسية
      </h1>
      <p style={{ 
        fontSize: isMobile ? "14px" : "16px", 
        color: "#7b7b9b", 
        marginBottom: "50px", 
        fontFamily: "'Tajawal', sans-serif",
      }}>
        أفهم اضطرابات الصحة النفسية ومعانيها
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fit, minmax(210px, 1fr))",
        gap: containerGap,
        maxWidth: isMobile ? "100%" : "800px",
        width: "100%",
        justifyContent: "center",
      }}>
        {disorders.map(d => (
          <div
            key={d.id}
            onClick={() => navigate(d.path)}
            className="responsive-w-full-mobile"
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
              transition: "transform 0.2s, box-shadow 0.2s",
              fontFamily: "'Tajawal', sans-serif",
              margin: isMobile ? "0 auto" : "0",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.1)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
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
            <div style={{ 
              fontSize: isMobile ? "14px" : "16px", 
              fontWeight: "700", 
              color: "#493054", 
              marginBottom: "8px" 
            }}>
              {d.label}
            </div>
            <div style={{ 
              fontSize: isMobile ? "11px" : "13px", 
              color: "#8888aa" 
            }}>
              {d.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Disease;
