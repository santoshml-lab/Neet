/* ==========================================
   LOGIN.JS
   PART 1
========================================== */

// Supabase Client
const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE__KEY
);

// Toggle Password
function togglePassword(){

const password=document.getElementById("password");

if(password.type==="password"){

password.type="text";

}else{

password.type="password";

}

}

// Login Form
document.getElementById("loginForm").addEventListener("submit",async(e)=>{

e.preventDefault();

const email=document.getElementById("email").value.trim();

const password=document.getElementById("password").value;

const button=document.querySelector(".login-btn");

button.disabled=true;
button.innerHTML="⏳ Logging in...";

try{

const {data,error}=await supabase.auth.signInWithPassword({

email,
password

});

if(error) throw error;

alert("✅ Login Successful!");

window.location.href="index.html";

}catch(err){

alert("❌ "+err.message);

}finally{

button.disabled=false;
button.innerHTML="🚀 Login";

}

});

/* ==========================================
   LOGIN.JS
   PART 2
========================================== */

/* ===========================
Google Login
=========================== */

async function googleLogin(){

try{

const { error } = await supabase.auth.signInWithOAuth({

provider:"google",

options:{
redirectTo:window.location.origin+"/index.html"
}

});

if(error) throw error;

}catch(err){

alert("❌ "+err.message);

}

}

/* ===========================
Forgot Password
=========================== */

async function forgotPassword(){

const email=prompt("Enter your registered email:");

if(!email) return;

try{

const { error }=await supabase.auth.resetPasswordForEmail(email,{

redirectTo:window.location.origin+"/reset-password.html"

});

if(error) throw error;

alert("✅ Password reset link sent to your email.");

}catch(err){

alert("❌ "+err.message);

}

}

/* ===========================
Auto Login Check
=========================== */

window.addEventListener("load",async()=>{

const { data }=await supabase.auth.getSession();

if(data.session){

window.location.href="index.html";

}

});

/* ===========================
Auth State Change
=========================== */

supabase.auth.onAuthStateChange((event,session)=>{

if(event==="SIGNED_IN"){

console.log("✅ User Signed In");

}

if(event==="SIGNED_OUT"){

console.log("🚪 User Signed Out");

}

});

/* ===========================
Logout Helper
=========================== */

async function logout(){

await supabase.auth.signOut();

window.location.href="login.html";

}
