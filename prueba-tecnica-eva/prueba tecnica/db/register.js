var firebaseConfig = {
    apiKey: "AIzaSyDKm2AGsuink1OzcV43XhmXqt5rhyCjiCc",
    authDomain: "prueba-tecnica-2cff7.firebaseapp.com",
    projectId: "prueba-tecnica-2cff7",
    storageBucket: "gs://prueba-tecnica-2cff7.appspot.com",
    messagingSenderId: "74003447411",
    appId: "1:74003447411:web:39249d5aba9d29a9153406"
};
//Initialize Firebase
firebase.initializeApp(firebaseConfig);
//initialize firestore
const db = firebase.firestore()
// let storage = firebase.storage();

let myFile = ""

const adjunto = document.getElementById('customFile')   

adjunto.addEventListener('change', async (e) => {
    //Obtener archivo
    let file = e.target.files[0];
    myFile = file
    console.log(myFile.name)
})

// Save data 
function saveData() {
    const motivo = document.getElementById('motivo').value
    const fechaInicio = document.getElementById('fechaInicio').value
    const fechaFin = document.getElementById('fechaFin').value
    const adjunto = document.getElementById('customFile').value   
    if (!motivo.length || !fechaInicio.length || !fechaFin.length ) {
        alert("Complete todos los campos")
    } else {
        // uploadFile()
        db.collection("incapacidad").add({
            motivo_incapacidad: motivo,
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            documento: adjunto
        }).then((docRef) => {
            //clear my Objetct and show the success message 
            document.getElementById('motivo').value = ""
            document.getElementById('fechaInicio').value = ""
            document.getElementById('fechaFin').value = ""
            document.getElementById('customFile').value = ""
            alert("Guardado con exíto")
        }).catch(error => {
            let errorCode = error.code;
            let errorMessage = error.message;
            alert(errorMessage)
        });

    }

}

// function uploadFile() {
//     let storageRef = storage.ref('/my_files/' + myFile.name)
//     let task = storageRef.put(file)
//     task.on('state_changed', (snapShot) => {}, (error) => {alert(error)}, () => {
//         console.log('exito')
//     })
// }

// sign out 
function signOut() {
    firebase.auth().signOut()
        .then(() => window.location.replace("login.html"))
        .catch(error => console(error));
}

//button register click
document.getElementById("registrar").addEventListener("click", () => saveData())

//button sign out
document.getElementById("signOut").addEventListener("click", () => signOut())

