import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Quote, Stethoscope, LineChart, Cloud, Star } from 'lucide-react';
import LanguageSwitcher from '../LanguageSwitcher';
import { LogoMark } from '../brand/Logo';

const FEATURES = [
  { icon: Stethoscope, en: 'AI disease diagnosis from a photo', sw: 'Utambuzi wa magonjwa kwa picha' },
  { icon: Cloud,       en: 'Hyper-local weather & advice',     sw: 'Hali ya hewa na ushauri eneo lako' },
  { icon: LineChart,   en: 'Live market prices across regions', sw: 'Bei za soko za mikoa yote' },
];

// Crops with emoji + Swahili/English names — no external assets required
const CROPS = [
  { emoji: '🌽', en: 'Maize',    sw: 'Mahindi' },
  { emoji: '☕', en: 'Coffee',   sw: 'Kahawa'  },
  { emoji: '🍅', en: 'Tomato',   sw: 'Nyanya'  },
  { emoji: '🫘', en: 'Beans',    sw: 'Maharage'},
  { emoji: '🥔', en: 'Cassava',  sw: 'Muhogo'  },
  { emoji: '🌾', en: 'Rice',     sw: 'Mchele'  },
];

// Left-side hero (Tanzanian farm scene from Unsplash, with fallback)
const HERO_IMG =
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1400&q=80';
const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80';
// Right-side form background — local seedling image
const FORM_BG = '/auth-bg.jpg';

const AuthLayout = ({ children, language = 'en' }) => {
  const [imgSrc, setImgSrc] = React.useState(HERO_IMG);

  return (
    <div className="min-h-screen flex bg-white">
      {/* Visual side */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden text-white">
        {/* Background photo */}
        <img
          src={imgSrc}
          onError={() => setImgSrc(HERO_FALLBACK)}
          alt="Tanzanian farmer in the field"
          className="absolute inset-0 w-full h-full object-cover"
          loading="eager"
        />
        {/* Brand gradient overlay so text is readable + matches palette */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-900/85 via-brand-700/70 to-accent-600/55" />
        <div className="absolute inset-0 bg-grid-faint [background-size:32px_32px] opacity-15" />
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full bg-accent-300/25 blur-3xl" />

        {/* Decorative crop chips floating */}
        <div className="hidden xl:block absolute top-24 right-10 animate-float">
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-card">
            <span className="text-2xl leading-none">🌽</span>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-white/70">{language === 'sw' ? 'Bei leo' : 'Today'}</div>
              <div className="text-sm font-bold">Mahindi · 850 TZS/kg</div>
            </div>
          </div>
        </div>
        <div className="hidden xl:block absolute top-1/2 right-16 animate-float [animation-delay:1.2s]">
          <div className="bg-white/15 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-2.5 flex items-center gap-2 shadow-card">
            <span className="text-2xl leading-none">☕</span>
            <div className="text-left">
              <div className="text-[10px] uppercase tracking-wider text-white/70">Kilimanjaro</div>
              <div className="text-sm font-bold">Kahawa · +12%</div>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col h-full w-full p-12">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-3">
            <LogoMark size={44} className="shadow-glow" />
            <div className="leading-none">
              <div className="text-xl font-extrabold tracking-tight">
                Shamba<span className="bg-gradient-to-r from-accent-200 to-white bg-clip-text text-transparent">smart</span>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/70 font-bold">AgriTech · Tanzania</div>
            </div>
          </Link>

          {/* Headline + features */}
          <div className="my-auto max-w-md">
            <span className="chip bg-white/15 backdrop-blur border border-white/20 text-white">
              <MapPin className="w-3.5 h-3.5" />
              {language === 'sw' ? 'Imejengwa kwa wakulima Tanzania' : 'Built for Tanzanian farmers'}
            </span>
            <h2 className="mt-5 text-4xl xl:text-5xl font-extrabold leading-[1.05]">
              {language === 'sw' ? (
                <>Mashamba ya akili, <span className="bg-gradient-to-r from-accent-200 to-white bg-clip-text text-transparent">mavuno bora.</span></>
              ) : (
                <>Smarter farms, <span className="bg-gradient-to-r from-accent-200 to-white bg-clip-text text-transparent">better harvests.</span></>
              )}
            </h2>
            <p className="mt-4 text-white/90 text-sm leading-relaxed">
              {language === 'sw'
                ? 'Kuanzia Arusha hadi Mbeya — pata utambuzi wa magonjwa, hali ya hewa, na bei za soko zinazokufaa.'
                : 'From Arusha to Mbeya — get disease diagnosis, weather, and market prices tailored to your region.'}
            </p>

            <ul className="mt-7 space-y-2.5">
              {FEATURES.map((f) => {
                const Icon = f.icon;
                return (
                  <li key={f.en} className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-white/15 backdrop-blur flex items-center justify-center shrink-0 border border-white/15">
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-sm font-medium">{language === 'sw' ? f.sw : f.en}</span>
                  </li>
                );
              })}
            </ul>

            {/* Crop chip row */}
            <div className="mt-7">
              <div className="text-[10px] uppercase tracking-widest text-white/70 font-semibold mb-2">
                {language === 'sw' ? 'Mazao tunayotegemea' : 'Crops we support'}
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CROPS.map((c) => (
                  <span
                    key={c.en}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/12 backdrop-blur border border-white/15 text-xs font-semibold"
                  >
                    <span className="text-base leading-none">{c.emoji}</span>
                    {language === 'sw' ? c.sw : c.en}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative mt-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 p-5">
            <Quote className="absolute -top-3 left-5 w-6 h-6 text-accent-300 bg-brand-700 rounded-full p-1" />
            <div className="flex gap-1 text-amber-300 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
            </div>
            <p className="text-sm leading-relaxed italic">
              {language === 'sw'
                ? '“Shambasmart iliniambia mahindi yangu yana ugonjwa kabla sijapoteza shamba zima. Mavuno yameongezeka.”'
                : '“Shambasmart told me my maize had blight before I lost the whole field. My yield is up.”'}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 flex items-center justify-center font-bold text-brand-900 text-sm">
                NJ
              </div>
              <div className="text-xs">
                <div className="font-bold">Neema Joseph</div>
                <div className="text-white/70">{language === 'sw' ? 'Mkulima wa Mahindi · Arusha' : 'Maize farmer · Arusha'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form side */}
      <div
        className="flex-1 flex flex-col relative bg-cover bg-center"
        style={{ backgroundImage: `url(${FORM_BG})` }}
      >
        {/* Light tint only — let the seedling show through clearly */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/15 via-transparent to-emerald-900/25" />
        <div className="absolute inset-0 shadow-[inset_0_0_180px_40px_rgba(0,0,0,0.25)] pointer-events-none" />

        <div className="relative flex justify-end items-center gap-2 p-4 sm:p-6">
          <LanguageSwitcher />
        </div>
        <div className="relative flex-1 flex items-center justify-center px-4 sm:px-8 py-8">
          {/* Form card — frosted white container so text is crisp over the photo */}
          <div className="w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-xl border border-white/60 shadow-[0_20px_60px_-15px_rgba(15,23,42,0.18)] p-7 sm:p-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
