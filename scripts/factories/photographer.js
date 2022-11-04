function photographerFactory(data) {
    const { name, portrait, country, city, tagline, price} = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        //Ajoute l'image de profil
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
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

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(h3);
        article.appendChild(p);
        article.appendChild(span);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}