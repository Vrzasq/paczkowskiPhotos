import Services from '../services.js';
import Commons from '../commons.js';
import AddPhotoComponent from './AddPhotoComponent.js';

export default {
    components: {
        AddPhotoComponent
    },
    template: `
    <div class="form-data">
        MY PHOTOS
        <div class="form-row" v-for="image in images">
            <img :src="dataType + image.image" alt=":("/>
        </div>
    </div>
    `,

    data: function () {
        return {
            images: [],
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