import React, { useState, useEffect, useRef } from 'react';

// ============================================
// HANDCASH CONFIGURATION
// ============================================
const HANDCASH_APP_ID = '6933a01147e8cf5a27f546e1';
const HANDCASH_HANDLE = 'zcool';
const UNLOCK_PRICE_SATS = 2500000;
const UNLOCK_PRICE_USD = 0.50;

// ============================================
// LOGIN & PAYMENT SCREEN
// ============================================
const LoginScreen = ({ onUnlock, onPreview }) => {
  const [isConnecting, setIsConnecting] = useState(false);

  const handleHandCashLogin = () => {
    setIsConnecting(true);
    const redirectUrl = encodeURIComponent(window.location.origin + window.location.pathname);
    window.location.href = `https://app.handcash.io/#/authorizeApp?appId=${HANDCASH_APP_ID}&redirectUrl=${redirectUrl}`;
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0b', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', fontFamily: "'IBM Plex Sans', -apple-system, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        @keyframes pulse-glow { 0%, 100% { box-shadow: 0 0 20px rgba(56, 195, 126, 0.3); } 50% { box-shadow: 0 0 40px rgba(56, 195, 126, 0.5); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { to { transform: rotate(360deg); } }
        .login-card { animation: fadeIn 0.5s ease-out; }
        .handcash-btn { animation: pulse-glow 2s infinite; transition: all 0.3s ease; }
        .handcash-btn:hover { transform: scale(1.02); box-shadow: 0 0 50px rgba(56, 195, 126, 0.6); }
        .preview-btn { transition: all 0.2s ease; }
        .preview-btn:hover { color: #e4e4e7 !important; border-color: #52525b !important; }
        .floating-icon { animation: float 3s ease-in-out infinite; }
        .spinner { animation: spin 1s linear infinite; }
      `}</style>
      
      <div className="login-card" style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '24px', padding: '48px 40px', maxWidth: '440px', width: '100%', textAlign: 'center' }}>
        <div className="floating-icon" style={{ width: '80px', height: '80px', backgroundColor: '#dc2626', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: '0 10px 40px rgba(220, 38, 38, 0.3)' }}>
          <span style={{ fontSize: '36px' }}>🎭</span>
        </div>
        
        <h1 style={{ fontSize: '28px', fontWeight: 500, color: '#fafafa', marginBottom: '8px', letterSpacing: '-0.03em' }}>NPD Pattern Recognition</h1>
        <p style={{ fontSize: '15px', color: '#71717a', marginBottom: '32px', lineHeight: 1.6 }}>Learn to recognize manipulation tactics through interactive simulations</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px', textAlign: 'left' }}>
          {[
            { icon: '🎯', text: '6 interactive manipulation scenarios' },
            { icon: '📊', text: 'Real-time tactic analysis & breakdowns' },
            { icon: '🛡️', text: 'DARVO, gaslighting, love bombing & more' },
            { icon: '🧠', text: 'Dark empath pattern recognition' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: '#0f0f10', borderRadius: '12px' }}>
              <span style={{ fontSize: '20px' }}>{f.icon}</span>
              <span style={{ fontSize: '14px', color: '#a1a1aa' }}>{f.text}</span>
            </div>
          ))}
        </div>

        {/* Price Tag */}
        <div style={{ backgroundColor: '#0f0f10', border: '1px solid #27272a', borderRadius: '12px', padding: '16px', marginBottom: '24px' }}>
          <div style={{ fontSize: '13px', color: '#71717a', marginBottom: '4px' }}>One-time unlock</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px', fontWeight: 600, color: '#fafafa' }}>$0.50</span>
            <span style={{ fontSize: '14px', color: '#52525b' }}>or</span>
            <span style={{ fontSize: '16px', fontWeight: 500, color: '#f7931a', fontFamily: "'IBM Plex Mono', monospace" }}>{UNLOCK_PRICE_SATS.toLocaleString()} sats</span>
          </div>
          <div style={{ fontSize: '12px', color: '#52525b', marginTop: '8px' }}>Lifetime access • No subscription</div>
        </div>
        
        <button 
          className="handcash-btn" 
          onClick={handleHandCashLogin}
          disabled={isConnecting}
          style={{ 
            width: '100%', 
            padding: '16px 24px', 
            backgroundColor: '#38c37e', 
            border: 'none', 
            borderRadius: '12px', 
            color: '#000', 
            fontSize: '16px', 
            fontWeight: 600, 
            cursor: isConnecting ? 'wait' : 'pointer', 
            fontFamily: 'inherit', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '10px', 
            marginBottom: '12px',
            opacity: isConnecting ? 0.7 : 1
          }}
        >
          {isConnecting ? (
            <>
              <div className="spinner" style={{ width: '20px', height: '20px', border: '2px solid #000', borderTopColor: 'transparent', borderRadius: '50%' }} />
              Connecting...
            </>
          ) : (
            <>
              <svg width="24" height="24" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#000"/><path d="M12 20h16M20 12l8 8-8 8" stroke="#38c37e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Pay with HandCash
            </>
          )}
        </button>
        
        <button className="preview-btn" onClick={onPreview} style={{ width: '100%', padding: '14px 24px', backgroundColor: 'transparent', border: '1px solid #3f3f46', borderRadius: '12px', color: '#71717a', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>
          Preview first scenario free
        </button>
        
        <p style={{ fontSize: '12px', color: '#52525b', marginTop: '24px', lineHeight: 1.5 }}>
          Secure payment via HandCash<br/>
          Created by <span style={{ color: '#38c37e' }}>${HANDCASH_HANDLE}</span>
        </p>
      </div>
    </div>
  );
};

// ============================================
// PAYMENT MODAL
// ============================================
const PaymentModal = ({ onClose, onSuccess }) => {
  const handlePay = () => {
    const payLink = `https://handcash.io/pay/${HANDCASH_HANDLE}?amount=${UNLOCK_PRICE_USD}&currency=USD&note=NPD%20Pattern%20Recognition%20-%20Full%20Access`;
    window.open(payLink, '_blank');
    // In production, you'd verify payment server-side
    // For now, trust-based unlock after they click pay
    setTimeout(() => {
      if (window.confirm('Did you complete the payment? Click OK to unlock full access.')) {
        localStorage.setItem('npd_sim_unlocked', 'true');
        onSuccess();
      }
    }, 2000);
  };

  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
      <div onClick={e => e.stopPropagation()} style={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '16px', padding: '32px', maxWidth: '400px', width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '48px', marginBottom: '12px' }}>🔓</div>
          <h3 style={{ fontSize: '22px', fontWeight: 500, color: '#fafafa', marginBottom: '8px' }}>Unlock Full Access</h3>
          <p style={{ fontSize: '14px', color: '#71717a', lineHeight: 1.6 }}>Get lifetime access to all 6 scenarios and future updates</p>
        </div>
        
        <div style={{ backgroundColor: '#0f0f10', borderRadius: '12px', padding: '20px', marginBottom: '24px', textAlign: 'center' }}>
          <div style={{ fontSize: '32px', fontWeight: 600, color: '#fafafa', marginBottom: '4px' }}>$0.50</div>
          <div style={{ fontSize: '14px', color: '#f7931a', fontFamily: "'IBM Plex Mono', monospace" }}>{UNLOCK_PRICE_SATS.toLocaleString()} sats</div>
        </div>
        
        <button onClick={handlePay} style={{ width: '100%', padding: '16px', backgroundColor: '#38c37e', border: 'none', borderRadius: '12px', color: '#000', fontSize: '16px', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', marginBottom: '12px' }}>
          Pay with HandCash
        </button>
        
        <button onClick={onClose} style={{ width: '100%', padding: '12px', backgroundColor: 'transparent', border: '1px solid #3f3f46', borderRadius: '8px', color: '#71717a', fontSize: '14px', cursor: 'pointer', fontFamily: 'inherit' }}>
          Maybe later
        </button>
      </div>
    </div>
  );
};

// ============================================
// MAIN APP
// ============================================
const NPDSimulation = () => {
  const [showLoginScreen, setShowLoginScreen] = useState(true);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [showTacticPanel, setShowTacticPanel] = useState(true);
  const [currentTactic, setCurrentTactic] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Check if already unlocked
    const unlocked = localStorage.getItem('npd_sim_unlocked') === 'true';
    if (unlocked) {
      setIsUnlocked(true);
      setShowLoginScreen(false);
    }
    
    // Check for HandCash auth return
    const params = new URLSearchParams(window.location.search);
    const authToken = params.get('authToken');
    if (authToken) {
      localStorage.setItem('handcash_token', authToken);
      window.history.replaceState({}, document.title, window.location.pathname);
      // Show payment modal after auth
      setShowLoginScreen(false);
      setShowPaymentModal(true);
    }
  }, []);

  const handlePreview = () => {
    setIsPreviewMode(true);
    setShowLoginScreen(false);
  };

  const handleUnlock = () => {
    setIsUnlocked(true);
    setIsPreviewMode(false);
    setShowPaymentModal(false);
    localStorage.setItem('npd_sim_unlocked', 'true');
  };

  const tactics = {
    darvo: { name: "DARVO", fullName: "Deny, Attack, Reverse Victim & Offender", signs: ["Flat denial despite evidence", "Personal attacks when confronted", "Sudden flip to victimhood", "You end up apologizing"], color: "#dc2626" },
    loveBombing: { name: "Love Bombing", fullName: "Excessive Affection & Attention", signs: ["Too much too fast", "Constant communication", "Grand gestures early", "Pressure for commitment"], color: "#db2777" },
    gaslighting: { name: "Gaslighting", fullName: "Reality Distortion", signs: ["'That never happened'", "'You're imagining things'", "Denying what you saw/heard", "You start doubting yourself"], color: "#7c3aed" },
    wordSalad: { name: "Word Salad", fullName: "Circular Confusion", signs: ["Conversations go in circles", "Topics shift constantly", "Nothing gets resolved", "Mental exhaustion"], color: "#2563eb" },
    triangulation: { name: "Triangulation", fullName: "Third-Party Manipulation", signs: ["Mentions of exes/admirers", "Comparing you to others", "Using others' opinions against you"], color: "#059669" },
    futureFaking: { name: "Future Faking", fullName: "Empty Promises", signs: ["Plans that never materialize", "Conditional promises", "Moving goalposts"], color: "#d97706" },
    projection: { name: "Projection", fullName: "Accusatory Mirror", signs: ["Accused of what they do", "Feels absurd and unfair", "Puts you on defense"], color: "#0891b2" },
    nonApology: { name: "Non-Apology", fullName: "Fake Accountability", signs: ["'I'm sorry you feel that way'", "'I'm sorry but...'", "Nothing changes after"], color: "#ea580c" },
    covertPutdowns: { name: "Covert Put-Downs", fullName: "Disguised Insults", signs: ["'Just joking'", "'I'm only trying to help'", "Compliments that sting"], color: "#64748b" },
    darkEmpath: { name: "Dark Empath", fullName: "Pattern Recognition Through Pain", signs: ["Seeing manipulation as it happens", "Sensing hidden intentions", "Standing firm against manipulators"], color: "#1e1b4b", isProtective: true }
  };

  const scenarios = [
    { id: 'darvo_confrontation', title: "The Confrontation", context: "You found out your partner has been lying about where they've been. You decide to bring it up.", tactics: ['darvo'], free: true, steps: [
      { npcMessage: "Hey babe! How was your day? I missed you 💕", userOptions: ["I need to talk to you about something. I know you weren't at Mike's last night.", "Where were you really last night? I called Mike.", "Can we talk? I'm confused about some things."] },
      { npcMessage: "What? I was at Mike's. What are you talking about? Why are you checking up on me?", tacticReveal: "darvo", tacticPhase: "DENY - Flat denial despite evidence. Already deflecting by questioning why you checked.", userOptions: ["Mike said you weren't there.", "I'm not checking up on you, I just happened to call him.", "Please just tell me the truth."] },
      { npcMessage: "Oh, so now you're interrogating my friends? That's really controlling behavior. I can't believe you don't trust me.", tacticReveal: "darvo", tacticPhase: "ATTACK - Now attacking your character. 'Controlling,' 'don't trust me.' They've flipped from liar to victim.", userOptions: ["I'm not trying to control you, I just want honesty.", "You're turning this around. You lied to me.", "Maybe you're right, I shouldn't have called..."] },
      { npcMessage: "I've been so stressed and needed one night to myself without being questioned. Do you know how hard that is? I feel like I'm suffocating.", tacticReveal: "darvo", tacticPhase: "REVERSE VICTIM & OFFENDER - Complete flip. They're now the victim who is 'suffocating.' This is DARVO.", userOptions: ["I... I didn't mean to make you feel that way.", "You still haven't explained where you were.", "I need to think about this."] }
    ]},
    { id: 'love_bombing', title: "The Whirlwind", context: "You've been talking to someone new for two weeks. Things are moving very fast.", tactics: ['loveBombing', 'futureFaking'], free: false, steps: [
      { npcMessage: "Good morning beautiful ☀️ I couldn't sleep thinking about you. I've never felt this way about anyone. I want to spend every moment with you.", tacticReveal: "loveBombing", tacticPhase: "Notice the intensity after only two weeks: couldn't sleep, never felt this way, every moment.", userOptions: ["That's so sweet!", "Maybe we should slow down?", "I have plans with friends this weekend."] },
      { npcMessage: "Slow down? I've already told my mom about you. I was looking at apartments in your neighborhood. You're the one.", tacticReveal: "loveBombing", tacticPhase: "Told family, looking at apartments, 'the one' — after TWO WEEKS. This creates false intimacy.", userOptions: ["That's... a lot.", "This is moving really fast.", "That's so romantic!"] },
      { npcMessage: "I can picture our future — traveling, a place with a garden, you'd be an amazing parent. You're different. Special.", tacticReveal: "futureFaking", tacticPhase: "FUTURE FAKING: Painting elaborate futures to accelerate your emotional investment.", userOptions: ["I've thought about that too...", "We should focus on getting to know each other first.", "You really see that with me?"] },
      { npcMessage: "Let's take it one step at a time — meet my friends next week, that trip to the coast. No one has appreciated you like I will. 💕", tacticReveal: "loveBombing", tacticPhase: "They said 'slow down' but added MORE plans. 'No one appreciated you like I will' — isolation begins.", userOptions: ["That sounds amazing!", "I need to check my schedule.", "I need time to think."] }
    ]},
    { id: 'gaslighting', title: "The Rewrite", context: "You remember your partner agreeing to your sister's wedding. Now they say they never agreed.", tactics: ['gaslighting', 'nonApology'], free: false, steps: [
      { npcMessage: "The wedding is THIS weekend? I never said I'd go to that.", tacticReveal: "gaslighting", tacticPhase: "The flat contradiction begins. You KNOW this conversation happened.", userOptions: ["We talked about this three times.", "We planned our outfits together.", "Are you serious?"] },
      { npcMessage: "You're confusing what you wanted me to say with what I said. You do that a lot.", tacticReveal: "gaslighting", tacticPhase: "'You do that a lot' — establishing a pattern where YOUR perception is unreliable.", userOptions: ["I didn't imagine this.", "Do I really do that?", "I have a text where you said yes."] },
      { npcMessage: "That text says 'sounds good, we'll see.' You're reading into things again. Why make everything a fight?", tacticReveal: "gaslighting", tacticPhase: "Even with evidence, they reframe it. 'Reading into things AGAIN' — you're the problem.", userOptions: ["I'm not trying to fight.", "Maybe I misread it...", "You're twisting this."] },
      { npcMessage: "I'm sorry if you misunderstood. Maybe next time communicate more clearly about important things?", tacticReveal: "nonApology", tacticPhase: "NON-APOLOGY: 'Sorry IF you misunderstood.' You're responsible for their broken commitment.", userOptions: ["I guess I should have been clearer...", "This isn't about my communication.", "I need to go."] }
    ]},
    { id: 'word_salad', title: "The Endless Loop", context: "You want to discuss them being late to dinner with your parents. Should be simple.", tactics: ['wordSalad', 'projection'], free: false, steps: [
      { npcMessage: "Oh so NOW I'm the bad guy because traffic exists? Remember when YOU were late to my company dinner?", tacticReveal: "wordSalad", tacticPhase: "Already defensive, deflecting to traffic, bringing up old events before you've even spoken.", userOptions: ["I wasn't attacking you.", "That's different, I called ahead.", "Can we focus on today?"] },
      { npcMessage: "Focus on today? I've been stressed at work — you'd know if you ever asked. Your parents probably didn't even notice.", tacticReveal: "wordSalad", tacticPhase: "Topic shifts: your selfishness → work stress → you don't ask → your parents. Original issue drowning.", userOptions: ["Can we go back to the original issue?", "You're right, I should ask more...", "That's not the point."] },
      { npcMessage: "You want to control when I arrive. That's controlling. Do you even respect me as a person?", tacticReveal: "projection", tacticPhase: "PROJECTION: Asking someone to be on time isn't control. They're projecting onto you.", userOptions: ["Of course I respect you—", "Being on time is about respect.", "How did this become about respect?"] },
      { npcMessage: "I'm not having this conversation when you're like this. I won't be verbally abused for traffic.", tacticReveal: "wordSalad", tacticPhase: "The finale: you're 'verbally abusing' them. Nothing resolved. You're exhausted. That's the point.", userOptions: ["I wasn't abusing you...", "We can talk later.", "This makes no sense."] }
    ]},
    { id: 'triangulation', title: "The Third Party", context: "Your partner keeps mentioning a coworker named Alex.", tactics: ['triangulation', 'covertPutdowns'], free: false, steps: [
      { npcMessage: "Alex brought me coffee today and remembered exactly how I like it. Nice to feel noticed! I told them about your burnt lasagna 😂", tacticReveal: "triangulation", tacticPhase: "Alex notices them, remembers details, they shared personal stories about you. Why tell you this?", userOptions: ["That's nice.", "You told them about the lasagna?", "You mention Alex a lot."] },
      { npcMessage: "Don't be jealous, it's not a good look. Alex actually listens to me. Unlike SOME people on their phone at dinner.", tacticReveal: "covertPutdowns", tacticPhase: "COVERT PUT-DOWN: 'not a good look' / 'SOME people.' Unfavorably compared while told not to feel jealous.", userOptions: ["I'm not jealous, just noticing.", "I didn't realize I was on my phone...", "Why compare me to them?"] },
      { npcMessage: "You're so insecure. Alex said insecurity comes from projecting your own issues. Have you thought about therapy?", tacticReveal: "triangulation", tacticPhase: "Alex's opinions diagnose YOUR problems. External 'authority' validates every criticism.", userOptions: ["Maybe I am insecure...", "I don't need Alex's therapist.", "You two talk about me a lot."] },
      { npcMessage: "Alex thinks you sound great! They'd love to meet you. Unless you're too jealous? Alex just gets me in ways that are... different.", tacticReveal: "triangulation", tacticPhase: "'Unless you're too jealous' — refusing makes you the problem. 'Gets me differently' — something's missing with you.", userOptions: ["Sure, I'd like to meet them.", "What ways?", "I need to step back."] }
    ]},
    { id: 'dark_empath', title: "The Pattern Recognition", context: "You've learned to recognize manipulation. Someone new is trying familiar tactics.", tactics: ['darkEmpath'], free: false, steps: [
      { npcMessage: "You're amazing! I've never connected with anyone so fast. I told my friends about you — let's do something spontaneous! 💕", tacticReveal: "darkEmpath", tacticPhase: "RECOGNITION: Too fast, already told friends, taking control. Your nervous system remembers. This is love bombing.", userOptions: ["[Recognize] This is moving very fast.", "[Test] What did you have in mind?", "[Boundary] I prefer to plan things together."] },
      { npcMessage: "Slow down something good? I don't play games like others. If that scares you, maybe you're not ready for something real.", tacticReveal: "darkEmpath", tacticPhase: "RECOGNITION: Pushback on boundaries. 'Not like others.' 'If that scares you' — your boundary is YOUR problem.", userOptions: ["[Name it] This pattern is a red flag.", "[Hold] My pace isn't about fear.", "[Exit] This isn't right for me."] },
      { npcMessage: "Red flag? You must have been really hurt. I'm not them. Give me a chance. Just let me in.", tacticReveal: "darkEmpath", tacticPhase: "RECOGNITION: 'You've been hurt' — pathologizing your discernment. 'Let me in' — boundary pressure.", userOptions: ["[Truth] My discernment isn't damage.", "[Firm] I don't give chances to prove anything.", "[Complete] Take care."] },
      { npcMessage: "Okay, maybe I came on strong. We can go your pace. I respect that. Actually, I admire it.", tacticReveal: "darkEmpath", tacticPhase: "THE TEST: Genuine or tactical adaptation? Watch: Do actions match words? Does intensity return?", userOptions: ["[Observe] Let's see how things unfold.", "[Cautious] Actions will tell.", "[Protect] I need space to think."] }
    ]}
  ];

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(() => { scrollToBottom(); }, [messages]);

  const startScenario = (scenario) => {
    if (!scenario.free && !isUnlocked) {
      setShowPaymentModal(true);
      return;
    }
    setCurrentScenario(scenario);
    setMessages([]);
    setCurrentStep(0);
    setCurrentTactic(null);
    setTimeout(() => {
      setMessages([{ type: 'system', content: scenario.context }]);
      setTimeout(() => {
        simulateTyping(scenario.steps[0].npcMessage, () => {
          if (scenario.steps[0].tacticReveal) {
            setCurrentTactic({ ...tactics[scenario.steps[0].tacticReveal], phase: scenario.steps[0].tacticPhase });
          }
        });
      }, 1000);
    }, 500);
  };

  const simulateTyping = (message, callback) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { type: 'npc', content: message }]);
      if (callback) callback();
    }, 1500 + Math.random() * 1000);
  };

  const handleUserChoice = (choice) => {
    setMessages(prev => [...prev, { type: 'user', content: choice }]);
    setCurrentTactic(null);
    const nextStep = currentStep + 1;
    if (nextStep < currentScenario.steps.length) {
      setCurrentStep(nextStep);
      setTimeout(() => {
        simulateTyping(currentScenario.steps[nextStep].npcMessage, () => {
          if (currentScenario.steps[nextStep].tacticReveal) {
            setCurrentTactic({ ...tactics[currentScenario.steps[nextStep].tacticReveal], phase: currentScenario.steps[nextStep].tacticPhase });
          }
        });
      }, 800);
    } else {
      setCompletedScenarios(prev => [...prev, currentScenario.id]);
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'system', content: '— Scenario Complete —\n\nRecognition is the first step to protection.' }]);
        if (isPreviewMode && !isUnlocked) {
          setTimeout(() => setShowPaymentModal(true), 2000);
        }
      }, 1000);
    }
  };

  const resetSimulation = () => {
    setCurrentScenario(null);
    setMessages([]);
    setCurrentStep(0);
    setCurrentTactic(null);
  };

  if (showLoginScreen) {
    return <LoginScreen onUnlock={handleUnlock} onPreview={handlePreview} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0b', color: '#e4e4e7', fontFamily: "'IBM Plex Sans', -apple-system, sans-serif", display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #18181b; }
        ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 3px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .message { animation: fadeIn 0.3s ease-out; }
        .tactic-panel { animation: slideIn 0.4s ease-out; }
        .typing-dot { animation: pulse 1.4s infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        .scenario-card { transition: all 0.3s ease; cursor: pointer; }
        .scenario-card:hover { transform: translateY(-2px); border-color: #dc2626; }
        .choice-btn { transition: all 0.2s ease; cursor: pointer; }
        .choice-btn:hover { background: #27272a; border-color: #52525b; transform: translateX(4px); }
        .locked-card { opacity: 0.7; }
        .locked-card:hover { border-color: #f7931a; }
      `}</style>

      {showPaymentModal && <PaymentModal onClose={() => setShowPaymentModal(false)} onSuccess={handleUnlock} />}

      {/* Header */}
      <header style={{ padding: '20px 24px', borderBottom: '1px solid #27272a', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#dc2626', boxShadow: '0 0 10px #dc2626' }} />
          <h1 style={{ fontSize: '18px', fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>NPD Pattern Recognition</h1>
          {isUnlocked && <span style={{ fontSize: '11px', padding: '3px 8px', backgroundColor: '#16a34a20', color: '#16a34a', borderRadius: '4px', fontWeight: 500 }}>Full Access</span>}
          {isPreviewMode && !isUnlocked && <span style={{ fontSize: '11px', padding: '3px 8px', backgroundColor: '#f7931a20', color: '#f7931a', borderRadius: '4px', fontWeight: 500 }}>Preview</span>}
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          {!isUnlocked && (
            <button onClick={() => setShowPaymentModal(true)} style={{ padding: '8px 16px', backgroundColor: '#f7931a', border: 'none', borderRadius: '6px', color: '#000', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 500 }}>
              🔓 Unlock All
            </button>
          )}
          <button onClick={() => setShowTacticPanel(!showTacticPanel)} style={{ padding: '8px 16px', backgroundColor: 'transparent', border: '1px solid #3f3f46', borderRadius: '6px', color: '#a1a1aa', fontSize: '13px', cursor: 'pointer', fontFamily: 'inherit' }}>
            {showTacticPanel ? 'Hide' : 'Show'} Analysis
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: showTacticPanel ? '1px solid #27272a' : 'none' }}>
          {!currentScenario ? (
            <div style={{ flex: 1, padding: '40px 24px', overflowY: 'auto' }}>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '-0.03em', marginBottom: '8px', color: '#fafafa' }}>Experience the Patterns</h2>
                <p style={{ fontSize: '15px', color: '#71717a', marginBottom: '40px', lineHeight: 1.6 }}>Interactive scenarios that teach you to recognize manipulation tactics in real-time.</p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {scenarios.map((scenario) => (
                    <div key={scenario.id} className={`scenario-card ${!scenario.free && !isUnlocked ? 'locked-card' : ''}`} onClick={() => startScenario(scenario)} style={{ padding: '20px', backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', position: 'relative' }}>
                      {!scenario.free && !isUnlocked && (
                        <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '12px', padding: '4px 8px', backgroundColor: '#f7931a20', color: '#f7931a', borderRadius: '4px', fontWeight: 500 }}>🔒 Locked</div>
                      )}
                      {scenario.free && <div style={{ position: 'absolute', top: '12px', right: '12px', fontSize: '11px', padding: '4px 8px', backgroundColor: '#16a34a20', color: '#16a34a', borderRadius: '4px', fontWeight: 500 }}>FREE</div>}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '16px', fontWeight: 500, margin: 0 }}>{scenario.title}</h3>
                        {completedScenarios.includes(scenario.id) && <span style={{ fontSize: '11px', padding: '2px 8px', backgroundColor: '#166534', color: '#86efac', borderRadius: '4px' }}>✓</span>}
                      </div>
                      <p style={{ fontSize: '14px', color: '#a1a1aa', margin: '0 0 12px 0', lineHeight: 1.5 }}>{scenario.context}</p>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {scenario.tactics.map((t) => (
                          <span key={t} style={{ fontSize: '11px', padding: '4px 10px', backgroundColor: tactics[t].color + '20', color: tactics[t].color, borderRadius: '4px', fontWeight: 500, fontFamily: "'IBM Plex Mono', monospace" }}>{tactics[t].name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <>
              <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
                <div style={{ maxWidth: '560px', margin: '0 auto' }}>
                  {messages.map((message, index) => (
                    <div key={index} className="message" style={{ marginBottom: '16px', display: 'flex', justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start' }}>
                      {message.type === 'system' ? (
                        <div style={{ padding: '16px', backgroundColor: '#1c1917', border: '1px solid #292524', borderRadius: '8px', fontSize: '14px', color: '#a8a29e', fontStyle: 'italic', lineHeight: 1.6, width: '100%', whiteSpace: 'pre-wrap' }}>{message.content}</div>
                      ) : message.type === 'npc' ? (
                        <div style={{ maxWidth: '85%', padding: '14px 18px', backgroundColor: '#27272a', borderRadius: '16px 16px 16px 4px', fontSize: '15px', lineHeight: 1.5 }}>{message.content}</div>
                      ) : (
                        <div style={{ maxWidth: '85%', padding: '14px 18px', backgroundColor: '#3b82f6', borderRadius: '16px 16px 4px 16px', fontSize: '15px', lineHeight: 1.5 }}>{message.content}</div>
                      )}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="message" style={{ marginBottom: '16px' }}>
                      <div style={{ padding: '14px 18px', backgroundColor: '#27272a', borderRadius: '16px 16px 16px 4px', display: 'flex', gap: '4px' }}>
                        <div className="typing-dot" style={{ width: '8px', height: '8px', backgroundColor: '#71717a', borderRadius: '50%' }} />
                        <div className="typing-dot" style={{ width: '8px', height: '8px', backgroundColor: '#71717a', borderRadius: '50%' }} />
                        <div className="typing-dot" style={{ width: '8px', height: '8px', backgroundColor: '#71717a', borderRadius: '50%' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <div style={{ padding: '20px 24px', borderTop: '1px solid #27272a', backgroundColor: '#0f0f10' }}>
                <div style={{ maxWidth: '560px', margin: '0 auto' }}>
                  {currentScenario && currentStep < currentScenario.steps.length && !isTyping && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {currentScenario.steps[currentStep].userOptions.map((option, index) => (
                        <button key={index} className="choice-btn" onClick={() => handleUserChoice(option)} style={{ padding: '14px 18px', backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px', color: '#e4e4e7', fontSize: '14px', textAlign: 'left', fontFamily: 'inherit', lineHeight: 1.4 }}>{option}</button>
                      ))}
                    </div>
                  )}
                  {currentStep >= currentScenario?.steps.length && (
                    <button onClick={resetSimulation} style={{ width: '100%', padding: '14px', backgroundColor: '#dc2626', border: 'none', borderRadius: '8px', color: 'white', fontSize: '14px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>← Back to Scenarios</button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Tactic Panel */}
        {showTacticPanel && (
          <div style={{ width: '340px', backgroundColor: '#0f0f10', padding: '24px', overflowY: 'auto', flexShrink: 0 }}>
            {currentTactic ? (
              <div className="tactic-panel">
                <div style={{ display: 'inline-block', padding: '4px 12px', backgroundColor: currentTactic.color + '20', color: currentTactic.color, borderRadius: '4px', fontSize: '12px', fontWeight: 600, fontFamily: "'IBM Plex Mono', monospace", marginBottom: '12px' }}>
                  {currentTactic.isProtective ? '🛡 AWARENESS' : '⚠ TACTIC DETECTED'}
                </div>
                <h3 style={{ fontSize: '22px', fontWeight: 500, marginBottom: '4px', letterSpacing: '-0.02em' }}>{currentTactic.name}</h3>
                <div style={{ fontSize: '13px', color: '#71717a', marginBottom: '20px' }}>{currentTactic.fullName}</div>
                <div style={{ padding: '16px', backgroundColor: currentTactic.color + '10', borderLeft: `3px solid ${currentTactic.color}`, borderRadius: '0 8px 8px 0', marginBottom: '20px' }}>
                  <div style={{ fontSize: '11px', fontWeight: 600, color: currentTactic.color, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What's Happening</div>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, margin: 0, color: '#e4e4e7' }}>{currentTactic.phase}</p>
                </div>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 600, color: '#71717a', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Warning Signs</div>
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {currentTactic.signs.map((sign, i) => (
                      <li key={i} style={{ fontSize: '13px', color: '#a1a1aa', display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                        <span style={{ color: currentTactic.color }}>→</span>{sign}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div style={{ color: '#52525b' }}>
                <div style={{ fontSize: '13px', fontWeight: 500, marginBottom: '8px' }}>Analysis Panel</div>
                <p style={{ fontSize: '13px', lineHeight: 1.6, margin: 0 }}>{currentScenario ? "Watch this space as tactics are identified." : "Select a scenario to begin."}</p>
              </div>
            )}
            <div style={{ marginTop: '40px', padding: '16px', backgroundColor: '#18181b', borderRadius: '8px', border: '1px solid #27272a' }}>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#71717a', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Remember</div>
              <p style={{ fontSize: '12px', color: '#a1a1aa', lineHeight: 1.6, margin: 0 }}>Real situations unfold over weeks, months, or years. Recognition is protection.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NPDSimulation;
