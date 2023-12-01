import styleCard from "./Card.css"
import { dispatch } from "../../store";
import { Actions } from "../../types/store";


export enum Attributes {
  "profileimg" = "profileimg",
  "username" = "username",
  "occupation" = "occupation",
  "description" = "description",
  "image" = "image",
  "like"="like",
  "save"="save",
  "follow"= "follow"

}

class ArtistCard extends HTMLElement {

  followButton?: HTMLButtonElement;
  profileimg?: string;
  username?: string;
  occupation?: string;
  description?: string;
  image?: string;
  like?: string;
  save?: string;
  follow?:string;


  static get observedAttributes() {
    const attributes: Record<Attributes, null> = {
      username: null,
      occupation: null,
      description: null,
      image: null,
      profileimg: null,
      like:null,
      save:null,
      follow:null,

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
     this.followButton = document.createElement("button");
     this.followButton.classList.add("button-follow");

     this.followButton.textContent = "Follow";


     this.followButton.addEventListener("click", () => {
       this.toggleFollow();
     });

  
    this.render();
  }


  connectedCallback() {
    this.render();
  }


  toggleFollow() {
    if (this.followButton) {
        
      if (this.followButton.textContent === "Follow") {
        this.followButton.textContent = "Following";
      } else {
        this.followButton.textContent = "Follow";
       
       }
     }
   }

  toggleLike() {
     if (this.like) {
      if (this.like === "../../../dist/img/Me gusta.png") {
        (this.like = "../../../dist/img/Me gusta soid.png");
       } else {
        this.like = "../../../dist/img/Me gusta.png";
       }

       this.render();
     }
   }

    togglefav() {
     if (this.like) {
      if (this.save === "../../../dist/img/Favoritos.png") {
        (this.save = "../../../dist/img/Favoritos-solid.png");
       } else {
        this.save = "../../../dist/img/Favoritos.png";
       }

       this.render();
     }
   }


  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
      <style>
      ${styleCard}
      </style>
          <div class="instagram-profile">
          <div class="profGen">
          <img class="profile-image" src="${this.profileimg}" alt="imagen de perfil">
          <div class="profInfo">
          <h1 class="uNam">${this.username}</h1>
          <h4 class="occ">${this.occupation}</h4>
          </div>
          </div>
          <p class="desc">${this.description}</p>
          <img class="theArt" src="${this.image}" alt="Obra del artista">
          <div class="profile-description">
          <button class="like-button"><img class="like-image" src="${this.like}" alt="icono like"></button>
        <button class="save-button"><img class="save-image" src="${this.save}" alt="icono save"></button>
        </div>
        </div>
      `
      if (this.followButton) {
        this.shadowRoot.querySelector("div")?.insertBefore(this.followButton, this.shadowRoot.querySelector("p"));
      }

       const likeButton = this.shadowRoot.querySelector(".like-button");
       if (likeButton) {
         likeButton.addEventListener("click", () => {
           this.toggleLike();
         });
       }
       const favButton = this.shadowRoot.querySelector(".save-button");
       if (favButton) {
         favButton.addEventListener("click", () => {
           this.togglefav();
         });
       }
        
      }
    
  }
 
}

customElements.define("artist-card", ArtistCard);
export default ArtistCard;