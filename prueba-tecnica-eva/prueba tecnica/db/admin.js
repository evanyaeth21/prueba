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


function signOut() {
    firebase.auth().signOut()
        .then(() => window.location.replace("login.html"))
        .catch(error => console(error));
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
                <td>
                    <a href="#!">${doc.data().documento}</a>
                </td>
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

// delete data 
function deleteIncapacidad(id) {
    db.collection("incapacidad").doc(id).delete().then(() => {
        alert('Eliminado con exíto')
        loadData();
    }).catch(error => {
        alert("Error al Eliminar: ", error);
    });
}

loadData()

document.getElementById("signOut").addEventListener("click", () => signOut())
