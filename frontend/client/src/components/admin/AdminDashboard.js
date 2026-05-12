import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Users, UserPlus, ShieldCheck, MapPin, Sprout, TrendingUp,
  AlertCircle, ArrowRight, Activity, Server,
} from 'lucide-react';
import AdminPageHeader from './AdminPageHeader';

const StatCard = ({ icon: Icon, label, value, trend, accent }) => (
  <div className="card-hover p-5">
    <div className="flex items-center justify-between">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accent}`}>
        <Icon className="w-5 h-5" />
      </div>
      {trend && <span className="text-xs font-semibold text-ink-500">{trend}</span>}
    </div>
    <div className="mt-4">
      <div className="text-3xl font-extrabold tracking-tight">{value}</div>
      <div className="text-xs text-ink-500 mt-1">{label}</div>
    </div>
  </div>
);

const BarRow = ({ label, value, max, color = 'bg-brand-600' }) => {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div>
      <div className="flex items-center justify-between text-sm mb-1">
        <span className="font-semibold capitalize">{(label || 'unknown').replace('_', ' ')}</span>
        <span className="text-ink-500">{value}</span>
      </div>
      <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
        <div className={`h-full ${color} rounded-full transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
};

const Sparkline = ({ data }) => {
  if (!data || data.length === 0) return null;
  const max = Math.max(...data.map(d => d.count), 1);
  const width = 600;
  const height = 80;
  const step = width / (data.length - 1 || 1);
  const points = data.map((d, i) => `${i * step},${height - (d.count / max) * (height - 6) - 3}`).join(' ');

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-20">
      <defs>
        <linearGradient id="sg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`0,${height} ${points} ${width},${height}`}
        fill="url(#sg)"
      />
      <polyline
        points={points}
        fill="none"
        stroke="#047857"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const [s, h] = await Promise.all([
          axios.get('/api/admin/stats'),
          axios.get('/api/admin/health'),
        ]);
        setStats(s.data.stats);
        setHealth(h.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load admin data');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="card p-6 flex items-center gap-3 text-rose-600 border-rose-100 bg-rose-50">
        <AlertCircle className="w-5 h-5" /> {error}
      </div>
    );
  }

  const locEntries = Object.entries(stats.byLocation).sort((a, b) => b[1] - a[1]);
  const cropEntries = Object.entries(stats.byCrop).sort((a, b) => b[1] - a[1]);
  const maxLoc = locEntries[0]?.[1] || 1;
  const maxCrop = cropEntries[0]?.[1] || 1;
  const uptimeMin = Math.floor((health?.uptime || 0) / 60);
  const memMB = Math.round((health?.memory?.rss || 0) / (1024 * 1024));

  return (
    <div>
      <AdminPageHeader
        title="Admin Overview"
        subtitle="System health, user metrics, and platform activity at a glance."
        actions={
          <Link to="/admin/users" className="btn-primary">
            Manage users <ArrowRight className="w-4 h-4" />
          </Link>
        }
      />

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users}       label="Total users"        value={stats.totalUsers}    trend={`${stats.newThisWeek} this week`} accent="text-brand-700 bg-brand-50" />
        <StatCard icon={Sprout}      label="Farmers"            value={stats.farmers}                                            accent="text-emerald-600 bg-emerald-50" />
        <StatCard icon={ShieldCheck} label="Administrators"     value={stats.admins}                                             accent="text-amber-600 bg-amber-50" />
        <StatCard icon={UserPlus}    label="Signups today"      value={stats.newToday}      trend={`${stats.newThisMonth}/30d`}    accent="text-violet-600 bg-violet-50" />
      </div>

      {/* Signups chart + System */}
      <div className="grid lg:grid-cols-3 gap-6 mt-6">
        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="section-title">Signups · last 14 days</h3>
              <p className="text-xs text-ink-500 mt-0.5">{stats.newThisWeek} new in the last 7 days</p>
            </div>
            <TrendingUp className="w-5 h-5 text-brand-700" />
          </div>
          <Sparkline data={stats.signupsByDay} />
          <div className="mt-2 flex justify-between text-[10px] text-ink-400 uppercase tracking-wider">
            <span>{stats.signupsByDay[0]?.date}</span>
            <span>{stats.signupsByDay[stats.signupsByDay.length - 1]?.date}</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">System</h3>
            <Server className="w-5 h-5 text-ink-400" />
          </div>
          <ul className="text-sm space-y-3">
            <li className="flex justify-between"><span className="text-ink-500">Status</span><span className="chip bg-emerald-100 text-emerald-700">{health?.status || 'unknown'}</span></li>
            <li className="flex justify-between"><span className="text-ink-500">Uptime</span><span className="font-semibold">{uptimeMin}m</span></li>
            <li className="flex justify-between"><span className="text-ink-500">Memory (RSS)</span><span className="font-semibold">{memMB} MB</span></li>
            <li className="flex justify-between"><span className="text-ink-500">Node</span><span className="font-semibold">{health?.node}</span></li>
            <li className="flex justify-between"><span className="text-ink-500">Env</span><span className="font-semibold capitalize">{health?.env}</span></li>
          </ul>
        </div>
      </div>

      {/* Distribution */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Users by region</h3>
            <MapPin className="w-5 h-5 text-ink-400" />
          </div>
          {locEntries.length === 0 ? (
            <div className="text-sm text-ink-400 py-8 text-center">No location data</div>
          ) : (
            <div className="space-y-4">
              {locEntries.slice(0, 8).map(([loc, count]) => (
                <BarRow key={loc} label={loc} value={count} max={maxLoc} color="bg-brand-600" />
              ))}
            </div>
          )}
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="section-title">Top crops</h3>
            <Sprout className="w-5 h-5 text-ink-400" />
          </div>
          {cropEntries.length === 0 ? (
            <div className="text-sm text-ink-400 py-8 text-center">No crop data</div>
          ) : (
            <div className="space-y-4">
              {cropEntries.slice(0, 8).map(([crop, count]) => (
                <BarRow key={crop} label={crop} value={count} max={maxCrop} color="bg-accent-500" />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Shortcut links */}
      <div className="grid md:grid-cols-3 gap-4 mt-6">
        <Link to="/admin/users" className="card-hover p-6 group flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
            <Users className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="font-bold">Manage users</div>
            <div className="text-xs text-ink-500">Create, edit, delete, change roles</div>
          </div>
          <ArrowRight className="w-4 h-4 text-ink-400 group-hover:translate-x-1 transition" />
        </Link>
        <Link to="/admin/activity" className="card-hover p-6 group flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="font-bold">Activity feed</div>
            <div className="text-xs text-ink-500">Latest user actions</div>
          </div>
          <ArrowRight className="w-4 h-4 text-ink-400 group-hover:translate-x-1 transition" />
        </Link>
        <Link to="/admin/settings" className="card-hover p-6 group flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="font-bold">Settings</div>
            <div className="text-xs text-ink-500">Platform configuration</div>
          </div>
          <ArrowRight className="w-4 h-4 text-ink-400 group-hover:translate-x-1 transition" />
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
