SELECT id, termid, def, date , playerid
FROM MotsDefs
INTO OUTFILE '/var/lib/mysql-files/motsDefs.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
;


SELECT *
FROM MotsTypes
INTO OUTFILE '/var/lib/mysql-files/motsTypes.csv'
FIELDS TERMINATED BY ','
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
;
