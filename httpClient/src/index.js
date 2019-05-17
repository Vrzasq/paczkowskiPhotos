import RegisterComponent from './components/RegisterComponent.js';
import LoginComponent from './components/LoginComponent.js';
import PhotosComponent from './components/PhotosComponent.js';

let ControlBar = {
    photos: {
        name: 'MY PHOTOS',
        display: true,
        component: PhotosComponent
    },
    register: {
        name: 'REGISTER',
        display: true,
        component: RegisterComponent
    },
    login: {
        name: 'LOGIN',
        display: true,
        component: LoginComponent
    }
}

let RoutesComponents = {
    error: {
        name: 'ERROR',
        component: ''
    },
    registerSuccess: {
        name: "REGISTER SUCCESS",
        component: ''
    },
    photos: {
        name: 'MY PHOTOS',
        component: PhotosComponent
    },
    login: {
        name: 'LOGIN',
        component: LoginComponent
    }
}

export {ControlBar, RoutesComponents};