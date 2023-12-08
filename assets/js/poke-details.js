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
            (function printHeaderInformations() {
                const header = document.getElementById("pokemon-presentation")
                
                header.innerHTML = ` 
                    <h1>${pokemon.name}</h1>

                    <div id="types">
                        ${pokemon.types.map((type)=> `<span class="type" id="${type}">${type}</span>`).join(" ")}
                    </div>
                    `    
            })();
                
            (function printMainInformations() {
                const image = document.getElementById("pokemon-image")

                const pokemonImage = pokemon.image
                const pokemonAlt = pokemon.name

                image.setAttribute("src",pokemonImage)
                image.setAttribute("alt", pokemonAlt)

            })();
                
            (function printGeneralInformation() {
                const generalInformations = document.getElementById("general-container")

                generalInformations.innerHTML = `
                    <p>height</p><span>${pokemon.height / 10} M</span>
                    <p>weight</p><span>${pokemon.weight / 10} KG</span>
                    <p>base experiencie</p><span>${pokemon.baseExperience} XP</span>
                `
            })();

            (function printAbilities() {
                const abilitiesList = document.getElementById("abilitiesList")
                
                abilitiesList.innerHTML = `
                    ${pokemon.abilitys.map((ability) => `<li>${ability}</li>`).join(" ")}
                `
            })();

            (function printStats() {
                const statList = document.getElementById("statsList")

                statList.innerHTML = `
                    ${pokemon.stats.map((stat) =>
                    `<li>
                        <p>${stat.name} <span>${stat.value}</span></p> 
                        <div id="${stat.name}" class="range"></div>
                    </li>`
                    ).join(" ")}`
            })();

            (function printButtons(){
                const descriptionButtonsContainer = document.getElementById("description-button-container");
                const moveButtonContainer = document.getElementById("move-button-container");

                descriptionButtonsContainer.innerHTML = `
                    ${pokemon.descriptions.map((desc)=> {
                        return `
                            <button class="descriptionByVersion">${desc.version}</button>
                        `
                    }).join(" ")}
                    `
                moveButtonContainer.innerHTML = `
                    ${pokemon.descriptions.map((desc)=> {
                        return `
                            <button class="moveByVersion">${desc.version}</button>
                        `
                    }).join("")}
                    `
            })();

        const descriptionsHtmlElements = document.getElementsByClassName("descriptionByVersion");
        const movesHtmlElements = document.getElementsByClassName("moveByVersion")

        Array.from(descriptionsHtmlElements).forEach((element) => {
            element.addEventListener("click", ()=> {
                const description = pokemon.descriptions.find((desc) => desc.version === element.textContent);

                if (description) {
                    const pokemonDescription = document.getElementById("pokemon-description");
                    pokemonDescription.textContent = description.text;
                } else {
                    console.log("Descrição não encontrada");
                }
            }) ;
        });

        Array.from(movesHtmlElements).forEach((element) => {
            element.addEventListener("click",()=> {
                const spanVersionName = document.getElementById("version-name")
                spanVersionName.textContent = element.textContent;

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
        })
});

