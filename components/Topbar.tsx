
import React, { useState } from 'react';
import { Bell, Search, Menu, Sun, Moon, Languages, Check, MessageSquare, AlertCircle, FileText } from 'lucide-react';
import { useAuth, useSettings, useDatabase } from '../App';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const { user } = useAuth();
  const { theme, lang, toggleTheme, toggleLang, t } = useSettings();
  const { notifications, markNotificationRead } = useDatabase();
  const [showNotifs, setShowNotifs] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotifIcon = (type: string) => {
    switch(type) {
      case 'message': return <MessageSquare size={16} className="text-blue-500" />;
      case 'grade': return <FileText size={16} className="text-emerald-500" />;
      case 'announcement': return <AlertCircle size={16} className="text-orange-500" />;
      default: return <Bell size={16} className="text-slate-400" />;
    }
  };

  return (
    <header className="h-20 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-8 flex items-center justify-between sticky top-0 z-30 shadow-sm transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500 dark:text-slate-400 transition-colors">
          <Menu size={20} />
        </button>
        <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-700 px-4 py-2 rounded-xl w-72">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder={t('search')} className="bg-transparent border-none focus:outline-none text-sm ml-3 w-full text-slate-600 dark:text-slate-200" />
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <button onClick={toggleLang} className="flex items-center gap-2 p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-500 dark:text-slate-400">
          <Languages size={20} />
          <span className="text-xs font-bold uppercase">{lang}</span>
        </button>

        <button onClick={toggleTheme} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl text-slate-500 dark:text-slate-400">
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="relative">
          <button 
            onClick={() => setShowNotifs(!showNotifs)}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full text-slate-500 dark:text-slate-400 transition-colors"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 text-white text-[8px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-slate-800">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 mt-4 w-80 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2rem] shadow-2xl overflow-hidden animate-fade">
              <div className="p-6 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between border-b border-slate-100 dark:border-slate-700">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Notificações</span>
                <span className="text-[10px] bg-primary text-white px-2 py-0.5 rounded-full">{unreadCount} Novas</span>
              </div>
              <div className="max-h-[300px] overflow-y-auto scrollbar-hide">
                {notifications.length === 0 ? (
                  <div className="p-10 text-center text-slate-300 italic text-sm font-bold">Sem notificações</div>
                ) : (
                  notifications.map(n => (
                    <div 
                      key={n.id} 
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-5 border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer transition-colors ${!n.read ? 'bg-blue-50/20 dark:bg-blue-900/10' : ''}`}
                    >
                      <div className="flex gap-3">
                        <div className="mt-1">{getNotifIcon(n.type)}</div>
                        <div className="flex-1">
                          <p className="text-xs font-black text-slate-800 dark:text-white leading-tight">{n.title}</p>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">{n.message}</p>
                          <p className="text-[8px] text-slate-400 mt-2 font-mono">{n.timestamp}</p>
                        </div>
                        {!n.read && <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1"></div>}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <button className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-primary bg-white dark:bg-slate-800 hover:bg-slate-50 transition-colors">Ver todas as notificações</button>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 pl-4 sm:pl-6 border-l border-slate-200 dark:border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-100">{user?.name}</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{user?.role}</p>
          </div>
          <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center font-bold ring-4 ring-blue-50 dark:ring-slate-700">
            {user?.name.charAt(0)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
