SET search_path TO cars;
INSERT INTO avatar(image) VALUES ('image1');
INSERT INTO avatar(image) VALUES ('image2');

INSERT INTO car(password, query_id, pseudo, id_avatar) VALUES ('1234', '4356', 'PlayerOne', 1);
INSERT INTO car(password, query_id, pseudo, id_avatar) VALUES ('4321', '4357', 'PlayerTwo', 2);

INSERT INTO section(label) VALUES ('Informatique');
INSERT INTO section(label) VALUES ('Automatique');
INSERT INTO section(label) VALUES ('Horlogerie');
INSERT INTO section(label) VALUES ('Electronique');
INSERT INTO section(label) VALUES ('Micromécanique');
INSERT INTO section(label) VALUES ('Laborantin');
INSERT INTO section(label) VALUES ('Dessinateur');

INSERT INTO activity(label, id_section) VALUES ('Informer', 1);
INSERT INTO activity(label, id_section) VALUES ('Automatiser', 2);
INSERT INTO activity(label, id_section) VALUES ('Horlogifier', 3);
INSERT INTO activity(label, id_section) VALUES ('Electroniser', 4);
INSERT INTO activity(label, id_section) VALUES ('Micromécaniser', 5);
INSERT INTO activity(label, id_section) VALUES ('Laborantiser', 6);
INSERT INTO activity(label, id_section) VALUES ('Dessiner', 7);

INSERT INTO realise(id_car, id_activity, date_time) VALUES (1, 1, '2023-03-31 09:25:32');
INSERT INTO realise(id_car, id_activity, date_time) VALUES (1, 2, '2023-03-31 10:25:32');
INSERT INTO realise(id_car, id_activity, date_time) VALUES (1, 3, '2023-03-31 11:25:32');
INSERT INTO realise(id_car, id_activity, date_time) VALUES (1, 4, '2023-03-31 12:25:32');
INSERT INTO realise(id_car, id_activity, date_time) VALUES (1, 5, '2023-03-31 13:25:32');
INSERT INTO realise(id_car, id_activity, date_time) VALUES (1, 6, '2023-03-31 14:25:32');
INSERT INTO realise(id_car, id_activity, date_time) VALUES (1, 7, '2023-03-31 15:25:32');
INSERT INTO realise(id_car, id_activity, date_time) VALUES (2, 1, '2023-03-31 09:25:32');
INSERT INTO realise(id_car, id_activity, date_time) VALUES (2, 3, '2023-03-31 10:25:32');
INSERT INTO realise(id_car, id_activity, date_time) VALUES (2, 2, '2023-03-31 11:25:32');
INSERT INTO realise(id_car, id_activity, date_time) VALUES (2, 7, '2023-03-31 11:55:32');

INSERT INTO run(number, id_car) VALUES (1, 1);
INSERT INTO run(number, id_car) VALUES (1, 2);
INSERT INTO run(number, id_car) VALUES (2, 1);

INSERT INTO measured_time(sector, measured_time, id_run) VALUES (1, '00:25.125', 1);
INSERT INTO measured_time(sector, measured_time, id_run) VALUES (2, '00:26.125', 1);
INSERT INTO measured_time(sector, measured_time, id_run) VALUES (3, '00:23.125', 1);
INSERT INTO measured_time(sector, measured_time, id_run) VALUES (1, '00:23.125', 2);
INSERT INTO measured_time(sector, measured_time, id_run) VALUES (2, '00:22.125', 2);
INSERT INTO measured_time(sector, measured_time, id_run) VALUES (3, '00:24.125', 2);
INSERT INTO measured_time(sector, measured_time, id_run) VALUES (1, '00:28.125', 3);
INSERT INTO measured_time(sector, measured_time, id_run) VALUES (2, '00:29.125', 3);
INSERT INTO measured_time(sector, measured_time, id_run) VALUES (3, '00:23.125', 3);
