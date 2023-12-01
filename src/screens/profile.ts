import { AttributesProfile } from "../components/Profileinfo/Profileinfo";
import NavButton from "../components/navButton/navButton";
import "../components/export";
import styleProfile from "./profile.css";
import { getUserData, getPostData,getPostsByArtistId } from "../utils/firebase";

class Profile extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    this.render();
  }

  async render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `<style>${styleProfile}</style>`;

      const myNav = this.ownerDocument.createElement("my-nav");
      this.shadowRoot?.appendChild(myNav);

      const Profilecont = this.ownerDocument.createElement("div");
      Profilecont.classList.add("Profilecontainer");
      this.shadowRoot?.appendChild(Profilecont);

      const artistId = "Vzr3itFP1wwRWe24NSgK"; 
      const userData = await getUserData();
      const user = userData.find((user) => user.id === artistId);

      if (user) {
        const myProfile = this.ownerDocument.createElement("artist-profile");
        myProfile.setAttribute(AttributesProfile.profileimg, user.profileimg);
        myProfile.setAttribute(AttributesProfile.username, user.username);
        myProfile.setAttribute(AttributesProfile.occupation, user.occupation);

        Profilecont.appendChild(myProfile);

  // Obtener los posts del artista utilizando la función getPostsByArtistId
  const artistPosts = await getPostsByArtistId(artistId);
  console.log(artistPosts);
  const Profileconst = this.ownerDocument.createElement("div");
  Profileconst.classList.add("Profilecont");

  // Mostrar las imágenes de los posts
  artistPosts.forEach((post) => {
    const postImage = this.ownerDocument.createElement("img");
    postImage.classList.add("imgs-profil") 

    postImage.src = post.imageUrl;
    Profileconst.appendChild(postImage);
    Profilecont.appendChild(Profileconst)

  });
} else {
  console.error("Artista no encontrado");
      }
    }   
  }
}

customElements.define("app-profile", Profile);
export default Profile;