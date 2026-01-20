
import React, { useState } from 'react';
import { useDatabase } from '../App';
import { Send, User as UserIcon, MessageCircle } from 'lucide-react';

const MessagesPage: React.FC = () => {
  const { messages, sendMessage, users } = useDatabase();
  const [target, setTarget] = useState('');
  const [content, setContent] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!target || !content) return;
    sendMessage(target, content);
    setContent('');
    alert('Mensagem enviada com sucesso!');
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8 animate-fade h-[calc(100vh-160px)]">
      <div className="bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 p-8 flex flex-col">
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8">Nova Mensagem</h3>
        <form onSubmit={handleSend} className="space-y-6 flex-1">
          <div>
            <label className="text-xs font-black text-slate-400 uppercase mb-2 block">Destinatário</label>
            <select value={target} onChange={(e) => setTarget(e.target.value)} className="w-full p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none outline-none font-bold text-slate-700 dark:text-slate-200">
              <option value="">Seleccione um usuário</option>
              {users.map(u => <option key={u.id} value={u.name}>{u.name} ({u.role})</option>)}
            </select>
          </div>
          <div className="flex-1 flex flex-col">
            <label className="text-xs font-black text-slate-400 uppercase mb-2 block">Conteúdo</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escreva aqui..." className="w-full flex-1 p-4 bg-slate-50 dark:bg-slate-900 rounded-2xl border-none outline-none font-medium text-slate-700 dark:text-slate-200 resize-none min-h-[200px]" />
          </div>
          <button type="submit" className="w-full py-5 bg-[#003366] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl hover:bg-blue-900 transition-all">
            <Send size={20} /> Enviar Mensagem
          </button>
        </form>
      </div>

      <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-700 p-8 flex flex-col">
        <h3 className="text-xl font-black text-slate-900 dark:text-white mb-8">Caixa de Entrada</h3>
        <div className="space-y-4 overflow-y-auto flex-1 pr-2">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-300">
              <MessageCircle size={64} className="mb-4 opacity-20" />
              <p className="font-bold italic">Nenhuma mensagem recente</p>
            </div>
          ) : (
            messages.map(msg => (
              <div key={msg.id} className="p-6 bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-700 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white dark:bg-slate-800 text-[#003366] rounded-full flex items-center justify-center font-bold">
                      {msg.from.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-slate-800 dark:text-white">{msg.from}</p>
                      <p className="text-[10px] text-slate-400">Enviado em {msg.timestamp}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-black text-[#FFD700] uppercase tracking-widest">Para: {msg.to}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{msg.content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
