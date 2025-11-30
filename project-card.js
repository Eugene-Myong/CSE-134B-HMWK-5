class ProjectCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
        <style>
            :host {
                display: block;
            }

            /* --- MODULE-CARD STYLES (converted for shadow DOM) --- */

            a.card-link {
                display: flex;
                flex-direction: column;
                align-items: center;
                max-width: 450px;
                margin-top: 1rem;
                margin-bottom: 1rem;
                color: black;
                background-color: white;
                text-decoration: none;
                border-radius: var(--border-radius-default, 10px);
                padding: 1em;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
                transition: transform 0.25s, box-shadow 0.25s, background-color 0.25s, color 0.25s;
            }

            a.card-link:hover {
                transform: translateY(-5px);
                box-shadow: 0 8px 18px var(--second-color, #8525cf);
                background-color: var(--second-color, #8525cf);
                color: white;
            }

            a.card-link:active {
                transform: translateY(0);
                box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
                background-color: var(--second-color, #8525cf);
                color: white;
            }

            h3 {
                margin: 0;
                font-size: 1.25rem;
                font-weight: bold;
                text-align: center;
            }

            picture {
                width: 100%;
                height: auto;
                margin: 0.6rem 0 1rem 0;
                overflow: hidden;
                border-radius: var(--border-radius-default, 10px);
                display: flex;
                justify-content: center;
                align-items: center;
                background: white;
            }

            picture img {
                width: 100%;
                height: auto;
                border-radius: var(--border-radius-default, 10px);
            }

            p.desc {
                margin-top: 0.5rem;
                font-size: 0.95rem;
                line-height: 1.4;
                text-align: center;
            }
        </style>

        <a class="card-link" target="_blank">
            <h3 class="title"></h3>
            <picture class="image-wrapper">
                <img />
            </picture>
            <p class="desc"></p>
        </a>
        `;
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ["title", "img", "alt", "desc", "link"];
    }

    attributeChangedCallback() {
        this.render();
    }

    render() {
        const title = this.getAttribute("title") || "Untitled Project";
        const img = this.getAttribute("img") || "images/placeholder.jpeg";
        const alt = this.getAttribute("alt") || "Project image";
        const desc = this.getAttribute("desc") || "";
        const link = this.getAttribute("link") || "#";

        this.shadowRoot.querySelector(".title").textContent = title;
        this.shadowRoot.querySelector("img").src = img;
        this.shadowRoot.querySelector("img").alt = alt;
        this.shadowRoot.querySelector(".desc").textContent = desc;
        this.shadowRoot.querySelector("a.card-link").href = link;
    }
}

customElements.define("project-card", ProjectCard);
