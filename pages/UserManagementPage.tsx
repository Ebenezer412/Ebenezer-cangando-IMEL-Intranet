
import React, { useState } from 'react';
import { Plus, Search, MoreVertical, Edit2, Trash2, Filter, Download } from 'lucide-react';
import { TEST_USERS } from '../constants';
import { UserRole } from '../types';

const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState(TEST_USERS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.processNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-8 animate-fade">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Gestão de Usuários</h1>
          <p className="text-slate-500">Adicione, edite ou remova contas de acesso ao sistema.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all">
            <Download size={18} /> Exportar
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-[#003366] text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 hover:bg-blue-900 transition-all">
            <Plus size={18} /> Novo Usuário
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Pesquisar por nome ou processo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#003366] text-sm"
          />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 flex-1 md:flex-none px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold">
            <Filter size={18} /> Filtros
          </button>
          <select className="flex-1 md:flex-none px-4 py-2.5 bg-slate-50 text-slate-600 rounded-xl text-sm font-bold outline-none border-none">
            <option>Todos os Cargos</option>
            {Object.values(UserRole).map(r => <option key={r}>{r}</option>)}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-wider">Usuário</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-wider">Nº Processo</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-wider">Cargo</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-wider">Status</th>
                <th className="px-6 py-5 text-xs font-black text-slate-400 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-[#003366] rounded-full flex items-center justify-center font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800">{user.name}</p>
                        <p className="text-xs text-slate-400">logado há 2h</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-medium text-slate-600">{user.processNumber}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`
                      inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold
                      ${user.role === UserRole.ADMIN ? 'bg-purple-50 text-purple-700' : ''}
                      ${user.role === UserRole.PROFESSOR ? 'bg-blue-50 text-blue-700' : ''}
                      ${user.role === UserRole.ALUNO ? 'bg-emerald-50 text-emerald-700' : ''}
                      ${user.role === UserRole.DIRETOR ? 'bg-orange-50 text-orange-700' : ''}
                      ${user.role === UserRole.ENCARREGADO ? 'bg-slate-50 text-slate-600' : ''}
                    `}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <span className="text-xs font-bold text-slate-600">Ativo</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-50 bg-slate-50/30 flex items-center justify-between">
          <p className="text-xs font-medium text-slate-500">Mostrando {filteredUsers.length} de {users.length} usuários</p>
          <div className="flex gap-2">
            <button disabled className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-400 disabled:opacity-50">Anterior</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-md text-xs font-bold text-slate-700 hover:bg-slate-50">Próxima</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementPage;
