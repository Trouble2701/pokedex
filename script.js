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
}

async function loadPokemonNames() {
    let loadcontent = document.getElementById('content');
    let nameOfPokemon = await loadSpeechNames(pokemonID['id'], language);
    let pokemonId = loadid(pokemonID['id']);
    let pokemonIMG = loadImg();
    let type = loadGermanTypes(language, pokemonID['types'][0]['type']['name']);
    let typeTwo = '';
    if (pokemonID['types'].length === 2) {
        typeTwo = loadGermanTypes(language, pokemonID['types'][1]['type']['name']);
    }
    loadcontent.innerHTML += loadPokemonContent(nameOfPokemon, pokemonId, pokemonIMG, type, typeTwo);

    loadPokemonColor(pokemonID['id'], pokemonID['types'][0]['type']['name']);
}



function loadLimit() {
    let loadLimit = +document.getElementById('showLimit').value;
    offset = `?offset=0&limit=${loadLimit}`;
    next = loadLimit;
    load = loadLimit;
    names = [];
    id = [];
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
