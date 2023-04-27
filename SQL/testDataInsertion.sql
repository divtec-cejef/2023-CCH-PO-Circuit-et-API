SET search_path TO cars;
INSERT INTO avatar(image) VALUES ('image1');
INSERT INTO avatar(image) VALUES ('image2');

INSERT INTO car(password, query_id, pseudo, id_avatar) VALUES ('1234', '4356', 'PlayerOne', 1);
INSERT INTO car(password, query_id, pseudo, id_avatar) VALUES ('4321', '4357', 'PlayerTwo', 2);

INSERT INTO section(label, password) VALUES ('Informatique', 'cc66fe07ac67e3cc177b5bd170ba7c6fd599db256905aed1af5223e8fc8557c5');
INSERT INTO section(label, password) VALUES ('Automatique', '9c0c10f84ec795823c96180e7390f45e2ab16ebbb8abf734956b72670a3c6e52');
INSERT INTO section(label, password) VALUES ('Horlogerie', 'fbde7a74b78dfb0e6611636001ed70e28505b512f9c737f7dbb68ffd1f47b69c');
INSERT INTO section(label, password) VALUES ('Electronique', 'a83e7936fece90e34061c08dd305ca4db0077c09bf6913af73f8506784243e41');
INSERT INTO section(label, password) VALUES ('Micromécanique', '812f3ddaf90a09f380e5f91bd104a4db34d02559dbc1e590c7d8dcbb7b419392');
INSERT INTO section(label, password) VALUES ('Laborantin', '78f78420d844032ae31a00ff55ed966179290715f1bead618d1fb7fb4615059c');
INSERT INTO section(label, password) VALUES ('Dessinateur', 'deb7fcbfce0ffb633de4accaa92fb573e5d6ffa802617360adc67c7dcc6cd29f');

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

INSERT INTO race(id_car, realisation_date_time, sector_one) VALUES (1, '2023-03-31 12:55:32', '00:25.125');
INSERT INTO race(id_car, realisation_date_time, sector_one) VALUES (2, '2023-03-31 11:55:32', '00:24.125');
INSERT INTO race(id_car, realisation_date_time, sector_one) VALUES (1, '2023-03-31 13:55:32', '00:23.125');

