async function signup() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const { data, error } = await db.auth.signUp({
        email,
        password
    });

    if (error) {
        alert(error.message);
        return;
    }

    // users table me profile create
    await db.from("users").insert([{
        name: email.split("@")[0],
        email: email,
        xp: 0,
        lessons: 0,
        quizzes: 0,
        badge: "🌱 Beginner"
    }]);

    alert("Account Created Successfully");
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
        window.location.href = "index.html";
    }
}
