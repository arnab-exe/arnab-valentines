import { useState, useCallback, useRef } from "react";

// ✏️ CUSTOMISE THESE:
const CONFIG = {
  question: "Hello, Ms. Sapna Ray. Will you be my Valentine? 💕",
  yesMessage: "Yaaay! I knew you'd say yes! 🥰",
  yesSubMessage: "You just made me the happiest person ever! ❤️",
  fromName: "Your Secret Admirer",
};

const HEARTS = ["❤️", "💖", "💗", "💓", "💕", "💘", "💝", "♥️"];

const FloatingHearts = () => (
  <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
    {Array.from({ length: 15 }).map((_, i) => (
      <span
        key={i}
        className="absolute animate-float-heart text-2xl md:text-3xl select-none"
        style={{
          left: `${Math.random() * 100}%`,
          animationDuration: `${6 + Math.random() * 8}s`,
          animationDelay: `${Math.random() * 10}s`,
        }}
      >
        {HEARTS[i % HEARTS.length]}
      </span> //lol
    ))}
  </div>
);

const Index = () => {
  const [accepted, setAccepted] = useState(false);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  const dodgeNo = useCallback(() => {
    if (!noBtnRef.current) return;
    const maxX = window.innerWidth - 120;
    const maxY = window.innerHeight - 60;
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    noBtnRef.current.style.position = "fixed";
    noBtnRef.current.style.left = `${x}px`;
    noBtnRef.current.style.top = `${y}px`;
    noBtnRef.current.style.zIndex = "50";
  }, []);

  if (accepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden px-4">
        <FloatingHearts />
        <div className="relative z-10 text-center space-y-6 max-w-md">
          <span className="text-7xl md:text-8xl block animate-pulse-heart">💖</span>
          <h1
            className="text-2xl md:text-3xl text-primary font-bold leading-relaxed"
            style={{ fontFamily: "var(--font-retro)" }}
          >
            {CONFIG.yesMessage}
          </h1>
          <p className="text-xl md:text-2xl text-foreground">{CONFIG.yesSubMessage}</p>
          <div className="pt-4 flex justify-center gap-2 text-3xl">
            {["💐", "🌹", "💌", "🍫", "🧸"].map((e, i) => (
              <span key={i} className="animate-sparkle" style={{ animationDelay: `${i * 0.3}s` }}>
                {e}
              </span>
            ))}
          </div>
          <p className="text-muted-foreground text-lg italic pt-4">— {CONFIG.fromName}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background relative overflow-hidden px-4">
      <FloatingHearts />
      <div className="relative z-10 text-center space-y-8 max-w-lg">
        <span className="text-6xl md:text-7xl block animate-pulse-heart">💘</span>
        <h1
          className="text-xl md:text-2xl text-primary leading-relaxed"
          style={{ fontFamily: "var(--font-retro)", lineHeight: "2" }}
        >
          {CONFIG.question}
        </h1>
        <div className="flex gap-6 justify-center pt-4">
          <button
            onClick={() => setAccepted(true)}
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground text-xl md:text-2xl hover:scale-110 transition-transform cursor-pointer shadow-lg"
            style={{ fontFamily: "var(--font-retro)", fontSize: "14px" }}
          >
            Yes! 💕
          </button>
          <button
            ref={noBtnRef}
            onMouseEnter={dodgeNo}
            onTouchStart={dodgeNo}
            onClick={dodgeNo}
            className="px-8 py-4 rounded-lg bg-secondary text-secondary-foreground text-xl md:text-2xl transition-all cursor-pointer shadow-lg"
            style={{ fontFamily: "var(--font-retro)", fontSize: "14px" }}
          >
            No 💔
          </button>
        </div>
        <p className="text-muted-foreground text-sm pt-6" style={{ fontFamily: "var(--font-retro)", fontSize: "8px" }}>
          ( hint: there's only one right answer 😉 )
        </p>
      </div>
    </div>
  );
};

export default Index;
