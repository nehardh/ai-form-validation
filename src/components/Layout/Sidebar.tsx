import React from 'react';
import { NavLink } from 'react-router-dom';
import { Upload, Clock, CheckCircle, BarChart3, FileText } from 'lucide-react';

const navigationItems = [
  { name: 'Dashboard', path: '/dashboard', icon: BarChart3 },
  { name: 'Upload Claim', path: '/upload', icon: Upload },
  { name: 'Pending Claims', path: '/pending', icon: Clock },
  { name: 'Validated Claims', path: '/validated', icon: CheckCircle },
  { name: 'Reports', path: '/reports', icon: FileText },
];

export const Sidebar: React.FC = () => {
  return (
    <div className="h-full w-64 bg-slate-900 text-white">
      <div className="p-6 border-b border-slate-700">
        <h2 className="text-xl font-semibold text-emerald-400">ClaimValidator</h2>
        <p className="text-sm text-slate-300 mt-1">Healthcare Solutions</p>
      </div>
      
      <nav className="mt-8">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                isActive
                  ? 'bg-emerald-600 text-white border-r-2 border-emerald-400'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            <item.icon className="w-5 h-5 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};