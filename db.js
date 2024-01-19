let url = 'https://pokeapi.co/api/v2/pokemon/';
let urlSpecies = 'https://pokeapi.co/api/v2/pokemon-species/';
let urlEvo = 'https://pokeapi.co/api/v2/evolution-chain/';
let next = 20;
let load = 20;
let offset = '?offset=0&limit=20';
//let maxLimit = 1017;
let maxLimit = 217;
let searchOffset = `?offset=0&limit=${maxLimit}`;
let language = 'de';
let searchNames=[];
let searchPoke = [];
let currentPokemon;
let pokemonID;
let procent = 0;
let calcProcent = 0;
let time = 3000;
let statLabels = [];
let statData = [];

async function loadJsonAll(link){
    let response = await fetch(url + link);
    return await response.json();
}

async function loadJsonSpecies(link){
    let response = await fetch(urlSpecies + link);
    return await response.json();
}

async function loadJsonEvo(link){
    let response = await fetch(link);
    return await response.json();
}