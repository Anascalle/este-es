
import { addObserver, appState, dispatch  } from "../store/index";
import { navigate } from "../store/actions";
import { Screens } from "../types/navegation";
import "../components/export";
import styleLanding from "./landing.css"


class Landing extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
    }
  

  connectedCallback() {
    this.render();
  }


  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `<style>${styleLanding}</style>`;

        const myNav = this.ownerDocument.createElement("my-nav-landing");
        this.shadowRoot?.appendChild(myNav);

        const mySec = this.ownerDocument.createElement("my-nav-invitation");
        this.shadowRoot?.appendChild(mySec);

        const body= document.body;
        const imageUrl=""
        body.style.backgroundImage = `url(${imageUrl})`
   
        body.style.backgroundSize = "cover";

        body.style.backgroundRepeat = "no-repeat";

    }}
  }

customElements.define("app-landing", Landing);
export default Landing;
