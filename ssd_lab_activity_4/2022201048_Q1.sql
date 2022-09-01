CREATE DEFINER=`root`@`localhost` PROCEDURE `SP_Sum`(
	IN `n1` INT,
	IN `n2` INT,
	OUT `result` INT
)
BEGIN
	Set result = n1 + n2;
END

Call SP_Sum(2,3,@sayi);
SELECT @sayi;
#result-->5