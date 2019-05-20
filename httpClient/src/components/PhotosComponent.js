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
        <photo-view-component v-for="image in images"
            :image="image.image"
            :imageName="image.displayName"
            :imageId="image.photoNum"
            :key="image.photoNum">
        </photo-view-component>
    </div>
    `,

    data: function () {
        return {
            title: 'MY PHOTOS',
            images: [
                {},
                {},
                {}
            ],
            dataType: 'data:image/jpeg;base64,'
        };
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