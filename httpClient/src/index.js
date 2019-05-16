import RegisterComponent from './components/RegisterComponent.js';
import LoginComponent from './components/LoginComponent.js';
import PhotosComponent from './components/PhotosComponent.js';

let controlBar = {
    photos: {
        name: 'MY PHOTOS',
        component: PhotosComponent
    },
    register: {
        name: 'REGISTER',
        component: RegisterComponent
    },
    login: {
        name: 'LOGIN',
        component: LoginComponent
    }
}

export default controlBar;