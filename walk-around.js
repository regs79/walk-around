class WalkAround extends HTMLElement {
  static tagName = "walk-around";

  static attrs = {
    title: "title",
    position: "position",
  }

  static style = `
    :host {
      --offset-distance: 50px;
    }

    h1 {
      font-family: sans-serif;
      font-size: 2em;
      margin: 0;
    }

    .bottom-right {
      position: fixed;
      bottom: 0;
      right: var(--offset-distance);
    }

    .bottom-left {
      position: fixed;
      bottom: 0;
      left: var(--offset-distance);
    }

    .top-right {
      position: fixed;
      top: 0;
      right: var(--offset-distance);
    }

    .top-left {
      position: fixed;
      top: 0;
      left: var(--offset-distance);
    }
      
  `;

  connectedCallback() {
    if(!("replaceSync" in CSSStyleSheet.prototype) || this.shadowRoot) {
			return;
		}
    let shadowroot = this.attachShadow({ mode: "open" });

    let sheet = new CSSStyleSheet();
		sheet.replaceSync(WalkAround.style);
		shadowroot.adoptedStyleSheets = [sheet];

    let template = document.createElement("template");

    let appTitle = this.getAttribute(WalkAround.attrs.title) || "walk-around";

    let appPos= this.getAttribute(WalkAround.attrs.position) || "bottom-right";

    template.innerHTML = `
      <div class="walk-around ${appPos}">
        <h1>walk-around</h1>
      </div>
    `;

    shadowroot.appendChild(template.content.cloneNode(true));
  }
}
    
customElements.define(WalkAround.tagName, WalkAround);