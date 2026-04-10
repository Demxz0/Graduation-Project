import '../App.css';
import image from '../image.png';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  return (
    <div>

      {/* Section */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "40px",
      }}>
        <img src={image} alt="background" style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          
          height: "100%",
          objectFit: "cover",
          pointerEvents: "none",
          zIndex: 0,
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <h1 style={{ fontSize: "60px", fontWeight: "400", color: "#493054", marginBottom: "20px", fontFamily: "'Lato', sans-serif" }}>
            الوعي بالصحة النفسية
          </h1>
          <p style={{ fontSize: "20px", color: "#6f5779", marginBottom: "54px", fontFamily: "'Lato', sans-serif" }}>
            رحلة للتعرف على صحتك النفسية بوضوح
          </p>
          <div style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "center", justifyContent: "center" }}>
            <button style={{ padding: "14px 28px", fontSize: "18px", background: "#9b7fc7", border: "none", borderRadius: "50px", cursor: "pointer", color: "white", fontFamily: "'Tajawal', sans-serif" }}
             onClick={() => navigate('/ikhtbar')}
             onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(155,127,212,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              ابدأ الاختبار ✨
            </button>
            <button style={{ padding: "14px 28px", fontSize: "18px", background: "white", border: "2px solid #e0d6f5", borderRadius: "50px", cursor: "pointer", color: "#493054", fontFamily: "'Tajawal', sans-serif" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(155,127,212,0.4)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "none"; }}>
              تعرف أكثر 📚
            </button>
          </div>
        </div>
      </div>

      {/* الكاردز */}
      <div style={{ background: "#f4f4ff", width: "100%", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", maxWidth: "800px", width: "100%", padding: "40px", direction: "rtl" }}>
          {[
            { icon: "🧩", iconBg: "#fff3e0", title: "الاضطرابات", desc: "أفهم اضطرابات الصحة النفسية ومعانيها بوضوح" },
            { icon: "⚠️", iconBg: "#f3e8ff", title: "مخاطر جيل Z", desc: "افهم نفسك بشكل أفضل والمخاطر المحيطة بجيلك" },
            { icon: "🧠", iconBg: "#e8f5e9", title: "أكتشف دماغك", desc: "استكشف كيفية عمل دماغك وما يؤثر على صحتك" },
            { icon: "🌱", iconBg: "#e8f0ff", title: "التعافي", desc: " انت لست وحدك طلب المساعدة هو علامة قوة" },
          ].map((card, i) => (
            <div key={i} style={{ background: "white", borderRadius: "20px", padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer", direction: "rtl" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.02)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(155,127,212,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}>

              {/* الصورة والعنوان بصف واحد */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", direction: "rtl" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: card.iconBg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "22px" }}>{card.icon}</div>
                <div style={{ fontWeight: "700", fontSize: "20px", color: "#2d2d2d" }}>{card.title}</div>
              </div>

              {/* الوصف تحت */}
              <div style={{ fontSize: "15px", color: "#888", textAlign: "right", lineHeight: "1.6", width: "100%" }}>{card.desc}</div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Home;