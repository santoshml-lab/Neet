alert("JS START");

const API_BASE = "https://neetlession.onrender.com/ai";

let deferredPrompt = null;
let supabase = null;

/* =========================
   SUPABASE INIT (FINAL FIX)
========================= */

window.addEventListener("DOMContentLoaded", () => {

    if (!window.supabase) {
        alert("SUPABASE NOT FOUND");
        console.error("Supabase library missing");
        return;
    }

    supabase = window.supabase.createClient(
        "https://ivwolfnwzrcvcwkobyzl.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2d29sZm53enJjdmN3a29ieXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjgyNzgsImV4cCI6MjA5NzEwNDI3OH0.VrXoMx0gNFa0j7Lwsc6S-J5bTYgG0P40PLHDZ-tNAO0"
    );

    console.log("✅ Supabase Initialized");
});

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
   LEARN FUNCTION (FINAL STABLE)
========================= */

async function learn(topic){

    alert("LEARN FUNCTION STARTED");

    if(!supabase){
        alert("Supabase not ready");
        return;
    }

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");

    if(!topic){
        alert("📚 Please enter a topic");
        return;
    }

    loading.style.display = "block";
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
        const lesson = data.reply || "No response";

        output.innerHTML = marked.parse(lesson);

        alert("ABOUT TO SAVE SUPABASE");

        const { data: savedData, error } = await supabase
            .from("learn")
            .insert([
                {
                    topic: topic,
                    reply: lesson
                }
            ])
            .select();

        console.log("SUPABASE RESPONSE:", { savedData, error });

        if(error){
            alert("DB Error: " + error.message);
            throw error;
        }

        alert("✅ Learn Saved Successfully");

    } catch(err){
        console.log("❌ Learn Error:", err);
        alert("❌ Error: " + err.message);
    }

    loading.style.display = "none";
}

/* =========================
   SOLVE FUNCTION (FINAL STABLE)
========================= */

async function solve(question){

    alert("SOLVE FUNCTION STARTED");

    if(!supabase){
        alert("Supabase not ready");
        return;
    }

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");

    if(!question){
        alert("❌ Enter question");
        return;
    }

    loading.style.display = "block";
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
        const answer = data.reply || "";

        output.innerHTML = marked.parse(answer);

        const { error } = await supabase
            .from("learn")
            .insert([
                {
                    topic: question,
                    reply: answer
                }
            ]);

        if(error){
            alert(error.message);
            throw error;
        }

        alert("✅ Solve Saved");

    } catch(err){
        console.log(err);
        alert("❌ Error: " + err.message);
    }

    loading.style.display = "none";
}

/* =========================
   EXTERNAL LINKS
========================= */

function openLink(url){
    window.open(url, "_blank");
}

