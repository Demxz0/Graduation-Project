import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//قائمة الاضطرابات 
const disorders = [
  {
    id: 'depression',
    nameAr: 'الاكتئاب',
    nameEn: 'Depression',
    color: '#d6936a',
    bg: '#f0eeff',
  },
  {
    id: 'anxiety',
    nameAr: 'اضطراب القلق',
    nameEn: 'Anxiety',
    color: '#e1844a',
    bg: '#fff0f7',
  },
  {
    id: 'adhd',
    nameAr: 'اضطراب نقص الانتباه مع فرط النشاط',
    nameEn: 'ADHD',
    color: '#5c7f94',
    bg: '#fff8ee',
  },
  {
    id: 'ptsd',
    nameAr: 'اضطراب ما بعد الصدمة',
    nameEn: 'PTSD',
    color: '#5c7f94',
    bg: '#edfaf7',
  },
  {
    id: 'eating',
    nameAr: 'اضطرابات الأكل',
    nameEn: 'Eating Disorders',
    color: '#d68cb9',
    bg: '#f0faee',
  },
];

function Exam() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();
  function handleStart() {
    if (selected) {
      navigate(`/exam/${selected}`);
    }
  }

  return (
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
      <h1 style={{
        fontSize: '38px',
        fontWeight: '800',
        color: '#3a2555',
        marginBottom: '12px',
        textAlign: 'center',
      }}>
        اختبار الصحة النفسية
      </h1>

      {/* ===== الوصف ===== */}
      <p style={{
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
       gridTemplateColumns: 'repeat(5, 1fr)', 
        gap: '20px',
       maxWidth: '1100px',
        width: '100%',
        marginBottom: '44px',
      }}>
        {disorders.map((d) => {
          const isSelected = selected === d.id;

          return (
            <div
              key={d.id}
              onClick={() => setSelected(d.id)} 
              style={{
                background: isSelected ? d.bg : 'white',
                border: isSelected
                  ? `2px solid ${d.color}` 
                  : '2px solid #ebe6f7',     
                borderRadius: '20px',
                padding: '28px 20px',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 0.25s ease', 
                boxShadow: isSelected
                  ? `0 8px 28px ${d.color}30` 
                  : '0 2px 10px rgba(0,0,0,0.05)',
                transform: isSelected ? 'translateY(-4px)' : 'none', 
                position: 'relative',
              }}

              onMouseEnter={e => {
                if (!isSelected) {
                  e.currentTarget.style.boxShadow = `0 6px 20px ${d.color}25`;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.background = `${d.color}12`;
                }
              }}
              onMouseLeave={e => {
                if (!isSelected) {
                  e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.background = 'white';
                }
              }}
            >
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: d.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  color: 'white',
                  fontWeight: '700',
                }}>
                  ✓
                </div>
              )}

              {/* الاسم العربي */}
              <div style={{
                fontSize: '17px',
                fontWeight: '700',
                color: isSelected ? d.color : '#3a2555',
                marginBottom: '6px',
                transition: 'color 0.25s',
              }}>
                {d.nameAr}
              </div>

              {/* الاسم الإنجليزي */}
              <div style={{
                fontSize: '13px',
                color: isSelected ? d.color : '#b0a0c8',
                marginBottom: '10px',
                fontStyle: 'italic',
                transition: 'color 0.25s',
              }}>
                {d.nameEn}
              </div>

              {/* الوصف */}
              <div style={{
                fontSize: '13px',
                color: '#9586b0',
                lineHeight: '1.6',
              }}>
                {d.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===== زر ابدأ ===== */}
      <button
        onClick={handleStart}
        disabled={!selected} 
        style={{
          padding: '14px 56px',
          fontSize: '19px',
          fontWeight: '700',
          fontFamily: "'Tajawal', sans-serif",
          background: selected
            ? 'linear-gradient(135deg, #9b7fc7, #7c6fcd)'
            : '#e0d8f0', 
          color: selected ? 'white' : '#b0a0c8',
          border: 'none',
          borderRadius: '50px',
          cursor: selected ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          boxShadow: selected ? '0 4px 20px rgba(124,111,205,0.35)' : 'none',
          letterSpacing: '0.5px',
        }}
        onMouseEnter={e => {
          if (selected) {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 6px 28px rgba(124,111,205,0.5)';
          }
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = selected
            ? '0 4px 20px rgba(124,111,205,0.35)'
            : 'none';
        }}
      >
        ابدأ
      </button>

      {!selected && (
        <p style={{ marginTop: '12px', fontSize: '13px', color: '#c0b4d8' }}>
          اختر اضطراباً أولاً للمتابعة
        </p>
      )}
    </div>
  );
}

export default Exam;