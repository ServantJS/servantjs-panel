exports.ru = {
    configs: {
        title: 'HAProxy конф. файлы',
        pageTitle: 'Список конфигурационных файлов',

        table: {
            name: 'Список'
        },

        groupConfig: 'Конфиг группы',
        agentConfig: 'Конфиг на сервере',

        slideUp: 'Свернуть',
        slideDown: 'Развернуть',
        insertTemplate: 'Вставить шаблон',

        configName: 'Наименование',
        addBlock: 'Добавить блок',

        task: {
            created: 'Задание успешно отправлено в очередь.',
            createError: 'Произошла внутренняя ошибка сервера при отправке задания. Обратитесь к администратору.',
            success: 'Задание успешно выполнено. <a href="/tasks/$id">Открыть задание.</a>',
            error: 'Задание завершилось с ошибкой. <a href="/tasks/$id">Открыть задание.</a>'
        },

        modal: {
            title: 'Создать новый конфигурационный файл',
            fields: {
                name: 'Наименование',
                type: 'Тип',
                content: 'Содержимое',
                target: 'Цель'

            }
        }
    },

    overview: {
        title: 'Редактирование конфига',
        pageTitle: 'Редактирование конфига',

        slideUp: 'Свернуть',
        slideDown: 'Развернуть',
        insertTemplate: 'Вставить шаблон',

        task: {
            created: 'Задание успешно отправлено в очередь.',
            createError: 'Произошла внутренняя ошибка сервера при отправке задания. Обратитесь к администратору.',
            success: 'Задание успешно выполнено. <a href="/tasks/$id">Открыть задание.</a>',
            error: 'Задание завершилось с ошибкой. <a href="/tasks/$id">Открыть задание.</a>'
        },

        configName: 'Наименование',
        addBlock: 'Добавить блок',

        actions: {
            pause: 'Выключить',
            resume: 'Включить'
        }
    },

    settings: {
        title: 'Настройки HAProxy',
        pageTitle: 'Список настроек',

        table: {
            name: 'Список пользовательских полей',
            columns: {
                name: 'Наименование',
                desc: 'Описание'
            }
        },

        modal: {
            title: 'Создать новое поле',
            fields: {
                name: 'Наименование',
                desc: 'Описание'
            }
        }
    }
};

exports.us = {
    configs: {
        title: 'HAProxy config. files',
        pageTitle: 'List of config files'
    },

    settings: {
        title: 'HAProxy settings',
        pageTitle: 'List of settings'
    }
};