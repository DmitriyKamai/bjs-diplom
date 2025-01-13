'use strict'

const userform = new UserForm ();
userform.loginFormCallback = (data) => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            throw new Error(response.error);
        }
    })
}

userform.registerFormCallback = (data) => {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            throw new Error(response.error);
        }
    })
}

