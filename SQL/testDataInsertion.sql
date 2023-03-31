SET search_path TO course;
INSERT INTO Avatar(image) VALUES ('image1');
INSERT INTO avatar(image) VALUES ('image2');

INSERT INTO voiture(mdp, url, pseudo, id_avatar) VALUES ('1234', '4356', 'PlayerOne', 1);
INSERT INTO voiture(mdp, url, pseudo, id_avatar) VALUES ('4321', '4357', 'PlayerTwo', 2);

INSERT INTO section(nom) VALUES ('Informatique');
INSERT INTO section(nom) VALUES ('Automatique');
INSERT INTO section(nom) VALUES ('Horlogerie');
INSERT INTO section(nom) VALUES ('Electronique');
INSERT INTO section(nom) VALUES ('Micromécanique');
INSERT INTO section(nom) VALUES ('Laborantin');
INSERT INTO section(nom) VALUES ('Dessinateur');

INSERT INTO activite(nom, id_section) VALUES ('Informer', 1);
INSERT INTO activite(nom, id_section) VALUES ('Automatiser', 2);
INSERT INTO activite(nom, id_section) VALUES ('Horlogifier', 3);
INSERT INTO activite(nom, id_section) VALUES ('Electroniser', 4);
INSERT INTO activite(nom, id_section) VALUES ('Micromécaniser', 5);
INSERT INTO activite(nom, id_section) VALUES ('Laborantiser', 6);
INSERT INTO activite(nom, id_section) VALUES ('Dessiner', 7);

INSERT INTO realiser(id_voiture, id_activite, date_heure) VALUES (1, 1, '2023-03-31 09:25:32');
INSERT INTO realiser(id_voiture, id_activite, date_heure) VALUES (1, 2, '2023-03-31 10:25:32');
INSERT INTO realiser(id_voiture, id_activite, date_heure) VALUES (1, 3, '2023-03-31 11:25:32');
INSERT INTO realiser(id_voiture, id_activite, date_heure) VALUES (1, 4, '2023-03-31 12:25:32');
INSERT INTO realiser(id_voiture, id_activite, date_heure) VALUES (1, 5, '2023-03-31 13:25:32');
INSERT INTO realiser(id_voiture, id_activite, date_heure) VALUES (1, 6, '2023-03-31 14:25:32');
INSERT INTO realiser(id_voiture, id_activite, date_heure) VALUES (1, 7, '2023-03-31 15:25:32');
INSERT INTO realiser(id_voiture, id_activite, date_heure) VALUES (2, 1, '2023-03-31 09:25:32');
INSERT INTO realiser(id_voiture, id_activite, date_heure) VALUES (2, 3, '2023-03-31 10:25:32');
INSERT INTO realiser(id_voiture, id_activite, date_heure) VALUES (2, 2, '2023-03-31 11:25:32');
INSERT INTO realiser(id_voiture, id_activite, date_heure) VALUES (2, 7, '2023-03-31 11:55:32');

INSERT INTO manche(numéro, id_voiture) VALUES (1, 1);
INSERT INTO manche(numéro, id_voiture) VALUES (1, 2);
INSERT INTO manche(numéro, id_voiture) VALUES (2, 1);

INSERT INTO temps(secteur, temps, id_manche) VALUES (1, '00:25.125', 1);
INSERT INTO temps(secteur, temps, id_manche) VALUES (2, '00:26.125', 1);
INSERT INTO temps(secteur, temps, id_manche) VALUES (3, '00:23.125', 1);
INSERT INTO temps(secteur, temps, id_manche) VALUES (1, '00:23.125', 2);
INSERT INTO temps(secteur, temps, id_manche) VALUES (2, '00:22.125', 2);
INSERT INTO temps(secteur, temps, id_manche) VALUES (3, '00:24.125', 2);
INSERT INTO temps(secteur, temps, id_manche) VALUES (1, '00:28.125', 3);
INSERT INTO temps(secteur, temps, id_manche) VALUES (2, '00:29.125', 3);
INSERT INTO temps(secteur, temps, id_manche) VALUES (3, '00:23.125', 3);
