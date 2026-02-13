import { useState, useCallback, useRef } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// ✏️ CUSTOMISE THESE:
const CONFIG = {
  question: "Hello, Ms. Sapna Ray. Will you be my Valentine? 💕",
  yesMessage: "Thank you for making me the happiest person in the world",
  yesSubMessage: "I love you! ❤️",
  fromName: "Yours ArryBear",
  dateTitle: "Our Next Date 💑",
  dateEventName: "Valentine's Date 💕",
};

const buildGoogleCalendarUrl = (date: Date, spot: string) => {
  const dateStr = format(date, "yyyyMMdd");
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: CONFIG.dateEventName,
    dates: `${dateStr}/${dateStr}`,
    details: "Our special Valentine's date! ❤️",
    ...(spot && { location: spot }),
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
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
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [favoriteSpot, setFavoriteSpot] = useState("");
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

          {/* Date Picker Section */}
          <div className="pt-6 space-y-4">
            <h2
              className="text-lg md:text-xl text-primary"
              style={{ fontFamily: "var(--font-retro)", fontSize: "12px" }}
            >
              {CONFIG.dateTitle}
            </h2>
            <p className="text-muted-foreground text-base">Pick a spot on the calendar for our next date!</p>
            <div className="flex justify-center">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[260px] justify-start text-left font-normal border-primary/30 hover:border-primary",
                      !selectedDate && "text-muted-foreground"
                    )}
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                    {selectedDate ? format(selectedDate, "PPP") : "Pick our date 💕"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    disabled={(date) => date < new Date()}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Favorite Spot Input */}
            <div className="flex flex-col items-center gap-2">
              <label
                className="text-primary text-sm"
                style={{ fontFamily: "var(--font-retro)", fontSize: "10px" }}
              >
                Choose your favourite spot 📍
              </label>
              <input
                type="text"
                value={favoriteSpot}
                onChange={(e) => setFavoriteSpot(e.target.value)}
                placeholder="e.g. That cute café downtown..."
                className="w-[260px] px-4 py-2 rounded-lg border border-primary/30 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-ring"
                style={{ fontFamily: "var(--font-body)" }}
              />
            </div>

            {selectedDate && (
              <div className="space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <p className="text-foreground text-lg">
                  It's a date! 🥰 <strong>{format(selectedDate, "MMMM do, yyyy")}</strong>
                  {favoriteSpot && <> at <strong>{favoriteSpot}</strong></>}
                </p>
                <a
                  href={buildGoogleCalendarUrl(selectedDate, favoriteSpot)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-lg"
                  style={{ fontFamily: "var(--font-retro)", fontSize: "10px" }}
                >
                  📅 Add to Calendar
                </a>
              </div>
            )}
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
