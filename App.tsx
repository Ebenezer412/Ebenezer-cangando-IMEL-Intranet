
import React, { useState, useEffect, createContext, useContext } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  Link
} from 'react-router-dom';
import { User, UserRole, Grade, ClassSchedule, LibraryResource, Message } from './types';
import { TEST_USERS, MOCK_GRADES, MOCK_SCHEDULE } from './constants';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountPage';
import DashboardPage from './pages/DashboardPage';
import UserManagementPage from './pages/UserManagementPage';
import GradesPage from './pages/GradesPage';
import GradingPage from './pages/GradingPage';
import SchedulePage from './pages/SchedulePage';
import LibraryPage from './pages/LibraryPage';
import MessagesPage from './pages/MessagesPage';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

// --- Placeholder Components for "Full Functionality" ---
const HistoryPage = () => (
  <div className="space-y-6 animate-fade">
    <h1 className="text-3xl font-black text-slate-900 dark:text-white">Histórico Académico</h1>
    <div className="grid gap-4">
      {[2023, 2022, 2021].map(year => (
        <div key={year} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex justify-between items-center">
          <div>
            <p className="font-bold text-slate-800 dark:text-white">Ano Lectivo {year}</p>
            <p className="text-sm text-slate-500">10ª Classe - Gestão Empresarial</p>
          </div>
          <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase">Aprovado</span>
        </div>
      ))}
    </div>
  </div>
);

const StatsPage = () => (
  <div className="space-y-6 animate-fade">
    <h1 className="text-3xl font-black text-slate-900 dark:text-white">Estatísticas Institucionais</h1>
    <div className="grid md:grid-cols-2 gap-8">
      <div className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm">
        <h3 className="font-bold mb-4 dark:text-white">Aproveitamento por Curso</h3>
        <div className="space-y-4">
          {['Economia', 'Contabilidade', 'Gestão'].map(c => (
            <div key={c}>
              <div className="flex justify-between text-sm mb-1 dark:text-slate-300"><span>{c}</span><span>85%</span></div>
              <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                <div className="h-full bg-[#003366]" style={{ width: '85%' }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const SettingsPage = () => {
  const { toggleTheme, toggleLang, theme, lang } = useSettings();
  return (
    <div className="max-w-2xl space-y-8 animate-fade">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Configurações</h1>
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold dark:text-white">Modo Escuro</p>
              <p className="text-sm text-slate-500">Alternar entre tema claro e escuro</p>
            </div>
            <button onClick={toggleTheme} className={`w-14 h-8 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-[#003366]' : 'bg-slate-200'}`}>
              <div className={`w-6 h-6 bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-700 pt-6">
            <div>
              <p className="font-bold dark:text-white">Idioma do Sistema</p>
              <p className="text-sm text-slate-500">Actualmente em {lang === 'pt' ? 'Português' : 'Inglês'}</p>
            </div>
            <button onClick={toggleLang} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl font-bold text-sm dark:text-white">Mudar para {lang === 'pt' ? 'EN' : 'PT'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Translations ---
export const translations = {
  pt: {
    dashboard: "Dashboard",
    my_grades: "Minhas Notas",
    schedule: "Horário Escolar",
    library: "Biblioteca Digital",
    history: "Histórico Académico",
    user_management: "Gestão de Usuários",
    monitoring: "Monitoramento",
    stats: "Estatísticas",
    reports: "Relatórios Gerenciais",
    messages: "Mensagens",
    settings: "Configurações",
    logout: "Sair do Sistema",
    welcome: "Olá",
    search: "Pesquisar...",
    academic_perf: "Meu Desempenho Académico",
    institutional_summary: "Resumo Institucional IMEL",
    login_title: "Bem-vindo de volta",
    login_subtitle: "Insira suas credenciais para aceder ao sistema.",
    process_number: "Número de Processo",
    password: "Palavra-passe",
    forgot_password: "Esqueceu a senha?",
    access_btn: "Entrar no Sistema",
    no_account: "Não tem uma conta ativa?",
    create_now: "Criar conta agora",
    location: "Localização",
    find_us: "Encontre-nos",
    address: "56CW+38V, Luanda, Angola",
    features: "Funcionalidades",
    about: "Sobre o IMEL",
    start_now: "Começar agora",
    demo: "Ver Demonstração",
    save: "Salvar Alterações",
    cancel: "Cancelar"
  },
  en: {
    dashboard: "Dashboard",
    my_grades: "My Grades",
    schedule: "Class Schedule",
    library: "Digital Library",
    history: "Academic History",
    user_management: "User Management",
    monitoring: "Monitoring",
    stats: "Statistics",
    reports: "Management Reports",
    messages: "Messages",
    settings: "Settings",
    logout: "Logout",
    welcome: "Hello",
    search: "Search...",
    academic_perf: "My Academic Performance",
    institutional_summary: "IMEL Institutional Summary",
    login_title: "Welcome Back",
    login_subtitle: "Enter your credentials to access the system.",
    process_number: "Process Number",
    password: "Password",
    forgot_password: "Forgot password?",
    access_btn: "Login to System",
    no_account: "Don't have an account?",
    create_now: "Create account now",
    location: "Location",
    find_us: "Find Us",
    address: "56CW+38V, Luanda, Angola",
    features: "Features",
    about: "About IMEL",
    start_now: "Start now",
    demo: "View Demo",
    save: "Save Changes",
    cancel: "Cancel"
  }
};

// --- Settings Context ---
interface SettingsContextType {
  theme: 'light' | 'dark';
  lang: 'pt' | 'en';
  toggleTheme: () => void;
  toggleLang: () => void;
  t: (key: keyof typeof translations.pt) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) throw new Error('useSettings must be used within SettingsProvider');
  return context;
};

// --- Database Context ---
interface DatabaseContextType {
  users: User[];
  grades: Grade[];
  schedules: ClassSchedule[];
  library: LibraryResource[];
  messages: Message[];
  updateGrade: (id: string, updates: Partial<Grade>) => void;
  deleteUser: (id: string) => void;
  sendMessage: (to: string, content: string) => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);
export const useDatabase = () => useContext(DatabaseContext)!;

const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => JSON.parse(localStorage.getItem('imel_db_users') || JSON.stringify(TEST_USERS)));
  const [grades, setGrades] = useState<Grade[]>(() => JSON.parse(localStorage.getItem('imel_db_grades') || JSON.stringify(MOCK_GRADES)));
  const [schedules] = useState<ClassSchedule[]>(MOCK_SCHEDULE);
  const [library] = useState<LibraryResource[]>([
    { id: 'l1', title: 'Introdução à Macroeconomia', subject: 'Economia', author: 'Dr. Santos', date: '2024-05-10', type: 'PDF' },
    { id: 'l2', title: 'Contabilidade Bancária v2', subject: 'Contabilidade', author: 'Msc. Carlos', date: '2024-06-01', type: 'DOC' },
    { id: 'l3', title: 'Aula Inaugural: Finanças Públicas', subject: 'Gestão', author: 'Dra. Maria', date: '2024-01-15', type: 'VIDEO' }
  ]);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    localStorage.setItem('imel_db_users', JSON.stringify(users));
    localStorage.setItem('imel_db_grades', JSON.stringify(grades));
  }, [users, grades]);

  const updateGrade = (id: string, updates: Partial<Grade>) => {
    setGrades(prev => prev.map(g => {
      if (g.id === id) {
        const updated = { ...g, ...updates };
        updated.average = Math.round(((updated.mac + updated.npp + updated.npt) / 3) * 10) / 10;
        return updated;
      }
      return g;
    }));
  };

  const deleteUser = (id: string) => setUsers(prev => prev.filter(u => u.id !== id));
  
  const sendMessage = (to: string, content: string) => {
    const user = JSON.parse(localStorage.getItem('imel_user') || '{}');
    const newMessage: Message = {
      id: Date.now().toString(),
      from: user.name || 'Sistema',
      to,
      content,
      timestamp: new Date().toLocaleTimeString(),
      read: false
    };
    setMessages(prev => [newMessage, ...prev]);
  };

  return (
    <DatabaseContext.Provider value={{ users, grades, schedules, library, messages, updateGrade, deleteUser, sendMessage }}>
      {children}
    </DatabaseContext.Provider>
  );
};

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  login: (process: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => useContext(AuthContext)!;

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('imel_user');
    if (saved) setUser(JSON.parse(saved));
    setIsLoading(false);
  }, []);

  const login = async (process: string, pass: string) => {
    const savedUsers = JSON.parse(localStorage.getItem('imel_db_users') || '[]');
    const found = savedUsers.find((u: any) => u.processNumber === process);
    if (found) {
      setUser(found);
      localStorage.setItem('imel_user', JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('imel_user');
  };

  return <AuthContext.Provider value={{ user, login, logout, isLoading }}>{children}</AuthContext.Provider>;
};

const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('imel_theme') as any) || 'light');
  const [lang, setLang] = useState<'pt' | 'en'>(() => (localStorage.getItem('imel_lang') as any) || 'pt');

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('imel_theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');
  const t = (key: keyof typeof translations.pt) => translations[lang][key] || key;

  return <SettingsContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>{children}</SettingsContext.Provider>;
};

const AppShell: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  if (!user) return <Navigate to="/login" />;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
      <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-20'}`}>
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-4 md:p-8 flex-1 animate-fade overflow-x-hidden">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/notas" element={<GradesPage />} />
            <Route path="/gestao-notas" element={<GradingPage />} />
            <Route path="/horario" element={<SchedulePage />} />
            <Route path="/biblioteca" element={<LibraryPage />} />
            <Route path="/mensagens" element={<MessagesPage />} />
            <Route path="/historico" element={<HistoryPage />} />
            <Route path="/stats" element={<StatsPage />} />
            <Route path="/config" element={<SettingsPage />} />
            <Route path="/admin/usuarios" element={<UserManagementPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <SettingsProvider>
    <DatabaseProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registrar" element={<CreateAccountPage />} />
            <Route path="/*" element={<AppShell />} />
          </Routes>
        </Router>
      </AuthProvider>
    </DatabaseProvider>
  </SettingsProvider>
);

export default App;
