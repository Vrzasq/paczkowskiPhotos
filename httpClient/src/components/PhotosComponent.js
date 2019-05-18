'use strict';

import Commons from '../commons.js';

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
        let isLoggedIn = Commons.isLoggedIn();
        console.log(`photos ${isLoggedIn}`);
        
        if (!isLoggedIn) {
            vue.$emit('component-change', { component: 'login', isLoggedIn });
        }
    }
}