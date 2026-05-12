import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Activity, UserPlus, Edit3, RefreshCw, AlertCircle, Shield, User } from 'lucide-react';
import AdminPageHeader from './AdminPageHeader';

const fmtTime = (s) => {
  if (!s) return '—';
  const d = new Date(s);
  const diff = Date.now() - d.getTime();
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  return d.toLocaleDateString();
};

const AdminActivity = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.get('/api/admin/activity');
      setItems(res.data.activity || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load activity');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <div>
      <AdminPageHeader
        title="Activity feed"
        subtitle="Recent platform events — new registrations and profile updates."
        actions={
          <button onClick={load} className="btn-outline">
            <RefreshCw className="w-4 h-4" /> Refresh
          </button>
        }
      />

      {error && (
        <div className="mb-4 flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      <div className="card overflow-hidden">
        {loading ? (
          <div className="py-16 flex justify-center">
            <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-16 text-center text-ink-400">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-40" />
            No recent activity
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {items.map((it) => {
              const isCreate = it.type === 'user.created';
              const Icon = isCreate ? UserPlus : Edit3;
              return (
                <li key={it.id + it.at} className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50/70 transition">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    isCreate ? 'bg-emerald-50 text-emerald-600' : 'bg-violet-50 text-violet-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-ink-900">{it.actor}</span>
                      <span className={`chip ${it.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-brand-50 text-brand-700'}`}>
                        {it.role === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                        {it.role}
                      </span>
                      <span className="text-xs text-ink-500">
                        {isCreate ? 'registered an account' : 'updated their profile'}
                      </span>
                    </div>
                    <div className="text-xs text-ink-500 mt-0.5 truncate">{it.email}</div>
                  </div>
                  <div className="text-xs text-ink-400 whitespace-nowrap">{fmtTime(it.at)}</div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AdminActivity;
