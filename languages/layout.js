exports.ru = {
    profile: 'Профиль',
    logout: 'Выход',
    search: 'Поиск...',

    buttonsTxt: {
        add: 'Добавить',
        enable: 'Включить',
        disable: 'Отключить',
        cancel: 'Отмена',
        back: 'Назад',
        close: 'Закрыть',
        edit: 'Редактировать',
        'delete': 'Удалить',
        submit: 'Подвердить',
        save: 'Сохранить',
        confirm: 'Подтвердить',
        create: 'Создать',
        subscribe: 'Подписаться',
        send: 'Отправить',
        show: 'Показать',
        change: 'Сменить',
        download: 'Скачать'
    },

    dateTime: {
        seconds: 'Только что',
        minutes: {
            min: 'минуту',
            middle: 'минуты',
            max: 'минут'
        },
        hours: {
            min: 'час',
            middle: 'часа',
            max: 'часов'
        },

        days: {
            min: 'день',
            middle: 'дня',
            max: 'дней'
        }
    },

    crudText: {
        confirm: {
            title: 'Подтверждение',
            body: 'Пожалуйста, подтвердите операцию'
        },

        table: {
            search: 'Поиск',
            info: 'Показано с _START_ по _END_ из _TOTAL_ записей',
            length: '_MENU_ количество записей',
            empty: 'Таблица пустая',
            emptyTable: 'Нет данных для таблицы',
            zeroRecords: 'Нет совпадений в таблице',
            filtered: '- поиск в _MAX_ записей',
            prev: 'Назад',
            next: 'Вперед',
            processing: 'Обработка...'
        },

        create: 'Создать',
        add: 'Добавить',
        save: 'Сохранить',
        process: 'Обработка задания...',
        cancel: 'Отмена',
        waitForOperation: 'Дождитесь обработки текущего процесса заданий прежде чем начать новый',
        warning: 'Внимание',
        success: 'Успешно',
        empty: 'Выберите задания для отправки',
        done: 'Обработка заданий завершена.',
        operation: 'Операция',

        status: {
            created: 'Создан',
            success: 'Успешно',
            paused: 'Выключен',
            process: 'В обработке',
            error: 'Ошибка',
            deleted: 'Удален',
            warning: 'Ошибка',
            unknown: 'Неизвестно'
        }
    },

    home: {
        menu: 'Приборная панель',
        index: ''
    },

    management: {
        menu: 'Управление',
        users: 'Пользователи',
        groups: 'Группы',
        roles: 'Роли'
    },


    haproxy: {
        menu: 'HAProxy',
        configs: 'Конф. файлы',
        settings: 'Настройки'
    },

    server: {
        menu: 'Сервера',
        info: 'Информация',
        groups: 'Группы'
    },

    task: {
        created: 'Задание успешно отправлено в очередь.',
        createError: 'Произошла внутренняя ошибка сервера при отправке задания. Обратитесь к администратору.',
        success: 'Задание успешно выполнено. <a href="/tasks/$id">Открыть задание.</a>',
        error: 'Задание завершилось с ошибкой. <a href="/tasks/$id">Открыть задание.</a>',

        title: {
            success: 'Успешно',
            warning: 'Предупреждение',
            danger: 'Ошибка'
        }
    },

    validation: {
        required: "Поле обязательное для ввода.",
        remote: "Исправьте это поле.",
        email: "Введите корректный email адрес.",
        url: "Введите корректный URL адрес.",
        date: "Введите корректную дату.",
        dateISO: "Введите корректную дату (ISO формат).",
        number: "Введите число.",
        digits: "Введите целое число.",
        creditcard: "Введите корректный номер карты.",
        equalTo: "Введите тоже самое значение еще раз",
        accept: "Введите значение с допустимым расширением.",
        maxlength: "Введите не более чем {0} символов.",
        minlength: "Введите не менее чем {0} символов.",
        rangelength: "Введите значение, содержащие от {0} до {1} символов.",
        range: "Введите значение в диапозоне от {0} до {1}.",
        max: "Введите значение, которое меньше или равно {0}.",
        min: "Введите значение, которое больше или равно {0}."
    }
};

exports.us = {
    profile: 'My Profile',
    logout: 'Log Out',
    search: 'Search...',

    buttonsTxt: {
        add: 'Add',
        enable: 'Enable',
        disable: 'Disable',
        cancel: 'Cancel',
        back: 'Back',
        close: 'Close',
        edit: 'Edit',
        'delete': 'Delete',
        submit: 'Submit',
        save: 'Save',
        confirm: 'Confirm',
        create: 'Create',
        subscribe: 'Subscribe',
        send: 'Send',
        show: 'Show',
        change: 'Change',
        download: 'Download'
    },

    dateTime: {
        seconds: 'Just now',
        minutes: {
            min: 'minute',
            middle: 'mins',
            max: 'mins'
        },
        hours: {
            min: 'hour',
            middle: 'hrs',
            max: 'hrs'
        },

        days: {
            min: 'day',
            middle: 'days',
            max: 'days'
        }
    },

    crudText: {
        confirm: {
            title: 'Confirm',
            body: 'Please, confirm the operation'
        },

        create: 'Create',
        add: 'Add',
        save: 'Save',
        process: 'Processing the tasks...',
        cancel: 'Cancel',
        waitForOperation: 'Wait for the current processing of tasks before beginning the new',
        warning: 'Warning',
        success: 'Success',
        empty: 'Select tasks for processing',
        done: 'Processing the tasks is completed.',
        operation: 'Operation',

        status: {
            created: 'Created',
            success: 'Success',
            paused: 'Paused',
            process: 'Processing',
            error: 'Error',
            deleted: 'Deleted',
            warning: 'Error',
            unknown: 'Unknown'
        }
    },

    home: {
        menu: 'Dashboard',
        index: ''
    },

    management: {
        menu: 'Management',
        users: 'Users',
        groups: 'Groups',
        roles: 'Roles'
    },

    haproxy: {
        menu: 'HAProxy',
        configs: 'Configs',
        settings: 'Settings'
    },

    server: {
        menu: 'Servers',
        info: 'Info',
        groups: 'Groups'
    },

    task: {
        created: 'Task has been successfully sent to the queue.',
        createError: 'An internal server error occurred while sending a task. Contact your administrator.',
        success: 'Task completed successfully. <a href="/tasks/$id">View task.</a>',
        error: 'Task failed. <a href="/tasks/$id">View task.</a>',

        title: {
            success: 'Success',
            warning: 'Warning',
            danger: 'Error'
        }
    },

    validation: {
        required: 'This field is required.',
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        accept: "Please enter a value with a valid extension.",
        maxlength: "Please enter no more than {0} characters.",
        minlength: "Please enter at least {0} characters.",
        rangelength: "Please enter a value between {0} and {1} characters long.",
        range: "Please enter a value between {0} and {1}.",
        max: "Please enter a value less than or equal to {0}.",
        min: "Please enter a value greater than or equal to {0}."
    }
};