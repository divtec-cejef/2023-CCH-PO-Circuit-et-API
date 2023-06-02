SELECT
  race.id_race,
  (race.race_finish - race.race_start) AS total_time,
  race.id_car
FROM
  race
WHERE
  (
    (
      race.id_car,
      (race.race_finish - race.race_start)
    ) IN (
      SELECT
        race_1.id_car,
        min((race_1.race_finish - race_1.race_start)) AS total_time
      FROM
        race race_1
      GROUP BY
        race_1.id_car
    )
  )
ORDER BY
  (race.race_finish - race.race_start);