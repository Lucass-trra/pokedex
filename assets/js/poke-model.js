const pokeModel = {}

class Pokemon {
    descriptions;
    moves;
    number;
    height;
    weight;
    baseExperience
    name;
    abilitys;
    stats;
    types;
    type;
    image;

    constructor
    (
        number, 
        name, 
        height, 
        weight,
        baseExperience, 
        abilitys,
        stats,
        types,
        type,
        image
    ) {
        this.number = number;
        this.name = name;
        this.height = height;
        this.weight = weight;
        this.baseExperience = baseExperience;
        this.abilitys = abilitys,
        this.stats = stats,
        this.types = types,
        this.type = type
        this.image = image
        
    }
}

pokeModel.convertPokeApiToModel = async (pokeDetails) => {
    const abilities = pokeDetails.abilities.map((abiliteSlot) => abiliteSlot.ability.name)

    const stats = pokeDetails.stats.map((statSlot)=> {
        return {
            name: statSlot.stat.name,
            value: statSlot.base_stat
        }
    })

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name)
    const [type1] = types

    const image = pokeDetails.sprites.other["official-artwork"].front_default
    
    // debugger
    const pokemon = new Pokemon(
        pokeDetails.id,
        pokeDetails.name,
        pokeDetails.height,
        pokeDetails.weight,
        pokeDetails.base_experience,
        abilities,
        stats,   
        types,
        type1,
        image
        )

        try {
          
            
            const descriptionsResult = await pokeApi.getPokemonDescriptionsByVersion(pokeDetails.species.url);
            pokemon.descriptions = descriptionsResult;

            const movesResult = await pokeApi.getPokemonMoves(pokeDetails.moves)
            pokemon.moves = movesResult
            

        } catch (error) {
            console.error('Erro ao obter descrições do Pokémon:', error);
            // Lidar com o erro, se necessário
        }
    
        return pokemon;
    }
    