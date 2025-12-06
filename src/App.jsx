import React, { useState, useEffect, useRef } from 'react';

const NPDSimulation = () => {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [showTacticPanel, setShowTacticPanel] = useState(true);
  const [currentTactic, setCurrentTactic] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [completedScenarios, setCompletedScenarios] = useState([]);
  const messagesEndRef = useRef(null);

  const tactics = {
    darvo: {
      name: "DARVO",
      fullName: "Deny, Attack, Reverse Victim & Offender",
      description: "A manipulation sequence where the person denies the behavior, attacks your credibility, then positions themselves as the real victim.",
      signs: ["Flat denial despite evidence", "Personal attacks when confronted", "Sudden flip to victimhood", "You end up apologizing for bringing it up"],
      color: "#dc2626"
    },
    loveBombing: {
      name: "Love Bombing",
      fullName: "Excessive Affection & Attention",
      description: "Overwhelming you with affection, praise, and attention early on to create rapid attachment and dependency.",
      signs: ["Too much too fast", "Constant communication", "Grand gestures early", "Pressure for commitment", "Feels intoxicating"],
      color: "#db2777"
    },
    gaslighting: {
      name: "Gaslighting",
      fullName: "Reality Distortion",
      description: "Making you question your own memory, perception, and sanity by denying things that happened or twisting events.",
      signs: ["'That never happened'", "'You're imagining things'", "Denying what you clearly saw/heard", "You start doubting yourself"],
      color: "#7c3aed"
    },
    wordSalad: {
      name: "Word Salad",
      fullName: "Circular Confusion",
      description: "Using confusing, contradictory, or circular language to derail the conversation and exhaust you into giving up.",
      signs: ["Conversations go in circles", "Topics shift constantly", "Nothing gets resolved", "You feel mentally exhausted"],
      color: "#2563eb"
    },
    triangulation: {
      name: "Triangulation",
      fullName: "Third-Party Manipulation",
      description: "Bringing another person into the dynamic to create jealousy, insecurity, or to validate their position against you.",
      signs: ["Mentions of exes or admirers", "Comparing you to others", "Using others' opinions against you", "Creating competition"],
      color: "#059669"
    },
    futureFaking: {
      name: "Future Faking",
      fullName: "Empty Promises",
      description: "Making promises about the future they have no intention of keeping to maintain your hope and investment.",
      signs: ["Big plans that never materialize", "Promises conditional on your behavior", "Moving goalposts", "Years pass, nothing changes"],
      color: "#d97706"
    },
    silentTreatment: {
      name: "Silent Treatment",
      fullName: "Punitive Withdrawal",
      description: "Withdrawing communication and affection as punishment, creating anxiety and training you to avoid conflict.",
      signs: ["Sudden unexplained coldness", "Ignoring you for days", "You don't know what you did", "Relief when they return"],
      color: "#475569"
    },
    projection: {
      name: "Projection",
      fullName: "Accusatory Mirror",
      description: "Accusing you of the exact behaviors they're engaging in, deflecting attention from their actions.",
      signs: ["Accused of what they do", "Feels absurd and unfair", "Puts you on defense", "Their behavior continues"],
      color: "#0891b2"
    },
    intermittentReinforcement: {
      name: "Intermittent Reinforcement",
      fullName: "Unpredictable Rewards",
      description: "Alternating between affection and coldness unpredictably, creating an addictive cycle of hope and disappointment.",
      signs: ["Good times feel amazing", "Never know which version you'll get", "Walking on eggshells", "Addictive quality to the relationship"],
      color: "#c026d3"
    },
    nonApology: {
      name: "Non-Apology",
      fullName: "Fake Accountability",
      description: "Appearing to apologize while actually blaming you or avoiding responsibility for their actions.",
      signs: ["'I'm sorry you feel that way'", "'I'm sorry but...'", "Apology feels hollow", "Nothing changes after"],
      color: "#ea580c"
    },
    covertPutdowns: {
      name: "Covert Put-Downs",
      fullName: "Disguised Insults",
      description: "Insults wrapped in jokes, 'concern,' or backhanded compliments that are deniable if confronted.",
      signs: ["'Just joking'", "'I'm only trying to help'", "Compliments that sting", "You feel bad but can't explain why"],
      color: "#64748b"
    },
    darkEmpath: {
      name: "Dark Empath Awareness",
      fullName: "Pattern Recognition Through Pain",
      description: "Understanding gained through surviving darkness. Not using pain to control, but to understand and protect. Intuition forged in betrayal, survival, and navigating dangerous personalities.",
      signs: ["Seeing manipulation as it happens", "Reading energy shifts", "Sensing hidden intentions", "Matching energy without losing yourself", "Standing firm against manipulators"],
      color: "#1e1b4b",
      isProtective: true
    }
  };

  const scenarios = [
    {
      id: 'darvo_confrontation',
      title: "The Confrontation",
      context: "You found out your partner has been lying about where they've been spending time. You decide to bring it up.",
      tactics: ['darvo'],
      steps: [
        {
          npcMessage: "Hey babe! How was your day? I missed you 💕",
          userPrompt: "Bring up that you know they lied about where they were last night",
          userOptions: [
            "I need to talk to you about something. I know you weren't at Mike's last night.",
            "Where were you really last night? I called Mike.",
            "Can we talk? I'm confused about some things."
          ]
        },
        {
          npcMessage: "What? I was at Mike's. What are you talking about? Why are you checking up on me?",
          tacticReveal: "darvo",
          tacticPhase: "DENY - Notice the flat denial despite you having evidence. They're also already deflecting by questioning why you checked.",
          userOptions: [
            "Mike said you weren't there. He hadn't seen you in weeks.",
            "I'm not checking up on you, I just happened to call him.",
            "Please just tell me the truth."
          ]
        },
        {
          npcMessage: "Oh, so now you're interrogating my friends? That's really controlling behavior. I can't believe you don't trust me. This is exactly why I don't tell you things.",
          tacticReveal: "darvo",
          tacticPhase: "ATTACK - Now they're attacking your character. 'Controlling,' 'don't trust me.' Notice how they've flipped from the person who lied to the person being wronged by your 'interrogation.'",
          userOptions: [
            "I'm not trying to control you, I just want honesty.",
            "You're turning this around. You lied to me.",
            "Maybe you're right, I shouldn't have called..."
          ]
        },
        {
          npcMessage: "You know what? I can't do this. I've been so stressed lately and I needed one night to myself without being questioned. But I can't even have that because you're always suspicious. Do you know how hard that is for me? I feel like I'm suffocating.",
          tacticReveal: "darvo",
          tacticPhase: "REVERSE VICTIM & OFFENDER - Complete flip. They are now the victim who is 'suffocating.' You've gone from confronting a lie to potentially comforting them. This is DARVO.",
          userOptions: [
            "I... I didn't mean to make you feel that way.",
            "Wait, you still haven't explained where you actually were.",
            "I need to think about this."
          ]
        }
      ]
    },
    {
      id: 'love_bombing_start',
      title: "The Whirlwind",
      context: "You've been talking to someone new for two weeks. Things are moving very fast.",
      tactics: ['loveBombing', 'futureFaking'],
      steps: [
        {
          npcMessage: "Good morning beautiful ☀️ I couldn't sleep last night, I kept thinking about you. I've never felt this way about anyone before. I know we just met but I feel like I've known you forever. What are you doing this weekend? I want to spend every moment with you.",
          tacticReveal: "loveBombing",
          tacticPhase: "Notice the intensity: couldn't sleep, never felt this way, known you forever, want every moment. This is a LOT for two weeks.",
          userOptions: [
            "That's so sweet! I really like you too.",
            "I like you but maybe we should slow down a little?",
            "I have plans with friends this weekend actually."
          ]
        },
        {
          npcMessage: "Slow down? But why would we slow down something that feels so right? I've already told my mom about you. She can't wait to meet you. I was even looking at apartments in your neighborhood so we could be closer. I just know you're the one.",
          tacticReveal: "loveBombing",
          tacticPhase: "Escalation: told family, looking at apartments, 'the one' — after TWO WEEKS. Healthy relationships build gradually. This pace creates false intimacy and attachment.",
          userOptions: [
            "You told your mom about me? That's... a lot.",
            "I'm flattered but this is moving really fast.",
            "That's so romantic, I can't believe you'd do that for me!"
          ]
        },
        {
          npcMessage: "I know it seems fast but when you know, you know. I can already picture our future — traveling together, maybe getting a place with a garden, you'd be such an amazing parent someday. I've never been able to picture that with anyone else. You're different. You're special.",
          tacticReveal: "futureFaking",
          tacticPhase: "FUTURE FAKING enters: painting elaborate futures (travel, home, children) to accelerate your emotional investment. These visions create bonds to a future that may never come.",
          userOptions: [
            "I've thought about that stuff too...",
            "We should probably focus on getting to know each other first.",
            "You really see all that with me?"
          ]
        },
        {
          npcMessage: "Of course I do. But you're right, let's take it one step at a time. Starting with you meeting my friends next week — they're going to love you. And maybe we can take that trip to the coast I mentioned? I already looked at some places. I just want to give you everything you deserve. No one has ever appreciated you the way I will. 💕",
          tacticReveal: "loveBombing",
          tacticPhase: "Notice: they acknowledged 'slow down' but immediately added MORE plans (friends, trip, already booked places). The words agree but the actions continue the bombardment. Also: 'No one has ever appreciated you like I will' — isolation begins.",
          userOptions: [
            "That sounds amazing, I can't wait.",
            "I appreciate the thought but I need to check my schedule.",
            "This is a lot to take in. I need some time to think."
          ]
        }
      ]
    },
    {
      id: 'gaslighting_memory',
      title: "The Rewrite",
      context: "You clearly remember your partner agreeing to attend your sister's wedding with you. Now they're saying they never agreed.",
      tactics: ['gaslighting', 'nonApology'],
      steps: [
        {
          npcMessage: "The wedding is THIS weekend? I never said I'd go to that.",
          tacticReveal: "gaslighting",
          tacticPhase: "The flat contradiction begins. You KNOW this conversation happened. Trust your memory.",
          userOptions: [
            "We talked about this three times. You said you'd come.",
            "What do you mean? We planned our outfits together.",
            "Are you serious right now?"
          ]
        },
        {
          npcMessage: "I think you're confusing what you wanted me to say with what I actually said. I said I'd TRY to come if I didn't have work. You probably just heard what you wanted to hear. You do that a lot.",
          tacticReveal: "gaslighting",
          tacticPhase: "'You heard what you wanted' / 'You do that a lot' — They're not just denying this instance, they're establishing a pattern where YOUR perception is unreliable. This is classic gaslighting.",
          userOptions: [
            "I didn't imagine this. You said yes.",
            "Do I really do that a lot? I didn't realize...",
            "I have a text where you said you'd come."
          ]
        },
        {
          npcMessage: "A text? Let me see. ... That doesn't say I'm definitely coming, it says 'sounds good, we'll see.' You're reading into things again. Why do you always have to make everything into a fight?",
          tacticReveal: "gaslighting",
          tacticPhase: "Even with evidence, they reframe it. 'We'll see' after saying yes is a revision. 'Reading into things AGAIN' / 'always make everything a fight' — more pattern establishment. You're being made the problem.",
          userOptions: [
            "I'm not trying to fight, I just need you there.",
            "Maybe I did misread it... I'm sorry.",
            "You're twisting this. That text was a confirmation."
          ]
        },
        {
          npcMessage: "Look, I'm sorry if you misunderstood. I should have been clearer, that's my bad. But I can't help that work scheduled me this weekend. I wish I could be there, I really do. Maybe next time communicate more clearly about things that are important to you?",
          tacticReveal: "nonApology",
          tacticPhase: "NON-APOLOGY: 'Sorry IF you misunderstood' — conditional, blames your comprehension. 'Maybe next time communicate more clearly' — you're responsible for their broken commitment. They appear reasonable while accepting zero actual accountability.",
          userOptions: [
            "I guess I should have been clearer...",
            "This isn't about my communication. You said yes.",
            "I need to go. We'll talk later."
          ]
        }
      ]
    },
    {
      id: 'word_salad_argument',
      title: "The Endless Loop",
      context: "You're trying to have a simple conversation about them being late to dinner with your parents. It should be straightforward.",
      tactics: ['wordSalad', 'projection'],
      steps: [
        {
          npcMessage: "Oh so NOW I'm the bad guy because traffic exists? You know what, you're always doing this — making me feel bad about things I can't control. Remember when YOU were late to my company dinner? But I didn't make a big deal about it because I'm not like that.",
          tacticReveal: "wordSalad",
          tacticPhase: "Notice: You haven't even said anything yet and they're already defensive, deflecting to traffic, bringing up an old event, and positioning themselves as morally superior. This is the opening move.",
          userOptions: [
            "I wasn't attacking you, I just wanted to talk about tonight.",
            "That's different, I called ahead when I was late.",
            "Can we just focus on what happened today?"
          ]
        },
        {
          npcMessage: "Focus on today? That's rich. You want to focus on today but you don't want to look at the bigger picture. The BIGGER PICTURE is that I've been stressed at work, which you'd know if you ever asked, but you only care about how things affect you. Your parents probably didn't even notice I was late. Did they say something? Because if they said something that's really between me and them.",
          tacticReveal: "wordSalad",
          tacticPhase: "Topic shifts: your selfishness → their work stress → you don't ask about them → your parents → that's between them. You're being spun in circles. The original issue (lateness) is drowning.",
          userOptions: [
            "Wait, can we go back to the original issue?",
            "You're right, I should ask about work more...",
            "My parents didn't say anything but that's not the point."
          ]
        },
        {
          npcMessage: "See, they didn't say anything! So what is the point? The point is you want to control when I arrive places. That's controlling behavior and honestly it makes me wonder if you even respect me as an autonomous person. Do you respect me? Because it feels like you don't. It feels like you just want someone who does what you say.",
          tacticReveal: "projection",
          tacticPhase: "PROJECTION: 'controlling behavior' — asking someone to be on time isn't control. They're projecting their own desire for control (of this narrative) onto you. Now YOU have to defend against accusations of disrespect.",
          userOptions: [
            "Of course I respect you, I just—",
            "Being on time isn't about control, it's about respect.",
            "How did this become about whether I respect you?"
          ]
        },
        {
          npcMessage: "See, you can't even say you respect me without a 'but.' That's really telling. You know what, I'm not having this conversation when you're in this headspace. When you're ready to have an adult conversation about the real issues in this relationship — not just attacking me about being 20 minutes late because of TRAFFIC — then we can talk. But I'm not going to be verbally abused for something that wasn't my fault.",
          tacticReveal: "wordSalad",
          tacticPhase: "The finale: you're 'not in the right headspace' / 'verbally abusing' them / they're above this. The conversation ends with NOTHING resolved. You're probably exhausted and confused about what just happened. That's the point.",
          userOptions: [
            "I wasn't verbally abusing you...",
            "Okay, we can talk later.",
            "This conversation makes no sense."
          ]
        }
      ]
    },
    {
      id: 'triangulation_jealousy',
      title: "The Third Party",
      context: "Your partner has been mentioning a coworker named Alex a lot lately.",
      tactics: ['triangulation', 'covertPutdowns'],
      steps: [
        {
          npcMessage: "Work was great today. Alex brought everyone coffee and remembered exactly how I like mine. It's nice to feel noticed, you know? Oh, I mentioned your cooking and Alex said their ex was a chef. We had a good laugh about kitchen disasters — I may have mentioned that burnt lasagna incident 😂",
          tacticReveal: "triangulation",
          tacticPhase: "The introduction: Alex notices them, remembers details, they shared personal stories about you. Seeds of comparison being planted. Why tell you this at all?",
          userOptions: [
            "That's nice they got you coffee.",
            "You told them about my burnt lasagna?",
            "You've been mentioning Alex a lot lately."
          ]
        },
        {
          npcMessage: "Oh don't be jealous, it's not a good look. Alex is just a friend who actually listens to me. Unlike SOME people who are always on their phone during dinner. Alex says presence is the most important thing in any relationship. They're really emotionally intelligent actually. You could learn something.",
          tacticReveal: "covertPutdowns",
          tacticPhase: "COVERT PUT-DOWN: 'not a good look' / 'SOME people' / 'you could learn something.' You're being unfavorably compared while being told not to feel jealous about the comparison.",
          userOptions: [
            "I'm not jealous, just... noticing things.",
            "I didn't realize I was on my phone that much.",
            "Why are you comparing me to them?"
          ]
        },
        {
          npcMessage: "I'm not comparing! God, you're so insecure sometimes. Alex actually said something interesting about insecurity in relationships — that it usually comes from the insecure person projecting their own issues. Have you thought about therapy? Alex's therapist apparently really helped them. I can get the name if you want.",
          tacticReveal: "triangulation",
          tacticPhase: "Deep triangulation: Alex's opinions are now being used to diagnose YOUR problems. They're quoting Alex to suggest you need therapy. This external 'authority' validates every criticism.",
          userOptions: [
            "Maybe I am being insecure...",
            "I don't need Alex's therapist's number.",
            "It sounds like you and Alex talk about me a lot."
          ]
        },
        {
          npcMessage: "We talk about lots of things, you come up because you're important to me. Alex actually thinks you sound great from what I've told them. They said they'd love to meet you sometime. Unless you're too jealous to handle that? I just want you to meet my friends. Alex really gets me in ways that... well, in ways that are just different. It's nice to have that.",
          tacticReveal: "triangulation",
          tacticPhase: "The bind: 'unless you're too jealous' makes refusing seem like YOUR problem. 'Gets me in ways that are different' — implying something is missing with you. You're being positioned to either accept the triangle or be the jealous villain.",
          userOptions: [
            "Sure, I'd like to meet them.",
            "What ways do they 'get you' that I don't?",
            "I think I need to step back from this conversation."
          ]
        }
      ]
    },
    {
      id: 'dark_empath_recognition',
      title: "The Pattern Recognition",
      context: "You've learned to recognize manipulation. Someone new is trying familiar tactics on you.",
      tactics: ['darkEmpath'],
      steps: [
        {
          npcMessage: "You're amazing, you know that? I've never connected with anyone so fast. I feel like I can tell you anything. I actually already told my friends about you — they can't wait to meet you. Let's do something spontaneous this weekend! I'll plan everything, you just show up. 💕",
          tacticReveal: "darkEmpath",
          tacticPhase: "RECOGNITION: You feel the familiar rhythm — too fast, already told friends, taking control of plans, excessive affection early. Your nervous system remembers this pattern. This is love bombing.",
          userOptions: [
            "[Recognize] This is moving very fast. I'd like to take things slower.",
            "[Test] That sounds nice. What did you have in mind?",
            "[Boundary] I appreciate the enthusiasm but I prefer to plan things together."
          ]
        },
        {
          npcMessage: "Slower? But why slow down something good? Life is short. I just don't want to play games like everyone else does. I'm not like other people — I say what I feel. If that scares you, maybe you're not ready for something real.",
          tacticReveal: "darkEmpath",
          tacticPhase: "RECOGNITION: The pushback on boundaries. 'Not like other people' (special/superior). 'If that scares you' (challenge to your readiness). They're framing your healthy boundary as YOUR limitation. You've seen this before.",
          userOptions: [
            "[Name it] I've heard this pattern before. It doesn't scare me — it's a red flag.",
            "[Hold boundary] My pace isn't about fear. It's about making good choices.",
            "[Exit] I wish you well but this isn't right for me."
          ]
        },
        {
          npcMessage: "Red flag? Wow. I open up to you and that's a 'red flag'? You must have been really hurt by someone. I'm not them. Give me a chance to prove I'm different. I promise you won't regret it. Just let me in.",
          tacticReveal: "darkEmpath",
          tacticPhase: "RECOGNITION: The 'you've been hurt' narrative — pathologizing your discernment. 'I'm not them' (differentiation claim). 'Let me in' (boundary pressure). You see the machinery now. None of this is about connection — it's about access.",
          userOptions: [
            "[Truth] My discernment isn't damage. It's wisdom.",
            "[Firm] I don't need to give chances to prove anything.",
            "[Complete] This conversation has told me what I need to know. Take care."
          ]
        },
        {
          npcMessage: "Okay, I hear you. Maybe I came on too strong. I just... I really felt something and I got excited. But you're right. We can go your pace. I respect that. Actually, I admire it. You have strong boundaries. That's rare.",
          tacticReveal: "darkEmpath",
          tacticPhase: "THE TEST: This could be genuine. Or it could be tactical adaptation — learning what works on you. A dark empath watches for: Do their actions match? Does the intensity return? Do they really adjust or just SAY they will? You don't have to decide now. Time reveals patterns.",
          userOptions: [
            "[Observe] Thank you. Let's see how things unfold naturally.",
            "[Cautious trust] I appreciate you hearing me. Actions will tell.",
            "[Protect peace] I think I need some space to think. I'll reach out if I want to continue."
          ]
        }
      ]
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startScenario = (scenario) => {
    setCurrentScenario(scenario);
    setMessages([]);
    setCurrentStep(0);
    setCurrentTactic(null);
    
    setTimeout(() => {
      setMessages([{
        type: 'system',
        content: scenario.context
      }]);
      
      setTimeout(() => {
        simulateTyping(scenario.steps[0].npcMessage, () => {
          if (scenario.steps[0].tacticReveal) {
            setCurrentTactic({
              ...tactics[scenario.steps[0].tacticReveal],
              phase: scenario.steps[0].tacticPhase
            });
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
            setCurrentTactic({
              ...tactics[currentScenario.steps[nextStep].tacticReveal],
              phase: currentScenario.steps[nextStep].tacticPhase
            });
          }
        });
      }, 800);
    } else {
      setCompletedScenarios(prev => [...prev, currentScenario.id]);
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'system', 
          content: '— Scenario Complete —\n\nYou\'ve experienced this manipulation pattern firsthand. In real life, these conversations can last hours, days, or years. Recognition is the first step to protection.' 
        }]);
      }, 1000);
    }
  };

  const resetSimulation = () => {
    setCurrentScenario(null);
    setMessages([]);
    setCurrentStep(0);
    setCurrentTactic(null);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0a0a0b',
      color: '#e4e4e7',
      fontFamily: "'IBM Plex Sans', -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');
        
        * { box-sizing: border-box; }
        
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #18181b; }
        ::-webkit-scrollbar-thumb { background: #3f3f46; border-radius: 3px; }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to { opacity: 1; transform: translateX(0); }
        }
        
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(220, 38, 38, 0.1); }
          50% { box-shadow: 0 0 40px rgba(220, 38, 38, 0.2); }
        }
        
        .message { animation: fadeIn 0.3s ease-out; }
        .tactic-panel { animation: slideIn 0.4s ease-out; }
        .typing-dot { animation: pulse 1.4s infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
        
        .scenario-card {
          transition: all 0.3s ease;
          cursor: pointer;
        }
        .scenario-card:hover {
          transform: translateY(-2px);
          border-color: #dc2626;
        }
        
        .choice-btn {
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .choice-btn:hover {
          background: #27272a;
          border-color: #52525b;
          transform: translateX(4px);
        }
      `}</style>

      {/* Header */}
      <header style={{
        padding: '20px 24px',
        borderBottom: '1px solid #27272a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            backgroundColor: '#dc2626',
            boxShadow: '0 0 10px #dc2626'
          }} />
          <h1 style={{
            fontSize: '18px',
            fontWeight: 500,
            letterSpacing: '-0.02em',
            margin: 0
          }}>
            NPD Pattern Recognition
          </h1>
        </div>
        
        <button
          onClick={() => setShowTacticPanel(!showTacticPanel)}
          style={{
            padding: '8px 16px',
            backgroundColor: 'transparent',
            border: '1px solid #3f3f46',
            borderRadius: '6px',
            color: '#a1a1aa',
            fontSize: '13px',
            cursor: 'pointer',
            fontFamily: 'inherit'
          }}
        >
          {showTacticPanel ? 'Hide' : 'Show'} Analysis Panel
        </button>
      </header>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        overflow: 'hidden'
      }}>
        
        {/* Chat Area */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          borderRight: showTacticPanel ? '1px solid #27272a' : 'none'
        }}>
          
          {!currentScenario ? (
            /* Scenario Selection */
            <div style={{
              flex: 1,
              padding: '40px 24px',
              overflowY: 'auto'
            }}>
              <div style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 style={{
                  fontSize: '28px',
                  fontWeight: 300,
                  letterSpacing: '-0.03em',
                  marginBottom: '8px',
                  color: '#fafafa'
                }}>
                  Experience the Patterns
                </h2>
                <p style={{
                  fontSize: '15px',
                  color: '#71717a',
                  marginBottom: '40px',
                  lineHeight: 1.6
                }}>
                  These interactive scenarios let you experience common manipulation tactics firsthand. 
                  Real-time analysis helps you recognize what's happening as it unfolds.
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {scenarios.map((scenario) => (
                    <div
                      key={scenario.id}
                      className="scenario-card"
                      onClick={() => startScenario(scenario)}
                      style={{
                        padding: '20px',
                        backgroundColor: '#18181b',
                        border: '1px solid #27272a',
                        borderRadius: '8px',
                        position: 'relative'
                      }}
                    >
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        marginBottom: '8px'
                      }}>
                        <h3 style={{
                          fontSize: '16px',
                          fontWeight: 500,
                          margin: 0
                        }}>
                          {scenario.title}
                        </h3>
                        {completedScenarios.includes(scenario.id) && (
                          <span style={{
                            fontSize: '11px',
                            padding: '2px 8px',
                            backgroundColor: '#166534',
                            color: '#86efac',
                            borderRadius: '4px'
                          }}>
                            Completed
                          </span>
                        )}
                      </div>
                      <p style={{
                        fontSize: '14px',
                        color: '#a1a1aa',
                        margin: '0 0 12px 0',
                        lineHeight: 1.5
                      }}>
                        {scenario.context}
                      </p>
                      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {scenario.tactics.map((tacticKey) => (
                          <span
                            key={tacticKey}
                            style={{
                              fontSize: '11px',
                              padding: '4px 10px',
                              backgroundColor: tactics[tacticKey].color + '20',
                              color: tactics[tacticKey].color,
                              borderRadius: '4px',
                              fontWeight: 500,
                              fontFamily: "'IBM Plex Mono', monospace"
                            }}
                          >
                            {tactics[tacticKey].name}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tactics Reference */}
                <div style={{ marginTop: '48px' }}>
                  <h3 style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#71717a',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: '16px'
                  }}>
                    Tactics Reference
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '8px'
                  }}>
                    {Object.entries(tactics).map(([key, tactic]) => (
                      <div
                        key={key}
                        style={{
                          padding: '12px',
                          backgroundColor: '#18181b',
                          border: '1px solid #27272a',
                          borderRadius: '6px',
                          borderLeft: `3px solid ${tactic.color}`
                        }}
                      >
                        <div style={{
                          fontSize: '13px',
                          fontWeight: 500,
                          marginBottom: '4px'
                        }}>
                          {tactic.name}
                        </div>
                        <div style={{
                          fontSize: '11px',
                          color: '#71717a'
                        }}>
                          {tactic.fullName}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Active Conversation */
            <>
              <div style={{
                flex: 1,
                overflowY: 'auto',
                padding: '24px'
              }}>
                <div style={{ maxWidth: '560px', margin: '0 auto' }}>
                  {messages.map((message, index) => (
                    <div
                      key={index}
                      className="message"
                      style={{
                        marginBottom: '16px',
                        display: 'flex',
                        justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start'
                      }}
                    >
                      {message.type === 'system' ? (
                        <div style={{
                          padding: '16px',
                          backgroundColor: '#1c1917',
                          border: '1px solid #292524',
                          borderRadius: '8px',
                          fontSize: '14px',
                          color: '#a8a29e',
                          fontStyle: 'italic',
                          lineHeight: 1.6,
                          width: '100%',
                          whiteSpace: 'pre-wrap'
                        }}>
                          {message.content}
                        </div>
                      ) : message.type === 'npc' ? (
                        <div style={{
                          maxWidth: '85%',
                          padding: '14px 18px',
                          backgroundColor: '#27272a',
                          borderRadius: '16px 16px 16px 4px',
                          fontSize: '15px',
                          lineHeight: 1.5
                        }}>
                          {message.content}
                        </div>
                      ) : (
                        <div style={{
                          maxWidth: '85%',
                          padding: '14px 18px',
                          backgroundColor: '#3b82f6',
                          borderRadius: '16px 16px 4px 16px',
                          fontSize: '15px',
                          lineHeight: 1.5
                        }}>
                          {message.content}
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="message" style={{ marginBottom: '16px' }}>
                      <div style={{
                        padding: '14px 18px',
                        backgroundColor: '#27272a',
                        borderRadius: '16px 16px 16px 4px',
                        display: 'flex',
                        gap: '4px'
                      }}>
                        <div className="typing-dot" style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#71717a',
                          borderRadius: '50%'
                        }} />
                        <div className="typing-dot" style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#71717a',
                          borderRadius: '50%'
                        }} />
                        <div className="typing-dot" style={{
                          width: '8px',
                          height: '8px',
                          backgroundColor: '#71717a',
                          borderRadius: '50%'
                        }} />
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              {/* User Choices */}
              <div style={{
                padding: '20px 24px',
                borderTop: '1px solid #27272a',
                backgroundColor: '#0f0f10'
              }}>
                <div style={{ maxWidth: '560px', margin: '0 auto' }}>
                  {currentScenario && currentStep < currentScenario.steps.length && !isTyping && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {currentScenario.steps[currentStep].userOptions.map((option, index) => (
                        <button
                          key={index}
                          className="choice-btn"
                          onClick={() => handleUserChoice(option)}
                          style={{
                            padding: '14px 18px',
                            backgroundColor: '#18181b',
                            border: '1px solid #3f3f46',
                            borderRadius: '8px',
                            color: '#e4e4e7',
                            fontSize: '14px',
                            textAlign: 'left',
                            fontFamily: 'inherit',
                            lineHeight: 1.4
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                  
                  {currentStep >= currentScenario?.steps.length && (
                    <button
                      onClick={resetSimulation}
                      style={{
                        width: '100%',
                        padding: '14px',
                        backgroundColor: '#dc2626',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white',
                        fontSize: '14px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        fontFamily: 'inherit'
                      }}
                    >
                      ← Back to Scenarios
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Tactic Analysis Panel */}
        {showTacticPanel && (
          <div style={{
            width: '340px',
            backgroundColor: '#0f0f10',
            padding: '24px',
            overflowY: 'auto',
            flexShrink: 0
          }}>
            {currentTactic ? (
              <div className="tactic-panel">
                <div style={{
                  display: 'inline-block',
                  padding: '4px 12px',
                  backgroundColor: currentTactic.color + '20',
                  color: currentTactic.color,
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 600,
                  fontFamily: "'IBM Plex Mono', monospace",
                  marginBottom: '12px'
                }}>
                  {currentTactic.isProtective ? '🛡 PROTECTIVE AWARENESS' : '⚠ TACTIC DETECTED'}
                </div>
                
                <h3 style={{
                  fontSize: '22px',
                  fontWeight: 500,
                  marginBottom: '4px',
                  letterSpacing: '-0.02em'
                }}>
                  {currentTactic.name}
                </h3>
                <div style={{
                  fontSize: '13px',
                  color: '#71717a',
                  marginBottom: '20px'
                }}>
                  {currentTactic.fullName}
                </div>
                
                <div style={{
                  padding: '16px',
                  backgroundColor: currentTactic.color + '10',
                  borderLeft: `3px solid ${currentTactic.color}`,
                  borderRadius: '0 8px 8px 0',
                  marginBottom: '20px'
                }}>
                  <div style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: currentTactic.color,
                    marginBottom: '8px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    What's Happening
                  </div>
                  <p style={{
                    fontSize: '14px',
                    lineHeight: 1.6,
                    margin: 0,
                    color: '#e4e4e7'
                  }}>
                    {currentTactic.phase}
                  </p>
                </div>
                
                <div>
                  <div style={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#71717a',
                    marginBottom: '12px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {currentTactic.isProtective ? 'Recognition Signs' : 'Warning Signs'}
                  </div>
                  <ul style={{
                    margin: 0,
                    padding: 0,
                    listStyle: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px'
                  }}>
                    {currentTactic.signs.map((sign, index) => (
                      <li
                        key={index}
                        style={{
                          fontSize: '13px',
                          color: '#a1a1aa',
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '8px'
                        }}
                      >
                        <span style={{ color: currentTactic.color }}>→</span>
                        {sign}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div style={{ color: '#52525b' }}>
                <div style={{
                  fontSize: '13px',
                  fontWeight: 500,
                  marginBottom: '8px'
                }}>
                  Analysis Panel
                </div>
                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.6,
                  margin: 0
                }}>
                  {currentScenario 
                    ? "Watch this space. As the conversation unfolds, manipulation tactics will be identified and explained in real time."
                    : "Select a scenario to begin. This panel will analyze manipulation tactics as they appear in the conversation."
                  }
                </p>
              </div>
            )}

            {/* Educational Footer */}
            <div style={{
              marginTop: '40px',
              padding: '16px',
              backgroundColor: '#18181b',
              borderRadius: '8px',
              border: '1px solid #27272a'
            }}>
              <div style={{
                fontSize: '11px',
                fontWeight: 600,
                color: '#71717a',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Remember
              </div>
              <p style={{
                fontSize: '12px',
                color: '#a1a1aa',
                lineHeight: 1.6,
                margin: 0
              }}>
                This simulation is educational. Real situations unfold over weeks, months, or years. 
                If you recognize these patterns in your life, consider speaking with a mental health professional.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NPDSimulation;
