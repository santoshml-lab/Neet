async function loadDashboard() {

    const {
        data: { user }
    } = await db.auth.getUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    const { data, error } = await db
        .from("users")
        .select("*")
        .eq("email", user.email)
        .single();

    if (error) {
        alert(error.message);
        return;
    }

    document.getElementById("xpValue").innerText = data.xp || 0;
    document.getElementById("lessonValue").innerText = data.lessons || 0;
    document.getElementById("quizValue").innerText = data.quizzes || 0;
    document.getElementById("streakValue").innerText = data.streak || 0;
    document.getElementById("badgeValue").innerText = data.badge || "🌱 Beginner";

    let xp = data.xp || 0;
    let level = Math.floor(xp / 100) + 1;

    document.getElementById("levelValue").innerText = "Level " + level;

    let percent = xp % 100;

    document.getElementById("progressBar").style.width = percent + "%";

    document.getElementById("progressText").innerText =
        xp + " XP";
}

loadDashboard();
