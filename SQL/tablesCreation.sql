SET search_path TO cars;

DROP TABLE IF EXISTS car CASCADE;
CREATE TABLE car
(
    id_car   SERIAL,
    password VARCHAR(64)  NOT NULL,
    query_id VARCHAR(100) NOT NULL UNIQUE,
    pseudo   VARCHAR(50)  NOT NULL,
    avatar   json         NOT NULL,
    PRIMARY KEY (id_car)
);

DROP TABLE IF EXISTS section CASCADE;
CREATE TABLE section
(
    id_section SERIAL,
    label      VARCHAR(50) NOT NULL UNIQUE,
    password   VARCHAR(64) NOT NULL,
    PRIMARY KEY (id_section)
);

DROP TABLE IF EXISTS race CASCADE;
CREATE TABLE race
(
    id_race     SERIAL,
    race_start  TIMESTAMP(3) NOT NULL,
    sector1     TIMESTAMP(3) NOT NULL,
    sector2     TIMESTAMP(3) NOT NULL,
    speed     FLOAT NOT NULL,
    race_finish TIMESTAMP(3) NOT NULL,
    video_url   VARCHAR(512),
    id_car      INTEGER      NOT NULL,
    PRIMARY KEY (id_race),
    FOREIGN KEY (id_car) REFERENCES Car (id_car) ON DELETE CASCADE
);

DROP TABLE IF EXISTS activity CASCADE;
CREATE TABLE activity
(
    id_activity SERIAL,
    label       VARCHAR(50) NOT NULL,
    id_section  INTEGER     NOT NULL,
    PRIMARY KEY (id_activity),
    FOREIGN KEY (id_section) REFERENCES section (id_section)
);

DROP TABLE IF EXISTS realise CASCADE;
CREATE TABLE realise
(
    id_car      SERIAL    NOT NULL,
    id_activity SERIAL    NOT NULL,
    date_time   TIMESTAMP NOT NULL,
    PRIMARY KEY (id_car, id_activity),
    FOREIGN KEY (id_car) REFERENCES car (id_car) ON DELETE CASCADE,
    FOREIGN KEY (id_activity) REFERENCES activity (id_activity)
);

DROP TABLE IF EXISTS token CASCADE;
CREATE TABLE token
(
    id_token        SERIAL,
    token           VARCHAR(64) NOT NULL UNIQUE,
    expiration_date DATE        NOT NULL,
    id_section      INTEGER     NOT NULL,
    PRIMARY KEY (id_token),
    FOREIGN KEY (id_section) REFERENCES section (id_section)
);

DROP TABLE IF EXISTS car_token CASCADE;
CREATE TABLE car_token
(
    id_token        SERIAL,
    token           VARCHAR(64) NOT NULL UNIQUE,
    expiration_date DATE        NOT NULL,
    id_car          INTEGER     NOT NULL,
    PRIMARY KEY (id_token),
    FOREIGN KEY (id_car) REFERENCES car (id_car)
);

CREATE VIEW ranking AS
SELECT id_race,
       ('1970-01-01 00:00:00'::timestamp + (race_finish - race.race_start)::interval)::timestamp AS total_time,
       id_car
FROM race
WHERE (id_car, (race_finish - race.race_start)) IN
      (select id_car, min(race_finish - race_start) AS total_time FROM race GROUP BY id_car)
ORDER BY total_time;
