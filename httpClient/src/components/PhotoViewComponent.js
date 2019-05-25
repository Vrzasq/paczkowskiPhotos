export default {
    props: {
        image: {
            type: String,
            required: true
        },
        imageName: {
            type: String,
            required: true
        },
        imageId: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        }
    },
    template: `
    <div class="single-photo">
        <img v-img:title="imageName" :src="dataUrl" alt=":(" />
        <div>
            <button @click="edit" class="w3-btn w3-blue-grey">{{ button.edit }}</button>
            <button @click="$emit('delete', imageData)" class="w3-btn w3-blue-grey">{{ button.delete }}</button>
        </div>        
    </div>
    `,

    data() {
        return {
            imageData: {
                imageName: this.imageName,
                category: this.category,
                imageId: this.imageId,
                image: ''
            },
            dataType: 'data:image/jpeg;base64',
            button: {
                edit: "Edit",
                delete: "Delete"
            }
        }
    },

    methods: {
        edit() {
            this.imageData.image = this.dataUrl;
            this.$emit('edit', this.imageData);
        }
    },

    computed: {
        dataUrl() {
            return `${this.dataType},${this.image}`;
        }
    },

    watch: {
        imageName(newValue) {
            this.imageData.imageName = newValue;
        }
    }
}