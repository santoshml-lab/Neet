
const loginForm = document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener("submit", async (e) => {

e.preventDefault();

const email = document.getElementById("email").value;
const password = document.getElementById("password").value;

const { data, error } = await db.auth.signInWithPassword({

email: email,
password: password

});

if (error) {

alert("❌ " + error.message);
return;

}

alert("✅ Login Successful");

window.location.href = "index.html";

});

}

// Google Login
const googleBtn = document.querySelector(".google-btn");

if (googleBtn) {

googleBtn.addEventListener("click", async () => {

const { error } = await db.auth.signInWithOAuth({

provider: "google"

});

if (error) {

alert(error.message);

}

});

}

// Show Password
function togglePassword() {

const password = document.getElementById("password");

password.type =
password.type === "password" ? "text" : "password";

}
