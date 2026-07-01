async function loadDashboard() {

    const {
        data: { user }
    } = await db.auth.getUser();

    if (!user) {
        window.location.href = "Login.html";
        return;
    }

    let { data, error } = await db
        .from("users")
        .select("*")
        .eq("email", user.email);

    if (error) {
        alert(error.message);
        return;
    }

    // Agar record nahi hai to naya record banao
    if (data.length === 0) {

        await db.from("users").insert([{
            email: user.email,
            xp: 0,
            lessons: 0,
            quizzes: 0,
            streak: 0,
            badge: "🌱 Beginner"
        }]);

        data = [{
            xp: 0,
            lessons: 0,
            quizzes: 0,
            streak: 0,
            badge: "🌱 Beginner"
        }];
    }

    const userData = data[0];

    document.getElementById("xpValue").innerText = userData.xp;
    document.getElementById("lessonValue").innerText = userData.lessons;
    document.getElementById("quizValue").innerText = userData.quizzes;
    document.getElementById("streakValue").innerText = userData.streak;
    document.getElementById("badgeValue").innerText = userData.badge;

    let level = Math.floor(userData.xp / 100) + 1;

    document.getElementById("levelValue").innerText = "Level " + level;
    document.getElementById("progressBar").style.width = (userData.xp % 100) + "%";
    document.getElementById("progressText").innerText = userData.xp + " XP";
}

loadDashboard();
