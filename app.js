alert("JS START");

const API_BASE = "https://neetlession.onrender.com/ai";

let deferredPrompt = null;

/* =========================
   XP SYSTEM
========================= */
let badge = localStorage.getItem("badge") || "🌱 Beginner";

function updateBadge(){

    if(xp >= 1000){
        badge = "👨‍⚕️ Future Doctor";
    }
    else if(xp >= 500){
        badge = "🏆 Expert";
    }
    else if(xp >= 250){
        badge = "🧠 Scholar";
    }
    else if(xp >= 100){
        badge = "📚 Learner";
    }
    else{
        badge = "🌱 Beginner";
    }

    localStorage.setItem("badge", badge);

    const badgeEl = document.getElementById("badge");
    if(badgeEl){
        badgeEl.innerText = badge;
    }
}

let xp = localStorage.getItem("xp") || 0;
let lessonCount = localStorage.getItem("lessonCount") || 0;
let quizCount = localStorage.getItem("quizCount") || 0;

function updateXPUI(){

    const xpEl = document.getElementById("xp");
    const lessonEl = document.getElementById("lessonCount");
    const quizEl = document.getElementById("quizCount");

    if(xpEl) xpEl.innerText = xp;
    if(lessonEl) lessonEl.innerText = lessonCount;
    if(quizEl) quizEl.innerText = quizCount;
}

function saveXP(){

    localStorage.setItem("xp", xp);
    localStorage.setItem("lessonCount", lessonCount);
    localStorage.setItem("quizCount", quizCount);

    updateXPUI();
    updateBadge();
}

    

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

        xp = Number(xp) + 10;
        lessonCount = Number(lessonCount) + 1;

        saveXP();

        alert("🏆 +10 XP Earned");

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

/* =========================
   MOCK TEST GENERATOR
========================= */

async function generateMockTest(topic){

    alert("MOCK TEST START");

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");

    if(!topic){
        alert("Enter a topic first");
        return;
    }

    loading.style.display = "block";
    output.innerHTML = "Generating Mock Test...";

    try{

        const res = await fetch(API_BASE, {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                type:"mocktest",
                message:topic
            })
        });

        const data = await res.json();

        output.innerHTML =
            marked.parse(data.reply || "No mock test generated");

        xp = Number(xp) + 30;

        saveXP();

        alert("🏆 +30 XP Earned");

    } catch(err){

        alert("Mock Test Error: " + err.message);

    }

    loading.style.display = "none";
}
/* =========================
   REVISION NOTES
========================= */

async function revision(topic){

    const output = document.getElementById("output");
    const loading = document.getElementById("loading");

    if(!topic){
        alert("Enter a topic first");
        return;
    }

    loading.style.display = "block";
    output.innerHTML = "Generating Revision Notes...";

    try{

        const res = await fetch(API_BASE,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                type:"revision",
                message:topic
            })
        });

        const data = await res.json();

        output.innerHTML =
        marked.parse(data.reply || "No notes generated");

        xp = Number(xp) + 5;

        saveXP();

    }catch(err){

        alert("Revision Error: " + err.message);

    }

    loading.style.display = "none";
}

    
            
            

        
        

/* =========================
   GLOBAL
========================= */

window.learn = learn;
window.solve = solve;

window.generateMockTest = generateMockTest;
window.revision = revision;


/* =========================
   INSTALL BUTTON
========================= */

document.addEventListener("DOMContentLoaded", () => {

    updateXPUI();
    updateBadge();
   

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
async function generateMCQ(subject){

    const output = document.getElementById("output");

    output.innerHTML = "Generating MCQs...";

    try{

        const res = await fetch(API_BASE,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                type:"mcq",
                message:subject
            })
        });

        const data = await res.json();

        output.innerHTML =
            marked.parse(data.reply || "No MCQs generated");

        xp = Number(xp) + 15;
        saveXP();
       }catch(err){

output.innerHTML =
    "Error: " + err.message;

}

}

window.generateMCQ = generateMCQ;

async function dailyChallenge(){

const output = document.getElementById("output");

output.innerHTML = "🔥 Loading Daily Challenge...";

try{

    const res = await fetch(API_BASE,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body: JSON.stringify({
            type:"dailychallenge",
            message:"Generate today's challenge"
        })
    });

    const data = await res.json();

    output.innerHTML =
        marked.parse(data.reply || "No challenge generated");

    xp = Number(xp) + 20;

    saveXP();

    alert("🏆 +20 XP Earned");

}catch(err){

    alert("Challenge Error: " + err.message);

}

}

window.dailyChallenge = dailyChallenge;
async function generateStudyPlan() {

    const input =
        document.getElementById("studyInput").value;

    const result =
        document.getElementById("studyResult");

    result.innerHTML = "Generating Study Plan...";

    try {

        const response = await fetch(
            API_BASE,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    type: "studyplan",
                    message: input
                })
            }
        );

        const data = await response.json();

        result.innerHTML = `
        <pre>${data.reply}</pre>
       `;

        
            
        

    } catch (error) {

        result.innerHTML =
            "Error generating plan";

        console.error(error);
    }
}

    

        
       
       
    


