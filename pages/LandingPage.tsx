
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  GraduationCap, 
  ShieldCheck, 
  Zap, 
  Users, 
  ArrowRight,
  Database,
  MapPin,
  Sun,
  Moon,
  Languages
} from 'lucide-react';
import { useSettings } from '../App';

const LandingPage: React.FC = () => {
  const { theme, lang, toggleTheme, toggleLang, t } = useSettings();

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Navbar */}
      <nav className="px-8 py-6 flex items-center justify-between max-w-7xl mx-auto sticky top-0 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#003366] rounded-lg flex items-center justify-center text-white">
            <GraduationCap size={24} />
          </div>
          <span className="font-extrabold text-2xl tracking-tighter text-[#003366] dark:text-white">IMEL <span className="text-[#FFD700]">Intranet</span></span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-6 mr-4 border-r border-slate-200 dark:border-slate-700 pr-6">
            <a href="#features" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#003366] dark:hover:text-[#FFD700]">{t('features')}</a>
            <a href="#location" className="text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-[#003366] dark:hover:text-[#FFD700]">{t('location')}</a>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleLang}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 transition-all flex items-center gap-2"
              title="Change Language"
            >
              <Languages size={20} />
              <span className="text-xs font-bold uppercase">{lang}</span>
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl text-slate-500 dark:text-slate-400 transition-all"
              title="Toggle Theme"
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>

          <Link 
            to="/login" 
            className="hidden sm:block px-6 py-2.5 bg-[#003366] text-white rounded-full text-sm font-bold shadow-lg shadow-blue-900/20 hover:scale-105 transition-transform"
          >
            {t('access_btn')}
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative pt-12 pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-[#003366] dark:text-blue-300 rounded-full text-sm font-bold mb-8">
              <Zap size={16} /> Nova Atualização v2.5
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1] mb-8">
              Gestão Escolar <br />
              <span className="text-[#003366] dark:text-[#FFD700]">Inteligente e Conectada</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-lg">
              Sistema interno que centraliza alunos, professores e coordenação num ambiente seguro, moderno e eficiente. Projetado para o futuro do IMEL.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/login" 
                className="flex items-center justify-center gap-3 px-10 py-5 bg-[#003366] text-white rounded-2xl text-lg font-bold shadow-2xl shadow-blue-900/40 hover:bg-[#002244] transition-all group"
              >
                {t('start_now')} <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="px-10 py-5 bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-2xl text-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
                {t('demo')}
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-[#FFD700] rounded-full blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-[#003366] rounded-full blur-3xl opacity-20"></div>
            <div className="relative rounded-[2.5rem] overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl rotate-3 transform hover:rotate-0 transition-all duration-700">
              <img 
                src="https://tecpleta.com/midias/noticias/584979.jpg" 
                alt="IMEL School" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Location Section */}
      <section id="location" className="py-24 bg-slate-50 dark:bg-slate-800/50 transition-colors">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="h-[400px] w-full rounded-[2.5rem] overflow-hidden bg-slate-200 dark:bg-slate-700 shadow-xl border-4 border-white dark:border-slate-800">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3942.2351897648353!2d13.228531314785465!3d-8.82512349366224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1a51f1585093375b%3A0xc6d7a46e968686e0!2sIMEL%20-%20Instituto%20M%C3%A9dio%20de%20Economia%20de%20Luanda!5e0!3m2!1spt-BR!2sao!4v1690000000000!5m2!1spt-BR!2sao" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-6">{t('find_us')}</h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed">
                Estamos localizados no coração de Luanda, prontos para receber nossos alunos e visitantes.
              </p>
              
              <a 
                href="https://www.google.com/maps/search/?api=1&query=56CW%2B38V,Luanda,Angola" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-6 p-8 bg-white dark:bg-slate-900 rounded-[2rem] shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all border border-slate-100 dark:border-slate-700"
              >
                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 text-[#003366] dark:text-[#FFD700] rounded-2xl flex items-center justify-center shrink-0">
                  <MapPin size={32} />
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest mb-1">{t('location')}</h3>
                  <p className="text-xl font-bold text-slate-800 dark:text-white">56CW+38V, Luanda</p>
                  <p className="text-slate-500 dark:text-slate-400">Luanda, Angola</p>
                </div>
                <div className="ml-4 w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-[#003366] group-hover:text-white transition-all">
                  <ArrowRight size={20} />
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-4">Desenvolvido para Excelência Académica</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">Nossa plataforma oferece ferramentas específicas para cada perfil da comunidade escolar, garantindo integração total.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Segurança Total", desc: "Controle de acesso rigoroso com logs de atividade e backup automático." },
              { icon: Users, title: "Multiperfil", desc: "Dashboards personalizados para Alunos, Pais, Professores e Gestores." },
              { icon: Database, title: "Dados em Tempo Real", desc: "Notas, faltas e relatórios atualizados instantaneamente." }
            ].map((f, i) => (
              <div key={i} className="bg-white dark:bg-slate-800 p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all group border border-slate-100 dark:border-slate-700">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 text-[#003366] dark:text-blue-300 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#003366] group-hover:text-white transition-colors">
                  <f.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{f.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-100 dark:border-slate-800 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm">© 2026 Instituto Médio de Economia de Luanda. Todos os direitos reservados.</p>
        <p className="text-slate-400 dark:text-slate-500 text-xs mt-2">Sistema de Gestão Interna v2.5.0</p>
      </footer>
    </div>
  );
};

export default LandingPage;
