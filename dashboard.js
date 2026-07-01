async function loadUser() {

    const {
        data: { user }
    } = await db.auth.getUser();

    if (!user) {
        window.location.href = "Login.html";
        return;
    }

    console.log("Logged in user:", user.email);
}
