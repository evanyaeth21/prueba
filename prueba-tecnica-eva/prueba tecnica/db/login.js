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
const db = firebase.firestore()

const arrayUsers = []

function getUsers() {
    db.collection("users").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            arrayUsers.push(doc.data())
        })
    })
}

getUsers()

function validateUser(){
    const email = document.getElementById("loginName").value
    let res = {}
    for(i = 0; i < arrayUsers.length; i++){
        if(email === arrayUsers[i].gmail){
            res = {
                roll: arrayUsers[i].roll
            }
            break
        }
    }
    return res
}

function signIn() {
    const email = document.getElementById("loginName").value
    const password = document.getElementById("loginPassword").value
    const result = validateUser()
    if (!email.length || !password.length ) {
        alert("Los campos estan vacios")
    } else {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                if(result.roll === "administrador"){
                    window.location.replace("admin.html");
                }else if(result.roll === "usuario"){
                    window.location.replace("index.html");
                } else {
                    console.log("algo salío mal")
                }
            })
            .catch(error => {
                let errorCode = error.code;
                let errorMessage = error.message;
                alert(errorMessage)
            });
    }
}

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
        firebase.auth().createUserWithEmailAndPassword(registerEmail, registerPassword)
            .then((userCredential) => {
                // Signed in
                document.getElementById("registerEmail").value = ""
                document.getElementById("registerPassword").value = ""
                document.getElementById("registerRepeatPassword").value = ""
                document.getElementById("registerSelect").value = "Seleccione tipo de usuario"
                db.collection("users").add({
                    gmail: registerEmail,
                    roll: registerSelect
                })
                getUsers()
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
