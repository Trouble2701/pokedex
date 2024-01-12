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

function loadImg(img) {
    if (img['other']['home']['front_default'] == null) {
        if (img['other']['official-artwork']['front_default'] == null) {
            if (img['front_default'] == null) {
                return './img/pokeballtransperant.png';
            } else {
                return img['front_default'];
            }
        } else {
            return img['other']['official-artwork']['front_default'];
        }
    } else {
        return img['other']['home']['front_default'];
    }
}

function loadImgShiny(img) {
    if (img['other']['home']['front_shiny'] == null) {
        if (img['other']['official-artwork']['front_shiny'] == null) {
            if (img['front_shiny'] == null) {
                return './img/pokeballtransperant.png';
            } else {
                return img['front_shiny'];
            }
        } else {
            return img['other']['official-artwork']['front_shiny'];
        }
    } else {
        return img['other']['home']['front_shiny'];
    }
}

function circle(procentSVG, circleTimeCalc) {
    return /*html*/`
    <circle 
        cx="0" 
        cy="100" 
        r="80" 
        stroke="#FD5B4F" 
        stroke-width="10"
        stroke-dasharray="calc(502.634 * ${procentSVG}) calc(502.634 * 1.2)" 
        stroke-dashoffset="calc(502.634 * ${procentSVG})"
        stroke-linecap="round" 
        fill="none" 
        transform="rotate(-90, 50, 50)">
          
        <animate 
        attributeName="stroke-dashoffset" 
        dur="${circleTimeCalc}s" 
        from="calc(502.634 * ${procentSVG})" 
        to="0" 
        fill="freeze"
        calcMode="spline" 
        keySplines="0.25 0.1 0.25 1" 
        keyTimes="0;1" />
        </circle>
        <text
        x="100"
        y="100"
        text-anchor="middle"
        dominant-baseline="central"
        font-size="20"
        font-family="Arial, sans-serif"
        font-weight="700"
        fill="#FD5B4F"
        id="text"
        >
        </text>
    `;
}

function loadTemplate() {
    document.getElementById('loadingCircle').style.display = 'flex';
    document.getElementById('circle').innerHTML = circle(0, 0);
    document.getElementById('text').innerHTML = `0%`;
}

function loadBasicTemplate(evoText, evoGenera, pokeData){
    let height = `${pokeData['height']/10}m`;
    if(pokeData['height'] < '10') height = `0,${pokeData['height']}m`;
    let weight = `${pokeData['weight']/10}kg`;
    if(pokeData['weight'] < '1000') weight = `${pokeData['weight']/10}kg`;
    if(weight < '1') weight = `${pokeData['weight']}g`;
    return /*html*/`${evoText}<br><br>Gattung: ${evoGenera}<br>Größe: ${height}<br>Gewicht: ${weight}`;
};