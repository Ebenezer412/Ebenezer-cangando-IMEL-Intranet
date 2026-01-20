
import React from 'react';
import { useDatabase, useSettings } from '../App';
import { FileText, Download, TrendingUp, AlertCircle } from 'lucide-react';

const GradesPage: React.FC = () => {
  const { grades } = useDatabase();
  const { t } = useSettings();

  const getStatusColor = (avg: number) => {
    if (avg >= 14) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20';
    if (avg >= 10) return 'text-blue-600 bg-blue-50 dark:bg-blue-900/20';
    return 'text-red-600 bg-red-50 dark:bg-red-900/20';
  };

  return (
    <div className="space-y-8 animate-fade">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">{t('my_grades')}</h1>
          <p className="text-slate-500 dark:text-slate-400">Boletim individual do Ano Lectivo 2024.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#003366] text-white rounded-2xl font-bold hover:scale-105 transition-all shadow-lg">
          <Download size={20} /> Baixar PDF
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 rounded-2xl"><TrendingUp /></div>
            <p className="font-bold text-slate-800 dark:text-white">Média Global</p>
          </div>
          <p className="text-4xl font-black text-[#003366] dark:text-[#FFD700]">14.8</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
              <tr>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest">Disciplina</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">MAC</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">NPP</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">NPT</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Média</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {grades.map((g) => (
                <tr key={g.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/30 text-[#003366] dark:text-blue-300 rounded-xl flex items-center justify-center font-bold">
                        {g.subject.charAt(0)}
                      </div>
                      <span className="font-bold text-slate-800 dark:text-white">{g.subject}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center font-bold text-slate-600 dark:text-slate-400">{g.mac}</td>
                  <td className="px-8 py-6 text-center font-bold text-slate-600 dark:text-slate-400">{g.npp}</td>
                  <td className="px-8 py-6 text-center font-bold text-slate-600 dark:text-slate-400">{g.npt}</td>
                  <td className="px-8 py-6 text-center">
                    <span className="text-xl font-black text-[#003366] dark:text-[#FFD700]">{g.average}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${getStatusColor(g.average)}`}>
                      {g.average >= 10 ? 'Aprovado' : 'Reprovado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GradesPage;
