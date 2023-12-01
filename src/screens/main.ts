import ArtistCard, { Attributes } from "../components/Card/Card";
import { addObserver, appState, dispatch } from "../store/index";
import { navigate } from "../store/actions";
import "../components/export";
import styleMain from "./main.css";
import firebase from "../utils/firebase";
import { getPostData, getUserData,escuchar } from "../utils/firebase";

class Dashboard extends HTMLElement {
  card: ArtistCard[] = [];

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    addObserver(this);
  }

  async connectedCallback() {
    escuchar((post: any) => {
      this.render();
    });
  }

  async render() {
    try {
      const userData = await getUserData();
      const postData = await getPostData();
      console.log(userData);

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = `<style>${styleMain}</style>`;

        const myNav = this.ownerDocument.createElement("my-nav");
        this.shadowRoot.appendChild(myNav);

        if (this.shadowRoot) {
          const container = this.ownerDocument.createElement("div");
          container.classList.add("user-card-container");

          userData.forEach((user) => {
            const userPosts = postData.filter((post) => post.userId === user.id);

            userPosts.forEach((post) => {
              const cards = this.ownerDocument.createElement("artist-card") as ArtistCard;
              cards.setAttribute(Attributes.profileimg, user.profileimg);
              cards.setAttribute(Attributes.username, user.username);
              cards.setAttribute(Attributes.occupation, user.occupation);

              cards.setAttribute(Attributes.description, post.description);
              cards.setAttribute(Attributes.image, post.imageUrl);

              cards.setAttribute(Attributes.like, "../../../dist/img/Me gusta.png");
              cards.setAttribute(Attributes.save, "../../dist/img/Favoritos.png");

              this.card.push(cards);
            });
          });

          this.card.forEach((card) => container.appendChild(card));
          this.shadowRoot.appendChild(container);
        }
      }
    } catch (error) {
      console.error("Error al cargar datos de Firebase:", error);
    }
  }
}

customElements.define("app-dashboard", Dashboard);
export default Dashboard;
