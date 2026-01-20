
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { 
  Users, GraduationCap, TrendingUp, AlertCircle, CheckCircle2, 
  Target, Activity, Globe, Clipboard, User as UserIcon, Calendar, Clock, Briefcase
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
  const { grades, users } = useDatabase();

  const isDiretor = user?.role === UserRole.DIRETOR;
  const isEncarregado = user?.role === UserRole.ENCARREGADO;
  const isProfessor = user?.role === UserRole.PROFESSOR;
  const isAluno = user?.role === UserRole.ALUNO;
  
  const currentGrades = grades.filter(g => g.studentId === activeStudent?.id);
  const avgGrade = currentGrades.length > 0 
    ? (currentGrades.reduce((acc, g) => acc + g.average, 0) / currentGrades.length).toFixed(1)
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

  const renderEncarregadoStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade">
      <StatCard icon={TrendingUp} label="Média Atual" value={avgGrade} color={settings.primaryColor} />
      <StatCard icon={CheckCircle2} label="Frequência" value="96%" trend="Estável" color="#10b981" />
      <StatCard icon={Clock} label="Faltas Totais" value={totalFaltas.toString()} color="#ef4444" />
      <StatCard icon={Calendar} label="Provas Marcadas" value="2" color="#6366f1" />
    </div>
  );

  const renderProfessorStats = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade">
      <StatCard icon={Users} label="Total Alunos" value="145" color={settings.primaryColor} />
      <StatCard icon={GraduationCap} label="Minhas Turmas" value="4" color="#10b981" />
      <StatCard icon={Clipboard} label="Notas Pendentes" value="12" color="#ef4444" />
      <StatCard icon={Activity} label="Cumprimento Plano" value="92%" color="#6366f1" />
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header Personalizado */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            {isDiretor ? 'Painel de Direção Geral' : isEncarregado ? 'Portal do Encarregado' : `${t('welcome')}, ${user?.name}`}
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            {isDiretor ? 'Visão global estratégica e monitoramento institucional.' : 
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

      {/* Grid de Estatísticas por Perfil */}
      {isDiretor && renderDirectorKPIs()}
      {isEncarregado && renderEncarregadoStats()}
      {isProfessor && renderProfessorStats()}
      {isAluno && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade">
          <StatCard icon={TrendingUp} label="Minha Média" value={avgGrade} color={settings.primaryColor} />
          <StatCard icon={CheckCircle2} label="Presença" value="98%" trend="+2%" color="#10b981" />
          <StatCard icon={Calendar} label="Horas de Estudo" value="45h" color="#6366f1" />
          <StatCard icon={AlertCircle} label="Tarefas" value="3" color="#f59e0b" />
        </div>
      )}

      {/* Conteúdo Principal do Dashboard */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Gráfico (Direção vê tudo, Encarregado vê o filho) */}
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {isDiretor ? 'Desempenho por Nível de Ensino' : `Evolução de ${activeStudent?.name}`}
              </h3>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
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
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }} />
                  <Area type="monotone" dataKey="val" stroke={settings.primaryColor} strokeWidth={3} fillOpacity={1} fill="url(#grad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Seção Inferior Direção: Monitoramento Docente */}
          {isDiretor && (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Auditoria de Lançamentos Recentes</h3>
              <div className="space-y-4">
                {grades.slice(0, 3).map(g => (
                  <div key={g.id} className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-transparent hover:border-primary transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-primary/10 text-primary rounded-xl flex items-center justify-center font-black">
                        {g.updatedBy?.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold">{g.updatedBy}</p>
                        <p className="text-xs text-slate-400">Lançou nota de {g.subject} para {g.studentName}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{g.updatedAt}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Seção Inferior Encarregado: Avisos */}
          {isEncarregado && (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Comunicados Importantes</h3>
              <div className="space-y-4">
                <div className="p-5 bg-blue-50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800">
                  <p className="font-bold text-blue-800 dark:text-blue-300">Reunião de Pais e Mestres</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">Próximo sábado às 09:00 no auditório central.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar do Dashboard (Direita) */}
        <div className="space-y-8">
          {isDiretor ? (
            <div className="bg-primary p-8 rounded-[2.5rem] shadow-xl text-white">
              <h3 className="text-xl font-bold mb-6">Status da Instituição</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between text-xs mb-2"><span>Engajamento Docente</span><span className="font-bold">94%</span></div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-secondary" style={{ width: '94%' }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-2"><span>Uso da Biblioteca</span><span className="font-bold">65%</span></div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-secondary" style={{ width: '65%' }}></div></div>
                </div>
                <div className="pt-6">
                  <button className="w-full py-4 bg-white text-primary rounded-2xl font-bold shadow-lg hover:scale-105 transition-all">Exportar Relatório Geral</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm">
              <h3 className="text-xl font-bold mb-6">{isEncarregado ? 'Agenda do Educando' : 'Minha Agenda'}</h3>
              <div className="space-y-4">
                {[
                  { time: '07:30', title: 'Economia Política', room: 'S12' },
                  { time: '10:45', title: 'Contabilidade II', room: 'LAB 1' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-transparent hover:border-primary transition-all">
                    <div className="text-center">
                      <p className="text-[10px] font-black text-slate-400 uppercase">Hora</p>
                      <p className="text-sm font-black">{item.time}</p>
                    </div>
                    <div className="flex-1 border-l border-slate-200 dark:border-slate-700 pl-4">
                      <p className="font-bold text-sm leading-tight">{item.title}</p>
                      <p className="text-xs text-slate-400 mt-1">{item.room}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <button className="w-full py-4 bg-primary text-white rounded-2xl font-bold shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2">
                  <Calendar size={18}/> Ver Horário Completo
                </button>
              </div>
            </div>
          )}
          
          <div className="bg-secondary/10 p-8 rounded-[2.5rem] border border-secondary/20">
            <h4 className="font-bold text-primary flex items-center gap-2 mb-2"><AlertCircle size={18}/> Lembretes</h4>
            <p className="text-sm text-slate-600 dark:text-slate-400">Verifique os materiais de estudo carregados recentemente pelos professores.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
