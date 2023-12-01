import styleEdit from "./editInfo.css"
import { dispatch } from "../../store";
import { Actions } from "../../types/store";


    export enum Attributes {
    "profileimg" = "profileimg",
    "username" = "username",
    "password" = "password",
    "email" = "email",
    "occupation" = "occupation",
    "userDescription" = "userDescription",

    }

    class editInfo extends HTMLElement {

    profileimg?: string;
    username?: string;
    password?: string;
    email?: string;
    occupation?: string;
    userDescription?: string;


    static get observedAttributes() {
        const attributes: Record<Attributes, null> = {
            profileimg: null,
            username: null,
            password: null,
            email: null,
            occupation: null,
            userDescription: null

        };
        return Object.keys(attributes);
    }

    attributeChangedCallback(
        propName: Attributes,
        oldValue: string | undefined,
        newValue: string | undefined
    ) {
        this[propName] = newValue;
        this.render();
    }

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }


    connectedCallback() {
        this.render();
    }

    render() {
        if (this.shadowRoot) {
        this.shadowRoot.innerHTML = `
        <style>
        ${styleEdit}
        </style>
        <div class="itAll">
        <div class="theImg">
        <img class="profile-image" src="https://media.illustrationx.com/images/artist/LiamBrazier/145761/crop/500/film-character.jpg" alt="imagen de perfil">
        <button class="e-img">Edit image</button>
        </div>

        <div class="theInfo">
        <p class="nameys">Username</p>
        <input class="imputt" placeholder="Username" type="text">
        <p class="nameys">Password</p>
        <input class="imputt" placeholder="Password" type="text">
        <p class="nameys">Email</p>
        <input class="imputt" placeholder="Email" type="text">
        <p class="nameys">Work file</p>
        <input class="imputt" placeholder="Occupation" type="text">
        <p class="nameys">Description</p>
        <input class="imputt" placeholder="Description" type="text">
        <button class="save-all">Save changes</button>
        </div>
        </div>
        `
        }

    }

    }

    customElements.define("edit-card", editInfo);
    export default editInfo;