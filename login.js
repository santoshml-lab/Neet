// ===============================
// LOGIN.JS
// ===============================

const supabase = window.db;

document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async (e) => {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const button = document.querySelector(".login-btn");

        button.disabled = true;
        button.innerHTML = "⏳ Logging in...";

        try {

            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            });

            if (error) throw error;

            alert("✅ Login Successful");

            window.location.href = "index.html";

        } catch (err) {

            alert("❌ " + err.message);

        } finally {

            button.disabled = false;
            button.innerHTML = "🚀 Login";

        }

    });

});

// Toggle Password
function togglePassword() {

    const password = document.getElementById("password");

    password.type =
        password.type === "password" ? "text" : "password";

}

// Google Login
async function googleLogin() {

    const { error } = await supabase.auth.signInWithOAuth({

        provider: "google",

        options: {
            redirectTo: window.location.origin + "/index.html"
        }

    });

    if (error) alert(error.message);

}

// Forgot Password
async function forgotPassword() {

    const email = prompt("Enter your registered email");

    if (!email) return;

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {

        alert(error.message);

    } else {

        alert("✅ Password reset email sent.");

    }

}
