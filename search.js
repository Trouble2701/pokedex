function filter() {
    let search = document.getElementById('searchHeader').value.toLowerCase();
    let content = document.getElementById('content');
    document.getElementById('loadNext').style.display = 'none';
    content.innerHTML = '';
    pokemonID = '';
    next = 20;
    offset = `?offset=0&limit=20`;
    if (search.length == 0 || search.length == "") {
       location.reload();
    } else {
        if (!isNaN(search)) { 
            searchById(search);
        }else{
            searchByName(search);
        }
        
    }
}

async function searchById(search){
    for (i = 0; i < searchId.length; i++) {
        searchPokemonName = searchId[i];
        if (searchPokemonName.toString().includes(+search)) {
            let resp = await fetch(url + searchPokemonName);
            pokemonID = await resp.json();
            if (pokemonID['id'] < maxLimit) {
                console.log(searchId.length);
                if (!pokemonID['id'].toString().indexOf(search)) {
                    loadPokemonNames();
                }
            }

        }
    }
}

async function searchByName(search){
    for (i = 0; i < searchNames['results'].length; i++) {
        searchPokemonName = searchNames['results'][i]['name'];
        if (searchPokemonName.toLowerCase().includes(search)) {
            let resp = await fetch(url + searchPokemonName);
            pokemonID = await resp.json();
            if (pokemonID['id'] < maxLimit) {
                if (!pokemonID['name'].indexOf(search)) {
                    loadPokemonNames();
                }
            }

        }
    }
}

async function loadSearch() {
    let response = await fetch(url + '?offset=0&limit=' + maxLimit);
    searchNames = await response.json();
    for (let i = 0; i < searchNames['results'].length; i++) {
        let id = searchNames['results'][i]['url'];
        let splitId = id.split('/');
        let idSearch = splitId[6];
        if (saveId.indexOf(idSearch) === -1) {
            saveId.push(+idSearch);
        }
    }
    searchId = saveId;
}