/* =========================
   CONFIG
========================= */

const API_BASE = "https://neetlession.onrender.com/ai";

let deferredPrompt = null;

/* =========================
   INSTALL APP LOGIC
========================= */

window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();
    deferredPrompt = e;

    console.log("✅ PWA Install Ready");

});

document.addEventListener("DOMContentLoaded", () => {

    const installBtn = document.getElementById("installBtn");

    if (!installBtn) return;

    installBtn.addEventListener("click", async () => {

        if (!deferredPrompt) {
            alert("📲 Open Chrome and wait to install app");
            return;
        }

        deferredPrompt.prompt();

        const choice = await deferredPrompt.userChoice;

        if (choice.outcome === "accepted") {
            console.log("🎉 App Installed");
        } else {
            console.log("❌ Install Cancelled");
        }

        deferredPrompt = null;
    });

});

/* =========================
   SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker.register("./service-worker.js")
        .then(() => console.log("✅ Service Worker Registered"))
        .catch(err => console.log("❌ SW Error:", err));

    });

}

/* =========================
   LEARN FUNCTION
========================= */

async function learn(topic){

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");

    if(!topic){
        alert("📚 Please enter a topic");
        return;
    }

    if(loading){
        loading.style.display = "block";
    }

    output.innerHTML = "🤖 Generating lesson...";

    try{

        const res = await fetch(API_BASE, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                type:"learn",
                message:topic
            })
        });

        const data = await res.json();

        output.innerHTML =
        marked.parse(data.reply || "No response");

    }
    catch(err){

        console.log(err);
        output.innerHTML = "❌ Failed to generate lesson";

    }

    if(loading){
        loading.style.display = "none";
    }
}

/* =========================
   SOLVE FUNCTION (CHATGPT STYLE)
========================= */

async function solve(question){

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");

    if(!question){
        alert("❌ Enter question");
        return;
    }

    if(loading){
        loading.style.display = "block";
    }

    output.innerHTML = "🧠 Solving...";

    try{

        const res = await fetch(API_BASE, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                type:"solve",
                message:question
            })
        });

        const data = await res.json();

        output.innerHTML =
        marked.parse(data.reply || "");

    }
    catch(err){

        console.log(err);
        output.innerHTML = "❌ Error while solving";

    }

    if(loading){
        loading.style.display = "none";
    }
}

/* =========================
   EXTERNAL LINKS
========================= */

function openLink(url){
    window.open(url, "_blank");
}
