/* ==========================================
   NEET LEARNING HUB V2
   app.js
   PART 1
========================================== */

const API_BASE = "https://neetlession.onrender.com/ai";

/* ===========================
XP SYSTEM
=========================== */

let xp = Number(localStorage.getItem("xp")) || 0;
let lessonCount = Number(localStorage.getItem("lessonCount")) || 0;
let quizCount = Number(localStorage.getItem("quizCount")) || 0;
let badge = localStorage.getItem("badge") || "🌱 Beginner";

/* ===========================
Save Data
=========================== */

function saveProgress(){

localStorage.setItem("xp", xp);
localStorage.setItem("lessonCount", lessonCount);
localStorage.setItem("quizCount", quizCount);
localStorage.setItem("badge", badge);

updateUI();

}

/* ===========================
Badge System
=========================== */

function updateBadge(){

if(xp>=1000){

badge="👨‍⚕️ Future Doctor";

}
else if(xp>=500){

badge="🏆 Expert";

}
else if(xp>=250){

badge="🧠 Scholar";

}
else if(xp>=100){

badge="📚 Learner";

}
else{

badge="🌱 Beginner";

}

}

/* ===========================
Update UI
=========================== */

function updateUI(){

const xpEl=document.getElementById("xp");
const lessonEl=document.getElementById("lessonCount");
const quizEl=document.getElementById("quizCount");
const badgeEl=document.getElementById("badge");

if(xpEl) xpEl.textContent=xp;
if(lessonEl) lessonEl.textContent=lessonCount;
if(quizEl) quizEl.textContent=quizCount;
if(badgeEl) badgeEl.textContent=badge;

}

/* ===========================
Add XP
=========================== */

function addXP(points){

xp+=points;

updateBadge();

saveProgress();

}

/* ===========================
Loading
=========================== */

function showLoading(){

const loading=document.getElementById("loading");

if(loading){

loading.style.display="block";

}

}

function hideLoading(){

const loading=document.getElementById("loading");

if(loading){

loading.style.display="none";

}

}

/* ===========================
Output
=========================== */

function showOutput(text){

const output=document.getElementById("output");

if(!output) return;

if(typeof marked!=="undefined"){

output.innerHTML=marked.parse(text);

}else{

output.innerHTML=text;

}

}

/* ===========================
API CALL
=========================== */

async function callAI(type,message){

showLoading();

try{

const res=await fetch(API_BASE,{

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

hideLoading();

if(data.reply){

showOutput(data.reply);

}else{

showOutput("❌ "+(data.error || "Unknown Error"));

}

}catch(err){

hideLoading();

showOutput("❌ Server Error<br>"+err);

}

}

updateUI();

/* ==========================================
   app.js
   PART 2
========================================== */

/* ===========================
LEARN
=========================== */

async function learn(topic){

if(!topic){

alert("Please enter a topic.");
return;

}

lessonCount++;

addXP(10);

await callAI("learn",topic);

}

/* ===========================
SOLVE
=========================== */

async function solve(question){

if(!question){

alert("Please enter a question.");
return;

}

addXP(10);

await callAI("solve",question);

}

/* ===========================
REVISION NOTES
=========================== */

async function revision(topic){

if(!topic){

alert("Please enter a topic.");
return;

}

addXP(5);

await callAI("revision",topic);

}

/* ===========================
MOCK TEST
=========================== */

async function generateMockTest(topic){

if(!topic){

alert("Please enter a topic.");
return;

}

quizCount++;

addXP(30);

await callAI("mocktest",topic);

}

/* ===========================
MCQ
=========================== */

async function generateMCQ(topic){

if(!topic){

alert("Please enter a topic.");
return;

}

quizCount++;

addXP(15);

await callAI("mcq",topic);

}

/* ===========================
STUDY PLAN
=========================== */

async function generateStudyPlan(){

addXP(25);

await callAI("studyplan","Generate a complete 7-day NEET study plan.");

}

/* ==========================================
   app.js
   PART 2
========================================== */

/* ===========================
LEARN
=========================== */

async function learn(topic){

if(!topic){

alert("Please enter a topic.");
return;

}

lessonCount++;

addXP(10);

await callAI("learn",topic);

}

/* ===========================
SOLVE
=========================== */

async function solve(question){

if(!question){

alert("Please enter a question.");
return;

}

addXP(10);

await callAI("solve",question);

}

/* ===========================
REVISION NOTES
=========================== */

async function revision(topic){

if(!topic){

alert("Please enter a topic.");
return;

}

addXP(5);

await callAI("revision",topic);

}

/* ===========================
MOCK TEST
=========================== */

async function generateMockTest(topic){

if(!topic){

alert("Please enter a topic.");
return;

}

quizCount++;

addXP(30);

await callAI("mocktest",topic);

}

/* ===========================
MCQ
=========================== */

async function generateMCQ(topic){

if(!topic){

alert("Please enter a topic.");
return;

}

quizCount++;

addXP(15);

await callAI("mcq",topic);

}

/* ===========================
STUDY PLAN
=========================== */

async function generateStudyPlan(){

addXP(25);

await callAI("studyplan","Generate a complete 7-day NEET study plan.");

}

/* ==========================================
   app.js
   PART 3
========================================== */

/* ===========================
FLASHCARDS
=========================== */

async function generateFlashcards(topic){

if(!topic){

alert("Please enter a topic.");
return;

}

addXP(20);

await callAI("flashcards",topic);

}

/* ===========================
QUIZ
=========================== */

async function generateQuiz(topic){

if(!topic){

alert("Please enter a topic.");
return;

}

quizCount++;

addXP(20);

await callAI("quiz",topic);

}

/* ===========================
ANALYSIS
=========================== */

async function analyzePerformance(text){

if(!text){

alert("Please enter your performance details.");
return;

}

addXP(15);

await callAI("analysis",text);

}

/* ===========================
NCERT NOTES
=========================== */

async function generateNCERTNotes(topic){

if(!topic){

alert("Please enter a chapter.");
return;

}

addXP(15);

await callAI("ncertnotes",topic);

}

/* ===========================
DAILY CHALLENGE
=========================== */

async function dailyChallenge(){

addXP(20);

await callAI(
"dailychallenge",
"Generate today's NEET daily challenge."
);

}

/* ===========================
UPDATE UI
=========================== */

updateBadge();
updateUI();

/* ==========================================
   app.js
   PART 4 (FINAL)
========================================== */

/* ===========================
PWA INSTALL
=========================== */

let deferredPrompt;

window.addEventListener("beforeinstallprompt",(e)=>{

e.preventDefault();

deferredPrompt=e;

const installBtn=document.getElementById("installBtn");

if(installBtn){

installBtn.style.display="inline-flex";

installBtn.onclick=async()=>{

deferredPrompt.prompt();

const choice=await deferredPrompt.userChoice;

deferredPrompt=null;

installBtn.style.display="none";

};

}

});

/* ===========================
LOGOUT
=========================== */

function logout(){

localStorage.removeItem("user");

localStorage.removeItem("session");

window.location.href="login.html";

}

/* ===========================
DASHBOARD SYNC
=========================== */

function syncDashboard(){

const ids={

xp:["xp","xp2"],
lesson:["lessonCount","lessonCount2"],
quiz:["quizCount","quizCount2"],
badge:["badge","badge2"]

};

ids.xp.forEach(id=>{
const el=document.getElementById(id);
if(el) el.textContent=xp;
});

ids.lesson.forEach(id=>{
const el=document.getElementById(id);
if(el) el.textContent=lessonCount;
});

ids.quiz.forEach(id=>{
const el=document.getElementById(id);
if(el) el.textContent=quizCount;
});

ids.badge.forEach(id=>{
const el=document.getElementById(id);
if(el) el.textContent=badge;
});

}

/* ===========================
WINDOW LOAD
=========================== */

window.onload=()=>{

updateBadge();

updateUI();

syncDashboard();

console.log("✅ NEET Learning Hub V2 Loaded");

};

/* ===========================
GLOBAL ERROR HANDLER
=========================== */

window.addEventListener("error",(e)=>{

console.error("App Error:",e.message);

});

/* ===========================
END
=========================== */




    
            
                

        
       
       
    


