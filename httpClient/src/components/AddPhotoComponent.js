import Services from '../services.js';
import AddPhotoForm from './AddPhotoForm.js';
import { ImageInfo } from '../dataObjects.js';

export default {
    components: {
        AddPhotoForm
    },
    template: `
    <add-photo-form
        v-model="imageInfo"
        :title="formAttr.title"
        :buttonLabel="formAttr.buttonLabel"
        @submit="postToApi"
        @remove-image="resetState">
    </add-photo-form>
    `,

    data() {
        return {
            formAttr: {
                title: 'Upload Photo',
                buttonLabel: 'Submit'
            },
            imageInfo: new ImageInfo()
        }
    },

    methods: {
        postToApi() {
            let vm = this;
            let request = {
                displayName: this.imageInfo.imageName,
                fileName: this.imageInfo.fileName,
                category: this.imageInfo.category,
                image: this.imageInfo.imageDataUrl.split(',')[1]
            }
            console.log(request);
            $.ajax({
                method: 'POST',
                xhrFields: { withCredentials: true },
                url: Services.photo.addPhoto,
                contentType: 'application/json',
                data: JSON.stringify(request),
                success: function (data) {
                    if (data) {
                        alert('SUCCESS');
                        vm.resetState();
                    } else {
                        alert('FAIL');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) { alert(`${textStatus} ${errorThrown}`); }
            });
        },
        resetState() {
            this.imageInfo = new ImageInfo();
        }
    }
}