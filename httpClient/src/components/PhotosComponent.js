import Services from '../services.js';
import Commons from '../commons.js';
import PhotoViewComponent from './PhotoViewComponent.js';

export default {
    components: {
        PhotoViewComponent
    },
    template: `
    <div class="photo-display">
        <h2 class="w3-blue-grey" v-once>{{ title }}</h2>
        <div class="photos-container">
            <photo-view-component v-for="image, index in images"
                :image="image.image"
                :imageName="image.displayName"
                :imageId="image.photoNum"
                :key="image.photoNum"
                @delete="deletePhoto($event, index)"
            ></photo-view-component>
        </div>        
    </div>
    `,

    data: function () {
        return {
            title: 'MY PHOTOS',
            images: [],
            dataType: 'data:image/jpeg;base64,'
        };
    },

    methods: {
        deletePhoto(imageData, index) {
            let vm = this;
            $.ajax({
                method: 'DELETE',
                contentType: 'application/json',
                xhrFields: { withCredentials: true },
                url: Services.photo.deletePhoto,
                data: JSON.stringify({ photoNum: imageData.imageId }),
                success: function (data) {
                    if (data) {
                        alert('SUCCESS');
                        vm.$delete(vm.images, index);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${textStatus} ${errorThrown}`); }
            });
        }
    },

    mounted: function () {
        let vm = this;
        $.ajax({
            method: 'GET',
            xhrFields: { withCredentials: true },
            url: Services.photo.getPhotos,
            success: function (data) {
                console.log(data);
                vm.images = data;
            },
            error: function (jqXHR, textStatus, errorThrown) { console.log(`${textStatus} ${errorThrown}`); }
        });
    },
}