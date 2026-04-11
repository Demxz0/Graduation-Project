import { useNavigate } from 'react-router-dom';

function Disease() {
  const navigate = useNavigate();

  const disorders = [
    { id: 1, label: "الاكتئاب",                              sub: "(Depression)",        border: "#ddbcd0", path: "/disease/depression" },
    { id: 2, label: "اضطراب القلق",                          sub: "(Anxiety)",            border: "#abc3d1", path: "/disease/anxiety" },
    { id: 3, label: "اضطراب ما بعد الصدمة",                  sub: "(PTSD)",               border: "#fee8c6", path: "/disease/ptsd" },
    { id: 4, label: "اضطراب نقص الانتباه مع فرط النشاط",    sub: "(ADHD)",               border: "#d6936a", path: "/disease/adhd" },
    { id: 5, label: "اضطراب الأكل",                          sub: "(Eating Disorders)",  border: "#c8d5c4", path: "/disease/eating" },
  ];

  return (
    <div style={{
      background: "#f4f4ff",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "60px 20px",
      direction: "rtl",
    }}>
      <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#3b3b6b", marginBottom: "8px", fontFamily: "'Tajawal', sans-serif" }}>
        🧩 الاضطرابات النفسية
      </h1>
      <p style={{ fontSize: "16px", color: "#7b7b9b", marginBottom: "50px", fontFamily: "'Tajawal', sans-serif" }}>
        أفهم اضطرابات الصحة النفسية ومعانيها
      </p>

      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "24px",
        maxWidth: "800px",
      }}>
        {disorders.map(d => (
          <div
            key={d.id}
            onClick={() => navigate(d.path)}
            style={{
              width: "210px",
              height: "170px",
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
            <div style={{ fontSize: "16px", fontWeight: "700", color: "#3b3b6b", marginBottom: "8px" }}>
              {d.label}
            </div>
            <div style={{ fontSize: "13px", color: "#8888aa" }}>
              {d.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Disease;
