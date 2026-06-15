alert("TEST 1");
console.log("TEST 2");
alert("APP LOADED");

const API_BASE = "https://neetlession.onrender.com/ai";

let deferredPrompt = null;

/* =========================
   SUPABASE SETUP
========================= */

const supabaseUrl = "https://ivwolfnwzrcvcwkobyzl.supabase.co";
const supabaseKey = "sb_publishable_075JKJ0rhGQEGGluslpLMw_N14-S_cJ";

let supabase = null;

window.addEventListener("DOMContentLoaded", () => {

    if (!window.supabase) {
        alert("❌ Supabase library not loaded");
        console.error("Supabase library missing");
        return;
    }

    supabase = window.supabase.createClient(
        supabaseUrl,
        supabaseKey
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
   LEARN FUNCTION
========================= */

async function learn(topic){

    alert("LEARN FUNCTION STARTED");

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
    
        console.log("✅ Learn Saved");
        alert("✅ Learn Saved");

    } catch(err){
        console.log("❌ Learn Error:", err);
        alert("❌ Learn Error: " + err.message);
    }

    loading.style.display = "none";
}

/* =========================
   SOLVE FUNCTION
========================= */

async function solve(question){

    alert("SOLVE FUNCTION STARTED");

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
            throw error;
        }

        console.log("✅ Solve Saved");
        alert("✅ Solve Saved");

    } catch(err){
        console.log("❌ Solve Error:", err);
        alert("❌ Solve Error: " + err.message);
    }

    loading.style.display = "none";
}

/* =========================
   EXTERNAL LINKS
========================= */

function openLink(url){
    window.open(url, "_blank");
}

