
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyBiSahlCuocoeSgJthmPEx7qINuq_n-bjg",
    authDomain: "nnaicha-d4436.firebaseapp.com",
    projectId: "nnaicha-d4436",
    storageBucket: "nnaicha-d4436.appspot.com",
    messagingSenderId: "79655175990",
    appId: "1:79655175990:web:442581a2986538c7d8d597",
    measurementId: "G-NKJZJ28D3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);
const auth = getAuth(app);

let emailinput = document.getElementById('emailinput');
let passwordinput = document.getElementById('passwordinput');
let fnameinput = document.getElementById('fnameinput');
let lnamedinput = document.getElementById('lnamedinput');
let MainForm = document.getElementById('MainForm');

let RegistreUser = evt => {
    evt.preventDefault();
    createUserWithEmailAndPassword(auth, emailinput.value, passwordinput.value)
        .then((credentials) => {
            const userDocRef = ref(db, 'UserAuthList/' + credentials.user.uid);

            set(userDocRef, {
                firstname: fnameinput.value,
                lastname: lnamedinput.value,
                email: emailinput.value
                // Add any additional fields you want to store in Realtime Database
            })
                .then(() => {
                    console.log('User data successfully stored in Realtime Database');
                })
                .catch((error) => {
                    alert('Error storing user data in Realtime Database: ' + error.message);
                    console.error(error);
                });
        })
        .catch((error) => {
            alert('Error creating user: ' + error.message);
            console.error(error);
        });
};

MainForm.addEventListener('submit', RegistreUser);
window.location.href = 'login.html';