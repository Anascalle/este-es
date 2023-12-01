import styleSign from "./cardSign.css"
import { navigate } from "../../store/actions";
import { dispatch } from "../../store";
import { Screens } from "../../types/navegation";

class cardSign extends HTMLElement {

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
        ${styleSign}
        </style>
        `
        const contAll = document.createElement('div');
        contAll.classList.add('cont-all');

        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = 'Sign Up';

        const usernameInput = document.createElement('input');
        usernameInput.classList.add('imputt');
        usernameInput.placeholder = 'Username';
        usernameInput.type = 'text';

        const passwordInput = document.createElement('input');
        passwordInput.classList.add('imputt');
        passwordInput.placeholder = 'Password';
        passwordInput.type = 'text';

        const emailInput = document.createElement('input');
        emailInput.classList.add('imputt');
        emailInput.placeholder = 'E-mail';
        emailInput.type = 'text';

        const workFileInput = document.createElement('input');
        workFileInput.classList.add('imputt');
        workFileInput.placeholder = 'Work file';
        workFileInput.type = 'text';

        const accessButton = document.createElement('button');
        accessButton.classList.add('access');
        accessButton.textContent = 'CREATE ACCOUNT';
        accessButton.addEventListener('click', () => {
            dispatch(navigate(Screens.DASHBOARD));
     });

        const contAlter = document.createElement('div');
        contAlter.classList.add('cont-alter');

        
        contAll.appendChild(title);
        contAll.appendChild(usernameInput);
        contAll.appendChild(passwordInput);
        contAll.appendChild(emailInput);
        contAll.appendChild(workFileInput);
        contAll.appendChild(accessButton);
        contAll.appendChild(contAlter);
        this.shadowRoot.appendChild(contAll)



    }
    }}

customElements.define("my-sign", cardSign);
export default cardSign;