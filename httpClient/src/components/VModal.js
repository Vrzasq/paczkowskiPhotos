import BaseInput from "./VInput.js";

export default {
    components: {
        BaseInput
    },
    props: {
        title: {
            type: String,
            required: true
        },
        inputs: {
            type: Object,
            required: true
        },
        image: {
            type: String,
            required: false,
            default() {
                return '';
            }
        },

    },
    template: `
    <div id="modal" class="w3-modal">
        <div class="w3-modal-content">
            <header class="w3-container w3-blue-grey">
                <span @click="close" class="w3-button w3-display-topright">&times;</span>
                <h2>{{ title }}</h2>
            </header>
            
            <div class="w3-container">
                <base-input v-for="dataInput in dataInputs"
                    v-bind="dataInput"
                    v-model="dataInput.value"
                ></base-input>
            </div>

            <div class="img-preview" v-if="image !== ''">
                <img :src="imageInfo.imageDataUrl" />
            </div>

            <footer class="w3-container">
                <button @click="submit" class="w3-btn w3-blue-grey">{{ buttonLabel }}</button>            
            </footer>
        </div>
    </div>
    `,

    data() {
        return {
            dataInputs: this.inputs,
            buttonLabel: 'Submit'
        }
    },

    methods: {
        close() {
            document.getElementById('modal').style.display = 'none';
        },

        submit() {
            this.$emit('submit', this.dataInputs);
        }
    }
}