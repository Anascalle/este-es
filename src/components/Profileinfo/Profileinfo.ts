import filePro from "./Profile.css"
import { navigate } from "../../store/actions";
import { appState, dispatch } from "../../store/index";
import { Screens } from "../../types/navegation";

export enum AttributesProfile {
    "profileimg" = "profileimg",
    "username" = "username",
    "occupation" = "occupation",
    "follow"= "follow"
  
  }
  
  class Profile extends HTMLElement {
  
    followButton?: HTMLButtonElement;
    profileimg?: string;
    username?: string;
    occupation?: string;
    follow?:string;
  
  
    static get observedAttributes() {
      const attributes: Record<AttributesProfile, null> = {
        username: null,
        profileimg: null,
        occupation: null,
        follow:null,
  
      };
      return Object.keys(attributes);
    }
  
    attributeChangedCallback(
      propName: AttributesProfile,
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
        ${filePro}
        </style>
         
        `
        const container = document.createElement("div")
        this.shadowRoot.appendChild(container)
  
        const profileimage = this.ownerDocument.createElement("img");
        profileimage.setAttribute( "src", `${this.profileimg}`)
        this.shadowRoot.appendChild(profileimage)
  
        const profilename = this.ownerDocument.createElement("p");
        profilename.innerHTML = `${this.username}`;
        this.shadowRoot.appendChild(profilename)
  
        const profilebutton = this.ownerDocument.createElement("button");
        profilebutton .innerHTML = `EDIT PROFILE`;
        profilebutton.addEventListener("click", ()=>{
            dispatch(navigate(Screens.EDIT)) })
        this.shadowRoot.appendChild(profilebutton )

        const logout = this.ownerDocument.createElement("button");
        logout.innerHTML = `LOG OUT `;
        logout.classList.add("btn-out")
        logout.addEventListener("click", ()=>{
            dispatch(navigate(Screens.LANDING)) })
        this.shadowRoot.appendChild(logout)
  
  
        
        container.appendChild(profileimage)
        container.appendChild(profilename)
        container.appendChild(profilebutton)
        container.appendChild(logout)
  
        
      }
    }}
  
  customElements.define("artist-profile", Profile);
  export default Profile;