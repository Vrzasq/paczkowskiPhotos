import Services from '../services.js';
import Commons from '../commons.js';
import AddPhotoComponent from './AddPhotoComponent.js';

export default {
    components: {
        AddPhotoComponent
    },
    template: `
    <div>
        MY PHOTOS
        <div>
            <img :src="imageDataUrl" alt="dupa"/>
        </div>
    </div>
    `,

    data: function () {
        return {
            imageDataUrl: ''
        };
    },

    mounted: function () {
        let vm = this;
        $.ajax({
            method: 'GET',
            xhrFields: { withCredentials: true },
            url: Services.photo.getPhotos,
            success: function (data) {
                alert('success');
                console.log(data);
                vm.imageDataUrl = 'data:image/jpeg;base64,' + data[0].image;
            },
            error: function (jqXHR, textStatus, errorThrown) { console.log(`${textStatus} ${errorThrown}`); }
        });
    },
}