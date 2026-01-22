
import React, { useState } from 'react';
import { useDatabase, useAuth } from '../App';
import { Book, Download, FileText, PlayCircle, Search, Plus, X, Upload, FileArchive, BookOpen } from 'lucide-react';
import { UserRole } from '../types';

const LibraryPage: React.FC = () => {
  const { library, addLibraryResource } = useDatabase();
  const { user } = useAuth();
  const [showUpload, setShowUpload] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [newRes, setNewRes] = useState({
    title: '',
    subject: '',
    type: 'PDF' as any,
    size: '0MB'
  });

  const isProfessor = user?.role === UserRole.PROFESSOR;

  const handleDownload = (title: string) => {
    alert(`A preparar ficheiro: ${title}\nO download iniciará automaticamente.`);
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    addLibraryResource({
      ...newRes,
      author: user?.name || 'Desconhecido',
      authorId: user?.id || '0',
      turmaTarget: 'Todas'
    });
    setShowUpload(false);
    setNewRes({ title: '', subject: '', type: 'PDF', size: '0MB' });
  };

  const filteredLibrary = library.filter(r => 
    r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    r.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-3">
            <BookOpen className="text-primary" /> Biblioteca Digital IMEL
          </h1>
          <p className="text-slate-500 dark:text-slate-400">Repositório oficial de livros, pautas e manuais do curso.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar manuais..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl w-80 shadow-sm outline-none focus:border-primary dark:text-white" 
            />
          </div>
          {isProfessor && (
            <button 
              onClick={() => setShowUpload(true)}
              className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl font-bold shadow-lg hover:scale-105 transition-all"
            >
              <Plus size={18} /> Publicar Livro/Ficha
            </button>
          )}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredLibrary.map((res) => (
          <div key={res.id} className="bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 group hover:border-primary transition-all">
            <div className="h-44 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-slate-300 group-hover:bg-primary/5 transition-colors relative">
              {res.type === 'VIDEO' ? <PlayCircle size={52} className="group-hover:text-primary transition-colors" /> : 
               res.type === 'ZIP' ? <FileArchive size={52} className="group-hover:text-primary transition-colors" /> :
               <FileText size={52} className="group-hover:text-primary transition-colors" />}
              <span className="absolute top-4 left-4 text-[8px] font-black bg-primary text-white px-2 py-1 rounded uppercase">{res.type}</span>
              <span className="absolute bottom-4 right-4 text-[9px] font-black bg-white dark:bg-slate-700 px-2 py-1 rounded-md text-slate-400 group-hover:text-primary">{res.size}</span>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary dark:text-secondary">{res.subject}</span>
                <span className="text-[9px] font-bold text-slate-400">{res.date}</span>
              </div>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 h-10">{res.title}</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-6">Autor: {res.author}</p>
              <button 
                onClick={() => handleDownload(res.title)}
                className="w-full flex items-center justify-center gap-2 py-4 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest group-hover:bg-primary group-hover:text-white transition-all shadow-sm"
              >
                <Download size={14} /> Descarregar Arquivo
              </button>
            </div>
          </div>
        ))}
      </div>

      {showUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-slate-800 w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-fade">
            <div className="px-10 py-8 bg-primary text-white flex items-center justify-between">
              <h3 className="text-xl font-black uppercase tracking-tighter">Carregar Material</h3>
              <button onClick={() => setShowUpload(false)} className="hover:rotate-90 transition-transform"><X /></button>
            </div>
            <form onSubmit={handleUpload} className="p-10 space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Nome do Documento</label>
                <input required value={newRes.title} onChange={e => setNewRes({...newRes, title: e.target.value})} type="text" placeholder="Ex: Manual de Redes de Computadores" className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-700 rounded-2xl outline-none focus:border-primary dark:text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Componente</label>
                  <select required value={newRes.subject} onChange={e => setNewRes({...newRes, subject: e.target.value})} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-700 rounded-2xl outline-none focus:border-primary dark:text-white">
                    <option value="">Selecionar...</option>
                    <option value="TLP">TLP</option>
                    <option value="TRECE">TRECE</option>
                    <option value="Matemática">Matemática</option>
                    <option value="SI">SI</option>
                    <option value="Geral">Manual Institucional</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">Tipo</label>
                  <select value={newRes.type} onChange={e => setNewRes({...newRes, type: e.target.value as any})} className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-900 border-2 border-slate-50 dark:border-slate-700 rounded-2xl outline-none focus:border-primary dark:text-white">
                    <option value="PDF">PDF</option>
                    <option value="ZIP">ZIP (Pauta Completa)</option>
                    <option value="DOC">DOC / Word</option>
                  </select>
                </div>
              </div>
              <div className="border-4 border-dashed border-slate-100 dark:border-slate-700 rounded-3xl p-8 text-center bg-slate-50 dark:bg-slate-900/50">
                 <Upload className="mx-auto text-slate-300 mb-2" size={32} />
                 <p className="text-xs text-slate-400 font-bold uppercase">Anexar Documento</p>
              </div>
              <button type="submit" className="w-full py-5 bg-primary text-white rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all">Publicar na Biblioteca</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
