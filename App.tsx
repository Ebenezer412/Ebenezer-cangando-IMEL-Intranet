
import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { 
  HashRouter as Router, 
  Routes, 
  Route, 
  Navigate, 
  Link
} from 'react-router-dom';
import { User, UserRole, Grade, ClassSchedule, LibraryResource, Message, SystemSettings, AuditLog, Notification } from './types';
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
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import SupportPage from './pages/SupportPage';

// --- Contextos ---

interface DatabaseContextType {
  users: User[];
  grades: Grade[];
  schedules: ClassSchedule[];
  library: LibraryResource[];
  messages: Message[];
  auditLogs: AuditLog[];
  notifications: Notification[];
  updateGrade: (id: string, updates: Partial<Grade>, updatedBy: string) => void;
  addUser: (user: Omit<User, 'id'>, createdBy: string) => void;
  updateUser: (id: string, updates: Partial<User>, updatedBy: string) => void;
  deleteUser: (id: string, deletedBy: string) => void;
  sendMessage: (to: string, content: string) => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markNotificationRead: (id: string) => void;
  addLibraryResource: (resource: Omit<LibraryResource, 'id' | 'date'>) => void;
}

const DatabaseContext = createContext<DatabaseContextType | undefined>(undefined);
export const useDatabase = () => useContext(DatabaseContext)!;

const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => JSON.parse(localStorage.getItem('imel_db_users') || JSON.stringify(TEST_USERS)));
  const [grades, setGrades] = useState<Grade[]>(() => JSON.parse(localStorage.getItem('imel_db_grades') || JSON.stringify(MOCK_GRADES)));
  // Fixed: Added schedules state
  const [schedules, setSchedules] = useState<ClassSchedule[]>(() => JSON.parse(localStorage.getItem('imel_db_schedules') || JSON.stringify(MOCK_SCHEDULE)));
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => JSON.parse(localStorage.getItem('imel_db_logs') || '[]'));
  const [notifications, setNotifications] = useState<Notification[]>(() => JSON.parse(localStorage.getItem('imel_db_notifs') || '[]'));
  const [library, setLibrary] = useState<LibraryResource[]>(() => JSON.parse(localStorage.getItem('imel_db_library') || JSON.stringify([
    { id: 'l1', title: 'TLP: POO em C# - Exercícios 1º Trimestre', subject: 'TLP', author: 'Eng. Domingos Neto', authorId: '2', date: '2024-05-10', type: 'PDF', size: '1.2MB' },
    { id: 'l2', title: 'TRECE: Camadas OSI e TCP/IP', subject: 'TRECE', author: 'Eng. Domingos Neto', authorId: '2', date: '2024-06-01', type: 'PDF', size: '2.5MB' }
  ])));
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    localStorage.setItem('imel_db_users', JSON.stringify(users));
    localStorage.setItem('imel_db_grades', JSON.stringify(grades));
    // Fixed: Saving schedules to localStorage
    localStorage.setItem('imel_db_schedules', JSON.stringify(schedules));
    localStorage.setItem('imel_db_logs', JSON.stringify(auditLogs));
    localStorage.setItem('imel_db_notifs', JSON.stringify(notifications));
    localStorage.setItem('imel_db_library', JSON.stringify(library));
  }, [users, grades, schedules, auditLogs, notifications, library]);

  const addNotification = (notif: Omit<Notification, 'id' | 'timestamp' | 'read'>) => {
    const newNotif: Notification = {
      ...notif,
      id: Date.now().toString(),
      timestamp: new Date().toLocaleString(),
      read: false
    };
    setNotifications(prev => [newNotif, ...prev].slice(0, 20));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const addLibraryResource = (resource: Omit<LibraryResource, 'id' | 'date'>) => {
    const newRes: LibraryResource = {
      ...resource,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString()
    };
    setLibrary(prev => [newRes, ...prev]);
    addNotification({
      title: 'Novo Material Didático',
      message: `${resource.author} carregou "${resource.title}" para ${resource.subject}.`,
      type: 'announcement'
    });
  };

  const updateGrade = (id: string, updates: any, updatedBy: string) => {
    setGrades(prev => prev.map(g => {
      if (g.id === id) {
        const updated = { ...g, ...updates, updatedAt: new Date().toLocaleDateString(), updatedBy };
        // Lógica de recálculo simplificada para trimestres se necessário
        addNotification({
          title: 'Notas Atualizadas',
          message: `O professor ${updatedBy} atualizou as notas de ${updated.subject}.`,
          type: 'grade'
        });
        return updated;
      }
      return g;
    }));
  };

  // Funções administrativas...
  const addUser = (userData: Omit<User, 'id'>, createdBy: string) => setUsers(prev => [...prev, { ...userData, id: Date.now().toString() }]);
  const updateUser = (id: string, updates: Partial<User>, updatedBy: string) => setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  const deleteUser = (id: string, deletedBy: string) => setUsers(prev => prev.filter(u => u.id !== id));
  
  const sendMessage = (to: string, content: string) => {
    const user = JSON.parse(localStorage.getItem('imel_user') || '{}');
    const newMessage: Message = {
      id: Date.now().toString(), from: user.name || 'Sistema', to, content, timestamp: new Date().toLocaleTimeString(), read: false
    };
    setMessages(prev => [newMessage, ...prev]);
    addNotification({ title: 'Nova Mensagem', message: `Você recebeu uma mensagem de ${user.name}.`, type: 'message' });
  };

  return (
    <DatabaseContext.Provider value={{ 
      users, grades, schedules, library, messages, auditLogs, notifications, 
      updateGrade, addUser, updateUser, deleteUser, sendMessage, 
      addNotification, markNotificationRead, addLibraryResource 
    }}>
      {children}
    </DatabaseContext.Provider>
  );
};

// --- Outros Contextos (Settings, Auth, SystemAdmin) mantidos como antes ---

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
      if (parsedUser.role === UserRole.ENCARREGADO && parsedUser.studentIds?.length > 0) setActiveStudentId(parsedUser.studentIds[0]);
      else if (parsedUser.role === UserRole.ALUNO) setActiveStudentId(parsedUser.id);
    }
    setIsLoading(false);
  }, []);

  const login = async (process: string, pass: string) => {
    const found = users.find((u: any) => u.processNumber === process);
    if (found) {
      setUser(found);
      localStorage.setItem('imel_user', JSON.stringify(found));
      if (found.role === UserRole.ENCARREGADO && found.studentIds?.length > 0) setActiveStudentId(found.studentIds[0]);
      else if (found.role === UserRole.ALUNO) setActiveStudentId(found.id);
      return true;
    }
    return false;
  };

  const logout = () => { setUser(null); setActiveStudentId(null); localStorage.removeItem('imel_user'); };
  const activeStudent = useMemo(() => activeStudentId ? (users.find(u => u.id === activeStudentId) || null) : null, [activeStudentId, users]);

  return <AuthContext.Provider value={{ user, activeStudent, setActiveStudentId, login, logout, isLoading }}>{children}</AuthContext.Provider>;
};

const SettingsContext = createContext<any>(undefined);
export const useSettings = () => useContext(SettingsContext)!;
const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (localStorage.getItem('imel_theme') as any) || 'light');
  const [lang, setLang] = useState<'pt' | 'en'>(() => (localStorage.getItem('imel_lang') as any) || 'pt');
  useEffect(() => { document.documentElement.classList.toggle('dark', theme === 'dark'); localStorage.setItem('imel_theme', theme); }, [theme]);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');
  const toggleLang = () => setLang(prev => prev === 'pt' ? 'en' : 'pt');
  const t = (key: string) => (translations['pt'] as any)[key] || key;
  return <SettingsContext.Provider value={{ theme, lang, toggleTheme, toggleLang, t }}>{children}</SettingsContext.Provider>;
};

const SystemAdminContext = createContext<any>(undefined);
export const useSystemAdmin = () => useContext(SystemAdminContext)!;
const SystemAdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SystemSettings>(() => {
    const saved = localStorage.getItem('imel_system_settings');
    if (saved) return JSON.parse(saved);
    return { schoolName: 'Instituto Médio de Economia de Luanda', schoolAcronym: 'Intra IMEL', primaryColor: DEFAULT_PRIMARY_COLOR, secondaryColor: DEFAULT_SECONDARY_COLOR, version: '2.5.0' };
  });
  useEffect(() => { localStorage.setItem('imel_system_settings', JSON.stringify(settings)); document.documentElement.style.setProperty('--primary-color', settings.primaryColor); document.documentElement.style.setProperty('--secondary-color', settings.secondaryColor); }, [settings]);
  return <SystemAdminContext.Provider value={{ settings, updateSettings: (n: any) => setSettings(p => ({ ...p, ...n })) }}>{children}</SystemAdminContext.Provider>;
};

// --- Páginas Adicionais (Histórico) ---

const HistoryPage = () => {
  const { activeStudent } = useAuth();
  const academicHistory = [
    { year: 2024, level: '12ª Classe (Inf. Gestão)', status: 'A decorrer', details: 'Frequência regular.', color: 'bg-blue-50 text-blue-600' },
    { year: 2023, level: '11ª Classe (Inf. Gestão)', status: 'Aprovado (2 Deficiências)', details: 'Cadeiras: TLP e Matemática.', color: 'bg-orange-50 text-orange-600' },
    { year: 2022, level: '10ª Classe (Inf. Gestão)', status: 'Aprovado', details: 'Aprovado em todas.', color: 'bg-emerald-50 text-emerald-600' }
  ];
  return (
    <div className="space-y-6 animate-fade">
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Percurso Académico {activeStudent?.name}</h1>
      <div className="grid gap-4">
        {academicHistory.map(item => (
          <div key={item.year} className="bg-white dark:bg-slate-800 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row justify-between items-center group gap-4">
            <div className="flex items-center gap-6">
              <div className="text-center bg-slate-50 dark:bg-slate-900 p-4 rounded-2xl min-w-[100px]">
                <p className="text-[10px] font-black text-slate-400 uppercase">Ano</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">{item.year}</p>
              </div>
              <div><p className="font-black text-lg text-slate-800 dark:text-white">{item.level}</p><p className="text-sm text-slate-500">{item.details}</p></div>
            </div>
            <span className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${item.color}`}>{item.status}</span>
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
      <h1 className="text-3xl font-black text-slate-900 dark:text-white">Configurações</h1>
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700 p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div><p className="font-bold dark:text-white">Modo Escuro</p><p className="text-sm text-slate-500">Alternar visualização.</p></div>
          <button onClick={toggleTheme} className={`w-14 h-8 rounded-full p-1 transition-colors ${theme === 'dark' ? 'bg-primary' : 'bg-slate-200'}`}><div className={`w-6 h-6 bg-white rounded-full transition-transform ${theme === 'dark' ? 'translate-x-6' : ''}`}></div></button>
        </div>
        <div className="flex items-center justify-between border-t border-slate-50 dark:border-slate-700 pt-6">
          <div><p className="font-bold dark:text-white">Notificações Académicas</p><p className="text-sm text-slate-500">Receber alertas de novas notas.</p></div>
          <button className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-xl font-bold text-xs uppercase">Ativado</button>
        </div>
      </div>
    </div>
  );
};

// --- App Principal ---

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

export const translations = {
  pt: {
    dashboard_student: "Painel do Aluno", dashboard_teacher: "Painel Docente", dashboard_guardian: "Portal do Encarregado", dashboard_director: "Direcção Geral", dashboard_admin: "Administração", my_grades: "Minhas Notas", guardian_grades: "Notas do Educando", my_attendance: "Minha Assiduidade", guardian_attendance: "Faltas do Educando", my_schedule: "Horário de Aulas", guardian_schedule: "Horário Escolar", my_resources: "Recursos Didácticos", guardian_resources: "Materiais de Apoio", my_history: "Histórico Escolar", guardian_history: "Percurso Académico", grading_sheet: "Pauta de Avaliação", teacher_schedule: "Horário Docente", content_mgmt: "Gestão de Conteúdos", academic_analysis: "Análise Estatística", pedagogic_control: "Controlo Pedagógico", enrollment_mgmt: "Gestão de Alunos", inst_structure: "Estrutura Escolar", mgmt_maps: "Mapas de Gestão", security_logs: "Registos de Auditoria", access_accounts: "Contas de Acesso", visual_id: "Identidade Visual", sys_audit: "Auditoria do Sistema", communication: "Comunicação", config: "Configurações", logout: "Sair do Sistema", welcome: "Bem-vindo", search: "Pesquisar...", login_btn: "LOGIN", login_title: "Acesso ao Sistema", login_subtitle: "Insira as suas credenciais para aceder ao Intra IMEL.", process_number: "Número de Processo", password: "Palavra-passe", forgot_password: "Esqueci a minha senha", create_account: "Não tem conta? Criar conta", start_now: "Aceder à Plataforma", features: "Funcionalidades", location: "Localização", find_us: "Onde Estamos", demo: "Visão Geral", contact_form_title: "Contacte-nos", contact_form_subtitle: "Para questões técnicas ou administrativas, envie-nos uma mensagem.", name_label: "Nome Completo", email_label: "Endereço de E-mail", message_label: "Assunto / Mensagem", send_message_btn: "ENVIAR MENSAGEM", advantages_title: "Vantagens do Intra IMEL", why_use_title: "Porquê utilizar o sistema?", advantage_1: "Centralização de Dados", advantage_2: "Comunicação Directa", advantage_3: "Monitoramento em Tempo Real", why_text: "O Intra IMEL foi desenvolvido para modernizar a gestão escolar do IMEL, promovendo a transparência e eficiência entre alunos, encarregados, professores e direcção."
  }
};
