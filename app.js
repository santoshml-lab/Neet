alert("JS START");

const API_BASE = "https://neetlession.onrender.com/ai";

// Flashcard Global Variables
let flashcards = [];
let currentCard = 0;

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

        result.innerHTML = marked.parse(data.reply || "No plan generated");
        
       
       xp = Number(xp) + 25;
       saveXP();

       alert("🏆 +25 XP Earned");

        
            
        

      } catch (error) {

        result.innerHTML =
            "Error generating plan";

        console.error(error);
    }
}
   window.generateStudyPlan = generateStudyPlan;

   function predictRank(){

    const marks =
        Number(document.getElementById("neetMarks").value);

    const result =
        document.getElementById("rankResult");

    if(!marks || marks < 0 || marks > 720){
        result.innerHTML =
            "❌ Enter valid marks between 0 and 720";
        return;
    }

    let rank = "";

    if(marks >= 700){
        rank = "AIR 1 - 500";
    }
    else if(marks >= 680){
        rank = "AIR 500 - 3000";
    }
    else if(marks >= 650){
        rank = "AIR 3000 - 10000";
    }
    else if(marks >= 620){
        rank = "AIR 10000 - 20000";
    }
    else if(marks >= 580){
        rank = "AIR 20000 - 50000";
    }
    else if(marks >= 500){
        rank = "AIR 50000+";
    }
    else{
        rank = "Need Improvement 💪";
    }

    result.innerHTML = `
        <h3>🎯 Predicted Rank</h3>
        <p>${rank}</p>
    `;
}
window.predictRank = predictRank;

async function generateNCERT(){

    const input =
        document.getElementById("ncertInput").value;

    const result =
        document.getElementById("ncertResult");

    result.innerHTML = "Generating NCERT Notes...";

    try{

        const response = await fetch(
            API_BASE,
            {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    type:"ncert",
                    message:input
                })
            }
        );

        const data = await response.json();

        result.innerHTML =
            marked.parse(data.reply || "No notes generated");

    }
    catch(error){

        result.innerHTML =
            "Error generating notes";

    }

}

window.generateNCERT = generateNCERT;


async function generateNCERTNotes(){

    const topic = document.getElementById("ncertInput").value;
    const output = document.getElementById("ncertResult");

    if(!topic){
        alert("Enter NCERT chapter");
        return;
    }

    output.innerHTML = "Generating NCERT Notes...";

    try{

        const res = await fetch(API_BASE,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                type:"ncertnotes",
                message:topic
            })
        });

        const data = await res.json();

        output.innerHTML = marked.parse(data.reply || "No notes generated");

    }catch(err){

        output.innerHTML = "Error: " + err.message;

    }
}

window.generateNCERTNotes = generateNCERTNotes;

async function generateFlashcards(){
    alert("Flashcard function started");

    const topic = document.getElementById("flashInput").value;
    const result = document.getElementById("flashResult");

    if(!topic){
        alert("Enter a topic");
        return;
    }

    result.innerHTML = "Generating Flashcards...";

    try{

        const res = await fetch(API_BASE,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                type:"flashcards",
                message:topic
            })
        });

        const data = await res.json();

        
       flashcards = [];

const blocks = data.reply.split("## Flashcard");

blocks.forEach(block => {

    const q = block.match(/\*\*Question:\*\*\s*(.*)/);
    const a = block.match(/\*\*Answer:\*\*\s*(.*)/);

    if(q && a){
        flashcards.push({
            question: q[1].trim(),
            answer: a[1].trim()
        });
    }

});

currentCard = 0;

showCard();

    }catch(err){

        result.innerHTML = "Error: " + err.message;

    }

}

window.generateFlashcards = generateFlashcards;

let showingAnswer = false;

function showCard(){

    const result = document.getElementById("flashResult");

    if(flashcards.length === 0){
        result.innerHTML = "No flashcards found.";
        return;
    }

    showingAnswer = false;

    result.innerHTML = `
        <h2>Flashcard ${currentCard + 1}/${flashcards.length}</h2>
        <p>${flashcards[currentCard].question}</p>
    `;
}

function flipCard(){

    if(flashcards.length === 0) return;

    const result = document.getElementById("flashResult");

    if(showingAnswer){

        result.innerHTML = `
            <h2>Flashcard ${currentCard + 1}/${flashcards.length}</h2>
            <p>${flashcards[currentCard].question}</p>
        `;

        showingAnswer = false;

    }else{

        result.innerHTML = `
            <h2>Flashcard ${currentCard + 1}/${flashcards.length}</h2>
            <p><b>Answer:</b><br>${flashcards[currentCard].answer}</p>
        `;

        showingAnswer = true;
    }
}

function nextCard(){

    if(currentCard < flashcards.length - 1){
        currentCard++;
        showCard();
    }
}

function prevCard(){

    if(currentCard > 0){
        currentCard--;
        showCard();
    }
}

window.showCard = showCard;
window.flipCard = flipCard;
window.nextCard = nextCard;
window.prevCard = prevCard;


    

        
       
       
    


