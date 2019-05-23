import Services from '../services.js';
import PhotoViewComponent from './PhotoViewComponent.js';

export default {
    components: {
        PhotoViewComponent
    },
    props: {
        displayCategories: {
            type: Boolean,
            default() {
                return true;
            }
        },
        category: {
            type: String,
            default() {
                return '';
            }
        }
    },
    template: `
    <div class="photo-display">
        <h2 class="w3-blue-grey" v-once>{{ text.title }}</h2>
        <div class="categories-container" v-if="displayCategories">
            <h3 class="w3-blue-grey">{{ text.categoriesTitle }}</h3>
            <div class="category" v-for="category, index in categories">
                <span>{{ category.name }}</span>
                <img @click="showCategory(category.name)" src="images/folder.png" />
                <button @click="editCategory(category.name, index)" class="w3-btn w3-blue-grey">{{ text.edit }}</button>
                <button @click="deleteCategory(category.name, index)" class="w3-btn w3-blue-grey">{{ text.delete }}</button>
            </div>
            <div v-if="categories.length === 0">
                <h4>{{ text.noCategories }}</h4>
            </div>
        </div>
        <div class="photos-container">
            <h3 class="w3-blue-grey">{{ photosTitle }}</h3>
            <photo-view-component v-for="image, index in images"
                :image="image.image"
                :imageName="image.displayName"
                :imageId="image.photoNum"
                :category="image.category"
                :key="image.photoNum"
                @delete="deletePhoto($event, index)"
            ></photo-view-component>
        </div>        
    </div>
    `,

    data () {
        return {
            text: {
                title: 'MY PHOTOS',
                categoriesTitle: 'CATEGORIES',
                unCategoriesTitle: 'NOT CATEGORIZED',
                edit: 'Edit',
                delete: 'Delete',
                noCategories: 'NO CATEGORIES :(',
                noImages: 'NO IMAGES :('
            },
            images: [],
            categories: []
        }
    },

    methods: {
        deletePhoto(imageData, index) {
            let vm = this;
            $.ajax({
                method: 'DELETE',
                contentType: 'application/json',
                xhrFields: { withCredentials: true },
                url: Services.photo.deletePhoto,
                data: JSON.stringify({ photoNum: imageData.imageId }),
                success: function (data) {
                    if (data) {
                        alert('SUCCESS');
                        vm.$delete(vm.images, index);
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${jqXHR} ${textStatus} ${errorThrown}`); }
            });
        },

        deleteCategory(category, index) {
            let vm = this;
            $.ajax({
                method: 'DELETE',
                contentType: 'application/json',
                xhrFields: { withCredentials: true },
                url: Services.photo.deleteCategory,
                data: JSON.stringify({ name: category }),
                success: function (data) {
                    if (data) {
                        alert('SUCCESS');
                        vm.$delete(vm.categories, index);
                    } else {
                        alert('FAIL');
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${jqXHR} ${textStatus} ${errorThrown}`); }
            });
        },

        editCategory(category, index) {
            alert(`${category} ${index}`)
        },

        showCategory(category) {
            let data = {
                isLoggedIn: true,
                component: 'category',
                eventData: { category }
            }
            this.$emit('component-change', data);
        },

        getCategories() {
            let vm = this;
            $.ajax({
                method: 'GET',
                xhrFields: { withCredentials: true },
                url: Services.photo.getCategories,
                success: function (data) {
                    console.log(data);
                    vm.categories = data;
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${jqXHR} ${textStatus} ${errorThrown}`); }
            });
        },

        getPhotos() {
            let vm = this;
            let url = this.getImagesUrl;
            $.ajax({
                method: 'GET',
                xhrFields: { withCredentials: true },
                url: url,
                success: function (data) {
                    console.log(data);
                    vm.images = data;
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${jqXHR} ${textStatus} ${errorThrown}`); }
            });
        }
    },

    computed: {
        getImagesUrl() {
            if (!this.category)
                return Services.photo.getUncategorizedPhotos;
            return Services.photo.getPhotosForCategory + `/${this.category}`;
        },

        photosTitle() {
            if (this.category !== '')
                return this.category;
            return this.text.unCategoriesTitle;
        }
    },

    mounted: function () {
        if (this.displayCategories)
            this.getCategories();
        this.getPhotos();
    },
}