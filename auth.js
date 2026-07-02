async function checkLogin() {

    const { data: { session } } = await db.auth.getSession();

    if (!session) {
        window.location.href = "Login.html";
    }

}

checkLogin();
