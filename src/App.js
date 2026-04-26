import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import Home from './pages/Home';
import Exam from './pages/Exam';
import Khattar from './pages/Khattar';
import Brain from './pages/Brain';
import Recovery from './pages/Recovery';
import { useEffect, useState } from 'react';

import Disease from './pages/Disease';
import AnxietyDetail from './pages/AnxietyDetail';
import ADHDDetail from './pages/ADHDDetail'; 
import EatingDisorderDetail from './pages/EatingDisorderDetail';
import PTSDDetail from './pages/PTSDDetail';
import DepressionDetail from './pages/DepressionDetail';

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
  const navigate = useNavigate();
  const [activeLink, setActiveLink] = useState("الرئيسية");
  useGlobalScrollReveal();

  const navLinks = [
    { name: "عوامل الخطر", path: "/",        scrollTo: "khattar-section" },
    { name: "التعافي",     path: "/",        scrollTo: "recovery-section" },
    { name: "الدماغ",      path: "/",        scrollTo: "brain-section" },
    { name: "الإضطرابات",  path: "/",        scrollTo: "disorders-section" },
    { name: "الإختبار",    path: "/",        scrollTo: "exam-section" },
    { name: "الرئيسية",    path: "/",        scrollTo: null },

  ];
  function handleNavClick(link) {
    setActiveLink(link.name);

    if (link.name === "الرئيسية") {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (link.scrollTo) {
      const scrollAndHighlight = () => {
        const el = document.getElementById(link.scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            window.dispatchEvent(new Event(`highlight-${link.scrollTo}`));
          }, 600);
        }
      };
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(scrollAndHighlight, 150);
      } else {
        scrollAndHighlight();
      }
    } else {
      navigate(link.path);
    }
  }

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
        padding: "0 28px",
        height: "60px",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #e0d6f5",
        position: "sticky",
        top: "0",
        zIndex: 1000,
        boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
        direction: "ltr",
      }}>

        {/* الروابط — يسار */}
        <div style={{ display: "flex", gap: "4px", alignItems: "center" }}>
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              style={{
                color: activeLink === link.name ? "#6b4fa0" : "#737373",
                borderBottom: activeLink === link.name
                  ? "2px solid #6b4fa0"
                  : "2px solid transparent",
                fontSize: "17px",
                padding: "6px 14px",
                paddingBottom: "2px",
                transition: "0.3s",
                background: "transparent",
                border: "none",
                borderBottom: activeLink === link.name ? "2px solid #6b4fa0" : "2px solid transparent",
                display: "inline-block",
                cursor: "pointer",
                fontFamily: "'Lato', 'Tajawal', sans-serif",
                direction: "rtl",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#6b4fa0";
                e.currentTarget.style.background = "#ede8ff";
                e.currentTarget.style.borderRadius = "8px";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = activeLink === link.name ? "#6b4fa0" : "#737373";
                e.currentTarget.style.background = "transparent";
              }}
            >
              {link.name}
            </button>
          ))}
        </div>

        {/* اللوجو والاسم — يمين */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", direction: "rtl", cursor: "pointer" }}
          onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <span style={{ fontSize: "24px", fontWeight: "800", color: "#493054", fontFamily: "'Tajawal', sans-serif" }}>أُجِليك</span>
          <img src={logo} alt="logo" style={{ width: "46px", height: "46px" }} />
        </div>

      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ikhtbar" element={<Exam />} />
        <Route path="/khattar" element={<Khattar />} />
        <Route path="/dimagh" element={<Brain />} />
        <Route path="/recovery" element={<Recovery />} /> 
        <Route path="/disease" element={<Disease />} /> 
        <Route path="/disease/anxiety" element={<AnxietyDetail />} />
        <Route path="/disease/adhd" element={<ADHDDetail />} />
        <Route path="/disease/eating-disorder" element={<EatingDisorderDetail />} />
        <Route path="/disease/ptsd" element={<PTSDDetail />} />
        <Route path="/disease/depression" element={<DepressionDetail />} />
      </Routes>
    </div>
  );
}

export default App;