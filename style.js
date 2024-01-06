function searchPokedex() {
    document.getElementById('searchDiv').style.transform = 'translateY(0)';
    document.getElementById('searchIcon').setAttribute("onclick", "searchPokedexclose()");
}

function searchPokedexclose() {
    document.getElementById('searchDiv').style.transform = 'translateY(-100px)';
    document.getElementById('searchIcon').setAttribute("onclick", "searchPokedex()");
}

function loadid(id) {
    if(id!=undefined){
        if (id.toString().length == 1) {
            return `#00${id}`;
        } else if (id.toString().length == 2) {
            return `#0${id}`;
        } else if (id.toString().length > 2) {
            return `#${id}`;
        }
    }
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

window.addEventListener("resize", function () {
    let width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if (width <= 780) {
        document.getElementById('searchDiv').classList.remove('pokedexHeader');
        document.getElementById('searchDiv').classList.remove('search');
        document.getElementById('searchDiv').classList.add('searchScreen');
    } else {
        document.getElementById('searchDiv').classList.remove('searchScreen');
        document.getElementById('searchDiv').classList.add('pokedexHeader');
        document.getElementById('searchDiv').classList.add('search');
    }
});