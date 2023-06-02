SET
    search_path TO cars;

TRUNCATE token CASCADE;
TRUNCATE car_token CASCADE;
TRUNCATE race CASCADE;
TRUNCATE realise CASCADE;
TRUNCATE car CASCADE;
TRUNCATE activity CASCADE;
TRUNCATE section CASCADE;

INSERT INTO car
VALUES (1, '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4', '4356', 'PlayerOne', '{
        "bgColor": "#1EA",
        "hatColor": "#024",
        "faceColor": "#156",
        "hairColor": "#2F4",
        "shirtColor": "#DDD",
        "hairColorRandom": false,
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square",
        "shape": "circle"
            }');

INSERT INTO car
VALUES (2, 'fe2592b42a727e977f055947385b709cc82b16b9a87f88c6abf3900d65d0cdc3', '4357', 'PlayerTwo', '{
        "bgColor": "#456",
        "hatColor": "#FD5",
        "faceColor": "#E6E",
        "hairColor": "#8D1",
        "shirtColor": "#231",
        "hairColorRandom": false,
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square",
        "shape": "circle"
            }');

INSERT INTO car
VALUES (3, 'ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4358', 'Dråfølin', '{
        "bgColor": "#E81",
        "hatColor": "#3B8",
        "faceColor": "#1A7",
        "hairColor": "#000",
        "shirtColor": "#9CD",
        "hairColorRandom": false,
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square",
        "shape": "circle"
            }');

INSERT INTO car
VALUES (4, 'ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4359', 'tobito', '{
        "bgColor": "#FFF",
        "hatColor": "#D60",
        "faceColor": "#321",
        "hairColor": "#8BE",
        "shirtColor": "#F45",
        "hairColorRandom": false,
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square",
        "shape": "circle"
            }');

INSERT INTO car
VALUES (5, 'ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4360', 'Chlore', '{
        "bgColor": "#234",
        "hatColor": "#F1A",
        "faceColor": "#A89",
        "hairColor": "#29A",
        "shirtColor": "#21A",
        "hairColorRandom": false,
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square",
        "shape": "circle"
}');

INSERT INTO car
VALUES (6, 'ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4361', 'Mathilde', '{
        "bgColor": "#234",
        "hatColor": "#121",
        "faceColor": "#D12",
        "hairColor": "#234",
        "shirtColor": "#21A",
        "hairColorRandom": false,
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square",
        "shape": "circle"
}');

INSERT INTO car
VALUES (7, 'ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4362', 'Max', '{
        "bgColor": "#111",
        "hatColor": "#F1A",
        "faceColor": "#387",
        "hairColor": "#29A",
        "shirtColor": "#2A3",
        "hairColorRandom": false,
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square",
        "shape": "circle"
}');

INSERT INTO car
VALUES (8, 'ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4363', 'Titi', '{
        "bgColor": "#ABC",
        "hatColor": "#F1A",
        "faceColor": "#8D1",
        "hairColor": "#29A",
        "shirtColor": "#21A",
        "hairColorRandom": false,
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square",
        "shape": "circle"
}');

INSERT INTO car
VALUES (9, 'ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4364', 'Alex7', '{
        "bgColor": "#8DA",
        "hatColor": "#F1A",
        "faceColor": "#9A2",
        "hairColor": "#29A",
        "shirtColor": "#21A",
        "hairColorRandom": false,
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square",
        "shape": "circle"
}');

INSERT INTO car
VALUES (10, 'ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '4365', 'Rayanito', '{
        "bgColor": "#78A",
        "hatColor": "#F1A",
        "faceColor": "#923",
        "hairColor": "#29A",
        "shirtColor": "#21A",
        "hairColorRandom": false,
        "sex": "female",
        "earSize": "small",
        "hatType": "none",
        "eyeType": "circle",
        "hairType": "normal",
        "noseType": "round",
        "mouthType": "smile",
        "shirtType": "hoody",
        "eyeBrowType": "upMale",
        "glassesType": "square",
        "shape": "circle"
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
VALUES ('Micromécanique',
        'fe829e5c54c84f7e55b5754baea10bc5d8a117c9d66e7c385877d303d44beda1');
INSERT INTO section (label, password)
VALUES ('Laborantin', 'a70d7c214b845c2c05a508649250d7707daa35a08c88b42b6c4c4d74589c4713');
INSERT INTO section (label, password)
VALUES ('Dessinateur', '7117e1cf54893b6c3ec43b1aa59422503a749b5c084d401e9041b4d9105df848');

INSERT INTO activity (label, id_section)
VALUES ('Informer', 1);
INSERT INTO activity (label, id_section)
VALUES ('Automatiser', 2);
INSERT INTO activity (label, id_section)
VALUES ('Horlogifier', 3);
INSERT INTO activity (label, id_section)
VALUES ('Electroniser', 4);
INSERT INTO activity (label, id_section)
VALUES ('Micromécaniser', 5);
INSERT INTO activity (label, id_section)
VALUES ('Laborantiser', 6);
INSERT INTO activity (label, id_section)
VALUES ('Dessiner', 7);

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
INSERT INTO realise (id_car, id_activity, date_time)
VALUES (2, 1, '2023-03-31 09:25:32');
INSERT INTO realise (id_car, id_activity, date_time)
VALUES (2, 3, '2023-03-31 10:25:32');
INSERT INTO realise (id_car, id_activity, date_time)
VALUES (2, 2, '2023-03-31 11:25:32');
INSERT INTO realise (id_car, id_activity, date_time)
VALUES (2, 7, '2023-03-31 11:55:32');

INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (1, '2023-03-31 12:55:32.121', '2023-03-31 12:55:48.445','2023-03-31 12:56:12.389');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (1, '2023-03-31 13:01:25.251', '2023-03-31 13:01:47.987','2023-03-31 13:02:02.895');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (1, '2023-03-31 13:18:56.721', '2023-03-31 13:19:23.546','2023-03-31 13:20:06.915');

INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (2, '2023-03-31 12:55:32.122', '2023-03-31 12:55:48.445','2023-03-31 12:56:12.389');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (2, '2023-03-31 13:01:25.252', '2023-03-31 13:01:47.987','2023-03-31 13:02:02.895');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (2, '2023-03-31 13:18:56.742', '2023-03-31 13:19:23.546','2023-03-31 13:20:06.915');

INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (3, '2023-03-31 12:55:32.123', '2023-03-31 12:55:48.445','2023-03-31 12:56:12.389');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (3, '2023-03-31 13:01:25.253', '2023-03-31 13:01:47.987','2023-03-31 13:02:02.895');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (3, '2023-03-31 13:18:56.723', '2023-03-31 13:19:23.546','2023-03-31 13:20:06.915');

INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (4, '2023-03-31 12:55:32.124', '2023-03-31 12:55:48.445','2023-03-31 12:56:12.389');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (4, '2023-03-31 13:01:25.254', '2023-03-31 13:01:47.987','2023-03-31 13:02:02.895');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (4, '2023-03-31 13:18:56.724', '2023-03-31 13:19:23.546','2023-03-31 13:20:06.915');

INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (5, '2023-03-31 12:55:32.125', '2023-03-31 12:55:48.445','2023-03-31 12:56:12.389');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (5, '2023-03-31 13:01:25.255', '2023-03-31 13:01:47.987','2023-03-31 13:02:02.895');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (5, '2023-03-31 13:18:56.725', '2023-03-31 13:19:23.546','2023-03-31 13:20:06.915');

INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (6, '2023-03-31 12:55:32.126', '2023-03-31 12:55:48.445','2023-03-31 12:56:12.389');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (6, '2023-03-31 13:01:25.256', '2023-03-31 13:01:47.987','2023-03-31 13:02:02.895');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (6, '2023-03-31 13:18:56.726', '2023-03-31 13:19:23.546','2023-03-31 13:20:06.915');

INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (7, '2023-03-31 12:55:32.127', '2023-03-31 12:55:48.445','2023-03-31 12:56:12.389');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (7, '2023-03-31 13:01:25.257', '2023-03-31 13:01:47.987','2023-03-31 13:02:02.895');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (7, '2023-03-31 13:18:56.727', '2023-03-31 13:19:23.546','2023-03-31 13:20:06.915');

INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (8, '2023-03-31 12:55:32.128', '2023-03-31 12:55:48.445','2023-03-31 12:56:12.389');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (8, '2023-03-31 13:01:25.258', '2023-03-31 13:01:47.987','2023-03-31 13:02:02.895');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (8, '2023-03-31 13:18:56.728', '2023-03-31 13:19:23.546','2023-03-31 13:20:06.915');

INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (9, '2023-03-31 12:55:32.129', '2023-03-31 12:55:48.445','2023-03-31 12:56:12.389');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (9, '2023-03-31 13:01:25.259', '2023-03-31 13:01:47.987','2023-03-31 13:02:02.895');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (9, '2023-03-31 13:18:56.729', '2023-03-31 13:19:23.546','2023-03-31 13:20:06.915');

INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (10, '2023-03-31 12:55:32.120', '2023-03-31 12:55:48.445','2023-03-31 12:56:12.389');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (10, '2023-03-31 13:01:25.250', '2023-03-31 13:01:47.987','2023-03-31 13:02:02.895');
INSERT INTO race (id_car, race_start, sector1, race_finish)
VALUES (10, '2023-03-31 13:18:56.720', '2023-03-31 13:19:23.546','2023-03-31 13:20:06.915');