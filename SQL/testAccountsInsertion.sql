SET
    search_path TO cars;

INSERT INTO section (label, password)
VALUES ('test', 'ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13');

INSERT INTO activity (label, id_section)
VALUES ('tester', (SELECT id_section FROM section WHERE label = 'test'));

INSERT INTO car (password, query_id, pseudo, avatar)
VALUES ('ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13', '9999', 'Test', '{
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