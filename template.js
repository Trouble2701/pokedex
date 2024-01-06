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
                    <p>${typeTwo}</p>
                </div>
                <img id="img${pokemonID['id']}" src="${pokemonIMG}">
            </div>
        </div>
    </div>
    `;
}

function loadImg(){
if (pokemonID['sprites']['other']['home']['front_default'] == null) {
    if (pokemonID['sprites']['other']['official-artwork']['front_default'] == null) {
        if (pokemonID['sprites']['front_default'] == null) {
            return './img/pokeballtransperant.png';
        }else{
            return pokemonID['sprites']['front_default'];
        }
    }else{
        return pokemonID['sprites']['other']['official-artwork']['front_default'];
    }
}else{
    return pokemonID['sprites']['other']['home']['front_default'];
}
}