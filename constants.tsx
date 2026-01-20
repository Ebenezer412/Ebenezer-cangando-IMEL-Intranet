
import { 
  LayoutDashboard, 
  Users, 
  ClipboardList, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  Library,
  History,
  Palette,
  Eye,
  Activity,
  Briefcase,
  FileBarChart,
  BookMarked,
  Clock,
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import { UserRole, SidebarItem, Grade, ClassSchedule, User } from './types';

export const DEFAULT_PRIMARY_COLOR = '#003366'; 
export const DEFAULT_SECONDARY_COLOR = '#FFD700'; 

export const TEST_USERS: User[] = [
  { id: '1', name: 'João Manuel', processNumber: '2024001', role: UserRole.ALUNO, turma: '12A' },
  { id: '10', name: 'Ana Manuel', processNumber: '2024010', role: UserRole.ALUNO, turma: '10C' },
  { id: '2', name: 'Carlos Mendes', processNumber: '300100', role: UserRole.PROFESSOR },
  { id: '3', name: 'Admin do Sistema', processNumber: '999000', role: UserRole.ADMIN },
  { id: '4', name: 'Dr. Augusto Feliciano', processNumber: '888000', role: UserRole.DIRETOR },
  { id: '5', name: 'Pedro João', processNumber: '777000', role: UserRole.ENCARREGADO, studentIds: ['1', '10'] },
];

export const SIDEBAR_LINKS: SidebarItem[] = [
  // --- DASHBOARDS ESPECÍFICOS ---
  { icon: LayoutDashboard, label: 'Painel do Aluno', path: '/dashboard', roles: [UserRole.ALUNO] },
  { icon: LayoutDashboard, label: 'Painel Docente', path: '/dashboard', roles: [UserRole.PROFESSOR] },
  { icon: LayoutDashboard, label: 'Portal do Encarregado', path: '/dashboard', roles: [UserRole.ENCARREGADO] },
  { icon: LayoutDashboard, label: 'Direcção Geral', path: '/dashboard', roles: [UserRole.DIRETOR] },
  { icon: LayoutDashboard, label: 'Administração', path: '/dashboard', roles: [UserRole.ADMIN] },
  
  // --- ALUNO / ENCARREGADO ---
  { icon: FileText, label: 'Minhas Notas', path: '/notas', roles: [UserRole.ALUNO] },
  { icon: FileText, label: 'Notas do Educando', path: '/notas', roles: [UserRole.ENCARREGADO] },
  { icon: Clock, label: 'Minha Assiduidade', path: '/frequencia', roles: [UserRole.ALUNO] },
  { icon: Clock, label: 'Faltas do Educando', path: '/frequencia', roles: [UserRole.ENCARREGADO] },
  { icon: Calendar, label: 'Horário de Aulas', path: '/horario', roles: [UserRole.ALUNO] },
  { icon: Calendar, label: 'Horário Escolar', path: '/horario', roles: [UserRole.ENCARREGADO] },
  { icon: BookOpen, label: 'Recursos Didácticos', path: '/biblioteca', roles: [UserRole.ALUNO] },
  { icon: BookOpen, label: 'Materiais de Apoio', path: '/biblioteca', roles: [UserRole.ENCARREGADO] },
  { icon: History, label: 'Histórico Escolar', path: '/historico', roles: [UserRole.ALUNO] },
  { icon: History, label: 'Percurso Académico', path: '/historico', roles: [UserRole.ENCARREGADO] },

  // --- PROFESSOR ---
  { icon: ClipboardList, label: 'Pauta de Avaliação', path: '/gestao-notas', roles: [UserRole.PROFESSOR] },
  { icon: Calendar, label: 'Horário Docente', path: '/horario', roles: [UserRole.PROFESSOR] },
  { icon: Library, label: 'Gestão de Conteúdos', path: '/biblioteca', roles: [UserRole.PROFESSOR] },
  
  // --- DIRETOR GERAL ---
  { icon: BarChart3, label: 'Análise Estatística', path: '/stats', roles: [UserRole.DIRETOR] },
  { icon: Briefcase, label: 'Controlo Pedagógico', path: '/direcao/professores', roles: [UserRole.DIRETOR] },
  { icon: Eye, label: 'Gestão de Alunos', path: '/direcao/alunos', roles: [UserRole.DIRETOR] },
  { icon: BookMarked, label: 'Estrutura Escolar', path: '/direcao/institucional', roles: [UserRole.DIRETOR] },
  { icon: FileBarChart, label: 'Mapas de Gestão', path: '/direcao/relatorios', roles: [UserRole.DIRETOR] },
  { icon: Activity, label: 'Registos de Auditoria', path: '/direcao/auditoria', roles: [UserRole.DIRETOR] },

  // --- ADMINISTRADOR ---
  { icon: Users, label: 'Contas de Acesso', path: '/admin/usuarios', roles: [UserRole.ADMIN] },
  { icon: Palette, label: 'Identidade Visual', path: '/admin/branding', roles: [UserRole.ADMIN] },
  { icon: Activity, label: 'Auditoria do Sistema', path: '/direcao/auditoria', roles: [UserRole.ADMIN] },

  // --- COMUM ---
  { icon: MessageSquare, label: 'Comunicação', path: '/mensagens', roles: Object.values(UserRole) },
  { icon: Settings, label: 'Configurações', path: '/config', roles: Object.values(UserRole) },
];

export const MOCK_GRADES: Grade[] = [
  { id: 'g0', studentId: '1', studentName: 'João Manuel', subject: 'Economia Política', mac: 14, npp: 13, npt: 15, average: 14, faltas: 2, updatedAt: '2024-05-20', updatedBy: 'Carlos Mendes' },
  { id: 'g1', studentId: '1', studentName: 'João Manuel', subject: 'Contabilidade Geral', mac: 16, npp: 17, npt: 15, average: 16, faltas: 0, updatedAt: '2024-05-21', updatedBy: 'Carlos Mendes' },
  { id: 'g4', studentId: '10', studentName: 'Ana Manuel', subject: 'Língua Portuguesa', mac: 18, npp: 17, npt: 19, average: 18, faltas: 0, updatedAt: '2024-05-19', updatedBy: 'Carlos Mendes' },
];

export const MOCK_SCHEDULE: ClassSchedule[] = [
  { id: 's0', day: 'Segunda', time: '07:30 - 09:00', subject: 'Economia Política', room: 'Sala 12', turma: '12A' },
  { id: 's1', day: 'Segunda', time: '09:15 - 10:45', subject: 'Contabilidade', room: 'Laboratório 2', turma: '12A' },
];
