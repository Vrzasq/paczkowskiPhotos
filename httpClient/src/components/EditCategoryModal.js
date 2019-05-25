import VModal from "./VModal.js";

export default {
    components: {
        VModal
    },
    props: {
        categoryValue: {
            type: String,
            required: true
        }
    },
    template: `
    <v-modal
        :title="modalTitle"
        :inputs="dataInputs"
        @submit="submit"
    ></v-modal>
    `,

    data() {
        return {
            dataInputs: {
                category: {
                    label: 'Category',
                    inputType: 'text',
                    value: this.categoryValue
                }
            },
            modalTitle: 'EDIT CATEGORY'
        }
    },

    methods: {
        submit(data) {
            console.log(data);
        }
    },

    watch: {
        categoryValue(newValue) {
            this.dataInputs.category.value = newValue;
        }
    }
}