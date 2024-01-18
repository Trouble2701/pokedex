async function loadSpeechNames(id) {
    let species = await loadJsonSpecies(id);
    for (i = 0; i < species['names'].length; i++){
        if(species['names'][i]['language']['name'] == readLang()){
            let nameSpeech = species['names'][i]['name'];
            return nameSpeech.charAt(0).toUpperCase() + nameSpeech.slice(1);
        }
    }
}

async function typeLoad(type){
    let typeSpeech = await loadJsonEvo(`https://pokeapi.co/api/v2/type/${type}/`);
    for(i = 0; i < typeSpeech['names'].length; i++){
        if(typeSpeech['names'][i]['language']['name'] == readLang()){
            return typeSpeech['names'][i]['name'];
        }
    }
}

async function setLanguage() {
    let lang = document.getElementById('language');
    if (lang.value == 'DE') {
        language = 'de';
    } else if (lang.value == 'EN') {
        language = 'en';
    }
    document.getElementById('content').innerHTML = '';
    offset = `?offset=0&limit=${next}`;
    load = next;
    load = +document.getElementById('showLimit').value;
    selectLanguage();
    await loadPokemon();
}

function selectLanguage() {
    if (language == 'de') {
        document.getElementById("deutsch").selected = true;
    } else if (language == 'en') {
        document.getElementById("english").selected = true;
    }
}

function loadSpeech(loadLimit){

    if (language == 'de') {
        if(loadLimit == 'load'){
            return `Pokemon werden geladen`;
        }else if(loadLimit == 'searchBar'){
            return 'Pokemonsuche (ID or Name)';
        }else if(loadLimit == 'searchTitle'){
            return 'Pokemonsuche (ID or Name (Englische Namen))';
        }else{
            return `Nächsten ${loadLimit} Pokemon Laden`;
        }
    } else if (language == 'en') {
        
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
    if(language == 'de'){
        return 'de';
    }

    if(language == 'en'){
        return 'en';
    }
}