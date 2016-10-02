exports.ru = {
    index: {
        title: 'Пользователи',
        pageTitle: 'Список пользователей',

        actions: {
            create: 'Добавить пользователя'
        },

        table: {
            name: 'Пользователи',
            columns: {
                email: 'Эл. почта',
                name: 'Имя',
                token: 'API ключ'
            }
        },

        modal: {
            title: 'Создание пользователя',
            fields: {
                email: 'E-mail',
                pwd: 'Пароль',
                cpwd: 'Текущий пароль',
                npwd: 'Новый пароль',
                rpwd: 'Повторите пароль'
            }
        }
    },

    ajax: {
        create: {
            ok: 'Пользователь успешно создан.'    
        },
        edit: {
            ok: 'Данные пользователя успешно сохранены.'
        },
        delete: {
            ok: 'Пользователь успешно удален.',
            root: 'Нельзя удалить "root" пользователя.'
        }
    }
};

exports.us = {
    index: {
        title: 'Users',
        pageTitle: 'Users list',

        actions: {
            create: 'Create user'
        },

        table: {
            name: 'Users',
            columns: {
                email: 'Email',
                name: 'Name',
                token: 'API token'
            }
        },

        modal: {
            title: 'Create a new user',
            fields: {
                email: 'E-mail',
                pwd: 'Passord',
                cpwd: 'Current password',
                npwd: 'New password',
                rpwd: 'Repeat password'
            }
        }
    },

    ajax: {
        create: {
            ok: 'User successfully created.'
        },
        edit: {
            ok: 'User data saved successfully.'
        },
        delete: {
            ok: 'User successfully deleted.',
            root: 'You can not remove "root" user.'
        }
    }
};