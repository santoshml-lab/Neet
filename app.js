alert("JS START");

const API_BASE = "https://neetlession.onrender.com/ai";

let deferredPrompt = null;
let supabase = null;

/* =========================
   INIT SUPABASE SAFE WAY
========================= */

function initSupabase(){

    if (!window.supabase) {
        console.log("Supabase library missing");
        return false;
    }

    supabase = window.supabase.createClient(
        "https://ivwolfnwzrcvcwkobyzl.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml2d29sZm53enJjdmN3a29ieXpsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1MjgyNzgsImV4cCI6MjA5NzEwNDI3OH0.VrXoMx0gNFa0j7Lwsc6S-J5bTYgG0P40PLHDZ-tNAO0";

    );

    console.log("Supabase Ready");
    return true;
}

/* run init immediately */
initSupabase();

/* =========================
   PWA INSTALL
========================= */

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
});

/* =========================
   SERVICE WORKER
========================= */

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./service-worker.js")
        .then(() => console.log("SW OK"))
        .catch(err => console.log(err));
    });
}

/* =========================
   LEARN FUNCTION (FINAL STABLE)
========================= */

async function learn(topic){

    alert("LEARN START");

    if (!supabase) {
        const ok = initSupabase();
        if (!ok) {
            alert("Supabase not loaded");
            return;
        }
    }

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");

    loading.style.display = "block";
    output.innerHTML = "Loading...";

    try{

        const res = await fetch(API_BASE, {
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body: JSON.stringify({
                type:"learn",
                message:topic
            })
        });

        const data = await res.json();
        const lesson = data.reply || "No response";

        output.innerHTML = marked.parse(lesson);

        const { data: savedData, error } = await supabase
            .from("learn")
            .insert([
                {
                    topic: topic,
                    reply: lesson
                }
            ])
            .select();

        console.log(savedData, error);

        if(error){
            alert(error.message);
            return;
        }

        alert("✅ SAVED SUCCESS");

    } catch(err){
        alert("ERROR: " + err.message);
    }

    loading.style.display = "none";
}

/* =========================
   SOLVE FUNCTION
========================= */

async function solve(question){

    alert("SOLVE START");

    if (!supabase) {
        const ok = initSupabase();
        if (!ok) {
            alert("Supabase not loaded");
            return;
        }
    }

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");

    loading.style.display = "block";

    try{

        const res = await fetch(API_BASE, {
            method:"POST",
            headers:{ "Content-Type":"application/json" },
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
            return;
        }

        alert("✅ SAVED");

    } catch(err){
        alert(err.message);
    }

    loading.style.display = "none";
}

/* =========================
   GLOBAL FIX (MOST IMPORTANT)
========================= */

window.learn = learn;
window.solve = solve;

/* =========================
   INSTALL BUTTON FIX
========================= */

document.addEventListener("DOMContentLoaded", () => {

    const btn = document.getElementById("installBtn");

    if(btn){
        btn.addEventListener("click", async () => {

            if(!deferredPrompt){
                alert("Open Chrome and wait");
                return;
            }

            deferredPrompt.prompt();
            deferredPrompt = null;
        });
    }

});
