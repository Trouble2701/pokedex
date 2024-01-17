async function loadSpeechNames(id) {
    let respSpecies = await fetch(urlSpecies + id);
    let species = await respSpecies.json();
    let nameSpeech = species['names'][language]['name'];
    return nameSpeech.charAt(0).toUpperCase() + nameSpeech.slice(1);
}

async function typeLoad(type){
    let respType = await fetch(`https://pokeapi.co/api/v2/type/${type}/`);
    let typeSpeech = await respType.json();
    for(i = 0; i < typeSpeech['names'].length; i++){
        if(typeSpeech['names'][i]['language']['name'] == readLang()){
            return typeSpeech['names'][i]['name'];
        }
    }
}

async function setLanguage() {
    let lang = document.getElementById('language');
    if (lang.value == 'DE') {
        language = 5;
    } else if (lang.value == 'EN') {
        language = 8;
    }
    document.getElementById('content').innerHTML = '';
    offset = `?offset=0&limit=${next}`;
    load = next;
    load = +document.getElementById('showLimit').value;
    selectLanguage();
    await loadPokemon();
}

function selectLanguage() {
    if (language == 5) {
        document.getElementById("deutsch").selected = true;
    } else if (language == 8) {
        document.getElementById("english").selected = true;
    }
}

function loadSpeech(loadLimit){

    if (language == 5) {
        if(loadLimit == 'load'){
            return `Pokemon werden geladen`;
        }else if(loadLimit == 'searchBar'){
            return 'Pokemonsuche (ID or Name)';
        }else if(loadLimit == 'searchTitle'){
            return 'Pokemonsuche (ID or Name (Englische Namen))';
        }else{
            return `Nächsten ${loadLimit} Pokemon Laden`;
        }
    } else if (language == 8) {
        
        if(loadLimit == 'load'){
            return `Loading Pokemon`;
        }else if(loadLimit == 'searchBar'){
            return 'Search Pokemon (ID or Name)';
        }else if(loadLimit == 'searchTitle'){
            return 'Search Pokemon (ID or Name)';
        }else{
            return `Load Next ${loadLimit} Pokemon`;
        }
    }
}

function readLang(){
    if(language == 5){
        return 'de';
    }

    if(language == 8){
        return 'en';
    }
}