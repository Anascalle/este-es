import "../navButton/navButton";
import { navigate } from "../../store/actions";
import { appState, dispatch } from "../../store/index";
import { Screens } from "../../types/navegation";
import styleNave from "./nav.css"


class Nav extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();

    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ` <style>${styleNave}</style>`

            
            const nav = this.ownerDocument.createElement("nav")
            this.shadowRoot.appendChild(nav);

            const Logo = this.ownerDocument.createElement("img")
            Logo.setAttribute("src", "/dist/img/CURIART.png")
            Logo.setAttribute("class", "Logo")
            Logo.addEventListener("click", ()=>{
                dispatch(navigate(Screens.DASHBOARD)) })
            nav.appendChild(Logo);


            const setting = this.ownerDocument.createElement("navegation-button")
            setting.setAttribute("icon", "/dist/img/Ajustes.png")
            setting.setAttribute("text","Setting" )
            setting.addEventListener("click", ()=>{
                dispatch(navigate(Screens.EDIT)) })
            nav.appendChild(setting);

            const friends = this.ownerDocument.createElement("navegation-button")
            friends.setAttribute("icon", "/dist/img/Amigos.png")
            friends.setAttribute("text","Friends" )
            const textElement = this.ownerDocument.createElement("span");
            textElement.textContent = "friends";
            textElement.classList.add("customclass")
            friends.addEventListener("click", ()=>{
                dispatch(navigate(Screens.FRIENDS)) })
            nav.appendChild(friends);

            const moodboard = this.ownerDocument.createElement("navegation-button")
            moodboard.setAttribute("icon", "/dist/img/Moodboard.png")
            moodboard.setAttribute("text","Moodboard" )
            moodboard.addEventListener("click", ()=>{
                dispatch(navigate(Screens.MOODBOARD)) })
            nav.appendChild(moodboard);
    

            const upload = this.ownerDocument.createElement("navegation-button")
            upload.setAttribute("icon", "/dist/img/Subir.png")
            upload.setAttribute("text","Create" )
            upload.addEventListener("click", ()=>{
                dispatch(navigate(Screens.UPLOAD)) })
            nav.appendChild(upload);

            
            const butn = this.ownerDocument.createElement("button")
            butn.classList.add("mi-butn");
            const userimg = this.ownerDocument.createElement("img")
            userimg.setAttribute("src", "https://media.illustrationx.com/images/artist/LiamBrazier/145761/crop/500/film-character.jpg")
            userimg.classList.add("mi-butn-img");
            userimg.addEventListener("click", ()=>{
                dispatch(navigate(Screens.PROFILE)) })
       
           
           
        
            butn.appendChild(userimg)
            nav.appendChild(butn);



        }
    }
}

customElements.define("my-nav",Nav);
export default Nav;