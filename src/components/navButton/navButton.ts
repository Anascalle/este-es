import styleNavebutton from "./navButton.css"
enum NavButtonElement{
    "icon" = "icon",
    "text"= "text"
}

class NavButton extends HTMLElement {
    icon?: string;
    text?:string

    static get observedAttributes(){
        const attrs: Record<NavButtonElement,null> = {
            icon: null,
            text: null
        }
        return Object.keys(attrs);
    }

    attributeChangedCallback(propName:NavButtonElement, oldValue: string | undefined, newValue: string | undefined ){
        switch(propName){
            default:
            this[propName] = newValue;
            break;
        }

        
    }

    constructor(){
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback(){
        this.render();
    }

    render(){
        if(this.shadowRoot){
            this.shadowRoot.innerHTML = ` <style>${styleNavebutton}</style>`

            const btn = this.ownerDocument.createElement("button")
            const text = this.ownerDocument.createElement("p")
            text.innerHTML= (`${this.text}`)
            const icon = this.ownerDocument.createElement("img")
            icon.setAttribute("src", `${this.icon}`)

            btn.appendChild(icon)
            btn.appendChild(text)

            this.shadowRoot.appendChild(btn)

        }

    }

}

customElements.define("navegation-button", NavButton);
export default NavButton;