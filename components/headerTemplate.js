class HeaderTemplate extends HTMLElement {
    constructor() {
        super()

        const shadowDom = this.attachShadow({mode: "open"})
        shadowDom.innerHTML = this.build();
        shadowDom.appendChild(this.styles());
    }

    build() {
        const sections = this.getAttribute("sections").split(",");

        return `
        <header>
            <div id="pokedex-presentation">
                <h1>
                ${this.getAttribute("title") || "title"}<span>${this.getAttribute("subTitle")|| "sub"}</span>
                </h1>
              
                <img src="./assets/images/lamp.png" alt="dark-ligth-mode">
 
            </div>

            <div id="pokedex-search">
                <input 
                type="text" 
                id="search-pokemon"
                placeholder="${this.getAttribute("placeholder") || "default text"}"
                >
            </div>

            <div id="pokedex-sections">
                <ul> 
                ${sections.map((section)=> {
                    return `
                        <li>
                            <a href="./${section}.html">${section}</a>
                        </li>
                    `
                }).join(" ")}
                </ul>

                ${this.hasAttribute("generations")?`
                    <select name="Ngenerations" id="generations">
                        <option value="" disabled selected>generation</option>
                        <option value="">1°generation</option>
                        <option value="">2°generation</option>
                        <option value="">3°generation</option>
                    </select>
                    `
                    : ""}
            </div>
        </header>
        `
    }

    styles() {
        const styleHeader = document.createElement("style");
        styleHeader.innerHTML = `
            header {
                display: grid;
                grid-template-columns: 1fr;
                margin: .5rem;
                background-color:var(--default_color);
                border: 2px solid var(--default_color);
                border-radius:1rem;
                padding:1rem ;
                position: sticky;
                top: 0;
                z-index:1;
            
                div#pokedex-sections {
                    display: flex;
                    justify-content: flex-end;
                    gap: 1rem;
            
                    ul {
                        display: flex;
                        list-style: none;
                        gap: 1rem;  
                    }
                
                    select,li {
                        align-self: center;
                    
                    }
                
                    select {
                        padding: .9rem;
                        border: 2px solid var(--default_color_black);
                        border-radius:.3rem;
                        background: none;
                        cursor: pointer;
                        font-size: 1.2rem;
                        font-weight: bold;
                    }
                
                    li {
                        border-bottom: 2px solid var(--default_color_black);
                        padding: .5rem;
                        border-radius: 0px;
                        transition: .3s ease-in-out;
                        
                    }
            
                    li:hover {
                        background-color: var(--default_color_black);
                        border-radius: .5rem;
                        color:;
                    }
                
                    a {
                        text-decoration: none;  
                        color:var(--default_color_white);
                        font-size: 1.3rem;
                    }
                }
            
                div#pokedex-presentation {
                    display: flex;
                    justify-content: space-around;
                    width: 60%;
                    
                    h1 {
                        color: var(--default_color_white);
                        span {
                            color: var(--default_color_black);
                        }
                    }
                    img {
                        width: 15%;
                        padding: .5rem;
                        transition:.2s ease-in-out;
                        cursor:pointer;
                    }
                    img:hover {
                        background-color: whitesmoke;
                        border-radius: 50%;
                        filter: brightness(.9);
                    }
                }
            
                div#pokedex-search {
                    display: flex;
                    align-self: center;
                
                    input {
                        font-size:1rem;
                        padding: .7rem;
                        align-self: center;
                        border:2px solid black;
                        outline:none;
                        border-radius:.3rem;
                        width: 80%;
                    }
                }
            }   
            
            @media screen and (max-width: 418px) {
                header {
                    div#pokedex-sections {
                        flex-direction: column;
                        align-items: center;
                    }
            
                    div#pokedex-presentation {
                        flex-direction: column;
                        align-items: center;
            
                        img {
                            width: 30%;
                            scale: 1;
                        }
                    }
            
                    div#pokedex-search {
                        input {
                            width: 100%;
                        }
                    }
                }
            }

            @media screen and (max-width: 734px) {
                div#pokedex-presentation {
              
                    img {
                        scale: .7;
                    }
                }
            }

            @media screen and (min-width: 768px) {
                header {
                    grid-template-columns: 1fr 1fr ;
            
                    div#pokedex-sections {
                        flex-direction: row;
                        align-items: center;
                    }
            
                    div#pokedex-presentation {
                        flex-direction: column;
                        align-items: center;
                    }
            
            
                    div#pokedex-search {
                        input {
                            width: 80%;
                        }
                    }
                }
            }

            @media screen and (min-width: 992px) {
                header {
                    grid-template-columns: 1fr 1fr 1fr;
                }
            }

            @media screen and (min-width: 1200px) {
                header {
                    div#pokedex-presentation {
                        flex-direction: row;
                    }
                }
            }
        `
        return styleHeader;
    }
}

customElements.define("header-template", HeaderTemplate)