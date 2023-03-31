SET search_path TO course;
CREATE TABLE Avatar(
   id_avatar SERIAL ,
   image VARCHAR(100),
   PRIMARY KEY(id_avatar)
);

CREATE TABLE Car(
   id_car SERIAL,
   password VARCHAR(50) ,
   url VARCHAR(100) ,
   pseudo VARCHAR(50) ,
   id_avatar INTEGER NOT NULL,
   PRIMARY KEY(id_car),
   FOREIGN KEY(id_avatar) REFERENCES Avatar(id_avatar)
);

CREATE TABLE Section(
   id_section SERIAL,
   label VARCHAR(50) ,
   PRIMARY KEY(id_section)
);

CREATE TABLE Run(
   id_run SERIAL,
   number INTEGER,
   id_car INTEGER NOT NULL,
   PRIMARY KEY(id_run),
   FOREIGN KEY(id_car) REFERENCES Car(id_car)
);

CREATE TABLE Measured_time(
   id_measured_time SERIAL,
   sector INTEGER,
   measured_time TIME(3),
   id_run INTEGER NOT NULL,
   PRIMARY KEY(id_measured_time),
   FOREIGN KEY(id_run) REFERENCES Run(id_run)
);

CREATE TABLE Activity(
   id_activity SERIAL,
   label VARCHAR(50) ,
   id_section INTEGER NOT NULL,
   PRIMARY KEY(id_activity),
   FOREIGN KEY(id_section) REFERENCES Section(id_section)
);

CREATE TABLE realise(
   id_car SERIAL,
   id_activity INTEGER,
   date_time TIMESTAMP,
   PRIMARY KEY(id_car, id_activity),
   FOREIGN KEY(id_car) REFERENCES Car(id_car),
   FOREIGN KEY(id_activity) REFERENCES Activity(id_activity)
);
