import Services from '../services.js';

export default {
    components: {

    },
    template: `
    <div>
        MY PHOTOS
    </div>
    `,

    data: function () {
        return {
        };
    },


    mounted: function () {
        let vue = this;
        $.ajax({
            method: 'GET',
            xhrFields: { withCredentials: true },
            url: Services.login.isLoggedIn,
            success: function (data) {
                console.log(data);
                if (!data.isLoggedIn) {
                    vue.$emit('component-change', 'login');
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(`${textStatus} ${errorThrown}`);
                vue.$emit('component-change', 'login');
            }
        });
    }
}