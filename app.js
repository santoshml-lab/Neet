/* ===================================
   NEET LEARNING HUB PREMIUM
   app.js PART 1
=================================== */

const API_URL = "https://neetlession.onrender.com/ai";

/* ==========================
AI Greeting
========================== */

const greetings = [
"👋 Welcome back Future Doctor!",
"🩺 Ready to crack NEET today?",
"🚀 Every chapter brings you closer to MBBS.",
"📚 Stay consistent. Success follows discipline.",
"🔥 Keep your study streak alive!"
];

function nextTip(){

const msg = document.getElementById("aiMessage");

if(!msg) return;

msg.innerHTML =
greetings[Math.floor(Math.random()*greetings.length)];

}

/* ==========================
Toast Notification
========================== */

function showToast(text){

const toast=document.createElement("div");

toast.className="toast";

toast.innerHTML=text;

document.body.appendChild(toast);

setTimeout(()=>{

toast.classList.add("show");

},100);

setTimeout(()=>{

toast.classList.remove("show");

setTimeout(()=>{

toast.remove();

},300);

},2500);

}

/* ==========================
API Request
========================== */

async function callAI(type,message){

try{

const res=await fetch(API_URL,{

method:"POST",

headers:{

"Content-Type":"application/json"

},

body:JSON.stringify({

type:type,

message:message

})

});

const data=await res.json();

if(data.reply){

return data.reply;

}

return "⚠️ No response received.";

}catch(err){

return "❌ Server Error.";

}

}

/* ==========================
Loading
========================== */

function loading(id){

document.getElementById(id).innerHTML=

"⏳ AI is generating...";

}

/* ===================================
   NEET LEARNING HUB PREMIUM
   app.js PART 2
=================================== */

/* ==========================
Daily Challenge
========================== */

async function dailyChallenge(){

loading("output");

const reply = await callAI(
"dailychallenge",
"Generate today's NEET challenge"
);

document.getElementById("output").innerHTML = reply;

showToast("🔥 Daily Challenge Ready!");

}

/* ==========================
Study Planner
========================== */

async function generateStudyPlan(){

const topic = document.getElementById("studyInput").value;

if(topic.trim()==""){

showToast("⚠️ Enter your study details.");

return;

}

loading("studyResult");

const reply = await callAI(
"studyplan",
topic
);

document.getElementById("studyResult").innerHTML = reply;

showToast("📅 Study Plan Generated!");

}

/* ==========================
NEET Rank Predictor
========================== */

function predictRank(){

const marks =
Number(document.getElementById("neetMarks").value);

let result="";

if(marks>=700){

result="🏆 Expected Rank: Under AIR 100";

}
else if(marks>=650){

result="🥇 Expected Rank: AIR 100 - 3000";

}
else if(marks>=600){

result="🥈 Expected Rank: AIR 3000 - 10000";

}
else if(marks>=550){

result="🥉 Expected Rank: AIR 10000 - 25000";

}
else if(marks>=500){

result="📘 Keep Practicing! Estimated Rank: 25000+";

}
else{

result="💪 Don't give up. Improve with daily practice.";

}

document.getElementById("rankResult").innerHTML=result;

showToast("🎯 Rank Predicted!");

}

/* ==========================
Progress Animation
========================== */

let progress=32;

function increaseProgress(){

if(progress<100){

progress+=2;

document.getElementById("progressFill").style.width=
progress+"%";

document.getElementById("progressText").innerHTML=
progress+"% Completed";

showToast("✅ Progress Updated!");

}

}

/* ===================================
   NEET LEARNING HUB PREMIUM
   app.js PART 3
=================================== */

/* ==========================
PWA Install
========================== */

let deferredPrompt;

window.addEventListener("beforeinstallprompt",(e)=>{

e.preventDefault();

deferredPrompt=e;

});

const installBtn=document.getElementById("installBtn");

if(installBtn){

installBtn.addEventListener("click",async()=>{

if(!deferredPrompt){

showToast("📲 Install is available in supported browsers.");

return;

}

deferredPrompt.prompt();

await deferredPrompt.userChoice;

deferredPrompt=null;

});

}

/* ==========================
Learn AI
========================== */

async function learn(topic){

const reply=await callAI("learn",topic);

return reply;

}

/* ==========================
Solve AI
========================== */

async function solve(question){

const reply=await callAI("solve",question);

return reply;

}

/* ==========================
MCQ Generator
========================== */

async function generateMCQ(subject){

const reply=await callAI("mcq",subject);

return reply;

}

/* ==========================
Revision Notes
========================== */

async function revision(topic){

const reply=await callAI("revision",topic);

return reply;

}

/* ==========================
Quiz Generator
========================== */

async function generateQuiz(topic){

const reply=await callAI("quiz",topic);

return reply;

}

/* ==========================
Flashcards
========================== */

async function generateFlashcards(topic){

const reply=await callAI("flashcards",topic);

return reply;

}

/* ==========================
Weakness Analysis
========================== */

async function analyzePerformance(data){

const reply=await callAI("analysis",data);

return reply;

}

/* ==========================
NCERT Notes
========================== */

async function generateNCERTNotes(topic){

const reply=await callAI("ncertnotes",topic);

return reply;

}

/* ==========================
Initialize
========================== */

window.addEventListener("load",()=>{

nextTip();

if("serviceWorker" in navigator){

navigator.serviceWorker.register("./service-worker.js");

}

showToast("🩺 Welcome to NEET Learning Hub!");

});




    
            
                

        
       
       
    


