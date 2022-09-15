    var colorBg = false;
    function validateEmail(mail){
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)){
            return (true);
        }
            return (false);
    }
    function validateUsrname(usrname){
        let usr = document.getElementById("fusrname").value;
        var num = false;
        var up = false;
        // console.log(usr);
        for(let c of usr){
            if(Number.isInteger(parseInt(c))){
                num = true;                
            }
            if(c == c.toUpperCase()){
                up = true;
            }
        }
        // console.log(num, " ", up);
        if(num == false || up == false){
            document.getElementById("usrerror").innerHTML = "Invalid Username";
            return false;
        }
        if(num == true && up == true){
            document.getElementById("usrerror").innerHTML = "";
            return true;
        }
    }
        
    function validateForm() {
        // document.getElementById("emailerror").value = "";
        let mname = document.getElementById("fname").value;
        let email = document.getElementById("femail").value;
        let usr = document.getElementById("fusrname").value;
        let pass = document.getElementById("fpassword").value;
        let cpass = document.getElementById("fcpassword").value;
        let validEmail = validateEmail(email);
        // let validUsrname = validateUsrname()
        
        if(validEmail == false)
            document.getElementById("emailerror").innerHTML = "Invalid Email";
        else if(pass != cpass){
            document.getElementById("passerror").innerHTML = "Enter Same Password";
        }else if(validateUsrname(usr)){        
            document.getElementById("fname").value = "";
            document.getElementById("femail").value = "";
            document.getElementById("fusrname").value = "";
            document.getElementById("fpassword").value = "";
            document.getElementById("fcpassword").value = "";
        }
    }
    document.body.addEventListener("keydown", function (ev) {

        // function to check the detection
        ev = ev || window.event; // Event object 'ev'
        var key = ev.which || ev.keyCode; // Detecting keyCode

        var ctrl = ev.ctrlKey ? ev.ctrlKey : ((key === 17)
            ? true : false);

        if (key == 77 && ctrl) {
            if(colorBg == false){
                document.body.style.backgroundColor = "#000";
                document.body.style.color = "#fff";
                colorBg = true;
            }
            else{
                document.body.style.backgroundColor = "#fff";
                document.body.style.color = "#000";
                colorBg = false;
            }                
            console.log("Ctrl+M is pressed.", false);
        }

}, false);
