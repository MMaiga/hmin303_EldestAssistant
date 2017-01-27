
DROP TRIGGER trgr_eldest_responsible_autoremove ;

DELIMITER //

CREATE TRIGGER trgr_eldest_responsible_autoremove
AFTER UPDATE
ON eldest_responsible FOR EACH ROW

BEGIN
IF (NEW.state = -1) THEN
DELETE FROM eldest_responsible
where id = NEW.id ;
END IF;

END;
//

DELIMITER ;


SHOW TRIGGERS LIKE '%'\G
/*
@Author : lortole
@Besoin : Supprimer les doublons dans la table ami. (1,2) = (2,1)
*/
