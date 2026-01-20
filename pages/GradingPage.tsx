
import React, { useState } from 'react';
import { useDatabase, useSettings, useAuth } from '../App';
import { Save, User as UserIcon, Check, X, AlertTriangle, ListChecks } from 'lucide-react';
import { UserRole, Grade } from '../types';

const GradingPage: React.FC = () => {
  const { user } = useAuth();
  const { grades, updateGrade } = useDatabase();
  const { t } = useSettings();
  
  // Estado para o formulário de edição/lançamento
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Grade>>({});

  if (user?.role !== UserRole.PROFESSOR && user?.role !== UserRole.ADMIN) {
    return (
      <div className="flex flex-col items-center justify-center h-96 space-y-4">
        <AlertTriangle size={64} className="text-red-500" />
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">Acesso Restrito</h2>
        <p className="text-slate-500">Apenas professores e administradores podem lançar notas.</p>
      </div>
    );
  }

  const startEditing = (g: Grade) => {
    setEditingId(g.id);
    setFormData({ ...g });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setFormData({});
  };

  const handleSave = () => {
    if (editingId && formData) {
      updateGrade(editingId, formData);
      setEditingId(null);
      setFormData({});
    }
  };

  const handleInputChange = (field: keyof Grade, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8 animate-fade">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <ListChecks className="text-[#003366] dark:text-[#FFD700]" />
            Lançamento de Notas e Faltas
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Turma: 12ª A | Disciplina: Economia Política</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-700">
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest">Aluno</th>
                <th className="px-6 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">MAC</th>
                <th className="px-6 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">NPP</th>
                <th className="px-6 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">NPT</th>
                <th className="px-6 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Faltas</th>
                <th className="px-6 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">Média</th>
                <th className="px-8 py-6 text-xs font-black text-slate-400 uppercase tracking-widest text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-700">
              {grades.map((g) => {
                const isEditing = editingId === g.id;
                return (
                  <tr key={g.id} className={`transition-colors ${isEditing ? 'bg-blue-50/30 dark:bg-blue-900/10' : 'hover:bg-slate-50/50 dark:hover:bg-slate-700/30'}`}>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 text-[#003366] dark:text-[#FFD700] rounded-full flex items-center justify-center font-bold">
                          {g.studentName.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-100">{g.studentName}</p>
                          <p className="text-xs text-slate-400">ID: {g.studentId}</p>
                        </div>
                      </div>
                    </td>

                    {/* Colunas de Entrada ou Visualização */}
                    <td className="px-6 py-6 text-center">
                      {isEditing ? (
                        <input 
                          type="number" 
                          max="20" min="0"
                          value={formData.mac ?? g.mac} 
                          onChange={(e) => handleInputChange('mac', Number(e.target.value))}
                          className="w-16 p-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 text-center font-bold outline-none focus:border-blue-500"
                        />
                      ) : (
                        <span className="font-bold text-slate-600 dark:text-slate-400">{g.mac}</span>
                      )}
                    </td>

                    <td className="px-6 py-6 text-center">
                      {isEditing ? (
                        <input 
                          type="number" 
                          max="20" min="0"
                          value={formData.npp ?? g.npp} 
                          onChange={(e) => handleInputChange('npp', Number(e.target.value))}
                          className="w-16 p-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 text-center font-bold outline-none focus:border-blue-500"
                        />
                      ) : (
                        <span className="font-bold text-slate-600 dark:text-slate-400">{g.npp}</span>
                      )}
                    </td>

                    <td className="px-6 py-6 text-center">
                      {isEditing ? (
                        <input 
                          type="number" 
                          max="20" min="0"
                          value={formData.npt ?? g.npt} 
                          onChange={(e) => handleInputChange('npt', Number(e.target.value))}
                          className="w-16 p-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-blue-200 dark:border-blue-800 text-center font-bold outline-none focus:border-blue-500"
                        />
                      ) : (
                        <span className="font-bold text-slate-600 dark:text-slate-400">{g.npt}</span>
                      )}
                    </td>

                    <td className="px-6 py-6 text-center">
                      {isEditing ? (
                        <input 
                          type="number" 
                          min="0"
                          value={formData.faltas ?? g.faltas} 
                          onChange={(e) => handleInputChange('faltas', Number(e.target.value))}
                          className="w-16 p-2 rounded-xl bg-white dark:bg-slate-900 border-2 border-orange-200 dark:border-orange-800 text-center font-bold outline-none focus:border-orange-500 text-orange-600"
                        />
                      ) : (
                        <span className={`font-black ${g.faltas > 4 ? 'text-red-500' : 'text-slate-500'}`}>{g.faltas}</span>
                      )}
                    </td>

                    <td className="px-6 py-6 text-center">
                      <span className={`text-xl font-black ${g.average >= 10 ? 'text-[#003366] dark:text-[#FFD700]' : 'text-red-500'}`}>
                        {g.average}
                      </span>
                    </td>

                    <td className="px-8 py-6 text-right">
                      {isEditing ? (
                        <div className="flex justify-end gap-2">
                          <button 
                            onClick={handleSave}
                            className="p-2.5 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 shadow-lg shadow-emerald-500/20 transition-all hover:scale-110"
                            title="Salvar Lançamento"
                          >
                            <Check size={20} />
                          </button>
                          <button 
                            onClick={cancelEditing}
                            className="p-2.5 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl hover:bg-slate-300 transition-all"
                            title="Cancelar"
                          >
                            <X size={20} />
                          </button>
                        </div>
                      ) : (
                        <button 
                          onClick={() => startEditing(g)}
                          className="px-5 py-2.5 bg-[#003366] dark:bg-slate-700 text-white dark:text-[#FFD700] rounded-xl font-bold hover:bg-blue-900 transition-all shadow-md active:scale-95"
                        >
                          Lançar Nota
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Informativo */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-3xl">
          <h4 className="font-bold text-[#003366] dark:text-blue-300 mb-2 flex items-center gap-2">
            <Check size={18} /> Sistema de Cálculo
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            A média é calculada automaticamente: (MAC + NPP + NPT) / 3. 
            Os dados são persistidos localmente e refletidos instantaneamente no portal do aluno.
          </p>
        </div>
        <div className="p-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-800 rounded-3xl">
          <h4 className="font-bold text-orange-700 dark:text-orange-300 mb-2 flex items-center gap-2">
            <AlertTriangle size={18} /> Limite de Faltas
          </h4>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            O limite de faltas permitido para a disciplina de Economia Política é de 15% das aulas dadas. 
            Alunos com mais de 10 faltas serão alertados pela coordenação.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GradingPage;
