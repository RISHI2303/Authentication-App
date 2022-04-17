var logout = document.createElement("button");
logout.innerHTML = "Logout";
document.body.appendChild(logout);

logout.addEventListener("click", function () {
	var request = new XMLHttpRequest();
	request.open("GET", "/logout");
	request.send();

	request.addEventListener("load", function () {
		if (request.responseText == "1") {
			alert("Logout successful!");
			window.location.href = "/";
		} else {
			alert("Logout failed!");
		}
	});
});
