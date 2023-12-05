const pokemonListId = document.getElementById("pokemon-list-id")
const buttonAddMorePokemons = document.getElementById("loadMorePokemons")

const limit = 10;
let offset = 0;
const maxPokemonByPage = 151


function convertPokemonToLi(pokemon) {
    return `   
    <li class="pokemon-item">
        <a id="${pokemon.type}" href="../details.html?pokemonId=${pokemon.number}">
            <span class="pokemon-number">#${pokemon.number}</span>
            <span class="pokemon-name">${pokemon.name}</span>

            <ul class="types">
                ${pokemon.types.map((type) => `<li class="type" id="${type}">${type}</li>`).join(" ")}
            </ul>
            <img src="${pokemon.image}" alt="${pokemon.name}">
        </a>
    </li>
`
}

function loadPokemonItens(offset,limit) {
    pokeApi.getPokemons(offset,limit).then((pokemonList = []) =>  {
        
        pokemonListId.innerHTML += pokemonList.map(convertPokemonToLi).join(" ")
        
    }).catch((error) => console.error(error))
}

loadPokemonItens()


buttonAddMorePokemons.addEventListener("click",() => {

    offset += limit
    const qtdPokemonsByPage = offset + limit

    if(qtdPokemonsByPage >= maxPokemonByPage) {
        const newLimit = maxPokemonByPage - offset
        loadPokemonItens(offset,newLimit)
        buttonAddMorePokemons.parentElement.removeChild(buttonAddMorePokemons)
    }else { 
        loadPokemonItens(offset,limit)
    }
    
  
})
