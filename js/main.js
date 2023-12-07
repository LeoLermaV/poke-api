const listPokemon = document.querySelector('#listPokemon');
const bottonesHeader = document.querySelectorAll('.btn-header')
let url = 'https://pokeapi.co/api/v2/pokemon/'

for (let i = 1; i <= 151; i++) {
    fetch(url + i)
        .then((Response) => Response.json())
        .then(data => mostrarPokemon(data))
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeId = poke.id.toString();
    if (pokeId.length === 1) {
        pokeId = '00' + pokeId;
    } else if (pokeId.length === 2){
        pokeId = '0' + pokeId;
    }

    const div = document.createElement('div');
    div.classList.add('pokemon');
    div.innerHTML = `
    <p class="pokemon-id-back">#${pokeId}</p>
            <div class="pokemon-imagen">
              <img
                src="${poke.sprites.other['official-artwork'].front_default}"
                alt="${poke.name}"
              />
            </div>
            <div class="pokemon-inf">
              <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-name">${poke.name}</h2>
              </div>
              <div class="pokemon-tipos">
                ${tipos}
              </div>
              <div class="pokemon-stats">
                <p class="height">${poke.height}m</p>
                <p class="weight">${poke.weight}kg</p>
              </div>
            </div>
            `;
    listPokemon.append(div);
}

bottonesHeader.forEach(boton => boton.addEventListener('click', (event) => {
    const botonId = event.currentTarget.id;

    listPokemon.innerHTML = '';

    for (let i = 1; i <= 151; i++) {
        fetch(url + i)
            .then((Response) => Response.json())
            .then(data => {

                if (botonId === 'All') {
                    mostrarPokemon(data);
                } else { 
                    const tipos = data.types.map(type => type.type.name);
                if (tipos.some(tipo => tipo.includes(botonId))) {
                    mostrarPokemon(data);
                }
                }

                
            })
    }

}))
