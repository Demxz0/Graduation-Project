import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import Home from './pages/Home';
import Exam from './pages/Exam';
import Khattar from './pages/Khattar';
import Brain from './pages/Brain';
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
    { name: "الرئيسية",    path: "/",        scrollTo: null },
    { name: "الإختبار",    path: "/",  scrollTo: "exam-section" },
    { name: "الإضطرابات", path: "/",         scrollTo: "disorders-section" },
    { name: "الدماغ",      path: "/",         scrollTo: "brain-section" },
    { name: "التعافي",     path: "/",         scrollTo: "recovery-section" },
    { name: "عوامل الخطر", path: "/",         scrollTo: "khattar-section" },
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
            <button
              key={link.name}
              onClick={() => handleNavClick(link)}
              style={{
                color: activeLink === link.name ? "#6b4fa0" : "#737373",
borderBottom: activeLink === link.name
  ? "2px solid #6b4fa0"
  : "2px solid transparent",
                fontSize: "18px",
                padding: "6px 16px",
                paddingBottom: "2px",
                transition: "0.3s",
                background: "transparent",
                border: "none",
                
                display: "inline-block",
                cursor: "pointer",
                fontFamily: "'Lato', 'Tajawal', sans-serif",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#6b4fa0";
                e.currentTarget.style.background = "#ede8ff";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = location.pathname === link.path && !link.scrollTo
                  ? "#6b4fa0" : "#737373";
                e.currentTarget.style.background = "transparent";
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
  <Route path="/recovery" element={<div>قريباً</div>} />

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