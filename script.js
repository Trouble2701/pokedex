let url = 'https://pokeapi.co/api/v2/pokemon/';
let next = 20;
let offset = `?offset=0&limit=20`;
let names = [];
let id = [];
let currentPokemon;

function loadLimit() {
    let loadLimit = +document.getElementById('showLimit').value;
    offset = `?offset=0&limit=${loadLimit}`;
    next = loadLimit;
    names = [];
    id = [];
    document.getElementById('content').innerHTML = '';
    loadPokemon();
}

function loadNext(){
    let loadLimit = +document.getElementById('showLimit').value;
    offset = `?offset=${next}&limit=${loadLimit}`;
    next = next + loadLimit;
    loadPokemon();
}

async function loadPokemon() {
    document.getElementById('content').innerHTML = '';
    document.getElementById('loadNext').innerHTML = ``;
    let loadLimit = +document.getElementById('showLimit').value;
    document.getElementById('loadNext').innerHTML = `Load Next ${loadLimit} Pokemon`;

    let response = await fetch(url + offset);
    let allPokemon = await response.json();
    /*console.log(allPokemon);*/
    for (let i = 0; i < allPokemon['results'].length; i++) {
        let results = allPokemon['results'][i];
        for (let j = 0; j < results['name'].length; j++) {
            let name = results['name'];
            if (names.indexOf(name) === -1) {
                names.push(name);
            }
        }
    }
    loadNames();
}

async function loadNames() {
    for (let p = 0; p < names.length; p++) {
        let resp = await fetch(url + names[p]);
        currentPokemon = await resp.json();
        console.log(currentPokemon);
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
                <img src="${pokemonIMG}">
            </div>
        </div>
    </div>
    `;
}

function loadPokemonColor(id, type) {
    if (type == 'grass' || type == 'bug') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(106, 175, 106)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'fire') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(175, 106, 106)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'water') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(106, 144, 175)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'normal') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(128, 128, 128, 0.658)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'electric') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(255, 239, 91)';
    } else if (type == 'ground') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(170, 119, 16)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'poison') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(139, 105, 194)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'fairy') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(252, 179, 255)';
    } else if (type == 'fighting') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(133, 237, 255, 0.774)';
    } else if (type == 'psychic') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(130, 0, 170, 0.61)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'rock') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(95, 95, 95, 0.774)';
        document.getElementById(`${id}`).style.color = 'rgb(255, 255, 255)';
    } else if (type == 'ghost') {
        document.getElementById(`${id}`).style.backgroundColor = 'rgba(201, 201, 201, 0.774)';
    } else {
        document.getElementById(`${id}`).style.backgroundColor = 'rgb(255, 255, 255)';
    }
}