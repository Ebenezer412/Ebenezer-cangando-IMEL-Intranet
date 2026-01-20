
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
}

export interface Grade {
  id: string;
  studentId: string;
  subject: string;
  mac: number;
  npp: number;
  npt: number;
  average: number;
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

// Add SidebarItem interface for the sidebar navigation
export interface SidebarItem {
  icon: any;
  label: string;
  path: string;
  roles: UserRole[];
}
