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

// Lead data 
function loadData() {
    let tabla = document.getElementById('tblBody');
    tabla.innerHTML = ``;
    db.collection("incapacidad").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            tabla.innerHTML += `
            <tr>
                <td>${doc.data().fecha_inicio}</td>
                <td>${doc.data().fecha_fin}</td>
                <td>${doc.data().documento}</td>
                <td>
                    <button type="button" class="btn btn-danger px-4" onclick="deleteIncapacidad('${doc.id}')">
                        <i class="fas fa-trash-alt" aria-hidden="true"></i>
                    </button>
                </td>
            </tr>
            `
            if (doc.exists) {
                console.log("Document data:", doc.data());
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
                tabla.innerHTML = `
                    <div class="justify-content-center text-center">
                        <h1>Sin datos</h1>
                    </div>
                `;
            }
        });
    }).catch((error) => {
        alert("Error getting document:", error);
    });
}

// function uploadFile() {
//     let storageRef = storage.ref('/my_files/' + myFile.name)
//     let task = storageRef.put(file)
//     task.on('state_changed', (snapShot) => {}, (error) => {alert(error)}, () => {
//         console.log('exito')
//     })
// }


// delete data 
function deleteIncapacidad(id) {
    db.collection("incapacidad").doc(id).delete().then(() => {
        alert('Eliminado con exíto')
        loadData();
    }).catch(error => {
        alert("Error al Eliminar: ", error);
    });
}


// sign out 
function signOut() {
    firebase.auth().signOut()
        .then(() => window.location.replace("login.html"))
        .catch(error => console(error));
}

loadData()

//button register click
document.getElementById("registrar").addEventListener("click", () => saveData())

//button sign out
document.getElementById("signOut").addEventListener("click", () => signOut())

