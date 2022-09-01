DECLARE 
   c_name customers_db.CUST_NAME%type; 
   c_city customers_db.CUST_CITY%type;
   c_cntry customers_db.CUST_COUNTRY%type; 
   c_grade customers_db.GRADE%type; 
   CURSOR customersCode is 
    SELECT CUST_NAME, CUST_CITY, CUST_COUNTRY, GRADE FROM customer WHERE AGENT_CODE LIKE "A00%"; 
BEGIN 
   OPEN customersCode; 
   LOOP 
   FETCH customersCode into c_name, c_city, c_cntry, c_grade; 
      EXIT WHEN customersCode%notfound; 
      dbms_output.put_line(c_name || ' ' || c_city || ' ' || c_cntry || ' ' || c_grade); 
   END LOOP; 
   CLOSE customersCode; 
END; 
/