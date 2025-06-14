DROP TABLE IF EXISTS User_Task;
DROP TABLE IF EXISTS Team_Task;
DROP TABLE IF EXISTS Task;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Team;


CREATE TABLE Team (
    id_team INT PRIMARY KEY AUTO_INCREMENT,
    name_team VARCHAR(100) NOT NULL,
    created_at_team TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at_team TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at_team TIMESTAMP DEFAULT NULL
);

CREATE TABLE User (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    email_user VARCHAR(100) CHECK (email_user REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') NOT NULL,
    password_user VARCHAR(100) NOT NULL,
    name_user VARCHAR(100) DEFAULT "nameless",
    role_user VARCHAR(100) DEFAULT "Intern",
    id_team_user INT,
    permission_user VARCHAR(20) CHECK (permission_user IN ('None', 'Manager', 'Admin')) DEFAULT 'None',
    created_at_user TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at_user TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at_user TIMESTAMP DEFAULT NULL,
    FOREIGN KEY (id_team_user) REFERENCES Team(id_team)
);

CREATE TABLE Task (
    id_task INT PRIMARY KEY AUTO_INCREMENT,
    name_task VARCHAR(100) NOT NULL,
    status_task VARCHAR(50) CHECK (status_task IN ('Ongoing', 'Late', 'Programmed', 'Delivered', 'Cancelled')),
    created_at_task TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at_task TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at_task TIMESTAMP DEFAULT NULL,
    start_task TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deadline_task TIMESTAMP DEFAULT NULL,
    description_task TEXT,
    id_team_task INT,
    FOREIGN KEY (id_team_task) REFERENCES Team(id_team)
);

CREATE TABLE Team_Task (
    id_team INT NOT NULL,
    id_task INT NOT NULL,
    PRIMARY KEY (id_team, id_task),
    FOREIGN KEY (id_team) REFERENCES Team(id_team),
    FOREIGN KEY (id_task) REFERENCES Task(id_task)
);

CREATE TABLE User_Task (
    id_user INT NOT NULL,
    id_task INT NOT NULL,
    PRIMARY KEY (id_user, id_task),
    FOREIGN KEY (id_user) REFERENCES User(id_user),
    FOREIGN KEY (id_task) REFERENCES Task(id_task)
);
