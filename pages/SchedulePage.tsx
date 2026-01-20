
import React from 'react';
import { useDatabase } from '../App';
import { Calendar, Clock, MapPin } from 'lucide-react';

const SchedulePage: React.FC = () => {
  const { schedules } = useDatabase();
  const days = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];

  return (
    <div className="space-y-8 animate-fade">
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Horário Escolar</h1>
        <p className="text-slate-500 dark:text-slate-400">Turma 12ª B | Turno da Manhã</p>
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        {days.map((day) => (
          <div key={day} className="space-y-4">
            <h3 className="px-4 py-2 bg-[#003366] text-white text-center font-bold rounded-xl shadow-md">{day}</h3>
            <div className="space-y-3">
              {schedules.filter(s => s.day === day).map(item => (
                <div key={item.id} className="p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:scale-[1.02] transition-all">
                  <p className="font-bold text-[#003366] dark:text-[#FFD700] text-sm mb-2">{item.subject}</p>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <Clock size={12} /> {item.time}
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-400">
                      <MapPin size={12} /> {item.room}
                    </div>
                  </div>
                </div>
              ))}
              {schedules.filter(s => s.day === day).length === 0 && (
                <div className="p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl text-center text-xs text-slate-400 italic">
                  Sem aulas agendadas
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SchedulePage;
