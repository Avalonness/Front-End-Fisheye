//Mettre le code JavaScript lié à la page photographer.html

/* ----------------------------------------
    Params
---------------------------------------- */
//Récupère l'id dans l'url
const url_id = window.location.search;
const urlSearchParams = new URLSearchParams(url_id);
const id = urlSearchParams.get("id");

/* ----------------------------------------
    Variables
---------------------------------------- */
//Recherche le photographe
let selectedPhotograph = {}
let selectedPhotos = []


/* ----------------------------------------
    Function Header
---------------------------------------- */

//Fonction principale pour insérer le photographe cible
function getPhotographerFromId() {
    fetch('https://raw.githubusercontent.com/OpenClassrooms-Student-Center/Front-End-Fisheye/main/data/photographers.json')
    .then(res => res.json())
    .then(data => setPhotographer(data.photographers));

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

/* ----------------------------------------
    Function Medias
---------------------------------------- */

//Recupere les medias du photographe par l'id
function getMediabyId(){
    fetch('https://raw.githubusercontent.com/OpenClassrooms-Student-Center/Front-End-Fisheye/main/data/photographers.json')
    .then(res => res.json())
    .then(media => setMedia(media.media));

    function setMedia(media) {
        let mediaArray = []
        mediaArray.push(media)
        mediaArray[0].forEach(medias => {
            if(medias.photographerId == id) {
                selectedPhotos.push(medias)
            }
        })

        selectedPhotos.forEach(mediaFile => {
            mediaFactory(mediaFile)
        })
    }
}


//Insère les médias dans le DOM
function mediaFactory(data) {
    console.log(data)
    const { date, likes, photographerId, image, price, title, video} = data;
    let media = image ? `assets/medias/${photographerId}/${image}` : null;
    let mediaMp4 = `assets/${photographerId}/${video}`;

    //Sélectionne la div ou sera injecté les medias
    let mediaContainer = document.querySelector('.media_container')

    let article = document.createElement('article');

    let divContainer = document.createElement('div')

    //Permet de gérer Image ou Photo
    let mediaContent = media ? document.createElement('img') : null
        mediaContent ? mediaContent.setAttribute("src", media) : null
        mediaContent ? mediaContent.setAttribute("alt", `${title}`): null

    let divDescription =  document.createElement('div')
        divDescription.setAttribute("class", `media_description`)

    let mediaP = document.createElement('p')
        mediaP.textContent = `${title}`;

    let like = document.createElement('button')
        like.textContent = `${likes}♥`;

    //Création de la div d'information
    divDescription.appendChild(mediaP)
    divDescription.appendChild(like)

    //création de la div générale
   mediaContent ? divContainer.appendChild(mediaContent) : null;
   divContainer.appendChild(divDescription)

   //finalisation des cards 
   article.appendChild(divContainer)

   return mediaContainer.appendChild(article)

}

/* ----------------------------------------
    Initialisation des fonctions
---------------------------------------- */

//Lance les fonctions au chargement
getPhotographerFromId()
getMediabyId()