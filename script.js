// Dark mode

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = "☀️";
    } else {
        themeBtn.innerHTML = "🌙";
    }

});


// Project button

function showMessage(project) {

    alert(project + " is selected!");

}


// Contact form

function sendMessage() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const result = document.getElementById("result");

    if (name === "" || email === "" || message === "") {

        result.innerHTML = "⚠️ Please fill all fields.";
        result.style.color = "red";

    } else {

        result.innerHTML = "✅ Message submitted successfully!";
        result.style.color = "green";

    }

}