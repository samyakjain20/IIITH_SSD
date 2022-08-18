Select Essn, count(*) as 'Number of projects' from WORKS_ON where Essn = (Select Mgr_ssn from DEPARTMENT where Dnumber = (select Dnum from PROJECT where Pname = 'ProductY')) group by Essn;
