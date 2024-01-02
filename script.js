let url = 'https://pokeapi.co/api/v2/pokemon/';
let last = 1;
let start = 0;
let next = 20;
let offset = `?offset=0&limit=20`;
let names = [];
let searchNames = [];
let searchId = [];
let id = [];
let currentPokemon;

function loadLimit() {
    let loadLimit = +document.getElementById('showLimit').value;
    offset = `?offset=0&limit=${loadLimit}`;
    next = loadLimit;
    last = 1;
    start = 0;
    names = [];
    id = [];
    document.getElementById('content').innerHTML = '';
    loadPokemon();
}

function loadNext() {
    let loadLimit = +document.getElementById('showLimit').value;
    offset = `?offset=${next}&limit=${loadLimit}`;
    last = last + loadLimit;
    start = next;
    nextsum = next + loadLimit;
    next = nextsum;
    loadPokemon();
}

async function filter() {
    let search = document.getElementById('searchHeader').value;
    search = search.toLowerCase();
    let content = document.getElementById('content');
    content.innerHTML = '';
    next = 20;
    last = 1;
    start = 0;
    console.log(search);
    if (search.length == 0 || search.length == "") {
        content.innerHTML = '';
        loadPokemon();
        console.log('werde angesprochen');
    } else {
        let searchTitle = searchNames;
        if (!isNaN(search)) {
            searchTitle = searchId;
        }
        for (i = 0; i < searchTitle.length; i++) {
            if (searchTitle[i].toLowerCase().includes(search)) {
                let resp = await fetch(url + searchTitle[i]);
                currentPokemon = await resp.json();
                //console.log(currentPokemon);
                if (searchId[i] < 9999) {
                    loadPokemonNames();
                }
            }
        }
    }
}

function searchPokedex() {    
        document.getElementById('searchDiv').style.transform = 'translateY(0)';
        document.getElementById( 'searchIcon' ).setAttribute( "onclick", "searchPokedexclose()" );
}

function searchPokedexclose() {    
    document.getElementById('searchDiv').style.transform = 'translateY(-100px)';
    document.getElementById( 'searchIcon' ).setAttribute( "onclick", "searchPokedex()" );
}

async function loadPokemon() {
    document.getElementById('loadNext').innerHTML = ``;
    let loadLimit = +document.getElementById('showLimit').value;
    document.getElementById('loadNext').innerHTML = `Load Next ${loadLimit} Pokemon`;
    let response = await fetch(url + offset);
    let allPokemon = await response.json();
    for (let i = 0; i < allPokemon['results'].length; i++) {
        if (names.indexOf(allPokemon['results'][i]['name']) === -1) {
            names.push(allPokemon['results'][i]['name']);
        }
    }
    loadNames();
    loadSearch();
}

async function loadNames() {
    for (let p = start; p < next; p++) {
        let resp = await fetch(url + names[p]);
        currentPokemon = await resp.json();
        //console.log(currentPokemon);
        let idPokemon = currentPokemon['id'];
        id.push(idPokemon);
        loadPokemonNames();
    }
}

function loadPokemonNames() {
    let loadcontent = document.getElementById('content');
    let nameOfPokemon = currentPokemon['name'].charAt(0).toUpperCase() + currentPokemon['name'].slice(1);
    let pokemonId = loadid(currentPokemon['id']);
    let pokemonIMG = currentPokemon['sprites']['other']['home']['front_default'];
    if (pokemonIMG == null) {
        pokemonIMG = currentPokemon['sprites']['other']['official-artwork']['front_default'];
        if (pokemonIMG == null) {
            pokemonIMG = currentPokemon['sprites']['front_default'];
            if (pokemonIMG == null) {
                pokemonIMG = './img/pokeballtransperant.png';
            }
        }
    }
    let type = currentPokemon['types'][0]['type']['name'].charAt(0).toUpperCase() + currentPokemon['types'][0]['type']['name'].slice(1);
    typeTwo = '';
    if (currentPokemon['types'].length === 2) {
        typeTwo = currentPokemon['types'][1]['type']['name'].charAt(0).toUpperCase() + currentPokemon['types'][1]['type']['name'].slice(1);
    }
    loadcontent.innerHTML += loadPokemonContent(nameOfPokemon, pokemonId, pokemonIMG, type, typeTwo);

    loadPokemonColor(currentPokemon['id'], currentPokemon['types'][0]['type']['name']);
}

function loadid(id) {
    if (id.toString().length == 1) {
        return `#00${id}`;
    } else

        if (id.toString().length == 2) {
            return `#0${id}`;
        } else

            if (id.toString().length > 2) {
                return `#${id}`;
            }
}

function loadPokemonContent(nameOfPokemon, pokemonId, pokemonIMG, type, typeTwo) {
    return /*html*/`
    <div class="pokemonCard" id="${currentPokemon['id']}">
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
                <img id="img${currentPokemon['id']}" src="${pokemonIMG}">
            </div>
        </div>
    </div>
    `;
}

function loadPokemonColor(id, type) {
    if (type == 'grass' || type == 'bug') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(106, 175, 106, 0.8)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'fire') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(175, 106, 106, 0.8)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'water') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(106, 144, 175, 0.8)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'normal') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(128, 128, 128, 0.8)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'electric') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(255, 239, 91, 0.8)';
    } else if (type == 'ground') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(170, 119, 16, 0.8)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'poison') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(139, 105, 194, 0.8)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'fairy') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(252, 179, 255, 0.8)';
    } else if (type == 'fighting') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(255, 231, 187, 0.8)';
    } else if (type == 'psychic') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(130, 0, 170, 0.8)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'rock') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(95, 95, 95, 0.8)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'ghost') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    } else if (type == 'dark') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(24, 24, 24, 0.8)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
        document.getElementById(`img${id}`).style.filter = 'drop-shadow(0px 0px 10px rgba(173, 173, 173, 0.473))';
    } else if (type == 'dragon') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(122, 0, 0, 0.8)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'ice') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(133, 237, 255, 0.8)';
    } else if (type == 'steel') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(190, 190, 0.8)';
    } else {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(255, 255, 255, 0.8)';
    }
}

async function loadSearch() {
    searchNames = [];
    searchId = [];
    let response = await fetch(url + '?offset=0&limit=10000');
    let searchPokemon = await response.json();
    for (let i = 0; i < searchPokemon['results'].length; i++) {
        let name = searchPokemon['results'][i]['name'];
        if (searchNames.indexOf(name) == -1) {
            searchNames.push(name);
        }
        let id = searchPokemon['results'][i]['url'];
        let splitId = id.split('/');
        let idSearch = splitId[6];
        if (searchId.indexOf(idSearch) === -1) {
            searchId.push(idSearch);
        }
    }
}


window.addEventListener("resize", function(){
    let width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width <= 780) {
        document.getElementById('searchDiv').classList.remove('pokedexHeader');
        document.getElementById('searchDiv').classList.remove('search');
        document.getElementById('searchDiv').classList.add('searchScreen');
    }else{
        document.getElementById('searchDiv').classList.remove('searchScreen');
        document.getElementById('searchDiv').classList.add('pokedexHeader');
        document.getElementById('searchDiv').classList.add('search');
    }
});
