import { addObserver } from "../store";
import { Screens } from "../types/navegation";
import { navigate } from "../store/actions";
import { appState, dispatch } from "../store/index";
import { ScreenActions } from "../types/store";
import "../components/export";
import style from "./login.css"

class Login extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
        addObserver(this)
	}

	connectedCallback() {
		this.render();
	}

	render() {
		if (this.shadowRoot) {this.shadowRoot.innerHTML = `<style>${style}</style>`;;

        
        const nav = this.ownerDocument.createElement("nav")
        this.shadowRoot.appendChild(nav)
        const Logo = this.ownerDocument.createElement("img")
        Logo.setAttribute("src", "/dist/img/CURIART.png")
        Logo.setAttribute("class", "Logo")
        Logo.addEventListener("click", ()=>{
            dispatch(navigate(Screens.LANDING)) })
        nav.appendChild(Logo);

		const loginCard = this.ownerDocument.createElement("my-log");
        this.shadowRoot?.appendChild(loginCard);

	}
	}
}

customElements.define('app-login', Login);
export default Login;