import fileMood from "./Mood.css"
import { navigate } from "../../store/actions";
import { appState, dispatch } from "../../store/index";
import { Screens } from "../../types/navegation";

export enum AttributesMoodBoard{
    "titlemood"="titlemood",
    "profileimg" = "profileimg",
    "username" = "username",
  }
  
  class Mood extends HTMLElement {
    titlemood?: string;
    profileimg?: string;
    username?: string;
   
  
  
    static get observedAttributes() {
      const attributes: Record<AttributesMoodBoard, null> = {
        username: null,
        profileimg: null,
        titlemood: null,
      };
      return Object.keys(attributes);
    }
  
    attributeChangedCallback(
      propName: AttributesMoodBoard,
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
        ${fileMood}
        </style>
         
        `
        const container = document.createElement("div")
        this.shadowRoot.appendChild(container)

        const title = document.createElement("h1")
        title.innerHTML = `Moodboard`
        this.shadowRoot.appendChild(title)
  
        const profileimage = this.ownerDocument.createElement("img");
        profileimage.setAttribute( "src", `${this.profileimg}`)
        this.shadowRoot.appendChild(profileimage)
  
        const profilename = this.ownerDocument.createElement("p");
        profilename.innerHTML = `${this.username}`;
        this.shadowRoot.appendChild(profilename)
  
  
  
        
        container.appendChild(profileimage)
        container.appendChild(profilename)
       container.appendChild(title)
  
        
      }
    }}
  
  customElements.define("artist-mood",  Mood);
  export default  Mood;