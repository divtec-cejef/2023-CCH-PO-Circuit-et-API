INSERT INTO section (label, password)
VALUES ('test', 'Admlocal1');

INSERT INTO activity (label, id_section)
VALUES ('test', (SELECT id_section FROM section WHERE label = 'test'));