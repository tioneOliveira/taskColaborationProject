INSERT INTO Team (name_team) VALUES 
('Equipe Alpha'),
('Equipe Beta'),
('Equipe Gamma');

INSERT INTO User (email_user, password_user, name_user, role_user, id_team_user, permission_user) VALUES 
('alpha.lider@example.com', 'senha123', 'Alice Alpha', 'Líder', 1, 'Admin'),
('beta.gerente@example.com', 'senha123', 'Bob Beta', 'Gerente', 2, 'Manager'),
('charlie.func@example.com', 'senha123', 'Charlie Gamma', 'Analista', 3, 'None'),
('dana.func@example.com', 'senha123', 'Dana Beta', 'Estagiária', 2, 'None'),
('eve.func@example.com', 'senha123', 'Eve Alpha', 'Dev', 1, 'None');

INSERT INTO Task (name_task, status_task, description_task, id_team_task, start_task, deadline_task) VALUES 
('Planejar Reunião', 'Ongoing', 'Reunião de planejamento semanal.', 1, NOW(), DATE_ADD(NOW(), INTERVAL 3 DAY)),
('Desenvolver API', 'Late', 'API de autenticação e tarefas.', 1, NOW(), DATE_ADD(NOW(), INTERVAL -2 DAY)),
('Criar Apresentação', 'Programmed', 'Apresentação para o cliente.', 2, NOW(), DATE_ADD(NOW(), INTERVAL 7 DAY)),
('Ajustar Banco de Dados', 'Delivered', 'Melhorias e constraints no banco.', 2, NOW(), NOW()),
('Revisar Código', 'Cancelled', 'Código do sprint cancelado.', 3, NOW(), DATE_ADD(NOW(), INTERVAL 5 DAY));

INSERT INTO Team_Task (id_team, id_task) VALUES 
(1, 1),
(1, 2),
(2, 3),
(2, 4),
(3, 5);

INSERT INTO User_Task (id_user, id_task) VALUES 
(1, 1),
(1, 2),
(2, 3),
(4, 3),
(5, 2),
(3, 5);
