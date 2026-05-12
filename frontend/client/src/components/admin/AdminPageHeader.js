import React from 'react';
import { Shield } from 'lucide-react';

const AdminPageHeader = ({ title, subtitle, actions, eyebrow = 'Admin' }) => (
  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
    <div>
      <span className="chip bg-amber-100 text-amber-700">
        <Shield className="w-3.5 h-3.5" /> {eyebrow}
      </span>
      <h1 className="page-title mt-3">{title}</h1>
      {subtitle && <p className="mt-1 text-ink-500 max-w-2xl">{subtitle}</p>}
    </div>
    {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
  </div>
);

export default AdminPageHeader;
