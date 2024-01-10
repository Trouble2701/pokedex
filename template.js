function loadPokemonContent(nameOfPokemon, pokemonId, pokemonIMG, type, typeTwo) {
    return /*html*/`
    <div class="pokemonCard" id="${pokemonID['id']}" onclick="openCard(${pokemonID['id']})">
        <div class="pokemonTop">
            <div class="pokemon">
                <div class="headerPokemon">
                    <p>${nameOfPokemon}</p>
                    <p>${pokemonId}</p>
                </div>
                <div class="headerPokemon">
                    <p>${type}</p>
                    <p id="typeTwo${pokemonID['id']}">${typeTwo}</p>
                </div>
                <img id="img${pokemonID['id']}" src="${pokemonIMG}">
            </div>
        </div>
    </div>
    `;
}

function loadImg(img){
if (img['other']['home']['front_default'] == null) {
    if (img['other']['official-artwork']['front_default'] == null) {
        if (img['front_default'] == null) {
            return './img/pokeballtransperant.png';
        }else{
            return img['front_default'];
        }
    }else{
        return img['other']['official-artwork']['front_default'];
    }
}else{
    return img['other']['home']['front_default'];
}
}

function circle(procentSVG, circleTimeCalc) {
    return /*html*/`
    <circle 
        cx="50" 
        cy="50" 
        r="40" 
        stroke="#FD5B4F" 
        stroke-width="10"
        stroke-dasharray="calc(251.327 * ${procentSVG}) calc(251.327 * 1.2)" 
        stroke-dashoffset="calc(251.327 * ${procentSVG})"
        stroke-linecap="round" 
        fill="none" 
        transform="rotate(-90, 50, 50)">
          
        <animate 
        attributeName="stroke-dashoffset" 
        dur="${circleTimeCalc}s" 
        from="calc(251.327 * ${procentSVG})" 
        to="0" 
        fill="freeze"
        calcMode="spline" 
        keySplines="0.25 0.1 0.25 1" 
        keyTimes="0;1" />
        </circle>
        <text
        x="50"
        y="50"
        text-anchor="middle"
        dominant-baseline="central"
        font-size="16"
        font-family="Arial, sans-serif"
        font-weight="700"
        fill="#FD5B4F"
        id="text"
        >
        </text>
    `;
}