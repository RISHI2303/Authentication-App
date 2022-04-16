var emailNode = document.getElementById("email");
var passwordNode = document.getElementById("password-field");
var loginButtonNode = document.getElementById("signinButton");
var signUpButtonNode = document.getElementById("signup");

function onLoad() {
    emailNode.value = "";
    passwordNode.value = "";
}

onLoad();

loginButtonNode.addEventListener("click", function () {
    var data = {
        email: emailNode.value,
        password: passwordNode.value
    }
    console.log(data);
    var request = new XMLHttpRequest();
    request.open("POST", "/login");
    request.setRequestHeader("Content-Type", "application/json");
    var dataToSend = JSON.stringify(data);
    console.log(dataToSend);
    request.send(dataToSend);
    request.addEventListener("load", function () {
        // console.log(`this is response: ${request.responseText}`);
        var response = request.responseText;
        // console.log(response);
        if (response === 1) {
            // window.location.href = "/";
            alert("Login successful!");
        } else {
            alert("Invalid email or password");
        }
    });
});