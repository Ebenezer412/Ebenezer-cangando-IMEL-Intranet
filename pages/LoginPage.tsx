
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { GraduationCap, ArrowRight, Eye, EyeOff, Lock, User } from 'lucide-react';
import { useAuth, useSettings } from '../App';

const LoginPage: React.FC = () => {
  const [processNumber, setProcessNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const { t } = useSettings();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const success = await login(processNumber, password);
    if (success) {
      navigate('/dashboard');
    } else {
      setError('Número de processo ou senha incorretos.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Left: Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md animate-fade">
          <Link to="/" className="inline-flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-[#003366] rounded-lg flex items-center justify-center text-white">
              <GraduationCap size={24} />
            </div>
            <span className="font-extrabold text-2xl text-[#003366] dark:text-white">IMEL <span className="text-[#FFD700]">Intranet</span></span>
          </Link>

          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">{t('login_title')}</h1>
          <p className="text-slate-500 dark:text-slate-400 mb-10">{t('login_subtitle')}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">{t('process_number')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User size={18} />
                </div>
                <input 
                  type="text" 
                  value={processNumber}
                  onChange={(e) => setProcessNumber(e.target.value)}
                  placeholder="Ex: 2024001"
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-[#003366] focus:bg-white dark:focus:bg-slate-700 transition-all outline-none text-slate-800 dark:text-white"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('password')}</label>
                <a href="#" className="text-xs font-bold text-[#003366] dark:text-[#FFD700] hover:underline">{t('forgot_password')}</a>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl focus:border-[#003366] focus:bg-white dark:focus:bg-slate-700 transition-all outline-none text-slate-800 dark:text-white"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium rounded-xl flex items-center gap-2">
                <div className="w-1 h-4 bg-red-500 rounded-full"></div>
                {error}
              </div>
            )}

            <button 
              type="submit" 
              disabled={isLoading}
              className="w-full bg-[#003366] text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/20 hover:bg-[#002244] hover:-translate-y-1 transition-all disabled:opacity-70 disabled:translate-y-0 flex items-center justify-center gap-3"
            >
              {isLoading ? '...' : t('access_btn')}
              {!isLoading && <ArrowRight size={20} />}
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-slate-500 dark:text-slate-400 text-sm">
              {t('no_account')} <Link to="/registrar" className="text-[#003366] dark:text-[#FFD700] font-bold hover:underline">{t('create_now')}</Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right: Image */}
      <div className="hidden md:block w-1/2 h-screen p-8 bg-slate-50 dark:bg-slate-800 transition-colors duration-300">
        <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden shadow-2xl">
          <img 
            src="https://tecpleta.com/midias/noticias/584979.jpg" 
            alt="Instituto Médio de Economia de Luanda" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#003366]/90 via-transparent to-transparent"></div>
          <div className="absolute bottom-16 left-16 right-16">
            <div className="inline-block px-4 py-2 bg-[#FFD700] text-[#003366] text-xs font-black uppercase tracking-widest rounded-lg mb-6">IMEL Angola</div>
            <h2 className="text-4xl font-black text-white leading-tight">Excelência no Ensino de Economia.</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
