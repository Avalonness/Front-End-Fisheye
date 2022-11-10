function photographerFactory(data) {
    const { id, name, portrait, country, city, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );

        //Créer le header de la card + lien
        const linkCard = document.createElement( 'a')
        linkCard.setAttribute("href", `photographer.html?id=${id}`)
        linkCard.setAttribute("aria-label", `Lien cliquable pour se rendre sur le profil de ${name}`)

        const header_card = document.createElement( 'div' )
        header_card.setAttribute("class", `header_card`)
        //Ajoute l'image de profil
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        img.setAttribute("alt", `${name}`);
        //Ajoute le nom
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        //AJoute la localisation
        const h3 = document.createElement( 'h3' );
        h3.textContent = `${country}, ${city}`;
        //Ajoute la phrase d'accroche
        const p = document.createElement( 'p' );
        p.textContent = `${tagline}`;
        //Ajoute le prix
        const span = document.createElement( 'span' );
        span.textContent = `${price}€/jour`;

        linkCard.appendChild(img);
        linkCard.appendChild(h2);

        header_card.appendChild(linkCard);

        article.appendChild(header_card);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(span);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}