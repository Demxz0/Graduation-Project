import '../App.css';
import image from '../image.png';

function Home() {
  return (
    <div style={{
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
}}>

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
          <h1 className="reveal" style={{ fontSize: "60px", fontWeight: "400", color: "#493054", marginBottom: "20px", fontFamily: "'Lato', sans-serif" }}>
            الوعي بالصحة النفسية
          </h1>
          <p className="reveal" style={{ fontSize: "20px", color: "#6f5779", marginBottom: "54px", fontFamily: "'Lato', sans-serif" }}>
            رحلة للتعرف على صحتك النفسية بوضوح
          </p>
          <div className="reveal" style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "center", justifyContent: "center" }}>
            <button style={{ padding: "14px 28px", fontSize: "18px", background: "#9b7fc7", border: "none", borderRadius: "50px", cursor: "pointer", color: "white", fontFamily: "'Tajawal', sans-serif" }}
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
            <div className="reveal" key={i} style={{ background: "white", borderRadius: "20px", padding: "28px 24px", display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer", direction: "rtl" }}
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

{/* ===== Footer ===== */}
<footer style={{
  background: '#e8dff2',
  color: '#5c4467',
  padding: '40px 60px',
  direction: 'rtl',
  fontFamily: "'Tajawal', sans-serif",
}}>

  {/* ملاحظة هامة */}
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

  {/* المصادر */}
  <p style={{
    fontSize: '13px',
    color: '#858286',
    lineHeight: '1.8',
    marginBottom: '28px',
  }}>
    المصادر المرجعية المستخدمة في بناء هذا التقرير: الرابطة الأمريكية لعلم النفس (APA)، منظمة الصحة العالمية (WHO)، المعهد الوطني للصحة النفسية (NIMH)، ومايو كلينك (Mayo Clinic).
  </p>

  {/* كارد هل تحتاج مساعدة */}
  <div style={{ animation: 'float 3s ease-in-out infinite',
    background: 'linear-gradient(135deg , #e3dbf1, #d4c5e8)',
    border: '1px solid #8e7899',
    borderRadius: '16px',
    padding: '20px 24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  }}>
    <h3 style={{
      color: '#553c61',
      fontSize: '17px',
      fontWeight: '700',
      marginBottom: '10px',
    }}>
      <span style={{ color: '#5c4467', marginLeft: '8px' }}>💜</span>
      هل تحتاج إلى مساعدة؟
    </h3>
    <p style={{
      fontSize: '14px',
      color: '#5c4467',
      lineHeight: '1.7',
      margin: 0,
    }}>
      إذا كنت أنت أو أي شخص تعرفه يعاني من آثار صدمة نفسية، يرجى التواصل مع متخصص في الصحة النفسية أو خطوط الدعم المتاحة في بلدك.
    </p>
  </div>

  {/* حقوق */}
  <p style={{
    textAlign: 'center',
    fontSize: '12px',
    color: '#5c4467',
    marginTop: '24px',
    paddingTop: '16px',
    margin: '24px 0 0',
  }}>
    © 2025 أُجِليك — جميع الحقوق محفوظة
  </p>

</footer>
    </div>
  );
}

export default Home;