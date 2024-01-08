
    import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
    import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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
    const auth = getAuth(app);
    const dbref = ref(getDatabase(app));  // Correction ici

    let emailinput = document.getElementById('emailinput');
    let passwordinput = document.getElementById('passwordinput');
    let MainForm = document.getElementById('MainForm');

    let signinUser = evt => {
        evt.preventDefault();
        signInWithEmailAndPassword(auth, emailinput.value, passwordinput.value)
            .then((userCredential) => {
                get(child(dbref, 'UserAuthList/' + userCredential.user.uid))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            sessionStorage.setItem("user-info", JSON.stringify({
                                firstname: snapshot.val().firstname,
                                lastname: snapshot.val().lastname
                            }))
                        }
                        sessionStorage.setItem("user-creds", JSON.stringify(userCredential.user));
                        window.location.href = 'home.html'
                    })
            })
            .catch((error) => {
                console.error(error.code);
                console.error(error.message);
                alert('Login failed. Please check your credentials.');
            });
    };

    MainForm.addEventListener('submit', signinUser);
