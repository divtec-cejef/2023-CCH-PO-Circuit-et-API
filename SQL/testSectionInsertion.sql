INSERT INTO section (label, password)
VALUES ('test', 'ec53d08aca4ee303c639a2568bf6898573b8670a172ebe23ef4dc0aa745cbb13');

INSERT INTO activity (label, id_section)
VALUES ('tester', (SELECT id_section FROM section WHERE label = 'test'));