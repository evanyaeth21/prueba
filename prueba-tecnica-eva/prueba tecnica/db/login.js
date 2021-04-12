var firebaseConfig = {
    apiKey: "AIzaSyDKm2AGsuink1OzcV43XhmXqt5rhyCjiCc",
    authDomain: "prueba-tecnica-2cff7.firebaseapp.com",
    projectId: "prueba-tecnica-2cff7",
    storageBucket: "prueba-tecnica-2cff7.appspot.com",
    messagingSenderId: "74003447411",
    appId: "1:74003447411:web:39249d5aba9d29a9153406"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Eva me pela
// sing in 
function signIn() {
    const email = document.getElementById("loginName").value
    const password = document.getElementById("loginPassword").value
    if (!email.length || !password.length) {
        alert("Los campos estan vacios")
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                window.location.replace("index.html");
            })
            .catch(error => {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage)
            });
    }
}

// register user
function registerUser() {
    const registerEmail = document.getElementById("registerEmail").value
    const registerPassword = document.getElementById("registerPassword").value
    const repeatPassword = document.getElementById("registerRepeatPassword").value
    const registerSelect = document.getElementById("registerSelect").value
    if (!registerEmail.length || !registerPassword.length || !repeatPassword.length || registerSelect === "null") {
        alert("Los campos estan vacios")
    } else if (registerPassword != repeatPassword) {
        alert("la contraseña no coincide")
    } else {
        console.log({
            email: registerEmail,
            password: registerPassword,
            repeatPassword: repeatPassword,
            registerSelect: registerSelect
        })
        firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword)
            .then((userCredential) => {
                // Signed in
                document.getElementById("registerEmail").value = ""
                document.getElementById("registerPassword").value = ""
                document.getElementById("registerRepeatPassword").value = ""
                document.getElementById("registerSelect").value = "Seleccione tipo de usuario"
                alert("Creado con exíto")
                // ...
            })
            .catch((error) => {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage)
                // ..
            });
    }
}

document.getElementById("login").addEventListener("click", () => signIn())

document.getElementById("registerUserOne").addEventListener("click", () => registerUser())
