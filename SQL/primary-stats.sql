SET search_path TO cars;

--Number of cars that didn't took part in a race or didn't realise any activity
select count(id_car) from car where id_car not in (select id_car from realise) and id_car not in (select id_car from race);

--Number of cars that took part in a race or realised an activity
select count(id_car) from car where id_car in (select id_car from realise) or id_car in (select id_car from race);

--Number of cars that realised an activity
select count(id_car) from car where id_car in (select id_car from realise);

--Number of cars that took part in a race
select count(id_car) from car where id_car in (select id_car from race);

--Number of times a car realised an activity in descending order
select count(realise.id_activity), a.label,  s.label from realise
            INNER JOIN activity a on a.id_activity = realise.id_activity
            INNER JOIN section s on s.id_section = a.id_section
            group by a.id_activity, s.label order by count(realise.id_activity) desc;

--Number of activities realised in total
select count(s.id_section) from realise
                                    INNER JOIN activity a on a.id_activity = realise.id_activity
                                    INNER JOIN section s on s.id_section = a.id_section
group by realise.id_car, s.id_section;

--Average number of sections visited by a car
select avg(numberSectionRealisedByCar.number)
from (select count(sectionRealisedByCar.id_section) number
from (select distinct id_car, a.id_section
from realise r inner join activity a on a.id_activity = r.id_activity) as sectionRealisedByCar group by sectionRealisedByCar.id_car) as numberSectionRealisedByCar;