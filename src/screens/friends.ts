import { addObserver } from "../store";
import { Screens } from "../types/navegation";
import { appState, dispatch } from "../store/index";
import { ScreenActions } from "../types/store";
import "../components/export";
import { getUserData, getFriends, addFriend } from "../utils/firebase";
import { AttributesFriends } from "../components/cardFriends/cardFriends";

class Friends extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    addObserver(this);
  }

  connectedCallback() {
    this.render();
  }

  async render() {

      try{

     
      const friends = await getFriends();
      const userData = await getUserData();
      console.log(friends);

      if (this.shadowRoot) {
        this.shadowRoot.innerHTML = `<style></style>`;

        const myNav = this.ownerDocument.createElement("my-nav");
        this.shadowRoot?.appendChild(myNav);
  
        const container = this.ownerDocument.createElement("div");
        this.shadowRoot.appendChild(container)

      friends.forEach((friend:any) => {
        // Puedes utilizar el componente friend-card para mostrar los datos de un amigo
        const friendCard = this.ownerDocument.createElement("friend-card");
        // Aquí configura los atributos del friend-card utilizando los datos del amigo
        friendCard.setAttribute(AttributesFriends.friendname, friend.username);
        friendCard.setAttribute(AttributesFriends.friendoccupation, friend.occupation);
        friendCard.setAttribute(AttributesFriends.friendprofile, friend.profileimg);
        
        container.appendChild(friendCard);
      });
    }
  
} catch (error) {
  console.error("Error al cargar datos de Firebase:", error);
}
}}

customElements.define('app-friends', Friends);
export default Friends;
