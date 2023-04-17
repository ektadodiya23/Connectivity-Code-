import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword , } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyDm8lO9l8d8XUayj-dOgVPtjsAwYRpZ5cM",
    authDomain: "auth-form-5ea4a.firebaseapp.com",
    databaseURL: "https://auth-form-5ea4a-default-rtdb.firebaseio.com",
    projectId: "auth-form-5ea4a",
    storageBucket: "auth-form-5ea4a.appspot.com",
    messagingSenderId: "607068770244",
    appId: "1:607068770244:web:3b18327eddf122ce4e9e91"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);




// register form 
const addBtn = document.getElementById('register');
if (addBtn) {
addBtn.addEventListener('click' , (event)=>{
    event.preventDefault()

    const user = document.getElementById('usernameForm').value;
    const email = document.getElementById('emailForm').value;
    const number = document.getElementById('phoneNumForm').value;
    const password = document.getElementById('passwordForm').value;
    console.log(user,email,number,password);

    createUserWithEmailAndPassword(auth,email,password)
            .then(() => {
                window.location.assign("login.html")
                alert("Registration Sucessfully")
            })
            .catch((error) => {
                alert("Error Message" + error.message)
            });        
})
}




// login form
const addLogin = document.getElementById('userLogin');
addLogin.addEventListener('click' , (event) =>{
    event.preventDefault()

    const email = document.getElementById('loginEmail').value
    const password = document.getElementById('loginPassword').value

    signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
  
    const user = userCredential.user;
   
    window.location.assign("index.html")

  
  })
  .catch((error) => {
   alert(error.message)
   
  });
})



// validation form..

























