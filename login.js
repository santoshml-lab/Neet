document.addEventListener("DOMContentLoaded", () => {

    alert("JS Loaded");

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function(e) {

        e.preventDefault();

        alert("Login Button Working");

    });

});
