import Services from '../services.js';

export default {
    template: `
    <div class="form-data">
        <h2 class="w3-blue-grey">Create Account</h2>

        <div class="form-row" v-for="input in formInputs">
            <label class="w3-text-grey">{{ input.label }}</label>
            <input class="w3-input w3-border" v-model.trim="input.value" v-bind:type="input.type" v-bind:placeholder="input.placeholder"/>
        </div>

        <button v-on:click="sayHello" type="button">SayHello</button>
        <button v-on:click="postToApi" type="button">Register</button>
    </div>
    `,

    data: function () {
        return {
            helloMessage: 'Hello',
            formInputs: {
                name: { label: "Name", type: "text", placeholder: 'ex. Johny', value: '' },
                email: { label: "Email", type: "email", placeholder: 'ex. Johny@photos.com', value: '' },
                password: { label: "Password", type: "password", placeholder: '', value: '' },
                confirmPassword: { label: "Confrim Password", type: "password", placeholder: '', value: '' }
            }
        };
    },

    methods: {
        sayHello: function () {
            alert(this.helloMessage);
        },

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