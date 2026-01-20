
import React from 'react';
import { Bell, Search, Menu, Sun, Moon, Languages } from 'lucide-react';
import { useAuth, useSettings } from '../App';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const { theme, lang, toggleTheme, toggleLang, t } = useSettings();

  return (
    <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-xl w-72 transition-colors">
          <Search size={18} className="text-slate-400" />
          <input 
            type="text" 
            placeholder={t('search')} 
            className="bg-transparent border-none focus:outline-none text-sm ml-3 w-full text-slate-600 dark:text-slate-200"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        {/* Language Toggle */}
        <button 
          onClick={toggleLang}
          className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-500 dark:text-slate-400 transition-all"
          title="Mudar Idioma"
        >
          <Languages size={20} />
          <span className="text-xs font-bold uppercase">{lang}</span>
        </button>

        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme}
          className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-500 dark:text-slate-400 transition-all"
          title="Mudar Tema"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <button className="relative p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500 dark:text-slate-400 transition-colors">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-800"></span>
        </button>
        
        <div className="flex items-center gap-4 pl-4 sm:pl-6 border-l border-slate-200 dark:border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role}</p>
          </div>
          <div className="w-10 h-10 bg-[#003366] text-white rounded-full flex items-center justify-center font-bold ring-4 ring-blue-50 dark:ring-slate-700">
            {user?.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
