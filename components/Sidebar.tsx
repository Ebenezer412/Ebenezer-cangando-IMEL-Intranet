
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { LogOut, GraduationCap, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuth, useSettings, useSystemAdmin } from '../App';
import { SIDEBAR_LINKS } from '../constants';
import { UserRole } from '../types';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggle }) => {
  const { user, logout } = useAuth();
  const { t } = useSettings();
  const { settings } = useSystemAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredLinks = SIDEBAR_LINKS.filter(link => 
    user ? link.roles.includes(user.role) : false
  );

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen z-40 bg-primary text-white transition-all duration-300 shadow-xl overflow-hidden flex flex-col ${isOpen ? 'w-64' : 'w-20'}`}
    >
      {/* Brand */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <div className="p-2 bg-white/10 rounded-lg">
          <GraduationCap className="w-6 h-6 text-secondary" />
        </div>
        {isOpen && (
          <div className="flex flex-col truncate">
            <span className="font-bold text-lg leading-tight truncate">{settings.schoolAcronym}</span>
            <span className="text-[10px] text-white/50 tracking-widest uppercase font-black">Sistema Interno</span>
          </div>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 py-6 space-y-1 overflow-y-auto scrollbar-hide">
        {filteredLinks.map((link, idx) => (
          <NavLink
            key={`${link.path}-${idx}`}
            to={link.path}
            className={({ isActive }) => `
              flex items-center gap-4 px-6 py-3 transition-all duration-200
              ${isActive ? 'sidebar-item-active text-white bg-white/10' : 'text-white/60 hover:text-white hover:bg-white/5'}
            `}
          >
            <link.icon className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="text-sm font-bold uppercase tracking-wide">{link.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-4 px-4 py-3 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {isOpen && <span className="text-sm font-bold uppercase tracking-wide">Sair do Sistema</span>}
        </button>
      </div>

      <button 
        onClick={toggle}
        className="absolute bottom-16 -right-3 bg-white dark:bg-slate-700 text-primary p-1.5 rounded-full shadow-lg border border-slate-200 dark:border-slate-600 lg:hidden"
      >
        {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
      </button>
    </aside>
  );
};

export default Sidebar;
