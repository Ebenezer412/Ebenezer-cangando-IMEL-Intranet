
import React, { useState } from 'react';
import { useDatabase, useSettings, useAuth } from '../App';
import { Save, User as UserIcon, Check } from 'lucide-react';
import { UserRole } from '../types';

const GradingPage: React.FC = () => {
  const { user } = useAuth();
  const { grades, updateGrade } = useDatabase();
  const { t } = useSettings();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [tempGrade, setTempGrade] = useState({ mac: 0, npp: 0, npt: 0 });

  if (user?.role !== UserRole.PROFESSOR && user?.role !== UserRole.ADMIN) {
    return <div className="p-8 text-center text-red-500 font-bold">Acesso Negado.</div>;
  }

  const handleEdit = (g: any) => {
    setEditingId(g.id);
    setTempGrade({ mac: g.mac, npp: g.npp, npt: g.npt });
  };

  const handleSave = (id: string) => {
    updateGrade(id, tempGrade);
    setEditingId(null);
  };

  return (
    <div className="space-y-8 animate-fade">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Lançamento de Notas</h1>
        <p className="text-slate-500 dark:text-slate-400">Turma: 12ª B | Disciplina: Economia Política</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase">Aluno</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase text-center">MAC</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase text-center">NPP</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase text-center">NPT</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase text-center">Média</th>
                <th className="px-8 py-5 text-xs font-black text-slate-400 uppercase text-right">Acção</th>
              </tr>
            </thead>
            <tbody>
              {grades.map((g) => (
                <tr key={g.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-slate-50/50">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 text-[#003366] rounded-full flex items-center justify-center font-bold">S</div>
                      <span className="font-bold text-slate-700 dark:text-slate-200">Aluno ID: {g.studentId}</span>
                    </div>
                  </td>
                  {editingId === g.id ? (
                    <>
                      <td className="px-8 py-6 text-center">
                        <input type="number" value={tempGrade.mac} onChange={(e) => setTempGrade({...tempGrade, mac: Number(e.target.value)})} className="w-16 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-center font-bold" />
                      </td>
                      <td className="px-8 py-6 text-center">
                        <input type="number" value={tempGrade.npp} onChange={(e) => setTempGrade({...tempGrade, npp: Number(e.target.value)})} className="w-16 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-center font-bold" />
                      </td>
                      <td className="px-8 py-6 text-center">
                        <input type="number" value={tempGrade.npt} onChange={(e) => setTempGrade({...tempGrade, npt: Number(e.target.value)})} className="w-16 p-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-center font-bold" />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-8 py-6 text-center font-bold text-slate-600 dark:text-slate-400">{g.mac}</td>
                      <td className="px-8 py-6 text-center font-bold text-slate-600 dark:text-slate-400">{g.npp}</td>
                      <td className="px-8 py-6 text-center font-bold text-slate-600 dark:text-slate-400">{g.npt}</td>
                    </>
                  )}
                  <td className="px-8 py-6 text-center">
                    <span className="text-xl font-black text-[#003366] dark:text-[#FFD700]">{g.average}</span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    {editingId === g.id ? (
                      <button onClick={() => handleSave(g.id)} className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600">
                        <Check size={20} />
                      </button>
                    ) : (
                      <button onClick={() => handleEdit(g)} className="px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl font-bold hover:bg-slate-200">
                        Editar
                      </button>
                    )}
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

export default GradingPage;
