SET search_path TO cars;

DROP TABLE IF EXISTS car CASCADE;
CREATE TABLE car
(
    id_car    SERIAL,
    password  VARCHAR(50),
    query_id  VARCHAR(100) UNIQUE,
    pseudo    VARCHAR(50),
    avatar    json,
    PRIMARY KEY (id_car)
);

DROP TABLE IF EXISTS section CASCADE;
CREATE TABLE section
(
    id_section SERIAL,
    label      VARCHAR(50),
    password   VARCHAR(64),
    PRIMARY KEY (id_section)
);

DROP TABLE IF EXISTS race CASCADE;
CREATE TABLE race
(
    id_race     SERIAL,
    race_start  TIMESTAMP(3) NOT NULL,
    sector1     TIMESTAMP(3),
    race_finish TIMESTAMP(3) NOT NULL,
    id_car      INTEGER      NOT NULL,
    PRIMARY KEY (id_race),
    FOREIGN KEY (id_car) REFERENCES Car (id_car) ON DELETE CASCADE
);

DROP TABLE IF EXISTS activity CASCADE;
CREATE TABLE activity
(
    id_activity SERIAL,
    label       VARCHAR(50),
    id_section  INTEGER NOT NULL,
    PRIMARY KEY (id_activity),
    FOREIGN KEY (id_section) REFERENCES section (id_section)
);

DROP TABLE IF EXISTS realise CASCADE;
CREATE TABLE realise
(
    id_car      SERIAL,
    id_activity INTEGER,
    date_time   TIMESTAMP,
    PRIMARY KEY (id_car, id_activity),
    FOREIGN KEY (id_car) REFERENCES car (id_car) ON DELETE CASCADE,
    FOREIGN KEY (id_activity) REFERENCES activity (id_activity)
);
