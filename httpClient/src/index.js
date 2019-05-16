import RegisterComponent from './components/RegisterComponent.js';

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
        component: {
            template: '<div>LOGIN</div>'
        }
    }
];

export default controlBar;