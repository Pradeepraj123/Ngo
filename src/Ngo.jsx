import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Menu, X, Heart, GraduationCap, Utensils, Stethoscope, Leaf, Users,
  Building2, Handshake, Share2, Phone, Mail, MapPin,
  Star, ChevronLeft, ChevronRight, ArrowRight,
  FileText, MessageCircle, Sunrise, ShieldCheck,
  Plus, Minus, Calendar, Sparkles, Clock, BookOpen, Droplets, Award,
  Flame, Lock, AlertTriangle, Quote, User,
} from "lucide-react";

/* ---------------------------------------------------------- */
/*  Social icons — lucide-react dropped trademarked brand      */
/*  marks, so these are small inline SVGs in the same style.   */
/* ---------------------------------------------------------- */
const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

function Facebook(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M14 9V6.5a1.5 1.5 0 0 1 1.5-1.5H17V2h-2.5A4.5 4.5 0 0 0 10 6.5V9H7v3h3v10h4V12h3.2l.8-3H14Z" />
    </svg>
  );
}
function Instagram(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function Twitter(props) {
  return (
    <svg {...iconProps} {...props}>
      <path d="M4 4l7.5 9.5L4.5 20H7l5.2-5.8L16.5 20H20l-8-10.2L19 4h-2.5l-4.8 5.3L8 4H4Z" />
    </svg>
  );
}
function Linkedin(props) {
  return (
    <svg {...iconProps} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8" cy="8.5" r="0.5" fill="currentColor" stroke="none" />
      <path d="M7.5 11v6M12 17v-3.5a2 2 0 0 1 4 0V17M12 13.5v0" />
    </svg>
  );
}

/* ---------------------------------------------------------- */
/*  Scroll-reveal wrapper                                      */
/* ---------------------------------------------------------- */
function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-500 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------- */
/*  Animated counter                                           */
/* ---------------------------------------------------------- */
function useCountUp(end, duration = 1600) {
  const ref = useRef(null);
  const started = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(end);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [end, duration]);

  return [ref, count];
}

/* ---------------------------------------------------------- */
/*  Static content                                              */
/* ---------------------------------------------------------- */
const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About Us", id: "about" },
  { label: "Our Work", id: "work" },
  { label: "Gallery", id: "gallery" },
  { label: "FAQ", id: "faq" },
  { label: "Leadership", id: "leadership" },
];

const FOCUS_AREAS = [
  { icon: GraduationCap, title: "Education", text: "Scholarships, school kits and learning centres for children who'd otherwise be left behind." },
  { icon: Utensils, title: "Food Support", text: "Daily nutrition programs and emergency food relief for vulnerable families." },
  { icon: Stethoscope, title: "Healthcare", text: "Free medical camps, maternal care and health awareness in underserved areas." },
  { icon: Leaf, title: "Environment", text: "Tree plantation drives, clean-water projects and sustainable livelihoods." },
  { icon: Users, title: "Women Empowerment", text: "Skill training and micro-enterprise support to help women build independence." },
  { icon: Building2, title: "Community Development", text: "Building shared infrastructure that helps entire villages move forward together." },
];

const STATS = [
  { end: 100, suffix: "+", label: "Lives Impacted" },
  { end: 80, suffix: "+", label: "Volunteers" },
  { end: 100, suffix: "+", label: "Communities Reached" },
  { end: 50, suffix: "+", label: "Successful Campaigns" },
];

const GALLERY = [
  { img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=600&q=80", label: "Education Programs" },
  { img: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?auto=format&fit=crop&w=600&q=80", label: "Food Distribution" },
  { img: "https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=600&q=80", label: "Medical Camps" },
  { img: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80", label: "Environmental Drives" },
  { img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=600&q=80", label: "Community Events" },
  { img: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=600&q=80", label: "Volunteer Meetups" },
];

const HELP_CARDS = [
  { icon: Heart, title: "Donate", text: "Every rupee goes directly toward programs on the ground.", cta: "Donate Now", target: "donation" },
  { icon: Handshake, title: "Volunteer", text: "Give your time and skills to a cause that needs you.", cta: "Join Us", target: "contact" },
  { icon: Building2, title: "Partner With Us", text: "Corporates and institutions can co-create lasting impact.", cta: "Partner Up", target: "contact" },
];

const TESTIMONIALS = [
  { name: "PrabhaKaran M", role: "Monthly Donor", stars: 5, text: "I can see exactly where my donation goes every quarter. That transparency is rare and it's why I keep giving." },
  { name: "Sarathkumar S", role: "Volunteer, 2 years", stars: 5, text: "The team treats volunteers like partners, not extra hands. I've learned as much as I've given." },
  { name: "Kalishwaran", role: "Volunteer, 1 years", stars: 5, text: "They didn't just help me once. They stayed until I could stand on my own." },
];

const TEAM = [
  { name: "Prabhakaran M", role: "Founder", img: "/founder (1).jpg", bio: "Founded United India Foundation with a vision to uplift communities through education, healthcare and livelihood support." },
  { name: "Sarathkumar S", role: "Volunteer Coordinator", photoComingSoon: true, bio: "Coordinates volunteer onboarding and keeps every campaign staffed and ready." },
  { name: "Kumareshan", role: "Volunteer Coordinator", photoComingSoon: true, bio: "Works closely with local communities to organise and support our volunteer teams." },
  { comingSoon: true },
];

const DOCS = [
  { label: "NGO Registration Certificate", icon: FileText },
  { label: "80G Tax Exemption Certificate", icon: ShieldCheck },
  { label: "12A Registration Certificate", icon: ShieldCheck },
  { label: "Annual Report 2025\u201326", icon: FileText },
  { label: "Audited Financial Statement", icon: FileText },
  { label: "Partner Organisations List", icon: Handshake },
];

const TICKER_UPDATES = [
  "\u{1F4DA} 42 school kits delivered in Nallur this week",
  "\u{1F4A7} Borewell #12 now live \u2014 300 households served",
  "\u{1F469}\u200D\u2695\uFE0F Free medical camp treated 210 patients in ",
  "\u{1F331} 1,200 saplings planted with the Green Madurai drive",
  "\u{1F9F5} 18 women graduated the tailoring cohort this month",
  "\u2764\uFE0F 96% of every rupee donated goes straight to programmes",
];

const IMPACT_UNITS = [
  { amount: 250, icon: BookOpen, text: "Provides a full set of notebooks & stationery for one child for a term." },
  { amount: 500, icon: Utensils, text: "Feeds a family of four with nutritious meals for a full week." },
  { amount: 1200, icon: Stethoscope, text: "Covers basic medicines and check-ups for 5 patients at a health camp." },
  { amount: 2500, icon: Droplets, text: "Funds a month of clean-water filtration upkeep for a village." },
  { amount: 5000, icon: GraduationCap, text: "Sponsors one child's school fees, books and uniform for a year." },
];

const PARTNERS = [
  "TVS Foundation", "Aravind Eye Care", "Madurai Rotary Club", "Sundaram Trust",
  "GreenLeaf CSR", "Tamil Nadu Health Mission", "Local Seva Trust", "BrightPath Corp",
];

const FAQS = [
  { q: "Is my donation tax-deductible?", a: "Yes. United India Foundation is registered under Section 80G, so donations made within India are eligible for tax exemption. You'll receive an official receipt by email within 24 hours." },
  { q: "How much of my donation reaches the ground?", a: "96 paise of every rupee goes directly to programmes. The remaining covers essential admin and compliance costs, both of which are detailed in our audited annual report." },
  { q: "Can I choose which programme my donation supports?", a: "Absolutely. You can direct your contribution to a specific active campaign, or to a focus area such as Education or Healthcare, during checkout or by writing to us directly." },
  { q: "How can I volunteer if I don't live in Madurai?", a: "Many of our roles \u2014 content, design, mentoring and fundraising support \u2014 can be done remotely. Field roles are based in and around Madurai, and Theni." },
  { q: "Do you accept in-kind donations like books or clothes?", a: "Yes, we regularly accept school supplies, clothing and non-perishable food. Reach out on WhatsApp or email before dropping items so we can route them to the right programme." },
];

const money = (n) => "\u20b9" + n.toLocaleString("en-IN");

/* ---------------------------------------------------------- */
/*  Donation account details \u2014 REPLACE with United India Foundation's   */
/*  real bank/UPI/registration numbers before publishing.      */
/* ---------------------------------------------------------- */
const BANK_DETAILS = [
  { label: "Account Name", value: "United India Foundation" },
  { label: "Bank Name", value: "CITY UNION BANK" },
  { label: "Account Number", value: "510909010303907" },
  { label: "IFSC Code", value: "CIUB0000681" },
  { label: "Branch", value: "ANDIPATTI" },
  { label: "UPI ID", value: "unitedindiafoundation@upi" },
];

const REGISTRATION_DETAILS = [
  { label: "PAN No", value: "AABTU4573D" },
  { label: "12A", value: "Registered" },
  { label: "18G", value: "Registered" },
  { label: "NGO DARPAN", value: "Registered" },
  { label: "CSR", value: "Registered" },
];

/* ---------------------------------------------------------- */
/*  "My Idol" tribute content                                  */
/* ---------------------------------------------------------- */
// Embedded directly so the image always renders, no extra file needed.
const IDOL_IMG =
  "data:image/jpeg;base64,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";

const IDOL_POINTS = [
  {
    icon: GraduationCap,
    title: "சாதாரண குடும்பப் பின்னணியிலிருந்து IAS",
    text: "பெரிய வசதி இல்லாத குடும்பத்தில் பிறந்து, கடின உழைப்பால் IAS ஆனது itself ஒரு inspiration. \u201cபின்னணி முக்கியமில்லை, முயற்சி முக்கியம்\u201dனு காட்டினவர்.",
  },
  {
    icon: Lock,
    title: "நேர்மைக்காக தனி பெயர் \ud83d\udd25",
    text: "பதவியில் இருந்தபோது அரசியல் அழுத்தம், அதிகார அழுத்தம் இருந்தாலும், தன்னுடைய நேர்மையை compromise பண்ணாதவர் என்ற image அவருக்கு உருவானது.",
  },
  {
    icon: AlertTriangle,
    title: "மணல் கொள்ளைக்கு எதிராக எடுத்த நடவடிக்கைகள்",
    text: "Madurai Collector-ஆ இருந்த காலத்தில் illegal sand mining-க்கு எதிராக மிகவும் strict-ஆ நடவடிக்கை எடுத்தது அவருடைய career-ல famous moments-ல ஒன்று.",
  },
  {
    icon: ShieldCheck,
    title: "\u201cநான் லஞ்சம் வாங்க மாட்டேன்\u201d என்ற attitude",
    text: "தன்னுடைய அலுவலகத்தில் கூட \u201cலஞ்சம் வாங்குவதில்லை\u201d என்ற message-ஐ openly வைத்திருந்தது அவருடைய character-ஐ காட்டும் ஒரு powerful example. \ud83d\udcaf",
  },
  {
    icon: Flame,
    title: "IAS பதவியை விட principles முக்கியம்",
    text: "Transfer, pressure, criticism எதுவாக இருந்தாலும், தன்னுடைய principles-ஐ விட்டுக்கொடுக்காமல் செயல்பட்டவர் என்ற reputation அவருக்கு கிடைத்தது.",
  },
];

/* ---------------------------------------------------------- */
/*  Small building blocks                                      */
/* ---------------------------------------------------------- */
function SectionEyebrow({ children }) {
  return (
    <span className="inline-block text-sky-600 text-sm font-semibold tracking-wide uppercase bg-sky-50 border border-sky-100 rounded-full px-4 py-1">
      {children}
    </span>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={`btn-shimmer relative overflow-hidden inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function GhostButton({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 bg-white hover:bg-sky-50 text-sky-700 font-semibold px-6 py-3 rounded-full border-2 border-sky-400 transition-all duration-300 hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function FaqItem({ item, open, onToggle }) {
  return (
    <div className="border border-sky-100 rounded-2xl bg-white overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 text-left px-6 py-5"
      >
        <span className="font-display font-semibold text-slate-900">{item.q}</span>
        <span
          className={`shrink-0 w-8 h-8 rounded-full bg-sky-50 flex items-center justify-center text-sky-600 transition-transform duration-300 ${
            open ? "rotate-180 bg-sky-500 text-white" : ""
          }`}
        >
          {open ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </span>
      </button>
      <div
        className="grid transition-all duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-5 text-sm text-slate-700 leading-relaxed">{item.a}</p>
        </div>
      </div>
    </div>
  );
}

function Marquee({ items, className = "" }) {
  const loop = [...items, ...items];
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10" />
      <div className="flex w-max animate-marquee">
        {loop.map((it, i) => (
          <span key={i} className="mx-8 flex items-center gap-2 text-slate-400 font-display font-semibold text-lg whitespace-nowrap">
            <Award className="w-4 h-4 text-sky-300" /> {it}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------- */
/*  Main component                                              */
/* ---------------------------------------------------------- */
export default function UnitedIndiaFoundationLanding() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showStickyDonate, setShowStickyDonate] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [donateAmount, setDonateAmount] = useState(1200);
  const [openFaq, setOpenFaq] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setShowStickyDonate(window.scrollY > 500);
      const h = document.documentElement;
      const scrolled = h.scrollTop;
      const max = h.scrollHeight - h.clientHeight;
      setScrollPct(max > 0 ? (scrolled / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const impactMatch = useMemo(() => {
    let best = IMPACT_UNITS[0];
    for (const u of IMPACT_UNITS) if (donateAmount >= u.amount) best = u;
    return best;
  }, [donateAmount]);

  const scrollTo = useCallback((id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <div className="font-['Inter',sans-serif] text-slate-800 bg-white scroll-smooth [scroll-behavior:smooth]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap');
        h1, h2, h3, .font-display { font-family: 'Sora', sans-serif; }
        body { font-family: 'Inter', sans-serif; }

        /* Override Vite's default index.css (#root max-width/padding + dark body)
           so this component always spans the full viewport width. */
        html, body {
          margin: 0;
          padding: 0;
          width: 100%;
          background: #ffffff;
        }
        #root {
          max-width: none !important;
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          text-align: left !important;
        }

        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(20px, -25px) scale(1.08); }
          66% { transform: translate(-15px, 15px) scale(0.95); }
        }
        .animate-blob { animation: blobFloat 12s ease-in-out infinite; }
        .animate-blob-slow { animation: blobFloat 18s ease-in-out infinite reverse; }

        @keyframes floatY {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-14px); }
        }
        .animate-float { animation: floatY 4s ease-in-out infinite; }
        .animate-float-delay { animation: floatY 4s ease-in-out infinite; animation-delay: 1.2s; }

        @keyframes marqueeScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marqueeScroll 26s linear infinite; }

        @keyframes shimmerSweep {
          0% { transform: translateX(-120%) skewX(-15deg); }
          100% { transform: translateX(220%) skewX(-15deg); }
        }
        .btn-shimmer::after {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.55), transparent);
          animation: shimmerSweep 3.2s ease-in-out infinite;
        }

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-slide { animation: fadeSlideIn 0.5s ease-out; }

        @keyframes ringPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(251,191,36,0.55), 0 0 0 14px rgba(251,191,36,0); }
          50% { box-shadow: 0 0 0 6px rgba(251,191,36,0.25), 0 0 0 22px rgba(251,191,36,0.06); }
        }
        .animate-ring-pulse { animation: ringPulse 3s ease-in-out infinite; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.7) rotate(0deg); }
          50% { opacity: 1; transform: scale(1.15) rotate(20deg); }
        }
        .animate-twinkle { animation: twinkle 2.6s ease-in-out infinite; }

        @keyframes underlineSweep {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-underline { animation: underlineSweep 1.2s ease-out 0.3s forwards; width: 0%; }

        @media (prefers-reduced-motion: reduce) {
          .animate-blob, .animate-blob-slow, .animate-float, .animate-float-delay, .animate-marquee, .btn-shimmer::after,
          .animate-ring-pulse, .animate-twinkle, .animate-underline {
            animation: none !important;
          }
        }
      `}</style>

      {/* ---------------- SCROLL PROGRESS ---------------- */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[60] bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-sky-400 via-sky-500 to-sky-600 transition-[width] duration-150 ease-out"
          style={{ width: `${scrollPct}%` }}
        />
      </div>

      {/* ---------------- NAVBAR ---------------- */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-sm">
        <div className="w-full mx-auto px-[clamp(1.25rem,0.9rem+2vw,2.5rem)] flex items-center justify-between h-24 md:h-28">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-1">
            <img src="/uif-icon-transparent.png" alt="United India Foundation logo" className="w-20 h-20 md:w-24 md:h-24 object-contain shrink-0" />
            <span className="font-display font-bold text-lg md:text-xl text-slate-900">United India Foundation</span>
          </button>

          <nav className="hidden lg:flex items-center gap-5 ml-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="hidden lg:block ml-8">
            <PrimaryButton onClick={() => scrollTo("donation")} className="!px-5 !py-2.5 text-sm">
              <Heart className="w-4 h-4" /> Donate Now
            </PrimaryButton>
          </div>

          <button className="lg:hidden text-slate-700" onClick={() => setMenuOpen((o) => !o)} aria-label="Toggle menu">
            {menuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
          </button>
        </div>

        {menuOpen && (
          <div className="lg:hidden bg-white border-t border-sky-100 px-5 py-4 flex flex-col gap-4 shadow-lg">
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left text-slate-700 font-medium py-1"
              >
                {l.label}
              </button>
            ))}
            <PrimaryButton onClick={() => scrollTo("donation")} className="w-full">
              <Heart className="w-4 h-4" /> Donate Now
            </PrimaryButton>
          </div>
        )}
      </header>

      {/* ---------------- HERO ---------------- */}
      <section id="home" className="relative pt-24 md:pt-28 overflow-hidden">
        <div className="relative h-[clamp(420px,72vh,680px)] w-full">
          <img
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1600&q=80"
            alt="Volunteers helping children in a community program"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/70 to-sky-200/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/55 to-transparent" />

          {/* ambient animated blobs */}
          <div className="absolute top-10 right-[8%] w-56 h-56 rounded-full bg-sky-300/40 blur-3xl animate-blob pointer-events-none" />
          <div className="absolute bottom-16 right-[22%] w-40 h-40 rounded-full bg-amber-200/40 blur-3xl animate-blob-slow pointer-events-none" />

          {/* floating stat badges */}
          <div className="hidden lg:flex flex-col gap-4 absolute right-[6%] top-[18%]">
            <div className="animate-float bg-white/95 backdrop-blur border border-sky-100 rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-sky-500 flex items-center justify-center shrink-0">
                <Heart className="w-4 h-4 text-white" />
              </span>
              <div>
                <p className="font-display font-bold text-slate-900 text-sm leading-none">100+</p>
                <p className="text-xs text-slate-800 font-semibold mt-1">Lives touched</p>
              </div>
            </div>
            <div className="animate-float-delay bg-white/95 backdrop-blur border border-sky-100 rounded-2xl shadow-lg px-5 py-3 flex items-center gap-3 ml-8">
              <span className="w-9 h-9 rounded-xl bg-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-white" />
              </span>
              <div>
                <p className="font-display font-bold text-slate-900 text-sm leading-none">80G &amp; 12A</p>
                <p className="text-xs text-slate-800 font-semibold mt-1">Certified NGO</p>
              </div>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto h-full px-[clamp(1.25rem,0.9rem+2vw,2rem)] flex items-center">
            <div className="max-w-2xl bg-white/85 backdrop-blur-sm rounded-3xl p-6 sm:p-8 shadow-xl">
              <span className="inline-flex items-center gap-2 bg-white border border-sky-200 text-sky-700 text-sm font-semibold px-4 py-1.5 rounded-full shadow-md mb-6">
                <Sunrise className="w-4 h-4" /> A new India, community by community
              </span>
              <h1
                className="font-display font-extrabold text-[clamp(2.25rem,1.4rem+4.2vw,3.75rem)] leading-tight mb-5"
                style={{ color: "#000000", fontWeight: 800 }}
              >
                Together, We Can<br />Make a Difference
              </h1>
              <p
                className="text-base sm:text-lg mb-8 max-w-xl font-semibold"
                style={{ color: "#1e293b" }}
              >
                United India Foundation partners with underserved communities across education,
                healthcare, food security and livelihoods &mdash; so that every family gets
                a real chance at a better tomorrow.
              </p>
              <div className="flex flex-wrap gap-4">
                <PrimaryButton onClick={() => scrollTo("donation")}>
                  <Heart className="w-4 h-4" /> Donate Now
                </PrimaryButton>
                <GhostButton onClick={() => scrollTo("help")}>
                  Become a Volunteer <ArrowRight className="w-4 h-4" />
                </GhostButton>
              </div>
            </div>
          </div>

          {/* signature horizon arc */}
          <svg
            className="absolute -bottom-1 left-0 w-full text-white"
            viewBox="0 0 1440 90"
            preserveAspectRatio="none"
            fill="currentColor"
          >
            <path d="M0,64 C320,120 1120,0 1440,56 L1440,100 L0,100 Z" />
          </svg>
        </div>

        {/* live impact ticker */}
        <div className="bg-white border-b border-sky-100 py-3">
          <Marquee items={TICKER_UPDATES} />
        </div>
      </section>

      {/* ---------------- ABOUT ---------------- */}
      <section id="about" className="py-[clamp(2rem,1.5rem+2.5vw,4.5rem)] px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-white">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center">
          <Reveal>
            <div className="relative">
              <img
                src="/grasswork.png"
                alt="Community volunteers working together"
                className="rounded-3xl shadow-xl w-full h-[clamp(300px,38vw,420px)] object-cover"
              />
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-lg border border-sky-100 px-6 py-4 hidden sm:block">
                <p className="text-2xl font-bold text-sky-600 font-display">2 yrs</p>
                <p className="text-sm text-slate-600">of grassroots work</p>
              </div>
            </div>
          </Reveal>

          <div>
            <SectionEyebrow>About Us</SectionEyebrow>
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-black mt-20 mb-5" style={{ color: "#000000", fontWeight: 800 }}>
              Building a brighter dawn, one community at a time
            </h2>
            <p className="text-slate-700 mb-4 leading-relaxed">
              Founded in 2024, United India Foundation.
            </p>
            <p className="text-slate-700 mb-8 leading-relaxed">
              Every programme we run is designed with the community, staffed by local
              volunteers, and measured openly so our supporters always know their impact.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl bg-sky-500 flex items-center justify-center mb-3">
                  <Sunrise className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-semibold text-slate-900 mb-1.5">Our Mission</h3>
                <p className="text-sm text-slate-700">
                  To empower underserved communities with education, healthcare and
                  livelihood support that lasts beyond our involvement.
                </p>
              </div>
              <div className="bg-sky-50 border border-sky-100 rounded-2xl p-6">
                <div className="w-11 h-11 rounded-xl bg-sky-500 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-display font-semibold text-slate-900 mb-1.5">Our Vision</h3>
                <p className="text-sm text-slate-700">
                  A future where every family, regardless of geography, has equal
                  opportunity to learn, earn and live with dignity.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- FOCUS AREAS ---------------- */}
      <section id="work" className="py-[clamp(2rem,1.5rem+2.5vw,4.5rem)] px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionEyebrow>Our Focus Areas</SectionEyebrow>
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-black mt-20" style={{ color: "#000000", fontWeight: 800 }}>
              Six ways we help communities rise
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FOCUS_AREAS.map((f, i) => (
              <Reveal key={f.title} delay={i * 80}>
                <div className="group bg-white border border-sky-100 rounded-2xl p-7 h-full shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-sky-300 transition-all duration-300">
                  <div className="w-13 h-13 w-[52px] h-[52px] rounded-2xl bg-sky-50 group-hover:bg-sky-500 flex items-center justify-center mb-5 transition-colors duration-300">
                    <f.icon className="w-6 h-6 text-sky-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">{f.title}</h3>
                  <p className="text-sm text-slate-700 leading-relaxed">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- IMPACT STATS ---------------- */}
      <section id="impact" className="py-12 md:py-16 px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-sky-500 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-sky-400/40 blur-2xl" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-sky-400/40 blur-2xl" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-10">
            <span className="inline-block text-sm font-semibold tracking-wide uppercase bg-white/15 text-white rounded-full px-4 py-1">
              Our Impact
            </span>
            <h2 className="font-display font-bold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-white mt-20">
              Numbers that keep us going
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {STATS.map((s) => {
              const [ref, count] = useCountUp(s.end);
              return (
                <div
                  key={s.label}
                  ref={ref}
                  className="bg-white rounded-2xl shadow-lg p-6 md:p-8 text-center"
                >
                  <p className="font-display font-extrabold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-sky-600">
                    {count.toLocaleString("en-IN")}{s.suffix}
                  </p>
                  <p className="text-slate-600 text-sm font-medium mt-2">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------- PARTNERS ---------------- */}
      <section className="py-10 px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-white border-b border-sky-50">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs font-semibold tracking-wide uppercase text-slate-400 mb-6">
            Trusted &amp; supported by
          </p>
          <Marquee items={PARTNERS} />
        </div>
      </section>

      {/* ---------------- DONATION IMPACT CALCULATOR ---------------- */}
      <section className="py-[clamp(2rem,1.5rem+2.5vw,4.5rem)] px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <SectionEyebrow>See Your Impact</SectionEyebrow>
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-black mt-20" style={{ color: "#000000", fontWeight: 800 }}>
              Slide it. See exactly what it does.
            </h2>
            <p className="text-slate-700 mt-3">
              Every contribution is tracked to a real outcome &mdash; drag the slider to see what your donation could fund.
            </p>
          </div>

          <Reveal>
            <div className="bg-white border border-sky-100 rounded-3xl shadow-lg p-7 md:p-10">
              <div className="flex items-end justify-between mb-2">
                <span className="text-sm font-semibold text-slate-800">Your donation</span>
                <span className="font-display font-extrabold text-3xl text-sky-600">{money(donateAmount)}</span>
              </div>
              <input
                type="range"
                min={100}
                max={5000}
                step={50}
                value={donateAmount}
                onChange={(e) => setDonateAmount(Number(e.target.value))}
                className="w-full h-2.5 rounded-full appearance-none cursor-pointer accent-sky-500 bg-sky-100"
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2 mb-8">
                <span>{money(100)}</span>
                <span>{money(5000)}</span>
              </div>

              <div key={impactMatch.amount} className="animate-fade-slide flex flex-col sm:flex-row items-center gap-5 bg-sky-50 border border-sky-100 rounded-2xl p-6">
                <span className="w-14 h-14 rounded-2xl bg-sky-500 flex items-center justify-center shrink-0">
                  <impactMatch.icon className="w-6 h-6 text-white" />
                </span>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-center sm:text-left">
                  {impactMatch.text}
                </p>
              </div>

              <div className="text-center mt-8">
                <PrimaryButton onClick={() => scrollTo("donation")}>
                  <Heart className="w-4 h-4" /> Donate {money(donateAmount)} Now
                </PrimaryButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- DONATION DETAILS ---------------- */}
      <section id="donation" className="py-[clamp(2rem,1.5rem+2.5vw,4.5rem)] px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-sky-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionEyebrow>Donation</SectionEyebrow>
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-black mt-20" style={{ color: "#000000", fontWeight: 800 }}>
              Support United India Foundation
            </h2>
            <p className="text-slate-700 mt-3">
              Your support helps bring positive change and hope to communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Bank Account Details */}
            <Reveal>
              <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden h-full">
                <div className="bg-sky-600 px-6 py-4">
                  <h3 className="font-display font-bold text-white text-center tracking-wide text-sm sm:text-base">
                    BANK ACCOUNT DETAILS
                  </h3>
                </div>
                <div className="p-6 space-y-3.5">
                  {BANK_DETAILS.map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-3 border-b border-sky-50 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm font-semibold text-sky-700 shrink-0">{row.label}</span>
                      <span className="text-sm font-bold text-slate-900 text-right break-all">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Scan to Donate */}
            <Reveal delay={100}>
              <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden h-full">
                <div className="bg-sky-600 px-6 py-4">
                  <h3 className="font-display font-bold text-white text-center tracking-wide text-sm sm:text-base">
                    SCAN TO DONATE
                  </h3>
                </div>
                <div className="p-6 flex flex-col items-center justify-center gap-4">
                  <img
                    src="/qrcode.jpeg"
                    alt="Scan this QR code to donate to United India Foundation via UPI"
                    className="w-48 h-48 rounded-xl border border-sky-100 object-contain"
                  />
                  <p className="text-sm text-slate-800 font-semibold text-center">
                    UPI ID: <span className="font-bold text-slate-900">unitedindiafoundation@upi</span>
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Registration Details */}
            <Reveal delay={200}>
              <div className="bg-white rounded-2xl shadow-sm border border-sky-100 overflow-hidden h-full">
                <div className="bg-sky-600 px-6 py-4">
                  <h3 className="font-display font-bold text-white text-center tracking-wide text-sm sm:text-base">
                    REGISTRATION DETAILS
                  </h3>
                </div>
                <div className="p-6 space-y-3.5">
                  {REGISTRATION_DETAILS.map((row) => (
                    <div key={row.label} className="flex items-center justify-between gap-3 border-b border-sky-50 pb-3 last:border-0 last:pb-0">
                      <span className="text-sm font-semibold text-sky-700 shrink-0">{row.label}</span>
                      <span className="text-sm font-bold text-emerald-600 text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <p className="text-center text-xs text-slate-600 font-medium mt-8">
            Please verify the account details before making a donation.
          </p>
        </div>
      </section>

      {/* ---------------- GALLERY ---------------- */}
      <section id="gallery" className="py-[clamp(2rem,1.5rem+2.5vw,4.5rem)] px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionEyebrow>Photo Gallery</SectionEyebrow>
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-black mt-20" style={{ color: "#000000", fontWeight: 800 }}>
              Moments from the field
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {GALLERY.map((g, i) => (
              <Reveal key={g.label} delay={i * 60}>
                <div className="group relative rounded-2xl overflow-hidden shadow-sm h-56">
                  <img
                    src={g.img}
                    alt={g.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <p className="absolute bottom-4 left-4 text-white font-medium text-sm opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    {g.label}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- HOW YOU CAN HELP ---------------- */}
      <section id="help" className="py-[clamp(2rem,1.5rem+2.5vw,4.5rem)] px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-sky-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionEyebrow>How You Can Help</SectionEyebrow>
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-black mt-20" style={{ color: "#000000", fontWeight: 800 }}>
              Every kind of support matters
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {HELP_CARDS.map((h, i) => (
              <Reveal key={h.title} delay={i * 80}>
                <div className="bg-white rounded-2xl p-7 text-center shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 h-full flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-sky-500 flex items-center justify-center mb-5">
                    <h.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-slate-900 mb-2">{h.title}</h3>
                  <p className="text-sm text-slate-700 mb-6 flex-1">{h.text}</p>
                  <GhostButton className="!px-5 !py-2 text-sm" onClick={() => scrollTo(h.target)}>
                    {h.cta}
                  </GhostButton>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TESTIMONIALS ---------------- */}
      <section className="py-[clamp(2rem,1.5rem+2.5vw,4.5rem)] px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionEyebrow>Testimonials</SectionEyebrow>
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-black mt-20" style={{ color: "#000000", fontWeight: 800 }}>
              What our community says
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 90}>
                <div className="bg-white border border-sky-100 rounded-2xl p-7 shadow-sm hover:shadow-lg transition-shadow duration-300 h-full">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: t.stars }).map((_, idx) => (
                      <Star key={idx} className="w-4 h-4 fill-sky-400 text-sky-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm leading-relaxed mb-6">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-sky-100 border border-sky-200 flex items-center justify-center shrink-0">
                      <User className="w-5 h-5 text-sky-500" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{t.name}</p>
                      <p className="text-xs text-slate-600">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- TRANSPARENCY ---------------- */}
      <section className="py-[clamp(2rem,1.5rem+2.5vw,4.5rem)] px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <SectionEyebrow>Transparency &amp; Trust</SectionEyebrow>
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-black mt-20" style={{ color: "#000000", fontWeight: 800 }}>
              Open books, always
            </h2>
            <p className="text-slate-700 mt-3">
              We're a registered NGO and publish every certificate and report we hold.
            </p>
          </div>

          <Reveal>
            <div className="bg-white border border-sky-100 rounded-3xl shadow-sm p-8 md:p-10">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                {DOCS.map((d) => (
                  <div key={d.label} className="flex items-center gap-3 bg-sky-50 rounded-xl px-4 py-3.5">
                    <d.icon className="w-5 h-5 text-sky-500 shrink-0" />
                    <span className="text-sm font-medium text-slate-700">{d.label}</span>
                  </div>
                ))}
              </div>
              <div className="text-center">
                <PrimaryButton>
                  <FileText className="w-4 h-4" /> View Documents
                </PrimaryButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- TEAM ---------------- */}
      <section id="team" className="py-[clamp(2rem,1.5rem+2.5vw,4.5rem)] px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <SectionEyebrow>Our Team</SectionEyebrow>
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-black mt-20" style={{ color: "#000000", fontWeight: 800 }}>
              The people behind the work
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM.map((m, i) => (
              <Reveal key={m.name || `open-role-${i}`} delay={i * 80}>
                {m.comingSoon ? (
                  <div className="border-2 border-dashed border-sky-200 rounded-2xl h-full min-h-[19rem] flex flex-col items-center justify-center text-center p-6 bg-sky-50/50">
                    <span className="w-12 h-12 rounded-full bg-white border border-sky-200 flex items-center justify-center mb-3">
                      <Users className="w-5 h-5 text-sky-400" />
                    </span>
                    <p className="font-display font-semibold text-slate-500">Position Open</p>
                    <p className="text-sm text-slate-400 mt-1">Join our team &mdash; details coming soon.</p>
                  </div>
                ) : (
                  <div className="bg-white border border-sky-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 text-center">
                    {m.photoComingSoon ? (
                      <div className="w-full h-52 bg-sky-50/50 border-b border-dashed border-sky-200 flex flex-col items-center justify-center">
                        <span className="w-12 h-12 rounded-full bg-white border border-sky-200 flex items-center justify-center mb-2">
                          <Users className="w-5 h-5 text-sky-400" />
                        </span>
                        <p className="text-xs text-slate-400">Photo coming soon</p>
                      </div>
                    ) : (
                      <img src={m.img} alt={m.name} className="w-full h-52 object-cover object-top" />
                    )}
                    <div className="p-5">
                      <h3 className="font-display font-semibold text-slate-900">{m.name}</h3>
                      <p className="text-sky-600 text-xs font-semibold uppercase tracking-wide mt-1 mb-2">{m.role}</p>
                      <p className="text-sm text-slate-600">{m.bio}</p>
                    </div>
                  </div>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section id="faq" className="py-[clamp(2rem,1.5rem+2.5vw,4.5rem)] px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <SectionEyebrow>FAQ</SectionEyebrow>
            <h2 className="font-display font-extrabold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-black mt-20" style={{ color: "#000000", fontWeight: 800 }}>
              Questions, answered
            </h2>
          </div>

          <Reveal>
            <div className="space-y-4">
              {FAQS.map((item, i) => (
                <FaqItem
                  key={item.q}
                  item={item}
                  open={openFaq === i}
                  onToggle={() => setOpenFaq((cur) => (cur === i ? -1 : i))}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- MY IDOL / SPOTLIGHT ---------------- */}
      <section id="idol" className="relative py-[clamp(2.5rem,1.8rem+3vw,5.5rem)] px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-slate-900 overflow-hidden">
        {/* ambient glow + sparkles */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl animate-blob-slow pointer-events-none" />
        {[...Array(8)].map((_, i) => (
          <Sparkles
            key={i}
            className="animate-twinkle absolute text-amber-300/70 pointer-events-none"
            style={{
              top: `${8 + ((i * 37) % 85)}%`,
              left: `${5 + ((i * 53) % 90)}%`,
              width: 14 + (i % 3) * 6,
              height: 14 + (i % 3) * 6,
              animationDelay: `${i * 0.35}s`,
            }}
          />
        ))}

        <div className="max-w-6xl mx-auto relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-amber-300 text-sm font-semibold tracking-wide uppercase bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1.5">
              <Flame className="w-3.5 h-3.5" /> Our Inspiration
            </span>
            <h2 className="font-display font-bold text-[clamp(1.85rem,1.4rem+2.2vw,2.5rem)] text-white mt-5">
              The person behind our idea of honesty
            </h2>
          </div>

          <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-16 items-center">
            {/* photo, spotlighted */}
            <Reveal>
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-amber-400/30 via-amber-300/10 to-transparent blur-xl" />
                <div className="animate-ring-pulse relative rounded-[1.75rem] overflow-hidden border-2 border-amber-400/40">
                  <img
                    src={IDOL_IMG}
                    alt="Our idol — an honest IAS officer"
                    className="w-full h-full object-cover aspect-[4/5]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-flex items-center gap-1.5 bg-amber-400 text-slate-900 text-xs font-bold px-3 py-1.5 rounded-full">
                      <ShieldCheck className="w-3.5 h-3.5" /> Honesty &bull; Courage &bull; Simplicity
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* the five points */}
            <div className="space-y-4">
              {IDOL_POINTS.map((p, i) => (
                <Reveal key={p.title} delay={i * 110}>
                  <div className="group flex gap-4 bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-amber-400/30 rounded-2xl p-5 transition-all duration-300">
                    <span className="shrink-0 w-11 h-11 rounded-xl bg-amber-400/15 group-hover:bg-amber-400 flex items-center justify-center transition-colors duration-300">
                      <p.icon className="w-5 h-5 text-amber-300 group-hover:text-slate-900 transition-colors duration-300" />
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-white mb-1 leading-snug">{p.title}</h3>
                      <p className="text-sm text-slate-100 leading-relaxed">{p.text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* goosebumps pull-quote */}
          <Reveal delay={150}>
            <div className="mt-10 text-center max-w-3xl mx-auto">
              <Quote className="w-8 h-8 text-amber-400/60 mx-auto mb-4" />
              <p className="font-display text-[clamp(1.35rem,1.1rem+1.1vw,1.85rem)] text-white leading-snug italic">
                &ldquo;பதவி அவருக்கு power கொடுக்கவில்லை; அவருடைய character தான் அந்த பதவிக்கு power கொடுத்தது.&rdquo; <span className="not-italic">🔥</span>
              </p>
              <div className="animate-underline h-0.5 bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto mt-6 max-w-xs" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------------- CONTACT ---------------- */}
      <section id="leadership" className="py-[clamp(2rem,1.5rem+2.5vw,4.5rem)] px-[clamp(1.25rem,0.9rem+2vw,2rem)] bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <SectionEyebrow>Leadership</SectionEyebrow>
          <h2 className="font-display font-extrabold text-[clamp(1.75rem,1.35rem+2vw,2.25rem)] text-black mt-20 mb-8" style={{ color: "#000000", fontWeight: 800 }}>
            Committed leadership, community-first action.
          </h2>

          <Reveal>
            <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row items-center gap-8 text-left shadow-sm">
              <img
                src="/founder.jpg"
                alt="Prabhakaran M, Founder of United India Foundation"
                className="w-56 h-72 rounded-2xl object-cover object-top border border-sky-100 shadow-md shrink-0"
              />
              <div>
                <h3 className="font-display font-bold text-2xl text-slate-900">Prabhakaran M</h3>
                <p className="text-sky-600 text-sm font-semibold mt-1 mb-4">Founder</p>
                <p className="text-base text-slate-700 leading-relaxed">
                  With a strong belief in humanity and service, Prabhakaran M founded
                  United India Foundation with a vision to uplift communities and create
                  sustainable impact through education, healthcare, empowerment and
                  development initiatives.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>


      {/* ---------------- FOOTER ---------------- */}
      <footer id="contact" className="bg-slate-900 text-slate-300 pt-10 pb-6 px-[clamp(1.25rem,0.9rem+2vw,2rem)]">
        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/uif-icon-transparent.png" alt="United India Foundation logo" className="w-12 h-12 object-contain shrink-0" />
              <span className="font-display font-bold text-white text-lg">United India Foundation</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering underserved communities across India through education,
              healthcare, food security and livelihoods since 2024.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 font-display">Quick Links</h4>
            <ul className="space-y-2.5 text-sm">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button onClick={() => scrollTo(l.id)} className="text-slate-400 hover:text-sky-400 transition-colors">
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 font-display">Contact</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0 text-sky-400" /> Madurai, Tamil Nadu, India</li>
              <li className="flex items-center gap-2"><Phone className="w-4 h-4 shrink-0 text-sky-400" /> +91 99761 23417</li>
              <li className="flex items-center gap-2"><Mail className="w-4 h-4 shrink-0 text-sky-400" /> contact@theunitedindiafoundation.org</li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4 font-display">Follow Us</h4>
            <div className="flex gap-3">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} United India Foundation. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-sky-400">Privacy Policy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="hover:text-sky-400">Terms &amp; Conditions</a>
          </div>
        </div>
      </footer>

      {/* ---------------- FLOATING WHATSAPP ---------------- */}
      <a
        href="#"
        onClick={(e) => e.preventDefault()}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-sky-500 hover:bg-sky-600 shadow-xl flex items-center justify-center text-white transition-transform hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* ---------------- STICKY MOBILE DONATE BAR ---------------- */}
      {showStickyDonate && (
        <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white border-t border-sky-100 shadow-[0_-4px_12px_rgba(0,0,0,0.06)] px-4 py-3">
          <PrimaryButton className="w-full" onClick={() => scrollTo("donation")}>
            <Heart className="w-4 h-4" /> Donate Now
          </PrimaryButton>
        </div>
      )}
    </div>
  );
}