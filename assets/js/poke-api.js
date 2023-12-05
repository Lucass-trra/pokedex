const pokeApi = {};

 pokeApi.getPokemonDescriptionsByVersion = async(URL) => {
    
    return fetch(URL)
    .then((result) => result.json())
    .then((pokemonSpecies) => pokemonSpecies.flavor_text_entries)
    .then((englisSlots) => englishDescriptions = englisSlots.filter((desc)=> desc.language.name === "en"))
    .then((pokemonDescriptions)=> {
        return pokemonDescriptions.map((desc)=> {
            return {
                text: desc.flavor_text,
                version: desc.version.name
            }
        })
    })
    .catch((error) => {
        console.error('Erro ao obter descrições do Pokémon:', error);
    });
};

pokeApi.getPokemonMoves = async (moves) => {
    const moveDetailsPromises = moves.map((slot) => {
        return fetch(slot.move.url)
            .then((result) => result.json())
            .then((resultJson) => {
                return {
                    name: resultJson.name,
                    type: resultJson.type.name,
                    accuracy: resultJson.accuracy,
                    damageClass: resultJson.damage_class.name,
                    power: resultJson.power,
                    pp: resultJson.pp,
                    details: {}
                };
            })
            .then((movesList)=> {
               const detailsMove = slot.version_group_details.map((index)=> {

                    return {
                        learnedAtLevel: index.level_learned_at,
                        learnMethod: index.move_learn_method.name,
                        version: index.version_group.name
                    }
                })

                movesList.details = detailsMove
                return movesList
            })
            .catch((error)=> console.log(error))
    });

    return Promise.all(moveDetailsPromises);
};

pokeApi.getPokemonDetails = async (pokemon) => {
    return fetch(pokemon.url)
        .then((result) => result.json())
        .then(pokeModel.convertPokeApiToModel) 
}

pokeApi.getPokemons = async(offset = 0, limit = 10) => {
    const URL = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(URL)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokekons) => pokekons.map(pokeApi.getPokemonDetails))
        .then((allRequests) => Promise.all(allRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error));
};

pokeApi.getPokemonById = async (id)=> {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    
    return fetch(URL)
        .then((result) => result.json())
        .then(pokeModel.convertPokeApiToModel)
        .then((pokemon)=> pokemon)
        .catch((error) => console.error(error));
}
