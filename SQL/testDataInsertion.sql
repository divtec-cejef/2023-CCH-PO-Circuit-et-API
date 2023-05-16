SET
    search_path TO cars;

TRUNCATE race CASCADE;
TRUNCATE realise CASCADE;
TRUNCATE car CASCADE;
TRUNCATE activity CASCADE;
TRUNCATE section CASCADE;

INSERT INTO car (id_car, password, query_id, pseudo, avatar)
VALUES (1, '1234', '4356', 'PlayerOne', '{
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
INSERT INTO car (id_car, password, query_id, pseudo, avatar)
VALUES (2, '4321', '4357', 'PlayerTwo', '{
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
VALUES (3, 'Admlocal1', '4358', 'Dråfølin', '{
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
VALUES (4, 'Admlocal1', '4359', 'tobito', '{
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
VALUES (5, 'Admlocal1', '4360', 'Chlore', '{
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

INSERT INTO section (label, password)
VALUES ('Informatique', '$2a$12$gtnqqRe8dLCkTAyN9nmMF.Ugvc6gr2a2fqD.TYLJ3onjKFxgqWhmW');
INSERT INTO section (label, password)
VALUES ('Automatique', '$2a$12$ZqkedbzE3tPHR.xTX2pgmu9DEF2ErmbU/SfzH4EB8ZOQPRzhx0fY2');
INSERT INTO section (label, password)
VALUES ('Horlogerie', '$2a$12$9.wBt3QzyLOpPLJulJ82e.zd1ZS2UIaoZJJRuBskvZyJn2/0lXjxS');
INSERT INTO section (label, password)
VALUES ('Electronique', '$2a$12$xE2VXGD6E7C56oa.Yeq1DOu5B3w.zk98IF..yqsyQFb/kmsAMaCD6');
INSERT INTO section (label, password)
VALUES ('Micromécanique',
        '$2a$12$L9HsTZhPjQveaGL/owD83eHsx9xCMzUKDkyEVD94BSvxMhBqTTHsm');
INSERT INTO section (label, password)
VALUES ('Laborantin', '$2a$12$yNRyGjnlgDqsFuE9JqvMCO4kDXP0hTO08w1ld6L9uum7GwOSXbaQK');
INSERT INTO section (label, password)
VALUES ('Dessinateur', '$2a$12$dkt1tp0LW54GtQ6qoPYwgOkBMj1/x/qb/1nLeNa2hvGsdBqCYLlNm');

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

INSERT INTO race (id_car, race_start, race_finish)
VALUES (1, '2023-03-31 12:55:32.125', '2023-03-31 12:56:12.389');
INSERT INTO race (id_car, race_start, race_finish)
VALUES (1, '2023-03-31 13:01:25.256', '2023-03-31 13:02:02.895');
INSERT INTO race (id_car, race_start, race_finish)
VALUES (2, '2023-03-31 13:18:56.624', '2023-03-31 13:20:06.915');
INSERT INTO race (id_car, race_start, race_finish)
VALUES (2, '2023-03-31 13:18:56.124', '2023-03-31 13:20:06.915');
INSERT INTO race (id_car, race_start, race_finish)
VALUES (3, '2023-03-31 13:18:56.224', '2023-03-31 13:20:06.915');
INSERT INTO race (id_car, race_start, race_finish)
VALUES (3, '2023-03-31 13:18:55.724', '2023-03-31 13:20:06.915');
INSERT INTO race (id_car, race_start, race_finish)
VALUES (4, '2023-03-31 13:18:52.724', '2023-03-31 13:20:06.915');
INSERT INTO race (id_car, race_start, race_finish)
VALUES (4, '2023-03-31 13:18:51.724', '2023-03-31 13:20:06.915');
INSERT INTO race (id_car, race_start, race_finish)
VALUES (5, '2023-03-31 13:18:53.724', '2023-03-31 13:20:06.915');
INSERT INTO race (id_car, race_start, race_finish)
VALUES (5, '2023-03-31 13:18:59.724', '2023-03-31 13:20:06.915');
