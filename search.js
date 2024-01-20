let debouncedFilter = debounce(filter, 500);

document.addEventListener('DOMContentLoaded', function () {
    let searchBar = document.getElementById('searchHeader');

    if (searchBar) {
        searchBar.addEventListener('input', debouncedFilter);
    } else {
        console.error('searchHeader Element not found');
    }
});

function debounce(func, delay) {
    let timeoutId;
    return function () {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, arguments), delay);
    };
}

async function filter() {
    let searchBar = document.getElementById('searchHeader');
    let search = searchBar.value.toLowerCase();
    document.getElementById('loadNext').style.display = 'none';
    clearTimeout(searchTimeout);
    searchBar.disabled = true;
    searchTimeout = setTimeout(async () => {
        if (search.length >= 1 && search != '') {
            document.getElementById('content').innerHTML = '';
            let searchOrder = 'name';
            if (!isNaN(search)) {
                searchOrder = 'id';
            }
            await searching(search, searchOrder);
            searchBar.disabled = false;
            searchBar.focus();
        } else {
            await goBack();
        }
    }, 300);
}

async function searching(search, searchOrder) {
    let matchingPokemon = await findMatchingPokemon(search, searchOrder);
    if (matchingPokemon.length > 0) {
        for (let i = 0; i < matchingPokemon.length; i++) {
            pokemonID = matchingPokemon[i];
            procent = procent + calcProcent;
            loadCount++;
            precentCalc();
            await loadPokemonNames();
        }
    } else {
        document.getElementById('content').innerHTML = '<h2>Keine Treffer</h2>';
    }
}

async function findMatchingPokemon(search, searchOrder) {
    matchingPokemon = [];
    for (let i = 0; i < searchNames.length; i++) {
        let nameToShow = await attrReturn(i, searchOrder);
        if (typeof nameToShow === 'string') {
            let idSearch = nameToShow.toLowerCase();
            if (idSearch.includes(search.toLowerCase())) {
                matchingPokemon.push(searchNames[i]);
                calcProcent = 100 / matchingPokemon.length;
                loadAll = matchingPokemon.length;
                loadTemplate();
            }
        }
    }
    return matchingPokemon;
}

async function attrReturn(i, attr) {
    if (attr == 'id') {
        return await splitUrl(searchNames[i]['species']['url']);
    } else if (attr == 'name') {
        return await searchNames[i]['name'];
    }
}

async function splitUrl(url) {
    let searching = url;
    let splitId = searching.split('/');
    return await splitId[6];
}

async function goBack() {
    pokemonID = [];
    content.innerHTML = '';
    offset = `?offset=0&limit=${load}`;
    document.getElementById('loadNext').style.display = 'unset';
    searchNames = [];
    await loadPokemon();
}

async function loadSearch() {
    searchNames = [];
    let searchBar = document.getElementById('searchHeader');
    searchBar.disabled = true;
    searchBar.placeholder = loadSpeech('disable');
    let searching = await loadJsonAll(searchOffset);
    for (let i = 0; i < searching['results'].length; i++) {
        let searchingJson = await loadJsonAll(searching['results'][i]['name']);
        searchNames.push(searchingJson);
        if (i == searching['results'].length - 1) {
            searchBar.disabled = false;
            searchBar.placeholder = loadSpeech('searchBar');
        }
    }
}