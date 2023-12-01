import { addObserver } from "../store";
import { Screens } from "../types/navegation";
import { appState, dispatch } from "../store/index";
import { ScreenActions } from "../types/store";
import { getUserData } from "../utils/firebase";
import { Attributes } from "../components/editInfo/editInfo";
import "../components/export";

class Edit extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({ mode: 'open' });
        addObserver(this)
	}

	async connectedCallback() {
		this.render();
	}

	async render() {
		if (this.shadowRoot) {this.shadowRoot.innerHTML = ``;

        const myNav = this.ownerDocument.createElement("my-nav");
        this.shadowRoot?.appendChild(myNav);

		const editThing = this.ownerDocument.createElement("edit-card");
    	this.shadowRoot?.appendChild(editThing);

	}
	}
}

customElements.define('app-edit', Edit);
export default Edit;