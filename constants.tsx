
import React from 'react';
import { 
  LayoutDashboard, 
  GraduationCap, 
  BookOpen, 
  Users, 
  ClipboardList, 
  Calendar, 
  FileText, 
  MessageSquare, 
  Settings, 
  BarChart3, 
  ShieldCheck,
  Library,
  History,
  AlertCircle
} from 'lucide-react';
import { UserRole, SidebarItem, Grade, ClassSchedule, User } from './types';

export const PRIMARY_COLOR = '#003366'; // IMEL Blue
export const SECONDARY_COLOR = '#FFD700'; // IMEL Gold/Yellow

export const TEST_USERS: User[] = [
  { id: '1', name: 'João Manuel', processNumber: '2024001', role: UserRole.ALUNO },
  { id: '2', name: 'Carlos Mendes', processNumber: '300100', role: UserRole.PROFESSOR },
  { id: '3', name: 'Admin Geral', processNumber: '999000', role: UserRole.ADMIN },
  { id: '4', name: 'Maria Silva', processNumber: '888000', role: UserRole.DIRETOR },
  { id: '5', name: 'Pedro João', processNumber: '777000', role: UserRole.ENCARREGADO },
];

export const SIDEBAR_LINKS: SidebarItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard', roles: Object.values(UserRole) },
  
  // Aluno
  { icon: FileText, label: 'Minhas Notas', path: '/notas', roles: [UserRole.ALUNO] },
  { icon: Calendar, label: 'Horário Escolar', path: '/horario', roles: [UserRole.ALUNO, UserRole.PROFESSOR] },
  { icon: Library, label: 'Biblioteca Digital', path: '/biblioteca', roles: [UserRole.ALUNO, UserRole.PROFESSOR] },
  { icon: History, label: 'Histórico Académico', path: '/historico', roles: [UserRole.ALUNO] },

  // Professor
  { icon: Users, label: 'Gestão de Turmas', path: '/turmas', roles: [UserRole.PROFESSOR, UserRole.DIRETOR] },
  { icon: ClipboardList, label: 'Registo de Notas', path: '/gestao-notas', roles: [UserRole.PROFESSOR] },
  { icon: FileText, label: 'Materiais Didáticos', path: '/materiais', roles: [UserRole.PROFESSOR] },

  // Admin
  { icon: Users, label: 'Gestão de Usuários', path: '/admin/usuarios', roles: [UserRole.ADMIN] },
  { icon: ShieldCheck, label: 'Monitoramento', path: '/admin/logs', roles: [UserRole.ADMIN] },
  
  // Diretor
  { icon: BarChart3, label: 'Estatísticas', path: '/stats', roles: [UserRole.DIRETOR] },
  { icon: FileText, label: 'Relatórios Gerenciais', path: '/relatorios', roles: [UserRole.DIRETOR, UserRole.ADMIN] },

  // Comum
  { icon: MessageSquare, label: 'Mensagens', path: '/mensagens', roles: Object.values(UserRole) },
  { icon: Settings, label: 'Configurações', path: '/config', roles: Object.values(UserRole) },
];

// Added missing id and studentId to satisfy Grade interface
export const MOCK_GRADES: Grade[] = [
  { id: 'g0', studentId: '1', subject: 'Economia Política', mac: 14, npp: 13, npt: 15, average: 14 },
  { id: 'g1', studentId: '1', subject: 'Contabilidade Geral', mac: 16, npp: 17, npt: 15, average: 16 },
  { id: 'g2', studentId: '1', subject: 'Matemática Aplicada', mac: 12, npp: 11, npt: 13, average: 12 },
  { id: 'g3', studentId: '1', subject: 'Língua Portuguesa', mac: 15, npp: 14, npt: 16, average: 15 },
];

// Added missing id and turma to satisfy ClassSchedule interface
export const MOCK_SCHEDULE: ClassSchedule[] = [
  { id: 's0', day: 'Segunda', time: '07:30 - 09:00', subject: 'Economia Política', room: 'Sala 12', turma: '12A' },
  { id: 's1', day: 'Segunda', time: '09:15 - 10:45', subject: 'Contabilidade', room: 'Laboratório 2', turma: '12A' },
  { id: 's2', day: 'Terça', time: '07:30 - 09:00', subject: 'Informática', room: 'TI Hub', turma: '12A' },
];
