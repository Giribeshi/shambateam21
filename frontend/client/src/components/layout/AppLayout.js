import React, { useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Stethoscope,
  Sprout,
  Cloud,
  LineChart,
  HeartPulse,
  Sparkles,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Search,
  User,
  Users,
  Shield,
  Activity,
  Settings,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../LanguageSwitcher';
import { LogoMark } from '../brand/Logo';

const NAV = (t) => [
  { to: '/dashboard',        label: t.dashboard,       icon: LayoutDashboard },
  { to: '/diagnosis',        label: t.diagnosis,       icon: Stethoscope },
  { to: '/recommendations',  label: t.recommendations, icon: Sprout },
  { to: '/weather',          label: t.weather,         icon: Cloud },
  { to: '/advisory',         label: t.advisory,        icon: HeartPulse },
  { to: '/market-prices',    label: t.market,          icon: LineChart },
];

const ADMIN_NAV = (t) => [
  { to: '/admin',          label: t.adminOverview, icon: Shield },
  { to: '/admin/users',    label: t.adminUsers,    icon: Users },
  { to: '/admin/activity', label: t.adminActivity, icon: Activity },
  { to: '/admin/settings', label: t.adminSettings, icon: Settings },
];

const TRANSLATIONS = {
  en: {
    dashboard: 'Dashboard',
    diagnosis: 'Diagnose Crop',
    recommendations: 'Crop Picks',
    weather: 'Weather',
    advisory: 'Advisory',
    market: 'Market Prices',
    search: 'Search crops, diseases, advice…',
    logout: 'Sign out',
    profile: 'Profile',
    upgrade: 'Pro Tools',
    upgradeBody: 'Unlock advanced analytics and predictive insights for your farm.',
    learnMore: 'Learn more',
    adminSection: 'Administration',
    adminOverview: 'Overview',
    adminUsers: 'Users',
    adminActivity: 'Activity',
    adminSettings: 'Settings',
  },
  sw: {
    dashboard: 'Dashibodi',
    diagnosis: 'Tambua Mmea',
    recommendations: 'Mapendekezo',
    weather: 'Hali ya Hewa',
    advisory: 'Ushauri',
    market: 'Bei za Soko',
    search: 'Tafuta mazao, magonjwa, ushauri…',
    logout: 'Toka',
    profile: 'Wasifu',
    upgrade: 'Zana za Kitaalam',
    upgradeBody: 'Pata uchanganuzi wa hali ya juu na utabiri wa shamba lako.',
    learnMore: 'Jifunze zaidi',
    adminSection: 'Usimamizi',
    adminOverview: 'Muhtasari',
    adminUsers: 'Watumiaji',
    adminActivity: 'Shughuli',
    adminSettings: 'Mipangilio',
  },
};

const Sidebar = ({ open, onClose, t, items, adminItems = [] }) => {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-sm transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-72 shrink-0 bg-white border-r border-slate-200/70
                    flex flex-col transform transition-transform duration-300
                    ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-6 h-20 border-b border-slate-200/70">
          <Link to="/dashboard" className="flex items-center gap-3">
            <LogoMark size={40} className="shadow-glow rounded-2xl" />
            <div className="leading-none">
              <div className="text-lg font-extrabold tracking-tight text-ink-900">
                Shamba<span className="bg-gradient-to-r from-brand-600 to-accent-500 bg-clip-text text-transparent">smart</span>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.18em] text-brand-700 font-bold">AgriTech OS</div>
            </div>
          </Link>
          <button onClick={onClose} className="lg:hidden p-2 text-ink-500 hover:text-ink-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
          <div className="px-3 mb-2 text-[11px] uppercase tracking-widest font-bold text-ink-400">
            {t === TRANSLATIONS.en ? 'Workspace' : 'Eneo Kazi'}
          </div>
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                onClick={onClose}
                className={({ isActive }) =>
                  `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                  ${isActive
                    ? 'bg-gradient-to-r from-brand-600 to-brand-700 text-white shadow-glow'
                    : 'text-ink-700 hover:bg-slate-100 hover:text-ink-900'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors
                      ${isActive ? 'bg-white/20' : 'bg-slate-100 group-hover:bg-white'}`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-brand-700'}`} />
                    </span>
                    <span>{item.label}</span>
                  </>
                )}
              </NavLink>
            );
          })}

          {adminItems.length > 0 && (
            <>
              <div className="px-3 mt-6 mb-2 text-[11px] uppercase tracking-widest font-bold text-amber-600 flex items-center gap-1.5">
                <Shield className="w-3 h-3" /> {t.adminSection}
              </div>
              {adminItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === '/admin'}
                    onClick={onClose}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all
                      ${isActive
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-soft'
                        : 'text-ink-700 hover:bg-amber-50 hover:text-amber-700'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`w-9 h-9 rounded-lg flex items-center justify-center
                          ${isActive ? 'bg-white/20' : 'bg-amber-50 group-hover:bg-white'}`}>
                          <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-amber-600'}`} />
                        </span>
                        <span>{item.label}</span>
                      </>
                    )}
                  </NavLink>
                );
              })}
            </>
          )}
        </nav>

        {/* Upgrade card */}
        <div className="m-4 p-5 rounded-2xl bg-gradient-to-br from-brand-700 via-brand-600 to-accent-500 text-white relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          <Sparkles className="w-6 h-6 mb-2" />
          <div className="font-bold">{t.upgrade}</div>
          <p className="text-xs text-white/90 mt-1 mb-3">{t.upgradeBody}</p>
          <button className="text-xs font-semibold bg-white text-brand-700 px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-colors">
            {t.learnMore}
          </button>
        </div>
      </aside>
    </>
  );
};

const Topbar = ({ onMenu, t }) => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const initials = (user?.name || 'U')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200/70">
      <div className="flex items-center gap-4 h-16 px-4 sm:px-6 lg:px-8">
        <button onClick={onMenu} className="lg:hidden p-2 text-ink-700 hover:bg-slate-100 rounded-lg">
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="relative flex-1 max-w-xl hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <input
            type="text"
            placeholder={t.search}
            className="w-full pl-10 pr-4 py-2 bg-slate-100 border border-transparent rounded-xl text-sm
                       focus:outline-none focus:ring-2 focus:ring-brand-500 focus:bg-white focus:border-slate-200 transition"
          />
        </div>

        <div className="flex-1 sm:flex-none" />

        <LanguageSwitcher />

        <button className="relative p-2 text-ink-700 hover:bg-slate-100 rounded-lg">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
        </button>

        {/* User dropdown */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((s) => !s)}
            className="flex items-center gap-2 p-1 pr-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white font-bold flex items-center justify-center text-sm">
              {initials}
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-semibold text-ink-900 leading-tight">{user?.name || 'User'}</div>
              <div className="text-[11px] text-ink-500 leading-tight">{user?.role || 'Farmer'}</div>
            </div>
            <ChevronDown className="w-4 h-4 text-ink-500 hidden md:block" />
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-card overflow-hidden animate-fade-in"
              onMouseLeave={() => setMenuOpen(false)}
            >
              <div className="px-4 py-3 border-b border-slate-100">
                <div className="text-sm font-semibold text-ink-900">{user?.name}</div>
                <div className="text-xs text-ink-500 truncate">{user?.email}</div>
              </div>
              <button
                onClick={() => { setMenuOpen(false); navigate('/dashboard'); }}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-ink-700 hover:bg-slate-50"
              >
                <User className="w-4 h-4" /> {t.profile}
              </button>
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50"
              >
                <LogOut className="w-4 h-4" /> {t.logout}
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const AppLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const { language } = useLanguage();
  const { isAdmin } = useAuth();
  const t = TRANSLATIONS[language] || TRANSLATIONS.en;
  const items = NAV(t);
  const adminItems = isAdmin ? ADMIN_NAV(t) : [];
  const location = useLocation();

  // Close sidebar on route change (mobile)
  React.useEffect(() => { setOpen(false); }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={open} onClose={() => setOpen(false)} t={t} items={items} adminItems={adminItems} />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onMenu={() => setOpen(true)} t={t} />
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
          <div className="mx-auto max-w-7xl animate-fade-in">{children}</div>
        </main>
        <footer className="px-6 lg:px-8 py-6 text-xs text-ink-400 text-center border-t border-slate-200/60">
          © {new Date().getFullYear()} Shambasmart · Built for Tanzanian farmers
        </footer>
      </div>
    </div>
  );
};

export default AppLayout;
