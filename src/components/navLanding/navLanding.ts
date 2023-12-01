
import { navigate } from "../../store/actions";
import { addObserver, appState, dispatch } from "../../store/index";
import { Screens } from "../../types/navegation";
import styleNaveLanding from "./navlanding.css"



class NavLanding extends HTMLElement{

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
            this.shadowRoot.innerHTML = ` <style>${styleNaveLanding}</style>`

            const nav = this.ownerDocument.createElement("nav")
            this.shadowRoot?.appendChild(nav);


            const Logo = this.ownerDocument.createElement("img")
            Logo.setAttribute("src", "/dist/img/CURIART.png")
            Logo.setAttribute("class", "Logo")
            Logo.addEventListener("click", ()=>{
                dispatch(navigate(Screens.LANDING)) })
            nav.appendChild(Logo);
            
            const logIn = this.ownerDocument.createElement("button")
            logIn.innerText= "LOGIN"
            logIn.addEventListener("click", ()=>{
                dispatch(navigate(Screens.LOGIN)) })
            nav.appendChild(logIn);
        }
    }
}

customElements.define("my-nav-landing",NavLanding);
export default NavLanding;