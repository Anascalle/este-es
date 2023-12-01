
import { navigate } from "../../store/actions";
import { addObserver, appState, dispatch } from "../../store/index";
import { Screens } from "../../types/navegation";
import styleinvitationLanding from "./navlanding.css"



class Navinvitation extends HTMLElement{

    constructor(){
        super();
        this.attachShadow({mode: "open"});
        addObserver(this)
    }

    connectedCallback(){
        this.render();

    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ` <style>${ styleinvitationLanding}</style>`

            const sec = this.ownerDocument.createElement("section")
            this.shadowRoot?.appendChild(sec);

            const Phase = this.ownerDocument.createElement("p")
            Phase.innerText= "Discover a realm where curiosity and art intertwine on a unique online platform"
            sec.appendChild(Phase);

            const Create = this.ownerDocument.createElement("button")
            Create.innerText= "Create an account"
            Create.addEventListener("click", ()=>{
                dispatch(navigate(Screens.SIGNUP)) })
            sec.appendChild(Create);

           
        }
    }
}

customElements.define("my-nav-invitation",Navinvitation);
export default Navinvitation;