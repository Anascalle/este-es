import { addObserver } from "../store";
import { Screens } from "../types/navegation";
import { appState, dispatch } from "../store/index";
import { ScreenActions } from "../types/store";
import { navigate } from "../store/actions";
import "../components/export";
import style from "./signUp.css"

class Register extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
        addObserver(this)
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {this.shadowRoot.innerHTML = `<style>${style}</style>`;

     
        
        const nav = this.ownerDocument.createElement("nav")
        this.shadowRoot.appendChild(nav)

		const loginCard = this.ownerDocument.createElement("my-sign");
        this.shadowRoot?.appendChild(loginCard);

        const Logo = this.ownerDocument.createElement("img")
        Logo.setAttribute("src", "/dist/img/CURIART.png")
        Logo.setAttribute("class", "Logo")
        Logo.addEventListener("click", ()=>{
            dispatch(navigate(Screens.LANDING)) })
        nav.appendChild(Logo);

	}
	}
}

customElements.define('app-register', Register);
export default Register;