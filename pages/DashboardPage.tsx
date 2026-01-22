
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Users, GraduationCap, TrendingUp, AlertCircle, CheckCircle2, 
  Target, Activity, Globe, Clipboard, User as UserIcon, Calendar, Clock, Briefcase,
  ShieldCheck, Zap, Server, Database, Key
} from 'lucide-react';
import { useAuth, useSettings, useSystemAdmin, useDatabase } from '../App';
import { UserRole } from '../types';

const StatCard: React.FC<{ icon: any, label: string, value: string, trend?: string, color: string }> = ({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 transition-all hover:shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl`} style={{ backgroundColor: `${color}15`, color: color }}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className={`text-xs font-bold ${trend.startsWith('+') || trend === 'Estável' ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50'} px-2 py-1 rounded-full`}>
          {trend}
        </span>
      )}
    </div>
    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{label}</p>
    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{value}</h3>
  </div>
);

const DashboardPage: React.FC = () => {
  const { user, activeStudent, setActiveStudentId } = useAuth();
  const { theme, t } = useSettings();
  const { settings } = useSystemAdmin();
  const { grades, users, auditLogs } = useDatabase();

  const isDiretor = user?.role === UserRole.DIRETOR;
  const isAdmin = user?.role === UserRole.ADMIN;
  const isEncarregado = user?.role === UserRole.ENCARREGADO;
  const isProfessor = user?.role === UserRole.PROFESSOR;
  const isAluno = user?.role === UserRole.ALUNO;
  
  const currentGrades = grades.filter(g => g.studentId === activeStudent?.id);
  const avgGrade = currentGrades.length > 0 
    ? (currentGrades.reduce((acc, g) => acc + (g.t1.average || 0), 0) / currentGrades.length).toFixed(1)
    : '0.0';
  const totalFaltas = currentGrades.reduce((acc, g) => acc + g.faltas, 0);

  const renderDirectorKPIs = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade">
      <StatCard icon={Users} label="Alunos Ativos" value="2.450" trend="+12%" color={settings.primaryColor} />
      <StatCard icon={CheckCircle2} label="Taxa Aprovação" value="88.4%" trend="+4.2%" color="#10b981" />
      <StatCard icon={Activity} label="Frequência Geral" value="94.2%" trend="-0.5%" color="#6366f1" />
      <StatCard icon={AlertCircle} label="Alunos em Risco" value="154" trend="+15" color="#ef4444" />
    </div>
  );

  const renderAdminKPIs = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade">
      <StatCard icon={Server} label="Uptime Sistema" value="99.9%" color="#10b981" />
      <StatCard icon={Key} label="Contas Ativas" value={users.length.toString()} color={settings.primaryColor} />
      <StatCard icon={Database} label="Backup" value="Sincronizado" color="#6366f1" />
      <StatCard icon={ShieldCheck} label="Logs Hoje" value={auditLogs.length.toString()} color="#f59e0b" />
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            {isDiretor ? 'Gabinete Estratégico' : isAdmin ? 'Consola de Gestão' : isEncarregado ? 'Portal do Encarregado' : `${t('welcome')}, ${user?.name}`}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {isDiretor ? 'Monitoramento institucional e análise de indicadores pedagógicos.' : 
             isAdmin ? 'Administração de infraestrutura e contas de acesso.' :
             isEncarregado ? `Acompanhando o progresso de seus educandos no ${settings.schoolAcronym}.` : 
             'Bem-vindo ao seu espaço de trabalho digital.'}
          </p>
        </div>

        {isEncarregado && user?.studentIds && user.studentIds.length > 1 && (
          <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <span className="text-[10px] font-black text-slate-400 px-3 uppercase">Meus Educandos:</span>
            {user.studentIds.map(sid => {
              const s = users.find(u => u.id === sid);
              const isActive = activeStudent?.id === sid;
              return (
                <button 
                  key={sid}
                  onClick={() => setActiveStudentId(sid)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${isActive ? 'bg-primary text-white shadow-lg' : 'hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-500'}`}
                >
                  {s?.name.split(' ')[0]}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {isDiretor && renderDirectorKPIs()}
      {isAdmin && renderAdminKPIs()}
      {isEncarregado && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade">
          <StatCard icon={TrendingUp} label="Média Atual" value={avgGrade} color={settings.primaryColor} />
          <StatCard icon={CheckCircle2} label="Frequência" value="96%" trend="Estável" color="#10b981" />
          <StatCard icon={Clock} label="Faltas Totais" value={totalFaltas.toString()} color="#ef4444" />
          <StatCard icon={Calendar} label="Provas Marcadas" value="2" color="#6366f1" />
        </div>
      )}
      {isAluno && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade">
          <StatCard icon={TrendingUp} label="Minha Média" value={avgGrade} color={settings.primaryColor} />
          <StatCard icon={CheckCircle2} label="Presença" value="98%" trend="+2%" color="#10b981" />
          <StatCard icon={Calendar} label="Horas de Estudo" value="45h" color="#6366f1" />
          <StatCard icon={AlertCircle} label="Tarefas" value="3" color="#f59e0b" />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isDiretor ? 'Comparativo de Aproveitamento por Classe' : isAdmin ? 'Volume de Dados do Servidor' : `Evolução Académica`}
              </h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {isDiretor ? (
                   <BarChart data={[
                     { name: '10ª', val: 78 }, { name: '11ª', val: 84 }, { name: '12ª', val: 91 }, { name: '13ª', val: 87 }
                   ]}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#f1f5f9'} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} />
                     <YAxis axisLine={false} tickLine={false} />
                     <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '16px', border: 'none' }} />
                     <Bar dataKey="val" fill={settings.primaryColor} radius={[10, 10, 0, 0]} />
                   </BarChart>
                ) : (
                  <AreaChart data={[
                    { name: 'Jan', val: 75 }, { name: 'Fev', val: 82 }, { name: 'Mar', val: 80 }, { name: 'Abr', val: 88 }, { name: 'Mai', val: 92 }
                  ]}>
                    <defs>
                      <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={settings.primaryColor} stopOpacity={0.1}/>
                        <stop offset="95%" stopColor={settings.primaryColor} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#f1f5f9'} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip contentStyle={{ borderRadius: '16px', border: 'none' }} />
                    <Area type="monotone" dataKey="val" stroke={settings.primaryColor} strokeWidth={3} fillOpacity={1} fill="url(#grad)" />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {(isDiretor || isAdmin) && (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Logs Recentes de Auditoria</h3>
              <div className="space-y-4">
                {auditLogs.slice(0, 5).map(log => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-transparent hover:border-primary transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black">
                        {log.user.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{log.user}</p>
                        <p className="text-xs text-slate-500">{log.action}: {log.target}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
                  </div>
                ))}
                {auditLogs.length === 0 && <p className="text-center py-4 text-slate-400 italic">Nenhuma atividade registrada.</p>}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-primary p-8 rounded-[2.5rem] shadow-xl text-white">
            <h3 className="text-xl font-bold mb-6">Próximos Marcos</h3>
            <div className="space-y-4">
              <div className="p-4 bg-white/10 rounded-2xl">
                <p className="text-xs opacity-60 uppercase font-black mb-1">Final do Trimestre</p>
                <p className="font-bold">25 de Julho, 2024</p>
              </div>
              <div className="p-4 bg-white/10 rounded-2xl">
                <p className="text-xs opacity-60 uppercase font-black mb-1">Início das Matrículas</p>
                <p className="font-bold">05 de Agosto, 2024</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Recursos Rápidos</h3>
            <div className="grid grid-cols-2 gap-3">
               <button className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl flex flex-col items-center gap-2 hover:bg-primary hover:text-white transition-all group">
                 <Clipboard size={20} className="text-primary group-hover:text-white"/>
                 <span className="text-[10px] font-black uppercase">Relatórios</span>
               </button>
               <button className="p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl flex flex-col items-center gap-2 hover:bg-primary hover:text-white transition-all group">
                 <ShieldCheck size={20} className="text-primary group-hover:text-white"/>
                 <span className="text-[10px] font-black uppercase">Segurança</span>
               </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
