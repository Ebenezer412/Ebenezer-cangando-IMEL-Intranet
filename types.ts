
export enum UserRole {
  ALUNO = 'Aluno',
  PROFESSOR = 'Professor',
  ADMIN = 'Administrador',
  DIRETOR = 'Diretor',
  ENCARREGADO = 'Encarregado'
}

export interface User {
  id: string;
  name: string;
  processNumber: string;
  role: UserRole;
  email?: string;
  avatar?: string;
  turma?: string;
  studentIds?: string[]; // IDs dos educandos associados (para Encarregados)
}

export interface Grade {
  id: string;
  studentId: string;
  studentName: string; 
  subject: string;
  mac: number;
  npp: number;
  npt: number;
  average: number;
  faltas: number;
  updatedBy?: string;
  updatedAt?: string;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  details: string;
}

export interface ClassSchedule {
  id: string;
  day: string;
  time: string;
  subject: string;
  room: string;
  turma: string;
}

export interface LibraryResource {
  id: string;
  title: string;
  subject: string;
  type: 'PDF' | 'DOC' | 'VIDEO';
  author: string;
  date: string;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface SidebarItem {
  icon: any;
  label: string;
  path: string;
  roles: UserRole[];
}

export interface SystemSettings {
  schoolName: string;
  schoolAcronym: string;
  primaryColor: string;
  secondaryColor: string;
  version: string;
}
