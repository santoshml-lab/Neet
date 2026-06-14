/* =========================
   INSTALL APP LOGIC
========================= */
const API_BASE = "https://neetlession.onrender.com/ai";

let deferredPrompt = null;

/* Capture install prompt */
window.addEventListener("beforeinstallprompt", (e) => {

    e.preventDefault();

    deferredPrompt = e;

    console.log("✅ PWA Install Ready");

});

/* Install button */
document.addEventListener("DOMContentLoaded", () => {

    const installBtn =
    document.getElementById("installBtn");

    if (!installBtn) return;

    installBtn.addEventListener("click", async () => {

        if (!deferredPrompt) {

            alert(
                "📲 Open this website in Chrome and wait a few seconds to install the app."
            );

            return;

        }

        deferredPrompt.prompt();

        const choice =
        await deferredPrompt.userChoice;

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

        navigator.serviceWorker
            .register("./service-worker.js")

            .then(() => {

                console.log(
                    "✅ Service Worker Registered"
                );

            })

            .catch((err) => {

                console.log(
                    "❌ Service Worker Error:",
                    err
                );

            });

    });

}

  async function learn(topic){

    if(!topic){
        alert("📚 Please enter a topic.");
        return;
    }

    const loading =
    document.getElementById("loading");

    const output =
    document.getElementById("output");

    if(loading){
        loading.style.display = "block";
    }

    output.innerHTML =
    "🤖 Generating your lesson...";

    try{

        const res = await fetch(API_BASE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: "learn",
                message: topic
            })
        });

        const data = await res.json();

        output.innerHTML =
marked.parse(
    data.reply || "No lesson generated."
);
        

    }

    catch(err){

        output.innerHTML =
        "❌ Failed to generate lesson.";

        console.log(err);

    }

    if(loading){
        loading.style.display = "none";
    }
} 

    

    
async function solve(question){

    const output =
    document.getElementById("output");

    const loading =
    document.getElementById("loading");

    if(!question){
        alert("Enter question");
        return;
    }

    if(loading){
        loading.style.display = "block";
    }

    output.innerHTML = "Solving...";

    try{

        const res = await fetch(API_BASE, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: "solve",
                message: question
            })
        });

        const data = await res.json();

        output.innerHTML =
        marked.parse(data.reply || "").replace(/\n/g, "<br>");

    }

    catch(err){

        output.innerHTML =
        "Error while solving";

        console.log(err);

    }

    if(loading){
        loading.style.display = "none";
    }
}
        
      

    

/* =========================
   EXTERNAL LINKS
========================= */

function openLink(url) {

    window.open(url, "_blank");

}
