import Services from '../services.js';
import AddPhotoForm from './AddPhotoForm.js';

export default {
    components: {
        AddPhotoForm
    },
    template: `
    <add-photo-form
        :title="formAttr.title"
        :buttonLabel="formAttr.buttonLabel"
        @submit="postToApi">
        </add-photo-form>
    `,

    data() {
        return {
            formAttr: {
                title: 'Upload Photo',
                buttonLabel: 'Submit'
            }
        }
    },

    methods: {
        postToApi(eventData) {
            console.log(eventData);
            let request = {
                displayName: eventData.imageName,
                fileName: eventData.fileName,
                category: eventData.category,
                image: eventData.imageDataUrl.split(',')[1]
            }
            $.ajax({
                method: 'POST',
                xhrFields: { withCredentials: true },
                url: Services.photo.addPhoto,
                contentType: 'application/json',
                data: JSON.stringify(request),
                success: function (data) {
                    console.log(data);
                },
                error: function (jqXHR, textStatus, errorThrown) { alert(`${textStatus} ${errorThrown}`); }
            });
        }
    }
}