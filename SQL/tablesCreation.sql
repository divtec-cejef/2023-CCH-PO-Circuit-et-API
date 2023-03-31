SET search_path TO course;
CREATE TABLE Avatar(
   id_avatar SERIAL ,
   image VARCHAR(100),
   PRIMARY KEY(id_avatar)
);

CREATE TABLE Voiture(
   id_voiture SERIAL,
   mdp VARCHAR(50) ,
   url VARCHAR(100) ,
   pseudo VARCHAR(50) ,
   id_avatar INTEGER NOT NULL,
   PRIMARY KEY(id_voiture),
   FOREIGN KEY(id_avatar) REFERENCES Avatar(id_avatar)
);

CREATE TABLE Section(
   id_section SERIAL,
   nom VARCHAR(50) ,
   PRIMARY KEY(id_section)
);

CREATE TABLE Manche(
   id_manche SERIAL,
   numéro INTEGER,
   id_voiture INTEGER NOT NULL,
   PRIMARY KEY(id_manche),
   FOREIGN KEY(id_voiture) REFERENCES Voiture(id_voiture)
);

CREATE TABLE Temps(
   id_temps SERIAL,
   secteur INTEGER,
   temps TIME(3),
   id_manche INTEGER NOT NULL,
   PRIMARY KEY(id_temps),
   FOREIGN KEY(id_manche) REFERENCES Manche(id_manche)
);

CREATE TABLE Activite(
   id_activite SERIAL,
   nom VARCHAR(50) ,
   id_section INTEGER NOT NULL,
   PRIMARY KEY(id_activite),
   FOREIGN KEY(id_section) REFERENCES Section(id_section)
);

CREATE TABLE realiser(
   id_voiture SERIAL,
   id_activite INTEGER,
   date_heure TIMESTAMP,
   PRIMARY KEY(id_voiture, id_activite),
   FOREIGN KEY(id_voiture) REFERENCES Voiture(id_voiture),
   FOREIGN KEY(id_activite) REFERENCES Activite(id_activite)
);
