import Services from '../services.js';
import BaseForm from './VForm.js';

export default {
    components: {
        BaseForm,
    },
    template: `
    <div>
    <base-form
        :title="title"
        :button-label="buttonLabel"
        :form-inputs="formInputs"
        @submit="postToApi"
    >
        
    </base-form>
    <button @click="auth">Click</button>
    </div>
    `,

    data: function () {
        return {
            title: "Login to Your account",
            buttonLabel: "Sign In",
            formInputs: {
                email: { label: "Email", inputType: "email", placeholder: 'ex. Johny@photos.com', value: '' },
                password: { label: "Password", inputType: "password", placeholder: '', value: '' },
            }
        };
    },

    methods: {
        postToApi: function () {
            let request = {
                email: this.formInputs.email.value,
                password: this.formInputs.password.value
            }

            console.log(request);

            $.ajax({
                method: 'POST',
                contentType: 'application/json',
                xhrFields: { withCredentials: true },
                url: Services.login.signIn,
                data: JSON.stringify(request),
                success: function (data) {
                    alert('success');
                    console.log(phot);
                },
                error: function (jqXHR, textStatus, errorThrown) { console.log(`${textStatus} ${errorThrown}`); }
            });
        },
        auth: function () {
            let vue = this;
            $.ajax({
                method: 'GET',
                xhrFields: { withCredentials: true },
                url: Services.register.getAllUsers,
                success: function (data) {
                    console.log(data);
                    vue.$emit('component-change', 'photos');
                },
                error: function (jqXHR, textStatus, errorThrown) { alert(`${textStatus} ${errorThrown}`); }
            });
        }
    },
}