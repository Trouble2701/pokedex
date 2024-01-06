async function filter() {
    let search = document.getElementById('searchHeader').value.toLowerCase();
    let content = document.getElementById('content');
    document.getElementById('loadNext').style.display = 'none';
    content.innerHTML = '';
    if (search.length >= 1 && search != '') {
        if (!isNaN(search)) {
            searchById(search);

        } else {
            searchByName(search);
        }
        load = next;
    } else {
        content.innerHTML = '';
        offset = `?offset=0&limit=${load}`;
        document.getElementById('loadNext').style.display = 'unset';
        searchId = saveId;
        pokemonID = saveId;
        await loadPokemon();
    }
}

async function searchById(search) {
    for (i = 0; i < searchId.length; i++) {
        searchPokemonName = searchId[i];
        if (searchPokemonName.toString().includes(+search)) {
            if (!searchPokemonName.toString().indexOf(search)) {
                let resp = await fetch(url + searchPokemonName);
                pokemonID = await resp.json();
                if (pokemonID['id'] == +search) {
                    await loadPokemonNames();
                }
            }
        }
    }
}

async function searchByName(search) {
    for (i = 0; i < searchNames['results'].length; i++) {
        searchPokemonName = searchNames['results'][i]['name'];
        if (searchPokemonName.toLowerCase().includes(search)) {
            if (!searchPokemonName.indexOf(search)) {
                let resp = await fetch(url + searchPokemonName);
                pokemonID = await resp.json();
                if (pokemonID['name'] == search) {
                    await loadPokemonNames();
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
    saveId = [];
}