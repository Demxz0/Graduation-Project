import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExamModal from './ExamModal';

//قائمة الاضطرابات 
const disorders = [
  {
    id: 'anxiety',
    nameAr: 'اضطراب القلق',
    nameEn: 'Anxiety',
    color: '#d6936a',
    bg: '#fff0f7',
  },
  {
    id: 'depression',
    nameAr: 'الاكتئاب',
    nameEn: 'Depression',
    color: '#665a78',
    bg: '#f0eeff',
  },
  {
    id: 'adhd',
    nameAr: 'اضطراب نقص الانتباه مع فرط النشاط',
    nameEn: 'ADHD',
    color: '#6e91a7',
    bg: '#fff8ee',
  },
  {
    id: 'eating',
    nameAr: 'اضطرابات الأكل',
    nameEn: 'Eating Disorders',
    color: '#b47799',
    bg: '#f0faee',
  },
  {
    id: 'ptsd',
    nameAr: 'اضطراب ما بعد الصدمة',
    nameEn: 'PTSD',
    color: '#ab9685',
    bg: '#edfaf7',
  },
];

function Exam() {
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  function handleCardClick(id) {
    setSelected(id);
    setShowModal(true);
  }

  return (
    <>
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg, #faf8ff 0%, #f0ecff 50%, #fdf6ff 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 24px 40px',
        direction: 'rtl',
        fontFamily: "'Tajawal', sans-serif",
      }}>

        {/* ===== العنوان الرئيسي ===== */}
        <h1 className="reveal" style={{
          fontSize: '38px',
          fontWeight: '800',
          color: '#3a2555',
          marginBottom: '12px',
          textAlign: 'center',
        }}>
          اختبار الصحة النفسية
        </h1>

        {/* ===== الوصف ===== */}
        <p className="reveal" style={{
          fontSize: '15px',
          color: '#9586b0',
          textAlign: 'center',
          marginBottom: '48px',
          maxWidth: '520px',
          lineHeight: '1.7',
        }}>
          اختر الاضطراب الذي تريد اختبار أعراضه —{' '}
          <strong style={{ color: '#c96fa0' }}>
            الاختبار للتوعية فقط وليس تشخيصاً طبياً
          </strong>
        </p>

        {/* ===== الكاردز ===== */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '20px',
          maxWidth: '1100px',
          width: '100%',
          justifyContent: 'center',
          
        }}>
          {disorders.map((d) => (
            <div
              className="reveal"
              key={d.id}
              onClick={() => handleCardClick(d.id)}
              style={{
                background: 'white',
                border: '2px solid #c4b1f0',
                borderRadius: '20px',
                padding: '28px 20px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.25s ease',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                position: 'relative',
                display: 'flex',
               flexDirection: 'column',
               justifyContent: 'center', 
               alignItems: 'center',     
               minHeight: '200px',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 10px 32px ${d.color}30`;
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.background = d.bg;
                e.currentTarget.style.borderColor = d.color + '80';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = '#c4b1f0';
              }}
            >
              {/* الاسم العربي */}
              <div style={{
                fontSize: '17px',
                fontWeight: '700',
                color: '#3a2555',
                marginBottom: '6px',
                transition: 'color 0.25s',
                
              }}>
                {d.nameAr}
              </div>

              {/* الاسم الإنجليزي */}
              <div style={{
                fontSize: '13px',
                color: '#b0a0c8',
                marginBottom: '16px',
                fontStyle: 'italic',
                transition: 'color 0.25s',
                
              }}>
                {d.nameEn}
              </div>

             
            </div>
          ))}
        </div>
      </div>

      {showModal && selected && (
        <ExamModal
          disorderId={selected}
          onClose={() => {
            setShowModal(false);
            setSelected(null);
          }}
        />
      )}
    </>
  );
}

export default Exam;