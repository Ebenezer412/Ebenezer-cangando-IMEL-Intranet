
import React from 'react';
import { useDatabase } from '../App';
import { Book, Download, FileText, PlayCircle, Search } from 'lucide-react';

const LibraryPage: React.FC = () => {
  const { library } = useDatabase();

  return (
    <div className="space-y-8 animate-fade">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Biblioteca Digital</h1>
        <div className="flex items-center bg-white dark:bg-slate-800 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 w-80 shadow-sm">
          <Search size={18} className="text-slate-400" />
          <input type="text" placeholder="Pesquisar livros..." className="bg-transparent border-none outline-none ml-2 text-sm w-full dark:text-white" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {library.map((res) => (
          <div key={res.id} className="bg-white dark:bg-slate-800 rounded-3xl overflow-hidden shadow-sm border border-slate-100 dark:border-slate-700 group">
            <div className="h-32 bg-slate-100 dark:bg-slate-900/50 flex items-center justify-center text-slate-300 group-hover:bg-[#003366] group-hover:text-white transition-colors duration-500">
              {res.type === 'VIDEO' ? <PlayCircle size={48} /> : <FileText size={48} />}
            </div>
            <div className="p-6">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FFD700] mb-2 inline-block">{res.subject}</span>
              <h3 className="font-bold text-slate-800 dark:text-white mb-2 line-clamp-2">{res.title}</h3>
              <p className="text-xs text-slate-500 mb-6">Autor: {res.author}</p>
              <button className="w-full flex items-center justify-center gap-2 py-3 bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl font-bold hover:bg-[#FFD700] hover:text-[#003366] transition-all">
                <Download size={16} /> Baixar {res.type}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LibraryPage;
