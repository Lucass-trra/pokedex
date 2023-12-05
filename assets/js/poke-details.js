let pokemonDetailsContainer = document.getElementById('pokemon-details-container');

function configurePokemonStats(pokemon) {
    const bars = document.getElementsByClassName("range");
    const stats = pokemon.stats;


    stats.forEach((stat, index) => {
        const porcentageStat = (stat.value * 100) / 255; // Calcular a porcentagem
        bars[index].style.width = `${porcentageStat}%`; // Definir a largura da div com a porcentagem
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search)
    const pokemonId = urlParams.get("pokemonId")

    pokeApi.getPokemonById(pokemonId)
        .then((pokemon) => {
            console.log(pokemon)
            function printTypes() {
                return `
            ${pokemon.types.map((type) => `<span class="type" id="${type}">${type}</span>`).join(" ")}`
            }
            function printButtons(className) {
                return `
                ${pokemon.descriptions.map((desc) => {
                    return `
                        <button class="${className}">${desc.version}</button>
                    `
                }).join(" ")}
            `
            }
            function printAbilities() {
                return `
            ${pokemon.abilitys.map((ability) => `<li>${ability}</li>`).join("")}
            `
            }
            function printStats() {
                return `${pokemon.stats.map((stat) =>
                    `<li>
                    <p>${stat.name} <span>${stat.value}</span></p> 
                    <div id="${stat.name}" class="range"></div>
                </li>`
                ).join(" ")}`
            }

            if (pokemon !== undefined) {
                pokemonDetailsContainer.innerHTML = `
        <header id="pokemon-presentation">
            <h1>${pokemon.name}</h1>
            <div id="types">
                ${printTypes()}
            </div>
        </header>
        
        <main id="pokemon-main">
            <img src="${pokemon.image}" alt="${pokemon.name}">

                <div id="buttons-container">     
                    ${printButtons("descriptionByVersion")}
                </div>  
            <p id="pokemon-description"></p>
        </main>

        <section id="secundary-information">
            <aside id="general-information">
                <div id="general-container">
                    <h2>General</h2>
                    <p>height</p><span>${pokemon.height / 10} M</span>
                    <p>weight</p><span>${pokemon.weight / 10} KG</span>
                    <p>base experiencie</p><span>${pokemon.baseExperience} XP</span>
                </div>
            
                <div id="abilities">
                    <h3>Abilities</h3>
                    <ul>
                        ${printAbilities()}
                    </ul>
                </div>
            </aside>
        
            <aside id="pokemon-stats">
                <h2>Stats</h2> 
                <ul id="statsList">
                    ${printStats()}
                </ul>  
            </aside>
        </section>
        
        
        
        <section id="pokemon-moves">
            <header>
                <h2>total moves learned by this pokemon</h2>

                <div id="version-button-container">
                    ${printButtons("moveByVersion")}
                </div>

            </header>

            <div id="tables-container">
                <div class="table">
                    <h2>lernned by egg</h2>

                    <table>
                        <thead>
                            <th>name</th> 
                            <th>type</th>
                            <th>accuracy</th>
                            <th>damage class</th>
                            <th>power</th>
                            <th>pp</th>
                        </thead>

                        <tbody id="tBodyEgg"></tbody>
                        
                        <tfoot>
                            <td colspan="8">table of moves to this pokemon </td>
                        </tfoot>
                    </table>
                </div>
        
                <div class="table">
                    <h2>lernned by tutor</h2>

                    <table>
                        <thead>
                            <th>name</th> 
                            <th>type</th>
                            <th>accuracy</th>
                            <th>damage class</th>
                            <th>power</th>
                            <th>pp</th>
                        </thead>

                        <tbody id="tBodyTutor"></tbody>
                        
                        <tfoot>
                            <td colspan="8">table of moves to this pokemon </td>
                        </tfoot>
                    </table>
                </div>

                <div class="table">
                    <h2>lernned by TM or HM</h2>

                    <table>
                        <thead>
                            <th>name</th> 
                            <th>type</th>
                            <th>accuracy</th>
                            <th>damage class</th>
                            <th>power</th>
                            <th>pp</th>
                        </thead>

                        <tbody id="tBodyTM-HM"></tbody>
                        
                        <tfoot>
                            <td colspan="8">table of moves to this pokemon </td>
                        </tfoot>
                    </table>
                </div>

                <div class="table">
                    <h2>learned by level up</h2>

                    <table>
                        <thead>
                            <th>name</th> 
                            <th>type</th>
                            <th>accuracy</th>
                            <th>damage class</th>
                            <th>power</th>
                            <th>pp</th>
                        </thead>

                        <tbody id="tBodyLevel-up"></tbody>

                        <tfoot>
                            <td colspan="8">lernned by level up</td>
                        </tfoot>
                    </table>
                </div>
            </div>
        </section>
        `
                const descriptionsHtmlElements = document.getElementsByClassName("descriptionByVersion");
                const movesHtmlElements = document.getElementsByClassName("moveByVersion")

                Array.from(descriptionsHtmlElements).forEach((element) => {
                    element.addEventListener("click", () => {
                        const description = pokemon.descriptions.find((desc) => desc.version === element.textContent);

                        if (description) {
                            const pokemonDescription = document.getElementById("pokemon-description");
                            pokemonDescription.textContent = description.text;
                        } else {
                            console.log("Descrição não encontrada");
                        }
                    });
                });

                Array.from(movesHtmlElements).forEach((element) => {
                    element.addEventListener("click", () => {
                        const levelUp = document.getElementById("tBodyLevel-up")
                        const HmTm = document.getElementById("tBodyTM-HM")
                        const tutor = document.getElementById("tBodyTutor")
                        const egg = document.getElementById("tBodyEgg")

                        levelUp.innerHTML = "";
                        HmTm.innerHTML = "";
                        tutor.innerHTML = "";
                        egg.innerHTML = "";

                        pokemon.moves.forEach((move) => {
                            const moveDetail = move.details.find((det) =>
                                det.version.includes(element.textContent)
                            )
                            if (moveDetail !== undefined) {
                                if (moveDetail.learnMethod === "level-up") {
                                    const newRow = document.createElement("tr")

                                    newRow.innerHTML = `
                        <tr>
                            <td>${move.name}</td>
                            <td class="move-type"><span id="${move.type}">${move.type}</span></td>
                            <td>${move.accuracy !== null ? move.accuracy : 'none'}</td>
                            <td>${move.damageClass !== null ? move.damageClass : 'none'}</td>
                            <td>${move.power !== null ? move.power : 'none'}</td>
                            <td>${move.pp !== null ? move.pp : 'none'}</td>
                        </tr>
                            `
                                    levelUp.appendChild(newRow)

                                } else if (moveDetail.learnMethod === "machine") {
                                    const newRow = document.createElement("tr")

                                    newRow.innerHTML = `
                        <tr>
                            <td>${move.name}</td>
                            <td class="move-type"><span id="${move.type}">${move.type}</span></td>
                            <td>${move.accuracy !== null ? move.accuracy : 'none'}</td>
                            <td>${move.damageClass !== null ? move.damageClass : 'none'}</td>
                            <td>${move.power !== null ? move.power : 'none'}</td>
                            <td>${move.pp !== null ? move.pp : 'none'}</td>
                        </tr>
                            `
                                    HmTm.appendChild(newRow)

                                } else if (moveDetail.learnMethod === "tutor") {
                                    const newRow = document.createElement("tr")

                                    newRow.innerHTML = `
                        <tr>
                            <td>${move.name}</td>
                            <td class="move-type"><span id="${move.type}">${move.type}</span></td>
                            <td>${move.accuracy !== null ? move.accuracy : 'none'}</td>
                            <td>${move.damageClass !== null ? move.damageClass : 'none'}</td>
                            <td>${move.power !== null ? move.power : 'none'}</td>
                            <td>${move.pp !== null ? move.pp : 'none'}</td>
                            </td>
                        </tr>
                            `
                                    tutor.appendChild(newRow)

                                } else if (moveDetail.learnMethod === "egg") {
                                    const newRow = document.createElement("tr")

                                    newRow.innerHTML = `
                        <tr>
                            <td>${move.name}</td>
                            <td class="move-type"><span id="${move.type}">${move.type}</span></td>
                            <td>${move.accuracy !== null ? move.accuracy : 'none'}</td>
                            <td>${move.damageClass !== null ? move.damageClass : 'none'}</td>
                            <td>${move.power !== null ? move.power : 'none'}</td>
                            <td>${move.pp !== null ? move.pp : 'none'}</td>
                        </tr>
                            `
                                    egg.appendChild(newRow)
                                }
                            }

                        })
                    })
                })

                configurePokemonStats(pokemon);


            }
        })




});

