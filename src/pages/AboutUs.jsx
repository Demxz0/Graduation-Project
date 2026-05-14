import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
}

function SectionTitle({ title, subtitle, centered = true }) {
  const [ref, visible] = useRevealOnScroll();
  return (
    <div
      ref={ref}
      style={{
        textAlign: centered ? 'center' : 'right',
        marginBottom: '50px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
    >
      <h2 style={{
        fontSize: '36px',
        fontWeight: '900',
        color: '#3a2555',
        marginBottom: '16px',
        fontFamily: "'Tajawal', sans-serif"
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{
          fontSize: '18px',
          color: '#8070a8',
          maxWidth: '600px',
          margin: centered ? '0 auto' : '0',
          lineHeight: '1.6'
        }}>
          {subtitle}
        </p>
      )}
      <div style={{
        width: '80px',
        height: '4px',
        background: 'linear-gradient(90deg, #9b7fc7, #c97099)',
        borderRadius: '10px',
        margin: centered ? '20px auto 0' : '20px 0 0',
      }} />
    </div>
  );
}

function ValueCard({ icon, title, desc, delay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        padding: '30px',
        borderRadius: '24px',
        boxShadow: hovered ? '0 20px 40px rgba(155, 127, 199, 0.15)' : '0 10px 30px rgba(0, 0, 0, 0.03)',
        border: '1px solid #f0f0f5',
        textAlign: 'center',
        transition: 'all 0.4s ease',
        transform: hovered ? 'translateY(-10px)' : 'translateY(0)',
        flex: '1',
        minWidth: '250px',
      }}
    >
      <div style={{
        fontSize: '40px',
        marginBottom: '20px',
        background: '#f8f6ff',
        width: '80px',
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        margin: '0 auto 20px',
        color: '#9b7fc7'
      }}>
        {icon}
      </div>
      <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#3a2555', marginBottom: '12px' }}>{title}</h3>
      <p style={{ fontSize: '15px', color: '#6b5a8a', lineHeight: '1.6' }}>{desc}</p>
    </motion.div>
  );
}

function AboutUs() {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [headerRef, headerVisible] = useRevealOnScroll();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const goals = [
    { icon: "🧠", text: "رفع الوعي حول الاضطرابات النفسية الأكثر انتشاراً بين الشباب" },
    { icon: "💬", text: "كسر الصمت وتطبيع الحديث عن الصحة النفسية" },
    { icon: "🆘", text: "توجيه من يحتاج نحو الموارد والمساعدة المتاحة" },
    { icon: "🤝", text: "بناء مجتمع يدعم بعضه بدل الحكم والتجاهل" },
  ];

  const values = [
    { icon: "🛡️", title: "الأمان أولاً", desc: "كل محتوى ننشره مبني على احترام الإنسان وسلامته النفسية." },
    { icon: "🤝", title: "لا للوصمة", desc: "نؤمن أن طلب المساعدة شجاعة، ليس ضعفاً." },
    { icon: "✨", title: "البساطة والوضوح", desc: "نتحدث بلغة الناس، بعيداً عن التعقيد." },
    { icon: "❤️", title: "الأثر الحقيقي", desc: "هدفنا ليس المحتوى، هدفنا الإنسان الذي يقرأه." },
  ];

  const team = [
    { name: "ديمة الجندي", role: "Project Lead & Game Developer" },
    { name: "دعاء الفليح", role: "Frontend Developer" },
    { name: "زين السوده", role: "Frontend Developer" },
    { name: "راية العمايرة", role: "UI/UX Designer" },
    { name: "مها الحياري", role: "UI/UX Designer" },
  ];

  return (
    <div style={{
      background: "linear-gradient(to bottom, #f8f9ff 0%, #ffffff 100%)",
      minHeight: "100vh",
      paddingTop: "100px", // space for navbar
      direction: "rtl",
      fontFamily: "'Tajawal', sans-serif",
      overflowX: "hidden"
    }}>
      {/* Hero Section */}
      <div 
        ref={headerRef}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: isMobile ? "40px 20px" : "80px 20px",
          textAlign: "center",
          position: "relative"
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={headerVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            background: "rgba(255, 255, 255, 0.7)",
            backdropFilter: "blur(20px)",
            borderRadius: "40px",
            padding: isMobile ? "40px 20px" : "60px 40px",
            boxShadow: "0 20px 50px rgba(155, 127, 199, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.5)",
          }}
        >
          <h1 style={{
            fontSize: isMobile ? "32px" : "54px",
            fontWeight: "900",
            color: "#3a2555",
            marginBottom: "24px",
            lineHeight: "1.2"
          }}>
            أُجليك — لأنك تستحق أن تُسمع
          </h1>
          <p style={{
            fontSize: isMobile ? "18px" : "22px",
            color: "#6b5a8a",
            maxWidth: "800px",
            margin: "0 auto",
            lineHeight: "1.8",
            fontWeight: "500"
          }}>
            مشروع خيري يؤمن بأن الصحة النفسية ليست رفاهية، بل حق لكل إنسان.
          </p>
        </motion.div>

        {/* Decorative elements */}
        <div style={{
          position: "absolute",
          top: "10%",
          left: "5%",
          width: "150px",
          height: "150px",
          background: "radial-gradient(circle, #d4bfee50, transparent)",
          borderRadius: "50%",
          zIndex: -1
        }} />
        <div style={{
          position: "absolute",
          bottom: "10%",
          right: "5%",
          width: "200px",
          height: "200px",
          background: "radial-gradient(circle, #c0e8d850, transparent)",
          borderRadius: "50%",
          zIndex: -1
        }} />
      </div>

      {/* Story Section */}
      <div style={{
        maxWidth: "1000px",
        margin: "60px auto",
        padding: "0 20px"
      }}>
        <div style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: "40px",
          alignItems: "center"
        }}>
          <div style={{ flex: 1 }}>
            <SectionTitle title="قصتنا | لماذا أجليك؟" centered={false} />
            <p style={{ fontSize: "17px", color: "#493054", lineHeight: "1.9", textAlign: "justify" }}>
              الأرقام كانت مؤلمة جداً لنتجاهلها. معدلات الانتحار ترتفع، واضطرابات القلق والاكتئاب تنتشر بين المراهقين والشباب بشكل مقلق — وفي الوقت ذاته، يبقى الحديث عن الصحة النفسية محاطاً بالوصمة والصمت.
            </p>
            <p style={{ fontSize: "17px", color: "#493054", lineHeight: "1.9", textAlign: "justify", marginTop: "15px" }}>
              وُلد أجليك من هذا الألم. بدأ كمشروع تخرج، لكنه تحوّل إلى رسالة: ألا يمرّ أحد بما يمرّ به وحيداً، وألا تُغلق باب أمام شخص يبحث عن مساعدة. اسمنا يقول كل شيء — أجليك أنت.
            </p>
          </div>
          <div style={{ 
            flex: 0.8, 
            background: "linear-gradient(135deg, #f3f0ff, #fff)", 
            borderRadius: "30px", 
            padding: "40px",
            boxShadow: "inset 0 0 20px rgba(155, 127, 199, 0.05)",
            border: "2px solid #f0eaff",
            textAlign: "center"
          }}>
             <span style={{ fontSize: "100px" }}>🌟</span>
          </div>
        </div>
      </div>

      {/* Mission & Goals */}
      <div style={{
        background: "#faf8ff",
        padding: "100px 0",
        margin: "80px 0"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}>
          <div style={{ textAlign: "center", marginBottom: "80px" }}>
            <SectionTitle title="رسالتنا" subtitle="نسعى إلى نشر الوعي النفسي بلغة بسيطة وصادقة، وتوفير محتوى موثوق يساعد الأفراد — وخاصة المراهقين — على فهم مشاعرهم، وطلب المساعدة، ودعم من حولهم." />
          </div>

          <div style={{ 
            display: "grid", 
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", 
            gap: "30px" 
          }}>
            <div style={{ 
              background: "white", 
              padding: "40px", 
              borderRadius: "32px", 
              boxShadow: "0 10px 30px rgba(0,0,0,0.02)" 
            }}>
              <h3 style={{ fontSize: "24px", fontWeight: "900", color: "#3a2555", marginBottom: "30px" }}>أهدافنا</h3>
              {goals.map((goal, idx) => (
                <div key={idx} style={{ 
                  display: "flex", 
                  alignItems: "center", 
                  gap: "15px", 
                  marginBottom: "20px",
                  background: "#fdfbff",
                  padding: "15px",
                  borderRadius: "15px",
                  border: "1px solid #f0eaff"
                }}>
                  <span style={{ fontSize: "24px" }}>{goal.icon}</span>
                  <span style={{ fontSize: "16px", color: "#493054", fontWeight: "600" }}>{goal.text}</span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
               <h3 style={{ fontSize: "24px", fontWeight: "900", color: "#3a2555", marginBottom: "20px" }}>من نحن؟</h3>
               <p style={{ fontSize: "18px", color: "#493054", lineHeight: "1.9" }}>
                 نحن مجموعة من الطالبات نؤمن بأن التغيير يبدأ بخطوة صغيرة — مقال، معلومة، أو جملة تُشعر شخصاً ما بأنه ليس وحده.
               </p>
               <p style={{ fontSize: "18px", color: "#493054", lineHeight: "1.9", marginTop: "15px" }}>
                 هذا المشروع لم يُبنَ في مختبر، بُني من قلوب رأت حاجة حقيقية وقررت أن تفعل شيئاً.
               </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div style={{ maxWidth: "1200px", margin: "80px auto", padding: "0 20px" }}>
        <SectionTitle title="قيمنا" />
        <div style={{ 
          display: "flex", 
          flexWrap: "wrap", 
          gap: "20px", 
          justifyContent: "center" 
        }}>
          {values.map((v, i) => (
            <ValueCard key={i} icon={v.icon} title={v.title} desc={v.desc} delay={i * 0.1} />
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div style={{ 
        maxWidth: "1000px", 
        margin: "100px auto", 
        padding: "0 20px" 
      }}>
        <SectionTitle title="فريقنا" subtitle="خلف أجليك فريق من الطالبات المؤمنات بالتغيير، كل واحدة منهن أضافت شيئاً حقيقياً لهذا المشروع." />
        
        <div style={{ 
          overflowX: "auto", 
          background: "white", 
          borderRadius: "30px", 
          boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
          border: "1px solid #f0f0f5",
          padding: "20px"
        }}>
          <table style={{ 
            width: "100%", 
            borderCollapse: "collapse", 
            minWidth: "500px",
            textAlign: "right"
          }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #f0f0ff" }}>
                <th style={{ padding: "20px", color: "#3a2555", fontSize: "18px", fontWeight: "900" }}>الاسم</th>
                <th style={{ padding: "20px", color: "#3a2555", fontSize: "18px", fontWeight: "900" }}>الدور</th>
              </tr>
            </thead>
            <tbody>
              {team.map((member, idx) => (
                <tr key={idx} style={{ 
                  borderBottom: idx === team.length - 1 ? "none" : "1px solid #f8f8ff",
                  transition: "background 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#fafaff"}
                onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                >
                  <td style={{ padding: "20px", color: "#493054", fontWeight: "700" }}>{member.name}</td>
                  <td style={{ padding: "20px", color: "#6b5a8a" }}>
                    <span style={{ 
                      background: "#f0efff", 
                      padding: "6px 15px", 
                      borderRadius: "20px", 
                      fontSize: "14px",
                      fontWeight: "600",
                      color: "#6b4fa0"
                    }}>
                      {member.role}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer-like closing */}
      <div style={{
        background: "linear-gradient(135deg, #6b4fa0, #3a2555)",
        padding: "80px 20px",
        textAlign: "center",
        color: "white",
        marginTop: "100px",
        borderRadius: isMobile ? "0" : "60px 60px 0 0"
      }}>
        <h2 style={{ fontSize: isMobile ? "24px" : "36px", fontWeight: "900", marginBottom: "20px" }}>
          إذا كنت هنا، فأنت في المكان الصح.
        </h2>
        <p style={{ fontSize: "18px", opacity: 0.9, maxWidth: "700px", margin: "0 auto 40px", lineHeight: "1.8" }}>
          سواء كنت تبحث عن مساعدة، أو تريد أن تفهم أكثر، أو تسعى لدعم شخص تحبه — أجليك موجود.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/")}
          style={{
            background: "white",
            color: "#6b4fa0",
            border: "none",
            padding: "15px 40px",
            borderRadius: "50px",
            fontSize: "18px",
            fontWeight: "800",
            cursor: "pointer",
            boxShadow: "0 10px 20px rgba(0,0,0,0.2)"
          }}
        >
          ابدأ رحلتك معنا
        </motion.button>
      </div>
    </div>
  );
}

export default AboutUs;
