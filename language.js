async function loadSpeechNames(id) {
    let respSpecies = await fetch(urlSpecies + id);
    let species = await respSpecies.json();
    let nameSpeech = species['names'][language]['name'];
    return nameSpeech.charAt(0).toUpperCase() + nameSpeech.slice(1);
}

function loadGermanTypes(type) {

    if (language == 5) {
        if (type == 'fire') {
            return `Feuer`;
        } else if (type == 'grass') {
            return `Pflanze`;
        } else if (type == 'water') {
            return `Wasser`;
        } else if (type == 'normal') {
            return `Normal`;
        } else if (type == 'electric') {
            return `Elektro`;
        } else if (type == 'ground') {
            return `Boden`;
        } else if (type == 'poison') {
            return `Gift`;
        } else if (type == 'fairy') {
            return `Fee`;
        } else if (type == 'fighting') {
            return `Kampf`;
        } else if (type == 'psychic') {
            return `Psycho`;
        } else if (type == 'rock') {
            return `Gestein`;
        } else if (type == 'ghost') {
            return `Geist`;
        } else if (type == 'dark') {
            return `Unlicht`;
        } else if (type == 'dragon') {
            return `Drache`;
        } else if (type == 'ice') {
            return `Eis`;
        } else if (type == 'steel') {
            return `Stahl`;
        } else if (type == 'bug') {
            return `Insekt`;
        } else if (type == 'flying') {
            return `Flug`;
        } else {
            return type.charAt(0).toUpperCase() + type.slice(1);
        }
    } else if (language == 8) {
        return type.charAt(0).toUpperCase() + type.slice(1);
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