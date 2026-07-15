/* ==========================================
   LOGIN.JS
   PART 1
========================================== */

// Supabase Client
const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
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
