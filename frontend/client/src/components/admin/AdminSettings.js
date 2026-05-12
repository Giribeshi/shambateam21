import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Server, Database, Globe, Shield, KeyRound, AlertTriangle } from 'lucide-react';
import AdminPageHeader from './AdminPageHeader';

const Row = ({ label, value, mono }) => (
  <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
    <span className="text-sm text-ink-500">{label}</span>
    <span className={`text-sm font-semibold ${mono ? 'font-mono text-xs' : ''}`}>{value ?? '—'}</span>
  </div>
);

const AdminSettings = () => {
  const [health, setHealth] = useState(null);

  useEffect(() => {
    axios.get('/api/admin/health').then(r => setHealth(r.data)).catch(() => {});
  }, []);

  const uptimeMin = Math.floor((health?.uptime || 0) / 60);
  const heapMB = Math.round((health?.memory?.heapUsed || 0) / (1024 * 1024));
  const rssMB  = Math.round((health?.memory?.rss      || 0) / (1024 * 1024));

  return (
    <div>
      <AdminPageHeader
        title="Settings"
        subtitle="System configuration and platform information."
      />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-700 flex items-center justify-center">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Runtime</h3>
              <p className="text-xs text-ink-500">Live server information</p>
            </div>
          </div>
          <Row label="Status"      value={health?.status || '—'} />
          <Row label="Environment" value={health?.env} />
          <Row label="Node.js"     value={health?.node} mono />
          <Row label="Uptime"      value={`${uptimeMin} min`} />
          <Row label="Heap used"   value={`${heapMB} MB`} />
          <Row label="RSS memory"  value={`${rssMB} MB`} />
          <Row label="Server time" value={health?.timestamp} mono />
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Database</h3>
              <p className="text-xs text-ink-500">Storage engine</p>
            </div>
          </div>
          <Row label="Engine"   value="SQLite 3" />
          <Row label="File"     value="backend/database/agrimind.db" mono />
          <Row label="Tables"   value="users" />
          <Row label="Backups"  value="manual" />
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Authentication</h3>
              <p className="text-xs text-ink-500">JWT-based session tokens</p>
            </div>
          </div>
          <Row label="Strategy"    value="JWT bearer" />
          <Row label="Token life"  value="7 days" />
          <Row label="Password"    value="bcrypt · 10 rounds" />
          <Row label="MFA"         value="not enabled" />

          <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Rotate the JWT secret in <code className="bg-amber-100 px-1 rounded">src/middleware/middleware/auth.js</code> before production deployment.</span>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">Localization</h3>
              <p className="text-xs text-ink-500">Supported languages</p>
            </div>
          </div>
          <Row label="Languages" value="English, Swahili" />
          <Row label="Default"   value="English" />
          <Row label="Regions"   value="Tanzania (10)" />
        </div>

        <div className="card p-6 lg:col-span-2">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold">API endpoints</h3>
              <p className="text-xs text-ink-500">Available backend routes</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-x-6 text-xs font-mono">
            {[
              'POST /api/auth/login',
              'POST /api/auth/register',
              'GET  /api/auth/profile',
              'PUT  /api/auth/profile',
              'GET  /api/market/prices',
              'POST /api/diagnose',
              'POST /api/advise',
              'POST /api/recommend-crops',
              'GET  /api/weather',
              'POST /api/translate',
              'GET  /api/admin/stats',
              'GET  /api/admin/users',
              'POST /api/admin/users',
              'PUT  /api/admin/users/:id',
              'DELETE /api/admin/users/:id',
              'GET  /api/admin/activity',
            ].map(e => (
              <div key={e} className="py-1.5 border-b border-slate-100 text-ink-700">{e}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;
