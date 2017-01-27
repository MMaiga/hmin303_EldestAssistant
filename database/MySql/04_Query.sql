/*
mysql> DESC eldest_responsible;
+---------------+----------+------+-----+-------------------+-----------------------------+
| Field         | Type     | Null | Key | Default           | Extra                       |
+---------------+----------+------+-----+-------------------+-----------------------------+
| id            | int(11)  | NO   | PRI | NULL              | auto_increment              |
| idEldest      | int(11)  | YES  | MUL | NULL              |                             |
| idResponsible | int(11)  | YES  | MUL | NULL              |                             |
| date          | datetime | YES  |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
+---------------+----------+
*/


/* getEldest */
select *
from person  p
where p.id in (
  select r.idEldest
  from eldest_responsible r
  where r.idResponsible = 183
)
;

select p.id  , p.firstname   , p.lastname , p.birthdate , p.address , p.mail , p.phone      , p.role , p.photo , r.idResponsible , r.date , r.state

from person  p , eldest_responsible r
where  r.idEldest =p.id  and p.id in (
  select r.idEldest
  from eldest_responsible r
  where r.idResponsible = 290)
  ;

  /* addEldest */

  /* getEldest */
  select *
  from person  p
  where p.id in (
    select r.idEldest
    from eldest_responsible r
    where r.idResponsible = 183
  )
  ;

  /* getResponsible */
  select *
  from person  p
  where p.id in (
    select r.idResponsible
    from eldest_responsible r
    where r.idEldest = 41
  )
  ;

  select distinct(p.id)  , p.firstname   , p.lastname , p.birthdate , p.address , p.mail , p.phone      , p.role , p.photo , r.idResponsible , r.date , r.state
  from person  p , eldest_responsible r
  where  r.idResponsible= p.id  and p.id in (
    select r.idResponsible
    from eldest_responsible r
    where r.state > -1 and r.idEldest =369)

    select p.id  , p.firstname   , p.lastname , p.birthdate , p.address , p.mail , p.phone , p.role , p.photo
    from person  p
    where  p.id in (
      select r.idResponsible
      from eldest_responsible r
      where r.state > -1 and r.idEldest =369)
