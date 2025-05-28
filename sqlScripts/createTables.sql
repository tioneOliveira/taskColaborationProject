DROP TABLE IF EXISTS Team_Task;
DROP TABLE IF EXISTS Team_User;
DROP TABLE IF EXISTS Task;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Team;

CREATE TABLE User (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    email_user VARCHAR(100) CHECK (email_user REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') NOT NULL,
    password_user VARCHAR(20) NOT NULL,
    name_user VARCHAR(100) DEFAULT "nameless",
    role_user VARCHAR(100) DEFAULT "Intern",
    permission_user VARCHAR(20) CHECK (permission_user IN ('None', 'Team Manager', 'Admin')) DEFAULT 'None',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    INDEX idx_name_user (name_user)
);

CREATE TABLE Team (
    id_team INT PRIMARY KEY AUTO_INCREMENT,
    name_team VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    INDEX idx_team_name (name_team)
);

CREATE TABLE Task (
    id_task INT PRIMARY KEY AUTO_INCREMENT,
    name_task VARCHAR(100) NOT NULL,
    status_task VARCHAR(50) CHECK (status_task IN ('Ongoing', 'Late', 'Programmed', 'Delivered', 'Cancelled')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP DEFAULT NULL,
    start_task TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline_task TIMESTAMP DEFAULT NULL,
    description_task TEXT
);

CREATE TABLE Team_User (
    id_team INT NOT NULL,
    id_user INT NOT NULL,
    PRIMARY KEY (id_team, id_user),
    FOREIGN KEY (id_team) REFERENCES Team(id_team),
    FOREIGN KEY (id_user) REFERENCES User(id_user),
    INDEX idx_team_user_id_team (id_team),
    INDEX idx_team_user_id_user (id_user)
);

CREATE TABLE Team_Task (
    id_team INT NOT NULL,
    id_task INT NOT NULL,
    PRIMARY KEY (id_team, id_task),
    FOREIGN KEY (id_team) REFERENCES Team(id_team),
    FOREIGN KEY (id_task) REFERENCES Task(id_task),
    INDEX idx_team_task_id_team (id_team),
    INDEX idx_team_task_id_task (id_task)
);
