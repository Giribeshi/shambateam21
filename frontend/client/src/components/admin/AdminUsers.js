import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import {
  Search, Plus, Edit3, Trash2, Key, X, Save, Shield, User,
  AlertCircle, CheckCircle2, RefreshCw, Mail, MapPin, Phone, Ruler,
} from 'lucide-react';
import AdminPageHeader from './AdminPageHeader';
import { useAuth } from '../../contexts/AuthContext';

const LOCATIONS = ['', 'arusha', 'dar_es_salaam', 'dodoma', 'iringa', 'kilimanjaro', 'mbeya', 'morogoro', 'mwanza', 'tanga', 'zanzibar'];
const FARM_SIZES = ['', 'small', 'medium', 'large', 'demo'];

const fmtDate = (s) => s ? new Date(s).toLocaleDateString() : '—';
const cap = (s) => s ? s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' ') : '—';

const RoleBadge = ({ role }) => (
  <span className={`chip ${role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-brand-50 text-brand-700'}`}>
    {role === 'admin' ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
    {cap(role)}
  </span>
);

const Modal = ({ open, onClose, title, children, size = 'md' }) => {
  if (!open) return null;
  const sizeCls = size === 'lg' ? 'max-w-2xl' : 'max-w-md';
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative card ${sizeCls} w-full p-6 animate-slide-up`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100">
            <X className="w-5 h-5 text-ink-500" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

const UserForm = ({ initial = {}, onSave, onCancel, isCreate, submitting }) => {
  const [form, setForm] = useState({
    name: initial.name || '',
    email: initial.email || '',
    password: '',
    role: initial.role || 'farmer',
    location: initial.location || '',
    phone: initial.phone || '',
    farmSize: initial.farmSize || '',
  });
  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onSave(form); }}
      className="space-y-4"
    >
      <div className="grid sm:grid-cols-2 gap-3">
        <div>
          <label className="label">Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input name="name" value={form.name} onChange={change} required className="input pl-10" />
          </div>
        </div>
        <div>
          <label className="label">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input type="email" name="email" value={form.email} onChange={change} required className="input pl-10" />
          </div>
        </div>
        {isCreate && (
          <div className="sm:col-span-2">
            <label className="label">Password</label>
            <input type="password" name="password" value={form.password} onChange={change}
                   required minLength={6} className="input" placeholder="At least 6 characters" />
          </div>
        )}
        <div>
          <label className="label">Role</label>
          <select name="role" value={form.role} onChange={change} className="input">
            <option value="farmer">Farmer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div>
          <label className="label">Phone</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <input name="phone" value={form.phone} onChange={change} className="input pl-10" />
          </div>
        </div>
        <div>
          <label className="label">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <select name="location" value={form.location} onChange={change} className="input pl-10">
              {LOCATIONS.map(l => <option key={l} value={l}>{l ? cap(l) : 'Select location'}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="label">Farm size</label>
          <div className="relative">
            <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
            <select name="farmSize" value={form.farmSize} onChange={change} className="input pl-10">
              {FARM_SIZES.map(s => <option key={s} value={s}>{s ? cap(s) : 'Select size'}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <button type="button" onClick={onCancel} className="btn-outline">Cancel</button>
        <button type="submit" disabled={submitting} className="btn-primary">
          {submitting
            ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            : <Save className="w-4 h-4" />}
          {isCreate ? 'Create user' : 'Save changes'}
        </button>
      </div>
    </form>
  );
};

const PasswordForm = ({ onSave, onCancel, submitting }) => {
  const [pwd, setPwd] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onSave(pwd); }} className="space-y-4">
      <div>
        <label className="label">New password</label>
        <input type="password" required minLength={6} value={pwd} onChange={(e) => setPwd(e.target.value)}
               className="input" placeholder="At least 6 characters" />
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" onClick={onCancel} className="btn-outline">Cancel</button>
        <button type="submit" disabled={submitting} className="btn-primary">
          <Key className="w-4 h-4" /> Update password
        </button>
      </div>
    </form>
  );
};

const AdminUsers = () => {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [flash, setFlash] = useState('');
  const [q, setQ] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const [editing, setEditing] = useState(null);
  const [creating, setCreating] = useState(false);
  const [pwdUser, setPwdUser] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {};
      if (q) params.q = q;
      if (roleFilter) params.role = roleFilter;
      const res = await axios.get('/api/admin/users', { params });
      setUsers(res.data.users);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load users');
    } finally {
      setLoading(false);
    }
  }, [q, roleFilter]);

  useEffect(() => {
    const t = setTimeout(load, 250);
    return () => clearTimeout(t);
  }, [load]);

  const showFlash = (msg) => {
    setFlash(msg);
    setTimeout(() => setFlash(''), 3000);
  };

  const handleCreate = async (data) => {
    setSubmitting(true);
    try {
      await axios.post('/api/admin/users', data);
      setCreating(false);
      showFlash('User created');
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Create failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSave = async (data) => {
    setSubmitting(true);
    try {
      await axios.put(`/api/admin/users/${editing.id}`, data);
      setEditing(null);
      showFlash('User updated');
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Update failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handlePassword = async (password) => {
    setSubmitting(true);
    try {
      await axios.post(`/api/admin/users/${pwdUser.id}/password`, { password });
      setPwdUser(null);
      showFlash('Password updated');
    } catch (err) {
      alert(err.response?.data?.message || 'Password update failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    setSubmitting(true);
    try {
      await axios.delete(`/api/admin/users/${deleting.id}`);
      setDeleting(null);
      showFlash('User deleted');
      load();
    } catch (err) {
      alert(err.response?.data?.message || 'Delete failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <AdminPageHeader
        title="User management"
        subtitle="Search, edit, and remove platform users. Promote farmers to admins or reset passwords as needed."
        actions={
          <>
            <button onClick={load} className="btn-outline" title="Refresh">
              <RefreshCw className="w-4 h-4" />
            </button>
            <button onClick={() => setCreating(true)} className="btn-primary">
              <Plus className="w-4 h-4" /> New user
            </button>
          </>
        }
      />

      {flash && (
        <div className="mb-4 flex items-center gap-2 text-emerald-700 bg-emerald-50 border border-emerald-200 px-4 py-2.5 rounded-xl text-sm">
          <CheckCircle2 className="w-4 h-4" /> {flash}
        </div>
      )}
      {error && (
        <div className="mb-4 flex items-center gap-2 text-rose-700 bg-rose-50 border border-rose-200 px-4 py-2.5 rounded-xl text-sm">
          <AlertCircle className="w-4 h-4" /> {error}
        </div>
      )}

      {/* Filters */}
      <div className="card p-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-400" />
          <input value={q} onChange={(e) => setQ(e.target.value)}
                 placeholder="Search by name, email, or phone…"
                 className="input pl-10" />
        </div>
        <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="input sm:w-44">
          <option value="">All roles</option>
          <option value="admin">Admins</option>
          <option value="farmer">Farmers</option>
        </select>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-ink-500 text-xs uppercase tracking-wider">
              <tr>
                <th className="text-left px-5 py-3 font-semibold">User</th>
                <th className="text-left px-5 py-3 font-semibold">Role</th>
                <th className="text-left px-5 py-3 font-semibold">Location</th>
                <th className="text-left px-5 py-3 font-semibold">Farm</th>
                <th className="text-left px-5 py-3 font-semibold">Joined</th>
                <th className="text-right px-5 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-16">
                  <div className="w-8 h-8 border-4 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
                </td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-12 text-ink-400">No users found</td></tr>
              ) : users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white font-bold flex items-center justify-center text-xs">
                        {(u.name || '?').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                      </div>
                      <div>
                        <div className="font-semibold text-ink-900">{u.name}</div>
                        <div className="text-xs text-ink-500">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3"><RoleBadge role={u.role} /></td>
                  <td className="px-5 py-3 text-ink-700">{cap(u.location)}</td>
                  <td className="px-5 py-3 text-ink-700">{cap(u.farmSize)}</td>
                  <td className="px-5 py-3 text-ink-500">{fmtDate(u.createdAt)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setEditing(u)} className="p-2 rounded-lg hover:bg-brand-50 text-brand-700" title="Edit">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => setPwdUser(u)} className="p-2 rounded-lg hover:bg-amber-50 text-amber-700" title="Reset password">
                        <Key className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleting(u)}
                        disabled={u.id === currentUser?.id}
                        className="p-2 rounded-lg hover:bg-rose-50 text-rose-600 disabled:opacity-30 disabled:cursor-not-allowed"
                        title={u.id === currentUser?.id ? "You can't delete yourself" : 'Delete'}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!loading && users.length > 0 && (
          <div className="px-5 py-3 border-t border-slate-100 text-xs text-ink-500">
            Showing <span className="font-semibold text-ink-900">{users.length}</span> {users.length === 1 ? 'user' : 'users'}
          </div>
        )}
      </div>

      {/* Create modal */}
      <Modal open={creating} onClose={() => setCreating(false)} title="Create new user" size="lg">
        <UserForm isCreate onSave={handleCreate} onCancel={() => setCreating(false)} submitting={submitting} />
      </Modal>

      {/* Edit modal */}
      <Modal open={!!editing} onClose={() => setEditing(null)} title={`Edit ${editing?.name || ''}`} size="lg">
        {editing && <UserForm initial={editing} onSave={handleSave} onCancel={() => setEditing(null)} submitting={submitting} />}
      </Modal>

      {/* Password modal */}
      <Modal open={!!pwdUser} onClose={() => setPwdUser(null)} title={`Reset password · ${pwdUser?.name || ''}`}>
        <PasswordForm onSave={handlePassword} onCancel={() => setPwdUser(null)} submitting={submitting} />
      </Modal>

      {/* Delete confirm */}
      <Modal open={!!deleting} onClose={() => setDeleting(null)} title="Delete user?">
        <p className="text-ink-700">
          This will permanently delete <span className="font-bold">{deleting?.name}</span> ({deleting?.email}).
          This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button onClick={() => setDeleting(null)} className="btn-outline">Cancel</button>
          <button onClick={handleDelete} disabled={submitting}
                  className="btn px-5 py-2.5 text-white bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 shadow-soft">
            <Trash2 className="w-4 h-4" /> Delete user
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default AdminUsers;
