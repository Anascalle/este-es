import { dispatch } from "../../store";
import { Actions } from "../../types/store";
import styleFriend from "./cardFriends.css"

export enum AttributesFriends {
  "friendprofile" = "friendprofile",
  "friendname" = "friendname",
  "friendoccupation" = "friendoccupation",

}

class cardFriend extends HTMLElement {

  friendprofile?: string;
  friendname?: string;
  friendoccupation?: string;


  static get observedAttributes() {
    const attributes: Record<AttributesFriends, null> = {
      friendprofile: null,
      friendname: null,
      friendoccupation: null,

    };
    return Object.keys(attributes);
  }

  attributeChangedCallback(
    propName: AttributesFriends,
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
      ${styleFriend}
      </style>
      <div class="contenedor">
      <div class="cont-all">
      <div class="cont-image">
      <img class="profile-image" src="${this.friendprofile}" alt="imagen de perfil amigo">
      </div>
      <div class="cont-info">
      <b><p class="userName">${this.friendname}</p></b>
      <p class="userOcc">${this.friendoccupation}</p>
      </div>
      </div>
      </div>
      `
      }

  }

}

customElements.define("friend-card", cardFriend);
export default cardFriend;