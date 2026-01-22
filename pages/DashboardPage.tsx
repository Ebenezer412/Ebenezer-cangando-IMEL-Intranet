import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { 
  Users, GraduationCap, TrendingUp, AlertCircle, CheckCircle2, 
  Target, Activity, Globe, Clipboard, User as UserIcon, Calendar, Clock, Briefcase,
  ShieldCheck, Zap, Server, Database, Key, Sparkles, FileText, Send, BrainCircuit,
  MessageSquare
} from 'lucide-react';
import { useAuth, useSettings, useSystemAdmin, useDatabase } from '../App';
import { UserRole, AIInsight } from '../types';
import { GoogleGenAI } from "@google/genai";

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
  
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

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

  // Gemini logic following SDK guidelines
  const generateAIInsight = async () => {
    setIsAiLoading(true);
    try {
      // Create a new GoogleGenAI instance right before making an API call to ensure it always uses the most up-to-date API key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const context = isDiretor 
        ? "Análise estratégica global: 2450 alunos, 88% aprovação, 154 alunos em risco."
        : isProfessor 
        ? "Análise de turma: Alunos com dificuldade em TLP e Redes."
        : `Aluno: ${activeStudent?.name}, Média: ${avgGrade}, Faltas: ${totalFaltas}.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Como um consultor pedagógico do IMEL, analise estes dados e forneça um insight de UMA frase curta e encorajadora ou de alerta. Dados: ${context}. Responda em formato JSON: {"content": "Sua frase aqui", "severity": "low/medium/high", "title": "Insight IMEL"}`
      });

      // Directly access .text property as per guidelines
      const data = JSON.parse(response.text || '{}');
      setAiInsight(data);
    } catch (error) {
      console.error("AI Error:", error);
      setAiInsight({
        title: "Relatório de IA",
        content: isDiretor ? "O índice de aprovação na 12ª classe subiu 4.2% este mês." : "Foco em reforçar os conceitos de Programação no 2º trimestre.",
        severity: "medium"
      });
    } finally {
      setIsAiLoading(false);
    }
  };

  useEffect(() => {
    generateAIInsight();
  }, [user, activeStudent]);

  const renderDirectorKPIs = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade">
      <StatCard icon={Users} label="Matrículas Ativas" value="2.450" trend="+12%" color={settings.primaryColor} />
      <StatCard icon={CheckCircle2} label="Taxa Aprovação" value="88.4%" trend="+4.2%" color="#10b981" />
      <StatCard icon={Activity} label="Índice Pedagógico" value="94.2%" trend="-0.5%" color="#6366f1" />
      <StatCard icon={AlertCircle} label="Abandono Escolar" value="1.2%" trend="-0.2%" color="#ef4444" />
    </div>
  );

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-primary text-white rounded-[2rem] shadow-xl shadow-primary/20">
             {isDiretor ? <Globe size={32} /> : isAdmin ? <Zap size={32} /> : <GraduationCap size={32} />}
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
              {isDiretor ? 'Gabinete Estratégico' : isAdmin ? 'Consola de Gestão' : isEncarregado ? 'Portal do Encarregado' : `${t('welcome')}, ${user?.name}`}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              {isDiretor ? 'Monitoramento institucional e análise de indicadores.' : 
               isAdmin ? 'Administração de infraestrutura e serviços.' :
               'Acesso centralizado às suas informações académicas.'}
            </p>
          </div>
        </div>

        {aiInsight && (
          <div className={`p-4 rounded-[2rem] border-2 flex items-center gap-4 animate-fade max-w-sm shadow-sm transition-all hover:scale-105 ${
            aiInsight.severity === 'high' ? 'bg-red-50 border-red-100 text-red-700 dark:bg-red-900/10' : 
            aiInsight.severity === 'medium' ? 'bg-amber-50 border-amber-100 text-amber-700 dark:bg-amber-900/10' : 
            'bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-900/10'
          }`}>
            <div className={`p-2 rounded-xl ${isAiLoading ? 'animate-spin' : ''}`}>
              <BrainCircuit className="text-primary dark:text-secondary" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest opacity-60">AI Insights</p>
              <p className="text-xs font-black leading-tight">{aiInsight.content}</p>
            </div>
          </div>
        )}
      </div>

      {isDiretor && renderDirectorKPIs()}
      {isAdmin && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade">
          <StatCard icon={Server} label="Uptime Servidor" value="99.9%" color="#10b981" />
          <StatCard icon={Key} label="Contas de Acesso" value={users.length.toString()} color={settings.primaryColor} />
          <StatCard icon={Database} label="Backup SIG" value="Sincronizado" color="#6366f1" />
          <StatCard icon={ShieldCheck} label="Atividade Hoje" value={auditLogs.length.toString()} color="#f59e0b" />
        </div>
      )}
      {isAluno && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade">
          <StatCard icon={TrendingUp} label="Minha Média" value={avgGrade} color={settings.primaryColor} />
          <StatCard icon={CheckCircle2} label="Presença" value="98%" trend="+2%" color="#10b981" />
          <StatCard icon={Calendar} label="Provas Breves" value="3" color="#6366f1" />
          <StatCard icon={AlertCircle} label="Faltas" value={totalFaltas.toString()} color="#ef4444" />
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
             <div className="flex items-center justify-between mb-8">
               <h3 className="text-xl font-bold flex items-center gap-3">
                 <Activity className="text-primary" />
                 {isDiretor ? 'Distribuição de Aprovação por Curso' : 'Evolução de Médias Trimestrais'}
               </h3>
             </div>
             <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {isDiretor ? (
                    <BarChart data={[
                      { name: 'INF', val: 78 }, { name: 'CONT', val: 92 }, { name: 'ECON', val: 85 }, { name: 'GEST', val: 80 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#f1f5f9'} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Bar dataKey="val" fill={settings.primaryColor} radius={[10, 10, 0, 0]} />
                    </BarChart>
                  ) : (
                    <AreaChart data={[
                      { name: 'Jan', val: 75 }, { name: 'Fev', val: 82 }, { name: 'Mar', val: 80 }, { name: 'Abr', val: 88 }, { name: 'Mai', val: 92 }
                    ]}>
                      <defs>
                        <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={settings.primaryColor} stopOpacity={0.1}/>
                          <stop offset="95%" stopColor={settings.primaryColor} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme === 'dark' ? '#334155' : '#f1f5f9'} />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} />
                      <YAxis axisLine={false} tickLine={false} />
                      <Tooltip />
                      <Area type="monotone" dataKey="val" stroke={settings.primaryColor} fillOpacity={1} fill="url(#colorVal)" strokeWidth={4} />
                    </AreaChart>
                  )}
                </ResponsiveContainer>
             </div>
          </div>

          {(isDiretor || isAdmin) && (
            <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Auditoria Recente</h3>
              <div className="space-y-4">
                {auditLogs.slice(0, 3).map(log => (
                  <div key={log.id} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-slate-900/50 rounded-2xl border border-transparent hover:border-primary transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-primary shadow-sm">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-bold">{log.user}</p>
                        <p className="text-xs text-slate-500">{log.action}: {log.target}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-primary p-8 rounded-[2.5rem] text-white shadow-xl shadow-primary/20">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageSquare size={20} /> Gabinete Online
            </h3>
            <div className="space-y-3">
               <button className="w-full p-4 bg-white/10 rounded-2xl flex items-center justify-between hover:bg-white/20 transition-all border border-white/5">
                 <span className="text-xs font-black uppercase tracking-widest">Secretaria Académica</span>
                 <Send size={14} />
               </button>
               <button className="w-full p-4 bg-white/10 rounded-2xl flex items-center justify-between hover:bg-white/20 transition-all border border-white/5">
                 <span className="text-xs font-black uppercase tracking-widest">Apoio Técnico (TI)</span>
                 <Send size={14} />
               </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-700 shadow-sm text-center">
             <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText size={32} />
             </div>
             <h4 className="font-bold text-slate-800 dark:text-white mb-2 uppercase tracking-tight">Mapas Gerenciais</h4>
             <p className="text-[10px] text-slate-500 mb-6 uppercase tracking-widest font-black">Emissão de listagens oficiais</p>
             <button className="w-full py-4 bg-slate-50 dark:bg-slate-700 rounded-2xl font-black text-[11px] uppercase tracking-widest text-primary dark:text-secondary hover:bg-primary hover:text-white transition-all shadow-sm">Abrir Central de Relatórios</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;