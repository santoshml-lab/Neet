async function signup() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await db.auth.signUp({
        email,
        password
    });

    if (error) {
        alert(error.message);
    } else {
        alert("Account Created Successfully");
    }
}

async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } =
        await db.auth.signInWithPassword({
            email,
            password
        });

    if (error) {
        alert(error.message);
    } else {
        alert("Login Successful");
        window.location.href = "dashboard.html";
    }
}
