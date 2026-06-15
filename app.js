/* =========================
   CONFIG
========================= */
alert("APP LOADED");

const API_BASE = "https://neetlession.onrender.com/ai";

let deferredPrompt = null;

/* =========================
   FIREBASE SETUP (NEW 🔥)
========================= */

const firebaseConfig = {
  apiKey: "AIzaSyB8BXZtnmsKy9QSVeTl1JdcF3mux9fvBnc",
  authDomain: "neet-learning-f9c15.firebaseapp.com",
  projectId: "neet-learning-f9c15",
  storageBucket: "neet-learning-f9c15.firebasestorage.app",
  messagingSenderId: "608606527229",
  appId: "1:608606527229:web:7e26a9937605cbafb92894",
  measurementId: "G-368FE6VXR9"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
    
      


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
   LEARN FUNCTION (UPDATED 🔥)
========================= */

async function learn(topic){
   alert("LEARN FUNCTION STARTED");

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

        const lesson = data.reply || "No response";

        output.innerHTML = marked.parse(lesson);

        /* =========================
           FIREBASE SAVE (NEW)
        ========================= */
       alert("ABOUT TO SAVE FIREBASE");

        try {
    await db.collection("learn").add({
        topic: topic,
        reply: lesson,
        time: new Date()
    });

    console.log("✅ Learn Saved");
    alert("✅ Learn Saved");

} catch (err) {
    console.log("❌ Firestore Error:", err);
    alert("❌ Firestore Error: " + err.message);
}

/* =========================
   SOLVE FUNCTION (UPDATED 🔥)
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

        const answer = data.reply || "";

        output.innerHTML = marked.parse(answer);

        /* =========================
           FIREBASE SAVE (NEW)
        ========================= */

        try {
    await db.collection("solve").add({
        question: question,
        reply: answer,
        time: new Date()
    });

    console.log("✅ Solve Saved");
    alert("✅ Solve Saved");

} catch (err) {
    console.log("❌ Firestore Error:", err);
    alert("❌ Firestore Error: " + err.message);
}
            
            
    

/* =========================
   EXTERNAL LINKS
========================= */

function openLink(url){
    window.open(url, "_blank");
}
