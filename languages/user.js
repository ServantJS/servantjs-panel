exports.ru = {
    index: {
        title: 'Пользователи',
        pageTitle: 'Список пользователей',

        actions: {
            create: 'Добавить пользователя'
        },

        modal: {
            edit: {
                title: 'Редактирование пользователя',
                roles: 'Роли',
                groups: 'Группы'
            }
        },

        confirm: {
            title: 'Подверждение',
            text: 'Вы уверены, что хотите удалить пользователя?'
        },

        table: {
            name: 'Пользователи',
            columns: {
                email: 'Эл. почта',
                name: 'Имя',
                groups: 'Группы',
                roles: 'Роли'
            }
        }
    },

    ajax: {
        user: {
            deleted: 'Пользователь успешно удален',
            rootDel: 'Нельзя удалить root пользователя',
            rootEdit: 'Нельзя редактировать root пользователя',
            edit: 'Пользователь успешно изменен'
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

        modal: {
            edit: {
                title: 'Edit user',
                roles: 'Roles',
                groups: 'Groups'
            }
        },

        confirm: {
            title: 'Confirm',
            text: 'Are you sure that you want to remove user?'
        },

        table: {
            name: 'Users',
            columns: {
                email: 'Email',
                name: 'Name',
                groups: 'Groups',
                roles: 'Roles'
            }
        }
    },

    ajax: {
        user: {
            deleted: ' The user is successfully deleted',
            rootDel: 'It is not possible to delete root account',
            rootEdit: 'It is not possible to edit root account',
            edit: 'The user is successfully updated'
        }
    }
};