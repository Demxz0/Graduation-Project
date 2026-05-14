import './App.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import logo from './logo.png';
import Home from './pages/Home';
import Exam from './pages/Exam';
import Khattar from './pages/Khattar';
import Brain from './pages/Brain';
import Recovery from './pages/Recovery';
import Game from './pages/Game';
import { useEffect, useState } from 'react';

import Disease from './pages/Disease';
import AnxietyDetail from './pages/AnxietyDetail';
import ADHDDetail from './pages/ADHDDetail'; 
import EatingDisorderDetail from './pages/EatingDisorderDetail';
import PTSDDetail from './pages/PTSDDetail';
import DepressionDetail from './pages/DepressionDetail';

import ChatBot from './pages/ChatBot';
import AboutUs from './pages/AboutUs';



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

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/') {
      setActiveLink("الرئيسية");
    } else if (currentPath === '/about-us') {
      setActiveLink("من نحن");
    } else if (currentPath === '/ikhtbar') {
      setActiveLink("اختبر نفسك");
    } else if (currentPath === '/disease' || currentPath.startsWith('/disease/')) {
      setActiveLink("الإضطرابات");
    } else if (currentPath === '/dimagh') {
      setActiveLink("الدماغ");
    } else if (currentPath === '/recovery') {
      setActiveLink("التعافي");
    } else if (currentPath === '/khattar') {
      setActiveLink("عوامل الخطر");
    } else if (currentPath === '/game') {
      setActiveLink("إلعب و تعلّم");
    }
  }, [location.pathname]);

  const navLinks = [
    { name: "الرئيسية",    path: "/",         scrollTo: null,                directRoute: null },
    { name: "الإضطرابات",  path: "/",         scrollTo: "disorders-section", directRoute: "/disease" },
    { name: "الدماغ",      path: "/",         scrollTo: "brain-section",     directRoute: "/dimagh" },
    { name: "التعافي",     path: "/",         scrollTo: "recovery-section",  directRoute: "/recovery" },
    { name: "عوامل الخطر", path: "/",         scrollTo: "khattar-section",   directRoute: "/khattar" },
    { name: "إلعب و تعلّم", path: "/",         scrollTo: "game-section",   directRoute: "/game" },
    { name: "من نحن",     path: "/about-us", scrollTo: null,             directRoute: null },
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
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: isMobile ? "auto" : "72px",
        background: "white",
        position: "fixed",
        top: "0",
        left: "0",
        zIndex: 1000,
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
        borderBottom: "1px solid #f0f0f0",
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "1400px",
          padding: isMobile ? "8px 16px" : "0 40px",
          flexWrap: isMobile ? "wrap" : "nowrap",
          gap: isMobile ? "10px" : "60px", // Gap between logo and buttons
        }}>
          {/* 1. Logo */}
          <div 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px",
              cursor: "pointer",
            }}
            onClick={() => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          >
            <img src={logo} alt="logo" style={{ width: isMobile ? "80px" : "110px", height: "auto" }} />
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

          {/* 2 & 3. Links and CTA */}
          <div 
            style={{ 
              display: isMobileMenuOpen || !isMobile ? "flex" : "none",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              width: isMobile ? "100%" : "auto",
              justifyContent: "center",
              backgroundColor: isMobile ? "rgba(255,255,255,0.98)" : "transparent",
              padding: isMobile ? "15px 0" : "0",
              borderTop: isMobile ? "1px solid #f0f0f0" : "none",
              marginTop: isMobile ? "8px" : "0",
              gap: isMobile ? "10px" : "80px", // Increased gap between links and CTA
            }}>
            
            {/* Centered Links Group */}
            <div style={{ 
              display: "flex", 
              flexDirection: isMobile ? "column" : "row",
              alignItems: "center",
              width: isMobile ? "100%" : "auto",
              gap: isMobile ? "0" : "4px",
              justifyContent: "center",
            }}>
              {navLinks.map(link => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  style={{
                    color: activeLink === link.name ? "#6b4fa0" : "#737373",
                    fontSize: isMobile ? "15px" : "16px",
                    padding: isMobile ? "12px 20px" : "8px 20px",
                    transition: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    background: activeLink === link.name ? "#f3f0ff" : "transparent",
                    border: activeLink === link.name ? "1px solid #e5dfff" : "1px solid transparent",
                    boxShadow: activeLink === link.name ? "0 4px 12px rgba(107, 79, 160, 0.12)" : "none",
                    borderRadius: "30px", // Increased radius to match site style
                    width: isMobile ? "100%" : "auto",
                    textAlign: isMobile ? "right" : "center",
                    cursor: "pointer",
                    fontFamily: "'Tajawal', sans-serif",
                    fontWeight: activeLink === link.name ? "700" : "400",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={e => {
                    if (!isMobile) {
                      e.currentTarget.style.color = "#6b4fa0";
                      e.currentTarget.style.background = "#f8f6ff";
                      e.currentTarget.style.borderRadius = "30px";
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

            {/* 3. CTA Button: اختبر نفسك */}
            <div style={{ 
              display: "flex", 
              justifyContent: "center",
              width: isMobile ? "100%" : "auto"
            }}>
              <button
                onClick={() => { navigate('/ikhtbar'); window.scrollTo({ top: 0, behavior: 'instant' }); setActiveLink("اختبر نفسك"); }}
                style={{
                  background: "#9b7fc7",
                  color: "white",
                  border: "none",
                  borderRadius: "30px", // Increased radius to match site style
                  padding: isMobile ? "12px 20px" : "10px 24px",
                  fontSize: "15px",
                  fontWeight: "700",
                  cursor: "pointer",
                  fontFamily: "'Tajawal', sans-serif",
                  width: isMobile ? "90%" : "auto",
                  marginTop: isMobile ? "10px" : "0",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 12px rgba(155, 127, 199, 0.2)",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#8a6bb5";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#9b7fc7";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                اختبر نفسك
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ikhtbar" element={<Exam />} />
        <Route path="/khattar" element={<Khattar />} />
        <Route path="/dimagh" element={<Brain />} />
        <Route path="/recovery" element={<Recovery />} />
        <Route path="/game" element={<Game />} />

        <Route path="/disease" element={<Disease />} /> 
        <Route path="/disease/anxiety" element={<AnxietyDetail />} />
        <Route path="/disease/adhd" element={<ADHDDetail />} />
        <Route path="/disease/eating-disorder" element={<EatingDisorderDetail />} />
        <Route path="/disease/ptsd" element={<PTSDDetail />} />
        <Route path="/disease/depression" element={<DepressionDetail />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>

       <ChatBot />
    </div>
  );
}

export default App;