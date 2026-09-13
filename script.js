// DARK MODE

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.innerHTML = "☀️";
    } else {
        themeBtn.innerHTML = "🌙";
    }

});


// PROJECT BUTTONS

function projectAlert(projectName) {

    alert("You selected: " + projectName);

}


// CONTACT FORM

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


// BACK TO TOP

const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function() {

    if (window.scrollY > 300) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }

});

topBtn.addEventListener("click", function() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});