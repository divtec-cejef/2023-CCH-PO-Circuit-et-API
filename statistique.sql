/* Obtenir les bonus les plus effectué */
SELECT count(car.id_car), activity.label
FROM cars.car
         INNER JOIN cars.realise on car.id_car = realise.id_car
         INNER JOIN cars.activity on realise.id_activity = activity.id_activity
group by activity.label
order by count(car.id_car) desc;

/* Nbr total de voiture */
select count(car.id_car) from cars.car;

/* Nbr total de course */
select count(race.id_car) from cars.race;

/* Nbr de course possèdent une vidéo*/
select count(race.video_url) from cars.race;

/* nbr d'activité effectuer */
SELECT count(car.id_car)
FROM cars.car
         INNER JOIN cars.realise on car.id_car = realise.id_car
         INNER JOIN cars.activity on realise.id_activity = activity.id_activity;

/* nbr de voiture ayant effectuer au moins une activité */
SELECT count(car.id_car)
FROM cars.car
         INNER JOIN cars.realise on car.id_car = realise.id_car
         INNER JOIN cars.activity on realise.id_activity = activity.id_activity
group by car.id_car;

/* Nbr de voiture ayant effectuer au moins une course*/
SELECT count(car.id_car)
FROM cars.car
         INNER JOIN cars.race on car.id_car = race.id_car
group by car.id_car;

/* Nbr de participant ayant effectuer au moins une course et une activité */
SELECT count(car.id_car)
FROM cars.car
         INNER JOIN cars.realise on car.id_car = realise.id_car
         INNER JOIN cars.activity on realise.id_activity = activity.id_activity
         INNER JOIN cars.race on car.id_car = race.id_car
group by car.id_car;
