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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
  useGlobalScrollReveal();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinks = [
    { name: "الرئيسية",    path: "/",         scrollTo: null,                directRoute: null },
    { name: "الإختبار",    path: "/",         scrollTo: "exam-section",      directRoute: "/ikhtbar" },
    { name: "الإضطرابات",  path: "/",         scrollTo: "disorders-section", directRoute: "/disease" },
    { name: "الدماغ",      path: "/",         scrollTo: "brain-section",     directRoute: "/dimagh" },
    { name: "التعافي",     path: "/",         scrollTo: "recovery-section",  directRoute: "/recovery" },
    { name: "عوامل الخطر", path: "/",         scrollTo: "khattar-section",   directRoute: "/khattar" },
  ];

  function handleNavClick(link) {
    setActiveLink(link.name); 
    setIsMobileMenuOpen(false);

    if (link.name === "الرئيسية") {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    if (link.scrollTo) {
      if (location.pathname !== '/') {
        navigate(link.directRoute);
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      const scrollAndHighlight = () => {
        const el = document.getElementById(link.scrollTo);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          setTimeout(() => {
            window.dispatchEvent(new Event(`highlight-${link.scrollTo}`));
          }, 600);
        }
      };
      scrollAndHighlight();
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
        width: "100%",
        margin: "0",
        padding: isMobile ? "0px 12px" : "0px 28px",
        height: isMobile ? "auto" : "60px",
        minHeight: "60px",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid #e0d6f5",
        position: "sticky",
        top: "0",
        zIndex: 1000,
        boxShadow: "0 8px 25px rgba(0,0,0,0.05)",
        flexWrap: isMobile ? "wrap" : "nowrap",
      }}>

        <div 
          style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "8px",
            cursor: "pointer" 
          }}
          onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <img src={logo} alt="logo" style={{ width: isMobile ? "40px" : "46px", height: "auto" }} />
          <span style={{ 
            fontSize: isMobile ? "20px" : "24px", 
            fontWeight: "800", 
            color: "#493054", 
            fontFamily: "'Tajawal', sans-serif" 
          }}>أُجِليك</span>
        </div>

        {/* Mobile Toggle Button */}
        {isMobile && (
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: "24px",
              cursor: "pointer",
              padding: "10px",
              color: "#493054"
            }}
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        )}

        <div 
          style={{ 
            display: isMobileMenuOpen || !isMobile ? "flex" : "none",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "0" : "4px",
            alignItems: "center",
            width: isMobile ? "100%" : "auto",
            backgroundColor: isMobile ? "rgba(255,255,255,0.98)" : "transparent",
            padding: isMobile ? "10px 0" : "0",
            borderTop: isMobile ? "1px solid #e0d6f5" : "none",
          }}>
          {navLinks.map(link => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              style={{
                color: activeLink === link.name ? "#6b4fa0" : "#737373",
                fontSize: isMobile ? "15px" : "17px",
                padding: isMobile ? "12px 20px" : "6px 14px",
                transition: "0.3s",
                background: "transparent",
                border: "none",
                borderBottom: !isMobile && activeLink === link.name ? "2px solid #6b4fa0" : "2px solid transparent",
                width: isMobile ? "100%" : "auto",
                textAlign: "right",
                cursor: "pointer",
                fontFamily: "'Tajawal', sans-serif",
              }}
              onMouseEnter={e => {
                if (!isMobile) {
                  e.currentTarget.style.color = "#6b4fa0";
                  e.currentTarget.style.background = "#ede8ff";
                  e.currentTarget.style.borderRadius = "8px";
                }
              }}
              onMouseLeave={e => {
                if (!isMobile) {
                  e.currentTarget.style.color = activeLink === link.name ? "#6b4fa0" : "#737373";
                  e.currentTarget.style.background = "transparent";
                }
              }}
            >
              {link.name}
            </button>
          ))}
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