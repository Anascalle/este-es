import { addObserver, dispatch } from "../store/index";
import { Screens } from "../types/navegation";
import { navigate } from "../store/actions";
import "../components/export";
import styleMoodboard from "./moodboard.css";
import { AttributesMoodBoard } from "../components/Profilemood/Profilemood";
import { getUserData, getFavorites } from "../utils/firebase";

class MoodBoard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  connectedCallback() {
    this.render();
  }

  async render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `<style>${styleMoodboard}</style>`;

      const myNav = this.ownerDocument.createElement("my-nav");
      this.shadowRoot?.appendChild(myNav);

      const Profilecont = this.ownerDocument.createElement("div");
      Profilecont.classList.add("Profilecontainer");
      this.shadowRoot?.appendChild(Profilecont);

       const artistId = "Vzr3itFP1wwRWe24NSgK"; // El ID del artista deseado
       const userData = await getUserData();
      const user = userData.find((user) => user.id === artistId);
  
      if (user) {
        const myProfile = this.ownerDocument.createElement("artist-mood");
        myProfile.setAttribute(AttributesMoodBoard.profileimg, user.profileimg);
        myProfile.setAttribute(AttributesMoodBoard.username, user.username);

        Profilecont.appendChild(myProfile);

        // Obtener los favoritos del artista utilizando la función getFavorites
        const artistFavorites = await getFavorites();
        console.log(artistFavorites);

        if (artistFavorites.length > 0) {
          const Profileconst = this.ownerDocument.createElement("div");
          Profileconst.classList.add("Profilecont");

          // Mostrar las imágenes de los favoritos del artista
          artistFavorites.forEach((favorites) => {
            const postImage = this.ownerDocument.createElement("img");
            // postImage.setAttribute("src")
            postImage.classList.add("upload-image");
            postImage.src = favorites.postId;
            Profileconst.appendChild(postImage);
            Profilecont.appendChild(Profileconst);
          });
        } else {
          console.error("El artista no tiene favoritos aún.");
        }
      }
    }
  }
}

customElements.define("app-favorites", MoodBoard);
export default MoodBoard;
