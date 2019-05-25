import VModal from "./VModal.js";

export default {
    components: {
        VModal
    },
    props: {
        image: {
            type: String,
            required: true
        },
        imageNameValue: {
            type: String,
            required: true
        },
        categoryValue: {
            type: String,
            required: true
        },
    },
    template: `
    <v-modal
        :inputs="dataInputs"
        :image="image"
        @submit="submit"
    ></v-modal>
    `,

    data() {
        return {
            dataInputs: {
                imageName: {
                    label: 'Name',
                    inputType: 'text',
                    value: this.imageNameValue
                },
                category: {
                    label: 'Name',
                    inputType: 'text',
                    value: this.categoryValue
                }
            }
        }
    },

    methods: {
        submit(data) {
            this.$emit('submit', data);
        }
    }
}