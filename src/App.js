import './App.css';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import logo from './logo.png';
import Home from './pages/Home';
import Exam from './pages/Exam';

import { useEffect } from 'react';

function useGlobalScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    setTimeout(() => {
      document.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, []);
}

function App() {
  const location = useLocation();
useGlobalScrollReveal();
  const navLinks = [
    { name: "الرئيسية", path: "/" },
    { name: "الإختبار", path: "/ikhtbar" },
    { name:" الإضطرابات", path: "/amrad" },
    { name: "الدماغ", path: "/dimagh" },
    { name: "التعافي", path: "/taafi" },
    { name: "عوامل الخطر", path: "/khattar" },
  ];


  return (
    <div style={{
      minHeight: "100vh",
      fontFamily: "'Lato', 'Tajawal', sans-serif",
      direction: "rtl",
      position: "relative",
    }}>

      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100vw",
        margin: "0",
        padding: "0px 8px",
        height: "60px",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #e0d6f5",
        position: "sticky",
        top: "0",
        zIndex: 1000,
        boxShadow: "0 8px 25px rgba(0,0,0,0.05)"
      }}>

        {/* logo */}
        <div style={{ display: "flex", alignItems: "center", marginRight: "20px" }}>
          <img src={logo} alt="logo" style={{ width: "50px", height: "50px" }} />
          <span style={{ fontSize: "26px", fontWeight: "800", color: "#493054" }}>أُجِليك</span>
        </div>

        {/* navItems */}
        <div style={{ display: "flex", gap: "8px", marginLeft: "28px" }}>
          {navLinks.map(link => (
            <Link
              key={link.name}
              to={link.path}
              style={{
                color: location.pathname === link.path ? "#6b4fa0" : "#737373",
                textDecoration: "none",
                fontSize: "18px",
                padding: "6px 16px",
                transition: "0.3s",
                borderRadius: "0",
                borderBottom: location.pathname === link.path ? "2px solid #6b4fa0" : "none",
                paddingBottom: "2px",
                display: "inline-block",

              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#6b4fa0";
                e.currentTarget.style.background = "#ede8ff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = location.pathname === link.path ? "#6b4fa0" : "#737373";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>

      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ikhtbar" element={<Exam />} />
        {/* باقي الصفحات رح تضيفها هون لما تعملها */}
      </Routes>

    </div>
  );
}

export default App;