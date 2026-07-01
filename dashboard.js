async function loadDashboard() {

    const { data: { user } } = await db.auth.getUser();

    if (!user) {
        window.location.href = "Login.html";
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
    document.getElementById("badgeValue").innerText = data.badge || "🌱 Beginner";

    const streak = data.streak || 0;
    document.getElementById("streakValue").innerText = streak;

    let xp = data.xp || 0;
    let level = 1;
    let previousXP = 0;
    let nextXP = 100;

    if (xp >= 1000) {
        level = 5;
        previousXP = 1000;
        nextXP = 1500;
    } else if (xp >= 500) {
        level = 4;
        previousXP = 500;
        nextXP = 1000;
    } else if (xp >= 250) {
        level = 3;
        previousXP = 250;
        nextXP = 500;
    } else if (xp >= 100) {
        level = 2;
        previousXP = 100;
        nextXP = 250;
    }

    document.getElementById("levelValue").innerText = "Level " + level;

    let percent = ((xp - previousXP) / (nextXP - previousXP)) * 100;

    if (percent < 0) percent = 0;
    if (percent > 100) percent = 100;

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").innerText = xp + " XP / " + nextXP + " XP";
}

loadDashboard();
