/*Delete doublons*/
DELETE p1.*
FROM
person p1 INNER JOIN person p2
ON p1.phone = p2.phone
;



UPDATE eldest_responsible
SET senderRole=0
WHERE id between 0 and 380;


UPDATE eldest_responsible
SET senderRole=1
WHERE id > 380 ;




ALTER TABLE eldest_responsible
DROP FOREIGN KEY fk_eldest_relation
;

ALTER TABLE eldest_responsible
DROP FOREIGN KEY fk_responsible_relation
;


ALTER TABLE prescription
ADD validation int
;
