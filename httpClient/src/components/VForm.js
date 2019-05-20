import BaseInput from './VInput.js';

export default {
    components: {
        BaseInput
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
        formInputs: {
            label: String,
            inputType: String,
            placeholder: String,
            value: String
        },
    },
    template: `
    <div class="form-data">
        <h2 class="w3-blue-grey" v-once>{{ title }}</h2>
        <base-input v-for="(formInput, name) in formInputs"
            v-bind="formInput"
            v-model="formInput.value"
            :key="name"
        ></base-input>
        <button class="w3-btn w3-blue-grey" @click="$emit('submit')" type="button">{{ buttonLabel }}</button>
    </div>
    `
}