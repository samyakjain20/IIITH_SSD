select dept.Dnumber, dept.Dname, count(*) as 'No of Locations' from DEPT_LOCATIONS INNER JOIN (select * from DEPARTMENT where Mgr_ssn in (select id.Essn from (select * from (select f.Essn, count(*) as cnt from (select * from DEPENDENT where Sex = 'F') as f group by f.Essn) as count where count.cnt > 1) as id)) as dept WHERE DEPT_LOCATIONS.Dnumber = dept.Dnumber group by dept.Dnumber;

