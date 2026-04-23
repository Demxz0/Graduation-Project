function Disease() {
  const disorders = [
    { id: 1, label: "اضطراب ما بعد الصدمة", sub: "(PTSD)", border: "#f5c97a" },
    { id: 2, label: "اضطراب القلق", sub: "(Anxiety)", border: "#88d4e8" },
    { id: 3, label: "الأكتئاب", sub: "(Depression)", border: "#f0a8c0" },
    { id: 4, label: "اضطراب الأكل", sub: "(Eating Disorders)", border: "#a8d5b0" },
    { id: 5, label: "اضطراب نقص الانتباه مع فرط النشاط", sub: "(ADHD)", border: "#e8a87c" },
  ];

  return (
    <div style={{
      background: "#eef0f8",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "60px 20px",
      direction: "rtl",
    }}>

      {/* العنوان */}
      <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#3b3b6b", marginBottom: "8px", fontFamily: "'Tajawal', sans-serif" }}>
        🌿 الاضطرابات النفسية
      </h1>
      <p style={{ fontSize: "16px", color: "#7b7b9b", marginBottom: "50px", fontFamily: "'Tajawal', sans-serif" }}>
        أفهم اضطرابات الصحة النفسية ومعانيها
      </p>

      {/* البطاقات */}
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
            style={{
              width: "210px",
              height: "140px",
              background: "white",
              borderRadius: "20px",
              border: `3px solid ${d.border}`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "16px",
              cursor: "pointer",
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