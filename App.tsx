
import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  Link
} from 'react-router-dom';
import { User, UserRole, Grade, ClassSchedule, LibraryResource, Message, SystemSettings, AuditLog } from './types';
import { TEST_USERS, MOCK_GRADES, MOCK_SCHEDULE, DEFAULT_PRIMARY_COLOR, DEFAULT_SECONDARY_COLOR } from './constants';
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
import BrandingPage from './pages/BrandingPage';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import AcademicStatsPage from './pages/AcademicStatsPage';
import TeacherMonitoringPage from './pages/TeacherMonitoringPage';
import AuditLogsPage from './pages/AuditLogsPage';
import InstitutionalPage from './pages/InstitutionalPage';
import AttendancePage from './pages/AttendancePage';

// Importação das novas páginas
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SupportPage from './pages/SupportPage';

const HistoryPage = () => {
  const { activeStudent } = useAuth();
  return (
    <div className="space-y-6 animate-fade">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Histórico Académico {activeStudent ? `- ${activeStudent.name}` : ''}</h1>
      <div className="grid gap-4">
        {[2023, 2022, 2021].map(year => (
          <div key={year} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex justify-between items-center">
            <div>
              <p className="font-bold text-slate-800 dark:text-white">Ano Lectivo: {year}</p>
              <p className="text-sm text-slate-500">{year === 2023 ? '11ª Classe' : year === 2022 ? '10ª Classe' : '9ª Classe'}</p>
            </div>
            <span className="px-4 py-1.5 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold uppercase">Aprovado</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const SettingsPage = () => {
  const { toggleTheme, toggleLang, theme, lang } = useSettings();
  return (
    <div className="max-w-2xl space-y-8 animate-fade">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Configurações de Utilizador</h1>
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 overflow-hidden shadow-sm">
        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-bold dark:text-white">Modo Escuro</p>
              <p className="text-sm text-slate-500">Alternar visualização para ambientes com pouca luz.</p>
            </div>
            <button onClick={toggleTheme} className={`w-14 h-8 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-slate-200'}`}>
              <div className={`w-6 h-6 bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : ''}`}></div>
            </button>
          </div>
          <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-700 pt-6">
            <div>
              <p className="font-bold dark:text-white">Idioma do Sistema</p>
              <p className="text-sm text-slate-500">Alterar idioma global da plataforma.</p>
            </div>
            <button onClick={toggleLang} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-xl font-bold text-sm dark:text-white">Mudar para {lang === 'pt' ? 'Inglês' : 'Português'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const translations = {
  pt: {
    dashboard_student: "Painel do Aluno",
    dashboard_teacher: "Painel Docente",
    dashboard_guardian: "Portal do Encarregado",
    dashboard_director: "Direcção Geral",
    dashboard_admin: "Administração",
    my_grades: "Minhas Notas",
    guardian_grades: "Notas do Educando",
    my_attendance: "Minha Assiduidade",
    guardian_attendance: "Faltas do Educando",
    my_schedule: "Horário de Aulas",
    guardian_schedule: "Horário Escolar",
    my_resources: "Recursos Didácticos",
    guardian_resources: "Materiais de Apoio",
    my_history: "Histórico Escolar",
    guardian_history: "Percurso Académico",
    grading_sheet: "Pauta de Avaliação",
    teacher_schedule: "Horário Docente",
    content_mgmt: "Gestão de Conteúdos",
    academic_analysis: "Análise Estatística",
    pedagogic_control: "Controlo Pedagógico",
    enrollment_mgmt: "Gestão de Alunos",
    inst_structure: "Estrutura Escolar",
    mgmt_maps: "Mapas de Gestão",
    security_logs: "Registos de Auditoria",
    access_accounts: "Contas de Acesso",
    visual_id: "Identidade Visual",
    sys_audit: "Auditoria do Sistema",
    communication: "Comunicação",
    config: "Configurações",
    logout: "Sair do Sistema",
    welcome: "Bem-vindo",
    search: "Pesquisar...",
    login_btn: "LOGIN",
    login_title: "Acesso ao Sistema",
    login_subtitle: "Insira as suas credenciais para aceder ao Intra IMEL.",
    process_number: "Número de Processo",
    password: "Palavra-passe",
    forgot_password: "Esqueci a minha senha",
    create_account: "Não tem conta? Criar conta",
    start_now: "Aceder à Plataforma",
    features: "Funcionalidades",
    location: "Localização",
    find_us: "Onde Estamos",
    demo: "Visão Geral",
    contact_form_title: "Contacte-nos",
    contact_form_subtitle: "Para questões técnicas ou administrativas, envie-nos uma mensagem.",
    name_label: "Nome Completo",
    email_label: "Endereço de E-mail",
    message_label: "Assunto / Mensagem",
    send_message_btn: "ENVIAR MENSAGEM",
    advantages_title: "Vantagens do Intra IMEL",
    why_use_title: "Porquê utilizar o sistema?",
    advantage_1: "Centralização de Dados",
    advantage_2: "Comunicação Directa",
    advantage_3: "Monitoramento em Tempo Real",
    why_text: "O Intra IMEL foi desenvolvido para modernizar a gestão escolar do IMEL, promovendo a transparência e eficiência entre alunos, encarregados, professores e direcção. Com uma interface profissional e intuitiva, garantimos que todas as informações académicas estejam à distância de um clique."
  }
};

interface SettingsContextType {
  theme: 'light' | 'dark';
  lang: 'pt' | 'en';
  toggleTheme: () => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);
export const useSettings = () => useContext(SettingsContext)!;

interface SystemAdminContextType {
  settings: SystemSettings;
  updateSettings: (newSettings: Partial<SystemSettings>) => void;
}

const SystemAdminContext = createContext<SystemAdminContextType | undefined>(undefined);
export const useSystemAdmin = () => useContext(SystemAdminContext)!;

interface DatabaseContextType {
  users: User[];
  grades: Grade[];
  schedules: ClassSchedule[];
  library: LibraryResource[];
  messages: Message[];
  auditLogs: AuditLog[];
  updateGrade: (id: string, updates: Partial<Grade>, updatedBy: string) => void;
  addUser: (user: Omit<User, 'id'>, createdBy: string) => void;
  updateUser: (id: string, updates: Partial<User>, updatedBy: string) => void;
  deleteUser: (id: string, deletedBy: string) => void;
  sendMessage: (to: string, content: string) => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);
export const useDatabase = () => useContext(DatabaseContext)!;

const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => JSON.parse(localStorage.getItem('imel_db_users') || JSON.stringify(TEST_USERS)));
  const [grades, setGrades] = useState<Grade[]>(() => JSON.parse(localStorage.getItem('imel_db_grades') || JSON.stringify(MOCK_GRADES)));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => JSON.parse(localStorage.getItem('imel_db_logs') || '[]'));
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
    localStorage.setItem('imel_db_logs', JSON.stringify(auditLogs));
  }, [users, grades, auditLogs]);

  const addLog = (user: string, action: string, target: string, details: string) => {
    const newLog: AuditLog = {
      id: Date.now().toString(),
      user, action, target, details,
      timestamp: new Date().toLocaleString()
    };
    setAuditLogs(prev => [newLog, ...prev].slice(0, 100));
  };

  const updateGrade = (id: string, updates: Partial<Grade>, updatedBy: string) => {
    setGrades(prev => prev.map(g => {
      if (g.id === id) {
        const updated = { ...g, ...updates, updatedAt: new Date().toLocaleDateString(), updatedBy };
        const mac = updated.mac ?? 0;
        const npp = updated.npp ?? 0;
        const npt = updated.npt ?? 0;
        updated.average = Number(((mac + npp + npt) / 3).toFixed(1));
        addLog(updatedBy, 'ALTEROU_NOTA', updated.studentName, `Nota de ${updated.subject} alterada.`);
        return updated;
      }
      return g;
    }));
  };

  const addUser = (userData: Omit<User, 'id'>, createdBy: string) => {
    const newUser: User = { ...userData, id: Date.now().toString() };
    setUsers(prev => [...prev, newUser]);
    addLog(createdBy, 'CRIOU_USUARIO', newUser.name, `Usuário ${newUser.role} adicionado.`);
  };

  const updateUser = (id: string, updates: Partial<User>, updatedBy: string) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
    const target = users.find(u => u.id === id)?.name || 'Desconhecido';
    addLog(updatedBy, 'EDITOU_USUARIO', target, `Perfil de usuário atualizado.`);
  };

  const deleteUser = (id: string, deletedBy: string) => {
    const target = users.find(u => u.id === id)?.name || 'Desconhecido';
    setUsers(prev => prev.filter(u => u.id !== id));
    addLog(deletedBy, 'REMOVEU_USUARIO', target, `Usuário removido permanentemente.`);
  };
  
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
    <DatabaseContext.Provider value={{ users, grades, schedules, library, messages, auditLogs, updateGrade, addUser, updateUser, deleteUser, sendMessage }}>
      {children}
    </DatabaseContext.Provider>
  );
};

// --- Auth Context ---
interface AuthContextType {
  user: User | null;
  activeStudent: User | null;
  setActiveStudentId: (id: string) => void;
  login: (process: string, pass: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => useContext(AuthContext)!;

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [activeStudentId, setActiveStudentId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { users } = useDatabase();

  useEffect(() => {
    const saved = localStorage.getItem('imel_user');
    if (saved) {
      const parsedUser = JSON.parse(saved);
      setUser(parsedUser);
      if (parsedUser.role === UserRole.ENCARREGADO && parsedUser.studentIds?.length > 0) {
        setActiveStudentId(parsedUser.studentIds[0]);
      } else if (parsedUser.role === UserRole.ALUNO) {
        setActiveStudentId(parsedUser.id);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (process: string, pass: string) => {
    const found = users.find((u: any) => u.processNumber === process);
    if (found) {
      setUser(found);
      localStorage.setItem('imel_user', JSON.stringify(found));
      if (found.role === UserRole.ENCARREGADO && found.studentIds?.length > 0) {
        setActiveStudentId(found.studentIds[0]);
      } else if (found.role === UserRole.ALUNO) {
        setActiveStudentId(found.id);
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setActiveStudentId(null);
    localStorage.removeItem('imel_user');
  };

  const activeStudent = useMemo(() => {
    if (!activeStudentId) return null;
    return users.find(u => u.id === activeStudentId) || null;
  }, [activeStudentId, users]);

  return <AuthContext.Provider value={{ user, activeStudent, setActiveStudentId, login, logout, isLoading }}>{children}</AuthContext.Provider>;
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
  const t = (key: string) => (translations['pt'] as any)[key] || key;

  return <SettingsContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>{children}</SettingsContext.Provider>;
};

const SystemAdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('imel_system_settings');
    if (saved) return JSON.parse(saved);
    return {
      schoolName: 'Instituto Médio de Economia de Luanda',
      schoolAcronym: 'Intra IMEL',
      primaryColor: DEFAULT_PRIMARY_COLOR,
      secondaryColor: DEFAULT_SECONDARY_COLOR,
      version: '2.5.0'
    };
  });

  useEffect(() => {
    localStorage.setItem('imel_system_settings', JSON.stringify(settings));
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
    document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor);
  }, [settings]);

  const updateSettings = (newSettings: Partial<SystemSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SystemAdminContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SystemAdminContext.Provider>
  );
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
            <Route path="/frequencia" element={<AttendancePage />} />
            <Route path="/gestao-notas" element={<GradingPage />} />
            <Route path="/horario" element={<SchedulePage />} />
            <Route path="/biblioteca" element={<LibraryPage />} />
            <Route path="/mensagens" element={<MessagesPage />} />
            <Route path="/historico" element={<HistoryPage />} />
            <Route path="/stats" element={<AcademicStatsPage />} />
            <Route path="/direcao/professores" element={<TeacherMonitoringPage />} />
            <Route path="/direcao/alunos" element={<UserManagementPage mode="alunos" />} />
            <Route path="/direcao/auditoria" element={<AuditLogsPage />} />
            <Route path="/direcao/institucional" element={<InstitutionalPage />} />
            <Route path="/config" element={<SettingsPage />} />
            <Route path="/admin/usuarios" element={<UserManagementPage />} />
            <Route path="/admin/branding" element={<BrandingPage />} />
            <Route path="/termos" element={<TermsPage />} />
            <Route path="/privacidade" element={<PrivacyPage />} />
            <Route path="/suporte" element={<SupportPage />} />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => (
  <SystemAdminProvider>
    <SettingsProvider>
      <DatabaseProvider>
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/registrar" element={<CreateAccountPage />} />
              <Route path="/termos" element={<TermsPage />} />
              <Route path="/privacidade" element={<PrivacyPage />} />
              <Route path="/suporte" element={<SupportPage />} />
              <Route path="/*" element={<AppShell />} />
            </Routes>
          </Router>
        </AuthProvider>
      </DatabaseProvider>
    </SettingsProvider>
  </SystemAdminProvider>
);

export default App;
