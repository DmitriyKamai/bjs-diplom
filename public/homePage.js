const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    })
}

ApiConnector.current (response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
})

const ratesBoard = new RatesBoard ();

ratesBoard.getCurrencyCourse = () => {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
ratesBoard.getCurrencyCourse();
setInterval(ratesBoard.getCurrencyCourse, 60000)

const moneyManager = new MoneyManager ();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Счёт успешно пополнен");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Валюта успешно конвертирована");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Средства успешно отправлены");
        } else {
            moneyManager.setMessage(false, response.error);
        }
    })
}

const favoritesWidget = new FavoritesWidget ();

favoritesWidget.getFavorites = () => {
    ApiConnector.getFavorites(response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
    })
}

favoritesWidget.getFavorites();

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, data.name + " успешно добавлен(а) в книгу");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Пользователь удалён из книги");
        } else {
            favoritesWidget.setMessage(false, response.error);
        }
    })
}