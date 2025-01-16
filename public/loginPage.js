'use strict'

const userform = new UserForm ();
userform.loginFormCallback = (data) => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userform.setLoginErrorMessage("Ошибка авторизации");
        }
    })
}

userform.registerFormCallback = (data) => {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userform.setRegisterErrorMessage("Ошибка регистрации");
        }
    })
}

