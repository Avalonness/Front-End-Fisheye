/* ----------------------------------------
   Logique
---------------------------------------- */

window.onload = () => {

    const lightbox = document.querySelector('#lightbox')
    const close = document.querySelector(".close");
    close.focus()

    
    // On active le bouton close
    close.addEventListener("click", function(){
        lightbox.classList.remove("show");
    });

    window.addEventListener('keydown', function (event) {
        const modal = document.getElementById("contact_modal");
        if (event.key === 'Escape') {
            lightbox.classList.remove("show");
        }
      })


}
