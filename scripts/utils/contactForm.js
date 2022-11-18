function displayModal() {
    const modal = document.getElementById("contact_modal");
    const modalClose = document.getElementById("close_modal");
    const main = document.querySelector('#main')
	modal.style.display = "block";
    main.setAttribute("tabindex", "-1")
    modalClose.focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}

window.addEventListener('keydown', function (event) {
    const modal = document.getElementById("contact_modal");
    if (event.key === 'Escape') {
      modal.style.display = 'none'
    }
  })