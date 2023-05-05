SET search_path TO cars;

CREATE TABLE
    Avatar(
        id_avatar SERIAL,
        image VARCHAR(100),
        PRIMARY KEY(id_avatar)
    );

CREATE TABLE
    Car(
        id_car SERIAL,
        password VARCHAR(50),
        query_id VARCHAR(100) UNIQUE,
        pseudo VARCHAR(50),
        id_avatar INTEGER NOT NULL,
        PRIMARY KEY(id_car),
        FOREIGN KEY(id_avatar) REFERENCES Avatar(id_avatar)
    );

CREATE TABLE
    Section(
        id_section SERIAL,
        label VARCHAR(50),
        password VARCHAR(64),
        PRIMARY KEY(id_section)
    );

CREATE TABLE
    Race(
        id_race SERIAL,
        race_start TIMESTAMP(3) NOT NULL,
        race_finish TIMESTAMP(3) NOT NULL,
        id_car INTEGER NOT NULL,
        PRIMARY KEY(id_race),
        FOREIGN KEY(id_car) REFERENCES Car(id_car) ON DELETE CASCADE
    );

CREATE TABLE
    Activity(
        id_activity SERIAL,
        label VARCHAR(50),
        id_section INTEGER NOT NULL,
        PRIMARY KEY(id_activity),
        FOREIGN KEY(id_section) REFERENCES Section(id_section)
    );

CREATE TABLE
    realise(
        id_car SERIAL,
        id_activity INTEGER,
        date_time TIMESTAMP,
        PRIMARY KEY(id_car, id_activity),
        FOREIGN KEY(id_car) REFERENCES Car(id_car) ON DELETE CASCADE,
        FOREIGN KEY(id_activity) REFERENCES Activity(id_activity)
    );
