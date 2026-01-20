
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  AreaChart,
  Area,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts';
import { 
  Users, 
  GraduationCap, 
  BookOpen, 
  Clock, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2,
  CalendarDays
} from 'lucide-react';
import { useAuth, useSettings } from '../App';
import { UserRole } from '../types';
import { MOCK_GRADES } from '../constants';

const StatCard: React.FC<{ icon: any, label: string, value: string, trend?: string, color: string }> = ({ icon: Icon, label, value, trend, color }) => (
  <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-2xl`} style={{ backgroundColor: `${color}15`, color: color }}>
        <Icon size={24} />
      </div>
      {trend && (
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
          {trend}
        </span>
      )}
    </div>
    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-1">{label}</p>
    <h3 className="text-2xl font-black text-slate-900 dark:text-white">{value}</h3>
  </div>
);

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { theme, t } = useSettings();

  const getDashboardData = () => {
    switch (user?.role) {
      case UserRole.ALUNO:
        return {
          stats: [
            { icon: TrendingUp, label: 'Média Geral', value: '14.5', trend: '+1.2', color: '#003366' },
            { icon: CheckCircle2, label: 'Frequência', value: '98%', trend: 'Estável', color: '#10b981' },
            { icon: BookOpen, label: 'Disciplinas', value: '12', color: '#6366f1' },
            { icon: Clock, label: 'Atrasos', value: '2', color: '#f59e0b' },
          ],
          title: t('academic_perf')
        };
      case UserRole.PROFESSOR:
        return {
          stats: [
            { icon: Users, label: 'Total de Alunos', value: '145', color: '#003366' },
            { icon: GraduationCap, label: 'Turmas Ativas', value: '4', color: '#10b981' },
            { icon: BookOpen, label: 'Disciplinas', value: '2', color: '#6366f1' },
            { icon: AlertCircle, label: 'Lançamentos Pendentes', value: '12', color: '#ef4444' },
          ],
          title: "Visão Geral das Minhas Turmas"
        };
      default:
        return {
          stats: [
            { icon: Users, label: 'Estudantes Ativos', value: '2,450', trend: '+12%', color: '#003366' },
            { icon: GraduationCap, label: 'Corpo Docente', value: '124', color: '#10b981' },
            { icon: TrendingUp, label: 'Taxa de Aprovação', value: '88%', trend: '+5%', color: '#6366f1' },
            { icon: AlertCircle, label: 'Vagas Disponíveis', value: '15', color: '#f59e0b' },
          ],
          title: t('institutional_summary')
        };
    }
  };

  const data = getDashboardData();
  const performanceData = MOCK_GRADES.map(g => ({ name: g.subject.substring(0, 10), grade: g.average }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white transition-colors">{t('welcome')}, {user?.name}!</h1>
          <p className="text-slate-500 dark:text-slate-400">Bem-vindo ao portal {user?.role}.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 font-medium shadow-sm transition-colors">
            <CalendarDays size={18} />
            {new Date().toLocaleDateString()}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((s, i) => (
          <StatCard key={i} {...s} />
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-8 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 transition-colors">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">{data.title}</h3>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorGrade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003366" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#003366" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#f1f5f9'} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                    backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                    color: theme === 'dark' ? '#ffffff' : '#000000'
                  }} 
                />
                <Area type="monotone" dataKey="grade" stroke="#003366" strokeWidth={3} fillOpacity={1} fill="url(#colorGrade)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#003366] p-8 rounded-[2rem] shadow-xl text-white relative overflow-hidden">
          <div className="relative z-10 h-full flex flex-col">
            <h3 className="text-xl font-bold mb-6">Agenda</h3>
            <div className="space-y-4 flex-1">
              {[
                { time: '07:30', title: 'Economia Política', room: 'S12' },
                { time: '10:45', title: 'Contabilidade II', room: 'LAB 1' },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white/10 rounded-2xl border border-white/5">
                  <div className="text-center">
                    <p className="text-xs font-bold text-white/60">Hora</p>
                    <p className="text-sm font-black">{item.time}</p>
                  </div>
                  <div className="flex-1 border-l border-white/10 pl-4">
                    <p className="font-bold text-sm leading-tight">{item.title}</p>
                    <p className="text-xs text-white/60 mt-1">{item.room}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
