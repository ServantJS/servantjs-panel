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
        },

        editModal: {
            title: 'Редактирование поля'
        }
    },

    ajax: {
        delete: {
            ok: ' успешно удалено'
        }
    }
};

exports.us = {
    configs: {
        title: 'HAProxy config. files',
        pageTitle: 'List of config files',

        table: {
            name: 'List'
        },

        groupConfig: 'Config of group',
        agentConfig: 'Config for server',

        slideUp: 'Slide up',
        slideDown: 'Slide down',
        insertTemplate: 'Insert template',

        configName: 'Name',
        addBlock: 'Add a block',

        task: {
            created: 'Task has been successfully sent to the queue.',
            createError: 'An internal server error occurred while sending a task. Contact your administrator.',
            success: 'Task completed successfully. <a href="/tasks/$id">View task.</a>',
            error: 'Task failed. <a href="/tasks/$id">View task.</a>'
        },

        modal: {
            title: 'Create a new config file',
            fields: {
                name: 'Name',
                type: 'Type',
                content: 'Content',
                target: 'Target'
            }
        }
    },

    overview: {
        title: 'Edit config',
        pageTitle: 'Edit config',

        slideUp: 'Slide up',
        slideDown: 'Slide down',
        insertTemplate: 'Insert template',

        task: {
            created: 'Task has been successfully sent to the queue.',
            createError: 'An internal server error occurred while sending a task. Contact your administrator.',
            success: 'Task completed successfully. <a href="/tasks/$id">View task.</a>',
            error: 'Task failed. <a href="/tasks/$id">View task.</a>'
        },

        configName: 'Name',
        addBlock: 'Add a block',

        actions: {
            pause: 'Turn off',
            resume: 'Turn on'
        }
    },

    settings: {
        title: 'HAProxy settings',
        pageTitle: 'List of settings',

        table: {
            name: 'List of custom fields',
            columns: {
                name: 'Name',
                desc: 'Description'
            }
        },

        modal: {
            title: 'Create a new field',
            fields: {
                name: 'Name',
                desc: 'Description'
            }
        },

        editModal: {
            title: 'Edit field'
        }
    },

    ajax: {
        delete: {
            ok: ' successfully removed'
        }
    }
};