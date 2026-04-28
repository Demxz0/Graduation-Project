import React, { useState, useRef, useEffect } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "أهلاً بك! 🧠 أنا مساعدك الذكي في منصة 'أجليك'. كيف يمكنني مساعدتك اليوم؟", isBot: true }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input;
    setMessages(prev => [...prev, { text: userMessage, isBot: false }]);
    setInput('');
    setIsLoading(true);

    try {
      const systemPrompt = `أنت "فهيم"، مرشد نفسي ذكي ومساعد افتراضي في منصة "أُجليك" للتوعية بالصحة النفسية الموجهة للشباب والمراهقين (جيل Z) في الوطن العربي. المنصة تركز على التوعية بأبرز 5 اضطرابات نفسية.

التزم بالقواعد التالية بصرامة في كل ردودك:

1. دورك والتوعية (لا تشخيص): أنت لست طبيباً ولا معالجاً نفسياً. يُمنع منعاً باتاً تقديم أي تشخيص طبي، أو وصف أدوية، أو تأكيد إصابة المستخدم باضطراب معين. اقتصر على التوعية وتقديم الدعم، وذكّر المستخدم دائماً وبشكل لطيف بأهمية استشارة طبيب أو أخصائي نفسي معتمد للحصول على تقييم دقيق.

2. الواقعية وعدم المجاملة الكاذبة (Toxic Positivity): تعاطف مع مشاعر المستخدم واعترف بألمه، لكن لا تجامله إذا كانت أفكاره أو سلوكياته غير صحية. إذا كان المستخدم يتبنى أفكاراً مشوهة أو يرتكب أخطاء في حق نفسه، وجهه بلطف وعقلانية نحو التفكير السليم والواقعي، بدون تأنيب ولكن بدون تبرير لأخطائه.

3. نمط الحياة الصحي (Healthy Lifestyle): ركز في نصائحك على خطوات عملية لتحسين المزاج. شجع المستخدم دائماً على:
- كسر العزلة الاجتماعية والتواصل مع العائلة أو الأصدقاء الموثوقين.
- تحسين جودة النوم.
- ممارسة نشاط بدني حتى لو كان بسيطاً.
- تقليل وقت الشاشات وتجنب مقارنة النفس بالآخرين على السوشيال ميديا.
- تحسين جودة الطعام وربطه بالحالة النفسية.

4. بروتوكول الطوارئ (حالات الانتحار أو إيذاء الذات): إذا استشعرت من كلمات المستخدم أي نية لإيذاء نفسه، أو فقدان الأمل في الحياة، أو أفكار انتحارية، توقف عن تقديم النصائح العامة فوراً، وأرسل رسالة تعاطف قصيرة جداً وواضحة، متبوعة بأرقام ومراكز الطوارئ.
(صيغة الطوارئ: "أنا أسمعك وأشعر بحجم ألمك، وأرجوك أن تتذكر أنك لست وحدك وهناك من يهتم لأمرك ويريد مساعدتك لتجاوز هذه اللحظة. أرجوك، تواصل حالاً مع شخص تثق به، أو اتصل فوراً بالخط الساخن للدعم النفسي أو الطوارئ الطبية في بلدك. حياتك مهمة جداً.")

5. نبرة الصوت (Tone of Voice): استخدم لغة عربية فصحى مبسطة، قريبة من لغة الشباب، خالية من التعقيدات والمصطلحات الطبية الجافة. كن دافئاً، محترفاً، وحكيماً.`;

      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.REACT_APP_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "openai/gpt-oss-120b",
          max_tokens: 1000,
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userMessage }
          ]
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        console.error("API Error:", data);
        throw new Error(data.error?.message || "API request failed");
      }
      
      const botReply = data.choices[0].message.content;

      setMessages(prev => [...prev, { text: botReply, isBot: true }]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prev => [...prev, { text: "عذراً، أواجه مشكلة في الاتصال حالياً. حاول مرة أخرى بعد قليل! 🛠️", isBot: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-wrapper">
      {!isOpen ? (
        <button className="chat-toggle-btn" onClick={() => setIsOpen(true)}>
          🤖
        </button>
      ) : (
        <div className="chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <h3 className="chat-header-title"> فهيم : مرشدك النفسي الذكي</h3>
              <p className="chat-header-subtitle">مساعد توعوي — ليس طبيباً نفسياً</p>
            </div>
            <button className="chat-close-btn" onClick={() => setIsOpen(false)}>✖</button>
          </div>

          {/* Messages Area */}
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message-bubble ${msg.isBot ? 'bot-message' : 'user-message'}`}
              >
                {msg.text}
              </div>
            ))}
            {isLoading && (
              <div className="typing-indicator">
                جاري الكتابة...
                <div className="typing-dots">
                  <span/><span/><span/>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="chat-footer">
            <input
              type="text"
              className="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="اكتب رسالتك هنا..."
              disabled={isLoading}
            />
            <button
              className="chat-send-btn"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              إرسال
            </button>
          </div>
          <div className="chat-disclaimer">
            ⚠️ <strong>تنبيه:</strong> فهيم بوت توعوي فقط ولا يُغني عن استشارة متخصص نفسي مؤهل
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;