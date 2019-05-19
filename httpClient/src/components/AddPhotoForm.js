import BaseInput from './VInput.js';
import FileInput from './VInputFile.js';

export default {
    components: {
        BaseInput,
        FileInput
    },
    props: {
        title: {
            type: String,
            required: true
        },
        buttonLabel: {
            type: String,
            required: true
        },
    },
    template: `
    <div class="form-data">
        <h2 class="w3-blue-grey">{{ title }}</h2>
        <base-input
            v-bind="nameInputAttr"
            v-model="fileInfo.imageName">
        </base-input>
        <base-input
            v-bind="categoryInputAttr"
            v-model="fileInfo.category">
        </base-input>
        <file-input v-if="!fileInfo.imageDataUrl"
            :label="uploadFileLabel"
            accept="image/jpeg"
            @change="uploadFile">
        </file-input>
        <div class="img-preview" v-else>
            <img :src="fileInfo.imageDataUrl" />
            <button class="w3-btn w3-blue-grey" @click="removeImage">{{ removeImgae }}</button>
        </div>
        <button
            class="w3-btn w3-blue-grey"
            @click="$emit('submit', fileInfo)"
            type="button"
            :disabled="valid">
            {{ buttonLabel }}            
        </button>
    </div>
    `,
    data() {
        return {
            fileInfo: {
                fileName: '',
                category: '',
                imageName: '',
                imageDataUrl: ''
            },
            nameInputAttr: {
                label: "Name",
                inputType: "text"
            },
            categoryInputAttr: {
                label: "Category",
                inputType: "text"
            },
            removeImgae: 'Remove Image',
            uploadFileLabel: 'Click or Drag photo to upload'
        }
    },
    methods: {
        uploadFile(files) {
            if (files.length !== 0) {
                this.createImage(files[0]);
            }
        },
        createImage(file) {
            if (file.type !== 'image/jpeg') {
                alert(`Unsuporrted format [${file.type}]. Upload [jpg/jpeg] only`);
                return;
            }
            var reader = new FileReader();
            var vm = this;
            vm.fileInfo.fileName = file.name;

            reader.onload = (e) => {
                vm.fileInfo.imageDataUrl = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        removeImage() {
            this.fileInfo.imageDataUrl = '';
        }
    },
    computed: {
        valid() {
            return this.fileInfo.imageDataUrl === '';
        }
    }

}