/* ===================================
   NEET LEARNING HUB PREMIUM V2
   APP.JS PART 1
=================================== */

const API_URL = "https://neetlession.onrender.com/ai";

/* ==========================
Toast
========================== */

function showToast(message){

const toast=document.createElement("div");

toast.innerHTML=message;

toast.style.position="fixed";
toast.style.bottom="30px";
toast.style.right="30px";
toast.style.background="#2563EB";
toast.style.color="white";
toast.style.padding="14px 20px";
toast.style.borderRadius="12px";
toast.style.zIndex="9999";
toast.style.fontWeight="600";
toast.style.boxShadow="0 15px 30px rgba(0,0,0,.3)";

document.body.appendChild(toast);

setTimeout(()=>{
toast.remove();
},2500);

}

/* ==========================
AI Request
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

return "No response.";

}catch(err){

return "Server Error.";

}

}

/* ==========================
AI Greeting
========================== */

const tips=[

"📚 Revise Biology today.",

"🧪 Practice Organic Chemistry MCQs.",

"⚛ Solve Physics numericals.",

"🔥 Keep your study streak alive.",

"🎯 Small progress every day wins."

];

function nextTip(){

const box=document.getElementById("aiMessage");

if(!box) return;

box.innerHTML=tips[Math.floor(Math.random()*tips.length)];

showToast("🤖 AI Suggestion Updated");

}

/* ===================================
   NEET LEARNING HUB PREMIUM V2
   APP.JS PART 2
=================================== */

/* ==========================
Study Progress
========================== */

let progress = 68;

function increaseProgress(){

if(progress>=100){

showToast("🎉 Today's study already completed!");

return;

}

progress+=5;

document.getElementById("progressFill").style.width=progress+"%";

document.getElementById("progressText").innerHTML=progress+"% Completed";

showToast("✅ Progress Updated");

}

/* ==========================
Daily Challenge
========================== */

async function dailyChallenge(){

const result=await callAI(

"dailychallenge",

"Generate today's NEET challenge"

);

showToast("🔥 Daily Challenge Ready");

console.log(result);

}

/* ==========================
Study Planner
========================== */

async function generateStudyPlan(){

const goal=prompt("Enter your target");

if(!goal) return;

const result=await callAI(

"studyplan",

goal

);

showToast("📅 Study Plan Generated");

console.log(result);

}

/* ==========================
Rank Predictor
========================== */

function predictRank(){

const marks=document.getElementById("neetMarks");

const result=document.getElementById("rankResult");

if(!marks || !result) return;

const m=parseInt(marks.value);

if(isNaN(m)){

result.innerHTML="Enter valid marks.";

return;

}

let rank="";

if(m>=700){

rank="Expected Rank : Top 100";

}

else if(m>=650){

rank="Expected Rank : Top 1,000";

}

else if(m>=600){

rank="Expected Rank : Top 5,000";

}

else if(m>=550){

rank="Expected Rank : Top 15,000";

}

else{

rank="Keep Practicing 💪";

}

result.innerHTML=rank;

showToast("🎯 Rank Predicted");

}

/* ===================================
   NEET LEARNING HUB PREMIUM V2
   APP.JS PART 3
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
AI Modules
========================== */

async function learn(topic){

return await callAI("learn",topic);

}

async function solve(question){

return await callAI("solve",question);

}

async function generateMCQ(subject){

return await callAI("mcq",subject);

}

async function revision(topic){

return await callAI("revision",topic);

}

async function generateQuiz(topic){

return await callAI("quiz",topic);

}

async function generateFlashcards(topic){

return await callAI("flashcards",topic);

}

async function generateNCERTNotes(topic){

return await callAI("ncertnotes",topic);

}

async function analyzePerformance(text){

return await callAI("analysis",text);

}

/* ==========================
Initialize App
========================== */

window.addEventListener("load",()=>{

nextTip();

if("serviceWorker" in navigator){

navigator.serviceWorker.register("./service-worker.js")

.then(()=>{

console.log("Service Worker Registered");

})

.catch(err=>{

console.log(err);

});

}

showToast("🩺 Welcome to NEET Learning Hub V2");

});




    
            
                

        
       
       
    


