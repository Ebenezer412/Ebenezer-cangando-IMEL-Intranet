
# 🎓 SIG-IMEL - Sistema Interno de Gestão Escolar

O **SIG-IMEL** é uma plataforma de intranet completa e moderna desenvolvida especificamente para o **Instituto Médio de Economia de Luanda**. O sistema centraliza a gestão académica, pedagógica e administrativa, conectando Alunos, Professores, Encarregados de Educação e a Direção Geral em um único ecossistema digital de alta performance.

---

## 🚀 Funcionalidades Principais

### 👤 Módulos por Perfil
- **Alunos:** Consulta de mini-pautas, horários, assiduidade, acesso à biblioteca digital e comunicação com professores.
- **Professores:** Lançamento de notas em tempo real, monitoramento de turmas, publicação de materiais e gestão de pautas.
- **Encarregados:** Acompanhamento exclusivo do progresso académico e faltas de múltiplos educandos.
- **Diretor Geral (Gabinete Estratégico):** Dashboard com KPIs de aprovação, análise de risco de abandono e auditoria pedagógica.
- **Administrador (Consola de Gestão):** Controle total de contas, logs de segurança (auditoria) e personalização da identidade visual (Branding).

### 🧠 Inteligência Artificial (AI Features)
Integrado com a **Gemini API (Google GenAI)**, o sistema fornece:
- **Análise Preditiva:** Insights automáticos sobre o desempenho das turmas.
- **Alertas de Risco:** Identificação proativa de alunos com baixo rendimento ou excesso de faltas.
- **Sugestões Pedagógicas:** Recomendações personalizadas baseadas nos dados do sistema.

### 🛠️ Gestão Técnica
- **Branding Dinâmico:** Alteração de cores primárias/secundárias e nomes da instituição sem mexer no código.
- **Auditoria Imutável:** Registro detalhado de quem, quando e o que foi alterado no sistema (essencial para segurança de notas).
- **Biblioteca Digital:** Upload e download de manuais, pautas em PDF e videoaulas.

---

## 🛠️ Tecnologias Utilizadas

- **Frontend:** React 19 (ES6+ Modules)
- **Estilização:** Tailwind CSS (com suporte a Modo Escuro/Dark Mode)
- **Ícones:** Lucide React (Design limpo e moderno)
- **Gráficos:** Recharts (Visualização de dados estatísticos)
- **Navegação:** React Router Dom v7
- **IA:** @google/genai (Gemini 3 Flash Preview)
- **Banco de Dados:** MySQL 8.0 (Esquema relacional completo)

---

## 📦 Instalação e Configuração

### 1. Pré-requisitos
- Um servidor web ou ambiente de desenvolvimento local (como Node.js ou VS Code com Live Server).
- Uma chave de API do Google Gemini (obrigatória para as funcionalidades de IA).

### 2. Configuração do Banco de Dados
Execute o script localizado em `database.sql` no seu servidor MySQL. Ele criará:
- A base de dados `imel_intranet_db`.
- Todas as tabelas necessárias (usuários, pautas, disciplinas, horários, logs, etc).
- Dados iniciais (Disciplinas e conta de Administrador Padrão).

### 3. Configuração do Ambiente
O sistema utiliza variáveis de ambiente para segurança. Certifique-se de configurar a sua chave da Gemini API:
```env
API_KEY=sua_chave_aqui
```
*Nota: Em ambientes de desenvolvimento como este, a chave é injetada automaticamente via `process.env.API_KEY`.*

### 4. Execução
Como o projeto utiliza módulos ES6 nativos e `importmap`, não é necessário um passo de "build" pesado para visualização simples:
1. Abra o arquivo `index.html` em um navegador moderno.
2. Certifique-se de usar um servidor local (não abra o arquivo diretamente via `file://`) para que as rotas e módulos funcionem corretamente.

---

## 📖 Guia de Uso

### Acesso Inicial
- **Login:** Utilize o Número de Processo fornecido pela secretaria.
- **Primeiro Acesso:** Clique em "Criar conta agora", insira seu processo e defina uma senha e e-mail.
- **Recuperação:** Se esquecer a senha, utilize o fluxo "Esqueceu a senha?" para redefinir via e-mail institucional.

### Lançamento de Notas (Professores)
1. Vá até "Lançar Notas".
2. Filtre por disciplina.
3. Clique em "Lançar", insira os valores de MAC, NPP ou NPT.
4. O sistema calcula a média automaticamente e salva o log de alteração.

### Painel da Direção
- Acesse o "Gabinete Estratégico" para ver os gráficos de barras e áreas que mostram a saúde acadêmica do instituto. Use os insights da IA no topo para decisões rápidas.

---

## 🛡️ Segurança e Privacidade
O SIG-IMEL segue rigorosos padrões de proteção de dados:
- **Hashes de Senha:** Nunca armazenamos senhas em texto limpo.
- **Auditoria Centralizada:** Cada clique administrativo é registrado.
- **Níveis de Acesso:** Um Aluno jamais terá acesso às rotas de edição de notas ou logs de sistema.

---

## 📝 Créditos
Desenvolvido para o **Instituto Médio de Economia de Luanda (IMEL)**.
Sistema focado na modernização do Ensino Técnico-Profissional em Angola.

---
*Versão do Sistema: 3.0.0-*
