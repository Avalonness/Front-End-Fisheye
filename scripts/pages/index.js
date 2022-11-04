   let photographers = []
   
   async function getPhotographers() {
        // Penser à remplacer par les données récupérées dans le json
        fetch('https://raw.githubusercontent.com/OpenClassrooms-Student-Center/Front-End-Fisheye/main/data/photographers.json')
            .then(res => res.json())
            .then(data => setPhotographers(data.photographers) );

        // Fonction qui va mettre en place les datas des photographes
            function setPhotographers(data) {
                //Cible la balise dans le DOM
                const photographersSection = document.querySelector(".photographer_section");
                photographers.push(data)

                photographers[0].forEach((photographe)=>{
                    const photographerModel = photographerFactory(photographe);
                    const userCardDOM = photographerModel.getUserCardDOM();
                    photographersSection.appendChild(userCardDOM);
                })
            }
        // et bien retourner le tableau photographers seulement une fois
    }

    getPhotographers()
