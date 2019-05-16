import RegisterComponent from './components/RegisterComponent.js';
import LoginComponent from './components/LoginComponent.js';

let controlBar = [
    {
        name: 'MY PHOTOS',
        component: {
            template: '<div>MY PHOTOS</div>'
        }
    },
    {
        name: 'REGISTER',
        component: RegisterComponent
    },
    {
        name: 'LOGIN',
        component: LoginComponent
    }
];

export default controlBar;