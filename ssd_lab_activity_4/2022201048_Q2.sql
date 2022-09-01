CREATE DEFINER=`root`@`localhost` PROCEDURE `getCustomers`( IN city varchar(100) )
BEGIN
	SELECT CUST_NAME FROM customer WHERE WORKING_AREA = city;
END

CALL getCustomers('Bangalore');