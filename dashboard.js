async function loadUser() {

    const { data: { user } } = await db.auth.getUser();

    if (!user) {
        window.location.href = "Login.html";
        return;
    }

    alert("Welcome " + user.email);
     
}
            
loadUser();
