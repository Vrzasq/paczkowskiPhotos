import Services from './services.js';

let Commons = {
    isLoggedIn() {
        let isLoggedIn = false;
        $.ajax({
            method: 'POST',
            async: false,
            xhrFields: { withCredentials: true },
            url: Services.login.isLoggedIn,
            success: function (data) {
                console.log(data);
                isLoggedIn = data.isLoggedIn;
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(`${textStatus} ${errorThrown}`);
                isLoggedIn = true;
            }
        });

        return isLoggedIn;
    }
}

export default Commons;