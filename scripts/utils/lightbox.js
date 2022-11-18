/* ----------------------------------------
   Logique
---------------------------------------- */

window.onload = () => {

    const lightbox = document.querySelector('#lightbox')
    const close = document.querySelector(".close");


    
    
    // On active le bouton close
    close.addEventListener("click", function(){
        lightbox.classList.remove("show");
    });

    // On ferme au clic sur la modale
    lightbox.addEventListener("click", function(){
        lightbox.classList.remove("show");
    });
}
