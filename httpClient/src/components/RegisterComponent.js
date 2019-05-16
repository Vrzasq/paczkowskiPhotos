import Services from '../services.js';
import BaseForm from './VForm.js';

export default {
    components: {
        BaseForm,
    },
    template: `
    <base-form
        :title="title"
        :button-label="buttonLabel"
        :form-inputs="formInputs"
        @submit="postToApi"
    ></base-form>
    `,

    data: function () {
        return {
            title: "Create Account",
            buttonLabel: "Register",
            formInputs: {
                name: { label: "Name", inputType: "text", placeholder: 'ex. Johny', vlaue: '' },
                email: { label: "Email", inputType: "email", placeholder: 'ex. Johny@photos.com', vlaue: '' },
                password: { label: "Password", inputType: "password", placeholder: '', vlaue: '' },
                confirmPassword: { label: "Confrim Password", inputType: "password", placeholder: '', vlaue: '' }
            }
        };
    },

    methods: {
        postToApi: function () {
            let request = {
                name: this.formInputs.name.value,
                email: this.formInputs.email.value,
                password: this.formInputs.password.value
            }

            console.log(request);

            $.ajax({
                method: 'POST',
                contentType: 'application/json',
                url: Services.register.newUser,
                data: JSON.stringify(request),
                success: function (data) { alert(`done ${data}`); },
                error: function (jqXHR, textStatus, errorThrown) { alert(`${textStatus} ${errorThrown}`); }
            });
        }
    },
}