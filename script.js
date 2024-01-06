async function loadPokemon() {
    let loadButton = document.getElementById('loadNext');
    loadButton.innerHTML = '';
    let loadLimit = +document.getElementById('showLimit').value;
    loadButton.innerHTML = loadSpeech(loadLimit);
    let response = await fetch(url + offset);
    currentPokemon = await response.json();
    loadNames();
    loadSearch();
}

async function loadNames() {
    for (let i = 0; i < load; i++) {
            let resp = await fetch(url + currentPokemon['results'][i]['name']);
            pokemonID = await resp.json();
            await loadPokemonNames();
    }
    load = +document.getElementById('showLimit').value;
}

async function loadPokemonNames() {
    let loadcontent = document.getElementById('content');
    let nameOfPokemon = await loadSpeechNames(pokemonID['id']);
    let pokemonId = loadid(pokemonID['id']);
    let pokemonIMG = await loadImg();
    let type = loadGermanTypes(pokemonID['types'][0]['type']['name']);
    let typeTwo = '';
    anable = 'no';
    if (pokemonID['types'].length === 2) {
        typeTwo = loadGermanTypes(pokemonID['types'][1]['type']['name']);
        anable = 'yes';
    }
    loadcontent.innerHTML += loadPokemonContent(nameOfPokemon, pokemonId, pokemonIMG, type, typeTwo);
    let typeTwoDisable = document.getElementById(`typeTwo${pokemonID['id']}`);
    typeTwoDisable.style.display = 'none';
    if(anable == 'yes'){
        typeTwoDisable.style.display = 'unset';
    }
    loadPokemonColor(pokemonID['id'], pokemonID['types'][0]['type']['name']);
}

function loadLimit() {
    let loadLimit = +document.getElementById('showLimit').value;
    offset = `?offset=0&limit=${loadLimit}`;
    next = loadLimit;
    load = loadLimit;
    document.getElementById('content').innerHTML = '';
    loadPokemon();
}

function loadNext() {
    let loadLimit = +document.getElementById('showLimit').value;
    offset = `?offset=${next}&limit=${loadLimit}`;
    nextsum = next + loadLimit;
    next = nextsum;
    loadPokemon();
}

async function openCard(id){
    let resp = await fetch(url + id);
    let pokeData = await resp.json();
    let pokecard = document.getElementById('pokeCard');
    pokecard.style.transform = 'translateY(0)';
    loadPokemonBgImg(pokeData['types'][0]['type']['name']);
    typeTwoPC = '';
    if(pokeData['types'].length === 2){
        typeTwoPC = loadGermanTypes(pokeData['types'][1]['type']['name']);
    }
    pokecard.innerHTML = /*html*/`
    <div class="closeCard" onclick="closeCard()">X</div>
        <div class="pokeCardTop">
            <div>
                <p>${await loadSpeechNames(pokeData['id'])}</p>
                <p>${loadGermanTypes(pokeData['types'][0]['type']['name'])}</p>
            </div>
            <div>
                <p>${loadid(pokeData['id'])}</p>
                <p>${typeTwoPC}</p>
            </div>
            <img src="${pokeData['sprites']['other']['home']['front_default']}">
        </div>
        <div id="pokemonInnerCard">
            <div id="cardLink">
                <div class="link">About</div>
                <div class="link">Stats</div>
                <div class="link">Moves</div>
            </div>
            <div class="dataPokemon">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. In consectetur, ipsum optio ipsam earum explicabo enim minima eveniet voluptas praesentium culpa aspernatur necessitatibus nam magni maiores iste. Assumenda, accusamus. Impedit?
            </div>
            <div class="evolution">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam vel aperiam aliquid at accusantium officia eveniet aliquam distinctio. Sequi maxime iure quia fugit dolorum neque minima animi et! Saepe, alias!
            </div>
        </div>
        `;
    loadPokemonColor('pokeCard', pokeData['types'][0]['type']['name']);
}

function closeCard(){
    let pokecard = document.getElementById('pokeCard');
    pokecard.style.transform = 'translateY(-2000px)';
}