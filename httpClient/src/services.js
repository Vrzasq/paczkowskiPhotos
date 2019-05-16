let baseUrl = 'https://localhost:44374/api';

export default {
    register: {
        newUser: `${baseUrl}/register/newuser`
    },

    login: {
        signIn: `${baseUrl}/login/signin`,
        logout: `${baseUrl}/login/logout`
    },

    photo: {
        addPhoto: `${baseUrl}/photo/addphoto`,
        getPhotos: `${baseUrl}/photo/GetPhotos`,
        editPhoto: `${baseUrl}/photo/EditPhoto`,
        deletePhoto: `${baseUrl}/photo/DeletePhoto`,
        addCategory: `${baseUrl}/photo/AddCategory`,
        getCategories: `${baseUrl}/photo/GetCategories`,
        deleteCategory: `${baseUrl}/photo/DeleteCategory`,
    }
}