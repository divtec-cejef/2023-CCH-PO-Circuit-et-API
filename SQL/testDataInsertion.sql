SET
    search_path TO cars;

TRUNCATE token RESTART IDENTITY CASCADE;
TRUNCATE car_token RESTART IDENTITY CASCADE;
TRUNCATE race RESTART IDENTITY CASCADE;
TRUNCATE realise RESTART IDENTITY CASCADE;
TRUNCATE car RESTART IDENTITY CASCADE;
TRUNCATE activity RESTART IDENTITY CASCADE;
TRUNCATE section RESTART IDENTITY CASCADE;

INSERT INTO car (password, query_id, pseudo, avatar)
VALUES ('03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '4356', 'PlayerOne', '{
        "bgColor": "#1EA",
        "hatColor": "#024",
        "faceColor": "#156",
        "hairColor": "#2F4",
        "shirtColor": "#DDD",
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square"
            }');

INSERT INTO car (password, query_id, pseudo, avatar)
VALUES ('fe2592b42a727e977f055947385b709cc82b16b9a87f88c6abf3900d65d0cdc3', '4357', 'PlayerTwo', '{
        "bgColor": "#456",
        "hatColor": "#FD5",
        "faceColor": "#E6E",
        "hairColor": "#8D1",
        "shirtColor": "#231",
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square"
            }');

INSERT INTO car (password, query_id, pseudo, avatar)
VALUES ('ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4358', 'Dråfølin', '{
        "bgColor": "#E81",
        "hatColor": "#3B8",
        "faceColor": "#1A7",
        "hairColor": "#000",
        "shirtColor": "#9CD",
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square"
            }');

INSERT INTO car (password, query_id, pseudo, avatar)
VALUES ('ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4359', 'tobito', '{
        "bgColor": "#FFF",
        "hatColor": "#D60",
        "faceColor": "#321",
        "hairColor": "#8BE",
        "shirtColor": "#F45",
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square"
            }');

INSERT INTO car (password, query_id, pseudo, avatar)
VALUES ('ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4360', 'Chlore', '{
        "bgColor": "#234",
        "hatColor": "#F1A",
        "faceColor": "#A89",
        "hairColor": "#29A",
        "shirtColor": "#21A",
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square"
}');

INSERT INTO car (password, query_id, pseudo, avatar)
VALUES ('ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4361', 'Mathilde', '{
        "bgColor": "#234",
        "hatColor": "#121",
        "faceColor": "#D12",
        "hairColor": "#234",
        "shirtColor": "#21A",
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square"
}');

INSERT INTO car (password, query_id, pseudo, avatar)
VALUES ('ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4362', 'Max', '{
        "bgColor": "#111",
        "hatColor": "#F1A",
        "faceColor": "#387",
        "hairColor": "#29A",
        "shirtColor": "#2A3",
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square"
}');

INSERT INTO car (password, query_id, pseudo, avatar)
VALUES ('ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4363', 'Titi', '{
        "bgColor": "#ABC",
        "hatColor": "#F1A",
        "faceColor": "#8D1",
        "hairColor": "#29A",
        "shirtColor": "#21A",
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square"
}');

INSERT INTO car (password, query_id, pseudo, avatar)
VALUES ('ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4364', 'Alex7', '{
        "bgColor": "#8DA",
        "hatColor": "#F1A",
        "faceColor": "#9A2",
        "hairColor": "#29A",
        "shirtColor": "#21A",
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square"
}');

INSERT INTO car (password, query_id, pseudo, avatar)
VALUES ('ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4365', 'Rayanito', '{
        "bgColor": "#78A",
        "hatColor": "#F1A",
        "faceColor": "#923",
        "hairColor": "#29A",
        "shirtColor": "#21A",
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square"
}');



INSERT INTO section (label, password)
VALUES ('Informatique', '756b86d14c1ea1941e91468ad9838f550ed56d14730a1b86221d187b60b50888');
INSERT INTO section (label, password)
VALUES ('Automatique', '45e1a3c5cad23b11382cc7f1af593e80b420a8523855b3f83f698fc0234ca3db');
INSERT INTO section (label, password)
VALUES ('Horlogerie', 'e229cdd135b8014d69025d7aaf04bd5316e8de9181a2973694de9514b0d40074');
INSERT INTO section (label, password)
VALUES ('Electronique', 'b614cd5a268540d1ab11aea45bed86ee5002488a32bff0840582a65e6affedcc');
INSERT INTO section (label, password)
VALUES ('Micromécanique', 'fe829e5c54c84f7e55b5754baea10bc5d8a117c9d66e7c385877d303d44beda1');
INSERT INTO section (label, password)
VALUES ('Laborantin', 'a70d7c214b845c2c05a508649250d7707daa35a08c88b42b6c4c4d74589c4713');
INSERT INTO section (label, password)
VALUES ('Dessinateur', '7117e1cf54893b6c3ec43b1aa59422503a749b5c084d401e9041b4d9105df848');
INSERT INTO section (label, password)
VALUES ('Race', 'f79b078fa5eb282f88779f553d1a6abb8e7c46bacae0d399e9bf58e868ab06fe');

-- --------------------- Activités ---------------------
-- Informatique
INSERT INTO activity (label, id_section)
VALUES ('Atelier Informatique', 1);

-- Automatique
INSERT INTO activity (label, id_section)
VALUES ('Atelier Automatique', 2);

-- Horlogerie
INSERT INTO activity (label, id_section)
VALUES ('Atelier Horlogerie', 3);

-- Electronique
INSERT INTO activity (label, id_section)
VALUES ('Atelier Electronique', 4);

-- Micromécanique
INSERT INTO activity (label, id_section)
VALUES ('Atelier Micromécanique', 5);

-- Laborantin
INSERT INTO activity (label, id_section)
VALUES ('Atelier Laborantin', 6);

-- Dessin
INSERT INTO activity (label, id_section)
VALUES ('Atelier Dessinateur', 7);

-- FORUM
INSERT INTO activity (label, id_section)
VALUES ('Forum', 8);

INSERT INTO realise (id_car, id_activity, date_time)
VALUES (1, 1, '2023-03-31 09:25:32');
INSERT INTO realise (id_car, id_activity, date_time)
VALUES (1, 2, '2023-03-31 10:25:32');
INSERT INTO realise (id_car, id_activity, date_time)
VALUES (1, 3, '2023-03-31 11:25:32');
INSERT INTO realise (id_car, id_activity, date_time)
VALUES (1, 4, '2023-03-31 12:25:32');
INSERT INTO realise (id_car, id_activity, date_time)
VALUES (1, 5, '2023-03-31 13:25:32');
INSERT INTO realise (id_car, id_activity, date_time)
VALUES (1, 6, '2023-03-31 14:25:32');
INSERT INTO realise (id_car, id_activity, date_time)
VALUES (1, 7, '2023-03-31 15:25:32');


INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (1, '2023-03-31 12:55:32.121', '2023-03-31 12:55:48.445', '2023-03-31 12:55:52.445', '2023-03-31 12:56:12.389', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (1, '2023-03-31 13:01:25.251', '2023-03-31 13:01:47.987','2023-03-31 13:01:50.987','2023-03-31 13:02:02.895', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (1, '2023-03-31 13:18:56.721', '2023-03-31 13:19:23.546','2023-03-31 13:19:30.546','2023-03-31 13:20:06.915', 30.0);

INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (2, '2023-03-31 12:55:32.121', '2023-03-31 12:55:48.445', '2023-03-31 12:55:52.445', '2023-03-31 12:56:12.389', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (2, '2023-03-31 13:01:25.251', '2023-03-31 13:01:47.987','2023-03-31 13:01:50.987','2023-03-31 13:02:02.895', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (2, '2023-03-31 13:18:56.721', '2023-03-31 13:19:23.546','2023-03-31 13:19:30.546','2023-03-31 13:20:06.915', 30.0);

INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (3, '2023-03-31 12:55:32.121', '2023-03-31 12:55:48.445', '2023-03-31 12:55:52.445', '2023-03-31 12:56:12.389', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (3, '2023-03-31 13:01:25.251', '2023-03-31 13:01:47.987','2023-03-31 13:01:50.987','2023-03-31 13:02:02.895', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (3, '2023-03-31 13:18:56.721', '2023-03-31 13:19:23.546','2023-03-31 13:19:30.546','2023-03-31 13:20:06.915', 30.0);

INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (4, '2023-03-31 12:55:32.121', '2023-03-31 12:55:48.445', '2023-03-31 12:55:52.445', '2023-03-31 12:56:12.389', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (4, '2023-03-31 13:01:25.251', '2023-03-31 13:01:47.987','2023-03-31 13:01:50.987','2023-03-31 13:02:02.895', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (4, '2023-03-31 13:18:56.721', '2023-03-31 13:19:23.546','2023-03-31 13:19:30.546','2023-03-31 13:20:06.915', 30.0);

INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (5, '2023-03-31 12:55:32.121', '2023-03-31 12:55:48.445', '2023-03-31 12:55:52.445', '2023-03-31 12:56:12.389', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (5, '2023-03-31 13:01:25.251', '2023-03-31 13:01:47.987','2023-03-31 13:01:50.987','2023-03-31 13:02:02.895', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (5, '2023-03-31 13:18:56.721', '2023-03-31 13:19:23.546','2023-03-31 13:19:30.546','2023-03-31 13:20:06.915', 30.0);

INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (6, '2023-03-31 12:55:32.121', '2023-03-31 12:55:48.445', '2023-03-31 12:55:52.445', '2023-03-31 12:56:12.389', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (6, '2023-03-31 13:01:25.251', '2023-03-31 13:01:47.987','2023-03-31 13:01:50.987','2023-03-31 13:02:02.895', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (6, '2023-03-31 13:18:56.721', '2023-03-31 13:19:23.546','2023-03-31 13:19:30.546','2023-03-31 13:20:06.915', 30.0);

INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (7, '2023-03-31 12:55:32.121', '2023-03-31 12:55:48.445', '2023-03-31 12:55:52.445', '2023-03-31 12:56:12.389', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (7, '2023-03-31 13:01:25.251', '2023-03-31 13:01:47.987','2023-03-31 13:01:50.987','2023-03-31 13:02:02.895', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (7, '2023-03-31 13:18:56.721', '2023-03-31 13:19:23.546','2023-03-31 13:19:30.546','2023-03-31 13:20:06.915', 30.0);

INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (8, '2023-03-31 12:55:32.121', '2023-03-31 12:55:48.445', '2023-03-31 12:55:52.445', '2023-03-31 12:56:12.389', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (8, '2023-03-31 13:01:25.251', '2023-03-31 13:01:47.987','2023-03-31 13:01:50.987','2023-03-31 13:02:02.895', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (8, '2023-03-31 13:18:56.721', '2023-03-31 13:19:23.546','2023-03-31 13:19:30.546','2023-03-31 13:20:06.915', 30.0);

INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (9, '2023-03-31 12:55:32.121', '2023-03-31 12:55:48.445', '2023-03-31 12:55:52.445', '2023-03-31 12:56:12.389', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (9, '2023-03-31 13:01:25.251', '2023-03-31 13:01:47.987','2023-03-31 13:01:50.987','2023-03-31 13:02:02.895', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (9, '2023-03-31 13:18:56.721', '2023-03-31 13:19:23.546','2023-03-31 13:19:30.546','2023-03-31 13:20:06.915', 30.0);

INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (10, '2023-03-31 12:55:32.121', '2023-03-31 12:55:48.445', '2023-03-31 12:55:52.445', '2023-03-31 12:56:12.389', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (10, '2023-03-31 13:01:25.251', '2023-03-31 13:01:47.987','2023-03-31 13:01:50.987','2023-03-31 13:02:02.895', 30.0);
INSERT INTO race (id_car, race_start, sector1, sector2, race_finish, speed)
VALUES (10, '2023-03-31 13:18:56.721', '2023-03-31 13:19:23.546','2023-03-31 13:19:30.546','2023-03-31 13:20:06.915', 30.0);
