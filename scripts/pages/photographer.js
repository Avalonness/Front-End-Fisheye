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
let allLike = 0
let globalLike = 0

const triMenu = document.querySelector('#photo_menu')
const selectMediaContent = document.querySelector('.media_container')
const srcContent = document.querySelector('.src_lightbox')


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

    //Creer la partie cadre tarif
    const bottomInfos = document.querySelector('.tarif_container')
        const tarifContainer = document.createElement('div');
            tarifContainer.setAttribute("class", `tarifContainer`)

        const tarifLike = document.createElement('p')
            tarifLike.setAttribute("class", `likeNumber`)

            const tarifPrice = document.createElement('p')
            tarifPrice.textContent =  `${price}€ / jour`

    const contactPhotograph = document.querySelector(".contact_photograph")
        contactPhotograph.textContent = `${name}`


    //Insere les éléments dans le DOM

    leftHeader.appendChild(h1)
    leftHeader.appendChild(h3)
    leftHeader.appendChild(p)

    rightHeader.appendChild(img)

    tarifContainer.appendChild(tarifLike)
    tarifContainer.appendChild(tarifPrice)
    bottomInfos.appendChild(tarifContainer)

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
        let mediaArray = [];
        mediaArray.push(media)
        mediaArray[0].forEach(medias => {
            if(medias.photographerId == id) {
                selectedPhotos.push(medias)
            }
        })

        selectedPhotos.sort((a, b) => b.likes - a.likes);
        selectedPhotos.forEach(mediaFile => {
            mediaFactory(mediaFile)
        })
    }
}


//Insère les médias dans le DOM
function mediaFactory(data) {
    const lightbox = document.querySelector('#lightbox');
    const lightboxContent = document.querySelector("#lightbox-content")
    const images = document.querySelector("#lightbox-content img");
    const prevBt = document.querySelector("#prev");

    let liked = false;

    


    const { date, likes, photographerId, image, price, title, video} = data;

    let media = image ? `assets/medias/${photographerId}/${image}` : null;
    let mediaMp4 = video ? `assets/medias/${photographerId}/${video}` : null;

    //Sélectionne la div ou sera injecté les medias
    let mediaContainer = document.querySelector('.media_container')

    let article = document.createElement('article');

    let divContainer = document.createElement('div')

    //Permet de gérer Image ou Video
    let aMedia = media ? document.createElement('a') : null
        aMedia ? aMedia.setAttribute("href", media) : null
        aMedia ? aMedia.addEventListener("click", event => {
            // On désactive le comportement des liens
            event.preventDefault();
            // On ajoute l'image du lien cliqué dans la modale
            srcContent.innerHTML = `<img src="${aMedia.href}" alt="${title}">`
            document.querySelector('.lightbox_title').textContent = `${title}`

            // On affiche la modale
            lightbox.classList.add("show");
            prevBt.focus()
        }) : null

    let mediaContent = media ? document.createElement('img') : null
        mediaContent ? mediaContent.setAttribute("src", media) : null
        mediaContent ? mediaContent.setAttribute("alt", `${title}`): null

    let aMediaMp4 = mediaMp4 ? document.createElement('a') : null
        mediaMp4 ? aMediaMp4.setAttribute("href", mediaMp4) : null
        aMediaMp4 ? aMediaMp4.addEventListener("click", event => {
            // On désactive le comportement des liens
            event.preventDefault();
            // On ajoute l'image du lien cliqué dans la modale
            srcContent.innerHTML = `<video width="350" height="350" controls="controls">
            <source src="${aMediaMp4.href}" type="video/mp4">
            </video>`
            document.querySelector('.lightbox_title').textContent = `${title}`

            // On affiche la modale
            lightbox.classList.add("show");
            prevBt.focus()
        }) : null


    let mediaContentMp4 = mediaMp4 ? document.createElement('video') : null
        mediaContentMp4 ? mediaContentMp4.setAttribute("width", "350") : null
        mediaContentMp4 ? mediaContentMp4.setAttribute("height", "350"): null
        mediaContentMp4 ? mediaContentMp4.setAttribute("controls", "controls"): null

    let srcMp4 = mediaMp4 ? document.createElement('source') : null
        srcMp4 ? srcMp4.setAttribute("src", mediaMp4) : null
        srcMp4 ? srcMp4.setAttribute("type", `video/mp4`) : null

    let divDescription =  document.createElement('div')
        divDescription.setAttribute("class", `media_description`)

    let mediaP = document.createElement('p')
        mediaP.textContent = `${title}`;

    let likeContent = document.createElement('div')
    likeContent.setAttribute("class", `like_container`)

    let like = document.createElement('button')
        like.setAttribute("class", `like_button`)
        like.textContent = `${likes}`;
        //Ajoute chaque like dans un tableau
        allLike = allLike + likes
        document.querySelector('.likeNumber').textContent = `${allLike}♥`
        //logique des buttons like
        like.addEventListener('click', e => {
            e.preventDefault()
            likeMedia = parseInt(like.textContent)

            if(liked == false) {
                likeMedia++
                like.textContent = likeMedia;
                liked = true
            } else {
                likeMedia--
                like.textContent = likeMedia;
                liked = false
            }
    
    

        });
    
    let likeIcon = document.createElement('p')
        likeIcon.textContent = `♥`;

    //Création de la div d'information

    likeContent.appendChild(like)
    likeContent.appendChild(likeIcon)

    divDescription.appendChild(mediaP)
    divDescription.appendChild(likeContent)

    mediaContentMp4 ? mediaContentMp4.appendChild(srcMp4) : null;
    aMediaMp4 ? aMediaMp4.appendChild(mediaContentMp4) : null;
    aMediaMp4 ? divContainer.appendChild( aMediaMp4) : null;

    //création de la div générale
   mediaContent ? aMedia.appendChild(mediaContent) : null;
   aMedia ? divContainer.appendChild(aMedia) : null;
   divContainer.appendChild(divDescription)

   //finalisation des cards 
   article.appendChild(divContainer)

   return mediaContainer.appendChild(article)

}

/* ----------------------------------------
    Function Modals
---------------------------------------- */
//Cible les formulaires
const prenom = document.querySelector('#firstname');
const nom = document.querySelector('#lastname');
const email = document.querySelector('#email');
const message = document.querySelector('#message');
const submit = document.querySelector('#submit_button')

let inputPrenom = "";
let inputNom = "";
let inputEmail = "";
let inputMessage = "";


//Attribue la valeur des formulaires
prenom.addEventListener("change", () => {inputPrenom = prenom.value})
nom.addEventListener("change", () => {inputNom = nom.value})
email.addEventListener("change", () => {inputEmail = email.value})
message.addEventListener("change", () => {inputMessage = message.value})
submit.addEventListener("click", (e) => {

    //Envoie l'objet au clique
    e.preventDefault();
    let monContact = {
        monPrenom: inputPrenom,
        monNom: inputNom,
        monEmail: inputEmail,
        monMessage: inputMessage
      };

      
    console.log(monContact)

})

/* ----------------------------------------
   Lightbox
---------------------------------------- */

//Gère la logique de boutons du carroussel
const imagesLightbox = document.querySelector(".lightbox-content img");
const nextBtn = document.querySelector(".lightbox-content #next");
const prevBtn = document.querySelector(".lightbox-content #prev");
const title = document.querySelector('.lightbox_title');
let i = 0;

//logique pour passer à l'image suivante
nextBtn.addEventListener("click", e => {
    e.preventDefault

    i++
    console.log(i)

    if (i == selectedPhotos.length){
        i = 0
    }

    selectedPhotos[i].image ? srcContent.innerHTML = `<img src="assets/medias/${id}/${selectedPhotos[i].image}" alt="${title}">` : srcContent.innerHTML = `<video width="350" height="350" controls="controls">
    <source src="assets/medias/${id}/${selectedPhotos[i].video}" type="video/mp4">
    </video>`;
    title.textContent = `${selectedPhotos[i].title}`

})

//Logique pour revenir à l'image précédente
prevBtn.addEventListener("click", e => {
    e.preventDefault

    i--
    console.log(i)

    if (i == -1){
        i = selectedPhotos.length - 1
    }

    selectedPhotos[i].image ? srcContent.innerHTML = `<img src="assets/medias/${id}/${selectedPhotos[i].image}" alt="${title}">` : srcContent.innerHTML = `<video width="350" height="350" controls="controls">
    <source src="assets/medias/${id}/${selectedPhotos[i].video}" type="video/mp4">
    </video>`;
    title.textContent = `${selectedPhotos[i].title}`

})


//Gère l'accesibilité
window.addEventListener('keydown', function (event) {
    const modal = document.getElementById("contact_modal");
    if (event.key == 'ArrowRight') {
        
            i++
            console.log(i)
        
            if (i == selectedPhotos.length){
                i = 0
            }
        
            imagesLightbox.src = `assets/medias/${id}/${selectedPhotos[i].image}`
            title.textContent = `${selectedPhotos[i].title}`
        
    }
  })

  window.addEventListener('keydown', function (event) {
    const modal = document.getElementById("contact_modal");
    if (event.key == 'ArrowLeft') {
        
        i--
        console.log(i)
    
        if (i == -1){
            i = selectedPhotos.length - 1
        }
    
        imagesLightbox.src = `assets/medias/${id}/${selectedPhotos[i].image}`
        title.textContent = `${selectedPhotos[i].title}`
        
    }
  })

/* ----------------------------------------
    GESTION DE L'OPTION DE TRI
---------------------------------------- */
// Au changement de la valeur de tri : 
triMenu.addEventListener('change', e => {
    e.preventDefault

        //Gère le tri des medias
        switch(triMenu.value){
            case 'popularite':
                selectedPhotos.sort((a, b) => b.likes - a.likes);
                console.log("Tu es populaire !")
                console.table(selectedPhotos)
                break;
            case 'date':
                selectedPhotos.sort((a, b) => {
                    return new Date(a.date) - new Date(b.date)
                  })
                console.log("Ton agenda est à jour !")
                console.table(selectedPhotos)
                break;
            case 'titre':
                selectedPhotos.sort(function (a, b) {
                    return a.title.localeCompare(b.title);
                  });
                console.log("Tu es bien ordonné !")
                console.table(selectedPhotos)
                break;
            default:
                console.log(`Ohla la la la !`);
    
        }

    selectMediaContent.innerHTML = "";
    selectedPhotos.forEach(mediaFile => {
        mediaFactory(mediaFile)
    })

})



/* ----------------------------------------
    Initialisation des fonctions
---------------------------------------- */

//Lance les fonctions au chargement
getPhotographerFromId()
getMediabyId()

console.log(triMenu.value)




