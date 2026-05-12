import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Stethoscope,
  Cloud,
  LineChart,
  HeartPulse,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Leaf,
  Globe2,
  ShieldCheck,
  Zap,
  Star,
  PlayCircle,
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { LogoMark } from './brand/Logo';

const T = {
  en: {
    nav: { features: 'Features', how: 'How it works', pricing: 'Pricing', signin: 'Sign in', start: 'Get started' },
    hero: {
      eyebrow: 'AI-Powered Agritech for Tanzania',
      title1: 'Smarter farms,',
      title2: 'better harvests.',
      desc: 'Diagnose diseases from a photo, get hyper-local weather, pick the right crop, and track market prices — all in Swahili and English.',
      cta1: 'Start free',
      cta2: 'Live demo',
      stat1: 'Tanzanian farmers', stat1v: '12K+',
      stat2: 'Crops supported',   stat2v: '40+',
      stat3: 'Diagnoses run',     stat3v: '85K+',
    },
    features: {
      kicker: 'Everything you need',
      title: 'A complete co-pilot for your farm',
      subtitle: 'Built specifically for the realities of Tanzanian agriculture — small holdings, mixed climates, and Swahili-first workflows.',
      list: [
        { icon: Stethoscope, title: 'Disease diagnosis',     desc: 'Snap a photo of a sick leaf and get instant diagnosis with treatment plans.' },
        { icon: Leaf,        title: 'Smart crop picks',      desc: 'Recommendations tuned to your soil, season, and market demand.' },
        { icon: Cloud,       title: 'Hyper-local weather',   desc: '7-day forecasts and farming advice for your exact region.' },
        { icon: LineChart,   title: 'Live market prices',    desc: 'Track crop prices across markets and predict the best time to sell.' },
        { icon: HeartPulse,  title: 'Expert advisory',       desc: 'Step-by-step guidance from planting to harvest — anytime.' },
        { icon: Globe2,      title: 'Swahili & English',     desc: 'A bilingual experience that feels natural to every farmer.' },
      ],
    },
    how: {
      kicker: 'How it works',
      title: 'From sign-up to harvest in 3 steps',
      steps: [
        { t: 'Create your farm profile', d: 'Tell us about your location, soil, and crops in under a minute.' },
        { t: 'Get AI insights',          d: 'Receive diagnoses, weather, and recommendations tailored to you.' },
        { t: 'Grow with confidence',     d: 'Act on data-driven advice and watch your yields improve season after season.' },
      ],
    },
    cta: {
      title: 'Ready to grow smarter?',
      desc: 'Join thousands of Tanzanian farmers using Shambasmart every day.',
      btn: 'Create free account',
    },
  },
  sw: {
    nav: { features: 'Vipengele', how: 'Inavyofanya kazi', pricing: 'Bei', signin: 'Ingia', start: 'Anza sasa' },
    hero: {
      eyebrow: 'Teknolojia ya AI kwa Wakulima wa Tanzania',
      title1: 'Mashamba ya akili,',
      title2: 'mavuno bora.',
      desc: 'Tambua magonjwa kwa picha, pata hali ya hewa, chagua mazao sahihi, na fuatilia bei za soko — kwa Kiswahili na Kiingereza.',
      cta1: 'Anza bure',
      cta2: 'Onyesho',
      stat1: 'Wakulima Tanzania', stat1v: '12K+',
      stat2: 'Mazao yanayoungwa', stat2v: '40+',
      stat3: 'Utambuzi uliofanyika', stat3v: '85K+',
    },
    features: {
      kicker: 'Kila kitu unachohitaji',
      title: 'Msaidizi kamili wa shamba lako',
      subtitle: 'Imeundwa mahsusi kwa hali halisi ya kilimo Tanzania.',
      list: [
        { icon: Stethoscope, title: 'Utambuzi wa magonjwa', desc: 'Piga picha ya jani lenye ugonjwa na upate jibu papo hapo.' },
        { icon: Leaf,        title: 'Mapendekezo ya mazao', desc: 'Pendekezo lililowiana na udongo, msimu, na soko lako.' },
        { icon: Cloud,       title: 'Hali ya hewa',         desc: 'Utabiri wa siku 7 na ushauri kwa eneo lako.' },
        { icon: LineChart,   title: 'Bei za soko',          desc: 'Fuatilia bei na tabiri muda mzuri wa kuuza.' },
        { icon: HeartPulse,  title: 'Ushauri wa wataalam',  desc: 'Mwongozo kuanzia kupanda hadi kuvuna.' },
        { icon: Globe2,      title: 'Kiswahili & Kiingereza', desc: 'Hutumia lugha unayoipenda.' },
      ],
    },
    how: {
      kicker: 'Inavyofanya kazi',
      title: 'Kutoka kujisajili hadi kuvuna kwa hatua 3',
      steps: [
        { t: 'Unda wasifu wa shamba', d: 'Tueleze eneo, udongo, na mazao yako.' },
        { t: 'Pata maarifa ya AI',     d: 'Pokea utambuzi, hali ya hewa, na mapendekezo.' },
        { t: 'Kua kwa uhakika',        d: 'Tumia ushauri kuongeza mavuno msimu hadi msimu.' },
      ],
    },
    cta: {
      title: 'Tayari kukua kwa akili?',
      desc: 'Jiunge na maelfu ya wakulima Tanzania.',
      btn: 'Fungua akaunti bure',
    },
  },
};

const Landing = () => {
  const { language } = useLanguage();
  const t = T[language] || T.en;
  const { login } = useAuth();
  const navigate = useNavigate();
  const [demoLoading, setDemoLoading] = useState(false);

  const tryDemo = async () => {
    setDemoLoading(true);
    const result = await login('farmer@shambasmart.co.tz', 'farmer123');
    setDemoLoading(false);
    if (result?.success) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-white text-ink-900">
      {/* Top nav */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <LogoMark size={36} className="shadow-glow rounded-xl" />
            <div className="text-lg font-extrabold tracking-tight">
              Shamba<span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">smart</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-ink-700">
            <a href="#features" className="hover:text-brand-700 transition">{t.nav.features}</a>
            <a href="#how" className="hover:text-brand-700 transition">{t.nav.how}</a>
            <a href="#cta" className="hover:text-brand-700 transition">{t.nav.pricing}</a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link to="/login" className="btn-ghost hidden sm:inline-flex">{t.nav.signin}</Link>
            <Link to="/register" className="btn-primary">{t.nav.start}<ArrowRight className="w-4 h-4" /></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-accent-50" />
        <div className="absolute inset-0 bg-grid-faint [background-size:40px_40px] opacity-60" />
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-brand-300/30 blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-accent-200/40 blur-3xl" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <span className="chip bg-brand-100 text-brand-700">
                <Sparkles className="w-3.5 h-3.5" /> {t.hero.eyebrow}
              </span>
              <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]">
                {t.hero.title1} <br />
                <span className="bg-gradient-to-r from-brand-600 via-brand-700 to-accent-600 bg-clip-text text-transparent">
                  {t.hero.title2}
                </span>
              </h1>
              <p className="mt-6 text-lg text-ink-500 max-w-xl">{t.hero.desc}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register" className="btn-primary text-base px-6 py-3">
                  {t.hero.cta1} <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  type="button"
                  onClick={tryDemo}
                  disabled={demoLoading}
                  className="btn-outline text-base px-6 py-3"
                >
                  {demoLoading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
                      {language === 'sw' ? 'Inafungua...' : 'Loading...'}
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4" />
                      {language === 'sw' ? 'Jaribu Bila Akaunti' : 'Try Live Demo'}
                    </>
                  )}
                </button>
              </div>

              {/* Stats */}
              <div className="mt-12 grid grid-cols-3 gap-6 max-w-lg">
                {[
                  [t.hero.stat1v, t.hero.stat1],
                  [t.hero.stat2v, t.hero.stat2],
                  [t.hero.stat3v, t.hero.stat3],
                ].map(([v, l]) => (
                  <div key={l}>
                    <div className="text-2xl md:text-3xl font-extrabold text-brand-700">{v}</div>
                    <div className="text-xs text-ink-500 mt-1">{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-slide-up [animation-delay:120ms]">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 to-accent-400/20 blur-3xl rounded-full" />
              <div className="relative card shadow-card p-6 rounded-3xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-700 flex items-center justify-center">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-ink-500">Diagnosis</div>
                      <div className="font-bold">Maize Leaf Blight</div>
                    </div>
                  </div>
                  <span className="chip bg-emerald-100 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 92%
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-brand-100 to-accent-100 h-44 flex items-center justify-center relative">
                  <Leaf className="w-24 h-24 text-brand-700/40 animate-float" />
                  <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur rounded-xl px-3 py-2 flex items-center justify-between text-xs">
                    <span className="font-semibold">leaf_004.jpg</span>
                    <span className="text-brand-700 font-bold">Analyzed</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-slate-200 p-3">
                    <div className="text-[11px] text-ink-500 uppercase tracking-wider">Treatment</div>
                    <div className="text-sm font-semibold mt-0.5">Apply Mancozeb</div>
                  </div>
                  <div className="rounded-xl border border-slate-200 p-3">
                    <div className="text-[11px] text-ink-500 uppercase tracking-wider">Prevention</div>
                    <div className="text-sm font-semibold mt-0.5">Crop rotation</div>
                  </div>
                </div>
              </div>

              {/* Floating mini cards */}
              <div className="hidden md:block absolute -bottom-6 -left-8 card shadow-card p-4 w-56 animate-float">
                <div className="flex items-center gap-3">
                  <Cloud className="w-8 h-8 text-sky-500" />
                  <div>
                    <div className="text-xs text-ink-500">Arusha</div>
                    <div className="font-bold">24°C · Light rain</div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block absolute -top-6 -right-6 card shadow-card p-4 w-56 animate-float [animation-delay:1s]">
                <div className="flex items-center gap-3">
                  <LineChart className="w-8 h-8 text-emerald-600" />
                  <div>
                    <div className="text-xs text-ink-500">Maize price</div>
                    <div className="font-bold">+8.4% this week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted strip */}
      <section className="border-y border-slate-200/70 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-wrap items-center justify-center gap-8 text-ink-400">
          <span className="text-xs uppercase tracking-widest font-semibold">Trusted across regions</span>
          {['Arusha', 'Mwanza', 'Dodoma', 'Mbeya', 'Iringa', 'Tanga'].map((r) => (
            <span key={r} className="text-sm font-semibold text-ink-500">{r}</span>
          ))}
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <span className="chip bg-accent-100 text-accent-700">
            <Zap className="w-3.5 h-3.5" /> {t.features.kicker}
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">{t.features.title}</h2>
          <p className="mt-4 text-ink-500">{t.features.subtitle}</p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.features.list.map((f, i) => {
            const Icon = f.icon;
            return (
              <div key={i} className="card-hover p-7 group">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center text-white shadow-glow group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-500">{f.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-slate-50 border-y border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center max-w-2xl mx-auto">
            <span className="chip bg-brand-100 text-brand-700">
              <ShieldCheck className="w-3.5 h-3.5" /> {t.how.kicker}
            </span>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">{t.how.title}</h2>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {t.how.steps.map((s, i) => (
              <div key={i} className="card p-7 relative overflow-hidden">
                <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-brand-100/60 blur-2xl" />
                <div className="relative">
                  <div className="text-6xl font-extrabold text-brand-100">0{i + 1}</div>
                  <h3 className="mt-2 text-xl font-bold">{s.t}</h3>
                  <p className="mt-2 text-ink-500">{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="card p-10 md:p-14 relative overflow-hidden text-center">
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-accent-200/40 blur-3xl" />
          <div className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full bg-brand-200/40 blur-3xl" />
          <div className="relative">
            <div className="flex justify-center gap-1 text-amber-400 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
            </div>
            <p className="text-2xl md:text-3xl font-bold leading-snug">
              “Shambasmart told me my maize had leaf blight before I lost the whole field.
              The treatment plan saved my season.”
            </p>
            <div className="mt-6 text-sm text-ink-500">— Neema J., Maize farmer, Arusha</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto rounded-3xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 p-12 md:p-16 relative overflow-hidden text-white text-center">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
          <div className="relative">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">{t.cta.title}</h2>
            <p className="mt-4 text-white/90 max-w-xl mx-auto">{t.cta.desc}</p>
            <Link to="/register" className="mt-8 inline-flex items-center gap-2 bg-white text-brand-700 font-bold px-7 py-3.5 rounded-xl hover:bg-brand-50 transition shadow-card">
              {t.cta.btn} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/70 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-ink-500">
          <div className="flex items-center gap-2.5">
            <LogoMark size={28} />
            <span className="font-bold text-ink-900">
              Shamba<span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">smart</span>
            </span>
            <span>· © {new Date().getFullYear()}</span>
          </div>
          <div className="flex gap-6">
            <a href="#features" className="hover:text-brand-700">Features</a>
            <a href="#how" className="hover:text-brand-700">How it works</a>
            <Link to="/login" className="hover:text-brand-700">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
