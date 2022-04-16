var emailNode = document.getElementById("email");
var passwordNode = document.getElementById("password");
var signUpButtonNode = document.getElementById("signUp");

function onLoad() { 
    emailNode.value = "";
    passwordNode.value = "";
}

onLoad();

signUpButtonNode.addEventListener("click", function () { 
    var data = {
        email: emailNode.value,
        password: passwordNode.value
    };

    var request = new XMLHttpRequest();
    request.open("POST", "/signup");
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));

    request.addEventListener("load", function () { 
        if (request.responseText === "1") {
            alert("Sign up successful!");
            window.location.href = "/";
        }
        else if(request.responseText === "2") {
            alert("User Already Exists!");
        }

        else {
            alert("Sign up failed!");
        }
    });
});