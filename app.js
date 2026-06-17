
alert("JS START");

const API_BASE = "https://neetlession.onrender.com/ai";

let deferredPrompt = null;

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
   LEARN FUNCTION
========================= */

async function learn(topic){

    alert("LEARN START");

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");

    loading.style.display = "block";
    output.innerHTML = "Loading lesson...";

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

    } catch(err){
        alert(err.message);
    }

    loading.style.display = "none";
}

/* =========================
   QUIZ GENERATOR
========================= */

async function generateQuiz(topic){

    alert("QUIZ START");

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");

    if(!topic){
        alert("Enter a topic first");
        return;
    }

    loading.style.display = "block";
    output.innerHTML = "Generating Quiz...";

    try{

        const res = await fetch(API_BASE, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                type:"learn",
                message:
                `Create 5 NEET MCQs on ${topic}.
                 Give options A,B,C,D and correct answer.`
            })
        });

        const data = await res.json();

        output.innerHTML =
            marked.parse(data.reply || "No quiz generated");

    } catch(err){

        alert("Quiz Error: " + err.message);

    }

    loading.style.display = "none";
}

/* =========================
   GLOBAL
========================= */

window.learn = learn;
window.solve = solve;
window.generateQuiz = generateQuiz;

/* =========================
   INSTALL BUTTON
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
