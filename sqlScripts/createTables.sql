DROP TABLE IF EXISTS Equipe_Tarefa;
DROP TABLE IF EXISTS Equipe_Colaborador;
DROP TABLE IF EXISTS Tarefa;
DROP TABLE IF EXISTS Colaborador;
DROP TABLE IF EXISTS Equipe;

CREATE TABLE Equipe (
    IDEquipe INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    DeletedAt TIMESTAMP NULL,
    INDEX idx_equipe_nome (Nome)
);

CREATE TABLE Colaborador (
    IDColab INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    Cargo VARCHAR(100) DEFAULT "Sem cargo definido",
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    DeletedAt TIMESTAMP NULL,
    INDEX idx_colab_nome (Nome)
);



CREATE TABLE Tarefa (
    TarefaID INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(100) NOT NULL,
    StatusTarefa VARCHAR(50) CHECK (StatusTarefa IN ('Em andamento', 'Atrasada', 'Programada', 'Entregue', 'Cancelada')),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    DeletedAt TIMESTAMP NULL,
    StartTask TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Deadline TIMESTAMP,
    Descricao TEXT,
    INDEX idx_tarefa_status (StatusTarefa)
);


CREATE TABLE Equipe_Colaborador (
    IDEquipe INT NOT NULL,
    IDColab INT NOT NULL,
    PRIMARY KEY (IDEquipe, IDColab),
    FOREIGN KEY (IDEquipe) REFERENCES Equipe(IDEquipe),
    FOREIGN KEY (IDColab) REFERENCES Colaborador(IDColab),
    INDEX idx_equipe_colab_idtime (IDEquipe),
    INDEX idx_equipe_colab_idcolab (IDColab)
);

CREATE TABLE Equipe_Tarefa (
    IDEquipe INT NOT NULL,
    TarefaID INT NOT NULL,
    PRIMARY KEY (IDEquipe, TarefaID),
    FOREIGN KEY (IDEquipe) REFERENCES Equipe(IDEquipe),
    FOREIGN KEY (TarefaID) REFERENCES Tarefa(TarefaID),
    INDEX idx_equipe_tarefa_idequipe (IDEquipe),
    INDEX idx_equipe_tarefa_tarefaid (TarefaID)
);
