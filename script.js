const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = "☀️";
    } else {
        themeBtn.innerHTML = "🌙";
    }

});


function projectAlert(projectName) {

    alert("You selected: " + projectName);

}


const form = document.getElementById("contactForm");

form.addEventListener("submit", function(event) {

    event.preventDefault();

    const name = document.getElementById("name").value;
    const result = document.getElementById("formResult");

    result.innerHTML =
        "✅ Thanks " + name + "! Your message has been received.";

    result.style.color = "#22c55e";

    form.reset();

});