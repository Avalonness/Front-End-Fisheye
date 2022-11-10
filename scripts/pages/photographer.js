//Mettre le code JavaScript lié à la page photographer.html

//Récupère l'id dans l'url
const url_id = window.location.search;
const urlSearchParams = new URLSearchParams(url_id);
const id = urlSearchParams.get("id");
console.log(id)

//Recherche le photographe
let selectedPhotograph = {}
fetch('https://raw.githubusercontent.com/OpenClassrooms-Student-Center/Front-End-Fisheye/main/data/photographers.json')
.then(res => res.json())
.then(data => setPhotographer(data.photographers) );

//Permet de trier la liste des photographes et sortir celui avec l'id
function setPhotographer(data) {
    data.forEach(photograph => {
        if (photograph.id == id) {
            selectedPhotograph = photograph
        }
    });
    console.log(selectedPhotograph)
}