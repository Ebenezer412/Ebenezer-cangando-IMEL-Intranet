
-- ==========================================================
-- SCRIPT SQL: SIG IMEL v2.5 (CURRÍCULO COMPLETO)
-- ==========================================================

CREATE DATABASE IF NOT EXISTS imel_intranet_db;
USE imel_intranet_db;

-- 1. Usuários
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    processo VARCHAR(20) UNIQUE NOT NULL,
    role ENUM('Aluno', 'Professor', 'Administrador', 'Diretor', 'Encarregado') NOT NULL,
    email VARCHAR(100),
    turma VARCHAR(50),
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Disciplinas (10 Disciplinas da 12ª Classe)
CREATE TABLE IF NOT EXISTS disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    abreviatura VARCHAR(10)
);

INSERT INTO disciplinas (nome, abreviatura) VALUES 
('Técnicas de Linguagem de Programação', 'TLP'),
('Técnicas de Redes de Computadores', 'TRECE'),
('Matemática', 'MAT'),
('Sistemas de Informação', 'SI'),
('Língua Portuguesa', 'LP'),
('Organização e Gestão de Empresas', 'OGE'),
('Empreendedorismo', 'EMP'),
('Inglês Técnico', 'ING'),
('PAPE (Projecto Final)', 'PAPE'),
('Educação Física', 'EF');

-- 3. Pautas Trimestrais
CREATE TABLE IF NOT EXISTS pautas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    aluno_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    professor_id INT NOT NULL,
    t1_mac DECIMAL(4,2), t1_npp DECIMAL(4,2), t1_npt DECIMAL(4,2), t1_media DECIMAL(4,2),
    t2_mac DECIMAL(4,2), t2_npp DECIMAL(4,2), t2_npt DECIMAL(4,2), t2_media DECIMAL(4,2),
    t3_mac DECIMAL(4,2), t3_npp DECIMAL(4,2), t3_npt DECIMAL(4,2), t3_media DECIMAL(4,2),
    faltas INT DEFAULT 0,
    FOREIGN KEY (aluno_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
    FOREIGN KEY (professor_id) REFERENCES usuarios(id)
);

-- 4. Horários (Estrutura de 4 Tempos Letivos por Dia)
CREATE TABLE IF NOT EXISTS horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    dia_semana ENUM('Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta') NOT NULL,
    tempo_ordem INT NOT NULL, -- 1, 2, 3 ou 4
    hora_inicio TIME,
    hora_fim TIME,
    disciplina_id INT,
    professor_id INT,
    sala VARCHAR(20),
    turma VARCHAR(10),
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id),
    FOREIGN KEY (professor_id) REFERENCES usuarios(id)
);

-- Seed de Exemplo (Horário 1º Tempo de Segunda)
INSERT INTO horarios (dia_semana, tempo_ordem, hora_inicio, hora_fim, disciplina_id, professor_id, sala, turma) 
VALUES ('Segunda', 1, '07:30:00', '09:00:00', 3, 1, 'Sala 24', 'I12B');

-- Seed de Professor e Aluno para Teste
INSERT INTO usuarios (nome, processo, role) VALUES ('Eng. Domingos Neto', 'IT-3001', 'Professor');
INSERT INTO usuarios (nome, processo, role, turma) VALUES ('João Manuel', '2022450', 'Aluno', 'I12B');
