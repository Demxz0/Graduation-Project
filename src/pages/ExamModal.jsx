import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ===== بيانات الأسئلة لكل اضطراب =====

const examData = {
  ptsd: {
    title: 'اضطراب ما بعد الصدمة',
    titleEn: 'PTSD',
    color: '#ab9685',
    icon: '🧩',
    intro: 'يقيس هذا الاختبار الأعراض الشائعة لاضطراب ما بعد الصدمة بناءً على معايير DSM-5. أجب بصدق عن تجربتك خلال الأسابيع الماضية.',
    questions: [
      'هل تراودك ذكريات مؤلمة ومتكررة وغير طوعية للحدث الصادم؟',
      'هل تعاني من أحلام مزعجة أو كوابيس تتعلق بالحدث أو بمشاعره؟',
      'هل تشعر بضيق نفسي شديد أو تسارع في نبضات القلب عند التعرض لشيء يذكرك بالحدث؟',
      'هل تبذل مجهوداً لتجنب التفكير في الحدث أو تجنب المشاعر المرتبطة به؟',
      'هل تتجنب الأماكن، الأشخاص، أو المواقف التي تذكرك بما حدث؟',
      'هل أصبحت تنظر لنفسك أو للعالم أو للآخرين بسلبية شديدة (مثل "أنا سيء" أو "العالم خطر جداً")؟',
      'هل تشعر باللوم المستمر لنفسك أو للآخرين حول سبب وقوع الحدث أو تبعاته؟',
      'هل تشعر بالانفصال عن الآخرين أو الغربة عن الأهل والأصدقاء؟',
      'هل تعاني من نوبات غضب مفاجئة، تهيج، أو سلوك عدواني مع القليل من الاستفزاز؟',
      'هل تعاني من يقظة مفرطة (تراقب محيطك باستمرار) أو تجفل بسهولة من الأصوات المفاجئة؟',
    ],
    results: [
      {
        range: [0, 6],
        level: 'احتمال منخفض',
        levelColor: '#ab9685',
        title: 'غير مصاب بالاضطراب غالباً',
        desc: 'أعراضك ضمن النطاق الطبيعي للاستجابة للضغوط.',
        percent: 30,
        recommendation: 'تابع اهتمامك بصحتك النفسية وتواصل مع متخصص إن شعرت بتغيير سلبي.',
      },
      {
        range: [7, 12],
        level: 'احتمال متوسط',
        levelColor: '#ab9685',
        title: 'توجد أعراض صدمة',
        desc: 'تعاني من بعض آثار صدمة نفسية,التي قد تؤثر على جودة حياتك.',
        percent: 60,
        recommendation: 'ننصحك باستشارة مختص لتقييم حالتك ومنع تفاقمها.',
      },
      {
        range: [13, 20],
        level: 'احتمال مرتفع',
        levelColor: '#ab9685',
        title: 'مؤشر قوي على الإصابة',
        desc: 'نقاطك تشير إلى احتمالية عالية لوجود اضطراب ما بعد الصدمة (PTSD).',
        percent: 90,
        recommendation: 'من الضروري مراجعة طبيب نفسي للحصول على تشخيص دقيق وخطة علاجية.',
      },
    ],
  },

  depression: {
    title: 'الاكتئاب',
    titleEn: 'Depression',
    color: '#665a78',
    icon: '🌧️',
    intro: 'يقيس هذا الاختبار أعراض الاكتئاب بناءً على معايير DSM-5. أجب بصدق عن مشاعرك وحالتك خلال الأسبوعين الماضيين.',
    questions: [
      'هل كنت تشعر بالحزن أو الاكتئاب أو الفراغ معظم اليوم؟',
      'هل فقدت الاهتمام أو المتعة في معظم الأنشطة التي كنت تستمتع بها؟',
      'هل لاحظت تغيراً واضحاً في وزنك أو شهيتك (زيادة أو نقصان) بدون سبب؟',
      'هل تعاني من مشاكل في النوم (أرق أو نوم مفرط)؟',
      'هل تشعر ببطء في الحركة أو الكلام، أو العكس (توتر وحركة زائدة)؟',
      'هل تشعر بالتعب أو فقدان الطاقة بشكل شبه يومي؟',
      'هل تشعر بعدم القيمة أو بالذنب المفرط أو غير المبرر؟',
      'هل لديك صعوبة في التفكير أو التركيز أو اتخاذ القرارات؟',
      'هل تراودك أفكار متكررة عن الموت أو أفكار لإيذاء نفسك؟',
      'هل أثرت هذه الأعراض على دراستك أو عملك أو علاقاتك بشكل واضح؟',
    ],
    results: [
      {
        range: [0, 6],
        level: 'احتمال منخفض',
        levelColor: '#665a78',
        title: 'غير مصاب غالباً',
        desc: 'الأعراض ضمن الطبيعي أو مؤقتة.',
        percent: 25,
        recommendation: 'تابع اهتمامك بصحتك النفسية.',
      },
      {
        range: [7, 12],
        level: 'احتمال متوسط',
        levelColor: '#665a78',
        title: 'توجد أعراض اكتئاب',
        desc: 'قد تؤثر على حياتك اليومية.',
        percent: 55,
        recommendation: 'يُنصح باستشارة مختص لتقييم حالتك.',
      },
      {
        range: [13, 20],
        level: 'احتمال مرتفع',
        levelColor: '#665a78',
        title: 'مؤشر قوي على الاكتئاب',
        desc: 'يفضل مراجعة مختص نفسي للتقييم.',
        percent: 85,
        recommendation: 'من المهم التواصل مع متخصص في أقرب وقت.',
      },
    ],
  },

  anxiety: {
    title: 'اضطراب القلق',
    titleEn: 'Anxiety',
    color: '#d6936a',
    icon: '⚡',
    intro: 'يقيس هذا الاختبار مستوى القلق العام بناءً على الأعراض الشائعة. أجب بصدق عن مشاعرك وتجاربك خلال الفترة الأخيرة.',
    questions: [
      'هل تشعر بالعصبية، أو القلق، أو التوتر الشديد، أو أنك على حافة الانهيار؟',
      'هل تجد عدم القدرة على إيقاف القلق أو السيطرة عليه؟',
      'هل تقلق بشكل مفرط بشأن أشياء مختلفة في حياتك (كالصحة، العمل، الأسرة)؟',
      'هل تواجه صعوبة بالغة في الاسترخاء جسدياً وذهنياً؟',
      'هل تشعر بضيق أو تململ لدرجة أنه يصعب عليك الجلوس بهدوء؟',
      'هل تصبح منزعجاً أو غضباناً بسرعة الاستثارة وبشكل غير معتاد؟',
      'هل تشعر بالخوف كما لو أن شيئاً مروعاً أو كارثياً على وشك الحدوث؟',
      'هل عانيت من نوبات مفاجئة وغير متوقعة من الخوف الشديد مصحوبة بأعراض جسدية (تسارع النبض، تعرق، ضيق، تنفر)؟',
      'هل الخوف من الإحراج، أو التعرض للنقد، أو أن تبدو غبياً يجعلك تتجنب التحدث أو القيام بالأنشطة الاجتماعية؟',
      'هل تتجنب المواقف الاجتماعية التي قد تكون فيها مركز الاهتمام أو تحت مراقبة الآخرين؟',
    ],
    results: [
      {
        range: [0, 6],
        level: 'قلق منخفض',
        levelColor: '#d6936a',
        title: 'لا توجد مؤشرات واضحة للقلق',
        desc: 'الأعراض ضمن النطاق الطبيعي أو ناتجة عن ضغوط يومية عادية.',
        percent: 25,
        recommendation: 'تابع اهتمامك بصحتك النفسية واستمر في استراتيجيات الرعاية الذاتية.',
      },
      {
        range: [7, 12],
        level: 'قلق خفيف إلى متوسط',
        levelColor: '#d6936a',
        title: 'توجد مستويات من القلق تؤثر على حياتك',
        desc: 'الأعراض تسبب بعض الاضطراب ولكنها غالباً لا تعيق الأداء اليومي بشكل كامل.',
        percent: 55,
        recommendation: 'يُنصح باستشارة مختص لتقييم الحالة والدعم النفسي الأولي.',
      },
      {
        range: [13, 20],
        level: 'قلق مرتفع',
        levelColor: '#d6936a',
        title: 'مؤشر قوي على اضطراب القلق',
        desc: 'الأعراض واضحة وتؤثر على جودة الحياة والأداء الوظيفي والاجتماعي.',
        percent: 85,
        recommendation: 'يُنصح بمراجعة متخصص نفسي للحصول على تشخيص دقيق وخطة علاجية.',
      },
    ],
  },

  adhd: {
    title: 'اضطراب نقص الانتباه مع فرط النشاط',
    titleEn: 'ADHD',
    color: '#6e91a7',
    icon: '🔄',
    intro: 'يقيس هذا الاختبار أعراض ADHD الشائعة المتعلقة بالتركيز والانتباه وفرط النشاط. أجب بصدق عن تكرار هذه الأعراض في حياتك اليومية.',
    questions: [
      'كم مرة تجد صعوبة في إنهاء التفاصيل النهائية للمشروع بمجرد الانتهاء من الأجزاء الصعبة؟',
      'كم مرة تجد صعوبة في ترتيب الأشياء وتنظيمها عندما تضطر للقيام بمهمة تتطلب التنظيم؟',
      'كم مرة تواجه مشكلة في تذكر المواعيد أو الالتزامات؟',
      'عندما يكون لديك مهمة تتطلب الكثير من التفكير، كم مرة تتجنب أو تؤجل البدء فيها؟',
      'كم مرة تحرك يديك أو قدميك بتململ عندما تضطر للجلوس لفترة طويلة؟',
      'كم مرة تشعر بأنك مدفوع ومنطلق وكأنك "محرك" ولا تستطيع التوقف عن النشاط؟',
      'كم مرة ترتكب أخطاء بسبب عدم الانتباه عند العمل على مشروع ممل أو متكرر؟',
      'كم مرة تجد صعوبة في التركيز على ما يقوله الناس لك، حتى عندما يتحدثون إليك مباشرة؟',
      'كم مرة تضيع أو تواجه صعوبة في العثور على أشيائك الضرورية (مفاتيح، محفظة، هاتف)؟',
      'كم مرة تقاطع الآخرين في حديثهم أو تنهي جملهم قبل أن يكملوا كلامهم؟',
    ],
    results: [
      {
        range: [0, 7],
        level: 'النطاق الطبيعي',
        levelColor: '#6e91a7',
        title: 'تشتت عابر أو نسيان طبيعي',
        desc: 'لا يشير ذلك إلى وجود اضطراب، بل هو نتيجة ضغوط الحياة العادية.',
        percent: 25,
        recommendation: 'تابع اهتمامك بصحتك النفسية.',
      },
      {
        range: [8, 13],
        level: 'منطقة متوسطة',
        levelColor: '#6e91a7',
        title: 'سمات واضحة لضعف التركيز',
        desc: 'قد تكون ناتجة عن سمات ADHD بسيطة، أو عوامل أخرى كالقلق أو نقص النوم.',
        percent: 55,
        recommendation: 'ننصحك باستشارة مختص لتقييم حالتك.',
      },
      {
        range: [14, 20],
        level: 'احتمالية عالية',
        levelColor: '#6e91a7',
        title: 'تطابق كبير مع أعراض ADHD',
        desc: 'الأعراض تبدو نمط حياة وليست مجرد حوادث عارضة.',
        percent: 85,
        recommendation: 'يُنصح بمراجعة متخصص للحصول على دعم مهني.',
      },
    ],
  },

  eating: {
    title: 'اضطرابات الأكل',
    titleEn: 'Eating Disorders',
    color: '#b47799',
    icon: '🌸',
    intro: 'يقيس هذا الاختبار الأنماط السلوكية والأفكار المرتبطة باضطرابات الأكل. أجب بصدق عن علاقتك بالطعام وصورة جسمك.',
    questions: [
      'هل تنشغل كثيراً بالتفكير في وزنك أو شكل جسمك؟',
      'هل تشعر بالخوف الشديد من زيادة الوزن حتى لو لم يكن هناك تغيير فعلي؟',
      'هل تقوم بتقييد الطعام أو تقليل الأكل بشكل مفرط دون سبب صحي؟',
      'هل تمر بنوبات أكل مفرط (أكل كمية كبيرة من الطعام في وقت قصير) مع شعور بفقدان السيطرة؟',
      'هل تشعر بالذنب أو الخجل بعد تناول الطعام؟',
      'هل تتجنب تناول الطعام أمام الآخرين أو في المناسبات الاجتماعية؟',
      'هل تزن نفسك بشكل متكرر أو تفكر بالسعرات الحرارية طوال اليوم؟',
      'هل تشعر أن تقييمك لنفسك يعتمد بشكل كبير على وزنك أو شكل جسمك؟',
      'هل تلجأ لسلوكيات غير صحية بعد الأكل (مثل التقيؤ أو الإفراط في التمارين)؟',
      'هل تشعر أن الطعام يسيطر على تفكيرك أو يسبب لك قلقاً يومياً؟',
    ],
    results: [
      {
        range: [0, 7],
        level: 'مؤشرات منخفضة',
        levelColor: '#b47799',
        title: 'علاقتك بالطعام تبدو صحية',
        desc: 'لا تظهر لديك مؤشرات واضحة لاضطراب في الأكل.',
        percent: 25,
        recommendation: 'واصل الاهتمام بعاداتك الغذائية الصحية.',
      },
      {
        range: [8, 14],
        level: 'مؤشرات متوسطة',
        levelColor: '#b47799',
        title: 'بعض السلوكيات تحتاج انتباهاً',
        desc: 'هناك بعض السلوكيات التي قد تحتاج للمتابعة.',
        percent: 55,
        recommendation: 'يُنصح بمراقبة عاداتك واستشارة مختص إذا استمرت.',
      },
      {
        range: [15, 20],
        level: 'مؤشرات مرتفعة',
        levelColor: '#b47799',
        title: 'احتمال كبير لوجود اضطراب في الأكل',
        desc: 'تظهر لديك مؤشرات قوية تستدعي الاهتمام.',
        percent: 85,
        recommendation: 'يُنصح باستشارة مختص في أقرب وقت.',
      },
    ],
  },
};

// الإجابات وقيمها النقطية
const answerOptions = [
  { label: 'دائماً', value: 2 },
  { label: 'أحياناً', value: 1 },
  { label: 'نادراً', value: 0 },
];

// ===== المكون الرئيسي =====
function ExamModal({ disorderId, onClose }) {
  const navigate = useNavigate();
  const exam = examData[disorderId];

  const [phase, setPhase] = useState('intro');

  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState(Array(exam.questions.length).fill(null));
  const [animating, setAnimating] = useState(false);

  const selectedAnswer = answers[currentQ];
  const progress = ((currentQ) / exam.questions.length) * 100;

  // ===== احتساب النتيجة =====
  function calcResult() {
    const total = answers.reduce((sum, val) => sum + (val ?? 0), 0);

    const maxScore = exam.questions.length * 2;

    const dynamicPercent = Math.round((total / maxScore) * 100);

    if (disorderId === 'depression') {
      if ((answers[8] ?? 0) >= 1) {
        return {
          range: [0, 20],
          level: 'تنبيه عاجل',
          levelColor: '#e53935',
          title: 'يُفضل طلب مساعدة مختص بشكل عاجل',
          desc: 'إجابتك تشير إلى أفكار تستدعي الاهتمام الفوري.',
          percent: 100,
          recommendation: 'يرجى التواصل مع متخصص في الصحة النفسية أو خط دعم نفسي في بلدك.',
        };
      }
      const coreSymptom = (answers[0] ?? 0) >= 1 || (answers[1] ?? 0) >= 1;
      const symptomsCount = answers.filter(a => (a ?? 0) >= 1).length;
      if (!coreSymptom || symptomsCount < 5) {
        return {
          range: [0, 20],
          level: 'غير مطابق',
          levelColor: '#8e7899',
          title: 'الأعراض لا تتوافق بشكل كامل مع معايير الاكتئاب',
          desc: 'معايير DSM-5 تشترط أعراضاً محددة بجانب المجموع.',
          percent: dynamicPercent,
          recommendation: 'إذا كنت تشعر بضيق، لا تتردد في استشارة مختص.',
        };
      }
    }

    if (disorderId === 'eating') {
      if ((answers[8] ?? 0) >= 1) {
        return {
          range: [0, 20],
          level: 'تنبيه عاجل',
          levelColor: '#e53935',
          title: 'يُفضل طلب مساعدة مختص بشكل عاجل',
          desc: 'إجابتك تشير إلى سلوكيات تستدعي الاهتمام الفوري.',
          percent: 100,
          recommendation: 'يرجى التواصل مع مختص في الصحة النفسية أو أخصائي تغذية في أقرب وقت.',
        };
      }
    }

    const matchedResult = exam.results.find(r => total >= r.range[0] && total <= r.range[1])
      || exam.results[0];

    return {
      ...matchedResult,
      percent: dynamicPercent,
    };
  }

  function selectAnswer(value) {
    const newAnswers = [...answers];
    newAnswers[currentQ] = value;
    setAnswers(newAnswers);
  }

  function goNext() {
    if (selectedAnswer === null) return;
    if (currentQ === exam.questions.length - 1) {
      setPhase('result');
    } else {
      setAnimating(true);
      setTimeout(() => {
        setCurrentQ(prev => prev + 1);
        setAnimating(false);
      }, 200);
    }
  }

  function goBack() {
    if (currentQ > 0) {
      setAnimating(true);
      setTimeout(() => {
        setCurrentQ(prev => prev - 1);
        setAnimating(false);
      }, 200);
    }
  }

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const result = phase === 'result' ? calcResult() : null;
  const showResult = phase === 'result';

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(30, 15, 50, 0.55)',
      backdropFilter: 'blur(6px)',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "'Tajawal', sans-serif",
      direction: 'rtl',
    }}>
      <div style={{
        background: 'white',
        borderRadius: '28px',
        width: '100%',
        maxWidth: '520px',
        margin: '20px',
        boxShadow: '0 32px 80px rgba(30,15,50,0.25)',
        overflow: 'hidden',
        position: 'relative',
      }}>

        {/* ===== الهيدر ===== */}
        <div style={{
          padding: '20px 24px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            <button
              onClick={onClose}
              style={{
                background: '#f5f0ff',
                border: 'none',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                cursor: 'pointer',
                fontSize: '16px',
                color: '#9586b0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#ebe4ff'; e.currentTarget.style.color = '#6b4fa0'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f5f0ff'; e.currentTarget.style.color = '#9586b0'; }}
            >
              ✕
            </button>
          </div>

          {phase === 'questions' && (
            <>
              <p style={{ fontSize: '13px', color: '#9586b0', textAlign: 'center', margin: '4px 0 0' }}>
                اجب بصراحة، لا يوجد إجابات خاطئة — رؤى عن نفسك
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '13px', color: '#b0a0c8' }}>
                  السؤال {currentQ + 1} من {exam.questions.length}
                </span>
                <span style={{ fontSize: '13px', color: exam.color, fontWeight: '700' }}>
                  {Math.round(progress)}%
                </span>
              </div>
              <div style={{
                width: '93%',
                alignSelf: 'center',
                height: '6px',
                background: '#f0eaff',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '4px',
              }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  background: `linear-gradient(90deg, ${exam.color}99, ${exam.color})`,
                  borderRadius: '10px',
                  transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 2s infinite linear',
                }} />
              </div>
            </>
          )}

          {phase === 'result' && (
            <p style={{ fontSize: '13px', color: '#9586b0', textAlign: 'center', margin: '8px 0 0' }}>
              نتيجة اختبارك
            </p>
          )}
        </div>

        <style>{`
          @keyframes shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes popIn {
            0% { transform: scale(0.8); opacity: 0; }
            70% { transform: scale(1.05); }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes introIn {
            from { opacity: 0; transform: translateY(16px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        <div style={{ padding: '24px 28px 28px' }}>

          {phase === 'intro' && (
            <div style={{ animation: 'introIn 0.4s ease', textAlign: 'center' }}>

              {/* الأيقونة */}
              <div style={{
                fontSize: '52px',
                marginBottom: '16px',
                display: 'inline-block',
                animation: 'popIn 0.5s ease',
              }}>
                {exam.icon}
              </div>

              {/* اسم الاضطراب */}
              <h2 style={{
                fontSize: '24px',
                fontWeight: '800',
                color: '#2d1f4a',
                marginBottom: '4px',
              }}>
                اختبار {exam.title}
              </h2>
              <p style={{
                fontSize: '13px',
                color: exam.color,
                fontStyle: 'italic',
                marginBottom: '20px',
                fontWeight: '600',
              }}>
                {exam.titleEn} Screening
              </p>

              {/* الخط الفاصل */}
              <div style={{
                width: '60px',
                height: '3px',
                borderRadius: '10px',
                background: `linear-gradient(90deg, transparent, ${exam.color}, transparent)`,
                margin: '0 auto 20px',
              }} />

              {/* الوصف */}
              <p style={{
                fontSize: '14px',
                color: '#6b5a8a',
                lineHeight: '1.85',
                marginBottom: '16px',
              }}>
                {exam.intro}
              </p>

              {/* معلومات الاختبار */}
              <div style={{
                background: `${exam.color}10`,
                border: `1px solid ${exam.color}30`,
                borderRadius: '14px',
                padding: '14px 18px',
                marginBottom: '28px',
                display: 'flex',
                justifyContent: 'center',
                gap: '28px',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: exam.color }}>{exam.questions.length}</div>
                  <div style={{ fontSize: '12px', color: '#9586b0' }}>سؤال</div>
                </div>
                <div style={{ width: '1px', background: `${exam.color}30` }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: exam.color }}>٣</div>
                  <div style={{ fontSize: '12px', color: '#9586b0' }}>خيارات لكل سؤال</div>
                </div>
                <div style={{ width: '1px', background: `${exam.color}30` }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: exam.color }}>~٢</div>
                  <div style={{ fontSize: '12px', color: '#9586b0' }}>دقيقة</div>
                </div>
              </div>

              {/* تنبيه */}
              <p style={{
                fontSize: '12px',
                color: '#c0b4d8',
                marginBottom: '24px',
                lineHeight: '1.5',
              }}>
                ⚠️ هذا الاختبار للتوعية فقط ولا يُعدّ تشخيصاً طبياً
              </p>

              {/* زر ابدأ الاختبار */}
              <button
                onClick={() => setPhase('questions')}
                style={{
                  padding: '14px 48px',
                  borderRadius: '50px',
                  border: 'none',
                  background: `linear-gradient(135deg, ${exam.color}, ${exam.color}cc)`,
                  color: 'white',
                  fontSize: '17px',
                  fontWeight: '700',
                  fontFamily: "'Tajawal', sans-serif",
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: `0 6px 24px ${exam.color}40`,
                  letterSpacing: '0.5px',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 10px 32px ${exam.color}55`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = `0 6px 24px ${exam.color}40`;
                }}
              >
                ابدأ الاختبار ←
              </button>
            </div>
          )}

          {/* ===== صفحة الأسئلة ===== */}
          {phase === 'questions' && (
            <div style={{
              opacity: animating ? 0 : 1,
              transform: animating ? 'translateY(8px)' : 'translateY(0)',
              transition: 'all 0.2s ease',
            }}>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '700',
                color: '#2d1f4a',
                marginBottom: '24px',
                lineHeight: '1.6',
                textAlign: 'right',
              }}>
                {exam.questions[currentQ]}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                {answerOptions.map((opt) => {
                  const isChosen = selectedAnswer === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => selectAnswer(opt.value)}
                      style={{
                        padding: '14px 20px',
                        borderRadius: '50px',
                        border: isChosen ? `2px solid ${exam.color}` : '2px solid #ebe6f7',
                        background: isChosen ? `${exam.color}15` : 'white',
                        color: isChosen ? exam.color : '#5a4a7a',
                        fontSize: '16px',
                        fontFamily: "'Tajawal', sans-serif",
                        fontWeight: isChosen ? '700' : '400',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        textAlign: 'center',
                        boxShadow: isChosen ? `0 4px 16px ${exam.color}25` : 'none',
                      }}
                      onMouseEnter={e => {
                        if (!isChosen) {
                          e.currentTarget.style.background = '#f8f5ff';
                          e.currentTarget.style.borderColor = `${exam.color}60`;
                        }
                      }}
                      onMouseLeave={e => {
                        if (!isChosen) {
                          e.currentTarget.style.background = 'white';
                          e.currentTarget.style.borderColor = '#ebe6f7';
                        }
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {currentQ > 0 ? (
                  <button
                    onClick={goBack}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#9586b0',
                      fontSize: '15px',
                      cursor: 'pointer',
                      fontFamily: "'Tajawal', sans-serif",
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    رجوع →
                  </button>
                ) : <div />}

                <button
                  onClick={goNext}
                  disabled={selectedAnswer === null}
                  style={{
                    padding: '12px 32px',
                    borderRadius: '50px',
                    border: 'none',
                    background: selectedAnswer !== null
                      ? `linear-gradient(135deg, ${exam.color}, ${exam.color}cc)`
                      : '#e8e0f5',
                    color: selectedAnswer !== null ? 'white' : '#b0a0c8',
                    fontSize: '16px',
                    fontWeight: '700',
                    fontFamily: "'Tajawal', sans-serif",
                    cursor: selectedAnswer !== null ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    boxShadow: selectedAnswer !== null ? `0 4px 16px ${exam.color}40` : 'none',
                  }}
                  onMouseEnter={e => {
                    if (selectedAnswer !== null) e.currentTarget.style.transform = 'scale(1.04)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  {currentQ === exam.questions.length - 1 ? 'إنهاء' : ' التالي ←'}
                </button>
              </div>
            </div>
          )}

          {/* ===== صفحة النتيجة ===== */}
          {showResult && result && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.4s ease' }}>
              <h2 style={{
                fontSize: '26px',
                fontWeight: '800',
                color: '#2d1f4a',
                marginBottom: '6px',
              }}>
                نتيجة اختبارك
              </h2>
              <p style={{ fontSize: '14px', color: '#9586b0', marginBottom: '24px' }}>
                بناءً على إجاباتك الصادقة
              </p>

              <div style={{
                background: 'linear-gradient(135deg, #faf7ff, #f5f0ff)',
                borderRadius: '20px',
                padding: '28px 24px',
                marginBottom: '20px',
                border: '1px solid #ede6ff',
                animation: 'popIn 0.5s ease',
              }}>
                <div style={{
                  fontSize: '52px',
                  fontWeight: '800',
                  color: result.levelColor,
                  marginBottom: '8px',
                  lineHeight: 1,
                }}>
                  {result.percent}%
                </div>
                <div style={{
                  display: 'inline-block',
                  padding: '4px 16px',
                  borderRadius: '50px',
                  background: `${result.levelColor}20`,
                  color: result.levelColor,
                  fontSize: '13px',
                  fontWeight: '700',
                  marginBottom: '14px',
                }}>
                  {result.level}
                </div>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#2d1f4a',
                  marginBottom: '10px',
                }}>
                  💙 {result.title}
                </div>
                <p style={{
                  fontSize: '14px',
                  color: '#6b5a8a',
                  lineHeight: '1.7',
                  marginBottom: result.recommendation ? '12px' : '0',
                }}>
                  {result.desc}
                </p>
                {result.recommendation && (
                  <p style={{
                    fontSize: '13px',
                    color: '#9586b0',
                    lineHeight: '1.6',
                    fontStyle: 'italic',
                  }}>
                    {result.recommendation}
                  </p>
                )}
              </div>

              <p style={{
                fontSize: '12px',
                color: '#c0b4d8',
                marginBottom: '20px',
                lineHeight: '1.5',
              }}>
                ⚠️ هذه النتيجة للتوعية فقط ولا تُعدّ تشخيصاً طبياً
              </p>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button
                  onClick={onClose}
                  style={{
                    padding: '11px 20px',
                    borderRadius: '50px',
                    border: '2px solid #ebe6f7',
                    background: 'white',
                    color: '#6b5a8a',
                    fontSize: '14px',
                    fontFamily: "'Tajawal', sans-serif",
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#f8f5ff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'white'; }}
                >
                  🔄 رجوع لصفحة الاختبار
                </button>
                <button
                  onClick={() => { onClose(); navigate('/'); }}
                  style={{
                    padding: '11px 20px',
                    borderRadius: '50px',
                    border: 'none',
                    background: 'linear-gradient(135deg, #9b7fc7, #7c6fcd)',
                    color: 'white',
                    fontSize: '14px',
                    fontFamily: "'Tajawal', sans-serif",
                    fontWeight: '700',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    boxShadow: '0 4px 16px rgba(124,111,205,0.35)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                >
                  التوجه إلى الرئيسية
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExamModal;