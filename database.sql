-- ==========================================================
-- SCRIPT SQL COMPLETO: SIG-IMEL INTRANET v3.1
-- SGBD: MySQL 
-- Descrição: Base de dados completa, relacional e funcional
-- ==========================================================

SET SQL_MODE = "STRICT_ALL_TABLES";
SET time_zone = "+00:00";

-- ==========================================================
-- CRIAÇÃO DA BASE DE DADOS
-- ==========================================================
DROP DATABASE IF EXISTS imel_intranet_db;
CREATE DATABASE imel_intranet_db
DEFAULT CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE imel_intranet_db;

-- ==========================================================
-- 1. TABELA DE TURMAS
-- ==========================================================
CREATE TABLE turmas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL UNIQUE,
    curso VARCHAR(100) NOT NULL,
    periodo ENUM('Manhã','Tarde','Noite') NOT NULL,
    ano_lectivo VARCHAR(9) NOT NULL,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ==========================================================
-- 2. TABELA DE UTILIZADORES
-- ==========================================================
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    processo VARCHAR(20) NOT NULL UNIQUE,
    role ENUM('Aluno','Professor','Administrador','Diretor','Encarregado') NOT NULL,
    email VARCHAR(100) UNIQUE,
    senha_hash VARCHAR(255) NOT NULL,
    turma_id INT NULL,
    avatar_url VARCHAR(255),
    status ENUM('Ativo','Inativo','Suspenso') DEFAULT 'Ativo',
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_usuario_turma FOREIGN KEY (turma_id)
        REFERENCES turmas(id)
        ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_usuarios_role ON usuarios(role);

-- ==========================================================
-- 3. ENCARREGADOS x ALUNOS (N:N)
-- ==========================================================
CREATE TABLE encarregado_alunos (
    encarregado_id INT NOT NULL,
    aluno_id INT NOT NULL,
    parentesco VARCHAR(50),
    PRIMARY KEY (encarregado_id, aluno_id),
    CONSTRAINT fk_encarregado FOREIGN KEY (encarregado_id)
        REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_aluno FOREIGN KEY (aluno_id)
        REFERENCES usuarios(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ==========================================================
-- 4. DISCIPLINAS
-- ==========================================================
CREATE TABLE disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    abreviatura VARCHAR(10) NOT NULL UNIQUE,
    tipo ENUM('Técnica','Geral','Complementar') DEFAULT 'Técnica'
) ENGINE=InnoDB;

-- ==========================================================
-- 5. PAUTAS / AVALIAÇÕES
-- ==========================================================
CREATE TABLE pautas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    professor_id INT NOT NULL,
    trimestre TINYINT NOT NULL CHECK (trimestre BETWEEN 1 AND 3),
    mac DECIMAL(4,2),
    npp DECIMAL(4,2),
    npt DECIMAL(4,2),
    media_trimestral DECIMAL(4,2)
        GENERATED ALWAYS AS ((IFNULL(mac,0)+IFNULL(npp,0)+IFNULL(npt,0))/3) STORED,
    faltas INT DEFAULT 0,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_pauta_aluno FOREIGN KEY (aluno_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    CONSTRAINT fk_pauta_disciplina FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
    CONSTRAINT fk_pauta_professor FOREIGN KEY (professor_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

-- ==========================================================
-- 6. HORÁRIOS
-- ==========================================================
CREATE TABLE horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dia_semana ENUM('Segunda','Terça','Quarta','Quinta','Sexta') NOT NULL,
    tempo_ordem INT NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    disciplina_id INT,
    professor_id INT,
    turma_id INT,
    sala VARCHAR(20),
    CONSTRAINT fk_horario_disciplina FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
    CONSTRAINT fk_horario_professor FOREIGN KEY (professor_id) REFERENCES usuarios(id),
    CONSTRAINT fk_horario_turma FOREIGN KEY (turma_id) REFERENCES turmas(id)
) ENGINE=InnoDB;

-- ==========================================================
-- 7. BIBLIOTECA DIGITAL
-- ==========================================================
CREATE TABLE biblioteca (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    tipo ENUM('PDF','DOC','VIDEO','ZIP') NOT NULL,
    disciplina_id INT,
    autor_id INT,
    url_ficheiro VARCHAR(255) NOT NULL,
    tamanho VARCHAR(20),
    downloads INT DEFAULT 0,
    data_upload TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_biblioteca_disciplina FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
    CONSTRAINT fk_biblioteca_autor FOREIGN KEY (autor_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

-- ==========================================================
-- 8. LOGS DE AUDITORIA
-- ==========================================================
CREATE TABLE logs_auditoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT NULL,
    acao VARCHAR(100) NOT NULL,
    modulo VARCHAR(50),
    detalhes TEXT,
    ip_origem VARCHAR(45),
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_logs_usuario FOREIGN KEY (usuario_id)
        REFERENCES usuarios(id) ON DELETE SET NULL
) ENGINE=InnoDB;

-- ==========================================================
-- 9. MENSAGENS INTERNAS
-- ==========================================================
CREATE TABLE mensagens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    remetente_id INT NOT NULL,
    destinatario_id INT NOT NULL,
    conteudo TEXT NOT NULL,
    lida BOOLEAN DEFAULT FALSE,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_msg_remetente FOREIGN KEY (remetente_id) REFERENCES usuarios(id),
    CONSTRAINT fk_msg_destinatario FOREIGN KEY (destinatario_id) REFERENCES usuarios(id)
) ENGINE=InnoDB;

-- ==========================================================
-- VIEWS ÚTEIS
-- ==========================================================
CREATE VIEW vw_alunos AS
SELECT u.id, u.nome, u.processo, t.nome AS turma, t.curso
FROM usuarios u
LEFT JOIN turmas t ON u.turma_id = t.id
WHERE u.role = 'Aluno';

CREATE VIEW vw_pauta_resumo AS
SELECT u.nome AS aluno, d.nome AS disciplina, p.trimestre, p.media_trimestral
FROM pautas p
JOIN usuarios u ON p.aluno_id = u.id
JOIN disciplinas d ON p.disciplina_id = d.id;

-- ==========================================================
-- SEED DATA
-- ==========================================================
INSERT INTO turmas (nome, curso, periodo, ano_lectivo) VALUES
('I12B','Informática de Gestão','Manhã','2024/2025'),
('C10A','Contabilidade','Tarde','2024/2025');

-- senha_hash exemplo gerada com bcrypt
INSERT INTO usuarios (nome, processo, role, email, senha_hash, turma_id) VALUES
('Eng. Domingos Neto','IT-3001','Professor','dneto@imel.edu.ao','$2b$10$hash_exemplo',NULL),
('Admin Geral','999000','Administrador','admin@imel.edu.ao','$2b$10$hash_exemplo',NULL),
('Dr. Augusto Feliciano','888000','Diretor','direcao@imel.edu.ao','$2b$10$hash_exemplo',NULL),
('João Manuel','2022450','Aluno','jmanuel@aluno.imel.ao','$2b$10$hash_exemplo',1);

INSERT INTO disciplinas (nome,abreviatura,tipo) VALUES
('Técnicas de Linguagem de Programação','TLP','Técnica'),
('Matemática','MAT','Geral'),
('Sistemas de Informação','SI','Técnica');

-- ==========================================================
-- FIM DO SCRIPT
-- ==========================================================
