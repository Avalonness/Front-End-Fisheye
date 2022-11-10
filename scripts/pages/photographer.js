//Mettre le code JavaScript lié à la page photographer.html

/* ----------------------------------------
    Params
---------------------------------------- */
//Récupère l'id dans l'url
const url_id = window.location.search;
const urlSearchParams = new URLSearchParams(url_id);
const id = urlSearchParams.get("id");
console.log(id)

/* ----------------------------------------
    Variables
---------------------------------------- */
//Recherche le photographe
let selectedPhotograph = {}


/* ----------------------------------------
    Function Principal
---------------------------------------- */

//Fonction principale pour insérer le photographe cible
function getPhotographerFromId() {
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

        photographerFactory(selectedPhotograph)
    }
}

//Lance la fonction au chargement
getPhotographerFromId()



/* ----------------------------------------
    Function Outil
---------------------------------------- */

// Permet de gérer le header du photograph avec ses informations
function photographerFactory(data) {
    const { name, portrait, country, city, tagline, price} = data;


    // Creer la partie gauche du header
    const leftHeader = document.querySelector('.photograph_header_left')
        const h1 = document.createElement('h1');
            h1.textContent = name;
    
        const h3 = document.createElement( 'h3' );
            h3.textContent = `${country}, ${city}`;

        const p = document.createElement( 'p' );
            p.textContent = `${tagline}`;

     // Creer la partie droite du header
    const rightHeader = document.querySelector('.photograph_header_right')
        const picture = `assets/photographers/${portrait}`;
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${name}`);


    //Insere les éléments dans le DOM

    leftHeader.appendChild(h1)
    leftHeader.appendChild(h3)
    leftHeader.appendChild(p)

    rightHeader.appendChild(img)
}
