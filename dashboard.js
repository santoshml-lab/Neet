async function loadUser() {

    const { data: { user } } = await db.auth.getUser();

    if (!user) {
        window.location.href = "Login.html";
        return;
    }

    alert("Welcome " + user.email);
    const { data, error } = await db
    .from("users")
    .select("*")
    .eq("email", user.email)
    .single();

if (error) {
    alert(error.message);
} else {
    console.log(data);
    alert("XP: " + data.xp);
}
}

loadUser();
