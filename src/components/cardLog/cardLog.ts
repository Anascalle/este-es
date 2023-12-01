import styleLog from "./cardLog.css"
import { navigate } from "../../store/actions";
import { dispatch } from "../../store";
import { Screens } from "../../types/navegation";


class cardLog extends HTMLElement {

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
        ${styleLog}
        </style>
        `
    
        const contAll = document.createElement('div');
        contAll.classList.add('cont-all');

        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = 'LogIn';

        const usernameInput = document.createElement('input');
        usernameInput.classList.add('imputt');
        usernameInput.setAttribute('placeholder', 'Username');
        usernameInput.setAttribute('type', 'text');

        const passwordInput = document.createElement('input');
        passwordInput.classList.add('imputt');
        passwordInput.setAttribute('placeholder', 'Password');
        passwordInput.setAttribute('type', 'text');

        const accessButton = document.createElement('button');
        accessButton.classList.add('access');
        accessButton.textContent = 'Login';
         accessButton.addEventListener('click', () => {
        dispatch(navigate(Screens.DASHBOARD));
 });


        const contAlter = document.createElement('div');
        contAlter.classList.add('cont-alter');

        const message = document.createElement('p');
        message.classList.add('message');
        message.textContent = "Don't have an account?";
       message.addEventListener('click', () => {
            dispatch(navigate(Screens.SIGNUP));
     });

        const signUpButton = document.createElement('button');
        signUpButton.classList.add('account');
        signUpButton.textContent = 'Sign Up';

        contAll.appendChild(title);
        contAll.appendChild(usernameInput);
        contAll.appendChild(passwordInput);
        contAll.appendChild(accessButton);
        contAll.appendChild(contAlter);
        contAlter.appendChild(message);
        contAlter.appendChild(signUpButton);
        this.shadowRoot.appendChild(contAll);


    }
    }}

customElements.define("my-log", cardLog);
export default cardLog;