--mysql -u root -p db_dico_jdm
show databases;
show tables;

select name from Nodes order by w desc limit 32 ;

select name from Nodes where name like '%chat%' order by w desc limit 32 ;


select RT.name,nB, NN.name , T.def
from Aretes A , Nodes N , Nodes NN , TermDef T ,RelationTypes RT
WHERE A.nA = N.id and N.name = 'chat' and A.nB = NN.id and T.termid = A.nB and RT.id=A.t
order by A.w desc limit 32 ;


select nB, NN.name
from Aretes A , Nodes N , Nodes NN
WHERE A.nA = N.id and N.name = 'chat' and A.nB = NN.id
order by A.w desc limit 32 ;


select nB , A.t , RT.name
from Aretes A , Nodes N , RelationTypes RT
WHERE A.nA = N.id and N.name = 'chat' and RT.id=A.t
order by A.w desc limit 32 ;

SELECT RT.name,NN.id,NN.name,NN.w,T.def
FROM Nodes N ,TermDef T ,Aretes A  , Nodes NN  ,RelationTypes RT
WHERE N.id=T.termid and A.nB = NN.id and T.termid = A.nB and RT.id=A.t and N.name = "chat"
ORDER BY A.w desc LIMIT 25


select Distinct(AT.name)
from Mots M , Aretes A , AretesTypes AT , Mots MM
where M.name = "lion" and ((M.eid=A.nA and MM.eid=A.nb ) or (M.eid=A.nB and MM.eid=A.nA)) and A.t = AT.rtid;

select AT.rtid , AT.name , AT.nom_etendu , AT.info, COUNT(A.rid)
from Mots M , Aretes A , AretesTypes AT , Mots MM
where M.name = "lion" and ((M.eid=A.nA and MM.eid=A.nb ) or (M.eid=A.nB and MM.eid=A.nA)) and A.t = AT.rtid
GROUP BY AT.rtid;




SELECT RT.name as rt_name,NN.eid,NN.name,NN.w,T.def F
ROM Mots N ,MotsDefs T ,Aretes A  , Mots NN  ,AretesTypes RT
WHERE A.nA = N.eid and A.nB = NN.eid and T.termid = A.nB and RT.rtid=A.t and N.name = "lion" ORDER BY A.w desc LIMIT 25
